/// <reference path="../geom/Color.ts" />

interface Window {
  webkitRequestAnimationFrame(callback: any, element?: any): number;
  mozRequestAnimationFrame(callback: any, element?: any): number;
  oRequestAnimationFrame(callback: any, element?: any): number;
  webkitCancelAnimationFrame(id: number): void;
  mozCancelAnimationFrame(id: number): void;
  oCancelAnimationFrame(id: number): void;
  msCancelAnimationFrame(id: number): void;
}

module flwebgl.util
{
  import Color = flwebgl.geom.Color;

  export class Utils
  {
    static requestAnimFrame(fn: any, frameRate: number, window: Window): number {
      var rAF: any = window.requestAnimationFrame
                  || window.webkitRequestAnimationFrame
                  || window.mozRequestAnimationFrame
                  || window.oRequestAnimationFrame
                  || window.msRequestAnimationFrame;
      return rAF ? rAF(fn) : setTimeout(fn, 1000 / frameRate);
    }

    static cancelAnimFrame(id: number, window: Window) {
      var cAF: any = window.cancelAnimationFrame
                  || window.webkitCancelAnimationFrame
                  || window.mozCancelAnimationFrame
                  || window.oCancelAnimationFrame
                  || window.msCancelAnimationFrame;
      if(cAF) { cAF(id); }
    }

    static isUndefined(object: any) {
      return (typeof object === "undefined");
    }

    static getColor = function (color: string): Color {
      var red = parseInt(color.substring(1, 3), 16);
      var green = parseInt(color.substring(3, 5), 16);
      var blue = parseInt(color.substring(5, 7), 16);
      var alpha = (color.length > 7) ? parseInt(color.substring(7), 16) : 255;
      return new Color(red, green, blue, alpha);
    }

    static cm(meshID: string, i: number, edgeType: string) {
      return meshID + "_" + i + "_" + edgeType;
    }

    static em(a, b) {
      return "__Snapshot__" + a + "_" + b;
    }
  }
}
