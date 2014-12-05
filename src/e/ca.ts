/// <reference path="VertexData.ts" />
/// <reference path="VertexAttribute.ts" />

module flwebgl.e
{
  export interface VertexDataMap {
    [atlasID: string]: VertexData[];
  }

  export class VertexAttributesArray {
    public attrs: VertexAttributes[] = [];
    constructor() {}
  }

  export class ca
  {
    name: string;
    isOpaque: boolean;
    fillMode: number;
    indices: Uint16Array;
    vertexDataMap: VertexDataMap;
    vertexAttributesArray: VertexAttributesArray;

    constructor(name: string, isOpaque: boolean) {
      this.name = name;
      this.isOpaque = isOpaque;
      this.fillMode = 0;
      this.vertexDataMap = {}; // Rg
      this.vertexAttributesArray = new VertexAttributesArray();
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
        this.vertexAttributesArray.attrs.push(vertexData[i].vertexAttributes);
      }
    }

    // we
    setIndices(indices: number[]) {
      this.indices = new Uint16Array(indices);
    }

    sa(): number {
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
