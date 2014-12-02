/// <reference path="../geom/Rect.ts" />
/// <reference path="ca.ts" />

module flwebgl.e
{
  import Rect = flwebgl.geom.Rect;

  export class Mesh
  {
    private _id: string;

    private fd: any;
    private bounds: Rect;

    constructor(id: string) {
      this._id = id;
      this.fd = {};
      this.fd["" + Mesh.INTERNAL] = [];
      this.fd["" + Mesh.EXTERNAL] = [];
      this.fd["" + Mesh.bb] = [];
    }

    get id(): string {
      return this._id;
    }

    Nb(edgeType: number, h: ca) {
      this.fd["" + edgeType].push(h);
    }

    yf(edgeType: number, i: number): ca {
      if (i < this.ra(edgeType)) {
        return this.fd["" + edgeType][i];
      }
    }

    ra(edgeType: number) {
      return this.fd["" + edgeType].length;
    }

    calculateBounds() {
      this.bounds = new Rect();
      var len = this.ra(Mesh.EXTERNAL);
      for (var i = 0; i < len; i++) {
        var yf = this.yf(Mesh.EXTERNAL, i);
        var atlasIDs = yf.getAtlasIDs();
        var vertexDataArr = yf.getVertexData(atlasIDs[0]);
        for (var j = 0; j < vertexDataArr.length; j++) {
          var vertexData = vertexDataArr[j];
          var attrs = vertexData.vertexAttributes.attrs;
          for (var k = 0; k < attrs.length; ++k) {
            var attr = attrs[k];
            if (attr.name === "POSITION0") {
              var vertices = vertexData.vertices;
              var stride = vertexData.vertexAttributes.totalSize / Float32Array.BYTES_PER_ELEMENT;
              for (var l = attr.byteOffset / Float32Array.BYTES_PER_ELEMENT; l < vertices.length; l += stride) {
                this.bounds.union(new Rect(vertices[l], vertices[l + 1], 0, 0));
              }
              break;
            }
          }
        }
      }
    }

    static INTERNAL = 1;
    static EXTERNAL = 2;
    static bb = 3;
  }
}
