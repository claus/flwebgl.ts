/// <reference path="../GL.ts" />
/// <reference path="../Pe.ts" />
/// <reference path="../lk.ts" />
/// <reference path="../IRenderable.ts" />
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
  import IRenderable = flwebgl.e.IRenderable;
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
      this.fg[RenderPassIndex.oc] = RendererMSAA.sortByDepthAscending;
      this.fg[RenderPassIndex.Tb] = RendererMSAA.sortByDepthDescending;
      return this.shader.setGL(gl);
    }

    static sortByDepthAscending(a, b): number {
      return a.depth - b.depth;
    }
    static sortByDepthDescending(a, b): number {
      return b.depth - a.depth;
    }

    draw(renderables: IRenderable[], b?) {
      this.ld();
      this.Qg(renderables);
      var passIndices = [ RenderPassIndex.oc, RenderPassIndex.Tb ];
      for (var i = 0; i < passIndices.length; i++) {
        var passIndex = passIndices[i];
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

    Qg(renderables: IRenderable[]) {
      var i, j;
      for (i = 0; i < renderables.length; i++) {
        var renderable = renderables[i];
        var numInternal = renderable.ra(Mesh.INTERNAL);
        for (j = 0; j < numInternal; j++) {
          var k = renderable.ab(Mesh.INTERNAL, j, this.gl);
          var l = k.isOpaque ? RenderPassIndex.oc : RenderPassIndex.Tb;
          this.qc[l].add(k);
        }
        var numExternal = renderable.ra(Mesh.EXTERNAL);
        for (j = 0; j < numExternal; j++) {
          k = renderable.ab(Mesh.EXTERNAL, j, this.gl);
          this.qc[RenderPassIndex.Tb].add(k);
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