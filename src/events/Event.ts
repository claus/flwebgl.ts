/// <reference path="EventDispatcher.ts" />

module flwebgl.events
{
  export class Event
  {
    private _type: string;
    private _bubbles: boolean;
    private _currentTarget: EventDispatcher;
    private _target: EventDispatcher;

    _stopped: boolean;
    _stoppedImmediate: boolean;

    constructor(type: string, bubbles: boolean = false) {
      this._type = type;
      this._bubbles = bubbles;
      this._stopped = false;
      this._stoppedImmediate = false;
    }

    get type(): string { return this._type; }

    get bubbles(): boolean { return this._bubbles; }

    get target(): EventDispatcher { return this._target; }
    set target(value: EventDispatcher) { this._target = value; }

    get currentTarget(): EventDispatcher { return this._currentTarget; }
    set currentTarget(value: EventDispatcher) { this._currentTarget = value; }

    stopPropagation() {
      this._stopped = true;
    }
    stopImmediatePropagation() {
      this._stoppedImmediate = true;
    }

    static ADDED = "flwebgl.events.Event.ADDED";
    static REMOVED = "flwebgl.events.Event.REMOVED";
    static UPDATED = "flwebgl.events.Event.UPDATED";
    static ENTER_FRAME = "flwebgl.events.Event.ENTER_FRAME";
    static EXIT_FRAME = "flwebgl.events.Event.EXIT_FRAME";
    static FRAME_CONSTRUCTED = "flwebgl.events.Event.FRAME_CONSTRUCTED";
  }
}
