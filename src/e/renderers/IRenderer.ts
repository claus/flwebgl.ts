/// <reference path="../GL.ts" />
/// <reference path="../IRenderable.ts" />

module flwebgl.e.renderers
{
  import GL = flwebgl.e.GL;
  import IRenderable = flwebgl.e.IRenderable;

  export interface IRenderer
  {
    setGL(gl: GL): boolean;
    draw(renderables: IRenderable[], b?);
    destroy();
  }
}
