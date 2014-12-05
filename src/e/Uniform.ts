/// <reference path="GL.ts" />

module flwebgl.e
{
  export class Uniform
  {
    constructor(
      public location,
      public type,
      public size,
      public no
    ) {}

    static Jd = 0;
    static Q = 1;
  }

  export class Uniforms
  {
    uniforms: Uniform[];
    totalSize: number;
    bo: number;

    constructor(uniforms: Uniform[]) {
      this.uniforms = uniforms;
      this.totalSize = 0;
      this.bo = 0;
      for (var i = 0; i < this.uniforms.length; i++) {
        var size = 0;
        var uniform = this.uniforms[i];
        switch (uniform.type) {
          case GL.INT:
          case GL.FLOAT:
          case GL.SAMPLER_2D:
            size = Math.ceil(uniform.size / 4);
            break;
          case GL.INT_VEC2:
          case GL.FLOAT_VEC2:
            size = Math.ceil(2 * uniform.size / 4);
            break;
          case GL.INT_VEC3:
          case GL.FLOAT_VEC3:
            size = Math.ceil(3 * uniform.size / 4);
            break;
          case GL.INT_VEC4:
          case GL.FLOAT_VEC4:
            size = uniform.size;
            break;
          case GL.FLOAT_MAT4:
            size = 4 * uniform.size;
            break;
        }
        this.totalSize += size;
      }
    }
  }

  export class UniformValue
  {
    constructor(
      public uniform: Uniform,
      public value: any
    ) {}
  }
}
