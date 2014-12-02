/// <reference path="../../util/AssetPool.ts" />
/// <reference path="../Parser.ts" />
/// <reference path="IParser.ts" />

module flwebgl.xj.parsers
{
  import AssetPool = flwebgl.util.AssetPool;
  import Parser = flwebgl.xj.Parser;

  export class ParserDebug implements IParser
  {
    constructor(content: any, parser: Parser, assetPool: AssetPool) {

    }

    parseSounds(): boolean {
      return true;
    }

    parseFills(): boolean {
      return true;
    }

    parseShapes(): boolean {
      return true;
    }

    parseTimelines(): boolean {
      return true;
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
