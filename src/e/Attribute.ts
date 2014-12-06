module flwebgl.e
{
  export class Attribute
  {
    constructor(
      public location: number,
      public name: string,
      public type: number,
      public size: number,
      public Hf: boolean = false
    ) {}
  }

  export class Attributes
  {
    fi: any;

    constructor(attributes: Attribute[]) {
      this.fi = {};
      for (var i = 0; i < attributes.length; i++) {
        this.fi[attributes[i].name] = attributes[i];
      }
    }

    getAttribs(name: string): Attribute {
      return this.fi[name];
    }
  }
}
