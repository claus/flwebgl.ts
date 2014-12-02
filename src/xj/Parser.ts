/// <reference path="../geom/Color.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../geom/Rect.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../geom/Matrix3x3.ts" />
/// <reference path="../util/AssetPool.ts" />
/// <reference path="../util/Utils.ts" />
/// <reference path="../e/GL.ts" />
/// <reference path="../e/ca.ts" />
/// <reference path="../e/Mesh.ts" />
/// <reference path="../e/TextureAtlas.ts" />
/// <reference path="../e/VertexData.ts" />
/// <reference path="../e/VertexAttribute.ts" />
/// <reference path="../e/VertexAttributes.ts" />
/// <reference path="../PlayerOptions.ts" />
/// <reference path="../TextureAtlas.ts" />
/// <reference path="parsers/IParser.ts" />
/// <reference path="parsers/ParserRelease.ts" />
/// <reference path="parsers/ParserDebug.ts" />

module flwebgl.xj
{
  import Color = flwebgl.geom.Color;
  import Point = flwebgl.geom.Point;
  import Rect = flwebgl.geom.Rect;
  import Matrix = flwebgl.geom.Matrix;
  import Matrix3x3 = flwebgl.geom.Matrix3x3;
  import AssetPool = flwebgl.util.AssetPool;
  import Utils = flwebgl.util.Utils;
  import GL = flwebgl.e.GL;
  import ca = flwebgl.e.ca;
  import Mesh = flwebgl.e.Mesh;
  import TextureAtlas = flwebgl.e.TextureAtlas;
  import VertexData = flwebgl.e.VertexData;
  import VertexAttribute = flwebgl.e.VertexAttribute;
  import VertexAttributes = flwebgl.e.VertexAttributes;
  import PlayerOptions = flwebgl.PlayerOptions;
  import IParser = flwebgl.xj.parsers.IParser;
  import ParserRelease = flwebgl.xj.parsers.ParserRelease;
  import ParserDebug = flwebgl.xj.parsers.ParserDebug;

  export class StageInfo {
    constructor(
      public width: number,
      public height: number,
      public color: Color,
      public frameRate: number,
      public loop: boolean,
      public timelines: any
    ) {}
  }

  export class BufferData {
    constructor(
      public vertices: number[] = [],
      public indices: number[] = []
    ) {}
  }

  export class Parser
  {
    private assetPool: AssetPool;
    private enableCacheAsBitmap: boolean;
    private enableStandardDerivatives: boolean;
    private vertexAttributes: VertexAttributes;
    private S: number;

    constructor(assetPool: AssetPool) {
      this.assetPool = assetPool;
    }

    init(content: any, textures: flwebgl.TextureAtlas[], options: PlayerOptions): StageInfo {
      if (textures) {
        for (var i = 0; i < textures.length; i++) {
          var texture = textures[i];
          if (!this.parseTextureAtlas(texture.textureJSON, texture.imageURL, "" + i)) {
            return null;
          }
        }
      }
      return this.parse(content, options);
    }

    parse(content: any, options: PlayerOptions): StageInfo {
      if (typeof content === "string") {
        content = JSON.parse(content);
      }
      var header = content[Parser.kHeader];
      var stageSize = header[Parser.kStageSize];

      var stageInfo = new StageInfo(
        stageSize[Parser.kWidth],
        stageSize[Parser.kHeight],
        Utils.getColor(header[Parser.kStageColor]),
        header[Parser.kFrameRate],
        header[Parser.kLoop],
        header[Parser.kSceneTimelines]
      );

      var p: IParser = (header[Parser.kReadable] == true)
                     ? new ParserDebug(content, this, this.assetPool)
                     : new ParserRelease(content, this, this.assetPool);

      this.enableCacheAsBitmap = options.cacheAsBitmap;
      this.enableStandardDerivatives = options.standardDerivatives;
      this.S = this.enableStandardDerivatives ? 11 : 7;

      if (!p.parseSounds() || !p.parseFills()) {
        return stageInfo;
      }

      this.vertexAttributes = new VertexAttributes();
      var y = new VertexAttribute(0, "POSITION0", GL.FLOAT, 2);
      var w = new VertexAttribute(2 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD0", GL.FLOAT, 2);
      var t = new VertexAttribute(4 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD1", GL.FLOAT, 1);
      var q = new VertexAttribute(5 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD2", GL.FLOAT, 2);
      if (this.enableStandardDerivatives) {
        var r = new VertexAttribute(7 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD3", GL.FLOAT, 2);
        var u = new VertexAttribute(9 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD4", GL.FLOAT, 2);
        this.vertexAttributes.attrs = [y, w, t, q, r, u];
      } else {
        this.vertexAttributes.attrs = [y, w, t, q];
      }
      this.vertexAttributes.totalSize = this.S * Float32Array.BYTES_PER_ELEMENT;

      // TODO
      if (!p.parseShapes() || !p.parseTimelines()) {
        return stageInfo;
      }

      // TODO
      //this.ac = p.ac;

      return stageInfo;
    }

    parseTextureAtlas(textureJSON: any, imageURL: string, atlasID: string) {
      if (!textureJSON) {
        return false;
      }
      var frames = textureJSON[Parser.kFrames];
      if (!frames) {
        return false;
      }
      var width = textureJSON[Parser.kMeta][Parser.kSize][Parser.kW];
      var height = textureJSON[Parser.kMeta][Parser.kSize][Parser.kH];
      var textureAtlas = new TextureAtlas(atlasID, imageURL, width, height);
      for (var id in frames) {
        var frame = frames[id][Parser.kFrame];
        var rect = new Rect(frame[Parser.kX] + 1, frame[Parser.kY] + 1, frame[Parser.kW] - 2, frame[Parser.kH] - 2);
        textureAtlas.setFrame(id, rect);
      }
      this.assetPool.setTextureAtlas(textureAtlas);
      return true;
    }

    If(vertices: number[], fillName: string, fillStyle: string, fillMatrix: number[], fillOverflow: string, fillIsBitmapClipped: boolean, fillIsOpaque: boolean, internalIndices: number[] = [], concaveCurveIndices: number[] = [], convexCurveIndices: number[] = [], edgeIndices: number[] = []): ca[] {
      if (internalIndices.length == 0 && concaveCurveIndices.length == 0 && convexCurveIndices.length == 0 && edgeIndices.length == 0) {
        return [];
      }
      var C: ca[] = [];
      var bufferDataArray: BufferData[];
      var edgeType;
      if (internalIndices.length > 0) {
        edgeType = Mesh.INTERNAL;
        bufferDataArray = this.createInternalBuffers(vertices, internalIndices);
      } else {
        edgeType = Mesh.EXTERNAL;
        bufferDataArray = this.createExternalBuffers(vertices, concaveCurveIndices, convexCurveIndices, edgeIndices);
      }
      for (var i = 0; i < bufferDataArray.length; i++) {
        var bufferData = bufferDataArray[i];
        var u = new ca(fillName, fillIsOpaque);
        var r = this.injectLoopBlinnTexCoords(bufferData, fillName, fillStyle, fillMatrix);
        for (var atlasID in r) {
          var fillVertices = r[atlasID];
          if (this.enableStandardDerivatives) {
            this.injectStandardDerivativeTexCoords(edgeType, fillVertices, bufferData.indices.length);
          }
          u.setVertexData(atlasID, [new VertexData(new Float32Array(fillVertices), this.vertexAttributes)]);
          u.setIndices(bufferData.indices);
        }
        u.fillMode = this.getFillMode(fillStyle, fillOverflow, fillIsBitmapClipped);
        C.push(u);
      }
      return C;
    }

    dj(vertices, concaveCurveIndices, convexCurveIndices, edgeIndices, fillName, fillStyle, fillIsOpaque, fillMatrix, fillOverflow, fillIsBitmapClipped): ca[] {
      return null;
    }

    // xl
    createInternalBuffers(vertices, indices): BufferData[] {
      var bufferDataArray: BufferData[] = [];
      var start = 0;
      var end = 0;
      var texCoords = [ new Point(0, 1), new Point(0, 1), new Point(0, 1) ];
      while (end < indices.length) {
        start = end;
        end = (indices.length - end > GL.MAX_VERTICES) ? end + GL.MAX_VERTICES : indices.length;
        bufferDataArray.push(this.af(vertices, indices, start, end, texCoords, 100000));
      }
      return bufferDataArray;
    }

    // wl
    createExternalBuffers(vertices, concaveCurveIndices, convexCurveIndices, edgeIndices): BufferData[] {
      var bufferDataArray: BufferData[] = [];
      var w = 0;
      var t = 0;
      var start = 0;
      var endConcave = 0;
      var endConvex = 0;
      var endEdge = 0;
      var curveTexCoords = [ Parser.tex[0], Parser.tex[1], Parser.tex[2] ];
      var edgeTexCoords = [ new Point(0, 0), new Point(0, 1), new Point(0, 0) ];
      var totalIndices = concaveCurveIndices.length + convexCurveIndices.length + edgeIndices.length;
      while (t < totalIndices) {
        var bufferData = new BufferData();
        w = t;
        t = (totalIndices - t > GL.MAX_VERTICES) ? t + GL.MAX_VERTICES : totalIndices;
        w = t - w;
        start = endConcave;
        endConcave = (endConcave < concaveCurveIndices.length)
                      ? (w > concaveCurveIndices.length - endConcave)
                        ? concaveCurveIndices.length
                        : endConcave + w
                      : endConcave;
        w -= (endConcave - start);
        if (start != endConcave) {
          bufferData = this.af(vertices, concaveCurveIndices, start, endConcave, curveTexCoords, -1);
        }
        if (w > 0) {
          start = endConvex;
          endConvex = (endConvex < convexCurveIndices.length)
                      ? (w > convexCurveIndices.length - endConvex)
                        ? convexCurveIndices.length
                        : endConvex + w
                      : endConvex;
          w -= endConvex - start;
          bufferData = this.af(vertices, convexCurveIndices, start, endConvex, curveTexCoords, 1, bufferData);
        }
        if (w > 0) {
          start = endEdge;
          endEdge = (endEdge < edgeIndices.length)
                    ? (w > edgeIndices.length - endEdge)
                      ? edgeIndices.length
                      : endEdge + w
                    : endEdge;
          bufferData = this.af(vertices, edgeIndices, start, endEdge, edgeTexCoords, 1, bufferData);
        }
        bufferDataArray.push(bufferData);
      }
      return bufferDataArray;
    }

    af(vertices, indices, start, end, texCoords, isConvexMultiplier, bufferData?: BufferData): BufferData {
      if (!bufferData) { bufferData = new BufferData(); }
      var bufVertices = bufferData.vertices;
      var bufIndices = bufferData.indices;
      var bufVertexOffset = bufVertices.length;
      var bufIndexOffset = bufIndices.length;
      var iIndex = 0;
      while (start < end) {
        for (var i = 0; i < 3; i++) {
          var index = indices[start + i];
          bufIndices[bufIndexOffset + iIndex] = iIndex;
          bufVertices[bufVertexOffset++] = vertices[2 * index];
          bufVertices[bufVertexOffset++] = vertices[2 * index + 1];
          bufVertices[bufVertexOffset++] = texCoords[i].x;
          bufVertices[bufVertexOffset++] = texCoords[i].y;
          bufVertices[bufVertexOffset++] = isConvexMultiplier;
          for (var iVertex = 5; iVertex < this.S; iVertex++) {
            bufVertices[bufVertexOffset++] = null;
          }
          iIndex++;
        }
        start += 3;
      }
      return bufferData;
    }

    injectLoopBlinnTexCoords(bufferData: BufferData, fillName: string, fillStyle: string, fillMatrix: number[]) {
      var d = {};
      var atlases = this.assetPool.getTextureAtlases();
      var offset = this.enableStandardDerivatives ? this.S - 6 : this.S - 2;
      for (var i = 0; i < atlases.length; i++) {
        var atlas = atlases[i];
        var frame = atlas.getFrame(fillName);
        if (frame !== void 0) {
          var textureWidth = atlas.width;
          var textureHeight = atlas.height;
          switch (fillStyle) {
            case ParserRelease.kSolid:
            case ParserDebug.kSolid:
              this.injectLoopBlinnTexCoords_SolidFill(bufferData.vertices, this.S, offset, textureWidth, textureHeight, frame, bufferData.indices.length);
              break;
            case ParserRelease.kLinearGradient:
            case ParserDebug.kLinearGradient:
              this.injectLoopBlinnTexCoords_LinearGradientFill(bufferData.vertices, this.S, offset, bufferData.indices.length, fillMatrix);
              break;
            case ParserRelease.kBitmap:
            case ParserDebug.kBitmap:
              this.injectLoopBlinnTexCoords_BitmapFill(bufferData.vertices, this.S, offset, bufferData.indices.length, fillMatrix, frame.width, frame.height);
              break;
          }
          if (bufferData.vertices && bufferData.vertices.length > 0) {
            d[atlas.id] = bufferData.vertices;
          }
        }
      }
      return d;
    }

    injectLoopBlinnTexCoords_SolidFill(vertices: number[], stride: number, offset: number, textureWidth: number, textureHeight: number, frame: Rect, count: number) {
      if (count > 0) {
        var texCoord = new Point(frame.left + frame.width / 2, frame.top + frame.height / 2);
        texCoord.x /= textureWidth;
        texCoord.y /= textureHeight;
        for (var i = 0; i < count; i++) {
          vertices[offset] = texCoord.x;
          vertices[offset + 1] = texCoord.y;
          offset += stride;
        }
      }
    }

    injectLoopBlinnTexCoords_LinearGradientFill(vertices: number[], stride: number, offset: number, count: number, matrixValues: number[]) {
      if (count > 0 && matrixValues.length == 6) {
        var matrix = new Matrix(matrixValues);
        matrix.multiply(Parser.fillMatrixIdentity);
        var isInvertible = matrix.isInvertible();
        if (isInvertible) {
          matrix.invert();
        }
        var iVert = 0;
        var iTex = offset;
        for (var i = 0; i < count; i++) {
          if (!isInvertible) {
            vertices[iTex] = 0.5;
          } else {
            var texCoord = matrix.transformPoint(new Point(vertices[iVert], vertices[iVert + 1]));
            vertices[iTex] = texCoord.x;
          }
          vertices[iTex + 1] = 0.5;
          iVert += stride;
          iTex += stride;
        }
      }
    }

    injectLoopBlinnTexCoords_BitmapFill(vertices: number[], stride: number, offset: number, count: number, matrixValues: number[], bitmapWidth: number, bitmapHeight: number) {
      if (count > 0 && matrixValues.length == 6) {
        var matrix = new Matrix(matrixValues);
        matrix.invert();
        bitmapWidth /= 20;
        bitmapHeight /= 20;
        matrix.setValue(0, 0, matrix.getValue(0, 0) / bitmapWidth);
        matrix.setValue(1, 0, matrix.getValue(1, 0) / bitmapHeight);
        matrix.setValue(0, 1, matrix.getValue(0, 1) / bitmapWidth);
        matrix.setValue(1, 1, matrix.getValue(1, 1) / bitmapHeight);
        matrix.setValue(0, 3, matrix.getValue(0, 3) / bitmapWidth);
        matrix.setValue(1, 3, matrix.getValue(1, 3) / bitmapHeight);
        var posOffset = 0;
        var texOffset = offset;
        for (var i = 0; i < count; i++) {
          var texCoord = matrix.transformPoint(new Point(vertices[posOffset], vertices[posOffset + 1]));
          vertices[texOffset] = texCoord.x;
          vertices[texOffset + 1] = texCoord.y;
          posOffset += stride;
          texOffset += stride;
        }
      }
    }

    // ti
    injectStandardDerivativeTexCoords(edgeType, vertices, count) {
      var offset = this.S - 4;
      var stride = this.S;
      var len = count * stride;
      var i = 0;
      switch (edgeType) {
        case Mesh.INTERNAL:
          while (i < len) {
            vertices[offset] = 0;
            vertices[offset + 1] = 1;
            vertices[offset + 2] = 0;
            vertices[offset + 3] = 1;
            offset += stride;
            i += stride;
          }
          break;
        case Mesh.EXTERNAL:
        case Mesh.bb:
          while (i < len) {
            var stride2 = stride * 2;
            var texCoords: Point[] = [];
            texCoords.push(new Point(vertices[i],           vertices[i + 1]));
            texCoords.push(new Point(vertices[i + stride],  vertices[i + 1 + stride]));
            texCoords.push(new Point(vertices[i + stride2], vertices[i + 1 + stride2]));
            var d = this.bl([
                vertices[i + 2],
                vertices[i + 3],
                1,
                vertices[i + 2 + stride],
                vertices[i + 3 + stride],
                1,
                vertices[i + 2 + stride2],
                vertices[i + 3 + stride2],
                1
              ],
              texCoords
            );
            vertices[offset    ] = d[0].x;
            vertices[offset + 1] = d[0].y;
            vertices[offset + 2] = d[1].x;
            vertices[offset + 3] = d[1].y;
            vertices[offset +     stride] = d[0].x;
            vertices[offset + 1 + stride] = d[0].y;
            vertices[offset + 2 + stride] = d[1].x;
            vertices[offset + 3 + stride] = d[1].y;
            vertices[offset +     stride2] = d[0].x;
            vertices[offset + 1 + stride2] = d[0].y;
            vertices[offset + 2 + stride2] = d[1].x;
            vertices[offset + 3 + stride2] = d[1].y;
            offset += stride * 3;
            i += stride * 3;
          }
          break;
      }
    }

    bl(matrixValues: number[], texCoords: Point[]) {
      var p2 = texCoords[1].sub(texCoords[0]);
      var p3 = texCoords[2].sub(texCoords[0]);
      var m1 = new Matrix3x3([ 0, 0, 1, p2.x, p2.y, 1, p3.x, p3.y, 1 ]);
      m1.invert();
      var x = matrixValues[0];
      var y = matrixValues[1];
      matrixValues[0] = 0;
      matrixValues[1] = 0;
      matrixValues[3] -= x;
      matrixValues[4] -= y;
      matrixValues[6] -= x;
      matrixValues[7] -= y;
      var m2 = new Matrix3x3(matrixValues);
      m2.concat(m1);
      return [
        m2.transformPoint(new Point(1, 0)),
        m2.transformPoint(new Point(0, 1))
      ];
    }

    getFillMode(fillStyle: string, fillOverflow: string, fillIsBitmapClipped: boolean) {
      var fillMode = 0;
      switch (fillStyle) {
        case ParserRelease.kLinearGradient:
        case ParserDebug.kLinearGradient:
          fillMode = ca.fillModeMap[fillOverflow];
          break;
        case ParserRelease.kBitmap:
        case ParserDebug.kBitmap:
          fillMode = ca.fillModeMap[fillIsBitmapClipped ? ca.kFill_Repeat : ca.kFill_Extend];
          break;
      }
      // 0: n/a
      // 1: extend
      // 2: repeat
      // 3: reflect
      return fillMode;
    }

    static tex = [
      new Point(0, 0),
      new Point(0.5, 0),
      new Point(1, 1),
      new Point(0, 1),
      new Point(0.25, -0.25),
      new Point(1, 0.75)
    ];

    static fillMatrixIdentity = new Matrix([ 1638.4, 0, 0, 1638.4, -819.2, -819.2 ]);

    static kHeader = "header";
    static kStageSize = "stageSize";
    static kWidth = "width";
    static kHeight = "height";
    static kStageColor = "stageColor";
    static kFrameRate = "frameRate";
    static kReadable = "readable";
    static kLoop = "loop";
    static kSceneTimelines = "sceneTimelines";
    static kFrames = "frames";
    static kFrame = "frame";
    static kMeta = "meta";
    static kSize = "size";
    static kX = "x";
    static kY = "y";
    static kW = "w";
    static kH = "h";

  }
}