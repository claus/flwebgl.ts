/// <reference path="../GL.ts" />
/// <reference path="../Pe.ts" />
/// <reference path="../lk.ts" />
/// <reference path="../shaders/IShader.ts" />
/// <reference path="../shaders/ShaderMSAAStdDev.ts" />
/// <reference path="../shaders/ShaderMSAAStdDevEmulated.ts" />
/// <reference path="IRenderer.ts" />
/// <reference path="RenderPassIndex.ts" />

module flwebgl.e.renderers
{
  import GL = flwebgl.e.GL;
  import Pe = flwebgl.e.Pe;
  import lk = flwebgl.e.lk;
  import Mesh = flwebgl.e.Mesh;
  import MeshInstanced = flwebgl.e.MeshInstanced;
  import RenderTarget = flwebgl.e.RenderTarget;
  import IShader = flwebgl.e.shaders.IShader;
  import ShaderMSAAStdDev = flwebgl.e.shaders.ShaderMSAAStdDev;
  import ShaderMSAAStdDevEmulated = flwebgl.e.shaders.ShaderMSAAStdDevEmulated;

  // kk
  export class RendererMSAA implements IRenderer
  {
    private gl: GL;
    private shader: IShader;
    private qc: any;
    private fg: any;

    constructor() {}

    setGL(gl: GL): boolean {
      this.gl = gl;
      this.shader = gl.hasExtension("OES_standard_derivatives") ? new ShaderMSAAStdDev() : new ShaderMSAAStdDevEmulated();
      this.qc = [];
      this.qc[RenderPassIndex.oc] = new Pe();
      this.qc[RenderPassIndex.Tb] = new Pe();
      this.fg = [];
      this.fg[RenderPassIndex.oc] = this.km;
      this.fg[RenderPassIndex.Tb] = this.Yl;
      return this.shader.setGL(gl);
    }

    Yl(a, b): number {
      return b.depth - a.depth;
    }

    km(a, b): number {
      return a.depth - b.depth;
    }

    e(a, b?) {
      this.ld();
      this.Qg(a);
      var passIndices = [ RenderPassIndex.oc, RenderPassIndex.Tb ];
      for (var c = 0; c < passIndices.length; ++c) {
        var passIndex = passIndices[c];
        this.nf(passIndex);
        this.Ia(passIndex);
      }
    }

    ld() {
      this.ne();
      this.shader.activate();
    }

    ne() {
      this.gl.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
      this.gl.enable(GL.BLEND);
      this.gl.depthFunc(GL.LESS);
      this.gl.clearDepth(1);
      this.gl.depthMask(true);
      this.gl.setDepthTest(true);
    }

    Qg(a: MeshInstanced[]) {
      for (var c = 0; c < a.length; ++c) {
        var f = a[c];
        for (var e = 0; e < f.ra(Mesh.INTERNAL); e++) {
          var k = f.ab(Mesh.INTERNAL, e, this.gl);
          var l = k.isOpaque ? RenderPassIndex.oc : RenderPassIndex.Tb;
          this.qc[l].Dc(k);
        }
        for (e = 0; e < f.ra(Mesh.EXTERNAL); e++) {
          k = f.ab(Mesh.EXTERNAL, e, this.gl);
          this.qc[RenderPassIndex.Tb].Dc(k);
        }
      }
    }

    nf(passIndex: RenderPassIndex) {
      this.qc[passIndex].sort(this.fg[passIndex]);
      this.Qi(passIndex);
    }

    Ia(passIndex: RenderPassIndex) {
      this.shader.draw(this.qc[passIndex]);
      this.qc[passIndex].clear();
    }

    Qi(passIndex: RenderPassIndex) {
      switch (passIndex) {
        case RenderPassIndex.oc:
          this.gl.depthMask(true);
          break;
        case RenderPassIndex.Tb:
          this.gl.depthMask(false);
          break;
      }
    }

    destroy() {
      this.shader.destroy();
    }
 }
}