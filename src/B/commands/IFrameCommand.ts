/// <reference path="../../sg/DisplayObject.ts" />
/// <reference path="../../Context.ts" />

module flwebgl.B.commands
{
  import DisplayObject = flwebgl.sg.DisplayObject;
  import Context = flwebgl.Context;

  export interface IFrameCommand
  {
    targetID: string;
    execute(dobj: DisplayObject, context: Context, x: boolean): boolean;
  }
}
