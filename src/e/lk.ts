/// <reference path="MeshInstanced.ts" />

module flwebgl.e
{
  export class lk
  {
    private _id: string;
    private ka: any;
    private lb: any;
    private parent: MeshInstanced;
    private se: any;

    constructor(id: string, h, b, parent: MeshInstanced) {
      this._id = id;
      this.ka = h;
      this.lb = b;
      this.parent = parent;
      this.se = {}
    }

    get id(): string {
      return this._id;
    }

    nc() {
      return this.ka.nc(this.lb);
    }
    
    sa() {
      return this.ka.sa();
    }
    
    getUniforms(a) {
      return this.se[a];
    }
    
    setUniforms(a, h) {
      this.se[a] = h;
    }
    
    getTransform() {
      return this.parent.getTransform();
    }
    
    getColorTransform() {
      return this.parent.getColorTransform();
    }
    
    get depth(): number {
      return this.parent.depth;
    }
    
    get dirty(): boolean {
      return this.parent.dirty;
    }
    
    get isOpaque(): boolean {
      var cxform = this.parent.getColorTransform();
      return (this.ka.isOpaque && cxform.alphaMultiplier == 1 && cxform.alphaOffset == 0);
    }
    
    destroy() {
      this.parent = void 0;
    }
  }
}
