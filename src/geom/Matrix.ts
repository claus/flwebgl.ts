/// <reference path="../util/Utils.ts" />
/// <reference path="Point.ts" />
/// <reference path="Rect.ts" />

module flwebgl.geom
{
  import Utils = flwebgl.util.Utils;

  export class Matrix
  {
    values: number[];

    private _isIdentity = false;

    constructor(values?: number[]) {
      this.identity();
      if (values && values.length >= 6) {
        this.setValues(values);
      }
    }

    isInvertible() {
      return this._isIdentity ? true : this.values[1] * this.values[4] - this.values[0] * this.values[5] !== 0;
    }

    get isIdentity(): boolean {
      return this._isIdentity;
    }

    private setIsIdentity() {
      this._isIdentity =
        (this.values[0] === 1) &&
        (this.values[1] === 0) &&
        (this.values[4] === 0) &&
        (this.values[5] === 1) &&
        (this.values[12] === 0) &&
        (this.values[13] === 0);
    }

    identity(): Matrix {
      this.values = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
      this._isIdentity = true;
      return this;
    }

    equals(matrix: Matrix): boolean {
      return this.values[0] == matrix.values[0]
          && this.values[1] == matrix.values[1]
          && this.values[4] == matrix.values[4]
          && this.values[5] == matrix.values[5]
          && this.values[12] == matrix.values[12]
          && this.values[13] == matrix.values[13]
          && this.values[10] == matrix.values[10];
    }

    getValues(): number[] {
      return [
        this.values[0],
        this.values[1],
        this.values[4],
        this.values[5],
        this.values[12],
        this.values[13]
      ];
    }

    setValues = function (values: number[]) {
      if (values && values.length >= 6) {
        this.values[0] = +values[0];
        this.values[1] = +values[1];
        this.values[4] = +values[2];
        this.values[5] = +values[3];
        this.values[12] = +values[4];
        this.values[13] = +values[5];
        this.setIsIdentity();
      }
    }

    clone(): Matrix {
      return (new Matrix()).copy(this);
    }

    copy(matrix: Matrix): Matrix {
      for (var i = 0; i < 16; i++) {
        this.values[i] = matrix.values[i];
      }
      this._isIdentity = matrix.isIdentity;
      return this;
    }

    concat(matrix: Matrix): Matrix {
      if (this._isIdentity) {
        if (matrix.isIdentity) {
          this.values[10] *= matrix.values[10];
          return this;
        }
        this.values[0] = matrix.values[0];
        this.values[1] = matrix.values[1];
        this.values[4] = matrix.values[4];
        this.values[5] = matrix.values[5];
        this.values[12] = matrix.values[12];
        this.values[13] = matrix.values[13];
        this.values[10] *= matrix.values[10];
        this._isIdentity = matrix.isIdentity;
        return this;
      }
      if (matrix.isIdentity) {
        this.values[10] *= matrix.values[10];
        return this;
      }
      var a = matrix.values[0] * this.values[0] + matrix.values[4] * this.values[1];
      var b = matrix.values[1] * this.values[0] + matrix.values[5] * this.values[1];
      var c = matrix.values[0] * this.values[4] + matrix.values[4] * this.values[5];
      var d = matrix.values[1] * this.values[4] + matrix.values[5] * this.values[5];
      var tx = matrix.values[0] * this.values[12] + matrix.values[4] * this.values[13] + matrix.values[12];
      var ty = matrix.values[1] * this.values[12] + matrix.values[5] * this.values[13] + matrix.values[13];
      this.values[0] = a;
      this.values[1] = b;
      this.values[4] = c;
      this.values[5] = d;
      this.values[12] = tx;
      this.values[13] = ty;
      this.values[10] = matrix.values[10] * this.values[10];
      return this;
    }

    multiply(matrix: Matrix) {
      if (this._isIdentity) {
        if (matrix.isIdentity) {
          this.values[10] *= matrix.values[10];
        } else {
          this.values[0] = matrix.values[0];
          this.values[1] = matrix.values[1];
          this.values[4] = matrix.values[4];
          this.values[5] = matrix.values[5];
          this.values[12] = matrix.values[12];
          this.values[13] = matrix.values[13];
          this.values[10] *= matrix.values[10];
          this._isIdentity = matrix.isIdentity;
        }
      } else if (matrix.isIdentity) {
        this.values[10] *= matrix.values[10];
      } else {
        var a = this.values[0] * matrix.values[0] + this.values[4] * matrix.values[1];
        var b = this.values[1] * matrix.values[0] + this.values[5] * matrix.values[1];
        var c = this.values[0] * matrix.values[4] + this.values[4] * matrix.values[5];
        var d = this.values[1] * matrix.values[4] + this.values[5] * matrix.values[5];
        var tx = this.values[0] * matrix.values[12] + this.values[4] * matrix.values[13] + this.values[12];
        var ty = this.values[1] * matrix.values[12] + this.values[5] * matrix.values[13] + this.values[13];
        this.values[0] = a;
        this.values[1] = b;
        this.values[4] = c;
        this.values[5] = d;
        this.values[12] = tx;
        this.values[13] = ty;
        this.values[10] = this.values[10] * matrix.values[10];
      }
    }

    transformPoint(point: Point) {
      return new Point(
        this.values[0] * point.x + this.values[4] * point.y + this.values[12],
        this.values[1] * point.x + this.values[5] * point.y + this.values[13]
      );
    }

    transformBoundsAABB(rect: Rect): Rect {
      var p = new Point(rect.left, rect.top);
      var tl = this.transformPoint(p);
      p.x = rect.left + rect.width;
      var tr = this.transformPoint(p);
      p.y = rect.top + rect.height;
      var br = this.transformPoint(p);
      p.x = rect.left;
      var bl = this.transformPoint(p);
      var p1x = Math.min(tl.x, tr.x, br.x, bl.x);
      var p2x = Math.max(tl.x, tr.x, br.x, bl.x);
      var p1y = Math.min(tl.y, tr.y, br.y, bl.y);
      var p2y = Math.max(tl.y, tr.y, br.y, bl.y);
      return new Rect(p1x, p1y, p2x - p1x, p2y - p1y);
    }

    invert(): Matrix {
      if (this._isIdentity) {
        return this;
      }
      var a = this.values[0];
      var b = this.values[1];
      var c = this.values[4];
      var d = this.values[5];
      var tx = this.values[12];
      var ty = this.values[13];
      var det = b * c - a * d;
      if (det == 0) {
        this.identity();
        return this;
      }
      this.identity();
      this.values[0] = -d / det;
      this.values[1] = b / det;
      this.values[4] = c / det;
      this.values[5] = -a / det;
      this.values[12] = (tx * d - ty * c) / det;
      this.values[13] = (ty * a - tx * b) / det;
      this._isIdentity = false;
      return this;
    }

    translate(tx: number, ty: number): Matrix {
      this.values[12] += tx;
      this.values[13] += ty;
      if (this.values[12] !== 0 || this.values[13] !== 0) {
        this._isIdentity = false;
      }
      return this;
    }

    setValue(column: number, row: number, value: number) {
      this.values[4 * row + column] = value;
      if (column !== 2 && row !== 2) {
        this._isIdentity = false;
      }
    }

    getValue(column: number, row: number): number {
      return this.values[4 * row + column];
    }
  }
}
