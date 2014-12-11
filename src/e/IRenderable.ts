/// <reference path="GL.ts" />
/// <reference path="lk.ts" />

module flwebgl.e
{
  export interface IRenderable
  {
    depth: number;
    dirty: boolean;

    ra(edgeType: string): number;
    ab(edgeType: string, i: number, gl: GL): lk;
  }
}
