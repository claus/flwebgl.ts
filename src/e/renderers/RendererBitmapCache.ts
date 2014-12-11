/// <reference path="../GL.ts" />
/// <reference path="../IRenderable.ts" />
/// <reference path="../RenderTarget.ts" />
/// <reference path="../shaders/ShaderBitmapCache.ts" />
/// <reference path="../../geom/Color.ts" />
/// <reference path="RendererImageSpace.ts" />
/// <reference path="IRenderer.ts" />

module flwebgl.e.renderers
{
  import GL = flwebgl.e.GL;
  import IRenderable = flwebgl.e.IRenderable;
  import RenderTarget = flwebgl.e.RenderTarget;
  import ShaderBitmapCache = flwebgl.e.shaders.ShaderBitmapCache;
  import Color = flwebgl.geom.Color;

  export class RendererBitmapCache implements IRenderer
  {
    private gl: GL;
    private renderer: RendererImageSpace;
    private renderTarget: RenderTarget;
    private shader: ShaderBitmapCache;

    constructor() {}

    setGL(gl: GL): boolean {
      this.gl = gl;
      var viewport = this.gl.getViewport();
      this.renderer = new RendererImageSpace();
      this.renderTarget = this.gl.createRenderTarget(viewport.width, viewport.height);
      var oldColor = this.gl.getBackgroundColor();
      var oldRenderTarget = this.gl.activateRenderTarget(this.renderTarget);
      this.gl.setBackgroundColor(new Color(0, 0, 0, 0));
      this.gl.clear(true, true, false);
      this.gl.activateRenderTarget(oldRenderTarget);
      this.gl.setBackgroundColor(oldColor);
      this.shader = new ShaderBitmapCache();
      return this.shader.setGL(gl) && this.renderer.setGL(gl);
    }

    draw(renderables: IRenderable[], b?) {
      this.ld();
      var oldRenderTarget = this.gl.activateRenderTarget(this.renderTarget);
      this.renderer.draw(renderables);
      this.gl.activateRenderTarget(oldRenderTarget);
      this.shader.activate();
      this.gl.activateRenderTargetTexture(this.renderTarget);
      this.shader.draw(void 0, this.renderTarget.id);
    }

    ld() {
      this.ne();
    }

    ne() {
    }

    destroy() {
      this.shader.destroy();
      this.renderer.destroy();
      this.gl.deleteRenderTargetTexture(this.renderTarget);
    }
  }
}
