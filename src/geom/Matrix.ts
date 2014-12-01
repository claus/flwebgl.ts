/// <reference path="../util/Utils.ts" />

module flwebgl.geom
{
  import Utils = flwebgl.util.Utils;

  export class Matrix
  {
    values: number[];

    private _isIdentity = false;

    constructor(values: number[]) {
      this.identity();
      if (values && values.length >= 6) {
        this.setValues(values);
      }
    }

    get isIdentity() {
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

    identity() {
      this.values = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
      this._isIdentity = true;
      return this;
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
  }
}
