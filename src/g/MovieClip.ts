/// <reference path="../geom/ColorTransform.ts" />
/// <reference path="../geom/Rect.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="../e/Mesh.ts" />
/// <reference path="../B/Timeline.ts" />
/// <reference path="../B/commands/IFrameCommand.ts" />
/// <reference path="../B/commands/PlaceObjectCommand.ts" />
/// <reference path="DisplayObject.ts" />

module flwebgl.g
{
  import ColorTransform = flwebgl.geom.ColorTransform;
  import Rect = flwebgl.geom.Rect;
  import Matrix = flwebgl.geom.Matrix;
  import Event = flwebgl.events.Event;
  import Mesh = flwebgl.e.Mesh;
  import Timeline = flwebgl.B.Timeline;
  import IFrameCommand = flwebgl.B.commands.IFrameCommand;
  import PlaceObjectCommand = flwebgl.B.commands.PlaceObjectCommand;
  import FrameLabel = flwebgl.B.FrameLabel;

  interface DeferredChild {
    index: number;
    displayObject: DisplayObject
  }

  export class MovieClip extends DisplayObject
  {
    timeline: Timeline;
    context: any;
    totalFrames: number;
    loop: boolean;
    yc: any;
    pa: any;
    Ui: any;
    df: boolean;
    Td: boolean;

    private children: DisplayObject[];
    private childrenDeferred: DeferredChild[];
    private currentFrameIndex: number;
    private _isPlaying: boolean;

    constructor() {
      super();
      this._id = "-1";
      this.loop = true;
      this._isPlaying = true;
      this.children = [];
      this.childrenDeferred = [];
      this.currentFrameIndex = -1;
      this.Ui = false;
      this.df = false;
      this.Td = false;
    }

    addChild(dobj: DisplayObject, e: boolean = true): boolean {
      return this.addChildAt(dobj, 0, e);
    }

    addChildAt(dobj: DisplayObject, index: number, e: boolean = true, defer: boolean = false): boolean {
      if (index == void 0 || index == null || index > this.getNumChildren()) {
        return false;
      }
      if (index < 0) { index = 0; }
      if (e) {
        dobj.id = "-1";
      }
      if (dobj.parent) {
        (<MovieClip>dobj.parent).removeChild(dobj);
      }
      if (defer) {
        this.childrenDeferred.push({
          index: index,
          displayObject: dobj
        });
        this.children.splice(index, 0, null);
        return true;
      }
      dobj.parent = this;
      dobj.setTransforms(this._globalTransform, this._globalColorTransform);
      this.children.splice(index, 0, dobj);
      dobj.dispatchEvent(new Event(Event.ADDED, true));
      if (dobj instanceof MovieClip) {
        var mc: MovieClip = <MovieClip>dobj;
        var p: DisplayObject = this;
        while (p.parent) {
          p = p.parent;
        }
        if (p === this.context.getStage() && mc.currentFrame === 0) {
          mc.advanceFrame();
          mc.dispatchEnterFrame();
          mc.constructFrame();
          mc.dispatchFrameConstructed();
          mc.executeFrameScripts();
          mc.dispatchExitFrame();
        }
      }
      return true;
    }

    removeChild(dobj: DisplayObject): DisplayObject {
      return this.removeChildAt(this.getChildIndex(dobj));
    }

    removeChildAt(index: number): DisplayObject {
      if (index >= 0 && index != void 0 && index != null && index < this.getNumChildren()) {
        var child: DisplayObject = this.getChildAt(index);
        if (!this.Td) {
          child.dispatchEvent(new Event(Event.REMOVED, true));
        }
        this.children.splice(index, 1);
        child.parent = void 0;
        child.removeAllListeners();
        return child;
      }
    }

    getNumChildren(): number {
      return this.children.length;
    }

    getChildren(): DisplayObject[] {
      return this.children.slice(0);
    }

    getChildAt(index: number, includeDeferred: boolean = false): DisplayObject {
      var dobj: DisplayObject;
      if (index < this.getNumChildren()) {
        dobj = this.children[index];
        if (dobj == null && includeDeferred) {
          for (var i = 0; i < this.childrenDeferred.length; i++) {
            if (this.childrenDeferred[i].index == index) {
              dobj = this.childrenDeferred[i].displayObject;
              break;
            }
          }
        }
      }
      return dobj;
    }

    getChildIndex(dobj: DisplayObject): number {
      return this.children.indexOf(dobj);
    }

    setChildIndex(dobj: DisplayObject, index: number) {
      this.swap(this.getChildIndex(dobj), index);
    }

    getChildByName(name: string): DisplayObject {
      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i].name === name) {
          return this.children[i];
        }
      }
      return void 0;
    }

    get currentFrame(): number {
      return this.currentFrameIndex + 1;
    }

    play() {
      this._isPlaying = true;
    }

    stop() {
      this._isPlaying = false;
    }

    get isPlaying(): boolean {
      return this._isPlaying;
    }

    gotoAndPlay(frame: number);
    gotoAndPlay(frame: string);
    gotoAndPlay(frame) {
      this.gotoFrame(frame, false);
    }

    gotoAndStop(frame: number);
    gotoAndStop(frame: string);
    gotoAndStop(frame) {
      this.gotoFrame(frame, true);
    }

    gotoFrame(frame: number, stop: boolean);
    gotoFrame(frame: string, stop: boolean);
    gotoFrame(frame, stop: boolean) {
      var frameNum: number;
      if (typeof frameNum === "string") {
        var found = false;
        var labels = this.timeline.labels;
        for (var i = labels.length - 1; i >= 0; i--) {
          if (labels[i].name === frame) {
            frameNum = labels[i].frameNum;
            found = true;
            break;
          }
        }
        if (found === false) {
          return;
        }
      } else {
        frameNum = frame;
      }
      if (frameNum >= 1 && frameNum <= this.totalFrames && frameNum !== this.currentFrame) {
        this.constructFrame(true);
        this.play();
        var e;
        if (frameNum < this.currentFrame) {
          e = (frameNum === 1);
          this.resetPlayHead(!e);
          this.constructFrame(!e);
        }
        while (this.currentFrame < frameNum) {
          e = (frameNum === this.currentFrame + 1);
          this.advanceFrame(true, e);
          this.constructFrame(!e);
        }
        if (stop === false) {
          this.play();
        } else {
          this.stop();
        }
        this.dispatchFrameConstructed();
        this.executeFrameScripts();
        this.dispatchExitFrame();
      }
    }

    swap(a: number, b: number) {
      if (a !== b && a >= 0 && a < this.children.length && b >= 0 && b < this.children.length) {
        this.children.splice(b, 0, this.children.splice(a, 1)[0]);
        for (var i = 0; i < this.childrenDeferred.length; i++) {
          var k = this.childrenDeferred[i];
          if (k.index == a) {
            k.index = b;
          } else {
            if (k.index > a) {
              k.index--;
            }
            if (k.index >= b) {
              k.index++;
            }
          }
        }
      }
    }

    dispatch(event: Event) {
      super.dispatch(event);
      if (this.parent && event.bubbles && !event._stopped) {
        this.parent.dispatch(event);
      }
    }

    advanceFrame(a: boolean = false, b: boolean = false) {
      var i;
      var advance = this._isPlaying;
      if (advance && !this.loop && this.currentFrameIndex == this.totalFrames - 1) { advance = false; }
      if (advance && this.currentFrameIndex == 0 && this.totalFrames == 1) { advance = false; }
      if (advance) {
        if (++this.currentFrameIndex == this.totalFrames) {
          this.resetPlayHead(a);
          this.constructFrame(a);
        } else {
          var e = a && !b;
          if (e) {
            this.Td = true;
          }
          var cmds = this.timeline.getFrameCommands(this.currentFrameIndex);
          for (i = 0; i < cmds.length; i++) {
            cmds[i].execute(this, this.context, e);
          }
          this.Td = false;
        }
        this.df = true;
      }
      // advance children
      if (!a) {
        for (i = 0; i < this.children.length; i++) {
          if (this.children[i] instanceof MovieClip) {
            (<MovieClip>this.children[i]).advanceFrame(a);
          }
        }
        for (i = 0; i < this.childrenDeferred.length; i++) {
          if (this.childrenDeferred[i].displayObject instanceof MovieClip) {
            (<MovieClip>this.childrenDeferred[i].displayObject).advanceFrame(a);
          }
        }
      }
    }

    dispatchFrameConstructed() {
      this.dispatchEvent(new Event(Event.FRAME_CONSTRUCTED));
      for (var a = 0; a < this.children.length; a++) {
        if (this.children[a] instanceof MovieClip) {
          (<MovieClip>this.children[a]).dispatchFrameConstructed();
        }
      }
    }

    dispatchEnterFrame() {
      this.dispatchEvent(new Event(Event.ENTER_FRAME));
      for (var a = 0; a < this.children.length; a++) {
        if (this.children[a] instanceof MovieClip) {
          (<MovieClip>this.children[a]).dispatchEnterFrame();
        }
      }
    }

    dispatchExitFrame() {
      this.dispatchEvent(new Event(Event.EXIT_FRAME));
      for (var a = 0; a < this.children.length; a++) {
        if (this.children[a] instanceof MovieClip) {
          (<MovieClip>this.children[a]).dispatchExitFrame();
        }
      }
    }

    constructFrame(silent: boolean = false) {
      var dobj: DisplayObject;
      var i: number;
      for (i = 0; i < this.childrenDeferred.length; i++) {
        dobj = this.childrenDeferred[i].displayObject;
        this.children[this.childrenDeferred[i].index] = dobj;
        dobj.parent = this;
      }
      for (i = 0; i < this.children.length; i++) {
        if (this.children[i] instanceof MovieClip) {
          (<MovieClip>this.children[i]).constructFrame();
        }
      }
      for (i = 0; i < this.childrenDeferred.length; i++) {
        dobj = this.childrenDeferred[i].displayObject;
        dobj.setTransforms(this._globalTransform, this._globalColorTransform);
        if (!silent) {
          dobj.dispatchEvent(new Event(Event.ADDED, true));
        }
      }
      this.childrenDeferred = [];
    }

    executeFrameScripts() {
      var i;
      if (this.df) {
        var scripts = this.timeline.getFrameScriptNames(this.currentFrameIndex);
        for (i = 0; i < scripts.length; i++) {
          this.executeFrameScript(scripts[i]);
        }
        this.df = false;
      }
      for (i = 0; i < this.children.length; i++) {
        if (this.children[i] instanceof MovieClip) {
          (<MovieClip>this.children[i]).executeFrameScripts();
        }
      }
    }

    getFrameLabels(): FrameLabel[] {
      var labelsCopy: FrameLabel[] = [];
      var labels = this.timeline.labels;
      for (var i = 0; i < labels.length; i++) {
        labelsCopy.push({
          frameNum: labels[i].frameNum,
          name: labels[i].name
        });
      }
      return labelsCopy;
    }

    getCurrentFrameLabel(): string {
      var name: string;
      var labels = this.timeline.labels;
      var currentFrame = this.currentFrame;
      for (var i = labels.length - 1; i >= 0; i--) {
        if (labels[i].frameNum === currentFrame) {
          name = labels[i].name;
        }
      }
      return name;
    }

    getCurrentLabel(): string {
      var name: string;
      var frameNum = -1;
      var labels = this.timeline.labels;
      for (var i = 0; i < labels.length; i++) {
        if (labels[i].frameNum >= frameNum && labels[i].frameNum <= this.currentFrame) {
          name = labels[i].name;
          frameNum = labels[i].frameNum;
        }
      }
      return name;
    }

    getChildIndexByID(id: string): number {
      if (+id < 0) {
        return -1;
      }
      var i: number;
      for (i = 0; i < this.children.length; i++) {
        if (this.children[i] && this.children[i].id === id) {
          return i;
        }
      }
      for (i = 0; i < this.childrenDeferred.length; i++) {
        if (this.childrenDeferred[i].displayObject.id === id) {
          return this.childrenDeferred[i].index;
        }
      }
      return -1;
    }

    Of(timeline: Timeline) {
      this.timeline = timeline;
      this.totalFrames = timeline.commands.length;
      this.currentFrameIndex = -1;
    }

    $j(a) {
      this.pa = a;
      this.Ui = true;
    }

    setTransforms(transform: Matrix, colorTransform: ColorTransform) {
      super.setTransforms(transform, colorTransform);
      for (var i = 0; i < this.children.length; ++i) {
        if (!this.children[i]) {
          debugger;
        }
        this.children[i].setTransforms(this._globalTransform, this._globalColorTransform);
      }
      if (this.pa !== void 0) {
        if (this._globalColorTransform.equals(this.pa.getColorTransform())) {
          this.pa.setTransforms(this._globalTransform);
        } else {
          this.oi();
        }
      }
    }

    destroy() {
      super.destroy();
      this.timeline = void 0;
      while (this.children.length) {
        this.children.pop().destroy();
      }
    }

    resetPlayHead(a: boolean = false) {
      this.currentFrameIndex = 0;
      if (a) { this.Td = true; }
      var k: number;
      var placeObjectCmds = [];
      var cmd: IFrameCommand;
      var cmds = this.timeline.getFrameCommands(0);
      for (k = 0; k < cmds.length; ++k) {
        cmd = cmds[k];
        if (cmd instanceof PlaceObjectCommand) {
          placeObjectCmds.push(cmd.targetID);
        }
      }
      for (k = 0; k < this.getNumChildren(); ++k) {
        var dobj = this.getChildAt(k);
        if (dobj.id !== "-1") {
          var d = true;
          if (placeObjectCmds.length > 0) {
            for (var n = 0; n < placeObjectCmds.length; ++n) {
              if (placeObjectCmds[n] === dobj.id) {
                placeObjectCmds.splice(n, 1);
                d = false;
                break;
              }
            }
          }
          if (d) {
            this.removeChildAt(k);
            dobj.destroy();
            k--;
          }
        }
      }
      for (k = 0; k < cmds.length; ++k) {
        cmd = cmds[k];
        cmd.execute(this, this.context, a);
      }
      this.Td = false;
      this.df = true;
    }

    oi() {
      if (this.pa !== void 0) {
        this.pa.destroy();
        this.pa = void 0;
      }
    }

    Qb(a) {
      var e;
      if (this.isVisible()) {
        if (this.pa === void 0) {
          var b = a.length;
          for (e = 0; e < this.children.length; ++e) {
            this.children[e].Qb(a);
          }
          if (this._dirty) {
            for (e = b; e < a.length; ++e) {
              a[e].dirty = true;
            }
          }
        } else {
          b = [];
          for (e = 0; e < this.children.length; ++e) {
            this.children[e].Qb(b);
          }
          var k = false;
          for (e = 0; !k && e < b.length; ++e) {
            k = b[e].dirty;
          }
          if (k) {
            this.oi();
            for (e = 0; e < b.length; ++e) {
              b[e].dirty = true;
              a.push(b[e]);
            }
          } else {
            this.pa.Qb(a);
          }
        }
        this._dirty = false;
      }
    }

    getBounds(target: DisplayObject = this, fast: boolean = true, edgeType: string = Mesh.EXTERNAL, k: boolean = false): Rect {
      var bounds = new Rect();
      for (var i = 0; i < this.children.length; i++) {
        bounds.union(this.children[i].getBounds(target, fast, edgeType, k));
      }
      return bounds;
    }

    executeFrameScript(name) {
      eval("flwebgl.actions." + name + ".call(this);")
    }
  }
}
