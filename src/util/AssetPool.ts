/// <reference path="../e/Mesh.ts" />
/// <reference path="../B/Timeline.ts" />

module flwebgl.util
{
  import Mesh = flwebgl.e.Mesh;
  import Timeline = flwebgl.B.Timeline;

  interface MeshMap { [id: string]: Mesh; }
  interface TimelineMap { [id: string]: Timeline; }

  export class AssetPool
  {
    private meshMap: MeshMap;
    private timelineMap: TimelineMap;
    private textureAtlasMap: any;
    private soundMap: any;
    private nextAvailableAssetID: number;

    constructor() {
      this.meshMap = {};
      this.timelineMap = {};
      this.textureAtlasMap = {};
      this.soundMap = {};
      this.nextAvailableAssetID = -1;
    }

    getMesh(id: string): Mesh {
      return this.meshMap[id];
    }
    setMesh(mesh: Mesh) {
      this.meshMap[mesh.getID()] = mesh;
    }
    getMeshes(): Mesh[] {
      var meshes: Mesh[] = [];
      var i = 0;
      for (var id in this.meshMap) {
        meshes[i++] = this.meshMap[id];
      }
      return meshes;
    }
    removeMesh(id: string) {
      delete this.meshMap[id];
    }

    getTimeline(id: string): Timeline {
      return this.timelineMap[id];
    }
    setTimeline(timeline: Timeline) {
      this.timelineMap[timeline.id] = timeline;
    }
    getTimelines(): Timeline[] {
      var timelines: Timeline[] = [];
      var i = 0;
      for (var id in this.timelineMap) {
        timelines[i++] = this.timelineMap[id];
      }
      return timelines;
    }
    getTimelineByName(linkageName: string): Timeline {
      for (var id in this.timelineMap) {
        var timeline = this.timelineMap[id];
        if (timeline.linkageName === linkageName) {
          return timeline;
        }
      }
    }
    removeTimeline(id: string) {
      delete this.timelineMap[id];
    }

    destroy() {
      var id: string;
      for (id in this.meshMap) {
        this.removeMesh(id);
      }
      for (id in this.timelineMap) {
        this.removeTimeline(id);
      }
    }
  }
}
