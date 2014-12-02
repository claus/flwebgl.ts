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
    var util;
    (function (util) {
        var Color = flwebgl.geom.Color;
        var Utils = (function () {
            function Utils() {
            }
            Utils.isUndefined = function (object) {
                return typeof object === "undefined";
            };
            Utils.getColor = function (color) {
                var red = parseInt(color.substring(1, 3), 16);
                var green = parseInt(color.substring(3, 5), 16);
                var blue = parseInt(color.substring(5, 7), 16);
                var alpha = (color.length > 7) ? parseInt(color.substring(7), 16) : 255;
                return new Color(red, green, blue, alpha);
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
            this.emulateStandardDerivatives = false;
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
            Rect.prototype.intersects = function (rect) {
                if (this.isEmpty || rect.isEmpty) {
                    return false;
                }
                else {
                    return (rect.left <= this.left + this.width) && (rect.left + rect.width >= this.left) && (rect.top <= this.top + this.height) && (rect.top + rect.height >= this.top);
                }
            };
            Rect.prototype.copy = function (rect) {
                this.left = rect.left;
                this.top = rect.top;
                this.width = rect.width;
                this.height = rect.height;
                this.isEmpty = rect.isEmpty;
            };
            Rect.prototype.union = function (rect) {
                if (this.isEmpty) {
                    this.copy(rect);
                }
                else if (!rect.isEmpty) {
                    var right = this.left + this.width;
                    var bottom = this.top + this.height;
                    this.left = Math.min(this.left, rect.left);
                    this.top = Math.min(this.top, rect.top);
                    this.width = Math.max(right, rect.left + rect.width) - this.left;
                    this.height = Math.max(bottom, rect.top + rect.height) - this.top;
                }
            };
            Rect.prototype.expand = function (x, y) {
                if (this.isEmpty) {
                    this.left = x;
                    this.top = y;
                    this.isEmpty = false;
                }
                else {
                    var right = this.left + this.width;
                    var bottom = this.top + this.height;
                    this.left = Math.min(this.left, x);
                    this.top = Math.min(this.top, y);
                    this.width = Math.max(right, x) - this.left;
                    this.height = Math.max(bottom, y) - this.top;
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
        var Point = (function () {
            function Point(x, y) {
                this.x = x;
                this.y = y;
            }
            Point.prototype.add = function (point) {
                var p = new Point(this.x, this.y);
                p.x += point.x;
                p.y += point.y;
                return p;
            };
            Point.prototype.sub = function (point) {
                var p = new Point(this.x, this.y);
                p.x -= point.x;
                p.y -= point.y;
                return p;
            };
            return Point;
        })();
        geom.Point = Point;
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
            Matrix.prototype.isInvertible = function () {
                return this._isIdentity ? true : this.values[1] * this.values[4] - this.values[0] * this.values[5] !== 0;
            };
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
            Matrix.prototype.equals = function (matrix) {
                return this.values[0] == matrix.values[0] && this.values[1] == matrix.values[1] && this.values[4] == matrix.values[4] && this.values[5] == matrix.values[5] && this.values[12] == matrix.values[12] && this.values[13] == matrix.values[13] && this.values[10] == matrix.values[10];
            };
            Matrix.prototype.getValues = function () {
                return [
                    this.values[0],
                    this.values[1],
                    this.values[4],
                    this.values[5],
                    this.values[12],
                    this.values[13]
                ];
            };
            Matrix.prototype.clone = function () {
                return (new Matrix()).copy(this);
            };
            Matrix.prototype.copy = function (matrix) {
                for (var i = 0; i < 16; i++) {
                    this.values[i] = matrix.values[i];
                }
                this._isIdentity = matrix.isIdentity;
                return this;
            };
            Matrix.prototype.concat = function (matrix) {
                if (this._isIdentity) {
                    if (matrix.isIdentity) {
                        this.values[10] *= matrix.values[10];
                        return this;
                    }
                    this.values[0] = matrix.values[0];
                    this.values[1] = matrix.values[1];
                    this.values[4] = matrix.values[4];
                    this.values[5] = matrix.values[5];
                    this.values[12] = matrix.values[12];
                    this.values[13] = matrix.values[13];
                    this.values[10] *= matrix.values[10];
                    this._isIdentity = matrix.isIdentity;
                    return this;
                }
                if (matrix.isIdentity) {
                    this.values[10] *= matrix.values[10];
                    return this;
                }
                var a = matrix.values[0] * this.values[0] + matrix.values[4] * this.values[1];
                var b = matrix.values[1] * this.values[0] + matrix.values[5] * this.values[1];
                var c = matrix.values[0] * this.values[4] + matrix.values[4] * this.values[5];
                var d = matrix.values[1] * this.values[4] + matrix.values[5] * this.values[5];
                var tx = matrix.values[0] * this.values[12] + matrix.values[4] * this.values[13] + matrix.values[12];
                var ty = matrix.values[1] * this.values[12] + matrix.values[5] * this.values[13] + matrix.values[13];
                this.values[0] = a;
                this.values[1] = b;
                this.values[4] = c;
                this.values[5] = d;
                this.values[12] = tx;
                this.values[13] = ty;
                this.values[10] = matrix.values[10] * this.values[10];
                return this;
            };
            Matrix.prototype.multiply = function (matrix) {
                if (this._isIdentity) {
                    if (matrix.isIdentity) {
                        this.values[10] *= matrix.values[10];
                    }
                    else {
                        this.values[0] = matrix.values[0];
                        this.values[1] = matrix.values[1];
                        this.values[4] = matrix.values[4];
                        this.values[5] = matrix.values[5];
                        this.values[12] = matrix.values[12];
                        this.values[13] = matrix.values[13];
                        this.values[10] *= matrix.values[10];
                        this._isIdentity = matrix.isIdentity;
                    }
                }
                else if (matrix.isIdentity) {
                    this.values[10] *= matrix.values[10];
                }
                else {
                    var a = this.values[0] * matrix.values[0] + this.values[4] * matrix.values[1];
                    var b = this.values[1] * matrix.values[0] + this.values[5] * matrix.values[1];
                    var c = this.values[0] * matrix.values[4] + this.values[4] * matrix.values[5];
                    var d = this.values[1] * matrix.values[4] + this.values[5] * matrix.values[5];
                    var tx = this.values[0] * matrix.values[12] + this.values[4] * matrix.values[13] + this.values[12];
                    var ty = this.values[1] * matrix.values[12] + this.values[5] * matrix.values[13] + this.values[13];
                    this.values[0] = a;
                    this.values[1] = b;
                    this.values[4] = c;
                    this.values[5] = d;
                    this.values[12] = tx;
                    this.values[13] = ty;
                    this.values[10] = this.values[10] * matrix.values[10];
                }
            };
            Matrix.prototype.transformPoint = function (point) {
                return new geom.Point(this.values[0] * point.x + this.values[4] * point.y + this.values[12], this.values[1] * point.x + this.values[5] * point.y + this.values[13]);
            };
            Matrix.prototype.transformBoundsAABB = function (rect) {
                var p = new geom.Point(rect.left, rect.top);
                var tl = this.transformPoint(p);
                p.x = rect.left + rect.width;
                var tr = this.transformPoint(p);
                p.y = rect.top + rect.height;
                var br = this.transformPoint(p);
                p.x = rect.left;
                var bl = this.transformPoint(p);
                var p1x = Math.min(tl.x, tr.x, br.x, bl.x);
                var p2x = Math.max(tl.x, tr.x, br.x, bl.x);
                var p1y = Math.min(tl.y, tr.y, br.y, bl.y);
                var p2y = Math.max(tl.y, tr.y, br.y, bl.y);
                return new geom.Rect(p1x, p1y, p2x - p1x, p2y - p1y);
            };
            Matrix.prototype.invert = function () {
                if (this._isIdentity) {
                    return this;
                }
                var a = this.values[0];
                var b = this.values[1];
                var c = this.values[4];
                var d = this.values[5];
                var tx = this.values[12];
                var ty = this.values[13];
                var det = b * c - a * d;
                if (det == 0) {
                    this.identity();
                    return this;
                }
                this.identity();
                this.values[0] = -d / det;
                this.values[1] = b / det;
                this.values[4] = c / det;
                this.values[5] = -a / det;
                this.values[12] = (tx * d - ty * c) / det;
                this.values[13] = (ty * a - tx * b) / det;
                this._isIdentity = false;
                return this;
            };
            Matrix.prototype.translate = function (tx, ty) {
                this.values[12] += tx;
                this.values[13] += ty;
                if (this.values[12] !== 0 || this.values[13] !== 0) {
                    this._isIdentity = false;
                }
                return this;
            };
            Matrix.prototype.setValue = function (column, row, value) {
                this.values[4 * row + column] = value;
                if (column !== 2 && row !== 2) {
                    this._isIdentity = false;
                }
            };
            Matrix.prototype.getValue = function (column, row) {
                return this.values[4 * row + column];
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
            Object.defineProperty(TextureAtlas.prototype, "width", {
                get: function () {
                    return this._width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureAtlas.prototype, "height", {
                get: function () {
                    return this._height;
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
    var media;
    (function (media) {
        var SoundFactory = (function () {
            function SoundFactory() {
            }
            return SoundFactory;
        })();
        media.SoundFactory = SoundFactory;
    })(media = flwebgl.media || (flwebgl.media = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var VertexAttribute = (function () {
            function VertexAttribute(byteOffset, name, type, size) {
                this.byteOffset = byteOffset;
                this.name = name;
                this.type = type;
                this.size = size;
            }
            return VertexAttribute;
        })();
        e.VertexAttribute = VertexAttribute;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var VertexAttributes = (function () {
            function VertexAttributes(attrs, totalSize) {
                if (attrs === void 0) { attrs = []; }
                if (totalSize === void 0) { totalSize = 0; }
                this.attrs = attrs;
                this.totalSize = totalSize;
            }
            return VertexAttributes;
        })();
        e.VertexAttributes = VertexAttributes;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var VertexData = (function () {
            function VertexData(vertices, vertexAttributes) {
                this.vertices = vertices;
                this.vertexAttributes = vertexAttributes;
            }
            return VertexData;
        })();
        e.VertexData = VertexData;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var VertexAttributesArray = (function () {
            function VertexAttributesArray() {
                this.ta = [];
            }
            return VertexAttributesArray;
        })();
        e.VertexAttributesArray = VertexAttributesArray;
        var ca = (function () {
            function ca(name, isOpaque) {
                this.name = name;
                this.isOpaque = isOpaque;
                this.fillMode = 0;
                this.vertexDataMap = {};
                this.he = new VertexAttributesArray();
            }
            Object.defineProperty(ca.prototype, "id", {
                get: function () {
                    return -1;
                },
                enumerable: true,
                configurable: true
            });
            ca.prototype.getVertexData = function (atlasID) {
                return (atlasID != undefined) ? this.vertexDataMap[atlasID] : void 0;
            };
            ca.prototype.setVertexData = function (atlasID, vertexData) {
                this.vertexDataMap[atlasID] = vertexData;
                for (var i = 0; i < vertexData.length; i++) {
                    this.he.ta.push(vertexData[i].vertexAttributes);
                }
            };
            ca.prototype.setIndices = function (indices) {
                this.indices = new Uint16Array(indices);
            };
            ca.prototype.sa = function () {
                return this.indices.length;
            };
            ca.prototype.getAtlasIDs = function () {
                var atlasIDs = [];
                for (var atlasID in this.vertexDataMap) {
                    atlasIDs.push(atlasID);
                }
                return atlasIDs;
            };
            ca.kFill_Extend = "Extend";
            ca.kFill_Repeat = "Repeat";
            ca.kFill_Reflect = "Reflect";
            ca.fillModeMap = {
                Extend: 1,
                Repeat: 2,
                Reflect: 3
            };
            return ca;
        })();
        e.ca = ca;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var Rect = flwebgl.geom.Rect;
        var Mesh = (function () {
            function Mesh(id) {
                this._id = id;
                this.fd = {};
                this.fd[Mesh.INTERNAL] = [];
                this.fd[Mesh.EXTERNAL] = [];
                this.fd[Mesh.bb] = [];
            }
            Object.defineProperty(Mesh.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Mesh.prototype.Nb = function (edgeType, h) {
                this.fd[edgeType].push(h);
            };
            Mesh.prototype.yf = function (edgeType, i) {
                if (i < this.ra(edgeType)) {
                    return this.fd[edgeType][i];
                }
            };
            Mesh.prototype.ra = function (edgeType) {
                return this.fd[edgeType].length;
            };
            Mesh.prototype.calculateBounds = function () {
                this.bounds = new Rect();
                var count = this.ra(Mesh.EXTERNAL);
                for (var i = 0; i < count; i++) {
                    var yf = this.yf(Mesh.EXTERNAL, i);
                    var atlasIDs = yf.getAtlasIDs();
                    var vertexDataArr = yf.getVertexData(atlasIDs[0]);
                    for (var j = 0; j < vertexDataArr.length; j++) {
                        var vertexData = vertexDataArr[j];
                        var attrs = vertexData.vertexAttributes.attrs;
                        for (var k = 0; k < attrs.length; ++k) {
                            var attr = attrs[k];
                            if (attr.name === "POSITION0") {
                                var vertices = vertexData.vertices;
                                var stride = vertexData.vertexAttributes.totalSize / Float32Array.BYTES_PER_ELEMENT;
                                for (var l = attr.byteOffset / Float32Array.BYTES_PER_ELEMENT; l < vertices.length; l += stride) {
                                    this.bounds.expand(vertices[l], vertices[l + 1]);
                                }
                                break;
                            }
                        }
                    }
                }
            };
            Mesh.INTERNAL = "1";
            Mesh.EXTERNAL = "2";
            Mesh.bb = "3";
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
                this.meshMap[mesh.id] = mesh;
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
    var geom;
    (function (geom) {
        var Matrix3x3 = (function () {
            function Matrix3x3(matrix) {
                this.values = Array(9);
                if (matrix instanceof Matrix3x3) {
                    this.copy(matrix);
                }
                else if (matrix instanceof Array && matrix.length == 9) {
                    this.copyValues(matrix);
                }
                else {
                    this.identity();
                }
            }
            Matrix3x3.prototype.identity = function () {
                this.values = [1, 0, 0, 0, 1, 0, 0, 0, 1];
            };
            Matrix3x3.prototype.copy = function (matrix) {
                for (var i = 0; i < 9; i++) {
                    this.values[i] = matrix.values[i];
                }
            };
            Matrix3x3.prototype.concat = function (matrix) {
                var v0 = this.values[0] * matrix.values[0] + this.values[3] * matrix.values[1] + this.values[6] * matrix.values[2];
                var v1 = this.values[1] * matrix.values[0] + this.values[4] * matrix.values[1] + this.values[7] * matrix.values[2];
                var v2 = this.values[2] * matrix.values[0] + this.values[5] * matrix.values[1] + this.values[8] * matrix.values[2];
                var v3 = this.values[0] * matrix.values[3] + this.values[3] * matrix.values[4] + this.values[6] * matrix.values[5];
                var v4 = this.values[1] * matrix.values[3] + this.values[4] * matrix.values[4] + this.values[7] * matrix.values[5];
                var v5 = this.values[2] * matrix.values[3] + this.values[5] * matrix.values[4] + this.values[8] * matrix.values[5];
                var v6 = this.values[0] * matrix.values[6] + this.values[3] * matrix.values[7] + this.values[6] * matrix.values[8];
                var v7 = this.values[1] * matrix.values[6] + this.values[4] * matrix.values[7] + this.values[7] * matrix.values[8];
                var v8 = this.values[2] * matrix.values[6] + this.values[5] * matrix.values[7] + this.values[8] * matrix.values[8];
                this.values[0] = v0;
                this.values[1] = v1;
                this.values[2] = v2;
                this.values[3] = v3;
                this.values[4] = v4;
                this.values[5] = v5;
                this.values[6] = v6;
                this.values[7] = v7;
                this.values[8] = v8;
            };
            Matrix3x3.prototype.transformPoint = function (point) {
                return new geom.Point(this.values[0] * point.x + this.values[3] * point.y + this.values[6], this.values[1] * point.x + this.values[4] * point.y + this.values[7]);
            };
            Matrix3x3.prototype.invert = function () {
                var v0 = this.values[0];
                var v1 = this.values[1];
                var v3 = this.values[3];
                var v4 = this.values[4];
                var v6 = this.values[6];
                var v7 = this.values[7];
                var det = v0 * (v4 - v7) + v3 * (v7 - v1) + v6 * (v1 - v4);
                if (det !== 0) {
                    this.values[0] = v4 - v7;
                    this.values[1] = v7 - v1;
                    this.values[2] = v1 - v4;
                    this.values[3] = v6 - v3;
                    this.values[4] = v0 - v6;
                    this.values[5] = v3 - v0;
                    this.values[6] = v3 * v7 - v6 * v4;
                    this.values[7] = v6 * v1 - v0 * v7;
                    this.values[8] = v0 * v4 - v3 * v1;
                    this.divide(det);
                }
            };
            Matrix3x3.prototype.divide = function (divisor) {
                this.values[0] /= divisor;
                this.values[1] /= divisor;
                this.values[2] /= divisor;
                this.values[3] /= divisor;
                this.values[4] /= divisor;
                this.values[5] /= divisor;
                this.values[6] /= divisor;
                this.values[7] /= divisor;
                this.values[8] /= divisor;
            };
            Matrix3x3.prototype.copyValues = function (values) {
                for (var i = 0; i < 9; i++) {
                    this.values[i] = values[i];
                }
            };
            return Matrix3x3;
        })();
        geom.Matrix3x3 = Matrix3x3;
    })(geom = flwebgl.geom || (flwebgl.geom = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var TextureAtlas = (function () {
        function TextureAtlas(textureJSON, imageURL) {
            this.textureJSON = textureJSON;
            this.imageURL = imageURL;
        }
        return TextureAtlas;
    })();
    flwebgl.TextureAtlas = TextureAtlas;
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var xj;
    (function (xj) {
        var parsers;
        (function (parsers) {
            var Mesh = flwebgl.e.Mesh;
            var ParserRelease = (function () {
                function ParserRelease(content, parser, assetPool) {
                    this.content = content;
                    this.parser = parser;
                    this.assetPool = assetPool;
                    this.ac = -1;
                }
                ParserRelease.prototype.parseSounds = function () {
                    return true;
                };
                ParserRelease.prototype.parseFills = function () {
                    var fills = this.content[ParserRelease.kFills];
                    if (fills.length === 0) {
                        return true;
                    }
                    this.fillIDNameMap = {};
                    this.fillNameIsOpaqueMap = {};
                    this.fillNameStyleMap = {};
                    for (var i = 0; i < fills.length; i++) {
                        var fill = fills[i];
                        var id = "" + fill[0];
                        var style = fill[1];
                        var name = fill[2];
                        var isOpaque = (fill[3] == "T");
                        this.fillIDNameMap[id] = name;
                        this.fillNameIsOpaqueMap[name] = isOpaque;
                        this.fillNameStyleMap[name] = style;
                    }
                    return true;
                };
                ParserRelease.prototype.parseShapes = function () {
                    var shapes = this.content[ParserRelease.kShapes];
                    if (shapes.length === 0) {
                        return true;
                    }
                    for (var i = 0; i < shapes.length; i++) {
                        var shape = shapes[i];
                        var meshAsset = new Mesh(shape[0]);
                        for (var j = 1; j < shape.length; j++) {
                            var mesh = shape[j];
                            var id = mesh[0];
                            var vertices = mesh[1];
                            var internalIndices = mesh[2];
                            var edgeIndices = mesh[3];
                            var concaveCurveIndices = mesh[4];
                            var convexCurveIndices = mesh[5];
                            var fillMatrix = [];
                            var fillOverflow = "";
                            var fillIsBitmapClipped = false;
                            var fillName = this.fillIDNameMap[id];
                            var fillIsOpaque = this.fillNameIsOpaqueMap[fillName];
                            var fillStyle = this.fillNameStyleMap[fillName];
                            switch (fillStyle) {
                                case ParserRelease.kLinearGradient:
                                    fillMatrix = mesh[6];
                                    fillOverflow = mesh[7];
                                    break;
                                case ParserRelease.kBitmap:
                                    fillMatrix = mesh[6];
                                    fillIsBitmapClipped = mesh[7];
                                    break;
                            }
                            var f = this.parser.If(vertices, fillName, fillStyle, fillMatrix, fillOverflow, fillIsBitmapClipped, fillIsOpaque, internalIndices);
                            var q = this.parser.If(vertices, fillName, fillStyle, fillMatrix, fillOverflow, fillIsBitmapClipped, fillIsOpaque, [], concaveCurveIndices, convexCurveIndices, edgeIndices);
                            var t = this.parser.dj(vertices, concaveCurveIndices, convexCurveIndices, edgeIndices, fillName, fillStyle, fillIsOpaque, fillMatrix, fillOverflow, fillIsBitmapClipped);
                            var k;
                            if (f.length) {
                                for (k = 0; k < f.length; k++) {
                                    meshAsset.Nb(Mesh.INTERNAL, f[k]);
                                }
                            }
                            if (q.length) {
                                for (k = 0; k < q.length; k++) {
                                    meshAsset.Nb(Mesh.EXTERNAL, q[k]);
                                }
                            }
                            if (t && t.length) {
                                for (k = 0; k < t.length; k++) {
                                    meshAsset.Nb(Mesh.bb, t[k]);
                                }
                            }
                        }
                        meshAsset.calculateBounds();
                        this.assetPool.setMesh(meshAsset);
                    }
                    return true;
                };
                ParserRelease.prototype.parseTimelines = function () {
                    return true;
                };
                ParserRelease.kSolid = "s";
                ParserRelease.kLinearGradient = "lG";
                ParserRelease.kBitmap = "b";
                ParserRelease.kFills = "fills";
                ParserRelease.kShapes = "shapes";
                ParserRelease.kTimelines = "timelines";
                ParserRelease.kSounds = "sounds";
                ParserRelease.kSrc = "src";
                return ParserRelease;
            })();
            parsers.ParserRelease = ParserRelease;
        })(parsers = xj.parsers || (xj.parsers = {}));
    })(xj = flwebgl.xj || (flwebgl.xj = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var xj;
    (function (xj) {
        var parsers;
        (function (parsers) {
            var ParserDebug = (function () {
                function ParserDebug(content, parser, assetPool) {
                }
                ParserDebug.prototype.parseSounds = function () {
                    return true;
                };
                ParserDebug.prototype.parseFills = function () {
                    return true;
                };
                ParserDebug.prototype.parseShapes = function () {
                    return true;
                };
                ParserDebug.prototype.parseTimelines = function () {
                    return true;
                };
                ParserDebug.kSolid = "solid";
                ParserDebug.kLinearGradient = "linearGradient";
                ParserDebug.kBitmap = "bitmap";
                ParserDebug.kId = "id";
                ParserDebug.kName = "name";
                ParserDebug.kLinkageName = "linkageName";
                ParserDebug.kIsScene = "isScene";
                ParserDebug.kLabels = "labels";
                ParserDebug.kFrameNum = "frameNum";
                ParserDebug.kFills = "fills";
                ParserDebug.kStyle = "style";
                ParserDebug.kIsOpaque = "isOpaque";
                ParserDebug.kShapes = "shapes";
                ParserDebug.kMeshes = "meshes";
                ParserDebug.kInternalIndices = "internalIndices";
                ParserDebug.kConcaveCurveIndices = "concaveCurveIndices";
                ParserDebug.kConvexCurveIndices = "convexCurveIndices";
                ParserDebug.kEdgeIndices = "edgeIndices";
                ParserDebug.kVertices = "vertices";
                ParserDebug.kFillId = "fillId";
                ParserDebug.kFillMatrix = "fillMatrix";
                ParserDebug.kOverflow = "overflow";
                ParserDebug.kIsBitmapClipped = "isBitmapClipped";
                ParserDebug.kTimelines = "timelines";
                ParserDebug.kScripts = "scripts";
                ParserDebug.kScript = "script";
                ParserDebug.kFrames = "frames";
                ParserDebug.kSounds = "sounds";
                ParserDebug.kSrc = "src";
                ParserDebug.kFramesCmds = "frameCmds";
                return ParserDebug;
            })();
            parsers.ParserDebug = ParserDebug;
        })(parsers = xj.parsers || (xj.parsers = {}));
    })(xj = flwebgl.xj || (flwebgl.xj = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var xj;
    (function (xj) {
        var Point = flwebgl.geom.Point;
        var Rect = flwebgl.geom.Rect;
        var Matrix = flwebgl.geom.Matrix;
        var Matrix3x3 = flwebgl.geom.Matrix3x3;
        var Utils = flwebgl.util.Utils;
        var GL = flwebgl.e.GL;
        var ca = flwebgl.e.ca;
        var Mesh = flwebgl.e.Mesh;
        var TextureAtlas = flwebgl.e.TextureAtlas;
        var VertexData = flwebgl.e.VertexData;
        var VertexAttribute = flwebgl.e.VertexAttribute;
        var VertexAttributes = flwebgl.e.VertexAttributes;
        var ParserRelease = flwebgl.xj.parsers.ParserRelease;
        var ParserDebug = flwebgl.xj.parsers.ParserDebug;
        var StageInfo = (function () {
            function StageInfo(width, height, color, frameRate, loop, timelines) {
                this.width = width;
                this.height = height;
                this.color = color;
                this.frameRate = frameRate;
                this.loop = loop;
                this.timelines = timelines;
            }
            return StageInfo;
        })();
        xj.StageInfo = StageInfo;
        var BufferData = (function () {
            function BufferData(vertices, indices) {
                if (vertices === void 0) { vertices = []; }
                if (indices === void 0) { indices = []; }
                this.vertices = vertices;
                this.indices = indices;
            }
            return BufferData;
        })();
        xj.BufferData = BufferData;
        var Parser = (function () {
            function Parser(assetPool) {
                this.assetPool = assetPool;
            }
            Parser.prototype.init = function (content, textures, options) {
                if (textures) {
                    for (var i = 0; i < textures.length; i++) {
                        var texture = textures[i];
                        if (!this.parseTextureAtlas(texture.textureJSON, texture.imageURL, "" + i)) {
                            return null;
                        }
                    }
                }
                return this.parse(content, options);
            };
            Parser.prototype.parse = function (content, options) {
                if (typeof content === "string") {
                    content = JSON.parse(content);
                }
                var header = content[Parser.kHeader];
                var stageSize = header[Parser.kStageSize];
                var stageInfo = new StageInfo(stageSize[Parser.kWidth], stageSize[Parser.kHeight], Utils.getColor(header[Parser.kStageColor]), header[Parser.kFrameRate], header[Parser.kLoop], header[Parser.kSceneTimelines]);
                var p = (header[Parser.kReadable] == true) ? new ParserDebug(content, this, this.assetPool) : new ParserRelease(content, this, this.assetPool);
                this.enableCacheAsBitmap = options.cacheAsBitmap;
                this.emulateStandardDerivatives = options.emulateStandardDerivatives;
                this.S = this.emulateStandardDerivatives ? 11 : 7;
                if (!p.parseSounds() || !p.parseFills()) {
                    return stageInfo;
                }
                this.vertexAttributes = new VertexAttributes();
                var y = new VertexAttribute(0, "POSITION0", GL.FLOAT, 2);
                var w = new VertexAttribute(2 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD0", GL.FLOAT, 2);
                var t = new VertexAttribute(4 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD1", GL.FLOAT, 1);
                var q = new VertexAttribute(5 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD2", GL.FLOAT, 2);
                if (this.emulateStandardDerivatives) {
                    var r = new VertexAttribute(7 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD3", GL.FLOAT, 2);
                    var u = new VertexAttribute(9 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD4", GL.FLOAT, 2);
                    this.vertexAttributes.attrs = [y, w, t, q, r, u];
                }
                else {
                    this.vertexAttributes.attrs = [y, w, t, q];
                }
                this.vertexAttributes.totalSize = this.S * Float32Array.BYTES_PER_ELEMENT;
                if (!p.parseShapes() || !p.parseTimelines()) {
                    return stageInfo;
                }
                return stageInfo;
            };
            Parser.prototype.parseTextureAtlas = function (textureJSON, imageURL, atlasID) {
                if (!textureJSON) {
                    return false;
                }
                var frames = textureJSON[Parser.kFrames];
                if (!frames) {
                    return false;
                }
                var width = textureJSON[Parser.kMeta][Parser.kSize][Parser.kW];
                var height = textureJSON[Parser.kMeta][Parser.kSize][Parser.kH];
                var textureAtlas = new TextureAtlas(atlasID, imageURL, width, height);
                for (var id in frames) {
                    var frame = frames[id][Parser.kFrame];
                    var rect = new Rect(frame[Parser.kX] + 1, frame[Parser.kY] + 1, frame[Parser.kW] - 2, frame[Parser.kH] - 2);
                    textureAtlas.setFrame(id, rect);
                }
                this.assetPool.setTextureAtlas(textureAtlas);
                return true;
            };
            Parser.prototype.If = function (vertices, fillName, fillStyle, fillMatrix, fillOverflow, fillIsBitmapClipped, fillIsOpaque, internalIndices, concaveCurveIndices, convexCurveIndices, edgeIndices) {
                if (internalIndices === void 0) { internalIndices = []; }
                if (concaveCurveIndices === void 0) { concaveCurveIndices = []; }
                if (convexCurveIndices === void 0) { convexCurveIndices = []; }
                if (edgeIndices === void 0) { edgeIndices = []; }
                if (internalIndices.length == 0 && concaveCurveIndices.length == 0 && convexCurveIndices.length == 0 && edgeIndices.length == 0) {
                    return [];
                }
                var C = [];
                var bufferDataArray;
                var edgeType;
                if (internalIndices.length > 0) {
                    edgeType = Mesh.INTERNAL;
                    bufferDataArray = this.createInternalBuffers(vertices, internalIndices);
                }
                else {
                    edgeType = Mesh.EXTERNAL;
                    bufferDataArray = this.createExternalBuffers(vertices, concaveCurveIndices, convexCurveIndices, edgeIndices);
                }
                for (var i = 0; i < bufferDataArray.length; i++) {
                    var bufferData = bufferDataArray[i];
                    var u = new ca(fillName, fillIsOpaque);
                    var r = this.injectLoopBlinnTexCoords(bufferData, fillName, fillStyle, fillMatrix);
                    for (var atlasID in r) {
                        var fillVertices = r[atlasID];
                        if (this.emulateStandardDerivatives) {
                            this.injectStandardDerivativeTexCoords(edgeType, fillVertices, bufferData.indices.length);
                        }
                        u.setVertexData(atlasID, [new VertexData(new Float32Array(fillVertices), this.vertexAttributes)]);
                        u.setIndices(bufferData.indices);
                    }
                    u.fillMode = this.getFillMode(fillStyle, fillOverflow, fillIsBitmapClipped);
                    C.push(u);
                }
                return C;
            };
            Parser.prototype.dj = function (vertices, concaveCurveIndices, convexCurveIndices, edgeIndices, fillName, fillStyle, fillIsOpaque, fillMatrix, fillOverflow, fillIsBitmapClipped) {
                var C = 0;
                var v = 0;
                var B = 0;
                var I = 0;
                var X = [];
                var index0, index1, index2;
                var vertex0, vertex1, vertex2;
                var p1x, p1y, p2x, p2y;
                var p1len, p2len;
                var U = 3 * Math.floor(GL.MAX_VERTICES / 6);
                var count = concaveCurveIndices.length + convexCurveIndices.length + edgeIndices.length;
                while (C < count) {
                    var A = C;
                    C = (count - C > U) ? C + U : count;
                    var L = C - A;
                    var resVertices = [];
                    var resIndices = [];
                    var indexOffs = 0;
                    var vertexOffs = 0;
                    var W = this.ec(7);
                    var x = B;
                    B = (B < convexCurveIndices.length) ? ((convexCurveIndices.length - B < L) ? convexCurveIndices.length : B + L) : B;
                    L = L - (B - x);
                    var curIndices = convexCurveIndices;
                    var texCoord0 = this.ec(0);
                    var texCoord1 = this.ec(1);
                    var texCoord2 = this.ec(2);
                    for (; x < B; x += 3) {
                        index0 = curIndices[x];
                        index1 = curIndices[x + 1];
                        index2 = curIndices[x + 2];
                        vertex0 = new Point(vertices[2 * index0], vertices[2 * index0 + 1]);
                        vertex1 = new Point(vertices[2 * index1], vertices[2 * index1 + 1]);
                        vertex2 = new Point(vertices[2 * index2], vertices[2 * index2 + 1]);
                        p1x = vertex0.x - vertex1.x;
                        p1y = vertex0.y - vertex1.y;
                        p2x = vertex1.x - vertex2.x;
                        p2y = vertex1.y - vertex2.y;
                        p1len = Math.sqrt(p1x * p1x + p1y * p1y);
                        p2len = Math.sqrt(p2x * p2x + p2y * p2y);
                        var P = new Point(vertex0.x - 2 * (-p1y / p1len), vertex0.y - 2 * (p1x / p1len));
                        var Q = new Point(vertex2.x - 2 * (-p2y / p2len), vertex2.y - 2 * (p2x / p2len));
                        var V = this.wi([vertex0, vertex1, vertex2], [texCoord0, texCoord1, texCoord2], [P, vertex1, Q]);
                        this.Sc(resVertices, resIndices, [vertex0, P, vertex1], [texCoord0, V[0], texCoord1], [1, 1, 1], vertexOffs, indexOffs);
                        vertexOffs += 3 * this.S;
                        indexOffs += 3;
                        this.Sc(resVertices, resIndices, [vertex1, Q, vertex2], [texCoord1, V[2], texCoord2], [1, 1, 1], vertexOffs, indexOffs);
                        vertexOffs += 3 * this.S;
                        indexOffs += 3;
                    }
                    if (L > 0) {
                        x = v;
                        v = (v < concaveCurveIndices.length) ? ((concaveCurveIndices.length - v < L) ? concaveCurveIndices.length : v + L) : v;
                        L -= v - x;
                        texCoord0 = this.ec(4);
                        texCoord1 = this.ec(5);
                        texCoord2 = this.ec(6);
                        curIndices = concaveCurveIndices;
                        for (; x < v; x += 3) {
                            index0 = curIndices[x];
                            index1 = curIndices[x + 1];
                            index2 = curIndices[x + 2];
                            vertex0 = new Point(vertices[2 * index0], vertices[2 * index0 + 1]);
                            vertex1 = new Point(vertices[2 * index1], vertices[2 * index1 + 1]);
                            vertex2 = new Point(vertices[2 * index2], vertices[2 * index2 + 1]);
                            p1x = (vertex0.x + vertex2.x) / 2;
                            p1y = (vertex0.y + vertex2.y) / 2;
                            p2x = vertex2.x - vertex0.x;
                            p2y = vertex2.y - vertex0.y;
                            p2len = Math.sqrt(p2x * p2x + p2y * p2y);
                            P = new Point(vertex0.x + 0.1 * Math.min(2, p2len) * (-p2y / p2len), vertex0.y + 0.1 * Math.min(2, p2len) * (p2x / p2len));
                            var Y = new Point(p1x, p1y);
                            Q = new Point(vertex2.x + 0.1 * Math.min(2, p2len) * (-p2y / p2len), vertex2.y + 0.1 * Math.min(2, p2len) * (p2x / p2len));
                            V = this.wi([vertex0, vertex1, vertex2], [texCoord0, texCoord1, texCoord2], [P, Y, Q]);
                            this.Sc(resVertices, resIndices, [vertex0, P, vertex2], [texCoord0, V[0], texCoord2], [-1, -1, -1], vertexOffs, indexOffs);
                            vertexOffs += 3 * this.S;
                            indexOffs += 3;
                            this.Sc(resVertices, resIndices, [vertex2, P, Q], [texCoord2, V[0], V[2]], [-1, -1, -1], vertexOffs, indexOffs);
                            vertexOffs += 3 * this.S;
                            indexOffs += 3;
                        }
                    }
                    if (L > 0) {
                        var K = I;
                        I = I < edgeIndices.length ? edgeIndices.length - I < L ? edgeIndices.length : I + L : I;
                        curIndices = edgeIndices;
                        texCoord0 = this.ec(4);
                        texCoord1 = this.ec(4);
                        for (x = K; x < I; x += 3) {
                            index0 = curIndices[x];
                            index1 = curIndices[x + 1];
                            index2 = curIndices[x + 2];
                            vertex0 = new Point(vertices[2 * index0], vertices[2 * index0 + 1]);
                            vertex1 = new Point(vertices[2 * index1], vertices[2 * index1 + 1]);
                            vertex2 = new Point(vertices[2 * index2], vertices[2 * index2 + 1]);
                            p1x = vertex2.x - vertex0.x;
                            p1y = vertex2.y - vertex0.y;
                            p1len = Math.sqrt(p1x * p1x + p1y * p1y);
                            P = new Point(vertex0.x - 2 * (-p1y / p1len), vertex0.y - 2 * (p1x / p1len));
                            Y = new Point(vertex2.x - 2 * (-p1y / p1len), vertex2.y - 2 * (p1x / p1len));
                            this.Sc(resVertices, resIndices, [vertex0, P, vertex2], [texCoord0, W, texCoord1], [-1, -1, -1], vertexOffs, indexOffs);
                            vertexOffs += 3 * this.S;
                            indexOffs += 3;
                            this.Sc(resVertices, resIndices, [P, Y, vertex2], [W, W, texCoord1], [-1, -1, -1], vertexOffs, indexOffs);
                            vertexOffs += 3 * this.S;
                            indexOffs += 3;
                        }
                    }
                    if (resIndices.length == 0) {
                        return null;
                    }
                    var bufferData = new BufferData(resVertices, resIndices);
                    var u = new ca(fillName, fillIsOpaque);
                    var r = this.injectLoopBlinnTexCoords(bufferData, fillName, fillStyle, fillMatrix);
                    var edgeType = Mesh.bb;
                    for (var atlasID in r) {
                        var fillVertices = r[atlasID];
                        if (this.emulateStandardDerivatives) {
                            this.injectStandardDerivativeTexCoords(edgeType, fillVertices, bufferData.indices.length);
                        }
                        u.setVertexData(atlasID, [new VertexData(new Float32Array(fillVertices), this.vertexAttributes)]);
                        u.setIndices(bufferData.indices);
                    }
                    u.fillMode = this.getFillMode(fillStyle, fillOverflow, fillIsBitmapClipped);
                    X.push(u);
                }
                return X;
            };
            Parser.prototype.Sc = function (vertices, indices, positions, texCoords, isConvexMultipliers, vertexOffs, indexOffs) {
                vertices[vertexOffs + 0] = positions[0].x;
                vertices[vertexOffs + 1] = positions[0].y;
                vertices[vertexOffs + 2] = texCoords[0].x;
                vertices[vertexOffs + 3] = texCoords[0].y;
                vertices[vertexOffs + 4] = isConvexMultipliers[0];
                vertexOffs += this.S;
                vertices[vertexOffs + 0] = positions[1].x;
                vertices[vertexOffs + 1] = positions[1].y;
                vertices[vertexOffs + 2] = texCoords[1].x;
                vertices[vertexOffs + 3] = texCoords[1].y;
                vertices[vertexOffs + 4] = isConvexMultipliers[1];
                vertexOffs += this.S;
                vertices[vertexOffs + 0] = positions[2].x;
                vertices[vertexOffs + 1] = positions[2].y;
                vertices[vertexOffs + 2] = texCoords[2].x;
                vertices[vertexOffs + 3] = texCoords[2].y;
                vertices[vertexOffs + 4] = isConvexMultipliers[2];
                indices[indexOffs + 0] = indexOffs + 0;
                indices[indexOffs + 1] = indexOffs + 1;
                indices[indexOffs + 2] = indexOffs + 2;
            };
            Parser.prototype.ec = function (a) {
                if (a >= 9) {
                    return Parser.tex[a - 5];
                }
                if (a >= 4) {
                    a -= 4;
                }
                if (a == 4) {
                    a = 3;
                }
                return Parser.tex[a];
            };
            Parser.prototype.wi = function (a, b, h) {
                var k = [];
                var a1delta = a[1].sub(a[0]);
                var a2delta = a[2].sub(a[0]);
                var b1delta = b[1].sub(b[0]);
                var b2delta = b[2].sub(b[0]);
                var det1 = 1 / (b1delta.x * b2delta.y - b2delta.x * b1delta.y);
                var s = (b2delta.y * a1delta.x - b1delta.y * a2delta.x) * det1;
                var t = (b2delta.y * a1delta.y - b1delta.y * a2delta.y) * det1;
                var u = (-b2delta.x * a1delta.x + b1delta.x * a2delta.x) * det1;
                var v = (-b2delta.x * a1delta.y + b1delta.x * a2delta.y) * det1;
                var det2 = 1 / (s * v - t * u);
                s = s * det2;
                t = -t * det2;
                u = -u * det2;
                v = v * det2;
                for (var i = 0; i < h.length; i++) {
                    var pt = h[i].sub(a[0]);
                    var pt2 = new Point(pt.x * v + pt.y * u, pt.x * t + pt.y * s);
                    k.push(pt2.add(b[0]));
                }
                return k;
            };
            Parser.prototype.createInternalBuffers = function (vertices, indices) {
                var bufferDataArray = [];
                var start = 0;
                var end = 0;
                var texCoords = [new Point(0, 1), new Point(0, 1), new Point(0, 1)];
                while (end < indices.length) {
                    start = end;
                    end = (indices.length - end > GL.MAX_VERTICES) ? end + GL.MAX_VERTICES : indices.length;
                    bufferDataArray.push(this.af(vertices, indices, start, end, texCoords, 100000));
                }
                return bufferDataArray;
            };
            Parser.prototype.createExternalBuffers = function (vertices, concaveCurveIndices, convexCurveIndices, edgeIndices) {
                var bufferDataArray = [];
                var w = 0;
                var t = 0;
                var start = 0;
                var endConcave = 0;
                var endConvex = 0;
                var endEdge = 0;
                var curveTexCoords = [Parser.tex[0], Parser.tex[1], Parser.tex[2]];
                var edgeTexCoords = [new Point(0, 0), new Point(0, 1), new Point(0, 0)];
                var totalIndices = concaveCurveIndices.length + convexCurveIndices.length + edgeIndices.length;
                while (t < totalIndices) {
                    var bufferData = new BufferData();
                    w = t;
                    t = (totalIndices - t > GL.MAX_VERTICES) ? t + GL.MAX_VERTICES : totalIndices;
                    w = t - w;
                    start = endConcave;
                    endConcave = (endConcave < concaveCurveIndices.length) ? (w > concaveCurveIndices.length - endConcave) ? concaveCurveIndices.length : endConcave + w : endConcave;
                    w -= (endConcave - start);
                    if (start != endConcave) {
                        bufferData = this.af(vertices, concaveCurveIndices, start, endConcave, curveTexCoords, -1);
                    }
                    if (w > 0) {
                        start = endConvex;
                        endConvex = (endConvex < convexCurveIndices.length) ? (w > convexCurveIndices.length - endConvex) ? convexCurveIndices.length : endConvex + w : endConvex;
                        w -= endConvex - start;
                        bufferData = this.af(vertices, convexCurveIndices, start, endConvex, curveTexCoords, 1, bufferData);
                    }
                    if (w > 0) {
                        start = endEdge;
                        endEdge = (endEdge < edgeIndices.length) ? (w > edgeIndices.length - endEdge) ? edgeIndices.length : endEdge + w : endEdge;
                        bufferData = this.af(vertices, edgeIndices, start, endEdge, edgeTexCoords, 1, bufferData);
                    }
                    bufferDataArray.push(bufferData);
                }
                return bufferDataArray;
            };
            Parser.prototype.af = function (vertices, indices, start, end, texCoords, isConvexMultiplier, bufferData) {
                if (!bufferData) {
                    bufferData = new BufferData();
                }
                var bufVertices = bufferData.vertices;
                var bufIndices = bufferData.indices;
                var bufVertexOffset = bufVertices.length;
                var bufIndexOffset = bufIndices.length;
                var iIndex = 0;
                while (start < end) {
                    for (var i = 0; i < 3; i++) {
                        var index = indices[start + i];
                        bufIndices[bufIndexOffset + iIndex] = iIndex;
                        bufVertices[bufVertexOffset++] = vertices[2 * index];
                        bufVertices[bufVertexOffset++] = vertices[2 * index + 1];
                        bufVertices[bufVertexOffset++] = texCoords[i].x;
                        bufVertices[bufVertexOffset++] = texCoords[i].y;
                        bufVertices[bufVertexOffset++] = isConvexMultiplier;
                        for (var iVertex = 5; iVertex < this.S; iVertex++) {
                            bufVertices[bufVertexOffset++] = null;
                        }
                        iIndex++;
                    }
                    start += 3;
                }
                return bufferData;
            };
            Parser.prototype.injectLoopBlinnTexCoords = function (bufferData, fillName, fillStyle, fillMatrix) {
                var d = {};
                var atlases = this.assetPool.getTextureAtlases();
                var offset = this.emulateStandardDerivatives ? this.S - 6 : this.S - 2;
                for (var i = 0; i < atlases.length; i++) {
                    var atlas = atlases[i];
                    var frame = atlas.getFrame(fillName);
                    if (frame !== void 0) {
                        var textureWidth = atlas.width;
                        var textureHeight = atlas.height;
                        switch (fillStyle) {
                            case ParserRelease.kSolid:
                            case ParserDebug.kSolid:
                                this.injectLoopBlinnTexCoords_SolidFill(bufferData.vertices, this.S, offset, textureWidth, textureHeight, frame, bufferData.indices.length);
                                break;
                            case ParserRelease.kLinearGradient:
                            case ParserDebug.kLinearGradient:
                                this.injectLoopBlinnTexCoords_LinearGradientFill(bufferData.vertices, this.S, offset, bufferData.indices.length, fillMatrix);
                                break;
                            case ParserRelease.kBitmap:
                            case ParserDebug.kBitmap:
                                this.injectLoopBlinnTexCoords_BitmapFill(bufferData.vertices, this.S, offset, bufferData.indices.length, fillMatrix, frame.width, frame.height);
                                break;
                        }
                        if (bufferData.vertices && bufferData.vertices.length > 0) {
                            d[atlas.id] = bufferData.vertices;
                        }
                    }
                }
                return d;
            };
            Parser.prototype.injectLoopBlinnTexCoords_SolidFill = function (vertices, stride, offset, textureWidth, textureHeight, frame, count) {
                if (count > 0) {
                    var texCoord = new Point(frame.left + frame.width / 2, frame.top + frame.height / 2);
                    texCoord.x /= textureWidth;
                    texCoord.y /= textureHeight;
                    for (var i = 0; i < count; i++) {
                        vertices[offset] = texCoord.x;
                        vertices[offset + 1] = texCoord.y;
                        offset += stride;
                    }
                }
            };
            Parser.prototype.injectLoopBlinnTexCoords_LinearGradientFill = function (vertices, stride, offset, count, matrixValues) {
                if (count > 0 && matrixValues.length == 6) {
                    var matrix = new Matrix(matrixValues);
                    matrix.multiply(Parser.fillMatrixIdentity);
                    var isInvertible = matrix.isInvertible();
                    if (isInvertible) {
                        matrix.invert();
                    }
                    var iVert = 0;
                    var iTex = offset;
                    for (var i = 0; i < count; i++) {
                        if (!isInvertible) {
                            vertices[iTex] = 0.5;
                        }
                        else {
                            var texCoord = matrix.transformPoint(new Point(vertices[iVert], vertices[iVert + 1]));
                            vertices[iTex] = texCoord.x;
                        }
                        vertices[iTex + 1] = 0.5;
                        iVert += stride;
                        iTex += stride;
                    }
                }
            };
            Parser.prototype.injectLoopBlinnTexCoords_BitmapFill = function (vertices, stride, offset, count, matrixValues, bitmapWidth, bitmapHeight) {
                if (count > 0 && matrixValues.length == 6) {
                    var matrix = new Matrix(matrixValues);
                    matrix.invert();
                    bitmapWidth /= 20;
                    bitmapHeight /= 20;
                    matrix.setValue(0, 0, matrix.getValue(0, 0) / bitmapWidth);
                    matrix.setValue(1, 0, matrix.getValue(1, 0) / bitmapHeight);
                    matrix.setValue(0, 1, matrix.getValue(0, 1) / bitmapWidth);
                    matrix.setValue(1, 1, matrix.getValue(1, 1) / bitmapHeight);
                    matrix.setValue(0, 3, matrix.getValue(0, 3) / bitmapWidth);
                    matrix.setValue(1, 3, matrix.getValue(1, 3) / bitmapHeight);
                    var posOffset = 0;
                    var texOffset = offset;
                    for (var i = 0; i < count; i++) {
                        var texCoord = matrix.transformPoint(new Point(vertices[posOffset], vertices[posOffset + 1]));
                        vertices[texOffset] = texCoord.x;
                        vertices[texOffset + 1] = texCoord.y;
                        posOffset += stride;
                        texOffset += stride;
                    }
                }
            };
            Parser.prototype.injectStandardDerivativeTexCoords = function (edgeType, vertices, count) {
                var offset = this.S - 4;
                var stride = this.S;
                var len = count * stride;
                var i = 0;
                switch (edgeType) {
                    case Mesh.INTERNAL:
                        while (i < len) {
                            vertices[offset] = 0;
                            vertices[offset + 1] = 1;
                            vertices[offset + 2] = 0;
                            vertices[offset + 3] = 1;
                            offset += stride;
                            i += stride;
                        }
                        break;
                    case Mesh.EXTERNAL:
                    case Mesh.bb:
                        while (i < len) {
                            var stride2 = stride * 2;
                            var texCoords = [];
                            texCoords.push(new Point(vertices[i], vertices[i + 1]));
                            texCoords.push(new Point(vertices[i + stride], vertices[i + 1 + stride]));
                            texCoords.push(new Point(vertices[i + stride2], vertices[i + 1 + stride2]));
                            var d = this.bl([
                                vertices[i + 2],
                                vertices[i + 3],
                                1,
                                vertices[i + 2 + stride],
                                vertices[i + 3 + stride],
                                1,
                                vertices[i + 2 + stride2],
                                vertices[i + 3 + stride2],
                                1
                            ], texCoords);
                            vertices[offset] = d[0].x;
                            vertices[offset + 1] = d[0].y;
                            vertices[offset + 2] = d[1].x;
                            vertices[offset + 3] = d[1].y;
                            vertices[offset + stride] = d[0].x;
                            vertices[offset + 1 + stride] = d[0].y;
                            vertices[offset + 2 + stride] = d[1].x;
                            vertices[offset + 3 + stride] = d[1].y;
                            vertices[offset + stride2] = d[0].x;
                            vertices[offset + 1 + stride2] = d[0].y;
                            vertices[offset + 2 + stride2] = d[1].x;
                            vertices[offset + 3 + stride2] = d[1].y;
                            offset += stride * 3;
                            i += stride * 3;
                        }
                        break;
                }
            };
            Parser.prototype.bl = function (matrixValues, texCoords) {
                var p2 = texCoords[1].sub(texCoords[0]);
                var p3 = texCoords[2].sub(texCoords[0]);
                var m1 = new Matrix3x3([0, 0, 1, p2.x, p2.y, 1, p3.x, p3.y, 1]);
                m1.invert();
                var x = matrixValues[0];
                var y = matrixValues[1];
                matrixValues[0] = 0;
                matrixValues[1] = 0;
                matrixValues[3] -= x;
                matrixValues[4] -= y;
                matrixValues[6] -= x;
                matrixValues[7] -= y;
                var m2 = new Matrix3x3(matrixValues);
                m2.concat(m1);
                return [
                    m2.transformPoint(new Point(1, 0)),
                    m2.transformPoint(new Point(0, 1))
                ];
            };
            Parser.prototype.getFillMode = function (fillStyle, fillOverflow, fillIsBitmapClipped) {
                var fillMode = 0;
                switch (fillStyle) {
                    case ParserRelease.kLinearGradient:
                    case ParserDebug.kLinearGradient:
                        fillMode = ca.fillModeMap[fillOverflow];
                        break;
                    case ParserRelease.kBitmap:
                    case ParserDebug.kBitmap:
                        fillMode = ca.fillModeMap[fillIsBitmapClipped ? ca.kFill_Repeat : ca.kFill_Extend];
                        break;
                }
                return fillMode;
            };
            Parser.tex = [
                new Point(0, 0),
                new Point(0.5, 0),
                new Point(1, 1),
                new Point(0, 1),
                new Point(0.25, -0.25),
                new Point(1, 0.75)
            ];
            Parser.fillMatrixIdentity = new Matrix([1638.4, 0, 0, 1638.4, -819.2, -819.2]);
            Parser.kHeader = "header";
            Parser.kStageSize = "stageSize";
            Parser.kWidth = "width";
            Parser.kHeight = "height";
            Parser.kStageColor = "stageColor";
            Parser.kFrameRate = "frameRate";
            Parser.kReadable = "readable";
            Parser.kLoop = "loop";
            Parser.kSceneTimelines = "sceneTimelines";
            Parser.kFrames = "frames";
            Parser.kFrame = "frame";
            Parser.kMeta = "meta";
            Parser.kSize = "size";
            Parser.kX = "x";
            Parser.kY = "y";
            Parser.kW = "w";
            Parser.kH = "h";
            return Parser;
        })();
        xj.Parser = Parser;
    })(xj = flwebgl.xj || (flwebgl.xj = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var Renderer = flwebgl.e.Renderer;
    var SoundFactory = flwebgl.media.SoundFactory;
    var AssetPool = flwebgl.util.AssetPool;
    var Parser = flwebgl.xj.Parser;
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
            this.completeCBK = callback;
            this.soundFactory = new SoundFactory();
            this.options.emulateStandardDerivatives = !this.renderer.hasExtension("OES_standard_derivatives");
            this.parser = new Parser(this.assetPool);
            var stageInfo = this.parser.init(content, textures, this.options);
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
