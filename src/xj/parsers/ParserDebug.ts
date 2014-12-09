/// <reference path="../../util/AssetPool.ts" />
/// <reference path="../Parser.ts" />
/// <reference path="IParser.ts" />

module flwebgl.xj.parsers
{
  import AssetPool = flwebgl.util.AssetPool;
  import Parser = flwebgl.xj.Parser;

  export class ParserDebug implements IParser
  {
    nextHighestID: number;

    constructor(content: any, parser: Parser, assetPool: AssetPool) {
      this.nextHighestID = -1;
    }

    parseSounds(): boolean {
      return false;
    }

    parseFills(): boolean {
      return false;
    }

    parseShapes(): boolean {
      return false;
    }

    parseTimelines(): boolean {
      return false;
    }

    static kSolid = "solid";
    static kLinearGradient = "linearGradient";
    static kBitmap = "bitmap";
    static kId = "id";
    static kName = "name";
    static kLinkageName = "linkageName";
    static kIsScene = "isScene";
    static kLabels = "labels";
    static kFrameNum = "frameNum";
    static kFills = "fills";
    static kStyle = "style";
    static kIsOpaque = "isOpaque";
    static kShapes = "shapes";
    static kMeshes = "meshes";
    static kInternalIndices = "internalIndices";
    static kConcaveCurveIndices = "concaveCurveIndices";
    static kConvexCurveIndices = "convexCurveIndices";
    static kEdgeIndices = "edgeIndices";
    static kVertices = "vertices";
    static kFillId = "fillId";
    static kFillMatrix = "fillMatrix";
    static kOverflow = "overflow";
    static kIsBitmapClipped = "isBitmapClipped";
    static kTimelines = "timelines";
    static kScripts = "scripts";
    static kScript = "script";
    static kFrames = "frames";
    static kSounds = "sounds";
    static kSrc = "src";
    static kFramesCmds = "frameCmds";
  }
}
