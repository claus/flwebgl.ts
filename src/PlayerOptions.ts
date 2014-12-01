/// <reference path="util/Utils.ts" />

module flwebgl
{
  import Utils = flwebgl.util.Utils;

  export enum AAType {
    MSAA,
    ImageSpace
  }

  export class PlayerOptions
  {
    logErrors = false;
    caching = true;
    cachingOptions = {};
    cacheAsBitmap = true;
    antialias = AAType.ImageSpace;

    constructor(options: any = {}) {
      if (!Utils.isUndefined(options[PlayerOptions.kOption_LogErrors])) {
        this.logErrors = !!options[PlayerOptions.kOption_LogErrors];
      }
      if (!Utils.isUndefined(options[PlayerOptions.kOption_Caching])) {
        if (options[PlayerOptions.kOption_Caching] instanceof Object) {
          this.caching = true;
          this.cachingOptions = options[PlayerOptions.kOption_Caching];
        } else {
          this.caching = !!options[PlayerOptions.kOption_Caching];
        }
      }
      if (!Utils.isUndefined(options[PlayerOptions.kOption_CacheAsBitmap])) {
        this.cacheAsBitmap = !!options[PlayerOptions.kOption_CacheAsBitmap];
      }
      if (!Utils.isUndefined(options[PlayerOptions.kOption_AAType])) {
        switch (options[PlayerOptions.kOption_AAType] | 0) {
          case AAType.MSAA:
            this.antialias = AAType.MSAA;
            break;
          case AAType.ImageSpace:
            this.antialias = AAType.ImageSpace;
            break;
        }
      }
    }

    private static kOption_LogErrors = 0;
    private static kOption_AAType = 1;
    private static kOption_Caching = 2;
    private static kOption_CacheAsBitmap = 10;
    private static kOption_StandardDerivatives = 11;
  }
}
