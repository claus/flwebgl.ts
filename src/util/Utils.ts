/// <reference path="../geom/Color.ts" />

module flwebgl.util
{
  import Color = flwebgl.geom.Color;

  export class Utils
  {
    static isUndefined(object: any) {
      return typeof object === "undefined";
    }

    static getColor = function (color: string): Color {
      var red = parseInt(color.substring(1, 3), 16);
      var green = parseInt(color.substring(3, 5), 16);
      var blue = parseInt(color.substring(5, 7), 16);
      var alpha = (color.length > 7) ? parseInt(color.substring(7), 16) : 255;
      return new Color(red, green, blue, alpha);
    }
  }
}
