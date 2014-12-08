/// <reference path="../geom/Color.ts" />
/// <reference path="../geom/ColorTransform.ts" />
/// <reference path="../g/DisplayObject.ts" />
/// <reference path="vk.ts" />

module flwebgl.e
{
  import Color = flwebgl.geom.Color;
  import ColorTransform = flwebgl.geom.ColorTransform;
  import DisplayObject = flwebgl.g.DisplayObject;

  export class yk
  {
    constructor(
      public displayObject: DisplayObject,
      public color: Color,
      public colorTransform: ColorTransform,
      public pa: vk
    ) {}
  }
}
