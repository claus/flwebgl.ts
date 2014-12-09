/// <reference path="../util/Utils.ts" />
/// <reference path="../sg/IDisplayObjectDefinition.ts" />
/// <reference path="commands/IFrameCommand.ts" />

module flwebgl.B
{
  import Utils = flwebgl.util.Utils;
  import IFrameCommand = flwebgl.B.commands.IFrameCommand;
  import IDisplayObjectDefinition = flwebgl.sg.IDisplayObjectDefinition;

  export interface FrameLabel {
    frameNum: number;
    name: string;
  }

  export interface FrameScript {
    frameNum: number;
    name: string;
  }

  export interface FrameScriptMap { [id: string]: string[]; }

  export class Timeline implements IDisplayObjectDefinition
  {
    private _id: string;
    private _name: string;
    private _linkageName: string;
    private _isScene: boolean;
    private _labels: FrameLabel[];

    commands: IFrameCommand[][];
    scripts: FrameScriptMap;

    constructor(id: string, name: string, linkageName: string, isScene: boolean, labels: FrameLabel[], scripts: FrameScript[]) {
      this._id = id;
      this._name = name;
      this._linkageName = linkageName;
      this._isScene = isScene;
      this._labels = labels;
      this.commands = [];
      this.scripts = {};
      for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        var frameIdx = script.frameNum - 1;
        if (Utils.isUndefined(this.scripts[frameIdx])) {
          this.scripts[frameIdx] = [script.name];
        } else {
          this.scripts[frameIdx].push(script.name);
        }
      }
    }

    get id(): string { return this._id; }
    get name(): string { return this._name; }
    get linkageName(): string { return this._linkageName; }
    get isScene(): boolean { return this._isScene; }
    get labels(): FrameLabel[] { return this._labels; }

    getFrameScriptNames(frameIdx: number): string[] {
      return this.scripts[frameIdx] ? this.scripts[frameIdx] : [];
    }

    getFrameCommands(frameIdx: number): IFrameCommand[] {
      return (frameIdx < this.commands.length) ? this.commands[frameIdx] : [];
    }

    addFrameCommands(commands: IFrameCommand[]) {
      this.commands.push(commands);
    }
  }
}
