/// <reference path="../GL.ts" />

module flwebgl.e.renderers
{
  import GL = flwebgl.e.GL;

  export interface IRenderer
  {
    setGL(gl: GL): boolean;
    destroy();
  }
}
