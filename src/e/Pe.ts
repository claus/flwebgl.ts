module flwebgl.e
{
  export class Pe
  {
    F: lk[];

    constructor() {
      this.F = [];
    }

    add(a: lk) {
      this.F.push(a);
    }

    mc(i: number): lk {
      return (i >= 0) ? this.F[i] : null;
    }

    sort(a) {
      this.F.sort(a);
    }

    clear() {
      this.F.length = 0;
    }
  }
}