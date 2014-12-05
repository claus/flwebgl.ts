/// <reference path="../GL.ts" />
/// <reference path="IShader.ts" />

module flwebgl.e.shaders
{
  import GL = flwebgl.e.GL;

  export class ShaderImageSpaceCoverage implements IShader
  {
    private gl: GL;
    private _id: number;
    private program: WebGLProgram;
    private vertexShader: WebGLShader;
    private vertexShaderSrc: string;
    private fragmentShader: WebGLShader;
    private fragmentShaderSrc: string;
    private vertexBuffer: WebGLBuffer;
    private indexBuffer: WebGLBuffer;
    private uniformLocColorMap: WebGLUniformLocation;
    private uniformLocCoverageMap: WebGLUniformLocation;
    private vertexBufferValues: Float32Array;
    private indexBufferValues: Float32Array;

    constructor() {
      console.log("ShaderImageSpaceCoverage");
    }

    get id(): number {
      return this._id;
    }

    setGL(gl:GL): boolean {
      this.gl = gl;
      return this.setup();
    }

    Xb() {
      this.gl.useProgram(this.program);
      this.gl.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
      this.gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      this.gl.useProgram(this.program);
      this.gl.disable(GL.BLEND);
      this.gl.depthMask(false);
      this.gl.disable(GL.DEPTH_TEST);
      this.Eg();
    }

    e(a, b?) {
      this.setUniformValues(b.colorMapTexture, b.coverageMapTexture);
      this.gl.drawElements(this.indexBufferValues.length);
    }

    Eg() {
      this.gl.vertexAttribPointer(0, 2, GL.FLOAT, false, 0, 0);
      this.gl.vertexAttribPointer(1, 2, GL.FLOAT, false, 0, 32);
    }

    setUniformValues(colorMapTexture, coverageMapTexture) {
      this.gl.uniform1i(this.uniformLocColorMap, colorMapTexture);
      this.gl.uniform1i(this.uniformLocCoverageMap, coverageMapTexture);
    }
    
    setup(): boolean {
      this.vertexShaderSrc =
        "attribute vec2 aVertexPosition; \n" +
        "attribute vec2 aTextureCoord; \n" +
        "varying vec2 vTextureCoord; \n" +
        "void main(void ) { \n" +
          "gl_Position = vec4(aVertexPosition, 1.0, 1.0); \n" +
          "vTextureCoord = aTextureCoord; \n" +
        "}";
      this.fragmentShaderSrc =
        "precision mediump float; \n" +
        "uniform sampler2D uColorMap; \n" +
        "uniform sampler2D uCoverageMap; \n" +
        "varying vec2 vTextureCoord; \n" +
        "void main() { \n" +
          "vec4 cov = texture2D(uCoverageMap, vTextureCoord); \n" +
          "vec4 color = texture2D(uColorMap, vTextureCoord); \n" +
          "gl_FragColor = cov + (color * (1.0 - cov.a)); \n" +
        "}";
      this.vertexBuffer = this.gl.createBuffer();
      if (!this.vertexBuffer) {
        //c.l.w.error("Creation of vertex buffer failed.");
        return false;
      }
      this.indexBuffer = this.gl.createBuffer();
      if (!this.indexBuffer) {
        //c.l.w.error("Creation of index buffer failed.");
        return false;
      }
      this.vertexShader = this.gl.createShader(GL.VERTEX_SHADER, this.vertexShaderSrc);
      this.fragmentShader = this.gl.createShader(GL.FRAGMENT_SHADER, this.fragmentShaderSrc);
      this.program = this.gl.createProgram();
      this.gl.attachShader(this.program, this.vertexShader);
      this.gl.attachShader(this.program, this.fragmentShader);
      this.gl.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
      this.gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      this.gl.kc(0);
      this.gl.kc(1);
      this.gl.bindAttribLocation(this.program, 0, "aVertexPosition");
      this.gl.bindAttribLocation(this.program, 1, "aTextureCoord");
      this._id = this.gl.linkProgram(this.program);
      if (this._id < 0) {
        this.gl.deleteProgram(this.program);
        //c.l.w.error("Program linking failed.");
        return false;
      }
      this.uniformLocColorMap = this.gl.getUniformLocation(this.program, "uColorMap");
      this.uniformLocCoverageMap = this.gl.getUniformLocation(this.program, "uCoverageMap");
      this.vertexBufferValues = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 0, 1, 1, 0, 1]);
      this.indexBufferValues = new Uint16Array([0, 1, 2, 0, 2, 3]);
      this.gl.bufferData(GL.ARRAY_BUFFER, this.vertexBufferValues, GL.STATIC_DRAW);
      this.gl.bufferData(GL.ELEMENT_ARRAY_BUFFER, this.indexBufferValues, GL.STATIC_DRAW);
      return true;
    }

    destroy() {
      this.gl.deleteBuffer(this.vertexBuffer);
      this.gl.deleteBuffer(this.indexBuffer);
      this.gl.deleteShader(this.vertexShader);
      this.gl.deleteShader(this.fragmentShader);
      this.gl.deleteProgram(this.program);
    }
  }
}
