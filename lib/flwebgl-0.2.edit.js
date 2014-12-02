/*
 ADOBE SYSTEMS INCORPORATED
  Copyright 2013 Adobe Systems Incorporated
  All Rights Reserved.

 NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
 terms of the Adobe license agreement accompanying it.  If you have received this file from a
 source other than Adobe, then your use, modification, or distribution of it requires the prior
 written permission of Adobe.

 Version: 0.2.0
 Build number: 14.1.0.96
*/

/*

([\.\"])(xxxxx)([\(\)\"\.\;\,\ \[])
$1newname$3

*/

function aa() {
  return function () {};
}

function g(c) {
  return function (d) {
    this[c] = d;
  }
}

function z(c) {
  return function () {
    return this[c];
  }
}

var N;

// flwebgl.e.Yh
// RenderTarget ?
(function (c) {
  (function (c) {
    var f = function () {
      function b(id, texture, frameBuffer, renderBuffer) {
        this.id = id;
        this.texture = texture;
        this.frameBuffer = frameBuffer;
        this.renderBuffer = renderBuffer;
      }
      b.prototype.getID = z("id");
      return b
    }();
    c.Yh = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.c.k
// flwebgl.geom.Point
(function (c) {
  (function (d) {
    var f = function () {
      function b(x, y) {
        this.x = x;
        this.y = y;
      }
      b.prototype.add = function (point) {
        var p = new c.c.k(this.x, this.y);
        p.x += point.x;
        p.y += point.y;
        return p;
      };
      b.prototype.sub = function (point) {
        var p = new c.c.k(this.x, this.y);
        p.x -= point.x;
        p.y -= point.y;
        return p;
      };
      return b
    }();
    d.k = f
  })(c.c || (c.c = {}))
})(N || (N = {}));
window.flwebgl = N;
N.geom = N.c;
N.c.Point = N.c.k;

// flwebgl.c.u
// flwebgl.geom.Matrix
(function (c) {
  (function (d) {
    var f = function () {
      function b(a) {
        this.rotate = function (rad) {
          var cos = Math.cos(rad);
          var sin = Math.sin(rad);
          var e = this.b[0];
          var k = this.b[4];
          var l = this.b[12];
          this.b[0] = e * cos - this.b[1] * sin;
          this.b[1] = e * sin + this.b[1] * cos;
          this.b[4] = k * cos - this.b[5] * sin;
          this.b[5] = k * sin + this.b[5] * cos;
          this.b[12] = l * cos - this.b[13] * sin;
          this.b[13] = l * sin + this.b[13] * cos;
          this.L = 1 == this.b[0] && 1 == this.b[5] && 0 == this.b[1] && 0 == this.b[4] && 0 == this.b[12] && 0 == this.b[13];
          return this;
        };
        this.scale = function (sx, sy) {
          this.b[0] *= sx;
          this.b[5] *= sy;
          this.b[4] *= sx;
          this.b[1] *= sy;
          this.b[12] *= sx;
          this.b[13] *= sy;
          this.L = 1 == this.b[0] && 1 == this.b[5] && 0 == this.b[1] && 0 == this.b[4] && 0 == this.b[12] && 0 == this.b[13];
          return this;
        };
        this.L = false;
        this.identity();
        if (a && a.length >= 6) {
          this.setValues(a);
        }
      }
      b.prototype.clone = function () {
        return (new c.c.u).copy(this)
      };
      b.prototype.identity = function () {
        this.b = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
        this.L = true;
        return this;
      };
      b.prototype.isIdentity = z("L");
      b.prototype.copy = function (a) {
        for (var h = 0; 16 > h; h++) this.b[h] = a.b[h];
        this.L = a.L;
        return this
      };
      b.prototype.getValues = function () {
        var a = new Array(6);
        a[0] = this.b[0];
        a[1] = this.b[1];
        a[2] = this.b[4];
        a[3] = this.b[5];
        a[4] = this.b[12];
        a[5] = this.b[13];
        return a;
      };
      b.prototype.setValues = function (a) {
        if (a && a.length >= 6) {
          this.b[0] = a[0];
          this.b[1] = a[1];
          this.b[4] = a[2];
          this.b[5] = a[3];
          this.b[12] = a[4];
          this.b[13] = a[5];
          this.L = 1 == this.b[0] && 1 == this.b[5] && 0 == this.b[1] && 0 == this.b[4] && 0 == this.b[12] && 0 == this.b[13];
        }
      };
      b.prototype.concat = function (a) {
        if (this.L) {
          if (a.L) {
            this.b[10] *= a.b[10];
            return this;
          }
          this.b[0] = a.b[0];
          this.b[1] = a.b[1];
          this.b[4] = a.b[4];
          this.b[5] = a.b[5];
          this.b[10] *= a.b[10];
          this.b[12] = a.b[12];
          this.b[13] = a.b[13];
          this.L = a.L;
          return this;
        }
        if (a.L) {
          this.b[10] *= a.b[10];
          return this;
        }
        var h = a.b[1] * this.b[0] + a.b[5] * this.b[1];
        var b = a.b[0] * this.b[4] + a.b[4] * this.b[5];
        var e = a.b[1] * this.b[4] + a.b[5] * this.b[5];
        var k = a.b[0] * this.b[12] + a.b[4] * this.b[13] + a.b[12];
        var l = a.b[1] * this.b[12] + a.b[5] * this.b[13] + a.b[13];
        var c = a.b[10] * this.b[10];
        this.b[0] = a.b[0] * this.b[0] + a.b[4] * this.b[1];
        this.b[1] = h;
        this.b[4] = b;
        this.b[5] = e;
        this.b[10] = c;
        this.b[12] = k;
        this.b[13] = l;
        return this;
      };
      b.prototype.multiply = function (a) {
        if (this.L) {
          if (a.L) {
            this.b[10] *= a.b[10];
          } else {
            this.b[0] = a.b[0];
            this.b[1] = a.b[1];
            this.b[4] = a.b[4];
            this.b[5] = a.b[5];
            this.b[10] *= a.b[10];
            this.b[12] = a.b[12];
            this.b[13] = a.b[13];
            this.L = a.L;
          }
        } else if (a.L) {
          this.b[10] *= a.b[10];
        } else {
          var x = this.b[0] * a.b[0] + this.b[4] * a.b[1];
          var h = this.b[1] * a.b[0] + this.b[5] * a.b[1];
          var b = this.b[0] * a.b[4] + this.b[4] * a.b[5];
          var e = this.b[1] * a.b[4] + this.b[5] * a.b[5];
          var k = this.b[0] * a.b[12] + this.b[4] * a.b[13] + this.b[12];
          var l = this.b[1] * a.b[12] + this.b[5] * a.b[13] + this.b[13];
          var c = this.b[10] * a.b[10];
          this.b[0] = x;
          this.b[1] = h;
          this.b[4] = b;
          this.b[5] = e;
          this.b[10] = c;
          this.b[12] = k;
          this.b[13] = l;
        }
      };
      b.prototype.transformPoint = function (a) {
        var h = new c.c.k(0, 0);
        h.x = this.b[0] * a.x + this.b[4] * a.y + this.b[12];
        h.y = this.b[1] * a.x + this.b[5] * a.y + this.b[13];
        return h
      };
      b.prototype.transformBoundsAABB = function (rect) {
        var h = new c.c.k(rect.left, rect.top);
        var tl = this.transformPoint(h);
        h.x = rect.left + rect.width;
        var tr = this.transformPoint(h);
        h.y = rect.top + rect.height;
        var br = this.transformPoint(h);
        h.x = rect.left;
        var bl = this.transformPoint(h);
        var p1x = Math.min(tl.x, tr.x, br.x, bl.x);
        var p2x = Math.max(tl.x, tr.x, br.x, bl.x);
        var p1y = Math.min(tl.y, tr.y, br.y, bl.y);
        var p2y = Math.max(tl.y, tr.y, br.y, bl.y);
        return new c.c.M(p1x, p1y, p2x - p1x, p2y - p1y);
      };
      b.prototype.invert = function () {
        if (this.L) {
          return this;
        }
        var a = this.b[0];
        var h = this.b[1];
        var b = this.b[4];
        var e = this.b[5];
        var k = this.b[12];
        var l = this.b[13];
        var c = h * b - a * e;
        if (c == 0) {
          this.identity();
          return this;
        }
        this.identity();
        this.b[0] = -e / c;
        this.b[1] = h / c;
        this.b[4] = b / c;
        this.b[5] = -a / c;
        this.b[12] = (k * e - l * b) / c;
        this.b[13] = (l * a - k * h) / c;
        this.L = false;
        return this;
      };
      b.prototype.equals = function (a) {
        return
          this.b[0] == a.b[0] &&
          this.b[1] == a.b[1] &&
          this.b[4] == a.b[4] &&
          this.b[5] == a.b[5] &&
          this.b[12] == a.b[12] &&
          this.b[13] == a.b[13] &&
          this.b[10] == a.b[10];
      };
      b.prototype.translate = function (a, h) {
        this.b[12] += a;
        this.b[13] += h;
        if (this.b[12] !== 0 || this.b[13] !== 0) {
          this.L = false;
        }
        return this;
      };
      b.prototype.Jm = function () {
        return this.L ? false : 0 == this.b[1] * this.b[4] - this.b[0] * this.b[5]
      };
      b.prototype.set = function (a, h, b) {
        this.b[4 * h + a] = b;
        2 != a && 2 != h && (this.L = false)
      };
      b.prototype.get = function (a, h) {
        return this.b[4 * h + a]
      };
      return b
    }();
    d.u = f
  })(c.c || (c.c = {}))
})(N || (N = {}));
window.flwebgl = N;
N.geom = N.c;
N.c.Matrix = N.c.u;

// flwebgl.c.Qc
// flwebgl.geom.Color
(function (c) {
  (function (c) {
    var f = function () {
      function b(r, g, b, a) {
        if (typeof a === "undefined") { a = 255; }
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
      }
      b.prototype.equals = function (a) {
        return
          this.red == a.red &&
          this.green == a.green &&
          this.blue == a.blue &&
          this.alpha == a.alpha;
      };
      return b
    }();
    c.Qc = f
  })(c.c || (c.c = {}))
})(N || (N = {}));
window.flwebgl = N;
N.geom = N.c;
N.c.Color = N.c.Qc;

(function (c) {
  (function (d) {

    var f;
    (function (a) {
      a[a.k_None = 0] = "k_None";
      a[a.k_Extend = 1] = "k_Extend";
      a[a.k_Repeat = 2] = "k_Repeat";
      a[a.k_Reflect = 3] = "k_Reflect"
    })(f || (f = {}));

    // flwebgl.e.Tn
    d.Tn = function () {
      return aa();
    }();

    // flwebgl.e.na
    // flwebgl.e.VertexAttribute
    d.na = function () {
      return function (byteOffset, name, type, size) {
        this.byteOffset = byteOffset;
        this.pc = name;
        this.type = type;
        this.size = size;
      }
    }();

    // flwebgl.e.di
    // flwebgl.e.VertexAttributes
    d.di = function () {
      return function (a, h) {
        this.attrs = a;
        this.totalSize = h;
      }
    }();

    // flwebgl.e.Rn
    var b = function () {
      return function () {
        this.ta = []
      }
    }();
    d.Rn = b;

    // flwebgl.e.Pd
    d.Pd = function () {
      return function (a, h) {
        this.ba = a; // vertices
        this.jc = h; // vertexAttributes
      }
    }();

    // flwebgl.e.ca
    f = function () {
      function a(name, isOpaque) {
        this.ad = name;
        this.sl = isOpaque;
        this.Rg = {};
        this.Fi = void 0;
        this.he = new b;
        this.fillMode = 0;
      }
      a.prototype.setFillMode = g("fillMode");
      a.prototype.getIsOpaque = z("sl");
      a.prototype.nc = function (a) {
        return (typeof a !== "undefined" && a !== void 0) ? this.Rg[a] : void 0;
      };
      a.prototype.qj = function () {
        var a = [];
        for (var b in this.Rg) {
          a.push(b);
        }
        return a
      };
      a.prototype.sa = function () {
        return this.Fi.length
      };
      a.prototype.getID = function () {
        return -1
      };
      a.prototype.xe = function (a, b) {
        this.Rg[a] = b;
        for (var e = 0; e < b.length; ++e) {
          this.he.ta.push(b[e].jc)
        }
      };
      a.prototype.we = function (a) {
        this.Fi = new Uint16Array(a)
      };
      a.Xn = new c.c.Qc(255, 0, 0, 255);
      //a.ko = "Extend";
      //a.mo = "Repeat";
      //a.lo = "Reflect";
      a.kFill_Extend = "Extend";
      a.kFill_Repeat = "Repeat";
      a.kFill_Reflect = "Reflect";
      a.fillModeMap = {
        Extend: 1,
        Repeat: 2,
        Reflect: 3
      };
      return a
    }();
    d.ca = f

  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.c.p
// flwebgl.geom.ColorTransform
(function (c) {
  (function (d) {
    var f = function () {
      function b(alphaOffs, alphaMult, redOffs, redMult, greenOffs, greenMult, blueOffs, blueMult) {
        "undefined" === typeof alphaOffs && (alphaOffs = 0);
        "undefined" === typeof alphaMult && (alphaMult = 1);
        "undefined" === typeof redOffs && (redOffs = 0);
        "undefined" === typeof redMult && (redMult = 1);
        "undefined" === typeof greenOffs && (greenOffs = 0);
        "undefined" === typeof greenMult && (greenMult = 1);
        "undefined" === typeof blueOffs && (blueOffs = 0);
        "undefined" === typeof blueMult && (blueMult = 1);
        this.identity();
        void 0 !== alphaOffs && (this.alphaOffs = alphaOffs);
        void 0 !== alphaMult && (this.alphaMult = alphaMult);
        void 0 !== redOffs && (this.redOffs = redOffs);
        void 0 !== redMult && (this.redMult = redMult);
        void 0 !== greenOffs && (this.greenOffs = greenOffs);
        void 0 !== greenMult && (this.greenMult = greenMult);
        void 0 !== blueOffs && (this.blueOffs = blueOffs);
        void 0 !== blueMult && (this.blueMult = blueMult);
      }
      b.prototype.getAlphaOffset = z("alphaOffs");
      b.prototype.getRedOffset = z("redOffs");
      b.prototype.getGreenOffset = z("greenOffs");
      b.prototype.getBlueOffset = z("blueOffs");
      b.prototype.getAlphaMultiplier = z("alphaMult");
      b.prototype.getRedMultiplier = z("redMult");
      b.prototype.getGreenMultiplier = z("greenMult");
      b.prototype.getBlueMultiplier = z("blueMult");
      b.prototype.setAlphaOffset = g("alphaOffs");
      b.prototype.setRedOffset = g("redOffs");
      b.prototype.setGreenOffset = g("greenOffs");
      b.prototype.setBlueOffset = g("blueOffs");
      b.prototype.setAlphaMultiplier = function (a) {
        this.alphaMult = a;
        1 < this.alphaMult && (this.alphaMult = 1)
      };
      b.prototype.setRedMultiplier = function (a) {
        this.redMult = a;
        1 < this.redMult && (this.redMult = 1)
      };
      b.prototype.setGreenMultiplier = function (a) {
        this.greenMult = a;
        1 < this.greenMult && (this.greenMult = 1)
      };
      b.prototype.setBlueMultiplier = function (a) {
        this.blueMult = a;
        1 < this.blueMult && (this.blueMult = 1)
      };
      b.prototype.identity = function () {
        this.blueOffs = this.greenOffs = this.redOffs = this.alphaOffs = 0;
        this.blueMult = this.greenMult = this.redMult = this.alphaMult = 1;
        return this;
      };
      b.prototype.isIdentity = function () {
        return
          0 == this.alphaOffs &&
          1 == this.alphaMult &&
          0 == this.redOffs &&
          1 == this.redMult &&
          0 == this.blueOffs &&
          1 == this.blueMult &&
          0 == this.greenOffs &&
          1 == this.greenMult;
      };
      b.prototype.equals = function (a) {
        return this.alphaOffs != a.alphaOffs || this.redOffs != a.redOffs || this.greenOffs != a.greenOffs || this.blueOffs != a.blueOffs || this.alphaMult != a.alphaMult || this.redMult != a.redMult || this.greenMult != a.greenMult || this.blueMult != a.blueMult ? false : true
      };
      b.prototype.concat = function (a) {
        this.alphaOffs += this.alphaMult * a.alphaOffs;
        this.alphaMult *= a.alphaMult;
        this.redOffs += this.redMult * a.redOffs;
        this.redMult *= a.redMult;
        this.greenOffs += this.greenMult * a.greenOffs;
        this.greenMult *= a.greenMult;
        this.blueOffs += this.blueMult * a.blueOffs;
        this.blueMult *= a.blueMult;
        return this
      };
      b.prototype.clone = function () {
        return (new c.c.p).copy(this)
      };
      b.prototype.copy = function (a) {
        this.redOffs = a.getRedOffset();
        this.greenOffs = a.getGreenOffset();
        this.blueOffs = a.getBlueOffset();
        this.alphaOffs = a.getAlphaOffset();
        this.redMult = a.getRedMultiplier();
        this.greenMult = a.getGreenMultiplier();
        this.blueMult = a.getBlueMultiplier();
        this.alphaMult = a.getAlphaMultiplier();
        return this
      };
      return b
    }();
    d.p = f
  })(c.c || (c.c = {}))
})(N || (N = {}));
window.flwebgl = N;
N.geom = N.c;
N.c.ColorTransform = N.c.p;

// flwebgl.e.lk
(function (c) {
  (function (c) {
    var f = function () {
      function b(id, h, b, e) {
        this.id = id;
        this.ka = h;
        this.lb = b;
        this.parent = e;
        this.se = {}
      }
      b.prototype.getID = z("id");
      b.prototype.nc = function () {
        return this.ka.nc(this.lb)
      };
      b.prototype.sa = function () {
        return this.ka.sa()
      };
      b.prototype.getUniforms = function (a) {
        return this.se[a]
      };
      b.prototype.setUniforms = function (a, h) {
        this.se[a] = h
      };
      b.prototype.getTransform = function () {
        return this.parent.getTransform()
      };
      b.prototype.getColorTransform = function () {
        return this.parent.getColorTransform()
      };
      b.prototype.getDepth = function () {
        return this.parent.getDepth()
      };
      b.prototype.getDirty = function () {
        return this.parent.getDirty()
      };
      b.prototype.getIsOpaque = function () {
        var a = this.parent.getColorTransform();
        return (this.ka.getIsOpaque() && a.getAlphaMultiplier() == 1 && a.getAlphaOffset() == 0)
      };
      b.prototype.destroy = function () {
        this.parent = void 0
      };
      return b
    }();
    c.lk = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.dk
var ca = N || (N = {});
var da = ca.e || (ca.e = {});
var ea = da.dk || (da.dk = {});
ea[ea.kBM_AlphaBlend = 1] = "kBM_AlphaBlend";

// flwebgl.e.Pe
(function (c) {
  (function (c) {
    var f = function () {
      function b() {
        this.F = []
      }
      b.prototype.Dc = function (a) {
        this.F.push(a)
      };
      b.prototype.mc = function (a) {
        return 0 <= a ? this.F[a] : null
      };
      b.prototype.sort = function (a) {
        this.F.sort(a)
      };
      b.prototype.clear = function () {
        for (; 0 < this.F.length;) delete this.F.pop()
      };
      return b
    }();
    c.Pe = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.c.M
// flwebgl.geom.Rect
(function (c) {
  (function (c) {
    var f = function () {
      function b(x, y, w, h) {
        this.isEmpty = true;
        if (x !== void 0) {
          this.left = x;
          this.top = y;
          this.width = w;
          this.height = h;
          this.isEmpty = false;
        }
      }
      b.prototype.intersects = function (a) {
        return this.isEmpty || a.isEmpty ? false : !(a.left > this.left + this.width || a.left + a.width < this.left || a.top > this.top + this.height || a.top + a.height < this.top)
      };
      b.prototype.copy = function (a) {
        this.left = a.left;
        this.top = a.top;
        this.width = a.width;
        this.height = a.height;
        this.isEmpty = a.isEmpty;
      };
      b.prototype.union = function (a) {
        if (this.isEmpty) {
          this.copy(a);
        } else if (!a.isEmpty) {
          var right = this.left + this.width;
          var bottom = this.top + this.height;
          this.left = Math.min(this.left, a.left);
          this.top = Math.min(this.top, a.top);
          this.width = Math.max(right, a.left + a.width) - this.left;
          this.height = Math.max(bottom, a.top + a.height) - this.top;
        }
      };
      return b;
    }();
    c.M = f
  })(c.c || (c.c = {}))
})(N || (N = {}));
window.flwebgl = N;
N.geom = N.c;
N.c.Rect = N.c.M;
N.c.M.prototype.left = N.c.M.prototype.left;
N.c.M.prototype.top = N.c.M.prototype.top;
N.c.M.prototype.width = N.c.M.prototype.width;
N.c.M.prototype.height = N.c.M.prototype.height;

// flwebgl.e.Zh
// flwebgl.e.TextureAtlas
(function (c) {
  (function (c) {
    var f = function () {
      function b(id, imageURL, width, height) {
        this.id = id;
        this.imageURL = imageURL;
        this.textureWidth = width;
        this.textureHeight = height;
        this.frames = {}
      }
      b.prototype.getID = z("id");
      b.prototype.getImageURL = z("imageURL");
      b.prototype.setFrame = function (id, rect) {
        this.frames[id] = rect;
      };
      b.prototype.getFrame = function (id) {
        return this.frames[id];
      };
      return b;
    }();
    c.Zh = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.t
// flwebgl.e.Mesh
(function (c) {
  (function (d) {
    var f = function () {
      function b(id) {
        this.id = id;
        this.fd = {};
        this.fd[b.Z] = [];
        this.fd[b.P] = [];
        this.fd[b.bb] = [];
        this.bounds = void 0;
      }
      b.prototype.getID = z("id");
      b.prototype.Nb = function (a, h) {
        this.fd[a].push(h);
      };
      b.prototype.ra = function (a) {
        return this.fd[a].length;
      };
      b.prototype.yf = function (a, h) {
        if (this.ra(a) > h) {
          return this.fd[a][h];
        }
      };
      b.prototype.calculateBounds = function () {
        this.bounds = new c.c.M;
        var a = this.ra(b.P);
        for (var h = 0; h < a; ++h) {
          var _yf = this.yf(b.P, h);
          var e = _yf.qj();
          var p = _yf.nc(e[0]);
          for (var e = 0; e < p.length; ++e) {
            var k = p[e];
            var l = k.jc.attrs;
            for (var d = 0; d < l.length; ++d) {
              var m = l[d];
              if (m.pc === "POSITION0") {
                l = k.ba;
                k = k.jc.totalSize / Float32Array.BYTES_PER_ELEMENT;
                for (m = m.byteOffset / Float32Array.BYTES_PER_ELEMENT; m < l.length; m += k) {
                  this.bounds.union(new c.c.M(l[m], l[m + 1], 0, 0));
                }
                break;
              }
            }
          }
        }
      };
      b.Z = 1;
      b.P = 2;
      b.bb = 3;
      return b;
    }();
    d.t = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.l.w
// flwebgl.util.Logger
(function (c) {
  (function (c) {
    var f = function () {
      function b() {}
      b.setLevel = function (level) {
        b.level = level;
      };
      b.info = function (a) {
        if (b.level >= b.kLevel_Info) {
          console.log("INFO: " + a);
        }
      };
      b.warn = function (a) {
        if (b.level >= b.kLevel_Warn) {
          console.log("WARN: " + a);
        }
      };
      b.error = function (a) {
        if (b.level >= b.kLevel_Error) {
          console.log("ERROR: " + a)
        }
      };
      b.kLevel_OFF = -1;
      b.kLevel_Error = 0;
      b.kLevel_Warn = 1;
      b.kLevel_Info = 2;
      b.level = b.kLevel_OFF;
      return b;
    }();
    c.w = f;
  })(c.l || (c.l = {}))
})(N || (N = {}));
window.flwebgl = N;
N.util = N.l;
N.l.Logger = N.l.w;

// flwebgl.e.mk
(function (c) {
  (function (c) {
    c.mk = function () {
      return function (c, b) {
        if (typeof c === "undefined") { c = -1; }
        if (typeof b === "undefined") { b = -1; }
        this.Ld = c;
        this.fh = b;
      }
    }()
  })(c.e || (c.e = {}))
})(N || (N = {}));

(function (c) {
  (function (c) {

    // flwebgl.e.q
    // Uniform
    var f = function () {
      function b(a, h, b, e) {
        this.location = a;
        this.type = h;
        this.size = b;
        this.no = e
      }
      b.Jd = 0;
      b.Q = 1;
      return b
    }();
    c.q = f;

    // flwebgl.e.Re
    // Uniforms
    f = function () {
      return function (b) {
        this.se = b;
        this.ri = 0;
        this.bo = 0;
        for (var i = 0; i < this.se.length; i++) {
          var h = 0;
          var a = this.se[i];
          switch (a.type) {
            case c.d.INT:
            case c.d.FLOAT:
            case c.d.SAMPLER_2D:
              h = Math.ceil(a.size / 4);
              break;
            case c.d.INT_VEC2:
            case c.d.FLOAT_VEC2:
              h = Math.ceil(2 * a.size / 4);
              break;
            case c.d.INT_VEC3:
            case c.d.FLOAT_VEC3:
              h = Math.ceil(3 * a.size / 4);
              break;
            case c.d.INT_VEC4:
            case c.d.FLOAT_VEC4:
              h = a.size;
              break;
            case c.d.FLOAT_MAT4:
              h = 4 * a.size;
              break;
          }
          this.ri += h;
        }
      }
    }();
    c.Re = f;

    // flwebgl.e.R
    c.R = function () {
      return function (location, name, type, size, e) {
        if (typeof e === "undefined") { e = false; }
        this.location = location;
        this.pc = name;
        this.type = type;
        this.size = size;
        this.Hf = e;
      }
    }();

    // flwebgl.e.Oe
    f = function () {
      function b(a) {
        this.fi = {};
        for (var h = 0; h < a.length; ++h) this.fi[a[h].pc] = a[h]
      }
      b.prototype.getAttribs = function (a) {
        return this.fi[a]
      };
      return b
    }();
    c.Oe = f;

    // flwebgl.e.D
    c.D = function () {
      return function (b, a) {
        this.jc = b;
        this.value = a
      }
    }();

  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.B.$h
// flwebgl.B.Timeline
(function (c) {
  (function (c) {
    var f = function () {
      function b(id, name, linkageName, isScene, labels, scripts) {
        this.id = id;
        this.name = name;
        this.linkageName = linkageName;
        this.isScene = isScene;
        this.labels = labels;
        this.frameCmds = [];
        this.frameScripts = {};
        for (var i = 0; i < scripts.length; i++) {
          var script = scripts[i];
          if (!this.frameScripts[script.frameNum]) {
            this.frameScripts[script.frameNum] = [];
          }
          this.frameScripts[script.frameNum].push(script.functionName);
        }
      }
      b.prototype.getID = z("id");
      b.prototype.getName = z("name");
      b.prototype.getFrameLabels = z("labels");
      b.prototype.getFrameScripts = function (frameIdx) {
        return this.frameScripts[frameIdx + 1] ? this.frameScripts[frameIdx + 1] : [];
      };
      b.prototype.getFrameCmds = function (frameIdx) {
        return (frameIdx < this.frameCmds.length) ? this.frameCmds[frameIdx] : [];
      };
      b.prototype.addFrameCmds = function (cmds) {
        this.frameCmds.push(cmds);
      };
      return b
    }();
    c.$h = f
  })(c.B || (c.B = {}))
})(N || (N = {}));

// flwebgl.media.Xh
(function (c) {
  (function (c) {
    var f = function () {
      function b(a, h, b) {
        this.id = a;
        this.name = h;
        this.Jl = b;
        this.cf = false
      }
      b.prototype.getID = z("id");
      b.prototype.getName = z("name");
      b.prototype.Bn = function () {
        this.cf = true
      };
      return b
    }();
    c.Xh = f
  })(c.media || (c.media = {}))
})(N || (N = {}));

// flwebgl.l.tk
// flwebgl.util.tk
// AssetPool?
(function (c) {
  (function (c) {
    var f = function () {
      function b() {
        this.meshMap = {};
        this.timelineMap = {};
        this.textureAtlasMap = {};
        this.soundMap = {};
        this.nextAvailableAssetID = -1;
      }

      // Meshes
      b.prototype.getMesh = function (id) {
        return this.meshMap[id];
      };
      b.prototype.setMesh = function (mesh) {
        this.meshMap[mesh.getID()] = mesh;
      };
      b.prototype.getMeshes = function () {
        var a = [];
        var i = 0;
        for (var id in this.meshMap) {
          a[i++] = this.meshMap[id];
        }
        return a;
      };
      b.prototype.removeMesh = function (id) {
        var h = this.getMesh(id);
        h && delete h;
        this.meshMap[id] = void 0;
      };

      // Timelines
      b.prototype.getTimeline = function (id) {
        return this.timelineMap[id];
      };
      b.prototype.setTimeline = function (timeline) {
        this.timelineMap[timeline.getID()] = timeline;
      };
      b.prototype.getTimelines = function () {
        var a = [];
        var i = 0;
        for (var id in this.timelineMap) {
          a[i++] = this.timelineMap[id];
        }
        return a;
      };
      b.prototype.getTimelineByName = function (linkageName) {
        for (var id in this.timelineMap) {
          var timeline = this.timelineMap[id];
          if (timeline.linkageName === linkageName) {
            return timeline;
          }
        }
      };
      b.prototype.removeTimeline = function (id) {
        var h = this.getTimeline(id);
        h && delete h;
        this.timelineMap[id] = void 0;
      };

      // TextureAtlases
      b.prototype.getTextureAtlas = function (id) {
        return this.textureAtlasMap[id];
      };
      b.prototype.setTextureAtlas = function (textureAtlas) {
        this.textureAtlasMap[textureAtlas.getID()] = textureAtlas;
      };
      b.prototype.getTextureAtlases = function () {
        var a = [];
        var h = 0;
        for (var id in this.textureAtlasMap) {
          a[h++] = this.textureAtlasMap[id];
        }
        return a;
      };

      // Sounds
      b.prototype.setSound = function (sound) {
        this.soundMap[sound.getID()] = sound;
      };
      b.prototype.getSounds = function () {
        var a = [], h = 0;
        for (var b in this.soundMap) {
          a[h++] = this.soundMap[b];
        }
        return a;
      };

      b.prototype.getNextAvailableAssetID = function () {
        if (this.nextAvailableAssetID === -1) {
          var i;
          var meshes = this.getMeshes();
          var meshCount = meshes.length;
          for (i = 0; i < meshCount; i++) {
            var mesh = meshes[i];
            if (this.nextAvailableAssetID < mesh.getID()) {
              this.nextAvailableAssetID = mesh.getID();
            }
          }
          var timelines = this.getTimelines();
          var timelineCount = timelines.length;
          for (i = 0; i < timelineCount; i++) {
            var timeline = timelines[i];
            if (this.nextAvailableAssetID < timeline.getID()) {
              this.nextAvailableAssetID = timeline.getID();
            }
          }
        }
        return ++this.nextAvailableAssetID;
      };

      b.prototype.destroy = function () {
        var a;
        for (a in this.meshMap) {
          this.removeMesh(a);
        }
        for (a in this.timelineMap) {
          this.removeTimeline(a);
        }
      };

      return b;
    }();
    c.tk = f
  })(c.l || (c.l = {}))
})(N || (N = {}));

// flwebgl.Od
// flwebgl.TextureAtlas
(function (c) {
  var d = function () {
    function c(textureJSON, imageURL) {
      this.textureJSON = textureJSON;
      this.imageURL = imageURL;
    }
    c.prototype.getTextureJSON = z("textureJSON");
    c.prototype.getImageURL = z("imageURL");
    return c;
  }();
  c.Od = d
})(N || (N = {}));
window.flwebgl = N;
N.TextureAtlas = N.Od;

// flwebgl.c.Vf
// flwebgl.geom.Vf
// Matrix3x3 ?
(function (c) {
  (function (d) {
    var f = function () {
      function b(a) {
        this.b = Array(9);
        if (a instanceof c.c.Vf) {
          this.copy(a);
        } else if (a instanceof Array && a.length == 9) {
          this.copyValues(a);
        } else {
          this.identity();
        }
      }
      b.prototype.identity = function () {
        this.b = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
      };
      b.prototype.copy = function (a) {
        for (var i = 0; i < 9; i++) {
          this.b[i] = a.b[i];
        }
      };
      b.prototype.concat = function (a) {
        var h = this.b[1] * a.b[0] + this.b[4] * a.b[1] + this.b[7] * a.b[2],
          b = this.b[2] * a.b[0] + this.b[5] * a.b[1] + this.b[8] * a.b[2],
          e = this.b[0] * a.b[3] + this.b[3] * a.b[4] + this.b[6] * a.b[5],
          k = this.b[1] * a.b[3] + this.b[4] * a.b[4] + this.b[7] * a.b[5],
          l = this.b[2] * a.b[3] + this.b[5] * a.b[4] + this.b[8] * a.b[5],
          c = this.b[0] * a.b[6] + this.b[3] * a.b[7] + this.b[6] * a.b[8],
          d = this.b[1] * a.b[6] + this.b[4] * a.b[7] + this.b[7] * a.b[8],
          n = this.b[2] * a.b[6] + this.b[5] * a.b[7] + this.b[8] * a.b[8];
        this.b[0] = this.b[0] * a.b[0] + this.b[3] * a.b[1] + this.b[6] * a.b[2];
        this.b[1] = h;
        this.b[2] = b;
        this.b[3] = e;
        this.b[4] = k;
        this.b[5] = l;
        this.b[6] = c;
        this.b[7] = d;
        this.b[8] = n
      };
      b.prototype.transformPoint = function (point) {
        var p = new c.c.k(0, 0);
        p.x = this.b[0] * point.x + this.b[3] * point.y + this.b[6];
        p.y = this.b[1] * point.x + this.b[4] * point.y + this.b[7];
        return p;
      };
      b.prototype.invert = function () {
        var a = this.b[0],
          h = this.b[1],
          b = this.b[3],
          e = this.b[4],
          k = this.b[6],
          l = this.b[7],
          c = a * (e - l) + b * (l - h) + k * (h - e);
        0 != c && (this.b[0] = e - l, this.b[1] = l - h, this.b[2] = h - e, this.b[3] = k - b, this.b[4] = a - k, this.b[5] = b - a, this.b[6] = b * l - k * e, this.b[7] = k * h - a * l, this.b[8] = a * e - b * h, this.divide(c))
      };
      b.prototype.divide = function (a) {
        this.b[0] /= a;
        this.b[1] /= a;
        this.b[2] /= a;
        this.b[3] /= a;
        this.b[4] /= a;
        this.b[5] /= a;
        this.b[6] /= a;
        this.b[7] /= a;
        this.b[8] /= a;
      };
      b.prototype.copyValues = function (a) {
        for (var i = 0; i < 9; i++) {
          this.b[i] = a[i];
        }
      };
      return b
    }();
    d.Vf = f
  })(c.c || (c.c = {}))
})(N || (N = {}));

// flwebgl.e.qk
// Mesh?
(function (c) {
  (function (d) {
    var f = function () {
      function b(shape) {
        this.shape = shape;
        this.dirty = true;
        this.Gb = {};
        this.Gb[d.t.Z] = [];
        this.Gb[d.t.P] = [];
        this.Gb[d.t.bb] = [];
      }
      b.prototype.getDirty = z("dirty");
      b.prototype.setDirty = g("dirty");
      b.prototype.getDepth = function () {
        return this.shape.getDepth();
      };
      b.prototype.setDepth = function (a) {
        if (a != this.shape.getDepth()) {
          this.shape.setDepth(a);
          this.dirty = true;
        }
      };
      b.prototype.ra = function (a) {
        return this.shape.Ic().ra(a);
      };
      b.prototype.ab = function (a, h, b) {
        var e = this.Gb[a][h];
        if (!e) {
          var e = this.shape.Ic();
          var k = e.yf(a, h);
          if (!k) {
            return;
          }
          e = new c.e.lk(c.l.U.cm(e.getID(), h, a), k, b.Be(k.ad).getID(), this);
          this.Gb[a][h] = e;
        }
        return e;
      };
      b.prototype.getTransform = function () {
        return this.shape.getGlobalTransform()
      };
      b.prototype.getColorTransform = function () {
        return this.shape.getGlobalColorTransform()
      };
      b.prototype.destroy = function () {
        var a = [d.t.Z, d.t.P, d.t.bb];
        for (var h = 0; h < a.length; ++h) {
          var b = a[h];
          for (var e = 0; e < this.Gb[b].length; ++e) {
            if (this.Gb[b][e]) {
              this.Gb[b][e].destroy();
              delete this.Gb[b][e];
            }
          }
        }
      };
      return b
    }();
    d.qk = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.r.A
// flwebgl.events.Event
(function (c) {
  (function (c) {
    var f = function () {
      function b(type, bubbles) {
        if (typeof bubbles === "undefined") { bubbles = false; }
        this.type = type;
        this.bubbles = bubbles;
        this.currentTarget = void 0;
        this.target = void 0;
      }
      b.prototype.getType = z("type");
      b.prototype.getBubbles = z("bubbles");
      b.prototype.getTarget = z("target");
      b.prototype.setTarget = g("target");
      b.prototype.getCurrentTarget = z("currentTarget");
      b.prototype.setCurrentTarget = g("currentTarget");
      b.prototype.stopPropagation = function () {
        this.stopped = true;
      };
      b.prototype.stopImmediatePropagation = function () {
        this.stoppedImmediate = true;
      };
      b.ADDED = "flwebgl.events.Event.ADDED";
      b.REMOVED = "flwebgl.events.Event.REMOVED";
      b.UPDATED = "flwebgl.events.Event.UPDATED";
      b.ENTER_FRAME = "flwebgl.events.Event.ENTER_FRAME";
      b.EXIT_FRAME = "flwebgl.events.Event.EXIT_FRAME";
      b.FRAME_CONSTRUCTED = "flwebgl.events.Event.FRAME_CONSTRUCTED";
      return b;
    }();
    c.A = f
  })(c.r || (c.r = {}))
})(N || (N = {}));
window.flwebgl = N;
N.events = N.r;
N.r.Event = N.r.A;

// flwebgl.r.Na
// flwebgl.events.EventDispatcher
(function (c) {
  (function (c) {
    var f = function () {
      function b() {
        this.dd = {}
      }
      b.prototype.addEventListener = function (type, listener) {
        var b = this.dd[type];
        if (b === void 0 || !b) {
          b = this.dd[type] = [];
        }
        if (!this.hasEventListener(type, listener)) {
          b.push(listener);
        }
      };
      b.prototype.hasEventListener = function (type, listener) {
        "undefined" === typeof listener && (listener = void 0);
        var b = this.dd[type];
        if (b === void 0 || !b || b.length === 0) {
          return false;
        }
        if (listener) {
          for (var i = 0; i < b.length; i++) {
            if (b[i] === listener) {
              return true;
            }
          }
          return false;
        }
        return true;
      };
      b.prototype.removeEventListener = function (type, listener) {
        var b = this.dd[type];
        if (b !== void 0 && b) {
          for (var i = 0; i < b.length; i++) {
            if (b[i] === listener) {
              b.splice(i, 1);
            }
          }
        }
      };
      b.prototype.dispatchEvent = function (event) {
        event.setTarget(this);
        this.dispatch(event);
      };
      b.prototype.dispatch = function (event) {
        var h = this.dd[event.getType()];
        if (h !== void 0 && h.length) {
          h = h.slice(0);
          event.setCurrentTarget(this);
          for (var i = 0; i < h.length && !event.stoppedImmediate; i++) {
            h[i](event);
          }
        }
      };
      b.prototype.on = function () {
        this.dd = {};
      };
      return b
    }();
    c.Na = f
  })(c.r || (c.r = {}))
})(N || (N = {}));
window.flwebgl = N;
N.events = N.r;
N.r.EventDispatcher = N.r.Na;

// flwebgl.g.ok
var fa = N || (N = {});
var ga = fa.g || (fa.g = {});
var $ = ga.ok || (ga.ok = {});
$[$.kTransform = 1] = "kTransform";
$[$.kColorTransform = 2] = "kColorTransform";
$[$.kVisibility = 4] = "kVisibility";

// extends
var ha = this.Wn || function (c, d) {
  function f() {
    this.constructor = c
  }
  for (var b in d) d.hasOwnProperty(b) && (c[b] = d[b]);
  f.prototype = d.prototype;
  c.prototype = new f
};

// flwebgl.g.G
// flwebgl.g.Shape
(function (c) {
  (function (d) {
    var f = function (b) {
      function a() {
        b.call(this);
        this.localColorTransform = new c.c.p;
        this.globalColorTransform = new c.c.p;
        this.localTransform = new c.c.u;
        this.globalTransform = new c.c.u;
        this.mf = new c.e.qk(this);
        this.dirty = true;
        this.visible = true;
        this.parent = void 0;
        this.W = 0;
      }
      ha(a, b);
      a.prototype.getID = z("id");
      a.prototype.setID = g("id");
      a.prototype.getName = z("name");
      a.prototype.setName = g("name");
      a.prototype.getParent = z("parent");
      a.prototype.setParent = g("parent");
      a.prototype.Ic = z("yc");
      a.prototype.Of = g("yc");
      a.prototype.isVisible = z("visible");
      a.prototype.setVisible = function (a, b) {
        if (typeof b === "undefined") { b = true; }
        if (b) {
          this.W |= 4;
        }
        this.visible = a;
      };
      a.prototype.setLocalTransform = function (a, b) {
        if (typeof b === "undefined") { b = true; }
        if (b) {
          this.W |= 1;
        }
        this.dirty = true;
        this.localTransform = a.clone();
      };
      a.prototype.getLocalTransform = function () {
        return this.localTransform.clone()
      };
      a.prototype.getGlobalTransform = function () {
        return this.globalTransform.clone()
      };
      a.prototype.setLocalColorTransform = function (a, b) {
        if (typeof b === "undefined") { b = true; }
        if (b) {
          this.W |= 2;
        }
        this.dirty = true;
        if (a !== void 0) {
          this.localColorTransform = a.clone();
        } else {
          this.localColorTransform.identity();
        }
      };
      a.prototype.getLocalColorTransform = function () {
        return this.localColorTransform.clone();
      };
      a.prototype.getGlobalColorTransform = function () {
        return this.globalColorTransform.clone();
      };
      a.prototype.setTransforms = function (transform, colorTransform) {
        if (transform) {
          this.globalTransform.copy(transform);
          this.globalTransform.multiply(this.localTransform);
        } else {
          this.globalTransform.copy(this.localTransform);
        }
        if (colorTransform) {
          this.globalColorTransform.copy(colorTransform);
          this.globalColorTransform.concat(this.localColorTransform);
        } else {
          this.globalColorTransform.copy(this.localColorTransform);
        }
      };
      a.prototype.getDepth = function () {
        return this.globalTransform.get(2, 2);
      };
      a.prototype.setDepth = function (a) {
        this.globalTransform.set(2, 2, a);
      };
      a.prototype.Qb = function (a) {
        if (this.visible) {
          this.mf.setDirty(this.dirty);
          a.push(this.mf);
        }
        this.dirty = false;
      };
      a.prototype.getBounds = function (target, fast, e, k) {
        if (typeof target == "undefined" || target === void 0) { target = this; }
        if (typeof fast == "undefined") { fast = true; }
        if (typeof e == "undefined") { e = c.e.t.P; }
        if (typeof k == "undefined") { k = false; }
        if (k === true) {
          k = target.getGlobalTransform();
          a = this.getGlobalTransform();
        } else {
          k = new c.c.u;
          var dobj = target;
          while (dobj) {
            k.concat(dobj.getLocalTransform());
            dobj = dobj.getParent();
          }
          k.invert();
          a = new c.c.u;
          dobj = this;
          while (dobj) {
            a.concat(dobj.getLocalTransform());
            dobj = dobj.getParent();
          }
          a.concat(k);
        }
        return fast ? a.transformBoundsAABB(this.mesh.bounds) : this.calculateBoundsAABB(e, a);
      };
      a.prototype.calculateBoundsAABB = function (a, b) {
        var bounds = new c.c.M
        var k = this.mesh.ra(a);
        var l = new c.c.k(0, 0);
        for (var i = 0; i < k; i++) {
          var m = this.mesh.yf(a, i);
          var n = m.qj();
          m = m.nc(n[0]);
          for (var j = 0; j < m.length; j++) {
            var y = m[j];
            var w = y.jc.attrs;
            for (var k = 0; k < w.length; k++) {
              var q = w[k];
              if (q.pc === "POSITION0") {
                w = y.ba;
                y = y.jc.totalSize / Float32Array.BYTES_PER_ELEMENT;
                for (q = q.byteOffset / Float32Array.BYTES_PER_ELEMENT; q < w.length; q += y) {
                  l.x = w[q];
                  l.y = w[q + 1];
                  l = b.transformPoint(l);
                  bounds.union(new c.c.M(l.x, l.y, 0, 0));
                }
                break;
              }
            }
          }
        }
        return bounds;
      };
      a.prototype.dispatch = function (a) {
        b.prototype.dispatch.call(this, a);
        this.getParent() && (a.getBubbles() && !a.stopped) && this.getParent().dispatch(a)
      };
      a.prototype.destroy = function () {
        this.id = -1;
        this.mesh = void 0;
        this.mf.destroy();
        this.parent = void 0;
        delete this.mf
      };
      return a
    }(c.r.Na);
    d.G = f
  })(c.g || (c.g = {}))
})(N || (N = {}));
window.flwebgl = N;
N.sg = N.g;
N.g.Shape = N.g.G;

// flwebgl.g.j
// flwebgl.g.MovieClip
(function (c) {
  (function (d) {
    var f = function (b) {
      function a() {
        b.call(this);
        this.id = -1;
        this.timeline = void 0;
        this.children = [];
        this.localColorTransform = new c.c.p;
        this.globalColorTransform = new c.c.p;
        this.localTransform = new c.c.u;
        this.globalTransform = new c.c.u;
        this.dirty = true;
        this.visible = true;
        this.pa = void 0;
        this.Ui = false;
        this.context = void 0;
        this.currentFrameIndex = -1;
        this._loop = true;
        this.W = 0;
        this.parent = void 0;
        this._isPlaying = true;
        this.Y = [];
        this.df = false;
        this.Td = false
      }
      ha(a, b);
      a.prototype.getName = z("name");
      a.prototype.setName = g("name");
      a.prototype.setVisible = function (a, b) {
        if (typeof b === "undefined") { b = true; }
        if (b) {
          this.W |= 4;
        }
        this.visible = a;
      };
      a.prototype.isVisible = z("visible");
      a.prototype.setLocalTransform = function (a, b) {
        if (typeof b === "undefined") { b = true; }
        if (b) {
          this.W |= 1;
        }
        this.dirty = true;
        this.localTransform = a.clone();
      };
      a.prototype.getLocalTransform = function () {
        return this.localTransform.clone();
      };
      a.prototype.getGlobalTransform = function () {
        return this.globalTransform.clone();
      };
      a.prototype.setLocalColorTransform = function (a, b) {
        if (typeof b === "undefined") { b = true; }
        if (b) {
          this.W |= 2;
        }
        this.dirty = true;
        if (a !== void 0) {
          this.localColorTransform = a.clone();
        } else {
          this.localColorTransform.identity();
        }
      };
      a.prototype.getLocalColorTransform = function () {
        return this.localColorTransform.clone()
      };
      a.prototype.getGlobalColorTransform = function () {
        return this.globalColorTransform.clone()
      };
      a.prototype.addChild = function (displayObject, b) {
        if (typeof b === "undefined") { b = true; }
        return this.addChildAt(displayObject, 0, b);
      };
      a.prototype.addChildAt = function (displayObject, index, e, k) {
        if (typeof e === "undefined") { e = true; }
        if (typeof k === "undefined") { k = false; }
        if (index == void 0 || index == null || index > this.getNumChildren()) {
          return false;
        }
        if (index < 0) { index = 0; }
        if (e) { displayObject.setID(-1); }
        if (displayObject.getParent() !== void 0) { displayObject.getParent().removeChild(displayObject); }
        if (k) {
          this.Y.push({
            index: index,
            displayObject: displayObject
          });
          this.children.splice(index, 0, null);
          return true;
        }
        displayObject.setParent(this);
        displayObject.setTransforms(this.globalTransform, this.globalColorTransform);
        this.children.splice(index, 0, displayObject);
        displayObject.dispatchEvent(new c.r.A(c.r.A.ADDED, true));
        if (displayObject instanceof a) {
          var p = this;
          while (p.getParent()) {
            p = p.getParent();
          }
          if (p == this.context.getStage() && displayObject.getCurrentFrame() == 0) {
            displayObject.advanceFrame();
            displayObject.dispatchEnterFrame();
            displayObject.constructFrame();
            displayObject.dispatchFrameConstructed();
            displayObject.executeFrameScripts();
            displayObject.dispatchExitFrame();
          }
        }
        return true
      };
      a.prototype.removeChild = function (a) {
        return this.removeChildAt(this.getChildIndex(a));
      };
      a.prototype.removeChildAt = function (index) {
        if (index >= 0 && index != void 0 && index != null && index < this.getNumChildren()) {
          var child = this.getChildAt(index);
          if (!this.Td) {
            child.dispatchEvent(new c.r.A(c.r.A.REMOVED, true));
          }
          child.setParent(void 0);
          this.children.splice(index, 1);
          child.on();
          return child;
        }
      };
      a.prototype.getNumChildren = function () {
        return this.children.length;
      };
      a.prototype.getChildren = function () {
        return this.children.slice(0);
      };
      a.prototype.getChildAt = function (index, b) {
        if (typeof b === "undefined") { b = false; }
        var e;
        if (index < this.getNumChildren()) {
          e = this.children[index];
          if (e == null && b) {
            for (var i = 0; i < this.Y.length; i++) {
              if (this.Y[i].index == index) {
                e = this.Y[i].displayObject;
                break;
              }
            }
          }
        }
        return e;
      };
      a.prototype.getChildIndex = function (displayObject) {
        return this.children.indexOf(displayObject);
      };
      a.prototype.setChildIndex = function (displayObject, index) {
        this.swap(this.getChildIndex(displayObject), index);
      };
      a.prototype.getChildByName = function (name) {
        for (var b = 0; b < this.children.length; ++b) {
          if (this.children[b].getName() === name) {
            return this.children[b];
          }
        }
      };
      a.prototype.getParent = z("parent");
      a.prototype.getCurrentFrame = function () {
        return this.currentFrameIndex + 1;
      };
      a.prototype.getTotalFrames = z("totalFrames");
      a.prototype.play = function () {
        this._isPlaying = true;
      };
      a.prototype.stop = function () {
        this._isPlaying = false;
      };
      a.prototype.isPlaying = z("_isPlaying");
      a.prototype.gotoAndPlay = function (a) {
        this.gotoFrame(a, false);
      };
      a.prototype.gotoAndStop = function (a) {
        this.gotoFrame(a, true);
      };
      a.prototype.gotoFrame = function (frameNum, stop) {
        if (typeof frameNum === "string") {
          var labels = this.timeline.getFrameLabels();
          var found = false;
          for (var l = labels.length - 1; l >= 0; l--) {
            if (labels[l].name === frameNum) {
              frameNum = labels[l].frameNum;
              found = true;
              break;
            }
          }
          if (found === false) {
            return;
          }
        }
        if (frameNum >= 1 && frameNum <= this.totalFrames && frameNum != this.currentFrameIndex + 1) {
          this.constructFrame(true);
          this.play();
          if (frameNum < this.currentFrameIndex + 1) {
            var e = (frameNum == 1);
            this.executeFrameCommands(!e);
            this.constructFrame(!e);
          }
          while (this.currentFrameIndex + 1 < frameNum) {
            e = (frameNum == this.currentFrameIndex + 1 + 1);
            this.advanceFrame(true, e);
            this.constructFrame(!e);
          }
          if (stop === false) {
            this.play();
          } else {
            this.stop();
          }
          this.dispatchFrameConstructed();
          this.executeFrameScripts();
          this.dispatchExitFrame();
        }
      };
      a.prototype.swap = function (a, b) {
        if (a !== b && a >= 0 && a < this.children.length && b >= 0 && b < this.children.length) {
          this.children.splice(b, 0, this.children.splice(a, 1)[0]);
          for (var i = 0; i < this.Y.length; i++) {
            var k = this.Y[i];
            if (k.index == a) {
              k.index = b;
            } else {
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
      a.prototype.getID = z("id");
      a.prototype.setID = g("id");
      a.prototype.setContext = g("context");
      a.prototype.setLoop = g("_loop");
      a.prototype.dispatch = function (a) {
        b.prototype.dispatch.call(this, a);
        if (this.getParent() && a.getBubbles() && !a.stopped) {
          this.getParent().dispatch(a);
        }
      };
      a.prototype.advanceFrame = function (a, b) {
        if (typeof a === "undefined") { a = false; }
        if (typeof b === "undefined") { b = false; }
        var i;
        var advance = this._isPlaying;
        if (advance && !this._loop && this.currentFrameIndex == this.totalFrames - 1) { advance = false; }
        if (advance && this.currentFrameIndex == 0 && this.totalFrames == 1) { advance = false; }
        if (advance) {
          if (++this.currentFrameIndex == this.totalFrames) {
            this.executeFrameCommands(a);
            this.constructFrame(a);
          } else {
            var e = a && !b;
            if (e) { this.Td = true; }
            var cmds = this.timeline.getFrameCmds(this.currentFrameIndex);
            for (i = 0; i < cmds.length; i++) {
              cmds[i].execute(this, this.context, e);
            }
            this.Td = false;
          }
          this.df = true;
        }
        // advance children
        if (!a) {
          for (i = 0; i < this.children.length; i++) {
            if (this.children[i] instanceof c.g.j) {
              this.children[i].advanceFrame(a);
            }
          }
          for (i = 0; i < this.Y.length; i++) {
            if (this.Y[i].displayObject instanceof c.g.j) {
              this.Y[i].displayObject.advanceFrame(a);
            }
          }
        }
      };
      a.prototype.dispatchFrameConstructed = function () {
        this.dispatchEvent(new c.r.A(c.r.A.FRAME_CONSTRUCTED));
        for (var a = 0; a < this.children.length; a++) {
          if (this.children[a] instanceof c.g.j) {
            this.children[a].dispatchFrameConstructed();
          }
        }
      };
      a.prototype.dispatchEnterFrame = function () {
        this.dispatchEvent(new c.r.A(c.r.A.ENTER_FRAME));
        for (var a = 0; a < this.children.length; a++) {
          if (this.children[a] instanceof c.g.j) {
            this.children[a].dispatchEnterFrame();
          }
        }
      };
      a.prototype.dispatchExitFrame = function () {
        this.dispatchEvent(new c.r.A(c.r.A.EXIT_FRAME));
        for (var a = 0; a < this.children.length; a++) {
          if (this.children[a] instanceof c.g.j) {
            this.children[a].dispatchExitFrame();
          }
        }
      };
      a.prototype.constructFrame = function (a) {
        if (typeof a === "undefined") { a = false; }
        var b;
        for (b = 0; b < this.Y.length; b++) {
          var e = this.Y[b].displayObject;
          this.children[this.Y[b].index] = e;
          e.setParent(this);
        }
        for (b = 0; b < this.children.length; b++) {
          if (this.children[b] instanceof c.g.j) {
            this.children[b].constructFrame();
          }
        }
        for (b = 0; b < this.Y.length; b++) {
          e = this.Y[b].displayObject;
          e.setTransforms(this.globalTransform, this.globalColorTransform);
          if (!a) {
            e.dispatchEvent(new c.r.A(c.r.A.ADDED, true));
          }
        }
        this.Y = [];
      };
      a.prototype.executeFrameScripts = function () {
        var i;
        if (this.df) {
          var scripts = this.timeline.getFrameScripts(this.currentFrameIndex);
          for (i = 0; i < scripts.length; i++) {
            this.executeFrameScript(scripts[i]);
          }
          this.df = false;
        }
        for (i = 0; i < this.children.length; i++) {
          if (this.children[i] instanceof c.g.j) {
            this.children[i].executeFrameScripts();
          }
        }
      };
      a.prototype.getFrameLabels = function () {
        var labels = this.timeline.getFrameLabels();
        var labelsCopy = [];
        for (var i = 0; i < labels.length; i++) {
          labelsCopy.push({
            frameNum: labels[e].frameNum,
            name: labels[e].name
          });
        }
        return labelsCopy;
      };
      a.prototype.getCurrentFrameLabel = function () {
        var labels = this.timeline.getFrameLabels();
        var currentFrame = this.getCurrentFrame();
        for (var i = a.length - 1; i >= 0; i--) {
          if (currentFrame == a[i].frameNum) {
            return a[i].name;
          }
        }
      };
      a.prototype.getCurrentLabel = function () {
        var label = void 0;
        var labels = this.timeline.getFrameLabels();
        var currentFrame = this.getCurrentFrame();
        var labelFrame = -1;
        for (var i = 0; i < labels.length; i++) {
          if (labels[i].frameNum >= labelFrame && labels[i].frameNum <= currentFrame) {
            label = labels[i].name;
            labelFrame = labels[i].frameNum;
          }
        }
        return label;
      };
      a.prototype.setParent = g("parent");
      a.prototype.getChildIndexByID = function (a) {
        if (a < 0) {
          return -1;
        }
        var i;
        for (i = 0; i < this.children.length; i++) {
          if (this.children[i] && this.children[i].getID() == a) {
            return i;
          }
        }
        for (i = 0; i < this.Y.length; i++) {
          if (this.Y[i].displayObject.getID() == a) {
            return this.Y[i].index;
          }
        }
        return -1;
      };
      a.prototype.Of = function (a) {
        this.timeline = a;
        this.currentFrameIndex = -1;
        this.totalFrames = this.timeline.frameCmds.length;
      };
      a.prototype.Ic = z("timeline");
      a.prototype.$j = function (a) {
        this.pa = a;
        this.Ui = true
      };
      a.prototype.setTransforms = function (a, b) {
        if (a) {
          this.globalTransform.copy(a);
          this.globalTransform.multiply(this.localTransform);
        } else {
          this.globalTransform.copy(this.localTransform);
        }
        if (b) {
          this.globalColorTransform.copy(b);
          this.globalColorTransform.concat(this.localColorTransform);
        } else {
          this.globalColorTransform.copy(this.localColorTransform);
        }
        for (var e = 0; e < this.children.length; ++e) {
          this.children[e].setTransforms(this.globalTransform, this.globalColorTransform);
        }
        if (this.pa !== void 0) {
          if (this.globalColorTransform.equals(this.pa.getColorTransform())) {
            this.pa.setTransforms(this.globalTransform);
          } else {
            this.oi();
          }
        }
      };
      a.prototype.getDepth = function () {
        return this.globalTransform.get(2, 2)
      };
      a.prototype.setDepth = function (a) {
        this.globalTransform.set(2, 2, a)
      };
      a.prototype.destroy = function () {
        while (this.children.length) {
          var a = this.children.pop();
          a.destroy();
          delete a;
        }
        this.id = -1;
        this.timeline = void 0;
      };
      a.prototype.executeFrameCommands = function (a) {
        if (typeof a === "undefined") { a = false; }
        this.currentFrameIndex = 0;
        if (a) { this.Td = true; }
        var placeObjectCmds = [];
        var e = this.timeline.getFrameCmds(0);
        for (var k = 0; k < e.length; ++k) {
          var l = e[k];
          if (l instanceof c.B.Wf) { // PlaceObjectCommand
            placeObjectCmds.push(l.X);
          }
        }
        for (k = 0; k < this.getNumChildren(); ++k) {
          l = this.getChildAt(k);
          if (l.getID() !== -1) {
            var d = true;
            if (placeObjectCmds.length > 0) {
              var m = l.getID();
              for (var n = 0; n < placeObjectCmds.length; ++n) {
                if (m == placeObjectCmds[n]) {
                  placeObjectCmds.splice(n, 1);
                  d = false;
                  break;
                }
              }
            }
            if (d) {
              this.removeChildAt(k);
              l.destroy();
              k--;
            }
          }
        }
        for (k = 0; k < e.length; ++k) {
          l = e[k];
          l.execute(this, this.context, a);
        }
        this.Td = false;
        this.df = true;
      };
      a.prototype.oi = function () {
        if (this.pa !== void 0) {
          this.pa.destroy();
          this.pa = void 0;
        }
      };
      a.prototype.Qb = function (a) {
        var e;
        if (this.isVisible()) {
          if (this.pa === void 0) {
            var b = a.length;
            for (e = 0; e < this.children.length; ++e) {
              this.children[e].Qb(a);
            }
            if (this.dirty) {
              for (e = b; e < a.length; ++e) {
                a[e].setDirty(true);
              }
            }
          } else {
            b = [];
            for (e = 0; e < this.children.length; ++e) {
              this.children[e].Qb(b);
            }
            var k = false;
            for (e = 0; !k && e < b.length; ++e) {
              k = b[e].getDirty();
            }
            if (k) {
              this.oi();
              for (e = 0; e < b.length; ++e) {
                b[e].setDirty(true);
                a.push(b[e]);
              }
            } else {
              this.pa.Qb(a);
            }
          }
          this.dirty = false;
        }
      };
      a.prototype.getBounds = function (a, b, e, k) {
        if (typeof a === "undefined") { a = void 0; }
        if (typeof b === "undefined") { b = true; }
        if (typeof e === "undefined") { e = c.e.t.P; }
        if (typeof k === "undefined") { k = false; }
        if (a === void 0) { a = this; }
        var bounds = new c.c.M;
        for (var i = 0; i < this.children.length; i++) {
          bounds.union(this.children[i].getBounds(a, b, e, k));
        }
        return bounds;
      };
      a.prototype.executeFrameScript = function (name) {
        eval("flwebgl.actions." + name + ".call(this);")
      };
      return a
    }(c.r.Na);
    d.j = f
  })(c.g || (c.g = {}))
})(N || (N = {}));
window.flwebgl = N;
N.sg = N.g;
N.g.MovieClip = N.g.j;

// flwebgl.l.U
// flwebgl.util.U
(function (c) {
  (function (d) {
    var f = function () {
      function b() {}
      b.requestAnimationFrame = function (fn, b, c) {
        var rAF = c.requestAnimationFrame || c.webkitRequestAnimationFrame || c.mozRequestAnimationFrame || c.oRequestAnimationFrame || c.msRequestAnimationFrame;
        return rAF ? rAF(fn) : c.setTimeout(fn, 1000 / b);
      };
      b.cancelAnimationFrame = function (a, b) {
        var c = b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.mozCancelAnimationFrame || b.oCancelAnimationFrame || b.msCancelAnimationFrame || b.clearTimeout;
        void 0 != c && c(a)
      };
      b.getColor = function (a) {
        var red = parseInt(a.substring(1, 3), 16);
        var green = parseInt(a.substring(3, 5), 16);
        var blue = parseInt(a.substring(5, 7), 16);
        var alpha = (a.length > 7) ? parseInt(a.substring(7), 16) : 255;
        return new c.c.Qc(red, green, blue, alpha);
      };
      b.cm = function (a, b, c) {
        return a + "_" + b + "_" + c;
      };
      b.em = function (a, b) {
        return "__Snapshot__" + a + "_" + b;
      };
      b.bind = function (a, b) {
        return function () {
          a[b].apply(a, arguments);
        }
      };
      b.co = function (a) {
        return a > 0 && (a & a - 1) == 0;
      };
      b.nextPowerOfTwo = function (a) {
        return Math.pow(2, Math.ceil(Math.log(a) / Math.LN2))
      };
      b.sm = function (a) {
        var global = a.getGlobalTransform().clone();
        var local = a.getLocalTransform().clone();
        local.invert();
        global.multiply(local);
        return global;
      };
      return b
    }();
    d.U = f
  })(c.l || (c.l = {}))
})(N || (N = {}));

// flwebgl.B.Wf
// PlaceObjectCommand
(function (c) {
  (function (d) {
    var f = function () {
      function b(a) {
        this.Ag = a[0];
        this.hf = a[1];
        this.X = a[2];
        if (a.length > 4) {
          var b = a.slice(3);
          this.hc = new c.c.u(b)
        } else {
          this.hc = new c.c.u;
        }
        if (a.length == 10 || a.length == 4) {
          this.instanceName = a[a.length - 1];
        }
      }
      b.prototype.execute = function (a, b) {
        var c = b.assetPool;
        var e = b.scenegraphFactory;
        var k = a.getChildIndexByID(this.X);
        if (k >= 0) {
          c = a.getChildAt(k);
          if ((c.W & 1) === 0) {
            c.setLocalTransform(this.hc, false);
          }
          if ((c.W & 2) === 0) {
            e = c.getLocalColorTransform().clone();
            e.identity();
            c.setLocalColorTransform(e, false);
          }
          for (e = a.getChildIndexByID(this.hf) + 1; a.getChildAt(e) && a.getChildAt(e).getID() < 0; e++) {}
          if (e > k) {
            e--;
          }
          a.swap(k, e);
          if ((c.W & 4) === 0) {
            c.setVisible(true, false);
          }
          return true;
        }
        return (this.Ek(a, c, e) < 0) ? false : true;
      };
      b.prototype.Ek = function (a, b, c) {
        var e = (b.getMesh(this.Ag) === void 0) ? c.createMovieClip(this.Ag, this.X) : c.createShape(this.Ag, this.X);
        e.setLocalTransform(this.hc, false);
        if (this.instanceName !== void 0) {
          e.setName(this.instanceName);
        }
        for (b = a.getChildIndexByID(this.hf) + 1; a.getChildAt(b) && a.getChildAt(b).getID() < 0; b++) {}
        return a.addChildAt(e, b, false, true) ? b : -1;
      };
      return b
    }();
    d.Wf = f
  })(c.B || (c.B = {}))
})(N || (N = {}));

// flwebgl.B.Ph
// RemoveObjectCommand
(function (c) {
  (function (c) {
    var f = function () {
      function b(a) {
        this.X = a[0];
      }
      b.prototype.execute = function (a) {
        var b = a.getChildIndexByID(this.X);
        if (b < 0) {
          return false;
        }
        var c = a.getChildAt(b);
        if (a.removeChildAt(b)) {
          c.destroy();
        }
        return true;
      };
      return b
    }();
    c.Ph = f
  })(c.B || (c.B = {}))
})(N || (N = {}));

// flwebgl.B.bi
// SetTransformCommand
(function (c) {
  (function (d) {
    var f = function () {
      function b(a) {
        this.X = a[0];
        this.hf = a[1];
        if (a.length > 2) {
          a = a.slice(2);
          this.hc = new c.c.u(a);
        } else {
          this.hc = new c.c.u;
        }
      }
      b.prototype.execute = function (a) {
        var b = a.getChildIndexByID(this.X);
        if (b < 0) {
          return false;
        }
        var c = a.getChildAt(b);
        for (var e = a.getChildIndexByID(this.hf) + 1; a.getChildAt(e) && a.getChildAt(e).getID() < 0; e++) {}
        if (b < e) {
          e--;
        }
        if (b != e) {
          a.swap(b, e);
        }
        if ((c.W & 1) === 0) {
          c.setLocalTransform(this.hc, false);
        }
        return true;
      };
      return b
    }();
    d.bi = f
  })(c.B || (c.B = {}))
})(N || (N = {}));

// flwebgl.B.ai
// SetColorTransformCommand
(function (c) {
  (function (d) {
    var f = function () {
      function b(a) {
        this.X = a[0];
        a = a.slice(1);
        if (a !== void 0 && a.length == 8) {
          this.colorTransform = new c.c.p(
            a[0], a[1] / 100,
            a[2], a[3] / 100,
            a[4], a[5] / 100,
            a[6], a[7] / 100
          );
        } else {
          this.colorTransform = new c.c.p;
        }
      }
      b.prototype.execute = function (a) {
        var b = a.getChildIndexByID(this.X);
        if (b < 0) {
          return false;
        }
        a = a.getChildAt(b, true);
        if ((a.W & 2) === 0) {
          a.setLocalColorTransform(this.colorTransform, false);
        }
        return true;
      };
      return b
    }();
    d.ai = f
  })(c.B || (c.B = {}))
})(N || (N = {}));

// flwebgl.B.Vh
// SetVisibilityCommand
(function (c) {
  (function (c) {
    var f = function () {
      function b(a) {
        this.X = a[0];
        this.Tl = (a[1] === 1);
      }
      b.prototype.execute = function (a) {
        var b = a.getChildIndexByID(this.X);
        if (b < 0) {
          return false;
        }
        a = a.getChildAt(b, true);
        if ((a.W & 4) === 0) {
          a.setVisible(this.Tl, false);
        }
        return true;
      };
      return b
    }();
    c.Vh = f
  })(c.B || (c.B = {}))
})(N || (N = {}));

// flwebgl.B.Wh
// TintCommand ?
// CacheAsBitmapCommand ?
(function (c) {
  (function (d) {
    var f = function () {
      function b(a) {
        this.X = a[0];
        this.color = new c.c.Qc(a[2], a[3], a[4], a[1]);
      }
      b.prototype.execute = function (a, b) {
        var index = a.getChildIndexByID(this.X);
        if (index < 0) {
          return false;
        }
        var displayObject = a.getChildAt(index, true);
        if (displayObject.Ui) {
          return true;
        }
        var colorTransform = a.getGlobalColorTransform().clone();
        var k = new c.e.vk;
        var d = new c.e.yk(displayObject, this.color, colorTransform, k);
        return b.nd.nn(d);
      };
      return b
    }();
    d.Wh = f
  })(c.B || (c.B = {}))
})(N || (N = {}));

// flwebgl.media.Mh
(function (c) {
  (function (c) {
    var f = function () {
      function b(a) {
        this.X = a[0];
        this.Ol = a[1];
        this.ll = a[2];
      }
      b.prototype.execute = function (a, b, c) {
        if (!c) {
          b.soundFactory.kn(this.X.toString(), this.Ol, this.ll);
        }
        return true;
      };
      return b
    }();
    c.Mh = f
  })(c.media || (c.media = {}))
})(N || (N = {}));

(function (c) {
  (function (d) {

    // flwebgl.xj.Sn
    var f = function () {
      return function (width, height, color, frameRate, loop, timelines) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.frameRate = frameRate;
        this.loop = loop;
        this.timelines = timelines;
      }
    }();
    d.Sn = f;

    // flwebgl.xj.sk
    // Parser
    var b = function () {
      function b(assetPool) {
        this.assetPool = assetPool;
      }
      b.prototype.init = function (content, textures, options) {
        if (textures !== void 0) {
          for (var i = 0; i < textures.length; i++) {
            var texture = textures[i];
            if (!this.parseTextureAtlas(texture.getTextureJSON(), texture.getImageURL(), i)) {
              return;
            }
          }
        }
        return this.parse(content, options);
      };
      b.prototype.destroy = function () {
        return true;
      };
      b.prototype.If = function (vertices, fillName, fillStyle, fillMatrix, fillOverflow, fillIsBitmapClipped, fillIsOpaque, internalIndices, concaveCurveIndices, convexCurveIndices, edgeIndices) {
        if (typeof internalIndices === "undefined") { internalIndices = []; }
        if (typeof concaveCurveIndices === "undefined") { concaveCurveIndices = []; }
        if (typeof convexCurveIndices === "undefined") { convexCurveIndices = []; }
        if (typeof edgeIndices === "undefined") { edgeIndices = []; }
        if (internalIndices.length == 0 && concaveCurveIndices.length == 0 && convexCurveIndices.length == 0 && edgeIndices.length == 0) {
          return [];
        }
        var C = [];
        var v;
        var edgeType;
        if (internalIndices.length > 0) {
          edgeType = c.e.t.Z;
          v = this.xl(vertices, internalIndices);
        } else {
          edgeType = c.e.t.P;
          v = this.wl(vertices, concaveCurveIndices, convexCurveIndices, edgeIndices);
        }
        for (var a = 0; a < v.length; a++) {
          var f = v[a];
          var r = this.injectTexCoords(f, fillName, fillStyle, fillMatrix);
          var u = new c.e.ca(fillName, fillIsOpaque);
          for (var B in r) {
            var A = r[B];
            if (this.emulateStandardDerivatives) {
              this.ti(edgeType, A, f.Ma.length);
            }
            A = new c.e.Pd(new Float32Array(A), this.te);
            u.xe(B, [A]);
            u.we(new Uint16Array(f.Ma));
          }
          u.setFillMode(this.getFillMode(fillStyle, fillOverflow, fillIsBitmapClipped));
          C.push(u);
        }
        return C;
      };
      b.prototype.dj = function (vertices, concaveCurveIndices, convexCurveIndices, edgeIndices, fillName, fillStyle, fillIsOpaque, fillMatrix, fillOverflow, fillIsBitmapClipped) {
        // holy shit what is this?
        var A = 0;
        var C = 0;
        var v = 0;
        var x = 0;
        var B = 0;
        var I = 0;
        var K = 0;
        var X = [];
        var U = 3 * Math.floor(c.e.d.MAX_VERTICES / 6);
        var T = concaveCurveIndices.length + convexCurveIndices.length + edgeIndices.length;
        while (C < T) {
          A = C;
          C = (T - C > U) ? C + U : T;
          var L = C - A;
          A = [];
          var R = [];
          var H = 0;
          var F = 0;
          var W = this.ec(7);
          x = B;
          B = (B < convexCurveIndices.length) ? ((convexCurveIndices.length - B < L) ? convexCurveIndices.length : B + L) : B;
          var L = L - (B - x);
          var J = convexCurveIndices;
          for (var M = this.ec(0), O = this.ec(1), K = this.ec(2); x < B; x += 3) {
            var E = J[x];
            var G = J[x + 1];
            var D = J[x + 2];
            E = new c.c.k(vertices[2 * E], vertices[2 * E + 1]);
            G = new c.c.k(vertices[2 * G], vertices[2 * G + 1]);
            D = new c.c.k(vertices[2 * D], vertices[2 * D + 1]);
            var P = E.x - G.x;
            var Y = E.y - G.y;
            var S = G.x - D.x;
            var Q = G.y - D.y;
            var V = Math.sqrt(P * P + Y * Y);
            var Z = Math.sqrt(S * S + Q * Q);
            Q = -Q / Z;
            S = S / Z;
            P = new c.c.k(E.x - 2 * (-Y / V), E.y - 2 * (P / V));
            Y = G;
            Q = new c.c.k(D.x - 2 * Q, D.y - 2 * S);
            V = this.wi([E, G, D], [M, O, K], [P, Y, Q]);
            this.Sc(A, R, [E, P, G], [M, V[0], O], [1, 1, 1], F, H);
            F += 3 * this.S;
            H += 3;
            this.Sc(A, R, [G, Q, D], [O, V[2], K], [1, 1, 1], F, H);
            F += 3 * this.S;
            H += 3;
          }
          if (L > 0) {
            x = v;
            v = (v < concaveCurveIndices.length) ? ((concaveCurveIndices.length - v < L) ? concaveCurveIndices.length : v + L) : v;
            L -= v - x;
            M = this.ec(4);
            O = this.ec(5);
            K = this.ec(6);
            J = concaveCurveIndices;
            for (; x < v; x += 3) {
              E = J[x];
              G = J[x + 1];
              D = J[x + 2];
              E = new c.c.k(vertices[2 * E], vertices[2 * E + 1]);
              G = new c.c.k(vertices[2 * G], vertices[2 * G + 1]);
              D = new c.c.k(vertices[2 * D], vertices[2 * D + 1]);
              Y = (E.x + D.x) / 2;
              V = (E.y + D.y) / 2;
              P = D.x - E.x;
              S = D.y - E.y;
              Q = Math.sqrt(P * P + S * S);
              S = -S / Q;
              Z = P / Q;
              P = new c.c.k(E.x + 0.1 * Math.min(2, Q) * S, E.y + 0.1 * Math.min(2, Q) * Z);
              Y = new c.c.k(Y, V);
              Q = new c.c.k(D.x + 0.1 * Math.min(2, Q) * S, D.y + 0.1 * Math.min(2, Q) * Z);
              V = this.wi([E, G, D], [M, O, K], [P, Y, Q]);
              this.Sc(A, R, [E, P, D], [M, V[0], K], [-1, -1, -1], F, H);
              F += 3 * this.S;
              H += 3;
              this.Sc(A, R, [D, P, Q], [K, V[0], V[2]], [-1, -1, -1], F, H);
              F += 3 * this.S;
              H += 3;
            }
          }
          if (L > 0) {
            K = I;
            I = I < edgeIndices.length ? edgeIndices.length - I < L ? edgeIndices.length : I + L : I;
            J = edgeIndices;
            M = O = this.ec(4);
            for (x = K; x < I; x += 3) {
              E = J[x];
              G = J[x + 1];
              D = J[x + 2];
              E = new c.c.k(vertices[2 * E], vertices[2 * E + 1]);
                  new c.c.k(vertices[2 * G], vertices[2 * G + 1]);
              D = new c.c.k(vertices[2 * D], vertices[2 * D + 1]);
              P = D.x - E.x;
              S = D.y - E.y;
              Q = Math.sqrt(P * P + S * S);
              S = -S / Q;
              Z = P / Q;
              P = new c.c.k(E.x - 2 * S, E.y - 2 * Z);
              Y = new c.c.k(D.x - 2 * S, D.y - 2 * Z);
              V = [W, W];
              this.Sc(A, R, [E, P, D], [M, V[0], O], [-1, -1, -1], F, H);
              F += 3 * this.S;
              H += 3;
              this.Sc(A, R, [P, Y, D], [V[0], V[1], O], [-1, -1, -1], F, H);
              F += 3 * this.S;
              H += 3;
            }
          }
          if (R.length == 0) {
            return;
          }
          L = new c.e.ca(fillName, fillIsOpaque);
          H = new p;
          H.ba = A;
          H.Ma = R;
          var A = this.injectTexCoords(H, fillName, fillStyle, fillMatrix);
          var L = new c.e.ca(fillName, fillIsOpaque);
          var R = c.e.t.bb;
          for (var ba in A) {
            F = A[ba];
            if (this.emulateStandardDerivatives) {
              this.ti(R, F, H.Ma.length);
            }
            W = this.te;
            F = new c.e.Pd(new Float32Array(F), W);
            L.xe(ba, [F]);
            L.we(new Uint16Array(H.Ma));
          }
          L.setFillMode(this.getFillMode(fillStyle, fillOverflow, fillIsBitmapClipped));
          X.push(L);
        }
        return X;
      };
      b.prototype.Sc = function (a, b, h, k, e, c, d) {
        a[c + 0] = h[0].x;
        a[c + 1] = h[0].y;
        a[c + 2] = k[0].x;
        a[c + 3] = k[0].y;
        a[c + 4] = e[0];
        c += this.S;
        a[c + 0] = h[1].x;
        a[c + 1] = h[1].y;
        a[c + 2] = k[1].x;
        a[c + 3] = k[1].y;
        a[c + 4] = e[1];
        c += this.S;
        a[c + 0] = h[2].x;
        a[c + 1] = h[2].y;
        a[c + 2] = k[2].x;
        a[c + 3] = k[2].y;
        a[c + 4] = e[2];
        b[d + 0] = d + 0;
        b[d + 1] = d + 1;
        b[d + 2] = d + 2
      };
      b.prototype.ec = function (a) {
        if (a >= 9) { return b.Me[a - 5]; }
        if (a >= 4) { a -= 4; }
        if (a == 4) { a = 3; }
        return b.Me[a];
      };
      b.prototype.parse = function (content, options) {
        if (typeof content === "string") {
          content = JSON.parse(content);
        }
        var header = content[b.kHeader];
        var stageSize = header[b.kStageSize];

        var n = new f(
          stageSize[b.kWidth],
          stageSize[b.kHeight],
          c.l.U.getColor(header[b.kStageColor]),
          header[b.kFrameRate],
          header[b.kLoop],
          header[b.kSceneTimelines]
        );

        var p = (header[b.kReadable] == true) ? new a(content, this, this.assetPool) : new e(content, this, this.assetPool);
        this.enableCacheAsBitmap = options[c.n.kOption_CacheAsBitmap];
        this.emulateStandardDerivatives = options[c.n.kOption_StandardDerivatives];
        this.S = 7;
        if (this.emulateStandardDerivatives) {
          this.S += 4;
        }
        if (!p.parseSounds() || !p.parseFills()) {
          return n;
        }
        this.te = new c.e.di;
        var y = new c.e.na(0, "POSITION0", c.e.d.FLOAT, 2);
        var w = new c.e.na(2 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD0", c.e.d.FLOAT, 2);
        var t = new c.e.na(4 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD1", c.e.d.FLOAT, 1);
        var q = new c.e.na(5 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD2", c.e.d.FLOAT, 2);
        this.te.attrs = [y, w, t, q];
        if (this.emulateStandardDerivatives) {
          var q = new c.e.na(5 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD2", c.e.d.FLOAT, 2);
          var r = new c.e.na(7 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD3", c.e.d.FLOAT, 2);
          var u = new c.e.na(9 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD4", c.e.d.FLOAT, 2);
          this.te.attrs = [y, w, t, q, r, u]
        }
        this.te.totalSize = this.S * Float32Array.BYTES_PER_ELEMENT;
        if (!p.parseShapes() || !p.parseTimelines()) {
          return n;
        }
        this.ac = p.ac;
        return n;
      };
      b.prototype.parseTextureAtlas = function (textureJSON, imageURL, i) {
        if (textureJSON === void 0) {
          return false;
        }
        var frames = textureJSON[b.kFrames];
        if (frames === void 0) {
          return false;
        }
        var textureAtlas = new c.e.Zh(i, imageURL, textureJSON[b.kMeta][b.kSize][b.kW], textureJSON[b.kMeta][b.kSize][b.kH]);
        for (var id in frames) {
          var frame = frames[id][b.kFrame];
          var rect = new c.c.M(frame[b.kX] + 1, frame[b.kY] + 1, frame[b.kW] - 2, frame[b.kH] - 2);
          textureAtlas.setFrame(id, rect);
        }
        this.assetPool.setTextureAtlas(textureAtlas);
        return true;
      };
      b.prototype.af = function (vertices, indices, start, end, texCoords, isConvexMultiplier, d) {
        if (typeof d === "undefined") { d = void 0; }
        d = (d === void 0) ? new p : d;
        var A = d.Ma;
        var f = A.length;
        var u = d.ba;
        var r = u.length;
        var C = 0;
        while (start < end) {
          for (var v = 0; v < 3; v++) {
            var x = indices[start + v];
            A[f + C] = C;
            var B = 0;
            u[r + B++] = vertices[2 * x];
            u[r + B++] = vertices[2 * x + 1];
            u[r + B++] = texCoords[v].x;
            u[r + B++] = texCoords[v].y;
            u[r + B++] = isConvexMultiplier;
            while (B < this.S) {
              u[r + B++] = void 0;
            }
            r += this.S;
            C++;
          }
          start += 3;
        }
        return d;
      };
      b.prototype.xl = function (vertices, indices) {
        var h = [];
        var k = 0;
        var e = 0;
        var texCoords = [ new c.c.k(0, 1), new c.c.k(0, 1), new c.c.k(0, 1) ];
        while (e < indices.length) {
          k = e;
          e = (indices.length - e > c.e.d.MAX_VERTICES) ? e + c.e.d.MAX_VERTICES : indices.length;
          k = this.af(vertices, indices, k, e, texCoords, 100000);
          h.push(k);
        }
        return h;
      };
      b.prototype.wl = function (vertices, concaveCurveIndices, convexCurveIndices, edgeIndices) {
        var f = [];
        var w = 0;
        var t = 0;
        var start = 0;
        var endConcave = 0;
        var endConvex = 0;
        var endEdge = 0;
        var curveTexCoords = [ b.Me[0], b.Me[1], b.Me[2] ];
        var edgeTexCoords = [ new c.c.k(0, 0), new c.c.k(0, 1), new c.c.k(0, 0) ];
        var totalIndices = concaveCurveIndices.length + convexCurveIndices.length + edgeIndices.length;
        while (t < totalIndices) {
          var B = new p;
          w = t;
          t = (totalIndices - t > c.e.d.MAX_VERTICES) ? t + c.e.d.MAX_VERTICES : totalIndices;
          w = t - w;
          start = endConcave;
          endConcave = (endConcave < concaveCurveIndices.length)
                        ? ((w > concaveCurveIndices.length - endConcave)
                            ? concaveCurveIndices.length
                            : endConcave + w)
                        : endConcave;
          w -= (endConcave - start);
          if (start != endConcave) {
            B = this.af(vertices, concaveCurveIndices, start, endConcave, curveTexCoords, -1);
          }
          if (w > 0) {
            start = endConvex;
            endConvex = (endConvex < convexCurveIndices.length)
                          ? ((w > convexCurveIndices.length - endConvex)
                              ? convexCurveIndices.length
                              : endConvex + w)
                          : endConvex;
            w -= endConvex - start;
            B = this.af(vertices, convexCurveIndices, start, endConvex, curveTexCoords, 1, B);
          }
          if (w > 0) {
            start = endEdge;
            endEdge = (endEdge < edgeIndices.length)
                        ? ((w > edgeIndices.length - endEdge)
                            ? edgeIndices.length
                            : endEdge + w)
                        : endEdge;
            B = this.af(vertices, edgeIndices, start, endEdge, edgeTexCoords, 1, B);
          }
          f.push(B);
        }
        return f;
      };
      b.prototype.injectTexCoords = function (b, fillName, fillStyle, fillMatrix) {
        var d = {};
        var p = this.assetPool.getTextureAtlases();
        var offset = this.emulateStandardDerivatives ? this.S - 6 : this.S - 2;
        for (var i = 0; i < p.length; i++) {
          var atlas = p[i];
          var frame = atlas.getFrame(fillName);
          if (frame !== void 0) {
            var textureWidth = atlas.textureWidth;
            var textureHeight = atlas.textureHeight;
            switch (fillStyle) {
              case a.kSolid:
              case e.kSolid:
                this.injectTexCoords_SolidFill(b.ba, this.S, offset, textureWidth, textureHeight, frame, b.Ma.length);
                break;
              case a.kLinearGradient:
              case e.kLinearGradient:
                this.injectTexCoords_LinearGradientFill(b.ba, this.S, offset, b.Ma.length, fillMatrix);
                break;
              case a.kBitmap:
              case e.kBitmap:
                this.injectTexCoords_BitmapFill(b.ba, this.S, offset, b.Ma.length, fillMatrix, frame.width, frame.height);
                break;
            }
            if (b.ba !== void 0 && b.ba.length > 0) {
              d[atlas.getID()] = b.ba;
            }
          }
        }
        return d;
      };
      b.prototype.getFillMode = function (fillStyle, fillOverflow, fillIsBitmapClipped) {
        var d = 0;
        switch (fillStyle) {
          case a.kLinearGradient:
          case e.kLinearGradient:
            d = c.e.ca.fillModeMap[fillOverflow];
            break;
          case a.kBitmap:
          case e.kBitmap:
            d = c.e.ca.fillModeMap[fillIsBitmapClipped ? c.e.ca.kFill_Repeat : c.e.ca.kFill_Extend];
            break;
        }
        // 0: n/a
        // 1: extend
        // 2: repeat
        // 3: reflect
        return d;
      };
      b.prototype.injectTexCoords_SolidFill = function (vertexArray, stride, offset, textureWidth, textureHeight, frame, count) {
        if (count > 0) {
          var texCoord = new c.c.k(frame.left + frame.width / 2, frame.top + frame.height / 2);
          texCoord.x /= textureWidth;
          texCoord.y /= textureHeight;
          for (var i = 0; i < count; i++) {
            vertexArray[offset] = texCoord.x;
            vertexArray[offset + 1] = texCoord.y;
            offset += stride;
          }
        }
      };
      b.prototype.injectTexCoords_LinearGradientFill = function (vertexArray, stride, offset, count, matrixValues) {
        if (count > 0 && matrixValues.length == 6) {
          var matrix = new c.c.u(matrixValues);
          matrix.multiply(b.Km);
          var f = matrix.Jm();
          if (!f) {
            matrix.invert();
          }
          var iVert = 0;
          var iTex = offset;
          for (var i = 0; i < count; i++) {
            if (f) {
              vertexArray[iTex] = 0.5;
            } else {
              var e = matrix.transformPoint(new c.c.k(vertexArray[iVert], vertexArray[iVert + 1]));
              vertexArray[iTex] = e.x;
            }
            vertexArray[iTex + 1] = 0.5;
            iVert += stride;
            iTex += stride;
          }
        }
      };
      b.prototype.injectTexCoords_BitmapFill = function (vertexArray, stride, offset, count, matrixValues, bitmapWidth, bitmapHeight) {
        if (count > 0 && matrixValues.length == 6) {
          var matrix = new c.c.u(matrixValues);
          matrix.invert();
          bitmapWidth /= 20;
          bitmapHeight /= 20;
          matrix.set(0, 0, matrix.get(0, 0) / bitmapWidth);
          matrix.set(1, 0, matrix.get(1, 0) / bitmapHeight);
          matrix.set(0, 1, matrix.get(0, 1) / bitmapWidth);
          matrix.set(1, 1, matrix.get(1, 1) / bitmapHeight);
          matrix.set(0, 3, matrix.get(0, 3) / bitmapWidth);
          matrix.set(1, 3, matrix.get(1, 3) / bitmapHeight);
          var iVert = 0;
          var iTex = offset;
          for (var i = 0; i < count; i++) {
            var h = matrix.transformPoint(new c.c.k(vertexArray[iVert], vertexArray[iVert + 1]));
            vertexArray[iTex] = h.x;
            vertexArray[iTex + 1] = h.y;
            iVert += stride;
            iTex += stride;
          }
        }
      };
      b.prototype.wi = function (a, b, h) {
        var k = [];
        var e = a[1].sub(a[0]);
        var d = a[2].sub(a[0]);
        var p = b[1].sub(b[0]);
        var f = b[2].sub(b[0]);
        var r = p.x
        var u = f.x;
        var p = p.y;
        var A = f.y;
        var C = 1 / (r * A - u * p);
        var f = (A * e.x - p * d.x) * C;
        var A = (A * e.y - p * d.y) * C;
        var p = (-u * e.x + r * d.x) * C;
        var e = (-u * e.y + r * d.y) * C;
        var u = 1 / (f * e - A * p);
        var e = e * u;
        var d = -A * u;
        var r = -p * u;
        var f = f * u;
        for (u = 0; u < h.length; u++) {
          p = h[u].sub(a[0]);
          A = new c.c.k(0, 0);
          A.x = p.x * e + p.y * r;
          A.y = p.x * d + p.y * f;
          k.push(A.add(b[0]));
        }
        return k;
      };
      b.prototype.ti = function (type, b, count) {
        var offset = this.S - 4;
        var stride = this.S;
        var len = count * stride;
        var i = 0;
        switch (type) {
          case c.e.t.Z:
            while (i < len) {
              b[offset] = 0;
              b[offset + 1] = 1;
              b[offset + 2] = 0;
              b[offset + 3] = 1;
              offset += stride;
              i += stride;
            }
            break;
          case c.e.t.P:
          case c.e.t.bb:
            while (i < len) {
              var d = [];
              d.push(new c.c.k(b[i],              b[i + 1]));
              d.push(new c.c.k(b[i + stride],     b[i + 1 + stride]));
              d.push(new c.c.k(b[i + stride * 2], b[i + 1 + stride * 2]));
              d = this.bl([
                  b[i + 2],
                  b[i + 3],
                  1,
                  b[i + stride + 2],
                  b[i + stride + 3],
                  1,
                  b[i + 2 * stride + 2],
                  b[i + 2 * stride + 3],
                  1
                ], d
              );
              b[offset    ] = d[0].x;
              b[offset + 1] = d[0].y;
              b[offset + 2] = d[1].x;
              b[offset + 3] = d[1].y;
              b[offset +     stride] = d[0].x;
              b[offset + 1 + stride] = d[0].y;
              b[offset + 2 + stride] = d[1].x;
              b[offset + 3 + stride] = d[1].y;
              b[offset +     stride * 2] = d[0].x;
              b[offset + 1 + stride * 2] = d[0].y;
              b[offset + 2 + stride * 2] = d[1].x;
              b[offset + 3 + stride * 2] = d[1].y;
              offset += stride * 3;
              i += stride * 3;
            }
            break;
        }
      };
      b.prototype.bl = function (a, b) {
        //var h = b[0].sub(b[0]);
        var e = b[1].sub(b[0]);
        var k = b[2].sub(b[0]);
        var h = new c.c.Vf([ 0, 0, 1, e.x, e.y, 1, k.x, k.y, 1 ]);
        h.invert();
        e = a[0];
        k = a[1];
        a[0] = 0;
        a[1] = 0;
        a[3] -= e;
        a[6] -= e;
        a[4] -= k;
        a[7] -= k;
        e = new c.c.Vf(a);
        e.concat(h);
        h = e.transformPoint(new c.c.k(1, 0));
        e = e.transformPoint(new c.c.k(0, 1));
        k = [];
        k.push(h);
        k.push(e);
        return k;
      };
      b.Me = [new c.c.k(0, 0), new c.c.k(0.5, 0), new c.c.k(1, 1), new c.c.k(0, 1), new c.c.k(0.25, -0.25), new c.c.k(1, 0.75)];
      b.Km = new c.c.u([1638.4, 0, 0, 1638.4, -819.2, -819.2]);
      b.kHeader = "header";
      b.kStageSize = "stageSize";
      b.kWidth = "width";
      b.kHeight = "height";
      b.kStageColor = "stageColor";
      b.kFrameRate = "frameRate";
      b.kReadable = "readable";
      b.kLoop = "loop";
      b.kSceneTimelines = "sceneTimelines";
      b.kFrames = "frames";
      b.kFrame = "frame";
      b.kMeta = "meta";
      b.kSize = "size";
      b.kX = "x";
      b.kY = "y";
      b.kW = "w";
      b.kH = "h";
      return b;
    }();
    d.sk = b;

    // ParserReadable
    var a = function () {
      function a(content, parser, assetPool) {
        this.content = content;
        this.parser = parser;
        this.assetPool = assetPool;
        this.ac = -1;
      }
      a.prototype.parseFills = function () {
        var b = this.content[a.kFills];
        if (b.length === 0) {
          return true;
        }
        this.Xd = {};
        this.Yd = {};
        this.Zd = {};
        for (var i = 0; i < b.length; i++) {
          this.Xd[b[i][a.kId]] = b[i][a.kName];
          this.Yd[b[i][a.kName]] = (b[i][a.kIsOpaque] == "assetPool") ? true : false;
          this.Zd[b[i][a.kName]] = b[i][a.kStyle];
        }
        return true;
      };
      a.prototype.parseShapes = function () {
        var shapes = this.content[a.kShapes];
        if (shapes.length === 0) {
          return true;
        }
        for (var i = 0; i < shapes.length; i++) {
          var shape = shapes[i];
          var meshAsset = new c.e.t(shape[a.kId]);
          var meshes = shape[a.kMeshes];
          for (var j = 0; j < meshes.length; j++) {
            var mesh = meshes[j];
            var id = mesh[a.kFillId];
            var vertices = mesh[a.kVertices];
            var internalIndices = mesh[a.kInternalIndices];
            var edgeIndices = mesh[a.kEdgeIndices];
            var concaveCurveIndices = mesh[a.kConcaveCurveIndices];
            var convexCurveIndices = mesh[a.kConvexCurveIndices];
            var fillMatrix = mesh[a.kFillMatrix];
            var fillOverflow = mesh[a.kOverflow];
            var fillIsBitmapClipped = mesh[a.kIsBitmapClipped];
            var fillName = this.Xd[id];
            var fillStyle = this.Zd[fillName];
            var fillIsOpaque = this.Yd[fillName];
            var u = this.parser.If(vertices, fillName, fillStyle, fillMatrix, fillOverflow, fillIsBitmapClipped, fillIsOpaque, internalIndices);
            var A = this.parser.If(vertices, fillName, fillStyle, fillMatrix, fillOverflow, fillIsBitmapClipped, fillIsOpaque, [], concaveCurveIndices, convexCurveIndices, edgeIndices);
            var f = this.parser.dj(vertices, concaveCurveIndices, convexCurveIndices, edgeIndices, fillName, fillStyle, fillIsOpaque, fillMatrix, fillOverflow, fillIsBitmapClipped);
            var k;
            if (u.length) {
              for (k = 0; k < u.length; k++) {
                meshAsset.Nb(c.e.t.Z, u[k]);
              }
            }
            if (A.length) {
              for (k = 0; k < A.length; k++) {
                meshAsset.Nb(c.e.t.P, A[k]);
              }
            }
            if (f && f.length) {
              for (k = 0; k < u.length; k++) {
                meshAsset.Nb(c.e.t.bb, f[k]);
              }
            }
          }
          meshAsset.calculateBounds();
          this.assetPool.setMesh(meshAsset);
        }
        return true;
      };
      a.prototype.parseTimelines = function () {
        var timelines = this.content[a.kTimelines];
        if (timelines.length === 0) {
          return true;
        }
        for (var i = 0; i < timelines.length; i++) {
          var timeline = timelines[i];
          var name = timeline[a.kName];
          var linkageName = timeline[a.kLinkageName];
          var isScene = timeline[a.kIsScene];
          var labels = [];
          var j;
          for (j = 0; j < timeline[a.kLabels].length; j++) {
            labels.push({
              frameNum: timeline[a.kLabels][j][a.kFrameNum],
              name: timeline[a.kLabels][j][a.kName]
            });
          }
          var scripts = [];
          for (j = 0; j < timeline[a.kScripts].length; j++) {
            var frameNum = timeline[a.kScripts][j][a.kFrameNum];
            scripts.push({
              frameNum: frameNum,
              functionName: timeline[a.kScripts][j][a.kScript]
            });
          }
          var timelineAsset = new c.B.$h(timeline[a.kId], name, linkageName, isScene, labels, scripts);
          for (j = 0; j < timeline[a.kFrames].length; j++) {
            var frame = timeline[a.kFrames][j];
            var cmds = [];
            var cmd = null;
            for (var k = 0; k < frame[a.kFramesCmds].length; k++) {
              switch (frame[a.kFramesCmds][k][0]) {
                case 1:
                  // PlaceObject
                  cmd = new c.B.Wf(frame[a.kFramesCmds][k].slice(1));
                  this.ac = Math.max(this.ac, cmd.X);
                  break;
                case 2:
                  // SetTransform
                  cmd = new c.B.bi(frame[a.kFramesCmds][k].slice(1));
                  break;
                case 3:
                  // SetColorTransform
                  cmd = new c.B.ai(frame[a.kFramesCmds][k].slice(1));
                  break;
                case 4:
                  // RemoveObject
                  cmd = new c.B.Ph(frame[a.kFramesCmds][k].slice(1));
                  break;
                case 5:
                  // SetVisibility
                  cmd = new c.B.Vh(frame[a.kFramesCmds][k].slice(1));
                  break;
                case 6:
                  if (this.parser.enableCacheAsBitmap) {
                    cmd = new c.B.Wh(frame[a.kFramesCmds][k].slice(1));
                  }
                  break;
                case 7:
                  cmd = new c.media.Mh(frame[a.kFramesCmds][k].slice(1));
                  break;
              }
              cmds.push(cmd);
            }
            timelineAsset.addFrameCmds(cmds);
          }
          this.assetPool.setTimeline(timelineAsset);
        }
        return true;
      };
      a.prototype.parseSounds = function () {
        var sounds = this.content[a.kSounds];
        for (var h = 0; h < sounds.length; ++h) {
          var sound = sounds[h];
          var soundAsset = new c.media.Xh(sound[a.kId], sound[a.kName], sound[a.kSrc]);
          this.assetPool.setSound(soundAsset);
        }
        return true;
      };
      a.kSolid = "solid";
      a.kLinearGradient = "linearGradient";
      a.kBitmap = "bitmap";
      a.kId = "id";
      a.kName = "name";
      a.kLinkageName = "linkageName";
      a.kIsScene = "isScene";
      a.kLabels = "labels";
      a.kFrameNum = "frameNum";
      a.kFills = "fills";
      a.kStyle = "style";
      a.kIsOpaque = "isOpaque";
      a.kShapes = "shapes";
      a.kMeshes = "meshes";
      a.kInternalIndices = "internalIndices";
      a.kConcaveCurveIndices = "concaveCurveIndices";
      a.kConvexCurveIndices = "convexCurveIndices";
      a.kEdgeIndices = "edgeIndices";
      a.kVertices = "vertices";
      a.kFillId = "fillId";
      a.kFillMatrix = "fillMatrix";
      a.kOverflow = "overflow";
      a.kIsBitmapClipped = "isBitmapClipped";
      a.kTimelines = "timelines";
      a.kScripts = "scripts";
      a.kScript = "script";
      a.kFrames = "frames";
      a.kSounds = "sounds";
      a.kSrc = "src";
      a.kFramesCmds = "frameCmds";
      return a
    }();

    var h;
    (function (a) {
      a[a.kFC_PlaceObject = 1] = "kFC_PlaceObject";
      a[a.kFC_SetTransform = 2] = "kFC_SetTransform";
      a[a.kFC_SetColorTransform = 3] = "kFC_SetColorTransform";
      a[a.kFC_RemoveObject = 4] = "kFC_RemoveObject";
      a[a.kFC_SetVisibility = 5] = "kFC_SetVisibility"
    })(h || (h = {}));

    var p = function () {
      return function () {
        this.ba = [];
        this.Ma = [];
      }
    }();

    // ParserRelease (?)
    var e = function () {
      function a(content, parser, assetPool) {
        this.content = content;
        this.parser = parser;
        this.assetPool = assetPool;
        this.ac = -1;
      }
      a.prototype.parseFills = function () {
        var fills = this.content[a.kFills];
        if (fills.length === 0) {
          return true;
        }
        this.Xd = {};
        this.Yd = {};
        this.Zd = {};
        for (var i = 0; i < fills.length; i++) {
          var fill = fills[i];
          var id = fill[0];
          var style = fill[1];
          var name = fill[2];
          var isOpaque = (fill[3] == "T");
          this.Xd[id] = name;
          this.Yd[name] = isOpaque;
          this.Zd[name] = style;
        }
        return true;
      };
      a.prototype.parseShapes = function () {
        var shapes = this.content[a.kShapes];
        if (shapes.length === 0) {
          return true;
        }
        for (var i = 0; i < shapes.length; i++) {
          var shape = shapes[i];
          var meshAsset = new c.e.t(shape[0]);
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
            var fillName = this.Xd[id];
            var fillIsOpaque = this.Yd[fillName];
            var fillStyle = this.Zd[fillName];
            switch (fillStyle) {
              case a.kLinearGradient:
                fillMatrix = mesh[6];
                fillOverflow = mesh[7];
                break;
              case a.kBitmap:
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
                meshAsset.Nb(c.e.t.Z, f[k]);
              }
            }
            if (q.length) {
              for (k = 0; k < q.length; k++) {
                meshAsset.Nb(c.e.t.P, q[k]);
              }
            }
            if (t && t.length) {
              for (k = 0; k < t.length; k++) {
                meshAsset.Nb(c.e.t.bb, t[k]);
              }
            }
          }
          meshAsset.calculateBounds();
          this.assetPool.setMesh(meshAsset);
        }
        return true;
      };
      a.prototype.parseTimelines = function () {
        var timelines = this.content[a.kTimelines];
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
          var j;
          for (j = 0; j < timeline[4].length; j += 2) {
            labels.push({
              frameNum: timeline[4][j],
              name: timeline[4][j + 1]
            });
          }
          var scripts = [];
          for (j = 0; j < timeline[5].length; j += 2) {
            scripts.push({
              frameNum: timeline[5][j],
              functionName: timeline[5][j + 1]
            })
          }
          var timelineAsset = new c.B.$h(id, name, linkageName, isScene, labels, scripts);
          for (j = 6; j < timeline.length; j++) {
            var frame = timeline[j];
            var cmds = [];
            var cmd = null;
            for (var k = 0; k < frame.length; k++) {
              switch (frame[k][0]) {
                case 1:
                  // PlaceObject
                  cmd = new c.B.Wf(frame[k].slice(1));
                  this.ac = Math.max(this.ac, f.X);
                  break;
                case 2:
                  // SetTransform
                  cmd = new c.B.bi(frame[k].slice(1));
                  break;
                case 3:
                  // SetColorTransform
                  cmd = new c.B.ai(frame[k].slice(1));
                  break;
                case 4:
                  // RemoveObject
                  cmd = new c.B.Ph(frame[k].slice(1));
                  break;
                case 5:
                  // SetVisibility
                  cmd = new c.B.Vh(frame[k].slice(1));
                  break;
                case 6:
                  if (this.parser.enableCacheAsBitmap) {
                    cmd = new c.B.Wh(frame[k].slice(1));
                  }
                  break;
                case 7:
                  cmd = new c.media.Mh(frame[k].slice(1));
                  break;
              }
              cmds.push(cmd);
            }
            timelineAsset.addFrameCmds(cmds);
          }
          this.assetPool.setTimeline(timelineAsset);
        }
        return true
      };
      a.prototype.parseSounds = function () {
        var sounds = this.content[a.kSounds];
        for (var i = 0; i < sounds.length; i++) {
          var sound = sounds[i];
          var id = sound[0];
          var name = sound[1];
          var src = sound[2];
          var soundAsset = new c.media.Xh(id, name, src);
          this.assetPool.setSound(soundAsset);
        }
        return true;
      };
      a.kSolid = "s";
      a.kLinearGradient = "lG";
      a.kBitmap = "b";
      a.kFills = "fills";
      a.kShapes = "shapes";
      a.kTimelines = "timelines";
      a.kSounds = "sounds";
      a.kSrc = "src";
      return a;
    }();
  })(c.xj || (c.xj = {}))
})(N || (N = {}));

(function (c) {
  (function (c) {

    // flwebgl.e.Se
    var f = function () {
      function a(options) {
        this.Rl = 0;
        this.Xc = {};
        this.ic = {};
        this.Qd = {};
        this.Sd = {};
        this.Wc = {};
        this.Vc = {};
        this.Ng = 0;
        this.uf = void 0;
        this.Kf = void 0;
        this.pd = void 0;
        this.ed = 12;
        this.Cc = 0.95;
        this.qf = true;
        this.$b = c.d.MAX_VERTICES;
        if (options !== void 0) {
          if (options[a.Df] !== void 0) {
            this.ed = options[a.Df];
          }
          if (options[a.Cf] !== void 0) {
            this.Cc = 1 - options[a.Cf];
          }
          if (options[a.Ef] !== void 0) {
            this.qf = options[a.Ef];
          }
          if (options[a.zj] !== void 0) {
            this.$b = options[a.zj];
          }
        }
        if (this.ed < 1) {
          this.ed = 1;
        }
        if (this.Cc < 0.5) {
          this.Cc = 0.5;
        } else if (this.Cc > 1) {
          this.Cc = 1;
        }
        if (this.$b < 0 || this.$b < c.d.MAX_VERTICES) {
          this.$b = c.d.MAX_VERTICES;
        }
        this.ji = {};
        this.ji[a.Aj] = this.ed;
        this.ji[a.Aj] = 1 - this.Cc;
      }
      a.prototype.setGL = g("gl");
      a.prototype.Vg = function (a, b) {
        this.Oa = a;
        this.Uc = b;
        this.gc = 0;
        this.ki = a.ta[0].totalSize;
        this.wa = this.al(this.ki);
        if (this.wa === void 0) {
          if (this.Ng < this.ed) {
            this.wa = [];
            this.Xc[this.ki] = [];
            for (var e = 0; e < 1; e++) {
              var c = this.Ci(this.Oa);
              this.wa.push(c);
            }
          } else {
            return;
          }
        }
        this.kb = [];
        this.Zn = {};
        this.Vc = {};
        this.Wc = {};
        for (e = 0; e < this.wa.length; e++) {
          this.Wc[this.wa[e].getID()] = 0;
          this.Vc[this.wa[e].getID()] = 0;
        }
      };
      a.prototype.Zg = function () {
        var a = this.Dl();
        a.Zl();
        var b = this.Ai(this.kb, a);
        if (b === void 0) {
          a.Hm();
          b = this.Ai(this.kb, a);
        }
        this.Si(a.getID(), this.kb, b);
        a.end();
        return b.wh;
      };
      a.prototype.upload = function (a) {
        if (this.gc + a.sa() > this.$b) {
          return false;
        }
        var b = a.getID();
        var e = a.sa();
        for (var c = 0; c < this.wa.length; c++) {
          var d = this.wa[c].getID();
          if (this.wa[c].ln(b)) {
            this.Vc[d] += e;
          } else {
            this.Wc[d] += e;
          }
        }
        this.kb.push(a);
        this.gc += a.sa();
        return true;
      };
      a.prototype.destroy = function () {
        for (var a in this.Xc) {
          var b = this.Xc[a];
          for (var e = 0; e < b.length; e++) {
            var c = b[e];
            c.destroy();
            this.gl.deleteBuffer(this.Qd[c.getID()]);
            c = this.Sd[c.getID()];
            for (var d = 0; d < c.length; ++d) {
              this.gl.deleteBuffer(c[d]);
            }
          }
        }
        if (this.qf) {
          for (a in this.ic) {
            this.gl.deleteVertexArrayOES(this.ic[a]);
          }
          delete this.ic;
        }
        delete this.Xc;
        this.Qd = this.Wc = this.Vc = void 0
      };
      a.prototype.setEventListener = function (type, fn) {
        switch (type) {
          case a.ci:
            this.pd = fn;
            break;
          case a.Oh:
            this.Kf = fn;
            break;
          case a.Bh:
            this.uf = fn;
            break;
          case a.Ah:
            this.ag = fn;
            break;
        }
      };
      a.prototype.removeEventListener = function (type) {
        switch (type) {
          case a.ci:
            this.pd = void 0;
            break;
          case a.Oh:
            this.Kf = void 0;
            break;
          case a.Bh:
            this.uf = void 0;
            break;
          case a.Ah:
            this.ag = void 0;
            break;
        }
      };
      a.prototype.Dl = function () {
        for (var a = 0, b = void 0, b = [0], e = 0; e < this.wa.length; e++) {
          var c = this.wa[e],
            d = c.getID(),
            f = this.Vc[d],
            d = this.Wc[d],
            c = c.Bc * this.Cc - d,
            c = 0 > c ? -c : 0,
            f = f - (d + 2 * c);
          if (0 === a || f >= a) f === a ? b.push(e) : (a = f, delete b, b = [e])
        }
        e = b[0];
        if (1 < b.length)
          for (c = f = 0; c < b.length; c++) d = this.wa[b[c]].Ii, f < d && (f = d, e = c);
        b = this.wa[e];
        this.Ng < this.ed && 0 - (this.gc + 0) > a && (b = this.Ci(this.Oa));
        return b
      };
      a.prototype.Ai = function (a, b) {
        for (var e = [], c = [], d = 0; d < a.length; d++) {
          var f = a[d],
            m = b.get(f.getID()),
            n = false;
          if (void 0 === m) {
            m = b.add(a[d].getID(), f.sa());
            if (void 0 === m) return;
            n = true
          }
          e.push({
            Ld: m,
            fh: -1
          });
          c.push(n)
        }
        return {
          wh: e,
          ck: c
        }
      };
      a.prototype.Si = function (a, b, e) {
        "undefined" === typeof b && (b = []);
        "undefined" === typeof e && (e = void 0);
        var k = this.Qd[a];
        var l = this.Sd[a];
        var f = false;
        var m = this.gl.getBoundBuffer(c.d.ARRAY_BUFFER);
        0 === b.length && (f = true);
        m !== k && (this.gl.bindBuffer(c.d.ARRAY_BUFFER, k), void 0 !== this.ag && this.ag(a));
        for (var k = this.Oa.ta, n = 0; n < b.length; n++)
          if (e.ck[n]) {
            var y = b[n].nc()[0].ba;
            var w = e.wh[n].Ld;
            this.gl.bufferSubData(c.d.ARRAY_BUFFER, w * this.Oa.ta[0].totalSize, y);
            void 0 !== this.pd && this.pd(y.length * Float32Array.BYTES_PER_ELEMENT)
          }
        m = void 0;
        if (void 0 === this.ic[a]) {
          y = k[0];
          n = y.attrs;
          y = y.totalSize;
          this.qf && (this.ic[a] = this.gl.createVertexArrayOES(), this.gl.bindVertexArrayOES(this.ic[a]));
          for (w = 0; w < n.length; ++w) {
            var t = this.Uc.getAttribs(n[w].pc);
            f && this.gl.kc(t.location);
            this.gl.vertexAttribPointer(t.location, t.size, t.type, t.Hf, y, n[w].byteOffset)
          }
          this.qf && this.gl.bindVertexArrayOES(null)
        } else m = this.ic[a], this.gl.bindVertexArrayOES(m);
        for (var q = 1; q < k.length; ++q) {
          this.gl.bindBuffer(c.d.ARRAY_BUFFER, l[q - 1]);
          for (n = 0; n < b.length; n++) e.ck[n] && (y = b[n].nc()[q].ba, w = e.wh[n].Ld, this.gl.bufferSubData(c.d.ARRAY_BUFFER, w * this.Oa.ta[q].totalSize, y), void 0 !== this.pd && this.pd(y.length * Float32Array.BYTES_PER_ELEMENT));
          y = k[q];
          n = y.attrs;
          y = y.totalSize;
          if (void 0 === m) {
            m = this.ic[a];
            void 0 !== m && this.gl.bindVertexArrayOES(m);
            for (w = 0; w < n.length; ++w) t = this.Uc.getAttribs(n[w].pc), f && this.gl.kc(t.location), this.gl.vertexAttribPointer(t.location, t.size, t.type, t.Hf, y, n[w].byteOffset);
            void 0 !== m && this.gl.bindVertexArrayOES(null)
          }
        }
      };
      a.prototype.al = function (a) {
        return this.Xc[a]
      };
      a.prototype.dl = function () {
        return this.Rl++
      };
      a.prototype.Ci = function (a) {
        var p = a.ta[0],
          e = p.totalSize,
          p = this.$b * p.totalSize,
          k = new b(this.dl(), this.$b, this);
        this.Ng++;
        this.Xc[e].push(k);
        this.Qd[k.getID()] = this.gl.createBuffer();
        this.gl.bindBuffer(c.d.ARRAY_BUFFER, this.Qd[k.getID()]);
        this.gl.bufferData(c.d.ARRAY_BUFFER, p, c.d.DYNAMIC_DRAW);
        void 0 === this.Sd[k.getID()] && (this.Sd[k.getID()] = []);
        for (e = 1; e < a.ta.length; ++e) {
          var p = a.ta[e],
            p = this.$b * p.totalSize,
            l = this.gl.createBuffer();
          this.Sd[k.getID()].push(l);
          this.gl.bindBuffer(c.d.ARRAY_BUFFER, l);
          this.gl.bufferData(c.d.ARRAY_BUFFER, p, c.d.DYNAMIC_DRAW)
        }
        this.gl.bindBuffer(c.d.ARRAY_BUFFER, null);
        this.Si(k.getID());
        return k
      };
      a.Aj = "maxbuffers";
      a.fo = "fragfactor";
      a.Df = 100;
      a.Cf = 101;
      a.Ef = 102;
      a.zj = 103;
      a.ci = 0;
      a.Oh = 1;
      a.Bh = 2;
      a.Ah = 3;
      return a
    }();
    c.Se = f;

    var b = function () {
      function a(a, b, e) {
        this.id = a;
        this.Ib = {};
        this.Hb = {};
        this.K = [{
          $: b,
          startOffset: 0
        }];
        this.bc = {};
        this.Bc = this.Mg = b;
        this.Ii = 0;
        this.fb = e
      }
      a.prototype.getID = z("id");
      a.prototype.Zl = function () {
        this.gf = {};
        this.Ii = (new Date).getTime()
      };
      a.prototype.add = function (b, c) {
        if (this.Bc >= c) {
          var e = this.Dk(c);
          if (void 0 !== e) return this.Ib[b] = e, this.Hb[b] = c, this.Bc -= c, this.gf[b] = true, this.pf(b), e
        } else {
          var d = this.$k(c);
          if (void 0 !== d) {
            var l = this.Ib[d],
              f = this.Hb[d];
            this.Ib[d] = void 0;
            this.Hb[d] = void 0;
            this.pf(d);
            this.gf[b] = true;
            this.Ib[b] = l;
            this.Hb[b] = f;
            this.pf(b);
            f - c > a.Lm && (this.Fk({
              $: f - c,
              startOffset: l + c
            }), this.Bc += f - c, this.Hb[b] = c);
            return e
          }
        }
      };
      a.prototype.ln = function (a) {
        return void 0 === this.Ib[a] ? false : true
      };
      a.prototype.get = function (a) {
        var b = this.Ib[a];
        void 0 !== b && (this.gf[a] = true, this.pf(a));
        return b
      };
      a.prototype.end = aa();
      a.prototype.Hm = function () {
        this.Ib = {};
        this.Hb = {};
        this.Bc = this.Mg;
        this.K = [{
          $: this.Mg,
          startOffset: 0
        }];
        this.bc = {};
        void 0 !== this.fb.uf && this.fb.uf(this.v)
      };
      a.prototype.destroy = function () {
        delete this.K;
        delete this.Ib;
        delete this.Hb;
        delete this.bc
      };
      a.prototype.Dk = function (a) {
        for (var b = -1, e = 0; e < this.K.length; e++)
          if (a <= this.K[e].$) {
            b = e;
            break
          }
        if (-1 !== b) {
          var c = this.K[b],
            d = this.K[b].startOffset;
          this.K.splice(b, 1);
          if (0 < c.$ - a) {
            c.$ -= a;
            c.startOffset += a;
            for (e = b; e < this.K.length && !(c.$ < this.K[e].$); e++);
            this.K.splice(e, 0, c)
          }
          return d
        }
      };
      a.prototype.Fk = function (a) {
        for (var b = 0; b < this.K.length; b++) this.K[b].startOffset + this.K[b].$ === a.startOffset ? (a.startOffset = this.K[b].startOffset, a.$ += this.K[b].$, this.K.splice(b, 1)) : a.startOffset + a.$ === this.K[b].startOffset && (a.$ += this.K[b].$,
          this.K.splice(b, 1));
        for (b = 0; b < this.K.length && !(a.$ < this.K[b].$); b++);
        this.K.splice(b, 0, a)
      };
      a.prototype.pf = function (a) {
        if (void 0 !== this.Ib[a] && void 0 !== this.Hb[a]) {
          var b = this.bc[a];
          void 0 === b && (b = 0);
          this.bc[a] = b + 1
        } else this.bc[a] = void 0
      };
      a.prototype.$k = function (b) {
        var c = void 0,
          e = void 0,
          d = void 0,
          l = [],
          f;
        for (f in this.bc) void 0 !== this.bc[f] && l.push({
          meshId: f,
          hitCount: this.bc[f]
        });
        l.sort(function (a, b) {
          return a.Fm - b.Fm
        });
        for (f = 0; f < l.length; f++) {
          var m = l[f].Rj;
          if (void 0 === this.gf[m] && (m = this.Hb[m], b <= m))
            if (m /=
              b, m < a.Qm) {
              c = f;
              break
            } else if (void 0 === d || d > m) d = m, e = f
        }
        void 0 !== this.fb.Kf && this.fb.Kf();
        if (void 0 === c && void 0 !== e) return l[e].Rj;
        if (void 0 !== c) return l[c].Rj
      };
      a.Qm = 3;
      a.Lm = 30;
      return a
    }();

  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.Ck
(function (c) {
  (function (d) {
    var f = function () {
      function b() {
        this.rd = {}
      }
      b.prototype.setGL = g("gl");
      b.prototype.Vg = function (a, b) {
        this.Oa = a;
        this.Uc = b;
        this.gc = 0;
        var c = a.ta[0].totalSize;
        if (this.rd[c] === void 0) {
          var size = d.d.MAX_VERTICES * this.Oa.ta[0].totalSize * Float32Array.BYTES_PER_ELEMENT;
          var buffer = this.gl.createBuffer();
          this.gl.bindBuffer(d.d.ARRAY_BUFFER, buffer);
          this.gl.bufferData(d.d.ARRAY_BUFFER, size, d.d.DYNAMIC_DRAW);
          this.oe();
          this.rd[c] = buffer;
        }
        this.Cg = this.rd[c];
        this.kb = [];
      };
      b.prototype.Zg = function () {
        if (this.Cg !== this.gl.getBoundBuffer(d.d.ARRAY_BUFFER)) {
          this.gl.bindBuffer(d.d.ARRAY_BUFFER, this.Cg);
          this.oe();
        }
        var a = [];
        var b = 0;
        var p = this.Oa.ta[0].totalSize;
        for (var e = 0; e < this.kb.length; e++) {
          var k = new c.e.mk;
          this.gl.bufferSubData(d.d.ARRAY_BUFFER, b * p, this.kb[e].nc()[0].ba);
          k.fh = -1;
          k.Ld = b;
          a.push(k);
          b += this.kb[e].sa();
        }
        return a;
      };
      b.prototype.upload = function (a) {
        if (this.gc + a.sa() > d.d.MAX_VERTICES) {
          return false;
        }
        this.kb.push(a);
        this.gc += a.sa();
        return true;
      };
      b.prototype.destroy = function () {
        for (var a in this.rd) {
          this.gl.deleteBuffer(this.rd[a]);
        }
        this.Cg = this.kb = this.rd = void 0;
      };
      b.prototype.oe = function () {
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
      return b
    }();
    d.Ck = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.Un
(function (c) {
  (function (d) {

    function f(a, b) {
      return b.size - a.size
    }

    var b = function () {
      function b() {
        this.Bj = 4
      }
      b.prototype.setGL = function (a) {
        this.gl = a;
        this.zb = {};
        this.yb = {}
      };
      b.prototype.Vg = function (a, b) {
        this.Oa = a;
        this.qa = a.ta[0].totalSize;
        this.Uc = b;
        this.$f = 0;
        this.F = []
      };
      b.prototype.Zg = function (a) {
        if (!a) {
          var b = this.Zk();
          a = this.yb[this.qa][b];
          var h = this.yb[this.qa].length == this.Bj;
          a = a.add(this.F, h);
          if (void 0 === a) {
            if (h) {
              c.l.w.error("Upload failed!");
              return
            }
            a = this.Yf();
            a = a.add(this.F, true);
          }
          if (void 0 === a) {
            c.l.w.error("Upload failed!");
          } else {
            b = this.zb[this.qa][b];
            h = this.gl.getBoundBuffer(d.d.ARRAY_BUFFER);
            if (void 0 === h || h !== b) {
              this.gl.bindBuffer(d.d.ARRAY_BUFFER, b);
              this.oe();
            }
            b = [];
            for (var i = 0; i < this.F.length; i++) {
              var e = a[this.F[i].getID()];
              if (e.upload) {
                this.gl.bufferSubData(d.d.ARRAY_BUFFER, e.state.offset * this.qa, this.F[i].nc()[0].ba);
              }
              b.push({
                Ld: e.state.offset,
                fh: -1
              });
            }
            return b
          }
        }
      };
      b.prototype.upload = function (a) {
        if (this.$f + a.sa() > c.e.d.MAX_VERTICES) {
          return false;
        }
        this.$f += a.sa();
        this.F.push(a);
        return true
      };
      b.prototype.destroy = function () {
        for (var a in this.yb) {
          for (var b = 0; b < this.yb[a].length; ++b) {
            this.yb[a][b].destroy();
          }
        }
        for (a in this.zb) {
          for (b = 0; b < this.zb[a].length; ++b) {
            this.gl.deleteBuffer(this.zb[a][b])
          }
        }
      };
      b.prototype.Zk = function () {
        var a = this.yb[this.qa];
        if (!a) return this.Yf(), 0;
        for (var b = [], h = 0; h < a.length; ++h) {
          for (var e = 0, c = 0, p = 0; p < this.F.length; ++p) {
            var f = this.F[p].sa();
            void 0 === a[h].get(this.F[p].getID()) ? c += f : e += f
          }
          p = a[h].Bb;
          0 == c || 0.95 * p > c ? b.push(e) : b.push(e - c - 0.95 * p)
        }
        a = -1;
        e = -d.d.MAX_VERTICES;
        for (h = 0; h < b.length; ++h) b[h] > e && (e = b[h], a = h);
        return 0 > e && this.zb[this.qa].length < this.Bj ? (this.Yf(), this.zb[this.qa].length - 1) : a
      };
      b.prototype.Yf = function () {
        var b = this.gl.createBuffer();
        if (void 0 === b) {
          c.l.w.error("Creation of vertex buffer failed.");
        } else {
          var h = d.d.MAX_VERTICES * this.qa * Float32Array.BYTES_PER_ELEMENT;
          this.gl.bindBuffer(d.d.ARRAY_BUFFER, b);
          this.gl.bufferData(d.d.ARRAY_BUFFER, h, d.d.DYNAMIC_DRAW);
          this.oe();
          void 0 === this.zb[this.qa] && (this.zb[this.qa] = []);
          this.zb[this.qa].push(b);
          b = new a;
          void 0 === this.yb[this.qa] && (this.yb[this.qa] = []);
          this.yb[this.qa].push(b);
          return b
        }
      };
      b.prototype.oe = function () {
        for (var a = this.Oa.ta, b = 0; b < a.length; ++b) {
          for (var h = a[b], e = h.attrs, h = h.totalSize, c = 0; c < e.length; ++c) {
            var d = this.Uc.getAttribs(e[c].pc);
            this.gl.kc(d.location);
            this.gl.vertexAttribPointer(d.location, d.size, d.type, d.Hf, h, e[c].byteOffset)
          }
        }
      };
      return b
    }();
    d.Un = b;

    var a = function () {
      function a() {
        this.hg = void 0;
        this.Bb = 0;
        this.Mm = 0.5;
        this.Nm = 1024;
        this.hg = new p;
        this.Hl = [];
        this.ig = {};
        this.ib = [];
        this.kd = [];
        this.Ze = [];
        this.Ye = void 0;
        this.Bb = d.d.MAX_VERTICES;
        this.zc = [ new h("-1", this.Bb, 0) ];
      }
      a.prototype.get = function (a) {
        return this.ig[a]
      };
      a.prototype.add = function (a, b, e) {
        "undefined" === typeof b && (b = false);
        "undefined" === typeof e && (e = false);
        this.dc();
        for (var i = 0, n = a.length; i < n; i++) {
          var p = a[i];
          this.ib[i] = new h(p.getID(), p.sa())
        }
        this.ib.sort(f);
        a = {};
        if (this.Oi(a) || e) {
          if (this.cc === this.ib.length) {
            this.eg()
            return a;
          }
          if (!b || e) {
            if (this.cc === this.ib.length) {
              this.eg();
              return a;
            }
            this.reset();
            this.Oi(a);
            this.ib.length = 0;
            this.eg();
            return a
          }
        }
        this.Bl();
      };
      a.prototype.destroy = function () {
        this.reset()
      };
      a.prototype.reset = function () {
        this.hg.destroy();
        this.hg = void 0;
        this.Hl.length = 0;
        this.zc.length = 0;
        this.ig = {};
        this.Bg = 0;
        this.cc = 0;
        this.kd.length = 0;
        this.Zb = {};
        this.Ye = void 0;
        this.Ze.length = 0;
        this.Bb = d.d.MAX_VERTICES;
        this.zc = [ new h("-1", this.Bb, 0) ]
      };
      a.prototype.Oi = function (a) {
        for (var b = this.ib[this.ib.length - 1], h = this.ib.length, e = 0, c = this.zc.length - 1; 0 <= c; --c) {
          var d = this.zc[c];
          if (d.size < b.size) {
            break;
          }
          for (var p = d.size, f = d.offset, q = 0; q < this.ib.length; ++q) {
            var r = this.ib[q];
            if (this.Zb[r.Nc]) {
              ++this.cc;
            } else {
              var u = this.get(r.Nc);
              if (void 0 !== u) {
                a[r.Nc] = {
                  state: u,
                  upload: false
                };
                this.Zb[r.Nc] = u;
                ++this.cc;
              } else {
                if (p < r.size) {
                  break;
                }
                r.offset = f;
                p -= r.size;
                f += r.size;
                e += r.size;
                p < this.Nm && (r.size += p, p = 0);
                this.Bb -= r.size;
                this.Zb[r.Nc] = r;
                a[r.Nc] = {
                  state: r,
                  upload: true
                };
                if (++this.cc == h) {
                  break
                }
              }
            }
          }
          d.offset = f;
          d.size = p
        }
        return (e / this.Yn >= this.Mm);
      };
      a.prototype.dc = function () {
        for (var i = 0; i < this.zc.length; i++) {
          this.kd[i] = this.zc[i].clone();
        }
        this.Bg = this.Bb;
        this.Zb = {};
        this.cc = 0;
        this.Ze.length = 0;
        this.Ye = void 0;
      };
      a.prototype.Bl = function () {
        for (var i = 0; i < this.kd.length; i++) {
          this.zc[i] = this.kd[i].clone();
        }
        this.Bb = this.Bg;
        this.kd.length = 0;
        this.Ze.length = 0;
        this.Ye = void 0;
        this.Zb = {};
        this.cc = 0;
      };
      a.prototype.eg = function () {
        for (var a in this.Zb) {
          this.ig[a] = this.Zb[a];
        }
        this.kd.length = 0;
        this.Ze.length = 0;
        this.Ye = void 0;
        this.Zb = {};
        this.Bg = this.cc = 0
      };
      a.io = 0;
      a.jo = 1;
      return a;
    }();

    var h = function () {
      function a(b, size, offset) {
        if (typeof offset === "undefined") { offset = void 0; }
        this.Nc = b;
        this.size = size;
        this.offset = offset;
      }
      a.prototype.clone = function () {
        return new a(this.Nc, this.size, this.offset);
      };
      return a;
    }();

    var p = function () {
      function a() {
        this.dc = void 0;
        this.gg = void 0;
      }
      a.prototype.end = z("gg");
      a.prototype.destroy = function () {
        for (var a = this.dc; void 0 !== a;) {
          var b = a.next;
          delete a;
          a = b
        }
        this.dc = void 0;
        this.gg = void 0;
      };
      return a;
    }();

  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.d
// flwebgl.e.GLContext
(function (c) {
  (function (d) {
    var f = function () {
      function b(canvas, options) {
        if (typeof options === "undefined") { options = void 0; }
        this.ei = {};
        this.textureMap = {};
        this.ni = false;
        var p = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"]
        for (var i = 0; i < p.length; i++) {
          try {
            this.ctx = canvas.getContext(p[i], {
              alpha: false,
              premultipliedAlpha: false,
              antialias: (options[b.kOption_AAType] === b.kAAType_MSAA)
            });
            this.ctx.clearColor(1, 1, 1, 1);
            this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
          } catch (k) {
          }
          if (this.ctx) {
            break;
          }
        }
        if (!this.ctx) {
          c.l.w.error("Your browser doesn't support WebGL.");
          throw Error();
        }
        this.viewport = void 0;
        this.El();
        this.me();
        this.xb = [];
        this.vao = this.getExtension("OES_vertex_array_object");
        if (!this.hasExtension("OES_standard_derivatives")) {
          c.l.w.error("Standard derivatives extension not enabled.");
        }
        this.renderTarget = new d.Yh(void 0, void 0, void 0, void 0);
        this.bufferCache = {};
        this.activeTextureMap = {};
        this.ni = options[b.kOption_LogErrors];
        p = options[b.kOption_Caching];
        this.ii = (p instanceof Object) ? true : options[b.kOption_Caching];
        this.fb = this.ii ? new c.e.Se(p) : new c.e.Ck;
        this.fb.setGL(this);
        this.uniformsCache = {};
        this.ql = 0
      }
      b.prototype.getTexture = function (id) {
        return this.textureMap[id];
      };
      b.prototype.getViewport = z("viewport");
      b.prototype.setViewport = function (rect, flipY) {
        if (typeof flipY === "undefined") { flipY = true; }
        var multY = flipY ? -1 : 1;
        this.viewport = rect;
        this.ctx.viewport(rect.left, rect.top, rect.width, rect.height);
        this.viewMatrix = new c.c.u([ 2 / rect.width, 0, 0, 2 * multY / rect.height, -1, -1 * multY ]);
      };
      b.prototype.loadTextures = function (a, b) {
        this.xb = a;
        this._loadTextures(a, b);
      };
      b.prototype.getTextureAtlas = function (id) {
        var b = void 0;
        for (var i = 0; i < this.xb.length; i++)
          if (this.xb[i].getID() === id) {
            b = this.xb[i];
            break
          }
        return b
      };
      b.prototype.Be = function (a) {
        var b = void 0;
        for (var i = 0; i < this.xb.length; i++)
          if (this.xb[i].getFrame(a) !== void 0) {
            b = this.xb[i];
            break;
          }
        return b;
      };
      b.prototype.wd = function (width, height, format, internalFormat) {
        if (typeof format === "undefined") { format = b.RGBA; }
        if (typeof internalFormat === "undefined") { internalFormat = b.DEPTH_COMPONENT16; }
        var frameBuffer = void 0;
        var renderBuffer = void 0;
        var buffers = this.bufferCache[internalFormat];
        if (buffers !== void 0) {
          for (var i = 0; i < buffers.length; i++) {
            var buffer = buffers[i];
            if (buffer.width === width && buffer.height === height) {
              frameBuffer = buffer.frameBuffer;
              renderBuffer = buffer.renderBuffer;
              break;
            }
          }
        }
        if (frameBuffer === void 0) {
          frameBuffer = this.createFramebuffer();
          renderBuffer = this.createRenderbuffer();
          this.bindFramebuffer(b.FRAMEBUFFER, frameBuffer);
          this.bindRenderbuffer(b.RENDERBUFFER, renderBuffer);
          this.renderbufferStorage(b.RENDERBUFFER, internalFormat, width, height);
          this.framebufferRenderbuffer(b.FRAMEBUFFER, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, renderBuffer);
          if (this.bufferCache[internalFormat] === void 0) { this.bufferCache[internalFormat] = []; }
          this.bufferCache[internalFormat].push({
            frameBuffer: frameBuffer,
            renderBuffer: renderBuffer,
            width: width,
            height: height
          });
          this.bindFramebuffer(b.FRAMEBUFFER, this.renderTarget.frameBuffer);
        }
        var texture = this.createTexture();
        var textureObj = new d.Yh(this.xb.length, texture, frameBuffer, renderBuffer);
        var textureID = textureObj.getID();
        this.activateTexture(textureID);
        this.bindTexture(b.TEXTURE_2D, texture);
        this.texImage2D_WidthHeight(b.TEXTURE_2D, format, width, height, format, b.UNSIGNED_BYTE);
        this.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
        this.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
        this.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
        this.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
        var textureAtlas = new d.Zh(textureID, void 0, width, height);
        this.textureMap[textureID] = textureObj.texture;
        this.xb.push(textureAtlas);
        this.bindTexture(b.TEXTURE_2D, null);
        this.deactivateTexture(textureID);
        return textureObj;
      };
      b.prototype.Ha = function (a) {
        if (a === this.renderTarget) {
          return this.renderTarget;
        }
        if (a.frameBuffer !== this.renderTarget.frameBuffer) {
          this.bindFramebuffer(b.FRAMEBUFFER, a.frameBuffer);
        }
        if (a.frameBuffer !== void 0) {
          this.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, a.texture, 0);
        }
        var h = this.renderTarget;
        this.renderTarget = a;
        return h;
      };
      b.prototype.Wg = function (a) {
        this.activateTexture(a.getID());
        this.bindTexture(b.TEXTURE_2D, a.texture);
        return a.getID();
      };
      b.prototype.eh = z("renderTarget");
      b.prototype.ye = function (a) {
        void 0 !== a && a.texture && (this.deleteTexture(a.texture), this.textureMap[a.getID()] = void 0)
      };
      b.prototype.e = function (shader, h, c) {
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
      };
      b.prototype.drawElements = function (a) {
        this.ctx.drawElements(this.ctx.TRIANGLES, a, this.ctx.UNSIGNED_SHORT, 0)
      };
      b.prototype.drawArrays = function (a, b, c) {
        this.ctx.drawArrays(a, b, c)
      };
      b.prototype.bufferData = function (a, b, c) {
        this.ctx.bufferData(a, b, c)
      };
      b.prototype.bufferSubData = function (a, b, c) {
        this.ctx.bufferSubData(a, b, c)
      };
      b.prototype.setBackgroundColor = function (a) {
        this.backgroundColor = a;
        this.clearColor(a.red / 255, a.green / 255, a.blue / 255, a.alpha / 255)
      };
      b.prototype.getBackgroundColor = z("backgroundColor");
      b.prototype.clearColor = function (a, b, c, e) {
        this.ctx.clearColor(a, b, c, e)
      };
      b.prototype.clear = function (a, b, c) {
        var e = 0;
        a && (e |= this.ctx.COLOR_BUFFER_BIT);
        b && (e |= this.ctx.DEPTH_BUFFER_BIT);
        c && (e |= this.ctx.STENCIL_BUFFER_BIT);
        e && this.ctx.clear(e)
      };
      b.prototype.blendFunc = function (a, b) {
        this.ctx.blendFunc(a, b)
      };
      b.prototype.blendFuncSeparate = function (a, b, c, e) {
        this.ctx.blendFuncSeparate(a, b, c, e)
      };
      b.prototype.enable = function (a) {
        this.ctx.enable(a)
      };
      b.prototype.disable = function (a) {
        this.ctx.disable(a)
      };
      b.prototype.scissor = function (a) {
        this.ctx.scissor(a.left, a.top, a.width, a.height)
      };
      b.prototype.depthMask = function (a) {
        this.ctx.depthMask(a)
      };
      b.prototype.depthFunc = function (a) {
        this.ctx.depthFunc(a)
      };
      b.prototype.clearDepth = function (a) {
        this.ctx.clearDepth(a)
      };
      b.prototype.setDepthTest = function (a) {
        if (a !== this.depthTestEnabled) {
          if (a) {
            this.ctx.enable(this.ctx.DEPTH_TEST)
          } else {
            this.ctx.disable(this.ctx.DEPTH_TEST);
          }
          this.depthTestEnabled = a;
        }
      };
      b.prototype.createShader = function (type, source) {
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
            c.l.w.info(this.ctx.getShaderInfoLog(shader));
            return null;
          }
        }
      };
      b.prototype.deleteShader = function (a) {
        this.ctx.deleteShader(a)
      };
      b.prototype.createProgram = function () {
        return this.ctx.createProgram()
      };
      b.prototype.deleteProgram = function (a) {
        this.ctx.deleteProgram(a)
      };
      b.prototype.attachShader = function (a, b) {
        this.ctx.attachShader(a, b)
      };
      b.prototype.linkProgram = function (program) {
        this.ctx.linkProgram(program);
        var hasError = this.hasError();
        var linkStatus = this.ctx.getProgramParameter(program, this.ctx.LINK_STATUS);
        if (!linkStatus || hasError) {
          c.l.w.error("Could not initialize shaders properly: " + this.ctx.getProgramInfoLog(program));
        }
        return (!hasError && linkStatus) ? this.ql++ : -1;
      };
      b.prototype.useProgram = function (a) {
        this.ctx.useProgram(a)
      };
      b.prototype.hasExtension = function (a) {
        return null != this.getExtension(a)
      };
      b.prototype.bindAttribLocation = function (a, b, c) {
          this.ctx.bindAttribLocation(a, b, c)
        };
      b.prototype.getAttribLocation = function (a, b) {
        return this.ctx.getAttribLocation(a, b)
      };
      b.prototype.kc = function (a) {
        this.ctx.enableVertexAttribArray(a)
      };
      b.prototype.vertexAttribPointer = function (a, b, c, e, d, f) {
        this.ctx.vertexAttribPointer(a, b, c, e, d, f)
      };
      b.prototype.getUniformLocation = function (a, b) {
        return this.ctx.getUniformLocation(a, b)
      };
      b.prototype.uniformMatrix4fv = function (a, b, c) {
        this.ctx.uniformMatrix4fv(a, b, c)
      };
      b.prototype.uniform2fv = function (a, b) {
        this.ctx.uniform2fv(a, b)
      };
      b.prototype.uniform4fv = function (a, b) {
        this.ctx.uniform4fv(a, b)
      };
      b.prototype.uniform1i = function (a, b) {
        this.ctx.uniform1i(a, b)
      };
      b.prototype.uniform1iv = function (a, b) {
        this.ctx.uniform1iv(a, b)
      };
      b.prototype.uniform2iv = function (a, b) {
        this.ctx.uniform2iv(a, b)
      };
      b.prototype.createBuffer = function () {
        var buffer = this.ctx.createBuffer();
        return this.hasError() ? void 0 : buffer;
      };
      b.prototype.deleteBuffer = function (a) {
        this.ctx.deleteBuffer(a)
      };
      b.prototype.bindBuffer = function (target, buffer) {
        this.ctx.bindBuffer(target, buffer);
        this.ei[target] = buffer;
      };
      b.prototype.getBoundBuffer = function (target) {
        return this.ei[target];
      };
      b.prototype.createFramebuffer = function () {
        return this.ctx.createFramebuffer()
      };
      b.prototype.deleteFramebuffer = function (a) {
        this.ctx.deleteFramebuffer(a)
      };
      b.prototype.bindFramebuffer = function (a, b) {
        this.ctx.bindFramebuffer(a, b)
      };
      b.prototype.bindRenderbuffer = function (a, b) {
        this.ctx.bindRenderbuffer(a, b)
      };
      b.prototype.framebufferTexture2D = function (a, b, c, e, d) {
        this.ctx.framebufferTexture2D(a, b, c, e, d)
      };
      b.prototype.framebufferRenderbuffer = function (a, b, c, e) {
        this.ctx.framebufferRenderbuffer(a, b, c, e)
      };
      b.prototype.createRenderbuffer = function () {
          return this.ctx.createRenderbuffer()
        };
      b.prototype.deleteRenderbuffer = function (a) {
        this.ctx.deleteRenderbuffer(a)
      };
      b.prototype.renderbufferStorage = function (a, b, c, e) {
        this.ctx.renderbufferStorage(a, b, c, e)
      };
      b.prototype.activateTexture = function (a) {
        this.activeTextureMap[a] = a;
        this.ctx.activeTexture(b.TEXTURE0 + a)
      };
      b.prototype.deactivateTexture = function (a) {
        this.activeTextureMap[a] = void 0
      };
      b.prototype.bindTexture = function (a, b) {
        this.ctx.bindTexture(a, b)
      };
      b.prototype.createTexture = function () {
        return this.ctx.createTexture()
      };
      b.prototype.deleteTexture = function (a) {
        this.ctx.deleteTexture(a)
      };
      b.prototype.texImage2D = function (a, b, c, e, d, f) {
        this.ctx.texImage2D(a, b, c, e, d, f)
      };
      b.prototype.texImage2D_WidthHeight = function (target, internalFormat, width, height, format, type) {
        this.ctx.texImage2D(target, 0, internalFormat, width, height, 0, format, type, null);
      };
      b.prototype.texParameteri = function (a, b, c) {
        this.ctx.texParameteri(a, b, c)
      };
      b.prototype.pixelStorei = function (a, b) {
        this.ctx.pixelStorei(a, b)
      };
      b.prototype.flush = function () {
        this.ctx.flush()
      };
      b.prototype.createVertexArrayOES = function () {
        if (this.vao !== void 0) {
          return this.vao.createVertexArrayOES();
        }
      };
      b.prototype.bindVertexArrayOES = function (a) {
        if (this.vao !== void 0) {
          this.vao.bindVertexArrayOES(a);
        }
      };
      b.prototype.deleteVertexArrayOES = function (a) {
        if (this.vao !== void 0) {
          this.vao.deleteVertexArrayOES(a);
        }
      };
      b.prototype.destroy = function () {
        this.deleteTextures();
        for (var a in this.bufferCache) {
          var b = a.frameBuffer;
          this.deleteRenderbuffer(a.renderBuffer);
          this.deleteFramebuffer(b)
        }
        this.fb.destroy()
      };
      b.prototype.deleteTextures = function () {
        for (var a in this.textureMap) {
          if (this.textureMap[a]) {
            this.ctx.deleteTexture(this.textureMap[a]);
          }
        }
        this.textureMap = {};
      };
      b.prototype._loadTextures = function (textures, callback) {
        var d = 0;
        for (var i = 0; i < textures.length; i++) {
          var tex = this.createTexture();
          var img = new Image();
          var self = this;
          var textureObj = textures[i];
          var textureCount = textures.length;
          img.onload = function () {
            self.bindTexture(b.TEXTURE_2D, self.textureMap[this.id]);
            self.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, this);
            self.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
            self.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
            self.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
            self.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
            self.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
            self.bindTexture(b.TEXTURE_2D, null);
            if(++d === textureCount) {
              callback();
            }
          };
          img.src = textureObj.getImageURL();
          img.id = "" + textureObj.getID();
          this.textureMap[textureObj.getID()] = tex;
        }
      };
      b.prototype.me = function () {
        this.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
        this.enable(b.BLEND);
        this.depthFunc(b.LESS);
        this.setBackgroundColor(new c.c.Qc(255, 255, 255, 0));
        this.clearDepth(1);
        this.disable(b.CULL_FACE);
        this.depthMask(true);
        this.setDepthTest(true)
      };
      b.prototype.getError = function () {
        if (!this.ni) return this.ctx.NO_ERROR;
        var a = this.ctx.getError();
        a != this.ctx.NO_ERROR && c.l.w.error("WebGL Error: " + a);
        return a
      };
      b.prototype.Fl = function (a) {
        a = a.lb;
        if (this.activeTextureMap[a] !== a) {
          var texture = this.getTexture(a);
          if (texture) {
            this.activateTexture(a);
            this.bindTexture(b.TEXTURE_2D, texture);
          }
        }
      };
      b.prototype.setUniforms = function (shader, c) {
        var d = c.getUniforms(shader.getID());
        var e = this.uniformsCache[shader.getID()];
        if (!e) {
          e = this.uniformsCache[shader.getID()] = {};
        }
        for (var k = 0; k < d.length; ++k) {
          var n = e[k]; // cached value
          var f = d[k].value; // new value
          var type = d[k].jc.type;
          var location = d[k].jc.location;
          switch (type) {
            case b.FLOAT_VEC2:
              if (n === void 0 || n.value[0] !== f[0] || n.value[1] !== f[1]) {
                this.uniform2fv(location, f);
              }
              break;
            case b.FLOAT_VEC4:
              if (n === void 0 || n.value[0] !== f[0] || n.value[1] !== f[1] || n.value[2] !== f[2] || n.value[3] !== f[3]) {
                this.uniform4fv(location, f);
              }
              break;
            case b.FLOAT_MAT4:
              if (n === void 0 || n.value[0] !== f[0] || n.value[1] !== f[1] || n.value[4] !== f[4] || n.value[5] !== f[5] || n.value[10] !== f[10] || n.value[12] !== f[12] || n.value[13] !== f[13]) {
                this.uniformMatrix4fv(location, false, f);
              }
              break;
            case b.INT:
            case b.SAMPLER_2D:
              if (n === void 0 || n.value[0] !== f[0] || n.value[1] !== f[1]) {
                this.uniform1iv(location, f);
              }
              break;
            case b.INT_VEC2:
              if (n === void 0 || n.value[0] !== f[0] || n.value[1] !== f[1]) {
                this.uniform2iv(location, f);
              }
              break;
          }
          this.uniformsCache[shader.getID()][k] = {
            type: type,
            value: f
          };
        }
      };
      b.prototype.getExtension = function (a) {
        a = this.ctx.getExtension(a);
        return (a === null) ? void 0 : a
      };
      b.prototype.El = function () {
        b.ZERO = this.ctx.ZERO;
        b.ONE = this.ctx.ONE;
        b.SRC_COLOR = this.ctx.SRC_COLOR;
        b.ONE_MINUS_SRC_COLOR = this.ctx.ONE_MINUS_SRC_COLOR;
        b.SRC_ALPHA = this.ctx.SRC_ALPHA;
        b.ONE_MINUS_SRC_ALPHA = this.ctx.ONE_MINUS_SRC_ALPHA;
        b.DST_ALPHA = this.ctx.DST_ALPHA;
        b.ONE_MINUS_DST_ALPHA = this.ctx.ONE_MINUS_DST_ALPHA;
        b.DST_COLOR = this.ctx.DST_COLOR;
        b.ONE_MINUS_DST_COLOR = this.ctx.ONE_MINUS_DST_COLOR;
        b.SRC_ALPHA_SATURATE = this.ctx.SRC_ALPHA_SATURATE;
        b.NEVER = this.ctx.NEVER;
        b.LESS = this.ctx.LESS;
        b.EQUAL = this.ctx.EQUAL;
        b.LEQUAL = this.ctx.LEQUAL;
        b.GREATER = this.ctx.GREATER;
        b.NOTEQUAL = this.ctx.NOTEQUAL;
        b.GEQUAL = this.ctx.GEQUAL;
        b.ALWAYS = this.ctx.ALWAYS;
        b.ARRAY_BUFFER = this.ctx.ARRAY_BUFFER;
        b.ELEMENT_ARRAY_BUFFER = this.ctx.ELEMENT_ARRAY_BUFFER;
        b.ARRAY_BUFFER_BINDING = this.ctx.ARRAY_BUFFER_BINDING;
        b.ELEMENT_ARRAY_BUFFER_BINDING = this.ctx.ELEMENT_ARRAY_BUFFER_BINDING;
        b.BYTE = this.ctx.BYTE;
        b.UNSIGNED_BYTE = this.ctx.UNSIGNED_BYTE;
        b.SHORT = this.ctx.SHORT;
        b.UNSIGNED_SHORT = this.ctx.UNSIGNED_SHORT;
        b.INT = this.ctx.INT;
        b.UNSIGNED_INT = this.ctx.UNSIGNED_INT;
        b.FLOAT = this.ctx.FLOAT;
        b.INT_VEC2 = this.ctx.INT_VEC2;
        b.INT_VEC3 = this.ctx.INT_VEC3;
        b.INT_VEC4 = this.ctx.INT_VEC4;
        b.FLOAT_VEC2 = this.ctx.FLOAT_VEC2;
        b.FLOAT_VEC3 = this.ctx.FLOAT_VEC3;
        b.FLOAT_VEC4 = this.ctx.FLOAT_VEC4;
        b.FLOAT_MAT4 = this.ctx.FLOAT_MAT4;
        b.SAMPLER_2D = this.ctx.SAMPLER_2D;
        b.FRAGMENT_SHADER = this.ctx.FRAGMENT_SHADER;
        b.VERTEX_SHADER = this.ctx.VERTEX_SHADER;
        b.MAX_VERTEX_ATTRIBS = this.ctx.MAX_VERTEX_ATTRIBS;
        b.MAX_VERTEX_UNIFORM_VECTORS = this.ctx.MAX_VERTEX_UNIFORM_VECTORS;
        b.MAX_VARYING_VECTORS = this.ctx.MAX_VARYING_VECTORS;
        b.MAX_COMBINED_TEXTURE_IMAGE_UNITS = this.ctx.MAX_COMBINED_TEXTURE_IMAGE_UNITS;
        b.MAX_VERTEX_TEXTURE_IMAGE_UNITS = this.ctx.MAX_VERTEX_TEXTURE_IMAGE_UNITS;
        b.MAX_TEXTURE_IMAGE_UNITS = this.ctx.MAX_TEXTURE_IMAGE_UNITS;
        b.MAX_FRAGMENT_UNIFORM_VECTORS = this.ctx.MAX_FRAGMENT_UNIFORM_VECTORS;
        b.CULL_FACE = this.ctx.CULL_FACE;
        b.BLEND = this.ctx.BLEND;
        b.DITHER = this.ctx.DITHER;
        b.STENCIL_TEST = this.ctx.STENCIL_TEST;
        b.DEPTH_TEST = this.ctx.DEPTH_TEST;
        b.SCISSOR_TEST = this.ctx.SCISSOR_TEST;
        b.POLYGON_OFFSET_FILL = this.ctx.POLYGON_OFFSET_FILL;
        b.SAMPLE_ALPHA_TO_COVERAGE = this.ctx.SAMPLE_ALPHA_TO_COVERAGE;
        b.SAMPLE_COVERAGE = this.ctx.SAMPLE_COVERAGE;
        b.TEXTURE0 = this.ctx.TEXTURE0;
        b.TEXTURE_2D = this.ctx.TEXTURE_2D;
        b.RGBA = this.ctx.RGBA;
        b.RGB = this.ctx.RGB;
        b.TEXTURE_MAG_FILTER = this.ctx.TEXTURE_MAG_FILTER;
        b.TEXTURE_MIN_FILTER = this.ctx.TEXTURE_MIN_FILTER;
        b.TEXTURE_WRAP_S = this.ctx.TEXTURE_WRAP_S;
        b.TEXTURE_WRAP_T = this.ctx.TEXTURE_WRAP_T;
        b.UNPACK_FLIP_Y_WEBGL = this.ctx.UNPACK_FLIP_Y_WEBGL;
        b.CLAMP_TO_EDGE = this.ctx.CLAMP_TO_EDGE;
        b.NEAREST = this.ctx.NEAREST;
        b.LINEAR = this.ctx.LINEAR;
        b.NEAREST_MIPMAP_NEAREST = this.ctx.NEAREST_MIPMAP_NEAREST;
        b.LINEAR_MIPMAP_NEAREST = this.ctx.LINEAR_MIPMAP_NEAREST;
        b.NEAREST_MIPMAP_LINEAR = this.ctx.NEAREST_MIPMAP_LINEAR;
        b.LINEAR_MIPMAP_LINEAR = this.ctx.LINEAR_MIPMAP_LINEAR;
        b.UNPACK_PREMULTIPLY_ALPHA_WEBGL = this.ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL;
        b.FRAMEBUFFER = this.ctx.FRAMEBUFFER;
        b.RENDERBUFFER = this.ctx.RENDERBUFFER;
        b.COLOR_ATTACHMENT0 = this.ctx.COLOR_ATTACHMENT0;
        b.DEPTH_STENCIL = this.ctx.DEPTH_STENCIL;
        b.DEPTH_COMPONENT16 = this.ctx.DEPTH_COMPONENT16;
        b.STENCIL_INDEX8 = this.ctx.STENCIL_INDEX8;
        b.DEPTH_ATTACHMENT = this.ctx.DEPTH_ATTACHMENT;
        b.STENCIL_ATTACHMENT = this.ctx.STENCIL_ATTACHMENT;
        b.DEPTH_STENCIL_ATTACHMENT = this.ctx.DEPTH_STENCIL_ATTACHMENT;
        b.FRAMEBUFFER_UNSUPPORTED = this.ctx.FRAMEBUFFER_UNSUPPORTED;
        b.KEEP = this.ctx.KEEP;
        b.REPLACE = this.ctx.REPLACE;
        b.INCR = this.ctx.INCR;
        b.DECR = this.ctx.DECR;
        b.INVERT = this.ctx.INVERT;
        b.INCR_WRAP = this.ctx.INCR_WRAP;
        b.DECR_WRAP = this.ctx.DECR_WRAP;
        b.STREAM_DRAW = this.ctx.STREAM_DRAW;
        b.STATIC_DRAW = this.ctx.STATIC_DRAW;
        b.DYNAMIC_DRAW = this.ctx.DYNAMIC_DRAW;
        b.TRIANGLES = this.ctx.TRIANGLES
      };
      b.prototype.hasError = function () {
        return this.getError() != this.ctx.NO_ERROR;
      };
      b.MAX_VERTICES = 65532;
      b.MAX_TEXTURE_SIZE = 2048;
      b.kOption_LogErrors = 0;
      b.kOption_AAType = 1;
      b.kOption_Caching = 2;
      b.jh = 3;
      b.kAAType_MSAA = 0;
      b.kAAType_ImageSpace = 1;
      return b
    }();
    d.d = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.Ak
(function (c) {
  (function (d) {
    var f = function () {
      function b() {}
      b.prototype.getID = z("id");
      b.prototype.getAttribs = z("attribs");
      b.prototype.setGL = function (a) {
        this.gl = a;
        this.V = new c.c.u;
        return this.Ua();
      };
      b.prototype.e = function (a) {
        var b = a.F.length;
        var c = this.gl.viewMatrix;
        for (var e = 0; e < b; ++e) {
          var k = a.mc(e);
          if (k.getDirty()) {
            var _ad = k.ka.ad;
            var s = this.gl.Be(_ad);
            var f = s.getFrame(_ad);
            var m = k.getColorTransform();
            var n = k.lb;
            var y = k.ka.fillMode;
            var n = k.lb;
            var w = s.textureWidth;
            var s = s.textureHeight;
            this.V.identity();
            this.V.multiply(c);
            this.V.multiply(k.getTransform());
            var t = this.V.b;
            var q = k.getUniforms(this.getID());
            if (q === void 0) {
              q = [];
              q.push(new d.D(this.o.uMVMatrix, t));
              q.push(new d.D(this.o.uSampler, [n]));
              q.push(new d.D(this.o.uColorXformMultiplier, [m.getRedMultiplier(), m.getGreenMultiplier(), m.getBlueMultiplier(), m.getAlphaMultiplier()]));
              q.push(new d.D(this.o.uColorXformOffset, [m.getRedOffset() / 255, m.getGreenOffset() / 255, m.getBlueOffset() / 255, m.getAlphaOffset() / 255]));
              q.push(new d.D(this.o.uOverflowType, [y]));
              q.push(new d.D(this.o.uFrame, [f.left / w, f.top / s, f.width / w, f.height / s]));
            } else {
              q[0].value = t;
              q[1].value = [n];
              q[2].value = [m.getRedMultiplier(), m.getGreenMultiplier(), m.getBlueMultiplier(), m.getAlphaMultiplier()];
              q[3].value = [m.getRedOffset() / 255, m.getGreenOffset() / 255, m.getBlueOffset() / 255, m.getAlphaOffset() / 255];
              q[4].value = [y];
              q[5].value = [f.left / w, f.top / s, f.width / w, f.height / s];
            }
            k.setUniforms(this.getID(), q);
          }
        }
        if (b > 0) {
          this.gl.e(this, a.mc(0).ka.he, a.F);
        }
      };
      b.prototype.Xb = function () {
        this.gl.useProgram(this.program)
      };
      b.prototype.Ua = function () {
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
          "uniform sampler2D uSampler; \n" +
          "uniform int uOverflowType; \n" +
          "uniform vec4 uFrame; \n" +
          "void main(void) { \n" +
            "vec2 p = vTexCoord.xy; \n" +
            "vec2 px = dFdx(p); \n" +
            "vec2 py = dFdy(p); \n" +
            "vec2 f = (2.0 * vTexCoord.x) * vec2(px.x, py.x) - vec2(px.y, py.y); \n" +
            "float sd = vIsConvex * (vTexCoord.x * vTexCoord.x - vTexCoord.y) / length(f); \n" +
            "float alpha = min(0.5 - sd, 1.0); \n" +
            "if (alpha < 0.0) \n" +
              "discard; \n" +
            "vec2 uv; \n" +
            "if (uOverflowType == 0) { /* solid fill */ \n" +
              "uv = vTexCoord.zw; \n" +
            "} else if (uOverflowType == 1) { /* gradient and bitmap fill with overflow type extend */ \n" +
              "uv = clamp(vTexCoord.zw, vec2(0.0, 0.0), vec2(1.0, 1.0)) * uFrame.zw + uFrame.xy; \n" +
            "} else if (uOverflowType == 2) { /* gradient and bitmap fill with overflow type repeat */ \n" +
              "uv = fract(vTexCoord.zw) * uFrame.zw + uFrame.xy; \n" +
            "} else if (uOverflowType == 3) { /* gradient fill with overflow type reflect */ \n" +
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
            "vec4 textureColor = texture2D(uSampler, uv); \n" +
            "textureColor.a = textureColor.a * alpha; \n" +
            "gl_FragColor = textureColor * uColorXformMultiplier + uColorXformOffset; \n" +
          "}";
        this.vertexShader = this.gl.createShader(d.d.VERTEX_SHADER, this.vertexShaderSrc);
        this.fragmentShader = this.gl.createShader(d.d.FRAGMENT_SHADER, this.fragmentShaderSrc);
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.id = this.gl.linkProgram(this.program);
        if (this.v < 0) {
          this.gl.deleteProgram(this.program);
          c.l.w.error("Program linking failed.");
          return false;
        }
        var ul0 = this.gl.getUniformLocation(this.program, "uMVMatrix");
        var ul1 = this.gl.getUniformLocation(this.program, "uSampler");
        var ul2 = this.gl.getUniformLocation(this.program, "uColorXformMultiplier");
        var ul3 = this.gl.getUniformLocation(this.program, "uColorXformOffset");
        var ul4 = this.gl.getUniformLocation(this.program, "uOverflowType");
        var ul5 = this.gl.getUniformLocation(this.program, "uFrame");
        var u0 = new d.q(ul0, d.d.FLOAT_MAT4, 1, d.q.Jd);
        var u1 = new d.q(ul1, d.d.SAMPLER_2D, 1, d.q.Q);
        var u2 = new d.q(ul2, d.d.FLOAT_VEC4, 1, d.q.Q);
        var u3 = new d.q(ul3, d.d.FLOAT_VEC4, 1, d.q.Q);
        var u4 = new d.q(ul4, d.d.INT, 1, d.q.Q);
        var u5 = new d.q(ul5, d.d.FLOAT_VEC4, 1, d.q.Q);
        this.uniforms = new d.Re([ u0, u1, u2, u3, u4, u5 ]);
        this.o = {};
        this.o.uMVMatrix = u0;
        this.o.uSampler = u1;
        this.o.uColorXformMultiplier = u2;
        this.o.uColorXformOffset = u3;
        this.o.uOverflowType = u4;
        this.o.uFrame = u5;
        var al0 = this.gl.getAttribLocation(this.program, "aVertexPosition");
        var al1 = this.gl.getAttribLocation(this.program, "aLoopBlinnTextureCoord");
        var al2 = this.gl.getAttribLocation(this.program, "aIsConvex");
        var al3 = this.gl.getAttribLocation(this.program, "aTextureCoord");
        var a0 = new d.R(al0, "POSITION0", d.d.FLOAT, 2);
        var a1 = new d.R(al1, "TEXCOORD0", d.d.FLOAT, 2);
        var a2 = new d.R(al2, "TEXCOORD1", d.d.FLOAT, 1);
        var a3 = new d.R(al3, "TEXCOORD2", d.d.FLOAT, 2);
        this.attribs = new c.e.Oe([ a0, a1, a2, a3 ]);
        return true;
      };
      b.prototype.destroy = function () {
        this.gl.deleteShader(this.vertexShader);
        this.gl.deleteShader(this.fragmentShader);
        this.gl.deleteProgram(this.program);
      };
      b.Om = 7;
      return b
    }();
    d.Ak = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.Bk
(function (c) {
  (function (d) {
    var f = function () {
      function b() {}
      b.prototype.getID = z("id");
      b.prototype.getAttribs = z("attribs");
      b.prototype.setGL = function (a) {
        this.gl = a;
        this.V = new c.c.u;
        this.N = new c.c.u;
        return this.Ua()
      };
      b.prototype.e = function (a) {
        var b = a.F.length;
        var c = this.gl.viewMatrix;
        for (var e = 0; e < b; ++e) {
          var k = a.mc(e);
          if (k.getDirty()) {
            var _ad = k.ka.ad;
            var s = this.gl.Be(_ad);
            var f = s.getFrame(_ad);
            var m = k.getColorTransform();
            var n = k.lb;
            var y = k.ka.fillMode;
            var width = s.textureWidth;
            var height = s.textureHeight;
            this.V.identity();
            this.V.multiply(c);
            this.V.multiply(k.getTransform());
            var t = this.V.b;
            this.N.copy(k.getTransform());
            this.N.invert();
            var q = k.getUniforms(this.getID());
            if (q === void 0) {
              q = [];
              q.push(new d.D(this.o.uMVMatrix, t));
              q.push(new d.D(this.o.uMVMatrixInv, [this.N.get(0, 0), this.N.get(0, 1), this.N.get(1, 0), this.N.get(1, 1)]));
              q.push(new d.D(this.o.uSampler, [n]));
              q.push(new d.D(this.o.uColorXformMultiplier, [m.getRedMultiplier(), m.getGreenMultiplier(), m.getBlueMultiplier(), m.getAlphaMultiplier()]));
              q.push(new d.D(this.o.uColorXformOffset, [m.getRedOffset() / 255, m.getGreenOffset() / 255, m.getBlueOffset() / 255, m.getAlphaOffset() / 255]));
              q.push(new d.D(this.o.uOverflowType, [y]));
              q.push(new d.D(this.o.uFrame, [f.left / width, f.top / height, f.width / width, f.height / height]));
            } else {
              q[0].value = t;
              q[1].value = [this.N.get(0, 0), this.N.get(0, 1), this.N.get(1, 0), this.N.get(1, 1)];
              q[2].value = [n];
              q[3].value = [m.getRedMultiplier(), m.getGreenMultiplier(), m.getBlueMultiplier(), m.getAlphaMultiplier()];
              q[4].value = [m.getRedOffset() / 255, m.getGreenOffset() / 255, m.getBlueOffset() / 255, m.getAlphaOffset() / 255];
              q[5].value = [y];
              q[6].value = [f.left / width, f.top / height, f.width / width, f.height / height];
            }
            k.setUniforms(this.getID(), q);
          }
        }
        if (b > 0) {
          this.gl.e(this, a.mc(0).ka.he, a.F);
        }
      };
      b.prototype.Xb = function () {
        this.gl.useProgram(this.program)
      };
      b.prototype.Ua = function () {
        this.vertexShaderSrc =
          "attribute vec2 aVertexPosition; \n" +
          "attribute vec2 aLoopBlinnTextureCoord; \n" +
          "attribute vec2 aTextureCoord; \n" +
          "attribute vec2 adfdx; \n" +
          "attribute vec2 adfdy; \n" +
          "attribute float aIsConvex; \n" +
          "uniform mat4 uMVMatrix; \n" +
          "uniform vec4 uMVMatrixInv; \n" +
          "varying vec4 vTexCoord; \n" +
          "varying float vIsConvex; \n" +
          "varying vec4 vDfDxDy; \n" +
          "void main(void) { \n" +
            "gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0); \n" +
            "vDfDxDy.xy = vec2(uMVMatrixInv[0] * adfdx.x + uMVMatrixInv[1] * adfdy.x, uMVMatrixInv[0] * adfdx.y + uMVMatrixInv[1] * adfdy.y); \n" +
            "vDfDxDy.zw = vec2(uMVMatrixInv[2] * adfdx.x + uMVMatrixInv[3] * adfdy.x, uMVMatrixInv[2] * adfdx.y + uMVMatrixInv[3] * adfdy.y); \n" +
            "vTexCoord = vec4(aLoopBlinnTextureCoord, aTextureCoord); \n" +
            "vIsConvex = aIsConvex; \n" +
          "}";
        this.fragmentShaderSrc =
          "precision mediump float; \n" +
          "varying vec4 vTexCoord; \n" +
          "varying float vIsConvex; \n" +
          "varying vec4 vDfDxDy; \n" +
          "uniform vec4 uColorXformMultiplier; \n" +
          "uniform vec4 uColorXformOffset; \n" +
          "uniform sampler2D uSampler; \n" +
          "uniform int uOverflowType; \n" +
          "uniform vec4 uFrame; \n" +
          "void main(void) { \n" +
            "vec2 p = vTexCoord.xy; \n" +
            "vec2 px = vDfDxDy.xy; \n" +
            "vec2 py = vDfDxDy.zw; \n" +
            "vec2 f = (2.0 * vTexCoord.x) * vec2(px.x, py.x) - vec2(px.y, py.y); \n" +
            "float sd = vIsConvex * (vTexCoord.x * vTexCoord.x - vTexCoord.y) / length(f); \n" +
            "float alpha = min(0.5 - sd, 1.0); \n" +
            "if (alpha < 0.0) \n" +
              "discard; \n" +
            "vec2 uv; \n" +
            "if (uOverflowType == 0) { /* solid fill */ \n" +
              "uv = vTexCoord.zw; \n" +
            "} else if (uOverflowType == 1) { /*gradient and bitmap fill with overflow type extend */ \n" +
              "uv = clamp(vTexCoord.zw, vec2(0.0, 0.0), vec2(1.0, 1.0)) * uFrame.zw + uFrame.xy; \n" +
            "} else if (uOverflowType == 2) { /* gradient and bitmap fill with overflow type repeat */ \n" +
              "uv = fract(vTexCoord.zw) * uFrame.zw + uFrame.xy; \n" +
            "} else if (uOverflowType == 3) { /* gradient fill with overflow type reflect */ \n" +
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
            "vec4 textureColor = texture2D(uSampler, uv); \n" +
            "textureColor.a = textureColor.a * alpha; \n" +
            "gl_FragColor = textureColor * uColorXformMultiplier + uColorXformOffset; \n" +
          "}";
        this.vertexShader = this.gl.createShader(d.d.VERTEX_SHADER, this.vertexShaderSrc);
        this.fragmentShader = this.gl.createShader(d.d.FRAGMENT_SHADER, this.fragmentShaderSrc);
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.id = this.gl.linkProgram(this.program);
        if (this.v < 0) {
          this.gl.deleteProgram(this.program);
          c.l.w.error("Program linking failed.");
          return false;
        }
        var ul0 = this.gl.getUniformLocation(this.program, "uMVMatrix");
        var ul1 = this.gl.getUniformLocation(this.program, "uMVMatrixInv");
        var ul2 = this.gl.getUniformLocation(this.program, "uSampler");
        var ul3 = this.gl.getUniformLocation(this.program, "uColorXformMultiplier");
        var ul4 = this.gl.getUniformLocation(this.program, "uColorXformOffset");
        var ul5 = this.gl.getUniformLocation(this.program, "uOverflowType");
        var ul6 = this.gl.getUniformLocation(this.program, "uFrame");
        var u0 = new d.q(ul0, d.d.FLOAT_MAT4, 1, d.q.Jd);
        var u1 = new d.q(ul1, d.d.FLOAT_VEC4, 1, d.q.Jd);
        var u2 = new d.q(ul2, d.d.SAMPLER_2D, 1, d.q.Q);
        var u3 = new d.q(ul3, d.d.FLOAT_VEC4, 1, d.q.Q);
        var u4 = new d.q(ul4, d.d.FLOAT_VEC4, 1, d.q.Q);
        var u5 = new d.q(ul5, d.d.INT, 1, d.q.Q);
        var u6 = new d.q(ul6, d.d.FLOAT_VEC4, 1, d.q.Q);
        this.uniforms = new d.Re([ u0, u1, u2, u3, u4, u5, u6 ]);
        this.o = {};
        this.o.uMVMatrix = u0;
        this.o.uMVMatrixInv = u1;
        this.o.uSampler = u2;
        this.o.uColorXformMultiplier = u3;
        this.o.uColorXformOffset = u4;
        this.o.uOverflowType = u5;
        this.o.uFrame = u6;
        var al0 = this.gl.getAttribLocation(this.program, "aVertexPosition");
        var al1 = this.gl.getAttribLocation(this.program, "aLoopBlinnTextureCoord");
        var al2 = this.gl.getAttribLocation(this.program, "aIsConvex");
        var al3 = this.gl.getAttribLocation(this.program, "aTextureCoord");
        var al4 = this.gl.getAttribLocation(this.program, "adfdx");
        var al5 = this.gl.getAttribLocation(this.program, "adfdy");
        var a0 = new d.R(al0, "POSITION0", d.d.FLOAT, 2);
        var a1 = new d.R(al1, "TEXCOORD0", d.d.FLOAT, 2);
        var a2 = new d.R(al2, "TEXCOORD1", d.d.FLOAT, 1);
        var a3 = new d.R(al3, "TEXCOORD2", d.d.FLOAT, 2);
        var a4 = new d.R(al4, "TEXCOORD3", d.d.FLOAT, 2);
        var a5 = new d.R(al5, "TEXCOORD4", d.d.FLOAT, 2);
        this.attribs = new c.e.Oe([ a0, a1, a2, a3, a4, a5 ]);
        return true;
      };
      b.prototype.destroy = function () {
        this.gl.deleteShader(this.vertexShader);
        this.gl.deleteShader(this.fragmentShader);
        this.gl.deleteProgram(this.program)
      };
      b.Om = 11;
      return b
    }();
    d.Bk = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.kk
// Renderer ? (MSAA)
(function (c) {
  (function (d) {
    var f = function () {
      function b() {}
      b.prototype.setGL = function (a) {
        this.gl = a;
        this.Pa = a.hasExtension("OES_standard_derivatives") ? new d.Ak : new d.Bk;
        this.qc = [];
        this.qc[b.Ee] = new c.e.Pe;
        this.qc[b.Ed] = new c.e.Pe;
        this.fg = [];
        this.fg[b.Ee] = this.km;
        this.fg[b.Ed] = this.Yl;
        return this.Pa.setGL(a);
      };
      b.prototype.e = function (a) {
        this.ld();
        this.Qg(a);
        a = [ b.Ee, b.Ed ];
        for (var c = 0; c < a.length; ++c) {
          var _a = a[c];
          this.nf(_a);
          this.Ia(_a);
        }
      };
      b.prototype.Yl = function (a, b) {
        var c = a.getDepth();
        return b.getDepth() - c;
      };
      b.prototype.km = function (a, b) {
        var c = a.getDepth();
        var e = b.getDepth();
        return c - e;
      };
      b.prototype.ld = function () {
        this.ne();
        this.Pa.Xb();
      };
      b.prototype.nf = function (a) {
        this.qc[a].sort(this.fg[a]);
        this.Qi(a);
      };
      b.prototype.Ia = function (a) {
        this.Pa.e(this.qc[a]);
        this.qc[a].clear();
      };
      b.prototype.Qg = function (a) {
        for (var c = 0; c < a.length; ++c) {
          var f = a[c];
          for (var e = 0; e < f.ra(d.t.Z); e++) {
            var k = f.ab(d.t.Z, e, this.gl);
            var l = k.getIsOpaque() ? b.Ee : b.Ed;
            this.qc[l].Dc(k);
          }
          for (e = 0; e < f.ra(d.t.P); e++) {
            k = f.ab(d.t.P, e, this.gl);
            this.qc[b.Ed].Dc(k);
          }
        }
      };
      b.prototype.Qi = function (a) {
        switch (a) {
          case b.Ee:
            this.gl.depthMask(true);
            break;
          case b.Ed:
            this.gl.depthMask(false);
            break;
        }
      };
      b.prototype.ne = function () {
        this.gl.blendFunc(d.d.SRC_ALPHA, d.d.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(d.d.BLEND);
        this.gl.depthFunc(d.d.LESS);
        this.gl.clearDepth(1);
        this.gl.depthMask(true);
        this.gl.setDepthTest(true);
      };
      b.prototype.destroy = function () {
        this.Pa.destroy();
      };
      b.Ee = 0;
      b.Ed = 1;
      return b
    }();
    d.kk = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.ek
(function (c) {
  (function (d) {
    var f = function () {
      function b() {}
      b.prototype.getID = z("id");
      b.prototype.setGL = function (a) {
        this.gl = a;
        return this.Ua() ? true : false
      };
      b.prototype.getAttribs = z("attribs");
      b.prototype.Xb = function () {
        this.gl.useProgram(this.program);
        this.gl.bindBuffer(d.d.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bindBuffer(d.d.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.useProgram(this.program);
        this.gl.disable(d.d.BLEND);
        this.gl.depthMask(false);
        this.gl.disable(d.d.DEPTH_TEST);
        this.Eg()
      };
      b.prototype.e = function (a, b) {
        "undefined" === typeof b && (b = void 0);
        this.Dg(b.am, b.bm);
        this.gl.drawElements(this.ae.length)
      };
      b.prototype.Eg = function () {
        var a = 0;
        this.gl.vertexAttribPointer(0, 2, d.d.FLOAT, false, 0, 4 * a);
        this.gl.vertexAttribPointer(1, 2, d.d.FLOAT, false, 0, 4 * (a + 8))
      };
      b.prototype.Dg = function (a, b) {
        this.gl.uniform1i(this.bg, a);
        this.gl.uniform1i(this.Lk, b)
      };
      b.prototype.Ua = function () {

        this.vertexShaderSrc =
          "attribute vec2 aVertexPosition; \n" +
          "attribute vec2 aTextureCoord; \n" +
          "varying vec2 vTextureCoord; \n" +
          "void main(void ) { \n" +
            "gl_Position = vec4(aVertexPosition, 1.0, 1.0); \n" +
            "vTextureCoord = aTextureCoord; \n" +
          "}";

        this.fragmentShaderSrc =
          "precision mediump float; \n" +
          "uniform sampler2D uColorMap; \n" +
          "uniform sampler2D uCoverageMap; \n" +
          "varying vec2 vTextureCoord; \n" +
          "void main() { \n" +
            "vec4 cov = texture2D(uCoverageMap, vTextureCoord); \n" +
            "vec4 color = texture2D(uColorMap, vTextureCoord); \n" +
            "gl_FragColor = cov + (color * (1.0 - cov.a)); \n" +
          "}";

        this.vertexBuffer = this.gl.createBuffer();
        if (this.vertexBuffer === void 0) {
          c.l.w.error("Creation of vertex buffer failed.");
          return false;
        }
        this.indexBuffer = this.gl.createBuffer();
        if (this.indexBuffer === void 0) {
          c.l.w.error("Creation of index buffer failed.");
          return false;
        }
        this.vertexShader = this.gl.createShader(d.d.VERTEX_SHADER, this.vertexShaderSrc);
        this.fragmentShader = this.gl.createShader(d.d.FRAGMENT_SHADER, this.fragmentShaderSrc);
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.gl.bindBuffer(d.d.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bindBuffer(d.d.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.kc(0);
        this.gl.kc(1);
        this.gl.bindAttribLocation(this.program, 0, "aVertexPosition");
        this.gl.bindAttribLocation(this.program, 1, "aTextureCoord");
        this.id = this.gl.linkProgram(this.program);
        if (0 > this.v) return this.gl.deleteProgram(this.program), c.l.w.error("Program linking failed."), false;
        this.bg = this.gl.getUniformLocation(this.program, "uColorMap");
        this.Lk = this.gl.getUniformLocation(this.program, "uCoverageMap");
        this.kg = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 0, 1, 1, 0, 1]);
        this.ae = new Uint16Array([0, 1, 2, 0, 2, 3]);
        this.gl.bufferData(d.d.ARRAY_BUFFER, this.kg, d.d.STATIC_DRAW);
        this.gl.bufferData(d.d.ELEMENT_ARRAY_BUFFER, this.ae, d.d.STATIC_DRAW);
        return true
      };
      b.prototype.destroy = function () {
        this.gl.deleteBuffer(this.vertexBuffer);
        this.gl.deleteBuffer(this.indexBuffer);
        this.gl.deleteShader(this.vertexShader);
        this.gl.deleteShader(this.fragmentShader);
        this.gl.deleteProgram(this.program)
      };
      return b
    }();
    d.ek = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.hk
(function (c) {
  (function (d) {
    var f = function () {
      function b() {}
      b.prototype.getID = z("id");
      b.prototype.setGL = function (a) {
        this.gl = a;
        if (!this.Ua()) return false;
        this.V = new c.c.u;
        return true
      };
      b.prototype.getAttribs = z("attribs");
      b.prototype.Xb = function () {
        this.gl.useProgram(this.program)
      };
      b.prototype.e = function (a, b) {
        "undefined" === typeof b && (b = void 0);
        switch (b) {
          case d.ma.oc:
            this.xg(a);
            break;
          case d.ma.Tb:
            this.zg(a);
            break;
          case d.ma.Mc:
            this.yg(a)
        }
      };
      b.prototype.xg = function (a) {
        this.Fg();
        this.Ia(a, d.ma.oc)
      };
      b.prototype.zg = function (a) {
        this.Hg();
        this.Ia(a, d.ma.Tb)
      };
      b.prototype.yg = function (a) {
        this.Gg();
        this.Ia(a, d.ma.Mc)
      };
      b.prototype.Ia = function (a, b) {
        for (var c = a.F.length, e = this.gl.viewMatrix, f = 0; f < c; ++f) {
          var l = a.mc(f);
          if (l.getDirty()) {
            var s = l.ka.ad,
              m = this.gl.Be(s),
              s = m.getFrame(s),
              n = l.getColorTransform(),
              y = l.lb,
              w = l.ka.fillMode,
              y = l.lb,
              t = m.textureWidth,
              m = m.textureHeight;
            this.V.identity();
            this.V.multiply(e);
            this.V.multiply(l.getTransform());
            var q = this.V.b,
              r = l.getUniforms(this.getID()),
              u = [];
            u[0] = 2 * Math.floor(y / 2);
            u[1] = u[0] + 1;
            y %= 2;
            void 0 === r ? (r = [], r.push(new d.D(this.o.uMVMatrix, q)), r.push(new d.D(this.o.uSamplers, u)), r.push(new d.D(this.o.uSamplerIndex, [y])),
              r.push(new d.D(this.o.uColorXformMultiplier, [n.getRedMultiplier(), n.getGreenMultiplier(), n.getBlueMultiplier(), n.getAlphaMultiplier()])), r.push(new d.D(this.o.uColorXformOffset, [n.getRedOffset() / 255, n.getGreenOffset() / 255, n.getBlueOffset() / 255, n.getAlphaOffset() / 255])), r.push(new d.D(this.o.uOverflowTypeAndPassIndex, [w, b])), r.push(new d.D(this.o.uFrame, [s.left / t, s.top / m, s.width / t, s.height / m]))) : (r[0].value = q, r[1].value = u, r[2].value = [y], r[3].value = [n.getRedMultiplier(), n.getGreenMultiplier(), n.getBlueMultiplier(), n.getAlphaMultiplier()], r[4].value = [n.getRedOffset() / 255, n.getGreenOffset() / 255, n.getBlueOffset() / 255, n.getAlphaOffset() / 255], r[5].value = [w, b], r[6].value = [s.left / t, s.top / m, s.width / t, s.height / m]);
            l.setUniforms(this.getID(), r)
          }
        }
        0 < a.F.length && this.gl.e(this, a.mc(0).ka.he, a.F)
      };
      b.prototype.Fg = function () {
        this.gl.disable(d.d.BLEND);
        this.gl.depthMask(true);
        this.gl.enable(d.d.DEPTH_TEST)
      };
      b.prototype.Hg = function () {
        this.gl.depthMask(false);
        this.gl.enable(d.d.DEPTH_TEST);
        this.gl.enable(d.d.BLEND);
        this.gl.blendFuncSeparate(d.d.SRC_ALPHA_SATURATE, d.d.ONE, d.d.ONE, d.d.ONE)
      };
      b.prototype.Gg = function () {
        this.gl.depthMask(false);
        this.gl.enable(d.d.DEPTH_TEST);
        this.gl.enable(d.d.BLEND);
        this.gl.blendFunc(d.d.ONE_MINUS_DST_ALPHA, d.d.ONE)
      };
      b.prototype.Ua =
        function () {

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
              "float t = max(1.0-float(uOverflowTypeAndPassIndex.y), 0.0); \n" +
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
                "} else if(uv.s < 0.0) { \n" +
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

          this.vertexShader = this.gl.createShader(d.d.VERTEX_SHADER, this.vertexShaderSrc);
          this.fragmentShader = this.gl.createShader(d.d.FRAGMENT_SHADER, this.fragmentShaderSrc);
          this.program = this.gl.createProgram();
          this.gl.attachShader(this.program, this.vertexShader);
          this.gl.attachShader(this.program, this.fragmentShader);
          this.id = this.gl.linkProgram(this.program);
          if (0 > this.v) return this.gl.deleteProgram(this.program), c.l.w.error("Program linking failed."), false;
          var a = this.gl.getUniformLocation(this.program, "uSamplers"),
            b = this.gl.getUniformLocation(this.program, "uSamplerIndex"),
            f = this.gl.getUniformLocation(this.program, "uColorXformMultiplier"),
            e = this.gl.getUniformLocation(this.program, "uColorXformOffset"),
            k = this.gl.getUniformLocation(this.program, "uOverflowTypeAndPassIndex"),
            l = this.gl.getUniformLocation(this.program, "uFrame"),
            s = new d.q(this.gl.getUniformLocation(this.program, "uMVMatrix"), d.d.FLOAT_MAT4, 1, d.q.Jd),
            a = new d.q(a, d.d.SAMPLER_2D, this.ao, d.q.Q),
            b = new d.q(b, d.d.INT, 1, d.q.Q),
            f = new d.q(f, d.d.FLOAT_VEC4, 1, d.q.Q),
            e = new d.q(e, d.d.FLOAT_VEC4, 1, d.q.Q),
            k = new d.q(k, d.d.INT_VEC2, 1, d.q.Q),
            l = new d.q(l, d.d.FLOAT_VEC4, 1, d.q.Q);
          this.uniforms = new d.Re([s, a, f, e, k, l]);
          this.o = {};
          this.o.uMVMatrix = s;
          this.o.uSamplers = a;
          this.o.uSamplerIndex = b;
          this.o.uColorXformMultiplier = f;
          this.o.uColorXformOffset = e;
          this.o.uOverflowTypeAndPassIndex = k;
          this.o.uFrame = l;
          a = this.gl.getAttribLocation(this.program, "aLoopBlinnTextureCoord");
          k = this.gl.getAttribLocation(this.program, "aIsConvex");
          l = this.gl.getAttribLocation(this.program, "aTextureCoord");
          s = new d.R(this.gl.getAttribLocation(this.program, "aVertexPosition"), "POSITION0", d.d.FLOAT, 2);
          a = new d.R(a, "TEXCOORD0", d.d.FLOAT, 2);
          k = new d.R(k, "TEXCOORD1", d.d.FLOAT, 1);
          l = new d.R(l, "TEXCOORD2", d.d.FLOAT, 2);
          this.attribs = new c.e.Oe([ s, a, k, l ]);
          return true
        };
      b.prototype.destroy = function () {
        this.gl.deleteShader(this.vertexShader);
        this.gl.deleteShader(this.fragmentShader);
        this.gl.deleteProgram(this.program)
      };
      return b
    }();
    d.hk = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.ik
(function (c) {
  (function (d) {
    var f = function () {
      function b() {}
      b.prototype.getID = z("id");
      b.prototype.setGL = function (a) {
        this.gl = a;
        if (!this.Ua()) return false;
        this.V = new c.c.u;
        this.N = new c.c.u;
        return true
      };
      b.prototype.getAttribs = z("attribs");
      b.prototype.Xb = function () {
        this.gl.useProgram(this.program)
      };
      b.prototype.e = function (a, b) {
        "undefined" === typeof b && (b = void 0);
        switch (b) {
          case d.ma.oc:
            this.xg(a);
            break;
          case d.ma.Tb:
            this.zg(a);
            break;
          case d.ma.Mc:
            this.yg(a)
        }
      };
      b.prototype.xg = function (a) {
        this.Fg();
        this.Ia(a, d.ma.oc)
      };
      b.prototype.zg = function (a) {
        this.Hg();
        this.Ia(a, d.ma.Tb)
      };
      b.prototype.yg = function (a) {
        this.Gg();
        this.Ia(a, d.ma.Mc)
      };
      b.prototype.Ia = function (a, b) {
        for (var c = a.F.length, e = this.gl.viewMatrix, f = 0; f < c; ++f) {
          var l = a.mc(f);
          if (l.getDirty()) {
            var s = l.ka.ad,
              m = this.gl.Be(s),
              s = m.getFrame(s),
              n = l.getColorTransform(),
              y = l.lb,
              w = l.ka.fillMode,
              y = l.lb,
              t = m.textureWidth,
              m = m.textureHeight;
            this.V.identity();
            this.V.multiply(e);
            this.V.multiply(l.getTransform());
            var q = this.V.b;
            this.N.copy(l.getTransform());
            this.N.invert();
            var r = l.getUniforms(this.getID());
            void 0 === r ? (r = [], r.push(new d.D(this.o.uMVMatrix, q)), r.push(new d.D(this.o.uMVMatrixInv, [this.N.get(0, 0), this.N.get(0, 1), this.N.get(1,
              0), this.N.get(1, 1)])), r.push(new d.D(this.o.uSampler, [y])), r.push(new d.D(this.o.uColorXformMultiplier, [n.getRedMultiplier(), n.getGreenMultiplier(), n.getBlueMultiplier(), n.getAlphaMultiplier()])), r.push(new d.D(this.o.uColorXformOffset, [n.getRedOffset() / 255, n.getGreenOffset() / 255, n.getBlueOffset() / 255, n.getAlphaOffset() / 255])), r.push(new d.D(this.o.uOverflowTypeAndPassIndex, [w, b])), r.push(new d.D(this.o.uFrame, [s.left / t, s.top / m, s.width / t, s.height / m]))) : (r[0].value = q, r[1].value = [this.N.get(0, 0), this.N.get(0, 1), this.N.get(1, 0), this.N.get(1, 1)], r[2].value = [y], r[3].value = [n.getRedMultiplier(), n.getGreenMultiplier(), n.getBlueMultiplier(), n.getAlphaMultiplier()], r[4].value = [n.getRedOffset() / 255, n.getGreenOffset() / 255, n.getBlueOffset() / 255, n.getAlphaOffset() / 255], r[5].value = [w, b], r[6].value = [s.left / t, s.top / m, s.width / t, s.height / m]);
            l.setUniforms(this.getID(), r)
          }
        }
        0 < a.F.length && this.gl.e(this, a.mc(0).ka.he, a.F)
      };
      b.prototype.Fg = function () {
        this.gl.disable(d.d.BLEND);
        this.gl.depthMask(true);
        this.gl.enable(d.d.DEPTH_TEST)
      };
      b.prototype.Hg = function () {
        this.gl.depthMask(false);
        this.gl.enable(d.d.DEPTH_TEST);
        this.gl.enable(d.d.BLEND);
        this.gl.blendFunc(d.d.ONE_MINUS_DST_ALPHA, d.d.ONE)
      };
      b.prototype.Gg = function () {
        this.gl.depthMask(false);
        this.gl.enable(d.d.DEPTH_TEST);
        this.gl.enable(d.d.BLEND);
        this.gl.blendFunc(d.d.ONE_MINUS_DST_ALPHA, d.d.ONE)
      };
      b.prototype.Ua = function () {

        this.vertexShaderSrc =
          "attribute vec2 aVertexPosition; \n" +
          "attribute vec2 aLoopBlinnTextureCoord; \n" +
          "attribute vec2 aTextureCoord; \n" +
          "attribute vec2 adfdx; \n" +
          "attribute vec2 adfdy; \n" +
          "attribute float aIsConvex; \n" +
          "uniform mat4 uMVMatrix; \n" +
          "uniform vec4 uMVMatrixInv; \n" +
          "varying vec4 vTexCoord; \n" +
          "varying float vIsConvex; \n" +
          "varying vec4 vDfDxDy; \n" +
          "void main(void) { \n" +
            "gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0); \n" +
            "vDfDxDy.xy = vec2(uMVMatrixInv.x * adfdx.x + uMVMatrixInv.y * adfdy.x, uMVMatrixInv.x * adfdx.y + uMVMatrixInv.y * adfdy.y); \n" +
            "vDfDxDy.zw = vec2(uMVMatrixInv.z * adfdx.x + uMVMatrixInv.w * adfdy.x, uMVMatrixInv.z * adfdx.y + uMVMatrixInv.w * adfdy.y); \n" +
            "vTexCoord = vec4(aLoopBlinnTextureCoord, aTextureCoord); \n" +
            "vIsConvex = aIsConvex; \n" +
          "}";

        this.fragmentShaderSrc =
          "precision mediump float; \n" +
          "varying vec4 vTexCoord; \n" +
          "varying float vIsConvex; \n" +
          "varying vec4 vDfDxDy; \n" +
          "uniform vec4 uColorXformMultiplier; \n" +
          "uniform vec4 uColorXformOffset; \n" +
          "uniform sampler2D uSampler; \n" +
          "uniform ivec2 uOverflowTypeAndPassIndex; \n" +
          "uniform vec4 uFrame; \n" +
          "void main(void) { \n" +
            "vec2 px = vDfDxDy.xy; \n" +
            "vec2 py = vDfDxDy.zw; \n" +
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
            "vec4 c = texture2D(uSampler, uv) * uColorXformMultiplier + uColorXformOffset; \n" +
            "c.a = c.a * alpha; \n" +
            "if (uOverflowTypeAndPassIndex.y != 0) { \n" +
              "c.rgb = c.rgb * c.a; \n" +
            "} \n" +
            "gl_FragColor = c; \n" +
          "}";

        this.vertexShader = this.gl.createShader(d.d.VERTEX_SHADER, this.vertexShaderSrc);
        this.fragmentShader = this.gl.createShader(d.d.FRAGMENT_SHADER, this.fragmentShaderSrc);
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.id = this.gl.linkProgram(this.program);
        if (0 > this.v) return this.gl.deleteProgram(this.program), c.l.w.error("Program linking failed."), false;
        var a = this.gl.getUniformLocation(this.program, "uMVMatrixInv"),
          b = this.gl.getUniformLocation(this.program, "uSampler"),
          f = this.gl.getUniformLocation(this.program, "uColorXformMultiplier"),
          e = this.gl.getUniformLocation(this.program, "uColorXformOffset"),
          k = this.gl.getUniformLocation(this.program, "uOverflowTypeAndPassIndex"),
          l = this.gl.getUniformLocation(this.program, "uFrame"),
          s = new d.q(this.gl.getUniformLocation(this.program, "uMVMatrix"), d.d.FLOAT_MAT4, 1, d.q.Jd),
          a = new d.q(a, d.d.FLOAT_VEC4, 1, d.q.Jd),
          b = new d.q(b, d.d.SAMPLER_2D, 1, d.q.Q),
          f = new d.q(f, d.d.FLOAT_VEC4, 1, d.q.Q),
          e = new d.q(e, d.d.FLOAT_VEC4, 1, d.q.Q),
          k = new d.q(k, d.d.INT_VEC2, 1, d.q.Q),
          l = new d.q(l, d.d.FLOAT_VEC4, 1, d.q.Q);
        this.uniforms = new d.Re([s, a, b, f, e, k, l]);
        this.o = {};
        this.o.uMVMatrix = s;
        this.o.uMVMatrixInv = a;
        this.o.uSampler = b;
        this.o.uColorXformMultiplier = f;
        this.o.uColorXformOffset = e;
        this.o.uOverflowTypeAndPassIndex = k;
        this.o.uFrame = l;
        a = this.gl.getAttribLocation(this.program, "aLoopBlinnTextureCoord");
        b = this.gl.getAttribLocation(this.program, "aIsConvex");
        e = this.gl.getAttribLocation(this.program, "aTextureCoord");
        k = this.gl.getAttribLocation(this.program, "adfdx");
        l = this.gl.getAttribLocation(this.program, "adfdy");
        s = new d.R(this.gl.getAttribLocation(this.program, "aVertexPosition"), "POSITION0", d.d.FLOAT, 2);
        a = new d.R(a, "TEXCOORD0", d.d.FLOAT, 2);
        b = new d.R(b, "TEXCOORD1", d.d.FLOAT, 1);
        e = new d.R(e, "TEXCOORD2", d.d.FLOAT, 2);
        k = new d.R(k, "TEXCOORD3", d.d.FLOAT, 2);
        l = new d.R(l, "TEXCOORD4", d.d.FLOAT, 2);
        this.attribs = new c.e.Oe([s, a, b, k, l, e]);
        return true
      };
      b.prototype.destroy = function () {
        this.gl.deleteShader(this.vertexShader);
        this.gl.deleteShader(this.fragmentShader);
        this.gl.deleteProgram(this.program);
      };
      return b
    }();
    d.ik = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.ma
// Renderer ? (non-MSAA)
(function (c) {
  (function (d) {
    var f = function () {
      function b() {
        this.fe = 0;
      }
      b.prototype.setGL = function (gl) {
        this.gl = gl;
        this.Pa = gl.hasExtension("OES_standard_derivatives") ? new d.hk : new d.ik;
        this.Ve = new d.ek;
        this.cg = new c.e.Pe;
        this.Ab = [];
        this.vg = [];
        this.fe = 0;
        this.Ue = {};
        this.We = {};
        return this.Pa.setGL(gl) ? this.Ve.setGL(gl) : false;
      };
      b.prototype.e = function (a) {
        this.rl = this.gl.eh();
        this.ld();
        this.Qg(a);
        this.nf(b.oc);
        this.Ia(b.oc, this.cg);
        for (a = 0; a < this.Ab.length; ++a) {
          var c = this.Ab[a].type;
          var d = this.Ab[a].sf;
          this.nf(c);
          this.Ia(c, d);
        }
        this.Ab.splice(0, this.Ab.length);
        this.gl.Ha(this.rl);
        a = this.gl.Wg(this.Yc);
        c = this.gl.Wg(this.Zc);
        this.Ve.Xb();
        this.Ve.e(void 0, {
          am: a,
          bm: c
        });
      };
      b.prototype.ld = function () {
        this.ne();
        this.Pa.Xb();
        var a = this.gl.getViewport();
        var b = this.Yk();
        this.Yc = this.Ue[b];
        if (this.Yc === void 0) {
          this.Yc = this.gl.wd(a.width, a.height);
          this.Ue[b] = this.Yc;
        }
        this.Zc = this.We[b];
        if (this.Zc === void 0) {
          this.Zc = this.gl.wd(a.width, a.height);
          this.We[b] = this.Zc;
        }
        this.gl.Ha(this.Yc);
        var color = this.gl.getBackgroundColor();
        this.gl.clearColor(color.red / 255, color.green / 255, color.blue / 255, color.alpha / 255);
        this.gl.clear(true, true, false);
        this.gl.Ha(this.Zc);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(true, true, false)
      };
      b.prototype.nf = function (a) {
        switch (a) {
          case b.oc:
            this.gl.Ha(this.Yc);
            break;
          case b.Tb:
          case b.Mc:
            this.gl.Ha(this.Zc);
            break;
        }
      };
      b.prototype.Ia = function (a, b) {
        if (typeof b === "undefined") { b = void 0; }
        this.Pa.e(b, a);
        if (b !== void 0) {
          b.clear();
        }
      };
      b.prototype.Qg = function (a) {
        this.fe = 0;
        var c = a.length;
        for (var f = 0; f < c; f++) {
          var e = a[f]
          for (var k = 0; k < e.ra(d.t.Z); k++) {
            var l = e.ab(d.t.Z, k, this.gl);
            if (l.getIsOpaque()) {
              this.cg.Dc(l);
            }
          }
          for (k = 0; k < e.ra(d.t.P); k++) {
            l = e.ab(d.t.P, k, this.gl);
            if (l.getIsOpaque()) {
              this.cg.Dc(l);
            }
          }
        }
        f = e = 0;
        l = [];
        while (e < c) {
          var s = a[e].getDepth();
          var m = s;
          var n = -1;
          var y = [];
          var w = [];
          var t = this.yi();
          var q = this.yi();
          for (var k = e; k < c; k++, f++) {
            var e = a[k];
            var r = e.getDepth()
            var u = false;
            var A = e.ra(d.t.Z);
            var C = e.ra(d.t.P);
            for (var v = 0; !u && v < A; ++v) {
              u = !e.ab(d.t.Z, v, this.gl).getIsOpaque();
            }
            for (v = 0; !u && v < C; ++v) {
              u = !e.ab(d.t.P, v, this.gl).getIsOpaque();
            }
            if (u) {
              n = r;
              if (m != n && (l.length > 0 || y.length > 0)) {
                if (l.length > 0) {
                  y = y.concat(l);
                }
                for (e = 0; e < y.length; ++e) {
                  t.Dc(y[e]);
                }
                this.Ab.push({
                  type: b.Tb,
                  sf: t
                });
                l = [];
                y = [];
              }
              break;
            }
            for (v = 0; v < C; v++) {
              A = e.ab(d.t.P, v, this.gl);
              l.push(A);
              var x = e.ab(d.t.bb, v, this.gl);
              if (x) {
                l.push(x);
              }
            }
            u || r == m || (0 < l.length && (y = y.concat(l)), l = [], m = r);
          }
          f == c && (-1 == n && 0 < l.length) && (y = y.concat(l), l = []);
          if (n != -1 && n == s) {
            for (k = f; k < c; ++k, ++f) {
              e = a[k];
              if (e.getDepth() != n) {
                break;
              }
              A = e.ra(d.t.Z);
              C = e.ra(d.t.P);
              for (v = 0; v < A; v++) (s = e.ab(d.t.Z, v, this.gl)) && !s.getIsOpaque() && w.push(s);
              for (v = 0; v < C; v++) A = e.ab(d.t.P, v, this.gl), x = e.ab(d.t.bb, v, this.gl), A.getIsOpaque() ? (l.push(A), x && l.push(x)) : (w.push(A), x && w.push(x))
            }
            if (0 < w.length) {
              for (e = 0; e < w.length; ++e) {
                q.Dc(w[e]);
              }
              this.Ab.push({
                type: b.Mc,
                sf: q
              })
            }
          } else if (y.length > 0) {
            for (e = 0; e < y.length; ++e) {
              t.Dc(y[e]);
            }
            this.Ab.push({
              type: b.Tb,
              sf: t
            });
          }
          e = f;
        }
        if (l.length > 0) {
          this.Ab.push({
            type: b.Tb,
            sf: t
          });
        }
      };
      b.prototype.Qi = function (a) {
        switch (a) {
          case b.oc:
            this.gl.depthMask(true);
            break;
          case b.Tb:
            this.gl.depthMask(false);
            break;
          case b.Mc:
            this.gl.depthMask(false);
            break;
        }
      };
      b.prototype.ne = function () {
        this.gl.blendFunc(d.d.SRC_ALPHA, d.d.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(d.d.BLEND);
        this.gl.depthFunc(d.d.LESS);
        this.gl.clearDepth(1);
        this.gl.depthMask(true);
        this.gl.setDepthTest(true);
      };
      b.prototype.yi = function () {
        var a = void 0;
        if (this.fe < this.vg.length) {
          a = this.vg[this.fe];
        } else {
          a = new c.e.Pe;
          this.vg.push(a);
        }
        this.fe++;
        return a;
      };
      b.prototype.Yk = function () {
        var a = this.gl.getViewport();
        return d.d.MAX_TEXTURE_SIZE * a.height + a.width;
      };
      b.prototype.destroy = function () {
        this.Pa.destroy();
        this.Ve.destroy();
        for (var a in this.Ue) {
          this.gl.ye(this.Ue[a]);
        }
        for (a in this.We) {
          this.gl.ye(this.We[a]);
        }
      };

      b.oc = 0;
      b.Tb = 1;
      b.Mc = 2;

      return b;
    }();
    d.ma = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.pk
(function (c) {
  (function (d) {
    var f = function () {
      function b() {}
      b.prototype.getID = z("id");
      b.prototype.setGL = function (a) {
        this.gl = a;
        return this.Ua() ? true : false
      };
      b.prototype.getAttribs = z("attribs");
      b.prototype.Xb = function () {
        this.gl.useProgram(this.program);
        this.gl.bindBuffer(d.d.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bindBuffer(d.d.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.useProgram(this.program);
        this.gl.disable(d.d.BLEND);
        this.gl.depthMask(false);
        this.gl.disable(d.d.DEPTH_TEST);
        this.Eg()
      };
      b.prototype.e = function (a, b) {
        "undefined" === typeof b && (b = void 0);
        this.Dg(b);
        this.gl.drawElements(this.ae.length)
      };
      b.prototype.ld = aa();
      b.prototype.Eg = function () {
        var a = 0;
        this.gl.vertexAttribPointer(0, 2, d.d.FLOAT, false, 0, 4 * a);
        this.gl.vertexAttribPointer(1, 2, d.d.FLOAT, false, 0, 4 * (a + 8))
      };
      b.prototype.Dg = function (a) {
        this.gl.uniform1i(this.bg, a)
      };
      b.prototype.Ua = function () {

        this.vertexShaderSrc =
          "attribute vec2 aVertexPosition; \n" +
          "attribute vec2 aTextureCoord; \n" +
          "varying vec2 vTextureCoord; \n" +
          "void main(void ) { \n" +
            "gl_Position = vec4(aVertexPosition, 1.0, 1.0); \n" +
            "vTextureCoord = aTextureCoord; \n" +
          "}";

        this.fragmentShaderSrc =
          "precision mediump float; \n" +
          "uniform sampler2D uColorMap; \n" +
          "varying vec2 vTextureCoord; \n" +
          "void main() { \n" +
            "vec4 color = texture2D(uColorMap, vTextureCoord); \n" +
            "if (color.a == 0.0) \n" +
              "discard; \n" +
            "color.rgb = color.rgb / color.a; \n" +
            "gl_FragColor = color; \n" +
          "}";

        this.vertexBuffer = this.gl.createBuffer();
        if (void 0 === this.vertexBuffer) return c.l.w.error("Creation of vertex buffer failed."), false;
        this.indexBuffer = this.gl.createBuffer();
        if (void 0 === this.indexBuffer) return c.l.w.error("Creation of index buffer failed."), false;
        this.vertexShader = this.gl.createShader(d.d.VERTEX_SHADER, this.vertexShaderSrc);
        this.fragmentShader = this.gl.createShader(d.d.FRAGMENT_SHADER, this.fragmentShaderSrc);
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.gl.bindBuffer(d.d.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bindBuffer(d.d.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.kc(0);
        this.gl.kc(1);
        this.gl.bindAttribLocation(this.program, 0, "aVertexPosition");
        this.gl.bindAttribLocation(this.program, 1, "aTextureCoord");
        this.id = this.gl.linkProgram(this.program);
        if (0 > this.v) return this.gl.deleteProgram(this.program), c.l.w.error("Program linking failed."), false;
        this.bg = this.gl.getUniformLocation(this.program, "uColorMap");
        this.kg = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 0, 1, 1, 0, 1]);
        this.ae = new Uint16Array([0, 1, 2, 0, 2, 3]);
        this.gl.bufferData(d.d.ARRAY_BUFFER, this.kg, d.d.STATIC_DRAW);
        this.gl.bufferData(d.d.ELEMENT_ARRAY_BUFFER, this.ae, d.d.STATIC_DRAW);
        return true
      };
      b.prototype.destroy = function () {
        this.gl.deleteBuffer(this.vertexBuffer);
        this.gl.deleteBuffer(this.indexBuffer);
        this.gl.deleteShader(this.vertexShader);
        this.gl.deleteShader(this.fragmentShader);
        this.gl.deleteProgram(this.program)
      };
      return b
    }();
    d.pk = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.rk
(function (c) {
  (function (d) {
    var f = function () {
      function b() {}
      b.prototype.setGL = function (a) {
        this.gl = a;
        this.og = new d.ma;
        var b = this.gl.getViewport();
        this.renderTarget = this.gl.wd(b.width, b.height);
        var b = this.gl.getBackgroundColor(),
          f = new c.c.Qc(0, 0, 0, 0),
          e = this.gl.Ha(this.renderTarget);
        this.gl.setBackgroundColor(f);
        this.gl.clear(true, true, false);
        this.gl.Ha(e);
        this.gl.setBackgroundColor(b);
        this.lf = new d.pk;
        return this.lf.setGL(a) ? this.og.setGL(a) : false
      };
      b.prototype.e = function (a) {
        this.ld();
        var b = this.gl.Ha(this.renderTarget);
        this.og.e(a);
        this.gl.Ha(b);
        this.lf.Xb();
        this.gl.Wg(this.renderTarget);
        this.lf.e(void 0, this.renderTarget.getID())
      };
      b.prototype.ld = function () {
        this.ne()
      };
      b.prototype.ne = aa();
      b.prototype.destroy = function () {
        this.lf.destroy();
        this.og.destroy();
        this.gl.ye(this.renderTarget)
      };
      return b
    }();
    d.rk = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.e.Hh
// Renderer
(function (c) {
  (function (d) {
    var f = function () {
      function b(canvas, options) {
        this.ctx = new c.e.d(canvas, options);
        this.rg = (options[d.d.kOption_AAType] === d.d.kAAType_MSAA) ? new d.kk : new d.ma;
        this.ie = void 0;
        this.oa = [];
      }
      b.prototype.setGL = function () {
        this.rg.setGL(this.ctx);
      };
      b.prototype.getViewport = function () {
        return this.ctx.getViewport()
      };
      b.prototype.setViewport = function (a, b) {
        if (typeof b === "undefined") { b = true; }
        this.ctx.setViewport(a, b);
      };
      b.prototype.getBackgroundColor = function () {
        return this.ctx.getBackgroundColor();
      };
      b.prototype.setBackgroundColor = function (a) {
        this.ctx.setBackgroundColor(a);
      };
      b.prototype.depthMask = function (a) {
        this.ctx.depthMask(a);
      };
      b.prototype.depthFunc = function (a) {
        this.ctx.depthFunc(a);
      };
      b.prototype.clearDepth = function (a) {
        this.ctx.clearDepth(a);
      };
      b.prototype.setDepthTest = function (a) {
        this.ctx.setDepthTest(a);
      };
      b.prototype.blendFunc = function (a, b) {
        this.ctx.blendFunc(a, b);
      };
      b.prototype.clear = function (a, b, c) {
        if (typeof b === "undefined") { b = false; }
        if (typeof c === "undefined") { c = false; }
        this.ctx.clear(a, b, c);
      };
      b.prototype.enable = function (a) {
        this.ctx.enable(a);
      };
      b.prototype.disable = function (a) {
        this.ctx.disable(a);
      };
      b.prototype.scissor = function (a) {
        this.ctx.scissor(a);
      };
      b.prototype.ij = function (a) {
        if (typeof a === "undefined") { a = b.Hj; }
        switch (a) {
          case b.Hj:
            this.Kg = this.rg;
            break;
          case b.Gj:
            if (this.ie === void 0) {
              this.ie = new d.rk;
              this.ie.setGL(this.ctx);
            }
            this.Kg = this.ie;
            break;
        }
      };
      b.prototype.lj = function () {
        this.me();
        this.Kg.e(this.oa);
        for (var i = 0; i < this.oa.length; i++) {
          this.oa[i].setDirty(false);
        }
        this.oa.length = 0;
      };
      b.prototype.e = function (a) {
        this.oa.push(a);
      };
      b.prototype.wd = function (a, b) {
        return this.ctx.wd(a, b);
      };
      b.prototype.Ha = function (a) {
        return this.ctx.Ha(a);
      };
      b.prototype.eh = function () {
        return this.ctx.eh();
      };
      b.prototype.ye = function (a) {
        this.ctx.ye(a);
      };
      b.prototype.loadTextures = function (a, b) {
        this.ctx.loadTextures(a, b);
      };
      b.prototype.hasExtension = function (a) {
        return this.ctx.hasExtension(a);
      };
      b.prototype.flush = function () {
        this.ctx.flush();
      };
      b.prototype.destroy = function () {
        this.rg.destroy();
        this.ie.destroy();
        this.ctx.destroy();
        delete this.Kg;
        delete this.H;
      };
      b.prototype.me = aa();
      b.Hj = 0;
      b.Gj = 1;
      return b
    }();
    d.Hh = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.c.Md
// flwebgl.geom.Md
// QuadTree ?
(function (c) {
  (function (d) {
    var f = function () {
      function b(a, b) {
        this.position = a;
        this.size = b;
        this.isFull = false;
        this.children = [];
      }
      b.prototype.fits = function (size) {
        if (size > this.size || this.isFull) { return false; }
        if (size > this.size / 2) { return (this.children.length === 0); }
        if (this.children.length === 0) { return true; }
        for (var b = 0; b < 4; b++) {
          if (this.children[b].fits(size)) {
            return true;
          }
        }
        return false;
      };
      b.prototype.insert = function (size) {
        if (size <= this.size && !this.isFull) {
          var b = void 0;
          if (size > this.size / 2) {
            if (this.children.length === 0) {
              b = this.position;
              this.isFull = true;
            }
          } else {
            if (this.children.length === 0) {
              this.createQuads();
            }
            for (var i = 0; i < 4; i++) {
              b = this.children[i].insert(size);
              if (b !== void 0) {
                break;
              }
            }
          }
          return b;
        }
      };
      b.prototype.remove = function (position) {
        var b = position.x - this.position.x;
        var c = position.y - this.position.y;
        if (b < 0 || b >= this.size || c < 0 || c >= this.size) { return false; }
        if (this.isFull) {
          if (b === 0 && c === 0) {
            this.isFull = false;
            return true;
          } else {
            return false;
          }
        }
        if (this.children.length === 0) {
          return false;
        }
        var e = 0;
        if (b >= this.size / 2) { e++; }
        if (c >= this.size / 2) { e += 2; }
        if (this.children[e].remove(position)) {
          for (b = 0; b < 4; b++) {
            if (!this.children[b].Im()) {
              return false;
            }
          }
        }
        this.children.length = 0;
        return true;
      };
      b.prototype.createQuads = function () {
        var a = this.size / 2;
        this.children.push(new c.c.Md(new c.c.k(this.position.x,     this.position.y    ), a));
        this.children.push(new c.c.Md(new c.c.k(this.position.x + a, this.position.y    ), a));
        this.children.push(new c.c.Md(new c.c.k(this.position.x,     this.position.y + a), a));
        this.children.push(new c.c.Md(new c.c.k(this.position.x + a, this.position.y + a), a));
      };
      b.prototype.Im = function () {
        return !this.isFull && this.children.length === 0;
      };
      return b
    }();
    d.Md = f
  })(c.c || (c.c = {}))
})(N || (N = {}));

// flwebgl.e.zk
(function (c) {
  (function (d) {
    var f = function () {
      function b(a, b) {
        this.renderTarget = a;
        this.qe = b;
        this.ol = 0;
        this.uc = {};
        this.tree = new c.c.Md(new c.c.k(0, 0), d.d.MAX_TEXTURE_SIZE);
      }
      b.prototype.fits = function (width, height) {
        var w = c.l.U.nextPowerOfTwo(width);
        var h = c.l.U.nextPowerOfTwo(height);
        return this.tree.fits(Math.max(w, h, b.MIN_TEXTURE_SIZE))
      };
      b.prototype.insert = function (width, height) {
        var w = c.l.U.nextPowerOfTwo(width);
        var h = c.l.U.nextPowerOfTwo(height);
        var f = this.tree.insert(Math.max(w, h, b.MIN_TEXTURE_SIZE));
        if (f !== void 0) {
          f = new c.c.M(f.x, f.y, width, height);
          e = c.l.U.em(this.qe.getID(), this.ol++);
          this.qe.setFrame(e, f);
          return e;
        }
      };
      b.prototype.remove = function (a) {
        a = this.qe.getFrame(a);
        if (a !== void 0) {
          this.tree.remove(new c.c.k(a.left, a.top));
        }
      };
      b.prototype.getFrame = function (a) {
        return this.qe.getFrame(a);
      };
      b.prototype.Cd = function () {
        return this.renderTarget.getID();
      };
      b.prototype.mn = function (a, b, color) {
        if (this.uc[b] === void 0) {
          this.uc[b] = {
            color: color,
            Xj: []
          };
        }
        b = this.uc[b].Xj;
        for (var i = 0; i < a.length; i++) {
          b.push(a[i]);
        }
      };
      b.prototype.pn = function (a) {
        if (Object.keys(this.uc).length !== 0) {
          var b = a.getBackgroundColor();
          var f = a.Ha(this.renderTarget);
          a.enable(d.d.SCISSOR_TEST);
          for (var e in this.uc) {
            var k = this.uc[e];
            var frame = this.qe.getFrame(e);
            var l = new c.c.M(frame.left, frame.top, frame.width, frame.height);
            l.width = c.l.U.nextPowerOfTwo(l.width);
            l.height = c.l.U.nextPowerOfTwo(l.height);
            a.scissor(l);
            a.setBackgroundColor(k.color);
            a.ij(d.Hh.Gj);
            var k = k.Xj;
            var len = k.length;
            for (var s = 0; s < len; ++s) {
              k[s].setDepth(s / len);
              a.e(k[s], 1);
            }
            a.lj();
          }
          a.disable(d.d.SCISSOR_TEST);
          this.uc = {};
          a.Ha(f);
          a.setBackgroundColor(b);
        }
      };
      b.MIN_TEXTURE_SIZE = 64;
      return b
    }();
    d.zk = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

(function (c) {
  (function (d) {

    // flwebgl.e.wk
    var f = function () {
      function b(a, b, d, e, f, l) {
        this.Nl = a;
        this.mesh = b;
        this.$n = d;
        this.color = e;
        this.hc = f.clone();
        this.colorTransform = (l !== void 0) ? l.clone() : new c.c.p;
        this.ug = 0
      }
      b.prototype.Cd = z("Nl");
      b.prototype.getMesh = z("yc");
      b.prototype.getColor = z("color");
      b.prototype.getTransform = z("hc");
      b.prototype.getColorTransform = z("dg");
      b.prototype.Vl = function () {
        this.ug++;
      };
      b.prototype.Wj = function () {
        this.ug--;
      };
      return b
    }();
    d.wk = f;

    // flwebgl.e.vk
    f = function () {
      function b() {
        this.Mb = void 0;
      }
      b.prototype.In = function (a) {
        if (this.Mb !== void 0) {
          this.Mb.Wj();
        }
        this.Mb = a;
        if (this.Mb !== void 0) {
          this.Mb.Vl();
        }
      };
      b.prototype.getColorTransform = function () {
        return this.Mb.getColorTransform();
      };
      b.prototype.Hn = g("Da");
      b.prototype.setTransforms = function (a) {
        this.shape.setTransforms(a, void 0);
      };
      b.prototype.Qb = function (a) {
        this.shape.Qb(a);
      };
      b.prototype.destroy = function () {
        if (this.Mb !== void 0) {
          this.Mb.Wj();
          this.Mb = void 0;
        }
        if (this.shape !== void 0) {
          this.shape.destroy();
          this.shape = void 0;
        }
      };
      return b;
    }();
    d.vk = f

  })(c.e || (c.e = {}))
})(N || (N = {}));

(function (c) {
  (function (d) {

    // flwebgl.e.yk
    var f = function () {
      function b(displayObject, color, colorTransform, e) {
        this.displayObject = displayObject;
        this.color = color;
        this.colorTransform = colorTransform;
        this.pa = e;
      }
      b.prototype.getColor = z("color");
      return b
    }();
    d.yk = f;

    // flwebgl.e.xk
    f = function () {
      function b(gl, assetPool, scenegraphFactory) {
        this.eo = new c.c.p;
        this.gl = gl;
        this.assetPool = assetPool;
        this.scenegraphFactory = scenegraphFactory;
        this.oa = [];
        this.wc = [];
        this.nl = 1;
        this.Yb = {};
        this.gi = 0;
        this.ce = {}
      }
      b.prototype.nn = function (a) {
        if (a.displayObject === void 0 || a.getColor() === void 0 || a.pa === void 0) {
          return false;
        }
        this.wc.push(a);
        return true;
      };
      b.prototype.Qn = function () {
        var a = this.wc.length;
        if (a !== 0) {
          for (var b = 0; b < a; ++b) {
            var f = this.wc[b].displayObject;
            var e = this.wc[b].getColor();
            var k = this.wc[b].colorTransform;
            var l = this.wc[b].pa;
            var s = f.getGlobalTransform().clone();
            var m = f.getGlobalColorTransform();
            var n = this.Ik(f);
            var m = this.Qk(f.Ic().getID(), e, n, m);
            if (m === void 0) {
              m = this.pa(f, e, n, k);
            } else {
              this.ml(f);
            }
            if (m !== void 0) {
              l.In(m);
              e = this.scenegraphFactory.createShape(m.getMesh().getID(), this.scenegraphFactory.rm());
              l.Hn(e);
              l.setTransforms(s);
              f.$j(l);
            } else {
              f.$j(void 0);
              l.destroy();
            }
          }
          this.wc.length = 0;
          var viewport = this.gl.getViewport();
          var texMax = new c.c.M(0, 0, d.d.MAX_TEXTURE_SIZE, d.d.MAX_TEXTURE_SIZE);
          this.gl.setViewport(texMax, false);
          for (var y in this.Yb) {
            this.Yb[y].pn(this.gl);
          }
          this.gl.setViewport(viewport);
        }
      };
      b.prototype.Qk = function (a, b, c, e) {
        a = this.ce[a];
        if (a !== void 0) {
          for (var d = 0; d < a.length; ++d) {
            var f = a[d];
            if (f.getColor().equals(b) && this.el(c, f.getTransform()) && f.getColorTransform().equals(e)) {
              return f;
            }
          }
        }
      };
      b.prototype.ml = function (a) {
        var b = [];
        a = a.getChildren();
        for (var c = 0; c < a.length; ++c) {
          a[c].Qb(b);
        }
        for (c = 0; c < b.length; ++c) {
          b[c].setDirty(false);
        }
      };
      b.prototype.el = function (a, b) {
        return a.get(0, 0) != b.get(0, 0) || a.get(0, 1) != b.get(0, 1) || a.get(1, 0) != b.get(1, 0) || a.get(1, 1) != b.get(1, 1) ? false : true
      };
      b.prototype.pa = function (displayObject, color, transform, colorTransform) {
        var f = c.l.U.sm(displayObject);
        var l = displayObject.getLocalTransform().clone();
        l.invert();
        displayObject.setTransforms(l, colorTransform);
        var s = displayObject;
        while (s.getParent()) { s = s.getParent(); }
        var m = displayObject.getBounds(s, false, c.e.t.bb, true);
        if (m.left && !isNaN(m.left)) {
          m.left = Math.floor(m.left);
          m.top = Math.floor(m.top);
          m.width = Math.ceil(m.width);
          m.height = Math.ceil(m.height);
          var s = transform.clone();
          var n = s.transformBoundsAABB(m);
          var y = this.Rk(n.width, n.height);
          if (y === void 0) {
            displayObject.setTransforms(f, colorTransform);
          } else {
            var w = y.insert(n.width, n.height);
            if (w === void 0) {
              displayObject.setTransforms(f, colorTransform);
            } else {
              f = this.Tk(m, s, y.Cd(), w, color.alpha === 255);
              if (f === void 0) {
                y.remove(w);
              } else {
                n = this.ce[displayObject.Ic().getID()];
                if (n === void 0) {
                  n = [];
                  this.ce[displayObject.Ic().getID()] = n;
                }
                var d = new c.e.wk(y.Cd(), f, displayObject.Ic().getID(), color, transform, displayObject.getGlobalColorTransform());
                n.push(d);
                n = y.getFrame(w);
                s.multiply(l);
                var tx = s.get(0, 3);
                var ty = s.get(1, 3);
                s.translate(n.left + (tx - Math.floor(tx)), n.top + (ty - Math.floor(ty)));
                displayObject.setTransforms(s, colorTransform);
                displayObject.Qb(this.oa);
                y.mn(this.oa, w, color);
                this.oa.length = 0;
                return d;
              }
            }
          }
        }
      };
      b.prototype.Ik = function (a) {
        return a.getGlobalTransform().clone();
      };
      // cacheAsBitmap ?
      b.prototype.Rk = function (width, height) {
        var k = void 0;
        var f = this.gl.ctx;
        var e = d.d.MAX_TEXTURE_SIZE;
        if (width <= e && height <= e) {
          for (var i = 0; i < 2; i++) {
            for (var s in this.Yb) {
              if (this.Yb[s].fits(width, height)) {
                k = this.Yb[s];
                break;
              }
            }
            if (k === void 0 && this.gi < this.nl) {
              var m = this.gl.wd(e, e);
              if (m !== void 0) {
                var n = f.getTextureAtlas(m.getID());
                if (n !== void 0) {
                  k = new c.e.zk(m, n);
                  this.Yb[k.Cd()] = k;
                  this.gi++;
                }
              }
            }
            if (k === void 0 && i === 0) {
              this.Jk();
            }
            if (k !== void 0) {
              break;
            }
          }
          return k;
        }
      };
      b.prototype.Jk = function () {
        for (var a in this.ce)
          for (var b = this.ce[a], c = b.length - 1; 0 <= c; --c) {
            var e = b[c];
            if (0 === e.ug) {
              for (var f = e.getMesh(), l = f.ra(d.t.Z), s = 0; s < l; ++s) {
                var m = f.yf(d.t.Z, s);
                void 0 !== this.Yb[e.Cd()] && this.Yb[e.Cd()].remove(m.ad)
              }
              b.splice(c, 1)
            }
          }
      };
      b.prototype.Tk = function (a, b, d, e, f) {
        if (a !== void 0 && d !== void 0 && e !== void 0) {
          var l = new c.e.t(this.assetPool.getNextAvailableAssetID());
          var s = this.gl.ctx.hasExtension("OES_standard_derivatives") ? 7 : 11;
          a = this.Xk(s, a, b);
          d = this.Sk(a.ba, a.Ma, s, d, e, f);
          l.Nb(c.e.t.Z, d[0]);
          if (d.length > 1) {
            l.Nb(c.e.t.P, d[1]);
          }
          if (d.length > 2) {
            l.Nb(c.e.t.bb, d[2]);
          }
          l.calculateBounds();
          this.assetPool.setMesh(l);
          return l;
        }
      };
      b.prototype.Sk = function (a, b, f, e, k, l) {
        var m = [];
        var s = new c.e.di;
        var n = new c.e.na(0, "POSITION0", c.e.d.FLOAT, 2);
        var y = new c.e.na(2 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD0", c.e.d.FLOAT, 2);
        var w = new c.e.na(4 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD1", c.e.d.FLOAT, 1);
        var t = new c.e.na(5 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD2", c.e.d.FLOAT, 2);
        s.attrs = [n, y, w, t];
        if (f == 11) {
          var t = new c.e.na(5 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD2", c.e.d.FLOAT, 2);
          var q = new c.e.na(7 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD3", c.e.d.FLOAT, 2);
          var r = new c.e.na(9 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD4", c.e.d.FLOAT, 2);
          s.attrs = [n, y, w, t, q, r];
        }
        s.totalSize = f * Float32Array.BYTES_PER_ELEMENT;
        f = new d.Pd(a[0], s);
        n = new d.ca(k, l);
        n.setFillMode(c.e.ca.fillModeMap[c.e.ca.kFill_Repeat]);
        n.xe(e, [f]);
        n.we(b[0]);
        m[0] = n;
        if (a.length > 1) {
          f = new d.Pd(a[1], s);
          n = new d.ca(k, l);
          n.setFillMode(c.e.ca.fillModeMap[c.e.ca.kFill_Repeat]);
          n.xe(e, [f]);
          n.we(b[1]);
          m[1] = n;
        }
        if (a.length > 2) {
          a = new d.Pd(a[2], s);
          k = new d.ca(k, l);
          k.setFillMode(c.e.ca.fillModeMap[c.e.ca.kFill_Repeat]);
          k.xe(e, [a]);
          k.we(b[2]);
          m[2] = k;
        }
        return m;
      };
      b.prototype.Xk = function (a, rect, d) {
        var e = new c.c.k(rect.left, rect.top);
        var f = new c.c.k(rect.left + rect.width, rect.top);
        var l = new c.c.k(rect.left + rect.width, rect.top + rect.height);
        var b = new c.c.k(rect.left, rect.top + rect.height);

        var s = new c.c.k((e.x + f.x + b.x) / 3, (e.y + f.y + b.y) / 3),
            m = new c.c.k((l.x + f.x + b.x) / 3, (l.y + f.y + b.y) / 3),
            n = new c.c.k(e.x - 1, e.y),
            y = new c.c.k(b.x - 1, b.y),
            w = new c.c.k(e.x, e.y - 1),
            t = new c.c.k(f.x, f.y - 1),
            q = new c.c.k(f.x + 1, f.y),
            r = new c.c.k(l.x + 1, l.y),
            u = new c.c.k(b.x, b.y + 1),
            A = new c.c.k(l.x, l.y + 1),

            C = d.transformPoint(e),
            v = d.transformPoint(f),
            x = d.transformPoint(l),
            B = d.transformPoint(b),

            I = d.transformPoint(s),
            K = d.transformPoint(m),
            T = d.transformPoint(n),
            X = d.transformPoint(y),
            U = d.transformPoint(w),
            L = d.transformPoint(t),
            R = d.transformPoint(q),
            H = d.transformPoint(r),
            F = d.transformPoint(u),
            W = d.transformPoint(A),

            J = Math.min(C.x, v.x, x.x, B.x),
            M = Math.min(C.y, v.y, x.y, B.y),
            O = Math.max(C.x, v.x, x.x, B.x) - J,
            E = Math.max(C.y, v.y, x.y, B.y) - M,
            G = J - Math.floor(J),
            D = M - Math.floor(M);
        C.x = (C.x - J + G) / O;
        C.y = (C.y - M + D) / E;
        v.x = (v.x - J + G) / O;
        v.y = (v.y - M + D) / E;
        x.x = (x.x - J + G) / O;
        x.y = (x.y - M + D) / E;
        B.x = (B.x - J + G) / O;
        B.y = (B.y - M + D) / E;
        I.x = (I.x - J + G) / O;
        I.y = (I.y - M + D) / E;
        K.x = (K.x - J + G) / O;
        K.y = (K.y - M + D) / E;
        T.x = (T.x - J + G) / O;
        T.y = (T.y - M + D) / E;
        X.x = (X.x - J + G) / O;
        X.y = (X.y - M + D) / E;
        U.x = (U.x - J + G) / O;
        U.y = (U.y - M + D) / E;
        L.x = (L.x - J + G) / O;
        L.y = (L.y - M + D) / E;
        R.x = (R.x - J + G) / O;
        R.y = (R.y - M + D) / E;
        H.x = (H.x - J + G) / O;
        H.y = (H.y - M + D) / E;
        F.x = (F.x - J + G) / O;
        F.y = (F.y - M + D) / E;
        W.x = (W.x - J + G) / O;
        W.y = (W.y - M + D) / E;
        d.translate(-J, -M);

        if (a === 7) {
          a = new Float32Array([
            b.x, b.y, 0, 1, 1E4, B.x, B.y,
            s.x, s.y, 0, 1, 1E4, I.x, I.y,
            f.x, f.y, 0, 1, 1E4, v.x, v.y,
            b.x, b.y, 0, 1, 1E4, B.x, B.y,
            m.x, m.y, 0, 1, 1E4, K.x, K.y,
            f.x, f.y, 0, 1, 1E4, v.x, v.y
          ]);
          d = new Uint16Array([0, 1, 2, 3, 4, 5]);
          s = new Float32Array([
            b.x, b.y, 0, 0, 1, B.x, B.y,
            e.x, e.y, 0, 0, 1, C.x, C.y,
            s.x, s.y, 0, 1, 1, I.x, I.y,
            e.x, e.y, 0, 0, 1, C.x, C.y,
            s.x, s.y, 0, 1, 1, I.x, I.y,
            f.x, f.y, 0, 0, 1, v.x, v.y,
            f.x, f.y, 0, 0, 1, v.x, v.y,
            m.x, m.y, 0, 1, 1, K.x, K.y,
            l.x, l.y, 0, 0, 1, x.x, x.y,
            l.x, l.y, 0, 0, 1, x.x, x.y,
            m.x, m.y, 0, 1, 1, K.x, K.y,
            b.x, b.y, 0, 0, 1, B.x, B.y
          ]);
          m = new Uint16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
          e = new Float32Array([
            n.x, n.y, 0, 1, -1, T.x, T.y,
            e.x, e.y, 0, 0, -1, C.x, C.y,
            b.x, b.y, 0, 0, -1, B.x, B.y,
            y.x, y.y, 0, 1, -1, X.x, X.y,
            n.x, n.y, 0, 1, -1, T.x, T.y,
            b.x, b.y, 0, 0, -1, B.x, B.y,
            w.x, w.y, 0, 1, -1, U.x, U.y,
            e.x, e.y, 0, 0, -1, C.x, C.y,
            f.x, f.y, 0, 0, -1, v.x, v.y,
            t.x, t.y, 0, 1, -1, L.x, L.y,
            w.x, w.y, 0, 1, -1, U.x, U.y,
            f.x, f.y, 0, 0, -1, v.x, v.y,
            q.x, q.y, 0, 1, -1, R.x, R.y,
            f.x, f.y, 0, 0, -1, v.x, v.y,
            r.x, r.y, 0, 1, -1, x.x, x.y,
            r.x, r.y, 0, 1, -1, H.x, H.y,
            l.x, l.y, 0, 0, -1, x.x, x.y,
            f.x, f.y, 0, 0, -1, v.x, v.y,
            u.x, u.y, 0, 1, -1, F.x, F.y,
            b.x, b.y, 0, 0, -1, B.x, B.y,
            l.x, l.y, 0, 0, -1, x.x, x.y,
            A.x, A.y, 0, 1, -1, W.x, W.y,
            u.x, u.y, 0, 1, -1, F.x, F.y,
            l.x, l.y, 0, 0, -1, x.x, x.y
          ]);
        } else {
          a = new Float32Array([
            b.x, b.y, 0, 1, 1E4, B.x, B.y, 0, 0, 0, 0,
            s.x, s.y, 0, 1, 1E4, I.x, I.y, 0, 0, 0, 0,
            f.x, f.y, 0, 1, 1E4, v.x, v.y, 0, 0, 0, 0,
            b.x, b.y, 0, 1, 1E4, B.x, B.y, 0, 0, 0, 0,
            m.x, m.y, 0, 1, 1E4, K.x, K.y, 0, 0, 0, 0,
            f.x, f.y, 0, 1, 1E4, v.x, v.y, 0, 0, 0, 0
          ]);
          d = new Uint16Array([0, 1, 2, 3, 4, 5]);
          s = new Float32Array([
            b.x, b.y, 0, 0, 1, B.x, B.y, 0, 0, 0, 0,
            e.x, e.y, 0, 0, 1, C.x, C.y, 0, 0, 0, 0,
            s.x, s.y, 0, 1, 1, I.x, I.y, 0, 0, 0, 0,
            e.x, e.y, 0, 0, 1, C.x, C.y, 0, 0, 0, 0,
            s.x, s.y, 0, 1, 1, I.x, I.y, 0, 0, 0, 0,
            f.x, f.y, 0, 0, 1, v.x, v.y, 0, 0, 0, 0,
            f.x, f.y, 0, 0, 1, v.x, v.y, 0, 0, 0, 0,
            m.x, m.y, 0, 1, 1, K.x, K.y, 0, 0, 0, 0,
            l.x, l.y, 0, 0, 1, x.x, x.y, 0, 0, 0, 0,
            l.x, l.y, 0, 0, 1, x.x, x.y, 0, 0, 0, 0,
            m.x, m.y, 0, 1, 1, K.x, K.y, 0, 0, 0, 0,
            b.x, b.y, 0, 0, 1, B.x, B.y, 0, 0, 0, 0
          ]);
          m = new Uint16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
          e = new Float32Array([
            n.x, n.y, 0, 1, -1, T.x, T.y, 0, 0, 0, 0,
            e.x, e.y, 0, 0, -1, C.x, C.y, 0, 0, 0, 0,
            b.x, b.y, 0, 0, -1, B.x, B.y, 0, 0, 0, 0,
            y.x, y.y, 0, 1, -1, X.x, X.y, 0, 0, 0, 0,
            n.x, n.y, 0, 1, -1, T.x, T.y, 0, 0, 0, 0,
            b.x, b.y, 0, 0, -1, B.x, B.y, 0, 0, 0, 0,
            w.x, w.y, 0, 1, -1, U.x, U.y, 0, 0, 0, 0,
            e.x, e.y, 0, 0, -1, C.x, C.y, 0, 0, 0, 0,
            f.x, f.y, 0, 0, -1, v.x, v.y, 0, 0, 0, 0,
            t.x, t.y, 0, 1, -1, L.x, L.y, 0, 0, 0, 0,
            w.x, w.y, 0, 1, -1, U.x, U.y, 0, 0, 0, 0,
            f.x, f.y, 0, 0, -1, v.x, v.y, 0, 0, 0, 0,
            q.x, q.y, 0, 1, -1, R.x, R.y, 0, 0, 0, 0,
            f.x, f.y, 0, 0, -1, v.x, v.y, 0, 0, 0, 0,
            r.x, r.y, 0, 1, -1, x.x, x.y, 0, 0, 0, 0,
            r.x, r.y, 0, 1, -1, H.x, H.y, 0, 0, 0, 0,
            l.x, l.y, 0, 0, -1, x.x, x.y, 0, 0, 0, 0,
            f.x, f.y, 0, 0, -1, v.x, v.y, 0, 0, 0, 0,
            u.x, u.y, 0, 1, -1, F.x, F.y, 0, 0, 0, 0,
            b.x, b.y, 0, 0, -1, B.x, B.y, 0, 0, 0, 0,
            l.x, l.y, 0, 0, -1, x.x, x.y, 0, 0, 0, 0,
            A.x, A.y, 0, 1, -1, W.x, W.y, 0, 0, 0, 0,
            u.x, u.y, 0, 1, -1, F.x, F.y, 0, 0, 0, 0,
            l.x, l.y, 0, 0, -1, x.x, x.y, 0, 0, 0, 0
          ]);
        }
        f = new Uint16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
        return {
          ba: [a, s, e],
          Ma: [d, m, f]
        };
      };
      return b;
    }();
    d.xk = f
  })(c.e || (c.e = {}))
})(N || (N = {}));

// flwebgl.nk
// flwebgl.Context
(function (c) {
  var d = function () {
    function c(gl, a, soundFactory) {
      this.gl = gl;
      this.assetPool = a;
      this.nd = void 0;
      this.scenegraphFactory = void 0;
      this.soundFactory = soundFactory;
      this.stage = void 0;
    }
    c.prototype.setScenegraphFactory = g("scenegraphFactory");
    c.prototype.Jn = g("nd");
    c.prototype.setStage = g("stage");
    c.prototype.getStage = z("stage");
    return c;
  }();
  c.nk = d
})(N || (N = {}));

// flwebgl.media.Nd
// flwebgl.media.SoundFactory
(function (c) {
  (function (d) {
    var f = function () {
      function b() {
        this.jg = 0;
        this.Mi = 0;
        this.od = [];
        this.$c = [];
      }
      b.prototype.kn = function (a, c, d) {
        if (this.cf(a) !== false) {
          if (d > 0) { d--; }
          d = { loop: d }
          if (c === b.Sh){
            a = this.zi(a, c);
            a.play(d);
          } else {
            if (c === b.Th) {
              if (!this.gl_(a)) {
                a = this.zi(a, c);
                a.play(d);
              }
            } else {
              if (c === b.uk) {
                this.Kl(a);
              }
            }
          }
        }
      };
      b.prototype.loadSounds = function (sounds, soundsLoadedCallback) {
        this.nb = sounds;
        this.Mi = sounds.length;
        this.Ni = soundsLoadedCallback;
        this.loadSoundJS(c.l.U.bind(this, "_scriptLoadedCBK"))
      };
      b.prototype.destroy = function () {
        createjs.Sound.removeAllSounds();
        this.nb && delete this.nb;
        this.$c && delete this.$c;
        this.od && delete this.od;
      };
      b.prototype.lg = function (id) {
        for (var i = 0; i < this.$c.length; i++) {
          if (this.$c[i].soundId === id) {
            return this.$c[i].instances;
          }
        }
      };
      b.prototype.mg = function (id) {
        for (var i = 0; i < this.od.length; i++) {
          if (this.od[i].soundId === id) {
            return this.od[i].instance;
          }
        }
      };
      b.prototype.zi = function (a, c) {
        var d;
        if (c === b.Sh) { // 0
          var e = this.lg(a);
          if (e !== void 0) {
            for (d = 0; d < e.length; d++) {
              if (!this.ee(e[d])) {
                return e[d];
              }
            }
            d = createjs.Sound.createInstance(a);
            e.push(d);
          } else {
            e = [];
            d = createjs.Sound.createInstance(a);
            e.push(d);
            this.$c.push({
              soundId: a,
              instances: e
            });
          }
        } else if (c === b.Th) { // 1
          d = this.mg(a);
          if (d) {
            return d;
          }
          d = createjs.Sound.createInstance(a);
          this.od.push({
            soundId: a,
            instance: d
          });
        }
        return d;
      };
      b.prototype.ee = function (a) {
        return (a.playState === createjs.Sound.PLAY_SUCCEEDED || a.playState === createjs.Sound.PLAY_INITED);
      };
      b.prototype.gl_ = function (a) {
        var b = this.mg(a);
        if (b && this.ee(b)) return true;
        a = this.lg(a);
        if (void 0 !== a)
          for (b = 0; b < a.length; b++)
            if (this.ee(a[b])) return true;
        return false
      };
      b.prototype.Kl = function (a) {
        var b = this.lg(a);
        if (void 0 !== b)
          for (var c = 0; c < b.length; c++) this.ee(b[c]) && b[c].stop();
        (a = this.mg(a)) && this.ee(a) && a.stop()
      };
      b.prototype.cf = function (a) {
        for (var b = 0; b < this.nb.length; b++)
          if (this.nb[b].getID().toString() === a) return this.nb[b].cf;
        return false
      };
      b.prototype._soundLoadedCBK = function () {
        if (--this.Mi - this.jg === 0) {
          this.Ni();
        }
      };
      b.prototype.loadSoundJS = function (callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {
          script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
              script.onreadystatechange = null;
              callback();
            }
          };
        } else {
          script.onload = function () {
            callback();
          };
        }
        script.src = "libs/soundjs-0.5.2.min.js";
        document.getElementsByTagName("head")[0].appendChild(script);
      };
      b.prototype._scriptLoadedCBK = function () {
        createjs.Sound.addEventListener("fileload", c.l.U.bind(this, "_soundLoadedCBK"));
        for (var a = 0; a < this.nb.length; a++) createjs.Sound.registerSound(this.nb[a].Jl, this.nb[a].getID().toString()) ? this.nb[a].Bn() : this.jg++;
        this.jg === this.nb.length && this.Ni()
      };
      b.Sh = 0;
      b.Th = 1;
      b.uk = 2;
      return b
    }();
    d.Nd = f
  })(c.media || (c.media = {}))
})(N || (N = {}));

// flwebgl.g.Qe
// flwebgl.sg.SceneGraphFactory
(function (c) {
  (function (d) {
    var f = function () {
      function b(context, b) {
        this.context = context;
        this.pl = b;
      }
      b.prototype.createMovieClipInstance = function (linkageName) {
        var a = this.context.assetPool.getTimelineByName(linkageName);
        return (a === void 0 || a.isScene) ? void 0 : this.createMovieClip(a.getID(), -1);
      };
      b.prototype.createShape = function (a, b) {
        var shape = new flwebgl.g.Shape();
        shape.Of(this.context.assetPool.getMesh(a));
        shape.setID(b);
        return shape;
      };
      b.prototype.createMovieClip = function (a, b) {
        var mc = new flwebgl.g.MovieClip();
        mc.setContext(this.context);
        if (a !== void 0) {
          mc.Of(this.context.assetPool.getTimeline(a));
        }
        mc.setID(b);
        return mc;
      };
      b.prototype.rm = function () {
        return this.pl++;
      };
      return b
    }();
    d.Qe = f
  })(c.g || (c.g = {}))
})(N || (N = {}));
window.flwebgl = N;
N.sg = N.g;
N.g.SceneGraphFactory = N.g.Qe;

// flwebgl.Player
(function (c) {
  var d = function () {
    function d() {
      this.assetPool = new c.l.tk;
      this.mainLoop = c.l.U.bind(this, "_loop");
      this.playMode = d.kIsStopped;
      this.frameRenderListener = void 0;
      this.stageWidth = 550;
      this.stageHeight = 400;
      this.options = [];
      this.rc = -1;
      this.jd = true;
      this.numFrames = 0;
      this.soundsLoaded = false;
      this.texturesLoaded = false;
    }
    d.prototype.init = function (canvas, content, textures, callback, options) {
      if (!canvas || !content) {
        return d.E_INVALID_PARAM;
      }
      options = options || {};
      options[d.jh] = false;
      if (typeof options[d.kOption_LogErrors] === "undefined") { options[d.kOption_LogErrors] = false; }
      if (typeof options[d.kOption_Caching] === "undefined") { options[d.kOption_Caching] = true; }
      if (typeof options[d.kOption_CacheAsBitmap] === "undefined") { options[d.kOption_CacheAsBitmap] = true; }
      if (typeof options[d.kOption_AAType] === "undefined") { options[d.kOption_AAType] = d.kAAType_ImageSpace; }
      this.options = options;
      this.canvas = canvas;
      try {
        this.gl = new c.e.Hh(this.canvas, options);
      } catch (k) {
        return d.E_CONTEXT_CREATION_FAILED;
      }
      this.soundFactory = new c.media.Nd;
      this.options[d.kOption_StandardDerivatives] = !this.gl.hasExtension("OES_standard_derivatives");
      this.nd = undefined;
      this.completeCBK = callback;
      this.parser = new c.xj.sk(this.assetPool);
      b = this.parser.init(content, textures, this.options);
      if (b) {
        this.context = new c.nk(this.gl, this.assetPool, this.soundFactory);
        this.scenegraphFactory = new flwebgl.sg.SceneGraphFactory(this.context, this.parser.ac + 1);
        if (this.options[d.kOption_CacheAsBitmap]) {
          this.nd = new c.e.xk(this.gl, this.assetPool, this.scenegraphFactory);
        }
        this.context.setScenegraphFactory(this.scenegraphFactory);
        this.context.Jn(this.nd);
        if (textures && textures.length > 0) {
          this.gl.loadTextures(this.assetPool.getTextureAtlases(), c.l.U.bind(this, "_texturesLoadedCBK"))
        } else {
          this._texturesLoadedCBK();
        }
        if (this.assetPool.getSounds().length > 0) {
          this.soundFactory.loadSounds(this.assetPool.getSounds(), c.l.U.bind(this, "_soundsLoadedCBK"))
        } else {
          this._soundsLoadedCBK();
        }
        this.backgroundColor = b.color;
        this.stageWidth = b.width;
        this.stageHeight = b.height;
        this.frameRate = (b.frameRate < 0) ? 1 : b.frameRate;
        this.loop = b.loop;
        this.timelines = b.timelines;
        this.gl.setBackgroundColor(this.backgroundColor);
        this.frameDuration = 1000 / this.frameRate;
        this.stage = this.scenegraphFactory.createMovieClip(void 0, -1);
        this.context.setStage(this.stage);
        this.stage.setLoop(this.loop);
        return d.S_OK;
      } else {
        return d.E_RESOURCE_LOADING_FAILED;
      }
    };
    d.prototype.setViewport = function (b) {
      this.gl.setViewport(b);
      this.gl.clear(true, true, false);
    };
    d.prototype.play = function (b) {
      var a = 0;
      var h = this.jd;
      this.jd = true;
      if (b && b.length) {
        var p = false;
        for (var e = 0; e < this.timelines.length; e++) {
          if (this.assetPool.getTimeline(this.timelines[e]).getName() === b) {
            a = e;
            p = true;
            this.jd = false;
            break;
          }
        }
        if (!p) {
          return false;
        }
      }
      this.canvas.addEventListener("webglcontextlost", this.webglContextLostHandler, false);
      this.canvas.addEventListener("webglcontextrestored", this.webglContextRestoredHandler, false);
      this.dc = (new Date).getTime();
      h && this.jd || this.Ri(a, h !== this.jd);
      this.playMode = d.kIsPlaying;
      this.rafID = c.l.U.requestAnimationFrame(this.mainLoop, this.frameRate, window);
      return true;
    };
    d.prototype.stop = function () {
      this.playMode = d.kIsStopped;
    };
    d.prototype.getScenegraphFactory = z("scenegraphFactory");
    d.prototype.getStage = z("stage");
    d.prototype.getStageWidth = z("stageWidth");
    d.prototype.getStageHeight = z("stageHeight");
    d.prototype.getBackgroundColor = z("backgroundColor");
    d.prototype.flush = function () {
      return void 0 != this.gl ? (this.gl.flush(), true) : false
    };
    d.prototype.setEventListener = function (type, a) {
      switch (type) {
        case d.FRAME_RENDER:
          this.frameRenderListener = a;
          break;
      }
    };
    d.prototype.removeEventListener = function (type) {
      switch (type) {
        case d.FRAME_RENDER:
          this.frameRenderListener = void 0;
          break;
      }
    };
    d.prototype.destroy = function () {
      this.stop();
      this.parser && (this.parser.destroy(), delete this.parser);
      this.assetPool && (this.assetPool.destroy(), delete this.assetPool);
      this.gl && (this.gl.destroy(), delete this.gl);
      this.stage && (this.stage.destroy(), delete this.stage);
      this.soundFactory && (this.soundFactory.destroy(), delete this.soundFactory);
      delete this.scenegraphFactory;
    };
    d.prototype._texturesLoadedCBK = function () {
      this.gl.setGL();
      this.texturesLoaded = true;
      this._checkComplete();
    };
    d.prototype._soundsLoadedCBK = function () {
      this.soundsLoaded = true;
      this._checkComplete();
    };
    d.prototype._checkComplete = function () {
      if (this.completeCBK && this.texturesLoaded && this.soundsLoaded) {
        this.completeCBK();
        this.completeCBK = void 0;
      }
    };
    d.prototype.webglContextLostHandler = function (b) {
      b.preventDefault()
    };
    d.prototype.webglContextRestoredHandler = function () {
      this.play()
    };
    d.prototype.Al = function () {
      var b;
      "undefined" === typeof b && (b = false);
      b && (this.stop(), this.rc = -1);
      if (this.stage)
        for (b = this.stage.getNumChildren() - 1; 0 <= b; --b) {
          var a = this.stage.getChildAt(b);
          this.stage.removeChildAt(b);
          a.destroy()
        }
    };
    d.prototype._loop = function () {
      try {
        if (this.playMode !== d.kIsPlaying) {
          this.canvas.removeEventListener("webglcontextlost", this.webglContextLostHandler, false);
          this.canvas.removeEventListener("webglcontextrestored", this.webglContextRestoredHandler, false);
          if (this.rafID) {
            c.l.U.cancelAnimationFrame(this.rafID, window);
            this.rafID = undefined;
          }
          if (this.timeoutID) {
            window.clearTimeout(this.timeoutID);
          }
        } else {
          this.rafID = c.l.U.requestAnimationFrame(this.mainLoop, this.frameRate, window);
          this.timeoutID = undefined;
          var b = Math.ceil(1000 / 60);
          if (this.Xe == this.Hi) {
            this.Gk();
            this.Xe = (this.Xe + 1) % (this.frameRate + 1);
          }
          var elapsed = (new Date).getTime() - this.dc;
          if (this.frameDuration > elapsed && this.frameDuration - elapsed < b) {
            if (this.rafID) {
              c.l.U.cancelAnimationFrame(this.rafID, window);
              this.rafID = undefined;
            }
            this.timeoutID = window.setTimeout(this.mainLoop, this.frameDuration - elapsed);
          } else if (this.frameDuration <= elapsed) {
            this.Sl();
            this.Pk();
          }
        }
      } catch (error) {
        c.l.w.error(error.message);
        this.stop();
        throw error;
      }
    };
    d.prototype.Pk = function () {
      this.dc = (new Date).getTime();
      this.me();
      this.gl.ij();
      var b = this.oa.length;
      for (var a = 0; a < b; ++a) {
        this.oa[a].setDepth(a / b);
        this.gl.e(this.oa[a], 1);
      }
      this.gl.lj();
      if (this.frameRenderListener != void 0) {
        this.frameRenderListener();
      }
      this.Hi = this.Xe;
    };
    d.prototype.me = function () {
      this.gl.setBackgroundColor(this.gl.getBackgroundColor());
      this.gl.blendFunc(c.e.d.SRC_ALPHA, c.e.d.ONE_MINUS_SRC_ALPHA);
      this.gl.enable(c.e.d.BLEND);
      this.gl.depthFunc(c.e.d.LESS);
      this.gl.clearDepth(1);
      this.gl.depthMask(true);
      this.gl.setDepthTest(false);
      this.gl.clear(true, true, false);
    };
    d.prototype.Gk = function () {
      if (this.stage.getCurrentFrame() === this.numFrames && this.stage.isPlaying() && this.jd && (this.loop || this.rc !== this.timelines.length - 1)) {
        this.Ri((this.rc + 1) % this.timelines.length);
      }
      this.stage.advanceFrame();
      this.stage.dispatchEnterFrame();
      this.stage.constructFrame();
      this.stage.dispatchFrameConstructed();
      this.stage.executeFrameScripts();
      this.stage.dispatchExitFrame()
    };
    d.prototype.Ri = function (b, a) {
      if (typeof a === "undefined") { a = false; }
      if (a || (this.rc !== -1 && this.rc !== b)) {
        this.Al();
      }
      this.Xe = -1;
      this.Hi = -1;
      if (a || b !== this.rc) {
        var c = this.assetPool.getTimeline(this.timelines[b]);
        this.stage.Of(c);
        this.stage.play();
        this.numFrames = c.frameCmds.length;
      }
      this.rc = b;
    };
    d.prototype.Sl = function () {
      this.stage.setTransforms(void 0, void 0);
      if (this.options[d.kOption_CacheAsBitmap]) {
        this.nd.Qn();
      }
      this.oa = [];
      this.stage.Qb(this.oa);
    };
    d.prototype.getContext = z("context");
    d.S_OK = 0;
    d.E_ERR = 1;
    d.E_INVALID_PARAM = 2;
    d.E_CONTEXT_CREATION_FAILED = 3;
    d.E_REQUIRED_EXTENSION_NOT_PRESENT = 4;
    d.E_RESOURCE_LOADING_FAILED = 5;
    d.kOption_LogErrors = c.e.d.kOption_LogErrors;
    d.kOption_AAType = c.e.d.kOption_AAType;
    d.kOption_Caching = c.e.d.kOption_Caching;
    d.jh = c.e.d.jh;
    d.kOption_CacheAsBitmap = 10;
    d.kOption_StandardDerivatives = 11;
    d.Df = c.e.Se.Df;
    d.Cf = c.e.Se.Cf;
    d.Ef = c.e.Se.Ef;
    d.kAAType_MSAA = c.e.d.kAAType_MSAA;
    d.kAAType_ImageSpace = c.e.d.kAAType_ImageSpace;
    d.kIsPlaying = 0;
    d.kIsStopped = 1;
    d.FRAME_RENDER = 0;
    return d;
  }();
  c.n = d;
})(N || (N = {}));
window.flwebgl = N;
N.Player = N.n;
