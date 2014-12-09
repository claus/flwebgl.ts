/// <reference path="../geom/Matrix.ts" />
/// <reference path="../geom/ColorTransform.ts" />

module flwebgl.e
{
  import Matrix = flwebgl.geom.Matrix;
  import ColorTransform = flwebgl.geom.ColorTransform;

  interface UniformValuesMap { [shaderID: string]: UniformValue[] }

  export class lk
  {
    private _id: string;
    private _atlasID: string;
    private parent: MeshInstanced;
    private se: UniformValuesMap;

    ka: Geometry;

    constructor(id: string, h: Geometry, atlasID: string, parent: MeshInstanced) {
      this._id = id;
      this._atlasID = atlasID;
      this.ka = h;
      this.parent = parent;
      this.se = {};
    }

    get id(): string {
      return this._id;
    }

    get atlasID(): string {
      return this._atlasID;
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

    getVertexData(): VertexData[] {
      return this.ka.getVertexData(this._atlasID);
    }
    
    getNumIndices(): number {
      return this.ka.getNumIndices();
    }
    
    getUniforms(shaderID: number): UniformValue[] {
      return this.se["" + shaderID];
    }
    
    setUniforms(shaderID: number, uniforms: UniformValue[]) {
      this.se["" + shaderID] = uniforms;
    }
    
    getTransform(): Matrix {
      return this.parent.getTransform();
    }
    
    getColorTransform(): ColorTransform {
      return this.parent.getColorTransform();
    }

    destroy() {
      this.parent = void 0;
    }
  }
}
