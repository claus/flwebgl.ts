/// <reference path="VertexData.ts" />
/// <reference path="VertexAttributes.ts" />

module flwebgl.e
{
  export class VertexAttributesArray {
    public ta: VertexAttributes[] = [];
    constructor() {}
  }

  export class ca
  {
    name: string;
    isOpaque: boolean;
    fillMode: number;
    indices: Uint16Array;
    vertexDataMap: any;
    he: VertexAttributesArray;

    constructor(name: string, isOpaque: boolean) {
      this.name = name;
      this.isOpaque = isOpaque;
      this.fillMode = 0;
      this.vertexDataMap = {};
      this.he = new VertexAttributesArray();
    }

    getID(): number {
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
        this.he.ta.push(vertexData[i].vertexAttributes);
      }
    }

    // we
    setIndices(indices: number[]) {
      this.indices = new Uint16Array(indices);
    }

    sa(): number {
      return this.indices.length;
    }

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
