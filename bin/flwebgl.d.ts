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
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
        add(point: Point): Point;
        sub(point: Point): Point;
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
        intersects(rect: Rect): boolean;
        copy(rect: Rect): void;
        union(rect: Rect): void;
        expand(x: number, y: number): void;
    }
}
declare module flwebgl.geom {
    class Matrix {
        values: number[];
        private _isIdentity;
        constructor(values?: number[]);
        isInvertible(): boolean;
        isIdentity: boolean;
        private setIsIdentity();
        identity(): Matrix;
        equals(matrix: Matrix): boolean;
        equalsScaleRotation(matrix: Matrix): boolean;
        getValues(): number[];
        setValues: (values: number[]) => void;
        clone(): Matrix;
        copy(matrix: Matrix): Matrix;
        concat(matrix: Matrix): Matrix;
        multiply(matrix: Matrix): void;
        transformPoint(point: Point): Point;
        transformBoundsAABB(rect: Rect): Rect;
        invert(): Matrix;
        translate(tx: number, ty: number): Matrix;
        setValue(column: number, row: number, value: number): void;
        getValue(column: number, row: number): number;
    }
}
declare module flwebgl.events {
    class Event {
        private _type;
        private _bubbles;
        private _currentTarget;
        private _target;
        _stopped: boolean;
        _stoppedImmediate: boolean;
        constructor(type: string, bubbles?: boolean);
        type: string;
        bubbles: boolean;
        target: EventDispatcher;
        currentTarget: EventDispatcher;
        stopPropagation(): void;
        stopImmediatePropagation(): void;
        static ADDED: string;
        static REMOVED: string;
        static UPDATED: string;
        static ENTER_FRAME: string;
        static EXIT_FRAME: string;
        static FRAME_CONSTRUCTED: string;
    }
}
declare module flwebgl.events {
    class EventDispatcher {
        private listenerMap;
        constructor();
        addEventListener(type: string, listener: any): void;
        hasEventListener(type: string, listener?: any): boolean;
        removeEventListener(type: string, listener: any): void;
        dispatchEvent(event: Event): void;
        dispatch(event: Event): void;
        removeAllListeners(): void;
    }
}
declare module flwebgl.geom {
    class ColorTransform {
        alphaOffset: number;
        redOffset: number;
        greenOffset: number;
        blueOffset: number;
        private _alphaMult;
        private _redMult;
        private _greenMult;
        private _blueMult;
        constructor(alphaOffs?: number, alphaMult?: number, redOffs?: number, redMult?: number, greenOffs?: number, greenMult?: number, blueOffs?: number, blueMult?: number);
        alphaMultiplier: number;
        redMultiplier: number;
        greenMultiplier: number;
        blueMultiplier: number;
        identity(): ColorTransform;
        isIdentity(): boolean;
        equals(cxform: ColorTransform): boolean;
        concat(cxform: ColorTransform): ColorTransform;
        clone(): ColorTransform;
        copy(cxform: ColorTransform): ColorTransform;
    }
}
declare module flwebgl.sg {
    interface IDisplayObjectDefinition {
        id: string;
    }
}
declare module flwebgl.e {
    class AttributeDef {
        byteOffset: number;
        name: string;
        type: number;
        size: number;
        constructor(byteOffset: number, name: string, type: number, size: number);
    }
    class AttributesDefs {
        attrs: AttributeDef[];
        totalSize: number;
        constructor(attrs?: AttributeDef[], totalSize?: number);
    }
}
declare module flwebgl.e {
    class VertexData {
        vertices: Float32Array;
        attributeDefs: AttributesDefs;
        constructor(vertices: Float32Array, attributeDefs: AttributesDefs);
    }
}
declare module flwebgl.e {
    interface VertexDataMap {
        [atlasID: string]: VertexData[];
    }
    class AttributeDefsArray {
        attrs: AttributesDefs[];
        constructor();
    }
    class Geometry {
        name: string;
        isOpaque: boolean;
        fillMode: number;
        indices: Uint16Array;
        vertexDataMap: VertexDataMap;
        attributeDefsArray: AttributeDefsArray;
        constructor(name: string, isOpaque: boolean);
        id: number;
        getVertexData(atlasID: string): VertexData[];
        setVertexData(atlasID: string, vertexData: VertexData[]): void;
        setIndices(indices: number[]): void;
        getNumIndices(): number;
        getAtlasIDs(): string[];
        static kFill_Extend: string;
        static kFill_Repeat: string;
        static kFill_Reflect: string;
        static fillModeMap: {
            Extend: number;
            Repeat: number;
            Reflect: number;
        };
    }
}
declare module flwebgl.e {
    import Rect = flwebgl.geom.Rect;
    import IDisplayObjectDefinition = flwebgl.sg.IDisplayObjectDefinition;
    class Mesh implements IDisplayObjectDefinition {
        private _id;
        private fd;
        bounds: Rect;
        constructor(id: string);
        id: string;
        setGeometry(edgeType: string, geometry: Geometry): void;
        getGeometryCount(edgeType: string): number;
        getGeometry(edgeType: string, i: number): Geometry;
        calculateBounds(): void;
        static INTERNAL: string;
        static EXTERNAL: string;
        static bb: string;
    }
}
declare module flwebgl.e {
    import Matrix = flwebgl.geom.Matrix;
    import Color = flwebgl.geom.Color;
    import ColorTransform = flwebgl.geom.ColorTransform;
    class wk {
        private $n;
        private _textureID;
        private _mesh;
        private _color;
        private _transform;
        private _colorTransform;
        private _ug;
        constructor(textureID: string, mesh: Mesh, d: any, color: Color, transform: Matrix, colorTransform: ColorTransform);
        textureID: string;
        mesh: Mesh;
        color: Color;
        transform: Matrix;
        colorTransform: ColorTransform;
        ug: number;
        Vl(): void;
        Wj(): void;
    }
}
declare module flwebgl.e {
    import Matrix = flwebgl.geom.Matrix;
    import Shape = flwebgl.sg.Shape;
    class vk {
        Mb: wk;
        shape: Shape;
        constructor();
        Hn(shape: Shape): void;
        In(a: wk): void;
        getColorTransform(): geom.ColorTransform;
        setTransforms(transform: Matrix): void;
        collectRenderables(a: any): void;
        destroy(): void;
    }
}
declare module flwebgl.sg {
    import EventDispatcher = flwebgl.events.EventDispatcher;
    import ColorTransform = flwebgl.geom.ColorTransform;
    import Matrix = flwebgl.geom.Matrix;
    import Rect = flwebgl.geom.Rect;
    import vk = flwebgl.e.vk;
    class DisplayObject extends EventDispatcher {
        _id: string;
        _name: string;
        _parent: DisplayObject;
        _dirty: boolean;
        _visible: boolean;
        _localTransform: Matrix;
        _globalTransform: Matrix;
        _localColorTransform: ColorTransform;
        _globalColorTransform: ColorTransform;
        W: number;
        Ui: boolean;
        constructor();
        id: string;
        name: string;
        parent: DisplayObject;
        depth: number;
        dirty: boolean;
        isVisible(): boolean;
        setVisible(value: boolean, dirty?: boolean): void;
        getLocalTransform(): Matrix;
        setLocalTransform(transform: Matrix, dirty?: boolean): void;
        getGlobalTransform(): Matrix;
        getLocalColorTransform(): ColorTransform;
        setLocalColorTransform(colorTransform?: ColorTransform, dirty?: boolean): void;
        getGlobalColorTransform(): ColorTransform;
        setTransforms(transform: Matrix, colorTransform: ColorTransform): void;
        destroy(): void;
        getDefinition(): IDisplayObjectDefinition;
        setDefinition(obj: IDisplayObjectDefinition): void;
        collectRenderables(a: any): void;
        $j(ps: vk): void;
        getBounds(target?: DisplayObject, fast?: boolean, edgeType?: string, k?: boolean): Rect;
    }
}
interface Window {
    webkitRequestAnimationFrame(callback: any, element?: any): number;
    mozRequestAnimationFrame(callback: any, element?: any): number;
    oRequestAnimationFrame(callback: any, element?: any): number;
    webkitCancelAnimationFrame(id: number): void;
    mozCancelAnimationFrame(id: number): void;
    oCancelAnimationFrame(id: number): void;
    msCancelAnimationFrame(id: number): void;
}
declare module flwebgl.util {
    import Color = flwebgl.geom.Color;
    import Matrix = flwebgl.geom.Matrix;
    import DisplayObject = flwebgl.sg.DisplayObject;
    class Utils {
        static requestAnimFrame(fn: any, frameRate: number, window: Window): number;
        static cancelAnimFrame(id: number, window: Window): void;
        static isUndefined(object: any): boolean;
        static getColor: (color: string) => Color;
        static cm(meshID: string, i: number, edgeType: string): string;
        static em(a: any, b: any): string;
        static sm(dobj: DisplayObject): Matrix;
        static nextPowerOfTwo(value: number): number;
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
        emulateStandardDerivatives: boolean;
        constructor(options?: any);
        private static kOption_LogErrors;
        private static kOption_AAType;
        private static kOption_Caching;
        private static kOption_CacheAsBitmap;
        private static kOption_StandardDerivatives;
    }
}
declare module flwebgl.util {
    class Logger {
        static setLevel(level: any): void;
        static info(a: any): void;
        static warn(a: any): void;
        static error(a: any): void;
        static kLevel_OFF: number;
        static kLevel_Error: number;
        static kLevel_Warn: number;
        static kLevel_Info: number;
        static level: number;
    }
}
declare module flwebgl.e {
    class Pe {
        F: lk[];
        constructor();
        add(a: lk): void;
        mc(i: number): lk;
        sort(a: any): void;
        clear(): void;
    }
}
declare module flwebgl.e.shaders {
    import GL = flwebgl.e.GL;
    import Pe = flwebgl.e.Pe;
    interface IShader {
        id: number;
        setGL(gl: GL): boolean;
        activate(): any;
        draw(a: Pe, b?: any): any;
        destroy(): any;
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
        width: number;
        height: number;
        setFrame(id: string, frame: Rect): void;
        getFrame(id: string): Rect;
    }
}
declare module flwebgl.e {
    interface AttributeMap {
        [name: string]: Attribute;
    }
    class Attribute {
        location: number;
        name: string;
        type: number;
        size: number;
        Hf: boolean;
        constructor(location: number, name: string, type: number, size: number, Hf?: boolean);
    }
    class Attributes {
        attributeMap: AttributeMap;
        constructor(attributes: Attribute[]);
        getAttributeByName(name: string): Attribute;
    }
}
declare module flwebgl.e {
    import Matrix = flwebgl.geom.Matrix;
    import ColorTransform = flwebgl.geom.ColorTransform;
    class lk {
        private _id;
        private _atlasID;
        private parent;
        private uniformValuesMap;
        geometry: Geometry;
        constructor(id: string, h: Geometry, atlasID: string, parent: MeshInstanced);
        id: string;
        atlasID: string;
        depth: number;
        dirty: boolean;
        isOpaque: boolean;
        getVertexData(): VertexData[];
        getNumIndices(): number;
        getUniforms(shaderID: number): UniformValue[];
        setUniforms(shaderID: number, uniforms: UniformValue[]): void;
        getTransform(): Matrix;
        getColorTransform(): ColorTransform;
        destroy(): void;
    }
}
declare module flwebgl.e {
    class mk {
        Ld: number;
        fh: number;
        constructor(Ld?: number, fh?: number);
    }
}
declare module flwebgl.e {
    class Ck {
        private gl;
        private bufferCache;
        private buffer;
        private Oa;
        private Uc;
        private gc;
        private kb;
        constructor();
        setGL(value: GL): void;
        Vg(attribDefs: AttributeDefsArray, attribs: Attributes): void;
        Zg(x?: boolean): any[];
        upload(a: lk): boolean;
        destroy(): void;
        oe(): void;
    }
}
declare module flwebgl.e {
    import PlayerOptions = flwebgl.PlayerOptions;
    import Color = flwebgl.geom.Color;
    import Rect = flwebgl.geom.Rect;
    import Matrix = flwebgl.geom.Matrix;
    import IShader = flwebgl.e.shaders.IShader;
    class GL {
        private ctx;
        private ei;
        private logErrors;
        private viewport;
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
        viewMatrix: Matrix;
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
        Fl(a: lk): void;
        setUniforms(shader: IShader, c: lk): void;
        getRenderTarget(): RenderTarget;
        activateRenderTarget(renderTarget: RenderTarget): RenderTarget;
        activateRenderTargetTexture(renderTarget: RenderTarget): string;
        deleteRenderTargetTexture(renderTarget: RenderTarget): void;
        draw(shader: any, attribDefs: any, c: lk[]): void;
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
        bufferData(target: number, sizeOrBuffer: any, usage: number): void;
        bufferSubData(target: number, offset: number, data: any): void;
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
        enableVertexAttribArray(index: number): void;
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
declare module flwebgl.e {
    interface IRenderable {
        depth: number;
        dirty: boolean;
        ra(edgeType: string): number;
        ab(edgeType: string, i: number, gl: GL): lk;
    }
}
declare module flwebgl.e.renderers {
    import GL = flwebgl.e.GL;
    import IRenderable = flwebgl.e.IRenderable;
    interface IRenderer {
        setGL(gl: GL): boolean;
        draw(renderables: IRenderable[], b?: any): any;
        destroy(): any;
    }
}
declare module flwebgl.e {
    import Matrix = flwebgl.geom.Matrix;
    import ColorTransform = flwebgl.geom.ColorTransform;
    import Shape = flwebgl.sg.Shape;
    class MeshInstanced implements IRenderable {
        private shape;
        private Gb;
        dirty: boolean;
        constructor(shape: Shape);
        depth: number;
        ra(edgeType: string): number;
        ab(edgeType: string, i: number, gl: GL): lk;
        getTransform(): Matrix;
        getColorTransform(): ColorTransform;
        destroy(): void;
    }
}
declare module flwebgl.e {
    class Uniform {
        location: WebGLUniformLocation;
        type: number;
        size: number;
        no: number;
        constructor(location: WebGLUniformLocation, type: number, size: number, no: number);
        static Jd: number;
        static Q: number;
    }
    class Uniforms {
        uniforms: Uniform[];
        totalSize: number;
        bo: number;
        constructor(uniforms: Uniform[]);
    }
    class UniformValue {
        uniform: Uniform;
        value: any;
        constructor(uniform: Uniform, value: any);
    }
}
declare module flwebgl.e.renderers {
    enum RenderPassIndex {
        oc = 0,
        Tb = 1,
        Mc = 3,
    }
}
declare module flwebgl.e.shaders {
    import GL = flwebgl.e.GL;
    import Pe = flwebgl.e.Pe;
    import Uniforms = flwebgl.e.Uniforms;
    import Attributes = flwebgl.e.Attributes;
    class ShaderImageSpaceStdDev implements IShader {
        private gl;
        private _id;
        private _attribs;
        private _uniforms;
        private uniformMap;
        private program;
        private vertexShader;
        private vertexShaderSrc;
        private fragmentShader;
        private fragmentShaderSrc;
        private modelViewMatrix;
        private ao;
        constructor();
        id: number;
        uniforms: Uniforms;
        attribs: Attributes;
        setGL(gl: GL): boolean;
        activate(): void;
        draw(a: Pe, b: any): void;
        xg(a: Pe): void;
        zg(a: Pe): void;
        yg(a: Pe): void;
        Fg(): void;
        Hg(): void;
        Gg(): void;
        Ia(a: Pe, passIndex: number): void;
        setup(): boolean;
        destroy(): void;
    }
}
declare module flwebgl.e.shaders {
    import GL = flwebgl.e.GL;
    import Pe = flwebgl.e.Pe;
    class ShaderImageSpaceStdDevEmulated implements IShader {
        private gl;
        private _id;
        private _attribs;
        private _uniforms;
        private uniformMap;
        private program;
        private vertexShader;
        private vertexShaderSrc;
        private fragmentShader;
        private fragmentShaderSrc;
        private modelViewMatrix;
        private modelInverseMatrix;
        constructor();
        id: number;
        setGL(gl: GL): boolean;
        activate(): void;
        draw(a: Pe, b: any): void;
        xg(a: Pe): void;
        zg(a: Pe): void;
        yg(a: Pe): void;
        Fg(): void;
        Hg(): void;
        Gg(): void;
        Ia(a: Pe, passIndex: number): void;
        setup(): boolean;
        destroy(): void;
    }
}
declare module flwebgl.e.shaders {
    import GL = flwebgl.e.GL;
    import Pe = flwebgl.e.Pe;
    class ShaderImageSpaceCoverage implements IShader {
        private gl;
        private _id;
        private program;
        private vertexShader;
        private vertexShaderSrc;
        private fragmentShader;
        private fragmentShaderSrc;
        private vertexBuffer;
        private indexBuffer;
        private uniformLocColorMap;
        private uniformLocCoverageMap;
        private vertexBufferValues;
        private indexBufferValues;
        constructor();
        id: number;
        setGL(gl: GL): boolean;
        activate(): void;
        Eg(): void;
        draw(a: Pe, b?: any): void;
        setUniformValues(colorMapTexture: any, coverageMapTexture: any): void;
        setup(): boolean;
        destroy(): void;
    }
}
declare module flwebgl.e.renderers {
    import GL = flwebgl.e.GL;
    import Pe = flwebgl.e.Pe;
    import IRenderable = flwebgl.e.IRenderable;
    class RendererImageSpace implements IRenderer {
        private gl;
        private shader;
        private shaderCoverage;
        private fe;
        private cg;
        private vg;
        private Ab;
        private rl;
        private Yc;
        private Zc;
        private Ue;
        private We;
        constructor();
        setGL(gl: GL): boolean;
        draw(renderables: IRenderable[], b?: any): void;
        ld(): void;
        nf(passIndex: RenderPassIndex): void;
        Ia(passIndex: RenderPassIndex, b: Pe): void;
        Qg(renderables: IRenderable[]): void;
        Qi(passIndex: RenderPassIndex): void;
        ne(): void;
        yi(): any;
        Yk(): string;
        destroy(): void;
    }
}
declare module flwebgl.e.shaders {
    import GL = flwebgl.e.GL;
    import Pe = flwebgl.e.Pe;
    import Uniforms = flwebgl.e.Uniforms;
    import Attributes = flwebgl.e.Attributes;
    class ShaderMSAAStdDev implements IShader {
        private gl;
        private _id;
        private _attribs;
        private _uniforms;
        private uniformMap;
        private program;
        private vertexShader;
        private vertexShaderSrc;
        private fragmentShader;
        private fragmentShaderSrc;
        private modelViewMatrix;
        constructor();
        id: number;
        uniforms: Uniforms;
        attribs: Attributes;
        setGL(gl: GL): boolean;
        activate(): void;
        draw(a: Pe, b?: any): void;
        setup(): boolean;
        destroy(): void;
    }
}
declare module flwebgl.e.shaders {
    import GL = flwebgl.e.GL;
    import Pe = flwebgl.e.Pe;
    class ShaderMSAAStdDevEmulated implements IShader {
        private gl;
        private _id;
        private _attribs;
        private _uniforms;
        private uniformMap;
        private program;
        private vertexShader;
        private vertexShaderSrc;
        private fragmentShader;
        private fragmentShaderSrc;
        private modelViewMatrix;
        private modelInverseMatrix;
        constructor();
        id: number;
        setGL(gl: GL): boolean;
        activate(): void;
        draw(a: Pe, b?: any): void;
        setup(): boolean;
        destroy(): void;
    }
}
declare module flwebgl.e.renderers {
    import GL = flwebgl.e.GL;
    import IRenderable = flwebgl.e.IRenderable;
    class RendererMSAA implements IRenderer {
        private gl;
        private shader;
        private qc;
        private fg;
        constructor();
        setGL(gl: GL): boolean;
        static sortByDepthAscending(a: any, b: any): number;
        static sortByDepthDescending(a: any, b: any): number;
        draw(renderables: IRenderable[], b?: any): void;
        ld(): void;
        ne(): void;
        Qg(renderables: IRenderable[]): void;
        nf(passIndex: RenderPassIndex): void;
        Ia(passIndex: RenderPassIndex): void;
        Qi(passIndex: RenderPassIndex): void;
        destroy(): void;
    }
}
declare module flwebgl.e.shaders {
    import GL = flwebgl.e.GL;
    import Pe = flwebgl.e.Pe;
    class ShaderBitmapCache {
        private gl;
        private _id;
        private program;
        private vertexShader;
        private vertexShaderSrc;
        private fragmentShader;
        private fragmentShaderSrc;
        private vertexBuffer;
        private indexBuffer;
        private uniformLocColorMap;
        private vertexBufferValues;
        private indexBufferValues;
        constructor();
        id: number;
        setGL(gl: GL): boolean;
        activate(): void;
        Eg(): void;
        draw(a: Pe, b?: any): void;
        ld(): void;
        setUniformValues(colorMapTexture: any): void;
        setup(): boolean;
        destroy: () => void;
    }
}
declare module flwebgl.e.renderers {
    import GL = flwebgl.e.GL;
    import IRenderable = flwebgl.e.IRenderable;
    class RendererBitmapCache implements IRenderer {
        private gl;
        private renderer;
        private renderTarget;
        private shader;
        constructor();
        setGL(gl: GL): boolean;
        draw(renderables: IRenderable[], b?: any): void;
        ld(): void;
        ne(): void;
        destroy(): void;
    }
}
declare module flwebgl.e {
    import PlayerOptions = flwebgl.PlayerOptions;
    import Color = flwebgl.geom.Color;
    import Rect = flwebgl.geom.Rect;
    class Renderer {
        gl: GL;
        private renderer;
        private activeRenderer;
        private bitmapCacheRenderer;
        private renderables;
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
        draw(renderable: IRenderable, b?: any): void;
        createRenderTarget(width: number, height: number): RenderTarget;
        activateRenderTarget(renderTarget: RenderTarget): RenderTarget;
        getRenderTarget(): RenderTarget;
        deleteRenderTargetTexture(renderTarget: RenderTarget): void;
        loadTextures(textureAtlases: TextureAtlas[], callback: any): void;
        hasExtension(name: string): boolean;
        flush(): void;
        init(): void;
        destroy(): void;
        static USE_DEFAULT_RENDERER: number;
        static USE_BITMAP_CACHE_RENDERER: number;
    }
}
declare module flwebgl.B.commands {
    import DisplayObject = flwebgl.sg.DisplayObject;
    import Context = flwebgl.Context;
    interface IFrameCommand {
        targetID: string;
        execute(dobj: DisplayObject, context: Context, x: boolean): boolean;
    }
}
declare module flwebgl.B {
    import IFrameCommand = flwebgl.B.commands.IFrameCommand;
    import IDisplayObjectDefinition = flwebgl.sg.IDisplayObjectDefinition;
    interface FrameLabel {
        frameNum: number;
        name: string;
    }
    interface FrameScript {
        frameNum: number;
        name: string;
    }
    interface FrameScriptMap {
        [id: string]: string[];
    }
    class Timeline implements IDisplayObjectDefinition {
        private _id;
        private _name;
        private _linkageName;
        private _isScene;
        private _labels;
        commands: IFrameCommand[][];
        scripts: FrameScriptMap;
        constructor(id: string, name: string, linkageName: string, isScene: boolean, labels: FrameLabel[], scripts: FrameScript[]);
        id: string;
        name: string;
        linkageName: string;
        isScene: boolean;
        labels: FrameLabel[];
        getFrameScriptNames(frameIdx: number): string[];
        getFrameCommands(frameIdx: number): IFrameCommand[];
        addFrameCommands(commands: IFrameCommand[]): void;
    }
}
declare module flwebgl.media {
    class Sound {
        id: string;
        name: string;
        src: string;
        cf: boolean;
        constructor(id: string, name: string, src: string);
        Bn(): void;
    }
}
declare module flwebgl.util {
    import Mesh = flwebgl.e.Mesh;
    import TextureAtlas = flwebgl.e.TextureAtlas;
    import Timeline = flwebgl.B.Timeline;
    import Sound = flwebgl.media.Sound;
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
        setSound(sound: Sound): void;
        getSounds(): Sound[];
        getNextAvailableAssetID(): number;
        destroy(): void;
    }
}
declare module flwebgl.media {
    class SoundFactory {
        constructor();
        loadSounds(sounds: any, callback: any): void;
    }
}
declare module flwebgl.B.commands {
    import Context = flwebgl.Context;
    import Matrix = flwebgl.geom.Matrix;
    import AssetPool = flwebgl.util.AssetPool;
    import SceneGraphFactory = flwebgl.sg.SceneGraphFactory;
    import MovieClip = flwebgl.sg.MovieClip;
    class PlaceObjectCommand implements IFrameCommand {
        timelineID: any;
        hf: any;
        targetID: string;
        transform: Matrix;
        instanceName: string;
        constructor(a: any[]);
        execute(mc: MovieClip, context: Context, x: boolean): boolean;
        Ek(mc: MovieClip, assetPool: AssetPool, sceneGraphFactory: SceneGraphFactory): number;
    }
}
declare module flwebgl.sg {
    import ColorTransform = flwebgl.geom.ColorTransform;
    import Rect = flwebgl.geom.Rect;
    import Matrix = flwebgl.geom.Matrix;
    import Event = flwebgl.events.Event;
    import IRenderable = flwebgl.e.IRenderable;
    import Timeline = flwebgl.B.Timeline;
    import IDisplayObjectDefinition = flwebgl.sg.IDisplayObjectDefinition;
    import FrameLabel = flwebgl.B.FrameLabel;
    import Context = flwebgl.Context;
    class MovieClip extends DisplayObject {
        timeline: Timeline;
        context: Context;
        totalFrames: number;
        loop: boolean;
        pa: any;
        df: boolean;
        Td: boolean;
        private children;
        private childrenDeferred;
        private currentFrameIndex;
        private _isPlaying;
        constructor();
        getDefinition(): IDisplayObjectDefinition;
        setDefinition(obj: IDisplayObjectDefinition): void;
        addChild(dobj: DisplayObject, e?: boolean): boolean;
        addChildAt(dobj: DisplayObject, index: number, e?: boolean, defer?: boolean): boolean;
        removeChild(dobj: DisplayObject): DisplayObject;
        removeChildAt(index: number): DisplayObject;
        getNumChildren(): number;
        getChildren(): DisplayObject[];
        getChildAt(index: number, includeDeferred?: boolean): DisplayObject;
        getChildIndex(dobj: DisplayObject): number;
        setChildIndex(dobj: DisplayObject, index: number): void;
        getChildByName(name: string): DisplayObject;
        currentFrame: number;
        play(): void;
        stop(): void;
        isPlaying: boolean;
        gotoAndPlay(frame: number): any;
        gotoAndPlay(frame: string): any;
        gotoAndStop(frame: number): any;
        gotoAndStop(frame: string): any;
        gotoFrame(frame: number, stop: boolean): any;
        gotoFrame(frame: string, stop: boolean): any;
        swap(idx1: number, idx2: number): void;
        dispatch(event: Event): void;
        advanceFrame(a?: boolean, b?: boolean): void;
        dispatchFrameConstructed(): void;
        dispatchEnterFrame(): void;
        dispatchExitFrame(): void;
        constructFrame(silent?: boolean): void;
        executeFrameScripts(): void;
        getFrameLabels(): FrameLabel[];
        getCurrentFrameLabel(): string;
        getCurrentLabel(): string;
        getChildIndexByID(id: string): number;
        $j(a: any): void;
        oi(): void;
        setTransforms(transform: Matrix, colorTransform: ColorTransform): void;
        destroy(): void;
        resetPlayHead(a?: boolean): void;
        collectRenderables(renderables: IRenderable[]): void;
        getBounds(target?: DisplayObject, fast?: boolean, edgeType?: string, k?: boolean): Rect;
        executeFrameScript(name: any): void;
    }
}
declare module flwebgl.sg {
    import Event = flwebgl.events.Event;
    import Rect = flwebgl.geom.Rect;
    import Mesh = flwebgl.e.Mesh;
    import MeshInstanced = flwebgl.e.MeshInstanced;
    import IRenderable = flwebgl.e.IRenderable;
    import IDisplayObjectDefinition = flwebgl.sg.IDisplayObjectDefinition;
    class Shape extends DisplayObject {
        yc: Mesh;
        mf: MeshInstanced;
        constructor();
        getDefinition(): IDisplayObjectDefinition;
        setDefinition(obj: IDisplayObjectDefinition): void;
        collectRenderables(renderables: IRenderable[]): void;
        getBounds(target?: DisplayObject, fast?: boolean, edgeType?: string, k?: boolean): Rect;
        calculateBoundsAABB(a: any, transform: any): Rect;
        dispatch(event: Event): void;
        destroy(): void;
    }
}
declare module flwebgl.sg {
    import Context = flwebgl.Context;
    class SceneGraphFactory {
        context: Context;
        nextAvailableID: number;
        constructor(context: Context, nextAvailableID: number);
        createMovieClipInstance(linkageName: string): MovieClip;
        createMovieClip(timelineID: string, mcID: string): MovieClip;
        createShape(meshID: string, shapeID: string): Shape;
        getNextAvailableID(): number;
    }
}
declare module flwebgl.e {
    import Color = flwebgl.geom.Color;
    import ColorTransform = flwebgl.geom.ColorTransform;
    import DisplayObject = flwebgl.sg.DisplayObject;
    class BitmapCacheObject {
        displayObject: DisplayObject;
        color: Color;
        colorTransform: ColorTransform;
        pa: vk;
        constructor(displayObject: DisplayObject, color: Color, colorTransform: ColorTransform, pa: vk);
    }
}
declare module flwebgl.geom {
    class QuadTree {
        private position;
        private size;
        private isFull;
        private children;
        constructor(position: Point, size: number);
        fits(size: number): boolean;
        insert(size: number): Point;
        remove(position: Point): boolean;
        createQuads(): void;
        isEmpty(): boolean;
    }
}
declare module flwebgl.e {
    import Rect = flwebgl.geom.Rect;
    import Color = flwebgl.geom.Color;
    class BitmapCacheSpriteSheet {
        private renderTarget;
        private textureAtlas;
        private tree;
        private ol;
        private uc;
        constructor(renderTarget: RenderTarget, textureAtlas: TextureAtlas);
        fits(width: number, height: number): boolean;
        insert(width: number, height: number): string;
        remove(frameID: string): void;
        getFrame(frameID: string): Rect;
        getTextureID(): string;
        addRenderables(renderables: any[], frameID: string, color: Color): void;
        rasterize(renderer: Renderer): void;
        static MIN_TEXTURE_SIZE: number;
    }
}
declare module flwebgl.e {
    import Rect = flwebgl.geom.Rect;
    import Matrix = flwebgl.geom.Matrix;
    import Color = flwebgl.geom.Color;
    import ColorTransform = flwebgl.geom.ColorTransform;
    import AssetPool = flwebgl.util.AssetPool;
    import SceneGraphFactory = flwebgl.sg.SceneGraphFactory;
    import DisplayObject = flwebgl.sg.DisplayObject;
    class BitmapCacheFactory {
        private renderer;
        private assetPool;
        private sceneGraphFactory;
        private colorTransform;
        private oa;
        private wc;
        private numSpriteSheets;
        private maxSpriteSheets;
        private spriteSheetMap;
        private ce;
        constructor(renderer: Renderer, assetPool: AssetPool, sceneGraphFactory: SceneGraphFactory);
        addCachedObject(a: BitmapCacheObject): boolean;
        Qn(): void;
        Qk(a: any, color: Color, transform: Matrix, colorTransform: ColorTransform): wk;
        ml(a: any): void;
        pa(displayObject: DisplayObject, color: Color, transform: Matrix, colorTransform: ColorTransform): wk;
        Ik(a: any): any;
        getSpriteSheet(width: number, height: number): BitmapCacheSpriteSheet;
        purgeSpriteSheets(): void;
        Tk(bounds: Rect, transform: Matrix, textureID: string, frameID: string, isOpaque: boolean): Mesh;
        Sk(vertices: Float32Array[], indices: number[][], s: number, textureID: string, frameID: string, isOpaque: boolean): Geometry[];
        Xk(a: number, rect: Rect, transform: Matrix): {
            vertices: Float32Array[];
            indices: number[][];
        };
    }
}
declare module flwebgl {
    import Renderer = flwebgl.e.Renderer;
    import AssetPool = flwebgl.util.AssetPool;
    import SoundFactory = flwebgl.media.SoundFactory;
    import SceneGraphFactory = flwebgl.sg.SceneGraphFactory;
    import BitmapCacheFactory = flwebgl.e.BitmapCacheFactory;
    class Context {
        renderer: Renderer;
        assetPool: AssetPool;
        soundFactory: SoundFactory;
        sceneGraphFactory: SceneGraphFactory;
        bitmapCacheFactory: BitmapCacheFactory;
        stage: any;
        constructor(renderer: Renderer, assetPool: AssetPool, soundFactory: SoundFactory);
    }
}
declare module flwebgl.geom {
    class Matrix3x3 {
        values: number[];
        constructor(matrix: any);
        identity(): void;
        copy(matrix: Matrix3x3): void;
        concat(matrix: Matrix3x3): void;
        transformPoint(point: Point): Point;
        invert(): void;
        divide(divisor: number): void;
        copyValues(values: number[]): void;
    }
}
declare module flwebgl {
    class TextureAtlas {
        textureJSON: any;
        imageURL: string;
        constructor(textureJSON: any, imageURL: string);
    }
}
declare module flwebgl.xj.parsers {
    interface IParser {
        nextHighestID: number;
        parseSounds(): boolean;
        parseFills(): boolean;
        parseShapes(): boolean;
        parseTimelines(): boolean;
    }
}
declare module flwebgl.B.commands {
    import Context = flwebgl.Context;
    import Matrix = flwebgl.geom.Matrix;
    import MovieClip = flwebgl.sg.MovieClip;
    class SetTransformCommand implements IFrameCommand {
        targetID: string;
        hf: any;
        transform: Matrix;
        constructor(a: any[]);
        execute(mc: MovieClip, context: Context, x: boolean): boolean;
    }
}
declare module flwebgl.B.commands {
    import Context = flwebgl.Context;
    import ColorTransform = flwebgl.geom.ColorTransform;
    import MovieClip = flwebgl.sg.MovieClip;
    class SetColorTransformCommand implements IFrameCommand {
        targetID: string;
        colorTransform: ColorTransform;
        constructor(a: any[]);
        execute(mc: MovieClip, context: Context, x: boolean): boolean;
    }
}
declare module flwebgl.B.commands {
    import Context = flwebgl.Context;
    import MovieClip = flwebgl.sg.MovieClip;
    class RemoveObjectCommand implements IFrameCommand {
        targetID: string;
        constructor(a: any[]);
        execute(mc: MovieClip, context: Context, x: boolean): boolean;
    }
}
declare module flwebgl.B.commands {
    import Context = flwebgl.Context;
    import Color = flwebgl.geom.Color;
    import MovieClip = flwebgl.sg.MovieClip;
    class CacheAsBitmapCommand implements IFrameCommand {
        targetID: string;
        color: Color;
        constructor(a: any[]);
        execute(mc: MovieClip, context: Context, x: boolean): boolean;
    }
}
declare module flwebgl.B.commands {
    import Context = flwebgl.Context;
    import MovieClip = flwebgl.sg.MovieClip;
    class SetVisibilityCommand implements IFrameCommand {
        targetID: string;
        visible: boolean;
        constructor(a: any[]);
        execute(mc: MovieClip, context: Context, x: boolean): boolean;
    }
}
declare module flwebgl.xj.parsers {
    import AssetPool = flwebgl.util.AssetPool;
    import Parser = flwebgl.xj.Parser;
    class ParserRelease implements IParser {
        private content;
        private parser;
        private assetPool;
        private fillIDNameMap;
        private fillNameIsOpaqueMap;
        private fillNameStyleMap;
        nextHighestID: number;
        constructor(content: any, parser: Parser, assetPool: AssetPool);
        parseSounds(): boolean;
        parseFills(): boolean;
        parseShapes(): boolean;
        parseTimelines(): boolean;
        static kSolid: string;
        static kLinearGradient: string;
        static kBitmap: string;
        static kFills: string;
        static kShapes: string;
        static kTimelines: string;
        static kSounds: string;
        static kSrc: string;
    }
}
declare module flwebgl.xj.parsers {
    import AssetPool = flwebgl.util.AssetPool;
    import Parser = flwebgl.xj.Parser;
    class ParserDebug implements IParser {
        nextHighestID: number;
        constructor(content: any, parser: Parser, assetPool: AssetPool);
        parseSounds(): boolean;
        parseFills(): boolean;
        parseShapes(): boolean;
        parseTimelines(): boolean;
        static kSolid: string;
        static kLinearGradient: string;
        static kBitmap: string;
        static kId: string;
        static kName: string;
        static kLinkageName: string;
        static kIsScene: string;
        static kLabels: string;
        static kFrameNum: string;
        static kFills: string;
        static kStyle: string;
        static kIsOpaque: string;
        static kShapes: string;
        static kMeshes: string;
        static kInternalIndices: string;
        static kConcaveCurveIndices: string;
        static kConvexCurveIndices: string;
        static kEdgeIndices: string;
        static kVertices: string;
        static kFillId: string;
        static kFillMatrix: string;
        static kOverflow: string;
        static kIsBitmapClipped: string;
        static kTimelines: string;
        static kScripts: string;
        static kScript: string;
        static kFrames: string;
        static kSounds: string;
        static kSrc: string;
        static kFramesCmds: string;
    }
}
declare module flwebgl.xj {
    import Color = flwebgl.geom.Color;
    import Point = flwebgl.geom.Point;
    import Rect = flwebgl.geom.Rect;
    import Matrix = flwebgl.geom.Matrix;
    import AssetPool = flwebgl.util.AssetPool;
    import Geometry = flwebgl.e.Geometry;
    import PlayerOptions = flwebgl.PlayerOptions;
    class StageInfo {
        width: number;
        height: number;
        color: Color;
        frameRate: number;
        loop: boolean;
        sceneTimelines: number[];
        constructor(width: number, height: number, color: Color, frameRate: number, loop: boolean, sceneTimelines: number[]);
    }
    class BufferData {
        vertices: number[];
        indices: number[];
        constructor(vertices?: number[], indices?: number[]);
    }
    class Parser {
        enableCacheAsBitmap: boolean;
        emulateStandardDerivatives: boolean;
        nextHighestID: number;
        private assetPool;
        private attributeDefs;
        private attributesPerVertex;
        constructor(assetPool: AssetPool);
        init(content: any, textures: flwebgl.TextureAtlas[], options: PlayerOptions): StageInfo;
        parse(content: any, options: PlayerOptions): StageInfo;
        parseTextureAtlas(textureJSON: any, imageURL: string, atlasID: string): boolean;
        If(vertices: number[], fillName: string, fillStyle: string, fillMatrix: number[], fillOverflow: string, fillIsBitmapClipped: boolean, fillIsOpaque: boolean, internalIndices?: number[], concaveCurveIndices?: number[], convexCurveIndices?: number[], edgeIndices?: number[]): Geometry[];
        dj(vertices: any, concaveCurveIndices: any, convexCurveIndices: any, edgeIndices: any, fillName: any, fillStyle: any, fillIsOpaque: any, fillMatrix: any, fillOverflow: any, fillIsBitmapClipped: any): Geometry[];
        Sc(vertices: number[], indices: number[], positions: Point[], texCoords: Point[], isConvexMultipliers: number[], vertexOffs: any, indexOffs: any): void;
        ec(a: any): Point;
        wi(a: any, b: any, h: any): Point[];
        createInternalBuffers(vertices: number[], indices: number[]): BufferData[];
        createExternalBuffers(vertices: number[], concaveCurveIndices: number[], convexCurveIndices: number[], edgeIndices: number[]): BufferData[];
        createBufferData(vertices: number[], indices: number[], start: number, end: number, texCoords: Point[], isConvexMultiplier: number, bufferData?: BufferData): BufferData;
        injectLoopBlinnTexCoords(bufferData: BufferData, fillName: string, fillStyle: string, fillMatrix: number[]): {};
        injectLoopBlinnTexCoords_SolidFill(vertices: number[], stride: number, offset: number, textureWidth: number, textureHeight: number, frame: Rect, count: number): void;
        injectLoopBlinnTexCoords_LinearGradientFill(vertices: number[], stride: number, offset: number, count: number, matrixValues: number[]): void;
        injectLoopBlinnTexCoords_BitmapFill(vertices: number[], stride: number, offset: number, count: number, matrixValues: number[], bitmapWidth: number, bitmapHeight: number): void;
        injectStandardDerivativeTexCoords(edgeType: any, vertices: any, count: any): void;
        bl(matrixValues: number[], texCoords: Point[]): Point[];
        getFillMode(fillStyle: string, fillOverflow: string, fillIsBitmapClipped: boolean): number;
        static tex: Point[];
        static fillMatrixIdentity: Matrix;
        static kHeader: string;
        static kStageSize: string;
        static kWidth: string;
        static kHeight: string;
        static kStageColor: string;
        static kFrameRate: string;
        static kReadable: string;
        static kLoop: string;
        static kSceneTimelines: string;
        static kFrames: string;
        static kFrame: string;
        static kMeta: string;
        static kSize: string;
        static kX: string;
        static kY: string;
        static kW: string;
        static kH: string;
    }
}
declare module flwebgl {
    import AssetPool = flwebgl.util.AssetPool;
    import Rect = flwebgl.geom.Rect;
    class Player {
        assetPool: AssetPool;
        private canvas;
        private options;
        private renderer;
        private soundFactory;
        private sceneGraphFactory;
        private bitmapCacheFactory;
        private parser;
        private context;
        private stage;
        private sceneTimelines;
        private completeCBK;
        private texturesLoaded;
        private soundsLoaded;
        private backgroundColor;
        private stageWidth;
        private stageHeight;
        private frameRate;
        private frameDuration;
        private loop;
        private playMode;
        private numFrames;
        private rafID;
        private timeoutID;
        private startTime;
        private Xe;
        private Hi;
        private currentSceneIndex;
        private jd;
        private renderables;
        private mainLoop;
        private frameRenderListener;
        constructor();
        init(canvas: HTMLCanvasElement, content: any, textures: TextureAtlas[], callback: any, options?: any): number;
        private _texturesLoadedCBK();
        private _soundsLoadedCBK();
        private _checkComplete();
        getStageWidth(): number;
        getStageHeight(): number;
        setViewport(rect: Rect): void;
        play(scene?: string): boolean;
        stop(): void;
        _loop(): void;
        collectRenderables(): void;
        draw(): void;
        initStateGL(): void;
        Gk(): void;
        gotoScene(sceneIndex: number, b?: boolean): void;
        Al(b?: boolean): void;
        webglContextLostHandler(event: any): void;
        webglContextRestoredHandler(): void;
        static S_OK: number;
        static E_ERR: number;
        static E_INVALID_PARAM: number;
        static E_CONTEXT_CREATION_FAILED: number;
        static E_REQUIRED_EXTENSION_NOT_PRESENT: number;
        static E_RESOURCE_LOADING_FAILED: number;
        static kIsPlaying: number;
        static kIsStopped: number;
        static FRAME_RENDER: number;
    }
}
