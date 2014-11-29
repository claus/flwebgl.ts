/// <reference path="util/AssetPool.ts" />

module flwebgl
{
  import AssetPool = flwebgl.util.AssetPool;

  export class Player
  {
    assetPool: AssetPool;

    constructor() {
      this.assetPool = new AssetPool();
    }

    init() {

    }
  }
}
