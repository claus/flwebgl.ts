module flwebgl.e
{
  export interface AttributeMap { [name: string]: Attribute }

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
    attributeMap: AttributeMap;

    constructor(attributes: Attribute[]) {
      this.attributeMap = {};
      for (var i = 0; i < attributes.length; i++) {
        this.attributeMap[attributes[i].name] = attributes[i];
      }
    }

    getAttributeByName(name: string): Attribute {
      return this.attributeMap[name];
    }
  }
}
