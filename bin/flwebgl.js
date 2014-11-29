var flwebgl;
(function (flwebgl) {
    var e;
    (function (e) {
        var Mesh = (function () {
            function Mesh(id) {
                this.id = id;
            }
            Mesh.prototype.getID = function () {
                return this.id;
            };
            return Mesh;
        })();
        e.Mesh = Mesh;
    })(e = flwebgl.e || (flwebgl.e = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var util;
    (function (util) {
        var Utils = (function () {
            function Utils() {
            }
            Utils.isUndefined = function (object) {
                return typeof object === "undefined";
            };
            return Utils;
        })();
        util.Utils = Utils;
    })(util = flwebgl.util || (flwebgl.util = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var B;
    (function (B) {
        var Utils = flwebgl.util.Utils;
        var Timeline = (function () {
            function Timeline(id, name, linkageName, isScene, labels, scripts) {
                this._id = id;
                this._name = name;
                this._linkageName = linkageName;
                this._isScene = isScene;
                this._labels = labels;
                this.commands = [];
                this.scripts = {};
                for (var i = 0; i < scripts.length; i++) {
                    var script = scripts[i];
                    var frameIdx = script.frameNum - 1;
                    if (Utils.isUndefined(this.scripts[frameIdx])) {
                        this.scripts[frameIdx] = [script.functionName];
                    }
                    else {
                        this.scripts[frameIdx].push(script.functionName);
                    }
                }
            }
            Object.defineProperty(Timeline.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timeline.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timeline.prototype, "linkageName", {
                get: function () {
                    return this._linkageName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timeline.prototype, "isScene", {
                get: function () {
                    return this._isScene;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timeline.prototype, "labels", {
                get: function () {
                    return this._labels;
                },
                enumerable: true,
                configurable: true
            });
            Timeline.prototype.getFrameScriptNames = function (frameIdx) {
                return this.scripts[frameIdx] ? this.scripts[frameIdx] : [];
            };
            Timeline.prototype.getFrameCommands = function (frameIdx) {
                return (frameIdx < this.commands.length) ? this.commands[frameIdx] : [];
            };
            Timeline.prototype.addFrameCommands = function (commands) {
                this.commands.push(commands);
            };
            return Timeline;
        })();
        B.Timeline = Timeline;
    })(B = flwebgl.B || (flwebgl.B = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var util;
    (function (util) {
        var AssetPool = (function () {
            function AssetPool() {
                this.meshMap = {};
                this.timelineMap = {};
                this.textureAtlasMap = {};
                this.soundMap = {};
                this.nextAvailableAssetID = -1;
            }
            AssetPool.prototype.getMesh = function (id) {
                return this.meshMap[id];
            };
            AssetPool.prototype.setMesh = function (mesh) {
                this.meshMap[mesh.getID()] = mesh;
            };
            AssetPool.prototype.getMeshes = function () {
                var meshes = [];
                var i = 0;
                for (var id in this.meshMap) {
                    meshes[i++] = this.meshMap[id];
                }
                return meshes;
            };
            AssetPool.prototype.removeMesh = function (id) {
                delete this.meshMap[id];
            };
            AssetPool.prototype.getTimeline = function (id) {
                return this.timelineMap[id];
            };
            AssetPool.prototype.setTimeline = function (timeline) {
                this.timelineMap[timeline.id] = timeline;
            };
            AssetPool.prototype.getTimelines = function () {
                var timelines = [];
                var i = 0;
                for (var id in this.timelineMap) {
                    timelines[i++] = this.timelineMap[id];
                }
                return timelines;
            };
            AssetPool.prototype.getTimelineByName = function (linkageName) {
                for (var id in this.timelineMap) {
                    var timeline = this.timelineMap[id];
                    if (timeline.linkageName === linkageName) {
                        return timeline;
                    }
                }
            };
            AssetPool.prototype.removeTimeline = function (id) {
                delete this.timelineMap[id];
            };
            AssetPool.prototype.destroy = function () {
                var id;
                for (id in this.meshMap) {
                    this.removeMesh(id);
                }
                for (id in this.timelineMap) {
                    this.removeTimeline(id);
                }
            };
            return AssetPool;
        })();
        util.AssetPool = AssetPool;
    })(util = flwebgl.util || (flwebgl.util = {}));
})(flwebgl || (flwebgl = {}));
var flwebgl;
(function (flwebgl) {
    var AssetPool = flwebgl.util.AssetPool;
    var Player = (function () {
        function Player() {
            this.assetPool = new AssetPool();
        }
        Player.prototype.init = function () {
        };
        return Player;
    })();
    flwebgl.Player = Player;
})(flwebgl || (flwebgl = {}));
