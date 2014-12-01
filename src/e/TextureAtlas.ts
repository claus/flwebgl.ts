/// <reference path="../geom/Rect.ts" />

module flwebgl.e
{
  import Rect = flwebgl.geom.Rect;

  interface FrameMap { [id: string]: Rect; }

  export class TextureAtlas
  {
    private _id: string;
    private _imageURL: string;
    private _width: number;
    private _height: number;
    private _frames: FrameMap;

    constructor(id: string, imageURL: string, width: number, height: number) {
      this._id = id;
      this._imageURL = imageURL;
      this._width = width;
      this._height = height;
      this._frames = {};
    }

    get id(): string {
      return this._id;
    }

    get imageURL(): string {
      return this._imageURL;
    }

    setFrame(id: string, frame: Rect) {
      this._frames[id] = frame;
    }
    getFrame(id: string): Rect {
      return this._frames[id];
    }
  }
}
