/// <reference path="../GL.ts" />

module flwebgl.e.shaders
{
  import GL = flwebgl.e.GL;

  export interface IShader
  {
    id: number;
    setGL(gl: GL);
    activate();
    draw(a, b);
    destroy();
  }
}
