/// <reference path="../geom/Rect.ts" />
/// <reference path="../sg/IDisplayObjectDefinition.ts" />
/// <reference path="Geometry.ts" />

module flwebgl.e
{
  import Rect = flwebgl.geom.Rect;
  import IDisplayObjectDefinition = flwebgl.sg.IDisplayObjectDefinition;

  interface GeometryMap { [edgeType: string]: Geometry[]; }

  export class Mesh implements IDisplayObjectDefinition
  {
    private _id: string;
    private fd: GeometryMap;

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

    setGeometry(edgeType: string, geometry: Geometry) {
      this.fd[edgeType].push(geometry);
    }

    getGeometryCount(edgeType: string): number {
      return this.fd[edgeType].length;
    }

    getGeometry(edgeType: string, i: number): Geometry {
      if (i < this.getGeometryCount(edgeType)) {
        return this.fd[edgeType][i];
      }
    }

    calculateBounds() {
      this.bounds = new Rect();
      var count = this.getGeometryCount(Mesh.EXTERNAL);
      for (var i = 0; i < count; i++) {
        var yf = this.getGeometry(Mesh.EXTERNAL, i);
        var atlasIDs = yf.getAtlasIDs();
        var vertexDataArr = yf.getVertexData(atlasIDs[0]);
        for (var j = 0; j < vertexDataArr.length; j++) {
          var vertexData = vertexDataArr[j];
          var attrs = vertexData.attributeDefs.attrs;
          for (var k = 0; k < attrs.length; ++k) {
            var attr = attrs[k];
            if (attr.name === "POSITION0") {
              var vertices = vertexData.vertices;
              var stride = vertexData.attributeDefs.totalSize / Float32Array.BYTES_PER_ELEMENT;
              for (var l = attr.byteOffset / Float32Array.BYTES_PER_ELEMENT; l < vertices.length; l += stride) {
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
