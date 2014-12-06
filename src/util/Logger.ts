module flwebgl.util
{
  export class Logger
  {
    static setLevel(level) {
      Logger.level = level;
    }

    static info(a) {
      if (Logger.level >= Logger.kLevel_Info) {
        console.log("INFO: " + a);
      }
    }

    static warn(a) {
      if (Logger.level >= Logger.kLevel_Warn) {
        console.log("WARN: " + a);
      }
    }

    static error(a) {
      if (Logger.level >= Logger.kLevel_Error) {
        console.log("ERROR: " + a)
      }
    }

    static kLevel_OFF = -1;
    static kLevel_Error = 0;
    static kLevel_Warn = 1;
    static kLevel_Info = 2;
    static level = Logger.kLevel_OFF;
  }
}
