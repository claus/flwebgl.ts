/// <reference path="Point.ts" />

module flwebgl.geom
{
  // Md
  export class QuadTree
  {
    private position: Point;
    private size: number;
    private isFull: boolean;
    private children: QuadTree[];

    constructor(position: Point, size: number) {
      this.position = position;
      this.size = size;
      this.isFull = false;
      this.children = [];
    }

    fits(size: number): boolean {
      if (size > this.size || this.isFull) { return false; }
      if (size > this.size / 2) { return (this.children.length === 0); }
      if (this.children.length === 0) { return true; }
      for (var i = 0; i < 4; i++) {
        if (this.children[i].fits(size)) {
          return true;
        }
      }
      return false;
    }

    insert(size: number): Point {
      var b: Point;
      if (size <= this.size && !this.isFull) {
        if (size > this.size / 2) {
          if (this.children.length === 0) {
            b = this.position;
            this.isFull = true;
          }
        } else {
          if (this.children.length === 0) {
            this.createQuads();
          }
          for (var i = 0; i < 4; i++) {
            b = this.children[i].insert(size);
            if (b) {
              break;
            }
          }
        }
      }
      return b;
    }

    remove(position: Point): boolean {
      var dx = position.x - this.position.x;
      var dy = position.y - this.position.y;
      if (dx < 0 || dx >= this.size || dy < 0 || dy >= this.size) { return false; }
      if (this.isFull) {
        if (dx === 0 && dy === 0) {
          this.isFull = false;
          return true;
        } else {
          return false;
        }
      }
      if (this.children.length === 0) {
        return false;
      }
      var e = 0;
      if (dx >= this.size / 2) { e++; }
      if (dy >= this.size / 2) { e += 2; }
      if (this.children[e].remove(position)) {
        for (dx = 0; dx < 4; dx++) {
          if (!this.children[dx].isEmpty()) {
            return false;
          }
        }
      }
      this.children.length = 0;
      return true;
    }

    createQuads() {
      var size = this.size / 2;
      this.children.push(new QuadTree(new Point(this.position.x,        this.position.y       ), size));
      this.children.push(new QuadTree(new Point(this.position.x + size, this.position.y       ), size));
      this.children.push(new QuadTree(new Point(this.position.x,        this.position.y + size), size));
      this.children.push(new QuadTree(new Point(this.position.x + size, this.position.y + size), size));
    }

    isEmpty(): boolean {
      return !this.isFull && this.children.length === 0;
    }
  }
}
