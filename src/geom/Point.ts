module flwebgl.geom
{
  export class Point
  {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    add(point: Point) {
      var p = new Point(this.x, this.y);
      p.x += point.x;
      p.y += point.y;
      return p;
    }

    sub(point: Point) {
      var p = new Point(this.x, this.y);
      p.x -= point.x;
      p.y -= point.y;
      return p;
    }
  }
}