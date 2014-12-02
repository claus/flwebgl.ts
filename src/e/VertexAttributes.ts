/// <reference path="VertexAttribute.ts" />

module flwebgl.e
{
  export class VertexAttributes
  {
    constructor(
      public attrs: VertexAttribute[] = [],
      public totalSize: number = 0
    ) {}
  }
}