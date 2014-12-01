var flwebgl;
(function (flwebgl) {
    var util;
    (function (util) {
        var Utils = (function () {
            function Utils() {
            }
            Utils.isUndefined = function (object) {
                return typeof object === "undefined";
            };
            return Utils;
        })();
        util.Utils = Utils;
    })(util = flwebgl.util || (flwebgl.util = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var Utils = flwebgl.util.Utils;
    (function (AAType) {
        AAType[AAType["MSAA"] = 0] = "MSAA";
        AAType[AAType["ImageSpace"] = 1] = "ImageSpace";
    })(flwebgl.AAType || (flwebgl.AAType = {}));
    var AAType = flwebgl.AAType;
    var PlayerOptions = (function () {
        function PlayerOptions(options) {
            if (options === void 0) { options = {}; }
            this.logErrors = false;
            this.caching = true;
            this.cachingOptions = {};
            this.cacheAsBitmap = true;
            this.antialias = 1 /* ImageSpace */;
            if (!Utils.isUndefined(options[PlayerOptions.kOption_LogErrors])) {
                this.logErrors = !!options[PlayerOptions.kOption_LogErrors];
            }
            if (!Utils.isUndefined(options[PlayerOptions.kOption_Caching])) {
                if (options[PlayerOptions.kOption_Caching] instanceof Object) {
                    this.caching = true;
                    this.cachingOptions = options[PlayerOptions.kOption_Caching];
                }
                else {
                    this.caching = !!options[PlayerOptions.kOption_Caching];
                }
            }
            if (!Utils.isUndefined(options[PlayerOptions.kOption_CacheAsBitmap])) {
                this.cacheAsBitmap = !!options[PlayerOptions.kOption_CacheAsBitmap];
            }
            if (!Utils.isUndefined(options[PlayerOptions.kOption_AAType])) {
                switch (options[PlayerOptions.kOption_AAType] | 0) {
                    case 0 /* MSAA */:
                        this.antialias = 0 /* MSAA */;
                        break;
                    case 1 /* ImageSpace */:
                        this.antialias = 1 /* ImageSpace */;
                        break;
                }
            }
        }
        PlayerOptions.kOption_LogErrors = 0;
        PlayerOptions.kOption_AAType = 1;
        PlayerOptions.kOption_Caching = 2;
        PlayerOptions.kOption_CacheAsBitmap = 10;
        PlayerOptions.kOption_StandardDerivatives = 11;
        return PlayerOptions;
    })();
    flwebgl.PlayerOptions = PlayerOptions;
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var geom;
    (function (geom) {
        var Color = (function () {
            function Color(red, blue, green, alpha) {
                if (alpha === void 0) { alpha = 255; }
                this.red = 0;
                this.blue = 0;
                this.green = 0;
                this.alpha = 0;
                this.red = red;
                this.blue = blue;
                this.green = green;
                this.alpha = alpha;
            }
            Color.prototype.equals = function (color) {
                return (this.red === color.red) && (this.green === color.green) && (this.blue === color.blue) && (this.alpha === color.alpha);
            };
            return Color;
        })();
        geom.Color = Color;
    })(geom = flwebgl.geom || (flwebgl.geom = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var geom;
    (function (geom) {
        var Rect = (function () {
            function Rect(left, top, width, height) {
                if (left === void 0) { left = 0; }
                if (top === void 0) { top = 0; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                this.left = 0;
                this.top = 0;
                this.width = 0;
                this.height = 0;
                this.isEmpty = true;
                if (arguments.length >= 2) {
                    this.left = left;
                    this.top = top;
                    this.width = width;
                    this.height = height;
                    this.isEmpty = false;
                }
            }
            Rect.prototype.intersects = function (a) {
                if (this.isEmpty || a.isEmpty) {
                    return false;
                }
                else {
                    return (a.left <= this.left + this.width) && (a.left + a.width >= this.left) && (a.top <= this.top + this.height) && (a.top + a.height >= this.top);
                }
            };
            return Rect;
        })();
        geom.Rect = Rect;
    })(geom = flwebgl.geom || (flwebgl.geom = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var geom;
    (function (geom) {
        var Matrix = (function () {
            function Matrix(values) {
                this._isIdentity = false;
                this.setValues = function (values) {
                    if (values && values.length >= 6) {
                        this.values[0] = +values[0];
                        this.values[1] = +values[1];
                        this.values[4] = +values[2];
                        this.values[5] = +values[3];
                        this.values[12] = +values[4];
                        this.values[13] = +values[5];
                        this.setIsIdentity();
                    }
                };
                this.identity();
                if (values && values.length >= 6) {
                    this.setValues(values);
                }
            }
            Object.defineProperty(Matrix.prototype, "isIdentity", {
                get: function () {
                    return this._isIdentity;
                },
                enumerable: true,
                configurable: true
            });
            Matrix.prototype.setIsIdentity = function () {
                this._isIdentity = (this.values[0] === 1) && (this.values[1] === 0) && (this.values[4] === 0) && (this.values[5] === 1) && (this.values[12] === 0) && (this.values[13] === 0);
            };
            Matrix.prototype.identity = function () {
                this.values = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
                this._isIdentity = true;
                return this;
            };
            return Matrix;
        })();
        geom.Matrix = Matrix;
    })(geom = flwebgl.geom || (flwebgl.geom = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var RenderTarget = (function () {
            function RenderTarget(id, texture, frameBuffer, renderBuffer) {
                this._id = id;
                this._texture = texture;
                this._frameBuffer = frameBuffer;
                this._renderBuffer = renderBuffer;
            }
            Object.defineProperty(RenderTarget.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RenderTarget.prototype, "texture", {
                get: function () {
                    return this._texture;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RenderTarget.prototype, "frameBuffer", {
                get: function () {
                    return this._frameBuffer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RenderTarget.prototype, "renderBuffer", {
                get: function () {
                    return this._renderBuffer;
                },
                enumerable: true,
                configurable: true
            });
            return RenderTarget;
        })();
        e.RenderTarget = RenderTarget;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var TextureAtlas = (function () {
            function TextureAtlas(id, imageURL, width, height) {
                this._id = id;
                this._imageURL = imageURL;
                this._width = width;
                this._height = height;
                this._frames = {};
            }
            Object.defineProperty(TextureAtlas.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureAtlas.prototype, "imageURL", {
                get: function () {
                    return this._imageURL;
                },
                enumerable: true,
                configurable: true
            });
            TextureAtlas.prototype.setFrame = function (id, frame) {
                this._frames[id] = frame;
            };
            TextureAtlas.prototype.getFrame = function (id) {
                return this._frames[id];
            };
            return TextureAtlas;
        })();
        e.TextureAtlas = TextureAtlas;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (_e) {
        var Ck = (function () {
            function Ck() {
                this.rd = {};
            }
            Ck.prototype.setGL = function (value) {
                this.gl = value;
            };
            Ck.prototype.Vg = function (a, b) {
                this.Oa = a;
                this.Uc = b;
                this.gc = 0;
                var c = a.ta[0].totalSize;
                if (!this.rd[c]) {
                    var size = _e.GL.MAX_VERTICES * this.Oa.ta[0].totalSize * Float32Array.BYTES_PER_ELEMENT;
                    var buffer = this.gl.createBuffer();
                    this.gl.bindBuffer(_e.GL.ARRAY_BUFFER, buffer);
                    this.gl.bufferData(_e.GL.ARRAY_BUFFER, size, _e.GL.DYNAMIC_DRAW);
                    this.oe();
                    this.rd[c] = buffer;
                }
                this.Cg = this.rd[c];
                this.kb = [];
            };
            Ck.prototype.Zg = function () {
                if (this.Cg !== this.gl.getBoundBuffer(_e.GL.ARRAY_BUFFER)) {
                    this.gl.bindBuffer(_e.GL.ARRAY_BUFFER, this.Cg);
                    this.oe();
                }
                var a = [];
                var b = 0;
                var p = this.Oa.ta[0].totalSize;
                for (var e = 0; e < this.kb.length; e++) {
                }
                return a;
            };
            Ck.prototype.upload = function (a) {
                if (this.gc + a.sa() > _e.GL.MAX_VERTICES) {
                    return false;
                }
                this.kb.push(a);
                this.gc += a.sa();
                return true;
            };
            Ck.prototype.destroy = function () {
                for (var a in this.rd) {
                    this.gl.deleteBuffer(this.rd[a]);
                }
                this.Cg = this.kb = this.rd = void 0;
            };
            Ck.prototype.oe = function () {
                var a = this.Oa.ta;
                for (var b = 0; b < a.length; ++b) {
                    var c = a[b];
                    var e = c.attrs;
                    c = c.totalSize;
                    for (var d = 0; d < e.length; ++d) {
                        var l = this.Uc.getAttribs(e[d].pc);
                        this.gl.kc(l.location);
                        this.gl.vertexAttribPointer(l.location, l.size, l.type, l.Hf, c, e[d].byteOffset);
                    }
                }
            };
            return Ck;
        })();
        _e.Ck = Ck;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (_e) {
        var Color = flwebgl.geom.Color;
        var Matrix = flwebgl.geom.Matrix;
        var GL = (function () {
            function GL(canvas, options) {
                this.ei = {};
                this.textureMap = {};
                this.logErrors = options.logErrors;
                var contextIDs = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
                for (var i = 0; i < contextIDs.length; i++) {
                    try {
                        this.ctx = canvas.getContext(contextIDs[i], {
                            alpha: false,
                            premultipliedAlpha: false,
                            antialias: (options.antialias === 0 /* MSAA */)
                        });
                        this.ctx.clearColor(1, 1, 1, 1);
                        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
                    }
                    catch (error) {
                    }
                    if (this.ctx) {
                        break;
                    }
                }
                if (!this.ctx) {
                    throw Error();
                }
                this.initStatics();
                this.init();
                this.textureAtlases = [];
                this.vao = this.getExtension("OES_vertex_array_object");
                if (!this.hasExtension("OES_standard_derivatives")) {
                }
                this.renderTarget = new _e.RenderTarget();
                this.bufferCache = {};
                this.activeTextureMap = {};
                this.ii = options.caching;
                this.fb = new _e.Ck();
                this.fb.setGL(this);
                this.uniformsCache = {};
                this.programIDCounter = 0;
            }
            GL.prototype.getViewport = function () {
                return this.viewport;
            };
            GL.prototype.setViewport = function (rect, flipY) {
                if (flipY === void 0) { flipY = true; }
                var multY = flipY ? -1 : 1;
                this.viewport = rect;
                this.ctx.viewport(rect.left, rect.top, rect.width, rect.height);
                this.viewMatrix = new Matrix([2 / rect.width, 0, 0, 2 * multY / rect.height, -1, -1 * multY]);
            };
            GL.prototype.loadTextures = function (textureAtlases, callback) {
                this.textureAtlases = textureAtlases;
                this._loadTextures(textureAtlases, callback);
            };
            GL.prototype.getTextureAtlas = function (id) {
                for (var i = 0; i < this.textureAtlases.length; i++) {
                    if (this.textureAtlases[i].id === id) {
                        return this.textureAtlases[i];
                    }
                }
                return null;
            };
            GL.prototype.getTextureAtlasByFrameID = function (id) {
                for (var i = 0; i < this.textureAtlases.length; i++) {
                    if (this.textureAtlases[i].getFrame(id)) {
                        return this.textureAtlases[i];
                    }
                }
                return null;
            };
            GL.prototype.getTexture = function (id) {
                return this.textureMap[id];
            };
            GL.prototype.activateTexture = function (id) {
                this.activeTextureMap[id] = id;
                this.ctx.activeTexture(GL.TEXTURE0 + +id);
            };
            GL.prototype.deactivateTexture = function (id) {
                delete this.activeTextureMap[id];
            };
            GL.prototype.createTexture = function () {
                return this.ctx.createTexture();
            };
            GL.prototype.bindTexture = function (a, texture) {
                this.ctx.bindTexture(a, texture);
            };
            GL.prototype.deleteTexture = function (texture) {
                this.ctx.deleteTexture(texture);
            };
            GL.prototype.deleteTextures = function () {
                for (var id in this.textureMap) {
                    if (this.textureMap[id]) {
                        this.ctx.deleteTexture(this.textureMap[id]);
                    }
                }
                this.textureMap = {};
            };
            GL.prototype.texImage2D = function (target, level, internalFormat, format, type, image) {
                this.ctx.texImage2D(target, level, internalFormat, format, type, image);
            };
            GL.prototype.texImage2D_WidthHeight = function (target, internalFormat, width, height, format, type) {
                this.ctx.texImage2D(target, 0, internalFormat, width, height, 0, format, type, null);
            };
            GL.prototype.texParameteri = function (target, pname, param) {
                this.ctx.texParameteri(target, pname, param);
            };
            GL.prototype.pixelStorei = function (pname, param) {
                this.ctx.pixelStorei(pname, param);
            };
            GL.prototype._loadTextures = function (textureAtlases, callback) {
                var d = 0;
                var self = this;
                var textureCount = textureAtlases.length;
                for (var i = 0; i < textureCount; i++) {
                    var image = new Image();
                    var texture = this.createTexture();
                    var textureAtlas = textureAtlases[i];
                    image.onload = function () {
                        self.bindTexture(GL.TEXTURE_2D, self.textureMap[this.id]);
                        self.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, this);
                        self.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                        self.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
                        self.pixelStorei(GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
                        self.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
                        self.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
                        self.bindTexture(GL.TEXTURE_2D, null);
                        if (++d === textureCount) {
                            callback();
                        }
                    };
                    image.src = textureAtlas.imageURL;
                    image.id = textureAtlas.id;
                    this.textureMap[textureAtlas.id] = texture;
                }
            };
            GL.prototype.createRenderTarget = function (width, height, format, internalFormat) {
                if (format === void 0) { format = GL.RGBA; }
                if (internalFormat === void 0) { internalFormat = GL.DEPTH_COMPONENT16; }
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
                    if (!this.bufferCache[internalFormat]) {
                        this.bufferCache[internalFormat] = [];
                    }
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
                var renderTarget = new _e.RenderTarget(textureID, texture, frameBuffer, renderBuffer);
                this.activateTexture(textureID);
                this.bindTexture(GL.TEXTURE_2D, texture);
                this.texImage2D_WidthHeight(GL.TEXTURE_2D, format, width, height, format, GL.UNSIGNED_BYTE);
                this.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                this.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
                this.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
                this.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
                var textureAtlas = new _e.TextureAtlas(textureID, void 0, width, height);
                this.textureMap[textureID] = renderTarget.texture;
                this.textureAtlases.push(textureAtlas);
                this.bindTexture(GL.TEXTURE_2D, null);
                this.deactivateTexture(textureID);
                return renderTarget;
            };
            GL.prototype.init = function () {
                this.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
                this.enable(GL.BLEND);
                this.depthFunc(GL.LESS);
                this.setBackgroundColor(new Color(255, 255, 255, 0));
                this.clearDepth(1);
                this.disable(GL.CULL_FACE);
                this.depthMask(true);
                this.setDepthTest(true);
            };
            GL.prototype.setUniforms = function (shader, c) {
                var d = c.getUniforms(shader.id);
                var e = this.uniformsCache[shader.id];
                if (!e) {
                    e = this.uniformsCache[shader.id] = {};
                }
                for (var k = 0; k < d.length; ++k) {
                    var n = e[k];
                    var f = d[k].value;
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
            };
            GL.prototype.getRenderTarget = function () {
                return this.renderTarget;
            };
            GL.prototype.activateRenderTarget = function (renderTarget) {
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
            };
            GL.prototype.activateRenderTargetTexture = function (renderTarget) {
                this.activateTexture(renderTarget.id);
                this.bindTexture(GL.TEXTURE_2D, renderTarget.texture);
                return renderTarget.id;
            };
            GL.prototype.deleteRenderTargetTexture = function (renderTarget) {
                if (renderTarget && renderTarget.texture) {
                    this.deleteTexture(renderTarget.texture);
                    delete this.textureMap[renderTarget.id];
                }
            };
            GL.prototype.e = function (shader, h, c) {
            };
            GL.prototype.createFramebuffer = function () {
                return this.ctx.createFramebuffer();
            };
            GL.prototype.bindFramebuffer = function (target, frameBuffer) {
                this.ctx.bindFramebuffer(target, frameBuffer);
            };
            GL.prototype.deleteFramebuffer = function (frameBuffer) {
                this.ctx.deleteFramebuffer(frameBuffer);
            };
            GL.prototype.createRenderbuffer = function () {
                return this.ctx.createRenderbuffer();
            };
            GL.prototype.bindRenderbuffer = function (target, renderBuffer) {
                this.ctx.bindRenderbuffer(target, renderBuffer);
            };
            GL.prototype.deleteRenderbuffer = function (renderBuffer) {
                this.ctx.deleteRenderbuffer(renderBuffer);
            };
            GL.prototype.renderbufferStorage = function (target, internalFormat, width, height) {
                this.ctx.renderbufferStorage(target, internalFormat, width, height);
            };
            GL.prototype.framebufferTexture2D = function (target, attachment, textureTarget, texture, level) {
                this.ctx.framebufferTexture2D(target, attachment, textureTarget, texture, level);
            };
            GL.prototype.framebufferRenderbuffer = function (target, attachment, renderBufferTarget, renderBuffer) {
                this.ctx.framebufferRenderbuffer(target, attachment, renderBufferTarget, renderBuffer);
            };
            GL.prototype.drawElements = function (count) {
                this.ctx.drawElements(this.ctx.TRIANGLES, count, this.ctx.UNSIGNED_SHORT, 0);
            };
            GL.prototype.drawArrays = function (mode, first, count) {
                this.ctx.drawArrays(mode, first, count);
            };
            GL.prototype.bufferData = function (target, size, usage) {
                this.ctx.bufferData(target, size, usage);
            };
            GL.prototype.bufferSubData = function (target, offset, data) {
                this.ctx.bufferSubData(target, offset, data);
            };
            GL.prototype.setBackgroundColor = function (color) {
                this.backgroundColor = color;
                this.clearColor(color.red / 255, color.green / 255, color.blue / 255, color.alpha / 255);
            };
            GL.prototype.getBackgroundColor = function () {
                return this.backgroundColor;
            };
            GL.prototype.clearColor = function (red, green, blue, alpha) {
                this.ctx.clearColor(red, green, blue, alpha);
            };
            GL.prototype.clear = function (colorBuffer, depthBuffer, stencilBuffer) {
                var mask = 0;
                if (colorBuffer) {
                    mask |= this.ctx.COLOR_BUFFER_BIT;
                }
                if (depthBuffer) {
                    mask |= this.ctx.DEPTH_BUFFER_BIT;
                }
                if (stencilBuffer) {
                    mask |= this.ctx.STENCIL_BUFFER_BIT;
                }
                if (mask) {
                    this.ctx.clear(mask);
                }
            };
            GL.prototype.blendFunc = function (sfactor, dfactor) {
                this.ctx.blendFunc(sfactor, dfactor);
            };
            GL.prototype.blendFuncSeparate = function (srcRGB, dstRGB, srcAlpha, dstAlpha) {
                this.ctx.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
            };
            GL.prototype.enable = function (capability) {
                this.ctx.enable(capability);
            };
            GL.prototype.disable = function (capability) {
                this.ctx.disable(capability);
            };
            GL.prototype.scissor = function (rect) {
                this.ctx.scissor(rect.left, rect.top, rect.width, rect.height);
            };
            GL.prototype.depthMask = function (flag) {
                this.ctx.depthMask(flag);
            };
            GL.prototype.depthFunc = function (func) {
                this.ctx.depthFunc(func);
            };
            GL.prototype.clearDepth = function (depth) {
                this.ctx.clearDepth(depth);
            };
            GL.prototype.setDepthTest = function (value) {
                if (value !== this.depthTestEnabled) {
                    if (value) {
                        this.ctx.enable(this.ctx.DEPTH_TEST);
                    }
                    else {
                        this.ctx.disable(this.ctx.DEPTH_TEST);
                    }
                    this.depthTestEnabled = value;
                }
            };
            GL.prototype.createShader = function (type, source) {
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
                }
                else {
                    if (this.ctx.getShaderParameter(shader, this.ctx.COMPILE_STATUS)) {
                        return shader;
                    }
                    else {
                        return null;
                    }
                }
            };
            GL.prototype.deleteShader = function (shader) {
                this.ctx.deleteShader(shader);
            };
            GL.prototype.createProgram = function () {
                return this.ctx.createProgram();
            };
            GL.prototype.deleteProgram = function (program) {
                this.ctx.deleteProgram(program);
            };
            GL.prototype.attachShader = function (program, shader) {
                this.ctx.attachShader(program, shader);
            };
            GL.prototype.linkProgram = function (program) {
                this.ctx.linkProgram(program);
                var hasError = this.hasError();
                var linkStatus = this.ctx.getProgramParameter(program, this.ctx.LINK_STATUS);
                if (!linkStatus || hasError) {
                }
                return (!hasError && linkStatus) ? this.programIDCounter++ : -1;
            };
            GL.prototype.useProgram = function (program) {
                this.ctx.useProgram(program);
            };
            GL.prototype.bindAttribLocation = function (program, index, name) {
                this.ctx.bindAttribLocation(program, index, name);
            };
            GL.prototype.getAttribLocation = function (program, name) {
                return this.ctx.getAttribLocation(program, name);
            };
            GL.prototype.kc = function (index) {
                this.ctx.enableVertexAttribArray(index);
            };
            GL.prototype.vertexAttribPointer = function (index, size, type, normalized, stride, offset) {
                this.ctx.vertexAttribPointer(index, size, type, normalized, stride, offset);
            };
            GL.prototype.getUniformLocation = function (program, name) {
                return this.ctx.getUniformLocation(program, name);
            };
            GL.prototype.uniformMatrix4fv = function (location, transpose, value) {
                this.ctx.uniformMatrix4fv(location, transpose, value);
            };
            GL.prototype.uniform2fv = function (location, value) {
                this.ctx.uniform2fv(location, value);
            };
            GL.prototype.uniform4fv = function (location, value) {
                this.ctx.uniform4fv(location, value);
            };
            GL.prototype.uniform1i = function (location, value) {
                this.ctx.uniform1i(location, value);
            };
            GL.prototype.uniform1iv = function (location, value) {
                this.ctx.uniform1iv(location, value);
            };
            GL.prototype.uniform2iv = function (location, value) {
                this.ctx.uniform2iv(location, value);
            };
            GL.prototype.createBuffer = function () {
                var buffer = this.ctx.createBuffer();
                return this.hasError() ? null : buffer;
            };
            GL.prototype.deleteBuffer = function (buffer) {
                this.ctx.deleteBuffer(buffer);
            };
            GL.prototype.bindBuffer = function (target, buffer) {
                this.ctx.bindBuffer(target, buffer);
                this.ei["" + target] = buffer;
            };
            GL.prototype.getBoundBuffer = function (target) {
                return this.ei["" + target];
            };
            GL.prototype.flush = function () {
                this.ctx.flush();
            };
            GL.prototype.createVertexArrayOES = function () {
                if (this.vao) {
                    return this.vao.createVertexArrayOES();
                }
            };
            GL.prototype.bindVertexArrayOES = function (a) {
                if (this.vao) {
                    this.vao.bindVertexArrayOES(a);
                }
            };
            GL.prototype.deleteVertexArrayOES = function (a) {
                if (this.vao) {
                    this.vao.deleteVertexArrayOES(a);
                }
            };
            GL.prototype.getExtension = function (name) {
                return this.ctx.getExtension(name);
            };
            GL.prototype.hasExtension = function (name) {
                name = name.toLowerCase();
                var names = this.ctx.getSupportedExtensions();
                for (var i = 0; i < names.length; i++) {
                    if (names[i].toLowerCase() === name) {
                        return true;
                    }
                }
                return false;
            };
            GL.prototype.getError = function () {
                if (!this.logErrors) {
                    return this.ctx.NO_ERROR;
                }
                var error = this.ctx.getError();
                if (error != this.ctx.NO_ERROR) {
                }
                return error;
            };
            GL.prototype.hasError = function () {
                return (this.getError() != this.ctx.NO_ERROR);
            };
            GL.prototype.destroy = function () {
                this.deleteTextures();
                for (var id in this.bufferCache) {
                    var bufferItems = this.bufferCache[id];
                    for (var i = 0; i < bufferItems.length; i++) {
                        this.deleteRenderbuffer(bufferItems[i].renderBuffer);
                        this.deleteFramebuffer(bufferItems[i].frameBuffer);
                    }
                }
            };
            GL.prototype.initStatics = function () {
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
            };
            GL.MAX_VERTICES = 65532;
            GL.MAX_TEXTURE_SIZE = 2048;
            return GL;
        })();
        _e.GL = GL;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var shaders;
        (function (shaders) {
            var ShaderImageSpace = (function () {
                function ShaderImageSpace() {
                    console.log("ShaderImageSpace");
                }
                ShaderImageSpace.prototype.setGL = function (gl) {
                    this.gl = gl;
                };
                ShaderImageSpace.prototype.destroy = function () {
                };
                return ShaderImageSpace;
            })();
            shaders.ShaderImageSpace = ShaderImageSpace;
        })(shaders = e.shaders || (e.shaders = {}));
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var shaders;
        (function (shaders) {
            var ShaderImageSpaceStdDev = (function () {
                function ShaderImageSpaceStdDev() {
                    console.log("ShaderImageSpaceStdDev");
                }
                ShaderImageSpaceStdDev.prototype.setGL = function (gl) {
                    this.gl = gl;
                };
                ShaderImageSpaceStdDev.prototype.destroy = function () {
                };
                return ShaderImageSpaceStdDev;
            })();
            shaders.ShaderImageSpaceStdDev = ShaderImageSpaceStdDev;
        })(shaders = e.shaders || (e.shaders = {}));
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var renderers;
        (function (renderers) {
            var ShaderImageSpace = flwebgl.e.shaders.ShaderImageSpace;
            var ShaderImageSpaceStdDev = flwebgl.e.shaders.ShaderImageSpaceStdDev;
            var RendererImageSpace = (function () {
                function RendererImageSpace() {
                    this.fe = 0;
                }
                RendererImageSpace.prototype.setGL = function (gl) {
                    this.gl = gl;
                    this.shader = gl.hasExtension("OES_standard_derivatives") ? new ShaderImageSpaceStdDev() : new ShaderImageSpace();
                    this.Ab = [];
                    this.vg = [];
                    this.fe = 0;
                    this.Ue = {};
                    this.We = {};
                    return this.shader.setGL(gl) ? this.Ve.setGL(gl) : false;
                };
                RendererImageSpace.prototype.destroy = function () {
                };
                return RendererImageSpace;
            })();
            renderers.RendererImageSpace = RendererImageSpace;
        })(renderers = e.renderers || (e.renderers = {}));
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var renderers;
        (function (renderers) {
            var RendererMSAA = (function () {
                function RendererMSAA() {
                }
                RendererMSAA.prototype.setGL = function (value) {
                    this.gl = value;
                };
                RendererMSAA.prototype.destroy = function () {
                };
                return RendererMSAA;
            })();
            renderers.RendererMSAA = RendererMSAA;
        })(renderers = e.renderers || (e.renderers = {}));
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var RendererMSAA = flwebgl.e.renderers.RendererMSAA;
        var RendererImageSpace = flwebgl.e.renderers.RendererImageSpace;
        var Renderer = (function () {
            function Renderer(canvas, options) {
                this.gl = new e.GL(canvas, options);
                this.rg = (options.antialias === 0 /* MSAA */) ? new RendererMSAA() : new RendererImageSpace();
                this.oa = [];
            }
            Renderer.prototype.setGL = function () {
                this.rg.setGL(this.gl);
            };
            Renderer.prototype.getViewport = function () {
                return this.gl.getViewport();
            };
            Renderer.prototype.setViewport = function (rect, flipY) {
                if (flipY === void 0) { flipY = true; }
                this.gl.setViewport(rect, flipY);
            };
            Renderer.prototype.getBackgroundColor = function () {
                return this.gl.getBackgroundColor();
            };
            Renderer.prototype.setBackgroundColor = function (color) {
                this.gl.setBackgroundColor(color);
            };
            Renderer.prototype.depthMask = function (flag) {
                this.gl.depthMask(flag);
            };
            Renderer.prototype.depthFunc = function (func) {
                this.gl.depthFunc(func);
            };
            Renderer.prototype.clearDepth = function (depth) {
                this.gl.clearDepth(depth);
            };
            Renderer.prototype.setDepthTest = function (value) {
                this.gl.setDepthTest(value);
            };
            Renderer.prototype.blendFunc = function (sfactor, dfactor) {
                this.gl.blendFunc(sfactor, dfactor);
            };
            Renderer.prototype.clear = function (colorBuffer, depthBuffer, stencilBuffer) {
                if (depthBuffer === void 0) { depthBuffer = false; }
                if (stencilBuffer === void 0) { stencilBuffer = false; }
                this.gl.clear(colorBuffer, depthBuffer, stencilBuffer);
            };
            Renderer.prototype.enable = function (capability) {
                this.gl.enable(capability);
            };
            Renderer.prototype.disable = function (capability) {
                this.gl.disable(capability);
            };
            Renderer.prototype.scissor = function (rect) {
                this.gl.scissor(rect);
            };
            Renderer.prototype.ij = function (a) {
                if (a === void 0) { a = Renderer.Hj; }
                switch (a) {
                    case Renderer.Hj:
                        this.Kg = this.rg;
                        break;
                    case Renderer.Gj:
                        if (this.ie === void 0) {
                            this.ie.setGL(this.gl);
                        }
                        this.Kg = this.ie;
                        break;
                }
            };
            Renderer.prototype.lj = function () {
                this.init();
                this.Kg.e(this.oa);
                for (var i = 0; i < this.oa.length; i++) {
                    this.oa[i].setDirty(false);
                }
                this.oa.length = 0;
            };
            Renderer.prototype.e = function (a) {
                this.oa.push(a);
            };
            Renderer.prototype.createRenderTarget = function (width, height) {
                return this.gl.createRenderTarget(width, height);
            };
            Renderer.prototype.activateRenderTarget = function (renderTarget) {
                return this.gl.activateRenderTarget(renderTarget);
            };
            Renderer.prototype.getRenderTarget = function () {
                return this.gl.getRenderTarget();
            };
            Renderer.prototype.deleteRenderTargetTexture = function (renderTarget) {
                this.gl.deleteRenderTargetTexture(renderTarget);
            };
            Renderer.prototype.loadTextures = function (textureAtlases, callback) {
                this.gl.loadTextures(textureAtlases, callback);
            };
            Renderer.prototype.hasExtension = function (name) {
                return this.gl.hasExtension(name);
            };
            Renderer.prototype.flush = function () {
                this.gl.flush();
            };
            Renderer.prototype.init = function () {
            };
            Renderer.prototype.destroy = function () {
                this.rg.destroy();
                this.ie.destroy();
                this.gl.destroy();
                this.Kg = null;
                this.H = null;
            };
            Renderer.Hj = 0;
            Renderer.Gj = 1;
            return Renderer;
        })();
        e.Renderer = Renderer;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var Mesh = (function () {
            function Mesh(id) {
                this.id = id;
            }
            Mesh.prototype.getID = function () {
                return this.id;
            };
            return Mesh;
        })();
        e.Mesh = Mesh;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var B;
    (function (B) {
        var Utils = flwebgl.util.Utils;
        var Timeline = (function () {
            function Timeline(id, name, linkageName, isScene, labels, scripts) {
                this._id = id;
                this._name = name;
                this._linkageName = linkageName;
                this._isScene = isScene;
                this._labels = labels;
                this.commands = [];
                this.scripts = {};
                for (var i = 0; i < scripts.length; i++) {
                    var script = scripts[i];
                    var frameIdx = script.frameNum - 1;
                    if (Utils.isUndefined(this.scripts[frameIdx])) {
                        this.scripts[frameIdx] = [script.functionName];
                    }
                    else {
                        this.scripts[frameIdx].push(script.functionName);
                    }
                }
            }
            Object.defineProperty(Timeline.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timeline.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timeline.prototype, "linkageName", {
                get: function () {
                    return this._linkageName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timeline.prototype, "isScene", {
                get: function () {
                    return this._isScene;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timeline.prototype, "labels", {
                get: function () {
                    return this._labels;
                },
                enumerable: true,
                configurable: true
            });
            Timeline.prototype.getFrameScriptNames = function (frameIdx) {
                return this.scripts[frameIdx] ? this.scripts[frameIdx] : [];
            };
            Timeline.prototype.getFrameCommands = function (frameIdx) {
                return (frameIdx < this.commands.length) ? this.commands[frameIdx] : [];
            };
            Timeline.prototype.addFrameCommands = function (commands) {
                this.commands.push(commands);
            };
            return Timeline;
        })();
        B.Timeline = Timeline;
    })(B = flwebgl.B || (flwebgl.B = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var util;
    (function (util) {
        var AssetPool = (function () {
            function AssetPool() {
                this.meshMap = {};
                this.timelineMap = {};
                this.textureAtlasMap = {};
                this.soundMap = {};
                this.nextAvailableAssetID = -1;
            }
            AssetPool.prototype.setMesh = function (mesh) {
                this.meshMap[mesh.getID()] = mesh;
            };
            AssetPool.prototype.getMesh = function (id) {
                return this.meshMap[id];
            };
            AssetPool.prototype.getMeshes = function () {
                var meshes = [];
                var i = 0;
                for (var id in this.meshMap) {
                    meshes[i++] = this.meshMap[id];
                }
                return meshes;
            };
            AssetPool.prototype.removeMesh = function (id) {
                delete this.meshMap[id];
            };
            AssetPool.prototype.setTimeline = function (timeline) {
                this.timelineMap[timeline.id] = timeline;
            };
            AssetPool.prototype.getTimeline = function (id) {
                return this.timelineMap[id];
            };
            AssetPool.prototype.getTimelines = function () {
                var timelines = [];
                var i = 0;
                for (var id in this.timelineMap) {
                    timelines[i++] = this.timelineMap[id];
                }
                return timelines;
            };
            AssetPool.prototype.getTimelineByName = function (linkageName) {
                for (var id in this.timelineMap) {
                    var timeline = this.timelineMap[id];
                    if (timeline.linkageName === linkageName) {
                        return timeline;
                    }
                }
            };
            AssetPool.prototype.removeTimeline = function (id) {
                delete this.timelineMap[id];
            };
            AssetPool.prototype.setTextureAtlas = function (textureAtlas) {
                this.textureAtlasMap[textureAtlas.id] = textureAtlas;
            };
            AssetPool.prototype.getTextureAtlas = function (id) {
                return this.textureAtlasMap[id];
            };
            AssetPool.prototype.getTextureAtlases = function () {
                var textureAtlases = [];
                var i = 0;
                for (var id in this.textureAtlasMap) {
                    textureAtlases[i++] = this.textureAtlasMap[id];
                }
                return textureAtlases;
            };
            AssetPool.prototype.destroy = function () {
                var id;
                for (id in this.meshMap) {
                    this.removeMesh(id);
                }
                for (id in this.timelineMap) {
                    this.removeTimeline(id);
                }
            };
            return AssetPool;
        })();
        util.AssetPool = AssetPool;
    })(util = flwebgl.util || (flwebgl.util = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var Renderer = flwebgl.e.Renderer;
    var AssetPool = flwebgl.util.AssetPool;
    var Player = (function () {
        function Player() {
            this.assetPool = new AssetPool();
        }
        Player.prototype.init = function (canvas, content, textures, callback, options) {
            if (options === void 0) { options = {}; }
            if (!canvas || !content) {
                return Player.E_INVALID_PARAM;
            }
            this.canvas = canvas;
            this.options = new flwebgl.PlayerOptions(options);
            try {
                this.renderer = new Renderer(canvas, options);
            }
            catch (error) {
                return Player.E_CONTEXT_CREATION_FAILED;
            }
        };
        Player.S_OK = 0;
        Player.E_ERR = 1;
        Player.E_INVALID_PARAM = 2;
        Player.E_CONTEXT_CREATION_FAILED = 3;
        Player.E_REQUIRED_EXTENSION_NOT_PRESENT = 4;
        Player.E_RESOURCE_LOADING_FAILED = 5;
        return Player;
    })();
    flwebgl.Player = Player;
})(flwebgl || (flwebgl = {}));
