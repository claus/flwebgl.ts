/// <reference path="../GL.ts" />
/// <reference path="IShader.ts" />

module flwebgl.e.shaders
{
  import GL = flwebgl.e.GL;

  export class ShaderImageSpace implements IShader
  {
    private gl: GL

    constructor() {
      console.log("ShaderImageSpace");
    }

    setGL(gl:GL) {
      this.gl = gl;
    }

    destroy() {

    }
  }
}
