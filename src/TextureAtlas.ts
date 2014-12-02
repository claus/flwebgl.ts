module flwebgl
{
  export class TextureAtlas
  {
    textureJSON: any;
    imageURL: string;

    constructor(textureJSON: any, imageURL: string) {
      this.textureJSON = textureJSON;
      this.imageURL = imageURL;
    }
  }
}
