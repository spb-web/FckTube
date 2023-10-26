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

  // src-bex/my-content-script.ts
  var import_wrappers = __toESM(require_wrappers());
  var my_content_script_default = (0, import_wrappers.bexContent)(() => {
    if (window.location.hostname === "www.youtube.com" || window.location.hostname === "youtube.com") {
      console.log("!!! FckTube !!!");
      (function() {
        const adblocker = true;
        const removePopup = true;
        const debug = true;
        const domainsToRemove = [
          "*.youtube-nocookie.com/*"
        ];
        const jsonPathsToRemove = [
          "playerResponse.adPlacements",
          "playerResponse.playerAds",
          "adPlacements",
          "playerAds",
          "playerConfig",
          "auxiliaryUi.messageRenderers.enforcementMessageViewModel"
        ];
        const observerConfig = {
          childList: true,
          subtree: true
        };
        let unpausedAfterSkip = 0;
        if (debug)
          console.log("Remove Adblock Thing: Remove Adblock Thing: Script started");
        window.__ytplayer_adblockDetected = false;
        if (adblocker)
          addblocker();
        if (removePopup)
          popupRemover();
        if (removePopup)
          observer.observe(document.body, observerConfig);
        function popupRemover() {
          removeJsonPaths(domainsToRemove, jsonPathsToRemove);
          setInterval(() => {
            const popup = document.querySelector(".style-scope ytd-enforcement-message-view-model");
            const video1 = document.querySelector("#movie_player > video.html5-main-video");
            const video2 = document.querySelector("#movie_player > .html5-video-container > video");
            if (popup) {
              if (debug)
                console.log("Remove Adblock Thing: Popup detected, removing...");
              popup.remove();
              unpausedAfterSkip = 2;
              if (debug)
                console.log("Remove Adblock Thing: Popup removed");
            }
            if (!unpausedAfterSkip > 0)
              return;
            if (video1) {
              if (video1.paused)
                unPauseVideo();
              else if (unpausedAfterSkip > 0)
                unpausedAfterSkip--;
            }
            if (video2) {
              if (video2.paused)
                unPauseVideo();
              else if (unpausedAfterSkip > 0)
                unpausedAfterSkip--;
            }
          }, 1e3);
        }
        function addblocker() {
          setInterval(() => {
            const skipBtn = document.querySelector(".videoAdUiSkipButton,.ytp-ad-skip-button");
            const ad = [...Array.from(document.querySelectorAll(".ad-showing"))][0];
            const sidAd = document.querySelector("ytd-action-companion-ad-renderer");
            if (ad) {
              document.querySelector("video").playbackRate = 10;
              if (skipBtn) {
                skipBtn.click();
              }
              console.log("!!!FckTube!!! skipBtn");
            }
            if (sidAd) {
              sidAd.remove();
              console.log("!!!FckTube!!! sidAd.remove");
            }
          }, 50);
        }
        function unPauseVideo() {
          const keyEvent = new KeyboardEvent("keydown", {
            key: "k",
            code: "KeyK",
            keyCode: 75,
            which: 75,
            bubbles: true,
            cancelable: true,
            view: window
          });
          document.dispatchEvent(keyEvent);
          unpausedAfterSkip = 0;
          if (debug)
            console.log("Remove Adblock Thing: Unpaused video using 'k' key");
        }
        function removeJsonPaths(domains, jsonPaths) {
          const currentDomain = window.location.hostname;
          if (!domains.includes(currentDomain))
            return;
          jsonPaths.forEach((jsonPath) => {
            const pathParts = jsonPath.split(".");
            let obj = window;
            for (const part of pathParts) {
              if (obj.hasOwnProperty(part)) {
                obj = obj[part];
              } else {
                break;
              }
            }
            obj = void 0;
          });
        }
        const observer = new MutationObserver(() => {
          removeJsonPaths(domainsToRemove, jsonPathsToRemove);
        });
      })();
    }
  });

  // .quasar/bex/entry-content-script-my-content-script.js
  var port = chrome.runtime.connect({
    name: "contentScript"
  });
  var disconnected = false;
  port.onDisconnect.addListener(() => {
    disconnected = true;
  });
  var bridge = new Bridge({
    listen(fn) {
      port.onMessage.addListener(fn);
    },
    send(data) {
      if (!disconnected) {
        port.postMessage(data);
        window.postMessage({
          ...data,
          from: "bex-content-script"
        }, "*");
      }
    }
  });
  function injectScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.onload = function() {
      this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
  }
  if (document instanceof HTMLDocument) {
    injectScript(chrome.runtime.getURL("dom.js"));
  }
  listenForWindowEvents(bridge, "bex-dom");
  my_content_script_default(bridge);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2V2ZW50c0AzLjMuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcXVhc2FyQDIuMTMuMC9ub2RlX21vZHVsZXMvcXVhc2FyL3dyYXBwZXJzL2luZGV4LmpzIiwgIi4uLy4uLy5xdWFzYXIvYmV4L2JyaWRnZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcXVhc2FyQDIuMTMuMC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy91aWQuanMiLCAiLi4vLi4vLnF1YXNhci9iZXgvd2luZG93LWV2ZW50LWxpc3RlbmVyLmpzIiwgIi4uLy4uL3NyYy1iZXgvbXktY29udGVudC1zY3JpcHQudHMiLCAiLi4vLi4vLnF1YXNhci9iZXgvZW50cnktY29udGVudC1zY3JpcHQtbXktY29udGVudC1zY3JpcHQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCAiLy8gRnVuY3Rpb25zIGluIHRoaXMgZmlsZSBhcmUgbm8tb3AsXG4vLyAgdGhleSBqdXN0IHRha2UgYSBjYWxsYmFjayBmdW5jdGlvbiBhbmQgcmV0dXJuIGl0XG4vLyBUaGV5J3JlIHVzZWQgdG8gYXBwbHkgdHlwaW5ncyB0byB0aGUgY2FsbGJhY2tcbi8vICBwYXJhbWV0ZXJzIGFuZCByZXR1cm4gdmFsdWUgd2hlbiB1c2luZyBRdWFzYXIgd2l0aCBUeXBlU2NyaXB0XG4vLyBXZSBuZWVkIHRoZXNlIGluIGB1aWAgZm9sZGVyIHRvIG1ha2UgYHF1YXNhci93cmFwcGVyYCBpbXBvcnQgd29yayxcbi8vICBidXQgdGhleSBhcmUgdXNlZnVsIG9ubHkgZm9yIFF1YXNhciBDTEkgcHJvamVjdHNcbi8vIFRoZXkgYXJlIHR5cGVkIHZpYSBtb2R1bGUgYXVnbWVudGF0aW9uIGJ5IGBAcXVhc2FyL2FwcC13ZWJwYWNrYCAvIGBAcXVhc2FyL2FwcC12aXRlYFxuXG5tb2R1bGUuZXhwb3J0cy5ib290ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5zc3JNaWRkbGV3YXJlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5jb25maWd1cmUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbm1vZHVsZS5leHBvcnRzLnByZUZldGNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5yb3V0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuc3RvcmUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbm1vZHVsZS5leHBvcnRzLmJleEJhY2tncm91bmQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbm1vZHVsZS5leHBvcnRzLmJleENvbnRlbnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbm1vZHVsZS5leHBvcnRzLmJleERvbSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxuLyoqXG4gKiBCZWxvdyBvbmx5IGZvciBAcXVhc2FyL2FwcC13ZWJwYWNrIHYzXG4gKi9cblxubW9kdWxlLmV4cG9ydHMuc3NyUHJvZHVjdGlvbkV4cG9ydCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxuLyoqXG4gKiBCZWxvdyBvbmx5IGZvciBAcXVhc2FyL2FwcC12aXRlICYgQHF1YXNhci9hcHAtd2VicGFjayB2NCtcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cy5zc3JDcmVhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbm1vZHVsZS5leHBvcnRzLnNzckxpc3RlbiA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuc3NyQ2xvc2UgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbm1vZHVsZS5leHBvcnRzLnNzclNlcnZlU3RhdGljQ29udGVudCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuc3NyUmVuZGVyUHJlbG9hZFRhZyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyoqXG4gKiBUSElTIEZJTEUgSVMgR0VORVJBVEVEIEFVVE9NQVRJQ0FMTFkuXG4gKiBETyBOT1QgRURJVC5cbiAqKi9cblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJ1xuaW1wb3J0IHVpZCBmcm9tICdxdWFzYXIvc3JjL3V0aWxzL3VpZCdcblxuY29uc3RcbiAgdHlwZVNpemVzID0ge1xuICAgICd1bmRlZmluZWQnOiAoKSA9PiAwLFxuICAgICdib29sZWFuJzogKCkgPT4gNCxcbiAgICAnbnVtYmVyJzogKCkgPT4gOCxcbiAgICAnc3RyaW5nJzogaXRlbSA9PiAyICogaXRlbS5sZW5ndGgsXG4gICAgJ29iamVjdCc6IGl0ZW0gPT4gIWl0ZW0gPyAwIDogT2JqZWN0XG4gICAgICAua2V5cyhpdGVtKVxuICAgICAgLnJlZHVjZSgodG90YWwsIGtleSkgPT4gc2l6ZU9mKGtleSkgKyBzaXplT2YoaXRlbVtrZXldKSArIHRvdGFsLCAwKVxuICB9LFxuICBzaXplT2YgPSB2YWx1ZSA9PiB0eXBlU2l6ZXNbdHlwZW9mIHZhbHVlXSh2YWx1ZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnJpZGdlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IgKHdhbGwpIHtcbiAgICBzdXBlcigpXG5cbiAgICB0aGlzLnNldE1heExpc3RlbmVycyhJbmZpbml0eSlcbiAgICB0aGlzLndhbGwgPSB3YWxsXG5cbiAgICB3YWxsLmxpc3RlbihtZXNzYWdlcyA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShtZXNzYWdlcykpIHtcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHRoaXMuX2VtaXQobWVzc2FnZSkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fZW1pdChtZXNzYWdlcylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5fc2VuZGluZ1F1ZXVlID0gW11cbiAgICB0aGlzLl9zZW5kaW5nID0gZmFsc2VcbiAgICB0aGlzLl9tYXhNZXNzYWdlU2l6ZSA9IDMyICogMTAyNCAqIDEwMjQgLy8gMzJtYlxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgYW4gZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gcGF5bG9hZFxuICAgKiBAcmV0dXJucyBQcm9taXNlPD5cbiAgICovXG4gIHNlbmQgKGV2ZW50LCBwYXlsb2FkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbmQoW3sgZXZlbnQsIHBheWxvYWQgfV0pXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCByZWdpc3RlcmVkIGV2ZW50c1xuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEV2ZW50cyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50c1xuICB9XG5cbiAgb24oZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgIHJldHVybiBzdXBlci5vbihldmVudE5hbWUsIChvcmlnaW5hbFBheWxvYWQpID0+IHtcbiAgICAgIGxpc3RlbmVyKHtcbiAgICAgICAgLi4ub3JpZ2luYWxQYXlsb2FkLFxuICAgICAgICAvLyBDb252ZW5pZW50IGFsdGVybmF0aXZlIHRvIHRoZSBtYW51YWwgdXNhZ2Ugb2YgYGV2ZW50UmVzcG9uc2VLZXlgXG4gICAgICAgIC8vIFdlIGNhbid0IHNlbmQgdGhpcyBpbiBgX25leHRTZW5kYCB3aGljaCB3aWxsIHRoZW4gYmUgc2VudCB1c2luZyBgcG9ydC5wb3N0TWVzc2FnZSgpYCwgd2hpY2ggY2FuJ3Qgc2VyaWFsaXplIGZ1bmN0aW9ucy5cbiAgICAgICAgLy8gU28sIHdlIGhvb2sgaW50byB0aGUgdW5kZXJseWluZyBsaXN0ZW5lciBhbmQgaW5jbHVkZSB0aGUgZnVuY3Rpb24gdGhlcmUsIHdoaWNoIGhhcHBlbnMgYWZ0ZXIgdGhlIHNlbmQgb3BlcmF0aW9uLlxuICAgICAgICByZXNwb25kOiAocGF5bG9hZCAvKiBvcHRpb25hbCAqLykgPT4gdGhpcy5zZW5kKG9yaWdpbmFsUGF5bG9hZC5ldmVudFJlc3BvbnNlS2V5LCBwYXlsb2FkKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgX2VtaXQgKG1lc3NhZ2UpIHtcbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmVtaXQobWVzc2FnZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmVtaXQobWVzc2FnZS5ldmVudCwgbWVzc2FnZS5wYXlsb2FkKVxuICAgIH1cbiAgfVxuXG4gIF9zZW5kIChtZXNzYWdlcykge1xuICAgIHRoaXMuX3NlbmRpbmdRdWV1ZS5wdXNoKG1lc3NhZ2VzKVxuICAgIHJldHVybiB0aGlzLl9uZXh0U2VuZCgpXG4gIH1cblxuICBfbmV4dFNlbmQgKCkge1xuICAgIGlmICghdGhpcy5fc2VuZGluZ1F1ZXVlLmxlbmd0aCB8fCB0aGlzLl9zZW5kaW5nKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICB0aGlzLl9zZW5kaW5nID0gdHJ1ZVxuXG4gICAgY29uc3RcbiAgICAgIG1lc3NhZ2VzID0gdGhpcy5fc2VuZGluZ1F1ZXVlLnNoaWZ0KCksXG4gICAgICBjdXJyZW50TWVzc2FnZSA9IG1lc3NhZ2VzWzBdLFxuICAgICAgZXZlbnRMaXN0ZW5lcktleSA9IGAke2N1cnJlbnRNZXNzYWdlLmV2ZW50fS4ke3VpZCgpfWAsXG4gICAgICBldmVudFJlc3BvbnNlS2V5ID0gZXZlbnRMaXN0ZW5lcktleSArICcucmVzdWx0J1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBhbGxDaHVua3MgPSBbXVxuXG4gICAgICBjb25zdCBmbiA9IChyKSA9PiB7XG4gICAgICAgIC8vIElmIHRoaXMgaXMgYSBzcGxpdCBtZXNzYWdlIHRoZW4ga2VlcCBsaXN0ZW5pbmcgZm9yIHRoZSBjaHVua3MgYW5kIGJ1aWxkIGEgbGlzdCB0byByZXNvbHZlXG4gICAgICAgIGlmIChyICE9PSB2b2lkIDAgJiYgci5fY2h1bmtTcGxpdCkge1xuICAgICAgICAgIGNvbnN0IGNodW5rRGF0YSA9IHIuX2NodW5rU3BsaXRcbiAgICAgICAgICBhbGxDaHVua3MgPSBbLi4uYWxsQ2h1bmtzLCAuLi5yLmRhdGFdXG5cbiAgICAgICAgICAvLyBMYXN0IGNodW5rIHJlY2VpdmVkIHNvIHJlc29sdmUgdGhlIHByb21pc2UuXG4gICAgICAgICAgaWYgKGNodW5rRGF0YS5sYXN0Q2h1bmspIHtcbiAgICAgICAgICAgIHRoaXMub2ZmKGV2ZW50UmVzcG9uc2VLZXksIGZuKVxuICAgICAgICAgICAgcmVzb2x2ZShhbGxDaHVua3MpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMub2ZmKGV2ZW50UmVzcG9uc2VLZXksIGZuKVxuICAgICAgICAgIHJlc29sdmUocilcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLm9uKGV2ZW50UmVzcG9uc2VLZXksIGZuKVxuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBBZGQgYW4gZXZlbnQgcmVzcG9uc2Uga2V5IHRvIHRoZSBwYXlsb2FkIHdlJ3JlIHNlbmRpbmcgc28gdGhlIG1lc3NhZ2Uga25vd3Mgd2hpY2ggY2hhbm5lbCB0byByZXNwb25kIG9uLlxuICAgICAgICBjb25zdCBtZXNzYWdlc1RvU2VuZCA9IG1lc3NhZ2VzLm1hcChtID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ubSxcbiAgICAgICAgICAgIC4uLntcbiAgICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgIGRhdGE6IG0ucGF5bG9hZCxcbiAgICAgICAgICAgICAgICBldmVudFJlc3BvbnNlS2V5XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy53YWxsLnNlbmQobWVzc2FnZXNUb1NlbmQpXG4gICAgICB9XG4gICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdNZXNzYWdlIGxlbmd0aCBleGNlZWRlZCBtYXhpbXVtIGFsbG93ZWQgbGVuZ3RoLidcblxuICAgICAgICBpZiAoZXJyLm1lc3NhZ2UgPT09IGVycm9yTWVzc2FnZSkge1xuICAgICAgICAgIC8vIElmIHRoZSBwYXlsb2FkIGlzIGFuIGFycmF5IGFuZCB0b28gYmlnIHRoZW4gc3BsaXQgaXQgaW50byBjaHVua3MgYW5kIHNlbmQgdG8gdGhlIGNsaWVudHMgYnJpZGdlXG4gICAgICAgICAgLy8gdGhlIGNsaWVudCBicmlkZ2Ugd2lsbCB0aGVuIHJlc29sdmUgdGhlIHByb21pc2UuXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGN1cnJlbnRNZXNzYWdlLnBheWxvYWQpKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZSArICcgTm90ZTogVGhlIGJyaWRnZSBjYW4gZGVhbCB3aXRoIHRoaXMgaXMgaWYgdGhlIHBheWxvYWQgaXMgYW4gQXJyYXkuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBvYmplY3RTaXplID0gc2l6ZU9mKGN1cnJlbnRNZXNzYWdlKVxuXG4gICAgICAgICAgICBpZiAob2JqZWN0U2l6ZSA+IHRoaXMuX21heE1lc3NhZ2VTaXplKSB7XG4gICAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgICAgY2h1bmtzUmVxdWlyZWQgPSBNYXRoLmNlaWwob2JqZWN0U2l6ZSAvIHRoaXMuX21heE1lc3NhZ2VTaXplKSxcbiAgICAgICAgICAgICAgICBhcnJheUl0ZW1Db3VudCA9IE1hdGguY2VpbChjdXJyZW50TWVzc2FnZS5wYXlsb2FkLmxlbmd0aCAvIGNodW5rc1JlcXVpcmVkKVxuXG4gICAgICAgICAgICAgIGxldCBkYXRhID0gY3VycmVudE1lc3NhZ2UucGF5bG9hZFxuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNodW5rc1JlcXVpcmVkOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFrZSA9IE1hdGgubWluKGRhdGEubGVuZ3RoLCBhcnJheUl0ZW1Db3VudClcblxuICAgICAgICAgICAgICAgIHRoaXMud2FsbC5zZW5kKFt7XG4gICAgICAgICAgICAgICAgICBldmVudDogY3VycmVudE1lc3NhZ2UuZXZlbnQsXG4gICAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgIF9jaHVua1NwbGl0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgY291bnQ6IGNodW5rc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgICAgICAgIGxhc3RDaHVuazogaSA9PT0gY2h1bmtzUmVxdWlyZWQgLSAxXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuc3BsaWNlKDAsIHRha2UpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fc2VuZGluZyA9IGZhbHNlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgcmV0dXJuIHRoaXMuX25leHRTZW5kKCkgfSwgMTYpXG4gICAgfSlcbiAgfVxufVxuIiwgIi8qKlxuICogQmFzZWQgb24gdGhlIHdvcmsgb2YgaHR0cHM6Ly9naXRodWIuY29tL2pjaG9vay91dWlkLXJhbmRvbVxuICovXG5cbmxldFxuICBidWYsXG4gIGJ1ZklkeCA9IDBcbmNvbnN0IGhleEJ5dGVzID0gbmV3IEFycmF5KDI1NilcblxuLy8gUHJlLWNhbGN1bGF0ZSB0b1N0cmluZygxNikgZm9yIHNwZWVkXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gIGhleEJ5dGVzWyBpIF0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpXG59XG5cbi8vIFVzZSBiZXN0IGF2YWlsYWJsZSBQUk5HXG5jb25zdCByYW5kb21CeXRlcyA9ICgoKSA9PiB7XG4gIC8vIE5vZGUgJiBCcm93c2VyIHN1cHBvcnRcbiAgY29uc3QgbGliID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IGNyeXB0b1xuICAgIDogKFxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgID8gd2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG9cbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgKVxuXG4gIGlmIChsaWIgIT09IHZvaWQgMCkge1xuICAgIGlmIChsaWIucmFuZG9tQnl0ZXMgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIGxpYi5yYW5kb21CeXRlc1xuICAgIH1cbiAgICBpZiAobGliLmdldFJhbmRvbVZhbHVlcyAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gbiA9PiB7XG4gICAgICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobilcbiAgICAgICAgbGliLmdldFJhbmRvbVZhbHVlcyhieXRlcylcbiAgICAgICAgcmV0dXJuIGJ5dGVzXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG4gPT4ge1xuICAgIGNvbnN0IHIgPSBbXVxuICAgIGZvciAobGV0IGkgPSBuOyBpID4gMDsgaS0tKSB7XG4gICAgICByLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSlcbiAgICB9XG4gICAgcmV0dXJuIHJcbiAgfVxufSkoKVxuXG4vLyBCdWZmZXIgcmFuZG9tIG51bWJlcnMgZm9yIHNwZWVkXG4vLyBSZWR1Y2UgbWVtb3J5IHVzYWdlIGJ5IGRlY3JlYXNpbmcgdGhpcyBudW1iZXIgKG1pbiAxNilcbi8vIG9yIGltcHJvdmUgc3BlZWQgYnkgaW5jcmVhc2luZyB0aGlzIG51bWJlciAodHJ5IDE2Mzg0KVxuY29uc3QgQlVGRkVSX1NJWkUgPSA0MDk2XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgLy8gQnVmZmVyIHNvbWUgcmFuZG9tIGJ5dGVzIGZvciBzcGVlZFxuICBpZiAoYnVmID09PSB2b2lkIDAgfHwgKGJ1ZklkeCArIDE2ID4gQlVGRkVSX1NJWkUpKSB7XG4gICAgYnVmSWR4ID0gMFxuICAgIGJ1ZiA9IHJhbmRvbUJ5dGVzKEJVRkZFUl9TSVpFKVxuICB9XG5cbiAgY29uc3QgYiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGJ1ZiwgYnVmSWR4LCAoYnVmSWR4ICs9IDE2KSlcbiAgYlsgNiBdID0gKGJbIDYgXSAmIDB4MGYpIHwgMHg0MFxuICBiWyA4IF0gPSAoYlsgOCBdICYgMHgzZikgfCAweDgwXG5cbiAgcmV0dXJuIGhleEJ5dGVzWyBiWyAwIF0gXSArIGhleEJ5dGVzWyBiWyAxIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDIgXSBdICsgaGV4Qnl0ZXNbIGJbIDMgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgNCBdIF0gKyBoZXhCeXRlc1sgYlsgNSBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA2IF0gXSArIGhleEJ5dGVzWyBiWyA3IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDggXSBdICsgaGV4Qnl0ZXNbIGJbIDkgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgMTAgXSBdICsgaGV4Qnl0ZXNbIGJbIDExIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDEyIF0gXSArIGhleEJ5dGVzWyBiWyAxMyBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAxNCBdIF0gKyBoZXhCeXRlc1sgYlsgMTUgXSBdXG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qKlxuICogVEhJUyBGSUxFIElTIEdFTkVSQVRFRCBBVVRPTUFUSUNBTExZLlxuICogRE8gTk9UIEVESVQuXG4gKiovXG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCBhIGdlbmVyaWMgd2luZG93cyBldmVudCBsaXN0ZW5lciB0byB0aGUgcGFnZVxuICogd2hpY2ggYWN0cyBhcyBhIGJyaWRnZSBiZXR3ZWVuIHRoZSB3ZWIgcGFnZSBhbmQgdGhlIGNvbnRlbnQgc2NyaXB0IGJyaWRnZS5cbiAqIEBwYXJhbSBicmlkZ2VcbiAqIEBwYXJhbSB0eXBlXG4gKi9cbmV4cG9ydCBjb25zdCBsaXN0ZW5Gb3JXaW5kb3dFdmVudHMgPSAoYnJpZGdlLCB0eXBlKSA9PiB7XG4gIC8vIExpc3RlbiBmb3IgYW55IGV2ZW50cyBmcm9tIHRoZSB3ZWIgcGFnZSBhbmQgdHJhbnNtaXQgdG8gdGhlIEJFWCBicmlkZ2UuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgcGF5bG9hZCA9PiB7XG4gICAgLy8gV2Ugb25seSBhY2NlcHQgbWVzc2FnZXMgZnJvbSB0aGlzIHdpbmRvdyB0byBpdHNlbGYgW2kuZS4gbm90IGZyb20gYW55IGlmcmFtZXNdXG4gICAgaWYgKHBheWxvYWQuc291cmNlICE9PSB3aW5kb3cpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChwYXlsb2FkLmRhdGEuZnJvbSAhPT0gdm9pZCAwICYmIHBheWxvYWQuZGF0YS5mcm9tID09PSB0eXBlKSB7XG4gICAgICBjb25zdFxuICAgICAgICBldmVudERhdGEgPSBwYXlsb2FkLmRhdGFbMF0sXG4gICAgICAgIGJyaWRnZUV2ZW50cyA9IGJyaWRnZS5nZXRFdmVudHMoKVxuXG4gICAgICBmb3IgKGxldCBldmVudCBpbiBicmlkZ2VFdmVudHMpIHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSBldmVudERhdGEuZXZlbnQpIHtcbiAgICAgICAgICBicmlkZ2VFdmVudHNbZXZlbnRdKGV2ZW50RGF0YS5wYXlsb2FkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCBmYWxzZSlcbn1cbiIsICIvLyBIb29rcyBhZGRlZCBoZXJlIGhhdmUgYSBicmlkZ2UgYWxsb3dpbmcgY29tbXVuaWNhdGlvbiBiZXR3ZWVuIHRoZSBCRVggQ29udGVudCBTY3JpcHQgYW5kIHRoZSBRdWFzYXIgQXBwbGljYXRpb24uXG4vLyBNb3JlIGluZm86IGh0dHBzOi8vcXVhc2FyLmRldi9xdWFzYXItY2xpL2RldmVsb3BpbmctYnJvd3Nlci1leHRlbnNpb25zL2NvbnRlbnQtaG9va3NcblxuaW1wb3J0IHsgYmV4Q29udGVudCB9IGZyb20gJ3F1YXNhci93cmFwcGVycydcblxuZXhwb3J0IGRlZmF1bHQgYmV4Q29udGVudCgoLyogYnJpZGdlICovKSA9PiB7XG4gIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09ICd3d3cueW91dHViZS5jb20nIHx8IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ3lvdXR1YmUuY29tJykge1xuICAgIGNvbnNvbGUubG9nKCchISEgRmNrVHViZSAhISEnKTtcblxuICAgIC8vID09VXNlclNjcmlwdD09XG4gICAgLy8gQG5hbWUgICAgICAgICBSZW1vdmUgQWRibG9jayBUaGluZ1xuICAgIC8vIEBuYW1lc3BhY2UgICAgaHR0cDovL3RhbXBlcm1vbmtleS5uZXQvXG4gICAgLy8gQHZlcnNpb24gICAgICAxLjBcbiAgICAvLyBAZGVzY3JpcHRpb24gIFJlbW92ZXMgQWRibG9jayBUaGluZ1xuICAgIC8vIEBhdXRob3IgICAgICAgSm9lbE1hdGljXG4gICAgLy8gQG1hdGNoICAgICAgICBodHRwczovL3d3dy55b3V0dWJlLmNvbS8qXG4gICAgLy8gQGljb24gICAgICAgICBodHRwczovL3d3dy5nb29nbGUuY29tL3MyL2Zhdmljb25zP3N6PTY0JmRvbWFpbj15b3V0dWJlLmNvbVxuICAgIC8vIEBncmFudCAgICAgICAgbm9uZVxuICAgIC8vID09L1VzZXJTY3JpcHQ9PVxuICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBDb25maWdcbiAgICAgICAgLy9cblxuICAgICAgICAvLyBFbmFibGUgVGhlIFVuZGV0ZWN0ZWQgQWRibG9ja2VyXG4gICAgICAgIGNvbnN0IGFkYmxvY2tlciA9IHRydWU7XG5cbiAgICAgICAgLy8gRW5hYmxlIFRoZSBQb3B1cCByZW1vdmVyXG4gICAgICAgIGNvbnN0IHJlbW92ZVBvcHVwID0gdHJ1ZTtcblxuICAgICAgICAvLyBFbmFibGUgZGVidWcgbWVzc2FnZXMgaW50byB0aGUgY29uc29sZVxuICAgICAgICBjb25zdCBkZWJ1ZyA9IHRydWU7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBDT0RFXG4gICAgICAgIC8vXG5cbiAgICAgICAgLy8gU3BlY2lmeSBkb21haW5zIGFuZCBKU09OIHBhdGhzIHRvIHJlbW92ZVxuICAgICAgICBjb25zdCBkb21haW5zVG9SZW1vdmUgPSBbXG4gICAgICAgICAgICAnKi55b3V0dWJlLW5vY29va2llLmNvbS8qJ1xuICAgICAgICBdO1xuICAgICAgICBjb25zdCBqc29uUGF0aHNUb1JlbW92ZSA9IFtcbiAgICAgICAgICAgICdwbGF5ZXJSZXNwb25zZS5hZFBsYWNlbWVudHMnLFxuICAgICAgICAgICAgJ3BsYXllclJlc3BvbnNlLnBsYXllckFkcycsXG4gICAgICAgICAgICAnYWRQbGFjZW1lbnRzJyxcbiAgICAgICAgICAgICdwbGF5ZXJBZHMnLFxuICAgICAgICAgICAgJ3BsYXllckNvbmZpZycsXG4gICAgICAgICAgICAnYXV4aWxpYXJ5VWkubWVzc2FnZVJlbmRlcmVycy5lbmZvcmNlbWVudE1lc3NhZ2VWaWV3TW9kZWwnXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gT2JzZXJ2ZSBjb25maWdcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJDb25maWcgPSB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgLy9UaGlzIGlzIHVzZWQgdG8gY2hlY2sgaWYgdGhlIHZpZGVvIGhhcyBiZWVuIHVucGF1c2VkIGFscmVhZHlcbiAgICAgICAgbGV0IHVucGF1c2VkQWZ0ZXJTa2lwID0gMDtcblxuICAgICAgICBpZiAoZGVidWcpIGNvbnNvbGUubG9nKCdSZW1vdmUgQWRibG9jayBUaGluZzogUmVtb3ZlIEFkYmxvY2sgVGhpbmc6IFNjcmlwdCBzdGFydGVkJyk7XG4gICAgICAgIC8vIE9sZCB2YXJpYWJsZSBidXQgY291bGQgd29yayBpbiBzb21lIGNhc2VzXG4gICAgICAgIHdpbmRvdy5fX3l0cGxheWVyX2FkYmxvY2tEZXRlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmKGFkYmxvY2tlcikgYWRkYmxvY2tlcigpO1xuICAgICAgICBpZihyZW1vdmVQb3B1cCkgcG9wdXBSZW1vdmVyKCk7XG4gICAgICAgIGlmKHJlbW92ZVBvcHVwKSBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIG9ic2VydmVyQ29uZmlnKTtcblxuICAgICAgICAvLyBSZW1vdmUgVGhlbSBwZXNza2kgcG9wdXBzXG4gICAgICAgIGZ1bmN0aW9uIHBvcHVwUmVtb3ZlcigpIHtcbiAgICAgICAgICAgIHJlbW92ZUpzb25QYXRocyhkb21haW5zVG9SZW1vdmUsIGpzb25QYXRoc1RvUmVtb3ZlKTtcbiAgICAgICAgICAgIHNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0eWxlLXNjb3BlIHl0ZC1lbmZvcmNlbWVudC1tZXNzYWdlLXZpZXctbW9kZWwnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb3ZpZV9wbGF5ZXIgPiB2aWRlby5odG1sNS1tYWluLXZpZGVvJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vdmllX3BsYXllciA+IC5odG1sNS12aWRlby1jb250YWluZXIgPiB2aWRlbycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBvcHVwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coJ1JlbW92ZSBBZGJsb2NrIFRoaW5nOiBQb3B1cCBkZXRlY3RlZCwgcmVtb3ZpbmcuLi4nKTtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXAucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHVucGF1c2VkQWZ0ZXJTa2lwID0gMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlYnVnKSBjb25zb2xlLmxvZygnUmVtb3ZlIEFkYmxvY2sgVGhpbmc6IFBvcHVwIHJlbW92ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgdmlkZW8gaXMgcGF1c2VkIGFmdGVyIHJlbW92aW5nIHRoZSBwb3B1cFxuICAgICAgICAgICAgICAgIGlmICghdW5wYXVzZWRBZnRlclNraXAgPiAwKSByZXR1cm47XG5cblxuICAgICAgICAgICAgICAgIGlmICh2aWRlbzEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5QYXVzZSBUaGUgVmlkZW9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZGVvMS5wYXVzZWQpIHVuUGF1c2VWaWRlbygpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1bnBhdXNlZEFmdGVyU2tpcCA+IDApIHVucGF1c2VkQWZ0ZXJTa2lwLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2aWRlbzIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZGVvMi5wYXVzZWQpIHVuUGF1c2VWaWRlbygpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1bnBhdXNlZEFmdGVyU2tpcCA+IDApIHVucGF1c2VkQWZ0ZXJTa2lwLS07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1bmRldGVjdGVkIGFkYmxvY2tlciBtZXRob2RcbiAgICAgICAgZnVuY3Rpb24gYWRkYmxvY2tlcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNldEludGVydmFsKCgpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcudmlkZW9BZFVpU2tpcEJ1dHRvbiwueXRwLWFkLXNraXAtYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWQgPSBbLi4uQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWQtc2hvd2luZycpKV1bMF07XG4gICAgICAgICAgICAgICAgY29uc3Qgc2lkQWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd5dGQtYWN0aW9uLWNvbXBhbmlvbi1hZC1yZW5kZXJlcicpO1xuICAgICAgICAgICAgICAgIGlmIChhZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykucGxheWJhY2tSYXRlID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNraXBCdG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBCdG4uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCchISFGY2tUdWJlISEhIHNraXBCdG4nKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzaWRBZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNpZEFkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnISEhRmNrVHViZSEhISBzaWRBZC5yZW1vdmUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwKVxuICAgICAgICB9XG4gICAgICAgIC8vIFVucGF1c2UgdGhlIHZpZGVvIFdvcmtzIG1vc3Qgb2YgdGhlIHRpbWVcbiAgICAgICAgZnVuY3Rpb24gdW5QYXVzZVZpZGVvKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gU2ltdWxhdGUgcHJlc3NpbmcgdGhlIFwia1wiIGtleSB0byB1bnBhdXNlIHRoZSB2aWRlb1xuICAgICAgICAgICAgY29uc3Qga2V5RXZlbnQgPSBuZXcgS2V5Ym9hcmRFdmVudCgna2V5ZG93bicse1xuICAgICAgICAgICAgICAgIGtleTogJ2snLFxuICAgICAgICAgICAgICAgIGNvZGU6ICdLZXlLJyxcbiAgICAgICAgICAgICAgICBrZXlDb2RlOiA3NSxcbiAgICAgICAgICAgICAgICB3aGljaDogNzUsXG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IHdpbmRvd1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGtleUV2ZW50KTtcbiAgICAgICAgICAgIHVucGF1c2VkQWZ0ZXJTa2lwID0gMDtcbiAgICAgICAgICAgIGlmIChkZWJ1ZykgY29uc29sZS5sb2coXCJSZW1vdmUgQWRibG9jayBUaGluZzogVW5wYXVzZWQgdmlkZW8gdXNpbmcgJ2snIGtleVwiKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiByZW1vdmVKc29uUGF0aHMoZG9tYWlucywganNvblBhdGhzKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RG9tYWluID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgICAgICAgICAgaWYgKCFkb21haW5zLmluY2x1ZGVzKGN1cnJlbnREb21haW4pKSByZXR1cm47XG5cbiAgICAgICAgICAgIGpzb25QYXRocy5mb3JFYWNoKGpzb25QYXRoID0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGhQYXJ0cyA9IGpzb25QYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgbGV0IG9iajogdW5rbm93biA9IHdpbmRvdztcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgcGF0aFBhcnRzKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwYXJ0KSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqID0gb2JqW3BhcnRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT2JzZXJ2ZSBhbmQgcmVtb3ZlIGFkcyB3aGVuIG5ldyBjb250ZW50IGlzIGxvYWRlZCBkeW5hbWljYWxseVxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlbW92ZUpzb25QYXRocyhkb21haW5zVG9SZW1vdmUsIGpzb25QYXRoc1RvUmVtb3ZlKTtcbiAgICAgICAgfSk7XG4gICAgfSkoKTtcblxuICB9XG59KVxuIiwgIi8qIGVzbGludC1kaXNhYmxlICovXG4vKipcbiAqIFRISVMgRklMRSBJUyBHRU5FUkFURUQgQVVUT01BVElDQUxMWS5cbiAqIERPIE5PVCBFRElULlxuICpcbiAqIFlvdSBhcmUgcHJvYmFibHkgbG9va2luZyBpbnRvIGFkZGluZyBob29rcyBpbiB5b3VyIGNvZGUuIFRoaXMgc2hvdWxkIGJlIGRvbmUgYnkgbWVhbnMgb2ZcbiAqIHNyYy1iZXgvanMvY29udGVudC1ob29rcy5qcyB3aGljaCBoYXMgYWNjZXNzIHRvIHRoZSBicm93c2VyIGluc3RhbmNlIGFuZCBjb21tdW5pY2F0aW9uIGJyaWRnZVxuICoqL1xuXG4vKiBnbG9iYWwgY2hyb21lICovXG5cbmltcG9ydCBCcmlkZ2UgZnJvbSAnLi9icmlkZ2UnXG5pbXBvcnQgeyBsaXN0ZW5Gb3JXaW5kb3dFdmVudHMgfSBmcm9tICcuL3dpbmRvdy1ldmVudC1saXN0ZW5lcidcbmltcG9ydCBydW5EZXZsYW5kQ29udGVudFNjcmlwdCBmcm9tICcuLi8uLi9zcmMtYmV4L215LWNvbnRlbnQtc2NyaXB0J1xuXG5jb25zdCBwb3J0ID0gY2hyb21lLnJ1bnRpbWUuY29ubmVjdCh7XG4gIG5hbWU6ICdjb250ZW50U2NyaXB0J1xufSlcblxubGV0IGRpc2Nvbm5lY3RlZCA9IGZhbHNlXG5wb3J0Lm9uRGlzY29ubmVjdC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gIGRpc2Nvbm5lY3RlZCA9IHRydWVcbn0pXG5cbmxldCBicmlkZ2UgPSBuZXcgQnJpZGdlKHtcbiAgbGlzdGVuIChmbikge1xuICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKGZuKVxuICB9LFxuICBzZW5kIChkYXRhKSB7XG4gICAgaWYgKCFkaXNjb25uZWN0ZWQpIHtcbiAgICAgIHBvcnQucG9zdE1lc3NhZ2UoZGF0YSlcbiAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIGZyb206ICdiZXgtY29udGVudC1zY3JpcHQnXG4gICAgICB9LCAnKicpXG4gICAgfVxuICB9XG59KVxuXG4vLyBJbmplY3Qgb3VyIGRvbSBzY3JpcHQgZm9yIGNvbW11bmljYXRpb25zLlxuZnVuY3Rpb24gaW5qZWN0U2NyaXB0ICh1cmwpIHtcbiAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcbiAgc2NyaXB0LnNyYyA9IHVybFxuICBzY3JpcHQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucmVtb3ZlKClcbiAgfVxuICA7KGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5hcHBlbmRDaGlsZChzY3JpcHQpXG59XG5cbmlmIChkb2N1bWVudCBpbnN0YW5jZW9mIEhUTUxEb2N1bWVudCkge1xuICBpbmplY3RTY3JpcHQoY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKCdkb20uanMnKSlcbn1cblxuLy8gTGlzdGVuIGZvciBldmVudCBmcm9tIHRoZSB3ZWIgcGFnZVxubGlzdGVuRm9yV2luZG93RXZlbnRzKGJyaWRnZSwgJ2JleC1kb20nKVxuXG5ydW5EZXZsYW5kQ29udGVudFNjcmlwdChicmlkZ2UpXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBdUJBLFVBQUksSUFBSSxPQUFPLFlBQVksV0FBVyxVQUFVO0FBQ2hELFVBQUksZUFBZSxLQUFLLE9BQU8sRUFBRSxVQUFVLGFBQ3ZDLEVBQUUsUUFDRixTQUFTQSxjQUFhLFFBQVEsVUFBVSxNQUFNO0FBQzlDLGVBQU8sU0FBUyxVQUFVLE1BQU0sS0FBSyxRQUFRLFVBQVUsSUFBSTtBQUFBLE1BQzdEO0FBRUYsVUFBSTtBQUNKLFVBQUksS0FBSyxPQUFPLEVBQUUsWUFBWSxZQUFZO0FBQ3hDLHlCQUFpQixFQUFFO0FBQUEsTUFDckIsV0FBVyxPQUFPLHVCQUF1QjtBQUN2Qyx5QkFBaUIsU0FBU0MsZ0JBQWUsUUFBUTtBQUMvQyxpQkFBTyxPQUFPLG9CQUFvQixNQUFNLEVBQ3JDLE9BQU8sT0FBTyxzQkFBc0IsTUFBTSxDQUFDO0FBQUEsUUFDaEQ7QUFBQSxNQUNGLE9BQU87QUFDTCx5QkFBaUIsU0FBU0EsZ0JBQWUsUUFBUTtBQUMvQyxpQkFBTyxPQUFPLG9CQUFvQixNQUFNO0FBQUEsUUFDMUM7QUFBQSxNQUNGO0FBRUEsZUFBUyxtQkFBbUIsU0FBUztBQUNuQyxZQUFJLFdBQVcsUUFBUTtBQUFNLGtCQUFRLEtBQUssT0FBTztBQUFBLE1BQ25EO0FBRUEsVUFBSSxjQUFjLE9BQU8sU0FBUyxTQUFTQyxhQUFZLE9BQU87QUFDNUQsZUFBTyxVQUFVO0FBQUEsTUFDbkI7QUFFQSxlQUFTQyxnQkFBZTtBQUN0QixRQUFBQSxjQUFhLEtBQUssS0FBSyxJQUFJO0FBQUEsTUFDN0I7QUFDQSxhQUFPLFVBQVVBO0FBQ2pCLGFBQU8sUUFBUSxPQUFPO0FBR3RCLE1BQUFBLGNBQWEsZUFBZUE7QUFFNUIsTUFBQUEsY0FBYSxVQUFVLFVBQVU7QUFDakMsTUFBQUEsY0FBYSxVQUFVLGVBQWU7QUFDdEMsTUFBQUEsY0FBYSxVQUFVLGdCQUFnQjtBQUl2QyxVQUFJLHNCQUFzQjtBQUUxQixlQUFTLGNBQWMsVUFBVTtBQUMvQixZQUFJLE9BQU8sYUFBYSxZQUFZO0FBQ2xDLGdCQUFNLElBQUksVUFBVSxxRUFBcUUsT0FBTyxRQUFRO0FBQUEsUUFDMUc7QUFBQSxNQUNGO0FBRUEsYUFBTyxlQUFlQSxlQUFjLHVCQUF1QjtBQUFBLFFBQ3pELFlBQVk7QUFBQSxRQUNaLEtBQUssV0FBVztBQUNkLGlCQUFPO0FBQUEsUUFDVDtBQUFBLFFBQ0EsS0FBSyxTQUFTLEtBQUs7QUFDakIsY0FBSSxPQUFPLFFBQVEsWUFBWSxNQUFNLEtBQUssWUFBWSxHQUFHLEdBQUc7QUFDMUQsa0JBQU0sSUFBSSxXQUFXLG9HQUFvRyxNQUFNLEdBQUc7QUFBQSxVQUNwSTtBQUNBLGdDQUFzQjtBQUFBLFFBQ3hCO0FBQUEsTUFDRixDQUFDO0FBRUQsTUFBQUEsY0FBYSxPQUFPLFdBQVc7QUFFN0IsWUFBSSxLQUFLLFlBQVksVUFDakIsS0FBSyxZQUFZLE9BQU8sZUFBZSxJQUFJLEVBQUUsU0FBUztBQUN4RCxlQUFLLFVBQVUsdUJBQU8sT0FBTyxJQUFJO0FBQ2pDLGVBQUssZUFBZTtBQUFBLFFBQ3RCO0FBRUEsYUFBSyxnQkFBZ0IsS0FBSyxpQkFBaUI7QUFBQSxNQUM3QztBQUlBLE1BQUFBLGNBQWEsVUFBVSxrQkFBa0IsU0FBUyxnQkFBZ0IsR0FBRztBQUNuRSxZQUFJLE9BQU8sTUFBTSxZQUFZLElBQUksS0FBSyxZQUFZLENBQUMsR0FBRztBQUNwRCxnQkFBTSxJQUFJLFdBQVcsa0ZBQWtGLElBQUksR0FBRztBQUFBLFFBQ2hIO0FBQ0EsYUFBSyxnQkFBZ0I7QUFDckIsZUFBTztBQUFBLE1BQ1Q7QUFFQSxlQUFTLGlCQUFpQixNQUFNO0FBQzlCLFlBQUksS0FBSyxrQkFBa0I7QUFDekIsaUJBQU9BLGNBQWE7QUFDdEIsZUFBTyxLQUFLO0FBQUEsTUFDZDtBQUVBLE1BQUFBLGNBQWEsVUFBVSxrQkFBa0IsU0FBUyxrQkFBa0I7QUFDbEUsZUFBTyxpQkFBaUIsSUFBSTtBQUFBLE1BQzlCO0FBRUEsTUFBQUEsY0FBYSxVQUFVLE9BQU8sU0FBUyxLQUFLLE1BQU07QUFDaEQsWUFBSSxPQUFPLENBQUM7QUFDWixpQkFBUyxJQUFJLEdBQUcsSUFBSSxVQUFVLFFBQVE7QUFBSyxlQUFLLEtBQUssVUFBVSxFQUFFO0FBQ2pFLFlBQUksVUFBVyxTQUFTO0FBRXhCLFlBQUksU0FBUyxLQUFLO0FBQ2xCLFlBQUksV0FBVztBQUNiLG9CQUFXLFdBQVcsT0FBTyxVQUFVO0FBQUEsaUJBQ2hDLENBQUM7QUFDUixpQkFBTztBQUdULFlBQUksU0FBUztBQUNYLGNBQUk7QUFDSixjQUFJLEtBQUssU0FBUztBQUNoQixpQkFBSyxLQUFLO0FBQ1osY0FBSSxjQUFjLE9BQU87QUFHdkIsa0JBQU07QUFBQSxVQUNSO0FBRUEsY0FBSSxNQUFNLElBQUksTUFBTSxzQkFBc0IsS0FBSyxPQUFPLEdBQUcsVUFBVSxNQUFNLEdBQUc7QUFDNUUsY0FBSSxVQUFVO0FBQ2QsZ0JBQU07QUFBQSxRQUNSO0FBRUEsWUFBSSxVQUFVLE9BQU87QUFFckIsWUFBSSxZQUFZO0FBQ2QsaUJBQU87QUFFVCxZQUFJLE9BQU8sWUFBWSxZQUFZO0FBQ2pDLHVCQUFhLFNBQVMsTUFBTSxJQUFJO0FBQUEsUUFDbEMsT0FBTztBQUNMLGNBQUksTUFBTSxRQUFRO0FBQ2xCLGNBQUksWUFBWSxXQUFXLFNBQVMsR0FBRztBQUN2QyxtQkFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7QUFDekIseUJBQWEsVUFBVSxJQUFJLE1BQU0sSUFBSTtBQUFBLFFBQ3pDO0FBRUEsZUFBTztBQUFBLE1BQ1Q7QUFFQSxlQUFTLGFBQWEsUUFBUSxNQUFNLFVBQVUsU0FBUztBQUNyRCxZQUFJO0FBQ0osWUFBSTtBQUNKLFlBQUk7QUFFSixzQkFBYyxRQUFRO0FBRXRCLGlCQUFTLE9BQU87QUFDaEIsWUFBSSxXQUFXLFFBQVc7QUFDeEIsbUJBQVMsT0FBTyxVQUFVLHVCQUFPLE9BQU8sSUFBSTtBQUM1QyxpQkFBTyxlQUFlO0FBQUEsUUFDeEIsT0FBTztBQUdMLGNBQUksT0FBTyxnQkFBZ0IsUUFBVztBQUNwQyxtQkFBTztBQUFBLGNBQUs7QUFBQSxjQUFlO0FBQUEsY0FDZixTQUFTLFdBQVcsU0FBUyxXQUFXO0FBQUEsWUFBUTtBQUk1RCxxQkFBUyxPQUFPO0FBQUEsVUFDbEI7QUFDQSxxQkFBVyxPQUFPO0FBQUEsUUFDcEI7QUFFQSxZQUFJLGFBQWEsUUFBVztBQUUxQixxQkFBVyxPQUFPLFFBQVE7QUFDMUIsWUFBRSxPQUFPO0FBQUEsUUFDWCxPQUFPO0FBQ0wsY0FBSSxPQUFPLGFBQWEsWUFBWTtBQUVsQyx1QkFBVyxPQUFPLFFBQ2hCLFVBQVUsQ0FBQyxVQUFVLFFBQVEsSUFBSSxDQUFDLFVBQVUsUUFBUTtBQUFBLFVBRXhELFdBQVcsU0FBUztBQUNsQixxQkFBUyxRQUFRLFFBQVE7QUFBQSxVQUMzQixPQUFPO0FBQ0wscUJBQVMsS0FBSyxRQUFRO0FBQUEsVUFDeEI7QUFHQSxjQUFJLGlCQUFpQixNQUFNO0FBQzNCLGNBQUksSUFBSSxLQUFLLFNBQVMsU0FBUyxLQUFLLENBQUMsU0FBUyxRQUFRO0FBQ3BELHFCQUFTLFNBQVM7QUFHbEIsZ0JBQUksSUFBSSxJQUFJLE1BQU0saURBQ0UsU0FBUyxTQUFTLE1BQU0sT0FBTyxJQUFJLElBQUksbUVBRXZCO0FBQ3BDLGNBQUUsT0FBTztBQUNULGNBQUUsVUFBVTtBQUNaLGNBQUUsT0FBTztBQUNULGNBQUUsUUFBUSxTQUFTO0FBQ25CLCtCQUFtQixDQUFDO0FBQUEsVUFDdEI7QUFBQSxRQUNGO0FBRUEsZUFBTztBQUFBLE1BQ1Q7QUFFQSxNQUFBQSxjQUFhLFVBQVUsY0FBYyxTQUFTLFlBQVksTUFBTSxVQUFVO0FBQ3hFLGVBQU8sYUFBYSxNQUFNLE1BQU0sVUFBVSxLQUFLO0FBQUEsTUFDakQ7QUFFQSxNQUFBQSxjQUFhLFVBQVUsS0FBS0EsY0FBYSxVQUFVO0FBRW5ELE1BQUFBLGNBQWEsVUFBVSxrQkFDbkIsU0FBUyxnQkFBZ0IsTUFBTSxVQUFVO0FBQ3ZDLGVBQU8sYUFBYSxNQUFNLE1BQU0sVUFBVSxJQUFJO0FBQUEsTUFDaEQ7QUFFSixlQUFTLGNBQWM7QUFDckIsWUFBSSxDQUFDLEtBQUssT0FBTztBQUNmLGVBQUssT0FBTyxlQUFlLEtBQUssTUFBTSxLQUFLLE1BQU07QUFDakQsZUFBSyxRQUFRO0FBQ2IsY0FBSSxVQUFVLFdBQVc7QUFDdkIsbUJBQU8sS0FBSyxTQUFTLEtBQUssS0FBSyxNQUFNO0FBQ3ZDLGlCQUFPLEtBQUssU0FBUyxNQUFNLEtBQUssUUFBUSxTQUFTO0FBQUEsUUFDbkQ7QUFBQSxNQUNGO0FBRUEsZUFBUyxVQUFVLFFBQVEsTUFBTSxVQUFVO0FBQ3pDLFlBQUksUUFBUSxFQUFFLE9BQU8sT0FBTyxRQUFRLFFBQVcsUUFBZ0IsTUFBWSxTQUFtQjtBQUM5RixZQUFJLFVBQVUsWUFBWSxLQUFLLEtBQUs7QUFDcEMsZ0JBQVEsV0FBVztBQUNuQixjQUFNLFNBQVM7QUFDZixlQUFPO0FBQUEsTUFDVDtBQUVBLE1BQUFBLGNBQWEsVUFBVSxPQUFPLFNBQVNDLE1BQUssTUFBTSxVQUFVO0FBQzFELHNCQUFjLFFBQVE7QUFDdEIsYUFBSyxHQUFHLE1BQU0sVUFBVSxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzdDLGVBQU87QUFBQSxNQUNUO0FBRUEsTUFBQUQsY0FBYSxVQUFVLHNCQUNuQixTQUFTLG9CQUFvQixNQUFNLFVBQVU7QUFDM0Msc0JBQWMsUUFBUTtBQUN0QixhQUFLLGdCQUFnQixNQUFNLFVBQVUsTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUMxRCxlQUFPO0FBQUEsTUFDVDtBQUdKLE1BQUFBLGNBQWEsVUFBVSxpQkFDbkIsU0FBUyxlQUFlLE1BQU0sVUFBVTtBQUN0QyxZQUFJLE1BQU0sUUFBUSxVQUFVLEdBQUc7QUFFL0Isc0JBQWMsUUFBUTtBQUV0QixpQkFBUyxLQUFLO0FBQ2QsWUFBSSxXQUFXO0FBQ2IsaUJBQU87QUFFVCxlQUFPLE9BQU87QUFDZCxZQUFJLFNBQVM7QUFDWCxpQkFBTztBQUVULFlBQUksU0FBUyxZQUFZLEtBQUssYUFBYSxVQUFVO0FBQ25ELGNBQUksRUFBRSxLQUFLLGlCQUFpQjtBQUMxQixpQkFBSyxVQUFVLHVCQUFPLE9BQU8sSUFBSTtBQUFBLGVBQzlCO0FBQ0gsbUJBQU8sT0FBTztBQUNkLGdCQUFJLE9BQU87QUFDVCxtQkFBSyxLQUFLLGtCQUFrQixNQUFNLEtBQUssWUFBWSxRQUFRO0FBQUEsVUFDL0Q7QUFBQSxRQUNGLFdBQVcsT0FBTyxTQUFTLFlBQVk7QUFDckMscUJBQVc7QUFFWCxlQUFLLElBQUksS0FBSyxTQUFTLEdBQUcsS0FBSyxHQUFHLEtBQUs7QUFDckMsZ0JBQUksS0FBSyxPQUFPLFlBQVksS0FBSyxHQUFHLGFBQWEsVUFBVTtBQUN6RCxpQ0FBbUIsS0FBSyxHQUFHO0FBQzNCLHlCQUFXO0FBQ1g7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUVBLGNBQUksV0FBVztBQUNiLG1CQUFPO0FBRVQsY0FBSSxhQUFhO0FBQ2YsaUJBQUssTUFBTTtBQUFBLGVBQ1I7QUFDSCxzQkFBVSxNQUFNLFFBQVE7QUFBQSxVQUMxQjtBQUVBLGNBQUksS0FBSyxXQUFXO0FBQ2xCLG1CQUFPLFFBQVEsS0FBSztBQUV0QixjQUFJLE9BQU8sbUJBQW1CO0FBQzVCLGlCQUFLLEtBQUssa0JBQWtCLE1BQU0sb0JBQW9CLFFBQVE7QUFBQSxRQUNsRTtBQUVBLGVBQU87QUFBQSxNQUNUO0FBRUosTUFBQUEsY0FBYSxVQUFVLE1BQU1BLGNBQWEsVUFBVTtBQUVwRCxNQUFBQSxjQUFhLFVBQVUscUJBQ25CLFNBQVMsbUJBQW1CLE1BQU07QUFDaEMsWUFBSSxXQUFXLFFBQVE7QUFFdkIsaUJBQVMsS0FBSztBQUNkLFlBQUksV0FBVztBQUNiLGlCQUFPO0FBR1QsWUFBSSxPQUFPLG1CQUFtQixRQUFXO0FBQ3ZDLGNBQUksVUFBVSxXQUFXLEdBQUc7QUFDMUIsaUJBQUssVUFBVSx1QkFBTyxPQUFPLElBQUk7QUFDakMsaUJBQUssZUFBZTtBQUFBLFVBQ3RCLFdBQVcsT0FBTyxVQUFVLFFBQVc7QUFDckMsZ0JBQUksRUFBRSxLQUFLLGlCQUFpQjtBQUMxQixtQkFBSyxVQUFVLHVCQUFPLE9BQU8sSUFBSTtBQUFBO0FBRWpDLHFCQUFPLE9BQU87QUFBQSxVQUNsQjtBQUNBLGlCQUFPO0FBQUEsUUFDVDtBQUdBLFlBQUksVUFBVSxXQUFXLEdBQUc7QUFDMUIsY0FBSSxPQUFPLE9BQU8sS0FBSyxNQUFNO0FBQzdCLGNBQUk7QUFDSixlQUFLLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxFQUFFLEdBQUc7QUFDaEMsa0JBQU0sS0FBSztBQUNYLGdCQUFJLFFBQVE7QUFBa0I7QUFDOUIsaUJBQUssbUJBQW1CLEdBQUc7QUFBQSxVQUM3QjtBQUNBLGVBQUssbUJBQW1CLGdCQUFnQjtBQUN4QyxlQUFLLFVBQVUsdUJBQU8sT0FBTyxJQUFJO0FBQ2pDLGVBQUssZUFBZTtBQUNwQixpQkFBTztBQUFBLFFBQ1Q7QUFFQSxvQkFBWSxPQUFPO0FBRW5CLFlBQUksT0FBTyxjQUFjLFlBQVk7QUFDbkMsZUFBSyxlQUFlLE1BQU0sU0FBUztBQUFBLFFBQ3JDLFdBQVcsY0FBYyxRQUFXO0FBRWxDLGVBQUssSUFBSSxVQUFVLFNBQVMsR0FBRyxLQUFLLEdBQUcsS0FBSztBQUMxQyxpQkFBSyxlQUFlLE1BQU0sVUFBVSxFQUFFO0FBQUEsVUFDeEM7QUFBQSxRQUNGO0FBRUEsZUFBTztBQUFBLE1BQ1Q7QUFFSixlQUFTLFdBQVcsUUFBUSxNQUFNLFFBQVE7QUFDeEMsWUFBSSxTQUFTLE9BQU87QUFFcEIsWUFBSSxXQUFXO0FBQ2IsaUJBQU8sQ0FBQztBQUVWLFlBQUksYUFBYSxPQUFPO0FBQ3hCLFlBQUksZUFBZTtBQUNqQixpQkFBTyxDQUFDO0FBRVYsWUFBSSxPQUFPLGVBQWU7QUFDeEIsaUJBQU8sU0FBUyxDQUFDLFdBQVcsWUFBWSxVQUFVLElBQUksQ0FBQyxVQUFVO0FBRW5FLGVBQU8sU0FDTCxnQkFBZ0IsVUFBVSxJQUFJLFdBQVcsWUFBWSxXQUFXLE1BQU07QUFBQSxNQUMxRTtBQUVBLE1BQUFBLGNBQWEsVUFBVSxZQUFZLFNBQVMsVUFBVSxNQUFNO0FBQzFELGVBQU8sV0FBVyxNQUFNLE1BQU0sSUFBSTtBQUFBLE1BQ3BDO0FBRUEsTUFBQUEsY0FBYSxVQUFVLGVBQWUsU0FBUyxhQUFhLE1BQU07QUFDaEUsZUFBTyxXQUFXLE1BQU0sTUFBTSxLQUFLO0FBQUEsTUFDckM7QUFFQSxNQUFBQSxjQUFhLGdCQUFnQixTQUFTLFNBQVMsTUFBTTtBQUNuRCxZQUFJLE9BQU8sUUFBUSxrQkFBa0IsWUFBWTtBQUMvQyxpQkFBTyxRQUFRLGNBQWMsSUFBSTtBQUFBLFFBQ25DLE9BQU87QUFDTCxpQkFBTyxjQUFjLEtBQUssU0FBUyxJQUFJO0FBQUEsUUFDekM7QUFBQSxNQUNGO0FBRUEsTUFBQUEsY0FBYSxVQUFVLGdCQUFnQjtBQUN2QyxlQUFTLGNBQWMsTUFBTTtBQUMzQixZQUFJLFNBQVMsS0FBSztBQUVsQixZQUFJLFdBQVcsUUFBVztBQUN4QixjQUFJLGFBQWEsT0FBTztBQUV4QixjQUFJLE9BQU8sZUFBZSxZQUFZO0FBQ3BDLG1CQUFPO0FBQUEsVUFDVCxXQUFXLGVBQWUsUUFBVztBQUNuQyxtQkFBTyxXQUFXO0FBQUEsVUFDcEI7QUFBQSxRQUNGO0FBRUEsZUFBTztBQUFBLE1BQ1Q7QUFFQSxNQUFBQSxjQUFhLFVBQVUsYUFBYSxTQUFTLGFBQWE7QUFDeEQsZUFBTyxLQUFLLGVBQWUsSUFBSSxlQUFlLEtBQUssT0FBTyxJQUFJLENBQUM7QUFBQSxNQUNqRTtBQUVBLGVBQVMsV0FBVyxLQUFLLEdBQUc7QUFDMUIsWUFBSSxPQUFPLElBQUksTUFBTSxDQUFDO0FBQ3RCLGlCQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUN2QixlQUFLLEtBQUssSUFBSTtBQUNoQixlQUFPO0FBQUEsTUFDVDtBQUVBLGVBQVMsVUFBVSxNQUFNLE9BQU87QUFDOUIsZUFBTyxRQUFRLElBQUksS0FBSyxRQUFRO0FBQzlCLGVBQUssU0FBUyxLQUFLLFFBQVE7QUFDN0IsYUFBSyxJQUFJO0FBQUEsTUFDWDtBQUVBLGVBQVMsZ0JBQWdCLEtBQUs7QUFDNUIsWUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU07QUFDOUIsaUJBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxRQUFRLEVBQUUsR0FBRztBQUNuQyxjQUFJLEtBQUssSUFBSSxHQUFHLFlBQVksSUFBSTtBQUFBLFFBQ2xDO0FBQ0EsZUFBTztBQUFBLE1BQ1Q7QUFFQSxlQUFTLEtBQUssU0FBUyxNQUFNO0FBQzNCLGVBQU8sSUFBSSxRQUFRLFNBQVUsU0FBUyxRQUFRO0FBQzVDLG1CQUFTLGNBQWMsS0FBSztBQUMxQixvQkFBUSxlQUFlLE1BQU0sUUFBUTtBQUNyQyxtQkFBTyxHQUFHO0FBQUEsVUFDWjtBQUVBLG1CQUFTLFdBQVc7QUFDbEIsZ0JBQUksT0FBTyxRQUFRLG1CQUFtQixZQUFZO0FBQ2hELHNCQUFRLGVBQWUsU0FBUyxhQUFhO0FBQUEsWUFDL0M7QUFDQSxvQkFBUSxDQUFDLEVBQUUsTUFBTSxLQUFLLFNBQVMsQ0FBQztBQUFBLFVBQ2xDO0FBQUM7QUFFRCx5Q0FBK0IsU0FBUyxNQUFNLFVBQVUsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUN0RSxjQUFJLFNBQVMsU0FBUztBQUNwQiwwQ0FBOEIsU0FBUyxlQUFlLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFBQSxVQUN0RTtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFFQSxlQUFTLDhCQUE4QixTQUFTLFNBQVMsT0FBTztBQUM5RCxZQUFJLE9BQU8sUUFBUSxPQUFPLFlBQVk7QUFDcEMseUNBQStCLFNBQVMsU0FBUyxTQUFTLEtBQUs7QUFBQSxRQUNqRTtBQUFBLE1BQ0Y7QUFFQSxlQUFTLCtCQUErQixTQUFTLE1BQU0sVUFBVSxPQUFPO0FBQ3RFLFlBQUksT0FBTyxRQUFRLE9BQU8sWUFBWTtBQUNwQyxjQUFJLE1BQU0sTUFBTTtBQUNkLG9CQUFRLEtBQUssTUFBTSxRQUFRO0FBQUEsVUFDN0IsT0FBTztBQUNMLG9CQUFRLEdBQUcsTUFBTSxRQUFRO0FBQUEsVUFDM0I7QUFBQSxRQUNGLFdBQVcsT0FBTyxRQUFRLHFCQUFxQixZQUFZO0FBR3pELGtCQUFRLGlCQUFpQixNQUFNLFNBQVMsYUFBYSxLQUFLO0FBR3hELGdCQUFJLE1BQU0sTUFBTTtBQUNkLHNCQUFRLG9CQUFvQixNQUFNLFlBQVk7QUFBQSxZQUNoRDtBQUNBLHFCQUFTLEdBQUc7QUFBQSxVQUNkLENBQUM7QUFBQSxRQUNILE9BQU87QUFDTCxnQkFBTSxJQUFJLFVBQVUsd0VBQXdFLE9BQU8sT0FBTztBQUFBLFFBQzVHO0FBQUEsTUFDRjtBQUFBO0FBQUE7OztBQ2hmQTtBQUFBO0FBUUEsYUFBTyxRQUFRLE9BQU8sU0FBVSxVQUFVO0FBQ3hDLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTyxRQUFRLGdCQUFnQixTQUFVLFVBQVU7QUFDakQsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPLFFBQVEsWUFBWSxTQUFVLFVBQVU7QUFDN0MsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPLFFBQVEsV0FBVyxTQUFVLFVBQVU7QUFDNUMsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPLFFBQVEsUUFBUSxTQUFVLFVBQVU7QUFDekMsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPLFFBQVEsUUFBUSxTQUFVLFVBQVU7QUFDekMsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPLFFBQVEsZ0JBQWdCLFNBQVUsVUFBVTtBQUNqRCxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU8sUUFBUSxhQUFhLFNBQVUsVUFBVTtBQUM5QyxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU8sUUFBUSxTQUFTLFNBQVUsVUFBVTtBQUMxQyxlQUFPO0FBQUEsTUFDVDtBQU1BLGFBQU8sUUFBUSxzQkFBc0IsU0FBVSxVQUFVO0FBQ3ZELGVBQU87QUFBQSxNQUNUO0FBTUEsYUFBTyxRQUFRLFlBQVksU0FBVSxVQUFVO0FBQzdDLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTyxRQUFRLFlBQVksU0FBVSxVQUFVO0FBQzdDLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTyxRQUFRLFdBQVcsU0FBVSxVQUFVO0FBQzVDLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTyxRQUFRLHdCQUF3QixTQUFVLFVBQVU7QUFDekQsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPLFFBQVEsc0JBQXNCLFNBQVUsVUFBVTtBQUN2RCxlQUFPO0FBQUEsTUFDVDtBQUFBO0FBQUE7OztBQ3BFQSxzQkFBNkI7OztBQ0Y3QixNQUNFO0FBREYsTUFFRSxTQUFTO0FBQ1gsTUFBTSxXQUFXLElBQUksTUFBTSxHQUFHO0FBRzlCLFdBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLO0FBQzVCLGFBQVUsTUFBTyxJQUFJLEtBQU8sU0FBUyxFQUFFLEVBQUUsVUFBVSxDQUFDO0FBQUEsRUFDdEQ7QUFHQSxNQUFNLGVBQWUsTUFBTTtBQUV6QixVQUFNLE1BQU0sT0FBTyxXQUFXLGNBQzFCLFNBRUUsT0FBTyxXQUFXLGNBQ2QsT0FBTyxVQUFVLE9BQU8sV0FDeEI7QUFHVixRQUFJLFFBQVEsUUFBUTtBQUNsQixVQUFJLElBQUksZ0JBQWdCLFFBQVE7QUFDOUIsZUFBTyxJQUFJO0FBQUEsTUFDYjtBQUNBLFVBQUksSUFBSSxvQkFBb0IsUUFBUTtBQUNsQyxlQUFPLE9BQUs7QUFDVixnQkFBTSxRQUFRLElBQUksV0FBVyxDQUFDO0FBQzlCLGNBQUksZ0JBQWdCLEtBQUs7QUFDekIsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxXQUFPLE9BQUs7QUFDVixZQUFNLElBQUksQ0FBQztBQUNYLGVBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQzFCLFVBQUUsS0FBSyxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksR0FBRyxDQUFDO0FBQUEsTUFDeEM7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0YsR0FBRztBQUtILE1BQU0sY0FBYztBQUVMLFdBQVIsY0FBb0I7QUFFekIsUUFBSSxRQUFRLFVBQVcsU0FBUyxLQUFLLGFBQWM7QUFDakQsZUFBUztBQUNULFlBQU0sWUFBWSxXQUFXO0FBQUEsSUFDL0I7QUFFQSxVQUFNLElBQUksTUFBTSxVQUFVLE1BQU0sS0FBSyxLQUFLLFFBQVMsVUFBVSxFQUFHO0FBQ2hFLE1BQUcsS0FBTyxFQUFHLEtBQU0sS0FBUTtBQUMzQixNQUFHLEtBQU8sRUFBRyxLQUFNLEtBQVE7QUFFM0IsV0FBTyxTQUFVLEVBQUcsTUFBUSxTQUFVLEVBQUcsTUFDckMsU0FBVSxFQUFHLE1BQVEsU0FBVSxFQUFHLE1BQVEsTUFDMUMsU0FBVSxFQUFHLE1BQVEsU0FBVSxFQUFHLE1BQVEsTUFDMUMsU0FBVSxFQUFHLE1BQVEsU0FBVSxFQUFHLE1BQVEsTUFDMUMsU0FBVSxFQUFHLE1BQVEsU0FBVSxFQUFHLE1BQVEsTUFDMUMsU0FBVSxFQUFHLE9BQVMsU0FBVSxFQUFHLE9BQ25DLFNBQVUsRUFBRyxPQUFTLFNBQVUsRUFBRyxPQUNuQyxTQUFVLEVBQUcsT0FBUyxTQUFVLEVBQUc7QUFBQSxFQUN6Qzs7O0FEOURBLE1BQ0UsWUFBWTtBQUFBLElBQ1YsYUFBYSxNQUFNO0FBQUEsSUFDbkIsV0FBVyxNQUFNO0FBQUEsSUFDakIsVUFBVSxNQUFNO0FBQUEsSUFDaEIsVUFBVSxVQUFRLElBQUksS0FBSztBQUFBLElBQzNCLFVBQVUsVUFBUSxDQUFDLE9BQU8sSUFBSSxPQUMzQixLQUFLLElBQUksRUFDVCxPQUFPLENBQUMsT0FBTyxRQUFRLE9BQU8sR0FBRyxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDO0FBQUEsRUFDdEU7QUFURixNQVVFLFNBQVMsV0FBUyxVQUFVLE9BQU8sT0FBTyxLQUFLO0FBRWpELE1BQXFCLFNBQXJCLGNBQW9DLDJCQUFhO0FBQUEsSUFDL0MsWUFBYSxNQUFNO0FBQ2pCLFlBQU07QUFFTixXQUFLLGdCQUFnQixRQUFRO0FBQzdCLFdBQUssT0FBTztBQUVaLFdBQUssT0FBTyxjQUFZO0FBQ3RCLFlBQUksTUFBTSxRQUFRLFFBQVEsR0FBRztBQUMzQixtQkFBUyxRQUFRLGFBQVcsS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUFBLFFBQ2pELE9BQ0s7QUFDSCxlQUFLLE1BQU0sUUFBUTtBQUFBLFFBQ3JCO0FBQUEsTUFDRixDQUFDO0FBRUQsV0FBSyxnQkFBZ0IsQ0FBQztBQUN0QixXQUFLLFdBQVc7QUFDaEIsV0FBSyxrQkFBa0IsS0FBSyxPQUFPO0FBQUEsSUFDckM7QUFBQSxJQVNBLEtBQU0sT0FBTyxTQUFTO0FBQ3BCLGFBQU8sS0FBSyxNQUFNLENBQUMsRUFBRSxPQUFPLFFBQVEsQ0FBQyxDQUFDO0FBQUEsSUFDeEM7QUFBQSxJQU1BLFlBQWE7QUFDWCxhQUFPLEtBQUs7QUFBQSxJQUNkO0FBQUEsSUFFQSxHQUFHLFdBQVcsVUFBVTtBQUN0QixhQUFPLE1BQU0sR0FBRyxXQUFXLENBQUMsb0JBQW9CO0FBQzlDLGlCQUFTO0FBQUEsVUFDUCxHQUFHO0FBQUEsVUFJSCxTQUFTLENBQUMsWUFBMkIsS0FBSyxLQUFLLGdCQUFnQixrQkFBa0IsT0FBTztBQUFBLFFBQzFGLENBQUM7QUFBQSxNQUNILENBQUM7QUFBQSxJQUNIO0FBQUEsSUFFQSxNQUFPLFNBQVM7QUFDZCxVQUFJLE9BQU8sWUFBWSxVQUFVO0FBQy9CLGFBQUssS0FBSyxPQUFPO0FBQUEsTUFDbkIsT0FDSztBQUNILGFBQUssS0FBSyxRQUFRLE9BQU8sUUFBUSxPQUFPO0FBQUEsTUFDMUM7QUFBQSxJQUNGO0FBQUEsSUFFQSxNQUFPLFVBQVU7QUFDZixXQUFLLGNBQWMsS0FBSyxRQUFRO0FBQ2hDLGFBQU8sS0FBSyxVQUFVO0FBQUEsSUFDeEI7QUFBQSxJQUVBLFlBQWE7QUFDWCxVQUFJLENBQUMsS0FBSyxjQUFjLFVBQVUsS0FBSztBQUFVLGVBQU8sUUFBUSxRQUFRO0FBQ3hFLFdBQUssV0FBVztBQUVoQixZQUNFLFdBQVcsS0FBSyxjQUFjLE1BQU0sR0FDcEMsaUJBQWlCLFNBQVMsSUFDMUIsbUJBQW1CLEdBQUcsZUFBZSxTQUFTLFlBQUksS0FDbEQsbUJBQW1CLG1CQUFtQjtBQUV4QyxhQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztBQUN0QyxZQUFJLFlBQVksQ0FBQztBQUVqQixjQUFNLEtBQUssQ0FBQyxNQUFNO0FBRWhCLGNBQUksTUFBTSxVQUFVLEVBQUUsYUFBYTtBQUNqQyxrQkFBTSxZQUFZLEVBQUU7QUFDcEIsd0JBQVksQ0FBQyxHQUFHLFdBQVcsR0FBRyxFQUFFLElBQUk7QUFHcEMsZ0JBQUksVUFBVSxXQUFXO0FBQ3ZCLG1CQUFLLElBQUksa0JBQWtCLEVBQUU7QUFDN0Isc0JBQVEsU0FBUztBQUFBLFlBQ25CO0FBQUEsVUFDRixPQUNLO0FBQ0gsaUJBQUssSUFBSSxrQkFBa0IsRUFBRTtBQUM3QixvQkFBUSxDQUFDO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFFQSxhQUFLLEdBQUcsa0JBQWtCLEVBQUU7QUFFNUIsWUFBSTtBQUVGLGdCQUFNLGlCQUFpQixTQUFTLElBQUksT0FBSztBQUN2QyxtQkFBTztBQUFBLGNBQ0wsR0FBRztBQUFBLGNBQ0gsR0FBRztBQUFBLGdCQUNELFNBQVM7QUFBQSxrQkFDUCxNQUFNLEVBQUU7QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGLENBQUM7QUFFRCxlQUFLLEtBQUssS0FBSyxjQUFjO0FBQUEsUUFDL0IsU0FDTyxLQUFQO0FBQ0UsZ0JBQU0sZUFBZTtBQUVyQixjQUFJLElBQUksWUFBWSxjQUFjO0FBR2hDLGdCQUFJLENBQUMsTUFBTSxRQUFRLGVBQWUsT0FBTyxHQUFHO0FBQzFDLGtCQUFJLE1BQXVDO0FBQ3pDLHdCQUFRLE1BQU0sZUFBZSxxRUFBcUU7QUFBQSxjQUNwRztBQUFBLFlBQ0YsT0FDSztBQUNILG9CQUFNLGFBQWEsT0FBTyxjQUFjO0FBRXhDLGtCQUFJLGFBQWEsS0FBSyxpQkFBaUI7QUFDckMsc0JBQ0UsaUJBQWlCLEtBQUssS0FBSyxhQUFhLEtBQUssZUFBZSxHQUM1RCxpQkFBaUIsS0FBSyxLQUFLLGVBQWUsUUFBUSxTQUFTLGNBQWM7QUFFM0Usb0JBQUksT0FBTyxlQUFlO0FBQzFCLHlCQUFTLElBQUksR0FBRyxJQUFJLGdCQUFnQixLQUFLO0FBQ3ZDLHNCQUFJLE9BQU8sS0FBSyxJQUFJLEtBQUssUUFBUSxjQUFjO0FBRS9DLHVCQUFLLEtBQUssS0FBSyxDQUFDO0FBQUEsb0JBQ2QsT0FBTyxlQUFlO0FBQUEsb0JBQ3RCLFNBQVM7QUFBQSxzQkFDUCxhQUFhO0FBQUEsd0JBQ1gsT0FBTztBQUFBLHdCQUNQLFdBQVcsTUFBTSxpQkFBaUI7QUFBQSxzQkFDcEM7QUFBQSxzQkFDQSxNQUFNLEtBQUssT0FBTyxHQUFHLElBQUk7QUFBQSxvQkFDM0I7QUFBQSxrQkFDRixDQUFDLENBQUM7QUFBQSxnQkFDSjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFFQSxhQUFLLFdBQVc7QUFDaEIsbUJBQVcsTUFBTTtBQUFFLGlCQUFPLEtBQUssVUFBVTtBQUFBLFFBQUUsR0FBRyxFQUFFO0FBQUEsTUFDbEQsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGOzs7QUV2S08sTUFBTSx3QkFBd0IsQ0FBQ0UsU0FBUSxTQUFTO0FBRXJELFdBQU8saUJBQWlCLFdBQVcsYUFBVztBQUU1QyxVQUFJLFFBQVEsV0FBVyxRQUFRO0FBQzdCO0FBQUEsTUFDRjtBQUVBLFVBQUksUUFBUSxLQUFLLFNBQVMsVUFBVSxRQUFRLEtBQUssU0FBUyxNQUFNO0FBQzlELGNBQ0UsWUFBWSxRQUFRLEtBQUssSUFDekIsZUFBZUEsUUFBTyxVQUFVO0FBRWxDLGlCQUFTLFNBQVMsY0FBYztBQUM5QixjQUFJLFVBQVUsVUFBVSxPQUFPO0FBQzdCLHlCQUFhLE9BQU8sVUFBVSxPQUFPO0FBQUEsVUFDdkM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsR0FBRyxLQUFLO0FBQUEsRUFDVjs7O0FDN0JBLHdCQUEyQjtBQUUzQixNQUFPLGdDQUFRLDRCQUFXLE1BQWtCO0FBQzFDLFFBQUksT0FBTyxTQUFTLGFBQWEscUJBQXFCLE9BQU8sU0FBUyxhQUFhLGVBQWU7QUFDaEcsY0FBUSxJQUFJLGlCQUFpQjtBQVk3QixPQUFDLFdBQVc7QUFNUixjQUFNLFlBQVk7QUFHbEIsY0FBTSxjQUFjO0FBR3BCLGNBQU0sUUFBUTtBQU9kLGNBQU0sa0JBQWtCO0FBQUEsVUFDcEI7QUFBQSxRQUNKO0FBQ0EsY0FBTSxvQkFBb0I7QUFBQSxVQUN0QjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDSjtBQUdBLGNBQU0saUJBQWlCO0FBQUEsVUFDbkIsV0FBVztBQUFBLFVBQ1gsU0FBUztBQUFBLFFBQ2I7QUFHQSxZQUFJLG9CQUFvQjtBQUV4QixZQUFJO0FBQU8sa0JBQVEsSUFBSSw0REFBNEQ7QUFFbkYsZUFBTyw2QkFBNkI7QUFFcEMsWUFBRztBQUFXLHFCQUFXO0FBQ3pCLFlBQUc7QUFBYSx1QkFBYTtBQUM3QixZQUFHO0FBQWEsbUJBQVMsUUFBUSxTQUFTLE1BQU0sY0FBYztBQUc5RCxpQkFBUyxlQUFlO0FBQ3BCLDBCQUFnQixpQkFBaUIsaUJBQWlCO0FBQ2xELHNCQUFZLE1BQU07QUFFZCxrQkFBTSxRQUFRLFNBQVMsY0FBYyxpREFBaUQ7QUFFdEYsa0JBQU0sU0FBUyxTQUFTLGNBQWMsd0NBQXdDO0FBQzlFLGtCQUFNLFNBQVMsU0FBUyxjQUFjLGdEQUFnRDtBQUV0RixnQkFBSSxPQUFPO0FBQ1Asa0JBQUk7QUFBTyx3QkFBUSxJQUFJLG1EQUFtRDtBQUMxRSxvQkFBTSxPQUFPO0FBQ2Isa0NBQW9CO0FBQ3BCLGtCQUFJO0FBQU8sd0JBQVEsSUFBSSxxQ0FBcUM7QUFBQSxZQUNoRTtBQUdBLGdCQUFJLENBQUMsb0JBQW9CO0FBQUc7QUFHNUIsZ0JBQUksUUFBUTtBQUVSLGtCQUFJLE9BQU87QUFBUSw2QkFBYTtBQUFBLHVCQUN2QixvQkFBb0I7QUFBRztBQUFBLFlBQ3BDO0FBQ0EsZ0JBQUksUUFBUTtBQUNSLGtCQUFJLE9BQU87QUFBUSw2QkFBYTtBQUFBLHVCQUN2QixvQkFBb0I7QUFBRztBQUFBLFlBQ3BDO0FBQUEsVUFFSixHQUFHLEdBQUk7QUFBQSxRQUNYO0FBRUEsaUJBQVMsYUFDVDtBQUNJLHNCQUFZLE1BQ1o7QUFDSSxrQkFBTSxVQUFVLFNBQVMsY0FBMkIsMENBQTBDO0FBQzlGLGtCQUFNLEtBQUssQ0FBQyxHQUFHLE1BQU0sS0FBSyxTQUFTLGlCQUFpQixhQUFhLENBQUMsQ0FBQyxFQUFFO0FBQ3JFLGtCQUFNLFFBQVEsU0FBUyxjQUFjLGtDQUFrQztBQUN2RSxnQkFBSSxJQUNKO0FBQ0ksdUJBQVMsY0FBYyxPQUFPLEVBQUUsZUFBZTtBQUMvQyxrQkFBRyxTQUFTO0FBQ1Isd0JBQVEsTUFBTTtBQUFBLGNBQ2xCO0FBRUEsc0JBQVEsSUFBSSx1QkFBdUI7QUFBQSxZQUN2QztBQUVBLGdCQUFJLE9BQ0o7QUFDSSxvQkFBTSxPQUFPO0FBQ2Isc0JBQVEsSUFBSSw0QkFBNEI7QUFBQSxZQUM1QztBQUFBLFVBQ0osR0FBRyxFQUFFO0FBQUEsUUFDVDtBQUVBLGlCQUFTLGVBQ1Q7QUFFSSxnQkFBTSxXQUFXLElBQUksY0FBYyxXQUFVO0FBQUEsWUFDekMsS0FBSztBQUFBLFlBQ0wsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFlBQ1QsT0FBTztBQUFBLFlBQ1AsU0FBUztBQUFBLFlBQ1QsWUFBWTtBQUFBLFlBQ1osTUFBTTtBQUFBLFVBQ1YsQ0FBQztBQUNELG1CQUFTLGNBQWMsUUFBUTtBQUMvQiw4QkFBb0I7QUFDcEIsY0FBSTtBQUFPLG9CQUFRLElBQUksb0RBQW9EO0FBQUEsUUFDL0U7QUFDQSxpQkFBUyxnQkFBZ0IsU0FBUyxXQUNsQztBQUNJLGdCQUFNLGdCQUFnQixPQUFPLFNBQVM7QUFDdEMsY0FBSSxDQUFDLFFBQVEsU0FBUyxhQUFhO0FBQUc7QUFFdEMsb0JBQVUsUUFBUSxjQUFXO0FBQ3pCLGtCQUFNLFlBQVksU0FBUyxNQUFNLEdBQUc7QUFDcEMsZ0JBQUksTUFBZTtBQUNuQix1QkFBVyxRQUFRLFdBQ25CO0FBQ0ksa0JBQUksSUFBSSxlQUFlLElBQUksR0FDM0I7QUFDSSxzQkFBTSxJQUFJO0FBQUEsY0FDZCxPQUVBO0FBQ0k7QUFBQSxjQUNKO0FBQUEsWUFDSjtBQUNBLGtCQUFNO0FBQUEsVUFDVixDQUFDO0FBQUEsUUFDTDtBQUVBLGNBQU0sV0FBVyxJQUFJLGlCQUFpQixNQUN0QztBQUNJLDBCQUFnQixpQkFBaUIsaUJBQWlCO0FBQUEsUUFDdEQsQ0FBQztBQUFBLE1BQ0wsR0FBRztBQUFBLElBRUw7QUFBQSxFQUNGLENBQUM7OztBQzdKRCxNQUFNLE9BQU8sT0FBTyxRQUFRLFFBQVE7QUFBQSxJQUNsQyxNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsTUFBSSxlQUFlO0FBQ25CLE9BQUssYUFBYSxZQUFZLE1BQU07QUFDbEMsbUJBQWU7QUFBQSxFQUNqQixDQUFDO0FBRUQsTUFBSSxTQUFTLElBQUksT0FBTztBQUFBLElBQ3RCLE9BQVEsSUFBSTtBQUNWLFdBQUssVUFBVSxZQUFZLEVBQUU7QUFBQSxJQUMvQjtBQUFBLElBQ0EsS0FBTSxNQUFNO0FBQ1YsVUFBSSxDQUFDLGNBQWM7QUFDakIsYUFBSyxZQUFZLElBQUk7QUFDckIsZUFBTyxZQUFZO0FBQUEsVUFDakIsR0FBRztBQUFBLFVBQ0gsTUFBTTtBQUFBLFFBQ1IsR0FBRyxHQUFHO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFHRCxXQUFTLGFBQWMsS0FBSztBQUMxQixVQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFDOUMsV0FBTyxNQUFNO0FBQ2IsV0FBTyxTQUFTLFdBQVk7QUFDMUIsV0FBSyxPQUFPO0FBQUEsSUFDZDtBQUNDLEtBQUMsU0FBUyxRQUFRLFNBQVMsaUJBQWlCLFlBQVksTUFBTTtBQUFBLEVBQ2pFO0FBRUEsTUFBSSxvQkFBb0IsY0FBYztBQUNwQyxpQkFBYSxPQUFPLFFBQVEsT0FBTyxRQUFRLENBQUM7QUFBQSxFQUM5QztBQUdBLHdCQUFzQixRQUFRLFNBQVM7QUFFdkMsNEJBQXdCLE1BQU07IiwKICAibmFtZXMiOiBbIlJlZmxlY3RBcHBseSIsICJSZWZsZWN0T3duS2V5cyIsICJOdW1iZXJJc05hTiIsICJFdmVudEVtaXR0ZXIiLCAib25jZSIsICJicmlkZ2UiXQp9Cg==
