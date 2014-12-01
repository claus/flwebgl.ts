/// <reference path="../GL.ts" />

module flwebgl.e.shaders
{
  import GL = flwebgl.e.GL;

  export interface IShader
  {
    setGL(gl:GL);
    destroy();
  }
}
