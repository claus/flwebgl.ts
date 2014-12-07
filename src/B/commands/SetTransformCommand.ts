/// <reference path="../../Context.ts" />
/// <reference path="../../geom/Matrix.ts" />
/// <reference path="../../util/AssetPool.ts" />
/// <reference path="../../g/MovieClip.ts" />
/// <reference path="IFrameCommand.ts" />

module flwebgl.B.commands
{
  import Context = flwebgl.Context;
  import Matrix = flwebgl.geom.Matrix;
  import AssetPool = flwebgl.util.AssetPool;
  import MovieClip = flwebgl.g.MovieClip;

  export class SetTransformCommand implements IFrameCommand
  {
    targetID: string;
    hf: any;
    transform: Matrix;

    constructor(a: any[]) {
      this.targetID = "" + a[0];
      this.hf = "" + a[1];
      this.transform = (a.length > 2) ? new Matrix(a.slice(2)) : new Matrix();
    }

    execute(mc: MovieClip, context: Context, x: boolean): boolean {
      var k = mc.getChildIndexByID(this.targetID);
      if (k < 0) {
        return false;
      }
      var child = mc.getChildAt(k);
      var e = mc.getChildIndexByID(this.hf) + 1;
      while (mc.getChildAt(e) && +mc.getChildAt(e).id < 0) {
        e++
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
    }
  }
}
