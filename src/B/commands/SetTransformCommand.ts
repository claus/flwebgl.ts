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
    id: string;
    hf: any;
    hc: Matrix;

    constructor(a: any[]) {
      this.id = "" + a[0];
      this.hf = a[1];
      if (a.length > 2) {
        a = a.slice(2);
        this.hc = new Matrix(a);
      } else {
        this.hc = new Matrix();
      }
    }

    execute(mc: MovieClip, context: Context, x: boolean) {
      var k = mc.getChildIndexByID(this.id);
      if (k < 0) {
        return false;
      }
      var c = mc.getChildAt(k);
      for (var e = mc.getChildIndexByID(this.hf) + 1; mc.getChildAt(e) && +mc.getChildAt(e).id < 0; e++) {}
      if (e > k) {
        e--;
      }
      if (e !== k) {
        mc.swap(k, e);
      }
      if ((c.W & 1) === 0) {
        c.setLocalTransform(this.hc, false);
      }
      return true;
    }
  }
}
