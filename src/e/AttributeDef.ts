module flwebgl.e
{
  export class AttributeDef
  {
    constructor(
      public byteOffset: number,
      public name: string,
      public type: number,
      public size: number
    ) {}
  }

  export class AttributesDefs
  {
    constructor(
      public attrs: AttributeDef[] = [],
      public totalSize: number = 0
    ) {}
  }
}
