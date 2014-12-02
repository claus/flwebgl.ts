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

    intersects(rect: Rect) {
      if (this.isEmpty || rect.isEmpty) {
        return false;
      } else {
        return (rect.left <= this.left + this.width)
            && (rect.left + rect.width >= this.left)
            && (rect.top <= this.top + this.height)
            && (rect.top + rect.height >= this.top);
      }
    }

    copy(rect: Rect) {
      this.left = rect.left;
      this.top = rect.top;
      this.width = rect.width;
      this.height = rect.height;
      this.isEmpty = rect.isEmpty;
    }

    union(rect: Rect) {
      if (this.isEmpty) {
        this.copy(rect);
      } else if (!rect.isEmpty) {
        var right = this.left + this.width;
        var bottom = this.top + this.height;
        this.left = Math.min(this.left, rect.left);
        this.top = Math.min(this.top, rect.top);
        this.width = Math.max(right, rect.left + rect.width) - this.left;
        this.height = Math.max(bottom, rect.top + rect.height) - this.top;
      }
    }
  }
}
