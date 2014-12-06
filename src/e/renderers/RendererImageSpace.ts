/// <reference path="../GL.ts" />
/// <reference path="../Pe.ts" />
/// <reference path="../lk.ts" />
/// <reference path="../Mesh.ts" />
/// <reference path="../MeshInstanced.ts" />
/// <reference path="../RenderTarget.ts" />
/// <reference path="../shaders/IShader.ts" />
/// <reference path="../shaders/ShaderImageSpace.ts" />
/// <reference path="../shaders/ShaderImageSpaceStdDev.ts" />
/// <reference path="../shaders/ShaderImageSpaceCoverage.ts" />
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
  import ShaderImageSpace = flwebgl.e.shaders.ShaderImageSpace;
  import ShaderImageSpaceStdDev = flwebgl.e.shaders.ShaderImageSpaceStdDev;
  import ShaderImageSpaceCoverage = flwebgl.e.shaders.ShaderImageSpaceCoverage;

  export class RendererImageSpace implements IRenderer
  {
    private gl: GL;
    private shader: IShader;
    private shaderCoverage: IShader;
    private cg: Pe;
    private Ab: any[];
    private vg: any[];
    private Ue: any;
    private We: any;
    private fe: number;
    private rl: RenderTarget;
    private Yc: RenderTarget;
    private Zc: RenderTarget;

    constructor() {
      this.fe = 0;
    }

    setGL(gl: GL): boolean {
      this.gl = gl;
      this.shader = gl.hasExtension("OES_standard_derivatives") ? new ShaderImageSpaceStdDev() : new ShaderImageSpace();
      this.shaderCoverage = new ShaderImageSpaceCoverage();
      this.cg = new Pe();
      this.Ab = [];
      this.vg = [];
      this.fe = 0;
      this.Ue = {};
      this.We = {};
      return this.shader.setGL(gl) && this.shaderCoverage.setGL(gl);
    }

    e(a) {
      this.rl = this.gl.getRenderTarget();
      this.ld();
      this.Qg(a);
      this.nf(RenderPassIndex.oc);
      this.Ia(RenderPassIndex.oc, this.cg);
      for (a = 0; a < this.Ab.length; ++a) {
        var c = this.Ab[a].type;
        var d = this.Ab[a].sf;
        this.nf(c);
        this.Ia(c, d);
      }
      this.Ab.splice(0, this.Ab.length);
      this.gl.activateRenderTarget(this.rl);
      a = this.gl.activateRenderTargetTexture(this.Yc);
      c = this.gl.activateRenderTargetTexture(this.Zc);
      this.shaderCoverage.activate();
      this.shaderCoverage.draw(void 0, {
        colorMapTexture: a,
        coverageMapTexture: c
      });
    }

    ld() {
      this.ne();
      this.shader.activate();
      var a = this.gl.getViewport();
      var b = this.Yk();
      this.Yc = this.Ue[b];
      if (this.Yc === void 0) {
        this.Yc = this.gl.createRenderTarget(a.width, a.height);
        this.Ue[b] = this.Yc;
      }
      this.Zc = this.We[b];
      if (this.Zc === void 0) {
        this.Zc = this.gl.createRenderTarget(a.width, a.height);
        this.We[b] = this.Zc;
      }
      this.gl.activateRenderTarget(this.Yc);
      var color = this.gl.getBackgroundColor();
      this.gl.clearColor(color.red / 255, color.green / 255, color.blue / 255, color.alpha / 255);
      this.gl.clear(true, true, false);
      this.gl.activateRenderTarget(this.Zc);
      this.gl.clearColor(0, 0, 0, 0);
      this.gl.clear(true, true, false);
    }

    nf(a) {
      switch (a) {
        case RenderPassIndex.oc:
          this.gl.activateRenderTarget(this.Yc);
          break;
        case RenderPassIndex.Tb:
        case RenderPassIndex.Mc:
          this.gl.activateRenderTarget(this.Zc);
          break;
      }
    }

    Ia(a, b) {
      if (typeof b === "undefined") { b = void 0; }
      this.shader.draw(b, a);
      if (b !== void 0) {
        b.clear();
      }
    }

    Qg(renderables: MeshInstanced[]) {
      this.fe = 0;
      var z: lk;
      var x: lk;
      var renderable: MeshInstanced;
      var numRenderables = renderables.length;
      for (var f = 0; f < numRenderables; f++) {
        renderable = renderables[f];
        var k: number;
        for (k = 0; k < renderable.ra(Mesh.INTERNAL); k++) {
          z = renderable.ab(Mesh.INTERNAL, k, this.gl);
          if (z.isOpaque) {
            this.cg.Dc(z);
          }
        }
        for (k = 0; k < renderable.ra(Mesh.EXTERNAL); k++) {
          z = renderable.ab(Mesh.EXTERNAL, k, this.gl);
          if (z.isOpaque) {
            this.cg.Dc(z);
          }
        }
      }
      var f = 0;
      var e = 0;
      var l: lk[] = [];
      while (e < numRenderables) {
        var s = renderables[e].depth;
        var m = s;
        var n = -1;
        var y = [];
        var w = [];
        var t = this.yi();
        var q = this.yi();
        for (var k = e; k < numRenderables; k++, f++) {
          renderable = renderables[k];
          var r = renderable.depth;
          var u = false;
          var A = renderable.ra(Mesh.INTERNAL);
          var C = renderable.ra(Mesh.EXTERNAL);
          var v;
          for (v = 0; !u && v < A; ++v) {
            u = !renderable.ab(Mesh.INTERNAL, v, this.gl).isOpaque;
          }
          for (v = 0; !u && v < C; ++v) {
            u = !renderable.ab(Mesh.EXTERNAL, v, this.gl).isOpaque;
          }
          if (u) {
            n = r;
            if (m != n && (l.length > 0 || y.length > 0)) {
              if (l.length > 0) {
                y = y.concat(l);
              }
              for (var i = 0; i < y.length; i++) {
                t.Dc(y[i]);
              }
              this.Ab.push({
                type: RenderPassIndex.Tb,
                sf: t
              });
              l = [];
              y = [];
            }
            break;
          }
          for (v = 0; v < C; v++) {
            l.push(renderable.ab(Mesh.EXTERNAL, v, this.gl));
            z = renderable.ab(Mesh.bb, v, this.gl);
            if (z) {
              l.push(z);
            }
          }
          if (!u && r != m) {
            if (l.length > 0) {
              y = y.concat(l);
              l = [];
            }
            m = r;
          }
        }
        if (f == numRenderables && n == -1 && l.length > 0) {
          y = y.concat(l);
          l = [];
        }
        if (n != -1 && n == s) {
          for (k = f; k < numRenderables; ++k, ++f) {
            renderable = renderables[k];
            if (renderable.depth != n) {
              break;
            }
            A = renderable.ra(Mesh.INTERNAL);
            for (v = 0; v < A; v++) {
              z = renderable.ab(Mesh.INTERNAL, v, this.gl);
              if (z && !z.isOpaque) {
                w.push(z);
              }
            }
            C = renderable.ra(Mesh.EXTERNAL);
            for (v = 0; v < C; v++) {
              z = renderable.ab(Mesh.EXTERNAL, v, this.gl);
              x = renderable.ab(Mesh.bb, v, this.gl);
              if (z.isOpaque) {
                l.push(z);
                if (x) {
                  l.push(x);
                }
              } else {
                w.push(z);
                if (x) {
                  w.push(x);
                }
              }
            }
          }
          if (w.length > 0) {
            for (e = 0; e < w.length; ++e) {
              q.Dc(w[e]);
            }
            this.Ab.push({
              type: RenderPassIndex.Mc,
              sf: q
            })
          }
        } else if (y.length > 0) {
          for (e = 0; e < y.length; ++e) {
            t.Dc(y[e]);
          }
          this.Ab.push({
            type: RenderPassIndex.Tb,
            sf: t
          });
        }
        e = f;
      }
      if (l.length > 0) {
        this.Ab.push({
          type: RenderPassIndex.Tb,
          sf: t
        });
      }
    }

    Qi(a) {
      switch (a) {
        case RenderPassIndex.oc:
          this.gl.depthMask(true);
          break;
        case RenderPassIndex.Tb:
        case RenderPassIndex.Mc:
          this.gl.depthMask(false);
          break;
      }
    }

    ne() {
      this.gl.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
      this.gl.enable(GL.BLEND);
      this.gl.depthFunc(GL.LESS);
      this.gl.clearDepth(1);
      this.gl.depthMask(true);
      this.gl.setDepthTest(true);
    }

    yi() {
      var a = void 0;
      if (this.fe < this.vg.length) {
        a = this.vg[this.fe];
      } else {
        a = new Pe();
        this.vg.push(a);
      }
      this.fe++;
      return a;
    }

    Yk() {
      var viewport = this.gl.getViewport();
      return GL.MAX_TEXTURE_SIZE * viewport.height + viewport.width;
    }

    destroy() {
      this.shader.destroy();
      this.shaderCoverage.destroy();
      for (var a in this.Ue) {
        this.gl.deleteRenderTargetTexture(this.Ue[a]);
      }
      for (a in this.We) {
        this.gl.deleteRenderTargetTexture(this.We[a]);
      }
    }
  }
}
