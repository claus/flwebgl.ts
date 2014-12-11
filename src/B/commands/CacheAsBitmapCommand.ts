/// <reference path="../../Context.ts" />
/// <reference path="../../sg/MovieClip.ts" />
/// <reference path="../../e/vk.ts" />
/// <reference path="../../e/BitmapCacheObject.ts" />
/// <reference path="IFrameCommand.ts" />

module flwebgl.B.commands
{
  import Context = flwebgl.Context;
  import Color = flwebgl.geom.Color;
  import MovieClip = flwebgl.sg.MovieClip;
  import vk = flwebgl.e.vk;
  import BitmapCacheObject = flwebgl.e.BitmapCacheObject;

  export class CacheAsBitmapCommand implements IFrameCommand
  {
    targetID: string;
    color: Color;

    constructor(a: any[]) {
      this.targetID = "" + a[0];
      this.color = new Color(a[2], a[3], a[4], a[1]);
    }

    execute(mc: MovieClip, context: Context, x: boolean): boolean {
      var index = mc.getChildIndexByID(this.targetID);
      if (index < 0) {
        return false;
      }
      var displayObject = mc.getChildAt(index, true);
      if (displayObject.Ui) {
        return true;
      }
      var colorTransform = mc.getGlobalColorTransform().clone();
      var bitmapCacheObject = new BitmapCacheObject(displayObject, this.color, colorTransform, new vk());
      return context.bitmapCacheFactory.addCachedObject(bitmapCacheObject);
    }
  }
}