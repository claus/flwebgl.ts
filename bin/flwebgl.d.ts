declare module flwebgl.e {
    class Mesh {
        id: any;
        constructor(id: any);
        getID(): any;
    }
}
declare module flwebgl.util {
    class Utils {
        static isUndefined(object: any): boolean;
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
    import Timeline = flwebgl.B.Timeline;
    class AssetPool {
        private meshMap;
        private timelineMap;
        private textureAtlasMap;
        private soundMap;
        private nextAvailableAssetID;
        constructor();
        getMesh(id: string): Mesh;
        setMesh(mesh: Mesh): void;
        getMeshes(): Mesh[];
        removeMesh(id: string): void;
        getTimeline(id: string): Timeline;
        setTimeline(timeline: Timeline): void;
        getTimelines(): Timeline[];
        getTimelineByName(linkageName: string): Timeline;
        removeTimeline(id: string): void;
        destroy(): void;
    }
}
declare module flwebgl {
    import AssetPool = flwebgl.util.AssetPool;
    class Player {
        assetPool: AssetPool;
        constructor();
        init(): void;
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
