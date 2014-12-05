/// <reference path="../../Context.ts" />
/// <reference path="../../geom/ColorTransform.ts" />
/// <reference path="../../util/AssetPool.ts" />
/// <reference path="../../g/MovieClip.ts" />
/// <reference path="../../g/DisplayObject.ts" />
/// <reference path="IFrameCommand.ts" />

module flwebgl.B.commands
{
  import Context = flwebgl.Context;
  import ColorTransform = flwebgl.geom.ColorTransform;
  import AssetPool = flwebgl.util.AssetPool;
  import MovieClip = flwebgl.g.MovieClip;
  import DisplayObject = flwebgl.g.DisplayObject;

  export class SetColorTransformCommand implements IFrameCommand
  {
    id: string;
    colorTransform: ColorTransform;

    constructor(a: any[]) {
      this.id = "" + a[0];
      a = a.slice(1);
      if (a && a.length == 8) {
        this.colorTransform = new ColorTransform(
          a[0], a[1] / 100,
          a[2], a[3] / 100,
          a[4], a[5] / 100,
          a[6], a[7] / 100
        );
      } else {
        this.colorTransform = new ColorTransform();
      }
    }

    execute(mc: MovieClip, context: Context, x: boolean) {
      var b = mc.getChildIndexByID(this.id);
      if (b < 0) {
        return false;
      }
      var dobj = mc.getChildAt(b, true);
      if ((dobj.W & 2) === 0) {
        dobj.setLocalColorTransform(this.colorTransform, false);
      }
      return true;
    }
  }
}
