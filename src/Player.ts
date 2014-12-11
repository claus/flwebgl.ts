/// <reference path="e/GL.ts" />
/// <reference path="e/Renderer.ts" />
/// <reference path="e/IRenderable.ts" />
/// <reference path="e/BitmapCacheFactory.ts" />
/// <reference path="sg/MovieClip.ts" />
/// <reference path="sg/SceneGraphFactory.ts" />
/// <reference path="media/SoundFactory.ts" />
/// <reference path="util/AssetPool.ts" />
/// <reference path="util/Logger.ts" />
/// <reference path="util/Utils.ts" />
/// <reference path="xj/Parser.ts" />
/// <reference path="geom/Rect.ts" />
/// <reference path="geom/Color.ts" />
/// <reference path="PlayerOptions.ts" />
/// <reference path="TextureAtlas.ts" />

module flwebgl
{
  import GL = flwebgl.e.GL;
  import Renderer = flwebgl.e.Renderer;
  import IRenderable = flwebgl.e.IRenderable;
  import BitmapCacheFactory = flwebgl.e.BitmapCacheFactory;
  import MovieClip = flwebgl.sg.MovieClip;
  import SceneGraphFactory = flwebgl.sg.SceneGraphFactory;
  import SoundFactory = flwebgl.media.SoundFactory;
  import AssetPool = flwebgl.util.AssetPool;
  import Logger = flwebgl.util.Logger;
  import Utils = flwebgl.util.Utils;
  import Parser = flwebgl.xj.Parser;
  import Rect = flwebgl.geom.Rect;
  import Color = flwebgl.geom.Color;

  export class Player
  {
    assetPool: AssetPool;

    private canvas: HTMLCanvasElement;
    private options: PlayerOptions;
    private renderer: Renderer;
    private soundFactory: SoundFactory;
    private sceneGraphFactory: SceneGraphFactory;
    private bitmapCacheFactory: BitmapCacheFactory;
    private parser: Parser;
    private context: Context;
    private stage: MovieClip;
    private sceneTimelines: number[];
    private completeCBK: any;

    private texturesLoaded: boolean;
    private soundsLoaded: boolean;

    private backgroundColor: Color;
    private stageWidth: number;
    private stageHeight: number;
    private frameRate: number;
    private frameDuration: number;
    private loop: boolean;
    private playMode: number;
    private numFrames: number;
    private rafID: number;
    private timeoutID: number;
    private startTime: number;
    private Xe: number;
    private Hi: number;
    private currentSceneIndex: number;
    private jd: boolean;
    private renderables: IRenderable[];
    private mainLoop: Function;
    private frameRenderListener: Function;

    constructor() {
      this.assetPool = new AssetPool();
      this.mainLoop = this._loop.bind(this);
      this.playMode = Player.kIsStopped;
      this.stageWidth = 550;
      this.stageHeight = 400;
      this.currentSceneIndex = -1;
      this.jd = true;
      this.numFrames = 0;
      this.soundsLoaded = false;
      this.texturesLoaded = false;
    }

    init(canvas: HTMLCanvasElement, content: any, textures: TextureAtlas[], callback: any, options: any = {}) {
      if (!canvas || !content) {
        return Player.E_INVALID_PARAM;
      }
      this.canvas = canvas;
      this.options = new PlayerOptions(options);
      try {
        this.renderer = new Renderer(canvas, this.options);
      } catch (error) {
        return Player.E_CONTEXT_CREATION_FAILED;
      }
      this.completeCBK = callback;
      this.soundFactory = new SoundFactory();
      this.options.emulateStandardDerivatives = !this.renderer.hasExtension("OES_standard_derivatives");
      this.parser = new Parser(this.assetPool);
      var stageInfo = this.parser.init(content, textures, this.options);
      if (stageInfo) {
        this.context = new Context(this.renderer, this.assetPool, this.soundFactory);
        this.sceneGraphFactory = new SceneGraphFactory(this.context, this.parser.nextHighestID + 1);
        if (this.options.cacheAsBitmap) {
          this.bitmapCacheFactory = new BitmapCacheFactory(this.renderer, this.assetPool, this.sceneGraphFactory);
        }
        this.context.sceneGraphFactory = this.sceneGraphFactory;
        this.context.bitmapCacheFactory = this.bitmapCacheFactory;
        if (textures && textures.length > 0) {
          this.renderer.loadTextures(this.assetPool.getTextureAtlases(), this._texturesLoadedCBK.bind(this))
        } else {
          this._texturesLoadedCBK();
        }
        if (this.assetPool.getSounds().length > 0) {
          this.soundFactory.loadSounds(this.assetPool.getSounds(), this._soundsLoadedCBK.bind(this))
        } else {
          this._soundsLoadedCBK();
        }
        this.backgroundColor = stageInfo.color;
        this.stageWidth = stageInfo.width;
        this.stageHeight = stageInfo.height;
        this.frameRate = (stageInfo.frameRate < 0) ? 1 : stageInfo.frameRate;
        this.loop = stageInfo.loop;
        this.sceneTimelines = stageInfo.sceneTimelines;
        this.renderer.setBackgroundColor(this.backgroundColor);
        this.frameDuration = 1000 / this.frameRate;
        this.stage = this.sceneGraphFactory.createMovieClip(void 0, "-1");
        this.context.stage = this.stage;
        this.stage.loop = this.loop;
        return Player.S_OK;
      } else {
        return Player.E_RESOURCE_LOADING_FAILED;
      }
    }

    private _texturesLoadedCBK() {
      this.renderer.setGL();
      this.texturesLoaded = true;
      this._checkComplete();
    }

    private _soundsLoadedCBK() {
      this.soundsLoaded = true;
      this._checkComplete();
    }

    private _checkComplete() {
      if (this.completeCBK && this.texturesLoaded && this.soundsLoaded) {
        this.completeCBK();
        this.completeCBK = null;
      }
    }

    getStageWidth(): number {
      return this.stageWidth;
    }
    getStageHeight(): number {
      return this.stageHeight;
    }

    setViewport(rect: Rect) {
      this.renderer.setViewport(rect);
      this.renderer.clear(true, true, false);
    }

    play(scene?: string): boolean {
      var sceneIndex = 0;
      var h = this.jd;
      this.jd = true;
      if (scene && scene.length) {
        var found = false;
        for (var i = 0; i < this.sceneTimelines.length; i++) {
          var timelineID = "" + this.sceneTimelines[i];
          if (this.assetPool.getTimeline(timelineID).name === scene) {
            sceneIndex = i;
            found = true;
            this.jd = false;
            break;
          }
        }
        if (!found) {
          return false;
        }
      }
      this.canvas.addEventListener("webglcontextlost", this.webglContextLostHandler, false);
      this.canvas.addEventListener("webglcontextrestored", this.webglContextRestoredHandler, false);
      this.startTime = (new Date).getTime();
      if (!h || !this.jd) {
        this.gotoScene(sceneIndex, h !== this.jd);
      }
      this.playMode = Player.kIsPlaying;
      this.rafID = Utils.requestAnimFrame(this.mainLoop, this.frameRate, window);
      return true;
    }

    stop() {
      this.playMode = Player.kIsStopped;
    }

    _loop() {
      try {
        if (this.playMode !== Player.kIsPlaying) {
          this.canvas.removeEventListener("webglcontextlost", this.webglContextLostHandler, false);
          this.canvas.removeEventListener("webglcontextrestored", this.webglContextRestoredHandler, false);
          if (this.rafID) {
            Utils.cancelAnimFrame(this.rafID, window);
            this.rafID = undefined;
          }
          if (this.timeoutID) {
            window.clearTimeout(this.timeoutID);
          }
        } else {
          this.rafID = Utils.requestAnimFrame(this.mainLoop, this.frameRate, window);
          this.timeoutID = undefined;
          if (this.Xe == this.Hi) {
            this.Gk();
            this.Xe = (this.Xe + 1) % (this.frameRate + 1);
          }
          var elapsed = (new Date).getTime() - this.startTime;
          if (elapsed < this.frameDuration && this.frameDuration - elapsed < Math.ceil(1000 / 60)) {
            if (this.rafID) {
              Utils.cancelAnimFrame(this.rafID, window);
              this.rafID = undefined;
            }
            this.timeoutID = window.setTimeout(this.mainLoop, this.frameDuration - elapsed);
          } else if (elapsed >= this.frameDuration) {
            this.collectRenderables();
            this.draw();
          }
        }
      } catch (error) {
        Logger.error(error.message);
        this.stop();
        throw error;
      }
    }

    collectRenderables() {
      this.stage.setTransforms(void 0, void 0);
      if (this.options.cacheAsBitmap) {
        this.bitmapCacheFactory.Qn();
      }
      this.renderables = [];
      this.stage.collectRenderables(this.renderables);
    }

    draw() {
      this.startTime = (new Date).getTime();
      this.initStateGL();
      this.renderer.ij();
      var numRenderables = this.renderables.length;
      for (var i = 0; i < numRenderables; i++) {
        this.renderables[i].depth = i / numRenderables;
        this.renderer.draw(this.renderables[i], 1);
      }
      this.renderer.lj();
      if (this.frameRenderListener) {
        this.frameRenderListener();
      }
      this.Hi = this.Xe;
    }

    initStateGL() {
      this.renderer.setBackgroundColor(this.renderer.getBackgroundColor());
      this.renderer.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
      this.renderer.enable(GL.BLEND);
      this.renderer.depthFunc(GL.LESS);
      this.renderer.clearDepth(1);
      this.renderer.depthMask(true);
      this.renderer.setDepthTest(false);
      this.renderer.clear(true, true, false);
    }

    Gk() {
      if (this.stage.currentFrame === this.numFrames
          && this.stage.isPlaying
          && this.jd
          && (this.loop || this.currentSceneIndex !== this.sceneTimelines.length - 1))
      {
        this.gotoScene((this.currentSceneIndex + 1) % this.sceneTimelines.length);
      }
      this.stage.advanceFrame();
      this.stage.dispatchEnterFrame();
      this.stage.constructFrame();
      this.stage.dispatchFrameConstructed();
      this.stage.executeFrameScripts();
      this.stage.dispatchExitFrame()
    }

    gotoScene(sceneIndex: number, b: boolean = false) {
      if (b || (this.currentSceneIndex !== -1 && this.currentSceneIndex !== sceneIndex)) {
        this.Al();
      }
      this.Xe = -1;
      this.Hi = -1;
      if (b || this.currentSceneIndex !== sceneIndex) {
        var timelineID = "" + this.sceneTimelines[sceneIndex];
        var timeline = this.assetPool.getTimeline(timelineID);
        this.stage.setDefinition(timeline);
        this.stage.play();
        this.numFrames = timeline.commands.length;
      }
      this.currentSceneIndex = sceneIndex;
    }

    Al(b: boolean = false) {
      if (b) {
        this.stop();
        this.currentSceneIndex = -1;
      }
      if (this.stage)
        for (var i = this.stage.getNumChildren() - 1; i >= 0; i--) {
          var child = this.stage.getChildAt(i);
          this.stage.removeChildAt(i);
          child.destroy();
        }
    }

    webglContextLostHandler(event) {
      event.preventDefault();
    }

    webglContextRestoredHandler() {
      this.play();
    }

    static S_OK = 0;
    static E_ERR = 1;
    static E_INVALID_PARAM = 2;
    static E_CONTEXT_CREATION_FAILED = 3;
    static E_REQUIRED_EXTENSION_NOT_PRESENT = 4;
    static E_RESOURCE_LOADING_FAILED = 5;

    static kIsPlaying = 0;
    static kIsStopped = 1;

    static FRAME_RENDER = 0;
  }
}
