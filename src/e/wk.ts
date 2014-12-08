/// <reference path="../geom/Matrix.ts" />
/// <reference path="../geom/Color.ts" />
/// <reference path="../geom/ColorTransform.ts" />
/// <reference path="Mesh.ts" />

module flwebgl.e
{
  import Matrix = flwebgl.geom.Matrix;
  import Color = flwebgl.geom.Color;
  import ColorTransform = flwebgl.geom.ColorTransform;

  export class wk
  {
    private $n: any;

    private _textureID: string;
    private _mesh: Mesh;
    private _color: Color;
    private _transform: Matrix;
    private _colorTransform: ColorTransform;
    private _ug: number;

    constructor(textureID: string, mesh: Mesh, d, color: Color, transform: Matrix, colorTransform: ColorTransform) {
      this._textureID = textureID;
      this._mesh = mesh;
      this.$n = d;
      this._color = color;
      this._transform = transform.clone();
      this._colorTransform = colorTransform ? colorTransform.clone() : new ColorTransform();
      this._ug = 0;
    }

    get textureID(): string {
      return this._textureID;
    }

    get mesh(): Mesh {
      return this._mesh;
    }

    get color(): Color {
      return this._color;
    }

    get transform(): Matrix {
      return this._transform;
    }

    get colorTransform(): ColorTransform {
      return this._colorTransform;
    }

    get ug(): number {
      return this._ug;
    }

    Vl() {
      this._ug++;
    }

    Wj() {
      this._ug--;
    }
  }
}
