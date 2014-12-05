module flwebgl.media
{
  export class Sound
  {
    id: string;
    name: string;
    src: string;
    cf: boolean;

    constructor(id: string, name: string, src: string) {
      this.id = id;
      this.name = name;
      this.src = src;
    }

    Bn() {
      this.cf = true;
    }
  }
}
