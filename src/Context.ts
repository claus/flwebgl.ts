/// <reference path="e/Renderer.ts" />
/// <reference path="util/AssetPool.ts" />
/// <reference path="media/SoundFactory.ts" />
/// <reference path="sg/SceneGraphFactory.ts" />

module flwebgl
{
  import Renderer = flwebgl.e.Renderer;
  import AssetPool = flwebgl.util.AssetPool;
  import SoundFactory = flwebgl.media.SoundFactory;
  import SceneGraphFactory = flwebgl.sg.SceneGraphFactory;

  export class Context
  {
    renderer: Renderer;
    assetPool: AssetPool;
    soundFactory: SoundFactory;
    sceneGraphFactory: SceneGraphFactory;
    stage: any;
    nd: any;

    constructor(renderer: Renderer, assetPool: AssetPool, soundFactory: SoundFactory) {
      this.renderer = renderer;
      this.assetPool = assetPool;
      this.soundFactory = soundFactory;
    }

  }
}