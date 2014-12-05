/// <reference path="Event.ts" />

module flwebgl.events
{
  interface ListenerMap { [type: string]: any[] }

  export class EventDispatcher
  {
    private listenerMap: ListenerMap;

    constructor() {
      this.listenerMap = {};
    }

    addEventListener(type: string, listener: any) {
      var listeners = this.listenerMap[type];
      if (!listeners) {
        listeners = this.listenerMap[type] = [];
      }
      if (!this.hasEventListener(type, listener)) {
        listeners.push(listener);
      }
    }

    hasEventListener(type: string, listener?: any): boolean {
      var listeners = this.listenerMap[type];
      if (!listeners || listeners.length === 0) {
        return false;
      }
      if (listener) {
        for (var i = 0; i < listeners.length; i++) {
          if (listeners[i] === listener) {
            return true;
          }
        }
        return false;
      }
      return true;
    }

    removeEventListener(type: string, listener: any) {
      var listeners = this.listenerMap[type];
      if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
          if (listeners[i] === listener) {
            listeners.splice(i, 1);
          }
        }
      }
    }

    dispatchEvent(event: Event) {
      event.target = this;
      this.dispatch(event);
    }

    dispatch(event: Event) {
      var listeners = this.listenerMap[event.type];
      if (listeners && listeners.length) {
        listeners = listeners.slice(0);
        event.currentTarget = this;
        for (var i = 0; i < listeners.length && !event._stoppedImmediate; i++) {
          listeners[i](event);
        }
      }
    }

    removeAllListeners() {
      this.listenerMap = {};
    }
  }
}
