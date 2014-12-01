/// <reference path="../PlayerOptions.ts" />
/// <reference path="../geom/Color.ts" />
/// <reference path="../geom/Rect.ts" />
/// <reference path="GL.ts" />
/// <reference path="RenderTarget.ts" />
/// <reference path="TextureAtlas.ts" />
/// <reference path="renderers/IRenderer.ts" />
/// <reference path="renderers/RendererImageSpace.ts" />
/// <reference path="renderers/RendererMSAA.ts" />

module flwebgl.e
{
  import PlayerOptions = flwebgl.PlayerOptions;
  import Color = flwebgl.geom.Color;
  import Rect = flwebgl.geom.Rect;
  import IRenderer = flwebgl.e.renderers.IRenderer;
  import RendererMSAA = flwebgl.e.renderers.RendererMSAA;
  import RendererImageSpace = flwebgl.e.renderers.RendererImageSpace;

  // Hh
  export class Renderer
  {
    private gl: GL;
    private rg: IRenderer;
    private ie;
    private oa;
    private Kg;
    private H;

    constructor(canvas: HTMLCanvasElement, options: PlayerOptions) {
      this.gl = new GL(canvas, options);
      this.rg = (options.antialias === AAType.MSAA) ? new RendererMSAA() : new RendererImageSpace();
      this.oa = [];
    }

    setGL() {
      this.rg.setGL(this.gl);
    }

    getViewport(): Rect {
      return this.gl.getViewport();
    }

    setViewport(rect: Rect, flipY: boolean = true) {
      this.gl.setViewport(rect, flipY);
    }

    getBackgroundColor(): Color {
      return this.gl.getBackgroundColor();
    }

    setBackgroundColor(color: Color) {
      this.gl.setBackgroundColor(color);
    }

    depthMask(flag: boolean) {
      this.gl.depthMask(flag);
    }

    depthFunc(func: number) {
      this.gl.depthFunc(func);
    }

    clearDepth(depth: number) {
      this.gl.clearDepth(depth);
    }

    setDepthTest(value: boolean) {
      this.gl.setDepthTest(value);
    }

    blendFunc(sfactor: number, dfactor: number) {
      this.gl.blendFunc(sfactor, dfactor);
    }

    clear(colorBuffer: boolean, depthBuffer: boolean = false, stencilBuffer: boolean = false) {
      this.gl.clear(colorBuffer, depthBuffer, stencilBuffer);
    }

    enable(capability: number) {
      this.gl.enable(capability);
    }

    disable(capability: number) {
      this.gl.disable(capability);
    }

    scissor(rect: Rect) {
      this.gl.scissor(rect);
    }

    ij(a: number = Renderer.Hj) {
      switch (a) {
        case Renderer.Hj:
          this.Kg = this.rg;
          break;
        case Renderer.Gj:
          if (this.ie === void 0) {
            // TODO
            //this.ie = new d.rk;
            this.ie.setGL(this.gl);
          }
          this.Kg = this.ie;
          break;
      }
    }

    lj() {
      this.init();
      this.Kg.e(this.oa);
      for (var i = 0; i < this.oa.length; i++) {
        this.oa[i].setDirty(false);
      }
      this.oa.length = 0;
    }

    e(a) {
      this.oa.push(a);
    }

    // wd
    createRenderTarget(width: number, height: number) {
      return this.gl.createRenderTarget(width, height);
    }

    // Ha
    activateRenderTarget(renderTarget: RenderTarget): RenderTarget {
      return this.gl.activateRenderTarget(renderTarget);
    }

    getRenderTarget(): RenderTarget {
      return this.gl.getRenderTarget();
    }

    deleteRenderTargetTexture(renderTarget: RenderTarget) {
      this.gl.deleteRenderTargetTexture(renderTarget);
    }

    loadTextures(textureAtlases: TextureAtlas[], callback) {
      this.gl.loadTextures(textureAtlases, callback);
    }

    hasExtension(name: string): boolean {
      return this.gl.hasExtension(name);
    }

    flush() {
      this.gl.flush();
    }

    // me
    init() {
    }

    destroy() {
      this.rg.destroy();
      this.ie.destroy();
      this.gl.destroy();
      this.Kg = null;
      this.H = null;
    }

    static Hj = 0;
    static Gj = 1;
  }
}
