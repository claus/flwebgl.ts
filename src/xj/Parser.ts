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
      public sceneTimelines: number[]
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
    enableCacheAsBitmap: boolean;
    emulateStandardDerivatives: boolean;
    nextHighestID: number;

    private assetPool: AssetPool;
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

      var parser: IParser = (header[Parser.kReadable] == true)
                             ? new ParserDebug(content, this, this.assetPool)
                             : new ParserRelease(content, this, this.assetPool);

      this.enableCacheAsBitmap = options.cacheAsBitmap;
      this.emulateStandardDerivatives = options.emulateStandardDerivatives;
      this.S = this.emulateStandardDerivatives ? 11 : 7;

      if (!parser.parseSounds() || !parser.parseFills()) {
        return stageInfo;
      }

      this.vertexAttributes = new VertexAttributes();
      var y = new VertexAttribute(0, "POSITION0", GL.FLOAT, 2);
      var w = new VertexAttribute(2 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD0", GL.FLOAT, 2);
      var t = new VertexAttribute(4 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD1", GL.FLOAT, 1);
      var q = new VertexAttribute(5 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD2", GL.FLOAT, 2);
      if (this.emulateStandardDerivatives) {
        var r = new VertexAttribute(7 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD3", GL.FLOAT, 2);
        var u = new VertexAttribute(9 * Float32Array.BYTES_PER_ELEMENT, "TEXCOORD4", GL.FLOAT, 2);
        this.vertexAttributes.attrs = [y, w, t, q, r, u];
      } else {
        this.vertexAttributes.attrs = [y, w, t, q];
      }
      this.vertexAttributes.totalSize = this.S * Float32Array.BYTES_PER_ELEMENT;

      // TODO
      if (!parser.parseShapes() || !parser.parseTimelines()) {
        return stageInfo;
      }

      this.nextHighestID = parser.nextHighestID;

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
          if (this.emulateStandardDerivatives) {
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
      var C = 0;
      var v = 0;
      var B = 0;
      var I = 0;
      var X = [];
      var index0, index1, index2;
      var vertex0, vertex1, vertex2;
      var p1x, p1y, p2x, p2y;
      var p1len, p2len;
      var U = 3 * Math.floor(GL.MAX_VERTICES / 6);
      var count = concaveCurveIndices.length + convexCurveIndices.length + edgeIndices.length;
      while (C < count) {
        var A = C;
        C = (count - C > U) ? C + U : count;
        var L = C - A;
        var resVertices = [];
        var resIndices = [];
        var indexOffs = 0;
        var vertexOffs = 0;
        var W = this.ec(7);
        var x = B;
        B = (B < convexCurveIndices.length) ? ((convexCurveIndices.length - B < L) ? convexCurveIndices.length : B + L) : B;
        L = L - (B - x);
        var curIndices = convexCurveIndices;
        var texCoord0 = this.ec(0);
        var texCoord1 = this.ec(1);
        var texCoord2 = this.ec(2);
        for (; x < B; x += 3) {
          index0 = curIndices[x];
          index1 = curIndices[x + 1];
          index2 = curIndices[x + 2];
          vertex0 = new Point(vertices[2 * index0], vertices[2 * index0 + 1]);
          vertex1 = new Point(vertices[2 * index1], vertices[2 * index1 + 1]);
          vertex2 = new Point(vertices[2 * index2], vertices[2 * index2 + 1]);
          p1x = vertex0.x - vertex1.x;
          p1y = vertex0.y - vertex1.y;
          p2x = vertex1.x - vertex2.x;
          p2y = vertex1.y - vertex2.y;
          p1len = Math.sqrt(p1x * p1x + p1y * p1y);
          p2len = Math.sqrt(p2x * p2x + p2y * p2y);
          var P = new Point(vertex0.x - 2 * (-p1y / p1len), vertex0.y - 2 * (p1x / p1len));
          var Q = new Point(vertex2.x - 2 * (-p2y / p2len), vertex2.y - 2 * (p2x / p2len));
          var V = this.wi([vertex0, vertex1, vertex2], [texCoord0, texCoord1, texCoord2], [P, vertex1, Q]);
          this.Sc(resVertices, resIndices, [vertex0, P, vertex1], [texCoord0, V[0], texCoord1], [1, 1, 1], vertexOffs, indexOffs);
          vertexOffs += 3 * this.S;
          indexOffs += 3;
          this.Sc(resVertices, resIndices, [vertex1, Q, vertex2], [texCoord1, V[2], texCoord2], [1, 1, 1], vertexOffs, indexOffs);
          vertexOffs += 3 * this.S;
          indexOffs += 3;
        }
        if (L > 0) {
          x = v;
          v = (v < concaveCurveIndices.length) ? ((concaveCurveIndices.length - v < L) ? concaveCurveIndices.length : v + L) : v;
          L -= v - x;
          texCoord0 = this.ec(4);
          texCoord1 = this.ec(5);
          texCoord2 = this.ec(6);
          curIndices = concaveCurveIndices;
          for (; x < v; x += 3) {
            index0 = curIndices[x];
            index1 = curIndices[x + 1];
            index2 = curIndices[x + 2];
            vertex0 = new Point(vertices[2 * index0], vertices[2 * index0 + 1]);
            vertex1 = new Point(vertices[2 * index1], vertices[2 * index1 + 1]);
            vertex2 = new Point(vertices[2 * index2], vertices[2 * index2 + 1]);
            p1x = (vertex0.x + vertex2.x) / 2;
            p1y = (vertex0.y + vertex2.y) / 2;
            p2x = vertex2.x - vertex0.x;
            p2y = vertex2.y - vertex0.y;
            p2len = Math.sqrt(p2x * p2x + p2y * p2y);
            P = new Point(vertex0.x + 0.1 * Math.min(2, p2len) * (-p2y / p2len), vertex0.y + 0.1 * Math.min(2, p2len) * (p2x / p2len));
            var Y = new Point(p1x, p1y);
            Q = new Point(vertex2.x + 0.1 * Math.min(2, p2len) * (-p2y / p2len), vertex2.y + 0.1 * Math.min(2, p2len) * (p2x / p2len));
            V = this.wi([vertex0, vertex1, vertex2], [texCoord0, texCoord1, texCoord2], [P, Y, Q]);
            this.Sc(resVertices, resIndices, [vertex0, P, vertex2], [texCoord0, V[0], texCoord2], [-1, -1, -1], vertexOffs, indexOffs);
            vertexOffs += 3 * this.S;
            indexOffs += 3;
            this.Sc(resVertices, resIndices, [vertex2, P, Q], [texCoord2, V[0], V[2]], [-1, -1, -1], vertexOffs, indexOffs);
            vertexOffs += 3 * this.S;
            indexOffs += 3;
          }
        }
        if (L > 0) {
          var K = I;
          I = I < edgeIndices.length ? edgeIndices.length - I < L ? edgeIndices.length : I + L : I;
          curIndices = edgeIndices;
          texCoord0 = this.ec(4);
          texCoord1 = this.ec(4);
          for (x = K; x < I; x += 3) {
            index0 = curIndices[x];
            index1 = curIndices[x + 1];
            index2 = curIndices[x + 2];
            vertex0 = new Point(vertices[2 * index0], vertices[2 * index0 + 1]);
            vertex1 = new Point(vertices[2 * index1], vertices[2 * index1 + 1]);
            vertex2 = new Point(vertices[2 * index2], vertices[2 * index2 + 1]);
            p1x = vertex2.x - vertex0.x;
            p1y = vertex2.y - vertex0.y;
            p1len = Math.sqrt(p1x * p1x + p1y * p1y);
            P = new Point(vertex0.x - 2 * (-p1y / p1len), vertex0.y - 2 * (p1x / p1len));
            Y = new Point(vertex2.x - 2 * (-p1y / p1len), vertex2.y - 2 * (p1x / p1len));
            this.Sc(resVertices, resIndices, [vertex0, P, vertex2], [texCoord0, W, texCoord1], [-1, -1, -1], vertexOffs, indexOffs);
            vertexOffs += 3 * this.S;
            indexOffs += 3;
            this.Sc(resVertices, resIndices, [P, Y, vertex2], [W, W, texCoord1], [-1, -1, -1], vertexOffs, indexOffs);
            vertexOffs += 3 * this.S;
            indexOffs += 3;
          }
        }
        if (resIndices.length == 0) {
          return null;
        }
        //var L = new ca(fillName, fillIsOpaque); // TODO: remove this? doesn't seem to be used
        var bufferData = new BufferData(resVertices, resIndices);
        var u = new ca(fillName, fillIsOpaque);
        var r = this.injectLoopBlinnTexCoords(bufferData, fillName, fillStyle, fillMatrix);
        var edgeType = Mesh.bb;
        for (var atlasID in r) {
          var fillVertices = r[atlasID];
          if (this.emulateStandardDerivatives) {
            this.injectStandardDerivativeTexCoords(edgeType, fillVertices, bufferData.indices.length);
          }
          u.setVertexData(atlasID, [new VertexData(new Float32Array(fillVertices), this.vertexAttributes)]);
          u.setIndices(bufferData.indices);
        }
        u.fillMode = this.getFillMode(fillStyle, fillOverflow, fillIsBitmapClipped);
        X.push(u);
      }
      return X;
    }

    Sc(vertices: number[], indices: number[], positions: Point[], texCoords: Point[], isConvexMultipliers: number[], vertexOffs, indexOffs) {
      vertices[vertexOffs + 0] = positions[0].x;
      vertices[vertexOffs + 1] = positions[0].y;
      vertices[vertexOffs + 2] = texCoords[0].x;
      vertices[vertexOffs + 3] = texCoords[0].y;
      vertices[vertexOffs + 4] = isConvexMultipliers[0];
      vertexOffs += this.S;

      vertices[vertexOffs + 0] = positions[1].x;
      vertices[vertexOffs + 1] = positions[1].y;
      vertices[vertexOffs + 2] = texCoords[1].x;
      vertices[vertexOffs + 3] = texCoords[1].y;
      vertices[vertexOffs + 4] = isConvexMultipliers[1];
      vertexOffs += this.S;

      vertices[vertexOffs + 0] = positions[2].x;
      vertices[vertexOffs + 1] = positions[2].y;
      vertices[vertexOffs + 2] = texCoords[2].x;
      vertices[vertexOffs + 3] = texCoords[2].y;
      vertices[vertexOffs + 4] = isConvexMultipliers[2];

      indices[indexOffs + 0] = indexOffs + 0;
      indices[indexOffs + 1] = indexOffs + 1;
      indices[indexOffs + 2] = indexOffs + 2;
    }

    ec(a): Point {
      if (a >= 9) { return Parser.tex[a - 5]; }
      if (a >= 4) { a -= 4; }
      if (a == 4) { a = 3; }
      return Parser.tex[a];
    }

    wi(a, b, h): Point[] {
      var k = [];
      var a1delta = a[1].sub(a[0]);
      var a2delta = a[2].sub(a[0]);
      var b1delta = b[1].sub(b[0]);
      var b2delta = b[2].sub(b[0]);
      var det1 = 1 / (b1delta.x * b2delta.y - b2delta.x * b1delta.y);
      var s = (b2delta.y * a1delta.x - b1delta.y * a2delta.x) * det1;
      var t = (b2delta.y * a1delta.y - b1delta.y * a2delta.y) * det1;
      var u = (-b2delta.x * a1delta.x + b1delta.x * a2delta.x) * det1;
      var v = (-b2delta.x * a1delta.y + b1delta.x * a2delta.y) * det1;
      var det2 = 1 / (s * v - t * u);
      s = s * det2;
      t = -t * det2;
      u = -u * det2;
      v = v * det2;
      for (var i = 0; i < h.length; i++) {
        var pt = h[i].sub(a[0]);
        var pt2 = new Point(
          pt.x * v + pt.y * u,
          pt.x * t + pt.y * s
        );
        k.push(pt2.add(b[0]));
      }
      return k;
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
      var offset = this.emulateStandardDerivatives ? this.S - 6 : this.S - 2;
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