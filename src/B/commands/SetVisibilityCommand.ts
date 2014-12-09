/// <reference path="../../Context.ts" />
/// <reference path="../../sg/MovieClip.ts" />
/// <reference path="IFrameCommand.ts" />

module flwebgl.B.commands
{
  import Context = flwebgl.Context;
  import MovieClip = flwebgl.sg.MovieClip;

  // Vh
  export class SetVisibilityCommand implements IFrameCommand
  {
    targetID: string;
    visible: boolean;

    constructor(a: any[]) {
      this.targetID = a[0];
      this.visible = (a[1] === 1);
    }

    execute(mc: MovieClip, context: Context, x: boolean): boolean {
      var b = mc.getChildIndexByID(this.targetID);
      if (b < 0) {
        return false;
      }
      var child = mc.getChildAt(b, true);
      if ((child.W & 4) === 0) {
        child.setVisible(this.visible, false);
      }
      return true;
    }
  }
}
