/// <reference path="../../Context.ts" />
/// <reference path="../../geom/Matrix.ts" />
/// <reference path="../../util/AssetPool.ts" />
/// <reference path="../../sg/SceneGraphFactory.ts" />
/// <reference path="../../g/DisplayObject.ts" />
/// <reference path="../../g/MovieClip.ts" />
/// <reference path="IFrameCommand.ts" />

module flwebgl.B.commands
{
  import Context = flwebgl.Context;
  import Matrix = flwebgl.geom.Matrix;
  import AssetPool = flwebgl.util.AssetPool;
  import SceneGraphFactory = flwebgl.sg.SceneGraphFactory;
  import DisplayObject = flwebgl.g.DisplayObject;
  import MovieClip = flwebgl.g.MovieClip;

  export class PlaceObjectCommand implements IFrameCommand
  {
    Ag: any;
    hf: any;
    id: string;
    hc: Matrix;
    instanceName: string;

    constructor(a: any[]) {
      this.Ag = "" + a[0];
      this.hf = "" + a[1];
      this.id = "" + a[2];
      if (a.length > 4) {
        var b = a.slice(3);
        this.hc = new Matrix(b);
      } else {
        this.hc = new Matrix();
      }
      if (a.length == 10 || a.length == 4) {
        this.instanceName = a[a.length - 1];
      }
    }

    execute(mc: MovieClip, context: Context, x: boolean) {
      var assetPool = context.assetPool;
      var sceneGraphFactory = context.sceneGraphFactory;
      var k = mc.getChildIndexByID(this.id);
      if (k >= 0) {
        var c = mc.getChildAt(k);
        if ((c.W & 1) === 0) {
          c.setLocalTransform(this.hc, false);
        }
        if ((c.W & 2) === 0) {
          var cxform = c.getLocalColorTransform().clone();
          cxform.identity();
          c.setLocalColorTransform(cxform, false);
        }
        var e;
        for (e = mc.getChildIndexByID(this.hf) + 1; mc.getChildAt(e) && +mc.getChildAt(e).id < 0; e++) {}
        if (e > k) {
          e--;
        }
        mc.swap(k, e);
        if ((c.W & 4) === 0) {
          c.setVisible(true, false);
        }
        return true;
      }
      return (this.Ek(mc, assetPool, sceneGraphFactory) >= 0);
    }

    Ek(mc: MovieClip, assetPool: AssetPool, sceneGraphFactory: SceneGraphFactory) {
      var dobj: DisplayObject = (assetPool.getMesh(this.Ag) === void 0)
                                  ? sceneGraphFactory.createMovieClip(this.Ag, this.id)
                                  : sceneGraphFactory.createShape(this.Ag, this.id);
      dobj.setLocalTransform(this.hc, false);
      if (this.instanceName !== void 0) {
        dobj.name = this.instanceName;
      }
      var index: number;
      for (index = mc.getChildIndexByID(this.hf) + 1; mc.getChildAt(index) && +mc.getChildAt(index).id < 0; index++) {}
      return mc.addChildAt(dobj, index, false, true) ? index : -1;
    }
  }
}
