"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/events@3.3.0/node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/.pnpm/events@3.3.0/node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn)
          console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter2() {
        EventEmitter2.init.call(this);
      }
      module.exports = EventEmitter2;
      module.exports.once = once;
      EventEmitter2.EventEmitter = EventEmitter2;
      EventEmitter2.prototype._events = void 0;
      EventEmitter2.prototype._eventsCount = 0;
      EventEmitter2.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter2.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter2.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter2.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++)
          args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter2.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
      EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter2.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter2.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter2.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter2.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter2.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/.pnpm/quasar@2.13.0/node_modules/quasar/wrappers/index.js
  var require_wrappers = __commonJS({
    "node_modules/.pnpm/quasar@2.13.0/node_modules/quasar/wrappers/index.js"(exports, module) {
      module.exports.boot = function(callback) {
        return callback;
      };
      module.exports.ssrMiddleware = function(callback) {
        return callback;
      };
      module.exports.configure = function(callback) {
        return callback;
      };
      module.exports.preFetch = function(callback) {
        return callback;
      };
      module.exports.route = function(callback) {
        return callback;
      };
      module.exports.store = function(callback) {
        return callback;
      };
      module.exports.bexBackground = function(callback) {
        return callback;
      };
      module.exports.bexContent = function(callback) {
        return callback;
      };
      module.exports.bexDom = function(callback) {
        return callback;
      };
      module.exports.ssrProductionExport = function(callback) {
        return callback;
      };
      module.exports.ssrCreate = function(callback) {
        return callback;
      };
      module.exports.ssrListen = function(callback) {
        return callback;
      };
      module.exports.ssrClose = function(callback) {
        return callback;
      };
      module.exports.ssrServeStaticContent = function(callback) {
        return callback;
      };
      module.exports.ssrRenderPreloadTag = function(callback) {
        return callback;
      };
    }
  });

  // .quasar/bex/bridge.js
  var import_events = __toESM(require_events());

  // node_modules/.pnpm/quasar@2.13.0/node_modules/quasar/src/utils/uid.js
  var buf;
  var bufIdx = 0;
  var hexBytes = new Array(256);
  for (let i = 0; i < 256; i++) {
    hexBytes[i] = (i + 256).toString(16).substring(1);
  }
  var randomBytes = (() => {
    const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
    if (lib !== void 0) {
      if (lib.randomBytes !== void 0) {
        return lib.randomBytes;
      }
      if (lib.getRandomValues !== void 0) {
        return (n) => {
          const bytes = new Uint8Array(n);
          lib.getRandomValues(bytes);
          return bytes;
        };
      }
    }
    return (n) => {
      const r = [];
      for (let i = n; i > 0; i--) {
        r.push(Math.floor(Math.random() * 256));
      }
      return r;
    };
  })();
  var BUFFER_SIZE = 4096;
  function uid_default() {
    if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
      bufIdx = 0;
      buf = randomBytes(BUFFER_SIZE);
    }
    const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
    b[6] = b[6] & 15 | 64;
    b[8] = b[8] & 63 | 128;
    return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
  }

  // .quasar/bex/bridge.js
  var typeSizes = {
    "undefined": () => 0,
    "boolean": () => 4,
    "number": () => 8,
    "string": (item) => 2 * item.length,
    "object": (item) => !item ? 0 : Object.keys(item).reduce((total, key) => sizeOf(key) + sizeOf(item[key]) + total, 0)
  };
  var sizeOf = (value) => typeSizes[typeof value](value);
  var Bridge = class extends import_events.EventEmitter {
    constructor(wall) {
      super();
      this.setMaxListeners(Infinity);
      this.wall = wall;
      wall.listen((messages) => {
        if (Array.isArray(messages)) {
          messages.forEach((message) => this._emit(message));
        } else {
          this._emit(messages);
        }
      });
      this._sendingQueue = [];
      this._sending = false;
      this._maxMessageSize = 32 * 1024 * 1024;
    }
    send(event, payload) {
      return this._send([{ event, payload }]);
    }
    getEvents() {
      return this._events;
    }
    on(eventName, listener) {
      return super.on(eventName, (originalPayload) => {
        listener({
          ...originalPayload,
          respond: (payload) => this.send(originalPayload.eventResponseKey, payload)
        });
      });
    }
    _emit(message) {
      if (typeof message === "string") {
        this.emit(message);
      } else {
        this.emit(message.event, message.payload);
      }
    }
    _send(messages) {
      this._sendingQueue.push(messages);
      return this._nextSend();
    }
    _nextSend() {
      if (!this._sendingQueue.length || this._sending)
        return Promise.resolve();
      this._sending = true;
      const messages = this._sendingQueue.shift(), currentMessage = messages[0], eventListenerKey = `${currentMessage.event}.${uid_default()}`, eventResponseKey = eventListenerKey + ".result";
      return new Promise((resolve, reject) => {
        let allChunks = [];
        const fn = (r) => {
          if (r !== void 0 && r._chunkSplit) {
            const chunkData = r._chunkSplit;
            allChunks = [...allChunks, ...r.data];
            if (chunkData.lastChunk) {
              this.off(eventResponseKey, fn);
              resolve(allChunks);
            }
          } else {
            this.off(eventResponseKey, fn);
            resolve(r);
          }
        };
        this.on(eventResponseKey, fn);
        try {
          const messagesToSend = messages.map((m) => {
            return {
              ...m,
              ...{
                payload: {
                  data: m.payload,
                  eventResponseKey
                }
              }
            };
          });
          this.wall.send(messagesToSend);
        } catch (err) {
          const errorMessage = "Message length exceeded maximum allowed length.";
          if (err.message === errorMessage) {
            if (!Array.isArray(currentMessage.payload)) {
              if (true) {
                console.error(errorMessage + " Note: The bridge can deal with this is if the payload is an Array.");
              }
            } else {
              const objectSize = sizeOf(currentMessage);
              if (objectSize > this._maxMessageSize) {
                const chunksRequired = Math.ceil(objectSize / this._maxMessageSize), arrayItemCount = Math.ceil(currentMessage.payload.length / chunksRequired);
                let data = currentMessage.payload;
                for (let i = 0; i < chunksRequired; i++) {
                  let take = Math.min(data.length, arrayItemCount);
                  this.wall.send([{
                    event: currentMessage.event,
                    payload: {
                      _chunkSplit: {
                        count: chunksRequired,
                        lastChunk: i === chunksRequired - 1
                      },
                      data: data.splice(0, take)
                    }
                  }]);
                }
              }
            }
          }
        }
        this._sending = false;
        setTimeout(() => {
          return this._nextSend();
        }, 16);
      });
    }
  };

  // .quasar/bex/window-event-listener.js
  var listenForWindowEvents = (bridge2, type) => {
    window.addEventListener("message", (payload) => {
      if (payload.source !== window) {
        return;
      }
      if (payload.data.from !== void 0 && payload.data.from === type) {
        const eventData = payload.data[0], bridgeEvents = bridge2.getEvents();
        for (let event in bridgeEvents) {
          if (event === eventData.event) {
            bridgeEvents[event](eventData.payload);
          }
        }
      }
    }, false);
  };

  // src-bex/dom.ts
  var import_wrappers = __toESM(require_wrappers());
  var dom_default = (0, import_wrappers.bexDom)(() => {
    if (window.location.hostname === "www.youtube.com" || window.location.hostname === "youtube.com") {
      alert();
    }
  });

  // .quasar/bex/entry-dom.js
  var bridge = new Bridge({
    listen(_fn) {
    },
    send(data) {
      const payload = {
        ...data,
        from: "bex-dom"
      };
      window.postMessage(payload, "*");
    }
  });
  listenForWindowEvents(bridge, "bex-content-script");
  dom_default(bridge);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2V2ZW50c0AzLjMuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcXVhc2FyQDIuMTMuMC9ub2RlX21vZHVsZXMvcXVhc2FyL3dyYXBwZXJzL2luZGV4LmpzIiwgIi4uLy4uLy5xdWFzYXIvYmV4L2JyaWRnZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcXVhc2FyQDIuMTMuMC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy91aWQuanMiLCAiLi4vLi4vLnF1YXNhci9iZXgvd2luZG93LWV2ZW50LWxpc3RlbmVyLmpzIiwgIi4uLy4uL3NyYy1iZXgvZG9tLnRzIiwgIi4uLy4uLy5xdWFzYXIvYmV4L2VudHJ5LWRvbS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsICIvLyBGdW5jdGlvbnMgaW4gdGhpcyBmaWxlIGFyZSBuby1vcCxcbi8vICB0aGV5IGp1c3QgdGFrZSBhIGNhbGxiYWNrIGZ1bmN0aW9uIGFuZCByZXR1cm4gaXRcbi8vIFRoZXkncmUgdXNlZCB0byBhcHBseSB0eXBpbmdzIHRvIHRoZSBjYWxsYmFja1xuLy8gIHBhcmFtZXRlcnMgYW5kIHJldHVybiB2YWx1ZSB3aGVuIHVzaW5nIFF1YXNhciB3aXRoIFR5cGVTY3JpcHRcbi8vIFdlIG5lZWQgdGhlc2UgaW4gYHVpYCBmb2xkZXIgdG8gbWFrZSBgcXVhc2FyL3dyYXBwZXJgIGltcG9ydCB3b3JrLFxuLy8gIGJ1dCB0aGV5IGFyZSB1c2VmdWwgb25seSBmb3IgUXVhc2FyIENMSSBwcm9qZWN0c1xuLy8gVGhleSBhcmUgdHlwZWQgdmlhIG1vZHVsZSBhdWdtZW50YXRpb24gYnkgYEBxdWFzYXIvYXBwLXdlYnBhY2tgIC8gYEBxdWFzYXIvYXBwLXZpdGVgXG5cbm1vZHVsZS5leHBvcnRzLmJvb3QgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbm1vZHVsZS5leHBvcnRzLnNzck1pZGRsZXdhcmUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbm1vZHVsZS5leHBvcnRzLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMucHJlRmV0Y2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbm1vZHVsZS5leHBvcnRzLnJvdXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5zdG9yZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuYmV4QmFja2dyb3VuZCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuYmV4Q29udGVudCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuYmV4RG9tID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG4vKipcbiAqIEJlbG93IG9ubHkgZm9yIEBxdWFzYXIvYXBwLXdlYnBhY2sgdjNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cy5zc3JQcm9kdWN0aW9uRXhwb3J0ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG4vKipcbiAqIEJlbG93IG9ubHkgZm9yIEBxdWFzYXIvYXBwLXZpdGUgJiBAcXVhc2FyL2FwcC13ZWJwYWNrIHY0K1xuICovXG5cbm1vZHVsZS5leHBvcnRzLnNzckNyZWF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuc3NyTGlzdGVuID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5zc3JDbG9zZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuc3NyU2VydmVTdGF0aWNDb250ZW50ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5zc3JSZW5kZXJQcmVsb2FkVGFnID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlICovXG4vKipcbiAqIFRISVMgRklMRSBJUyBHRU5FUkFURUQgQVVUT01BVElDQUxMWS5cbiAqIERPIE5PVCBFRElULlxuICoqL1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnXG5pbXBvcnQgdWlkIGZyb20gJ3F1YXNhci9zcmMvdXRpbHMvdWlkJ1xuXG5jb25zdFxuICB0eXBlU2l6ZXMgPSB7XG4gICAgJ3VuZGVmaW5lZCc6ICgpID0+IDAsXG4gICAgJ2Jvb2xlYW4nOiAoKSA9PiA0LFxuICAgICdudW1iZXInOiAoKSA9PiA4LFxuICAgICdzdHJpbmcnOiBpdGVtID0+IDIgKiBpdGVtLmxlbmd0aCxcbiAgICAnb2JqZWN0JzogaXRlbSA9PiAhaXRlbSA/IDAgOiBPYmplY3RcbiAgICAgIC5rZXlzKGl0ZW0pXG4gICAgICAucmVkdWNlKCh0b3RhbCwga2V5KSA9PiBzaXplT2Yoa2V5KSArIHNpemVPZihpdGVtW2tleV0pICsgdG90YWwsIDApXG4gIH0sXG4gIHNpemVPZiA9IHZhbHVlID0+IHR5cGVTaXplc1t0eXBlb2YgdmFsdWVdKHZhbHVlKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcmlkZ2UgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAod2FsbCkge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuc2V0TWF4TGlzdGVuZXJzKEluZmluaXR5KVxuICAgIHRoaXMud2FsbCA9IHdhbGxcblxuICAgIHdhbGwubGlzdGVuKG1lc3NhZ2VzID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG1lc3NhZ2VzKSkge1xuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4gdGhpcy5fZW1pdChtZXNzYWdlKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9lbWl0KG1lc3NhZ2VzKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLl9zZW5kaW5nUXVldWUgPSBbXVxuICAgIHRoaXMuX3NlbmRpbmcgPSBmYWxzZVxuICAgIHRoaXMuX21heE1lc3NhZ2VTaXplID0gMzIgKiAxMDI0ICogMTAyNCAvLyAzMm1iXG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhbiBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBwYXlsb2FkXG4gICAqIEByZXR1cm5zIFByb21pc2U8PlxuICAgKi9cbiAgc2VuZCAoZXZlbnQsIHBheWxvYWQpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VuZChbeyBldmVudCwgcGF5bG9hZCB9XSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHJlZ2lzdGVyZWQgZXZlbnRzXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0RXZlbnRzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRzXG4gIH1cblxuICBvbihldmVudE5hbWUsIGxpc3RlbmVyKSB7XG4gICAgcmV0dXJuIHN1cGVyLm9uKGV2ZW50TmFtZSwgKG9yaWdpbmFsUGF5bG9hZCkgPT4ge1xuICAgICAgbGlzdGVuZXIoe1xuICAgICAgICAuLi5vcmlnaW5hbFBheWxvYWQsXG4gICAgICAgIC8vIENvbnZlbmllbnQgYWx0ZXJuYXRpdmUgdG8gdGhlIG1hbnVhbCB1c2FnZSBvZiBgZXZlbnRSZXNwb25zZUtleWBcbiAgICAgICAgLy8gV2UgY2FuJ3Qgc2VuZCB0aGlzIGluIGBfbmV4dFNlbmRgIHdoaWNoIHdpbGwgdGhlbiBiZSBzZW50IHVzaW5nIGBwb3J0LnBvc3RNZXNzYWdlKClgLCB3aGljaCBjYW4ndCBzZXJpYWxpemUgZnVuY3Rpb25zLlxuICAgICAgICAvLyBTbywgd2UgaG9vayBpbnRvIHRoZSB1bmRlcmx5aW5nIGxpc3RlbmVyIGFuZCBpbmNsdWRlIHRoZSBmdW5jdGlvbiB0aGVyZSwgd2hpY2ggaGFwcGVucyBhZnRlciB0aGUgc2VuZCBvcGVyYXRpb24uXG4gICAgICAgIHJlc3BvbmQ6IChwYXlsb2FkIC8qIG9wdGlvbmFsICovKSA9PiB0aGlzLnNlbmQob3JpZ2luYWxQYXlsb2FkLmV2ZW50UmVzcG9uc2VLZXksIHBheWxvYWQpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBfZW1pdCAobWVzc2FnZSkge1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuZW1pdChtZXNzYWdlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChtZXNzYWdlLmV2ZW50LCBtZXNzYWdlLnBheWxvYWQpXG4gICAgfVxuICB9XG5cbiAgX3NlbmQgKG1lc3NhZ2VzKSB7XG4gICAgdGhpcy5fc2VuZGluZ1F1ZXVlLnB1c2gobWVzc2FnZXMpXG4gICAgcmV0dXJuIHRoaXMuX25leHRTZW5kKClcbiAgfVxuXG4gIF9uZXh0U2VuZCAoKSB7XG4gICAgaWYgKCF0aGlzLl9zZW5kaW5nUXVldWUubGVuZ3RoIHx8IHRoaXMuX3NlbmRpbmcpIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIHRoaXMuX3NlbmRpbmcgPSB0cnVlXG5cbiAgICBjb25zdFxuICAgICAgbWVzc2FnZXMgPSB0aGlzLl9zZW5kaW5nUXVldWUuc2hpZnQoKSxcbiAgICAgIGN1cnJlbnRNZXNzYWdlID0gbWVzc2FnZXNbMF0sXG4gICAgICBldmVudExpc3RlbmVyS2V5ID0gYCR7Y3VycmVudE1lc3NhZ2UuZXZlbnR9LiR7dWlkKCl9YCxcbiAgICAgIGV2ZW50UmVzcG9uc2VLZXkgPSBldmVudExpc3RlbmVyS2V5ICsgJy5yZXN1bHQnXG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IGFsbENodW5rcyA9IFtdXG5cbiAgICAgIGNvbnN0IGZuID0gKHIpID0+IHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHNwbGl0IG1lc3NhZ2UgdGhlbiBrZWVwIGxpc3RlbmluZyBmb3IgdGhlIGNodW5rcyBhbmQgYnVpbGQgYSBsaXN0IHRvIHJlc29sdmVcbiAgICAgICAgaWYgKHIgIT09IHZvaWQgMCAmJiByLl9jaHVua1NwbGl0KSB7XG4gICAgICAgICAgY29uc3QgY2h1bmtEYXRhID0gci5fY2h1bmtTcGxpdFxuICAgICAgICAgIGFsbENodW5rcyA9IFsuLi5hbGxDaHVua3MsIC4uLnIuZGF0YV1cblxuICAgICAgICAgIC8vIExhc3QgY2h1bmsgcmVjZWl2ZWQgc28gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgICBpZiAoY2h1bmtEYXRhLmxhc3RDaHVuaykge1xuICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnRSZXNwb25zZUtleSwgZm4pXG4gICAgICAgICAgICByZXNvbHZlKGFsbENodW5rcylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5vZmYoZXZlbnRSZXNwb25zZUtleSwgZm4pXG4gICAgICAgICAgcmVzb2x2ZShyKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMub24oZXZlbnRSZXNwb25zZUtleSwgZm4pXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIEFkZCBhbiBldmVudCByZXNwb25zZSBrZXkgdG8gdGhlIHBheWxvYWQgd2UncmUgc2VuZGluZyBzbyB0aGUgbWVzc2FnZSBrbm93cyB3aGljaCBjaGFubmVsIHRvIHJlc3BvbmQgb24uXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzVG9TZW5kID0gbWVzc2FnZXMubWFwKG0gPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5tLFxuICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgZGF0YTogbS5wYXlsb2FkLFxuICAgICAgICAgICAgICAgIGV2ZW50UmVzcG9uc2VLZXlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLndhbGwuc2VuZChtZXNzYWdlc1RvU2VuZClcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ01lc3NhZ2UgbGVuZ3RoIGV4Y2VlZGVkIG1heGltdW0gYWxsb3dlZCBsZW5ndGguJ1xuXG4gICAgICAgIGlmIChlcnIubWVzc2FnZSA9PT0gZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIHBheWxvYWQgaXMgYW4gYXJyYXkgYW5kIHRvbyBiaWcgdGhlbiBzcGxpdCBpdCBpbnRvIGNodW5rcyBhbmQgc2VuZCB0byB0aGUgY2xpZW50cyBicmlkZ2VcbiAgICAgICAgICAvLyB0aGUgY2xpZW50IGJyaWRnZSB3aWxsIHRoZW4gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY3VycmVudE1lc3NhZ2UucGF5bG9hZCkpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlICsgJyBOb3RlOiBUaGUgYnJpZGdlIGNhbiBkZWFsIHdpdGggdGhpcyBpcyBpZiB0aGUgcGF5bG9hZCBpcyBhbiBBcnJheS4nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG9iamVjdFNpemUgPSBzaXplT2YoY3VycmVudE1lc3NhZ2UpXG5cbiAgICAgICAgICAgIGlmIChvYmplY3RTaXplID4gdGhpcy5fbWF4TWVzc2FnZVNpemUpIHtcbiAgICAgICAgICAgICAgY29uc3RcbiAgICAgICAgICAgICAgICBjaHVua3NSZXF1aXJlZCA9IE1hdGguY2VpbChvYmplY3RTaXplIC8gdGhpcy5fbWF4TWVzc2FnZVNpemUpLFxuICAgICAgICAgICAgICAgIGFycmF5SXRlbUNvdW50ID0gTWF0aC5jZWlsKGN1cnJlbnRNZXNzYWdlLnBheWxvYWQubGVuZ3RoIC8gY2h1bmtzUmVxdWlyZWQpXG5cbiAgICAgICAgICAgICAgbGV0IGRhdGEgPSBjdXJyZW50TWVzc2FnZS5wYXlsb2FkXG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtzUmVxdWlyZWQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB0YWtlID0gTWF0aC5taW4oZGF0YS5sZW5ndGgsIGFycmF5SXRlbUNvdW50KVxuXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsLnNlbmQoW3tcbiAgICAgICAgICAgICAgICAgIGV2ZW50OiBjdXJyZW50TWVzc2FnZS5ldmVudCxcbiAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgX2NodW5rU3BsaXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudDogY2h1bmtzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgbGFzdENodW5rOiBpID09PSBjaHVua3NSZXF1aXJlZCAtIDFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5zcGxpY2UoMCwgdGFrZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9zZW5kaW5nID0gZmFsc2VcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByZXR1cm4gdGhpcy5fbmV4dFNlbmQoKSB9LCAxNilcbiAgICB9KVxuICB9XG59XG4iLCAiLyoqXG4gKiBCYXNlZCBvbiB0aGUgd29yayBvZiBodHRwczovL2dpdGh1Yi5jb20vamNob29rL3V1aWQtcmFuZG9tXG4gKi9cblxubGV0XG4gIGJ1ZixcbiAgYnVmSWR4ID0gMFxuY29uc3QgaGV4Qnl0ZXMgPSBuZXcgQXJyYXkoMjU2KVxuXG4vLyBQcmUtY2FsY3VsYXRlIHRvU3RyaW5nKDE2KSBmb3Igc3BlZWRcbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgaGV4Qnl0ZXNbIGkgXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSlcbn1cblxuLy8gVXNlIGJlc3QgYXZhaWxhYmxlIFBSTkdcbmNvbnN0IHJhbmRvbUJ5dGVzID0gKCgpID0+IHtcbiAgLy8gTm9kZSAmIEJyb3dzZXIgc3VwcG9ydFxuICBjb25zdCBsaWIgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJ1xuICAgID8gY3J5cHRvXG4gICAgOiAoXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgPyB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0b1xuICAgICAgICAgIDogdm9pZCAwXG4gICAgICApXG5cbiAgaWYgKGxpYiAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKGxpYi5yYW5kb21CeXRlcyAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gbGliLnJhbmRvbUJ5dGVzXG4gICAgfVxuICAgIGlmIChsaWIuZ2V0UmFuZG9tVmFsdWVzICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBuID0+IHtcbiAgICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShuKVxuICAgICAgICBsaWIuZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzKVxuICAgICAgICByZXR1cm4gYnl0ZXNcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbiA9PiB7XG4gICAgY29uc3QgciA9IFtdXG4gICAgZm9yIChsZXQgaSA9IG47IGkgPiAwOyBpLS0pIHtcbiAgICAgIHIucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKVxuICAgIH1cbiAgICByZXR1cm4gclxuICB9XG59KSgpXG5cbi8vIEJ1ZmZlciByYW5kb20gbnVtYmVycyBmb3Igc3BlZWRcbi8vIFJlZHVjZSBtZW1vcnkgdXNhZ2UgYnkgZGVjcmVhc2luZyB0aGlzIG51bWJlciAobWluIDE2KVxuLy8gb3IgaW1wcm92ZSBzcGVlZCBieSBpbmNyZWFzaW5nIHRoaXMgbnVtYmVyICh0cnkgMTYzODQpXG5jb25zdCBCVUZGRVJfU0laRSA9IDQwOTZcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAvLyBCdWZmZXIgc29tZSByYW5kb20gYnl0ZXMgZm9yIHNwZWVkXG4gIGlmIChidWYgPT09IHZvaWQgMCB8fCAoYnVmSWR4ICsgMTYgPiBCVUZGRVJfU0laRSkpIHtcbiAgICBidWZJZHggPSAwXG4gICAgYnVmID0gcmFuZG9tQnl0ZXMoQlVGRkVSX1NJWkUpXG4gIH1cblxuICBjb25zdCBiID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnVmLCBidWZJZHgsIChidWZJZHggKz0gMTYpKVxuICBiWyA2IF0gPSAoYlsgNiBdICYgMHgwZikgfCAweDQwXG4gIGJbIDggXSA9IChiWyA4IF0gJiAweDNmKSB8IDB4ODBcblxuICByZXR1cm4gaGV4Qnl0ZXNbIGJbIDAgXSBdICsgaGV4Qnl0ZXNbIGJbIDEgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMiBdIF0gKyBoZXhCeXRlc1sgYlsgMyBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA0IF0gXSArIGhleEJ5dGVzWyBiWyA1IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDYgXSBdICsgaGV4Qnl0ZXNbIGJbIDcgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgOCBdIF0gKyBoZXhCeXRlc1sgYlsgOSBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyAxMCBdIF0gKyBoZXhCeXRlc1sgYlsgMTEgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMTIgXSBdICsgaGV4Qnl0ZXNbIGJbIDEzIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDE0IF0gXSArIGhleEJ5dGVzWyBiWyAxNSBdIF1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyoqXG4gKiBUSElTIEZJTEUgSVMgR0VORVJBVEVEIEFVVE9NQVRJQ0FMTFkuXG4gKiBETyBOT1QgRURJVC5cbiAqKi9cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gYWRkIGEgZ2VuZXJpYyB3aW5kb3dzIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBwYWdlXG4gKiB3aGljaCBhY3RzIGFzIGEgYnJpZGdlIGJldHdlZW4gdGhlIHdlYiBwYWdlIGFuZCB0aGUgY29udGVudCBzY3JpcHQgYnJpZGdlLlxuICogQHBhcmFtIGJyaWRnZVxuICogQHBhcmFtIHR5cGVcbiAqL1xuZXhwb3J0IGNvbnN0IGxpc3RlbkZvcldpbmRvd0V2ZW50cyA9IChicmlkZ2UsIHR5cGUpID0+IHtcbiAgLy8gTGlzdGVuIGZvciBhbnkgZXZlbnRzIGZyb20gdGhlIHdlYiBwYWdlIGFuZCB0cmFuc21pdCB0byB0aGUgQkVYIGJyaWRnZS5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBwYXlsb2FkID0+IHtcbiAgICAvLyBXZSBvbmx5IGFjY2VwdCBtZXNzYWdlcyBmcm9tIHRoaXMgd2luZG93IHRvIGl0c2VsZiBbaS5lLiBub3QgZnJvbSBhbnkgaWZyYW1lc11cbiAgICBpZiAocGF5bG9hZC5zb3VyY2UgIT09IHdpbmRvdykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHBheWxvYWQuZGF0YS5mcm9tICE9PSB2b2lkIDAgJiYgcGF5bG9hZC5kYXRhLmZyb20gPT09IHR5cGUpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGV2ZW50RGF0YSA9IHBheWxvYWQuZGF0YVswXSxcbiAgICAgICAgYnJpZGdlRXZlbnRzID0gYnJpZGdlLmdldEV2ZW50cygpXG5cbiAgICAgIGZvciAobGV0IGV2ZW50IGluIGJyaWRnZUV2ZW50cykge1xuICAgICAgICBpZiAoZXZlbnQgPT09IGV2ZW50RGF0YS5ldmVudCkge1xuICAgICAgICAgIGJyaWRnZUV2ZW50c1tldmVudF0oZXZlbnREYXRhLnBheWxvYWQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIGZhbHNlKVxufVxuIiwgIi8vIEhvb2tzIGFkZGVkIGhlcmUgaGF2ZSBhIGJyaWRnZSBhbGxvd2luZyBjb21tdW5pY2F0aW9uIGJldHdlZW4gdGhlIFdlYiBQYWdlIGFuZCB0aGUgQkVYIENvbnRlbnQgU2NyaXB0LlxuLy8gTW9yZSBpbmZvOiBodHRwczovL3F1YXNhci5kZXYvcXVhc2FyLWNsaS9kZXZlbG9waW5nLWJyb3dzZXItZXh0ZW5zaW9ucy9kb20taG9va3NcbmltcG9ydCB7IGJleERvbSB9IGZyb20gJ3F1YXNhci93cmFwcGVycydcblxuZXhwb3J0IGRlZmF1bHQgYmV4RG9tKCgvKiBicmlkZ2UgKi8pID0+IHtcbiAgLypcbiAgYnJpZGdlLnNlbmQoJ21lc3NhZ2UudG8ucXVhc2FyJywge1xuICAgIHdvcmtlZDogdHJ1ZVxuICB9KVxuICAqL1xuICBpZiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnd3d3LnlvdXR1YmUuY29tJyB8fCB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09ICd5b3V0dWJlLmNvbScpIHtcbiAgICBhbGVydCgpO1xuICB9XG59KVxuIiwgIi8qIGVzbGludC1kaXNhYmxlICovXG4vKipcbiAqIFRISVMgRklMRSBJUyBHRU5FUkFURUQgQVVUT01BVElDQUxMWS5cbiAqIERPIE5PVCBFRElULlxuICpcbiAqIFlvdSBhcmUgcHJvYmFibHkgbG9va2luZyBpbnRvIGFkZGluZyBob29rcyBpbiB5b3VyIGNvZGUuIFRoaXMgc2hvdWxkIGJlIGRvbmUgYnkgbWVhbnMgb2ZcbiAqIHNyYy1iZXgvanMvZG9tLWhvb2tzLmpzIHdoaWNoIGlzIGluamVjdGVkIGludG8gdGhlIHdlYiBwYWdlIGFuZCBoYXMgYSBjb21tdW5pY2F0aW9uIGJyaWRnZVxuICoqL1xuXG5pbXBvcnQgQnJpZGdlIGZyb20gJy4vYnJpZGdlJ1xuaW1wb3J0IHsgbGlzdGVuRm9yV2luZG93RXZlbnRzIH0gZnJvbSAnLi93aW5kb3ctZXZlbnQtbGlzdGVuZXInXG5pbXBvcnQgcnVuRGV2bGFuZERvbSBmcm9tICcuLi8uLi9zcmMtYmV4L2RvbSdcblxubGV0IGJyaWRnZSA9IG5ldyBCcmlkZ2Uoe1xuICBsaXN0ZW4gKF9mbikgeyB9LFxuICBzZW5kIChkYXRhKSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIC4uLmRhdGEsXG4gICAgICBmcm9tOiAnYmV4LWRvbSdcbiAgICB9XG4gICAgd2luZG93LnBvc3RNZXNzYWdlKHBheWxvYWQsICcqJylcbiAgfVxufSlcblxuLy8gTGlzdGVuIGZvciBldmVudHMgZnJvbSB0aGUgQkVYIGNvbnRlbnQgc2NyaXB0XG5saXN0ZW5Gb3JXaW5kb3dFdmVudHMoYnJpZGdlLCAnYmV4LWNvbnRlbnQtc2NyaXB0JylcblxucnVuRGV2bGFuZERvbShicmlkZ2UpXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBdUJBLFVBQUksSUFBSSxPQUFPLFlBQVksV0FBVyxVQUFVO0FBQ2hELFVBQUksZUFBZSxLQUFLLE9BQU8sRUFBRSxVQUFVLGFBQ3ZDLEVBQUUsUUFDRixTQUFTQSxjQUFhLFFBQVEsVUFBVSxN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VUFDRjtBQUFBLFFBQ0Y7QUFFQSxhQUFLLFdBQVc7QUFDaEIsbUJBQVcsTUFBTTtBQUFFLGlCQUFPLEtBQUssVUFBVTtBQUFBLFFBQUUsR0FBRyxFQUFFO0FBQUEsTUFDbEQsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGOzs7QUV2S08sTUFBTSx3QkFBd0IsQ0FBQ0UsU0FBUSxTQUFTO0FBRXJELFdBQU8saUJBQWlCLFdBQVcsYUFBVztBQUU1QyxVQUFJLFFBQVEsV0FBVyxRQUFRO0FBQzdCO0FBQUEsTUFDRjtBQUVBLFVBQUksUUFBUSxLQUFLLFNBQVMsVUFBVSxRQUFRLEtBQUssU0FBUyxNQUFNO0FBQzlELGNBQ0UsWUFBWSxRQUFRLEtBQUssSUFDekIsZUFBZUEsUUFBTyxVQUFVO0FBRWxDLGlCQUFTLFNBQVMsY0FBYztBQUM5QixjQUFJLFVBQVUsVUFBVSxPQUFPO0FBQzdCLHlCQUFhLE9BQU8sVUFBVSxPQUFPO0FBQUEsVUFDdkM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsR0FBRyxLQUFLO0FBQUEsRUFDVjs7O0FDOUJBLHdCQUF1QjtBQUV2QixNQUFPLGtCQUFRLHdCQUFPLE1BQWtCO0FBTXRDLFFBQUksT0FBTyxTQUFTLGFBQWEscUJBQXFCLE9BQU8sU0FBUyxhQUFhLGVBQWU7QUFDaEcsWUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGLENBQUM7OztBQ0FELE1BQUksU0FBUyxJQUFJLE9BQU87QUFBQSxJQUN0QixPQUFRLEtBQUs7QUFBQSxJQUFFO0FBQUEsSUFDZixLQUFNLE1BQU07QUFDVixZQUFNLFVBQVU7QUFBQSxRQUNkLEdBQUc7QUFBQSxRQUNILE1BQU07QUFBQSxNQUNSO0FBQ0EsYUFBTyxZQUFZLFNBQVMsR0FBRztBQUFBLElBQ2pDO0FBQUEsRUFDRixDQUFDO0FBR0Qsd0JBQXNCLFFBQVEsb0JBQW9CO0FBRWxELGNBQWMsTUFBTTsiLAogICJuYW1lcyI6IFsiUmVmbGVjdEFwcGx5IiwgIlJlZmxlY3RPd25LZXlzIiwgIk51bWJlcklzTmFOIiwgIkV2ZW50RW1pdHRlciIsICJvbmNlIiwgImJyaWRnZSJdCn0K
