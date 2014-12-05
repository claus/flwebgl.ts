/// <reference path="../../g/DisplayObject.ts" />
/// <reference path="../../Context.ts" />

module flwebgl.B.commands
{
  import DisplayObject = flwebgl.g.DisplayObject;
  import Context = flwebgl.Context;

  export interface IFrameCommand
  {
    id: string;
    execute(dobj: DisplayObject, context: Context, x: boolean);
  }
}
