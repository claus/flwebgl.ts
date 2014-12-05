/// <reference path="VertexAttribute.ts" />

module flwebgl.e
{
  export class VertexData
  {
    constructor(
      public vertices: Float32Array, // ba
      public vertexAttributes: VertexAttributes // jc
    ) {}
  }
}