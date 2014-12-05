/// <reference path="GL.ts" />

module flwebgl.e
{
  // TODO
  export class Ck
  {
    private gl: GL;
    private rd;
    private Oa;
    private Uc;
    private gc;
    private Cg;
    private kb;

    constructor() {
      this.rd = {};
    }

    setGL(value: GL) {
      this.gl = value;
    }

    Vg(a, b) {
      this.Oa = a;
      this.Uc = b;
      this.gc = 0;
      var c = a.attrs[0].totalSize;
      if (!this.rd[c]) {
        var size = GL.MAX_VERTICES * this.Oa.attrs[0].totalSize * Float32Array.BYTES_PER_ELEMENT;
        var buffer = this.gl.createBuffer();
        this.gl.bindBuffer(GL.ARRAY_BUFFER, buffer);
        this.gl.bufferData(GL.ARRAY_BUFFER, size, GL.DYNAMIC_DRAW);
        this.oe();
        this.rd[c] = buffer;
      }
      this.Cg = this.rd[c];
      this.kb = [];
    }

    Zg() {
      if (this.Cg !== this.gl.getBoundBuffer(GL.ARRAY_BUFFER)) {
        this.gl.bindBuffer(GL.ARRAY_BUFFER, this.Cg);
        this.oe();
      }
      var a = [];
      var b = 0;
      var p = this.Oa.attrs[0].totalSize;
      for (var e = 0; e < this.kb.length; e++) {
        /*
        var k = new c.e.mk;
        this.gl.bufferSubData(GL.ARRAY_BUFFER, b * p, this.kb[e].nc()[0].ba);
        k.fh = -1;
        k.Ld = b;
        a.push(k);
        b += this.kb[e].sa();
        */
      }
      return a;
    }

    upload(a) {
      if (this.gc + a.sa() > GL.MAX_VERTICES) {
        return false;
      }
      this.kb.push(a);
      this.gc += a.sa();
      return true;
    }

    destroy() {
      for (var a in this.rd) {
        this.gl.deleteBuffer(this.rd[a]);
      }
      this.Cg = this.kb = this.rd = void 0;
    }

    oe() {
      var a = this.Oa.attrs;
      for (var b = 0; b < a.length; ++b) {
        /*
        var c = a[b];
        var e = c.attrs;
        c = c.totalSize;
        for (var d = 0; d < e.length; ++d) {
          var l = this.Uc.getAttribs(e[d].pc);
          this.gl.kc(l.location);
          this.gl.vertexAttribPointer(l.location, l.size, l.type, l.Hf, c, e[d].location);
        }
        */
      }
    }
  }
}