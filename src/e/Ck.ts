/// <reference path="VertexAttribute.ts" />
/// <reference path="Attribute.ts" />
/// <reference path="GL.ts" />
/// <reference path="lk.ts" />
/// <reference path="mk.ts" />

module flwebgl.e
{
  interface WebGLBufferMap { [ size: string ]: WebGLBuffer }

  export class Ck
  {
    private gl: GL;
    private bufferCache: WebGLBufferMap;
    private buffer: WebGLBuffer;
    private Oa: VertexAttributesArray;
    private Uc: Attributes;
    private gc: number;
    private kb: lk[];

    constructor() {
      this.bufferCache = {};
    }

    setGL(value: GL) {
      this.gl = value;
    }

    Vg(attribDefs: VertexAttributesArray, attribs: Attributes) {
      this.Oa = attribDefs;
      this.Uc = attribs;
      this.gc = 0;
      var totalSize = attribDefs.attrs[0].totalSize;
      if (!this.bufferCache[totalSize]) {
        var buffer = this.gl.createBuffer();
        var bufferSize = GL.MAX_VERTICES * totalSize * Float32Array.BYTES_PER_ELEMENT;
        this.gl.bindBuffer(GL.ARRAY_BUFFER, buffer);
        this.gl.bufferData(GL.ARRAY_BUFFER, bufferSize, GL.DYNAMIC_DRAW);
        this.oe();
        this.bufferCache[totalSize] = buffer;
      }
      this.buffer = this.bufferCache[totalSize];
      this.kb = [];
    }

    Zg(x: boolean = false) {
      if (this.buffer !== this.gl.getBoundBuffer(GL.ARRAY_BUFFER)) {
        this.gl.bindBuffer(GL.ARRAY_BUFFER, this.buffer);
        this.oe();
      }
      var a = [];
      var b = 0;
      var p = this.Oa.attrs[0].totalSize;
      for (var i = 0; i < this.kb.length; i++) {
        a.push(new mk(b, -1));
        this.gl.bufferSubData(GL.ARRAY_BUFFER, b * p, this.kb[i].getVertexData()[0].vertices);
        b += this.kb[i].getNumIndices();
      }
      return a;
    }

    upload(a: lk) {
      if (this.gc + a.getNumIndices() > GL.MAX_VERTICES) {
        return false;
      }
      this.kb.push(a);
      this.gc += a.getNumIndices();
      return true;
    }

    destroy() {
      for (var a in this.bufferCache) {
        this.gl.deleteBuffer(this.bufferCache[a]);
      }
      this.buffer = void 0;
      this.kb = void 0;
      this.bufferCache = void 0;
    }

    oe() {
      var a = this.Oa.attrs;
      for (var i = 0; i < a.length; i++) {
        var c = a[i];
        var e = c.attrs;
        for (var j = 0; j < e.length; j++) {
          var l = this.Uc.getAttribs(e[j].name);
          this.gl.enableVertexAttribArray(l.location);
          this.gl.vertexAttribPointer(l.location, l.size, l.type, l.Hf, c.totalSize, e[j].byteOffset);
        }
      }
    }
  }
}