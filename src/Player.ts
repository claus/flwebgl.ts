/// <reference path="e/Renderer.ts" />
/// <reference path="util/AssetPool.ts" />
/// <reference path="util/Utils.ts" />
/// <reference path="PlayerOptions.ts" />

module flwebgl
{
  import Renderer = flwebgl.e.Renderer;
  import AssetPool = flwebgl.util.AssetPool;
  import Utils = flwebgl.util.Utils;

  export class Player
  {
    assetPool: AssetPool;

    private canvas: HTMLCanvasElement;
    private options: PlayerOptions;
    private renderer: Renderer;

    constructor() {
      this.assetPool = new AssetPool();
    }

    init(canvas: HTMLCanvasElement, content: any, textures: any, callback: any, options: any = {}) {
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
    }

    static S_OK = 0;
    static E_ERR = 1;
    static E_INVALID_PARAM = 2;
    static E_CONTEXT_CREATION_FAILED = 3;
    static E_REQUIRED_EXTENSION_NOT_PRESENT = 4;
    static E_RESOURCE_LOADING_FAILED = 5;
  }
}
