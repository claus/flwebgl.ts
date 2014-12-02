module flwebgl.geom
{
  export class Matrix3x3
  {
    values: number[];

    constructor (matrix: any) {
      this.values = Array(9);
      if (matrix instanceof Matrix3x3) {
        this.copy(matrix);
      } else if (matrix instanceof Array && matrix.length == 9) {
        this.copyValues(matrix);
      } else {
        this.identity();
      }
    }

    identity() {
      this.values = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
    }

    copy(matrix: Matrix3x3) {
      for (var i = 0; i < 9; i++) {
        this.values[i] = matrix.values[i];
      }
    }

    concat(matrix: Matrix3x3) {
      var v0 = this.values[0] * matrix.values[0] + this.values[3] * matrix.values[1] + this.values[6] * matrix.values[2];
      var v1 = this.values[1] * matrix.values[0] + this.values[4] * matrix.values[1] + this.values[7] * matrix.values[2];
      var v2 = this.values[2] * matrix.values[0] + this.values[5] * matrix.values[1] + this.values[8] * matrix.values[2];
      var v3 = this.values[0] * matrix.values[3] + this.values[3] * matrix.values[4] + this.values[6] * matrix.values[5];
      var v4 = this.values[1] * matrix.values[3] + this.values[4] * matrix.values[4] + this.values[7] * matrix.values[5];
      var v5 = this.values[2] * matrix.values[3] + this.values[5] * matrix.values[4] + this.values[8] * matrix.values[5];
      var v6 = this.values[0] * matrix.values[6] + this.values[3] * matrix.values[7] + this.values[6] * matrix.values[8];
      var v7 = this.values[1] * matrix.values[6] + this.values[4] * matrix.values[7] + this.values[7] * matrix.values[8];
      var v8 = this.values[2] * matrix.values[6] + this.values[5] * matrix.values[7] + this.values[8] * matrix.values[8];
      this.values[0] = v0;
      this.values[1] = v1;
      this.values[2] = v2;
      this.values[3] = v3;
      this.values[4] = v4;
      this.values[5] = v5;
      this.values[6] = v6;
      this.values[7] = v7;
      this.values[8] = v8;
    }

    transformPoint(point: Point): Point {
      return new Point(
        this.values[0] * point.x + this.values[3] * point.y + this.values[6],
        this.values[1] * point.x + this.values[4] * point.y + this.values[7]
      );
    }

    invert() {
      var v0 = this.values[0];
      var v1 = this.values[1];
      var v3 = this.values[3];
      var v4 = this.values[4];
      var v6 = this.values[6];
      var v7 = this.values[7];
      var det = v0 * (v4 - v7) + v3 * (v7 - v1) + v6 * (v1 - v4);
      if (det !== 0) {
        this.values[0] = v4 - v7;
        this.values[1] = v7 - v1;
        this.values[2] = v1 - v4;
        this.values[3] = v6 - v3;
        this.values[4] = v0 - v6;
        this.values[5] = v3 - v0;
        this.values[6] = v3 * v7 - v6 * v4;
        this.values[7] = v6 * v1 - v0 * v7;
        this.values[8] = v0 * v4 - v3 * v1;
        this.divide(det);
      }
    }

    divide(divisor: number) {
      this.values[0] /= divisor;
      this.values[1] /= divisor;
      this.values[2] /= divisor;
      this.values[3] /= divisor;
      this.values[4] /= divisor;
      this.values[5] /= divisor;
      this.values[6] /= divisor;
      this.values[7] /= divisor;
      this.values[8] /= divisor;
    }

    copyValues(values: number[]) {
      for (var i = 0; i < 9; i++) {
        this.values[i] = values[i];
      }
    }
  }
}