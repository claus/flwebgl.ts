module flwebgl.e
{
  export class RenderTarget
  {
    private _id: string;
    private _texture: WebGLTexture;
    private _frameBuffer: WebGLFramebuffer;
    private _renderBuffer: WebGLRenderbuffer;

    constructor(id?: string, texture?: WebGLTexture, frameBuffer?: WebGLFramebuffer, renderBuffer?: WebGLRenderbuffer) {
      this._id = id;
      this._texture = texture;
      this._frameBuffer = frameBuffer;
      this._renderBuffer = renderBuffer;
    }

    get id(): string {
      return this._id;
    }

    get texture(): WebGLTexture {
      return this._texture;
    }

    get frameBuffer(): WebGLFramebuffer {
      return this._frameBuffer;
    }

    get renderBuffer(): WebGLRenderbuffer {
      return this._renderBuffer;
    }
  }
}
