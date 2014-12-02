module flwebgl.e
{
  export class VertexAttribute
  {
    constructor(
      public byteOffset: number,
      public name: string,
      public type: number,
      public size: number
    ) {}
  }
}