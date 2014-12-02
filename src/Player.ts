/// <reference path="e/Renderer.ts" />
/// <reference path="media/SoundFactory.ts" />
/// <reference path="util/AssetPool.ts" />
/// <reference path="util/Utils.ts" />
/// <reference path="xj/Parser.ts" />
/// <reference path="PlayerOptions.ts" />
/// <reference path="TextureAtlas.ts" />

module flwebgl
{
  import Renderer = flwebgl.e.Renderer;
  import SoundFactory = flwebgl.media.SoundFactory;
  import AssetPool = flwebgl.util.AssetPool;
  import Utils = flwebgl.util.Utils;
  import Parser = flwebgl.xj.Parser;

  export class Player
  {
    assetPool: AssetPool;

    private canvas: HTMLCanvasElement;
    private options: PlayerOptions;
    private renderer: Renderer;
    private soundFactory: SoundFactory;
    private parser: Parser;
    private completeCBK: any;

    constructor() {
      this.assetPool = new AssetPool();
    }

    init(canvas: HTMLCanvasElement, content: any, textures: TextureAtlas[], callback: any, options: any = {}) {
      if (!canvas || !content) {
        return Player.E_INVALID_PARAM;
      }
      this.canvas = canvas;
      this.options = new PlayerOptions(options);
      try {
        this.renderer = new Renderer(canvas, options);
      } catch (error) {
        return Player.E_CONTEXT_CREATION_FAILED;
      }
      this.completeCBK = callback;
      this.soundFactory = new SoundFactory();
      this.options.emulateStandardDerivatives = !this.renderer.hasExtension("OES_standard_derivatives");
      this.parser = new Parser(this.assetPool);
      var stageInfo = this.parser.init(content, textures, this.options);
    }

    static S_OK = 0;
    static E_ERR = 1;
    static E_INVALID_PARAM = 2;
    static E_CONTEXT_CREATION_FAILED = 3;
    static E_REQUIRED_EXTENSION_NOT_PRESENT = 4;
    static E_RESOURCE_LOADING_FAILED = 5;
  }
}
