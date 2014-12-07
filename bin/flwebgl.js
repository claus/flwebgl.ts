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
            Utils.requestAnimFrame = function (fn, frameRate, window) {
                var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                return rAF ? rAF(fn) : setTimeout(fn, 1000 / frameRate);
            };
            Utils.cancelAnimFrame = function (id, window) {
                var cAF = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
                if (cAF) {
                    cAF(id);
                }
            };
            Utils.isUndefined = function (object) {
                return (typeof object === "undefined");
            };
            Utils.cm = function (meshID, i, edgeType) {
                return meshID + "_" + i + "_" + edgeType;
            };
            Utils.em = function (a, b) {
                return "__Snapshot__" + a + "_" + b;
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
            this.cacheAsBitmap = false;
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
    var util;
    (function (util) {
        var Logger = (function () {
            function Logger() {
            }
            Logger.setLevel = function (level) {
                Logger.level = level;
            };
            Logger.info = function (a) {
                if (Logger.level >= Logger.kLevel_Info) {
                    console.log("INFO: " + a);
                }
            };
            Logger.warn = function (a) {
                if (Logger.level >= Logger.kLevel_Warn) {
                    console.log("WARN: " + a);
                }
            };
            Logger.error = function (a) {
                if (Logger.level >= Logger.kLevel_Error) {
                    console.log("ERROR: " + a);
                }
            };
            Logger.kLevel_OFF = -1;
            Logger.kLevel_Error = 0;
            Logger.kLevel_Warn = 1;
            Logger.kLevel_Info = 2;
            Logger.level = Logger.kLevel_OFF;
            return Logger;
        })();
        util.Logger = Logger;
    })(util = flwebgl.util || (flwebgl.util = {}));
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
        var Attribute = (function () {
            function Attribute(location, name, type, size, Hf) {
                if (Hf === void 0) { Hf = false; }
                this.location = location;
                this.name = name;
                this.type = type;
                this.size = size;
                this.Hf = Hf;
            }
            return Attribute;
        })();
        e.Attribute = Attribute;
        var Attributes = (function () {
            function Attributes(attributes) {
                this.fi = {};
                for (var i = 0; i < attributes.length; i++) {
                    this.fi[attributes[i].name] = attributes[i];
                }
            }
            Attributes.prototype.getAttribs = function (name) {
                return this.fi[name];
            };
            return Attributes;
        })();
        e.Attributes = Attributes;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var geom;
    (function (geom) {
        var ColorTransform = (function () {
            function ColorTransform(alphaOffs, alphaMult, redOffs, redMult, greenOffs, greenMult, blueOffs, blueMult) {
                if (alphaOffs === void 0) { alphaOffs = 0; }
                if (alphaMult === void 0) { alphaMult = 1; }
                if (redOffs === void 0) { redOffs = 0; }
                if (redMult === void 0) { redMult = 1; }
                if (greenOffs === void 0) { greenOffs = 0; }
                if (greenMult === void 0) { greenMult = 1; }
                if (blueOffs === void 0) { blueOffs = 0; }
                if (blueMult === void 0) { blueMult = 1; }
                this.identity();
                this.alphaOffset = alphaOffs;
                this.redOffset = redOffs;
                this.greenOffset = greenOffs;
                this.blueOffset = blueOffs;
                this.alphaMultiplier = alphaMult;
                this.redMultiplier = redMult;
                this.greenMultiplier = greenMult;
                this.blueMultiplier = blueMult;
            }
            Object.defineProperty(ColorTransform.prototype, "alphaMultiplier", {
                get: function () {
                    return this._alphaMult;
                },
                set: function (value) {
                    this._alphaMult = (value > 1) ? 1 : value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorTransform.prototype, "redMultiplier", {
                get: function () {
                    return this._redMult;
                },
                set: function (value) {
                    this._redMult = (value > 1) ? 1 : value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorTransform.prototype, "greenMultiplier", {
                get: function () {
                    return this._greenMult;
                },
                set: function (value) {
                    this._greenMult = (value > 1) ? 1 : value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorTransform.prototype, "blueMultiplier", {
                get: function () {
                    return this._blueMult;
                },
                set: function (value) {
                    this._blueMult = (value > 1) ? 1 : value;
                },
                enumerable: true,
                configurable: true
            });
            ColorTransform.prototype.identity = function () {
                this.blueOffset = this.greenOffset = this.redOffset = this.alphaOffset = 0;
                this._blueMult = this._greenMult = this._redMult = this._alphaMult = 1;
                return this;
            };
            ColorTransform.prototype.isIdentity = function () {
                return this.alphaOffset === 0 && this._alphaMult === 1 && this.redOffset === 0 && this._redMult === 1 && this.greenOffset === 0 && this._greenMult === 1 && this.blueOffset === 0 && this._blueMult === 1;
            };
            ColorTransform.prototype.equals = function (cxform) {
                return this.alphaOffset === cxform.alphaOffset && this.redOffset === cxform.redOffset && this.greenOffset === cxform.greenOffset && this.blueOffset === cxform.blueOffset && this._alphaMult === cxform.alphaMultiplier && this._redMult === cxform.redMultiplier && this._greenMult === cxform.greenMultiplier && this._blueMult === cxform.blueMultiplier;
            };
            ColorTransform.prototype.concat = function (cxform) {
                this.alphaOffset += this._alphaMult * cxform.alphaOffset;
                this.redOffset += this._redMult * cxform.redOffset;
                this.greenOffset += this._greenMult * cxform.greenOffset;
                this.blueOffset += this._blueMult * cxform.blueOffset;
                this._alphaMult *= cxform.alphaMultiplier;
                this._redMult *= cxform.redMultiplier;
                this._greenMult *= cxform.greenMultiplier;
                this._blueMult *= cxform.blueMultiplier;
                return this;
            };
            ColorTransform.prototype.clone = function () {
                return (new ColorTransform()).copy(this);
            };
            ColorTransform.prototype.copy = function (cxform) {
                this.redOffset = cxform.redOffset;
                this.greenOffset = cxform.greenOffset;
                this.blueOffset = cxform.blueOffset;
                this.alphaOffset = cxform.alphaOffset;
                this._redMult = cxform.alphaMultiplier;
                this._greenMult = cxform.greenMultiplier;
                this._blueMult = cxform.blueMultiplier;
                this._alphaMult = cxform.alphaMultiplier;
                return this;
            };
            return ColorTransform;
        })();
        geom.ColorTransform = ColorTransform;
    })(geom = flwebgl.geom || (flwebgl.geom = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var lk = (function () {
            function lk(id, h, atlasID, parent) {
                this._id = id;
                this._atlasID = atlasID;
                this.ka = h;
                this.parent = parent;
                this.se = {};
            }
            Object.defineProperty(lk.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(lk.prototype, "atlasID", {
                get: function () {
                    return this._atlasID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(lk.prototype, "depth", {
                get: function () {
                    return this.parent.depth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(lk.prototype, "dirty", {
                get: function () {
                    return this.parent.dirty;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(lk.prototype, "isOpaque", {
                get: function () {
                    var cxform = this.parent.getColorTransform();
                    return (this.ka.isOpaque && cxform.alphaMultiplier == 1 && cxform.alphaOffset == 0);
                },
                enumerable: true,
                configurable: true
            });
            lk.prototype.getVertexData = function () {
                return this.ka.getVertexData(this._atlasID);
            };
            lk.prototype.getNumIndices = function () {
                return this.ka.getNumIndices();
            };
            lk.prototype.getUniforms = function (shaderID) {
                return this.se["" + shaderID];
            };
            lk.prototype.setUniforms = function (shaderID, uniforms) {
                this.se["" + shaderID] = uniforms;
            };
            lk.prototype.getTransform = function () {
                return this.parent.getTransform();
            };
            lk.prototype.getColorTransform = function () {
                return this.parent.getColorTransform();
            };
            lk.prototype.destroy = function () {
                this.parent = void 0;
            };
            return lk;
        })();
        e.lk = lk;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var mk = (function () {
            function mk(Ld, fh) {
                if (Ld === void 0) { Ld = -1; }
                if (fh === void 0) { fh = -1; }
                this.Ld = Ld;
                this.fh = fh;
            }
            return mk;
        })();
        e.mk = mk;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (_e) {
        var Ck = (function () {
            function Ck() {
                this.bufferCache = {};
            }
            Ck.prototype.setGL = function (value) {
                this.gl = value;
            };
            Ck.prototype.Vg = function (attribDefs, attribs) {
                this.Oa = attribDefs;
                this.Uc = attribs;
                this.gc = 0;
                var totalSize = attribDefs.attrs[0].totalSize;
                if (!this.bufferCache[totalSize]) {
                    var buffer = this.gl.createBuffer();
                    var bufferSize = _e.GL.MAX_VERTICES * totalSize * Float32Array.BYTES_PER_ELEMENT;
                    this.gl.bindBuffer(_e.GL.ARRAY_BUFFER, buffer);
                    this.gl.bufferData(_e.GL.ARRAY_BUFFER, bufferSize, _e.GL.DYNAMIC_DRAW);
                    this.oe();
                    this.bufferCache[totalSize] = buffer;
                }
                this.buffer = this.bufferCache[totalSize];
                this.kb = [];
            };
            Ck.prototype.Zg = function (x) {
                if (x === void 0) { x = false; }
                if (this.buffer !== this.gl.getBoundBuffer(_e.GL.ARRAY_BUFFER)) {
                    this.gl.bindBuffer(_e.GL.ARRAY_BUFFER, this.buffer);
                    this.oe();
                }
                var a = [];
                var b = 0;
                var p = this.Oa.attrs[0].totalSize;
                for (var i = 0; i < this.kb.length; i++) {
                    a.push(new _e.mk(b, -1));
                    this.gl.bufferSubData(_e.GL.ARRAY_BUFFER, b * p, this.kb[i].getVertexData()[0].vertices);
                    b += this.kb[i].getNumIndices();
                }
                return a;
            };
            Ck.prototype.upload = function (a) {
                if (this.gc + a.getNumIndices() > _e.GL.MAX_VERTICES) {
                    return false;
                }
                this.kb.push(a);
                this.gc += a.getNumIndices();
                return true;
            };
            Ck.prototype.destroy = function () {
                for (var a in this.bufferCache) {
                    this.gl.deleteBuffer(this.bufferCache[a]);
                }
                this.buffer = void 0;
                this.kb = void 0;
                this.bufferCache = void 0;
            };
            Ck.prototype.oe = function () {
                var a = this.Oa.attrs;
                for (var i = 0; i < a.length; i++) {
                    var c = a[i];
                    var e = c.attrs;
                    for (var j = 0; j < e.length; j++) {
                        var l = this.Uc.getAttribs(e[j].name);
                        this.gl.enableVertexAttribArray(l.location);
                        this.gl.vertexAttribPointer(l.location, l.size, l.type, l.Hf, c.totalSize, e[j].byteOffset);
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
        var Logger = flwebgl.util.Logger;
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
                    Logger.error("Your browser doesn't support WebGL.");
                    throw Error();
                }
                this.initStatics();
                this.init();
                this.textureAtlases = [];
                this.vao = this.getExtension("OES_vertex_array_object");
                if (!this.hasExtension("OES_standard_derivatives")) {
                    Logger.error("Standard derivatives extension not enabled.");
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
            GL.prototype.Fl = function (a) {
                var atlasID = a.atlasID;
                if (this.activeTextureMap[atlasID] !== atlasID) {
                    var texture = this.getTexture(atlasID);
                    if (texture) {
                        this.activateTexture(atlasID);
                        this.bindTexture(GL.TEXTURE_2D, texture);
                    }
                }
            };
            GL.prototype.setUniforms = function (shader, c) {
                var uniforms = c.getUniforms(shader.id);
                var uniformsCached = this.uniformsCache[shader.id];
                if (!uniformsCached) {
                    uniformsCached = this.uniformsCache[shader.id] = [];
                }
                for (var i = 0; i < uniforms.length; i++) {
                    var value = uniforms[i].value;
                    var cached = uniformsCached[i] ? uniformsCached[i].value : null;
                    var type = uniforms[i].uniform.type;
                    var location = uniforms[i].uniform.location;
                    switch (type) {
                        case GL.FLOAT_VEC2:
                            if (!cached || cached[0] !== value[0] || cached[1] !== value[1]) {
                                this.uniform2fv(location, value);
                            }
                            break;
                        case GL.FLOAT_VEC4:
                            if (!cached || cached[0] !== value[0] || cached[1] !== value[1] || cached[2] !== value[2] || cached[3] !== value[3]) {
                                this.uniform4fv(location, value);
                            }
                            break;
                        case GL.FLOAT_MAT4:
                            if (!cached || cached[0] !== value[0] || cached[1] !== value[1] || cached[4] !== value[4] || cached[5] !== value[5] || cached[10] !== value[10] || cached[12] !== value[12] || cached[13] !== value[13]) {
                                this.uniformMatrix4fv(location, false, value);
                            }
                            break;
                        case GL.INT:
                        case GL.SAMPLER_2D:
                            if (!cached || cached[0] !== value[0] || cached[1] !== value[1]) {
                                this.uniform1iv(location, value);
                            }
                            break;
                        case GL.INT_VEC2:
                            if (!cached || cached[0] !== value[0] || cached[1] !== value[1]) {
                                this.uniform2iv(location, value);
                            }
                            break;
                    }
                    this.uniformsCache[shader.id][i] = {
                        type: type,
                        value: value
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
            GL.prototype.draw = function (shader, attribDefs, c) {
                var l = 0;
                var d = 0;
                var e = c.length;
                while (d < e) {
                    this.fb.Vg(attribDefs, shader.attribs);
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
                        this.drawArrays(GL.TRIANGLES, f[m].Ld, n.getNumIndices());
                    }
                    this.bindVertexArrayOES(null);
                }
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
            GL.prototype.bufferData = function (target, sizeOrBuffer, usage) {
                this.ctx.bufferData(target, sizeOrBuffer, usage);
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
                        Logger.error(this.ctx.getShaderInfoLog(shader));
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
                    Logger.error("Could not initialize shaders properly: " + this.ctx.getProgramInfoLog(program));
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
            GL.prototype.enableVertexAttribArray = function (index) {
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
                        this.ctx.getExtension(name);
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
                    Logger.error("WebGL Error: " + error);
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
                this.fb.destroy();
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
        var Pe = (function () {
            function Pe() {
                this.F = [];
            }
            Pe.prototype.Dc = function (a) {
                this.F.push(a);
            };
            Pe.prototype.mc = function (i) {
                return (i >= 0) ? this.F[i] : null;
            };
            Pe.prototype.sort = function (a) {
                this.F.sort(a);
            };
            Pe.prototype.clear = function () {
                while (this.F.length > 0) {
                    this.F.pop();
                }
            };
            return Pe;
        })();
        e.Pe = Pe;
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
                this.attrs = [];
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
                this.vertexAttributesArray = new VertexAttributesArray();
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
                    this.vertexAttributesArray.attrs.push(vertexData[i].vertexAttributes);
                }
            };
            ca.prototype.setIndices = function (indices) {
                this.indices = new Uint16Array(indices);
            };
            ca.prototype.getNumIndices = function () {
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
    var e;
    (function (e) {
        var Utils = flwebgl.util.Utils;
        var MeshInstanced = (function () {
            function MeshInstanced(shape) {
                this.shape = shape;
                this.dirty = true;
                this.Gb = {};
                this.Gb[e.Mesh.INTERNAL] = [];
                this.Gb[e.Mesh.EXTERNAL] = [];
                this.Gb[e.Mesh.bb] = [];
            }
            Object.defineProperty(MeshInstanced.prototype, "depth", {
                get: function () {
                    return this.shape.depth;
                },
                set: function (value) {
                    if (value !== this.shape.depth) {
                        this.shape.depth = value;
                        this.dirty = true;
                    }
                },
                enumerable: true,
                configurable: true
            });
            MeshInstanced.prototype.ra = function (edgeType) {
                return this.shape.Ic().ra(edgeType);
            };
            MeshInstanced.prototype.ab = function (edgeType, i, gl) {
                var buffers = this.Gb[edgeType][i];
                if (!buffers) {
                    var mesh = this.shape.Ic();
                    var _ca = mesh.yf(edgeType, i);
                    if (!_ca) {
                        return void 0;
                    }
                    buffers = new e.lk(Utils.cm(mesh.id, i, edgeType), _ca, gl.getTextureAtlasByFrameID(_ca.name).id, this);
                    this.Gb[edgeType][i] = buffers;
                }
                return buffers;
            };
            MeshInstanced.prototype.getTransform = function () {
                return this.shape.getGlobalTransform();
            };
            MeshInstanced.prototype.getColorTransform = function () {
                return this.shape.getGlobalColorTransform();
            };
            MeshInstanced.prototype.destroy = function () {
                var a = [e.Mesh.INTERNAL, e.Mesh.EXTERNAL, e.Mesh.bb];
                for (var i = 0; i < a.length; ++i) {
                    var edgeType = a[i];
                    for (var j = 0; j < this.Gb[edgeType].length; ++j) {
                        if (this.Gb[edgeType][j]) {
                            this.Gb[edgeType][j].destroy();
                            delete this.Gb[edgeType][j];
                        }
                    }
                }
            };
            return MeshInstanced;
        })();
        e.MeshInstanced = MeshInstanced;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var Uniform = (function () {
            function Uniform(location, type, size, no) {
                this.location = location;
                this.type = type;
                this.size = size;
                this.no = no;
            }
            Uniform.Jd = 0;
            Uniform.Q = 1;
            return Uniform;
        })();
        e.Uniform = Uniform;
        var Uniforms = (function () {
            function Uniforms(uniforms) {
                this.uniforms = uniforms;
                this.totalSize = 0;
                this.bo = 0;
                for (var i = 0; i < this.uniforms.length; i++) {
                    var size = 0;
                    var uniform = this.uniforms[i];
                    switch (uniform.type) {
                        case e.GL.INT:
                        case e.GL.FLOAT:
                        case e.GL.SAMPLER_2D:
                            size = Math.ceil(uniform.size / 4);
                            break;
                        case e.GL.INT_VEC2:
                        case e.GL.FLOAT_VEC2:
                            size = Math.ceil(2 * uniform.size / 4);
                            break;
                        case e.GL.INT_VEC3:
                        case e.GL.FLOAT_VEC3:
                            size = Math.ceil(3 * uniform.size / 4);
                            break;
                        case e.GL.INT_VEC4:
                        case e.GL.FLOAT_VEC4:
                            size = uniform.size;
                            break;
                        case e.GL.FLOAT_MAT4:
                            size = 4 * uniform.size;
                            break;
                    }
                    this.totalSize += size;
                }
            }
            return Uniforms;
        })();
        e.Uniforms = Uniforms;
        var UniformValue = (function () {
            function UniformValue(uniform, value) {
                this.uniform = uniform;
                this.value = value;
            }
            return UniformValue;
        })();
        e.UniformValue = UniformValue;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var renderers;
        (function (renderers) {
            (function (RenderPassIndex) {
                RenderPassIndex[RenderPassIndex["oc"] = 0] = "oc";
                RenderPassIndex[RenderPassIndex["Tb"] = 1] = "Tb";
                RenderPassIndex[RenderPassIndex["Mc"] = 3] = "Mc";
            })(renderers.RenderPassIndex || (renderers.RenderPassIndex = {}));
            var RenderPassIndex = renderers.RenderPassIndex;
        })(renderers = e.renderers || (e.renderers = {}));
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var shaders;
        (function (shaders) {
            var GL = flwebgl.e.GL;
            var Uniform = flwebgl.e.Uniform;
            var Uniforms = flwebgl.e.Uniforms;
            var UniformValue = flwebgl.e.UniformValue;
            var Attribute = flwebgl.e.Attribute;
            var Attributes = flwebgl.e.Attributes;
            var RenderPassIndex = flwebgl.e.renderers.RenderPassIndex;
            var Matrix = flwebgl.geom.Matrix;
            var Logger = flwebgl.util.Logger;
            var ShaderImageSpace = (function () {
                function ShaderImageSpace() {
                    console.log("ShaderImageSpace");
                }
                Object.defineProperty(ShaderImageSpace.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                ShaderImageSpace.prototype.setGL = function (gl) {
                    this.gl = gl;
                    if (!this.setup()) {
                        return false;
                    }
                    this.modelViewMatrix = new Matrix();
                    this.modelInverseMatrix = new Matrix();
                    return true;
                };
                ShaderImageSpace.prototype.activate = function () {
                    this.gl.useProgram(this.program);
                };
                ShaderImageSpace.prototype.draw = function (a, b) {
                    switch (b) {
                        case 0 /* oc */:
                            this.xg(a);
                            break;
                        case 1 /* Tb */:
                            this.zg(a);
                            break;
                        case 3 /* Mc */:
                            this.yg(a);
                            break;
                    }
                };
                ShaderImageSpace.prototype.xg = function (a) {
                    this.Fg();
                    this.Ia(a, 0 /* oc */);
                };
                ShaderImageSpace.prototype.zg = function (a) {
                    this.Hg();
                    this.Ia(a, 1 /* Tb */);
                };
                ShaderImageSpace.prototype.yg = function (a) {
                    this.Gg();
                    this.Ia(a, 3 /* Mc */);
                };
                ShaderImageSpace.prototype.Fg = function () {
                    this.gl.disable(GL.BLEND);
                    this.gl.depthMask(true);
                    this.gl.enable(GL.DEPTH_TEST);
                };
                ShaderImageSpace.prototype.Hg = function () {
                    this.gl.depthMask(false);
                    this.gl.enable(GL.DEPTH_TEST);
                    this.gl.enable(GL.BLEND);
                    this.gl.blendFunc(GL.ONE_MINUS_DST_ALPHA, GL.ONE);
                };
                ShaderImageSpace.prototype.Gg = function () {
                    this.gl.depthMask(false);
                    this.gl.enable(GL.DEPTH_TEST);
                    this.gl.enable(GL.BLEND);
                    this.gl.blendFunc(GL.ONE_MINUS_DST_ALPHA, GL.ONE);
                };
                ShaderImageSpace.prototype.Ia = function (a, passIndex) {
                    var c = a.F.length;
                    var viewMatrix = this.gl.viewMatrix;
                    for (var f = 0; f < c; ++f) {
                        var l = a.mc(f);
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
                            this.modelInverseMatrix.copy(l.getTransform());
                            this.modelInverseMatrix.invert();
                            var uniformValues = l.getUniforms(this._id);
                            if (!uniformValues) {
                                uniformValues = [
                                    new UniformValue(this.uniformMap.uMVMatrix, this.modelViewMatrix.values),
                                    new UniformValue(this.uniformMap.uMVMatrixInv, [this.modelInverseMatrix.getValue(0, 0), this.modelInverseMatrix.getValue(0, 1), this.modelInverseMatrix.getValue(1, 0), this.modelInverseMatrix.getValue(1, 1)]),
                                    new UniformValue(this.uniformMap.uSampler, [samplerIndex]),
                                    new UniformValue(this.uniformMap.uColorXformMultiplier, [cxform.redMultiplier, cxform.greenMultiplier, cxform.blueMultiplier, cxform.alphaMultiplier]),
                                    new UniformValue(this.uniformMap.uColorXformOffset, [cxform.redOffset / 255, cxform.greenOffset / 255, cxform.blueOffset / 255, cxform.alphaOffset / 255]),
                                    new UniformValue(this.uniformMap.uOverflowTypeAndPassIndex, [overflowType, passIndex]),
                                    new UniformValue(this.uniformMap.uFrame, [frame.left / width, frame.top / height, frame.width / width, frame.height / height])
                                ];
                            }
                            else {
                                uniformValues[0].value = this.modelViewMatrix.values;
                                uniformValues[1].value = [this.modelInverseMatrix.getValue(0, 0), this.modelInverseMatrix.getValue(0, 1), this.modelInverseMatrix.getValue(1, 0), this.modelInverseMatrix.getValue(1, 1)];
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
                        this.gl.draw(this, a.mc(0).ka.vertexAttributesArray, a.F);
                    }
                };
                ShaderImageSpace.prototype.setup = function () {
                    this.vertexShaderSrc = "attribute vec2 aVertexPosition; \n" + "attribute vec2 aLoopBlinnTextureCoord; \n" + "attribute vec2 aTextureCoord; \n" + "attribute vec2 adfdx; \n" + "attribute vec2 adfdy; \n" + "attribute float aIsConvex; \n" + "uniform mat4 uMVMatrix; \n" + "uniform vec4 uMVMatrixInv; \n" + "varying vec4 vTexCoord; \n" + "varying float vIsConvex; \n" + "varying vec4 vDfDxDy; \n" + "void main(void) { \n" + "gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0); \n" + "vDfDxDy.xy = vec2(uMVMatrixInv.x * adfdx.x + uMVMatrixInv.y * adfdy.x, uMVMatrixInv.x * adfdx.y + uMVMatrixInv.y * adfdy.y); \n" + "vDfDxDy.zw = vec2(uMVMatrixInv.z * adfdx.x + uMVMatrixInv.w * adfdy.x, uMVMatrixInv.z * adfdx.y + uMVMatrixInv.w * adfdy.y); \n" + "vTexCoord = vec4(aLoopBlinnTextureCoord, aTextureCoord); \n" + "vIsConvex = aIsConvex; \n" + "}";
                    this.fragmentShaderSrc = "precision mediump float; \n" + "varying vec4 vTexCoord; \n" + "varying float vIsConvex; \n" + "varying vec4 vDfDxDy; \n" + "uniform vec4 uColorXformMultiplier; \n" + "uniform vec4 uColorXformOffset; \n" + "uniform sampler2D uSampler; \n" + "uniform ivec2 uOverflowTypeAndPassIndex; \n" + "uniform vec4 uFrame; \n" + "void main(void) { \n" + "vec2 px = vDfDxDy.xy; \n" + "vec2 py = vDfDxDy.zw; \n" + "vec2 f = (2.0 * vTexCoord.x) * vec2(px.x, py.x) - vec2(px.y, py.y); \n" + "float sd = vIsConvex * (vTexCoord.x * vTexCoord.x - vTexCoord.y) / length(f); \n" + "float alpha = min(0.5 - sd, 1.0); \n" + "float t = max(1.0 - float(uOverflowTypeAndPassIndex.y), 0.0); \n" + "if (alpha < t || alpha == 0.0 || (uOverflowTypeAndPassIndex.y == 1 && alpha == 1.0)) \n" + "discard; \n" + "vec2 uv; \n" + "if (uOverflowTypeAndPassIndex.x == 0) { /* solid fill */ \n" + "uv = vTexCoord.zw; \n" + "} else if (uOverflowTypeAndPassIndex.x == 1) { /* gradient and bitmap fill with overflow type extend */ \n" + "uv = clamp(vTexCoord.zw, vec2(0.0, 0.0), vec2(1.0, 1.0)) * uFrame.zw + uFrame.xy; \n" + "} else if (uOverflowTypeAndPassIndex.x == 2) { /* gradient and bitmap fill with overflow type repeat */ \n" + "uv = fract(vTexCoord.zw) * uFrame.zw + uFrame.xy; \n" + "} else if (uOverflowTypeAndPassIndex.x == 3) { /* gradient fill with overflow type reflect */ \n" + "uv = vTexCoord.zw; \n" + "if (uv.s > 1.0) { \n" + "float integerPart = floor(uv.s); \n" + "float fracPart = mod(uv.s, 1.0); \n" + "float odd = mod(integerPart, 2.0); \n" + "if (odd == 1.0) { /* if the uv.s lies on the odd number of band towards the right side */ \n" + "uv.s = 1.0 - fracPart; \n" + "} else { /* if the uv.s lies on the even number of band towards the right side */ \n" + "uv.s = fracPart; \n" + "} \n" + "} else if (uv.s < 0.0) { \n" + "float integerPart = floor(uv.s); \n" + "float fracPart = mod(uv.s, 1.0); \n" + "float odd = mod(integerPart, 2.0); \n" + "if (integerPart == 0.0) { /* special case for left side */ \n" + "uv.s = fracPart; \n" + "} else if (odd == 1.0) { /* if the uv.s lies on the odd number of band towards the left side */ \n" + "uv.s = 1.0 - fracPart; \n" + "} else { /* if the uv.s lies on the even number of band towards the left side */ \n" + "uv.s = fracPart; \n" + "} \n" + "} \n" + "uv = (uFrame.xy + (uv * uFrame.zw)); \n" + "} \n" + "vec4 c = texture2D(uSampler, uv) * uColorXformMultiplier + uColorXformOffset; \n" + "c.a = c.a * alpha; \n" + "if (uOverflowTypeAndPassIndex.y != 0) { \n" + "c.rgb = c.rgb * c.a; \n" + "} \n" + "gl_FragColor = c; \n" + "}";
                    this.vertexShader = this.gl.createShader(GL.VERTEX_SHADER, this.vertexShaderSrc);
                    this.fragmentShader = this.gl.createShader(GL.FRAGMENT_SHADER, this.fragmentShaderSrc);
                    this.program = this.gl.createProgram();
                    this.gl.attachShader(this.program, this.vertexShader);
                    this.gl.attachShader(this.program, this.fragmentShader);
                    this._id = this.gl.linkProgram(this.program);
                    if (this._id < 0) {
                        this.gl.deleteProgram(this.program);
                        Logger.error("Program linking failed.");
                        return false;
                    }
                    var ul0 = this.gl.getUniformLocation(this.program, "uMVMatrix");
                    var ul1 = this.gl.getUniformLocation(this.program, "uMVMatrixInv");
                    var ul2 = this.gl.getUniformLocation(this.program, "uSampler");
                    var ul3 = this.gl.getUniformLocation(this.program, "uColorXformMultiplier");
                    var ul4 = this.gl.getUniformLocation(this.program, "uColorXformOffset");
                    var ul5 = this.gl.getUniformLocation(this.program, "uOverflowTypeAndPassIndex");
                    var ul6 = this.gl.getUniformLocation(this.program, "uFrame");
                    var u0 = new Uniform(ul0, GL.FLOAT_MAT4, 1, Uniform.Jd);
                    var u1 = new Uniform(ul1, GL.FLOAT_VEC4, 1, Uniform.Jd);
                    var u2 = new Uniform(ul2, GL.SAMPLER_2D, 1, Uniform.Q);
                    var u3 = new Uniform(ul3, GL.FLOAT_VEC4, 1, Uniform.Q);
                    var u4 = new Uniform(ul4, GL.FLOAT_VEC4, 1, Uniform.Q);
                    var u5 = new Uniform(ul5, GL.INT_VEC2, 1, Uniform.Q);
                    var u6 = new Uniform(ul6, GL.FLOAT_VEC4, 1, Uniform.Q);
                    this._uniforms = new Uniforms([u0, u1, u2, u3, u4, u5, u6]);
                    this.uniformMap = {
                        uMVMatrix: u0,
                        uMVMatrixInv: u1,
                        uSampler: u2,
                        uColorXformMultiplier: u3,
                        uColorXformOffset: u4,
                        uOverflowTypeAndPassIndex: u5,
                        uFrame: u6
                    };
                    var al0 = this.gl.getAttribLocation(this.program, "aVertexPosition");
                    var al1 = this.gl.getAttribLocation(this.program, "aLoopBlinnTextureCoord");
                    var al2 = this.gl.getAttribLocation(this.program, "aIsConvex");
                    var al3 = this.gl.getAttribLocation(this.program, "aTextureCoord");
                    var al4 = this.gl.getAttribLocation(this.program, "adfdx");
                    var al5 = this.gl.getAttribLocation(this.program, "adfdy");
                    var a0 = new Attribute(al0, "POSITION0", GL.FLOAT, 2);
                    var a1 = new Attribute(al1, "TEXCOORD0", GL.FLOAT, 2);
                    var a2 = new Attribute(al2, "TEXCOORD1", GL.FLOAT, 1);
                    var a3 = new Attribute(al3, "TEXCOORD2", GL.FLOAT, 2);
                    var a4 = new Attribute(al4, "TEXCOORD3", GL.FLOAT, 2);
                    var a5 = new Attribute(al5, "TEXCOORD4", GL.FLOAT, 2);
                    this._attribs = new Attributes([a0, a1, a2, a3, a4, a5]);
                    return true;
                };
                ShaderImageSpace.prototype.destroy = function () {
                    this.gl.deleteShader(this.vertexShader);
                    this.gl.deleteShader(this.fragmentShader);
                    this.gl.deleteProgram(this.program);
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
            var GL = flwebgl.e.GL;
            var Uniform = flwebgl.e.Uniform;
            var Uniforms = flwebgl.e.Uniforms;
            var UniformValue = flwebgl.e.UniformValue;
            var Attribute = flwebgl.e.Attribute;
            var Attributes = flwebgl.e.Attributes;
            var RenderPassIndex = flwebgl.e.renderers.RenderPassIndex;
            var Matrix = flwebgl.geom.Matrix;
            var Logger = flwebgl.util.Logger;
            var ShaderImageSpaceStdDev = (function () {
                function ShaderImageSpaceStdDev() {
                    console.log("ShaderImageSpaceStdDev");
                }
                Object.defineProperty(ShaderImageSpaceStdDev.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ShaderImageSpaceStdDev.prototype, "uniforms", {
                    get: function () {
                        return this._uniforms;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ShaderImageSpaceStdDev.prototype, "attribs", {
                    get: function () {
                        return this._attribs;
                    },
                    enumerable: true,
                    configurable: true
                });
                ShaderImageSpaceStdDev.prototype.setGL = function (gl) {
                    this.gl = gl;
                    if (!this.setup()) {
                        return false;
                    }
                    this.modelViewMatrix = new Matrix();
                    return true;
                };
                ShaderImageSpaceStdDev.prototype.activate = function () {
                    this.gl.useProgram(this.program);
                };
                ShaderImageSpaceStdDev.prototype.draw = function (a, b) {
                    switch (b) {
                        case 0 /* oc */:
                            this.xg(a);
                            break;
                        case 1 /* Tb */:
                            this.zg(a);
                            break;
                        case 3 /* Mc */:
                            this.yg(a);
                            break;
                    }
                };
                ShaderImageSpaceStdDev.prototype.xg = function (a) {
                    this.Fg();
                    this.Ia(a, 0 /* oc */);
                };
                ShaderImageSpaceStdDev.prototype.zg = function (a) {
                    this.Hg();
                    this.Ia(a, 1 /* Tb */);
                };
                ShaderImageSpaceStdDev.prototype.yg = function (a) {
                    this.Gg();
                    this.Ia(a, 3 /* Mc */);
                };
                ShaderImageSpaceStdDev.prototype.Fg = function () {
                    this.gl.disable(GL.BLEND);
                    this.gl.depthMask(true);
                    this.gl.enable(GL.DEPTH_TEST);
                };
                ShaderImageSpaceStdDev.prototype.Hg = function () {
                    this.gl.depthMask(false);
                    this.gl.enable(GL.DEPTH_TEST);
                    this.gl.enable(GL.BLEND);
                    this.gl.blendFuncSeparate(GL.SRC_ALPHA_SATURATE, GL.ONE, GL.ONE, GL.ONE);
                };
                ShaderImageSpaceStdDev.prototype.Gg = function () {
                    this.gl.depthMask(false);
                    this.gl.enable(GL.DEPTH_TEST);
                    this.gl.enable(GL.BLEND);
                    this.gl.blendFunc(GL.ONE_MINUS_DST_ALPHA, GL.ONE);
                };
                ShaderImageSpaceStdDev.prototype.Ia = function (a, passIndex) {
                    var c = a.F.length;
                    var viewMatrix = this.gl.viewMatrix;
                    for (var f = 0; f < c; f++) {
                        var l = a.mc(f);
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
                            }
                            else {
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
                        this.gl.draw(this, a.mc(0).ka.vertexAttributesArray, a.F);
                    }
                };
                ShaderImageSpaceStdDev.prototype.setup = function () {
                    this.vertexShaderSrc = "attribute vec2 aVertexPosition; \n" + "attribute vec2 aLoopBlinnTextureCoord; \n" + "attribute vec2 aTextureCoord; \n" + "attribute float aIsConvex; \n" + "uniform mat4 uMVMatrix; \n" + "varying vec4 vTexCoord; \n" + "varying float vIsConvex; \n" + "void main(void) { \n" + "gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0); \n" + "vTexCoord = vec4(aLoopBlinnTextureCoord, aTextureCoord); \n" + "vIsConvex = aIsConvex; \n" + "}";
                    this.fragmentShaderSrc = "#extension GL_OES_standard_derivatives : enable \n" + "precision mediump float; \n" + "varying vec4 vTexCoord; \n" + "varying float vIsConvex; \n" + "uniform vec4 uColorXformMultiplier; \n" + "uniform vec4 uColorXformOffset; \n" + "uniform sampler2D uSamplers[2]; \n" + "uniform int uSamplerIndex; \n" + "uniform ivec2 uOverflowTypeAndPassIndex; \n" + "uniform vec4 uFrame; \n" + "void main(void) { \n" + "vec2 px = dFdx(vTexCoord.xy); \n" + "vec2 py = dFdy(vTexCoord.xy); \n" + "vec2 f = (2.0 * vTexCoord.x) * vec2(px.x, py.x) - vec2(px.y, py.y); \n" + "float sd = vIsConvex * (vTexCoord.x * vTexCoord.x - vTexCoord.y) / length(f); \n" + "float alpha = min(0.5 - sd, 1.0); \n" + "float t = max(1.0 - float(uOverflowTypeAndPassIndex.y), 0.0); \n" + "if (alpha < t || alpha == 0.0 || (uOverflowTypeAndPassIndex.y == 1 && alpha == 1.0)) \n" + "discard; \n" + "vec2 uv; \n" + "if (uOverflowTypeAndPassIndex.x == 0) { /* solid fill */ \n" + "uv = vTexCoord.zw; \n" + "} else if (uOverflowTypeAndPassIndex.x == 1) { /* gradient and bitmap fill with overflow type extend */ \n" + "uv = clamp(vTexCoord.zw, vec2(0.0, 0.0), vec2(1.0, 1.0)) * uFrame.zw + uFrame.xy; \n" + "} else if (uOverflowTypeAndPassIndex.x == 2) { /* gradient and bitmap fill with overflow type repeat */ \n" + "uv = fract(vTexCoord.zw) * uFrame.zw + uFrame.xy; \n" + "} else if (uOverflowTypeAndPassIndex.x == 3) { /* gradient fill with overflow type reflect */ \n" + "uv = vTexCoord.zw; \n" + "if (uv.s > 1.0) { \n" + "float integerPart = floor(uv.s); \n" + "float fracPart = mod(uv.s, 1.0); \n" + "float odd = mod(integerPart, 2.0); \n" + "if (odd == 1.0) { /* if the uv.s lies on the odd number of band towards the right side */ \n" + "uv.s = 1.0 - fracPart; \n" + "} else { /* if the uv.s lies on the even number of band towards the right side */ \n" + "uv.s = fracPart; \n" + "} \n" + "} else if (uv.s < 0.0) { \n" + "float integerPart = floor(uv.s); \n" + "float fracPart = mod(uv.s, 1.0); \n" + "float odd = mod(integerPart, 2.0); \n" + "if (integerPart == 0.0) { /* special case for left side */ \n" + "uv.s = fracPart; \n" + "} else if (odd == 1.0) { /* if the uv.s lies on the odd number of band towards the left side */ \n" + "uv.s = 1.0 - fracPart; \n" + "} else { /* if the uv.s lies on the even number of band towards the left side */ \n" + "uv.s = fracPart; \n" + "} \n" + "} \n" + "uv = (uFrame.xy + (uv * uFrame.zw)); \n" + "} \n" + "vec4 c = texture2D(uSamplers[0], uv); \n" + "if (uSamplerIndex == 1) {\n" + "c = texture2D(uSamplers[1], uv); \n" + "} \n" + "c = c * uColorXformMultiplier + uColorXformOffset; \n" + "c.a = c.a * alpha; \n" + "if (uOverflowTypeAndPassIndex.y == 2) {\n" + "c.rgb = c.rgb * c.a; \n" + "} \n" + "gl_FragColor = c; \n" + "}";
                    this.vertexShader = this.gl.createShader(GL.VERTEX_SHADER, this.vertexShaderSrc);
                    this.fragmentShader = this.gl.createShader(GL.FRAGMENT_SHADER, this.fragmentShaderSrc);
                    this.program = this.gl.createProgram();
                    this.gl.attachShader(this.program, this.vertexShader);
                    this.gl.attachShader(this.program, this.fragmentShader);
                    this._id = this.gl.linkProgram(this.program);
                    if (this._id < 0) {
                        this.gl.deleteProgram(this.program);
                        Logger.error("Program linking failed.");
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
                    this._uniforms = new Uniforms([u0, u1, u2, u3, u4, u5, u6]);
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
                    this._attribs = new Attributes([a0, a1, a2, a3]);
                    return true;
                };
                ShaderImageSpaceStdDev.prototype.destroy = function () {
                    this.gl.deleteShader(this.vertexShader);
                    this.gl.deleteShader(this.fragmentShader);
                    this.gl.deleteProgram(this.program);
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
        var shaders;
        (function (shaders) {
            var GL = flwebgl.e.GL;
            var ShaderImageSpaceCoverage = (function () {
                function ShaderImageSpaceCoverage() {
                    console.log("ShaderImageSpaceCoverage");
                }
                Object.defineProperty(ShaderImageSpaceCoverage.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    enumerable: true,
                    configurable: true
                });
                ShaderImageSpaceCoverage.prototype.setGL = function (gl) {
                    this.gl = gl;
                    return this.setup();
                };
                ShaderImageSpaceCoverage.prototype.activate = function () {
                    this.gl.useProgram(this.program);
                    this.gl.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
                    this.gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                    this.gl.useProgram(this.program);
                    this.gl.disable(GL.BLEND);
                    this.gl.depthMask(false);
                    this.gl.disable(GL.DEPTH_TEST);
                    this.Eg();
                };
                ShaderImageSpaceCoverage.prototype.Eg = function () {
                    this.gl.vertexAttribPointer(0, 2, GL.FLOAT, false, 0, 0);
                    this.gl.vertexAttribPointer(1, 2, GL.FLOAT, false, 0, 32);
                };
                ShaderImageSpaceCoverage.prototype.draw = function (a, b) {
                    this.setUniformValues(b.colorMapTexture, b.coverageMapTexture);
                    this.gl.drawElements(this.indexBufferValues.length);
                };
                ShaderImageSpaceCoverage.prototype.setUniformValues = function (colorMapTexture, coverageMapTexture) {
                    this.gl.uniform1i(this.uniformLocColorMap, colorMapTexture);
                    this.gl.uniform1i(this.uniformLocCoverageMap, coverageMapTexture);
                };
                ShaderImageSpaceCoverage.prototype.setup = function () {
                    this.vertexShaderSrc = "attribute vec2 aVertexPosition; \n" + "attribute vec2 aTextureCoord; \n" + "varying vec2 vTextureCoord; \n" + "void main(void ) { \n" + "gl_Position = vec4(aVertexPosition, 1.0, 1.0); \n" + "vTextureCoord = aTextureCoord; \n" + "}";
                    this.fragmentShaderSrc = "precision mediump float; \n" + "uniform sampler2D uColorMap; \n" + "uniform sampler2D uCoverageMap; \n" + "varying vec2 vTextureCoord; \n" + "void main() { \n" + "vec4 cov = texture2D(uCoverageMap, vTextureCoord); \n" + "vec4 color = texture2D(uColorMap, vTextureCoord); \n" + "gl_FragColor = cov + (color * (1.0 - cov.a)); \n" + "}";
                    this.vertexBuffer = this.gl.createBuffer();
                    if (!this.vertexBuffer) {
                        return false;
                    }
                    this.indexBuffer = this.gl.createBuffer();
                    if (!this.indexBuffer) {
                        return false;
                    }
                    this.vertexShader = this.gl.createShader(GL.VERTEX_SHADER, this.vertexShaderSrc);
                    this.fragmentShader = this.gl.createShader(GL.FRAGMENT_SHADER, this.fragmentShaderSrc);
                    this.program = this.gl.createProgram();
                    this.gl.attachShader(this.program, this.vertexShader);
                    this.gl.attachShader(this.program, this.fragmentShader);
                    this.gl.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
                    this.gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                    this.gl.enableVertexAttribArray(0);
                    this.gl.enableVertexAttribArray(1);
                    this.gl.bindAttribLocation(this.program, 0, "aVertexPosition");
                    this.gl.bindAttribLocation(this.program, 1, "aTextureCoord");
                    this._id = this.gl.linkProgram(this.program);
                    if (this._id < 0) {
                        this.gl.deleteProgram(this.program);
                        return false;
                    }
                    this.uniformLocColorMap = this.gl.getUniformLocation(this.program, "uColorMap");
                    this.uniformLocCoverageMap = this.gl.getUniformLocation(this.program, "uCoverageMap");
                    this.vertexBufferValues = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 0, 1, 1, 0, 1]);
                    this.indexBufferValues = new Uint16Array([0, 1, 2, 0, 2, 3]);
                    this.gl.bufferData(GL.ARRAY_BUFFER, this.vertexBufferValues, GL.STATIC_DRAW);
                    this.gl.bufferData(GL.ELEMENT_ARRAY_BUFFER, this.indexBufferValues, GL.STATIC_DRAW);
                    return true;
                };
                ShaderImageSpaceCoverage.prototype.destroy = function () {
                    this.gl.deleteBuffer(this.vertexBuffer);
                    this.gl.deleteBuffer(this.indexBuffer);
                    this.gl.deleteShader(this.vertexShader);
                    this.gl.deleteShader(this.fragmentShader);
                    this.gl.deleteProgram(this.program);
                };
                return ShaderImageSpaceCoverage;
            })();
            shaders.ShaderImageSpaceCoverage = ShaderImageSpaceCoverage;
        })(shaders = e.shaders || (e.shaders = {}));
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var e;
    (function (_e) {
        var renderers;
        (function (renderers) {
            var GL = flwebgl.e.GL;
            var Pe = flwebgl.e.Pe;
            var Mesh = flwebgl.e.Mesh;
            var ShaderImageSpace = flwebgl.e.shaders.ShaderImageSpace;
            var ShaderImageSpaceStdDev = flwebgl.e.shaders.ShaderImageSpaceStdDev;
            var ShaderImageSpaceCoverage = flwebgl.e.shaders.ShaderImageSpaceCoverage;
            var RendererImageSpace = (function () {
                function RendererImageSpace() {
                    this.fe = 0;
                }
                RendererImageSpace.prototype.setGL = function (gl) {
                    this.gl = gl;
                    this.shader = gl.hasExtension("OES_standard_derivatives") ? new ShaderImageSpaceStdDev() : new ShaderImageSpace();
                    this.shaderCoverage = new ShaderImageSpaceCoverage();
                    this.cg = new Pe();
                    this.Ab = [];
                    this.vg = [];
                    this.fe = 0;
                    this.Ue = {};
                    this.We = {};
                    return this.shader.setGL(gl) && this.shaderCoverage.setGL(gl);
                };
                RendererImageSpace.prototype.e = function (a) {
                    this.rl = this.gl.getRenderTarget();
                    this.ld();
                    this.Qg(a);
                    this.nf(0 /* oc */);
                    this.Ia(0 /* oc */, this.cg);
                    for (a = 0; a < this.Ab.length; ++a) {
                        var c = this.Ab[a].type;
                        var d = this.Ab[a].sf;
                        this.nf(c);
                        this.Ia(c, d);
                    }
                    this.Ab.splice(0, this.Ab.length);
                    this.gl.activateRenderTarget(this.rl);
                    a = this.gl.activateRenderTargetTexture(this.Yc);
                    c = this.gl.activateRenderTargetTexture(this.Zc);
                    this.shaderCoverage.activate();
                    this.shaderCoverage.draw(void 0, {
                        colorMapTexture: a,
                        coverageMapTexture: c
                    });
                };
                RendererImageSpace.prototype.ld = function () {
                    this.ne();
                    this.shader.activate();
                    var a = this.gl.getViewport();
                    var b = this.Yk();
                    this.Yc = this.Ue[b];
                    if (this.Yc === void 0) {
                        this.Yc = this.gl.createRenderTarget(a.width, a.height);
                        this.Ue[b] = this.Yc;
                    }
                    this.Zc = this.We[b];
                    if (this.Zc === void 0) {
                        this.Zc = this.gl.createRenderTarget(a.width, a.height);
                        this.We[b] = this.Zc;
                    }
                    this.gl.activateRenderTarget(this.Yc);
                    var color = this.gl.getBackgroundColor();
                    this.gl.clearColor(color.red / 255, color.green / 255, color.blue / 255, color.alpha / 255);
                    this.gl.clear(true, true, false);
                    this.gl.activateRenderTarget(this.Zc);
                    this.gl.clearColor(0, 0, 0, 0);
                    this.gl.clear(true, true, false);
                };
                RendererImageSpace.prototype.nf = function (a) {
                    switch (a) {
                        case 0 /* oc */:
                            this.gl.activateRenderTarget(this.Yc);
                            break;
                        case 1 /* Tb */:
                        case 3 /* Mc */:
                            this.gl.activateRenderTarget(this.Zc);
                            break;
                    }
                };
                RendererImageSpace.prototype.Ia = function (a, b) {
                    if (typeof b === "undefined") {
                        b = void 0;
                    }
                    this.shader.draw(b, a);
                    if (b !== void 0) {
                        b.clear();
                    }
                };
                RendererImageSpace.prototype.Qg = function (renderables) {
                    this.fe = 0;
                    var z;
                    var x;
                    var renderable;
                    var numRenderables = renderables.length;
                    for (var f = 0; f < numRenderables; f++) {
                        renderable = renderables[f];
                        var k;
                        for (k = 0; k < renderable.ra(Mesh.INTERNAL); k++) {
                            z = renderable.ab(Mesh.INTERNAL, k, this.gl);
                            if (z.isOpaque) {
                                this.cg.Dc(z);
                            }
                        }
                        for (k = 0; k < renderable.ra(Mesh.EXTERNAL); k++) {
                            z = renderable.ab(Mesh.EXTERNAL, k, this.gl);
                            if (z.isOpaque) {
                                this.cg.Dc(z);
                            }
                        }
                    }
                    var f = 0;
                    var e = 0;
                    var l = [];
                    while (e < numRenderables) {
                        var s = renderables[e].depth;
                        var m = s;
                        var n = -1;
                        var y = [];
                        var w = [];
                        var t = this.yi();
                        var q = this.yi();
                        for (var k = e; k < numRenderables; k++, f++) {
                            renderable = renderables[k];
                            var r = renderable.depth;
                            var u = false;
                            var A = renderable.ra(Mesh.INTERNAL);
                            var C = renderable.ra(Mesh.EXTERNAL);
                            var v;
                            for (v = 0; !u && v < A; ++v) {
                                u = !renderable.ab(Mesh.INTERNAL, v, this.gl).isOpaque;
                            }
                            for (v = 0; !u && v < C; ++v) {
                                u = !renderable.ab(Mesh.EXTERNAL, v, this.gl).isOpaque;
                            }
                            if (u) {
                                n = r;
                                if (m != n && (l.length > 0 || y.length > 0)) {
                                    if (l.length > 0) {
                                        y = y.concat(l);
                                    }
                                    for (var i = 0; i < y.length; i++) {
                                        t.Dc(y[i]);
                                    }
                                    this.Ab.push({
                                        type: 1 /* Tb */,
                                        sf: t
                                    });
                                    l = [];
                                    y = [];
                                }
                                break;
                            }
                            for (v = 0; v < C; v++) {
                                l.push(renderable.ab(Mesh.EXTERNAL, v, this.gl));
                                z = renderable.ab(Mesh.bb, v, this.gl);
                                if (z) {
                                    l.push(z);
                                }
                            }
                            if (!u && r != m) {
                                if (l.length > 0) {
                                    y = y.concat(l);
                                    l = [];
                                }
                                m = r;
                            }
                        }
                        if (f == numRenderables && n == -1 && l.length > 0) {
                            y = y.concat(l);
                            l = [];
                        }
                        if (n != -1 && n == s) {
                            for (k = f; k < numRenderables; ++k, ++f) {
                                renderable = renderables[k];
                                if (renderable.depth != n) {
                                    break;
                                }
                                A = renderable.ra(Mesh.INTERNAL);
                                for (v = 0; v < A; v++) {
                                    z = renderable.ab(Mesh.INTERNAL, v, this.gl);
                                    if (z && !z.isOpaque) {
                                        w.push(z);
                                    }
                                }
                                C = renderable.ra(Mesh.EXTERNAL);
                                for (v = 0; v < C; v++) {
                                    z = renderable.ab(Mesh.EXTERNAL, v, this.gl);
                                    x = renderable.ab(Mesh.bb, v, this.gl);
                                    if (z.isOpaque) {
                                        l.push(z);
                                        if (x) {
                                            l.push(x);
                                        }
                                    }
                                    else {
                                        w.push(z);
                                        if (x) {
                                            w.push(x);
                                        }
                                    }
                                }
                            }
                            if (w.length > 0) {
                                for (e = 0; e < w.length; ++e) {
                                    q.Dc(w[e]);
                                }
                                this.Ab.push({
                                    type: 3 /* Mc */,
                                    sf: q
                                });
                            }
                        }
                        else if (y.length > 0) {
                            for (e = 0; e < y.length; ++e) {
                                t.Dc(y[e]);
                            }
                            this.Ab.push({
                                type: 1 /* Tb */,
                                sf: t
                            });
                        }
                        e = f;
                    }
                    if (l.length > 0) {
                        this.Ab.push({
                            type: 1 /* Tb */,
                            sf: t
                        });
                    }
                };
                RendererImageSpace.prototype.Qi = function (a) {
                    switch (a) {
                        case 0 /* oc */:
                            this.gl.depthMask(true);
                            break;
                        case 1 /* Tb */:
                        case 3 /* Mc */:
                            this.gl.depthMask(false);
                            break;
                    }
                };
                RendererImageSpace.prototype.ne = function () {
                    this.gl.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
                    this.gl.enable(GL.BLEND);
                    this.gl.depthFunc(GL.LESS);
                    this.gl.clearDepth(1);
                    this.gl.depthMask(true);
                    this.gl.setDepthTest(true);
                };
                RendererImageSpace.prototype.yi = function () {
                    var a = void 0;
                    if (this.fe < this.vg.length) {
                        a = this.vg[this.fe];
                    }
                    else {
                        a = new Pe();
                        this.vg.push(a);
                    }
                    this.fe++;
                    return a;
                };
                RendererImageSpace.prototype.Yk = function () {
                    var viewport = this.gl.getViewport();
                    return GL.MAX_TEXTURE_SIZE * viewport.height + viewport.width;
                };
                RendererImageSpace.prototype.destroy = function () {
                    this.shader.destroy();
                    this.shaderCoverage.destroy();
                    for (var a in this.Ue) {
                        this.gl.deleteRenderTargetTexture(this.Ue[a]);
                    }
                    for (a in this.We) {
                        this.gl.deleteRenderTargetTexture(this.We[a]);
                    }
                };
                return RendererImageSpace;
            })();
            renderers.RendererImageSpace = RendererImageSpace;
        })(renderers = _e.renderers || (_e.renderers = {}));
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
                    return true;
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
                this.renderer = (options.antialias === 0 /* MSAA */) ? new RendererMSAA() : new RendererImageSpace();
                this.oa = [];
            }
            Renderer.prototype.setGL = function () {
                this.renderer.setGL(this.gl);
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
                        this.Kg = this.renderer;
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
                    this.oa[i].dirty = false;
                }
                this.oa.length = 0;
            };
            Renderer.prototype.e = function (a, b) {
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
                this.renderer.destroy();
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
    var events;
    (function (events) {
        var Event = (function () {
            function Event(type, bubbles) {
                if (bubbles === void 0) { bubbles = false; }
                this._type = type;
                this._bubbles = bubbles;
                this._stopped = false;
                this._stoppedImmediate = false;
            }
            Object.defineProperty(Event.prototype, "type", {
                get: function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "bubbles", {
                get: function () {
                    return this._bubbles;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "target", {
                get: function () {
                    return this._target;
                },
                set: function (value) {
                    this._target = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "currentTarget", {
                get: function () {
                    return this._currentTarget;
                },
                set: function (value) {
                    this._currentTarget = value;
                },
                enumerable: true,
                configurable: true
            });
            Event.prototype.stopPropagation = function () {
                this._stopped = true;
            };
            Event.prototype.stopImmediatePropagation = function () {
                this._stoppedImmediate = true;
            };
            Event.ADDED = "flwebgl.events.Event.ADDED";
            Event.REMOVED = "flwebgl.events.Event.REMOVED";
            Event.UPDATED = "flwebgl.events.Event.UPDATED";
            Event.ENTER_FRAME = "flwebgl.events.Event.ENTER_FRAME";
            Event.EXIT_FRAME = "flwebgl.events.Event.EXIT_FRAME";
            Event.FRAME_CONSTRUCTED = "flwebgl.events.Event.FRAME_CONSTRUCTED";
            return Event;
        })();
        events.Event = Event;
    })(events = flwebgl.events || (flwebgl.events = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var events;
    (function (events) {
        var EventDispatcher = (function () {
            function EventDispatcher() {
                this.listenerMap = {};
            }
            EventDispatcher.prototype.addEventListener = function (type, listener) {
                var listeners = this.listenerMap[type];
                if (!listeners) {
                    listeners = this.listenerMap[type] = [];
                }
                if (!this.hasEventListener(type, listener)) {
                    listeners.push(listener);
                }
            };
            EventDispatcher.prototype.hasEventListener = function (type, listener) {
                var listeners = this.listenerMap[type];
                if (!listeners || listeners.length === 0) {
                    return false;
                }
                if (listener) {
                    for (var i = 0; i < listeners.length; i++) {
                        if (listeners[i] === listener) {
                            return true;
                        }
                    }
                    return false;
                }
                return true;
            };
            EventDispatcher.prototype.removeEventListener = function (type, listener) {
                var listeners = this.listenerMap[type];
                if (listeners) {
                    for (var i = 0; i < listeners.length; i++) {
                        if (listeners[i] === listener) {
                            listeners.splice(i, 1);
                        }
                    }
                }
            };
            EventDispatcher.prototype.dispatchEvent = function (event) {
                event.target = this;
                this.dispatch(event);
            };
            EventDispatcher.prototype.dispatch = function (event) {
                var listeners = this.listenerMap[event.type];
                if (listeners && listeners.length) {
                    listeners = listeners.slice(0);
                    event.currentTarget = this;
                    for (var i = 0; i < listeners.length && !event._stoppedImmediate; i++) {
                        listeners[i](event);
                    }
                }
            };
            EventDispatcher.prototype.removeAllListeners = function () {
                this.listenerMap = {};
            };
            return EventDispatcher;
        })();
        events.EventDispatcher = EventDispatcher;
    })(events = flwebgl.events || (flwebgl.events = {}));
})(flwebgl || (flwebgl = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var flwebgl;
(function (flwebgl) {
    var g;
    (function (g) {
        var EventDispatcher = flwebgl.events.EventDispatcher;
        var ColorTransform = flwebgl.geom.ColorTransform;
        var Matrix = flwebgl.geom.Matrix;
        var Mesh = flwebgl.e.Mesh;
        var DisplayObject = (function (_super) {
            __extends(DisplayObject, _super);
            function DisplayObject() {
                _super.call(this);
                this._localTransform = new Matrix();
                this._globalTransform = new Matrix();
                this._localColorTransform = new ColorTransform();
                this._globalColorTransform = new ColorTransform();
                this._visible = true;
                this._dirty = true;
                this.W = 0;
            }
            Object.defineProperty(DisplayObject.prototype, "id", {
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    this._id = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "name", {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    this._name = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "parent", {
                get: function () {
                    return this._parent;
                },
                set: function (value) {
                    this._parent = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "depth", {
                get: function () {
                    return this._globalTransform.getValue(2, 2);
                },
                set: function (value) {
                    this._globalTransform.setValue(2, 2, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "dirty", {
                get: function () {
                    return this._dirty;
                },
                set: function (value) {
                    this._dirty = value;
                },
                enumerable: true,
                configurable: true
            });
            DisplayObject.prototype.isVisible = function () {
                return this._visible;
            };
            DisplayObject.prototype.setVisible = function (value, dirty) {
                if (dirty === void 0) { dirty = true; }
                if (dirty) {
                    this.W |= 4;
                }
                this._visible = value;
            };
            DisplayObject.prototype.getLocalTransform = function () {
                return this._localTransform.clone();
            };
            DisplayObject.prototype.setLocalTransform = function (transform, dirty) {
                if (dirty === void 0) { dirty = true; }
                if (dirty) {
                    this.W |= 1;
                }
                this._dirty = true;
                this._localTransform = transform.clone();
            };
            DisplayObject.prototype.getGlobalTransform = function () {
                return this._globalTransform.clone();
            };
            DisplayObject.prototype.getLocalColorTransform = function () {
                return this._localColorTransform.clone();
            };
            DisplayObject.prototype.setLocalColorTransform = function (colorTransform, dirty) {
                if (colorTransform === void 0) { colorTransform = null; }
                if (dirty === void 0) { dirty = true; }
                if (dirty) {
                    this.W |= 2;
                }
                this._dirty = true;
                if (colorTransform) {
                    this._localColorTransform = colorTransform.clone();
                }
                else {
                    this._localColorTransform.identity();
                }
            };
            DisplayObject.prototype.getGlobalColorTransform = function () {
                return this._globalColorTransform.clone();
            };
            DisplayObject.prototype.setTransforms = function (transform, colorTransform) {
                if (transform) {
                    this._globalTransform.copy(transform);
                    this._globalTransform.multiply(this._localTransform);
                }
                else {
                    this._globalTransform.copy(this._localTransform);
                }
                if (colorTransform) {
                    this._globalColorTransform.copy(colorTransform);
                    this._globalColorTransform.concat(this._localColorTransform);
                }
                else {
                    this._globalColorTransform.copy(this._localColorTransform);
                }
            };
            DisplayObject.prototype.Qb = function (a) {
            };
            DisplayObject.prototype.getBounds = function (target, fast, edgeType, k) {
                if (target === void 0) { target = this; }
                if (fast === void 0) { fast = true; }
                if (edgeType === void 0) { edgeType = Mesh.EXTERNAL; }
                if (k === void 0) { k = false; }
                return null;
            };
            DisplayObject.prototype.destroy = function () {
                this._id = "-1";
                this._parent = void 0;
            };
            return DisplayObject;
        })(EventDispatcher);
        g.DisplayObject = DisplayObject;
    })(g = flwebgl.g || (flwebgl.g = {}));
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
                        this.scripts[frameIdx] = [script.name];
                    }
                    else {
                        this.scripts[frameIdx].push(script.name);
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
    var media;
    (function (media) {
        var Sound = (function () {
            function Sound(id, name, src) {
                this.id = id;
                this.name = name;
                this.src = src;
            }
            Sound.prototype.Bn = function () {
                this.cf = true;
            };
            return Sound;
        })();
        media.Sound = Sound;
    })(media = flwebgl.media || (flwebgl.media = {}));
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
            AssetPool.prototype.setSound = function (sound) {
                this.soundMap[sound.id] = sound;
            };
            AssetPool.prototype.getSounds = function () {
                var sounds = [];
                var i = 0;
                for (var id in this.soundMap) {
                    sounds[i++] = this.soundMap[id];
                }
                return sounds;
            };
            AssetPool.prototype.getNextAvailableAssetID = function () {
                if (this.nextAvailableAssetID === -1) {
                    var i;
                    var meshes = this.getMeshes();
                    var meshCount = meshes.length;
                    for (i = 0; i < meshCount; i++) {
                        var mesh = meshes[i];
                        var meshID = +mesh.id;
                        if (this.nextAvailableAssetID < meshID) {
                            this.nextAvailableAssetID = meshID;
                        }
                    }
                    var timelines = this.getTimelines();
                    var timelineCount = timelines.length;
                    for (i = 0; i < timelineCount; i++) {
                        var timeline = timelines[i];
                        var timelineID = +timeline.id;
                        if (this.nextAvailableAssetID < timelineID) {
                            this.nextAvailableAssetID = timelineID;
                        }
                    }
                }
                return ++this.nextAvailableAssetID;
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
    var media;
    (function (media) {
        var SoundFactory = (function () {
            function SoundFactory() {
            }
            SoundFactory.prototype.loadSounds = function (sounds, callback) {
            };
            return SoundFactory;
        })();
        media.SoundFactory = SoundFactory;
    })(media = flwebgl.media || (flwebgl.media = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var B;
    (function (B) {
        var commands;
        (function (commands) {
            var Matrix = flwebgl.geom.Matrix;
            var PlaceObjectCommand = (function () {
                function PlaceObjectCommand(a) {
                    this.timelineID = "" + a[0];
                    this.hf = "" + a[1];
                    this.targetID = "" + a[2];
                    var len = a.length;
                    this.transform = (len > 4) ? new Matrix(a.slice(3)) : new Matrix();
                    if (len == 10 || len == 4) {
                        this.instanceName = a[len - 1];
                    }
                }
                PlaceObjectCommand.prototype.execute = function (mc, context, x) {
                    var childIndex = mc.getChildIndexByID(this.targetID);
                    if (childIndex < 0) {
                        return (this.Ek(mc, context.assetPool, context.sceneGraphFactory) >= 0);
                    }
                    else {
                        var child = mc.getChildAt(childIndex);
                        if ((child.W & 1) === 0) {
                            child.setLocalTransform(this.transform, false);
                        }
                        if ((child.W & 2) === 0) {
                            var cxform = child.getLocalColorTransform().clone();
                            cxform.identity();
                            child.setLocalColorTransform(cxform, false);
                        }
                        var e = mc.getChildIndexByID(this.hf) + 1;
                        while (mc.getChildAt(e) && +mc.getChildAt(e).id < 0) {
                            e++;
                        }
                        if (e > childIndex) {
                            e--;
                        }
                        mc.swap(childIndex, e);
                        if ((child.W & 4) === 0) {
                            child.setVisible(true, false);
                        }
                        return true;
                    }
                };
                PlaceObjectCommand.prototype.Ek = function (mc, assetPool, sceneGraphFactory) {
                    var dobj = (assetPool.getMesh(this.timelineID) === void 0) ? sceneGraphFactory.createMovieClip(this.timelineID, this.targetID) : sceneGraphFactory.createShape(this.timelineID, this.targetID);
                    dobj.setLocalTransform(this.transform, false);
                    if (this.instanceName !== void 0) {
                        dobj.name = this.instanceName;
                    }
                    var index = mc.getChildIndexByID(this.hf) + 1;
                    while (mc.getChildAt(index) && +mc.getChildAt(index).id < 0) {
                        index++;
                    }
                    return mc.addChildAt(dobj, index, false, true) ? index : -1;
                };
                return PlaceObjectCommand;
            })();
            commands.PlaceObjectCommand = PlaceObjectCommand;
        })(commands = B.commands || (B.commands = {}));
    })(B = flwebgl.B || (flwebgl.B = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var g;
    (function (g) {
        var Rect = flwebgl.geom.Rect;
        var Event = flwebgl.events.Event;
        var Mesh = flwebgl.e.Mesh;
        var PlaceObjectCommand = flwebgl.B.commands.PlaceObjectCommand;
        var MovieClip = (function (_super) {
            __extends(MovieClip, _super);
            function MovieClip() {
                _super.call(this);
                this._id = "-1";
                this.loop = true;
                this._isPlaying = true;
                this.children = [];
                this.childrenDeferred = [];
                this.currentFrameIndex = -1;
                this.Ui = false;
                this.df = false;
                this.Td = false;
            }
            MovieClip.prototype.addChild = function (dobj, e) {
                if (e === void 0) { e = true; }
                return this.addChildAt(dobj, 0, e);
            };
            MovieClip.prototype.addChildAt = function (dobj, index, e, defer) {
                if (e === void 0) { e = true; }
                if (defer === void 0) { defer = false; }
                if (index == void 0 || index == null || index > this.getNumChildren()) {
                    return false;
                }
                if (index < 0) {
                    index = 0;
                }
                if (e) {
                    dobj.id = "-1";
                }
                if (dobj.parent) {
                    dobj.parent.removeChild(dobj);
                }
                if (defer) {
                    this.childrenDeferred.push({
                        index: index,
                        displayObject: dobj
                    });
                    this.children.splice(index, 0, null);
                    return true;
                }
                dobj.parent = this;
                dobj.setTransforms(this._globalTransform, this._globalColorTransform);
                this.children.splice(index, 0, dobj);
                dobj.dispatchEvent(new Event(Event.ADDED, true));
                if (dobj instanceof MovieClip) {
                    var mc = dobj;
                    var p = this;
                    while (p.parent) {
                        p = p.parent;
                    }
                    if (p === this.context.getStage() && mc.currentFrame === 0) {
                        mc.advanceFrame();
                        mc.dispatchEnterFrame();
                        mc.constructFrame();
                        mc.dispatchFrameConstructed();
                        mc.executeFrameScripts();
                        mc.dispatchExitFrame();
                    }
                }
                return true;
            };
            MovieClip.prototype.removeChild = function (dobj) {
                return this.removeChildAt(this.getChildIndex(dobj));
            };
            MovieClip.prototype.removeChildAt = function (index) {
                if (index >= 0 && index != void 0 && index != null && index < this.getNumChildren()) {
                    var child = this.getChildAt(index);
                    if (!this.Td) {
                        child.dispatchEvent(new Event(Event.REMOVED, true));
                    }
                    this.children.splice(index, 1);
                    child.parent = void 0;
                    child.removeAllListeners();
                    return child;
                }
            };
            MovieClip.prototype.getNumChildren = function () {
                return this.children.length;
            };
            MovieClip.prototype.getChildren = function () {
                return this.children.slice(0);
            };
            MovieClip.prototype.getChildAt = function (index, includeDeferred) {
                if (includeDeferred === void 0) { includeDeferred = false; }
                var dobj;
                if (index < this.getNumChildren()) {
                    dobj = this.children[index];
                    if (dobj == null && includeDeferred) {
                        for (var i = 0; i < this.childrenDeferred.length; i++) {
                            if (this.childrenDeferred[i].index == index) {
                                dobj = this.childrenDeferred[i].displayObject;
                                break;
                            }
                        }
                    }
                }
                return dobj;
            };
            MovieClip.prototype.getChildIndex = function (dobj) {
                return this.children.indexOf(dobj);
            };
            MovieClip.prototype.setChildIndex = function (dobj, index) {
                this.swap(this.getChildIndex(dobj), index);
            };
            MovieClip.prototype.getChildByName = function (name) {
                for (var i = 0; i < this.children.length; i++) {
                    if (this.children[i].name === name) {
                        return this.children[i];
                    }
                }
                return void 0;
            };
            Object.defineProperty(MovieClip.prototype, "currentFrame", {
                get: function () {
                    return this.currentFrameIndex + 1;
                },
                enumerable: true,
                configurable: true
            });
            MovieClip.prototype.play = function () {
                this._isPlaying = true;
            };
            MovieClip.prototype.stop = function () {
                this._isPlaying = false;
            };
            Object.defineProperty(MovieClip.prototype, "isPlaying", {
                get: function () {
                    return this._isPlaying;
                },
                enumerable: true,
                configurable: true
            });
            MovieClip.prototype.gotoAndPlay = function (frame) {
                this.gotoFrame(frame, false);
            };
            MovieClip.prototype.gotoAndStop = function (frame) {
                this.gotoFrame(frame, true);
            };
            MovieClip.prototype.gotoFrame = function (frame, stop) {
                var frameNum;
                if (typeof frameNum === "string") {
                    var found = false;
                    var labels = this.timeline.labels;
                    for (var i = labels.length - 1; i >= 0; i--) {
                        if (labels[i].name === frame) {
                            frameNum = labels[i].frameNum;
                            found = true;
                            break;
                        }
                    }
                    if (found === false) {
                        return;
                    }
                }
                else {
                    frameNum = frame;
                }
                if (frameNum >= 1 && frameNum <= this.totalFrames && frameNum !== this.currentFrame) {
                    this.constructFrame(true);
                    this.play();
                    var e;
                    if (frameNum < this.currentFrame) {
                        e = (frameNum === 1);
                        this.resetPlayHead(!e);
                        this.constructFrame(!e);
                    }
                    while (this.currentFrame < frameNum) {
                        e = (frameNum === this.currentFrame + 1);
                        this.advanceFrame(true, e);
                        this.constructFrame(!e);
                    }
                    if (stop === false) {
                        this.play();
                    }
                    else {
                        this.stop();
                    }
                    this.dispatchFrameConstructed();
                    this.executeFrameScripts();
                    this.dispatchExitFrame();
                }
            };
            MovieClip.prototype.swap = function (a, b) {
                if (a !== b && a >= 0 && a < this.children.length && b >= 0 && b < this.children.length) {
                    this.children.splice(b, 0, this.children.splice(a, 1)[0]);
                    for (var i = 0; i < this.childrenDeferred.length; i++) {
                        var k = this.childrenDeferred[i];
                        if (k.index == a) {
                            k.index = b;
                        }
                        else {
                            if (k.index > a) {
                                k.index--;
                            }
                            if (k.index >= b) {
                                k.index++;
                            }
                        }
                    }
                }
            };
            MovieClip.prototype.dispatch = function (event) {
                _super.prototype.dispatch.call(this, event);
                if (this.parent && event.bubbles && !event._stopped) {
                    this.parent.dispatch(event);
                }
            };
            MovieClip.prototype.advanceFrame = function (a, b) {
                if (a === void 0) { a = false; }
                if (b === void 0) { b = false; }
                var i;
                var advance = this._isPlaying;
                if (advance && !this.loop && this.currentFrameIndex == this.totalFrames - 1) {
                    advance = false;
                }
                if (advance && this.currentFrameIndex == 0 && this.totalFrames == 1) {
                    advance = false;
                }
                if (advance) {
                    if (++this.currentFrameIndex == this.totalFrames) {
                        this.resetPlayHead(a);
                        this.constructFrame(a);
                    }
                    else {
                        var e = a && !b;
                        if (e) {
                            this.Td = true;
                        }
                        var cmds = this.timeline.getFrameCommands(this.currentFrameIndex);
                        for (i = 0; i < cmds.length; i++) {
                            cmds[i].execute(this, this.context, e);
                        }
                        this.Td = false;
                    }
                    this.df = true;
                }
                if (!a) {
                    for (i = 0; i < this.children.length; i++) {
                        if (this.children[i] instanceof MovieClip) {
                            this.children[i].advanceFrame(a);
                        }
                    }
                    for (i = 0; i < this.childrenDeferred.length; i++) {
                        if (this.childrenDeferred[i].displayObject instanceof MovieClip) {
                            this.childrenDeferred[i].displayObject.advanceFrame(a);
                        }
                    }
                }
            };
            MovieClip.prototype.dispatchFrameConstructed = function () {
                this.dispatchEvent(new Event(Event.FRAME_CONSTRUCTED));
                for (var a = 0; a < this.children.length; a++) {
                    if (this.children[a] instanceof MovieClip) {
                        this.children[a].dispatchFrameConstructed();
                    }
                }
            };
            MovieClip.prototype.dispatchEnterFrame = function () {
                this.dispatchEvent(new Event(Event.ENTER_FRAME));
                for (var a = 0; a < this.children.length; a++) {
                    if (this.children[a] instanceof MovieClip) {
                        this.children[a].dispatchEnterFrame();
                    }
                }
            };
            MovieClip.prototype.dispatchExitFrame = function () {
                this.dispatchEvent(new Event(Event.EXIT_FRAME));
                for (var a = 0; a < this.children.length; a++) {
                    if (this.children[a] instanceof MovieClip) {
                        this.children[a].dispatchExitFrame();
                    }
                }
            };
            MovieClip.prototype.constructFrame = function (silent) {
                if (silent === void 0) { silent = false; }
                var dobj;
                var i;
                for (i = 0; i < this.childrenDeferred.length; i++) {
                    dobj = this.childrenDeferred[i].displayObject;
                    this.children[this.childrenDeferred[i].index] = dobj;
                    dobj.parent = this;
                }
                for (i = 0; i < this.children.length; i++) {
                    if (this.children[i] instanceof MovieClip) {
                        this.children[i].constructFrame();
                    }
                }
                for (i = 0; i < this.childrenDeferred.length; i++) {
                    dobj = this.childrenDeferred[i].displayObject;
                    dobj.setTransforms(this._globalTransform, this._globalColorTransform);
                    if (!silent) {
                        dobj.dispatchEvent(new Event(Event.ADDED, true));
                    }
                }
                this.childrenDeferred = [];
            };
            MovieClip.prototype.executeFrameScripts = function () {
                var i;
                if (this.df) {
                    var scripts = this.timeline.getFrameScriptNames(this.currentFrameIndex);
                    for (i = 0; i < scripts.length; i++) {
                        this.executeFrameScript(scripts[i]);
                    }
                    this.df = false;
                }
                for (i = 0; i < this.children.length; i++) {
                    if (this.children[i] instanceof MovieClip) {
                        this.children[i].executeFrameScripts();
                    }
                }
            };
            MovieClip.prototype.getFrameLabels = function () {
                var labelsCopy = [];
                var labels = this.timeline.labels;
                for (var i = 0; i < labels.length; i++) {
                    labelsCopy.push({
                        frameNum: labels[i].frameNum,
                        name: labels[i].name
                    });
                }
                return labelsCopy;
            };
            MovieClip.prototype.getCurrentFrameLabel = function () {
                var name;
                var labels = this.timeline.labels;
                var currentFrame = this.currentFrame;
                for (var i = labels.length - 1; i >= 0; i--) {
                    if (labels[i].frameNum === currentFrame) {
                        name = labels[i].name;
                    }
                }
                return name;
            };
            MovieClip.prototype.getCurrentLabel = function () {
                var name;
                var frameNum = -1;
                var labels = this.timeline.labels;
                for (var i = 0; i < labels.length; i++) {
                    if (labels[i].frameNum >= frameNum && labels[i].frameNum <= this.currentFrame) {
                        name = labels[i].name;
                        frameNum = labels[i].frameNum;
                    }
                }
                return name;
            };
            MovieClip.prototype.getChildIndexByID = function (id) {
                if (+id < 0) {
                    return -1;
                }
                var i;
                for (i = 0; i < this.children.length; i++) {
                    if (this.children[i] && this.children[i].id === id) {
                        return i;
                    }
                }
                for (i = 0; i < this.childrenDeferred.length; i++) {
                    if (this.childrenDeferred[i].displayObject.id === id) {
                        return this.childrenDeferred[i].index;
                    }
                }
                return -1;
            };
            MovieClip.prototype.Of = function (timeline) {
                this.timeline = timeline;
                this.totalFrames = timeline.commands.length;
                this.currentFrameIndex = -1;
            };
            MovieClip.prototype.$j = function (a) {
                this.pa = a;
                this.Ui = true;
            };
            MovieClip.prototype.setTransforms = function (transform, colorTransform) {
                _super.prototype.setTransforms.call(this, transform, colorTransform);
                for (var i = 0; i < this.children.length; ++i) {
                    if (!this.children[i]) {
                        debugger;
                    }
                    this.children[i].setTransforms(this._globalTransform, this._globalColorTransform);
                }
                if (this.pa !== void 0) {
                    if (this._globalColorTransform.equals(this.pa.getColorTransform())) {
                        this.pa.setTransforms(this._globalTransform);
                    }
                    else {
                        this.oi();
                    }
                }
            };
            MovieClip.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                this.timeline = void 0;
                while (this.children.length) {
                    this.children.pop().destroy();
                }
            };
            MovieClip.prototype.resetPlayHead = function (a) {
                if (a === void 0) { a = false; }
                this.currentFrameIndex = 0;
                if (a) {
                    this.Td = true;
                }
                var k;
                var placeObjectCmds = [];
                var cmd;
                var cmds = this.timeline.getFrameCommands(0);
                for (k = 0; k < cmds.length; ++k) {
                    cmd = cmds[k];
                    if (cmd instanceof PlaceObjectCommand) {
                        placeObjectCmds.push(cmd.targetID);
                    }
                }
                for (k = 0; k < this.getNumChildren(); ++k) {
                    var dobj = this.getChildAt(k);
                    if (dobj.id !== "-1") {
                        var d = true;
                        if (placeObjectCmds.length > 0) {
                            for (var n = 0; n < placeObjectCmds.length; ++n) {
                                if (placeObjectCmds[n] === dobj.id) {
                                    placeObjectCmds.splice(n, 1);
                                    d = false;
                                    break;
                                }
                            }
                        }
                        if (d) {
                            this.removeChildAt(k);
                            dobj.destroy();
                            k--;
                        }
                    }
                }
                for (k = 0; k < cmds.length; ++k) {
                    cmd = cmds[k];
                    cmd.execute(this, this.context, a);
                }
                this.Td = false;
                this.df = true;
            };
            MovieClip.prototype.oi = function () {
                if (this.pa !== void 0) {
                    this.pa.destroy();
                    this.pa = void 0;
                }
            };
            MovieClip.prototype.Qb = function (a) {
                var e;
                if (this.isVisible()) {
                    if (this.pa === void 0) {
                        var b = a.length;
                        for (e = 0; e < this.children.length; ++e) {
                            this.children[e].Qb(a);
                        }
                        if (this._dirty) {
                            for (e = b; e < a.length; ++e) {
                                a[e].dirty = true;
                            }
                        }
                    }
                    else {
                        b = [];
                        for (e = 0; e < this.children.length; ++e) {
                            this.children[e].Qb(b);
                        }
                        var k = false;
                        for (e = 0; !k && e < b.length; ++e) {
                            k = b[e].dirty;
                        }
                        if (k) {
                            this.oi();
                            for (e = 0; e < b.length; ++e) {
                                b[e].dirty = true;
                                a.push(b[e]);
                            }
                        }
                        else {
                            this.pa.Qb(a);
                        }
                    }
                    this._dirty = false;
                }
            };
            MovieClip.prototype.getBounds = function (target, fast, edgeType, k) {
                if (target === void 0) { target = this; }
                if (fast === void 0) { fast = true; }
                if (edgeType === void 0) { edgeType = Mesh.EXTERNAL; }
                if (k === void 0) { k = false; }
                var bounds = new Rect();
                for (var i = 0; i < this.children.length; i++) {
                    bounds.union(this.children[i].getBounds(target, fast, edgeType, k));
                }
                return bounds;
            };
            MovieClip.prototype.executeFrameScript = function (name) {
                eval("flwebgl.actions." + name + ".call(this);");
            };
            return MovieClip;
        })(g.DisplayObject);
        g.MovieClip = MovieClip;
    })(g = flwebgl.g || (flwebgl.g = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var g;
    (function (g) {
        var Matrix = flwebgl.geom.Matrix;
        var Point = flwebgl.geom.Point;
        var Rect = flwebgl.geom.Rect;
        var Mesh = flwebgl.e.Mesh;
        var MeshInstanced = flwebgl.e.MeshInstanced;
        var Shape = (function (_super) {
            __extends(Shape, _super);
            function Shape() {
                _super.call(this);
                this.mf = new MeshInstanced(this);
            }
            Shape.prototype.Ic = function () {
                return this.yc;
            };
            Shape.prototype.Of = function (mesh) {
                this.yc = mesh;
            };
            Shape.prototype.Qb = function (a) {
                if (this.isVisible()) {
                    this.mf.dirty = this.dirty;
                    a.push(this.mf);
                }
                this._dirty = false;
            };
            Shape.prototype.getBounds = function (target, fast, edgeType, k) {
                if (target === void 0) { target = this; }
                if (fast === void 0) { fast = true; }
                if (edgeType === void 0) { edgeType = Mesh.EXTERNAL; }
                if (k === void 0) { k = false; }
                var targetConcat;
                var thisConcat;
                if (k === true) {
                    targetConcat = target.getGlobalTransform();
                    thisConcat = this.getGlobalTransform();
                }
                else {
                    targetConcat = new Matrix();
                    var dobj = target;
                    while (dobj) {
                        targetConcat.concat(dobj.getLocalTransform());
                        dobj = dobj.parent;
                    }
                    targetConcat.invert();
                    thisConcat = new Matrix();
                    dobj = this;
                    while (dobj) {
                        thisConcat.concat(dobj.getLocalTransform());
                        dobj = dobj.parent;
                    }
                    thisConcat.concat(targetConcat);
                }
                return fast ? thisConcat.transformBoundsAABB(this.yc.bounds) : this.calculateBoundsAABB(edgeType, thisConcat);
            };
            Shape.prototype.calculateBoundsAABB = function (a, transform) {
                var bounds = new Rect();
                var k = this.yc.ra(a);
                var p = new Point(0, 0);
                for (var i = 0; i < k; i++) {
                    var m = this.yc.yf(a, i);
                    var atlasIDs = m.getAtlasIDs();
                    var vertexDataArr = m.getVertexData(atlasIDs[0]);
                    for (var j = 0; j < vertexDataArr.length; j++) {
                        var vertexData = vertexDataArr[j];
                        var attrs = vertexData.vertexAttributes.attrs;
                        for (var k = 0; k < attrs.length; k++) {
                            var attr = attrs[k];
                            if (attr.name === "POSITION0") {
                                var vertices = vertexData.vertices;
                                var stride = vertexData.vertexAttributes.totalSize / Float32Array.BYTES_PER_ELEMENT;
                                for (var q = attr.byteOffset / Float32Array.BYTES_PER_ELEMENT; q < vertices.length; q += stride) {
                                    p.x = vertices[q];
                                    p.y = vertices[q + 1];
                                    p = transform.transformPoint(p);
                                    bounds.expand(p.x, p.y);
                                }
                                break;
                            }
                        }
                    }
                }
                return bounds;
            };
            Shape.prototype.dispatch = function (event) {
                _super.prototype.dispatch.call(this, event);
                if (this.parent && event.bubbles && !event._stopped) {
                    this.parent.dispatch(event);
                }
            };
            Shape.prototype.destroy = function () {
                this.id = "-1";
                this.parent = void 0;
                this.yc = void 0;
                this.mf.destroy();
            };
            return Shape;
        })(g.DisplayObject);
        g.Shape = Shape;
    })(g = flwebgl.g || (flwebgl.g = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var sg;
    (function (sg) {
        var MovieClip = flwebgl.g.MovieClip;
        var Shape = flwebgl.g.Shape;
        var SceneGraphFactory = (function () {
            function SceneGraphFactory(context, nextAvailableID) {
                this.context = context;
                this.nextAvailableID = nextAvailableID;
            }
            SceneGraphFactory.prototype.createMovieClipInstance = function (linkageName) {
                var timeline = this.context.assetPool.getTimelineByName(linkageName);
                return (!timeline || timeline.isScene) ? void 0 : this.createMovieClip(timeline.id, "-1");
            };
            SceneGraphFactory.prototype.createMovieClip = function (timelineID, mcID) {
                var mc = new MovieClip();
                mc.context = this.context;
                if (timelineID !== void 0) {
                    mc.Of(this.context.assetPool.getTimeline(timelineID));
                }
                mc.id = mcID;
                return mc;
            };
            SceneGraphFactory.prototype.createShape = function (meshID, shapeID) {
                var shape = new Shape();
                shape.Of(this.context.assetPool.getMesh(meshID));
                shape.id = shapeID;
                return shape;
            };
            SceneGraphFactory.prototype.getNextAvailableID = function () {
                return this.nextAvailableID++;
            };
            return SceneGraphFactory;
        })();
        sg.SceneGraphFactory = SceneGraphFactory;
    })(sg = flwebgl.sg || (flwebgl.sg = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var Context = (function () {
        function Context(renderer, assetPool, soundFactory) {
            this.renderer = renderer;
            this.assetPool = assetPool;
            this.soundFactory = soundFactory;
        }
        return Context;
    })();
    flwebgl.Context = Context;
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
    var B;
    (function (B) {
        var commands;
        (function (commands) {
            var Matrix = flwebgl.geom.Matrix;
            var SetTransformCommand = (function () {
                function SetTransformCommand(a) {
                    this.targetID = "" + a[0];
                    this.hf = "" + a[1];
                    this.transform = (a.length > 2) ? new Matrix(a.slice(2)) : new Matrix();
                }
                SetTransformCommand.prototype.execute = function (mc, context, x) {
                    var k = mc.getChildIndexByID(this.targetID);
                    if (k < 0) {
                        return false;
                    }
                    var child = mc.getChildAt(k);
                    var e = mc.getChildIndexByID(this.hf) + 1;
                    while (mc.getChildAt(e) && +mc.getChildAt(e).id < 0) {
                        e++;
                    }
                    if (e > k) {
                        e--;
                    }
                    if (e !== k) {
                        mc.swap(k, e);
                    }
                    if ((child.W & 1) === 0) {
                        child.setLocalTransform(this.transform, false);
                    }
                    return true;
                };
                return SetTransformCommand;
            })();
            commands.SetTransformCommand = SetTransformCommand;
        })(commands = B.commands || (B.commands = {}));
    })(B = flwebgl.B || (flwebgl.B = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var B;
    (function (B) {
        var commands;
        (function (commands) {
            var ColorTransform = flwebgl.geom.ColorTransform;
            var SetColorTransformCommand = (function () {
                function SetColorTransformCommand(a) {
                    this.targetID = "" + a[0];
                    a = a.slice(1);
                    if (a && a.length == 8) {
                        this.colorTransform = new ColorTransform(a[0], a[1] / 100, a[2], a[3] / 100, a[4], a[5] / 100, a[6], a[7] / 100);
                    }
                    else {
                        this.colorTransform = new ColorTransform();
                    }
                }
                SetColorTransformCommand.prototype.execute = function (mc, context, x) {
                    var b = mc.getChildIndexByID(this.targetID);
                    if (b < 0) {
                        return false;
                    }
                    var dobj = mc.getChildAt(b, true);
                    if ((dobj.W & 2) === 0) {
                        dobj.setLocalColorTransform(this.colorTransform, false);
                    }
                    return true;
                };
                return SetColorTransformCommand;
            })();
            commands.SetColorTransformCommand = SetColorTransformCommand;
        })(commands = B.commands || (B.commands = {}));
    })(B = flwebgl.B || (flwebgl.B = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var B;
    (function (B) {
        var commands;
        (function (commands) {
            var RemoveObjectCommand = (function () {
                function RemoveObjectCommand(a) {
                    this.targetID = "" + a[0];
                }
                RemoveObjectCommand.prototype.execute = function (mc, context, x) {
                    var b = mc.getChildIndexByID(this.targetID);
                    if (b < 0) {
                        return false;
                    }
                    var dobj = mc.getChildAt(b);
                    if (mc.removeChildAt(b)) {
                        dobj.destroy();
                    }
                    return true;
                };
                return RemoveObjectCommand;
            })();
            commands.RemoveObjectCommand = RemoveObjectCommand;
        })(commands = B.commands || (B.commands = {}));
    })(B = flwebgl.B || (flwebgl.B = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var xj;
    (function (xj) {
        var parsers;
        (function (parsers) {
            var Mesh = flwebgl.e.Mesh;
            var Sound = flwebgl.media.Sound;
            var Timeline = flwebgl.B.Timeline;
            var PlaceObjectCommand = flwebgl.B.commands.PlaceObjectCommand;
            var SetTransformCommand = flwebgl.B.commands.SetTransformCommand;
            var SetColorTransformCommand = flwebgl.B.commands.SetColorTransformCommand;
            var RemoveObjectCommand = flwebgl.B.commands.RemoveObjectCommand;
            var ParserRelease = (function () {
                function ParserRelease(content, parser, assetPool) {
                    this.content = content;
                    this.parser = parser;
                    this.assetPool = assetPool;
                    this.nextHighestID = -1;
                }
                ParserRelease.prototype.parseSounds = function () {
                    var sounds = this.content[ParserRelease.kSounds];
                    for (var i = 0; i < sounds.length; i++) {
                        var sound = sounds[i];
                        var id = sound[0];
                        var name = sound[1];
                        var src = sound[2];
                        this.assetPool.setSound(new Sound(id, name, src));
                    }
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
                    var timelines = this.content[ParserRelease.kTimelines];
                    if (timelines.length === 0) {
                        return true;
                    }
                    for (var i = 0; i < timelines.length; i++) {
                        var timeline = timelines[i];
                        var id = timeline[0];
                        var name = timeline[1];
                        var linkageName = timeline[2];
                        var isScene = timeline[3];
                        var labels = [];
                        var scripts = [];
                        var j;
                        for (j = 0; j < timeline[4].length; j += 2) {
                            labels.push({
                                frameNum: timeline[4][j],
                                name: timeline[4][j + 1]
                            });
                        }
                        for (j = 0; j < timeline[5].length; j += 2) {
                            scripts.push({
                                frameNum: timeline[5][j],
                                name: timeline[5][j + 1]
                            });
                        }
                        var timelineAsset = new Timeline(id, name, linkageName, isScene, labels, scripts);
                        for (j = 6; j < timeline.length; j++) {
                            var frame = timeline[j];
                            var cmds = [];
                            var cmd = null;
                            for (var k = 0; k < frame.length; k++) {
                                switch (frame[k][0]) {
                                    case 1:
                                        cmd = new PlaceObjectCommand(frame[k].slice(1));
                                        this.nextHighestID = Math.max(this.nextHighestID, +cmd.targetID);
                                        break;
                                    case 2:
                                        cmd = new SetTransformCommand(frame[k].slice(1));
                                        break;
                                    case 3:
                                        cmd = new SetColorTransformCommand(frame[k].slice(1));
                                        break;
                                    case 4:
                                        cmd = new RemoveObjectCommand(frame[k].slice(1));
                                        break;
                                    case 5:
                                        break;
                                    case 6:
                                        if (this.parser.enableCacheAsBitmap) {
                                        }
                                        break;
                                    case 7:
                                        break;
                                }
                                if (cmd) {
                                    cmds.push(cmd);
                                }
                            }
                            timelineAsset.addFrameCommands(cmds);
                        }
                        this.assetPool.setTimeline(timelineAsset);
                    }
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
                    this.nextHighestID = -1;
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
            function StageInfo(width, height, color, frameRate, loop, sceneTimelines) {
                this.width = width;
                this.height = height;
                this.color = color;
                this.frameRate = frameRate;
                this.loop = loop;
                this.sceneTimelines = sceneTimelines;
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
                var parser = (header[Parser.kReadable] == true) ? new ParserDebug(content, this, this.assetPool) : new ParserRelease(content, this, this.assetPool);
                this.enableCacheAsBitmap = options.cacheAsBitmap;
                this.emulateStandardDerivatives = options.emulateStandardDerivatives;
                this.S = this.emulateStandardDerivatives ? 11 : 7;
                if (!parser.parseSounds() || !parser.parseFills()) {
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
                if (!parser.parseShapes() || !parser.parseTimelines()) {
                    return stageInfo;
                }
                this.nextHighestID = parser.nextHighestID;
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
    var GL = flwebgl.e.GL;
    var Renderer = flwebgl.e.Renderer;
    var SoundFactory = flwebgl.media.SoundFactory;
    var SceneGraphFactory = flwebgl.sg.SceneGraphFactory;
    var AssetPool = flwebgl.util.AssetPool;
    var Utils = flwebgl.util.Utils;
    var Parser = flwebgl.xj.Parser;
    var Player = (function () {
        function Player() {
            this.assetPool = new AssetPool();
            this.mainLoop = this._loop.bind(this);
            this.playMode = Player.kIsStopped;
            this.stageWidth = 550;
            this.stageHeight = 400;
            this.rc = -1;
            this.jd = true;
            this.numFrames = 0;
            this.soundsLoaded = false;
            this.texturesLoaded = false;
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
            if (stageInfo) {
                this.context = new flwebgl.Context(this.renderer, this.assetPool, this.soundFactory);
                this.sceneGraphFactory = new SceneGraphFactory(this.context, this.parser.nextHighestID + 1);
                if (this.options.cacheAsBitmap) {
                }
                this.context.sceneGraphFactory = this.sceneGraphFactory;
                this.context.nd = this.nd;
                if (textures && textures.length > 0) {
                    this.renderer.loadTextures(this.assetPool.getTextureAtlases(), this._texturesLoadedCBK.bind(this));
                }
                else {
                    this._texturesLoadedCBK();
                }
                if (this.assetPool.getSounds().length > 0) {
                    this.soundFactory.loadSounds(this.assetPool.getSounds(), this._soundsLoadedCBK.bind(this));
                }
                else {
                    this._soundsLoadedCBK();
                }
                this.backgroundColor = stageInfo.color;
                this.stageWidth = stageInfo.width;
                this.stageHeight = stageInfo.height;
                this.frameRate = (stageInfo.frameRate < 0) ? 1 : stageInfo.frameRate;
                this.loop = stageInfo.loop;
                this.sceneTimelines = stageInfo.sceneTimelines;
                this.renderer.setBackgroundColor(this.backgroundColor);
                this.frameDuration = 1000 / this.frameRate;
                this.stage = this.sceneGraphFactory.createMovieClip(void 0, "-1");
                this.context.stage = this.stage;
                this.stage.loop = this.loop;
                return Player.S_OK;
            }
            else {
                return Player.E_RESOURCE_LOADING_FAILED;
            }
        };
        Player.prototype._texturesLoadedCBK = function () {
            this.renderer.setGL();
            this.texturesLoaded = true;
            this._checkComplete();
        };
        Player.prototype._soundsLoadedCBK = function () {
            this.soundsLoaded = true;
            this._checkComplete();
        };
        Player.prototype._checkComplete = function () {
            if (this.completeCBK && this.texturesLoaded && this.soundsLoaded) {
                this.completeCBK();
                this.completeCBK = null;
            }
        };
        Player.prototype.getStageWidth = function () {
            return this.stageWidth;
        };
        Player.prototype.getStageHeight = function () {
            return this.stageHeight;
        };
        Player.prototype.setViewport = function (rect) {
            this.renderer.setViewport(rect);
            this.renderer.clear(true, true, false);
        };
        Player.prototype.play = function (scene) {
            var timelineIndex = 0;
            var h = this.jd;
            this.jd = true;
            if (scene && scene.length) {
                var found = false;
                for (var i = 0; i < this.sceneTimelines.length; i++) {
                    var timelineID = "" + this.sceneTimelines[i];
                    if (this.assetPool.getTimeline(timelineID).name === scene) {
                        timelineIndex = i;
                        found = true;
                        this.jd = false;
                        break;
                    }
                }
                if (!found) {
                    return false;
                }
            }
            this.canvas.addEventListener("webglcontextlost", this.webglContextLostHandler, false);
            this.canvas.addEventListener("webglcontextrestored", this.webglContextRestoredHandler, false);
            this.startTime = (new Date).getTime();
            if (!h || !this.jd) {
                this.Ri(timelineIndex, h !== this.jd);
            }
            this.playMode = Player.kIsPlaying;
            this.rafID = Utils.requestAnimFrame(this.mainLoop, this.frameRate, window);
            return true;
        };
        Player.prototype.stop = function () {
            this.playMode = Player.kIsStopped;
        };
        Player.prototype._loop = function () {
            try {
                if (this.playMode !== Player.kIsPlaying) {
                    this.canvas.removeEventListener("webglcontextlost", this.webglContextLostHandler, false);
                    this.canvas.removeEventListener("webglcontextrestored", this.webglContextRestoredHandler, false);
                    if (this.rafID) {
                        Utils.cancelAnimFrame(this.rafID, window);
                        this.rafID = undefined;
                    }
                    if (this.timeoutID) {
                        window.clearTimeout(this.timeoutID);
                    }
                }
                else {
                    this.rafID = Utils.requestAnimFrame(this.mainLoop, this.frameRate, window);
                    this.timeoutID = undefined;
                    if (this.Xe == this.Hi) {
                        this.Gk();
                        this.Xe = (this.Xe + 1) % (this.frameRate + 1);
                    }
                    var elapsed = (new Date).getTime() - this.startTime;
                    if (elapsed < this.frameDuration && this.frameDuration - elapsed < Math.ceil(1000 / 60)) {
                        if (this.rafID) {
                            Utils.cancelAnimFrame(this.rafID, window);
                            this.rafID = undefined;
                        }
                        this.timeoutID = window.setTimeout(this.mainLoop, this.frameDuration - elapsed);
                    }
                    else if (elapsed >= this.frameDuration) {
                        this.Sl();
                        this.Pk();
                    }
                }
            }
            catch (error) {
                this.stop();
                throw error;
            }
        };
        Player.prototype.Sl = function () {
            this.stage.setTransforms(void 0, void 0);
            if (this.options.cacheAsBitmap) {
                this.nd.Qn();
            }
            this.oa = [];
            this.stage.Qb(this.oa);
        };
        Player.prototype.Pk = function () {
            this.startTime = (new Date).getTime();
            this.me();
            this.renderer.ij();
            var b = this.oa.length;
            for (var a = 0; a < b; ++a) {
                this.oa[a].depth = a / b;
                this.renderer.e(this.oa[a], 1);
            }
            this.renderer.lj();
            if (this.frameRenderListener) {
                this.frameRenderListener();
            }
            this.Hi = this.Xe;
        };
        Player.prototype.me = function () {
            this.renderer.setBackgroundColor(this.renderer.getBackgroundColor());
            this.renderer.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
            this.renderer.enable(GL.BLEND);
            this.renderer.depthFunc(GL.LESS);
            this.renderer.clearDepth(1);
            this.renderer.depthMask(true);
            this.renderer.setDepthTest(false);
            this.renderer.clear(true, true, false);
        };
        Player.prototype.Gk = function () {
            if (this.stage.currentFrame === this.numFrames && this.stage.isPlaying && this.jd && (this.loop || this.rc !== this.sceneTimelines.length - 1)) {
                this.Ri((this.rc + 1) % this.sceneTimelines.length);
            }
            this.stage.advanceFrame();
            this.stage.dispatchEnterFrame();
            this.stage.constructFrame();
            this.stage.dispatchFrameConstructed();
            this.stage.executeFrameScripts();
            this.stage.dispatchExitFrame();
        };
        Player.prototype.Ri = function (a, b) {
            if (b === void 0) { b = false; }
            if (b || (this.rc !== -1 && this.rc !== a)) {
                this.Al();
            }
            this.Xe = -1;
            this.Hi = -1;
            if (b || this.rc !== a) {
                var timelineID = "" + this.sceneTimelines[a];
                var timeline = this.assetPool.getTimeline(timelineID);
                this.stage.Of(timeline);
                this.stage.play();
                this.numFrames = timeline.commands.length;
            }
            this.rc = a;
        };
        Player.prototype.Al = function (b) {
            if (b === void 0) { b = false; }
            if (b) {
                this.stop();
                this.rc = -1;
            }
            if (this.stage)
                for (var i = this.stage.getNumChildren() - 1; i >= 0; i--) {
                    var child = this.stage.getChildAt(i);
                    this.stage.removeChildAt(i);
                    child.destroy();
                }
        };
        Player.prototype.webglContextLostHandler = function (event) {
            event.preventDefault();
        };
        Player.prototype.webglContextRestoredHandler = function () {
            this.play();
        };
        Player.S_OK = 0;
        Player.E_ERR = 1;
        Player.E_INVALID_PARAM = 2;
        Player.E_CONTEXT_CREATION_FAILED = 3;
        Player.E_REQUIRED_EXTENSION_NOT_PRESENT = 4;
        Player.E_RESOURCE_LOADING_FAILED = 5;
        Player.kIsPlaying = 0;
        Player.kIsStopped = 1;
        Player.FRAME_RENDER = 0;
        return Player;
    })();
    flwebgl.Player = Player;
})(flwebgl || (flwebgl = {}));
