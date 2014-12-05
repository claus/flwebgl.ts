module flwebgl.geom
{
  export class ColorTransform
  {
    alphaOffset: number;
    redOffset: number;
    greenOffset: number;
    blueOffset: number;

    private _alphaMult: number;
    private _redMult: number;
    private _greenMult: number;
    private _blueMult: number;

    constructor(alphaOffs: number = 0, alphaMult: number = 1, redOffs: number = 0, redMult: number = 1, greenOffs: number = 0, greenMult: number = 1, blueOffs: number = 0, blueMult: number = 1) {
      this.identity();
      this.alphaOffset = alphaOffs;
      this.redOffset = redOffs;
      this.greenOffset = greenOffs;
      this.blueOffset = blueOffs;
      this.alphaMultiplier = alphaMult;
      this.redMultiplier = redMult;
      this.greenMultiplier = greenMult;
      this.blueMultiplier = blueMult;
    }

    get alphaMultiplier(): number {
      return this._alphaMult;
    }
    set alphaMultiplier(value: number) {
      this._alphaMult = (value > 1) ? 1 : value;
    }

    get redMultiplier(): number {
      return this._redMult;
    }
    set redMultiplier(value: number) {
      this._redMult = (value > 1) ? 1 : value;
    }

    get greenMultiplier(): number {
      return this._greenMult;
    }
    set greenMultiplier(value: number) {
      this._greenMult = (value > 1) ? 1 : value;
    }

    get blueMultiplier(): number {
      return this._blueMult;
    }
    set blueMultiplier(value: number) {
      this._blueMult = (value > 1) ? 1 : value;
    }

    identity(): ColorTransform {
      this.blueOffset = this.greenOffset = this.redOffset = this.alphaOffset = 0;
      this._blueMult = this._greenMult = this._redMult = this._alphaMult = 1;
      return this;
    }

    isIdentity() {
      return this.alphaOffset === 0
          && this._alphaMult === 1
          && this.redOffset === 0
          && this._redMult === 1
          && this.greenOffset === 0
          && this._greenMult === 1
          && this.blueOffset === 0
          && this._blueMult === 1;
    }

    equals(cxform: ColorTransform) {
      return this.alphaOffset === cxform.alphaOffset
          && this.redOffset === cxform.redOffset
          && this.greenOffset === cxform.greenOffset
          && this.blueOffset === cxform.blueOffset
          && this._alphaMult === cxform.alphaMultiplier
          && this._redMult === cxform.redMultiplier
          && this._greenMult === cxform.greenMultiplier
          && this._blueMult === cxform.blueMultiplier;
    }

    concat(cxform: ColorTransform): ColorTransform {
      this.alphaOffset += this._alphaMult * cxform.alphaOffset;
      this.redOffset += this._redMult * cxform.redOffset;
      this.greenOffset += this._greenMult * cxform.greenOffset;
      this.blueOffset += this._blueMult * cxform.blueOffset;
      this._alphaMult *= cxform.alphaMultiplier;
      this._redMult *= cxform.redMultiplier;
      this._greenMult *= cxform.greenMultiplier;
      this._blueMult *= cxform.blueMultiplier;
      return this;
    }

    clone(): ColorTransform {
      return (new ColorTransform()).copy(this);
    }

    copy(cxform: ColorTransform): ColorTransform {
      this.redOffset = cxform.redOffset;
      this.greenOffset = cxform.greenOffset;
      this.blueOffset = cxform.blueOffset;
      this.alphaOffset = cxform.alphaOffset;
      this._redMult = cxform.alphaMultiplier;
      this._greenMult = cxform.greenMultiplier;
      this._blueMult = cxform.blueMultiplier;
      this._alphaMult = cxform.alphaMultiplier;
      return this;
    }
  }
}
