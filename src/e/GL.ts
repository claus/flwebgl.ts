/// <reference path="../PlayerOptions.ts" />
/// <reference path="../geom/Color.ts" />
/// <reference path="../geom/Rect.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="RenderTarget.ts" />
/// <reference path="TextureAtlas.ts" />
/// <reference path="Ck.ts" />

module flwebgl.e
{
  import PlayerOptions = flwebgl.PlayerOptions;
  import Color = flwebgl.geom.Color;
  import Rect = flwebgl.geom.Rect;
  import Matrix = flwebgl.geom.Matrix;

  interface BufferItem {
    frameBuffer: WebGLFramebuffer;
    renderBuffer: WebGLRenderbuffer;
    width: number;
    height: number;
  }

  interface TextureMap { [id: string]: WebGLTexture; }
  interface ActiveTextureMap { [id: string]: string; }
  interface BufferItemMap { [id: string]: BufferItem[]; }

  export class GL
  {
    private ctx: WebGLRenderingContext;
    private ei: any;
    private logErrors: boolean;
    private viewport: Rect;
    private renderTarget: RenderTarget;
    private textureAtlases: TextureAtlas[];
    private vao: any;
    private ha: any;
    private uniformsCache: any;
    private bufferCache: BufferItemMap;
    private textureMap: TextureMap;
    private activeTextureMap: ActiveTextureMap;
    private ii: boolean;
    private fb: any;
    private programIDCounter: number;
    private backgroundColor: Color;
    private depthTestEnabled: boolean;

    viewMatrix: Matrix;

    constructor(canvas: HTMLCanvasElement, options: PlayerOptions) {
      this.ei = {};
      this.textureMap = {};
      this.logErrors = options.logErrors;
      var contextIDs = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
      for (var i = 0; i < contextIDs.length; i++) {
        try {
          this.ctx = canvas.getContext(contextIDs[i], {
            alpha: false,
            premultipliedAlpha: false,
            antialias: (options.antialias === AAType.MSAA)
          });
          this.ctx.clearColor(1, 1, 1, 1);
          this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
        } catch (error) {
        }
        if (this.ctx) {
          break;
        }
      }
      if (!this.ctx) {
        //c.l.w.error("Your browser doesn't support WebGL.");
        throw Error();
      }
      this.initStatics();
      this.init();
      this.textureAtlases = [];
      this.vao = this.getExtension("OES_vertex_array_object");
      if (!this.hasExtension("OES_standard_derivatives")) {
        //c.l.w.error("Standard derivatives extension not enabled.");
      }
      this.renderTarget = new RenderTarget();
      this.bufferCache = {};
      this.activeTextureMap = {};
      this.ii = options.caching;
      //this.fb = this.ii ? new c.e.Se(options.cachingOptions) : new c.e.Ck;
        this.fb = new Ck();
      this.fb.setGL(this);
      this.uniformsCache = {};
      this.programIDCounter = 0;
    }

    getViewport(): Rect {
      return this.viewport;
    }

    setViewport(rect: Rect, flipY: boolean = true) {
      var multY = flipY ? -1 : 1;
      this.viewport = rect;
      this.ctx.viewport(rect.left, rect.top, rect.width, rect.height);
      this.viewMatrix = new Matrix([ 2 / rect.width, 0, 0, 2 * multY / rect.height, -1, -1 * multY ]);
    }

    loadTextures(textureAtlases: TextureAtlas[], callback) {
      this.textureAtlases = textureAtlases;
      this._loadTextures(textureAtlases, callback);
    }

    getTextureAtlas(id: string): TextureAtlas {
      for (var i = 0; i < this.textureAtlases.length; i++) {
        if (this.textureAtlases[i].id === id) {
          return this.textureAtlases[i];
        }
      }
      return null;
    }

    // Be
    getTextureAtlasByFrameID(id: string): TextureAtlas {
      for (var i = 0; i < this.textureAtlases.length; i++) {
        if (this.textureAtlases[i].getFrame(id)) {
          return this.textureAtlases[i];
        }
      }
      return null;
    }

    getTexture(id: string): WebGLTexture {
      return this.textureMap[id];
    }

    activateTexture(id: string) {
      this.activeTextureMap[id] = id;
      this.ctx.activeTexture(GL.TEXTURE0 + +id);
    }

    deactivateTexture(id: string) {
      delete this.activeTextureMap[id];
    }

    createTexture(): WebGLTexture {
      return this.ctx.createTexture();
    }

    bindTexture(a, texture: WebGLTexture) {
      this.ctx.bindTexture(a, texture);
    }

    deleteTexture(texture: WebGLTexture) {
      this.ctx.deleteTexture(texture);
    }

    deleteTextures() {
      for (var id in this.textureMap) {
        if (this.textureMap[id]) {
          this.ctx.deleteTexture(this.textureMap[id]);
        }
      }
      this.textureMap = {};
    }

    texImage2D(target: number, level: number, internalFormat: number, format: number, type: number, image: HTMLImageElement) {
      this.ctx.texImage2D(target, level, internalFormat, format, type, image);
    }

    texImage2D_WidthHeight(target: number, internalFormat: number, width: number, height: number, format: number, type: number) {
      this.ctx.texImage2D(target, 0, internalFormat, width, height, 0, format, type, null);
    }

    texParameteri(target: number, pname: number, param: number) {
      this.ctx.texParameteri(target, pname, param);
    }

    pixelStorei(pname: number, param: number) {
      this.ctx.pixelStorei(pname, param);
    }

    private _loadTextures(textureAtlases: TextureAtlas[], callback) {
      var d = 0;
      var self = this;
      var textureCount = textureAtlases.length;
      for (var i = 0; i < textureCount; i++) {
        var image = new Image();
        var texture = this.createTexture();
        var textureAtlas = textureAtlases[i];
        image.onload = function() {
          self.bindTexture(GL.TEXTURE_2D, self.textureMap[this.id]);
          self.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, this);
          self.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
          self.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
          self.pixelStorei(GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
          self.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
          self.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
          self.bindTexture(GL.TEXTURE_2D, null);
          if(++d === textureCount) {
            callback();
          }
        };
        image.src = textureAtlas.imageURL;
        image.id = textureAtlas.id;
        this.textureMap[textureAtlas.id] = texture;
      }
    }

    // wd
    createRenderTarget(width: number, height: number, format = GL.RGBA, internalFormat = GL.DEPTH_COMPONENT16): RenderTarget {
      var frameBuffer;
      var renderBuffer;
      var bufferFound = false;
      var buffers = this.bufferCache[internalFormat];
      if (buffers) {
        for (var i = 0; i < buffers.length; i++) {
          var buffer = buffers[i];
          if (buffer.width === width && buffer.height === height) {
            frameBuffer = buffer.frameBuffer;
            renderBuffer = buffer.renderBuffer;
            bufferFound = true;
            break;
          }
        }
      }
      if (!bufferFound) {
        frameBuffer = this.createFramebuffer();
        renderBuffer = this.createRenderbuffer();
        this.bindFramebuffer(GL.FRAMEBUFFER, frameBuffer);
        this.bindRenderbuffer(GL.RENDERBUFFER, renderBuffer);
        this.renderbufferStorage(GL.RENDERBUFFER, internalFormat, width, height);
        this.framebufferRenderbuffer(GL.FRAMEBUFFER, GL.DEPTH_ATTACHMENT, GL.RENDERBUFFER, renderBuffer);
        if (!this.bufferCache[internalFormat]) { this.bufferCache[internalFormat] = []; }
        this.bufferCache[internalFormat].push({
          frameBuffer: frameBuffer,
          renderBuffer: renderBuffer,
          width: width,
          height: height
        });
        this.bindFramebuffer(GL.FRAMEBUFFER, this.renderTarget.frameBuffer);
      }
      var texture = this.createTexture();
      var textureID = "" + this.textureAtlases.length;
      var renderTarget = new RenderTarget(textureID, texture, frameBuffer, renderBuffer);
      this.activateTexture(textureID);
      this.bindTexture(GL.TEXTURE_2D, texture);
      this.texImage2D_WidthHeight(GL.TEXTURE_2D, format, width, height, format, GL.UNSIGNED_BYTE);
      this.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
      this.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
      this.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
      this.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
      var textureAtlas = new TextureAtlas(textureID, void 0, width, height);
      this.textureMap[textureID] = renderTarget.texture;
      this.textureAtlases.push(textureAtlas);
      this.bindTexture(GL.TEXTURE_2D, null);
      this.deactivateTexture(textureID);
      return renderTarget;
    }

    // me
    init() {
      this.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
      this.enable(GL.BLEND);
      this.depthFunc(GL.LESS);
      this.setBackgroundColor(new Color(255, 255, 255, 0));
      this.clearDepth(1);
      this.disable(GL.CULL_FACE);
      this.depthMask(true);
      this.setDepthTest(true);
    }

    setUniforms(shader, c) {
      var d = c.getUniforms(shader.id);
      var e = this.uniformsCache[shader.id];
      if (!e) {
        e = this.uniformsCache[shader.id] = {};
      }
      for (var k = 0; k < d.length; ++k) {
        var n = e[k]; // cached value
        var f = d[k].value; // new value
        var type = d[k].jc.type;
        var location = d[k].jc.location;
        switch (type) {
          case GL.FLOAT_VEC2:
            if (n === void 0 || n.value[0] !== f[0] || n.value[1] !== f[1]) {
              this.uniform2fv(location, f);
            }
            break;
          case GL.FLOAT_VEC4:
            if (n === void 0 || n.value[0] !== f[0] || n.value[1] !== f[1] || n.value[2] !== f[2] || n.value[3] !== f[3]) {
              this.uniform4fv(location, f);
            }
            break;
          case GL.FLOAT_MAT4:
            if (n === void 0 || n.value[0] !== f[0] || n.value[1] !== f[1] || n.value[4] !== f[4] || n.value[5] !== f[5] || n.value[10] !== f[10] || n.value[12] !== f[12] || n.value[13] !== f[13]) {
              this.uniformMatrix4fv(location, false, f);
            }
            break;
          case GL.INT:
          case GL.SAMPLER_2D:
            if (n === void 0 || n.value[0] !== f[0] || n.value[1] !== f[1]) {
              this.uniform1iv(location, f);
            }
            break;
          case GL.INT_VEC2:
            if (n === void 0 || n.value[0] !== f[0] || n.value[1] !== f[1]) {
              this.uniform2iv(location, f);
            }
            break;
        }
        this.uniformsCache[shader.id][k] = {
          type: type,
          value: f
        };
      }
    }

    // eh
    getRenderTarget(): RenderTarget {
      return this.renderTarget;
    }

    // Ha
    activateRenderTarget(renderTarget: RenderTarget): RenderTarget {
      if (renderTarget === this.renderTarget) {
        return this.renderTarget;
      }
      if (renderTarget.frameBuffer !== this.renderTarget.frameBuffer) {
        this.bindFramebuffer(GL.FRAMEBUFFER, renderTarget.frameBuffer);
      }
      if (renderTarget.frameBuffer) {
        this.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, renderTarget.texture, 0);
      }
      var oldRenderTarget = this.renderTarget;
      this.renderTarget = renderTarget;
      return oldRenderTarget;
    }

    // Wg
    activateRenderTargetTexture(renderTarget: RenderTarget): string {
      this.activateTexture(renderTarget.id);
      this.bindTexture(GL.TEXTURE_2D, renderTarget.texture);
      return renderTarget.id;
    }

    // ye
    deleteRenderTargetTexture(renderTarget: RenderTarget) {
      if (renderTarget && renderTarget.texture) {
        this.deleteTexture(renderTarget.texture);
        delete this.textureMap[renderTarget.id];
      }
    }

    // draw() ?
    e(shader, h, c) {
      // TODO
      /*
      var l = 0;
      var d = 0;
      var e = c.length;
      while (d < e) {
        this.fb.Vg(h, shader.getAttribs());
        l = d;
        while (d < e) {
          if (!this.fb.upload(c[d++])) {
            break;
          }
        }
        var f = this.fb.Zg(false);
        for (var m = 0; m < f.length; m++, l++) {
          var n = c[l];
          this.Fl(n);
          this.setUniforms(shader, n);
          this.drawArrays(b.TRIANGLES, f[m].Ld, n.sa())
        }
        this.bindVertexArrayOES(null)
      }
      */
    }

    createFramebuffer(): WebGLFramebuffer {
      return this.ctx.createFramebuffer();
    }

    bindFramebuffer(target: number, frameBuffer: WebGLFramebuffer) {
      this.ctx.bindFramebuffer(target, frameBuffer);
    }

    deleteFramebuffer(frameBuffer: WebGLFramebuffer) {
      this.ctx.deleteFramebuffer(frameBuffer);
    }

    createRenderbuffer(): WebGLRenderbuffer {
      return this.ctx.createRenderbuffer();
    }

    bindRenderbuffer(target: number, renderBuffer: WebGLRenderbuffer) {
      this.ctx.bindRenderbuffer(target, renderBuffer);
    }

    deleteRenderbuffer(renderBuffer: WebGLRenderbuffer) {
      this.ctx.deleteRenderbuffer(renderBuffer);
    }

    renderbufferStorage(target: number, internalFormat: number, width: number, height: number) {
      this.ctx.renderbufferStorage(target, internalFormat, width, height);
    }

    framebufferTexture2D(target: number, attachment: number, textureTarget: number, texture: WebGLTexture, level: number) {
      this.ctx.framebufferTexture2D(target, attachment, textureTarget, texture, level);
    }

    framebufferRenderbuffer(target: number, attachment: number, renderBufferTarget: number, renderBuffer: WebGLRenderbuffer) {
      this.ctx.framebufferRenderbuffer(target, attachment, renderBufferTarget, renderBuffer);
    }

    drawElements(count: number) {
      this.ctx.drawElements (this.ctx.TRIANGLES, count, this.ctx.UNSIGNED_SHORT, 0);
    }

    drawArrays(mode: number, first: number, count: number) {
      this.ctx.drawArrays(mode, first, count);
    }

    bufferData(target: number, sizeOrBuffer: any, usage: number) {
      this.ctx.bufferData(target, sizeOrBuffer, usage);
    }

    bufferSubData(target: number, offset: number, data: ArrayBuffer) {
      this.ctx.bufferSubData(target, offset, data);
    }

    setBackgroundColor(color: Color) {
      this.backgroundColor = color;
      this.clearColor(color.red / 255, color.green / 255, color.blue / 255, color.alpha / 255);
    }

    getBackgroundColor(): Color {
      return this.backgroundColor;
    }

    clearColor(red: number, green: number, blue: number, alpha: number) {
      this.ctx.clearColor(red, green, blue, alpha);
    }

    clear(colorBuffer: boolean, depthBuffer: boolean, stencilBuffer: boolean) {
      var mask = 0;
      if (colorBuffer) { mask |= this.ctx.COLOR_BUFFER_BIT; }
      if (depthBuffer) { mask |= this.ctx.DEPTH_BUFFER_BIT; }
      if (stencilBuffer) { mask |= this.ctx.STENCIL_BUFFER_BIT; }
      if (mask) {
        this.ctx.clear(mask);
      }
    }

    blendFunc(sfactor: number, dfactor: number) {
      this.ctx.blendFunc(sfactor, dfactor);
    }

    blendFuncSeparate(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number) {
      this.ctx.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
    }

    enable(capability: number) {
      this.ctx.enable(capability);
    }

    disable(capability: number) {
      this.ctx.disable(capability);
    }

    scissor(rect: Rect) {
      this.ctx.scissor(rect.left, rect.top, rect.width, rect.height);
    }

    depthMask(flag: boolean) {
      this.ctx.depthMask(flag);
    }

    depthFunc(func: number) {
      this.ctx.depthFunc(func);
    }

    clearDepth(depth: number) {
      this.ctx.clearDepth(depth);
    }

    setDepthTest(value: boolean) {
      if (value !== this.depthTestEnabled) {
        if (value) {
          this.ctx.enable(this.ctx.DEPTH_TEST)
        } else {
          this.ctx.disable(this.ctx.DEPTH_TEST);
        }
        this.depthTestEnabled = value;
      }
    }

    createShader(type: number, source: string) {
      var shader = this.ctx.createShader(type);
      if (this.hasError()) {
        return null;
      }
      this.ctx.shaderSource(shader, source);
      if (this.hasError()) {
        return null;
      }
      this.ctx.compileShader(shader);
      if (this.hasError()) {
        return null;
      } else {
        if (this.ctx.getShaderParameter(shader, this.ctx.COMPILE_STATUS)) {
          return shader;
        } else {
          console.log(this.ctx.getShaderInfoLog(shader));
          //c.l.w.info(this.ctx.getShaderInfoLog(shader));
          return null;
        }
      }
    }

    deleteShader(shader: WebGLShader) {
      this.ctx.deleteShader(shader);
    }

    createProgram(): WebGLProgram {
      return this.ctx.createProgram();
    }

    deleteProgram(program: WebGLProgram) {
      this.ctx.deleteProgram(program);
    }

    attachShader(program: WebGLProgram, shader: WebGLShader) {
      this.ctx.attachShader(program, shader);
    }

    linkProgram(program: WebGLProgram): number {
      this.ctx.linkProgram(program);
      var hasError = this.hasError();
      var linkStatus = this.ctx.getProgramParameter(program, this.ctx.LINK_STATUS);
      if (!linkStatus || hasError) {
        //c.l.w.error("Could not initialize shaders properly: " + this.ctx.getProgramInfoLog(program));
      }
      return (!hasError && linkStatus) ? this.programIDCounter++ : -1;
    }

    useProgram(program: WebGLProgram) {
      this.ctx.useProgram(program);
    }

    bindAttribLocation(program: WebGLProgram, index: number, name: string) {
      this.ctx.bindAttribLocation(program, index, name);
    }

    getAttribLocation(program: WebGLProgram, name: string) {
      return this.ctx.getAttribLocation(program, name);
    }

    kc(index: number) {
      this.ctx.enableVertexAttribArray(index);
    }

    vertexAttribPointer(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number) {
      this.ctx.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }

    getUniformLocation(program: WebGLProgram, name: string) {
      return this.ctx.getUniformLocation(program, name);
    }

    uniformMatrix4fv(location: WebGLUniformLocation, transpose: boolean, value: number[]) {
      this.ctx.uniformMatrix4fv(location, transpose, value);
    }

    uniform2fv(location: WebGLUniformLocation, value: number[]) {
      this.ctx.uniform2fv(location, value);
    }

    uniform4fv(location: WebGLUniformLocation, value: number[]) {
      this.ctx.uniform4fv(location, value);
    }

    uniform1i(location: WebGLUniformLocation, value: number) {
      this.ctx.uniform1i(location, value);
    }

    uniform1iv(location: WebGLUniformLocation, value: number[]) {
      this.ctx.uniform1iv(location, value);
    }

    uniform2iv(location: WebGLUniformLocation, value: number[]) {
      this.ctx.uniform2iv(location, value);
    }

    createBuffer(): WebGLBuffer {
      var buffer = this.ctx.createBuffer();
      return this.hasError() ? null : buffer;
    }

    deleteBuffer(buffer: WebGLBuffer) {
      this.ctx.deleteBuffer(buffer);
    }

    bindBuffer(target: number, buffer: WebGLBuffer) {
      this.ctx.bindBuffer(target, buffer);
      this.ei["" + target] = buffer;
    }

    getBoundBuffer(target: number): WebGLBuffer {
      return this.ei["" + target];
    }

    flush() {
      this.ctx.flush();
    }

    createVertexArrayOES() {
      if (this.vao) {
        return this.vao.createVertexArrayOES();
      }
    }

    bindVertexArrayOES(a) {
      if (this.vao) {
        this.vao.bindVertexArrayOES(a);
      }
    }

    deleteVertexArrayOES(a) {
      if (this.vao) {
        this.vao.deleteVertexArrayOES(a);
      }
    }

    getExtension(name): any {
      return this.ctx.getExtension(name);
    }

    hasExtension(name): boolean {
      name = name.toLowerCase();
      var names = this.ctx.getSupportedExtensions();
      for (var i = 0; i < names.length; i++) {
        if (names[i].toLowerCase() === name) {
          this.ctx.getExtension(name);
          return true;
        }
      }
      return false;
    }

    getError(): number {
      if (!this.logErrors) {
        return this.ctx.NO_ERROR;
      }
      var error = this.ctx.getError();
      if (error != this.ctx.NO_ERROR) {
        //c.l.w.error("WebGL Error: " + error)
      }
      return error;
    }

    hasError(): boolean {
      return (this.getError() != this.ctx.NO_ERROR);
    }

    destroy() {
      this.deleteTextures();
      for (var id in this.bufferCache) {
        var bufferItems = this.bufferCache[id];
        for (var i = 0; i < bufferItems.length; i++) {
          this.deleteRenderbuffer(bufferItems[i].renderBuffer);
          this.deleteFramebuffer(bufferItems[i].frameBuffer);
        }
      }
      // TODO:
      //this.fb.destroy();
    }

    initStatics() {
      GL.ZERO = this.ctx.ZERO;
      GL.ONE = this.ctx.ONE;
      GL.SRC_COLOR = this.ctx.SRC_COLOR;
      GL.SRC_ALPHA = this.ctx.SRC_ALPHA;
      GL.DST_ALPHA = this.ctx.DST_ALPHA;
      GL.DST_COLOR = this.ctx.DST_COLOR;
      GL.ONE_MINUS_SRC_COLOR = this.ctx.ONE_MINUS_SRC_COLOR;
      GL.ONE_MINUS_SRC_ALPHA = this.ctx.ONE_MINUS_SRC_ALPHA;
      GL.ONE_MINUS_DST_ALPHA = this.ctx.ONE_MINUS_DST_ALPHA;
      GL.ONE_MINUS_DST_COLOR = this.ctx.ONE_MINUS_DST_COLOR;
      GL.SRC_ALPHA_SATURATE = this.ctx.SRC_ALPHA_SATURATE;
      GL.NEVER = this.ctx.NEVER;
      GL.LESS = this.ctx.LESS;
      GL.EQUAL = this.ctx.EQUAL;
      GL.LEQUAL = this.ctx.LEQUAL;
      GL.GREATER = this.ctx.GREATER;
      GL.NOTEQUAL = this.ctx.NOTEQUAL;
      GL.GEQUAL = this.ctx.GEQUAL;
      GL.ALWAYS = this.ctx.ALWAYS;
      GL.ARRAY_BUFFER = this.ctx.ARRAY_BUFFER;
      GL.ELEMENT_ARRAY_BUFFER = this.ctx.ELEMENT_ARRAY_BUFFER;
      GL.ARRAY_BUFFER_BINDING = this.ctx.ARRAY_BUFFER_BINDING;
      GL.ELEMENT_ARRAY_BUFFER_BINDING = this.ctx.ELEMENT_ARRAY_BUFFER_BINDING;
      GL.BYTE = this.ctx.BYTE;
      GL.UNSIGNED_BYTE = this.ctx.UNSIGNED_BYTE;
      GL.SHORT = this.ctx.SHORT;
      GL.UNSIGNED_SHORT = this.ctx.UNSIGNED_SHORT;
      GL.INT = this.ctx.INT;
      GL.UNSIGNED_INT = this.ctx.UNSIGNED_INT;
      GL.FLOAT = this.ctx.FLOAT;
      GL.INT_VEC2 = this.ctx.INT_VEC2;
      GL.INT_VEC3 = this.ctx.INT_VEC3;
      GL.INT_VEC4 = this.ctx.INT_VEC4;
      GL.FLOAT_VEC2 = this.ctx.FLOAT_VEC2;
      GL.FLOAT_VEC3 = this.ctx.FLOAT_VEC3;
      GL.FLOAT_VEC4 = this.ctx.FLOAT_VEC4;
      GL.FLOAT_MAT4 = this.ctx.FLOAT_MAT4;
      GL.SAMPLER_2D = this.ctx.SAMPLER_2D;
      GL.FRAGMENT_SHADER = this.ctx.FRAGMENT_SHADER;
      GL.VERTEX_SHADER = this.ctx.VERTEX_SHADER;
      GL.MAX_VERTEX_ATTRIBS = this.ctx.MAX_VERTEX_ATTRIBS;
      GL.MAX_VERTEX_UNIFORM_VECTORS = this.ctx.MAX_VERTEX_UNIFORM_VECTORS;
      GL.MAX_VARYING_VECTORS = this.ctx.MAX_VARYING_VECTORS;
      GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = this.ctx.MAX_COMBINED_TEXTURE_IMAGE_UNITS;
      GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = this.ctx.MAX_VERTEX_TEXTURE_IMAGE_UNITS;
      GL.MAX_TEXTURE_IMAGE_UNITS = this.ctx.MAX_TEXTURE_IMAGE_UNITS;
      GL.MAX_FRAGMENT_UNIFORM_VECTORS = this.ctx.MAX_FRAGMENT_UNIFORM_VECTORS;
      GL.CULL_FACE = this.ctx.CULL_FACE;
      GL.BLEND = this.ctx.BLEND;
      GL.DITHER = this.ctx.DITHER;
      GL.STENCIL_TEST = this.ctx.STENCIL_TEST;
      GL.DEPTH_TEST = this.ctx.DEPTH_TEST;
      GL.SCISSOR_TEST = this.ctx.SCISSOR_TEST;
      GL.POLYGON_OFFSET_FILL = this.ctx.POLYGON_OFFSET_FILL;
      GL.SAMPLE_ALPHA_TO_COVERAGE = this.ctx.SAMPLE_ALPHA_TO_COVERAGE;
      GL.SAMPLE_COVERAGE = this.ctx.SAMPLE_COVERAGE;
      GL.TEXTURE0 = this.ctx.TEXTURE0;
      GL.TEXTURE_2D = this.ctx.TEXTURE_2D;
      GL.RGBA = this.ctx.RGBA;
      GL.RGB = this.ctx.RGB;
      GL.TEXTURE_MAG_FILTER = this.ctx.TEXTURE_MAG_FILTER;
      GL.TEXTURE_MIN_FILTER = this.ctx.TEXTURE_MIN_FILTER;
      GL.TEXTURE_WRAP_S = this.ctx.TEXTURE_WRAP_S;
      GL.TEXTURE_WRAP_T = this.ctx.TEXTURE_WRAP_T;
      GL.UNPACK_FLIP_Y_WEBGL = this.ctx.UNPACK_FLIP_Y_WEBGL;
      GL.CLAMP_TO_EDGE = this.ctx.CLAMP_TO_EDGE;
      GL.NEAREST = this.ctx.NEAREST;
      GL.LINEAR = this.ctx.LINEAR;
      GL.NEAREST_MIPMAP_NEAREST = this.ctx.NEAREST_MIPMAP_NEAREST;
      GL.LINEAR_MIPMAP_NEAREST = this.ctx.LINEAR_MIPMAP_NEAREST;
      GL.NEAREST_MIPMAP_LINEAR = this.ctx.NEAREST_MIPMAP_LINEAR;
      GL.LINEAR_MIPMAP_LINEAR = this.ctx.LINEAR_MIPMAP_LINEAR;
      GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = this.ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL;
      GL.FRAMEBUFFER = this.ctx.FRAMEBUFFER;
      GL.RENDERBUFFER = this.ctx.RENDERBUFFER;
      GL.COLOR_ATTACHMENT0 = this.ctx.COLOR_ATTACHMENT0;
      GL.DEPTH_STENCIL = this.ctx.DEPTH_STENCIL;
      GL.DEPTH_COMPONENT16 = this.ctx.DEPTH_COMPONENT16;
      GL.STENCIL_INDEX8 = this.ctx.STENCIL_INDEX8;
      GL.DEPTH_ATTACHMENT = this.ctx.DEPTH_ATTACHMENT;
      GL.STENCIL_ATTACHMENT = this.ctx.STENCIL_ATTACHMENT;
      GL.DEPTH_STENCIL_ATTACHMENT = this.ctx.DEPTH_STENCIL_ATTACHMENT;
      GL.FRAMEBUFFER_UNSUPPORTED = this.ctx.FRAMEBUFFER_UNSUPPORTED;
      GL.KEEP = this.ctx.KEEP;
      GL.REPLACE = this.ctx.REPLACE;
      GL.INCR = this.ctx.INCR;
      GL.DECR = this.ctx.DECR;
      GL.INVERT = this.ctx.INVERT;
      GL.INCR_WRAP = this.ctx.INCR_WRAP;
      GL.DECR_WRAP = this.ctx.DECR_WRAP;
      GL.STREAM_DRAW = this.ctx.STREAM_DRAW;
      GL.STATIC_DRAW = this.ctx.STATIC_DRAW;
      GL.DYNAMIC_DRAW = this.ctx.DYNAMIC_DRAW;
      GL.TRIANGLES = this.ctx.TRIANGLES;
    }

    static MAX_VERTICES = 65532;
    static MAX_TEXTURE_SIZE = 2048;

    static ZERO;
    static ONE;
    static SRC_COLOR;
    static SRC_ALPHA;
    static DST_ALPHA;
    static DST_COLOR;
    static ONE_MINUS_SRC_COLOR;
    static ONE_MINUS_SRC_ALPHA;
    static ONE_MINUS_DST_ALPHA;
    static ONE_MINUS_DST_COLOR;
    static SRC_ALPHA_SATURATE;
    static NEVER;
    static LESS;
    static EQUAL;
    static LEQUAL;
    static GREATER;
    static NOTEQUAL;
    static GEQUAL;
    static ALWAYS;
    static ARRAY_BUFFER;
    static ELEMENT_ARRAY_BUFFER;
    static ARRAY_BUFFER_BINDING;
    static ELEMENT_ARRAY_BUFFER_BINDING;
    static BYTE;
    static UNSIGNED_BYTE;
    static SHORT;
    static UNSIGNED_SHORT;
    static INT;
    static UNSIGNED_INT;
    static FLOAT;
    static INT_VEC2;
    static INT_VEC3;
    static INT_VEC4;
    static FLOAT_VEC2;
    static FLOAT_VEC3;
    static FLOAT_VEC4;
    static FLOAT_MAT4;
    static SAMPLER_2D;
    static FRAGMENT_SHADER;
    static VERTEX_SHADER;
    static MAX_VERTEX_ATTRIBS;
    static MAX_VERTEX_UNIFORM_VECTORS;
    static MAX_VARYING_VECTORS;
    static MAX_COMBINED_TEXTURE_IMAGE_UNITS;
    static MAX_VERTEX_TEXTURE_IMAGE_UNITS;
    static MAX_TEXTURE_IMAGE_UNITS;
    static MAX_FRAGMENT_UNIFORM_VECTORS;
    static CULL_FACE;
    static BLEND;
    static DITHER;
    static STENCIL_TEST;
    static DEPTH_TEST;
    static SCISSOR_TEST;
    static POLYGON_OFFSET_FILL;
    static SAMPLE_ALPHA_TO_COVERAGE;
    static SAMPLE_COVERAGE;
    static TEXTURE0;
    static TEXTURE_2D;
    static RGBA;
    static RGB;
    static TEXTURE_MAG_FILTER;
    static TEXTURE_MIN_FILTER;
    static TEXTURE_WRAP_S;
    static TEXTURE_WRAP_T;
    static UNPACK_FLIP_Y_WEBGL;
    static CLAMP_TO_EDGE;
    static NEAREST;
    static LINEAR;
    static NEAREST_MIPMAP_NEAREST;
    static LINEAR_MIPMAP_NEAREST;
    static NEAREST_MIPMAP_LINEAR;
    static LINEAR_MIPMAP_LINEAR;
    static UNPACK_PREMULTIPLY_ALPHA_WEBGL;
    static FRAMEBUFFER;
    static RENDERBUFFER;
    static COLOR_ATTACHMENT0;
    static DEPTH_STENCIL;
    static DEPTH_COMPONENT16;
    static STENCIL_INDEX8;
    static DEPTH_ATTACHMENT;
    static STENCIL_ATTACHMENT;
    static DEPTH_STENCIL_ATTACHMENT;
    static FRAMEBUFFER_UNSUPPORTED;
    static KEEP;
    static REPLACE;
    static INCR;
    static DECR;
    static INVERT;
    static INCR_WRAP;
    static DECR_WRAP;
    static STREAM_DRAW;
    static STATIC_DRAW;
    static DYNAMIC_DRAW;
    static TRIANGLES;
  }
}
