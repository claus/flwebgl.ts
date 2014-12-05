module flwebgl.e
{
  export class Pe
  {
    private F;

    constructor() {
      this.F = [];
    }

    Dc(a) {
      this.F.push(a);
    }

    mc(i: number) {
      return (i >= 0) ? this.F[i] : null;
    }

    sort(a) {
      this.F.sort(a);
    }

    clear() {
      while (this.F.length > 0) {
        this.F.pop();
      }
    }
  }
}