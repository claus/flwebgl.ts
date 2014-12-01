module flwebgl.geom
{
  export class Color
  {
    red = 0;
    blue = 0;
    green = 0;
    alpha = 0;

    constructor(red: number, blue: number, green: number, alpha: number = 255) {
      this.red = red;
      this.blue = blue;
      this.green = green;
      this.alpha = alpha;
    }

    equals(color: Color): boolean {
      return (this.red === color.red)
          && (this.green === color.green)
          && (this.blue === color.blue)
          && (this.alpha === color.alpha);
    }
  }
}
