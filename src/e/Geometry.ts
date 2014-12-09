/// <reference path="VertexData.ts" />
/// <reference path="AttributeDef.ts" />

module flwebgl.e
{
  export interface VertexDataMap {
    [atlasID: string]: VertexData[];
  }

  export class AttributeDefsArray {
    public attrs: AttributesDefs[] = [];
    constructor() {}
  }

  export class Geometry
  {
    name: string;
    isOpaque: boolean;
    fillMode: number;
    indices: Uint16Array;
    vertexDataMap: VertexDataMap;
    attributeDefsArray: AttributeDefsArray;

    constructor(name: string, isOpaque: boolean) {
      this.name = name;
      this.isOpaque = isOpaque;
      this.fillMode = 0;
      this.vertexDataMap = {}; // Rg
      this.attributeDefsArray = new AttributeDefsArray();
    }

    get id(): number {
      return -1;
    }

    // nc
    getVertexData(atlasID: string): VertexData[] {
      return (atlasID != undefined) ? this.vertexDataMap[atlasID] : void 0;
    }

    // xe
    setVertexData(atlasID: string, vertexData: VertexData[]) {
      this.vertexDataMap[atlasID] = vertexData;
      for (var i = 0; i < vertexData.length; i++) {
        this.attributeDefsArray.attrs.push(vertexData[i].attributeDefs);
      }
    }

    // we
    setIndices(indices: number[]) {
      this.indices = new Uint16Array(indices);
    }

    getNumIndices(): number {
      return this.indices.length;
    }

    // qj
    getAtlasIDs(): string[] {
      var atlasIDs = [];
      for (var atlasID in this.vertexDataMap) {
        atlasIDs.push(atlasID);
      }
      return atlasIDs;
    }

    static kFill_Extend = "Extend";
    static kFill_Repeat = "Repeat";
    static kFill_Reflect = "Reflect";

    static fillModeMap = {
      Extend: 1,
      Repeat: 2,
      Reflect: 3
    };
  }
}
