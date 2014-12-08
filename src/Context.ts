/// <reference path="e/Renderer.ts" />
/// <reference path="util/AssetPool.ts" />
/// <reference path="media/SoundFactory.ts" />
/// <reference path="sg/SceneGraphFactory.ts" />
/// <reference path="e/BitmapCacheFactory.ts" />

module flwebgl
{
  import Renderer = flwebgl.e.Renderer;
  import AssetPool = flwebgl.util.AssetPool;
  import SoundFactory = flwebgl.media.SoundFactory;
  import SceneGraphFactory = flwebgl.sg.SceneGraphFactory;
  import BitmapCacheFactory = flwebgl.e.BitmapCacheFactory;

  export class Context
  {
    renderer: Renderer;
    assetPool: AssetPool;
    soundFactory: SoundFactory;
    sceneGraphFactory: SceneGraphFactory;
    bitmapCacheFactory: BitmapCacheFactory;
    stage: any;

    constructor(renderer: Renderer, assetPool: AssetPool, soundFactory: SoundFactory) {
      this.renderer = renderer;
      this.assetPool = assetPool;
      this.soundFactory = soundFactory;
    }
  }
}