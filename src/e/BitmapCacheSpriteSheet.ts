/// <reference path="../geom/Rect.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../geom/QuadTree.ts" />
/// <reference path="../geom/Color.ts" />
/// <reference path="../util/Utils.ts" />
/// <reference path="Renderer.ts" />
/// <reference path="RenderTarget.ts" />
/// <reference path="TextureAtlas.ts" />
/// <reference path="GL.ts" />

module flwebgl.e
{
  import Rect = flwebgl.geom.Rect;
  import Point = flwebgl.geom.Point;
  import QuadTree = flwebgl.geom.QuadTree;
  import Color = flwebgl.geom.Color;
  import Utils = flwebgl.util.Utils;

  // zk
  export class BitmapCacheSpriteSheet
  {
    private renderTarget: RenderTarget;
    private textureAtlas: TextureAtlas;
    private tree: QuadTree;
    private ol: number;
    private uc: any;

    constructor(renderTarget: RenderTarget, textureAtlas: TextureAtlas) {
      this.renderTarget = renderTarget;
      this.textureAtlas = textureAtlas;
      this.tree = new QuadTree(new Point(0, 0), GL.MAX_TEXTURE_SIZE);
      this.ol = 0;
      this.uc = {};
    }

    fits(width: number, height: number): boolean {
      var w = Utils.nextPowerOfTwo(width);
      var h = Utils.nextPowerOfTwo(height);
      return this.tree.fits(Math.max(w, h, BitmapCacheSpriteSheet.MIN_TEXTURE_SIZE));
    }

    insert(width: number, height: number): string {
      var w = Utils.nextPowerOfTwo(width);
      var h = Utils.nextPowerOfTwo(height);
      var pos = this.tree.insert(Math.max(w, h, BitmapCacheSpriteSheet.MIN_TEXTURE_SIZE));
      var frameID: string;
      if (pos) {
        var frame = new Rect(pos.x, pos.y, width, height);
        frameID = Utils.em(this.textureAtlas.id, this.ol++);
        this.textureAtlas.setFrame(frameID, frame);
      }
      return frameID;
    }

    remove(frameID: string) {
      var frame = this.getFrame(frameID);
      if (frame) {
        this.tree.remove(new Point(frame.left, frame.top));
      }
    }

    getFrame(frameID: string): Rect {
      return this.textureAtlas.getFrame(frameID);
    }

    getTextureID(): string {
      return this.renderTarget.id;
    }

    addRenderables(renderables: any[], frameID: string, color: Color) {
      if (!this.uc[frameID]) {
        this.uc[frameID] = {
          color: color,
          Xj: []
        };
      }
      var xj = this.uc[frameID].Xj;
      for (var i = 0; i < renderables.length; i++) {
        xj.push(renderables[i]);
      }
    }

    rasterize(renderer: Renderer) {
      if (Object.keys(this.uc).length !== 0) {
        var oldBackgroundColor = renderer.getBackgroundColor();
        var oldRenderTarget = renderer.activateRenderTarget(this.renderTarget);
        renderer.enable(GL.SCISSOR_TEST);
        for (var frameID in this.uc) {
          var k = this.uc[frameID];
          var frame = this.textureAtlas.getFrame(frameID);
          var l = new Rect(frame.left, frame.top, frame.width, frame.height);
          l.width = Utils.nextPowerOfTwo(l.width);
          l.height = Utils.nextPowerOfTwo(l.height);
          renderer.scissor(l);
          renderer.setBackgroundColor(k.color);
          renderer.ij(Renderer.Gj);
          var xj = k.Xj;
          var len = xj.length;
          for (var i = 0; i < len; ++i) {
            xj[i].depth = i / len;
            renderer.e(xj[i], 1);
          }
          renderer.lj();
        }
        renderer.disable(GL.SCISSOR_TEST);
        renderer.activateRenderTarget(oldRenderTarget);
        renderer.setBackgroundColor(oldBackgroundColor);
        this.uc = {};
      }
    }

    static MIN_TEXTURE_SIZE = 64;
  }
}
