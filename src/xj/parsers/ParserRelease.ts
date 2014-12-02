/// <reference path="../../e/Mesh.ts" />
/// <reference path="../../util/AssetPool.ts" />
/// <reference path="../Parser.ts" />
/// <reference path="IParser.ts" />

module flwebgl.xj.parsers
{
  import Mesh = flwebgl.e.Mesh;
  import AssetPool = flwebgl.util.AssetPool;
  import Parser = flwebgl.xj.Parser;

  interface FillIDNameMap { [id: string]: string; }
  interface FillNameIsOpaqueMap { [name: string]: boolean; }
  interface FillNameStyleMap { [name: string]: string; }

  export class ParserRelease implements IParser
  {
    private content: any;
    private parser: Parser;
    private assetPool: AssetPool;
    private ac: number;
    private fillIDNameMap: FillIDNameMap;
    private fillNameIsOpaqueMap: FillNameIsOpaqueMap;
    private fillNameStyleMap: FillNameStyleMap;

    constructor(content: any, parser: Parser, assetPool: AssetPool) {
      this.content = content;
      this.parser = parser;
      this.assetPool = assetPool;
      this.ac = -1;
    }

    parseSounds(): boolean {
      return true;
    }

    parseFills(): boolean {
      var fills = this.content[ParserRelease.kFills];
      if (fills.length === 0) {
        return true;
      }
      this.fillIDNameMap = {};
      this.fillNameIsOpaqueMap = {};
      this.fillNameStyleMap = {};
      for (var i = 0; i < fills.length; i++) {
        var fill = fills[i];
        var id = "" + fill[0];
        var style = fill[1];
        var name = fill[2];
        var isOpaque = (fill[3] == "T");
        this.fillIDNameMap[id] = name;
        this.fillNameIsOpaqueMap[name] = isOpaque;
        this.fillNameStyleMap[name] = style;
      }
      return true;
    }

    parseShapes(): boolean {
      var shapes = this.content[ParserRelease.kShapes];
      if (shapes.length === 0) {
        return true;
      }
      for (var i = 0; i < shapes.length; i++) {
        var shape = shapes[i];
        var meshAsset = new Mesh(shape[0]);
        for (var j = 1; j < shape.length; j++) {
          var mesh = shape[j];
          var id = mesh[0];
          var vertices = mesh[1];
          var internalIndices = mesh[2];
          var edgeIndices = mesh[3];
          var concaveCurveIndices = mesh[4];
          var convexCurveIndices = mesh[5];
          var fillMatrix = [];
          var fillOverflow = "";
          var fillIsBitmapClipped = false;
          var fillName = this.fillIDNameMap[id];
          var fillIsOpaque = this.fillNameIsOpaqueMap[fillName];
          var fillStyle = this.fillNameStyleMap[fillName];
          switch (fillStyle) {
            case ParserRelease.kLinearGradient:
              fillMatrix = mesh[6];
              fillOverflow = mesh[7];
              break;
            case ParserRelease.kBitmap:
              fillMatrix = mesh[6];
              fillIsBitmapClipped = mesh[7];
              break;
          }
          var f = this.parser.If(vertices, fillName, fillStyle, fillMatrix, fillOverflow, fillIsBitmapClipped, fillIsOpaque, internalIndices);
          var q = this.parser.If(vertices, fillName, fillStyle, fillMatrix, fillOverflow, fillIsBitmapClipped, fillIsOpaque, [], concaveCurveIndices, convexCurveIndices, edgeIndices);
          var t = this.parser.dj(vertices, concaveCurveIndices, convexCurveIndices, edgeIndices, fillName, fillStyle, fillIsOpaque, fillMatrix, fillOverflow, fillIsBitmapClipped);
          var k;
          if (f.length) {
            for (k = 0; k < f.length; k++) {
              meshAsset.Nb(Mesh.INTERNAL, f[k]);
            }
          }
          if (q.length) {
            for (k = 0; k < q.length; k++) {
              meshAsset.Nb(Mesh.EXTERNAL, q[k]);
            }
          }
          if (t && t.length) {
            for (k = 0; k < t.length; k++) {
              meshAsset.Nb(Mesh.bb, t[k]);
            }
          }
        }
        meshAsset.calculateBounds();
        this.assetPool.setMesh(meshAsset);
      }
      return true;
    }

    parseTimelines(): boolean {
      return true;
    }

    static kSolid = "s";
    static kLinearGradient = "lG";
    static kBitmap = "b";
    static kFills = "fills";
    static kShapes = "shapes";
    static kTimelines = "timelines";
    static kSounds = "sounds";
    static kSrc = "src";
  }
}
