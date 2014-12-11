/// <reference path="../PlayerOptions.ts" />
/// <reference path="../geom/Color.ts" />
/// <reference path="../geom/Rect.ts" />
/// <reference path="GL.ts" />
/// <reference path="RenderTarget.ts" />
/// <reference path="TextureAtlas.ts" />
/// <reference path="renderers/IRenderer.ts" />
/// <reference path="renderers/RendererImageSpace.ts" />
/// <reference path="renderers/RendererMSAA.ts" />
/// <reference path="renderers/RendererBitmapCache.ts" />
/// <reference path="IRenderable.ts" />

module flwebgl.e
{
  import PlayerOptions = flwebgl.PlayerOptions;
  import Color = flwebgl.geom.Color;
  import Rect = flwebgl.geom.Rect;
  import IRenderer = flwebgl.e.renderers.IRenderer;
  import RendererMSAA = flwebgl.e.renderers.RendererMSAA;
  import RendererImageSpace = flwebgl.e.renderers.RendererImageSpace;
  import RendererBitmapCache = flwebgl.e.renderers.RendererBitmapCache;

  // Hh
  export class Renderer
  {
    gl: GL;

    private renderer: IRenderer;
    private activeRenderer: IRenderer;
    private bitmapCacheRenderer: RendererBitmapCache;
    private renderables: IRenderable[];
    private H;

    constructor(canvas: HTMLCanvasElement, options: PlayerOptions) {
      this.gl = new GL(canvas, options);
      this.renderer = (options.antialias === AAType.MSAA) ? new RendererMSAA() : new RendererImageSpace();
      this.renderables = [];
    }

    setGL() {
      this.renderer.setGL(this.gl);
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

    ij(a: number = Renderer.USE_DEFAULT_RENDERER) {
      switch (a) {
        case Renderer.USE_DEFAULT_RENDERER:
          this.activeRenderer = this.renderer;
          break;
        case Renderer.USE_BITMAP_CACHE_RENDERER:
          if (!this.bitmapCacheRenderer) {
            this.bitmapCacheRenderer = new RendererBitmapCache();
            this.bitmapCacheRenderer.setGL(this.gl);
          }
          this.activeRenderer = this.bitmapCacheRenderer;
          break;
      }
    }

    lj() {
      this.init();
      this.activeRenderer.draw(this.renderables);
      for (var i = 0; i < this.renderables.length; i++) {
        this.renderables[i].dirty = false;
      }
      this.renderables.length = 0;
    }

    draw(renderable: IRenderable, b?) {
      this.renderables.push(renderable);
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
      this.renderer.destroy();
      this.activeRenderer = null;
      this.bitmapCacheRenderer.destroy();
      this.gl.destroy();
      this.H = null;
    }

    static USE_DEFAULT_RENDERER = 0;
    static USE_BITMAP_CACHE_RENDERER = 1;
  }
}
