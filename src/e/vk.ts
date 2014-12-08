module flwebgl.e
{
  export class vk
  {
    Mb: any; // : wk
    shape: any; // : Shape

    constructor() {}

    In(a) {
      if (this.Mb) { this.Mb.Wj(); }
      this.Mb = a;
      if (this.Mb) { this.Mb.Vl(); }
    }

    getColorTransform() {
      return this.Mb.getColorTransform();
    }

    Hn(shape) {
      this.shape = shape;
    }

    setTransforms(a) {
      this.shape.setTransforms(a, void 0);
    }

    Qb(a) {
      this.shape.Qb(a);
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
