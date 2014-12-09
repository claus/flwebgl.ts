/// <reference path="../../e/Mesh.ts" />
/// <reference path="../../media/Sound.ts" />
/// <reference path="../../B/Timeline.ts" />
/// <reference path="../../B/commands/IFrameCommand.ts" />
/// <reference path="../../B/commands/PlaceObjectCommand.ts" />
/// <reference path="../../B/commands/SetTransformCommand.ts" />
/// <reference path="../../B/commands/SetColorTransformCommand.ts" />
/// <reference path="../../B/commands/RemoveObjectCommand.ts" />
/// <reference path="../../B/commands/CacheAsBitmapCommand.ts" />
/// <reference path="../../B/commands/SetVisibilityCommand.ts" />
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
  import SetVisibilityCommand = flwebgl.B.commands.SetVisibilityCommand;
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
      var soundsJSON = this.content[ParserRelease.kSounds];
      for (var i = 0; i < soundsJSON.length; i++) {
        var soundJSON = soundsJSON[i];
        var id = soundJSON[0];
        var name = soundJSON[1];
        var src = soundJSON[2];
        this.assetPool.setSound(new Sound(id, name, src));
      }
      return true;
    }

    parseFills(): boolean {
      var fillsJSON = this.content[ParserRelease.kFills];
      if (fillsJSON.length === 0) {
        return true;
      }
      this.fillIDNameMap = {};
      this.fillNameIsOpaqueMap = {};
      this.fillNameStyleMap = {};
      for (var i = 0; i < fillsJSON.length; i++) {
        var fillJSON = fillsJSON[i];
        var id = "" + fillJSON[0];
        var style = fillJSON[1];
        var name = fillJSON[2];
        var isOpaque = (fillJSON[3] == "T");
        this.fillIDNameMap[id] = name;
        this.fillNameIsOpaqueMap[name] = isOpaque;
        this.fillNameStyleMap[name] = style;
      }
      return true;
    }

    parseShapes(): boolean {
      var shapesJSON = this.content[ParserRelease.kShapes];
      if (shapesJSON.length === 0) {
        return true;
      }
      for (var i = 0; i < shapesJSON.length; i++) {
        var shapeJSON = shapesJSON[i];
        var mesh = new Mesh(shapeJSON[0]);
        for (var j = 1; j < shapeJSON.length; j++) {
          var meshJSON = shapeJSON[j];
          var id = meshJSON[0];
          var vertices = meshJSON[1];
          var internalIndices = meshJSON[2];
          var edgeIndices = meshJSON[3];
          var concaveCurveIndices = meshJSON[4];
          var convexCurveIndices = meshJSON[5];
          var fillMatrix = [];
          var fillOverflow = "";
          var fillIsBitmapClipped = false;
          var fillName = this.fillIDNameMap[id];
          var fillIsOpaque = this.fillNameIsOpaqueMap[fillName];
          var fillStyle = this.fillNameStyleMap[fillName];
          switch (fillStyle) {
            case ParserRelease.kLinearGradient:
              fillMatrix = meshJSON[6];
              fillOverflow = meshJSON[7];
              break;
            case ParserRelease.kBitmap:
              fillMatrix = meshJSON[6];
              fillIsBitmapClipped = meshJSON[7];
              break;
          }
          var f = this.parser.If(vertices, fillName, fillStyle, fillMatrix, fillOverflow, fillIsBitmapClipped, fillIsOpaque, internalIndices);
          var q = this.parser.If(vertices, fillName, fillStyle, fillMatrix, fillOverflow, fillIsBitmapClipped, fillIsOpaque, [], concaveCurveIndices, convexCurveIndices, edgeIndices);
          var t = this.parser.dj(vertices, concaveCurveIndices, convexCurveIndices, edgeIndices, fillName, fillStyle, fillIsOpaque, fillMatrix, fillOverflow, fillIsBitmapClipped);
          var k;
          if (f.length) {
            for (k = 0; k < f.length; k++) {
              mesh.Nb(Mesh.INTERNAL, f[k]);
            }
          }
          if (q.length) {
            for (k = 0; k < q.length; k++) {
              mesh.Nb(Mesh.EXTERNAL, q[k]);
            }
          }
          if (t && t.length) {
            for (k = 0; k < t.length; k++) {
              mesh.Nb(Mesh.bb, t[k]);
            }
          }
        }
        mesh.calculateBounds();
        this.assetPool.setMesh(mesh);
      }
      return true;
    }

    parseTimelines(): boolean {
      var timelinesJSON = this.content[ParserRelease.kTimelines];
      if (timelinesJSON.length === 0) {
        return true;
      }
      for (var i = 0; i < timelinesJSON.length; i++) {
        var timelineJSON = timelinesJSON[i];
        var id = timelineJSON[0];
        var name = timelineJSON[1];
        var linkageName = timelineJSON[2];
        var isScene = timelineJSON[3];
        var labels: FrameLabel[] = [];
        var scripts: FrameScript[] = [];
        var j;
        for (j = 0; j < timelineJSON[4].length; j += 2) {
          labels.push({
            frameNum: timelineJSON[4][j],
            name: timelineJSON[4][j + 1]
          });
        }
        for (j = 0; j < timelineJSON[5].length; j += 2) {
          scripts.push({
            frameNum: timelineJSON[5][j],
            name: timelineJSON[5][j + 1]
          })
        }
        var timeline = new Timeline(id, name, linkageName, isScene, labels, scripts);
        for (j = 6; j < timelineJSON.length; j++) {
          var frame = timelineJSON[j];
          var cmds: IFrameCommand[] = [];
          var cmd: IFrameCommand = null;
          for (var k = 0; k < frame.length; k++) {
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
                cmd = new SetVisibilityCommand(frame[k].slice(1));
                break;
              case 6:
                if (this.parser.enableCacheAsBitmap) {
                  cmd = new CacheAsBitmapCommand(frame[k].slice(1));
                }
                break;
              case 7:
                // TODO: sounds
                //cmd = new c.media.Mh(frame[k].slice(1));
                break;
            }
            if (cmd) {
              cmds.push(cmd);
            }
          }
          timeline.addFrameCommands(cmds);
        }
        this.assetPool.setTimeline(timeline);
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
