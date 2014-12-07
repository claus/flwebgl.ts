/// <reference path="../GL.ts" />
/// <reference path="../lk.ts" />
/// <reference path="../Uniform.ts" />
/// <reference path="../Attribute.ts" />
/// <reference path="../renderers/RenderPassIndex.ts" />
/// <reference path="../../geom/Matrix.ts" />
/// <reference path="../../geom/ColorTransform.ts" />
/// <reference path="../../util/Logger.ts" />
/// <reference path="IShader.ts" />

module flwebgl.e.shaders
{
  import GL = flwebgl.e.GL;
  import Uniform = flwebgl.e.Uniform;
  import Uniforms = flwebgl.e.Uniforms;
  import UniformValue = flwebgl.e.UniformValue;
  import Attribute = flwebgl.e.Attribute;
  import Attributes = flwebgl.e.Attributes;
  import RenderPassIndex = flwebgl.e.renderers.RenderPassIndex;
  import Matrix = flwebgl.geom.Matrix;
  import Logger = flwebgl.util.Logger;

  export class ShaderImageSpaceStdDev implements IShader
  {
    private gl: GL;
    private _id: number;
    private _attribs: Attributes;
    private _uniforms: Uniforms;
    private uniformMap: any;
    private program: WebGLProgram;
    private vertexShader: WebGLShader;
    private vertexShaderSrc: string;
    private fragmentShader: WebGLShader;
    private fragmentShaderSrc: string;
    private modelViewMatrix: Matrix;
    private ao: any; // TODO: what's this? size of uSamplers?

    constructor() {
      console.log("ShaderImageSpaceStdDev");
    }

    get id(): number {
      return this._id;
    }

    get uniforms(): Uniforms {
      return this._uniforms;
    }

    get attribs(): Attributes {
      return this._attribs;
    }

    setGL(gl: GL): boolean {
      this.gl = gl;
      if (!this.setup()) {
        return false;
      }
      this.modelViewMatrix = new Matrix();
      return true;
    }

    activate() {
      this.gl.useProgram(this.program);
    }

    draw(a: any, b) {
      switch (b) {
        case RenderPassIndex.oc:
          this.xg(a);
          break;
        case RenderPassIndex.Tb:
          this.zg(a);
          break;
        case RenderPassIndex.Mc:
          this.yg(a);
          break;
      }
    }

    xg(a: any) {
      this.Fg();
      this.Ia(a, RenderPassIndex.oc);
    }

    zg(a: any) {
      this.Hg();
      this.Ia(a, RenderPassIndex.Tb);
    }

    yg(a: any) {
      this.Gg();
      this.Ia(a, RenderPassIndex.Mc);
    }

    Fg() {
      this.gl.disable(GL.BLEND);
      this.gl.depthMask(true);
      this.gl.enable(GL.DEPTH_TEST);
    }
    
    Hg() {
      this.gl.depthMask(false);
      this.gl.enable(GL.DEPTH_TEST);
      this.gl.enable(GL.BLEND);
      this.gl.blendFuncSeparate(GL.SRC_ALPHA_SATURATE, GL.ONE, GL.ONE, GL.ONE);
    }
    
    Gg() {
      this.gl.depthMask(false);
      this.gl.enable(GL.DEPTH_TEST);
      this.gl.enable(GL.BLEND);
      this.gl.blendFunc(GL.ONE_MINUS_DST_ALPHA, GL.ONE);
    }

    Ia(a: Pe, passIndex: number) {
      var c = a.F.length;
      var viewMatrix = this.gl.viewMatrix;
      for (var f = 0; f < c; f++) {
        var l: lk = a.mc(f);
        if (l.dirty) {
          var frameID = l.ka.name;
          var texture = this.gl.getTextureAtlasByFrameID(frameID);
          var frame = texture.getFrame(frameID);
          var cxform = l.getColorTransform();
          var samplerIndex = +l.atlasID;
          var overflowType = l.ka.fillMode;
          var width = texture.width;
          var height = texture.height;
          this.modelViewMatrix.identity();
          this.modelViewMatrix.multiply(viewMatrix);
          this.modelViewMatrix.multiply(l.getTransform());
          var uniformValues = l.getUniforms(this._id);
          var samplers = [];
          samplers[0] = 2 * Math.floor(samplerIndex / 2);
          samplers[1] = samplers[0] + 1;
          samplerIndex %= 2;
          if (!uniformValues) {
            uniformValues = [
              new UniformValue(this.uniformMap.uMVMatrix, this.modelViewMatrix.values),
              new UniformValue(this.uniformMap.uSamplers, samplers),
              new UniformValue(this.uniformMap.uSamplerIndex, [samplerIndex]),
              new UniformValue(this.uniformMap.uColorXformMultiplier, [cxform.redMultiplier, cxform.greenMultiplier, cxform.blueMultiplier, cxform.alphaMultiplier]),
              new UniformValue(this.uniformMap.uColorXformOffset, [cxform.redOffset / 255, cxform.greenOffset / 255, cxform.blueOffset / 255, cxform.alphaOffset / 255]),
              new UniformValue(this.uniformMap.uOverflowTypeAndPassIndex, [overflowType, passIndex]),
              new UniformValue(this.uniformMap.uFrame, [frame.left / width, frame.top / height, frame.width / width, frame.height / height])
            ];
          } else {
            uniformValues[0].value = this.modelViewMatrix.values;
            uniformValues[1].value = samplers;
            uniformValues[2].value = [samplerIndex];
            uniformValues[3].value = [cxform.redMultiplier, cxform.greenMultiplier, cxform.blueMultiplier, cxform.alphaMultiplier];
            uniformValues[4].value = [cxform.redOffset / 255, cxform.greenOffset / 255, cxform.blueOffset / 255, cxform.alphaOffset / 255];
            uniformValues[5].value = [overflowType, passIndex];
            uniformValues[6].value = [frame.left / width, frame.top / height, frame.width / width, frame.height / height];
          }
          l.setUniforms(this._id, uniformValues);
        }
      }
      if (a.F.length > 0) {
        this.gl.draw(this, a.mc(0).ka.attributeDefsArray, a.F);
      }
    }

    setup(): boolean {
      this.vertexShaderSrc =
        "attribute vec2 aVertexPosition; \n" +
        "attribute vec2 aLoopBlinnTextureCoord; \n" +
        "attribute vec2 aTextureCoord; \n" +
        "attribute float aIsConvex; \n" +
        "uniform mat4 uMVMatrix; \n" +
        "varying vec4 vTexCoord; \n" +
        "varying float vIsConvex; \n" +
        "void main(void) { \n" +
          "gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0); \n" +
          "vTexCoord = vec4(aLoopBlinnTextureCoord, aTextureCoord); \n" +
          "vIsConvex = aIsConvex; \n" +
        "}";
      this.fragmentShaderSrc =
        "#extension GL_OES_standard_derivatives : enable \n" +
        "precision mediump float; \n" +
        "varying vec4 vTexCoord; \n" +
        "varying float vIsConvex; \n" +
        "uniform vec4 uColorXformMultiplier; \n" +
        "uniform vec4 uColorXformOffset; \n" +
        "uniform sampler2D uSamplers[2]; \n" +
        "uniform int uSamplerIndex; \n" +
        "uniform ivec2 uOverflowTypeAndPassIndex; \n" +
        "uniform vec4 uFrame; \n" +
        "void main(void) { \n" +
          "vec2 px = dFdx(vTexCoord.xy); \n" +
          "vec2 py = dFdy(vTexCoord.xy); \n" +
          "vec2 f = (2.0 * vTexCoord.x) * vec2(px.x, py.x) - vec2(px.y, py.y); \n" +
          "float sd = vIsConvex * (vTexCoord.x * vTexCoord.x - vTexCoord.y) / length(f); \n" +
          "float alpha = min(0.5 - sd, 1.0); \n" +
          "float t = max(1.0 - float(uOverflowTypeAndPassIndex.y), 0.0); \n" +
          "if (alpha < t || alpha == 0.0 || (uOverflowTypeAndPassIndex.y == 1 && alpha == 1.0)) \n" +
            "discard; \n" +
          "vec2 uv; \n" +
          "if (uOverflowTypeAndPassIndex.x == 0) { /* solid fill */ \n" +
            "uv = vTexCoord.zw; \n" +
          "} else if (uOverflowTypeAndPassIndex.x == 1) { /* gradient and bitmap fill with overflow type extend */ \n" +
            "uv = clamp(vTexCoord.zw, vec2(0.0, 0.0), vec2(1.0, 1.0)) * uFrame.zw + uFrame.xy; \n" +
          "} else if (uOverflowTypeAndPassIndex.x == 2) { /* gradient and bitmap fill with overflow type repeat */ \n" +
            "uv = fract(vTexCoord.zw) * uFrame.zw + uFrame.xy; \n" +
          "} else if (uOverflowTypeAndPassIndex.x == 3) { /* gradient fill with overflow type reflect */ \n" +
            "uv = vTexCoord.zw; \n" +
            "if (uv.s > 1.0) { \n" +
              "float integerPart = floor(uv.s); \n" +
              "float fracPart = mod(uv.s, 1.0); \n" +
              "float odd = mod(integerPart, 2.0); \n" +
              "if (odd == 1.0) { /* if the uv.s lies on the odd number of band towards the right side */ \n" +
                "uv.s = 1.0 - fracPart; \n" +
              "} else { /* if the uv.s lies on the even number of band towards the right side */ \n" +
                "uv.s = fracPart; \n" +
              "} \n" +
            "} else if (uv.s < 0.0) { \n" +
              "float integerPart = floor(uv.s); \n" +
              "float fracPart = mod(uv.s, 1.0); \n" +
              "float odd = mod(integerPart, 2.0); \n" +
              "if (integerPart == 0.0) { /* special case for left side */ \n" +
                "uv.s = fracPart; \n" +
              "} else if (odd == 1.0) { /* if the uv.s lies on the odd number of band towards the left side */ \n" +
                "uv.s = 1.0 - fracPart; \n" +
              "} else { /* if the uv.s lies on the even number of band towards the left side */ \n" +
                "uv.s = fracPart; \n" +
              "} \n" +
            "} \n" +
            "uv = (uFrame.xy + (uv * uFrame.zw)); \n" +
          "} \n" +
          "vec4 c = texture2D(uSamplers[0], uv); \n" +
          "if (uSamplerIndex == 1) {\n" +
            "c = texture2D(uSamplers[1], uv); \n" +
          "} \n" +
          "c = c * uColorXformMultiplier + uColorXformOffset; \n" +
          "c.a = c.a * alpha; \n" +
          "if (uOverflowTypeAndPassIndex.y == 2) {\n" +
            "c.rgb = c.rgb * c.a; \n" +
          "} \n" +
          "gl_FragColor = c; \n" +
        "}";
      this.vertexShader = this.gl.createShader(GL.VERTEX_SHADER, this.vertexShaderSrc);
      this.fragmentShader = this.gl.createShader(GL.FRAGMENT_SHADER, this.fragmentShaderSrc);
      this.program = this.gl.createProgram();
      this.gl.attachShader(this.program, this.vertexShader);
      this.gl.attachShader(this.program, this.fragmentShader);
      this._id = this.gl.linkProgram(this.program);
      if (this._id < 0) {
        this.gl.deleteProgram(this.program);
        Logger.error("Program linking failed.")
        return false;
      }
      var ul0 = this.gl.getUniformLocation(this.program, "uMVMatrix");
      var ul1 = this.gl.getUniformLocation(this.program, "uSamplers");
      var ul2 = this.gl.getUniformLocation(this.program, "uSamplerIndex");
      var ul3 = this.gl.getUniformLocation(this.program, "uColorXformMultiplier");
      var ul4 = this.gl.getUniformLocation(this.program, "uColorXformOffset");
      var ul5 = this.gl.getUniformLocation(this.program, "uOverflowTypeAndPassIndex");
      var ul6 = this.gl.getUniformLocation(this.program, "uFrame");
      var u0 = new Uniform(ul0, GL.FLOAT_MAT4, 1, Uniform.Jd);
      var u1 = new Uniform(ul1, GL.SAMPLER_2D, this.ao, Uniform.Q);
      var u2 = new Uniform(ul2, GL.INT, 1, Uniform.Q);
      var u3 = new Uniform(ul3, GL.FLOAT_VEC4, 1, Uniform.Q);
      var u4 = new Uniform(ul4, GL.FLOAT_VEC4, 1, Uniform.Q);
      var u5 = new Uniform(ul5, GL.INT_VEC2, 1, Uniform.Q);
      var u6 = new Uniform(ul6, GL.FLOAT_VEC4, 1, Uniform.Q);
      this._uniforms = new Uniforms([ u0, u1, u2, u3, u4, u5, u6 ]);
      this.uniformMap = {
        uMVMatrix: u0,
        uSamplers: u1,
        uSamplerIndex: u2,
        uColorXformMultiplier: u3,
        uColorXformOffset: u4,
        uOverflowTypeAndPassIndex: u5,
        uFrame: u6
      };
      var al0 = this.gl.getAttribLocation(this.program, "aVertexPosition");
      var al1 = this.gl.getAttribLocation(this.program, "aLoopBlinnTextureCoord");
      var al2 = this.gl.getAttribLocation(this.program, "aIsConvex");
      var al3 = this.gl.getAttribLocation(this.program, "aTextureCoord");
      var a0 = new Attribute(al0, "POSITION0", GL.FLOAT, 2);
      var a1 = new Attribute(al1, "TEXCOORD0", GL.FLOAT, 2);
      var a2 = new Attribute(al2, "TEXCOORD1", GL.FLOAT, 1);
      var a3 = new Attribute(al3, "TEXCOORD2", GL.FLOAT, 2);
      this._attribs = new Attributes([ a0, a1, a2, a3 ]);
      return true;
    }

    destroy() {
      this.gl.deleteShader(this.vertexShader);
      this.gl.deleteShader(this.fragmentShader);
      this.gl.deleteProgram(this.program)
    }
  }
}
