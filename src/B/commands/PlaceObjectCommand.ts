/// <reference path="../../Context.ts" />
/// <reference path="../../geom/Matrix.ts" />
/// <reference path="../../util/AssetPool.ts" />
/// <reference path="../../sg/SceneGraphFactory.ts" />
/// <reference path="../../sg/DisplayObject.ts" />
/// <reference path="../../sg/MovieClip.ts" />
/// <reference path="IFrameCommand.ts" />

module flwebgl.B.commands
{
  import Context = flwebgl.Context;
  import Matrix = flwebgl.geom.Matrix;
  import AssetPool = flwebgl.util.AssetPool;
  import SceneGraphFactory = flwebgl.sg.SceneGraphFactory;
  import DisplayObject = flwebgl.sg.DisplayObject;
  import MovieClip = flwebgl.sg.MovieClip;

  export class PlaceObjectCommand implements IFrameCommand
  {
    timelineID: any;
    hf: any;
    targetID: string;
    transform: Matrix;
    instanceName: string;

    constructor(a: any[]) {
      this.timelineID = "" + a[0];
      this.hf = "" + a[1];
      this.targetID = "" + a[2];
      var len = a.length;
      this.transform = (len > 4) ? new Matrix(a.slice(3)) : new Matrix();
      if (len == 10 || len == 4) {
        this.instanceName = a[len - 1];
      }
    }

    execute(mc: MovieClip, context: Context, x: boolean): boolean {
      var childIndex = mc.getChildIndexByID(this.targetID);
      if (childIndex < 0) {
        return (this.Ek(mc, context.assetPool, context.sceneGraphFactory) >= 0);
      } else {
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
    }

    Ek(mc: MovieClip, assetPool: AssetPool, sceneGraphFactory: SceneGraphFactory) {
      var dobj: DisplayObject = (assetPool.getMesh(this.timelineID) === void 0)
                                  ? sceneGraphFactory.createMovieClip(this.timelineID, this.targetID)
                                  : sceneGraphFactory.createShape(this.timelineID, this.targetID);
      dobj.setLocalTransform(this.transform, false);
      if (this.instanceName !== void 0) {
        dobj.name = this.instanceName;
      }
      var index = mc.getChildIndexByID(this.hf) + 1;
      while (mc.getChildAt(index) && +mc.getChildAt(index).id < 0) {
        index++;
      }
      return mc.addChildAt(dobj, index, false, true) ? index : -1;
    }
  }
}
