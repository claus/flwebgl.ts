/// <reference path="../GL.ts" />
/// <reference path="../shaders/IShader.ts" />
/// <reference path="../shaders/ShaderImageSpace.ts" />
/// <reference path="../shaders/ShaderImageSpaceStdDev.ts" />
/// <reference path="IRenderer.ts" />

module flwebgl.e.renderers
{
  import GL = flwebgl.e.GL;
  import IShader = flwebgl.e.shaders.IShader;
  import ShaderImageSpace = flwebgl.e.shaders.ShaderImageSpace;
  import ShaderImageSpaceStdDev = flwebgl.e.shaders.ShaderImageSpaceStdDev;

  // TODO
  export class RendererImageSpace implements IRenderer
  {
    private gl: GL;
    private shader: IShader;
    private Ve: any;
    private cg: any;
    private Ab: any;
    private vg: any;
    private Ue: any;
    private We: any;
    private fe: number;

    constructor() {
      this.fe = 0;
    }

    setGL(gl: GL) {
      this.gl = gl;
      this.shader = gl.hasExtension("OES_standard_derivatives") ? new ShaderImageSpaceStdDev() : new ShaderImageSpace();
      //this.Ve = new d.ek;
      //this.cg = new c.e.Pe;
      this.Ab = [];
      this.vg = [];
      this.fe = 0;
      this.Ue = {};
      this.We = {};
      return this.shader.setGL(gl) ? this.Ve.setGL(gl) : false;
    }

    destroy() {

    }

  }
}
