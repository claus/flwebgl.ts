module flwebgl.e
{
  export class Mesh
  {
    id: any;

    constructor(id: any) {
      this.id = id;
    }

    getID(): any {
      return this.id;
    }
  }
}
