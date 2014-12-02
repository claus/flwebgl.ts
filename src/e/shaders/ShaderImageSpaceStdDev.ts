/// <reference path="../GL.ts" />
/// <reference path="IShader.ts" />

module flwebgl.e.shaders
{
  import GL = flwebgl.e.GL;

  export class ShaderImageSpaceStdDev implements IShader
  {
    private gl: GL;

    constructor() {
      console.log("ShaderImageSpaceStdDev");
    }

    setGL(gl:GL) {
      this.gl = gl;
    }

    destroy() {

    }
  }
}
