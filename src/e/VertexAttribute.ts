module flwebgl.e
{
  export class VertexAttribute
  {
    constructor(
      public location: number,
      public name: string,
      public type: number,
      public size: number,
      public hf: boolean = false
    ) {}
  }

  export class VertexAttributes
  {
    constructor(
      public attrs: VertexAttribute[] = [],
      public totalSize: number = 0
    ) {}
  }
}
