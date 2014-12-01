declare module flwebgl.util {
    class Utils {
        static isUndefined(object: any): boolean;
    }
}
declare module flwebgl {
    enum AAType {
        MSAA = 0,
        ImageSpace = 1,
    }
    class PlayerOptions {
        logErrors: boolean;
        caching: boolean;
        cachingOptions: {};
        cacheAsBitmap: boolean;
        antialias: AAType;
        constructor(options?: any);
        private static kOption_LogErrors;
        private static kOption_AAType;
        private static kOption_Caching;
        private static kOption_CacheAsBitmap;
        private static kOption_StandardDerivatives;
    }
}
declare module flwebgl.geom {
    class Color {
        red: number;
        blue: number;
        green: number;
        alpha: number;
        constructor(red: number, blue: number, green: number, alpha?: number);
        equals(color: Color): boolean;
    }
}
declare module flwebgl.geom {
    class Rect {
        left: number;
        top: number;
        width: number;
        height: number;
        isEmpty: boolean;
        constructor(left?: number, top?: number, width?: number, height?: number);
        intersects(a: any): boolean;
    }
}
declare module flwebgl.geom {
    class Matrix {
        values: number[];
        private _isIdentity;
        constructor(values: number[]);
        isIdentity: boolean;
        private setIsIdentity();
        identity(): Matrix;
        setValues: (values: number[]) => void;
    }
}
declare module flwebgl.e {
    class RenderTarget {
        private _id;
        private _texture;
        private _frameBuffer;
        private _renderBuffer;
        constructor(id?: string, texture?: WebGLTexture, frameBuffer?: WebGLFramebuffer, renderBuffer?: WebGLRenderbuffer);
        id: string;
        texture: WebGLTexture;
        frameBuffer: WebGLFramebuffer;
        renderBuffer: WebGLRenderbuffer;
    }
}
declare module flwebgl.e {
    import Rect = flwebgl.geom.Rect;
    class TextureAtlas {
        private _id;
        private _imageURL;
        private _width;
        private _height;
        private _frames;
        constructor(id: string, imageURL: string, width: number, height: number);
        id: string;
        imageURL: string;
        setFrame(id: string, frame: Rect): void;
        getFrame(id: string): Rect;
    }
}
declare module flwebgl.e {
    class Ck {
        private gl;
        private rd;
        private Oa;
        private Uc;
        private gc;
        private Cg;
        private kb;
        constructor();
        setGL(value: GL): void;
        Vg(a: any, b: any): void;
        Zg(): any[];
        upload(a: any): boolean;
        destroy(): void;
        oe(): void;
    }
}
declare module flwebgl.e {
    import PlayerOptions = flwebgl.PlayerOptions;
    import Color = flwebgl.geom.Color;
    import Rect = flwebgl.geom.Rect;
    class GL {
        private ctx;
        private ei;
        private logErrors;
        private viewport;
        private viewMatrix;
        private renderTarget;
        private textureAtlases;
        private vao;
        private ha;
        private uniformsCache;
        private bufferCache;
        private textureMap;
        private activeTextureMap;
        private ii;
        private fb;
        private programIDCounter;
        private backgroundColor;
        private depthTestEnabled;
        constructor(canvas: HTMLCanvasElement, options: PlayerOptions);
        getViewport(): Rect;
        setViewport(rect: Rect, flipY?: boolean): void;
        loadTextures(textureAtlases: TextureAtlas[], callback: any): void;
        getTextureAtlas(id: string): TextureAtlas;
        getTextureAtlasByFrameID(id: string): TextureAtlas;
        getTexture(id: string): WebGLTexture;
        activateTexture(id: string): void;
        deactivateTexture(id: string): void;
        createTexture(): WebGLTexture;
        bindTexture(a: any, texture: WebGLTexture): void;
        deleteTexture(texture: WebGLTexture): void;
        deleteTextures(): void;
        texImage2D(target: number, level: number, internalFormat: number, format: number, type: number, image: HTMLImageElement): void;
        texImage2D_WidthHeight(target: number, internalFormat: number, width: number, height: number, format: number, type: number): void;
        texParameteri(target: number, pname: number, param: number): void;
        pixelStorei(pname: number, param: number): void;
        private _loadTextures(textureAtlases, callback);
        createRenderTarget(width: number, height: number, format?: any, internalFormat?: any): RenderTarget;
        init(): void;
        setUniforms(shader: any, c: any): void;
        getRenderTarget(): RenderTarget;
        activateRenderTarget(renderTarget: RenderTarget): RenderTarget;
        activateRenderTargetTexture(renderTarget: RenderTarget): string;
        deleteRenderTargetTexture(renderTarget: RenderTarget): void;
        e(shader: any, h: any, c: any): void;
        createFramebuffer(): WebGLFramebuffer;
        bindFramebuffer(target: number, frameBuffer: WebGLFramebuffer): void;
        deleteFramebuffer(frameBuffer: WebGLFramebuffer): void;
        createRenderbuffer(): WebGLRenderbuffer;
        bindRenderbuffer(target: number, renderBuffer: WebGLRenderbuffer): void;
        deleteRenderbuffer(renderBuffer: WebGLRenderbuffer): void;
        renderbufferStorage(target: number, internalFormat: number, width: number, height: number): void;
        framebufferTexture2D(target: number, attachment: number, textureTarget: number, texture: WebGLTexture, level: number): void;
        framebufferRenderbuffer(target: number, attachment: number, renderBufferTarget: number, renderBuffer: WebGLRenderbuffer): void;
        drawElements(count: number): void;
        drawArrays(mode: number, first: number, count: number): void;
        bufferData(target: number, size: number, usage: number): void;
        bufferSubData(target: number, offset: number, data: ArrayBuffer): void;
        setBackgroundColor(color: Color): void;
        getBackgroundColor(): Color;
        clearColor(red: number, green: number, blue: number, alpha: number): void;
        clear(colorBuffer: boolean, depthBuffer: boolean, stencilBuffer: boolean): void;
        blendFunc(sfactor: number, dfactor: number): void;
        blendFuncSeparate(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void;
        enable(capability: number): void;
        disable(capability: number): void;
        scissor(rect: Rect): void;
        depthMask(flag: boolean): void;
        depthFunc(func: number): void;
        clearDepth(depth: number): void;
        setDepthTest(value: boolean): void;
        createShader(type: number, source: string): WebGLShader;
        deleteShader(shader: WebGLShader): void;
        createProgram(): WebGLProgram;
        deleteProgram(program: WebGLProgram): void;
        attachShader(program: WebGLProgram, shader: WebGLShader): void;
        linkProgram(program: WebGLProgram): number;
        useProgram(program: WebGLProgram): void;
        bindAttribLocation(program: WebGLProgram, index: number, name: string): void;
        getAttribLocation(program: WebGLProgram, name: string): number;
        kc(index: number): void;
        vertexAttribPointer(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number): void;
        getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation;
        uniformMatrix4fv(location: WebGLUniformLocation, transpose: boolean, value: number[]): void;
        uniform2fv(location: WebGLUniformLocation, value: number[]): void;
        uniform4fv(location: WebGLUniformLocation, value: number[]): void;
        uniform1i(location: WebGLUniformLocation, value: number): void;
        uniform1iv(location: WebGLUniformLocation, value: number[]): void;
        uniform2iv(location: WebGLUniformLocation, value: number[]): void;
        createBuffer(): WebGLBuffer;
        deleteBuffer(buffer: WebGLBuffer): void;
        bindBuffer(target: number, buffer: WebGLBuffer): void;
        getBoundBuffer(target: number): WebGLBuffer;
        flush(): void;
        createVertexArrayOES(): any;
        bindVertexArrayOES(a: any): void;
        deleteVertexArrayOES(a: any): void;
        getExtension(name: any): any;
        hasExtension(name: any): boolean;
        getError(): number;
        hasError(): boolean;
        destroy(): void;
        initStatics(): void;
        static MAX_VERTICES: number;
        static MAX_TEXTURE_SIZE: number;
        static ZERO: any;
        static ONE: any;
        static SRC_COLOR: any;
        static SRC_ALPHA: any;
        static DST_ALPHA: any;
        static DST_COLOR: any;
        static ONE_MINUS_SRC_COLOR: any;
        static ONE_MINUS_SRC_ALPHA: any;
        static ONE_MINUS_DST_ALPHA: any;
        static ONE_MINUS_DST_COLOR: any;
        static SRC_ALPHA_SATURATE: any;
        static NEVER: any;
        static LESS: any;
        static EQUAL: any;
        static LEQUAL: any;
        static GREATER: any;
        static NOTEQUAL: any;
        static GEQUAL: any;
        static ALWAYS: any;
        static ARRAY_BUFFER: any;
        static ELEMENT_ARRAY_BUFFER: any;
        static ARRAY_BUFFER_BINDING: any;
        static ELEMENT_ARRAY_BUFFER_BINDING: any;
        static BYTE: any;
        static UNSIGNED_BYTE: any;
        static SHORT: any;
        static UNSIGNED_SHORT: any;
        static INT: any;
        static UNSIGNED_INT: any;
        static FLOAT: any;
        static INT_VEC2: any;
        static INT_VEC3: any;
        static INT_VEC4: any;
        static FLOAT_VEC2: any;
        static FLOAT_VEC3: any;
        static FLOAT_VEC4: any;
        static FLOAT_MAT4: any;
        static SAMPLER_2D: any;
        static FRAGMENT_SHADER: any;
        static VERTEX_SHADER: any;
        static MAX_VERTEX_ATTRIBS: any;
        static MAX_VERTEX_UNIFORM_VECTORS: any;
        static MAX_VARYING_VECTORS: any;
        static MAX_COMBINED_TEXTURE_IMAGE_UNITS: any;
        static MAX_VERTEX_TEXTURE_IMAGE_UNITS: any;
        static MAX_TEXTURE_IMAGE_UNITS: any;
        static MAX_FRAGMENT_UNIFORM_VECTORS: any;
        static CULL_FACE: any;
        static BLEND: any;
        static DITHER: any;
        static STENCIL_TEST: any;
        static DEPTH_TEST: any;
        static SCISSOR_TEST: any;
        static POLYGON_OFFSET_FILL: any;
        static SAMPLE_ALPHA_TO_COVERAGE: any;
        static SAMPLE_COVERAGE: any;
        static TEXTURE0: any;
        static TEXTURE_2D: any;
        static RGBA: any;
        static RGB: any;
        static TEXTURE_MAG_FILTER: any;
        static TEXTURE_MIN_FILTER: any;
        static TEXTURE_WRAP_S: any;
        static TEXTURE_WRAP_T: any;
        static UNPACK_FLIP_Y_WEBGL: any;
        static CLAMP_TO_EDGE: any;
        static NEAREST: any;
        static LINEAR: any;
        static NEAREST_MIPMAP_NEAREST: any;
        static LINEAR_MIPMAP_NEAREST: any;
        static NEAREST_MIPMAP_LINEAR: any;
        static LINEAR_MIPMAP_LINEAR: any;
        static UNPACK_PREMULTIPLY_ALPHA_WEBGL: any;
        static FRAMEBUFFER: any;
        static RENDERBUFFER: any;
        static COLOR_ATTACHMENT0: any;
        static DEPTH_STENCIL: any;
        static DEPTH_COMPONENT16: any;
        static STENCIL_INDEX8: any;
        static DEPTH_ATTACHMENT: any;
        static STENCIL_ATTACHMENT: any;
        static DEPTH_STENCIL_ATTACHMENT: any;
        static FRAMEBUFFER_UNSUPPORTED: any;
        static KEEP: any;
        static REPLACE: any;
        static INCR: any;
        static DECR: any;
        static INVERT: any;
        static INCR_WRAP: any;
        static DECR_WRAP: any;
        static STREAM_DRAW: any;
        static STATIC_DRAW: any;
        static DYNAMIC_DRAW: any;
        static TRIANGLES: any;
    }
}
declare module flwebgl.e.renderers {
    import GL = flwebgl.e.GL;
    interface IRenderer {
        setGL(gl: GL): any;
        destroy(): any;
    }
}
declare module flwebgl.e.shaders {
    import GL = flwebgl.e.GL;
    interface IShader {
        setGL(gl: GL): any;
        destroy(): any;
    }
}
declare module flwebgl.e.shaders {
    import GL = flwebgl.e.GL;
    class ShaderImageSpace implements IShader {
        private gl;
        constructor();
        setGL(gl: GL): void;
        destroy(): void;
    }
}
declare module flwebgl.e.shaders {
    import GL = flwebgl.e.GL;
    class ShaderImageSpaceStdDev implements IShader {
        private gl;
        constructor();
        setGL(gl: GL): void;
        destroy(): void;
    }
}
declare module flwebgl.e.renderers {
    import GL = flwebgl.e.GL;
    class RendererImageSpace implements IRenderer {
        private gl;
        private shader;
        private Ve;
        private cg;
        private Ab;
        private vg;
        private Ue;
        private We;
        private fe;
        constructor();
        setGL(gl: GL): any;
        destroy(): void;
    }
}
declare module flwebgl.e.renderers {
    import GL = flwebgl.e.GL;
    class RendererMSAA implements IRenderer {
        private gl;
        constructor();
        setGL(value: GL): void;
        destroy(): void;
    }
}
declare module flwebgl.e {
    import PlayerOptions = flwebgl.PlayerOptions;
    import Color = flwebgl.geom.Color;
    import Rect = flwebgl.geom.Rect;
    class Renderer {
        private gl;
        private rg;
        private ie;
        private oa;
        private Kg;
        private H;
        constructor(canvas: HTMLCanvasElement, options: PlayerOptions);
        setGL(): void;
        getViewport(): Rect;
        setViewport(rect: Rect, flipY?: boolean): void;
        getBackgroundColor(): Color;
        setBackgroundColor(color: Color): void;
        depthMask(flag: boolean): void;
        depthFunc(func: number): void;
        clearDepth(depth: number): void;
        setDepthTest(value: boolean): void;
        blendFunc(sfactor: number, dfactor: number): void;
        clear(colorBuffer: boolean, depthBuffer?: boolean, stencilBuffer?: boolean): void;
        enable(capability: number): void;
        disable(capability: number): void;
        scissor(rect: Rect): void;
        ij(a?: number): void;
        lj(): void;
        e(a: any): void;
        createRenderTarget(width: number, height: number): RenderTarget;
        activateRenderTarget(renderTarget: RenderTarget): RenderTarget;
        getRenderTarget(): RenderTarget;
        deleteRenderTargetTexture(renderTarget: RenderTarget): void;
        loadTextures(textureAtlases: TextureAtlas[], callback: any): void;
        hasExtension(name: string): boolean;
        flush(): void;
        init(): void;
        destroy(): void;
        static Hj: number;
        static Gj: number;
    }
}
declare module flwebgl.e {
    class Mesh {
        id: any;
        constructor(id: any);
        getID(): any;
    }
}
declare module flwebgl.B {
    interface FrameScriptMap {
        [id: string]: string[];
    }
    class Timeline {
        private _id;
        private _name;
        private _linkageName;
        private _isScene;
        private _labels;
        private commands;
        private scripts;
        constructor(id: string, name: string, linkageName: string, isScene: boolean, labels: FrameLabel[], scripts: FrameScript[]);
        id: string;
        name: string;
        linkageName: string;
        isScene: boolean;
        labels: FrameLabel[];
        getFrameScriptNames(frameIdx: number): string[];
        getFrameCommands(frameIdx: number): FrameCommand[];
        addFrameCommands(commands: FrameCommand[]): void;
    }
}
declare module flwebgl.util {
    import Mesh = flwebgl.e.Mesh;
    import TextureAtlas = flwebgl.e.TextureAtlas;
    import Timeline = flwebgl.B.Timeline;
    class AssetPool {
        private meshMap;
        private timelineMap;
        private textureAtlasMap;
        private soundMap;
        private nextAvailableAssetID;
        constructor();
        setMesh(mesh: Mesh): void;
        getMesh(id: string): Mesh;
        getMeshes(): Mesh[];
        removeMesh(id: string): void;
        setTimeline(timeline: Timeline): void;
        getTimeline(id: string): Timeline;
        getTimelines(): Timeline[];
        getTimelineByName(linkageName: string): Timeline;
        removeTimeline(id: string): void;
        setTextureAtlas(textureAtlas: TextureAtlas): void;
        getTextureAtlas(id: string): TextureAtlas;
        getTextureAtlases(): TextureAtlas[];
        destroy(): void;
    }
}
declare module flwebgl {
    import AssetPool = flwebgl.util.AssetPool;
    class Player {
        assetPool: AssetPool;
        private canvas;
        private options;
        private renderer;
        constructor();
        init(canvas: HTMLCanvasElement, content: any, textures: any, callback: any, options?: any): number;
        static S_OK: number;
        static E_ERR: number;
        static E_INVALID_PARAM: number;
        static E_CONTEXT_CREATION_FAILED: number;
        static E_REQUIRED_EXTENSION_NOT_PRESENT: number;
        static E_RESOURCE_LOADING_FAILED: number;
    }
}
declare module flwebgl.B {
    interface FrameCommand {
    }
}
declare module flwebgl.B {
    interface FrameLabel {
        frameNum: number;
        labelName: string;
    }
}
declare module flwebgl.B {
    interface FrameScript {
        frameNum: number;
        functionName: string;
    }
}
