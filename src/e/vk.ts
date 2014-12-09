/// <reference path="../geom/Matrix.ts" />
/// <reference path="wk.ts" />

module flwebgl.e
{
  import Matrix = flwebgl.geom.Matrix;
  import Shape = flwebgl.sg.Shape;

  export class vk
  {
    Mb: wk;
    shape: Shape;

    constructor() {}

    Hn(shape: Shape) {
      this.shape = shape;
    }

    In(a: wk) {
      if (this.Mb) { this.Mb.Wj(); }
      this.Mb = a;
      if (this.Mb) { this.Mb.Vl(); }
    }

    getColorTransform() {
      return this.Mb.colorTransform;
    }

    setTransforms(transform: Matrix) {
      this.shape.setTransforms(transform, void 0);
    }

    collectRenderables(a) {
      this.shape.collectRenderables(a);
    }

    destroy() {
      if (this.Mb) {
        this.Mb.Wj();
        this.Mb = void 0;
      }
      if (this.shape) {
        this.shape.destroy();
        this.shape = void 0;
      }
    }
  }
}
