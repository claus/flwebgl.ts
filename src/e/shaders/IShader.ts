/// <reference path="../GL.ts" />
/// <reference path="../Pe.ts" />

module flwebgl.e.shaders
{
  import GL = flwebgl.e.GL;
  import Pe = flwebgl.e.Pe;

  export interface IShader
  {
    id: number;
    setGL(gl: GL): boolean;
    activate();
    draw(a: Pe, b?);
    destroy();
  }
}
