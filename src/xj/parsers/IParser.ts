module flwebgl.xj.parsers
{
  export interface IParser
  {
    parseSounds(): boolean;
    parseFills(): boolean;
    parseShapes(): boolean;
    parseTimelines(): boolean;
  }
}
