/// <reference path="../geom/Rect.ts" />
/// <reference path="ca.ts" />

module flwebgl.e
{
  import Rect = flwebgl.geom.Rect;

  interface CAMap { [edgeType: string]: ca[]; }

  export class Mesh
  {
    private _id: string;
    private fd: CAMap;

    bounds: Rect;

    constructor(id: string) {
      this._id = id;
      this.fd = {};
      this.fd[Mesh.INTERNAL] = [];
      this.fd[Mesh.EXTERNAL] = [];
      this.fd[Mesh.bb] = [];
    }

    get id(): string {
      return this._id;
    }

    Nb(edgeType: string, h: ca) {
      this.fd[edgeType].push(h);
    }

    yf(edgeType: string, i: number): ca {
      if (i < this.ra(edgeType)) {
        return this.fd[edgeType][i];
      }
    }

    ra(edgeType: string): number {
      return this.fd[edgeType].length;
    }

    calculateBounds() {
      this.bounds = new Rect();
      var count = this.ra(Mesh.EXTERNAL);
      for (var i = 0; i < count; i++) {
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
              for (var l = attr.location / Float32Array.BYTES_PER_ELEMENT; l < vertices.length; l += stride) {
                this.bounds.expand(vertices[l], vertices[l + 1]);
              }
              break;
            }
          }
        }
      }
    }

    static INTERNAL = "1"; // Z
    static EXTERNAL = "2"; // P
    static bb = "3"; // bb
  }
}
