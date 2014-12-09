/// <reference path="../events/EventDispatcher.ts" />
/// <reference path="../geom/ColorTransform.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../geom/Rect.ts" />
/// <reference path="../e/Mesh.ts" />
/// <reference path="../e/IRenderable.ts" />
/// <reference path="../e/vk.ts" />

module flwebgl.sg
{
  import EventDispatcher = flwebgl.events.EventDispatcher;
  import ColorTransform = flwebgl.geom.ColorTransform;
  import Matrix = flwebgl.geom.Matrix;
  import Rect = flwebgl.geom.Rect;
  import Mesh = flwebgl.e.Mesh;
  import IRenderable = flwebgl.e.IRenderable;
  import vk = flwebgl.e.vk;

  export class DisplayObject extends EventDispatcher
  {
    _id: string;
    _name: string;
    _parent: DisplayObject;
    _dirty: boolean;
    _visible: boolean;
    _localTransform: Matrix;
    _globalTransform: Matrix;
    _localColorTransform: ColorTransform;
    _globalColorTransform: ColorTransform;

    W: number;
    Ui: boolean;

    constructor() {
      super();
      this._localTransform = new Matrix();
      this._globalTransform = new Matrix();
      this._localColorTransform = new ColorTransform();
      this._globalColorTransform = new ColorTransform();
      this._visible = true;
      this._dirty = true;
      this.W = 0;
      this.Ui = false;
    }

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }

    get parent(): DisplayObject { return this._parent; }
    set parent(value: DisplayObject) { this._parent = value; }

    get depth(): number { return this._globalTransform.getValue(2, 2); }
    set depth(value: number) { this._globalTransform.setValue(2, 2, value); }

    get dirty(): boolean { return this._dirty; }
    set dirty(value: boolean) { this._dirty = value; }

    isVisible(): boolean {
      return this._visible;
    }
    setVisible(value: boolean, dirty: boolean = true) {
      if (dirty) {
        this.W |= 4;
      }
      this._visible = value;
    }

    getLocalTransform(): Matrix {
      return this._localTransform.clone();
    }
    setLocalTransform(transform: Matrix, dirty: boolean = true) {
      if (dirty) {
        this.W |= 1;
      }
      this._dirty = true;
      this._localTransform = transform.clone();
    }

    getGlobalTransform(): Matrix {
      return this._globalTransform.clone();
    }

    getLocalColorTransform(): ColorTransform {
      return this._localColorTransform.clone();
    }
    setLocalColorTransform(colorTransform: ColorTransform = null, dirty: boolean = true) {
      if (dirty) {
        this.W |= 2;
      }
      this._dirty = true;
      if (colorTransform) {
        this._localColorTransform = colorTransform.clone();
      } else {
        this._localColorTransform.identity();
      }
    }

    getGlobalColorTransform(): ColorTransform {
      return this._globalColorTransform.clone();
    }

    setTransforms(transform: Matrix, colorTransform: ColorTransform) {
      if (transform) {
        this._globalTransform.copy(transform);
        this._globalTransform.multiply(this._localTransform);
      } else {
        this._globalTransform.copy(this._localTransform);
      }
      if (colorTransform) {
        this._globalColorTransform.copy(colorTransform);
        this._globalColorTransform.concat(this._localColorTransform);
      } else {
        this._globalColorTransform.copy(this._localColorTransform);
      }
    }

    destroy() {
      this._id = "-1";
      this._parent = void 0;
    }

    // Abstract methods:

    Ic(): IRenderable { return void 0; }

    Of(renderable: IRenderable) {}

    Qb(a) {}

    $j(ps: vk) {}

    getBounds(target: DisplayObject = this, fast: boolean = true, edgeType: string = Mesh.EXTERNAL, k: boolean = false): Rect { return null; }
  }
}
