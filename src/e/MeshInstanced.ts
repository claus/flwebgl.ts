/// <reference path="../geom/ColorTransform.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../util/Utils.ts" />
/// <reference path="Mesh.ts" />
/// <reference path="GL.ts" />
/// <reference path="lk.ts" />

module flwebgl.e
{
  import Matrix = flwebgl.geom.Matrix;
  import ColorTransform = flwebgl.geom.ColorTransform;
  import Shape = flwebgl.sg.Shape;
  import Utils = flwebgl.util.Utils;

  interface LKMap { [edgeType: string]: lk[]; }

  export class MeshInstanced
  {
    private shape: Shape;
    private Gb: LKMap;

    dirty: boolean;

    constructor(shape: Shape) {
      this.shape = shape;
      this.dirty = true;
      this.Gb = {};
      this.Gb[Mesh.INTERNAL] = [];
      this.Gb[Mesh.EXTERNAL] = [];
      this.Gb[Mesh.bb] = [];
    }

    get depth(): number {
      return this.shape.depth;
    }
    set depth(value: number) {
      if (value !== this.shape.depth) {
        this.shape.depth = value;
        this.dirty = true;
      }
    }

    ra(edgeType: string): number {
      return (<Mesh>this.shape.Ic()).ra(edgeType);
    }

    ab(edgeType: string, i: number, gl: GL): lk {
      var buffers = this.Gb[edgeType][i];
      if (!buffers) {
        var mesh = <Mesh>this.shape.Ic();
        var _ca = mesh.yf(edgeType, i);
        if (!_ca) {
          return void 0;
        }
        buffers = new lk(Utils.cm(mesh.id, i, edgeType), _ca, gl.getTextureAtlasByFrameID(_ca.name).id, this);
        //         "meshid_i_edgetype",         bufs, atlasid, parent
        this.Gb[edgeType][i] = buffers;
      }
      return buffers;
    }

    getTransform(): Matrix {
      return this.shape.getGlobalTransform();
    }

    getColorTransform(): ColorTransform {
      return this.shape.getGlobalColorTransform();
    }

    destroy() {
      var a = [Mesh.INTERNAL, Mesh.EXTERNAL, Mesh.bb];
      for (var i = 0; i < a.length; ++i) {
        var edgeType = a[i];
        for (var j = 0; j < this.Gb[edgeType].length; ++j) {
          if (this.Gb[edgeType][j]) {
            this.Gb[edgeType][j].destroy();
            delete this.Gb[edgeType][j];
          }
        }
      }
    }
  }
}
