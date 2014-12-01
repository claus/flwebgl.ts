module flwebgl.geom
{
  export class Rect
  {
    left = 0;
    top = 0;
    width = 0;
    height = 0;
    isEmpty = true;

    constructor(left: number = 0, top: number = 0, width: number = 0, height: number = 0) {
      if (arguments.length >= 2) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.isEmpty = false;
      }
    }

    intersects(a) {
      if (this.isEmpty || a.isEmpty) {
        return false;
      } else {
        return (a.left <= this.left + this.width)
            && (a.left + a.width >= this.left)
            && (a.top <= this.top + this.height)
            && (a.top + a.height >= this.top);
      }
    }
  }
}
