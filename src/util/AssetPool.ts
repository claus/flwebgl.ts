/// <reference path="../e/Mesh.ts" />
/// <reference path="../e/TextureAtlas.ts" />
/// <reference path="../B/Timeline.ts" />
/// <reference path="../media/Sound.ts" />

module flwebgl.util
{
  import Mesh = flwebgl.e.Mesh;
  import TextureAtlas = flwebgl.e.TextureAtlas;
  import Timeline = flwebgl.B.Timeline;
  import Sound = flwebgl.media.Sound;

  interface MeshMap { [id: string]: Mesh; }
  interface TimelineMap { [id: string]: Timeline; }
  interface TextureAtlasMap { [id: string]: TextureAtlas; }
  interface SoundMap { [id: string]: Sound; }

  export class AssetPool
  {
    private meshMap: MeshMap;
    private timelineMap: TimelineMap;
    private textureAtlasMap: TextureAtlasMap;
    private soundMap: SoundMap;
    private nextAvailableAssetID: number;

    constructor() {
      this.meshMap = {};
      this.timelineMap = {};
      this.textureAtlasMap = {};
      this.soundMap = {};
      this.nextAvailableAssetID = -1;
    }

    setMesh(mesh: Mesh) {
      this.meshMap[mesh.id] = mesh;
    }
    getMesh(id: string): Mesh {
      return this.meshMap[id];
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

    setTimeline(timeline: Timeline) {
      this.timelineMap[timeline.id] = timeline;
    }
    getTimeline(id: string): Timeline {
      return this.timelineMap[id];
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

    setTextureAtlas(textureAtlas: TextureAtlas) {
      this.textureAtlasMap[textureAtlas.id] = textureAtlas;
    }
    getTextureAtlas(id: string): TextureAtlas {
      return this.textureAtlasMap[id];
    }
    getTextureAtlases(): TextureAtlas[] {
      var textureAtlases: TextureAtlas[] = [];
      var i = 0;
      for (var id in this.textureAtlasMap) {
        textureAtlases[i++] = this.textureAtlasMap[id];
      }
      return textureAtlases;
    }

    // TODO
    setSound(sound: Sound) {
      this.soundMap[sound.id] = sound;
    }
    getSounds(): Sound[] {
      var sounds: Sound[] = [];
      var i = 0;
      for (var id in this.soundMap) {
        sounds[i++] = this.soundMap[id];
      }
      return sounds;
    }

    getNextAvailableAssetID() {
      if (this.nextAvailableAssetID === -1) {
        var i;
        var meshes = this.getMeshes();
        var meshCount = meshes.length;
        for (i = 0; i < meshCount; i++) {
          var mesh = meshes[i];
          var meshID = +mesh.id;
          if (this.nextAvailableAssetID < meshID) {
            this.nextAvailableAssetID = meshID;
          }
        }
        var timelines = this.getTimelines();
        var timelineCount = timelines.length;
        for (i = 0; i < timelineCount; i++) {
          var timeline = timelines[i];
          var timelineID = +timeline.id;
          if (this.nextAvailableAssetID < timelineID) {
            this.nextAvailableAssetID = timelineID;
          }
        }
      }
      return ++this.nextAvailableAssetID;
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
