/// <reference path="../geom/Rect.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../geom/Color.ts" />
/// <reference path="../geom/ColorTransform.ts" />
/// <reference path="../util/Utils.ts" />
/// <reference path="../util/AssetPool.ts" />
/// <reference path="../sg/SceneGraphFactory.ts" />
/// <reference path="../sg/DisplayObject.ts" />
/// <reference path="GL.ts" />
/// <reference path="Mesh.ts" />
/// <reference path="wk.ts" />
/// <reference path="BitmapCacheObject.ts" />
/// <reference path="BitmapCacheSpriteSheet.ts" />
/// <reference path="AttributeDef.ts" />
/// <reference path="VertexData.ts" />

module flwebgl.e
{
  import Rect = flwebgl.geom.Rect;
  import Point = flwebgl.geom.Point;
  import Matrix = flwebgl.geom.Matrix;
  import Color = flwebgl.geom.Color;
  import ColorTransform = flwebgl.geom.ColorTransform;
  import Utils = flwebgl.util.Utils;
  import AssetPool = flwebgl.util.AssetPool;
  import SceneGraphFactory = flwebgl.sg.SceneGraphFactory;
  import DisplayObject = flwebgl.sg.DisplayObject;

  interface SpriteSheetMap { [textureID: string]: BitmapCacheSpriteSheet }

  // xk
  export class BitmapCacheFactory
  {
    private renderer: Renderer;
    private assetPool: AssetPool;
    private sceneGraphFactory: SceneGraphFactory;
    private colorTransform: ColorTransform; // not used
    private oa: any[];
    private wc: BitmapCacheObject[];
    private numSpriteSheets: number;
    private maxSpriteSheets: number;
    private spriteSheetMap: SpriteSheetMap;
    private ce: any;

    constructor(renderer: Renderer, assetPool: AssetPool, sceneGraphFactory: SceneGraphFactory) {
      this.renderer = renderer;
      this.assetPool = assetPool;
      this.sceneGraphFactory = sceneGraphFactory;
      this.colorTransform = new ColorTransform();
      this.oa = [];
      this.wc = [];
      this.numSpriteSheets = 0;
      this.maxSpriteSheets = 1;
      this.spriteSheetMap = {};
      this.ce = {};
    }

    addCachedObject(a: BitmapCacheObject): boolean {
      if (!a.displayObject || !a.color || !a.pa) {
        return false;
      }
      this.wc.push(a);
      return true;
    }

    Qn() {
      var count = this.wc.length;
      if (count !== 0) {
        for (var i = 0; i < count; i++) {
          var dobj = this.wc[i].displayObject;
          var color = this.wc[i].color;
          var cxform = this.wc[i].colorTransform;
          var pa = this.wc[i].pa;
          var globalTransform = dobj.getGlobalTransform().clone();
          var globalColorTransform = dobj.getGlobalColorTransform();
          var transform = this.Ik(dobj);
          var m: wk = this.Qk(dobj.getDefinition().id, color, transform, globalColorTransform);
          if (m === void 0) {
            m = this.pa(dobj, color, transform, cxform);
          } else {
            this.ml(dobj);
          }
          if (m !== void 0) {
            pa.In(m);
            var shape = this.sceneGraphFactory.createShape(m.mesh.id, "" + this.sceneGraphFactory.getNextAvailableID());
            pa.Hn(shape);
            pa.setTransforms(globalTransform);
            dobj.$j(pa);
          } else {
            dobj.$j(void 0);
            pa.destroy();
          }
        }
        this.wc.length = 0;
        var viewport = this.renderer.getViewport();
        var viewportTexMax = new Rect(0, 0, GL.MAX_TEXTURE_SIZE, GL.MAX_TEXTURE_SIZE);
        this.renderer.setViewport(viewportTexMax, false);
        for (var textureID in this.spriteSheetMap) {
          this.spriteSheetMap[textureID].rasterize(this.renderer);
        }
        this.renderer.setViewport(viewport);
      }
    }

    Qk(a, color: Color, transform: Matrix, colorTransform: ColorTransform): wk {
      a = this.ce[a];
      if (a !== void 0) {
        for (var i = 0; i < a.length; i++) {
          var f = a[i];
          if (f.color.equals(color) && transform.equalsScaleRotation(f.transform) && f.colorTransform.equals(colorTransform)) {
            return f;
          }
        }
      }
    }

    ml(a) {
      var i;
      var renderables = [];
      a = a.getChildren();
      for (i = 0; i < a.length; ++i) {
        a[i].collectRenderables(renderables);
      }
      for (i = 0; i < renderables.length; ++i) {
        renderables[i].dirty = false;
      }
    }

    pa(displayObject: DisplayObject, color: Color, transform: Matrix, colorTransform: ColorTransform): wk {
      var f = Utils.sm(displayObject);
      var localTransformInverse = displayObject.getLocalTransform().clone();
      localTransformInverse.invert();
      displayObject.setTransforms(localTransformInverse, colorTransform);
      var mc = displayObject;
      while (mc.parent) { mc = mc.parent; }
      var bounds = displayObject.getBounds(mc, false, Mesh.bb, true);
      if (bounds.left && !isNaN(bounds.left)) {
        bounds.left = Math.floor(bounds.left);
        bounds.top = Math.floor(bounds.top);
        bounds.width = Math.ceil(bounds.width);
        bounds.height = Math.ceil(bounds.height);
        var s = transform.clone();
        var boundsAABB = s.transformBoundsAABB(bounds);
        var spriteSheet = this.getSpriteSheet(boundsAABB.width, boundsAABB.height);
        if (spriteSheet === void 0) {
          displayObject.setTransforms(f, colorTransform);
        } else {
          var frameID = spriteSheet.insert(boundsAABB.width, boundsAABB.height);
          if (frameID === void 0) {
            displayObject.setTransforms(f, colorTransform);
          } else {
            var mesh = this.Tk(bounds, s, spriteSheet.getTextureID(), frameID, color.alpha === 255);
            if (mesh === void 0) {
              spriteSheet.remove(frameID);
            } else {
              var renderableID = displayObject.getDefinition().id;
              var n = this.ce[renderableID];
              if (!n) {
                n = this.ce[renderableID] = [];
              }
              var d = new wk(spriteSheet.getTextureID(), mesh, renderableID, color, transform, displayObject.getGlobalColorTransform());
              n.push(d);
              var frame = spriteSheet.getFrame(frameID);
              s.multiply(localTransformInverse);
              var tx = s.getValue(0, 3);
              var ty = s.getValue(1, 3);
              s.translate(frame.left + (tx - Math.floor(tx)), frame.top + (ty - Math.floor(ty)));
              displayObject.setTransforms(s, colorTransform);
              displayObject.collectRenderables(this.oa);
              spriteSheet.addRenderables(this.oa, frameID, color);
              this.oa.length = 0;
              return d;
            }
          }
        }
      }
    }

    Ik(a) {
      return a.getGlobalTransform().clone();
    }

    getSpriteSheet(width: number, height: number): BitmapCacheSpriteSheet {
      var spriteSheet: BitmapCacheSpriteSheet;
      var maxSize = GL.MAX_TEXTURE_SIZE;
      if (width <= maxSize && height <= maxSize) {
        for (var i = 0; i < 2; i++) {
          for (var textureID in this.spriteSheetMap) {
            if (this.spriteSheetMap[textureID].fits(width, height)) {
              spriteSheet = this.spriteSheetMap[textureID];
              break;
            }
          }
          if (!spriteSheet && this.numSpriteSheets < this.maxSpriteSheets) {
            var renderTarget = this.renderer.createRenderTarget(maxSize, maxSize);
            if (renderTarget) {
              var textureAtlas = this.renderer.gl.getTextureAtlas(renderTarget.id);
              if (textureAtlas) {
                spriteSheet = new BitmapCacheSpriteSheet(renderTarget, textureAtlas);
                this.spriteSheetMap[spriteSheet.getTextureID()] = spriteSheet;
                this.numSpriteSheets++;
              }
            }
          }
          if (!spriteSheet && i === 0) {
            this.purgeSpriteSheets();
          }
          if (spriteSheet) {
            break;
          }
        }
      }
      return spriteSheet;
    }

    purgeSpriteSheets() {
      for (var a in this.ce) {
        var b = this.ce[a];
        for (var c = b.length - 1; c >= 0; c--) {
          var e: wk = b[c];
          if (e.ug === 0) {
            var f = e.mesh;
            var l = f.getGeometryCount(Mesh.INTERNAL);
            for (var s = 0; s < l; ++s) {
              var m = f.getGeometry(Mesh.INTERNAL, s);
              if (this.spriteSheetMap[e.textureID]) {
                this.spriteSheetMap[e.textureID].remove(m.name);
              }
            }
            b.splice(c, 1);
          }
        }
      }
    }

    Tk(bounds: Rect, transform: Matrix, textureID: string, frameID: string, isOpaque: boolean): Mesh {
      if (bounds !== void 0 && textureID !== void 0 && frameID !== void 0) {
        var mesh = new Mesh("" + this.assetPool.getNextAvailableAssetID());
        var s = this.renderer.hasExtension("OES_standard_derivatives") ? 7 : 11;
        var xk = this.Xk(s, bounds, transform);
        var sk = this.Sk(xk.vertices, xk.indices, s, textureID, frameID, isOpaque);
        var edgeTypes = [ Mesh.INTERNAL, Mesh.EXTERNAL, Mesh.bb ];
        for (var i = 0; i < sk.length; i++) {
          mesh.setGeometry(edgeTypes[i], sk[i]);
        }
        mesh.calculateBounds();
        this.assetPool.setMesh(mesh);
        return mesh;
      }
    }

    Sk(vertices: Float32Array[], indices: number[][], s: number, textureID: string, frameID: string, isOpaque: boolean): Geometry[] {
      var attrDefs = new AttributesDefs();
      var a0 = new AttributeDef(0, "POSITION0", GL.FLOAT, 2);
      var a1 = new AttributeDef(2 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD0", GL.FLOAT, 2);
      var a2 = new AttributeDef(4 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD1", GL.FLOAT, 1);
      var a3 = new AttributeDef(5 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD2", GL.FLOAT, 2);
      if (s == 11) {
        var a4 = new AttributeDef(7 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD3", GL.FLOAT, 2);
        var a5 = new AttributeDef(9 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD4", GL.FLOAT, 2);
        attrDefs.attrs = [a0, a1, a2, a3, a4, a5];
      } else {
        attrDefs.attrs = [a0, a1, a2, a3];
      }
      attrDefs.totalSize = s * Float32Array.BYTES_PER_ELEMENT;

      var m: Geometry[] = [];
      for (var i = 0; i < vertices.length; i++) {
        var f = new VertexData(vertices[i], attrDefs);
        var n = new Geometry(frameID, isOpaque);
        n.fillMode = Geometry.fillModeMap[Geometry.kFill_Repeat];
        n.setVertexData(textureID, [f]);
        n.setIndices(indices[i]);
        m[i] = n;
      }
      return m;
    }

    Xk(a: number, rect: Rect, transform: Matrix) {
      var e = new Point(rect.left, rect.top);
      var f = new Point(rect.left + rect.width, rect.top);
      var l = new Point(rect.left + rect.width, rect.top + rect.height);
      var b = new Point(rect.left, rect.top + rect.height);
  
      var s = new Point((e.x + f.x + b.x) / 3, (e.y + f.y + b.y) / 3),
          m = new Point((l.x + f.x + b.x) / 3, (l.y + f.y + b.y) / 3),
          n = new Point(e.x - 1, e.y),
          y = new Point(b.x - 1, b.y),
          w = new Point(e.x, e.y - 1),
          t = new Point(f.x, f.y - 1),
          q = new Point(f.x + 1, f.y),
          r = new Point(l.x + 1, l.y),
          u = new Point(b.x, b.y + 1),
          A = new Point(l.x, l.y + 1),

          C = transform.transformPoint(e),
          v = transform.transformPoint(f),
          x = transform.transformPoint(l),
          B = transform.transformPoint(b),

          I = transform.transformPoint(s),
          K = transform.transformPoint(m),
          T = transform.transformPoint(n),
          X = transform.transformPoint(y),
          U = transform.transformPoint(w),
          L = transform.transformPoint(t),
          R = transform.transformPoint(q),
          H = transform.transformPoint(r),
          F = transform.transformPoint(u),
          W = transform.transformPoint(A),

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

      transform.translate(-J, -M);

      var vertices0: Float32Array;
      var vertices1: Float32Array;
      var vertices2: Float32Array;

      if (a === 7) {
        vertices0 = new Float32Array([
          b.x, b.y, 0, 1, 1E4, B.x, B.y,
          s.x, s.y, 0, 1, 1E4, I.x, I.y,
          f.x, f.y, 0, 1, 1E4, v.x, v.y,
          b.x, b.y, 0, 1, 1E4, B.x, B.y,
          m.x, m.y, 0, 1, 1E4, K.x, K.y,
          f.x, f.y, 0, 1, 1E4, v.x, v.y
        ]);
        vertices1 = new Float32Array([
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
        vertices2 = new Float32Array([
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
        vertices0 = new Float32Array([
          b.x, b.y, 0, 1, 1E4, B.x, B.y, 0, 0, 0, 0,
          s.x, s.y, 0, 1, 1E4, I.x, I.y, 0, 0, 0, 0,
          f.x, f.y, 0, 1, 1E4, v.x, v.y, 0, 0, 0, 0,
          b.x, b.y, 0, 1, 1E4, B.x, B.y, 0, 0, 0, 0,
          m.x, m.y, 0, 1, 1E4, K.x, K.y, 0, 0, 0, 0,
          f.x, f.y, 0, 1, 1E4, v.x, v.y, 0, 0, 0, 0
        ]);
        vertices1 = new Float32Array([
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
        vertices2 = new Float32Array([
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
      return {
        vertices: [
          vertices0,
          vertices1,
          vertices2
        ],
        indices: [
          [0, 1, 2, 3, 4, 5],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        ]
      };
    }
  }
}