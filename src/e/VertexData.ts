/// <reference path="AttributeDef.ts" />

module flwebgl.e
{
  export class VertexData
  {
    constructor(
      public vertices: Float32Array, // ba
      public attributeDefs: AttributesDefs // jc
    ) {}
  }
}