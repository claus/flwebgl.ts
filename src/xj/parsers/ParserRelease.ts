/// <reference path="../../e/Mesh.ts" />
/// <reference path="../../media/Sound.ts" />
/// <reference path="../../B/Timeline.ts" />
/// <reference path="../../B/commands/IFrameCommand.ts" />
/// <reference path="../../B/commands/PlaceObjectCommand.ts" />
/// <reference path="../../B/commands/SetTransformCommand.ts" />
/// <reference path="../../B/commands/SetColorTransformCommand.ts" />
/// <reference path="../../B/commands/RemoveObjectCommand.ts" />
/// <reference path="../../B/commands/CacheAsBitmapCommand.ts" />
/// <reference path="../../util/AssetPool.ts" />
/// <reference path="../Parser.ts" />
/// <reference path="IParser.ts" />

module flwebgl.xj.parsers
{
  import Mesh = flwebgl.e.Mesh;
  import Sound = flwebgl.media.Sound;
  import Timeline = flwebgl.B.Timeline;
  import FrameLabel = flwebgl.B.FrameLabel;
  import FrameScript = flwebgl.B.FrameScript;
  import IFrameCommand = flwebgl.B.commands.IFrameCommand;
  import PlaceObjectCommand = flwebgl.B.commands.PlaceObjectCommand;
  import SetTransformCommand = flwebgl.B.commands.SetTransformCommand;
  import SetColorTransformCommand = flwebgl.B.commands.SetColorTransformCommand;
  import RemoveObjectCommand = flwebgl.B.commands.RemoveObjectCommand;
  import CacheAsBitmapCommand = flwebgl.B.commands.CacheAsBitmapCommand;
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
    private fillIDNameMap: FillIDNameMap;
    private fillNameIsOpaqueMap: FillNameIsOpaqueMap;
    private fillNameStyleMap: FillNameStyleMap;

    nextHighestID: number;

    constructor(content: any, parser: Parser, assetPool: AssetPool) {
      this.content = content;
      this.parser = parser;
      this.assetPool = assetPool;
      this.nextHighestID = -1;
    }

    parseSounds(): boolean {
      var sounds = this.content[ParserRelease.kSounds];
      for (var i = 0; i < sounds.length; i++) {
        var sound = sounds[i];
        var id = sound[0];
        var name = sound[1];
        var src = sound[2];
        this.assetPool.setSound(new Sound(id, name, src));
      }
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
      var timelines = this.content[ParserRelease.kTimelines];
      if (timelines.length === 0) {
        return true;
      }
      for (var i = 0; i < timelines.length; i++) {
        var timeline = timelines[i];
        var id = timeline[0];
        var name = timeline[1];
        var linkageName = timeline[2];
        var isScene = timeline[3];
        var labels: FrameLabel[] = [];
        var scripts: FrameScript[] = [];
        var j;
        for (j = 0; j < timeline[4].length; j += 2) {
          labels.push({
            frameNum: timeline[4][j],
            name: timeline[4][j + 1]
          });
        }
        for (j = 0; j < timeline[5].length; j += 2) {
          scripts.push({
            frameNum: timeline[5][j],
            name: timeline[5][j + 1]
          })
        }
        var timelineAsset = new Timeline(id, name, linkageName, isScene, labels, scripts);
        for (j = 6; j < timeline.length; j++) {
          var frame = timeline[j];
          var cmds: IFrameCommand[] = [];
          var cmd: IFrameCommand = null;
          for (var k = 0; k < frame.length; k++) {
            // TODO
            switch (frame[k][0]) {
              case 1:
                cmd = new PlaceObjectCommand(frame[k].slice(1));
                this.nextHighestID = Math.max(this.nextHighestID, +cmd.targetID);
                break;
              case 2:
                cmd = new SetTransformCommand(frame[k].slice(1));
                break;
              case 3:
                cmd = new SetColorTransformCommand(frame[k].slice(1));
                break;
              case 4:
                cmd = new RemoveObjectCommand(frame[k].slice(1));
                break;
              case 5:
                // SetVisibility
                //cmd = new c.B.Vh(frame[k].slice(1));
                break;
              case 6:
                if (this.parser.enableCacheAsBitmap) {
                  cmd = new CacheAsBitmapCommand(frame[k].slice(1));
                }
                break;
              case 7:
                //cmd = new c.media.Mh(frame[k].slice(1));
                break;
            }
            if (cmd) {
              cmds.push(cmd);
            }
          }
          timelineAsset.addFrameCommands(cmds);
        }
        this.assetPool.setTimeline(timelineAsset);
      }
      return true
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
