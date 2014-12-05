/// <reference path="../../Context.ts" />
/// <reference path="../../util/AssetPool.ts" />
/// <reference path="../../g/MovieClip.ts" />
/// <reference path="../../g/DisplayObject.ts" />
/// <reference path="IFrameCommand.ts" />

module flwebgl.B.commands
{
  import Context = flwebgl.Context;
  import AssetPool = flwebgl.util.AssetPool;
  import MovieClip = flwebgl.g.MovieClip;
  import DisplayObject = flwebgl.g.DisplayObject;

  export class RemoveObjectCommand implements IFrameCommand
  {
    id: string;

    constructor(a: any[]) {
      this.id = "" + a[0];
    }

    execute(mc: MovieClip, context: Context, x: boolean) {
      var b = mc.getChildIndexByID(this.id);
      if (b < 0) {
        return false;
      }
      var dobj = mc.getChildAt(b);
      if (mc.removeChildAt(b)) {
        dobj.destroy();
      }
      return true;
    }
  }
}
