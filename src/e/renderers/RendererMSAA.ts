/// <reference path="../GL.ts" />
/// <reference path="IRenderer.ts" />

module flwebgl.e.renderers
{
  import GL = flwebgl.e.GL;

  // TODO
  export class RendererMSAA implements IRenderer
  {
    private gl: GL;

    constructor() {
    }

    setGL(value: GL) {
      this.gl = value;
    }

    destroy() {

    }
  }
}