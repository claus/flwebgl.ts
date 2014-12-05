module flwebgl.xj.parsers
{
  export interface IParser
  {
    nextHighestID: number;

    parseSounds(): boolean;
    parseFills(): boolean;
    parseShapes(): boolean;
    parseTimelines(): boolean;
  }
}
