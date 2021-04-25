(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (cb, mod) => () => (mod || cb((mod = {exports: {}}).exports, mod), mod.exports);
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // node_modules/peerjs/dist/peerjs.min.js
  var require_peerjs_min = __commonJS((exports, module) => {
    parcelRequire = function(e, r, t, n) {
      var i, o = typeof parcelRequire == "function" && parcelRequire, u = typeof require == "function" && require;
      function f(t2, n2) {
        if (!r[t2]) {
          if (!e[t2]) {
            var i2 = typeof parcelRequire == "function" && parcelRequire;
            if (!n2 && i2)
              return i2(t2, true);
            if (o)
              return o(t2, true);
            if (u && typeof t2 == "string")
              return u(t2);
            var c2 = new Error("Cannot find module '" + t2 + "'");
            throw c2.code = "MODULE_NOT_FOUND", c2;
          }
          p2.resolve = function(r2) {
            return e[t2][1][r2] || r2;
          }, p2.cache = {};
          var l2 = r[t2] = new f.Module(t2);
          e[t2][0].call(l2.exports, p2, l2, l2.exports, this);
        }
        return r[t2].exports;
        function p2(e2) {
          return f(p2.resolve(e2));
        }
      }
      f.isParcelRequire = true, f.Module = function(e2) {
        this.id = e2, this.bundle = f, this.exports = {};
      }, f.modules = e, f.cache = r, f.parent = o, f.register = function(r2, t2) {
        e[r2] = [function(e2, r3) {
          r3.exports = t2;
        }, {}];
      };
      for (var c = 0; c < t.length; c++)
        try {
          f(t[c]);
        } catch (e2) {
          i || (i = e2);
        }
      if (t.length) {
        var l = f(t[t.length - 1]);
        typeof exports == "object" && typeof module != "undefined" ? module.exports = l : typeof define == "function" && define.amd ? define(function() {
          return l;
        }) : n && (this[n] = l);
      }
      if (parcelRequire = f, i)
        throw i;
      return f;
    }({EgBh: [function(require2, module2, exports2) {
      var e = {};
      e.useBlobBuilder = function() {
        try {
          return new Blob([]), false;
        } catch (e2) {
          return true;
        }
      }(), e.useArrayBufferView = !e.useBlobBuilder && function() {
        try {
          return new Blob([new Uint8Array([])]).size === 0;
        } catch (e2) {
          return true;
        }
      }(), module2.exports.binaryFeatures = e;
      var r = module2.exports.BlobBuilder;
      function t() {
        this._pieces = [], this._parts = [];
      }
      typeof window != "undefined" && (r = module2.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder), t.prototype.append = function(e2) {
        typeof e2 == "number" ? this._pieces.push(e2) : (this.flush(), this._parts.push(e2));
      }, t.prototype.flush = function() {
        if (this._pieces.length > 0) {
          var r2 = new Uint8Array(this._pieces);
          e.useArrayBufferView || (r2 = r2.buffer), this._parts.push(r2), this._pieces = [];
        }
      }, t.prototype.getBuffer = function() {
        if (this.flush(), e.useBlobBuilder) {
          for (var t2 = new r(), i = 0, u = this._parts.length; i < u; i++)
            t2.append(this._parts[i]);
          return t2.getBlob();
        }
        return new Blob(this._parts);
      }, module2.exports.BufferBuilder = t;
    }, {}], kdPp: [function(require2, module2, exports2) {
      var t = require2("./bufferbuilder").BufferBuilder, e = require2("./bufferbuilder").binaryFeatures, i = {unpack: function(t2) {
        return new r(t2).unpack();
      }, pack: function(t2) {
        var e2 = new n();
        return e2.pack(t2), e2.getBuffer();
      }};
      function r(t2) {
        this.index = 0, this.dataBuffer = t2, this.dataView = new Uint8Array(this.dataBuffer), this.length = this.dataBuffer.byteLength;
      }
      function n() {
        this.bufferBuilder = new t();
      }
      function u(t2) {
        var e2 = t2.charCodeAt(0);
        return e2 <= 2047 ? "00" : e2 <= 65535 ? "000" : e2 <= 2097151 ? "0000" : e2 <= 67108863 ? "00000" : "000000";
      }
      function a(t2) {
        return t2.length > 600 ? new Blob([t2]).size : t2.replace(/[^\u0000-\u007F]/g, u).length;
      }
      module2.exports = i, r.prototype.unpack = function() {
        var t2, e2 = this.unpack_uint8();
        if (e2 < 128)
          return e2;
        if ((224 ^ e2) < 32)
          return (224 ^ e2) - 32;
        if ((t2 = 160 ^ e2) <= 15)
          return this.unpack_raw(t2);
        if ((t2 = 176 ^ e2) <= 15)
          return this.unpack_string(t2);
        if ((t2 = 144 ^ e2) <= 15)
          return this.unpack_array(t2);
        if ((t2 = 128 ^ e2) <= 15)
          return this.unpack_map(t2);
        switch (e2) {
          case 192:
            return null;
          case 193:
            return;
          case 194:
            return false;
          case 195:
            return true;
          case 202:
            return this.unpack_float();
          case 203:
            return this.unpack_double();
          case 204:
            return this.unpack_uint8();
          case 205:
            return this.unpack_uint16();
          case 206:
            return this.unpack_uint32();
          case 207:
            return this.unpack_uint64();
          case 208:
            return this.unpack_int8();
          case 209:
            return this.unpack_int16();
          case 210:
            return this.unpack_int32();
          case 211:
            return this.unpack_int64();
          case 212:
          case 213:
          case 214:
          case 215:
            return;
          case 216:
            return t2 = this.unpack_uint16(), this.unpack_string(t2);
          case 217:
            return t2 = this.unpack_uint32(), this.unpack_string(t2);
          case 218:
            return t2 = this.unpack_uint16(), this.unpack_raw(t2);
          case 219:
            return t2 = this.unpack_uint32(), this.unpack_raw(t2);
          case 220:
            return t2 = this.unpack_uint16(), this.unpack_array(t2);
          case 221:
            return t2 = this.unpack_uint32(), this.unpack_array(t2);
          case 222:
            return t2 = this.unpack_uint16(), this.unpack_map(t2);
          case 223:
            return t2 = this.unpack_uint32(), this.unpack_map(t2);
        }
      }, r.prototype.unpack_uint8 = function() {
        var t2 = 255 & this.dataView[this.index];
        return this.index++, t2;
      }, r.prototype.unpack_uint16 = function() {
        var t2 = this.read(2), e2 = 256 * (255 & t2[0]) + (255 & t2[1]);
        return this.index += 2, e2;
      }, r.prototype.unpack_uint32 = function() {
        var t2 = this.read(4), e2 = 256 * (256 * (256 * t2[0] + t2[1]) + t2[2]) + t2[3];
        return this.index += 4, e2;
      }, r.prototype.unpack_uint64 = function() {
        var t2 = this.read(8), e2 = 256 * (256 * (256 * (256 * (256 * (256 * (256 * t2[0] + t2[1]) + t2[2]) + t2[3]) + t2[4]) + t2[5]) + t2[6]) + t2[7];
        return this.index += 8, e2;
      }, r.prototype.unpack_int8 = function() {
        var t2 = this.unpack_uint8();
        return t2 < 128 ? t2 : t2 - 256;
      }, r.prototype.unpack_int16 = function() {
        var t2 = this.unpack_uint16();
        return t2 < 32768 ? t2 : t2 - 65536;
      }, r.prototype.unpack_int32 = function() {
        var t2 = this.unpack_uint32();
        return t2 < Math.pow(2, 31) ? t2 : t2 - Math.pow(2, 32);
      }, r.prototype.unpack_int64 = function() {
        var t2 = this.unpack_uint64();
        return t2 < Math.pow(2, 63) ? t2 : t2 - Math.pow(2, 64);
      }, r.prototype.unpack_raw = function(t2) {
        if (this.length < this.index + t2)
          throw new Error("BinaryPackFailure: index is out of range " + this.index + " " + t2 + " " + this.length);
        var e2 = this.dataBuffer.slice(this.index, this.index + t2);
        return this.index += t2, e2;
      }, r.prototype.unpack_string = function(t2) {
        for (var e2, i2, r2 = this.read(t2), n2 = 0, u2 = ""; n2 < t2; )
          (e2 = r2[n2]) < 128 ? (u2 += String.fromCharCode(e2), n2++) : (192 ^ e2) < 32 ? (i2 = (192 ^ e2) << 6 | 63 & r2[n2 + 1], u2 += String.fromCharCode(i2), n2 += 2) : (i2 = (15 & e2) << 12 | (63 & r2[n2 + 1]) << 6 | 63 & r2[n2 + 2], u2 += String.fromCharCode(i2), n2 += 3);
        return this.index += t2, u2;
      }, r.prototype.unpack_array = function(t2) {
        for (var e2 = new Array(t2), i2 = 0; i2 < t2; i2++)
          e2[i2] = this.unpack();
        return e2;
      }, r.prototype.unpack_map = function(t2) {
        for (var e2 = {}, i2 = 0; i2 < t2; i2++) {
          var r2 = this.unpack(), n2 = this.unpack();
          e2[r2] = n2;
        }
        return e2;
      }, r.prototype.unpack_float = function() {
        var t2 = this.unpack_uint32(), e2 = (t2 >> 23 & 255) - 127;
        return (t2 >> 31 === 0 ? 1 : -1) * (8388607 & t2 | 8388608) * Math.pow(2, e2 - 23);
      }, r.prototype.unpack_double = function() {
        var t2 = this.unpack_uint32(), e2 = this.unpack_uint32(), i2 = (t2 >> 20 & 2047) - 1023;
        return (t2 >> 31 === 0 ? 1 : -1) * ((1048575 & t2 | 1048576) * Math.pow(2, i2 - 20) + e2 * Math.pow(2, i2 - 52));
      }, r.prototype.read = function(t2) {
        var e2 = this.index;
        if (e2 + t2 <= this.length)
          return this.dataView.subarray(e2, e2 + t2);
        throw new Error("BinaryPackFailure: read index out of range");
      }, n.prototype.getBuffer = function() {
        return this.bufferBuilder.getBuffer();
      }, n.prototype.pack = function(t2) {
        var i2 = typeof t2;
        if (i2 === "string")
          this.pack_string(t2);
        else if (i2 === "number")
          Math.floor(t2) === t2 ? this.pack_integer(t2) : this.pack_double(t2);
        else if (i2 === "boolean")
          t2 === true ? this.bufferBuilder.append(195) : t2 === false && this.bufferBuilder.append(194);
        else if (i2 === "undefined")
          this.bufferBuilder.append(192);
        else {
          if (i2 !== "object")
            throw new Error('Type "' + i2 + '" not yet supported');
          if (t2 === null)
            this.bufferBuilder.append(192);
          else {
            var r2 = t2.constructor;
            if (r2 == Array)
              this.pack_array(t2);
            else if (r2 == Blob || r2 == File || t2 instanceof Blob || t2 instanceof File)
              this.pack_bin(t2);
            else if (r2 == ArrayBuffer)
              e.useArrayBufferView ? this.pack_bin(new Uint8Array(t2)) : this.pack_bin(t2);
            else if ("BYTES_PER_ELEMENT" in t2)
              e.useArrayBufferView ? this.pack_bin(new Uint8Array(t2.buffer)) : this.pack_bin(t2.buffer);
            else if (r2 == Object || r2.toString().startsWith("class"))
              this.pack_object(t2);
            else if (r2 == Date)
              this.pack_string(t2.toString());
            else {
              if (typeof t2.toBinaryPack != "function")
                throw new Error('Type "' + r2.toString() + '" not yet supported');
              this.bufferBuilder.append(t2.toBinaryPack());
            }
          }
        }
        this.bufferBuilder.flush();
      }, n.prototype.pack_bin = function(t2) {
        var e2 = t2.length || t2.byteLength || t2.size;
        if (e2 <= 15)
          this.pack_uint8(160 + e2);
        else if (e2 <= 65535)
          this.bufferBuilder.append(218), this.pack_uint16(e2);
        else {
          if (!(e2 <= 4294967295))
            throw new Error("Invalid length");
          this.bufferBuilder.append(219), this.pack_uint32(e2);
        }
        this.bufferBuilder.append(t2);
      }, n.prototype.pack_string = function(t2) {
        var e2 = a(t2);
        if (e2 <= 15)
          this.pack_uint8(176 + e2);
        else if (e2 <= 65535)
          this.bufferBuilder.append(216), this.pack_uint16(e2);
        else {
          if (!(e2 <= 4294967295))
            throw new Error("Invalid length");
          this.bufferBuilder.append(217), this.pack_uint32(e2);
        }
        this.bufferBuilder.append(t2);
      }, n.prototype.pack_array = function(t2) {
        var e2 = t2.length;
        if (e2 <= 15)
          this.pack_uint8(144 + e2);
        else if (e2 <= 65535)
          this.bufferBuilder.append(220), this.pack_uint16(e2);
        else {
          if (!(e2 <= 4294967295))
            throw new Error("Invalid length");
          this.bufferBuilder.append(221), this.pack_uint32(e2);
        }
        for (var i2 = 0; i2 < e2; i2++)
          this.pack(t2[i2]);
      }, n.prototype.pack_integer = function(t2) {
        if (t2 >= -32 && t2 <= 127)
          this.bufferBuilder.append(255 & t2);
        else if (t2 >= 0 && t2 <= 255)
          this.bufferBuilder.append(204), this.pack_uint8(t2);
        else if (t2 >= -128 && t2 <= 127)
          this.bufferBuilder.append(208), this.pack_int8(t2);
        else if (t2 >= 0 && t2 <= 65535)
          this.bufferBuilder.append(205), this.pack_uint16(t2);
        else if (t2 >= -32768 && t2 <= 32767)
          this.bufferBuilder.append(209), this.pack_int16(t2);
        else if (t2 >= 0 && t2 <= 4294967295)
          this.bufferBuilder.append(206), this.pack_uint32(t2);
        else if (t2 >= -2147483648 && t2 <= 2147483647)
          this.bufferBuilder.append(210), this.pack_int32(t2);
        else if (t2 >= -9223372036854776e3 && t2 <= 9223372036854776e3)
          this.bufferBuilder.append(211), this.pack_int64(t2);
        else {
          if (!(t2 >= 0 && t2 <= 18446744073709552e3))
            throw new Error("Invalid integer");
          this.bufferBuilder.append(207), this.pack_uint64(t2);
        }
      }, n.prototype.pack_double = function(t2) {
        var e2 = 0;
        t2 < 0 && (e2 = 1, t2 = -t2);
        var i2 = Math.floor(Math.log(t2) / Math.LN2), r2 = t2 / Math.pow(2, i2) - 1, n2 = Math.floor(r2 * Math.pow(2, 52)), u2 = Math.pow(2, 32), a2 = e2 << 31 | i2 + 1023 << 20 | n2 / u2 & 1048575, p2 = n2 % u2;
        this.bufferBuilder.append(203), this.pack_int32(a2), this.pack_int32(p2);
      }, n.prototype.pack_object = function(t2) {
        var e2 = Object.keys(t2).length;
        if (e2 <= 15)
          this.pack_uint8(128 + e2);
        else if (e2 <= 65535)
          this.bufferBuilder.append(222), this.pack_uint16(e2);
        else {
          if (!(e2 <= 4294967295))
            throw new Error("Invalid length");
          this.bufferBuilder.append(223), this.pack_uint32(e2);
        }
        for (var i2 in t2)
          t2.hasOwnProperty(i2) && (this.pack(i2), this.pack(t2[i2]));
      }, n.prototype.pack_uint8 = function(t2) {
        this.bufferBuilder.append(t2);
      }, n.prototype.pack_uint16 = function(t2) {
        this.bufferBuilder.append(t2 >> 8), this.bufferBuilder.append(255 & t2);
      }, n.prototype.pack_uint32 = function(t2) {
        var e2 = 4294967295 & t2;
        this.bufferBuilder.append((4278190080 & e2) >>> 24), this.bufferBuilder.append((16711680 & e2) >>> 16), this.bufferBuilder.append((65280 & e2) >>> 8), this.bufferBuilder.append(255 & e2);
      }, n.prototype.pack_uint64 = function(t2) {
        var e2 = t2 / Math.pow(2, 32), i2 = t2 % Math.pow(2, 32);
        this.bufferBuilder.append((4278190080 & e2) >>> 24), this.bufferBuilder.append((16711680 & e2) >>> 16), this.bufferBuilder.append((65280 & e2) >>> 8), this.bufferBuilder.append(255 & e2), this.bufferBuilder.append((4278190080 & i2) >>> 24), this.bufferBuilder.append((16711680 & i2) >>> 16), this.bufferBuilder.append((65280 & i2) >>> 8), this.bufferBuilder.append(255 & i2);
      }, n.prototype.pack_int8 = function(t2) {
        this.bufferBuilder.append(255 & t2);
      }, n.prototype.pack_int16 = function(t2) {
        this.bufferBuilder.append((65280 & t2) >> 8), this.bufferBuilder.append(255 & t2);
      }, n.prototype.pack_int32 = function(t2) {
        this.bufferBuilder.append(t2 >>> 24 & 255), this.bufferBuilder.append((16711680 & t2) >>> 16), this.bufferBuilder.append((65280 & t2) >>> 8), this.bufferBuilder.append(255 & t2);
      }, n.prototype.pack_int64 = function(t2) {
        var e2 = Math.floor(t2 / Math.pow(2, 32)), i2 = t2 % Math.pow(2, 32);
        this.bufferBuilder.append((4278190080 & e2) >>> 24), this.bufferBuilder.append((16711680 & e2) >>> 16), this.bufferBuilder.append((65280 & e2) >>> 8), this.bufferBuilder.append(255 & e2), this.bufferBuilder.append((4278190080 & i2) >>> 24), this.bufferBuilder.append((16711680 & i2) >>> 16), this.bufferBuilder.append((65280 & i2) >>> 8), this.bufferBuilder.append(255 & i2);
      };
    }, {"./bufferbuilder": "EgBh"}], iSxC: [function(require2, module2, exports2) {
      "use strict";
      function e(e2, t2, n2) {
        return t2 in e2 ? Object.defineProperty(e2, t2, {value: n2, enumerable: true, configurable: true, writable: true}) : e2[t2] = n2, e2;
      }
      function t(e2) {
        return (t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(e2);
      }
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.extractVersion = o, exports2.wrapPeerConnectionEvent = i, exports2.disableLog = s, exports2.disableWarnings = a, exports2.log = p2, exports2.deprecated = u, exports2.detectBrowser = c, exports2.compactObject = f, exports2.walkStats = l, exports2.filterStats = v;
      var n = true, r = true;
      function o(e2, t2, n2) {
        var r2 = e2.match(t2);
        return r2 && r2.length >= n2 && parseInt(r2[n2], 10);
      }
      function i(e2, t2, n2) {
        if (e2.RTCPeerConnection) {
          var r2 = e2.RTCPeerConnection.prototype, o2 = r2.addEventListener;
          r2.addEventListener = function(e3, r3) {
            if (e3 !== t2)
              return o2.apply(this, arguments);
            var i3 = function(e4) {
              var t3 = n2(e4);
              t3 && (r3.handleEvent ? r3.handleEvent(t3) : r3(t3));
            };
            return this._eventMap = this._eventMap || {}, this._eventMap[t2] || (this._eventMap[t2] = new Map()), this._eventMap[t2].set(r3, i3), o2.apply(this, [e3, i3]);
          };
          var i2 = r2.removeEventListener;
          r2.removeEventListener = function(e3, n3) {
            if (e3 !== t2 || !this._eventMap || !this._eventMap[t2])
              return i2.apply(this, arguments);
            if (!this._eventMap[t2].has(n3))
              return i2.apply(this, arguments);
            var r3 = this._eventMap[t2].get(n3);
            return this._eventMap[t2].delete(n3), this._eventMap[t2].size === 0 && delete this._eventMap[t2], Object.keys(this._eventMap).length === 0 && delete this._eventMap, i2.apply(this, [e3, r3]);
          }, Object.defineProperty(r2, "on" + t2, {get: function() {
            return this["_on" + t2];
          }, set: function(e3) {
            this["_on" + t2] && (this.removeEventListener(t2, this["_on" + t2]), delete this["_on" + t2]), e3 && this.addEventListener(t2, this["_on" + t2] = e3);
          }, enumerable: true, configurable: true});
        }
      }
      function s(e2) {
        return typeof e2 != "boolean" ? new Error("Argument type: " + t(e2) + ". Please use a boolean.") : (n = e2, e2 ? "adapter.js logging disabled" : "adapter.js logging enabled");
      }
      function a(e2) {
        return typeof e2 != "boolean" ? new Error("Argument type: " + t(e2) + ". Please use a boolean.") : (r = !e2, "adapter.js deprecation warnings " + (e2 ? "disabled" : "enabled"));
      }
      function p2() {
        if ((typeof window == "undefined" ? "undefined" : t(window)) === "object") {
          if (n)
            return;
          typeof console != "undefined" && typeof console.log == "function" && console.log.apply(console, arguments);
        }
      }
      function u(e2, t2) {
        r && console.warn(e2 + " is deprecated, please use " + t2 + " instead.");
      }
      function c(e2) {
        var t2 = {browser: null, version: null};
        if (e2 === void 0 || !e2.navigator)
          return t2.browser = "Not a browser.", t2;
        var {navigator: n2} = e2;
        if (n2.mozGetUserMedia)
          t2.browser = "firefox", t2.version = o(n2.userAgent, /Firefox\/(\d+)\./, 1);
        else if (n2.webkitGetUserMedia || e2.isSecureContext === false && e2.webkitRTCPeerConnection && !e2.RTCIceGatherer)
          t2.browser = "chrome", t2.version = o(n2.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
        else if (n2.mediaDevices && n2.userAgent.match(/Edge\/(\d+).(\d+)$/))
          t2.browser = "edge", t2.version = o(n2.userAgent, /Edge\/(\d+).(\d+)$/, 2);
        else {
          if (!e2.RTCPeerConnection || !n2.userAgent.match(/AppleWebKit\/(\d+)\./))
            return t2.browser = "Not a supported browser.", t2;
          t2.browser = "safari", t2.version = o(n2.userAgent, /AppleWebKit\/(\d+)\./, 1), t2.supportsUnifiedPlan = e2.RTCRtpTransceiver && "currentDirection" in e2.RTCRtpTransceiver.prototype;
        }
        return t2;
      }
      function d(e2) {
        return Object.prototype.toString.call(e2) === "[object Object]";
      }
      function f(t2) {
        return d(t2) ? Object.keys(t2).reduce(function(n2, r2) {
          var o2 = d(t2[r2]), i2 = o2 ? f(t2[r2]) : t2[r2], s2 = o2 && !Object.keys(i2).length;
          return i2 === void 0 || s2 ? n2 : Object.assign(n2, e({}, r2, i2));
        }, {}) : t2;
      }
      function l(e2, t2, n2) {
        t2 && !n2.has(t2.id) && (n2.set(t2.id, t2), Object.keys(t2).forEach(function(r2) {
          r2.endsWith("Id") ? l(e2, e2.get(t2[r2]), n2) : r2.endsWith("Ids") && t2[r2].forEach(function(t3) {
            l(e2, e2.get(t3), n2);
          });
        }));
      }
      function v(e2, t2, n2) {
        var r2 = n2 ? "outbound-rtp" : "inbound-rtp", o2 = new Map();
        if (t2 === null)
          return o2;
        var i2 = [];
        return e2.forEach(function(e3) {
          e3.type === "track" && e3.trackIdentifier === t2.id && i2.push(e3);
        }), i2.forEach(function(t3) {
          e2.forEach(function(n3) {
            n3.type === r2 && n3.trackId === t3.id && l(e2, n3, o2);
          });
        }), o2;
      }
    }, {}], s6SN: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.shimGetUserMedia = i;
      var e = t(require2("../utils.js"));
      function r() {
        if (typeof WeakMap != "function")
          return null;
        var e2 = new WeakMap();
        return r = function() {
          return e2;
        }, e2;
      }
      function t(e2) {
        if (e2 && e2.__esModule)
          return e2;
        if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
          return {default: e2};
        var t2 = r();
        if (t2 && t2.has(e2))
          return t2.get(e2);
        var o2 = {}, n2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i2 in e2)
          if (Object.prototype.hasOwnProperty.call(e2, i2)) {
            var a = n2 ? Object.getOwnPropertyDescriptor(e2, i2) : null;
            a && (a.get || a.set) ? Object.defineProperty(o2, i2, a) : o2[i2] = e2[i2];
          }
        return o2.default = e2, t2 && t2.set(e2, o2), o2;
      }
      function o(e2) {
        return (o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(e2);
      }
      var n = e.log;
      function i(e2, r2) {
        var t2 = e2 && e2.navigator;
        if (t2.mediaDevices) {
          var i2 = function(e3) {
            if (o(e3) !== "object" || e3.mandatory || e3.optional)
              return e3;
            var r3 = {};
            return Object.keys(e3).forEach(function(t3) {
              if (t3 !== "require" && t3 !== "advanced" && t3 !== "mediaSource") {
                var n2 = o(e3[t3]) === "object" ? e3[t3] : {ideal: e3[t3]};
                n2.exact !== void 0 && typeof n2.exact == "number" && (n2.min = n2.max = n2.exact);
                var i3 = function(e4, r4) {
                  return e4 ? e4 + r4.charAt(0).toUpperCase() + r4.slice(1) : r4 === "deviceId" ? "sourceId" : r4;
                };
                if (n2.ideal !== void 0) {
                  r3.optional = r3.optional || [];
                  var a2 = {};
                  typeof n2.ideal == "number" ? (a2[i3("min", t3)] = n2.ideal, r3.optional.push(a2), (a2 = {})[i3("max", t3)] = n2.ideal, r3.optional.push(a2)) : (a2[i3("", t3)] = n2.ideal, r3.optional.push(a2));
                }
                n2.exact !== void 0 && typeof n2.exact != "number" ? (r3.mandatory = r3.mandatory || {}, r3.mandatory[i3("", t3)] = n2.exact) : ["min", "max"].forEach(function(e4) {
                  n2[e4] !== void 0 && (r3.mandatory = r3.mandatory || {}, r3.mandatory[i3(e4, t3)] = n2[e4]);
                });
              }
            }), e3.advanced && (r3.optional = (r3.optional || []).concat(e3.advanced)), r3;
          }, a = function(e3, a2) {
            if (r2.version >= 61)
              return a2(e3);
            if ((e3 = JSON.parse(JSON.stringify(e3))) && o(e3.audio) === "object") {
              var c2 = function(e4, r3, t3) {
                r3 in e4 && !(t3 in e4) && (e4[t3] = e4[r3], delete e4[r3]);
              };
              c2((e3 = JSON.parse(JSON.stringify(e3))).audio, "autoGainControl", "googAutoGainControl"), c2(e3.audio, "noiseSuppression", "googNoiseSuppression"), e3.audio = i2(e3.audio);
            }
            if (e3 && o(e3.video) === "object") {
              var d2 = e3.video.facingMode;
              d2 = d2 && (o(d2) === "object" ? d2 : {ideal: d2});
              var u, s = r2.version < 66;
              if (d2 && (d2.exact === "user" || d2.exact === "environment" || d2.ideal === "user" || d2.ideal === "environment") && (!t2.mediaDevices.getSupportedConstraints || !t2.mediaDevices.getSupportedConstraints().facingMode || s)) {
                if (delete e3.video.facingMode, d2.exact === "environment" || d2.ideal === "environment" ? u = ["back", "rear"] : d2.exact !== "user" && d2.ideal !== "user" || (u = ["front"]), u)
                  return t2.mediaDevices.enumerateDevices().then(function(r3) {
                    var t3 = (r3 = r3.filter(function(e4) {
                      return e4.kind === "videoinput";
                    })).find(function(e4) {
                      return u.some(function(r4) {
                        return e4.label.toLowerCase().includes(r4);
                      });
                    });
                    return !t3 && r3.length && u.includes("back") && (t3 = r3[r3.length - 1]), t3 && (e3.video.deviceId = d2.exact ? {exact: t3.deviceId} : {ideal: t3.deviceId}), e3.video = i2(e3.video), n("chrome: " + JSON.stringify(e3)), a2(e3);
                  });
              }
              e3.video = i2(e3.video);
            }
            return n("chrome: " + JSON.stringify(e3)), a2(e3);
          }, c = function(e3) {
            return r2.version >= 64 ? e3 : {name: {PermissionDeniedError: "NotAllowedError", PermissionDismissedError: "NotAllowedError", InvalidStateError: "NotAllowedError", DevicesNotFoundError: "NotFoundError", ConstraintNotSatisfiedError: "OverconstrainedError", TrackStartError: "NotReadableError", MediaDeviceFailedDueToShutdown: "NotAllowedError", MediaDeviceKillSwitchOn: "NotAllowedError", TabCaptureError: "AbortError", ScreenCaptureError: "AbortError", DeviceCaptureError: "AbortError"}[e3.name] || e3.name, message: e3.message, constraint: e3.constraint || e3.constraintName, toString: function() {
              return this.name + (this.message && ": ") + this.message;
            }};
          };
          if (t2.getUserMedia = function(e3, r3, o2) {
            a(e3, function(e4) {
              t2.webkitGetUserMedia(e4, r3, function(e5) {
                o2 && o2(c(e5));
              });
            });
          }.bind(t2), t2.mediaDevices.getUserMedia) {
            var d = t2.mediaDevices.getUserMedia.bind(t2.mediaDevices);
            t2.mediaDevices.getUserMedia = function(e3) {
              return a(e3, function(e4) {
                return d(e4).then(function(r3) {
                  if (e4.audio && !r3.getAudioTracks().length || e4.video && !r3.getVideoTracks().length)
                    throw r3.getTracks().forEach(function(e5) {
                      e5.stop();
                    }), new DOMException("", "NotFoundError");
                  return r3;
                }, function(e5) {
                  return Promise.reject(c(e5));
                });
              });
            };
          }
        }
      }
    }, {"../utils.js": "iSxC"}], VHa8: [function(require2, module2, exports2) {
      "use strict";
      function e(e2, i) {
        e2.navigator.mediaDevices && "getDisplayMedia" in e2.navigator.mediaDevices || e2.navigator.mediaDevices && (typeof i == "function" ? e2.navigator.mediaDevices.getDisplayMedia = function(a) {
          return i(a).then(function(i2) {
            var t = a.video && a.video.width, o = a.video && a.video.height, d = a.video && a.video.frameRate;
            return a.video = {mandatory: {chromeMediaSource: "desktop", chromeMediaSourceId: i2, maxFrameRate: d || 3}}, t && (a.video.mandatory.maxWidth = t), o && (a.video.mandatory.maxHeight = o), e2.navigator.mediaDevices.getUserMedia(a);
          });
        } : console.error("shimGetDisplayMedia: getSourceId argument is not a function"));
      }
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.shimGetDisplayMedia = e;
    }, {}], uI5X: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.shimMediaStream = a, exports2.shimOnTrack = c, exports2.shimGetSendersWithDtmf = p2, exports2.shimGetStats = d, exports2.shimSenderReceiverGetStats = h, exports2.shimAddTrackRemoveTrackWithNative = f, exports2.shimAddTrackRemoveTrack = m, exports2.shimPeerConnection = u, exports2.fixNegotiationNeeded = l, Object.defineProperty(exports2, "shimGetUserMedia", {enumerable: true, get: function() {
        return t.shimGetUserMedia;
      }}), Object.defineProperty(exports2, "shimGetDisplayMedia", {enumerable: true, get: function() {
        return r.shimGetDisplayMedia;
      }});
      var e = i(require2("../utils.js")), t = require2("./getusermedia"), r = require2("./getdisplaymedia");
      function n() {
        if (typeof WeakMap != "function")
          return null;
        var e2 = new WeakMap();
        return n = function() {
          return e2;
        }, e2;
      }
      function i(e2) {
        if (e2 && e2.__esModule)
          return e2;
        if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
          return {default: e2};
        var t2 = n();
        if (t2 && t2.has(e2))
          return t2.get(e2);
        var r2 = {}, i2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o2 in e2)
          if (Object.prototype.hasOwnProperty.call(e2, o2)) {
            var s2 = i2 ? Object.getOwnPropertyDescriptor(e2, o2) : null;
            s2 && (s2.get || s2.set) ? Object.defineProperty(r2, o2, s2) : r2[o2] = e2[o2];
          }
        return r2.default = e2, t2 && t2.set(e2, r2), r2;
      }
      function o(e2, t2, r2) {
        return t2 in e2 ? Object.defineProperty(e2, t2, {value: r2, enumerable: true, configurable: true, writable: true}) : e2[t2] = r2, e2;
      }
      function s(e2) {
        return (s = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(e2);
      }
      function a(e2) {
        e2.MediaStream = e2.MediaStream || e2.webkitMediaStream;
      }
      function c(t2) {
        if (s(t2) !== "object" || !t2.RTCPeerConnection || "ontrack" in t2.RTCPeerConnection.prototype)
          e.wrapPeerConnectionEvent(t2, "track", function(e2) {
            return e2.transceiver || Object.defineProperty(e2, "transceiver", {value: {receiver: e2.receiver}}), e2;
          });
        else {
          Object.defineProperty(t2.RTCPeerConnection.prototype, "ontrack", {get: function() {
            return this._ontrack;
          }, set: function(e2) {
            this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e2);
          }, enumerable: true, configurable: true});
          var r2 = t2.RTCPeerConnection.prototype.setRemoteDescription;
          t2.RTCPeerConnection.prototype.setRemoteDescription = function() {
            var e2 = this;
            return this._ontrackpoly || (this._ontrackpoly = function(r3) {
              r3.stream.addEventListener("addtrack", function(n2) {
                var i2;
                i2 = t2.RTCPeerConnection.prototype.getReceivers ? e2.getReceivers().find(function(e3) {
                  return e3.track && e3.track.id === n2.track.id;
                }) : {track: n2.track};
                var o2 = new Event("track");
                o2.track = n2.track, o2.receiver = i2, o2.transceiver = {receiver: i2}, o2.streams = [r3.stream], e2.dispatchEvent(o2);
              }), r3.stream.getTracks().forEach(function(n2) {
                var i2;
                i2 = t2.RTCPeerConnection.prototype.getReceivers ? e2.getReceivers().find(function(e3) {
                  return e3.track && e3.track.id === n2.id;
                }) : {track: n2};
                var o2 = new Event("track");
                o2.track = n2, o2.receiver = i2, o2.transceiver = {receiver: i2}, o2.streams = [r3.stream], e2.dispatchEvent(o2);
              });
            }, this.addEventListener("addstream", this._ontrackpoly)), r2.apply(this, arguments);
          };
        }
      }
      function p2(e2) {
        if (s(e2) === "object" && e2.RTCPeerConnection && !("getSenders" in e2.RTCPeerConnection.prototype) && "createDTMFSender" in e2.RTCPeerConnection.prototype) {
          var t2 = function(e3, t3) {
            return {track: t3, get dtmf() {
              return this._dtmf === void 0 && (t3.kind === "audio" ? this._dtmf = e3.createDTMFSender(t3) : this._dtmf = null), this._dtmf;
            }, _pc: e3};
          };
          if (!e2.RTCPeerConnection.prototype.getSenders) {
            e2.RTCPeerConnection.prototype.getSenders = function() {
              return this._senders = this._senders || [], this._senders.slice();
            };
            var r2 = e2.RTCPeerConnection.prototype.addTrack;
            e2.RTCPeerConnection.prototype.addTrack = function(e3, n3) {
              var i3 = r2.apply(this, arguments);
              return i3 || (i3 = t2(this, e3), this._senders.push(i3)), i3;
            };
            var n2 = e2.RTCPeerConnection.prototype.removeTrack;
            e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
              n2.apply(this, arguments);
              var t3 = this._senders.indexOf(e3);
              t3 !== -1 && this._senders.splice(t3, 1);
            };
          }
          var i2 = e2.RTCPeerConnection.prototype.addStream;
          e2.RTCPeerConnection.prototype.addStream = function(e3) {
            var r3 = this;
            this._senders = this._senders || [], i2.apply(this, [e3]), e3.getTracks().forEach(function(e4) {
              r3._senders.push(t2(r3, e4));
            });
          };
          var o2 = e2.RTCPeerConnection.prototype.removeStream;
          e2.RTCPeerConnection.prototype.removeStream = function(e3) {
            var t3 = this;
            this._senders = this._senders || [], o2.apply(this, [e3]), e3.getTracks().forEach(function(e4) {
              var r3 = t3._senders.find(function(t4) {
                return t4.track === e4;
              });
              r3 && t3._senders.splice(t3._senders.indexOf(r3), 1);
            });
          };
        } else if (s(e2) === "object" && e2.RTCPeerConnection && "getSenders" in e2.RTCPeerConnection.prototype && "createDTMFSender" in e2.RTCPeerConnection.prototype && e2.RTCRtpSender && !("dtmf" in e2.RTCRtpSender.prototype)) {
          var a2 = e2.RTCPeerConnection.prototype.getSenders;
          e2.RTCPeerConnection.prototype.getSenders = function() {
            var e3 = this, t3 = a2.apply(this, []);
            return t3.forEach(function(t4) {
              return t4._pc = e3;
            }), t3;
          }, Object.defineProperty(e2.RTCRtpSender.prototype, "dtmf", {get: function() {
            return this._dtmf === void 0 && (this.track.kind === "audio" ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf;
          }});
        }
      }
      function d(e2) {
        if (e2.RTCPeerConnection) {
          var t2 = e2.RTCPeerConnection.prototype.getStats;
          e2.RTCPeerConnection.prototype.getStats = function() {
            var e3 = this, [r2, n2, i2] = arguments;
            if (arguments.length > 0 && typeof r2 == "function")
              return t2.apply(this, arguments);
            if (t2.length === 0 && (arguments.length === 0 || typeof r2 != "function"))
              return t2.apply(this, []);
            var o2 = function(e4) {
              var t3 = {};
              return e4.result().forEach(function(e5) {
                var r3 = {id: e5.id, timestamp: e5.timestamp, type: {localcandidate: "local-candidate", remotecandidate: "remote-candidate"}[e5.type] || e5.type};
                e5.names().forEach(function(t4) {
                  r3[t4] = e5.stat(t4);
                }), t3[r3.id] = r3;
              }), t3;
            }, s2 = function(e4) {
              return new Map(Object.keys(e4).map(function(t3) {
                return [t3, e4[t3]];
              }));
            };
            if (arguments.length >= 2) {
              return t2.apply(this, [function(e4) {
                n2(s2(o2(e4)));
              }, r2]);
            }
            return new Promise(function(r3, n3) {
              t2.apply(e3, [function(e4) {
                r3(s2(o2(e4)));
              }, n3]);
            }).then(n2, i2);
          };
        }
      }
      function h(t2) {
        if (s(t2) === "object" && t2.RTCPeerConnection && t2.RTCRtpSender && t2.RTCRtpReceiver) {
          if (!("getStats" in t2.RTCRtpSender.prototype)) {
            var r2 = t2.RTCPeerConnection.prototype.getSenders;
            r2 && (t2.RTCPeerConnection.prototype.getSenders = function() {
              var e2 = this, t3 = r2.apply(this, []);
              return t3.forEach(function(t4) {
                return t4._pc = e2;
              }), t3;
            });
            var n2 = t2.RTCPeerConnection.prototype.addTrack;
            n2 && (t2.RTCPeerConnection.prototype.addTrack = function() {
              var e2 = n2.apply(this, arguments);
              return e2._pc = this, e2;
            }), t2.RTCRtpSender.prototype.getStats = function() {
              var t3 = this;
              return this._pc.getStats().then(function(r3) {
                return e.filterStats(r3, t3.track, true);
              });
            };
          }
          if (!("getStats" in t2.RTCRtpReceiver.prototype)) {
            var i2 = t2.RTCPeerConnection.prototype.getReceivers;
            i2 && (t2.RTCPeerConnection.prototype.getReceivers = function() {
              var e2 = this, t3 = i2.apply(this, []);
              return t3.forEach(function(t4) {
                return t4._pc = e2;
              }), t3;
            }), e.wrapPeerConnectionEvent(t2, "track", function(e2) {
              return e2.receiver._pc = e2.srcElement, e2;
            }), t2.RTCRtpReceiver.prototype.getStats = function() {
              var t3 = this;
              return this._pc.getStats().then(function(r3) {
                return e.filterStats(r3, t3.track, false);
              });
            };
          }
          if ("getStats" in t2.RTCRtpSender.prototype && "getStats" in t2.RTCRtpReceiver.prototype) {
            var o2 = t2.RTCPeerConnection.prototype.getStats;
            t2.RTCPeerConnection.prototype.getStats = function() {
              if (arguments.length > 0 && arguments[0] instanceof t2.MediaStreamTrack) {
                var e2, r3, n3, i3 = arguments[0];
                return this.getSenders().forEach(function(t3) {
                  t3.track === i3 && (e2 ? n3 = true : e2 = t3);
                }), this.getReceivers().forEach(function(e3) {
                  return e3.track === i3 && (r3 ? n3 = true : r3 = e3), e3.track === i3;
                }), n3 || e2 && r3 ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : e2 ? e2.getStats() : r3 ? r3.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
              }
              return o2.apply(this, arguments);
            };
          }
        }
      }
      function f(e2) {
        e2.RTCPeerConnection.prototype.getLocalStreams = function() {
          var e3 = this;
          return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map(function(t3) {
            return e3._shimmedLocalStreams[t3][0];
          });
        };
        var t2 = e2.RTCPeerConnection.prototype.addTrack;
        e2.RTCPeerConnection.prototype.addTrack = function(e3, r3) {
          if (!r3)
            return t2.apply(this, arguments);
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          var n3 = t2.apply(this, arguments);
          return this._shimmedLocalStreams[r3.id] ? this._shimmedLocalStreams[r3.id].indexOf(n3) === -1 && this._shimmedLocalStreams[r3.id].push(n3) : this._shimmedLocalStreams[r3.id] = [r3, n3], n3;
        };
        var r2 = e2.RTCPeerConnection.prototype.addStream;
        e2.RTCPeerConnection.prototype.addStream = function(e3) {
          var t3 = this;
          this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e3.getTracks().forEach(function(e4) {
            if (t3.getSenders().find(function(t4) {
              return t4.track === e4;
            }))
              throw new DOMException("Track already exists.", "InvalidAccessError");
          });
          var n3 = this.getSenders();
          r2.apply(this, arguments);
          var i3 = this.getSenders().filter(function(e4) {
            return n3.indexOf(e4) === -1;
          });
          this._shimmedLocalStreams[e3.id] = [e3].concat(i3);
        };
        var n2 = e2.RTCPeerConnection.prototype.removeStream;
        e2.RTCPeerConnection.prototype.removeStream = function(e3) {
          return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[e3.id], n2.apply(this, arguments);
        };
        var i2 = e2.RTCPeerConnection.prototype.removeTrack;
        e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
          var t3 = this;
          return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e3 && Object.keys(this._shimmedLocalStreams).forEach(function(r3) {
            var n3 = t3._shimmedLocalStreams[r3].indexOf(e3);
            n3 !== -1 && t3._shimmedLocalStreams[r3].splice(n3, 1), t3._shimmedLocalStreams[r3].length === 1 && delete t3._shimmedLocalStreams[r3];
          }), i2.apply(this, arguments);
        };
      }
      function m(e2, t2) {
        if (e2.RTCPeerConnection) {
          if (e2.RTCPeerConnection.prototype.addTrack && t2.version >= 65)
            return f(e2);
          var r2 = e2.RTCPeerConnection.prototype.getLocalStreams;
          e2.RTCPeerConnection.prototype.getLocalStreams = function() {
            var e3 = this, t3 = r2.apply(this);
            return this._reverseStreams = this._reverseStreams || {}, t3.map(function(t4) {
              return e3._reverseStreams[t4.id];
            });
          };
          var n2 = e2.RTCPeerConnection.prototype.addStream;
          e2.RTCPeerConnection.prototype.addStream = function(t3) {
            var r3 = this;
            if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, t3.getTracks().forEach(function(e3) {
              if (r3.getSenders().find(function(t4) {
                return t4.track === e3;
              }))
                throw new DOMException("Track already exists.", "InvalidAccessError");
            }), !this._reverseStreams[t3.id]) {
              var i3 = new e2.MediaStream(t3.getTracks());
              this._streams[t3.id] = i3, this._reverseStreams[i3.id] = t3, t3 = i3;
            }
            n2.apply(this, [t3]);
          };
          var i2 = e2.RTCPeerConnection.prototype.removeStream;
          e2.RTCPeerConnection.prototype.removeStream = function(e3) {
            this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, i2.apply(this, [this._streams[e3.id] || e3]), delete this._reverseStreams[this._streams[e3.id] ? this._streams[e3.id].id : e3.id], delete this._streams[e3.id];
          }, e2.RTCPeerConnection.prototype.addTrack = function(t3, r3) {
            var n3 = this;
            if (this.signalingState === "closed")
              throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
            var i3 = [].slice.call(arguments, 1);
            if (i3.length !== 1 || !i3[0].getTracks().find(function(e3) {
              return e3 === t3;
            }))
              throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
            if (this.getSenders().find(function(e3) {
              return e3.track === t3;
            }))
              throw new DOMException("Track already exists.", "InvalidAccessError");
            this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
            var o2 = this._streams[r3.id];
            if (o2)
              o2.addTrack(t3), Promise.resolve().then(function() {
                n3.dispatchEvent(new Event("negotiationneeded"));
              });
            else {
              var s3 = new e2.MediaStream([t3]);
              this._streams[r3.id] = s3, this._reverseStreams[s3.id] = r3, this.addStream(s3);
            }
            return this.getSenders().find(function(e3) {
              return e3.track === t3;
            });
          }, ["createOffer", "createAnswer"].forEach(function(t3) {
            var r3 = e2.RTCPeerConnection.prototype[t3], n3 = o({}, t3, function() {
              var e3 = this, t4 = arguments;
              return arguments.length && typeof arguments[0] == "function" ? r3.apply(this, [function(r4) {
                var n4 = c2(e3, r4);
                t4[0].apply(null, [n4]);
              }, function(e4) {
                t4[1] && t4[1].apply(null, e4);
              }, arguments[2]]) : r3.apply(this, arguments).then(function(t5) {
                return c2(e3, t5);
              });
            });
            e2.RTCPeerConnection.prototype[t3] = n3[t3];
          });
          var s2 = e2.RTCPeerConnection.prototype.setLocalDescription;
          e2.RTCPeerConnection.prototype.setLocalDescription = function() {
            return arguments.length && arguments[0].type ? (arguments[0] = (e3 = this, t3 = arguments[0], r3 = t3.sdp, Object.keys(e3._reverseStreams || []).forEach(function(t4) {
              var n3 = e3._reverseStreams[t4], i3 = e3._streams[n3.id];
              r3 = r3.replace(new RegExp(n3.id, "g"), i3.id);
            }), new RTCSessionDescription({type: t3.type, sdp: r3})), s2.apply(this, arguments)) : s2.apply(this, arguments);
            var e3, t3, r3;
          };
          var a2 = Object.getOwnPropertyDescriptor(e2.RTCPeerConnection.prototype, "localDescription");
          Object.defineProperty(e2.RTCPeerConnection.prototype, "localDescription", {get: function() {
            var e3 = a2.get.apply(this);
            return e3.type === "" ? e3 : c2(this, e3);
          }}), e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
            var t3, r3 = this;
            if (this.signalingState === "closed")
              throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
            if (!e3._pc)
              throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
            if (!(e3._pc === this))
              throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
            this._streams = this._streams || {}, Object.keys(this._streams).forEach(function(n3) {
              r3._streams[n3].getTracks().find(function(t4) {
                return e3.track === t4;
              }) && (t3 = r3._streams[n3]);
            }), t3 && (t3.getTracks().length === 1 ? this.removeStream(this._reverseStreams[t3.id]) : t3.removeTrack(e3.track), this.dispatchEvent(new Event("negotiationneeded")));
          };
        }
        function c2(e3, t3) {
          var r3 = t3.sdp;
          return Object.keys(e3._reverseStreams || []).forEach(function(t4) {
            var n3 = e3._reverseStreams[t4], i3 = e3._streams[n3.id];
            r3 = r3.replace(new RegExp(i3.id, "g"), n3.id);
          }), new RTCSessionDescription({type: t3.type, sdp: r3});
        }
      }
      function u(e2, t2) {
        !e2.RTCPeerConnection && e2.webkitRTCPeerConnection && (e2.RTCPeerConnection = e2.webkitRTCPeerConnection), e2.RTCPeerConnection && t2.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t3) {
          var r2 = e2.RTCPeerConnection.prototype[t3], n2 = o({}, t3, function() {
            return arguments[0] = new (t3 === "addIceCandidate" ? e2.RTCIceCandidate : e2.RTCSessionDescription)(arguments[0]), r2.apply(this, arguments);
          });
          e2.RTCPeerConnection.prototype[t3] = n2[t3];
        });
      }
      function l(t2, r2) {
        e.wrapPeerConnectionEvent(t2, "negotiationneeded", function(e2) {
          var t3 = e2.target;
          if (!(r2.version < 72 || t3.getConfiguration && t3.getConfiguration().sdpSemantics === "plan-b") || t3.signalingState === "stable")
            return e2;
        });
      }
    }, {"../utils.js": "iSxC", "./getusermedia": "s6SN", "./getdisplaymedia": "VHa8"}], NZ1C: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.filterIceServers = n;
      var r = t(require2("../utils"));
      function e() {
        if (typeof WeakMap != "function")
          return null;
        var r2 = new WeakMap();
        return e = function() {
          return r2;
        }, r2;
      }
      function t(r2) {
        if (r2 && r2.__esModule)
          return r2;
        if (r2 === null || typeof r2 != "object" && typeof r2 != "function")
          return {default: r2};
        var t2 = e();
        if (t2 && t2.has(r2))
          return t2.get(r2);
        var n2 = {}, u = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i in r2)
          if (Object.prototype.hasOwnProperty.call(r2, i)) {
            var f = u ? Object.getOwnPropertyDescriptor(r2, i) : null;
            f && (f.get || f.set) ? Object.defineProperty(n2, i, f) : n2[i] = r2[i];
          }
        return n2.default = r2, t2 && t2.set(r2, n2), n2;
      }
      function n(e2, t2) {
        var n2 = false;
        return (e2 = JSON.parse(JSON.stringify(e2))).filter(function(e3) {
          if (e3 && (e3.urls || e3.url)) {
            var t3 = e3.urls || e3.url;
            e3.url && !e3.urls && r.deprecated("RTCIceServer.url", "RTCIceServer.urls");
            var u = typeof t3 == "string";
            return u && (t3 = [t3]), t3 = t3.filter(function(r2) {
              if (r2.indexOf("stun:") === 0)
                return false;
              var e4 = r2.startsWith("turn") && !r2.startsWith("turn:[") && r2.includes("transport=udp");
              return e4 && !n2 ? (n2 = true, true) : e4 && !n2;
            }), delete e3.url, e3.urls = u ? t3[0] : t3, !!t3.length;
          }
        });
      }
    }, {"../utils": "iSxC"}], YHvh: [function(require2, module2, exports2) {
      "use strict";
      var r = {generateIdentifier: function() {
        return Math.random().toString(36).substr(2, 10);
      }};
      r.localCName = r.generateIdentifier(), r.splitLines = function(r2) {
        return r2.trim().split("\n").map(function(r3) {
          return r3.trim();
        });
      }, r.splitSections = function(r2) {
        return r2.split("\nm=").map(function(r3, e) {
          return (e > 0 ? "m=" + r3 : r3).trim() + "\r\n";
        });
      }, r.getDescription = function(e) {
        var t = r.splitSections(e);
        return t && t[0];
      }, r.getMediaSections = function(e) {
        var t = r.splitSections(e);
        return t.shift(), t;
      }, r.matchPrefix = function(e, t) {
        return r.splitLines(e).filter(function(r2) {
          return r2.indexOf(t) === 0;
        });
      }, r.parseCandidate = function(r2) {
        for (var e, t = {foundation: (e = r2.indexOf("a=candidate:") === 0 ? r2.substring(12).split(" ") : r2.substring(10).split(" "))[0], component: parseInt(e[1], 10), protocol: e[2].toLowerCase(), priority: parseInt(e[3], 10), ip: e[4], address: e[4], port: parseInt(e[5], 10), type: e[7]}, a = 8; a < e.length; a += 2)
          switch (e[a]) {
            case "raddr":
              t.relatedAddress = e[a + 1];
              break;
            case "rport":
              t.relatedPort = parseInt(e[a + 1], 10);
              break;
            case "tcptype":
              t.tcpType = e[a + 1];
              break;
            case "ufrag":
              t.ufrag = e[a + 1], t.usernameFragment = e[a + 1];
              break;
            default:
              t[e[a]] = e[a + 1];
          }
        return t;
      }, r.writeCandidate = function(r2) {
        var e = [];
        e.push(r2.foundation), e.push(r2.component), e.push(r2.protocol.toUpperCase()), e.push(r2.priority), e.push(r2.address || r2.ip), e.push(r2.port);
        var t = r2.type;
        return e.push("typ"), e.push(t), t !== "host" && r2.relatedAddress && r2.relatedPort && (e.push("raddr"), e.push(r2.relatedAddress), e.push("rport"), e.push(r2.relatedPort)), r2.tcpType && r2.protocol.toLowerCase() === "tcp" && (e.push("tcptype"), e.push(r2.tcpType)), (r2.usernameFragment || r2.ufrag) && (e.push("ufrag"), e.push(r2.usernameFragment || r2.ufrag)), "candidate:" + e.join(" ");
      }, r.parseIceOptions = function(r2) {
        return r2.substr(14).split(" ");
      }, r.parseRtpMap = function(r2) {
        var e = r2.substr(9).split(" "), t = {payloadType: parseInt(e.shift(), 10)};
        return e = e[0].split("/"), t.name = e[0], t.clockRate = parseInt(e[1], 10), t.channels = e.length === 3 ? parseInt(e[2], 10) : 1, t.numChannels = t.channels, t;
      }, r.writeRtpMap = function(r2) {
        var e = r2.payloadType;
        r2.preferredPayloadType !== void 0 && (e = r2.preferredPayloadType);
        var t = r2.channels || r2.numChannels || 1;
        return "a=rtpmap:" + e + " " + r2.name + "/" + r2.clockRate + (t !== 1 ? "/" + t : "") + "\r\n";
      }, r.parseExtmap = function(r2) {
        var e = r2.substr(9).split(" ");
        return {id: parseInt(e[0], 10), direction: e[0].indexOf("/") > 0 ? e[0].split("/")[1] : "sendrecv", uri: e[1]};
      }, r.writeExtmap = function(r2) {
        return "a=extmap:" + (r2.id || r2.preferredId) + (r2.direction && r2.direction !== "sendrecv" ? "/" + r2.direction : "") + " " + r2.uri + "\r\n";
      }, r.parseFmtp = function(r2) {
        for (var e, t = {}, a = r2.substr(r2.indexOf(" ") + 1).split(";"), n = 0; n < a.length; n++)
          t[(e = a[n].trim().split("="))[0].trim()] = e[1];
        return t;
      }, r.writeFmtp = function(r2) {
        var e = "", t = r2.payloadType;
        if (r2.preferredPayloadType !== void 0 && (t = r2.preferredPayloadType), r2.parameters && Object.keys(r2.parameters).length) {
          var a = [];
          Object.keys(r2.parameters).forEach(function(e2) {
            r2.parameters[e2] ? a.push(e2 + "=" + r2.parameters[e2]) : a.push(e2);
          }), e += "a=fmtp:" + t + " " + a.join(";") + "\r\n";
        }
        return e;
      }, r.parseRtcpFb = function(r2) {
        var e = r2.substr(r2.indexOf(" ") + 1).split(" ");
        return {type: e.shift(), parameter: e.join(" ")};
      }, r.writeRtcpFb = function(r2) {
        var e = "", t = r2.payloadType;
        return r2.preferredPayloadType !== void 0 && (t = r2.preferredPayloadType), r2.rtcpFeedback && r2.rtcpFeedback.length && r2.rtcpFeedback.forEach(function(r3) {
          e += "a=rtcp-fb:" + t + " " + r3.type + (r3.parameter && r3.parameter.length ? " " + r3.parameter : "") + "\r\n";
        }), e;
      }, r.parseSsrcMedia = function(r2) {
        var e = r2.indexOf(" "), t = {ssrc: parseInt(r2.substr(7, e - 7), 10)}, a = r2.indexOf(":", e);
        return a > -1 ? (t.attribute = r2.substr(e + 1, a - e - 1), t.value = r2.substr(a + 1)) : t.attribute = r2.substr(e + 1), t;
      }, r.parseSsrcGroup = function(r2) {
        var e = r2.substr(13).split(" ");
        return {semantics: e.shift(), ssrcs: e.map(function(r3) {
          return parseInt(r3, 10);
        })};
      }, r.getMid = function(e) {
        var t = r.matchPrefix(e, "a=mid:")[0];
        if (t)
          return t.substr(6);
      }, r.parseFingerprint = function(r2) {
        var e = r2.substr(14).split(" ");
        return {algorithm: e[0].toLowerCase(), value: e[1]};
      }, r.getDtlsParameters = function(e, t) {
        return {role: "auto", fingerprints: r.matchPrefix(e + t, "a=fingerprint:").map(r.parseFingerprint)};
      }, r.writeDtlsParameters = function(r2, e) {
        var t = "a=setup:" + e + "\r\n";
        return r2.fingerprints.forEach(function(r3) {
          t += "a=fingerprint:" + r3.algorithm + " " + r3.value + "\r\n";
        }), t;
      }, r.parseCryptoLine = function(r2) {
        var e = r2.substr(9).split(" ");
        return {tag: parseInt(e[0], 10), cryptoSuite: e[1], keyParams: e[2], sessionParams: e.slice(3)};
      }, r.writeCryptoLine = function(e) {
        return "a=crypto:" + e.tag + " " + e.cryptoSuite + " " + (typeof e.keyParams == "object" ? r.writeCryptoKeyParams(e.keyParams) : e.keyParams) + (e.sessionParams ? " " + e.sessionParams.join(" ") : "") + "\r\n";
      }, r.parseCryptoKeyParams = function(r2) {
        if (r2.indexOf("inline:") !== 0)
          return null;
        var e = r2.substr(7).split("|");
        return {keyMethod: "inline", keySalt: e[0], lifeTime: e[1], mkiValue: e[2] ? e[2].split(":")[0] : void 0, mkiLength: e[2] ? e[2].split(":")[1] : void 0};
      }, r.writeCryptoKeyParams = function(r2) {
        return r2.keyMethod + ":" + r2.keySalt + (r2.lifeTime ? "|" + r2.lifeTime : "") + (r2.mkiValue && r2.mkiLength ? "|" + r2.mkiValue + ":" + r2.mkiLength : "");
      }, r.getCryptoParameters = function(e, t) {
        return r.matchPrefix(e + t, "a=crypto:").map(r.parseCryptoLine);
      }, r.getIceParameters = function(e, t) {
        var a = r.matchPrefix(e + t, "a=ice-ufrag:")[0], n = r.matchPrefix(e + t, "a=ice-pwd:")[0];
        return a && n ? {usernameFragment: a.substr(12), password: n.substr(10)} : null;
      }, r.writeIceParameters = function(r2) {
        return "a=ice-ufrag:" + r2.usernameFragment + "\r\na=ice-pwd:" + r2.password + "\r\n";
      }, r.parseRtpParameters = function(e) {
        for (var t = {codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: []}, a = r.splitLines(e)[0].split(" "), n = 3; n < a.length; n++) {
          var s = a[n], i = r.matchPrefix(e, "a=rtpmap:" + s + " ")[0];
          if (i) {
            var p2 = r.parseRtpMap(i), c = r.matchPrefix(e, "a=fmtp:" + s + " ");
            switch (p2.parameters = c.length ? r.parseFmtp(c[0]) : {}, p2.rtcpFeedback = r.matchPrefix(e, "a=rtcp-fb:" + s + " ").map(r.parseRtcpFb), t.codecs.push(p2), p2.name.toUpperCase()) {
              case "RED":
              case "ULPFEC":
                t.fecMechanisms.push(p2.name.toUpperCase());
            }
          }
        }
        return r.matchPrefix(e, "a=extmap:").forEach(function(e2) {
          t.headerExtensions.push(r.parseExtmap(e2));
        }), t;
      }, r.writeRtpDescription = function(e, t) {
        var a = "";
        a += "m=" + e + " ", a += t.codecs.length > 0 ? "9" : "0", a += " UDP/TLS/RTP/SAVPF ", a += t.codecs.map(function(r2) {
          return r2.preferredPayloadType !== void 0 ? r2.preferredPayloadType : r2.payloadType;
        }).join(" ") + "\r\n", a += "c=IN IP4 0.0.0.0\r\n", a += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function(e2) {
          a += r.writeRtpMap(e2), a += r.writeFmtp(e2), a += r.writeRtcpFb(e2);
        });
        var n = 0;
        return t.codecs.forEach(function(r2) {
          r2.maxptime > n && (n = r2.maxptime);
        }), n > 0 && (a += "a=maxptime:" + n + "\r\n"), a += "a=rtcp-mux\r\n", t.headerExtensions && t.headerExtensions.forEach(function(e2) {
          a += r.writeExtmap(e2);
        }), a;
      }, r.parseRtpEncodingParameters = function(e) {
        var t, a = [], n = r.parseRtpParameters(e), s = n.fecMechanisms.indexOf("RED") !== -1, i = n.fecMechanisms.indexOf("ULPFEC") !== -1, p2 = r.matchPrefix(e, "a=ssrc:").map(function(e2) {
          return r.parseSsrcMedia(e2);
        }).filter(function(r2) {
          return r2.attribute === "cname";
        }), c = p2.length > 0 && p2[0].ssrc, o = r.matchPrefix(e, "a=ssrc-group:FID").map(function(r2) {
          return r2.substr(17).split(" ").map(function(r3) {
            return parseInt(r3, 10);
          });
        });
        o.length > 0 && o[0].length > 1 && o[0][0] === c && (t = o[0][1]), n.codecs.forEach(function(r2) {
          if (r2.name.toUpperCase() === "RTX" && r2.parameters.apt) {
            var e2 = {ssrc: c, codecPayloadType: parseInt(r2.parameters.apt, 10)};
            c && t && (e2.rtx = {ssrc: t}), a.push(e2), s && ((e2 = JSON.parse(JSON.stringify(e2))).fec = {ssrc: c, mechanism: i ? "red+ulpfec" : "red"}, a.push(e2));
          }
        }), a.length === 0 && c && a.push({ssrc: c});
        var u = r.matchPrefix(e, "b=");
        return u.length && (u = u[0].indexOf("b=TIAS:") === 0 ? parseInt(u[0].substr(7), 10) : u[0].indexOf("b=AS:") === 0 ? 1e3 * parseInt(u[0].substr(5), 10) * 0.95 - 16e3 : void 0, a.forEach(function(r2) {
          r2.maxBitrate = u;
        })), a;
      }, r.parseRtcpParameters = function(e) {
        var t = {}, a = r.matchPrefix(e, "a=ssrc:").map(function(e2) {
          return r.parseSsrcMedia(e2);
        }).filter(function(r2) {
          return r2.attribute === "cname";
        })[0];
        a && (t.cname = a.value, t.ssrc = a.ssrc);
        var n = r.matchPrefix(e, "a=rtcp-rsize");
        t.reducedSize = n.length > 0, t.compound = n.length === 0;
        var s = r.matchPrefix(e, "a=rtcp-mux");
        return t.mux = s.length > 0, t;
      }, r.parseMsid = function(e) {
        var t, a = r.matchPrefix(e, "a=msid:");
        if (a.length === 1)
          return {stream: (t = a[0].substr(7).split(" "))[0], track: t[1]};
        var n = r.matchPrefix(e, "a=ssrc:").map(function(e2) {
          return r.parseSsrcMedia(e2);
        }).filter(function(r2) {
          return r2.attribute === "msid";
        });
        return n.length > 0 ? {stream: (t = n[0].value.split(" "))[0], track: t[1]} : void 0;
      }, r.parseSctpDescription = function(e) {
        var t, a = r.parseMLine(e), n = r.matchPrefix(e, "a=max-message-size:");
        n.length > 0 && (t = parseInt(n[0].substr(19), 10)), isNaN(t) && (t = 65536);
        var s = r.matchPrefix(e, "a=sctp-port:");
        if (s.length > 0)
          return {port: parseInt(s[0].substr(12), 10), protocol: a.fmt, maxMessageSize: t};
        if (r.matchPrefix(e, "a=sctpmap:").length > 0) {
          var i = r.matchPrefix(e, "a=sctpmap:")[0].substr(10).split(" ");
          return {port: parseInt(i[0], 10), protocol: i[1], maxMessageSize: t};
        }
      }, r.writeSctpDescription = function(r2, e) {
        var t = [];
        return t = r2.protocol !== "DTLS/SCTP" ? ["m=" + r2.kind + " 9 " + r2.protocol + " " + e.protocol + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctp-port:" + e.port + "\r\n"] : ["m=" + r2.kind + " 9 " + r2.protocol + " " + e.port + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctpmap:" + e.port + " " + e.protocol + " 65535\r\n"], e.maxMessageSize !== void 0 && t.push("a=max-message-size:" + e.maxMessageSize + "\r\n"), t.join("");
      }, r.generateSessionId = function() {
        return Math.random().toString().substr(2, 21);
      }, r.writeSessionBoilerplate = function(e, t, a) {
        var n = t !== void 0 ? t : 2;
        return "v=0\r\no=" + (a || "thisisadapterortc") + " " + (e || r.generateSessionId()) + " " + n + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n";
      }, r.writeMediaSection = function(e, t, a, n) {
        var s = r.writeRtpDescription(e.kind, t);
        if (s += r.writeIceParameters(e.iceGatherer.getLocalParameters()), s += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), a === "offer" ? "actpass" : "active"), s += "a=mid:" + e.mid + "\r\n", e.direction ? s += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? s += "a=sendrecv\r\n" : e.rtpSender ? s += "a=sendonly\r\n" : e.rtpReceiver ? s += "a=recvonly\r\n" : s += "a=inactive\r\n", e.rtpSender) {
          var i = "msid:" + n.id + " " + e.rtpSender.track.id + "\r\n";
          s += "a=" + i, s += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + i, e.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + i, s += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n");
        }
        return s += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n"), s;
      }, r.getDirection = function(e, t) {
        for (var a = r.splitLines(e), n = 0; n < a.length; n++)
          switch (a[n]) {
            case "a=sendrecv":
            case "a=sendonly":
            case "a=recvonly":
            case "a=inactive":
              return a[n].substr(2);
          }
        return t ? r.getDirection(t) : "sendrecv";
      }, r.getKind = function(e) {
        return r.splitLines(e)[0].split(" ")[0].substr(2);
      }, r.isRejected = function(r2) {
        return r2.split(" ", 2)[1] === "0";
      }, r.parseMLine = function(e) {
        var t = r.splitLines(e)[0].substr(2).split(" ");
        return {kind: t[0], port: parseInt(t[1], 10), protocol: t[2], fmt: t.slice(3).join(" ")};
      }, r.parseOLine = function(e) {
        var t = r.matchPrefix(e, "o=")[0].substr(2).split(" ");
        return {username: t[0], sessionId: t[1], sessionVersion: parseInt(t[2], 10), netType: t[3], addressType: t[4], address: t[5]};
      }, r.isValidSDP = function(e) {
        if (typeof e != "string" || e.length === 0)
          return false;
        for (var t = r.splitLines(e), a = 0; a < t.length; a++)
          if (t[a].length < 2 || t[a].charAt(1) !== "=")
            return false;
        return true;
      }, typeof module2 == "object" && (module2.exports = r);
    }, {}], NJ2u: [function(require2, module2, exports2) {
      "use strict";
      var e = require2("sdp");
      function t(e2) {
        return {inboundrtp: "inbound-rtp", outboundrtp: "outbound-rtp", candidatepair: "candidate-pair", localcandidate: "local-candidate", remotecandidate: "remote-candidate"}[e2.type] || e2.type;
      }
      function r(t2, r2, n2, a2, i2) {
        var s2 = e.writeRtpDescription(t2.kind, r2);
        if (s2 += e.writeIceParameters(t2.iceGatherer.getLocalParameters()), s2 += e.writeDtlsParameters(t2.dtlsTransport.getLocalParameters(), n2 === "offer" ? "actpass" : i2 || "active"), s2 += "a=mid:" + t2.mid + "\r\n", t2.rtpSender && t2.rtpReceiver ? s2 += "a=sendrecv\r\n" : t2.rtpSender ? s2 += "a=sendonly\r\n" : t2.rtpReceiver ? s2 += "a=recvonly\r\n" : s2 += "a=inactive\r\n", t2.rtpSender) {
          var o2 = t2.rtpSender._initialTrackId || t2.rtpSender.track.id;
          t2.rtpSender._initialTrackId = o2;
          var c = "msid:" + (a2 ? a2.id : "-") + " " + o2 + "\r\n";
          s2 += "a=" + c, s2 += "a=ssrc:" + t2.sendEncodingParameters[0].ssrc + " " + c, t2.sendEncodingParameters[0].rtx && (s2 += "a=ssrc:" + t2.sendEncodingParameters[0].rtx.ssrc + " " + c, s2 += "a=ssrc-group:FID " + t2.sendEncodingParameters[0].ssrc + " " + t2.sendEncodingParameters[0].rtx.ssrc + "\r\n");
        }
        return s2 += "a=ssrc:" + t2.sendEncodingParameters[0].ssrc + " cname:" + e.localCName + "\r\n", t2.rtpSender && t2.sendEncodingParameters[0].rtx && (s2 += "a=ssrc:" + t2.sendEncodingParameters[0].rtx.ssrc + " cname:" + e.localCName + "\r\n"), s2;
      }
      function n(e2, t2) {
        var r2 = false;
        return (e2 = JSON.parse(JSON.stringify(e2))).filter(function(e3) {
          if (e3 && (e3.urls || e3.url)) {
            var n2 = e3.urls || e3.url;
            e3.url && !e3.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
            var a2 = typeof n2 == "string";
            return a2 && (n2 = [n2]), n2 = n2.filter(function(e4) {
              return e4.indexOf("turn:") === 0 && e4.indexOf("transport=udp") !== -1 && e4.indexOf("turn:[") === -1 && !r2 ? (r2 = true, true) : e4.indexOf("stun:") === 0 && t2 >= 14393 && e4.indexOf("?transport=udp") === -1;
            }), delete e3.url, e3.urls = a2 ? n2[0] : n2, !!n2.length;
          }
        });
      }
      function a(e2, t2) {
        var r2 = {codecs: [], headerExtensions: [], fecMechanisms: []}, n2 = function(e3, t3) {
          e3 = parseInt(e3, 10);
          for (var r3 = 0; r3 < t3.length; r3++)
            if (t3[r3].payloadType === e3 || t3[r3].preferredPayloadType === e3)
              return t3[r3];
        }, a2 = function(e3, t3, r3, a3) {
          var i2 = n2(e3.parameters.apt, r3), s2 = n2(t3.parameters.apt, a3);
          return i2 && s2 && i2.name.toLowerCase() === s2.name.toLowerCase();
        };
        return e2.codecs.forEach(function(n3) {
          for (var i2 = 0; i2 < t2.codecs.length; i2++) {
            var s2 = t2.codecs[i2];
            if (n3.name.toLowerCase() === s2.name.toLowerCase() && n3.clockRate === s2.clockRate) {
              if (n3.name.toLowerCase() === "rtx" && n3.parameters && s2.parameters.apt && !a2(n3, s2, e2.codecs, t2.codecs))
                continue;
              (s2 = JSON.parse(JSON.stringify(s2))).numChannels = Math.min(n3.numChannels, s2.numChannels), r2.codecs.push(s2), s2.rtcpFeedback = s2.rtcpFeedback.filter(function(e3) {
                for (var t3 = 0; t3 < n3.rtcpFeedback.length; t3++)
                  if (n3.rtcpFeedback[t3].type === e3.type && n3.rtcpFeedback[t3].parameter === e3.parameter)
                    return true;
                return false;
              });
              break;
            }
          }
        }), e2.headerExtensions.forEach(function(e3) {
          for (var n3 = 0; n3 < t2.headerExtensions.length; n3++) {
            var a3 = t2.headerExtensions[n3];
            if (e3.uri === a3.uri) {
              r2.headerExtensions.push(a3);
              break;
            }
          }
        }), r2;
      }
      function i(e2, t2, r2) {
        return {offer: {setLocalDescription: ["stable", "have-local-offer"], setRemoteDescription: ["stable", "have-remote-offer"]}, answer: {setLocalDescription: ["have-remote-offer", "have-local-pranswer"], setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]}}[t2][e2].indexOf(r2) !== -1;
      }
      function s(e2, t2) {
        var r2 = e2.getRemoteCandidates().find(function(e3) {
          return t2.foundation === e3.foundation && t2.ip === e3.ip && t2.port === e3.port && t2.priority === e3.priority && t2.protocol === e3.protocol && t2.type === e3.type;
        });
        return r2 || e2.addRemoteCandidate(t2), !r2;
      }
      function o(e2, t2) {
        var r2 = new Error(t2);
        return r2.name = e2, r2.code = {NotSupportedError: 9, InvalidStateError: 11, InvalidAccessError: 15, TypeError: void 0, OperationError: void 0}[e2], r2;
      }
      module2.exports = function(c, d) {
        function p2(e2, t2) {
          t2.addTrack(e2), t2.dispatchEvent(new c.MediaStreamTrackEvent("addtrack", {track: e2}));
        }
        function l(e2, t2, r2, n2) {
          var a2 = new Event("track");
          a2.track = t2, a2.receiver = r2, a2.transceiver = {receiver: r2}, a2.streams = n2, c.setTimeout(function() {
            e2._dispatchEvent("track", a2);
          });
        }
        var f = function(t2) {
          var r2 = this, a2 = document.createDocumentFragment();
          if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e2) {
            r2[e2] = a2[e2].bind(a2);
          }), this.canTrickleIceCandidates = null, this.needNegotiation = false, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", t2 = JSON.parse(JSON.stringify(t2 || {})), this.usingBundle = t2.bundlePolicy === "max-bundle", t2.rtcpMuxPolicy === "negotiate")
            throw o("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
          switch (t2.rtcpMuxPolicy || (t2.rtcpMuxPolicy = "require"), t2.iceTransportPolicy) {
            case "all":
            case "relay":
              break;
            default:
              t2.iceTransportPolicy = "all";
          }
          switch (t2.bundlePolicy) {
            case "balanced":
            case "max-compat":
            case "max-bundle":
              break;
            default:
              t2.bundlePolicy = "balanced";
          }
          if (t2.iceServers = n(t2.iceServers || [], d), this._iceGatherers = [], t2.iceCandidatePoolSize)
            for (var i2 = t2.iceCandidatePoolSize; i2 > 0; i2--)
              this._iceGatherers.push(new c.RTCIceGatherer({iceServers: t2.iceServers, gatherPolicy: t2.iceTransportPolicy}));
          else
            t2.iceCandidatePoolSize = 0;
          this._config = t2, this.transceivers = [], this._sdpSessionId = e.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = false;
        };
        Object.defineProperty(f.prototype, "localDescription", {configurable: true, get: function() {
          return this._localDescription;
        }}), Object.defineProperty(f.prototype, "remoteDescription", {configurable: true, get: function() {
          return this._remoteDescription;
        }}), f.prototype.onicecandidate = null, f.prototype.onaddstream = null, f.prototype.ontrack = null, f.prototype.onremovestream = null, f.prototype.onsignalingstatechange = null, f.prototype.oniceconnectionstatechange = null, f.prototype.onconnectionstatechange = null, f.prototype.onicegatheringstatechange = null, f.prototype.onnegotiationneeded = null, f.prototype.ondatachannel = null, f.prototype._dispatchEvent = function(e2, t2) {
          this._isClosed || (this.dispatchEvent(t2), typeof this["on" + e2] == "function" && this["on" + e2](t2));
        }, f.prototype._emitGatheringStateChange = function() {
          var e2 = new Event("icegatheringstatechange");
          this._dispatchEvent("icegatheringstatechange", e2);
        }, f.prototype.getConfiguration = function() {
          return this._config;
        }, f.prototype.getLocalStreams = function() {
          return this.localStreams;
        }, f.prototype.getRemoteStreams = function() {
          return this.remoteStreams;
        }, f.prototype._createTransceiver = function(e2, t2) {
          var r2 = this.transceivers.length > 0, n2 = {track: null, iceGatherer: null, iceTransport: null, dtlsTransport: null, localCapabilities: null, remoteCapabilities: null, rtpSender: null, rtpReceiver: null, kind: e2, mid: null, sendEncodingParameters: null, recvEncodingParameters: null, stream: null, associatedRemoteMediaStreams: [], wantReceive: true};
          if (this.usingBundle && r2)
            n2.iceTransport = this.transceivers[0].iceTransport, n2.dtlsTransport = this.transceivers[0].dtlsTransport;
          else {
            var a2 = this._createIceAndDtlsTransports();
            n2.iceTransport = a2.iceTransport, n2.dtlsTransport = a2.dtlsTransport;
          }
          return t2 || this.transceivers.push(n2), n2;
        }, f.prototype.addTrack = function(e2, t2) {
          if (this._isClosed)
            throw o("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
          var r2;
          if (this.transceivers.find(function(t3) {
            return t3.track === e2;
          }))
            throw o("InvalidAccessError", "Track already exists.");
          for (var n2 = 0; n2 < this.transceivers.length; n2++)
            this.transceivers[n2].track || this.transceivers[n2].kind !== e2.kind || (r2 = this.transceivers[n2]);
          return r2 || (r2 = this._createTransceiver(e2.kind)), this._maybeFireNegotiationNeeded(), this.localStreams.indexOf(t2) === -1 && this.localStreams.push(t2), r2.track = e2, r2.stream = t2, r2.rtpSender = new c.RTCRtpSender(e2, r2.dtlsTransport), r2.rtpSender;
        }, f.prototype.addStream = function(e2) {
          var t2 = this;
          if (d >= 15025)
            e2.getTracks().forEach(function(r3) {
              t2.addTrack(r3, e2);
            });
          else {
            var r2 = e2.clone();
            e2.getTracks().forEach(function(e3, t3) {
              var n2 = r2.getTracks()[t3];
              e3.addEventListener("enabled", function(e4) {
                n2.enabled = e4.enabled;
              });
            }), r2.getTracks().forEach(function(e3) {
              t2.addTrack(e3, r2);
            });
          }
        }, f.prototype.removeTrack = function(e2) {
          if (this._isClosed)
            throw o("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
          if (!(e2 instanceof c.RTCRtpSender))
            throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
          var t2 = this.transceivers.find(function(t3) {
            return t3.rtpSender === e2;
          });
          if (!t2)
            throw o("InvalidAccessError", "Sender was not created by this connection.");
          var r2 = t2.stream;
          t2.rtpSender.stop(), t2.rtpSender = null, t2.track = null, t2.stream = null, this.transceivers.map(function(e3) {
            return e3.stream;
          }).indexOf(r2) === -1 && this.localStreams.indexOf(r2) > -1 && this.localStreams.splice(this.localStreams.indexOf(r2), 1), this._maybeFireNegotiationNeeded();
        }, f.prototype.removeStream = function(e2) {
          var t2 = this;
          e2.getTracks().forEach(function(e3) {
            var r2 = t2.getSenders().find(function(t3) {
              return t3.track === e3;
            });
            r2 && t2.removeTrack(r2);
          });
        }, f.prototype.getSenders = function() {
          return this.transceivers.filter(function(e2) {
            return !!e2.rtpSender;
          }).map(function(e2) {
            return e2.rtpSender;
          });
        }, f.prototype.getReceivers = function() {
          return this.transceivers.filter(function(e2) {
            return !!e2.rtpReceiver;
          }).map(function(e2) {
            return e2.rtpReceiver;
          });
        }, f.prototype._createIceGatherer = function(e2, t2) {
          var r2 = this;
          if (t2 && e2 > 0)
            return this.transceivers[0].iceGatherer;
          if (this._iceGatherers.length)
            return this._iceGatherers.shift();
          var n2 = new c.RTCIceGatherer({iceServers: this._config.iceServers, gatherPolicy: this._config.iceTransportPolicy});
          return Object.defineProperty(n2, "state", {value: "new", writable: true}), this.transceivers[e2].bufferedCandidateEvents = [], this.transceivers[e2].bufferCandidates = function(t3) {
            var a2 = !t3.candidate || Object.keys(t3.candidate).length === 0;
            n2.state = a2 ? "completed" : "gathering", r2.transceivers[e2].bufferedCandidateEvents !== null && r2.transceivers[e2].bufferedCandidateEvents.push(t3);
          }, n2.addEventListener("localcandidate", this.transceivers[e2].bufferCandidates), n2;
        }, f.prototype._gather = function(t2, r2) {
          var n2 = this, a2 = this.transceivers[r2].iceGatherer;
          if (!a2.onlocalcandidate) {
            var i2 = this.transceivers[r2].bufferedCandidateEvents;
            this.transceivers[r2].bufferedCandidateEvents = null, a2.removeEventListener("localcandidate", this.transceivers[r2].bufferCandidates), a2.onlocalcandidate = function(i3) {
              if (!(n2.usingBundle && r2 > 0)) {
                var s2 = new Event("icecandidate");
                s2.candidate = {sdpMid: t2, sdpMLineIndex: r2};
                var o2 = i3.candidate, c2 = !o2 || Object.keys(o2).length === 0;
                if (c2)
                  a2.state !== "new" && a2.state !== "gathering" || (a2.state = "completed");
                else {
                  a2.state === "new" && (a2.state = "gathering"), o2.component = 1, o2.ufrag = a2.getLocalParameters().usernameFragment;
                  var d2 = e.writeCandidate(o2);
                  s2.candidate = Object.assign(s2.candidate, e.parseCandidate(d2)), s2.candidate.candidate = d2, s2.candidate.toJSON = function() {
                    return {candidate: s2.candidate.candidate, sdpMid: s2.candidate.sdpMid, sdpMLineIndex: s2.candidate.sdpMLineIndex, usernameFragment: s2.candidate.usernameFragment};
                  };
                }
                var p3 = e.getMediaSections(n2._localDescription.sdp);
                p3[s2.candidate.sdpMLineIndex] += c2 ? "a=end-of-candidates\r\n" : "a=" + s2.candidate.candidate + "\r\n", n2._localDescription.sdp = e.getDescription(n2._localDescription.sdp) + p3.join("");
                var l2 = n2.transceivers.every(function(e2) {
                  return e2.iceGatherer && e2.iceGatherer.state === "completed";
                });
                n2.iceGatheringState !== "gathering" && (n2.iceGatheringState = "gathering", n2._emitGatheringStateChange()), c2 || n2._dispatchEvent("icecandidate", s2), l2 && (n2._dispatchEvent("icecandidate", new Event("icecandidate")), n2.iceGatheringState = "complete", n2._emitGatheringStateChange());
              }
            }, c.setTimeout(function() {
              i2.forEach(function(e2) {
                a2.onlocalcandidate(e2);
              });
            }, 0);
          }
        }, f.prototype._createIceAndDtlsTransports = function() {
          var e2 = this, t2 = new c.RTCIceTransport(null);
          t2.onicestatechange = function() {
            e2._updateIceConnectionState(), e2._updateConnectionState();
          };
          var r2 = new c.RTCDtlsTransport(t2);
          return r2.ondtlsstatechange = function() {
            e2._updateConnectionState();
          }, r2.onerror = function() {
            Object.defineProperty(r2, "state", {value: "failed", writable: true}), e2._updateConnectionState();
          }, {iceTransport: t2, dtlsTransport: r2};
        }, f.prototype._disposeIceAndDtlsTransports = function(e2) {
          var t2 = this.transceivers[e2].iceGatherer;
          t2 && (delete t2.onlocalcandidate, delete this.transceivers[e2].iceGatherer);
          var r2 = this.transceivers[e2].iceTransport;
          r2 && (delete r2.onicestatechange, delete this.transceivers[e2].iceTransport);
          var n2 = this.transceivers[e2].dtlsTransport;
          n2 && (delete n2.ondtlsstatechange, delete n2.onerror, delete this.transceivers[e2].dtlsTransport);
        }, f.prototype._transceive = function(t2, r2, n2) {
          var i2 = a(t2.localCapabilities, t2.remoteCapabilities);
          r2 && t2.rtpSender && (i2.encodings = t2.sendEncodingParameters, i2.rtcp = {cname: e.localCName, compound: t2.rtcpParameters.compound}, t2.recvEncodingParameters.length && (i2.rtcp.ssrc = t2.recvEncodingParameters[0].ssrc), t2.rtpSender.send(i2)), n2 && t2.rtpReceiver && i2.codecs.length > 0 && (t2.kind === "video" && t2.recvEncodingParameters && d < 15019 && t2.recvEncodingParameters.forEach(function(e2) {
            delete e2.rtx;
          }), t2.recvEncodingParameters.length ? i2.encodings = t2.recvEncodingParameters : i2.encodings = [{}], i2.rtcp = {compound: t2.rtcpParameters.compound}, t2.rtcpParameters.cname && (i2.rtcp.cname = t2.rtcpParameters.cname), t2.sendEncodingParameters.length && (i2.rtcp.ssrc = t2.sendEncodingParameters[0].ssrc), t2.rtpReceiver.receive(i2));
        }, f.prototype.setLocalDescription = function(t2) {
          var r2, n2, s2 = this;
          if (["offer", "answer"].indexOf(t2.type) === -1)
            return Promise.reject(o("TypeError", 'Unsupported type "' + t2.type + '"'));
          if (!i("setLocalDescription", t2.type, s2.signalingState) || s2._isClosed)
            return Promise.reject(o("InvalidStateError", "Can not set local " + t2.type + " in state " + s2.signalingState));
          if (t2.type === "offer")
            r2 = e.splitSections(t2.sdp), n2 = r2.shift(), r2.forEach(function(t3, r3) {
              var n3 = e.parseRtpParameters(t3);
              s2.transceivers[r3].localCapabilities = n3;
            }), s2.transceivers.forEach(function(e2, t3) {
              s2._gather(e2.mid, t3);
            });
          else if (t2.type === "answer") {
            r2 = e.splitSections(s2._remoteDescription.sdp), n2 = r2.shift();
            var c2 = e.matchPrefix(n2, "a=ice-lite").length > 0;
            r2.forEach(function(t3, r3) {
              var i2 = s2.transceivers[r3], o2 = i2.iceGatherer, d2 = i2.iceTransport, p3 = i2.dtlsTransport, l2 = i2.localCapabilities, f2 = i2.remoteCapabilities;
              if (!(e.isRejected(t3) && e.matchPrefix(t3, "a=bundle-only").length === 0) && !i2.rejected) {
                var u2 = e.getIceParameters(t3, n2), v = e.getDtlsParameters(t3, n2);
                c2 && (v.role = "server"), s2.usingBundle && r3 !== 0 || (s2._gather(i2.mid, r3), d2.state === "new" && d2.start(o2, u2, c2 ? "controlling" : "controlled"), p3.state === "new" && p3.start(v));
                var h = a(l2, f2);
                s2._transceive(i2, h.codecs.length > 0, false);
              }
            });
          }
          return s2._localDescription = {type: t2.type, sdp: t2.sdp}, t2.type === "offer" ? s2._updateSignalingState("have-local-offer") : s2._updateSignalingState("stable"), Promise.resolve();
        }, f.prototype.setRemoteDescription = function(t2) {
          var r2 = this;
          if (["offer", "answer"].indexOf(t2.type) === -1)
            return Promise.reject(o("TypeError", 'Unsupported type "' + t2.type + '"'));
          if (!i("setRemoteDescription", t2.type, r2.signalingState) || r2._isClosed)
            return Promise.reject(o("InvalidStateError", "Can not set remote " + t2.type + " in state " + r2.signalingState));
          var n2 = {};
          r2.remoteStreams.forEach(function(e2) {
            n2[e2.id] = e2;
          });
          var f2 = [], u2 = e.splitSections(t2.sdp), v = u2.shift(), h = e.matchPrefix(v, "a=ice-lite").length > 0, m = e.matchPrefix(v, "a=group:BUNDLE ").length > 0;
          r2.usingBundle = m;
          var g = e.matchPrefix(v, "a=ice-options:")[0];
          return r2.canTrickleIceCandidates = !!g && g.substr(14).split(" ").indexOf("trickle") >= 0, u2.forEach(function(i2, o2) {
            var l2 = e.splitLines(i2), u3 = e.getKind(i2), g2 = e.isRejected(i2) && e.matchPrefix(i2, "a=bundle-only").length === 0, y = l2[0].substr(2).split(" ")[2], S = e.getDirection(i2, v), T = e.parseMsid(i2), E = e.getMid(i2) || e.generateIdentifier();
            if (g2 || u3 === "application" && (y === "DTLS/SCTP" || y === "UDP/DTLS/SCTP"))
              r2.transceivers[o2] = {mid: E, kind: u3, protocol: y, rejected: true};
            else {
              var C, P, w, R, _, k, b, x, D;
              !g2 && r2.transceivers[o2] && r2.transceivers[o2].rejected && (r2.transceivers[o2] = r2._createTransceiver(u3, true));
              var I, L, M = e.parseRtpParameters(i2);
              g2 || (I = e.getIceParameters(i2, v), (L = e.getDtlsParameters(i2, v)).role = "client"), b = e.parseRtpEncodingParameters(i2);
              var O = e.parseRtcpParameters(i2), G = e.matchPrefix(i2, "a=end-of-candidates", v).length > 0, j = e.matchPrefix(i2, "a=candidate:").map(function(t3) {
                return e.parseCandidate(t3);
              }).filter(function(e2) {
                return e2.component === 1;
              });
              if ((t2.type === "offer" || t2.type === "answer") && !g2 && m && o2 > 0 && r2.transceivers[o2] && (r2._disposeIceAndDtlsTransports(o2), r2.transceivers[o2].iceGatherer = r2.transceivers[0].iceGatherer, r2.transceivers[o2].iceTransport = r2.transceivers[0].iceTransport, r2.transceivers[o2].dtlsTransport = r2.transceivers[0].dtlsTransport, r2.transceivers[o2].rtpSender && r2.transceivers[o2].rtpSender.setTransport(r2.transceivers[0].dtlsTransport), r2.transceivers[o2].rtpReceiver && r2.transceivers[o2].rtpReceiver.setTransport(r2.transceivers[0].dtlsTransport)), t2.type !== "offer" || g2) {
                if (t2.type === "answer" && !g2) {
                  P = (C = r2.transceivers[o2]).iceGatherer, w = C.iceTransport, R = C.dtlsTransport, _ = C.rtpReceiver, k = C.sendEncodingParameters, x = C.localCapabilities, r2.transceivers[o2].recvEncodingParameters = b, r2.transceivers[o2].remoteCapabilities = M, r2.transceivers[o2].rtcpParameters = O, j.length && w.state === "new" && (!h && !G || m && o2 !== 0 ? j.forEach(function(e2) {
                    s(C.iceTransport, e2);
                  }) : w.setRemoteCandidates(j)), m && o2 !== 0 || (w.state === "new" && w.start(P, I, "controlling"), R.state === "new" && R.start(L)), !a(C.localCapabilities, C.remoteCapabilities).codecs.filter(function(e2) {
                    return e2.name.toLowerCase() === "rtx";
                  }).length && C.sendEncodingParameters[0].rtx && delete C.sendEncodingParameters[0].rtx, r2._transceive(C, S === "sendrecv" || S === "recvonly", S === "sendrecv" || S === "sendonly"), !_ || S !== "sendrecv" && S !== "sendonly" ? delete C.rtpReceiver : (D = _.track, T ? (n2[T.stream] || (n2[T.stream] = new c.MediaStream()), p2(D, n2[T.stream]), f2.push([D, _, n2[T.stream]])) : (n2.default || (n2.default = new c.MediaStream()), p2(D, n2.default), f2.push([D, _, n2.default])));
                }
              } else {
                (C = r2.transceivers[o2] || r2._createTransceiver(u3)).mid = E, C.iceGatherer || (C.iceGatherer = r2._createIceGatherer(o2, m)), j.length && C.iceTransport.state === "new" && (!G || m && o2 !== 0 ? j.forEach(function(e2) {
                  s(C.iceTransport, e2);
                }) : C.iceTransport.setRemoteCandidates(j)), x = c.RTCRtpReceiver.getCapabilities(u3), d < 15019 && (x.codecs = x.codecs.filter(function(e2) {
                  return e2.name !== "rtx";
                })), k = C.sendEncodingParameters || [{ssrc: 1001 * (2 * o2 + 2)}];
                var N, A = false;
                if (S === "sendrecv" || S === "sendonly") {
                  if (A = !C.rtpReceiver, _ = C.rtpReceiver || new c.RTCRtpReceiver(C.dtlsTransport, u3), A)
                    D = _.track, T && T.stream === "-" || (T ? (n2[T.stream] || (n2[T.stream] = new c.MediaStream(), Object.defineProperty(n2[T.stream], "id", {get: function() {
                      return T.stream;
                    }})), Object.defineProperty(D, "id", {get: function() {
                      return T.track;
                    }}), N = n2[T.stream]) : (n2.default || (n2.default = new c.MediaStream()), N = n2.default)), N && (p2(D, N), C.associatedRemoteMediaStreams.push(N)), f2.push([D, _, N]);
                } else
                  C.rtpReceiver && C.rtpReceiver.track && (C.associatedRemoteMediaStreams.forEach(function(e2) {
                    var t3, r3, n3 = e2.getTracks().find(function(e3) {
                      return e3.id === C.rtpReceiver.track.id;
                    });
                    n3 && (t3 = n3, (r3 = e2).removeTrack(t3), r3.dispatchEvent(new c.MediaStreamTrackEvent("removetrack", {track: t3})));
                  }), C.associatedRemoteMediaStreams = []);
                C.localCapabilities = x, C.remoteCapabilities = M, C.rtpReceiver = _, C.rtcpParameters = O, C.sendEncodingParameters = k, C.recvEncodingParameters = b, r2._transceive(r2.transceivers[o2], false, A);
              }
            }
          }), r2._dtlsRole === void 0 && (r2._dtlsRole = t2.type === "offer" ? "active" : "passive"), r2._remoteDescription = {type: t2.type, sdp: t2.sdp}, t2.type === "offer" ? r2._updateSignalingState("have-remote-offer") : r2._updateSignalingState("stable"), Object.keys(n2).forEach(function(e2) {
            var t3 = n2[e2];
            if (t3.getTracks().length) {
              if (r2.remoteStreams.indexOf(t3) === -1) {
                r2.remoteStreams.push(t3);
                var a2 = new Event("addstream");
                a2.stream = t3, c.setTimeout(function() {
                  r2._dispatchEvent("addstream", a2);
                });
              }
              f2.forEach(function(e3) {
                var n3 = e3[0], a3 = e3[1];
                t3.id === e3[2].id && l(r2, n3, a3, [t3]);
              });
            }
          }), f2.forEach(function(e2) {
            e2[2] || l(r2, e2[0], e2[1], []);
          }), c.setTimeout(function() {
            r2 && r2.transceivers && r2.transceivers.forEach(function(e2) {
              e2.iceTransport && e2.iceTransport.state === "new" && e2.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e2.iceTransport.addRemoteCandidate({}));
            });
          }, 4e3), Promise.resolve();
        }, f.prototype.close = function() {
          this.transceivers.forEach(function(e2) {
            e2.iceTransport && e2.iceTransport.stop(), e2.dtlsTransport && e2.dtlsTransport.stop(), e2.rtpSender && e2.rtpSender.stop(), e2.rtpReceiver && e2.rtpReceiver.stop();
          }), this._isClosed = true, this._updateSignalingState("closed");
        }, f.prototype._updateSignalingState = function(e2) {
          this.signalingState = e2;
          var t2 = new Event("signalingstatechange");
          this._dispatchEvent("signalingstatechange", t2);
        }, f.prototype._maybeFireNegotiationNeeded = function() {
          var e2 = this;
          this.signalingState === "stable" && this.needNegotiation !== true && (this.needNegotiation = true, c.setTimeout(function() {
            if (e2.needNegotiation) {
              e2.needNegotiation = false;
              var t2 = new Event("negotiationneeded");
              e2._dispatchEvent("negotiationneeded", t2);
            }
          }, 0));
        }, f.prototype._updateIceConnectionState = function() {
          var e2, t2 = {new: 0, closed: 0, checking: 0, connected: 0, completed: 0, disconnected: 0, failed: 0};
          if (this.transceivers.forEach(function(e3) {
            e3.iceTransport && !e3.rejected && t2[e3.iceTransport.state]++;
          }), e2 = "new", t2.failed > 0 ? e2 = "failed" : t2.checking > 0 ? e2 = "checking" : t2.disconnected > 0 ? e2 = "disconnected" : t2.new > 0 ? e2 = "new" : t2.connected > 0 ? e2 = "connected" : t2.completed > 0 && (e2 = "completed"), e2 !== this.iceConnectionState) {
            this.iceConnectionState = e2;
            var r2 = new Event("iceconnectionstatechange");
            this._dispatchEvent("iceconnectionstatechange", r2);
          }
        }, f.prototype._updateConnectionState = function() {
          var e2, t2 = {new: 0, closed: 0, connecting: 0, connected: 0, completed: 0, disconnected: 0, failed: 0};
          if (this.transceivers.forEach(function(e3) {
            e3.iceTransport && e3.dtlsTransport && !e3.rejected && (t2[e3.iceTransport.state]++, t2[e3.dtlsTransport.state]++);
          }), t2.connected += t2.completed, e2 = "new", t2.failed > 0 ? e2 = "failed" : t2.connecting > 0 ? e2 = "connecting" : t2.disconnected > 0 ? e2 = "disconnected" : t2.new > 0 ? e2 = "new" : t2.connected > 0 && (e2 = "connected"), e2 !== this.connectionState) {
            this.connectionState = e2;
            var r2 = new Event("connectionstatechange");
            this._dispatchEvent("connectionstatechange", r2);
          }
        }, f.prototype.createOffer = function() {
          var t2 = this;
          if (t2._isClosed)
            return Promise.reject(o("InvalidStateError", "Can not call createOffer after close"));
          var n2 = t2.transceivers.filter(function(e2) {
            return e2.kind === "audio";
          }).length, a2 = t2.transceivers.filter(function(e2) {
            return e2.kind === "video";
          }).length, i2 = arguments[0];
          if (i2) {
            if (i2.mandatory || i2.optional)
              throw new TypeError("Legacy mandatory/optional constraints not supported.");
            i2.offerToReceiveAudio !== void 0 && (n2 = i2.offerToReceiveAudio === true ? 1 : i2.offerToReceiveAudio === false ? 0 : i2.offerToReceiveAudio), i2.offerToReceiveVideo !== void 0 && (a2 = i2.offerToReceiveVideo === true ? 1 : i2.offerToReceiveVideo === false ? 0 : i2.offerToReceiveVideo);
          }
          for (t2.transceivers.forEach(function(e2) {
            e2.kind === "audio" ? --n2 < 0 && (e2.wantReceive = false) : e2.kind === "video" && --a2 < 0 && (e2.wantReceive = false);
          }); n2 > 0 || a2 > 0; )
            n2 > 0 && (t2._createTransceiver("audio"), n2--), a2 > 0 && (t2._createTransceiver("video"), a2--);
          var s2 = e.writeSessionBoilerplate(t2._sdpSessionId, t2._sdpSessionVersion++);
          t2.transceivers.forEach(function(r2, n3) {
            var a3 = r2.track, i3 = r2.kind, s3 = r2.mid || e.generateIdentifier();
            r2.mid = s3, r2.iceGatherer || (r2.iceGatherer = t2._createIceGatherer(n3, t2.usingBundle));
            var o2 = c.RTCRtpSender.getCapabilities(i3);
            d < 15019 && (o2.codecs = o2.codecs.filter(function(e2) {
              return e2.name !== "rtx";
            })), o2.codecs.forEach(function(e2) {
              e2.name === "H264" && e2.parameters["level-asymmetry-allowed"] === void 0 && (e2.parameters["level-asymmetry-allowed"] = "1"), r2.remoteCapabilities && r2.remoteCapabilities.codecs && r2.remoteCapabilities.codecs.forEach(function(t3) {
                e2.name.toLowerCase() === t3.name.toLowerCase() && e2.clockRate === t3.clockRate && (e2.preferredPayloadType = t3.payloadType);
              });
            }), o2.headerExtensions.forEach(function(e2) {
              (r2.remoteCapabilities && r2.remoteCapabilities.headerExtensions || []).forEach(function(t3) {
                e2.uri === t3.uri && (e2.id = t3.id);
              });
            });
            var p4 = r2.sendEncodingParameters || [{ssrc: 1001 * (2 * n3 + 1)}];
            a3 && d >= 15019 && i3 === "video" && !p4[0].rtx && (p4[0].rtx = {ssrc: p4[0].ssrc + 1}), r2.wantReceive && (r2.rtpReceiver = new c.RTCRtpReceiver(r2.dtlsTransport, i3)), r2.localCapabilities = o2, r2.sendEncodingParameters = p4;
          }), t2._config.bundlePolicy !== "max-compat" && (s2 += "a=group:BUNDLE " + t2.transceivers.map(function(e2) {
            return e2.mid;
          }).join(" ") + "\r\n"), s2 += "a=ice-options:trickle\r\n", t2.transceivers.forEach(function(n3, a3) {
            s2 += r(n3, n3.localCapabilities, "offer", n3.stream, t2._dtlsRole), s2 += "a=rtcp-rsize\r\n", !n3.iceGatherer || t2.iceGatheringState === "new" || a3 !== 0 && t2.usingBundle || (n3.iceGatherer.getLocalCandidates().forEach(function(t3) {
              t3.component = 1, s2 += "a=" + e.writeCandidate(t3) + "\r\n";
            }), n3.iceGatherer.state === "completed" && (s2 += "a=end-of-candidates\r\n"));
          });
          var p3 = new c.RTCSessionDescription({type: "offer", sdp: s2});
          return Promise.resolve(p3);
        }, f.prototype.createAnswer = function() {
          var t2 = this;
          if (t2._isClosed)
            return Promise.reject(o("InvalidStateError", "Can not call createAnswer after close"));
          if (t2.signalingState !== "have-remote-offer" && t2.signalingState !== "have-local-pranswer")
            return Promise.reject(o("InvalidStateError", "Can not call createAnswer in signalingState " + t2.signalingState));
          var n2 = e.writeSessionBoilerplate(t2._sdpSessionId, t2._sdpSessionVersion++);
          t2.usingBundle && (n2 += "a=group:BUNDLE " + t2.transceivers.map(function(e2) {
            return e2.mid;
          }).join(" ") + "\r\n"), n2 += "a=ice-options:trickle\r\n";
          var i2 = e.getMediaSections(t2._remoteDescription.sdp).length;
          t2.transceivers.forEach(function(e2, s3) {
            if (!(s3 + 1 > i2)) {
              if (e2.rejected)
                return e2.kind === "application" ? e2.protocol === "DTLS/SCTP" ? n2 += "m=application 0 DTLS/SCTP 5000\r\n" : n2 += "m=application 0 " + e2.protocol + " webrtc-datachannel\r\n" : e2.kind === "audio" ? n2 += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : e2.kind === "video" && (n2 += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void (n2 += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e2.mid + "\r\n");
              var o2;
              if (e2.stream)
                e2.kind === "audio" ? o2 = e2.stream.getAudioTracks()[0] : e2.kind === "video" && (o2 = e2.stream.getVideoTracks()[0]), o2 && d >= 15019 && e2.kind === "video" && !e2.sendEncodingParameters[0].rtx && (e2.sendEncodingParameters[0].rtx = {ssrc: e2.sendEncodingParameters[0].ssrc + 1});
              var c2 = a(e2.localCapabilities, e2.remoteCapabilities);
              !c2.codecs.filter(function(e3) {
                return e3.name.toLowerCase() === "rtx";
              }).length && e2.sendEncodingParameters[0].rtx && delete e2.sendEncodingParameters[0].rtx, n2 += r(e2, c2, "answer", e2.stream, t2._dtlsRole), e2.rtcpParameters && e2.rtcpParameters.reducedSize && (n2 += "a=rtcp-rsize\r\n");
            }
          });
          var s2 = new c.RTCSessionDescription({type: "answer", sdp: n2});
          return Promise.resolve(s2);
        }, f.prototype.addIceCandidate = function(t2) {
          var r2, n2 = this;
          return t2 && t2.sdpMLineIndex === void 0 && !t2.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function(a2, i2) {
            if (!n2._remoteDescription)
              return i2(o("InvalidStateError", "Can not add ICE candidate without a remote description"));
            if (t2 && t2.candidate !== "") {
              var c2 = t2.sdpMLineIndex;
              if (t2.sdpMid) {
                for (var d2 = 0; d2 < n2.transceivers.length; d2++)
                  if (n2.transceivers[d2].mid === t2.sdpMid) {
                    c2 = d2;
                    break;
                  }
              }
              var p3 = n2.transceivers[c2];
              if (!p3)
                return i2(o("OperationError", "Can not add ICE candidate"));
              if (p3.rejected)
                return a2();
              var l2 = Object.keys(t2.candidate).length > 0 ? e.parseCandidate(t2.candidate) : {};
              if (l2.protocol === "tcp" && (l2.port === 0 || l2.port === 9))
                return a2();
              if (l2.component && l2.component !== 1)
                return a2();
              if ((c2 === 0 || c2 > 0 && p3.iceTransport !== n2.transceivers[0].iceTransport) && !s(p3.iceTransport, l2))
                return i2(o("OperationError", "Can not add ICE candidate"));
              var f2 = t2.candidate.trim();
              f2.indexOf("a=") === 0 && (f2 = f2.substr(2)), (r2 = e.getMediaSections(n2._remoteDescription.sdp))[c2] += "a=" + (l2.type ? f2 : "end-of-candidates") + "\r\n", n2._remoteDescription.sdp = e.getDescription(n2._remoteDescription.sdp) + r2.join("");
            } else
              for (var u2 = 0; u2 < n2.transceivers.length && (n2.transceivers[u2].rejected || (n2.transceivers[u2].iceTransport.addRemoteCandidate({}), (r2 = e.getMediaSections(n2._remoteDescription.sdp))[u2] += "a=end-of-candidates\r\n", n2._remoteDescription.sdp = e.getDescription(n2._remoteDescription.sdp) + r2.join(""), !n2.usingBundle)); u2++)
                ;
            a2();
          });
        }, f.prototype.getStats = function(e2) {
          if (e2 && e2 instanceof c.MediaStreamTrack) {
            var t2 = null;
            if (this.transceivers.forEach(function(r3) {
              r3.rtpSender && r3.rtpSender.track === e2 ? t2 = r3.rtpSender : r3.rtpReceiver && r3.rtpReceiver.track === e2 && (t2 = r3.rtpReceiver);
            }), !t2)
              throw o("InvalidAccessError", "Invalid selector.");
            return t2.getStats();
          }
          var r2 = [];
          return this.transceivers.forEach(function(e3) {
            ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(t3) {
              e3[t3] && r2.push(e3[t3].getStats());
            });
          }), Promise.all(r2).then(function(e3) {
            var t3 = new Map();
            return e3.forEach(function(e4) {
              e4.forEach(function(e5) {
                t3.set(e5.id, e5);
              });
            }), t3;
          });
        };
        ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function(e2) {
          var r2 = c[e2];
          if (r2 && r2.prototype && r2.prototype.getStats) {
            var n2 = r2.prototype.getStats;
            r2.prototype.getStats = function() {
              return n2.apply(this).then(function(e3) {
                var r3 = new Map();
                return Object.keys(e3).forEach(function(n3) {
                  e3[n3].type = t(e3[n3]), r3.set(n3, e3[n3]);
                }), r3;
              });
            };
          }
        });
        var u = ["createOffer", "createAnswer"];
        return u.forEach(function(e2) {
          var t2 = f.prototype[e2];
          f.prototype[e2] = function() {
            var e3 = arguments;
            return typeof e3[0] == "function" || typeof e3[1] == "function" ? t2.apply(this, [arguments[2]]).then(function(t3) {
              typeof e3[0] == "function" && e3[0].apply(null, [t3]);
            }, function(t3) {
              typeof e3[1] == "function" && e3[1].apply(null, [t3]);
            }) : t2.apply(this, arguments);
          };
        }), (u = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function(e2) {
          var t2 = f.prototype[e2];
          f.prototype[e2] = function() {
            var e3 = arguments;
            return typeof e3[1] == "function" || typeof e3[2] == "function" ? t2.apply(this, arguments).then(function() {
              typeof e3[1] == "function" && e3[1].apply(null);
            }, function(t3) {
              typeof e3[2] == "function" && e3[2].apply(null, [t3]);
            }) : t2.apply(this, arguments);
          };
        }), ["getStats"].forEach(function(e2) {
          var t2 = f.prototype[e2];
          f.prototype[e2] = function() {
            var e3 = arguments;
            return typeof e3[1] == "function" ? t2.apply(this, arguments).then(function() {
              typeof e3[1] == "function" && e3[1].apply(null);
            }) : t2.apply(this, arguments);
          };
        }), f;
      };
    }, {sdp: "YHvh"}], YdKx: [function(require2, module2, exports2) {
      "use strict";
      function e(e2) {
        var r = e2 && e2.navigator, t = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
        r.mediaDevices.getUserMedia = function(e3) {
          return t(e3).catch(function(e4) {
            return Promise.reject(function(e5) {
              return {name: {PermissionDeniedError: "NotAllowedError"}[e5.name] || e5.name, message: e5.message, constraint: e5.constraint, toString: function() {
                return this.name;
              }};
            }(e4));
          });
        };
      }
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.shimGetUserMedia = e;
    }, {}], P3bV: [function(require2, module2, exports2) {
      "use strict";
      function e(e2) {
        "getDisplayMedia" in e2.navigator && e2.navigator.mediaDevices && (e2.navigator.mediaDevices && "getDisplayMedia" in e2.navigator.mediaDevices || (e2.navigator.mediaDevices.getDisplayMedia = e2.navigator.getDisplayMedia.bind(e2.navigator)));
      }
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.shimGetDisplayMedia = e;
    }, {}], XRic: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.shimPeerConnection = p2, exports2.shimReplaceTrack = a, Object.defineProperty(exports2, "shimGetUserMedia", {enumerable: true, get: function() {
        return n.shimGetUserMedia;
      }}), Object.defineProperty(exports2, "shimGetDisplayMedia", {enumerable: true, get: function() {
        return i.shimGetDisplayMedia;
      }});
      var e = s(require2("../utils")), t = require2("./filtericeservers"), r = o(require2("rtcpeerconnection-shim")), n = require2("./getusermedia"), i = require2("./getdisplaymedia");
      function o(e2) {
        return e2 && e2.__esModule ? e2 : {default: e2};
      }
      function c() {
        if (typeof WeakMap != "function")
          return null;
        var e2 = new WeakMap();
        return c = function() {
          return e2;
        }, e2;
      }
      function s(e2) {
        if (e2 && e2.__esModule)
          return e2;
        if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
          return {default: e2};
        var t2 = c();
        if (t2 && t2.has(e2))
          return t2.get(e2);
        var r2 = {}, n2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i2 in e2)
          if (Object.prototype.hasOwnProperty.call(e2, i2)) {
            var o2 = n2 ? Object.getOwnPropertyDescriptor(e2, i2) : null;
            o2 && (o2.get || o2.set) ? Object.defineProperty(r2, i2, o2) : r2[i2] = e2[i2];
          }
        return r2.default = e2, t2 && t2.set(e2, r2), r2;
      }
      function p2(n2, i2) {
        if (n2.RTCIceGatherer && (n2.RTCIceCandidate || (n2.RTCIceCandidate = function(e2) {
          return e2;
        }), n2.RTCSessionDescription || (n2.RTCSessionDescription = function(e2) {
          return e2;
        }), i2.version < 15025)) {
          var o2 = Object.getOwnPropertyDescriptor(n2.MediaStreamTrack.prototype, "enabled");
          Object.defineProperty(n2.MediaStreamTrack.prototype, "enabled", {set: function(e2) {
            o2.set.call(this, e2);
            var t2 = new Event("enabled");
            t2.enabled = e2, this.dispatchEvent(t2);
          }});
        }
        !n2.RTCRtpSender || "dtmf" in n2.RTCRtpSender.prototype || Object.defineProperty(n2.RTCRtpSender.prototype, "dtmf", {get: function() {
          return this._dtmf === void 0 && (this.track.kind === "audio" ? this._dtmf = new n2.RTCDtmfSender(this) : this.track.kind === "video" && (this._dtmf = null)), this._dtmf;
        }}), n2.RTCDtmfSender && !n2.RTCDTMFSender && (n2.RTCDTMFSender = n2.RTCDtmfSender);
        var c2 = (0, r.default)(n2, i2.version);
        n2.RTCPeerConnection = function(r2) {
          return r2 && r2.iceServers && (r2.iceServers = (0, t.filterIceServers)(r2.iceServers, i2.version), e.log("ICE servers after filtering:", r2.iceServers)), new c2(r2);
        }, n2.RTCPeerConnection.prototype = c2.prototype;
      }
      function a(e2) {
        !e2.RTCRtpSender || "replaceTrack" in e2.RTCRtpSender.prototype || (e2.RTCRtpSender.prototype.replaceTrack = e2.RTCRtpSender.prototype.setTrack);
      }
    }, {"../utils": "iSxC", "./filtericeservers": "NZ1C", "rtcpeerconnection-shim": "NJ2u", "./getusermedia": "YdKx", "./getdisplaymedia": "P3bV"}], GzSv: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.shimGetUserMedia = n;
      var e = o(require2("../utils"));
      function t() {
        if (typeof WeakMap != "function")
          return null;
        var e2 = new WeakMap();
        return t = function() {
          return e2;
        }, e2;
      }
      function o(e2) {
        if (e2 && e2.__esModule)
          return e2;
        if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
          return {default: e2};
        var o2 = t();
        if (o2 && o2.has(e2))
          return o2.get(e2);
        var r2 = {}, n2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i in e2)
          if (Object.prototype.hasOwnProperty.call(e2, i)) {
            var a = n2 ? Object.getOwnPropertyDescriptor(e2, i) : null;
            a && (a.get || a.set) ? Object.defineProperty(r2, i, a) : r2[i] = e2[i];
          }
        return r2.default = e2, o2 && o2.set(e2, r2), r2;
      }
      function r(e2) {
        return (r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(e2);
      }
      function n(t2, o2) {
        var n2 = t2 && t2.navigator, i = t2 && t2.MediaStreamTrack;
        if (n2.getUserMedia = function(t3, o3, r2) {
          e.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n2.mediaDevices.getUserMedia(t3).then(o3, r2);
        }, !(o2.version > 55 && "autoGainControl" in n2.mediaDevices.getSupportedConstraints())) {
          var a = function(e2, t3, o3) {
            t3 in e2 && !(o3 in e2) && (e2[o3] = e2[t3], delete e2[t3]);
          }, s = n2.mediaDevices.getUserMedia.bind(n2.mediaDevices);
          if (n2.mediaDevices.getUserMedia = function(e2) {
            return r(e2) === "object" && r(e2.audio) === "object" && (e2 = JSON.parse(JSON.stringify(e2)), a(e2.audio, "autoGainControl", "mozAutoGainControl"), a(e2.audio, "noiseSuppression", "mozNoiseSuppression")), s(e2);
          }, i && i.prototype.getSettings) {
            var p2 = i.prototype.getSettings;
            i.prototype.getSettings = function() {
              var e2 = p2.apply(this, arguments);
              return a(e2, "mozAutoGainControl", "autoGainControl"), a(e2, "mozNoiseSuppression", "noiseSuppression"), e2;
            };
          }
          if (i && i.prototype.applyConstraints) {
            var u = i.prototype.applyConstraints;
            i.prototype.applyConstraints = function(e2) {
              return this.kind === "audio" && r(e2) === "object" && (e2 = JSON.parse(JSON.stringify(e2)), a(e2, "autoGainControl", "mozAutoGainControl"), a(e2, "noiseSuppression", "mozNoiseSuppression")), u.apply(this, [e2]);
            };
          }
        }
      }
    }, {"../utils": "iSxC"}], UuGU: [function(require2, module2, exports2) {
      "use strict";
      function e(e2, i) {
        e2.navigator.mediaDevices && "getDisplayMedia" in e2.navigator.mediaDevices || e2.navigator.mediaDevices && (e2.navigator.mediaDevices.getDisplayMedia = function(a) {
          if (!a || !a.video) {
            var t = new DOMException("getDisplayMedia without video constraints is undefined");
            return t.name = "NotFoundError", t.code = 8, Promise.reject(t);
          }
          return a.video === true ? a.video = {mediaSource: i} : a.video.mediaSource = i, e2.navigator.mediaDevices.getUserMedia(a);
        });
      }
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.shimGetDisplayMedia = e;
    }, {}], Fzdr: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.shimOnTrack = s, exports2.shimPeerConnection = c, exports2.shimSenderGetStats = p2, exports2.shimReceiverGetStats = u, exports2.shimRemoveStream = f, exports2.shimRTCDataChannel = d, exports2.shimAddTransceiver = C, exports2.shimGetParameters = y, exports2.shimCreateOffer = l, exports2.shimCreateAnswer = m, Object.defineProperty(exports2, "shimGetUserMedia", {enumerable: true, get: function() {
        return t.shimGetUserMedia;
      }}), Object.defineProperty(exports2, "shimGetDisplayMedia", {enumerable: true, get: function() {
        return n.shimGetDisplayMedia;
      }});
      var e = o(require2("../utils")), t = require2("./getusermedia"), n = require2("./getdisplaymedia");
      function r() {
        if (typeof WeakMap != "function")
          return null;
        var e2 = new WeakMap();
        return r = function() {
          return e2;
        }, e2;
      }
      function o(e2) {
        if (e2 && e2.__esModule)
          return e2;
        if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
          return {default: e2};
        var t2 = r();
        if (t2 && t2.has(e2))
          return t2.get(e2);
        var n2 = {}, o2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i2 in e2)
          if (Object.prototype.hasOwnProperty.call(e2, i2)) {
            var a2 = o2 ? Object.getOwnPropertyDescriptor(e2, i2) : null;
            a2 && (a2.get || a2.set) ? Object.defineProperty(n2, i2, a2) : n2[i2] = e2[i2];
          }
        return n2.default = e2, t2 && t2.set(e2, n2), n2;
      }
      function i(e2, t2, n2) {
        return t2 in e2 ? Object.defineProperty(e2, t2, {value: n2, enumerable: true, configurable: true, writable: true}) : e2[t2] = n2, e2;
      }
      function a(e2) {
        return (a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(e2);
      }
      function s(e2) {
        a(e2) === "object" && e2.RTCTrackEvent && "receiver" in e2.RTCTrackEvent.prototype && !("transceiver" in e2.RTCTrackEvent.prototype) && Object.defineProperty(e2.RTCTrackEvent.prototype, "transceiver", {get: function() {
          return {receiver: this.receiver};
        }});
      }
      function c(e2, t2) {
        if (a(e2) === "object" && (e2.RTCPeerConnection || e2.mozRTCPeerConnection)) {
          !e2.RTCPeerConnection && e2.mozRTCPeerConnection && (e2.RTCPeerConnection = e2.mozRTCPeerConnection), t2.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t3) {
            var n3 = e2.RTCPeerConnection.prototype[t3], r3 = i({}, t3, function() {
              return arguments[0] = new (t3 === "addIceCandidate" ? e2.RTCIceCandidate : e2.RTCSessionDescription)(arguments[0]), n3.apply(this, arguments);
            });
            e2.RTCPeerConnection.prototype[t3] = r3[t3];
          });
          var n2 = {inboundrtp: "inbound-rtp", outboundrtp: "outbound-rtp", candidatepair: "candidate-pair", localcandidate: "local-candidate", remotecandidate: "remote-candidate"}, r2 = e2.RTCPeerConnection.prototype.getStats;
          e2.RTCPeerConnection.prototype.getStats = function() {
            var [e3, o2, i2] = arguments;
            return r2.apply(this, [e3 || null]).then(function(e4) {
              if (t2.version < 53 && !o2)
                try {
                  e4.forEach(function(e5) {
                    e5.type = n2[e5.type] || e5.type;
                  });
                } catch (r3) {
                  if (r3.name !== "TypeError")
                    throw r3;
                  e4.forEach(function(t3, r4) {
                    e4.set(r4, Object.assign({}, t3, {type: n2[t3.type] || t3.type}));
                  });
                }
              return e4;
            }).then(o2, i2);
          };
        }
      }
      function p2(e2) {
        if (a(e2) === "object" && e2.RTCPeerConnection && e2.RTCRtpSender && !(e2.RTCRtpSender && "getStats" in e2.RTCRtpSender.prototype)) {
          var t2 = e2.RTCPeerConnection.prototype.getSenders;
          t2 && (e2.RTCPeerConnection.prototype.getSenders = function() {
            var e3 = this, n3 = t2.apply(this, []);
            return n3.forEach(function(t3) {
              return t3._pc = e3;
            }), n3;
          });
          var n2 = e2.RTCPeerConnection.prototype.addTrack;
          n2 && (e2.RTCPeerConnection.prototype.addTrack = function() {
            var e3 = n2.apply(this, arguments);
            return e3._pc = this, e3;
          }), e2.RTCRtpSender.prototype.getStats = function() {
            return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
          };
        }
      }
      function u(t2) {
        if (a(t2) === "object" && t2.RTCPeerConnection && t2.RTCRtpSender && !(t2.RTCRtpSender && "getStats" in t2.RTCRtpReceiver.prototype)) {
          var n2 = t2.RTCPeerConnection.prototype.getReceivers;
          n2 && (t2.RTCPeerConnection.prototype.getReceivers = function() {
            var e2 = this, t3 = n2.apply(this, []);
            return t3.forEach(function(t4) {
              return t4._pc = e2;
            }), t3;
          }), e.wrapPeerConnectionEvent(t2, "track", function(e2) {
            return e2.receiver._pc = e2.srcElement, e2;
          }), t2.RTCRtpReceiver.prototype.getStats = function() {
            return this._pc.getStats(this.track);
          };
        }
      }
      function f(t2) {
        !t2.RTCPeerConnection || "removeStream" in t2.RTCPeerConnection.prototype || (t2.RTCPeerConnection.prototype.removeStream = function(t3) {
          var n2 = this;
          e.deprecated("removeStream", "removeTrack"), this.getSenders().forEach(function(e2) {
            e2.track && t3.getTracks().includes(e2.track) && n2.removeTrack(e2);
          });
        });
      }
      function d(e2) {
        e2.DataChannel && !e2.RTCDataChannel && (e2.RTCDataChannel = e2.DataChannel);
      }
      function C(e2) {
        if (a(e2) === "object" && e2.RTCPeerConnection) {
          var t2 = e2.RTCPeerConnection.prototype.addTransceiver;
          t2 && (e2.RTCPeerConnection.prototype.addTransceiver = function() {
            this.setParametersPromises = [];
            var e3 = arguments[1], n2 = e3 && "sendEncodings" in e3;
            n2 && e3.sendEncodings.forEach(function(e4) {
              if ("rid" in e4) {
                if (!/^[a-z0-9]{0,16}$/i.test(e4.rid))
                  throw new TypeError("Invalid RID value provided.");
              }
              if ("scaleResolutionDownBy" in e4 && !(parseFloat(e4.scaleResolutionDownBy) >= 1))
                throw new RangeError("scale_resolution_down_by must be >= 1.0");
              if ("maxFramerate" in e4 && !(parseFloat(e4.maxFramerate) >= 0))
                throw new RangeError("max_framerate must be >= 0.0");
            });
            var r2 = t2.apply(this, arguments);
            if (n2) {
              var {sender: o2} = r2, i2 = o2.getParameters();
              "encodings" in i2 && (i2.encodings.length !== 1 || Object.keys(i2.encodings[0]).length !== 0) || (i2.encodings = e3.sendEncodings, o2.sendEncodings = e3.sendEncodings, this.setParametersPromises.push(o2.setParameters(i2).then(function() {
                delete o2.sendEncodings;
              }).catch(function() {
                delete o2.sendEncodings;
              })));
            }
            return r2;
          });
        }
      }
      function y(e2) {
        if (a(e2) === "object" && e2.RTCRtpSender) {
          var t2 = e2.RTCRtpSender.prototype.getParameters;
          t2 && (e2.RTCRtpSender.prototype.getParameters = function() {
            var e3 = t2.apply(this, arguments);
            return "encodings" in e3 || (e3.encodings = [].concat(this.sendEncodings || [{}])), e3;
          });
        }
      }
      function l(e2) {
        if (a(e2) === "object" && e2.RTCPeerConnection) {
          var t2 = e2.RTCPeerConnection.prototype.createOffer;
          e2.RTCPeerConnection.prototype.createOffer = function() {
            var e3 = arguments, n2 = this;
            return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(function() {
              return t2.apply(n2, e3);
            }).finally(function() {
              n2.setParametersPromises = [];
            }) : t2.apply(this, arguments);
          };
        }
      }
      function m(e2) {
        if (a(e2) === "object" && e2.RTCPeerConnection) {
          var t2 = e2.RTCPeerConnection.prototype.createAnswer;
          e2.RTCPeerConnection.prototype.createAnswer = function() {
            var e3 = arguments, n2 = this;
            return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(function() {
              return t2.apply(n2, e3);
            }).finally(function() {
              n2.setParametersPromises = [];
            }) : t2.apply(this, arguments);
          };
        }
      }
    }, {"../utils": "iSxC", "./getusermedia": "GzSv", "./getdisplaymedia": "UuGU"}], t1lL: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.shimLocalStreamsAPI = n, exports2.shimRemoteStreamsAPI = i, exports2.shimCallbacksAPI = a, exports2.shimGetUserMedia = c, exports2.shimConstraints = s, exports2.shimRTCIceServerUrls = d, exports2.shimTrackEventTransceiver = f, exports2.shimCreateOfferLegacy = p2, exports2.shimAudioContext = u;
      var e = r(require2("../utils"));
      function t() {
        if (typeof WeakMap != "function")
          return null;
        var e2 = new WeakMap();
        return t = function() {
          return e2;
        }, e2;
      }
      function r(e2) {
        if (e2 && e2.__esModule)
          return e2;
        if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
          return {default: e2};
        var r2 = t();
        if (r2 && r2.has(e2))
          return r2.get(e2);
        var o2 = {}, n2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i2 in e2)
          if (Object.prototype.hasOwnProperty.call(e2, i2)) {
            var a2 = n2 ? Object.getOwnPropertyDescriptor(e2, i2) : null;
            a2 && (a2.get || a2.set) ? Object.defineProperty(o2, i2, a2) : o2[i2] = e2[i2];
          }
        return o2.default = e2, r2 && r2.set(e2, o2), o2;
      }
      function o(e2) {
        return (o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(e2);
      }
      function n(e2) {
        if (o(e2) === "object" && e2.RTCPeerConnection) {
          if ("getLocalStreams" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.getLocalStreams = function() {
            return this._localStreams || (this._localStreams = []), this._localStreams;
          }), !("addStream" in e2.RTCPeerConnection.prototype)) {
            var t2 = e2.RTCPeerConnection.prototype.addTrack;
            e2.RTCPeerConnection.prototype.addStream = function(e3) {
              var r2 = this;
              this._localStreams || (this._localStreams = []), this._localStreams.includes(e3) || this._localStreams.push(e3), e3.getAudioTracks().forEach(function(o2) {
                return t2.call(r2, o2, e3);
              }), e3.getVideoTracks().forEach(function(o2) {
                return t2.call(r2, o2, e3);
              });
            }, e2.RTCPeerConnection.prototype.addTrack = function(e3) {
              for (var r2 = this, o2 = arguments.length, n2 = new Array(o2 > 1 ? o2 - 1 : 0), i2 = 1; i2 < o2; i2++)
                n2[i2 - 1] = arguments[i2];
              return n2 && n2.forEach(function(e4) {
                r2._localStreams ? r2._localStreams.includes(e4) || r2._localStreams.push(e4) : r2._localStreams = [e4];
              }), t2.apply(this, arguments);
            };
          }
          "removeStream" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.removeStream = function(e3) {
            var t3 = this;
            this._localStreams || (this._localStreams = []);
            var r2 = this._localStreams.indexOf(e3);
            if (r2 !== -1) {
              this._localStreams.splice(r2, 1);
              var o2 = e3.getTracks();
              this.getSenders().forEach(function(e4) {
                o2.includes(e4.track) && t3.removeTrack(e4);
              });
            }
          });
        }
      }
      function i(e2) {
        if (o(e2) === "object" && e2.RTCPeerConnection && ("getRemoteStreams" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.getRemoteStreams = function() {
          return this._remoteStreams ? this._remoteStreams : [];
        }), !("onaddstream" in e2.RTCPeerConnection.prototype))) {
          Object.defineProperty(e2.RTCPeerConnection.prototype, "onaddstream", {get: function() {
            return this._onaddstream;
          }, set: function(e3) {
            var t3 = this;
            this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e3), this.addEventListener("track", this._onaddstreampoly = function(e4) {
              e4.streams.forEach(function(e5) {
                if (t3._remoteStreams || (t3._remoteStreams = []), !t3._remoteStreams.includes(e5)) {
                  t3._remoteStreams.push(e5);
                  var r2 = new Event("addstream");
                  r2.stream = e5, t3.dispatchEvent(r2);
                }
              });
            });
          }});
          var t2 = e2.RTCPeerConnection.prototype.setRemoteDescription;
          e2.RTCPeerConnection.prototype.setRemoteDescription = function() {
            var e3 = this;
            return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(t3) {
              t3.streams.forEach(function(t4) {
                if (e3._remoteStreams || (e3._remoteStreams = []), !(e3._remoteStreams.indexOf(t4) >= 0)) {
                  e3._remoteStreams.push(t4);
                  var r2 = new Event("addstream");
                  r2.stream = t4, e3.dispatchEvent(r2);
                }
              });
            }), t2.apply(e3, arguments);
          };
        }
      }
      function a(e2) {
        if (o(e2) === "object" && e2.RTCPeerConnection) {
          var t2 = e2.RTCPeerConnection.prototype, r2 = t2.createOffer, n2 = t2.createAnswer, i2 = t2.setLocalDescription, a2 = t2.setRemoteDescription, c2 = t2.addIceCandidate;
          t2.createOffer = function(e3, t3) {
            var o2 = arguments.length >= 2 ? arguments[2] : arguments[0], n3 = r2.apply(this, [o2]);
            return t3 ? (n3.then(e3, t3), Promise.resolve()) : n3;
          }, t2.createAnswer = function(e3, t3) {
            var r3 = arguments.length >= 2 ? arguments[2] : arguments[0], o2 = n2.apply(this, [r3]);
            return t3 ? (o2.then(e3, t3), Promise.resolve()) : o2;
          };
          var s2 = function(e3, t3, r3) {
            var o2 = i2.apply(this, [e3]);
            return r3 ? (o2.then(t3, r3), Promise.resolve()) : o2;
          };
          t2.setLocalDescription = s2, s2 = function(e3, t3, r3) {
            var o2 = a2.apply(this, [e3]);
            return r3 ? (o2.then(t3, r3), Promise.resolve()) : o2;
          }, t2.setRemoteDescription = s2, s2 = function(e3, t3, r3) {
            var o2 = c2.apply(this, [e3]);
            return r3 ? (o2.then(t3, r3), Promise.resolve()) : o2;
          }, t2.addIceCandidate = s2;
        }
      }
      function c(e2) {
        var t2 = e2 && e2.navigator;
        if (t2.mediaDevices && t2.mediaDevices.getUserMedia) {
          var r2 = t2.mediaDevices, o2 = r2.getUserMedia.bind(r2);
          t2.mediaDevices.getUserMedia = function(e3) {
            return o2(s(e3));
          };
        }
        !t2.getUserMedia && t2.mediaDevices && t2.mediaDevices.getUserMedia && (t2.getUserMedia = function(e3, r3, o3) {
          t2.mediaDevices.getUserMedia(e3).then(r3, o3);
        }.bind(t2));
      }
      function s(t2) {
        return t2 && t2.video !== void 0 ? Object.assign({}, t2, {video: e.compactObject(t2.video)}) : t2;
      }
      function d(t2) {
        if (t2.RTCPeerConnection) {
          var r2 = t2.RTCPeerConnection;
          t2.RTCPeerConnection = function(t3, o2) {
            if (t3 && t3.iceServers) {
              for (var n2 = [], i2 = 0; i2 < t3.iceServers.length; i2++) {
                var a2 = t3.iceServers[i2];
                !a2.hasOwnProperty("urls") && a2.hasOwnProperty("url") ? (e.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (a2 = JSON.parse(JSON.stringify(a2))).urls = a2.url, delete a2.url, n2.push(a2)) : n2.push(t3.iceServers[i2]);
              }
              t3.iceServers = n2;
            }
            return new r2(t3, o2);
          }, t2.RTCPeerConnection.prototype = r2.prototype, "generateCertificate" in r2 && Object.defineProperty(t2.RTCPeerConnection, "generateCertificate", {get: function() {
            return r2.generateCertificate;
          }});
        }
      }
      function f(e2) {
        o(e2) === "object" && e2.RTCTrackEvent && "receiver" in e2.RTCTrackEvent.prototype && !("transceiver" in e2.RTCTrackEvent.prototype) && Object.defineProperty(e2.RTCTrackEvent.prototype, "transceiver", {get: function() {
          return {receiver: this.receiver};
        }});
      }
      function p2(e2) {
        var t2 = e2.RTCPeerConnection.prototype.createOffer;
        e2.RTCPeerConnection.prototype.createOffer = function(e3) {
          if (e3) {
            e3.offerToReceiveAudio !== void 0 && (e3.offerToReceiveAudio = !!e3.offerToReceiveAudio);
            var r2 = this.getTransceivers().find(function(e4) {
              return e4.receiver.track.kind === "audio";
            });
            e3.offerToReceiveAudio === false && r2 ? r2.direction === "sendrecv" ? r2.setDirection ? r2.setDirection("sendonly") : r2.direction = "sendonly" : r2.direction === "recvonly" && (r2.setDirection ? r2.setDirection("inactive") : r2.direction = "inactive") : e3.offerToReceiveAudio !== true || r2 || this.addTransceiver("audio"), e3.offerToReceiveVideo !== void 0 && (e3.offerToReceiveVideo = !!e3.offerToReceiveVideo);
            var o2 = this.getTransceivers().find(function(e4) {
              return e4.receiver.track.kind === "video";
            });
            e3.offerToReceiveVideo === false && o2 ? o2.direction === "sendrecv" ? o2.setDirection ? o2.setDirection("sendonly") : o2.direction = "sendonly" : o2.direction === "recvonly" && (o2.setDirection ? o2.setDirection("inactive") : o2.direction = "inactive") : e3.offerToReceiveVideo !== true || o2 || this.addTransceiver("video");
          }
          return t2.apply(this, arguments);
        };
      }
      function u(e2) {
        o(e2) !== "object" || e2.AudioContext || (e2.AudioContext = e2.webkitAudioContext);
      }
    }, {"../utils": "iSxC"}], GOQK: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.shimRTCIceCandidate = a, exports2.shimMaxMessageSize = c, exports2.shimSendThrowTypeError = s, exports2.shimConnectionState = p2, exports2.removeExtmapAllowMixed = d, exports2.shimAddIceCandidateNullOrEmpty = u;
      var e = r(require2("sdp")), t = o(require2("./utils"));
      function n() {
        if (typeof WeakMap != "function")
          return null;
        var e2 = new WeakMap();
        return n = function() {
          return e2;
        }, e2;
      }
      function o(e2) {
        if (e2 && e2.__esModule)
          return e2;
        if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
          return {default: e2};
        var t2 = n();
        if (t2 && t2.has(e2))
          return t2.get(e2);
        var o2 = {}, r2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i2 in e2)
          if (Object.prototype.hasOwnProperty.call(e2, i2)) {
            var a2 = r2 ? Object.getOwnPropertyDescriptor(e2, i2) : null;
            a2 && (a2.get || a2.set) ? Object.defineProperty(o2, i2, a2) : o2[i2] = e2[i2];
          }
        return o2.default = e2, t2 && t2.set(e2, o2), o2;
      }
      function r(e2) {
        return e2 && e2.__esModule ? e2 : {default: e2};
      }
      function i(e2) {
        return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(e2);
      }
      function a(n2) {
        if (n2.RTCIceCandidate && !(n2.RTCIceCandidate && "foundation" in n2.RTCIceCandidate.prototype)) {
          var o2 = n2.RTCIceCandidate;
          n2.RTCIceCandidate = function(t2) {
            if (i(t2) === "object" && t2.candidate && t2.candidate.indexOf("a=") === 0 && ((t2 = JSON.parse(JSON.stringify(t2))).candidate = t2.candidate.substr(2)), t2.candidate && t2.candidate.length) {
              var n3 = new o2(t2), r2 = e.default.parseCandidate(t2.candidate), a2 = Object.assign(n3, r2);
              return a2.toJSON = function() {
                return {candidate: a2.candidate, sdpMid: a2.sdpMid, sdpMLineIndex: a2.sdpMLineIndex, usernameFragment: a2.usernameFragment};
              }, a2;
            }
            return new o2(t2);
          }, n2.RTCIceCandidate.prototype = o2.prototype, t.wrapPeerConnectionEvent(n2, "icecandidate", function(e2) {
            return e2.candidate && Object.defineProperty(e2, "candidate", {value: new n2.RTCIceCandidate(e2.candidate), writable: "false"}), e2;
          });
        }
      }
      function c(t2, n2) {
        if (t2.RTCPeerConnection) {
          "sctp" in t2.RTCPeerConnection.prototype || Object.defineProperty(t2.RTCPeerConnection.prototype, "sctp", {get: function() {
            return this._sctp === void 0 ? null : this._sctp;
          }});
          var o2 = t2.RTCPeerConnection.prototype.setRemoteDescription;
          t2.RTCPeerConnection.prototype.setRemoteDescription = function() {
            if (this._sctp = null, n2.browser === "chrome" && n2.version >= 76) {
              var {sdpSemantics: t3} = this.getConfiguration();
              t3 === "plan-b" && Object.defineProperty(this, "sctp", {get: function() {
                return this._sctp === void 0 ? null : this._sctp;
              }, enumerable: true, configurable: true});
            }
            if (function(t4) {
              if (!t4 || !t4.sdp)
                return false;
              var n3 = e.default.splitSections(t4.sdp);
              return n3.shift(), n3.some(function(t5) {
                var n4 = e.default.parseMLine(t5);
                return n4 && n4.kind === "application" && n4.protocol.indexOf("SCTP") !== -1;
              });
            }(arguments[0])) {
              var r2, i2 = function(e2) {
                var t4 = e2.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                if (t4 === null || t4.length < 2)
                  return -1;
                var n3 = parseInt(t4[1], 10);
                return n3 != n3 ? -1 : n3;
              }(arguments[0]), a2 = (p3 = i2, d2 = 65536, n2.browser === "firefox" && (d2 = n2.version < 57 ? p3 === -1 ? 16384 : 2147483637 : n2.version < 60 ? n2.version === 57 ? 65535 : 65536 : 2147483637), d2), c2 = function(t4, o3) {
                var r3 = 65536;
                n2.browser === "firefox" && n2.version === 57 && (r3 = 65535);
                var i3 = e.default.matchPrefix(t4.sdp, "a=max-message-size:");
                return i3.length > 0 ? r3 = parseInt(i3[0].substr(19), 10) : n2.browser === "firefox" && o3 !== -1 && (r3 = 2147483637), r3;
              }(arguments[0], i2);
              r2 = a2 === 0 && c2 === 0 ? Number.POSITIVE_INFINITY : a2 === 0 || c2 === 0 ? Math.max(a2, c2) : Math.min(a2, c2);
              var s2 = {};
              Object.defineProperty(s2, "maxMessageSize", {get: function() {
                return r2;
              }}), this._sctp = s2;
            }
            var p3, d2;
            return o2.apply(this, arguments);
          };
        }
      }
      function s(e2) {
        if (e2.RTCPeerConnection && "createDataChannel" in e2.RTCPeerConnection.prototype) {
          var n2 = e2.RTCPeerConnection.prototype.createDataChannel;
          e2.RTCPeerConnection.prototype.createDataChannel = function() {
            var e3 = n2.apply(this, arguments);
            return o2(e3, this), e3;
          }, t.wrapPeerConnectionEvent(e2, "datachannel", function(e3) {
            return o2(e3.channel, e3.target), e3;
          });
        }
        function o2(e3, t2) {
          var n3 = e3.send;
          e3.send = function() {
            var o3 = arguments[0], r2 = o3.length || o3.size || o3.byteLength;
            if (e3.readyState === "open" && t2.sctp && r2 > t2.sctp.maxMessageSize)
              throw new TypeError("Message too large (can send a maximum of " + t2.sctp.maxMessageSize + " bytes)");
            return n3.apply(e3, arguments);
          };
        }
      }
      function p2(e2) {
        if (e2.RTCPeerConnection && !("connectionState" in e2.RTCPeerConnection.prototype)) {
          var t2 = e2.RTCPeerConnection.prototype;
          Object.defineProperty(t2, "connectionState", {get: function() {
            return {completed: "connected", checking: "connecting"}[this.iceConnectionState] || this.iceConnectionState;
          }, enumerable: true, configurable: true}), Object.defineProperty(t2, "onconnectionstatechange", {get: function() {
            return this._onconnectionstatechange || null;
          }, set: function(e3) {
            this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), e3 && this.addEventListener("connectionstatechange", this._onconnectionstatechange = e3);
          }, enumerable: true, configurable: true}), ["setLocalDescription", "setRemoteDescription"].forEach(function(e3) {
            var n2 = t2[e3];
            t2[e3] = function() {
              return this._connectionstatechangepoly || (this._connectionstatechangepoly = function(e4) {
                var t3 = e4.target;
                if (t3._lastConnectionState !== t3.connectionState) {
                  t3._lastConnectionState = t3.connectionState;
                  var n3 = new Event("connectionstatechange", e4);
                  t3.dispatchEvent(n3);
                }
                return e4;
              }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n2.apply(this, arguments);
            };
          });
        }
      }
      function d(e2, t2) {
        if (e2.RTCPeerConnection && !(t2.browser === "chrome" && t2.version >= 71 || t2.browser === "safari" && t2.version >= 605)) {
          var n2 = e2.RTCPeerConnection.prototype.setRemoteDescription;
          e2.RTCPeerConnection.prototype.setRemoteDescription = function(t3) {
            if (t3 && t3.sdp && t3.sdp.indexOf("\na=extmap-allow-mixed") !== -1) {
              var o2 = t3.sdp.split("\n").filter(function(e3) {
                return e3.trim() !== "a=extmap-allow-mixed";
              }).join("\n");
              e2.RTCSessionDescription && t3 instanceof e2.RTCSessionDescription ? arguments[0] = new e2.RTCSessionDescription({type: t3.type, sdp: o2}) : t3.sdp = o2;
            }
            return n2.apply(this, arguments);
          };
        }
      }
      function u(e2, t2) {
        if (e2.RTCPeerConnection && e2.RTCPeerConnection.prototype) {
          var n2 = e2.RTCPeerConnection.prototype.addIceCandidate;
          n2 && n2.length !== 0 && (e2.RTCPeerConnection.prototype.addIceCandidate = function() {
            return arguments[0] ? (t2.browser === "chrome" && t2.version < 78 || t2.browser === "firefox" && t2.version < 68 || t2.browser === "safari") && arguments[0] && arguments[0].candidate === "" ? Promise.resolve() : n2.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
          });
        }
      }
    }, {sdp: "YHvh", "./utils": "iSxC"}], KtlG: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.adapterFactory = o;
      var e = m(require2("./utils")), i = m(require2("./chrome/chrome_shim")), r = m(require2("./edge/edge_shim")), s = m(require2("./firefox/firefox_shim")), t = m(require2("./safari/safari_shim")), a = m(require2("./common_shim"));
      function n() {
        if (typeof WeakMap != "function")
          return null;
        var e2 = new WeakMap();
        return n = function() {
          return e2;
        }, e2;
      }
      function m(e2) {
        if (e2 && e2.__esModule)
          return e2;
        if (e2 === null || typeof e2 != "object" && typeof e2 != "function")
          return {default: e2};
        var i2 = n();
        if (i2 && i2.has(e2))
          return i2.get(e2);
        var r2 = {}, s2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var t2 in e2)
          if (Object.prototype.hasOwnProperty.call(e2, t2)) {
            var a2 = s2 ? Object.getOwnPropertyDescriptor(e2, t2) : null;
            a2 && (a2.get || a2.set) ? Object.defineProperty(r2, t2, a2) : r2[t2] = e2[t2];
          }
        return r2.default = e2, i2 && i2.set(e2, r2), r2;
      }
      function o() {
        var {window: n2} = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, m2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {shimChrome: true, shimFirefox: true, shimEdge: true, shimSafari: true}, o2 = e.log, h = e.detectBrowser(n2), d = {browserDetails: h, commonShim: a, extractVersion: e.extractVersion, disableLog: e.disableLog, disableWarnings: e.disableWarnings};
        switch (h.browser) {
          case "chrome":
            if (!i || !i.shimPeerConnection || !m2.shimChrome)
              return o2("Chrome shim is not included in this adapter release."), d;
            if (h.version === null)
              return o2("Chrome shim can not determine version, not shimming."), d;
            o2("adapter.js shimming chrome."), d.browserShim = i, a.shimAddIceCandidateNullOrEmpty(n2, h), i.shimGetUserMedia(n2, h), i.shimMediaStream(n2, h), i.shimPeerConnection(n2, h), i.shimOnTrack(n2, h), i.shimAddTrackRemoveTrack(n2, h), i.shimGetSendersWithDtmf(n2, h), i.shimGetStats(n2, h), i.shimSenderReceiverGetStats(n2, h), i.fixNegotiationNeeded(n2, h), a.shimRTCIceCandidate(n2, h), a.shimConnectionState(n2, h), a.shimMaxMessageSize(n2, h), a.shimSendThrowTypeError(n2, h), a.removeExtmapAllowMixed(n2, h);
            break;
          case "firefox":
            if (!s || !s.shimPeerConnection || !m2.shimFirefox)
              return o2("Firefox shim is not included in this adapter release."), d;
            o2("adapter.js shimming firefox."), d.browserShim = s, a.shimAddIceCandidateNullOrEmpty(n2, h), s.shimGetUserMedia(n2, h), s.shimPeerConnection(n2, h), s.shimOnTrack(n2, h), s.shimRemoveStream(n2, h), s.shimSenderGetStats(n2, h), s.shimReceiverGetStats(n2, h), s.shimRTCDataChannel(n2, h), s.shimAddTransceiver(n2, h), s.shimGetParameters(n2, h), s.shimCreateOffer(n2, h), s.shimCreateAnswer(n2, h), a.shimRTCIceCandidate(n2, h), a.shimConnectionState(n2, h), a.shimMaxMessageSize(n2, h), a.shimSendThrowTypeError(n2, h);
            break;
          case "edge":
            if (!r || !r.shimPeerConnection || !m2.shimEdge)
              return o2("MS edge shim is not included in this adapter release."), d;
            o2("adapter.js shimming edge."), d.browserShim = r, r.shimGetUserMedia(n2, h), r.shimGetDisplayMedia(n2, h), r.shimPeerConnection(n2, h), r.shimReplaceTrack(n2, h), a.shimMaxMessageSize(n2, h), a.shimSendThrowTypeError(n2, h);
            break;
          case "safari":
            if (!t || !m2.shimSafari)
              return o2("Safari shim is not included in this adapter release."), d;
            o2("adapter.js shimming safari."), d.browserShim = t, a.shimAddIceCandidateNullOrEmpty(n2, h), t.shimRTCIceServerUrls(n2, h), t.shimCreateOfferLegacy(n2, h), t.shimCallbacksAPI(n2, h), t.shimLocalStreamsAPI(n2, h), t.shimRemoteStreamsAPI(n2, h), t.shimTrackEventTransceiver(n2, h), t.shimGetUserMedia(n2, h), t.shimAudioContext(n2, h), a.shimRTCIceCandidate(n2, h), a.shimMaxMessageSize(n2, h), a.shimSendThrowTypeError(n2, h), a.removeExtmapAllowMixed(n2, h);
            break;
          default:
            o2("Unsupported browser!");
        }
        return d;
      }
    }, {"./utils": "iSxC", "./chrome/chrome_shim": "uI5X", "./edge/edge_shim": "XRic", "./firefox/firefox_shim": "Fzdr", "./safari/safari_shim": "t1lL", "./common_shim": "GOQK"}], tI1X: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.default = void 0;
      var e = require2("./adapter_factory.js"), t = (0, e.adapterFactory)({window: typeof window == "undefined" ? void 0 : window}), d = t;
      exports2.default = d;
    }, {"./adapter_factory.js": "KtlG"}], sXtV: [function(require2, module2, exports2) {
      "use strict";
      var e = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : {default: e2};
      };
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.webRTCAdapter = void 0;
      var t = e(require2("webrtc-adapter"));
      exports2.webRTCAdapter = t.default;
    }, {"webrtc-adapter": "tI1X"}], I31f: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.Supports = void 0;
      var r = require2("./adapter");
      exports2.Supports = new (function() {
        function e() {
          this.isIOS = ["iPad", "iPhone", "iPod"].includes(navigator.platform), this.supportedBrowsers = ["firefox", "chrome", "safari"], this.minFirefoxVersion = 59, this.minChromeVersion = 72, this.minSafariVersion = 605;
        }
        return e.prototype.isWebRTCSupported = function() {
          return typeof RTCPeerConnection != "undefined";
        }, e.prototype.isBrowserSupported = function() {
          var r2 = this.getBrowser(), e2 = this.getVersion();
          return !!this.supportedBrowsers.includes(r2) && (r2 === "chrome" ? e2 >= this.minChromeVersion : r2 === "firefox" ? e2 >= this.minFirefoxVersion : r2 === "safari" && (!this.isIOS && e2 >= this.minSafariVersion));
        }, e.prototype.getBrowser = function() {
          return r.webRTCAdapter.browserDetails.browser;
        }, e.prototype.getVersion = function() {
          return r.webRTCAdapter.browserDetails.version || 0;
        }, e.prototype.isUnifiedPlanSupported = function() {
          var e2, i = this.getBrowser(), t = r.webRTCAdapter.browserDetails.version || 0;
          if (i === "chrome" && t < 72)
            return false;
          if (i === "firefox" && t >= 59)
            return true;
          if (!(window.RTCRtpTransceiver && "currentDirection" in RTCRtpTransceiver.prototype))
            return false;
          var o = false;
          try {
            (e2 = new RTCPeerConnection()).addTransceiver("audio"), o = true;
          } catch (s) {
          } finally {
            e2 && e2.close();
          }
          return o;
        }, e.prototype.toString = function() {
          return "Supports: \n    browser:" + this.getBrowser() + " \n    version:" + this.getVersion() + " \n    isIOS:" + this.isIOS + " \n    isWebRTCSupported:" + this.isWebRTCSupported() + " \n    isBrowserSupported:" + this.isBrowserSupported() + " \n    isUnifiedPlanSupported:" + this.isUnifiedPlanSupported();
        }, e;
      }())();
    }, {"./adapter": "sXtV"}], BHXf: [function(require2, module2, exports2) {
      "use strict";
      var e = this && this.__createBinding || (Object.create ? function(e2, t2, r2, o2) {
        o2 === void 0 && (o2 = r2), Object.defineProperty(e2, o2, {enumerable: true, get: function() {
          return t2[r2];
        }});
      } : function(e2, t2, r2, o2) {
        o2 === void 0 && (o2 = r2), e2[o2] = t2[r2];
      }), t = this && this.__setModuleDefault || (Object.create ? function(e2, t2) {
        Object.defineProperty(e2, "default", {enumerable: true, value: t2});
      } : function(e2, t2) {
        e2.default = t2;
      }), r = this && this.__importStar || function(r2) {
        if (r2 && r2.__esModule)
          return r2;
        var o2 = {};
        if (r2 != null)
          for (var n2 in r2)
            n2 !== "default" && Object.prototype.hasOwnProperty.call(r2, n2) && e(o2, r2, n2);
        return t(o2, r2), o2;
      };
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.util = void 0;
      var o = r(require2("peerjs-js-binarypack")), n = require2("./supports"), i = {iceServers: [{urls: "stun:stun.l.google.com:19302"}, {urls: "turn:0.peerjs.com:3478", username: "peerjs", credential: "peerjsp"}], sdpSemantics: "unified-plan"};
      exports2.util = new (function() {
        function e2() {
          this.CLOUD_HOST = "0.peerjs.com", this.CLOUD_PORT = 443, this.chunkedBrowsers = {Chrome: 1, chrome: 1}, this.chunkedMTU = 16300, this.defaultConfig = i, this.browser = n.Supports.getBrowser(), this.browserVersion = n.Supports.getVersion(), this.supports = function() {
            var e3, t2 = {browser: n.Supports.isBrowserSupported(), webRTC: n.Supports.isWebRTCSupported(), audioVideo: false, data: false, binaryBlob: false, reliable: false};
            if (!t2.webRTC)
              return t2;
            try {
              e3 = new RTCPeerConnection(i), t2.audioVideo = true;
              var r2 = void 0;
              try {
                r2 = e3.createDataChannel("_PEERJSTEST", {ordered: true}), t2.data = true, t2.reliable = !!r2.ordered;
                try {
                  r2.binaryType = "blob", t2.binaryBlob = !n.Supports.isIOS;
                } catch (o2) {
                }
              } catch (o2) {
              } finally {
                r2 && r2.close();
              }
            } catch (o2) {
            } finally {
              e3 && e3.close();
            }
            return t2;
          }(), this.pack = o.pack, this.unpack = o.unpack, this._dataCount = 1;
        }
        return e2.prototype.noop = function() {
        }, e2.prototype.validateId = function(e3) {
          return !e3 || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(e3);
        }, e2.prototype.chunk = function(e3) {
          for (var t2 = [], r2 = e3.size, o2 = Math.ceil(r2 / exports2.util.chunkedMTU), n2 = 0, i2 = 0; i2 < r2; ) {
            var a = Math.min(r2, i2 + exports2.util.chunkedMTU), u = e3.slice(i2, a), s = {__peerData: this._dataCount, n: n2, data: u, total: o2};
            t2.push(s), i2 = a, n2++;
          }
          return this._dataCount++, t2;
        }, e2.prototype.blobToArrayBuffer = function(e3, t2) {
          var r2 = new FileReader();
          return r2.onload = function(e4) {
            e4.target && t2(e4.target.result);
          }, r2.readAsArrayBuffer(e3), r2;
        }, e2.prototype.binaryStringToArrayBuffer = function(e3) {
          for (var t2 = new Uint8Array(e3.length), r2 = 0; r2 < e3.length; r2++)
            t2[r2] = 255 & e3.charCodeAt(r2);
          return t2.buffer;
        }, e2.prototype.randomToken = function() {
          return Math.random().toString(36).substr(2);
        }, e2.prototype.isSecure = function() {
          return location.protocol === "https:";
        }, e2;
      }())();
    }, {"peerjs-js-binarypack": "kdPp", "./supports": "I31f"}], JJlS: [function(require2, module2, exports2) {
      "use strict";
      var e = Object.prototype.hasOwnProperty, t = "~";
      function n() {
      }
      function r(e2, t2, n2) {
        this.fn = e2, this.context = t2, this.once = n2 || false;
      }
      function o(e2, n2, o2, s2, i2) {
        if (typeof o2 != "function")
          throw new TypeError("The listener must be a function");
        var c = new r(o2, s2 || e2, i2), f = t ? t + n2 : n2;
        return e2._events[f] ? e2._events[f].fn ? e2._events[f] = [e2._events[f], c] : e2._events[f].push(c) : (e2._events[f] = c, e2._eventsCount++), e2;
      }
      function s(e2, t2) {
        --e2._eventsCount == 0 ? e2._events = new n() : delete e2._events[t2];
      }
      function i() {
        this._events = new n(), this._eventsCount = 0;
      }
      Object.create && (n.prototype = Object.create(null), new n().__proto__ || (t = false)), i.prototype.eventNames = function() {
        var n2, r2, o2 = [];
        if (this._eventsCount === 0)
          return o2;
        for (r2 in n2 = this._events)
          e.call(n2, r2) && o2.push(t ? r2.slice(1) : r2);
        return Object.getOwnPropertySymbols ? o2.concat(Object.getOwnPropertySymbols(n2)) : o2;
      }, i.prototype.listeners = function(e2) {
        var n2 = t ? t + e2 : e2, r2 = this._events[n2];
        if (!r2)
          return [];
        if (r2.fn)
          return [r2.fn];
        for (var o2 = 0, s2 = r2.length, i2 = new Array(s2); o2 < s2; o2++)
          i2[o2] = r2[o2].fn;
        return i2;
      }, i.prototype.listenerCount = function(e2) {
        var n2 = t ? t + e2 : e2, r2 = this._events[n2];
        return r2 ? r2.fn ? 1 : r2.length : 0;
      }, i.prototype.emit = function(e2, n2, r2, o2, s2, i2) {
        var c = t ? t + e2 : e2;
        if (!this._events[c])
          return false;
        var f, u, a = this._events[c], l = arguments.length;
        if (a.fn) {
          switch (a.once && this.removeListener(e2, a.fn, void 0, true), l) {
            case 1:
              return a.fn.call(a.context), true;
            case 2:
              return a.fn.call(a.context, n2), true;
            case 3:
              return a.fn.call(a.context, n2, r2), true;
            case 4:
              return a.fn.call(a.context, n2, r2, o2), true;
            case 5:
              return a.fn.call(a.context, n2, r2, o2, s2), true;
            case 6:
              return a.fn.call(a.context, n2, r2, o2, s2, i2), true;
          }
          for (u = 1, f = new Array(l - 1); u < l; u++)
            f[u - 1] = arguments[u];
          a.fn.apply(a.context, f);
        } else {
          var v, h = a.length;
          for (u = 0; u < h; u++)
            switch (a[u].once && this.removeListener(e2, a[u].fn, void 0, true), l) {
              case 1:
                a[u].fn.call(a[u].context);
                break;
              case 2:
                a[u].fn.call(a[u].context, n2);
                break;
              case 3:
                a[u].fn.call(a[u].context, n2, r2);
                break;
              case 4:
                a[u].fn.call(a[u].context, n2, r2, o2);
                break;
              default:
                if (!f)
                  for (v = 1, f = new Array(l - 1); v < l; v++)
                    f[v - 1] = arguments[v];
                a[u].fn.apply(a[u].context, f);
            }
        }
        return true;
      }, i.prototype.on = function(e2, t2, n2) {
        return o(this, e2, t2, n2, false);
      }, i.prototype.once = function(e2, t2, n2) {
        return o(this, e2, t2, n2, true);
      }, i.prototype.removeListener = function(e2, n2, r2, o2) {
        var i2 = t ? t + e2 : e2;
        if (!this._events[i2])
          return this;
        if (!n2)
          return s(this, i2), this;
        var c = this._events[i2];
        if (c.fn)
          c.fn !== n2 || o2 && !c.once || r2 && c.context !== r2 || s(this, i2);
        else {
          for (var f = 0, u = [], a = c.length; f < a; f++)
            (c[f].fn !== n2 || o2 && !c[f].once || r2 && c[f].context !== r2) && u.push(c[f]);
          u.length ? this._events[i2] = u.length === 1 ? u[0] : u : s(this, i2);
        }
        return this;
      }, i.prototype.removeAllListeners = function(e2) {
        var r2;
        return e2 ? (r2 = t ? t + e2 : e2, this._events[r2] && s(this, r2)) : (this._events = new n(), this._eventsCount = 0), this;
      }, i.prototype.off = i.prototype.removeListener, i.prototype.addListener = i.prototype.on, i.prefixed = t, i.EventEmitter = i, typeof module2 != "undefined" && (module2.exports = i);
    }, {}], WOs9: [function(require2, module2, exports2) {
      "use strict";
      var r = this && this.__read || function(r2, e2) {
        var o2 = typeof Symbol == "function" && r2[Symbol.iterator];
        if (!o2)
          return r2;
        var t2, n2, l = o2.call(r2), i = [];
        try {
          for (; (e2 === void 0 || e2-- > 0) && !(t2 = l.next()).done; )
            i.push(t2.value);
        } catch (s) {
          n2 = {error: s};
        } finally {
          try {
            t2 && !t2.done && (o2 = l.return) && o2.call(l);
          } finally {
            if (n2)
              throw n2.error;
          }
        }
        return i;
      }, e = this && this.__spreadArray || function(r2, e2) {
        for (var o2 = 0, t2 = e2.length, n2 = r2.length; o2 < t2; o2++, n2++)
          r2[n2] = e2[o2];
        return r2;
      };
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.LogLevel = void 0;
      var o, t = "PeerJS: ";
      !function(r2) {
        r2[r2.Disabled = 0] = "Disabled", r2[r2.Errors = 1] = "Errors", r2[r2.Warnings = 2] = "Warnings", r2[r2.All = 3] = "All";
      }(o = exports2.LogLevel || (exports2.LogLevel = {}));
      var n = function() {
        function n2() {
          this._logLevel = o.Disabled;
        }
        return Object.defineProperty(n2.prototype, "logLevel", {get: function() {
          return this._logLevel;
        }, set: function(r2) {
          this._logLevel = r2;
        }, enumerable: false, configurable: true}), n2.prototype.log = function() {
          for (var t2 = [], n3 = 0; n3 < arguments.length; n3++)
            t2[n3] = arguments[n3];
          this._logLevel >= o.All && this._print.apply(this, e([o.All], r(t2)));
        }, n2.prototype.warn = function() {
          for (var t2 = [], n3 = 0; n3 < arguments.length; n3++)
            t2[n3] = arguments[n3];
          this._logLevel >= o.Warnings && this._print.apply(this, e([o.Warnings], r(t2)));
        }, n2.prototype.error = function() {
          for (var t2 = [], n3 = 0; n3 < arguments.length; n3++)
            t2[n3] = arguments[n3];
          this._logLevel >= o.Errors && this._print.apply(this, e([o.Errors], r(t2)));
        }, n2.prototype.setLogFunction = function(r2) {
          this._print = r2;
        }, n2.prototype._print = function(n3) {
          for (var l = [], i = 1; i < arguments.length; i++)
            l[i - 1] = arguments[i];
          var s = e([t], r(l));
          for (var a in s)
            s[a] instanceof Error && (s[a] = "(" + s[a].name + ") " + s[a].message);
          n3 >= o.All ? console.log.apply(console, e([], r(s))) : n3 >= o.Warnings ? console.warn.apply(console, e(["WARNING"], r(s))) : n3 >= o.Errors && console.error.apply(console, e(["ERROR"], r(s)));
        }, n2;
      }();
      exports2.default = new n();
    }, {}], ZRYf: [function(require2, module2, exports2) {
      "use strict";
      var e, r, o, n, t, a, i;
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.ServerMessageType = exports2.SocketEventType = exports2.SerializationType = exports2.PeerErrorType = exports2.PeerEventType = exports2.ConnectionType = exports2.ConnectionEventType = void 0, function(e2) {
        e2.Open = "open", e2.Stream = "stream", e2.Data = "data", e2.Close = "close", e2.Error = "error", e2.IceStateChanged = "iceStateChanged";
      }(e = exports2.ConnectionEventType || (exports2.ConnectionEventType = {})), function(e2) {
        e2.Data = "data", e2.Media = "media";
      }(r = exports2.ConnectionType || (exports2.ConnectionType = {})), function(e2) {
        e2.Open = "open", e2.Close = "close", e2.Connection = "connection", e2.Call = "call", e2.Disconnected = "disconnected", e2.Error = "error";
      }(o = exports2.PeerEventType || (exports2.PeerEventType = {})), function(e2) {
        e2.BrowserIncompatible = "browser-incompatible", e2.Disconnected = "disconnected", e2.InvalidID = "invalid-id", e2.InvalidKey = "invalid-key", e2.Network = "network", e2.PeerUnavailable = "peer-unavailable", e2.SslUnavailable = "ssl-unavailable", e2.ServerError = "server-error", e2.SocketError = "socket-error", e2.SocketClosed = "socket-closed", e2.UnavailableID = "unavailable-id", e2.WebRTC = "webrtc";
      }(n = exports2.PeerErrorType || (exports2.PeerErrorType = {})), function(e2) {
        e2.Binary = "binary", e2.BinaryUTF8 = "binary-utf8", e2.JSON = "json";
      }(t = exports2.SerializationType || (exports2.SerializationType = {})), function(e2) {
        e2.Message = "message", e2.Disconnected = "disconnected", e2.Error = "error", e2.Close = "close";
      }(a = exports2.SocketEventType || (exports2.SocketEventType = {})), function(e2) {
        e2.Heartbeat = "HEARTBEAT", e2.Candidate = "CANDIDATE", e2.Offer = "OFFER", e2.Answer = "ANSWER", e2.Open = "OPEN", e2.Error = "ERROR", e2.IdTaken = "ID-TAKEN", e2.InvalidKey = "INVALID-KEY", e2.Leave = "LEAVE", e2.Expire = "EXPIRE";
      }(i = exports2.ServerMessageType || (exports2.ServerMessageType = {}));
    }, {}], wJlv: [function(require2, module2, exports2) {
      "use strict";
      var e = this && this.__extends || function() {
        var e2 = function(t2, n2) {
          return (e2 = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(e3, t3) {
            e3.__proto__ = t3;
          } || function(e3, t3) {
            for (var n3 in t3)
              Object.prototype.hasOwnProperty.call(t3, n3) && (e3[n3] = t3[n3]);
          })(t2, n2);
        };
        return function(t2, n2) {
          if (typeof n2 != "function" && n2 !== null)
            throw new TypeError("Class extends value " + String(n2) + " is not a constructor or null");
          function o2() {
            this.constructor = t2;
          }
          e2(t2, n2), t2.prototype = n2 === null ? Object.create(n2) : (o2.prototype = n2.prototype, new o2());
        };
      }(), t = this && this.__read || function(e2, t2) {
        var n2 = typeof Symbol == "function" && e2[Symbol.iterator];
        if (!n2)
          return e2;
        var o2, s2, r2 = n2.call(e2), i2 = [];
        try {
          for (; (t2 === void 0 || t2-- > 0) && !(o2 = r2.next()).done; )
            i2.push(o2.value);
        } catch (c2) {
          s2 = {error: c2};
        } finally {
          try {
            o2 && !o2.done && (n2 = r2.return) && n2.call(r2);
          } finally {
            if (s2)
              throw s2.error;
          }
        }
        return i2;
      }, n = this && this.__spreadArray || function(e2, t2) {
        for (var n2 = 0, o2 = t2.length, s2 = e2.length; n2 < o2; n2++, s2++)
          e2[s2] = t2[n2];
        return e2;
      }, o = this && this.__values || function(e2) {
        var t2 = typeof Symbol == "function" && Symbol.iterator, n2 = t2 && e2[t2], o2 = 0;
        if (n2)
          return n2.call(e2);
        if (e2 && typeof e2.length == "number")
          return {next: function() {
            return e2 && o2 >= e2.length && (e2 = void 0), {value: e2 && e2[o2++], done: !e2};
          }};
        throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, s = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : {default: e2};
      };
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.Socket = void 0;
      var r = require2("eventemitter3"), i = s(require2("./logger")), c = require2("./enums"), a = function(s2) {
        function r2(e2, t2, n2, o2, r3, i2) {
          i2 === void 0 && (i2 = 5e3);
          var c2 = s2.call(this) || this;
          c2.pingInterval = i2, c2._disconnected = true, c2._messagesQueue = [];
          var a2 = e2 ? "wss://" : "ws://";
          return c2._baseUrl = a2 + t2 + ":" + n2 + o2 + "peerjs?key=" + r3, c2;
        }
        return e(r2, s2), r2.prototype.start = function(e2, t2) {
          var n2 = this;
          this._id = e2;
          var o2 = this._baseUrl + "&id=" + e2 + "&token=" + t2;
          !this._socket && this._disconnected && (this._socket = new WebSocket(o2), this._disconnected = false, this._socket.onmessage = function(e3) {
            var t3;
            try {
              t3 = JSON.parse(e3.data), i.default.log("Server message received:", t3);
            } catch (o3) {
              return void i.default.log("Invalid server message", e3.data);
            }
            n2.emit(c.SocketEventType.Message, t3);
          }, this._socket.onclose = function(e3) {
            n2._disconnected || (i.default.log("Socket closed.", e3), n2._cleanup(), n2._disconnected = true, n2.emit(c.SocketEventType.Disconnected));
          }, this._socket.onopen = function() {
            n2._disconnected || (n2._sendQueuedMessages(), i.default.log("Socket open"), n2._scheduleHeartbeat());
          });
        }, r2.prototype._scheduleHeartbeat = function() {
          var e2 = this;
          this._wsPingTimer = setTimeout(function() {
            e2._sendHeartbeat();
          }, this.pingInterval);
        }, r2.prototype._sendHeartbeat = function() {
          if (this._wsOpen()) {
            var e2 = JSON.stringify({type: c.ServerMessageType.Heartbeat});
            this._socket.send(e2), this._scheduleHeartbeat();
          } else
            i.default.log("Cannot send heartbeat, because socket closed");
        }, r2.prototype._wsOpen = function() {
          return !!this._socket && this._socket.readyState === 1;
        }, r2.prototype._sendQueuedMessages = function() {
          var e2, s3, r3 = n([], t(this._messagesQueue));
          this._messagesQueue = [];
          try {
            for (var i2 = o(r3), c2 = i2.next(); !c2.done; c2 = i2.next()) {
              var a2 = c2.value;
              this.send(a2);
            }
          } catch (u) {
            e2 = {error: u};
          } finally {
            try {
              c2 && !c2.done && (s3 = i2.return) && s3.call(i2);
            } finally {
              if (e2)
                throw e2.error;
            }
          }
        }, r2.prototype.send = function(e2) {
          if (!this._disconnected)
            if (this._id)
              if (e2.type) {
                if (this._wsOpen()) {
                  var t2 = JSON.stringify(e2);
                  this._socket.send(t2);
                }
              } else
                this.emit(c.SocketEventType.Error, "Invalid message");
            else
              this._messagesQueue.push(e2);
        }, r2.prototype.close = function() {
          this._disconnected || (this._cleanup(), this._disconnected = true);
        }, r2.prototype._cleanup = function() {
          this._socket && (this._socket.onopen = this._socket.onmessage = this._socket.onclose = null, this._socket.close(), this._socket = void 0), clearTimeout(this._wsPingTimer);
        }, r2;
      }(r.EventEmitter);
      exports2.Socket = a;
    }, {eventemitter3: "JJlS", "./logger": "WOs9", "./enums": "ZRYf"}], HCdX: [function(require2, module2, exports2) {
      "use strict";
      var e = this && this.__assign || function() {
        return (e = Object.assign || function(e2) {
          for (var n2, t2 = 1, o2 = arguments.length; t2 < o2; t2++)
            for (var i2 in n2 = arguments[t2])
              Object.prototype.hasOwnProperty.call(n2, i2) && (e2[i2] = n2[i2]);
          return e2;
        }).apply(this, arguments);
      }, n = this && this.__awaiter || function(e2, n2, t2, o2) {
        return new (t2 || (t2 = Promise))(function(i2, r2) {
          function c2(e3) {
            try {
              s(o2.next(e3));
            } catch (n3) {
              r2(n3);
            }
          }
          function a2(e3) {
            try {
              s(o2.throw(e3));
            } catch (n3) {
              r2(n3);
            }
          }
          function s(e3) {
            var n3;
            e3.done ? i2(e3.value) : (n3 = e3.value, n3 instanceof t2 ? n3 : new t2(function(e4) {
              e4(n3);
            })).then(c2, a2);
          }
          s((o2 = o2.apply(e2, n2 || [])).next());
        });
      }, t = this && this.__generator || function(e2, n2) {
        var t2, o2, i2, r2, c2 = {label: 0, sent: function() {
          if (1 & i2[0])
            throw i2[1];
          return i2[1];
        }, trys: [], ops: []};
        return r2 = {next: a2(0), throw: a2(1), return: a2(2)}, typeof Symbol == "function" && (r2[Symbol.iterator] = function() {
          return this;
        }), r2;
        function a2(r3) {
          return function(a3) {
            return function(r4) {
              if (t2)
                throw new TypeError("Generator is already executing.");
              for (; c2; )
                try {
                  if (t2 = 1, o2 && (i2 = 2 & r4[0] ? o2.return : r4[0] ? o2.throw || ((i2 = o2.return) && i2.call(o2), 0) : o2.next) && !(i2 = i2.call(o2, r4[1])).done)
                    return i2;
                  switch (o2 = 0, i2 && (r4 = [2 & r4[0], i2.value]), r4[0]) {
                    case 0:
                    case 1:
                      i2 = r4;
                      break;
                    case 4:
                      return c2.label++, {value: r4[1], done: false};
                    case 5:
                      c2.label++, o2 = r4[1], r4 = [0];
                      continue;
                    case 7:
                      r4 = c2.ops.pop(), c2.trys.pop();
                      continue;
                    default:
                      if (!(i2 = (i2 = c2.trys).length > 0 && i2[i2.length - 1]) && (r4[0] === 6 || r4[0] === 2)) {
                        c2 = 0;
                        continue;
                      }
                      if (r4[0] === 3 && (!i2 || r4[1] > i2[0] && r4[1] < i2[3])) {
                        c2.label = r4[1];
                        break;
                      }
                      if (r4[0] === 6 && c2.label < i2[1]) {
                        c2.label = i2[1], i2 = r4;
                        break;
                      }
                      if (i2 && c2.label < i2[2]) {
                        c2.label = i2[2], c2.ops.push(r4);
                        break;
                      }
                      i2[2] && c2.ops.pop(), c2.trys.pop();
                      continue;
                  }
                  r4 = n2.call(e2, c2);
                } catch (a4) {
                  r4 = [6, a4], o2 = 0;
                } finally {
                  t2 = i2 = 0;
                }
              if (5 & r4[0])
                throw r4[1];
              return {value: r4[0] ? r4[1] : void 0, done: true};
            }([r3, a3]);
          };
        }
      }, o = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : {default: e2};
      };
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.Negotiator = void 0;
      var i = require2("./util"), r = o(require2("./logger")), c = require2("./enums"), a = function() {
        function o2(e2) {
          this.connection = e2;
        }
        return o2.prototype.startConnection = function(e2) {
          var n2 = this._startPeerConnection();
          if (this.connection.peerConnection = n2, this.connection.type === c.ConnectionType.Media && e2._stream && this._addTracksToConnection(e2._stream, n2), e2.originator) {
            if (this.connection.type === c.ConnectionType.Data) {
              var t2 = this.connection, o3 = {ordered: !!e2.reliable}, i2 = n2.createDataChannel(t2.label, o3);
              t2.initialize(i2);
            }
            this._makeOffer();
          } else
            this.handleSDP("OFFER", e2.sdp);
        }, o2.prototype._startPeerConnection = function() {
          r.default.log("Creating RTCPeerConnection.");
          var e2 = new RTCPeerConnection(this.connection.provider.options.config);
          return this._setupListeners(e2), e2;
        }, o2.prototype._setupListeners = function(e2) {
          var n2 = this, t2 = this.connection.peer, o3 = this.connection.connectionId, a2 = this.connection.type, s = this.connection.provider;
          r.default.log("Listening for ICE candidates."), e2.onicecandidate = function(e3) {
            e3.candidate && e3.candidate.candidate && (r.default.log("Received ICE candidates for " + t2 + ":", e3.candidate), s.socket.send({type: c.ServerMessageType.Candidate, payload: {candidate: e3.candidate, type: a2, connectionId: o3}, dst: t2}));
          }, e2.oniceconnectionstatechange = function() {
            switch (e2.iceConnectionState) {
              case "failed":
                r.default.log("iceConnectionState is failed, closing connections to " + t2), n2.connection.emit(c.ConnectionEventType.Error, new Error("Negotiation of connection to " + t2 + " failed.")), n2.connection.close();
                break;
              case "closed":
                r.default.log("iceConnectionState is closed, closing connections to " + t2), n2.connection.emit(c.ConnectionEventType.Error, new Error("Connection to " + t2 + " closed.")), n2.connection.close();
                break;
              case "disconnected":
                r.default.log("iceConnectionState changed to disconnected on the connection with " + t2);
                break;
              case "completed":
                e2.onicecandidate = i.util.noop;
            }
            n2.connection.emit(c.ConnectionEventType.IceStateChanged, e2.iceConnectionState);
          }, r.default.log("Listening for data channel"), e2.ondatachannel = function(e3) {
            r.default.log("Received data channel");
            var n3 = e3.channel;
            s.getConnection(t2, o3).initialize(n3);
          }, r.default.log("Listening for remote stream"), e2.ontrack = function(e3) {
            r.default.log("Received remote stream");
            var i2 = e3.streams[0], a3 = s.getConnection(t2, o3);
            if (a3.type === c.ConnectionType.Media) {
              var d = a3;
              n2._addStreamToMediaConnection(i2, d);
            }
          };
        }, o2.prototype.cleanup = function() {
          r.default.log("Cleaning up PeerConnection to " + this.connection.peer);
          var e2 = this.connection.peerConnection;
          if (e2) {
            this.connection.peerConnection = null, e2.onicecandidate = e2.oniceconnectionstatechange = e2.ondatachannel = e2.ontrack = function() {
            };
            var n2 = e2.signalingState !== "closed", t2 = false;
            if (this.connection.type === c.ConnectionType.Data) {
              var o3 = this.connection.dataChannel;
              o3 && (t2 = !!o3.readyState && o3.readyState !== "closed");
            }
            (n2 || t2) && e2.close();
          }
        }, o2.prototype._makeOffer = function() {
          return n(this, void 0, Promise, function() {
            var n2, o3, a2, s, d, l, u;
            return t(this, function(t2) {
              switch (t2.label) {
                case 0:
                  n2 = this.connection.peerConnection, o3 = this.connection.provider, t2.label = 1;
                case 1:
                  return t2.trys.push([1, 7, , 8]), [4, n2.createOffer(this.connection.options.constraints)];
                case 2:
                  a2 = t2.sent(), r.default.log("Created offer."), this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform == "function" && (a2.sdp = this.connection.options.sdpTransform(a2.sdp) || a2.sdp), t2.label = 3;
                case 3:
                  return t2.trys.push([3, 5, , 6]), [4, n2.setLocalDescription(a2)];
                case 4:
                  return t2.sent(), r.default.log("Set localDescription:", a2, "for:" + this.connection.peer), s = {sdp: a2, type: this.connection.type, connectionId: this.connection.connectionId, metadata: this.connection.metadata, browser: i.util.browser}, this.connection.type === c.ConnectionType.Data && (d = this.connection, s = e(e({}, s), {label: d.label, reliable: d.reliable, serialization: d.serialization})), o3.socket.send({type: c.ServerMessageType.Offer, payload: s, dst: this.connection.peer}), [3, 6];
                case 5:
                  return (l = t2.sent()) != "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer" && (o3.emitError(c.PeerErrorType.WebRTC, l), r.default.log("Failed to setLocalDescription, ", l)), [3, 6];
                case 6:
                  return [3, 8];
                case 7:
                  return u = t2.sent(), o3.emitError(c.PeerErrorType.WebRTC, u), r.default.log("Failed to createOffer, ", u), [3, 8];
                case 8:
                  return [2];
              }
            });
          });
        }, o2.prototype._makeAnswer = function() {
          return n(this, void 0, Promise, function() {
            var e2, n2, o3, a2, s;
            return t(this, function(t2) {
              switch (t2.label) {
                case 0:
                  e2 = this.connection.peerConnection, n2 = this.connection.provider, t2.label = 1;
                case 1:
                  return t2.trys.push([1, 7, , 8]), [4, e2.createAnswer()];
                case 2:
                  o3 = t2.sent(), r.default.log("Created answer."), this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform == "function" && (o3.sdp = this.connection.options.sdpTransform(o3.sdp) || o3.sdp), t2.label = 3;
                case 3:
                  return t2.trys.push([3, 5, , 6]), [4, e2.setLocalDescription(o3)];
                case 4:
                  return t2.sent(), r.default.log("Set localDescription:", o3, "for:" + this.connection.peer), n2.socket.send({type: c.ServerMessageType.Answer, payload: {sdp: o3, type: this.connection.type, connectionId: this.connection.connectionId, browser: i.util.browser}, dst: this.connection.peer}), [3, 6];
                case 5:
                  return a2 = t2.sent(), n2.emitError(c.PeerErrorType.WebRTC, a2), r.default.log("Failed to setLocalDescription, ", a2), [3, 6];
                case 6:
                  return [3, 8];
                case 7:
                  return s = t2.sent(), n2.emitError(c.PeerErrorType.WebRTC, s), r.default.log("Failed to create answer, ", s), [3, 8];
                case 8:
                  return [2];
              }
            });
          });
        }, o2.prototype.handleSDP = function(e2, o3) {
          return n(this, void 0, Promise, function() {
            var n2, i2, a2, s;
            return t(this, function(t2) {
              switch (t2.label) {
                case 0:
                  o3 = new RTCSessionDescription(o3), n2 = this.connection.peerConnection, i2 = this.connection.provider, r.default.log("Setting remote description", o3), a2 = this, t2.label = 1;
                case 1:
                  return t2.trys.push([1, 5, , 6]), [4, n2.setRemoteDescription(o3)];
                case 2:
                  return t2.sent(), r.default.log("Set remoteDescription:" + e2 + " for:" + this.connection.peer), e2 !== "OFFER" ? [3, 4] : [4, a2._makeAnswer()];
                case 3:
                  t2.sent(), t2.label = 4;
                case 4:
                  return [3, 6];
                case 5:
                  return s = t2.sent(), i2.emitError(c.PeerErrorType.WebRTC, s), r.default.log("Failed to setRemoteDescription, ", s), [3, 6];
                case 6:
                  return [2];
              }
            });
          });
        }, o2.prototype.handleCandidate = function(e2) {
          return n(this, void 0, Promise, function() {
            var n2, o3, i2, a2, s, d;
            return t(this, function(t2) {
              switch (t2.label) {
                case 0:
                  r.default.log("handleCandidate:", e2), n2 = e2.candidate, o3 = e2.sdpMLineIndex, i2 = e2.sdpMid, a2 = this.connection.peerConnection, s = this.connection.provider, t2.label = 1;
                case 1:
                  return t2.trys.push([1, 3, , 4]), [4, a2.addIceCandidate(new RTCIceCandidate({sdpMid: i2, sdpMLineIndex: o3, candidate: n2}))];
                case 2:
                  return t2.sent(), r.default.log("Added ICE candidate for:" + this.connection.peer), [3, 4];
                case 3:
                  return d = t2.sent(), s.emitError(c.PeerErrorType.WebRTC, d), r.default.log("Failed to handleCandidate, ", d), [3, 4];
                case 4:
                  return [2];
              }
            });
          });
        }, o2.prototype._addTracksToConnection = function(e2, n2) {
          if (r.default.log("add tracks from stream " + e2.id + " to peer connection"), !n2.addTrack)
            return r.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
          e2.getTracks().forEach(function(t2) {
            n2.addTrack(t2, e2);
          });
        }, o2.prototype._addStreamToMediaConnection = function(e2, n2) {
          r.default.log("add stream " + e2.id + " to media connection " + n2.connectionId), n2.addStream(e2);
        }, o2;
      }();
      exports2.Negotiator = a;
    }, {"./util": "BHXf", "./logger": "WOs9", "./enums": "ZRYf"}], tQFK: [function(require2, module2, exports2) {
      "use strict";
      var t = this && this.__extends || function() {
        var t2 = function(e2, n2) {
          return (t2 = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(t3, e3) {
            t3.__proto__ = e3;
          } || function(t3, e3) {
            for (var n3 in e3)
              Object.prototype.hasOwnProperty.call(e3, n3) && (t3[n3] = e3[n3]);
          })(e2, n2);
        };
        return function(e2, n2) {
          if (typeof n2 != "function" && n2 !== null)
            throw new TypeError("Class extends value " + String(n2) + " is not a constructor or null");
          function o() {
            this.constructor = e2;
          }
          t2(e2, n2), e2.prototype = n2 === null ? Object.create(n2) : (o.prototype = n2.prototype, new o());
        };
      }();
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.BaseConnection = void 0;
      var e = require2("eventemitter3"), n = function(e2) {
        function n2(t2, n3, o) {
          var r = e2.call(this) || this;
          return r.peer = t2, r.provider = n3, r.options = o, r._open = false, r.metadata = o.metadata, r;
        }
        return t(n2, e2), Object.defineProperty(n2.prototype, "open", {get: function() {
          return this._open;
        }, enumerable: false, configurable: true}), n2;
      }(e.EventEmitter);
      exports2.BaseConnection = n;
    }, {eventemitter3: "JJlS"}], dbHP: [function(require2, module2, exports2) {
      "use strict";
      var e = this && this.__extends || function() {
        var e2 = function(t2, o2) {
          return (e2 = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(e3, t3) {
            e3.__proto__ = t3;
          } || function(e3, t3) {
            for (var o3 in t3)
              Object.prototype.hasOwnProperty.call(t3, o3) && (e3[o3] = t3[o3]);
          })(t2, o2);
        };
        return function(t2, o2) {
          if (typeof o2 != "function" && o2 !== null)
            throw new TypeError("Class extends value " + String(o2) + " is not a constructor or null");
          function r2() {
            this.constructor = t2;
          }
          e2(t2, o2), t2.prototype = o2 === null ? Object.create(o2) : (r2.prototype = o2.prototype, new r2());
        };
      }(), t = this && this.__assign || function() {
        return (t = Object.assign || function(e2) {
          for (var t2, o2 = 1, r2 = arguments.length; o2 < r2; o2++)
            for (var n2 in t2 = arguments[o2])
              Object.prototype.hasOwnProperty.call(t2, n2) && (e2[n2] = t2[n2]);
          return e2;
        }).apply(this, arguments);
      }, o = this && this.__values || function(e2) {
        var t2 = typeof Symbol == "function" && Symbol.iterator, o2 = t2 && e2[t2], r2 = 0;
        if (o2)
          return o2.call(e2);
        if (e2 && typeof e2.length == "number")
          return {next: function() {
            return e2 && r2 >= e2.length && (e2 = void 0), {value: e2 && e2[r2++], done: !e2};
          }};
        throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, r = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : {default: e2};
      };
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.MediaConnection = void 0;
      var n = require2("./util"), i = r(require2("./logger")), a = require2("./negotiator"), s = require2("./enums"), l = require2("./baseconnection"), c = function(r2) {
        function l2(e2, t2, o2) {
          var i2 = r2.call(this, e2, t2, o2) || this;
          return i2._localStream = i2.options._stream, i2.connectionId = i2.options.connectionId || l2.ID_PREFIX + n.util.randomToken(), i2._negotiator = new a.Negotiator(i2), i2._localStream && i2._negotiator.startConnection({_stream: i2._localStream, originator: true}), i2;
        }
        return e(l2, r2), Object.defineProperty(l2.prototype, "type", {get: function() {
          return s.ConnectionType.Media;
        }, enumerable: false, configurable: true}), Object.defineProperty(l2.prototype, "localStream", {get: function() {
          return this._localStream;
        }, enumerable: false, configurable: true}), Object.defineProperty(l2.prototype, "remoteStream", {get: function() {
          return this._remoteStream;
        }, enumerable: false, configurable: true}), l2.prototype.addStream = function(e2) {
          i.default.log("Receiving stream", e2), this._remoteStream = e2, r2.prototype.emit.call(this, s.ConnectionEventType.Stream, e2);
        }, l2.prototype.handleMessage = function(e2) {
          var t2 = e2.type, o2 = e2.payload;
          switch (e2.type) {
            case s.ServerMessageType.Answer:
              this._negotiator.handleSDP(t2, o2.sdp), this._open = true;
              break;
            case s.ServerMessageType.Candidate:
              this._negotiator.handleCandidate(o2.candidate);
              break;
            default:
              i.default.warn("Unrecognized message type:" + t2 + " from peer:" + this.peer);
          }
        }, l2.prototype.answer = function(e2, r3) {
          var n2, a2;
          if (r3 === void 0 && (r3 = {}), this._localStream)
            i.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
          else {
            this._localStream = e2, r3 && r3.sdpTransform && (this.options.sdpTransform = r3.sdpTransform), this._negotiator.startConnection(t(t({}, this.options._payload), {_stream: e2}));
            var s2 = this.provider._getMessages(this.connectionId);
            try {
              for (var l3 = o(s2), c2 = l3.next(); !c2.done; c2 = l3.next()) {
                var p2 = c2.value;
                this.handleMessage(p2);
              }
            } catch (u) {
              n2 = {error: u};
            } finally {
              try {
                c2 && !c2.done && (a2 = l3.return) && a2.call(l3);
              } finally {
                if (n2)
                  throw n2.error;
              }
            }
            this._open = true;
          }
        }, l2.prototype.close = function() {
          this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this._localStream = null, this._remoteStream = null, this.provider && (this.provider._removeConnection(this), this.provider = null), this.options && this.options._stream && (this.options._stream = null), this.open && (this._open = false, r2.prototype.emit.call(this, s.ConnectionEventType.Close));
        }, l2.ID_PREFIX = "mc_", l2;
      }(l.BaseConnection);
      exports2.MediaConnection = c;
    }, {"./util": "BHXf", "./logger": "WOs9", "./negotiator": "HCdX", "./enums": "ZRYf", "./baseconnection": "tQFK"}], GGp6: [function(require2, module2, exports2) {
      "use strict";
      var e = this && this.__extends || function() {
        var e2 = function(t2, r2) {
          return (e2 = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(e3, t3) {
            e3.__proto__ = t3;
          } || function(e3, t3) {
            for (var r3 in t3)
              Object.prototype.hasOwnProperty.call(t3, r3) && (e3[r3] = t3[r3]);
          })(t2, r2);
        };
        return function(t2, r2) {
          if (typeof r2 != "function" && r2 !== null)
            throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
          function o2() {
            this.constructor = t2;
          }
          e2(t2, r2), t2.prototype = r2 === null ? Object.create(r2) : (o2.prototype = r2.prototype, new o2());
        };
      }(), t = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : {default: e2};
      };
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.EncodingQueue = void 0;
      var r = require2("eventemitter3"), o = t(require2("./logger")), n = function(t2) {
        function r2() {
          var e2 = t2.call(this) || this;
          return e2.fileReader = new FileReader(), e2._queue = [], e2._processing = false, e2.fileReader.onload = function(t3) {
            e2._processing = false, t3.target && e2.emit("done", t3.target.result), e2.doNextTask();
          }, e2.fileReader.onerror = function(t3) {
            o.default.error("EncodingQueue error:", t3), e2._processing = false, e2.destroy(), e2.emit("error", t3);
          }, e2;
        }
        return e(r2, t2), Object.defineProperty(r2.prototype, "queue", {get: function() {
          return this._queue;
        }, enumerable: false, configurable: true}), Object.defineProperty(r2.prototype, "size", {get: function() {
          return this.queue.length;
        }, enumerable: false, configurable: true}), Object.defineProperty(r2.prototype, "processing", {get: function() {
          return this._processing;
        }, enumerable: false, configurable: true}), r2.prototype.enque = function(e2) {
          this.queue.push(e2), this.processing || this.doNextTask();
        }, r2.prototype.destroy = function() {
          this.fileReader.abort(), this._queue = [];
        }, r2.prototype.doNextTask = function() {
          this.size !== 0 && (this.processing || (this._processing = true, this.fileReader.readAsArrayBuffer(this.queue.shift())));
        }, r2;
      }(r.EventEmitter);
      exports2.EncodingQueue = n;
    }, {eventemitter3: "JJlS", "./logger": "WOs9"}], GBTQ: [function(require2, module2, exports2) {
      "use strict";
      var e = this && this.__extends || function() {
        var e2 = function(t2, n2) {
          return (e2 = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(e3, t3) {
            e3.__proto__ = t3;
          } || function(e3, t3) {
            for (var n3 in t3)
              Object.prototype.hasOwnProperty.call(t3, n3) && (e3[n3] = t3[n3]);
          })(t2, n2);
        };
        return function(t2, n2) {
          if (typeof n2 != "function" && n2 !== null)
            throw new TypeError("Class extends value " + String(n2) + " is not a constructor or null");
          function i2() {
            this.constructor = t2;
          }
          e2(t2, n2), t2.prototype = n2 === null ? Object.create(n2) : (i2.prototype = n2.prototype, new i2());
        };
      }(), t = this && this.__values || function(e2) {
        var t2 = typeof Symbol == "function" && Symbol.iterator, n2 = t2 && e2[t2], i2 = 0;
        if (n2)
          return n2.call(e2);
        if (e2 && typeof e2.length == "number")
          return {next: function() {
            return e2 && i2 >= e2.length && (e2 = void 0), {value: e2 && e2[i2++], done: !e2};
          }};
        throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, n = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : {default: e2};
      };
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.DataConnection = void 0;
      var i = require2("./util"), o = n(require2("./logger")), r = require2("./negotiator"), a = require2("./enums"), s = require2("./baseconnection"), u = require2("./encodingQueue"), l = function(n2) {
        function s2(e2, t2, l2) {
          var f = n2.call(this, e2, t2, l2) || this;
          return f.stringify = JSON.stringify, f.parse = JSON.parse, f._buffer = [], f._bufferSize = 0, f._buffering = false, f._chunkedData = {}, f._encodingQueue = new u.EncodingQueue(), f.connectionId = f.options.connectionId || s2.ID_PREFIX + i.util.randomToken(), f.label = f.options.label || f.connectionId, f.serialization = f.options.serialization || a.SerializationType.Binary, f.reliable = !!f.options.reliable, f._encodingQueue.on("done", function(e3) {
            f._bufferedSend(e3);
          }), f._encodingQueue.on("error", function() {
            o.default.error("DC#" + f.connectionId + ": Error occured in encoding from blob to arraybuffer, close DC"), f.close();
          }), f._negotiator = new r.Negotiator(f), f._negotiator.startConnection(f.options._payload || {originator: true}), f;
        }
        return e(s2, n2), Object.defineProperty(s2.prototype, "type", {get: function() {
          return a.ConnectionType.Data;
        }, enumerable: false, configurable: true}), Object.defineProperty(s2.prototype, "dataChannel", {get: function() {
          return this._dc;
        }, enumerable: false, configurable: true}), Object.defineProperty(s2.prototype, "bufferSize", {get: function() {
          return this._bufferSize;
        }, enumerable: false, configurable: true}), s2.prototype.initialize = function(e2) {
          this._dc = e2, this._configureDataChannel();
        }, s2.prototype._configureDataChannel = function() {
          var e2 = this;
          i.util.supports.binaryBlob && !i.util.supports.reliable || (this.dataChannel.binaryType = "arraybuffer"), this.dataChannel.onopen = function() {
            o.default.log("DC#" + e2.connectionId + " dc connection success"), e2._open = true, e2.emit(a.ConnectionEventType.Open);
          }, this.dataChannel.onmessage = function(t2) {
            o.default.log("DC#" + e2.connectionId + " dc onmessage:", t2.data), e2._handleDataMessage(t2);
          }, this.dataChannel.onclose = function() {
            o.default.log("DC#" + e2.connectionId + " dc closed for:", e2.peer), e2.close();
          };
        }, s2.prototype._handleDataMessage = function(e2) {
          var t2 = this, o2 = e2.data, r2 = o2.constructor, s3 = o2;
          if (this.serialization === a.SerializationType.Binary || this.serialization === a.SerializationType.BinaryUTF8) {
            if (r2 === Blob)
              return void i.util.blobToArrayBuffer(o2, function(e3) {
                var n3 = i.util.unpack(e3);
                t2.emit(a.ConnectionEventType.Data, n3);
              });
            if (r2 === ArrayBuffer)
              s3 = i.util.unpack(o2);
            else if (r2 === String) {
              var u2 = i.util.binaryStringToArrayBuffer(o2);
              s3 = i.util.unpack(u2);
            }
          } else
            this.serialization === a.SerializationType.JSON && (s3 = this.parse(o2));
          s3.__peerData ? this._handleChunk(s3) : n2.prototype.emit.call(this, a.ConnectionEventType.Data, s3);
        }, s2.prototype._handleChunk = function(e2) {
          var t2 = e2.__peerData, n3 = this._chunkedData[t2] || {data: [], count: 0, total: e2.total};
          if (n3.data[e2.n] = e2.data, n3.count++, this._chunkedData[t2] = n3, n3.total === n3.count) {
            delete this._chunkedData[t2];
            var i2 = new Blob(n3.data);
            this._handleDataMessage({data: i2});
          }
        }, s2.prototype.close = function() {
          this._buffer = [], this._bufferSize = 0, this._chunkedData = {}, this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this.provider && (this.provider._removeConnection(this), this.provider = null), this.dataChannel && (this.dataChannel.onopen = null, this.dataChannel.onmessage = null, this.dataChannel.onclose = null, this._dc = null), this._encodingQueue && (this._encodingQueue.destroy(), this._encodingQueue.removeAllListeners(), this._encodingQueue = null), this.open && (this._open = false, n2.prototype.emit.call(this, a.ConnectionEventType.Close));
        }, s2.prototype.send = function(e2, t2) {
          if (this.open)
            if (this.serialization === a.SerializationType.JSON)
              this._bufferedSend(this.stringify(e2));
            else if (this.serialization === a.SerializationType.Binary || this.serialization === a.SerializationType.BinaryUTF8) {
              var o2 = i.util.pack(e2);
              if (!t2 && o2.size > i.util.chunkedMTU)
                return void this._sendChunks(o2);
              i.util.supports.binaryBlob ? this._bufferedSend(o2) : this._encodingQueue.enque(o2);
            } else
              this._bufferedSend(e2);
          else
            n2.prototype.emit.call(this, a.ConnectionEventType.Error, new Error("Connection is not open. You should listen for the `open` event before sending messages."));
        }, s2.prototype._bufferedSend = function(e2) {
          !this._buffering && this._trySend(e2) || (this._buffer.push(e2), this._bufferSize = this._buffer.length);
        }, s2.prototype._trySend = function(e2) {
          var t2 = this;
          if (!this.open)
            return false;
          if (this.dataChannel.bufferedAmount > s2.MAX_BUFFERED_AMOUNT)
            return this._buffering = true, setTimeout(function() {
              t2._buffering = false, t2._tryBuffer();
            }, 50), false;
          try {
            this.dataChannel.send(e2);
          } catch (n3) {
            return o.default.error("DC#:" + this.connectionId + " Error when sending:", n3), this._buffering = true, this.close(), false;
          }
          return true;
        }, s2.prototype._tryBuffer = function() {
          if (this.open && this._buffer.length !== 0) {
            var e2 = this._buffer[0];
            this._trySend(e2) && (this._buffer.shift(), this._bufferSize = this._buffer.length, this._tryBuffer());
          }
        }, s2.prototype._sendChunks = function(e2) {
          var n3, r2, a2 = i.util.chunk(e2);
          o.default.log("DC#" + this.connectionId + " Try to send " + a2.length + " chunks...");
          try {
            for (var s3 = t(a2), u2 = s3.next(); !u2.done; u2 = s3.next()) {
              var l2 = u2.value;
              this.send(l2, true);
            }
          } catch (f) {
            n3 = {error: f};
          } finally {
            try {
              u2 && !u2.done && (r2 = s3.return) && r2.call(s3);
            } finally {
              if (n3)
                throw n3.error;
            }
          }
        }, s2.prototype.handleMessage = function(e2) {
          var t2 = e2.payload;
          switch (e2.type) {
            case a.ServerMessageType.Answer:
              this._negotiator.handleSDP(e2.type, t2.sdp);
              break;
            case a.ServerMessageType.Candidate:
              this._negotiator.handleCandidate(t2.candidate);
              break;
            default:
              o.default.warn("Unrecognized message type:", e2.type, "from peer:", this.peer);
          }
        }, s2.ID_PREFIX = "dc_", s2.MAX_BUFFERED_AMOUNT = 8388608, s2;
      }(s.BaseConnection);
      exports2.DataConnection = l;
    }, {"./util": "BHXf", "./logger": "WOs9", "./negotiator": "HCdX", "./enums": "ZRYf", "./baseconnection": "tQFK", "./encodingQueue": "GGp6"}], in7L: [function(require2, module2, exports2) {
      "use strict";
      var t = this && this.__awaiter || function(t2, e2, r2, o2) {
        return new (r2 || (r2 = Promise))(function(n2, s2) {
          function i(t3) {
            try {
              a(o2.next(t3));
            } catch (e3) {
              s2(e3);
            }
          }
          function u(t3) {
            try {
              a(o2.throw(t3));
            } catch (e3) {
              s2(e3);
            }
          }
          function a(t3) {
            var e3;
            t3.done ? n2(t3.value) : (e3 = t3.value, e3 instanceof r2 ? e3 : new r2(function(t4) {
              t4(e3);
            })).then(i, u);
          }
          a((o2 = o2.apply(t2, e2 || [])).next());
        });
      }, e = this && this.__generator || function(t2, e2) {
        var r2, o2, n2, s2, i = {label: 0, sent: function() {
          if (1 & n2[0])
            throw n2[1];
          return n2[1];
        }, trys: [], ops: []};
        return s2 = {next: u(0), throw: u(1), return: u(2)}, typeof Symbol == "function" && (s2[Symbol.iterator] = function() {
          return this;
        }), s2;
        function u(s3) {
          return function(u2) {
            return function(s4) {
              if (r2)
                throw new TypeError("Generator is already executing.");
              for (; i; )
                try {
                  if (r2 = 1, o2 && (n2 = 2 & s4[0] ? o2.return : s4[0] ? o2.throw || ((n2 = o2.return) && n2.call(o2), 0) : o2.next) && !(n2 = n2.call(o2, s4[1])).done)
                    return n2;
                  switch (o2 = 0, n2 && (s4 = [2 & s4[0], n2.value]), s4[0]) {
                    case 0:
                    case 1:
                      n2 = s4;
                      break;
                    case 4:
                      return i.label++, {value: s4[1], done: false};
                    case 5:
                      i.label++, o2 = s4[1], s4 = [0];
                      continue;
                    case 7:
                      s4 = i.ops.pop(), i.trys.pop();
                      continue;
                    default:
                      if (!(n2 = (n2 = i.trys).length > 0 && n2[n2.length - 1]) && (s4[0] === 6 || s4[0] === 2)) {
                        i = 0;
                        continue;
                      }
                      if (s4[0] === 3 && (!n2 || s4[1] > n2[0] && s4[1] < n2[3])) {
                        i.label = s4[1];
                        break;
                      }
                      if (s4[0] === 6 && i.label < n2[1]) {
                        i.label = n2[1], n2 = s4;
                        break;
                      }
                      if (n2 && i.label < n2[2]) {
                        i.label = n2[2], i.ops.push(s4);
                        break;
                      }
                      n2[2] && i.ops.pop(), i.trys.pop();
                      continue;
                  }
                  s4 = e2.call(t2, i);
                } catch (u3) {
                  s4 = [6, u3], o2 = 0;
                } finally {
                  r2 = n2 = 0;
                }
              if (5 & s4[0])
                throw s4[1];
              return {value: s4[0] ? s4[1] : void 0, done: true};
            }([s3, u2]);
          };
        }
      }, r = this && this.__importDefault || function(t2) {
        return t2 && t2.__esModule ? t2 : {default: t2};
      };
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.API = void 0;
      var o = require2("./util"), n = r(require2("./logger")), s = function() {
        function r2(t2) {
          this._options = t2;
        }
        return r2.prototype._buildUrl = function(t2) {
          var e2 = (this._options.secure ? "https://" : "http://") + this._options.host + ":" + this._options.port + this._options.path + this._options.key + "/" + t2;
          return e2 += "?ts=" + new Date().getTime() + Math.random();
        }, r2.prototype.retrieveId = function() {
          return t(this, void 0, Promise, function() {
            var t2, r3, s2, i;
            return e(this, function(e2) {
              switch (e2.label) {
                case 0:
                  t2 = this._buildUrl("id"), e2.label = 1;
                case 1:
                  return e2.trys.push([1, 3, , 4]), [4, fetch(t2)];
                case 2:
                  if ((r3 = e2.sent()).status !== 200)
                    throw new Error("Error. Status:" + r3.status);
                  return [2, r3.text()];
                case 3:
                  throw s2 = e2.sent(), n.default.error("Error retrieving ID", s2), i = "", this._options.path === "/" && this._options.host !== o.util.CLOUD_HOST && (i = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."), new Error("Could not get an ID from the server." + i);
                case 4:
                  return [2];
              }
            });
          });
        }, r2.prototype.listAllPeers = function() {
          return t(this, void 0, Promise, function() {
            var t2, r3, s2, i;
            return e(this, function(e2) {
              switch (e2.label) {
                case 0:
                  t2 = this._buildUrl("peers"), e2.label = 1;
                case 1:
                  return e2.trys.push([1, 3, , 4]), [4, fetch(t2)];
                case 2:
                  if ((r3 = e2.sent()).status !== 200) {
                    if (r3.status === 401)
                      throw s2 = "", s2 = this._options.host === o.util.CLOUD_HOST ? "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key." : "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.", new Error("It doesn't look like you have permission to list peers IDs. " + s2);
                    throw new Error("Error. Status:" + r3.status);
                  }
                  return [2, r3.json()];
                case 3:
                  throw i = e2.sent(), n.default.error("Error retrieving list peers", i), new Error("Could not get list peers from the server." + i);
                case 4:
                  return [2];
              }
            });
          });
        }, r2;
      }();
      exports2.API = s;
    }, {"./util": "BHXf", "./logger": "WOs9"}], Hxpd: [function(require2, module2, exports2) {
      "use strict";
      var e = this && this.__extends || function() {
        var e2 = function(t2, n2) {
          return (e2 = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(e3, t3) {
            e3.__proto__ = t3;
          } || function(e3, t3) {
            for (var n3 in t3)
              Object.prototype.hasOwnProperty.call(t3, n3) && (e3[n3] = t3[n3]);
          })(t2, n2);
        };
        return function(t2, n2) {
          if (typeof n2 != "function" && n2 !== null)
            throw new TypeError("Class extends value " + String(n2) + " is not a constructor or null");
          function r2() {
            this.constructor = t2;
          }
          e2(t2, n2), t2.prototype = n2 === null ? Object.create(n2) : (r2.prototype = n2.prototype, new r2());
        };
      }(), t = this && this.__assign || function() {
        return (t = Object.assign || function(e2) {
          for (var t2, n2 = 1, r2 = arguments.length; n2 < r2; n2++)
            for (var o2 in t2 = arguments[n2])
              Object.prototype.hasOwnProperty.call(t2, o2) && (e2[o2] = t2[o2]);
          return e2;
        }).apply(this, arguments);
      }, n = this && this.__values || function(e2) {
        var t2 = typeof Symbol == "function" && Symbol.iterator, n2 = t2 && e2[t2], r2 = 0;
        if (n2)
          return n2.call(e2);
        if (e2 && typeof e2.length == "number")
          return {next: function() {
            return e2 && r2 >= e2.length && (e2 = void 0), {value: e2 && e2[r2++], done: !e2};
          }};
        throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, r = this && this.__read || function(e2, t2) {
        var n2 = typeof Symbol == "function" && e2[Symbol.iterator];
        if (!n2)
          return e2;
        var r2, o2, i2 = n2.call(e2), s2 = [];
        try {
          for (; (t2 === void 0 || t2-- > 0) && !(r2 = i2.next()).done; )
            s2.push(r2.value);
        } catch (a2) {
          o2 = {error: a2};
        } finally {
          try {
            r2 && !r2.done && (n2 = i2.return) && n2.call(i2);
          } finally {
            if (o2)
              throw o2.error;
          }
        }
        return s2;
      }, o = this && this.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : {default: e2};
      };
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.Peer = void 0;
      var i = require2("eventemitter3"), s = require2("./util"), a = o(require2("./logger")), c = require2("./socket"), l = require2("./mediaconnection"), u = require2("./dataconnection"), d = require2("./enums"), p2 = require2("./api"), h = function() {
        return function() {
        };
      }(), f = function(o2) {
        function i2(e2, n2) {
          var r2, c2 = o2.call(this) || this;
          return c2._id = null, c2._lastServerId = null, c2._destroyed = false, c2._disconnected = false, c2._open = false, c2._connections = new Map(), c2._lostMessages = new Map(), e2 && e2.constructor == Object ? n2 = e2 : e2 && (r2 = e2.toString()), n2 = t({debug: 0, host: s.util.CLOUD_HOST, port: s.util.CLOUD_PORT, path: "/", key: i2.DEFAULT_KEY, token: s.util.randomToken(), config: s.util.defaultConfig}, n2), c2._options = n2, c2._options.host === "/" && (c2._options.host = window.location.hostname), c2._options.path && (c2._options.path[0] !== "/" && (c2._options.path = "/" + c2._options.path), c2._options.path[c2._options.path.length - 1] !== "/" && (c2._options.path += "/")), c2._options.secure === void 0 && c2._options.host !== s.util.CLOUD_HOST ? c2._options.secure = s.util.isSecure() : c2._options.host == s.util.CLOUD_HOST && (c2._options.secure = true), c2._options.logFunction && a.default.setLogFunction(c2._options.logFunction), a.default.logLevel = c2._options.debug || 0, c2._api = new p2.API(n2), c2._socket = c2._createServerConnection(), s.util.supports.audioVideo || s.util.supports.data ? r2 && !s.util.validateId(r2) ? (c2._delayedAbort(d.PeerErrorType.InvalidID, 'ID "' + r2 + '" is invalid'), c2) : (r2 ? c2._initialize(r2) : c2._api.retrieveId().then(function(e3) {
            return c2._initialize(e3);
          }).catch(function(e3) {
            return c2._abort(d.PeerErrorType.ServerError, e3);
          }), c2) : (c2._delayedAbort(d.PeerErrorType.BrowserIncompatible, "The current browser does not support WebRTC"), c2);
        }
        return e(i2, o2), Object.defineProperty(i2.prototype, "id", {get: function() {
          return this._id;
        }, enumerable: false, configurable: true}), Object.defineProperty(i2.prototype, "options", {get: function() {
          return this._options;
        }, enumerable: false, configurable: true}), Object.defineProperty(i2.prototype, "open", {get: function() {
          return this._open;
        }, enumerable: false, configurable: true}), Object.defineProperty(i2.prototype, "socket", {get: function() {
          return this._socket;
        }, enumerable: false, configurable: true}), Object.defineProperty(i2.prototype, "connections", {get: function() {
          var e2, t2, o3 = Object.create(null);
          try {
            for (var i3 = n(this._connections), s2 = i3.next(); !s2.done; s2 = i3.next()) {
              var a2 = r(s2.value, 2), c2 = a2[0], l2 = a2[1];
              o3[c2] = l2;
            }
          } catch (u2) {
            e2 = {error: u2};
          } finally {
            try {
              s2 && !s2.done && (t2 = i3.return) && t2.call(i3);
            } finally {
              if (e2)
                throw e2.error;
            }
          }
          return o3;
        }, enumerable: false, configurable: true}), Object.defineProperty(i2.prototype, "destroyed", {get: function() {
          return this._destroyed;
        }, enumerable: false, configurable: true}), Object.defineProperty(i2.prototype, "disconnected", {get: function() {
          return this._disconnected;
        }, enumerable: false, configurable: true}), i2.prototype._createServerConnection = function() {
          var e2 = this, t2 = new c.Socket(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
          return t2.on(d.SocketEventType.Message, function(t3) {
            e2._handleMessage(t3);
          }), t2.on(d.SocketEventType.Error, function(t3) {
            e2._abort(d.PeerErrorType.SocketError, t3);
          }), t2.on(d.SocketEventType.Disconnected, function() {
            e2.disconnected || (e2.emitError(d.PeerErrorType.Network, "Lost connection to server."), e2.disconnect());
          }), t2.on(d.SocketEventType.Close, function() {
            e2.disconnected || e2._abort(d.PeerErrorType.SocketClosed, "Underlying socket is already closed.");
          }), t2;
        }, i2.prototype._initialize = function(e2) {
          this._id = e2, this.socket.start(e2, this._options.token);
        }, i2.prototype._handleMessage = function(e2) {
          var t2, r2, o3 = e2.type, i3 = e2.payload, s2 = e2.src;
          switch (o3) {
            case d.ServerMessageType.Open:
              this._lastServerId = this.id, this._open = true, this.emit(d.PeerEventType.Open, this.id);
              break;
            case d.ServerMessageType.Error:
              this._abort(d.PeerErrorType.ServerError, i3.msg);
              break;
            case d.ServerMessageType.IdTaken:
              this._abort(d.PeerErrorType.UnavailableID, 'ID "' + this.id + '" is taken');
              break;
            case d.ServerMessageType.InvalidKey:
              this._abort(d.PeerErrorType.InvalidKey, 'API KEY "' + this._options.key + '" is invalid');
              break;
            case d.ServerMessageType.Leave:
              a.default.log("Received leave message from " + s2), this._cleanupPeer(s2), this._connections.delete(s2);
              break;
            case d.ServerMessageType.Expire:
              this.emitError(d.PeerErrorType.PeerUnavailable, "Could not connect to peer " + s2);
              break;
            case d.ServerMessageType.Offer:
              var c2 = i3.connectionId;
              if ((_ = this.getConnection(s2, c2)) && (_.close(), a.default.warn("Offer received for existing Connection ID:" + c2)), i3.type === d.ConnectionType.Media)
                _ = new l.MediaConnection(s2, this, {connectionId: c2, _payload: i3, metadata: i3.metadata}), this._addConnection(s2, _), this.emit(d.PeerEventType.Call, _);
              else {
                if (i3.type !== d.ConnectionType.Data)
                  return void a.default.warn("Received malformed connection type:" + i3.type);
                _ = new u.DataConnection(s2, this, {connectionId: c2, _payload: i3, metadata: i3.metadata, label: i3.label, serialization: i3.serialization, reliable: i3.reliable}), this._addConnection(s2, _), this.emit(d.PeerEventType.Connection, _);
              }
              var p3 = this._getMessages(c2);
              try {
                for (var h2 = n(p3), f2 = h2.next(); !f2.done; f2 = h2.next()) {
                  var y = f2.value;
                  _.handleMessage(y);
                }
              } catch (v) {
                t2 = {error: v};
              } finally {
                try {
                  f2 && !f2.done && (r2 = h2.return) && r2.call(h2);
                } finally {
                  if (t2)
                    throw t2.error;
                }
              }
              break;
            default:
              if (!i3)
                return void a.default.warn("You received a malformed message from " + s2 + " of type " + o3);
              var _;
              c2 = i3.connectionId;
              (_ = this.getConnection(s2, c2)) && _.peerConnection ? _.handleMessage(e2) : c2 ? this._storeMessage(c2, e2) : a.default.warn("You received an unrecognized message:", e2);
          }
        }, i2.prototype._storeMessage = function(e2, t2) {
          this._lostMessages.has(e2) || this._lostMessages.set(e2, []), this._lostMessages.get(e2).push(t2);
        }, i2.prototype._getMessages = function(e2) {
          var t2 = this._lostMessages.get(e2);
          return t2 ? (this._lostMessages.delete(e2), t2) : [];
        }, i2.prototype.connect = function(e2, t2) {
          if (t2 === void 0 && (t2 = {}), this.disconnected)
            return a.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."), void this.emitError(d.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
          var n2 = new u.DataConnection(e2, this, t2);
          return this._addConnection(e2, n2), n2;
        }, i2.prototype.call = function(e2, t2, n2) {
          if (n2 === void 0 && (n2 = {}), this.disconnected)
            return a.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."), void this.emitError(d.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
          if (t2) {
            n2._stream = t2;
            var r2 = new l.MediaConnection(e2, this, n2);
            return this._addConnection(e2, r2), r2;
          }
          a.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
        }, i2.prototype._addConnection = function(e2, t2) {
          a.default.log("add connection " + t2.type + ":" + t2.connectionId + " to peerId:" + e2), this._connections.has(e2) || this._connections.set(e2, []), this._connections.get(e2).push(t2);
        }, i2.prototype._removeConnection = function(e2) {
          var t2 = this._connections.get(e2.peer);
          if (t2) {
            var n2 = t2.indexOf(e2);
            n2 !== -1 && t2.splice(n2, 1);
          }
          this._lostMessages.delete(e2.connectionId);
        }, i2.prototype.getConnection = function(e2, t2) {
          var r2, o3, i3 = this._connections.get(e2);
          if (!i3)
            return null;
          try {
            for (var s2 = n(i3), a2 = s2.next(); !a2.done; a2 = s2.next()) {
              var c2 = a2.value;
              if (c2.connectionId === t2)
                return c2;
            }
          } catch (l2) {
            r2 = {error: l2};
          } finally {
            try {
              a2 && !a2.done && (o3 = s2.return) && o3.call(s2);
            } finally {
              if (r2)
                throw r2.error;
            }
          }
          return null;
        }, i2.prototype._delayedAbort = function(e2, t2) {
          var n2 = this;
          setTimeout(function() {
            n2._abort(e2, t2);
          }, 0);
        }, i2.prototype._abort = function(e2, t2) {
          a.default.error("Aborting!"), this.emitError(e2, t2), this._lastServerId ? this.disconnect() : this.destroy();
        }, i2.prototype.emitError = function(e2, t2) {
          var n2;
          a.default.error("Error:", t2), (n2 = typeof t2 == "string" ? new Error(t2) : t2).type = e2, this.emit(d.PeerEventType.Error, n2);
        }, i2.prototype.destroy = function() {
          this.destroyed || (a.default.log("Destroy peer with ID:" + this.id), this.disconnect(), this._cleanup(), this._destroyed = true, this.emit(d.PeerEventType.Close));
        }, i2.prototype._cleanup = function() {
          var e2, t2;
          try {
            for (var r2 = n(this._connections.keys()), o3 = r2.next(); !o3.done; o3 = r2.next()) {
              var i3 = o3.value;
              this._cleanupPeer(i3), this._connections.delete(i3);
            }
          } catch (s2) {
            e2 = {error: s2};
          } finally {
            try {
              o3 && !o3.done && (t2 = r2.return) && t2.call(r2);
            } finally {
              if (e2)
                throw e2.error;
            }
          }
          this.socket.removeAllListeners();
        }, i2.prototype._cleanupPeer = function(e2) {
          var t2, r2, o3 = this._connections.get(e2);
          if (o3)
            try {
              for (var i3 = n(o3), s2 = i3.next(); !s2.done; s2 = i3.next()) {
                s2.value.close();
              }
            } catch (a2) {
              t2 = {error: a2};
            } finally {
              try {
                s2 && !s2.done && (r2 = i3.return) && r2.call(i3);
              } finally {
                if (t2)
                  throw t2.error;
              }
            }
        }, i2.prototype.disconnect = function() {
          if (!this.disconnected) {
            var e2 = this.id;
            a.default.log("Disconnect peer with ID:" + e2), this._disconnected = true, this._open = false, this.socket.close(), this._lastServerId = e2, this._id = null, this.emit(d.PeerEventType.Disconnected, e2);
          }
        }, i2.prototype.reconnect = function() {
          if (this.disconnected && !this.destroyed)
            a.default.log("Attempting reconnection to server with ID " + this._lastServerId), this._disconnected = false, this._initialize(this._lastServerId);
          else {
            if (this.destroyed)
              throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
            if (this.disconnected || this.open)
              throw new Error("Peer " + this.id + " cannot reconnect because it is not disconnected from the server!");
            a.default.error("In a hurry? We're still trying to make the initial connection!");
          }
        }, i2.prototype.listAllPeers = function(e2) {
          var t2 = this;
          e2 === void 0 && (e2 = function(e3) {
          }), this._api.listAllPeers().then(function(t3) {
            return e2(t3);
          }).catch(function(e3) {
            return t2._abort(d.PeerErrorType.ServerError, e3);
          });
        }, i2.DEFAULT_KEY = "peerjs", i2;
      }(i.EventEmitter);
      exports2.Peer = f;
    }, {eventemitter3: "JJlS", "./util": "BHXf", "./logger": "WOs9", "./socket": "wJlv", "./mediaconnection": "dbHP", "./dataconnection": "GBTQ", "./enums": "ZRYf", "./api": "in7L"}], iTK6: [function(require2, module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {value: true}), exports2.peerjs = void 0;
      var e = require2("./util"), r = require2("./peer");
      exports2.peerjs = {Peer: r.Peer, util: e.util}, exports2.default = r.Peer, window.peerjs = exports2.peerjs, window.Peer = r.Peer;
    }, {"./util": "BHXf", "./peer": "Hxpd"}]}, {}, ["iTK6"], null);
  });

  // src/server/index.ts
  var import_peerjs = __toModule(require_peerjs_min());
  var p = new import_peerjs.default();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9ub2RlX21vZHVsZXMvcGVlcmpzLWpzLWJpbmFyeXBhY2svbGliL2J1ZmZlcmJ1aWxkZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9ub2RlX21vZHVsZXMvcGVlcmpzLWpzLWJpbmFyeXBhY2svbGliL2JpbmFyeXBhY2suanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9ub2RlX21vZHVsZXMvd2VicnRjLWFkYXB0ZXIvc3JjL2pzL3V0aWxzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy1hZGFwdGVyL3NyYy9qcy9jaHJvbWUvZ2V0dXNlcm1lZGlhLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy1hZGFwdGVyL3NyYy9qcy9jaHJvbWUvZ2V0ZGlzcGxheW1lZGlhLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy1hZGFwdGVyL3NyYy9qcy9jaHJvbWUvY2hyb21lX3NoaW0uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9ub2RlX21vZHVsZXMvd2VicnRjLWFkYXB0ZXIvc3JjL2pzL2VkZ2UvZmlsdGVyaWNlc2VydmVycy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGVlcmpzL25vZGVfbW9kdWxlcy9zZHAvc2RwLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvbm9kZV9tb2R1bGVzL3J0Y3BlZXJjb25uZWN0aW9uLXNoaW0vcnRjcGVlcmNvbm5lY3Rpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9ub2RlX21vZHVsZXMvd2VicnRjLWFkYXB0ZXIvc3JjL2pzL2VkZ2UvZ2V0dXNlcm1lZGlhLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy1hZGFwdGVyL3NyYy9qcy9lZGdlL2dldGRpc3BsYXltZWRpYS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGVlcmpzL25vZGVfbW9kdWxlcy93ZWJydGMtYWRhcHRlci9zcmMvanMvZWRnZS9lZGdlX3NoaW0uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9ub2RlX21vZHVsZXMvd2VicnRjLWFkYXB0ZXIvc3JjL2pzL2ZpcmVmb3gvZ2V0dXNlcm1lZGlhLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy1hZGFwdGVyL3NyYy9qcy9maXJlZm94L2dldGRpc3BsYXltZWRpYS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGVlcmpzL25vZGVfbW9kdWxlcy93ZWJydGMtYWRhcHRlci9zcmMvanMvZmlyZWZveC9maXJlZm94X3NoaW0uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9ub2RlX21vZHVsZXMvd2VicnRjLWFkYXB0ZXIvc3JjL2pzL3NhZmFyaS9zYWZhcmlfc2hpbS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGVlcmpzL25vZGVfbW9kdWxlcy93ZWJydGMtYWRhcHRlci9zcmMvanMvY29tbW9uX3NoaW0uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9ub2RlX21vZHVsZXMvd2VicnRjLWFkYXB0ZXIvc3JjL2pzL2FkYXB0ZXJfZmFjdG9yeS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGVlcmpzL25vZGVfbW9kdWxlcy93ZWJydGMtYWRhcHRlci9zcmMvanMvYWRhcHRlcl9jb3JlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvZGlzdC9hZGFwdGVyLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvZGlzdC9zdXBwb3J0cy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGVlcmpzL2Rpc3QvdXRpbC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcGVlcmpzL25vZGVfbW9kdWxlcy9ldmVudGVtaXR0ZXIzL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvZGlzdC9sb2dnZXIudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9kaXN0L2VudW1zLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvZGlzdC9zb2NrZXQudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9kaXN0L25lZ290aWF0b3IudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9kaXN0L2Jhc2Vjb25uZWN0aW9uLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvZGlzdC9tZWRpYWNvbm5lY3Rpb24udHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9kaXN0L2VuY29kaW5nUXVldWUudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9kaXN0L2RhdGFjb25uZWN0aW9uLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wZWVyanMvZGlzdC9hcGkudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9kaXN0L3BlZXIudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3BlZXJqcy9kaXN0L2V4cG9ydHMudHMiLCAiLi4vLi4vc3JjL3NlcnZlci9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsidmFyIGJpbmFyeUZlYXR1cmVzID0ge307XHJcbmJpbmFyeUZlYXR1cmVzLnVzZUJsb2JCdWlsZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICB0cnkge1xyXG4gICAgbmV3IEJsb2IoW10pO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufSkoKTtcclxuXHJcbmJpbmFyeUZlYXR1cmVzLnVzZUFycmF5QnVmZmVyVmlldyA9ICFiaW5hcnlGZWF0dXJlcy51c2VCbG9iQnVpbGRlciAmJiAoZnVuY3Rpb24gKCkge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gKG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShbXSldKSkuc2l6ZSA9PT0gMDtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5iaW5hcnlGZWF0dXJlcyA9IGJpbmFyeUZlYXR1cmVzO1xyXG52YXIgQmxvYkJ1aWxkZXIgPSBtb2R1bGUuZXhwb3J0cy5CbG9iQnVpbGRlcjtcclxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgQmxvYkJ1aWxkZXIgPSBtb2R1bGUuZXhwb3J0cy5CbG9iQnVpbGRlciA9IHdpbmRvdy5XZWJLaXRCbG9iQnVpbGRlciB8fFxyXG4gICAgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8IHdpbmRvdy5NU0Jsb2JCdWlsZGVyIHx8IHdpbmRvdy5CbG9iQnVpbGRlcjtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVmZmVyQnVpbGRlciAoKSB7XHJcbiAgdGhpcy5fcGllY2VzID0gW107XHJcbiAgdGhpcy5fcGFydHMgPSBbXTtcclxufVxyXG5cclxuQnVmZmVyQnVpbGRlci5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICBpZiAodHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSB7XHJcbiAgICB0aGlzLl9waWVjZXMucHVzaChkYXRhKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgdGhpcy5fcGFydHMucHVzaChkYXRhKTtcclxuICB9XHJcbn07XHJcblxyXG5CdWZmZXJCdWlsZGVyLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAodGhpcy5fcGllY2VzLmxlbmd0aCA+IDApIHtcclxuICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLl9waWVjZXMpO1xyXG4gICAgaWYgKCFiaW5hcnlGZWF0dXJlcy51c2VBcnJheUJ1ZmZlclZpZXcpIHtcclxuICAgICAgYnVmID0gYnVmLmJ1ZmZlcjtcclxuICAgIH1cclxuICAgIHRoaXMuX3BhcnRzLnB1c2goYnVmKTtcclxuICAgIHRoaXMuX3BpZWNlcyA9IFtdO1xyXG4gIH1cclxufTtcclxuXHJcbkJ1ZmZlckJ1aWxkZXIucHJvdG90eXBlLmdldEJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLmZsdXNoKCk7XHJcbiAgaWYgKGJpbmFyeUZlYXR1cmVzLnVzZUJsb2JCdWlsZGVyKSB7XHJcbiAgICB2YXIgYnVpbGRlciA9IG5ldyBCbG9iQnVpbGRlcigpO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlpID0gdGhpcy5fcGFydHMubGVuZ3RoOyBpIDwgaWk7IGkrKykge1xyXG4gICAgICBidWlsZGVyLmFwcGVuZCh0aGlzLl9wYXJ0c1tpXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYnVpbGRlci5nZXRCbG9iKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBuZXcgQmxvYih0aGlzLl9wYXJ0cyk7XHJcbiAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMuQnVmZmVyQnVpbGRlciA9IEJ1ZmZlckJ1aWxkZXI7XHJcbiIsICJ2YXIgQnVmZmVyQnVpbGRlciA9IHJlcXVpcmUoJy4vYnVmZmVyYnVpbGRlcicpLkJ1ZmZlckJ1aWxkZXI7XHJcbnZhciBiaW5hcnlGZWF0dXJlcyA9IHJlcXVpcmUoJy4vYnVmZmVyYnVpbGRlcicpLmJpbmFyeUZlYXR1cmVzO1xyXG5cclxudmFyIEJpbmFyeVBhY2sgPSB7XHJcbiAgdW5wYWNrOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgdmFyIHVucGFja2VyID0gbmV3IFVucGFja2VyKGRhdGEpO1xyXG4gICAgcmV0dXJuIHVucGFja2VyLnVucGFjaygpO1xyXG4gIH0sXHJcbiAgcGFjazogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIHZhciBwYWNrZXIgPSBuZXcgUGFja2VyKCk7XHJcbiAgICBwYWNrZXIucGFjayhkYXRhKTtcclxuICAgIHZhciBidWZmZXIgPSBwYWNrZXIuZ2V0QnVmZmVyKCk7XHJcbiAgICByZXR1cm4gYnVmZmVyO1xyXG4gIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmluYXJ5UGFjaztcclxuXHJcbmZ1bmN0aW9uIFVucGFja2VyIChkYXRhKSB7XHJcbiAgLy8gRGF0YSBpcyBBcnJheUJ1ZmZlclxyXG4gIHRoaXMuaW5kZXggPSAwO1xyXG4gIHRoaXMuZGF0YUJ1ZmZlciA9IGRhdGE7XHJcbiAgdGhpcy5kYXRhVmlldyA9IG5ldyBVaW50OEFycmF5KHRoaXMuZGF0YUJ1ZmZlcik7XHJcbiAgdGhpcy5sZW5ndGggPSB0aGlzLmRhdGFCdWZmZXIuYnl0ZUxlbmd0aDtcclxufVxyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFjayA9IGZ1bmN0aW9uICgpIHtcclxuICB2YXIgdHlwZSA9IHRoaXMudW5wYWNrX3VpbnQ4KCk7XHJcbiAgaWYgKHR5cGUgPCAweDgwKSB7XHJcbiAgICByZXR1cm4gdHlwZTtcclxuICB9IGVsc2UgaWYgKCh0eXBlIF4gMHhlMCkgPCAweDIwKSB7XHJcbiAgICByZXR1cm4gKHR5cGUgXiAweGUwKSAtIDB4MjA7XHJcbiAgfVxyXG5cclxuICB2YXIgc2l6ZTtcclxuICBpZiAoKHNpemUgPSB0eXBlIF4gMHhhMCkgPD0gMHgwZikge1xyXG4gICAgcmV0dXJuIHRoaXMudW5wYWNrX3JhdyhzaXplKTtcclxuICB9IGVsc2UgaWYgKChzaXplID0gdHlwZSBeIDB4YjApIDw9IDB4MGYpIHtcclxuICAgIHJldHVybiB0aGlzLnVucGFja19zdHJpbmcoc2l6ZSk7XHJcbiAgfSBlbHNlIGlmICgoc2l6ZSA9IHR5cGUgXiAweDkwKSA8PSAweDBmKSB7XHJcbiAgICByZXR1cm4gdGhpcy51bnBhY2tfYXJyYXkoc2l6ZSk7XHJcbiAgfSBlbHNlIGlmICgoc2l6ZSA9IHR5cGUgXiAweDgwKSA8PSAweDBmKSB7XHJcbiAgICByZXR1cm4gdGhpcy51bnBhY2tfbWFwKHNpemUpO1xyXG4gIH1cclxuXHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIDB4YzA6XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgY2FzZSAweGMxOlxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY2FzZSAweGMyOlxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBjYXNlIDB4YzM6XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgY2FzZSAweGNhOlxyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfZmxvYXQoKTtcclxuICAgIGNhc2UgMHhjYjpcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX2RvdWJsZSgpO1xyXG4gICAgY2FzZSAweGNjOlxyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfdWludDgoKTtcclxuICAgIGNhc2UgMHhjZDpcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX3VpbnQxNigpO1xyXG4gICAgY2FzZSAweGNlOlxyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfdWludDMyKCk7XHJcbiAgICBjYXNlIDB4Y2Y6XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja191aW50NjQoKTtcclxuICAgIGNhc2UgMHhkMDpcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX2ludDgoKTtcclxuICAgIGNhc2UgMHhkMTpcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX2ludDE2KCk7XHJcbiAgICBjYXNlIDB4ZDI6XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19pbnQzMigpO1xyXG4gICAgY2FzZSAweGQzOlxyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfaW50NjQoKTtcclxuICAgIGNhc2UgMHhkNDpcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIGNhc2UgMHhkNTpcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIGNhc2UgMHhkNjpcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIGNhc2UgMHhkNzpcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIGNhc2UgMHhkODpcclxuICAgICAgc2l6ZSA9IHRoaXMudW5wYWNrX3VpbnQxNigpO1xyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfc3RyaW5nKHNpemUpO1xyXG4gICAgY2FzZSAweGQ5OlxyXG4gICAgICBzaXplID0gdGhpcy51bnBhY2tfdWludDMyKCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19zdHJpbmcoc2l6ZSk7XHJcbiAgICBjYXNlIDB4ZGE6XHJcbiAgICAgIHNpemUgPSB0aGlzLnVucGFja191aW50MTYoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX3JhdyhzaXplKTtcclxuICAgIGNhc2UgMHhkYjpcclxuICAgICAgc2l6ZSA9IHRoaXMudW5wYWNrX3VpbnQzMigpO1xyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfcmF3KHNpemUpO1xyXG4gICAgY2FzZSAweGRjOlxyXG4gICAgICBzaXplID0gdGhpcy51bnBhY2tfdWludDE2KCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19hcnJheShzaXplKTtcclxuICAgIGNhc2UgMHhkZDpcclxuICAgICAgc2l6ZSA9IHRoaXMudW5wYWNrX3VpbnQzMigpO1xyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfYXJyYXkoc2l6ZSk7XHJcbiAgICBjYXNlIDB4ZGU6XHJcbiAgICAgIHNpemUgPSB0aGlzLnVucGFja191aW50MTYoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX21hcChzaXplKTtcclxuICAgIGNhc2UgMHhkZjpcclxuICAgICAgc2l6ZSA9IHRoaXMudW5wYWNrX3VpbnQzMigpO1xyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfbWFwKHNpemUpO1xyXG4gIH1cclxufTtcclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfdWludDggPSBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGJ5dGUgPSB0aGlzLmRhdGFWaWV3W3RoaXMuaW5kZXhdICYgMHhmZjtcclxuICB0aGlzLmluZGV4Kys7XHJcbiAgcmV0dXJuIGJ5dGU7XHJcbn07XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX3VpbnQxNiA9IGZ1bmN0aW9uICgpIHtcclxuICB2YXIgYnl0ZXMgPSB0aGlzLnJlYWQoMik7XHJcbiAgdmFyIHVpbnQxNiA9XHJcbiAgICAoKGJ5dGVzWzBdICYgMHhmZikgKiAyNTYpICsgKGJ5dGVzWzFdICYgMHhmZik7XHJcbiAgdGhpcy5pbmRleCArPSAyO1xyXG4gIHJldHVybiB1aW50MTY7XHJcbn07XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX3VpbnQzMiA9IGZ1bmN0aW9uICgpIHtcclxuICB2YXIgYnl0ZXMgPSB0aGlzLnJlYWQoNCk7XHJcbiAgdmFyIHVpbnQzMiA9XHJcbiAgICAoKGJ5dGVzWzBdICogMjU2ICtcclxuICAgICAgYnl0ZXNbMV0pICogMjU2ICtcclxuICAgICAgYnl0ZXNbMl0pICogMjU2ICtcclxuICAgIGJ5dGVzWzNdO1xyXG4gIHRoaXMuaW5kZXggKz0gNDtcclxuICByZXR1cm4gdWludDMyO1xyXG59O1xyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja191aW50NjQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGJ5dGVzID0gdGhpcy5yZWFkKDgpO1xyXG4gIHZhciB1aW50NjQgPVxyXG4gICAgKCgoKCgoYnl0ZXNbMF0gKiAyNTYgK1xyXG4gICAgICBieXRlc1sxXSkgKiAyNTYgK1xyXG4gICAgICBieXRlc1syXSkgKiAyNTYgK1xyXG4gICAgICBieXRlc1szXSkgKiAyNTYgK1xyXG4gICAgICBieXRlc1s0XSkgKiAyNTYgK1xyXG4gICAgICBieXRlc1s1XSkgKiAyNTYgK1xyXG4gICAgICBieXRlc1s2XSkgKiAyNTYgK1xyXG4gICAgYnl0ZXNbN107XHJcbiAgdGhpcy5pbmRleCArPSA4O1xyXG4gIHJldHVybiB1aW50NjQ7XHJcbn07XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX2ludDggPSBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHVpbnQ4ID0gdGhpcy51bnBhY2tfdWludDgoKTtcclxuICByZXR1cm4gKHVpbnQ4IDwgMHg4MCkgPyB1aW50OCA6IHVpbnQ4IC0gKDEgPDwgOCk7XHJcbn07XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX2ludDE2ID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciB1aW50MTYgPSB0aGlzLnVucGFja191aW50MTYoKTtcclxuICByZXR1cm4gKHVpbnQxNiA8IDB4ODAwMCkgPyB1aW50MTYgOiB1aW50MTYgLSAoMSA8PCAxNik7XHJcbn07XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX2ludDMyID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciB1aW50MzIgPSB0aGlzLnVucGFja191aW50MzIoKTtcclxuICByZXR1cm4gKHVpbnQzMiA8IE1hdGgucG93KDIsIDMxKSkgPyB1aW50MzJcclxuICAgIDogdWludDMyIC0gTWF0aC5wb3coMiwgMzIpO1xyXG59O1xyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja19pbnQ2NCA9IGZ1bmN0aW9uICgpIHtcclxuICB2YXIgdWludDY0ID0gdGhpcy51bnBhY2tfdWludDY0KCk7XHJcbiAgcmV0dXJuICh1aW50NjQgPCBNYXRoLnBvdygyLCA2MykpID8gdWludDY0XHJcbiAgICA6IHVpbnQ2NCAtIE1hdGgucG93KDIsIDY0KTtcclxufTtcclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfcmF3ID0gZnVuY3Rpb24gKHNpemUpIHtcclxuICBpZiAodGhpcy5sZW5ndGggPCB0aGlzLmluZGV4ICsgc2l6ZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdCaW5hcnlQYWNrRmFpbHVyZTogaW5kZXggaXMgb3V0IG9mIHJhbmdlJyArXHJcbiAgICAgICcgJyArIHRoaXMuaW5kZXggKyAnICcgKyBzaXplICsgJyAnICsgdGhpcy5sZW5ndGgpO1xyXG4gIH1cclxuICB2YXIgYnVmID0gdGhpcy5kYXRhQnVmZmVyLnNsaWNlKHRoaXMuaW5kZXgsIHRoaXMuaW5kZXggKyBzaXplKTtcclxuICB0aGlzLmluZGV4ICs9IHNpemU7XHJcblxyXG4gIC8vIGJ1ZiA9IHV0aWwuYnVmZmVyVG9TdHJpbmcoYnVmKTtcclxuXHJcbiAgcmV0dXJuIGJ1ZjtcclxufTtcclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfc3RyaW5nID0gZnVuY3Rpb24gKHNpemUpIHtcclxuICB2YXIgYnl0ZXMgPSB0aGlzLnJlYWQoc2l6ZSk7XHJcbiAgdmFyIGkgPSAwO1xyXG4gIHZhciBzdHIgPSAnJztcclxuICB2YXIgYztcclxuICB2YXIgY29kZTtcclxuXHJcbiAgd2hpbGUgKGkgPCBzaXplKSB7XHJcbiAgICBjID0gYnl0ZXNbaV07XHJcbiAgICBpZiAoYyA8IDEyOCkge1xyXG4gICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcclxuICAgICAgaSsrO1xyXG4gICAgfSBlbHNlIGlmICgoYyBeIDB4YzApIDwgMzIpIHtcclxuICAgICAgY29kZSA9ICgoYyBeIDB4YzApIDw8IDYpIHwgKGJ5dGVzW2kgKyAxXSAmIDYzKTtcclxuICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XHJcbiAgICAgIGkgKz0gMjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvZGUgPSAoKGMgJiAxNSkgPDwgMTIpIHwgKChieXRlc1tpICsgMV0gJiA2MykgPDwgNikgfFxyXG4gICAgICAgIChieXRlc1tpICsgMl0gJiA2Myk7XHJcbiAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xyXG4gICAgICBpICs9IDM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aGlzLmluZGV4ICs9IHNpemU7XHJcbiAgcmV0dXJuIHN0cjtcclxufTtcclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfYXJyYXkgPSBmdW5jdGlvbiAoc2l6ZSkge1xyXG4gIHZhciBvYmplY3RzID0gbmV3IEFycmF5KHNpemUpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICBvYmplY3RzW2ldID0gdGhpcy51bnBhY2soKTtcclxuICB9XHJcbiAgcmV0dXJuIG9iamVjdHM7XHJcbn07XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX21hcCA9IGZ1bmN0aW9uIChzaXplKSB7XHJcbiAgdmFyIG1hcCA9IHt9O1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICB2YXIga2V5ID0gdGhpcy51bnBhY2soKTtcclxuICAgIHZhciB2YWx1ZSA9IHRoaXMudW5wYWNrKCk7XHJcbiAgICBtYXBba2V5XSA9IHZhbHVlO1xyXG4gIH1cclxuICByZXR1cm4gbWFwO1xyXG59O1xyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja19mbG9hdCA9IGZ1bmN0aW9uICgpIHtcclxuICB2YXIgdWludDMyID0gdGhpcy51bnBhY2tfdWludDMyKCk7XHJcbiAgdmFyIHNpZ24gPSB1aW50MzIgPj4gMzE7XHJcbiAgdmFyIGV4cCA9ICgodWludDMyID4+IDIzKSAmIDB4ZmYpIC0gMTI3O1xyXG4gIHZhciBmcmFjdGlvbiA9ICh1aW50MzIgJiAweDdmZmZmZikgfCAweDgwMDAwMDtcclxuICByZXR1cm4gKHNpZ24gPT09IDAgPyAxIDogLTEpICpcclxuICAgIGZyYWN0aW9uICogTWF0aC5wb3coMiwgZXhwIC0gMjMpO1xyXG59O1xyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja19kb3VibGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGgzMiA9IHRoaXMudW5wYWNrX3VpbnQzMigpO1xyXG4gIHZhciBsMzIgPSB0aGlzLnVucGFja191aW50MzIoKTtcclxuICB2YXIgc2lnbiA9IGgzMiA+PiAzMTtcclxuICB2YXIgZXhwID0gKChoMzIgPj4gMjApICYgMHg3ZmYpIC0gMTAyMztcclxuICB2YXIgaGZyYWMgPSAoaDMyICYgMHhmZmZmZikgfCAweDEwMDAwMDtcclxuICB2YXIgZnJhYyA9IGhmcmFjICogTWF0aC5wb3coMiwgZXhwIC0gMjApICtcclxuICAgIGwzMiAqIE1hdGgucG93KDIsIGV4cCAtIDUyKTtcclxuICByZXR1cm4gKHNpZ24gPT09IDAgPyAxIDogLTEpICogZnJhYztcclxufTtcclxuXHJcblVucGFja2VyLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gKGxlbmd0aCkge1xyXG4gIHZhciBqID0gdGhpcy5pbmRleDtcclxuICBpZiAoaiArIGxlbmd0aCA8PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVZpZXcuc3ViYXJyYXkoaiwgaiArIGxlbmd0aCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignQmluYXJ5UGFja0ZhaWx1cmU6IHJlYWQgaW5kZXggb3V0IG9mIHJhbmdlJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gUGFja2VyICgpIHtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIgPSBuZXcgQnVmZmVyQnVpbGRlcigpO1xyXG59XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLmdldEJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gdGhpcy5idWZmZXJCdWlsZGVyLmdldEJ1ZmZlcigpO1xyXG59O1xyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgdmFyIHR5cGUgPSB0eXBlb2YgKHZhbHVlKTtcclxuICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHRoaXMucGFja19zdHJpbmcodmFsdWUpO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicpIHtcclxuICAgIGlmIChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUpIHtcclxuICAgICAgdGhpcy5wYWNrX2ludGVnZXIodmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYWNrX2RvdWJsZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnYm9vbGVhbicpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4YzMpO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGMyKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4YzApO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4YzApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGNvbnN0cnVjdG9yID0gdmFsdWUuY29uc3RydWN0b3I7XHJcbiAgICAgIGlmIChjb25zdHJ1Y3RvciA9PSBBcnJheSkge1xyXG4gICAgICAgIHRoaXMucGFja19hcnJheSh2YWx1ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29uc3RydWN0b3IgPT0gQmxvYiB8fCBjb25zdHJ1Y3RvciA9PSBGaWxlIHx8IHZhbHVlIGluc3RhbmNlb2YgQmxvYiB8fCB2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpIHtcclxuICAgICAgICB0aGlzLnBhY2tfYmluKHZhbHVlKTtcclxuICAgICAgfSBlbHNlIGlmIChjb25zdHJ1Y3RvciA9PSBBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIGlmIChiaW5hcnlGZWF0dXJlcy51c2VBcnJheUJ1ZmZlclZpZXcpIHtcclxuICAgICAgICAgIHRoaXMucGFja19iaW4obmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5wYWNrX2Jpbih2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKCdCWVRFU19QRVJfRUxFTUVOVCcgaW4gdmFsdWUpIHtcclxuICAgICAgICBpZiAoYmluYXJ5RmVhdHVyZXMudXNlQXJyYXlCdWZmZXJWaWV3KSB7XHJcbiAgICAgICAgICB0aGlzLnBhY2tfYmluKG5ldyBVaW50OEFycmF5KHZhbHVlLmJ1ZmZlcikpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnBhY2tfYmluKHZhbHVlLmJ1ZmZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKChjb25zdHJ1Y3RvciA9PSBPYmplY3QpIHx8IChjb25zdHJ1Y3Rvci50b1N0cmluZygpLnN0YXJ0c1dpdGgoJ2NsYXNzJykpKSB7XHJcbiAgICAgICAgdGhpcy5wYWNrX29iamVjdCh2YWx1ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29uc3RydWN0b3IgPT0gRGF0ZSkge1xyXG4gICAgICAgIHRoaXMucGFja19zdHJpbmcodmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlLnRvQmluYXJ5UGFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQodmFsdWUudG9CaW5hcnlQYWNrKCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVHlwZSBcIicgKyBjb25zdHJ1Y3Rvci50b1N0cmluZygpICsgJ1wiIG5vdCB5ZXQgc3VwcG9ydGVkJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdUeXBlIFwiJyArIHR5cGUgKyAnXCIgbm90IHlldCBzdXBwb3J0ZWQnKTtcclxuICB9XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmZsdXNoKCk7XHJcbn07XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfYmluID0gZnVuY3Rpb24gKGJsb2IpIHtcclxuICB2YXIgbGVuZ3RoID0gYmxvYi5sZW5ndGggfHwgYmxvYi5ieXRlTGVuZ3RoIHx8IGJsb2Iuc2l6ZTtcclxuICBpZiAobGVuZ3RoIDw9IDB4MGYpIHtcclxuICAgIHRoaXMucGFja191aW50OCgweGEwICsgbGVuZ3RoKTtcclxuICB9IGVsc2UgaWYgKGxlbmd0aCA8PSAweGZmZmYpIHtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkYSk7XHJcbiAgICB0aGlzLnBhY2tfdWludDE2KGxlbmd0aCk7XHJcbiAgfSBlbHNlIGlmIChsZW5ndGggPD0gMHhmZmZmZmZmZikge1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGRiKTtcclxuICAgIHRoaXMucGFja191aW50MzIobGVuZ3RoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxlbmd0aCcpO1xyXG4gIH1cclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKGJsb2IpO1xyXG59O1xyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX3N0cmluZyA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICB2YXIgbGVuZ3RoID0gdXRmOExlbmd0aChzdHIpO1xyXG5cclxuICBpZiAobGVuZ3RoIDw9IDB4MGYpIHtcclxuICAgIHRoaXMucGFja191aW50OCgweGIwICsgbGVuZ3RoKTtcclxuICB9IGVsc2UgaWYgKGxlbmd0aCA8PSAweGZmZmYpIHtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkOCk7XHJcbiAgICB0aGlzLnBhY2tfdWludDE2KGxlbmd0aCk7XHJcbiAgfSBlbHNlIGlmIChsZW5ndGggPD0gMHhmZmZmZmZmZikge1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGQ5KTtcclxuICAgIHRoaXMucGFja191aW50MzIobGVuZ3RoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxlbmd0aCcpO1xyXG4gIH1cclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKHN0cik7XHJcbn07XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfYXJyYXkgPSBmdW5jdGlvbiAoYXJ5KSB7XHJcbiAgdmFyIGxlbmd0aCA9IGFyeS5sZW5ndGg7XHJcbiAgaWYgKGxlbmd0aCA8PSAweDBmKSB7XHJcbiAgICB0aGlzLnBhY2tfdWludDgoMHg5MCArIGxlbmd0aCk7XHJcbiAgfSBlbHNlIGlmIChsZW5ndGggPD0gMHhmZmZmKSB7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4ZGMpO1xyXG4gICAgdGhpcy5wYWNrX3VpbnQxNihsZW5ndGgpO1xyXG4gIH0gZWxzZSBpZiAobGVuZ3RoIDw9IDB4ZmZmZmZmZmYpIHtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkZCk7XHJcbiAgICB0aGlzLnBhY2tfdWludDMyKGxlbmd0aCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsZW5ndGgnKTtcclxuICB9XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgdGhpcy5wYWNrKGFyeVtpXSk7XHJcbiAgfVxyXG59O1xyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX2ludGVnZXIgPSBmdW5jdGlvbiAobnVtKSB7XHJcbiAgaWYgKG51bSA+PSAtMHgyMCAmJiBudW0gPD0gMHg3Zikge1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZChudW0gJiAweGZmKTtcclxuICB9IGVsc2UgaWYgKG51bSA+PSAweDAwICYmIG51bSA8PSAweGZmKSB7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4Y2MpO1xyXG4gICAgdGhpcy5wYWNrX3VpbnQ4KG51bSk7XHJcbiAgfSBlbHNlIGlmIChudW0gPj0gLTB4ODAgJiYgbnVtIDw9IDB4N2YpIHtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkMCk7XHJcbiAgICB0aGlzLnBhY2tfaW50OChudW0pO1xyXG4gIH0gZWxzZSBpZiAobnVtID49IDB4MDAwMCAmJiBudW0gPD0gMHhmZmZmKSB7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4Y2QpO1xyXG4gICAgdGhpcy5wYWNrX3VpbnQxNihudW0pO1xyXG4gIH0gZWxzZSBpZiAobnVtID49IC0weDgwMDAgJiYgbnVtIDw9IDB4N2ZmZikge1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGQxKTtcclxuICAgIHRoaXMucGFja19pbnQxNihudW0pO1xyXG4gIH0gZWxzZSBpZiAobnVtID49IDB4MDAwMDAwMDAgJiYgbnVtIDw9IDB4ZmZmZmZmZmYpIHtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhjZSk7XHJcbiAgICB0aGlzLnBhY2tfdWludDMyKG51bSk7XHJcbiAgfSBlbHNlIGlmIChudW0gPj0gLTB4ODAwMDAwMDAgJiYgbnVtIDw9IDB4N2ZmZmZmZmYpIHtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkMik7XHJcbiAgICB0aGlzLnBhY2tfaW50MzIobnVtKTtcclxuICB9IGVsc2UgaWYgKG51bSA+PSAtMHg4MDAwMDAwMDAwMDAwMDAwICYmIG51bSA8PSAweDdGRkZGRkZGRkZGRkZGRkYpIHtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkMyk7XHJcbiAgICB0aGlzLnBhY2tfaW50NjQobnVtKTtcclxuICB9IGVsc2UgaWYgKG51bSA+PSAweDAwMDAwMDAwMDAwMDAwMDAgJiYgbnVtIDw9IDB4RkZGRkZGRkZGRkZGRkZGRikge1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGNmKTtcclxuICAgIHRoaXMucGFja191aW50NjQobnVtKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGludGVnZXInKTtcclxuICB9XHJcbn07XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfZG91YmxlID0gZnVuY3Rpb24gKG51bSkge1xyXG4gIHZhciBzaWduID0gMDtcclxuICBpZiAobnVtIDwgMCkge1xyXG4gICAgc2lnbiA9IDE7XHJcbiAgICBudW0gPSAtbnVtO1xyXG4gIH1cclxuICB2YXIgZXhwID0gTWF0aC5mbG9vcihNYXRoLmxvZyhudW0pIC8gTWF0aC5MTjIpO1xyXG4gIHZhciBmcmFjMCA9IG51bSAvIE1hdGgucG93KDIsIGV4cCkgLSAxO1xyXG4gIHZhciBmcmFjMSA9IE1hdGguZmxvb3IoZnJhYzAgKiBNYXRoLnBvdygyLCA1MikpO1xyXG4gIHZhciBiMzIgPSBNYXRoLnBvdygyLCAzMik7XHJcbiAgdmFyIGgzMiA9IChzaWduIDw8IDMxKSB8ICgoZXhwICsgMTAyMykgPDwgMjApIHxcclxuICAgIChmcmFjMSAvIGIzMikgJiAweDBmZmZmZjtcclxuICB2YXIgbDMyID0gZnJhYzEgJSBiMzI7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGNiKTtcclxuICB0aGlzLnBhY2tfaW50MzIoaDMyKTtcclxuICB0aGlzLnBhY2tfaW50MzIobDMyKTtcclxufTtcclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja19vYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcclxuICBpZiAobGVuZ3RoIDw9IDB4MGYpIHtcclxuICAgIHRoaXMucGFja191aW50OCgweDgwICsgbGVuZ3RoKTtcclxuICB9IGVsc2UgaWYgKGxlbmd0aCA8PSAweGZmZmYpIHtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkZSk7XHJcbiAgICB0aGlzLnBhY2tfdWludDE2KGxlbmd0aCk7XHJcbiAgfSBlbHNlIGlmIChsZW5ndGggPD0gMHhmZmZmZmZmZikge1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGRmKTtcclxuICAgIHRoaXMucGFja191aW50MzIobGVuZ3RoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxlbmd0aCcpO1xyXG4gIH1cclxuICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xyXG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICB0aGlzLnBhY2socHJvcCk7XHJcbiAgICAgIHRoaXMucGFjayhvYmpbcHJvcF0pO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja191aW50OCA9IGZ1bmN0aW9uIChudW0pIHtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKG51bSk7XHJcbn07XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfdWludDE2ID0gZnVuY3Rpb24gKG51bSkge1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQobnVtID4+IDgpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQobnVtICYgMHhmZik7XHJcbn07XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfdWludDMyID0gZnVuY3Rpb24gKG51bSkge1xyXG4gIHZhciBuID0gbnVtICYgMHhmZmZmZmZmZjtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChuICYgMHhmZjAwMDAwMCkgPj4+IDI0KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChuICYgMHgwMGZmMDAwMCkgPj4+IDE2KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChuICYgMHgwMDAwZmYwMCkgPj4+IDgpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKG4gJiAweDAwMDAwMGZmKSk7XHJcbn07XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfdWludDY0ID0gZnVuY3Rpb24gKG51bSkge1xyXG4gIHZhciBoaWdoID0gbnVtIC8gTWF0aC5wb3coMiwgMzIpO1xyXG4gIHZhciBsb3cgPSBudW0gJSBNYXRoLnBvdygyLCAzMik7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgoaGlnaCAmIDB4ZmYwMDAwMDApID4+PiAyNCk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgoaGlnaCAmIDB4MDBmZjAwMDApID4+PiAxNik7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgoaGlnaCAmIDB4MDAwMGZmMDApID4+PiA4KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHgwMDAwMDBmZikpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGxvdyAmIDB4ZmYwMDAwMDApID4+PiAyNCk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobG93ICYgMHgwMGZmMDAwMCkgPj4+IDE2KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChsb3cgJiAweDAwMDBmZjAwKSA+Pj4gOCk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobG93ICYgMHgwMDAwMDBmZikpO1xyXG59O1xyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX2ludDggPSBmdW5jdGlvbiAobnVtKSB7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZChudW0gJiAweGZmKTtcclxufTtcclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja19pbnQxNiA9IGZ1bmN0aW9uIChudW0pIHtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChudW0gJiAweGZmMDApID4+IDgpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQobnVtICYgMHhmZik7XHJcbn07XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfaW50MzIgPSBmdW5jdGlvbiAobnVtKSB7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobnVtID4+PiAyNCkgJiAweGZmKTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChudW0gJiAweDAwZmYwMDAwKSA+Pj4gMTYpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKG51bSAmIDB4MDAwMGZmMDApID4+PiA4KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChudW0gJiAweDAwMDAwMGZmKSk7XHJcbn07XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfaW50NjQgPSBmdW5jdGlvbiAobnVtKSB7XHJcbiAgdmFyIGhpZ2ggPSBNYXRoLmZsb29yKG51bSAvIE1hdGgucG93KDIsIDMyKSk7XHJcbiAgdmFyIGxvdyA9IG51bSAlIE1hdGgucG93KDIsIDMyKTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHhmZjAwMDAwMCkgPj4+IDI0KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHgwMGZmMDAwMCkgPj4+IDE2KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHgwMDAwZmYwMCkgPj4+IDgpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGhpZ2ggJiAweDAwMDAwMGZmKSk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobG93ICYgMHhmZjAwMDAwMCkgPj4+IDI0KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChsb3cgJiAweDAwZmYwMDAwKSA+Pj4gMTYpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGxvdyAmIDB4MDAwMGZmMDApID4+PiA4KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChsb3cgJiAweDAwMDAwMGZmKSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBfdXRmOFJlcGxhY2UgKG0pIHtcclxuICB2YXIgY29kZSA9IG0uY2hhckNvZGVBdCgwKTtcclxuXHJcbiAgaWYgKGNvZGUgPD0gMHg3ZmYpIHJldHVybiAnMDAnO1xyXG4gIGlmIChjb2RlIDw9IDB4ZmZmZikgcmV0dXJuICcwMDAnO1xyXG4gIGlmIChjb2RlIDw9IDB4MWZmZmZmKSByZXR1cm4gJzAwMDAnO1xyXG4gIGlmIChjb2RlIDw9IDB4M2ZmZmZmZikgcmV0dXJuICcwMDAwMCc7XHJcbiAgcmV0dXJuICcwMDAwMDAnO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1dGY4TGVuZ3RoIChzdHIpIHtcclxuICBpZiAoc3RyLmxlbmd0aCA+IDYwMCkge1xyXG4gICAgLy8gQmxvYiBtZXRob2QgZmFzdGVyIGZvciBsYXJnZSBzdHJpbmdzXHJcbiAgICByZXR1cm4gKG5ldyBCbG9iKFtzdHJdKSkuc2l6ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXlxcdTAwMDAtXFx1MDA3Rl0vZywgX3V0ZjhSZXBsYWNlKS5sZW5ndGg7XHJcbiAgfVxyXG59XHJcbiIsICIvKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxubGV0IGxvZ0Rpc2FibGVkXyA9IHRydWU7XG5sZXQgZGVwcmVjYXRpb25XYXJuaW5nc18gPSB0cnVlO1xuXG4vKipcbiAqIEV4dHJhY3QgYnJvd3NlciB2ZXJzaW9uIG91dCBvZiB0aGUgcHJvdmlkZWQgdXNlciBhZ2VudCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHshc3RyaW5nfSB1YXN0cmluZyB1c2VyQWdlbnQgc3RyaW5nLlxuICogQHBhcmFtIHshc3RyaW5nfSBleHByIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIGFzIG1hdGNoIGNyaXRlcmlhLlxuICogQHBhcmFtIHshbnVtYmVyfSBwb3MgcG9zaXRpb24gaW4gdGhlIHZlcnNpb24gc3RyaW5nIHRvIGJlIHJldHVybmVkLlxuICogQHJldHVybiB7IW51bWJlcn0gYnJvd3NlciB2ZXJzaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFZlcnNpb24odWFzdHJpbmcsIGV4cHIsIHBvcykge1xuICBjb25zdCBtYXRjaCA9IHVhc3RyaW5nLm1hdGNoKGV4cHIpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID49IHBvcyAmJiBwYXJzZUludChtYXRjaFtwb3NdLCAxMCk7XG59XG5cbi8vIFdyYXBzIHRoZSBwZWVyY29ubmVjdGlvbiBldmVudCBldmVudE5hbWVUb1dyYXAgaW4gYSBmdW5jdGlvblxuLy8gd2hpY2ggcmV0dXJucyB0aGUgbW9kaWZpZWQgZXZlbnQgb2JqZWN0IChvciBmYWxzZSB0byBwcmV2ZW50XG4vLyB0aGUgZXZlbnQpLlxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgZXZlbnROYW1lVG9XcmFwLCB3cmFwcGVyKSB7XG4gIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHByb3RvID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgY29uc3QgbmF0aXZlQWRkRXZlbnRMaXN0ZW5lciA9IHByb3RvLmFkZEV2ZW50TGlzdGVuZXI7XG4gIHByb3RvLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihuYXRpdmVFdmVudE5hbWUsIGNiKSB7XG4gICAgaWYgKG5hdGl2ZUV2ZW50TmFtZSAhPT0gZXZlbnROYW1lVG9XcmFwKSB7XG4gICAgICByZXR1cm4gbmF0aXZlQWRkRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBjb25zdCB3cmFwcGVkQ2FsbGJhY2sgPSAoZSkgPT4ge1xuICAgICAgY29uc3QgbW9kaWZpZWRFdmVudCA9IHdyYXBwZXIoZSk7XG4gICAgICBpZiAobW9kaWZpZWRFdmVudCkge1xuICAgICAgICBpZiAoY2IuaGFuZGxlRXZlbnQpIHtcbiAgICAgICAgICBjYi5oYW5kbGVFdmVudChtb2RpZmllZEV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYihtb2RpZmllZEV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5fZXZlbnRNYXAgPSB0aGlzLl9ldmVudE1hcCB8fCB7fTtcbiAgICBpZiAoIXRoaXMuX2V2ZW50TWFwW2V2ZW50TmFtZVRvV3JhcF0pIHtcbiAgICAgIHRoaXMuX2V2ZW50TWFwW2V2ZW50TmFtZVRvV3JhcF0gPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50TWFwW2V2ZW50TmFtZVRvV3JhcF0uc2V0KGNiLCB3cmFwcGVkQ2FsbGJhY2spO1xuICAgIHJldHVybiBuYXRpdmVBZGRFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIFtuYXRpdmVFdmVudE5hbWUsXG4gICAgICB3cmFwcGVkQ2FsbGJhY2tdKTtcbiAgfTtcblxuICBjb25zdCBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyID0gcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50TmFtZSwgY2IpIHtcbiAgICBpZiAobmF0aXZlRXZlbnROYW1lICE9PSBldmVudE5hbWVUb1dyYXAgfHwgIXRoaXMuX2V2ZW50TWFwXG4gICAgICAgIHx8ICF0aGlzLl9ldmVudE1hcFtldmVudE5hbWVUb1dyYXBdKSB7XG4gICAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX2V2ZW50TWFwW2V2ZW50TmFtZVRvV3JhcF0uaGFzKGNiKSkge1xuICAgICAgcmV0dXJuIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgY29uc3QgdW53cmFwcGVkQ2IgPSB0aGlzLl9ldmVudE1hcFtldmVudE5hbWVUb1dyYXBdLmdldChjYik7XG4gICAgdGhpcy5fZXZlbnRNYXBbZXZlbnROYW1lVG9XcmFwXS5kZWxldGUoY2IpO1xuICAgIGlmICh0aGlzLl9ldmVudE1hcFtldmVudE5hbWVUb1dyYXBdLnNpemUgPT09IDApIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudE1hcFtldmVudE5hbWVUb1dyYXBdO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fZXZlbnRNYXApLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50TWFwO1xuICAgIH1cbiAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBbbmF0aXZlRXZlbnROYW1lLFxuICAgICAgdW53cmFwcGVkQ2JdKTtcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdvbicgKyBldmVudE5hbWVUb1dyYXAsIHtcbiAgICBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF07XG4gICAgfSxcbiAgICBzZXQoY2IpIHtcbiAgICAgIGlmICh0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lVG9XcmFwLFxuICAgICAgICAgICAgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0pO1xuICAgICAgICBkZWxldGUgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF07XG4gICAgICB9XG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZVRvV3JhcCxcbiAgICAgICAgICAgIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdID0gY2IpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlTG9nKGJvb2wpIHtcbiAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKCdBcmd1bWVudCB0eXBlOiAnICsgdHlwZW9mIGJvb2wgK1xuICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcbiAgfVxuICBsb2dEaXNhYmxlZF8gPSBib29sO1xuICByZXR1cm4gKGJvb2wpID8gJ2FkYXB0ZXIuanMgbG9nZ2luZyBkaXNhYmxlZCcgOlxuICAgICAgJ2FkYXB0ZXIuanMgbG9nZ2luZyBlbmFibGVkJztcbn1cblxuLyoqXG4gKiBEaXNhYmxlIG9yIGVuYWJsZSBkZXByZWNhdGlvbiB3YXJuaW5nc1xuICogQHBhcmFtIHshYm9vbGVhbn0gYm9vbCBzZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHdhcm5pbmdzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVdhcm5pbmdzKGJvb2wpIHtcbiAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKCdBcmd1bWVudCB0eXBlOiAnICsgdHlwZW9mIGJvb2wgK1xuICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcbiAgfVxuICBkZXByZWNhdGlvbldhcm5pbmdzXyA9ICFib29sO1xuICByZXR1cm4gJ2FkYXB0ZXIuanMgZGVwcmVjYXRpb24gd2FybmluZ3MgJyArIChib29sID8gJ2Rpc2FibGVkJyA6ICdlbmFibGVkJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2coKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChsb2dEaXNhYmxlZF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5sb2cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogU2hvd3MgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHN1Z2dlc3RpbmcgdGhlIG1vZGVybiBhbmQgc3BlYy1jb21wYXRpYmxlIEFQSS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlcHJlY2F0ZWQob2xkTWV0aG9kLCBuZXdNZXRob2QpIHtcbiAgaWYgKCFkZXByZWNhdGlvbldhcm5pbmdzXykge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zb2xlLndhcm4ob2xkTWV0aG9kICsgJyBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlICcgKyBuZXdNZXRob2QgK1xuICAgICAgJyBpbnN0ZWFkLicpO1xufVxuXG4vKipcbiAqIEJyb3dzZXIgZGV0ZWN0b3IuXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSByZXN1bHQgY29udGFpbmluZyBicm93c2VyIGFuZCB2ZXJzaW9uXG4gKiAgICAgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdEJyb3dzZXIod2luZG93KSB7XG4gIC8vIFJldHVybmVkIHJlc3VsdCBvYmplY3QuXG4gIGNvbnN0IHJlc3VsdCA9IHticm93c2VyOiBudWxsLCB2ZXJzaW9uOiBudWxsfTtcblxuICAvLyBGYWlsIGVhcmx5IGlmIGl0J3Mgbm90IGEgYnJvd3NlclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIXdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICByZXN1bHQuYnJvd3NlciA9ICdOb3QgYSBicm93c2VyLic7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGNvbnN0IHtuYXZpZ2F0b3J9ID0gd2luZG93O1xuXG4gIGlmIChuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7IC8vIEZpcmVmb3guXG4gICAgcmVzdWx0LmJyb3dzZXIgPSAnZmlyZWZveCc7XG4gICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAvRmlyZWZveFxcLyhcXGQrKVxcLi8sIDEpO1xuICB9IGVsc2UgaWYgKG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHxcbiAgICAgICh3aW5kb3cuaXNTZWN1cmVDb250ZXh0ID09PSBmYWxzZSAmJiB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAhd2luZG93LlJUQ0ljZUdhdGhlcmVyKSkge1xuICAgIC8vIENocm9tZSwgQ2hyb21pdW0sIFdlYnZpZXcsIE9wZXJhLlxuICAgIC8vIFZlcnNpb24gbWF0Y2hlcyBDaHJvbWUvV2ViUlRDIHZlcnNpb24uXG4gICAgLy8gQ2hyb21lIDc0IHJlbW92ZWQgd2Via2l0R2V0VXNlck1lZGlhIG9uIGh0dHAgYXMgd2VsbCBzbyB3ZSBuZWVkIHRoZVxuICAgIC8vIG1vcmUgY29tcGxpY2F0ZWQgZmFsbGJhY2sgdG8gd2Via2l0UlRDUGVlckNvbm5lY3Rpb24uXG4gICAgcmVzdWx0LmJyb3dzZXIgPSAnY2hyb21lJztcbiAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgIC9DaHJvbShlfGl1bSlcXC8oXFxkKylcXC4vLCAyKTtcbiAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmXG4gICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLihcXGQrKSQvKSkgeyAvLyBFZGdlLlxuICAgIHJlc3VsdC5icm93c2VyID0gJ2VkZ2UnO1xuICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgL0VkZ2VcXC8oXFxkKykuKFxcZCspJC8sIDIpO1xuICB9IGVsc2UgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vKSkgeyAvLyBTYWZhcmkuXG4gICAgcmVzdWx0LmJyb3dzZXIgPSAnc2FmYXJpJztcbiAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgIC9BcHBsZVdlYktpdFxcLyhcXGQrKVxcLi8sIDEpO1xuICAgIHJlc3VsdC5zdXBwb3J0c1VuaWZpZWRQbGFuID0gd2luZG93LlJUQ1J0cFRyYW5zY2VpdmVyICYmXG4gICAgICAgICdjdXJyZW50RGlyZWN0aW9uJyBpbiB3aW5kb3cuUlRDUnRwVHJhbnNjZWl2ZXIucHJvdG90eXBlO1xuICB9IGVsc2UgeyAvLyBEZWZhdWx0IGZhbGx0aHJvdWdoOiBub3Qgc3VwcG9ydGVkLlxuICAgIHJlc3VsdC5icm93c2VyID0gJ05vdCBhIHN1cHBvcnRlZCBicm93c2VyLic7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHNvbWV0aGluZyBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHNvbWV0aGluZyB5b3Ugd2FudCB0byBjaGVjay5cbiAqIEByZXR1cm4gdHJ1ZSBpZiB2YWwgaXMgYW4gb2JqZWN0LCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG4vKipcbiAqIFJlbW92ZSBhbGwgZW1wdHkgb2JqZWN0cyBhbmQgdW5kZWZpbmVkIHZhbHVlc1xuICogZnJvbSBhIG5lc3RlZCBvYmplY3QgLS0gYW4gZW5oYW5jZWQgYW5kIHZhbmlsbGEgdmVyc2lvblxuICogb2YgTG9kYXNoJ3MgYGNvbXBhY3RgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGFjdE9iamVjdChkYXRhKSB7XG4gIGlmICghaXNPYmplY3QoZGF0YSkpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5yZWR1Y2UoZnVuY3Rpb24oYWNjdW11bGF0b3IsIGtleSkge1xuICAgIGNvbnN0IGlzT2JqID0gaXNPYmplY3QoZGF0YVtrZXldKTtcbiAgICBjb25zdCB2YWx1ZSA9IGlzT2JqID8gY29tcGFjdE9iamVjdChkYXRhW2tleV0pIDogZGF0YVtrZXldO1xuICAgIGNvbnN0IGlzRW1wdHlPYmplY3QgPSBpc09iaiAmJiAhT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aDtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCBpc0VtcHR5T2JqZWN0KSB7XG4gICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGFjY3VtdWxhdG9yLCB7W2tleV06IHZhbHVlfSk7XG4gIH0sIHt9KTtcbn1cblxuLyogaXRlcmF0ZXMgdGhlIHN0YXRzIGdyYXBoIHJlY3Vyc2l2ZWx5LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdhbGtTdGF0cyhzdGF0cywgYmFzZSwgcmVzdWx0U2V0KSB7XG4gIGlmICghYmFzZSB8fCByZXN1bHRTZXQuaGFzKGJhc2UuaWQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJlc3VsdFNldC5zZXQoYmFzZS5pZCwgYmFzZSk7XG4gIE9iamVjdC5rZXlzKGJhc2UpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgaWYgKG5hbWUuZW5kc1dpdGgoJ0lkJykpIHtcbiAgICAgIHdhbGtTdGF0cyhzdGF0cywgc3RhdHMuZ2V0KGJhc2VbbmFtZV0pLCByZXN1bHRTZXQpO1xuICAgIH0gZWxzZSBpZiAobmFtZS5lbmRzV2l0aCgnSWRzJykpIHtcbiAgICAgIGJhc2VbbmFtZV0uZm9yRWFjaChpZCA9PiB7XG4gICAgICAgIHdhbGtTdGF0cyhzdGF0cywgc3RhdHMuZ2V0KGlkKSwgcmVzdWx0U2V0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qIGZpbHRlciBnZXRTdGF0cyBmb3IgYSBzZW5kZXIvcmVjZWl2ZXIgdHJhY2suICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyU3RhdHMocmVzdWx0LCB0cmFjaywgb3V0Ym91bmQpIHtcbiAgY29uc3Qgc3RyZWFtU3RhdHNUeXBlID0gb3V0Ym91bmQgPyAnb3V0Ym91bmQtcnRwJyA6ICdpbmJvdW5kLXJ0cCc7XG4gIGNvbnN0IGZpbHRlcmVkUmVzdWx0ID0gbmV3IE1hcCgpO1xuICBpZiAodHJhY2sgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmlsdGVyZWRSZXN1bHQ7XG4gIH1cbiAgY29uc3QgdHJhY2tTdGF0cyA9IFtdO1xuICByZXN1bHQuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgaWYgKHZhbHVlLnR5cGUgPT09ICd0cmFjaycgJiZcbiAgICAgICAgdmFsdWUudHJhY2tJZGVudGlmaWVyID09PSB0cmFjay5pZCkge1xuICAgICAgdHJhY2tTdGF0cy5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH0pO1xuICB0cmFja1N0YXRzLmZvckVhY2godHJhY2tTdGF0ID0+IHtcbiAgICByZXN1bHQuZm9yRWFjaChzdGF0cyA9PiB7XG4gICAgICBpZiAoc3RhdHMudHlwZSA9PT0gc3RyZWFtU3RhdHNUeXBlICYmIHN0YXRzLnRyYWNrSWQgPT09IHRyYWNrU3RhdC5pZCkge1xuICAgICAgICB3YWxrU3RhdHMocmVzdWx0LCBzdGF0cywgZmlsdGVyZWRSZXN1bHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGZpbHRlcmVkUmVzdWx0O1xufVxuXG4iLCAiLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4vKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmNvbnN0IGxvZ2dpbmcgPSB1dGlscy5sb2c7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltR2V0VXNlck1lZGlhKHdpbmRvdywgYnJvd3NlckRldGFpbHMpIHtcbiAgY29uc3QgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY29uc3RyYWludHNUb0Nocm9tZV8gPSBmdW5jdGlvbihjKSB7XG4gICAgaWYgKHR5cGVvZiBjICE9PSAnb2JqZWN0JyB8fCBjLm1hbmRhdG9yeSB8fCBjLm9wdGlvbmFsKSB7XG4gICAgICByZXR1cm4gYztcbiAgICB9XG4gICAgY29uc3QgY2MgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5ID09PSAncmVxdWlyZScgfHwga2V5ID09PSAnYWR2YW5jZWQnIHx8IGtleSA9PT0gJ21lZGlhU291cmNlJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCByID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/IGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcbiAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHIuZXhhY3QgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHIubWluID0gci5tYXggPSByLmV4YWN0O1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkbmFtZV8gPSBmdW5jdGlvbihwcmVmaXgsIG5hbWUpIHtcbiAgICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICAgIHJldHVybiBwcmVmaXggKyBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKG5hbWUgPT09ICdkZXZpY2VJZCcpID8gJ3NvdXJjZUlkJyA6IG5hbWU7XG4gICAgICB9O1xuICAgICAgaWYgKHIuaWRlYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjYy5vcHRpb25hbCA9IGNjLm9wdGlvbmFsIHx8IFtdO1xuICAgICAgICBsZXQgb2MgPSB7fTtcbiAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIG9jW29sZG5hbWVfKCdtaW4nLCBrZXkpXSA9IHIuaWRlYWw7XG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XG4gICAgICAgICAgb2MgPSB7fTtcbiAgICAgICAgICBvY1tvbGRuYW1lXygnbWF4Jywga2V5KV0gPSByLmlkZWFsO1xuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9jW29sZG5hbWVfKCcnLCBrZXkpXSA9IHIuaWRlYWw7XG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHIuZXhhY3QgIT09ICdudW1iZXInKSB7XG4gICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcbiAgICAgICAgY2MubWFuZGF0b3J5W29sZG5hbWVfKCcnLCBrZXkpXSA9IHIuZXhhY3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbJ21pbicsICdtYXgnXS5mb3JFYWNoKG1peCA9PiB7XG4gICAgICAgICAgaWYgKHJbbWl4XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjYy5tYW5kYXRvcnkgPSBjYy5tYW5kYXRvcnkgfHwge307XG4gICAgICAgICAgICBjYy5tYW5kYXRvcnlbb2xkbmFtZV8obWl4LCBrZXkpXSA9IHJbbWl4XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChjLmFkdmFuY2VkKSB7XG4gICAgICBjYy5vcHRpb25hbCA9IChjYy5vcHRpb25hbCB8fCBbXSkuY29uY2F0KGMuYWR2YW5jZWQpO1xuICAgIH1cbiAgICByZXR1cm4gY2M7XG4gIH07XG5cbiAgY29uc3Qgc2hpbUNvbnN0cmFpbnRzXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBmdW5jKSB7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjEpIHtcbiAgICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcbiAgICB9XG4gICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgaWYgKGNvbnN0cmFpbnRzICYmIHR5cGVvZiBjb25zdHJhaW50cy5hdWRpbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IHJlbWFwID0gZnVuY3Rpb24ob2JqLCBhLCBiKSB7XG4gICAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xuICAgICAgICAgIG9ialtiXSA9IG9ialthXTtcbiAgICAgICAgICBkZWxldGUgb2JqW2FdO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgICByZW1hcChjb25zdHJhaW50cy5hdWRpbywgJ2F1dG9HYWluQ29udHJvbCcsICdnb29nQXV0b0dhaW5Db250cm9sJyk7XG4gICAgICByZW1hcChjb25zdHJhaW50cy5hdWRpbywgJ25vaXNlU3VwcHJlc3Npb24nLCAnZ29vZ05vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgIGNvbnN0cmFpbnRzLmF1ZGlvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMuYXVkaW8pO1xuICAgIH1cbiAgICBpZiAoY29uc3RyYWludHMgJiYgdHlwZW9mIGNvbnN0cmFpbnRzLnZpZGVvID09PSAnb2JqZWN0Jykge1xuICAgICAgLy8gU2hpbSBmYWNpbmdNb2RlIGZvciBtb2JpbGUgJiBzdXJmYWNlIHByby5cbiAgICAgIGxldCBmYWNlID0gY29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZTtcbiAgICAgIGZhY2UgPSBmYWNlICYmICgodHlwZW9mIGZhY2UgPT09ICdvYmplY3QnKSA/IGZhY2UgOiB7aWRlYWw6IGZhY2V9KTtcbiAgICAgIGNvbnN0IGdldFN1cHBvcnRlZEZhY2luZ01vZGVMaWVzID0gYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDY2O1xuXG4gICAgICBpZiAoKGZhY2UgJiYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmV4YWN0ID09PSAnZW52aXJvbm1lbnQnIHx8XG4gICAgICAgICAgICAgICAgICAgIGZhY2UuaWRlYWwgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAnZW52aXJvbm1lbnQnKSkgJiZcbiAgICAgICAgICAhKG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMgJiZcbiAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKS5mYWNpbmdNb2RlICYmXG4gICAgICAgICAgICAhZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMpKSB7XG4gICAgICAgIGRlbGV0ZSBjb25zdHJhaW50cy52aWRlby5mYWNpbmdNb2RlO1xuICAgICAgICBsZXQgbWF0Y2hlcztcbiAgICAgICAgaWYgKGZhY2UuZXhhY3QgPT09ICdlbnZpcm9ubWVudCcgfHwgZmFjZS5pZGVhbCA9PT0gJ2Vudmlyb25tZW50Jykge1xuICAgICAgICAgIG1hdGNoZXMgPSBbJ2JhY2snLCAncmVhciddO1xuICAgICAgICB9IGVsc2UgaWYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAndXNlcicpIHtcbiAgICAgICAgICBtYXRjaGVzID0gWydmcm9udCddO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgLy8gTG9vayBmb3IgbWF0Y2hlcyBpbiBsYWJlbCwgb3IgdXNlIGxhc3QgY2FtIGZvciBiYWNrICh0eXBpY2FsKS5cbiAgICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKClcbiAgICAgICAgICAudGhlbihkZXZpY2VzID0+IHtcbiAgICAgICAgICAgIGRldmljZXMgPSBkZXZpY2VzLmZpbHRlcihkID0+IGQua2luZCA9PT0gJ3ZpZGVvaW5wdXQnKTtcbiAgICAgICAgICAgIGxldCBkZXYgPSBkZXZpY2VzLmZpbmQoZCA9PiBtYXRjaGVzLnNvbWUobWF0Y2ggPT5cbiAgICAgICAgICAgICAgZC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG1hdGNoKSkpO1xuICAgICAgICAgICAgaWYgKCFkZXYgJiYgZGV2aWNlcy5sZW5ndGggJiYgbWF0Y2hlcy5pbmNsdWRlcygnYmFjaycpKSB7XG4gICAgICAgICAgICAgIGRldiA9IGRldmljZXNbZGV2aWNlcy5sZW5ndGggLSAxXTsgLy8gbW9yZSBsaWtlbHkgdGhlIGJhY2sgY2FtXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGV2KSB7XG4gICAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLmRldmljZUlkID0gZmFjZS5leGFjdCA/IHtleGFjdDogZGV2LmRldmljZUlkfSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpZGVhbDogZGV2LmRldmljZUlkfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMudmlkZW8pO1xuICAgICAgICAgICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy52aWRlbyk7XG4gICAgfVxuICAgIGxvZ2dpbmcoJ2Nocm9tZTogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xuICB9O1xuXG4gIGNvbnN0IHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjQpIHtcbiAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZToge1xuICAgICAgICBQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBQZXJtaXNzaW9uRGlzbWlzc2VkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBJbnZhbGlkU3RhdGVFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIERldmljZXNOb3RGb3VuZEVycm9yOiAnTm90Rm91bmRFcnJvcicsXG4gICAgICAgIENvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvcjogJ092ZXJjb25zdHJhaW5lZEVycm9yJyxcbiAgICAgICAgVHJhY2tTdGFydEVycm9yOiAnTm90UmVhZGFibGVFcnJvcicsXG4gICAgICAgIE1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93bjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIE1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgVGFiQ2FwdHVyZUVycm9yOiAnQWJvcnRFcnJvcicsXG4gICAgICAgIFNjcmVlbkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxuICAgICAgICBEZXZpY2VDYXB0dXJlRXJyb3I6ICdBYm9ydEVycm9yJ1xuICAgICAgfVtlLm5hbWVdIHx8IGUubmFtZSxcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludCB8fCBlLmNvbnN0cmFpbnROYW1lLFxuICAgICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgZ2V0VXNlck1lZGlhXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICBzaGltQ29uc3RyYWludHNfKGNvbnN0cmFpbnRzLCBjID0+IHtcbiAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEoYywgb25TdWNjZXNzLCBlID0+IHtcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgICAgICBvbkVycm9yKHNoaW1FcnJvcl8oZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGdldFVzZXJNZWRpYV8uYmluZChuYXZpZ2F0b3IpO1xuXG4gIC8vIEV2ZW4gdGhvdWdoIENocm9tZSA0NSBoYXMgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBhbmQgYSBnZXRVc2VyTWVkaWFcbiAgLy8gZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIFByb21pc2UsIGl0IGRvZXMgbm90IGFjY2VwdCBzcGVjLXN0eWxlXG4gIC8vIGNvbnN0cmFpbnRzLlxuICBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcbiAgICBjb25zdCBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjcykge1xuICAgICAgcmV0dXJuIHNoaW1Db25zdHJhaW50c18oY3MsIGMgPT4gb3JpZ0dldFVzZXJNZWRpYShjKS50aGVuKHN0cmVhbSA9PiB7XG4gICAgICAgIGlmIChjLmF1ZGlvICYmICFzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggfHxcbiAgICAgICAgICAgIGMudmlkZW8gJiYgIXN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHtcbiAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCcnLCAnTm90Rm91bmRFcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgICB9LCBlID0+IFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpKSk7XG4gICAgfTtcbiAgfVxufVxuIiwgIi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE4IFRoZSBhZGFwdGVyLmpzIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbi8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IGZ1bmN0aW9uIHNoaW1HZXREaXNwbGF5TWVkaWEod2luZG93LCBnZXRTb3VyY2VJZCkge1xuICBpZiAod2luZG93Lm5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcbiAgICAnZ2V0RGlzcGxheU1lZGlhJyBpbiB3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoISh3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZ2V0U291cmNlSWQgaXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlIHJlc29sdmluZyB3aXRoXG4gIC8vIHRoZSBzb3VyY2VJZCBvZiB0aGUgc2NyZWVuL3dpbmRvdy90YWIgdG8gYmUgc2hhcmVkLlxuICBpZiAodHlwZW9mIGdldFNvdXJjZUlkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcignc2hpbUdldERpc3BsYXlNZWRpYTogZ2V0U291cmNlSWQgYXJndW1lbnQgaXMgbm90ICcgK1xuICAgICAgICAnYSBmdW5jdGlvbicpO1xuICAgIHJldHVybjtcbiAgfVxuICB3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXREaXNwbGF5TWVkaWEgPVxuICAgIGZ1bmN0aW9uIGdldERpc3BsYXlNZWRpYShjb25zdHJhaW50cykge1xuICAgICAgcmV0dXJuIGdldFNvdXJjZUlkKGNvbnN0cmFpbnRzKVxuICAgICAgICAudGhlbihzb3VyY2VJZCA9PiB7XG4gICAgICAgICAgY29uc3Qgd2lkdGhTcGVjaWZpZWQgPSBjb25zdHJhaW50cy52aWRlbyAmJiBjb25zdHJhaW50cy52aWRlby53aWR0aDtcbiAgICAgICAgICBjb25zdCBoZWlnaHRTcGVjaWZpZWQgPSBjb25zdHJhaW50cy52aWRlbyAmJlxuICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8uaGVpZ2h0O1xuICAgICAgICAgIGNvbnN0IGZyYW1lUmF0ZVNwZWNpZmllZCA9IGNvbnN0cmFpbnRzLnZpZGVvICYmXG4gICAgICAgICAgICBjb25zdHJhaW50cy52aWRlby5mcmFtZVJhdGU7XG4gICAgICAgICAgY29uc3RyYWludHMudmlkZW8gPSB7XG4gICAgICAgICAgICBtYW5kYXRvcnk6IHtcbiAgICAgICAgICAgICAgY2hyb21lTWVkaWFTb3VyY2U6ICdkZXNrdG9wJyxcbiAgICAgICAgICAgICAgY2hyb21lTWVkaWFTb3VyY2VJZDogc291cmNlSWQsXG4gICAgICAgICAgICAgIG1heEZyYW1lUmF0ZTogZnJhbWVSYXRlU3BlY2lmaWVkIHx8IDNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmICh3aWR0aFNwZWNpZmllZCkge1xuICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8ubWFuZGF0b3J5Lm1heFdpZHRoID0gd2lkdGhTcGVjaWZpZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoZWlnaHRTcGVjaWZpZWQpIHtcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLm1hbmRhdG9yeS5tYXhIZWlnaHQgPSBoZWlnaHRTcGVjaWZpZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuIiwgIi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5leHBvcnQge3NoaW1HZXRVc2VyTWVkaWF9IGZyb20gJy4vZ2V0dXNlcm1lZGlhJztcbmV4cG9ydCB7c2hpbUdldERpc3BsYXlNZWRpYX0gZnJvbSAnLi9nZXRkaXNwbGF5bWVkaWEnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hpbU1lZGlhU3RyZWFtKHdpbmRvdykge1xuICB3aW5kb3cuTWVkaWFTdHJlYW0gPSB3aW5kb3cuTWVkaWFTdHJlYW0gfHwgd2luZG93LndlYmtpdE1lZGlhU3RyZWFtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbU9uVHJhY2sod2luZG93KSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgISgnb250cmFjaycgaW5cbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbnRyYWNrJywge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb250cmFjaztcbiAgICAgIH0sXG4gICAgICBzZXQoZikge1xuICAgICAgICBpZiAodGhpcy5fb250cmFjaykge1xuICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayA9IGYpO1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBjb25zdCBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24gPVxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPVxuICAgICAgZnVuY3Rpb24gc2V0UmVtb3RlRGVzY3JpcHRpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fb250cmFja3BvbHkpIHtcbiAgICAgICAgICB0aGlzLl9vbnRyYWNrcG9seSA9IChlKSA9PiB7XG4gICAgICAgICAgICAvLyBvbmFkZHN0cmVhbSBkb2VzIG5vdCBmaXJlIHdoZW4gYSB0cmFjayBpcyBhZGRlZCB0byBhbiBleGlzdGluZ1xuICAgICAgICAgICAgLy8gc3RyZWFtLiBCdXQgc3RyZWFtLm9uYWRkdHJhY2sgaXMgaW1wbGVtZW50ZWQgc28gd2UgdXNlIHRoYXQuXG4gICAgICAgICAgICBlLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZGR0cmFjaycsIHRlID0+IHtcbiAgICAgICAgICAgICAgbGV0IHJlY2VpdmVyO1xuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHRoaXMuZ2V0UmVjZWl2ZXJzKClcbiAgICAgICAgICAgICAgICAgIC5maW5kKHIgPT4gci50cmFjayAmJiByLnRyYWNrLmlkID09PSB0ZS50cmFjay5pZCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB7dHJhY2s6IHRlLnRyYWNrfTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRlLnRyYWNrO1xuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcn07XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xuICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHtcbiAgICAgICAgICAgICAgbGV0IHJlY2VpdmVyO1xuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHRoaXMuZ2V0UmVjZWl2ZXJzKClcbiAgICAgICAgICAgICAgICAgIC5maW5kKHIgPT4gci50cmFjayAmJiByLnRyYWNrLmlkID09PSB0cmFjay5pZCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB7dHJhY2t9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRyYWNrO1xuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcn07XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xuICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29udHJhY2twb2x5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIGV2ZW4gaWYgUlRDUnRwVHJhbnNjZWl2ZXIgaXMgaW4gd2luZG93LCBpdCBpcyBvbmx5IHVzZWQgYW5kXG4gICAgLy8gZW1pdHRlZCBpbiB1bmlmaWVkLXBsYW4uIFVuZm9ydHVuYXRlbHkgdGhpcyBtZWFucyB3ZSBuZWVkXG4gICAgLy8gdG8gdW5jb25kaXRpb25hbGx5IHdyYXAgdGhlIGV2ZW50LlxuICAgIHV0aWxzLndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgJ3RyYWNrJywgZSA9PiB7XG4gICAgICBpZiAoIWUudHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsICd0cmFuc2NlaXZlcicsXG4gICAgICAgICAge3ZhbHVlOiB7cmVjZWl2ZXI6IGUucmVjZWl2ZXJ9fSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUdldFNlbmRlcnNXaXRoRHRtZih3aW5kb3cpIHtcbiAgLy8gT3ZlcnJpZGVzIGFkZFRyYWNrL3JlbW92ZVRyYWNrLCBkZXBlbmRzIG9uIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrLlxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAhKCdnZXRTZW5kZXJzJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSAmJlxuICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcbiAgICBjb25zdCBzaGltU2VuZGVyV2l0aER0bWYgPSBmdW5jdGlvbihwYywgdHJhY2spIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYWNrLFxuICAgICAgICBnZXQgZHRtZigpIHtcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gcGMuY3JlYXRlRFRNRlNlbmRlcih0cmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICAgIH0sXG4gICAgICAgIF9wYzogcGNcbiAgICAgIH07XG4gICAgfTtcblxuICAgIC8vIGF1Z21lbnQgYWRkVHJhY2sgd2hlbiBnZXRTZW5kZXJzIGlzIG5vdCBhdmFpbGFibGUuXG4gICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uIGdldFNlbmRlcnMoKSB7XG4gICAgICAgIHRoaXMuX3NlbmRlcnMgPSB0aGlzLl9zZW5kZXJzIHx8IFtdO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VuZGVycy5zbGljZSgpOyAvLyByZXR1cm4gYSBjb3B5IG9mIHRoZSBpbnRlcm5hbCBzdGF0ZS5cbiAgICAgIH07XG4gICAgICBjb25zdCBvcmlnQWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9XG4gICAgICAgIGZ1bmN0aW9uIGFkZFRyYWNrKHRyYWNrLCBzdHJlYW0pIHtcbiAgICAgICAgICBsZXQgc2VuZGVyID0gb3JpZ0FkZFRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgaWYgKCFzZW5kZXIpIHtcbiAgICAgICAgICAgIHNlbmRlciA9IHNoaW1TZW5kZXJXaXRoRHRtZih0aGlzLCB0cmFjayk7XG4gICAgICAgICAgICB0aGlzLl9zZW5kZXJzLnB1c2goc2VuZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHNlbmRlcjtcbiAgICAgICAgfTtcblxuICAgICAgY29uc3Qgb3JpZ1JlbW92ZVRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjaztcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPVxuICAgICAgICBmdW5jdGlvbiByZW1vdmVUcmFjayhzZW5kZXIpIHtcbiAgICAgICAgICBvcmlnUmVtb3ZlVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLl9zZW5kZXJzLmluZGV4T2Yoc2VuZGVyKTtcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fc2VuZGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uIGFkZFN0cmVhbShzdHJlYW0pIHtcbiAgICAgIHRoaXMuX3NlbmRlcnMgPSB0aGlzLl9zZW5kZXJzIHx8IFtdO1xuICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseSh0aGlzLCBbc3RyZWFtXSk7XG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaCh0cmFjayA9PiB7XG4gICAgICAgIHRoaXMuX3NlbmRlcnMucHVzaChzaGltU2VuZGVyV2l0aER0bWYodGhpcywgdHJhY2spKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPVxuICAgICAgZnVuY3Rpb24gcmVtb3ZlU3RyZWFtKHN0cmVhbSkge1xuICAgICAgICB0aGlzLl9zZW5kZXJzID0gdGhpcy5fc2VuZGVycyB8fCBbXTtcbiAgICAgICAgb3JpZ1JlbW92ZVN0cmVhbS5hcHBseSh0aGlzLCBbc3RyZWFtXSk7XG5cbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2godHJhY2sgPT4ge1xuICAgICAgICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuX3NlbmRlcnMuZmluZChzID0+IHMudHJhY2sgPT09IHRyYWNrKTtcbiAgICAgICAgICBpZiAoc2VuZGVyKSB7IC8vIHJlbW92ZSBzZW5kZXJcbiAgICAgICAgICAgIHRoaXMuX3NlbmRlcnMuc3BsaWNlKHRoaXMuX3NlbmRlcnMuaW5kZXhPZihzZW5kZXIpLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgICAgICAnZ2V0U2VuZGVycycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSAmJlxuICAgICAgICAgICAgICdjcmVhdGVEVE1GU2VuZGVyJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlICYmXG4gICAgICAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlciAmJlxuICAgICAgICAgICAgICEoJ2R0bWYnIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgIGNvbnN0IG9yaWdHZXRTZW5kZXJzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uIGdldFNlbmRlcnMoKSB7XG4gICAgICBjb25zdCBzZW5kZXJzID0gb3JpZ0dldFNlbmRlcnMuYXBwbHkodGhpcywgW10pO1xuICAgICAgc2VuZGVycy5mb3JFYWNoKHNlbmRlciA9PiBzZW5kZXIuX3BjID0gdGhpcyk7XG4gICAgICByZXR1cm4gc2VuZGVycztcbiAgICB9O1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLCAnZHRtZicsIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgIHRoaXMuX2R0bWYgPSB0aGlzLl9wYy5jcmVhdGVEVE1GU2VuZGVyKHRoaXMudHJhY2spO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1HZXRTdGF0cyh3aW5kb3cpIHtcbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBvcmlnR2V0U3RhdHMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzO1xuICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24gZ2V0U3RhdHMoKSB7XG4gICAgY29uc3QgW3NlbGVjdG9yLCBvblN1Y2MsIG9uRXJyXSA9IGFyZ3VtZW50cztcblxuICAgIC8vIElmIHNlbGVjdG9yIGlzIGEgZnVuY3Rpb24gdGhlbiB3ZSBhcmUgaW4gdGhlIG9sZCBzdHlsZSBzdGF0cyBzbyBqdXN0XG4gICAgLy8gcGFzcyBiYWNrIHRoZSBvcmlnaW5hbCBnZXRTdGF0cyBmb3JtYXQgdG8gYXZvaWQgYnJlYWtpbmcgb2xkIHVzZXJzLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBXaGVuIHNwZWMtc3R5bGUgZ2V0U3RhdHMgaXMgc3VwcG9ydGVkLCByZXR1cm4gdGhvc2Ugd2hlbiBjYWxsZWQgd2l0aFxuICAgIC8vIGVpdGhlciBubyBhcmd1bWVudHMgb3IgdGhlIHNlbGVjdG9yIGFyZ3VtZW50IGlzIG51bGwuXG4gICAgaWYgKG9yaWdHZXRTdGF0cy5sZW5ndGggPT09IDAgJiYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgdHlwZW9mIHNlbGVjdG9yICE9PSAnZnVuY3Rpb24nKSkge1xuICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbXSk7XG4gICAgfVxuXG4gICAgY29uc3QgZml4Q2hyb21lU3RhdHNfID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnN0IHN0YW5kYXJkUmVwb3J0ID0ge307XG4gICAgICBjb25zdCByZXBvcnRzID0gcmVzcG9uc2UucmVzdWx0KCk7XG4gICAgICByZXBvcnRzLmZvckVhY2gocmVwb3J0ID0+IHtcbiAgICAgICAgY29uc3Qgc3RhbmRhcmRTdGF0cyA9IHtcbiAgICAgICAgICBpZDogcmVwb3J0LmlkLFxuICAgICAgICAgIHRpbWVzdGFtcDogcmVwb3J0LnRpbWVzdGFtcCxcbiAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXG4gICAgICAgICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xuICAgICAgICAgIH1bcmVwb3J0LnR5cGVdIHx8IHJlcG9ydC50eXBlXG4gICAgICAgIH07XG4gICAgICAgIHJlcG9ydC5uYW1lcygpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgc3RhbmRhcmRTdGF0c1tuYW1lXSA9IHJlcG9ydC5zdGF0KG5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3RhbmRhcmRSZXBvcnRbc3RhbmRhcmRTdGF0cy5pZF0gPSBzdGFuZGFyZFN0YXRzO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBzdGFuZGFyZFJlcG9ydDtcbiAgICB9O1xuXG4gICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxuICAgIGNvbnN0IG1ha2VNYXBTdGF0cyA9IGZ1bmN0aW9uKHN0YXRzKSB7XG4gICAgICByZXR1cm4gbmV3IE1hcChPYmplY3Qua2V5cyhzdGF0cykubWFwKGtleSA9PiBba2V5LCBzdGF0c1trZXldXSkpO1xuICAgIH07XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICBjb25zdCBzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIG9uU3VjYyhtYWtlTWFwU3RhdHMoZml4Q2hyb21lU3RhdHNfKHJlc3BvbnNlKSkpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbc3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8sXG4gICAgICAgIHNlbGVjdG9yXSk7XG4gICAgfVxuXG4gICAgLy8gcHJvbWlzZS1zdXBwb3J0XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbXG4gICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmVzb2x2ZShtYWtlTWFwU3RhdHMoZml4Q2hyb21lU3RhdHNfKHJlc3BvbnNlKSkpO1xuICAgICAgICB9LCByZWplY3RdKTtcbiAgICB9KS50aGVuKG9uU3VjYywgb25FcnIpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbVNlbmRlclJlY2VpdmVyR2V0U3RhdHMod2luZG93KSB7XG4gIGlmICghKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgd2luZG93LlJUQ1J0cFNlbmRlciAmJiB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2hpbSBzZW5kZXIgc3RhdHMuXG4gIGlmICghKCdnZXRTdGF0cycgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XG4gICAgY29uc3Qgb3JpZ0dldFNlbmRlcnMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnM7XG4gICAgaWYgKG9yaWdHZXRTZW5kZXJzKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbiBnZXRTZW5kZXJzKCkge1xuICAgICAgICBjb25zdCBzZW5kZXJzID0gb3JpZ0dldFNlbmRlcnMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICBzZW5kZXJzLmZvckVhY2goc2VuZGVyID0+IHNlbmRlci5fcGMgPSB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHNlbmRlcnM7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XG4gICAgaWYgKG9yaWdBZGRUcmFjaykge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uIGFkZFRyYWNrKCkge1xuICAgICAgICBjb25zdCBzZW5kZXIgPSBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgc2VuZGVyLl9wYyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzZW5kZXI7XG4gICAgICB9O1xuICAgIH1cbiAgICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uIGdldFN0YXRzKCkge1xuICAgICAgY29uc3Qgc2VuZGVyID0gdGhpcztcbiAgICAgIHJldHVybiB0aGlzLl9wYy5nZXRTdGF0cygpLnRoZW4ocmVzdWx0ID0+XG4gICAgICAgIC8qIE5vdGU6IHRoaXMgd2lsbCBpbmNsdWRlIHN0YXRzIG9mIGFsbCBzZW5kZXJzIHRoYXRcbiAgICAgICAgICogICBzZW5kIGEgdHJhY2sgd2l0aCB0aGUgc2FtZSBpZCBhcyBzZW5kZXIudHJhY2sgYXNcbiAgICAgICAgICogICBpdCBpcyBub3QgcG9zc2libGUgdG8gaWRlbnRpZnkgdGhlIFJUQ1J0cFNlbmRlci5cbiAgICAgICAgICovXG4gICAgICAgIHV0aWxzLmZpbHRlclN0YXRzKHJlc3VsdCwgc2VuZGVyLnRyYWNrLCB0cnVlKSk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIHNoaW0gcmVjZWl2ZXIgc3RhdHMuXG4gIGlmICghKCdnZXRTdGF0cycgaW4gd2luZG93LlJUQ1J0cFJlY2VpdmVyLnByb3RvdHlwZSkpIHtcbiAgICBjb25zdCBvcmlnR2V0UmVjZWl2ZXJzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnM7XG4gICAgaWYgKG9yaWdHZXRSZWNlaXZlcnMpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzID1cbiAgICAgICAgZnVuY3Rpb24gZ2V0UmVjZWl2ZXJzKCkge1xuICAgICAgICAgIGNvbnN0IHJlY2VpdmVycyA9IG9yaWdHZXRSZWNlaXZlcnMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgIHJlY2VpdmVycy5mb3JFYWNoKHJlY2VpdmVyID0+IHJlY2VpdmVyLl9wYyA9IHRoaXMpO1xuICAgICAgICAgIHJldHVybiByZWNlaXZlcnM7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHV0aWxzLndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgJ3RyYWNrJywgZSA9PiB7XG4gICAgICBlLnJlY2VpdmVyLl9wYyA9IGUuc3JjRWxlbWVudDtcbiAgICAgIHJldHVybiBlO1xuICAgIH0pO1xuICAgIHdpbmRvdy5SVENSdHBSZWNlaXZlci5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbiBnZXRTdGF0cygpIHtcbiAgICAgIGNvbnN0IHJlY2VpdmVyID0gdGhpcztcbiAgICAgIHJldHVybiB0aGlzLl9wYy5nZXRTdGF0cygpLnRoZW4ocmVzdWx0ID0+XG4gICAgICAgIHV0aWxzLmZpbHRlclN0YXRzKHJlc3VsdCwgcmVjZWl2ZXIudHJhY2ssIGZhbHNlKSk7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghKCdnZXRTdGF0cycgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUgJiZcbiAgICAgICdnZXRTdGF0cycgaW4gd2luZG93LlJUQ1J0cFJlY2VpdmVyLnByb3RvdHlwZSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzaGltIFJUQ1BlZXJDb25uZWN0aW9uLmdldFN0YXRzKHRyYWNrKS5cbiAgY29uc3Qgb3JpZ0dldFN0YXRzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cztcbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uIGdldFN0YXRzKCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCAmJlxuICAgICAgICBhcmd1bWVudHNbMF0gaW5zdGFuY2VvZiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjaykge1xuICAgICAgY29uc3QgdHJhY2sgPSBhcmd1bWVudHNbMF07XG4gICAgICBsZXQgc2VuZGVyO1xuICAgICAgbGV0IHJlY2VpdmVyO1xuICAgICAgbGV0IGVycjtcbiAgICAgIHRoaXMuZ2V0U2VuZGVycygpLmZvckVhY2gocyA9PiB7XG4gICAgICAgIGlmIChzLnRyYWNrID09PSB0cmFjaykge1xuICAgICAgICAgIGlmIChzZW5kZXIpIHtcbiAgICAgICAgICAgIGVyciA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbmRlciA9IHM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZ2V0UmVjZWl2ZXJzKCkuZm9yRWFjaChyID0+IHtcbiAgICAgICAgaWYgKHIudHJhY2sgPT09IHRyYWNrKSB7XG4gICAgICAgICAgaWYgKHJlY2VpdmVyKSB7XG4gICAgICAgICAgICBlcnIgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWNlaXZlciA9IHI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByLnRyYWNrID09PSB0cmFjaztcbiAgICAgIH0pO1xuICAgICAgaWYgKGVyciB8fCAoc2VuZGVyICYmIHJlY2VpdmVyKSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IERPTUV4Y2VwdGlvbihcbiAgICAgICAgICAnVGhlcmUgYXJlIG1vcmUgdGhhbiBvbmUgc2VuZGVyIG9yIHJlY2VpdmVyIGZvciB0aGUgdHJhY2suJyxcbiAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJykpO1xuICAgICAgfSBlbHNlIGlmIChzZW5kZXIpIHtcbiAgICAgICAgcmV0dXJuIHNlbmRlci5nZXRTdGF0cygpO1xuICAgICAgfSBlbHNlIGlmIChyZWNlaXZlcikge1xuICAgICAgICByZXR1cm4gcmVjZWl2ZXIuZ2V0U3RhdHMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAnVGhlcmUgaXMgbm8gc2VuZGVyIG9yIHJlY2VpdmVyIGZvciB0aGUgdHJhY2suJyxcbiAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlKHdpbmRvdykge1xuICAvLyBzaGltIGFkZFRyYWNrL3JlbW92ZVRyYWNrIHdpdGggbmF0aXZlIHZhcmlhbnRzIGluIG9yZGVyIHRvIG1ha2VcbiAgLy8gdGhlIGludGVyYWN0aW9ucyB3aXRoIGxlZ2FjeSBnZXRMb2NhbFN0cmVhbXMgYmVoYXZlIGFzIGluIG90aGVyIGJyb3dzZXJzLlxuICAvLyBLZWVwcyBhIG1hcHBpbmcgc3RyZWFtLmlkID0+IFtzdHJlYW0sIHJ0cHNlbmRlcnMuLi5dXG4gIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID1cbiAgICBmdW5jdGlvbiBnZXRMb2NhbFN0cmVhbXMoKSB7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zKVxuICAgICAgICAubWFwKHN0cmVhbUlkID0+IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdWzBdKTtcbiAgICB9O1xuXG4gIGNvbnN0IG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XG4gIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPVxuICAgIGZ1bmN0aW9uIGFkZFRyYWNrKHRyYWNrLCBzdHJlYW0pIHtcbiAgICAgIGlmICghc3RyZWFtKSB7XG4gICAgICAgIHJldHVybiBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuXG4gICAgICBjb25zdCBzZW5kZXIgPSBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGlmICghdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdKSB7XG4gICAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXSA9IFtzdHJlYW0sIHNlbmRlcl07XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXS5pbmRleE9mKHNlbmRlcikgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXS5wdXNoKHNlbmRlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VuZGVyO1xuICAgIH07XG5cbiAgY29uc3Qgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xuICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uIGFkZFN0cmVhbShzdHJlYW0pIHtcbiAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcblxuICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHtcbiAgICAgIGNvbnN0IGFscmVhZHlFeGlzdHMgPSB0aGlzLmdldFNlbmRlcnMoKS5maW5kKHMgPT4gcy50cmFjayA9PT0gdHJhY2spO1xuICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBleGlzdGluZ1NlbmRlcnMgPSB0aGlzLmdldFNlbmRlcnMoKTtcbiAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgY29uc3QgbmV3U2VuZGVycyA9IHRoaXMuZ2V0U2VuZGVycygpXG4gICAgICAuZmlsdGVyKG5ld1NlbmRlciA9PiBleGlzdGluZ1NlbmRlcnMuaW5kZXhPZihuZXdTZW5kZXIpID09PSAtMSk7XG4gICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdID0gW3N0cmVhbV0uY29uY2F0KG5ld1NlbmRlcnMpO1xuICB9O1xuXG4gIGNvbnN0IG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPVxuICAgIGZ1bmN0aW9uIHJlbW92ZVN0cmVhbShzdHJlYW0pIHtcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuICAgICAgZGVsZXRlIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXTtcbiAgICAgIHJldHVybiBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICBjb25zdCBvcmlnUmVtb3ZlVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrO1xuICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID1cbiAgICBmdW5jdGlvbiByZW1vdmVUcmFjayhzZW5kZXIpIHtcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuICAgICAgaWYgKHNlbmRlcikge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zKS5mb3JFYWNoKHN0cmVhbUlkID0+IHtcbiAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5pbmRleE9mKHNlbmRlcik7XG4gICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcmlnUmVtb3ZlVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2sod2luZG93LCBicm93c2VyRGV0YWlscykge1xuICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBzaGltIGFkZFRyYWNrIGFuZCByZW1vdmVUcmFjay5cbiAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgJiZcbiAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjUpIHtcbiAgICByZXR1cm4gc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlKHdpbmRvdyk7XG4gIH1cblxuICAvLyBhbHNvIHNoaW0gcGMuZ2V0TG9jYWxTdHJlYW1zIHdoZW4gYWRkVHJhY2sgaXMgc2hpbW1lZFxuICAvLyB0byByZXR1cm4gdGhlIG9yaWdpbmFsIHN0cmVhbXMuXG4gIGNvbnN0IG9yaWdHZXRMb2NhbFN0cmVhbXMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlXG4gICAgICAuZ2V0TG9jYWxTdHJlYW1zO1xuICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9XG4gICAgZnVuY3Rpb24gZ2V0TG9jYWxTdHJlYW1zKCkge1xuICAgICAgY29uc3QgbmF0aXZlU3RyZWFtcyA9IG9yaWdHZXRMb2NhbFN0cmVhbXMuYXBwbHkodGhpcyk7XG4gICAgICB0aGlzLl9yZXZlcnNlU3RyZWFtcyA9IHRoaXMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuICAgICAgcmV0dXJuIG5hdGl2ZVN0cmVhbXMubWFwKHN0cmVhbSA9PiB0aGlzLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdKTtcbiAgICB9O1xuXG4gIGNvbnN0IG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbiBhZGRTdHJlYW0oc3RyZWFtKSB7XG4gICAgdGhpcy5fc3RyZWFtcyA9IHRoaXMuX3N0cmVhbXMgfHwge307XG4gICAgdGhpcy5fcmV2ZXJzZVN0cmVhbXMgPSB0aGlzLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcblxuICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHtcbiAgICAgIGNvbnN0IGFscmVhZHlFeGlzdHMgPSB0aGlzLmdldFNlbmRlcnMoKS5maW5kKHMgPT4gcy50cmFjayA9PT0gdHJhY2spO1xuICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBBZGQgaWRlbnRpdHkgbWFwcGluZyBmb3IgY29uc2lzdGVuY3kgd2l0aCBhZGRUcmFjay5cbiAgICAvLyBVbmxlc3MgdGhpcyBpcyBiZWluZyB1c2VkIHdpdGggYSBzdHJlYW0gZnJvbSBhZGRUcmFjay5cbiAgICBpZiAoIXRoaXMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pIHtcbiAgICAgIGNvbnN0IG5ld1N0cmVhbSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oc3RyZWFtLmdldFRyYWNrcygpKTtcbiAgICAgIHRoaXMuX3N0cmVhbXNbc3RyZWFtLmlkXSA9IG5ld1N0cmVhbTtcbiAgICAgIHRoaXMuX3JldmVyc2VTdHJlYW1zW25ld1N0cmVhbS5pZF0gPSBzdHJlYW07XG4gICAgICBzdHJlYW0gPSBuZXdTdHJlYW07XG4gICAgfVxuICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkodGhpcywgW3N0cmVhbV0pO1xuICB9O1xuXG4gIGNvbnN0IG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPVxuICAgIGZ1bmN0aW9uIHJlbW92ZVN0cmVhbShzdHJlYW0pIHtcbiAgICAgIHRoaXMuX3N0cmVhbXMgPSB0aGlzLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgdGhpcy5fcmV2ZXJzZVN0cmVhbXMgPSB0aGlzLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcblxuICAgICAgb3JpZ1JlbW92ZVN0cmVhbS5hcHBseSh0aGlzLCBbKHRoaXMuX3N0cmVhbXNbc3RyZWFtLmlkXSB8fCBzdHJlYW0pXSk7XG4gICAgICBkZWxldGUgdGhpcy5fcmV2ZXJzZVN0cmVhbXNbKHRoaXMuX3N0cmVhbXNbc3RyZWFtLmlkXSA/XG4gICAgICAgICAgdGhpcy5fc3RyZWFtc1tzdHJlYW0uaWRdLmlkIDogc3RyZWFtLmlkKV07XG4gICAgICBkZWxldGUgdGhpcy5fc3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgIH07XG5cbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9XG4gICAgZnVuY3Rpb24gYWRkVHJhY2sodHJhY2ssIHN0cmVhbSkge1xuICAgICAgaWYgKHRoaXMuc2lnbmFsaW5nU3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgICAgJ1RoZSBSVENQZWVyQ29ubmVjdGlvblxcJ3Mgc2lnbmFsaW5nU3RhdGUgaXMgXFwnY2xvc2VkXFwnLicsXG4gICAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBzdHJlYW1zID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgaWYgKHN0cmVhbXMubGVuZ3RoICE9PSAxIHx8XG4gICAgICAgICAgIXN0cmVhbXNbMF0uZ2V0VHJhY2tzKCkuZmluZCh0ID0+IHQgPT09IHRyYWNrKSkge1xuICAgICAgICAvLyB0aGlzIGlzIG5vdCBmdWxseSBjb3JyZWN0IGJ1dCBhbGwgd2UgY2FuIG1hbmFnZSB3aXRob3V0XG4gICAgICAgIC8vIFtbYXNzb2NpYXRlZCBNZWRpYVN0cmVhbXNdXSBpbnRlcm5hbCBzbG90LlxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgYWRhcHRlci5qcyBhZGRUcmFjayBwb2x5ZmlsbCBvbmx5IHN1cHBvcnRzIGEgc2luZ2xlICcgK1xuICAgICAgICAgICcgc3RyZWFtIHdoaWNoIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgc3BlY2lmaWVkIHRyYWNrLicsXG4gICAgICAgICAgJ05vdFN1cHBvcnRlZEVycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFscmVhZHlFeGlzdHMgPSB0aGlzLmdldFNlbmRlcnMoKS5maW5kKHMgPT4gcy50cmFjayA9PT0gdHJhY2spO1xuICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RyZWFtcyA9IHRoaXMuX3N0cmVhbXMgfHwge307XG4gICAgICB0aGlzLl9yZXZlcnNlU3RyZWFtcyA9IHRoaXMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuICAgICAgY29uc3Qgb2xkU3RyZWFtID0gdGhpcy5fc3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgICAgaWYgKG9sZFN0cmVhbSkge1xuICAgICAgICAvLyB0aGlzIGlzIHVzaW5nIG9kZCBDaHJvbWUgYmVoYXZpb3VyLCB1c2Ugd2l0aCBjYXV0aW9uOlxuICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NzgxNVxuICAgICAgICAvLyBOb3RlOiB3ZSByZWx5IG9uIHRoZSBoaWdoLWxldmVsIGFkZFRyYWNrL2R0bWYgc2hpbSB0b1xuICAgICAgICAvLyBjcmVhdGUgdGhlIHNlbmRlciB3aXRoIGEgZHRtZiBzZW5kZXIuXG4gICAgICAgIG9sZFN0cmVhbS5hZGRUcmFjayh0cmFjayk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBPTk4gYXN5bmMuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJykpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG5ld1N0cmVhbSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oW3RyYWNrXSk7XG4gICAgICAgIHRoaXMuX3N0cmVhbXNbc3RyZWFtLmlkXSA9IG5ld1N0cmVhbTtcbiAgICAgICAgdGhpcy5fcmV2ZXJzZVN0cmVhbXNbbmV3U3RyZWFtLmlkXSA9IHN0cmVhbTtcbiAgICAgICAgdGhpcy5hZGRTdHJlYW0obmV3U3RyZWFtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmdldFNlbmRlcnMoKS5maW5kKHMgPT4gcy50cmFjayA9PT0gdHJhY2spO1xuICAgIH07XG5cbiAgLy8gcmVwbGFjZSB0aGUgaW50ZXJuYWwgc3RyZWFtIGlkIHdpdGggdGhlIGV4dGVybmFsIG9uZSBhbmRcbiAgLy8gdmljZSB2ZXJzYS5cbiAgZnVuY3Rpb24gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKSB7XG4gICAgbGV0IHNkcCA9IGRlc2NyaXB0aW9uLnNkcDtcbiAgICBPYmplY3Qua2V5cyhwYy5fcmV2ZXJzZVN0cmVhbXMgfHwgW10pLmZvckVhY2goaW50ZXJuYWxJZCA9PiB7XG4gICAgICBjb25zdCBleHRlcm5hbFN0cmVhbSA9IHBjLl9yZXZlcnNlU3RyZWFtc1tpbnRlcm5hbElkXTtcbiAgICAgIGNvbnN0IGludGVybmFsU3RyZWFtID0gcGMuX3N0cmVhbXNbZXh0ZXJuYWxTdHJlYW0uaWRdO1xuICAgICAgc2RwID0gc2RwLnJlcGxhY2UobmV3IFJlZ0V4cChpbnRlcm5hbFN0cmVhbS5pZCwgJ2cnKSxcbiAgICAgICAgICBleHRlcm5hbFN0cmVhbS5pZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgIHNkcFxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbikge1xuICAgIGxldCBzZHAgPSBkZXNjcmlwdGlvbi5zZHA7XG4gICAgT2JqZWN0LmtleXMocGMuX3JldmVyc2VTdHJlYW1zIHx8IFtdKS5mb3JFYWNoKGludGVybmFsSWQgPT4ge1xuICAgICAgY29uc3QgZXh0ZXJuYWxTdHJlYW0gPSBwYy5fcmV2ZXJzZVN0cmVhbXNbaW50ZXJuYWxJZF07XG4gICAgICBjb25zdCBpbnRlcm5hbFN0cmVhbSA9IHBjLl9zdHJlYW1zW2V4dGVybmFsU3RyZWFtLmlkXTtcbiAgICAgIHNkcCA9IHNkcC5yZXBsYWNlKG5ldyBSZWdFeHAoZXh0ZXJuYWxTdHJlYW0uaWQsICdnJyksXG4gICAgICAgICAgaW50ZXJuYWxTdHJlYW0uaWQpO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcbiAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICBzZHBcbiAgICB9KTtcbiAgfVxuICBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgY29uc3QgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgIGNvbnN0IG1ldGhvZE9iaiA9IHtbbWV0aG9kXSgpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBjb25zdCBpc0xlZ2FjeUNhbGwgPSBhcmd1bWVudHMubGVuZ3RoICYmXG4gICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIGlmIChpc0xlZ2FjeUNhbGwpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBbXG4gICAgICAgICAgKGRlc2NyaXB0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXNjID0gcmVwbGFjZUludGVybmFsU3RyZWFtSWQodGhpcywgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgYXJnc1swXS5hcHBseShudWxsLCBbZGVzY10pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKGFyZ3NbMV0pIHtcbiAgICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGFyZ3VtZW50c1syXVxuICAgICAgICBdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgLnRoZW4oZGVzY3JpcHRpb24gPT4gcmVwbGFjZUludGVybmFsU3RyZWFtSWQodGhpcywgZGVzY3JpcHRpb24pKTtcbiAgICB9fTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBtZXRob2RPYmpbbWV0aG9kXTtcbiAgfSk7XG5cbiAgY29uc3Qgb3JpZ1NldExvY2FsRGVzY3JpcHRpb24gPVxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uO1xuICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPVxuICAgIGZ1bmN0aW9uIHNldExvY2FsRGVzY3JpcHRpb24oKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgIWFyZ3VtZW50c1swXS50eXBlKSB7XG4gICAgICAgIHJldHVybiBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgYXJndW1lbnRzWzBdID0gcmVwbGFjZUV4dGVybmFsU3RyZWFtSWQodGhpcywgYXJndW1lbnRzWzBdKTtcbiAgICAgIHJldHVybiBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgLy8gVE9ETzogbWFuZ2xlIGdldFN0YXRzOiBodHRwczovL3czYy5naXRodWIuaW8vd2VicnRjLXN0YXRzLyNkb20tcnRjbWVkaWFzdHJlYW1zdGF0cy1zdHJlYW1pZGVudGlmaWVyXG5cbiAgY29uc3Qgb3JpZ0xvY2FsRGVzY3JpcHRpb24gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ2xvY2FsRGVzY3JpcHRpb24nKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsXG4gICAgICAnbG9jYWxEZXNjcmlwdGlvbicsIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gb3JpZ0xvY2FsRGVzY3JpcHRpb24uZ2V0LmFwcGx5KHRoaXMpO1xuICAgICAgICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVwbGFjZUludGVybmFsU3RyZWFtSWQodGhpcywgZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID1cbiAgICBmdW5jdGlvbiByZW1vdmVUcmFjayhzZW5kZXIpIHtcbiAgICAgIGlmICh0aGlzLnNpZ25hbGluZ1N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgUlRDUGVlckNvbm5lY3Rpb25cXCdzIHNpZ25hbGluZ1N0YXRlIGlzIFxcJ2Nsb3NlZFxcJy4nLFxuICAgICAgICAgICdJbnZhbGlkU3RhdGVFcnJvcicpO1xuICAgICAgfVxuICAgICAgLy8gV2UgY2FuIG5vdCB5ZXQgY2hlY2sgZm9yIHNlbmRlciBpbnN0YW5jZW9mIFJUQ1J0cFNlbmRlclxuICAgICAgLy8gc2luY2Ugd2Ugc2hpbSBSVFBTZW5kZXIuIFNvIHdlIGNoZWNrIGlmIHNlbmRlci5fcGMgaXMgc2V0LlxuICAgICAgaWYgKCFzZW5kZXIuX3BjKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXG4gICAgICAgICAgICAnZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBSVENSdHBTZW5kZXIuJywgJ1R5cGVFcnJvcicpO1xuICAgICAgfVxuICAgICAgY29uc3QgaXNMb2NhbCA9IHNlbmRlci5fcGMgPT09IHRoaXM7XG4gICAgICBpZiAoIWlzTG9jYWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyxcbiAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VhcmNoIGZvciB0aGUgbmF0aXZlIHN0cmVhbSB0aGUgc2VuZGVycyB0cmFjayBiZWxvbmdzIHRvLlxuICAgICAgdGhpcy5fc3RyZWFtcyA9IHRoaXMuX3N0cmVhbXMgfHwge307XG4gICAgICBsZXQgc3RyZWFtO1xuICAgICAgT2JqZWN0LmtleXModGhpcy5fc3RyZWFtcykuZm9yRWFjaChzdHJlYW1pZCA9PiB7XG4gICAgICAgIGNvbnN0IGhhc1RyYWNrID0gdGhpcy5fc3RyZWFtc1tzdHJlYW1pZF0uZ2V0VHJhY2tzKClcbiAgICAgICAgICAuZmluZCh0cmFjayA9PiBzZW5kZXIudHJhY2sgPT09IHRyYWNrKTtcbiAgICAgICAgaWYgKGhhc1RyYWNrKSB7XG4gICAgICAgICAgc3RyZWFtID0gdGhpcy5fc3RyZWFtc1tzdHJlYW1pZF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgIGlmIChzdHJlYW0uZ2V0VHJhY2tzKCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgbGFzdCB0cmFjayBvZiB0aGUgc3RyZWFtLCByZW1vdmUgdGhlIHN0cmVhbS4gVGhpc1xuICAgICAgICAgIC8vIHRha2VzIGNhcmUgb2YgYW55IHNoaW1tZWQgX3NlbmRlcnMuXG4gICAgICAgICAgdGhpcy5yZW1vdmVTdHJlYW0odGhpcy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVseWluZyBvbiB0aGUgc2FtZSBvZGQgY2hyb21lIGJlaGF2aW91ciBhcyBhYm92ZS5cbiAgICAgICAgICBzdHJlYW0ucmVtb3ZlVHJhY2soc2VuZGVyLnRyYWNrKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpKTtcbiAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdywgYnJvd3NlckRldGFpbHMpIHtcbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgLy8gdmVyeSBiYXNpYyBzdXBwb3J0IGZvciBvbGQgdmVyc2lvbnMuXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uO1xuICB9XG4gIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2hpbSBpbXBsaWNpdCBjcmVhdGlvbiBvZiBSVENTZXNzaW9uRGVzY3JpcHRpb24vUlRDSWNlQ2FuZGlkYXRlXG4gIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTMpIHtcbiAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICAgIGNvbnN0IG1ldGhvZE9iaiA9IHtbbWV0aG9kXSgpIHtcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIDpcbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKShhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH19O1xuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IG1ldGhvZE9ialttZXRob2RdO1xuICAgICAgICB9KTtcbiAgfVxufVxuXG4vLyBBdHRlbXB0IHRvIGZpeCBPTk4gaW4gcGxhbi1iIG1vZGUuXG5leHBvcnQgZnVuY3Rpb24gZml4TmVnb3RpYXRpb25OZWVkZWQod2luZG93LCBicm93c2VyRGV0YWlscykge1xuICB1dGlscy53cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csICduZWdvdGlhdGlvbm5lZWRlZCcsIGUgPT4ge1xuICAgIGNvbnN0IHBjID0gZS50YXJnZXQ7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA3MiB8fCAocGMuZ2V0Q29uZmlndXJhdGlvbiAmJlxuICAgICAgICBwYy5nZXRDb25maWd1cmF0aW9uKCkuc2RwU2VtYW50aWNzID09PSAncGxhbi1iJykpIHtcbiAgICAgIGlmIChwYy5zaWduYWxpbmdTdGF0ZSAhPT0gJ3N0YWJsZScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfSk7XG59XG4iLCAiLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTggVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4vKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuLy8gRWRnZSBkb2VzIG5vdCBsaWtlXG4vLyAxKSBzdHVuOiBmaWx0ZXJlZCBhZnRlciAxNDM5MyB1bmxlc3MgP3RyYW5zcG9ydD11ZHAgaXMgcHJlc2VudFxuLy8gMikgdHVybjogdGhhdCBkb2VzIG5vdCBoYXZlIGFsbCBvZiB0dXJuOmhvc3Q6cG9ydD90cmFuc3BvcnQ9dWRwXG4vLyAzKSB0dXJuOiB3aXRoIGlwdjYgYWRkcmVzc2VzXG4vLyA0KSB0dXJuOiBvY2N1cnJpbmcgbXVsaXBsZSB0aW1lc1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckljZVNlcnZlcnMoaWNlU2VydmVycywgZWRnZVZlcnNpb24pIHtcbiAgbGV0IGhhc1R1cm4gPSBmYWxzZTtcbiAgaWNlU2VydmVycyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaWNlU2VydmVycykpO1xuICByZXR1cm4gaWNlU2VydmVycy5maWx0ZXIoc2VydmVyID0+IHtcbiAgICBpZiAoc2VydmVyICYmIChzZXJ2ZXIudXJscyB8fCBzZXJ2ZXIudXJsKSkge1xuICAgICAgbGV0IHVybHMgPSBzZXJ2ZXIudXJscyB8fCBzZXJ2ZXIudXJsO1xuICAgICAgaWYgKHNlcnZlci51cmwgJiYgIXNlcnZlci51cmxzKSB7XG4gICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1JUQ0ljZVNlcnZlci51cmwnLCAnUlRDSWNlU2VydmVyLnVybHMnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIHVybHMgPT09ICdzdHJpbmcnO1xuICAgICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICAgIHVybHMgPSBbdXJsc107XG4gICAgICB9XG4gICAgICB1cmxzID0gdXJscy5maWx0ZXIodXJsID0+IHtcbiAgICAgICAgLy8gZmlsdGVyIFNUVU4gdW5jb25kaXRpb25hbGx5LlxuICAgICAgICBpZiAodXJsLmluZGV4T2YoJ3N0dW46JykgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWxpZFR1cm4gPSB1cmwuc3RhcnRzV2l0aCgndHVybicpICYmXG4gICAgICAgICAgICAhdXJsLnN0YXJ0c1dpdGgoJ3R1cm46WycpICYmXG4gICAgICAgICAgICB1cmwuaW5jbHVkZXMoJ3RyYW5zcG9ydD11ZHAnKTtcbiAgICAgICAgaWYgKHZhbGlkVHVybiAmJiAhaGFzVHVybikge1xuICAgICAgICAgIGhhc1R1cm4gPSB0cnVlO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZFR1cm4gJiYgIWhhc1R1cm47XG4gICAgICB9KTtcblxuICAgICAgZGVsZXRlIHNlcnZlci51cmw7XG4gICAgICBzZXJ2ZXIudXJscyA9IGlzU3RyaW5nID8gdXJsc1swXSA6IHVybHM7XG4gICAgICByZXR1cm4gISF1cmxzLmxlbmd0aDtcbiAgICB9XG4gIH0pO1xufVxuIiwgIi8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBTRFAgaGVscGVycy5cbnZhciBTRFBVdGlscyA9IHt9O1xuXG4vLyBHZW5lcmF0ZSBhbiBhbHBoYW51bWVyaWMgaWRlbnRpZmllciBmb3IgY25hbWUgb3IgbWlkcy5cbi8vIFRPRE86IHVzZSBVVUlEcyBpbnN0ZWFkPyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzXG5TRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCAxMCk7XG59O1xuXG4vLyBUaGUgUlRDUCBDTkFNRSB1c2VkIGJ5IGFsbCBwZWVyY29ubmVjdGlvbnMgZnJvbSB0aGUgc2FtZSBKUy5cblNEUFV0aWxzLmxvY2FsQ05hbWUgPSBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcblxuLy8gU3BsaXRzIFNEUCBpbnRvIGxpbmVzLCBkZWFsaW5nIHdpdGggYm90aCBDUkxGIGFuZCBMRi5cblNEUFV0aWxzLnNwbGl0TGluZXMgPSBmdW5jdGlvbihibG9iKSB7XG4gIHJldHVybiBibG9iLnRyaW0oKS5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gbGluZS50cmltKCk7XG4gIH0pO1xufTtcbi8vIFNwbGl0cyBTRFAgaW50byBzZXNzaW9ucGFydCBhbmQgbWVkaWFzZWN0aW9ucy4gRW5zdXJlcyBDUkxGLlxuU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgdmFyIHBhcnRzID0gYmxvYi5zcGxpdCgnXFxubT0nKTtcbiAgcmV0dXJuIHBhcnRzLm1hcChmdW5jdGlvbihwYXJ0LCBpbmRleCkge1xuICAgIHJldHVybiAoaW5kZXggPiAwID8gJ209JyArIHBhcnQgOiBwYXJ0KS50cmltKCkgKyAnXFxyXFxuJztcbiAgfSk7XG59O1xuXG4vLyByZXR1cm5zIHRoZSBzZXNzaW9uIGRlc2NyaXB0aW9uLlxuU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24gPSBmdW5jdGlvbihibG9iKSB7XG4gIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoYmxvYik7XG4gIHJldHVybiBzZWN0aW9ucyAmJiBzZWN0aW9uc1swXTtcbn07XG5cbi8vIHJldHVybnMgdGhlIGluZGl2aWR1YWwgbWVkaWEgc2VjdGlvbnMuXG5TRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zID0gZnVuY3Rpb24oYmxvYikge1xuICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGJsb2IpO1xuICBzZWN0aW9ucy5zaGlmdCgpO1xuICByZXR1cm4gc2VjdGlvbnM7XG59O1xuXG4vLyBSZXR1cm5zIGxpbmVzIHRoYXQgc3RhcnQgd2l0aCBhIGNlcnRhaW4gcHJlZml4LlxuU0RQVXRpbHMubWF0Y2hQcmVmaXggPSBmdW5jdGlvbihibG9iLCBwcmVmaXgpIHtcbiAgcmV0dXJuIFNEUFV0aWxzLnNwbGl0TGluZXMoYmxvYikuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gbGluZS5pbmRleE9mKHByZWZpeCkgPT09IDA7XG4gIH0pO1xufTtcblxuLy8gUGFyc2VzIGFuIElDRSBjYW5kaWRhdGUgbGluZS4gU2FtcGxlIGlucHV0OlxuLy8gY2FuZGlkYXRlOjcwMjc4NjM1MCAyIHVkcCA0MTgxOTkwMiA4LjguOC44IDYwNzY5IHR5cCByZWxheSByYWRkciA4LjguOC44XG4vLyBycG9ydCA1NTk5NlwiXG5TRFBVdGlscy5wYXJzZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzO1xuICAvLyBQYXJzZSBib3RoIHZhcmlhbnRzLlxuICBpZiAobGluZS5pbmRleE9mKCdhPWNhbmRpZGF0ZTonKSA9PT0gMCkge1xuICAgIHBhcnRzID0gbGluZS5zdWJzdHJpbmcoMTIpLnNwbGl0KCcgJyk7XG4gIH0gZWxzZSB7XG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMCkuc3BsaXQoJyAnKTtcbiAgfVxuXG4gIHZhciBjYW5kaWRhdGUgPSB7XG4gICAgZm91bmRhdGlvbjogcGFydHNbMF0sXG4gICAgY29tcG9uZW50OiBwYXJzZUludChwYXJ0c1sxXSwgMTApLFxuICAgIHByb3RvY29sOiBwYXJ0c1syXS50b0xvd2VyQ2FzZSgpLFxuICAgIHByaW9yaXR5OiBwYXJzZUludChwYXJ0c1szXSwgMTApLFxuICAgIGlwOiBwYXJ0c1s0XSxcbiAgICBhZGRyZXNzOiBwYXJ0c1s0XSwgLy8gYWRkcmVzcyBpcyBhbiBhbGlhcyBmb3IgaXAuXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbNV0sIDEwKSxcbiAgICAvLyBza2lwIHBhcnRzWzZdID09ICd0eXAnXG4gICAgdHlwZTogcGFydHNbN11cbiAgfTtcblxuICBmb3IgKHZhciBpID0gODsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgc3dpdGNoIChwYXJ0c1tpXSkge1xuICAgICAgY2FzZSAncmFkZHInOlxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncnBvcnQnOlxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZFBvcnQgPSBwYXJzZUludChwYXJ0c1tpICsgMV0sIDEwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0Y3B0eXBlJzpcbiAgICAgICAgY2FuZGlkYXRlLnRjcFR5cGUgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndWZyYWcnOlxuICAgICAgICBjYW5kaWRhdGUudWZyYWcgPSBwYXJ0c1tpICsgMV07IC8vIGZvciBiYWNrd2FyZCBjb21wYWJpbGl0eS5cbiAgICAgICAgY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogLy8gZXh0ZW5zaW9uIGhhbmRsaW5nLCBpbiBwYXJ0aWN1bGFyIHVmcmFnXG4gICAgICAgIGNhbmRpZGF0ZVtwYXJ0c1tpXV0gPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2FuZGlkYXRlO1xufTtcblxuLy8gVHJhbnNsYXRlcyBhIGNhbmRpZGF0ZSBvYmplY3QgaW50byBTRFAgY2FuZGlkYXRlIGF0dHJpYnV0ZS5cblNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gIHZhciBzZHAgPSBbXTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmZvdW5kYXRpb24pO1xuICBzZHAucHVzaChjYW5kaWRhdGUuY29tcG9uZW50KTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnByb3RvY29sLnRvVXBwZXJDYXNlKCkpO1xuICBzZHAucHVzaChjYW5kaWRhdGUucHJpb3JpdHkpO1xuICBzZHAucHVzaChjYW5kaWRhdGUuYWRkcmVzcyB8fCBjYW5kaWRhdGUuaXApO1xuICBzZHAucHVzaChjYW5kaWRhdGUucG9ydCk7XG5cbiAgdmFyIHR5cGUgPSBjYW5kaWRhdGUudHlwZTtcbiAgc2RwLnB1c2goJ3R5cCcpO1xuICBzZHAucHVzaCh0eXBlKTtcbiAgaWYgKHR5cGUgIT09ICdob3N0JyAmJiBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgJiZcbiAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCkge1xuICAgIHNkcC5wdXNoKCdyYWRkcicpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyk7XG4gICAgc2RwLnB1c2goJ3Jwb3J0Jyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnJlbGF0ZWRQb3J0KTtcbiAgfVxuICBpZiAoY2FuZGlkYXRlLnRjcFR5cGUgJiYgY2FuZGlkYXRlLnByb3RvY29sLnRvTG93ZXJDYXNlKCkgPT09ICd0Y3AnKSB7XG4gICAgc2RwLnB1c2goJ3RjcHR5cGUnKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUudGNwVHlwZSk7XG4gIH1cbiAgaWYgKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZykge1xuICAgIHNkcC5wdXNoKCd1ZnJhZycpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZyk7XG4gIH1cbiAgcmV0dXJuICdjYW5kaWRhdGU6JyArIHNkcC5qb2luKCcgJyk7XG59O1xuXG4vLyBQYXJzZXMgYW4gaWNlLW9wdGlvbnMgbGluZSwgcmV0dXJucyBhbiBhcnJheSBvZiBvcHRpb24gdGFncy5cbi8vIGE9aWNlLW9wdGlvbnM6Zm9vIGJhclxuU0RQVXRpbHMucGFyc2VJY2VPcHRpb25zID0gZnVuY3Rpb24obGluZSkge1xuICByZXR1cm4gbGluZS5zdWJzdHIoMTQpLnNwbGl0KCcgJyk7XG59O1xuXG4vLyBQYXJzZXMgYW4gcnRwbWFwIGxpbmUsIHJldHVybnMgUlRDUnRwQ29kZGVjUGFyYW1ldGVycy4gU2FtcGxlIGlucHV0OlxuLy8gYT1ydHBtYXA6MTExIG9wdXMvNDgwMDAvMlxuU0RQVXRpbHMucGFyc2VSdHBNYXAgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XG4gIHZhciBwYXJzZWQgPSB7XG4gICAgcGF5bG9hZFR5cGU6IHBhcnNlSW50KHBhcnRzLnNoaWZ0KCksIDEwKSAvLyB3YXM6IGlkXG4gIH07XG5cbiAgcGFydHMgPSBwYXJ0c1swXS5zcGxpdCgnLycpO1xuXG4gIHBhcnNlZC5uYW1lID0gcGFydHNbMF07XG4gIHBhcnNlZC5jbG9ja1JhdGUgPSBwYXJzZUludChwYXJ0c1sxXSwgMTApOyAvLyB3YXM6IGNsb2NrcmF0ZVxuICBwYXJzZWQuY2hhbm5lbHMgPSBwYXJ0cy5sZW5ndGggPT09IDMgPyBwYXJzZUludChwYXJ0c1syXSwgMTApIDogMTtcbiAgLy8gbGVnYWN5IGFsaWFzLCBnb3QgcmVuYW1lZCBiYWNrIHRvIGNoYW5uZWxzIGluIE9SVEMuXG4gIHBhcnNlZC5udW1DaGFubmVscyA9IHBhcnNlZC5jaGFubmVscztcbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbi8vIEdlbmVyYXRlIGFuIGE9cnRwbWFwIGxpbmUgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3Jcbi8vIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRwTWFwID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgfVxuICB2YXIgY2hhbm5lbHMgPSBjb2RlYy5jaGFubmVscyB8fCBjb2RlYy5udW1DaGFubmVscyB8fCAxO1xuICByZXR1cm4gJ2E9cnRwbWFwOicgKyBwdCArICcgJyArIGNvZGVjLm5hbWUgKyAnLycgKyBjb2RlYy5jbG9ja1JhdGUgK1xuICAgICAgKGNoYW5uZWxzICE9PSAxID8gJy8nICsgY2hhbm5lbHMgOiAnJykgKyAnXFxyXFxuJztcbn07XG5cbi8vIFBhcnNlcyBhbiBhPWV4dG1hcCBsaW5lIChoZWFkZXJleHRlbnNpb24gZnJvbSBSRkMgNTI4NSkuIFNhbXBsZSBpbnB1dDpcbi8vIGE9ZXh0bWFwOjIgdXJuOmlldGY6cGFyYW1zOnJ0cC1oZHJleHQ6dG9mZnNldFxuLy8gYT1leHRtYXA6Mi9zZW5kb25seSB1cm46aWV0ZjpwYXJhbXM6cnRwLWhkcmV4dDp0b2Zmc2V0XG5TRFBVdGlscy5wYXJzZUV4dG1hcCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoOSkuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICBpZDogcGFyc2VJbnQocGFydHNbMF0sIDEwKSxcbiAgICBkaXJlY3Rpb246IHBhcnRzWzBdLmluZGV4T2YoJy8nKSA+IDAgPyBwYXJ0c1swXS5zcGxpdCgnLycpWzFdIDogJ3NlbmRyZWN2JyxcbiAgICB1cmk6IHBhcnRzWzFdXG4gIH07XG59O1xuXG4vLyBHZW5lcmF0ZXMgYT1leHRtYXAgbGluZSBmcm9tIFJUQ1J0cEhlYWRlckV4dGVuc2lvblBhcmFtZXRlcnMgb3Jcbi8vIFJUQ1J0cEhlYWRlckV4dGVuc2lvbi5cblNEUFV0aWxzLndyaXRlRXh0bWFwID0gZnVuY3Rpb24oaGVhZGVyRXh0ZW5zaW9uKSB7XG4gIHJldHVybiAnYT1leHRtYXA6JyArIChoZWFkZXJFeHRlbnNpb24uaWQgfHwgaGVhZGVyRXh0ZW5zaW9uLnByZWZlcnJlZElkKSArXG4gICAgICAoaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAmJiBoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uICE9PSAnc2VuZHJlY3YnXG4gICAgICAgID8gJy8nICsgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvblxuICAgICAgICA6ICcnKSArXG4gICAgICAnICcgKyBoZWFkZXJFeHRlbnNpb24udXJpICsgJ1xcclxcbic7XG59O1xuXG4vLyBQYXJzZXMgYW4gZnRtcCBsaW5lLCByZXR1cm5zIGRpY3Rpb25hcnkuIFNhbXBsZSBpbnB1dDpcbi8vIGE9Zm10cDo5NiB2YnI9b247Y25nPW9uXG4vLyBBbHNvIGRlYWxzIHdpdGggdmJyPW9uOyBjbmc9b25cblNEUFV0aWxzLnBhcnNlRm10cCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga3Y7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKGxpbmUuaW5kZXhPZignICcpICsgMSkuc3BsaXQoJzsnKTtcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgIGt2ID0gcGFydHNbal0udHJpbSgpLnNwbGl0KCc9Jyk7XG4gICAgcGFyc2VkW2t2WzBdLnRyaW0oKV0gPSBrdlsxXTtcbiAgfVxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuLy8gR2VuZXJhdGVzIGFuIGE9ZnRtcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlRm10cCA9IGZ1bmN0aW9uKGNvZGVjKSB7XG4gIHZhciBsaW5lID0gJyc7XG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gIH1cbiAgaWYgKGNvZGVjLnBhcmFtZXRlcnMgJiYgT2JqZWN0LmtleXMoY29kZWMucGFyYW1ldGVycykubGVuZ3RoKSB7XG4gICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGNvZGVjLnBhcmFtZXRlcnMpLmZvckVhY2goZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgIGlmIChjb2RlYy5wYXJhbWV0ZXJzW3BhcmFtXSkge1xuICAgICAgICBwYXJhbXMucHVzaChwYXJhbSArICc9JyArIGNvZGVjLnBhcmFtZXRlcnNbcGFyYW1dKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKHBhcmFtKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaW5lICs9ICdhPWZtdHA6JyArIHB0ICsgJyAnICsgcGFyYW1zLmpvaW4oJzsnKSArICdcXHJcXG4nO1xuICB9XG4gIHJldHVybiBsaW5lO1xufTtcblxuLy8gUGFyc2VzIGFuIHJ0Y3AtZmIgbGluZSwgcmV0dXJucyBSVENQUnRjcEZlZWRiYWNrIG9iamVjdC4gU2FtcGxlIGlucHV0OlxuLy8gYT1ydGNwLWZiOjk4IG5hY2sgcnBzaVxuU0RQVXRpbHMucGFyc2VSdGNwRmIgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKGxpbmUuaW5kZXhPZignICcpICsgMSkuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBwYXJ0cy5zaGlmdCgpLFxuICAgIHBhcmFtZXRlcjogcGFydHMuam9pbignICcpXG4gIH07XG59O1xuLy8gR2VuZXJhdGUgYT1ydGNwLWZiIGxpbmVzIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRjcEZiID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIGxpbmVzID0gJyc7XG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gIH1cbiAgaWYgKGNvZGVjLnJ0Y3BGZWVkYmFjayAmJiBjb2RlYy5ydGNwRmVlZGJhY2subGVuZ3RoKSB7XG4gICAgLy8gRklYTUU6IHNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyci1pbnQ/XG4gICAgY29kZWMucnRjcEZlZWRiYWNrLmZvckVhY2goZnVuY3Rpb24oZmIpIHtcbiAgICAgIGxpbmVzICs9ICdhPXJ0Y3AtZmI6JyArIHB0ICsgJyAnICsgZmIudHlwZSArXG4gICAgICAoZmIucGFyYW1ldGVyICYmIGZiLnBhcmFtZXRlci5sZW5ndGggPyAnICcgKyBmYi5wYXJhbWV0ZXIgOiAnJykgK1xuICAgICAgICAgICdcXHJcXG4nO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBsaW5lcztcbn07XG5cbi8vIFBhcnNlcyBhbiBSRkMgNTU3NiBzc3JjIG1lZGlhIGF0dHJpYnV0ZS4gU2FtcGxlIGlucHV0OlxuLy8gYT1zc3JjOjM3MzU5Mjg1NTkgY25hbWU6c29tZXRoaW5nXG5TRFBVdGlscy5wYXJzZVNzcmNNZWRpYSA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHNwID0gbGluZS5pbmRleE9mKCcgJyk7XG4gIHZhciBwYXJ0cyA9IHtcbiAgICBzc3JjOiBwYXJzZUludChsaW5lLnN1YnN0cig3LCBzcCAtIDcpLCAxMClcbiAgfTtcbiAgdmFyIGNvbG9uID0gbGluZS5pbmRleE9mKCc6Jywgc3ApO1xuICBpZiAoY29sb24gPiAtMSkge1xuICAgIHBhcnRzLmF0dHJpYnV0ZSA9IGxpbmUuc3Vic3RyKHNwICsgMSwgY29sb24gLSBzcCAtIDEpO1xuICAgIHBhcnRzLnZhbHVlID0gbGluZS5zdWJzdHIoY29sb24gKyAxKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJ0cy5hdHRyaWJ1dGUgPSBsaW5lLnN1YnN0cihzcCArIDEpO1xuICB9XG4gIHJldHVybiBwYXJ0cztcbn07XG5cblNEUFV0aWxzLnBhcnNlU3NyY0dyb3VwID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigxMykuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICBzZW1hbnRpY3M6IHBhcnRzLnNoaWZ0KCksXG4gICAgc3NyY3M6IHBhcnRzLm1hcChmdW5jdGlvbihzc3JjKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoc3NyYywgMTApO1xuICAgIH0pXG4gIH07XG59O1xuXG4vLyBFeHRyYWN0cyB0aGUgTUlEIChSRkMgNTg4OCkgZnJvbSBhIG1lZGlhIHNlY3Rpb24uXG4vLyByZXR1cm5zIHRoZSBNSUQgb3IgdW5kZWZpbmVkIGlmIG5vIG1pZCBsaW5lIHdhcyBmb3VuZC5cblNEUFV0aWxzLmdldE1pZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbWlkID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1taWQ6JylbMF07XG4gIGlmIChtaWQpIHtcbiAgICByZXR1cm4gbWlkLnN1YnN0cig2KTtcbiAgfVxufTtcblxuU0RQVXRpbHMucGFyc2VGaW5nZXJwcmludCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMTQpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgYWxnb3JpdGhtOiBwYXJ0c1swXS50b0xvd2VyQ2FzZSgpLCAvLyBhbGdvcml0aG0gaXMgY2FzZS1zZW5zaXRpdmUgaW4gRWRnZS5cbiAgICB2YWx1ZTogcGFydHNbMV1cbiAgfTtcbn07XG5cbi8vIEV4dHJhY3RzIERUTFMgcGFyYW1ldGVycyBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxuLy8gRklYTUU6IGZvciBjb25zaXN0ZW5jeSB3aXRoIG90aGVyIGZ1bmN0aW9ucyB0aGlzIHNob3VsZCBvbmx5XG4vLyAgIGdldCB0aGUgZmluZ2VycHJpbnQgbGluZSBhcyBpbnB1dC4gU2VlIGFsc28gZ2V0SWNlUGFyYW1ldGVycy5cblNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24gKyBzZXNzaW9ucGFydCxcbiAgICAnYT1maW5nZXJwcmludDonKTtcbiAgLy8gTm90ZTogYT1zZXR1cCBsaW5lIGlzIGlnbm9yZWQgc2luY2Ugd2UgdXNlIHRoZSAnYXV0bycgcm9sZS5cbiAgLy8gTm90ZTI6ICdhbGdvcml0aG0nIGlzIG5vdCBjYXNlIHNlbnNpdGl2ZSBleGNlcHQgaW4gRWRnZS5cbiAgcmV0dXJuIHtcbiAgICByb2xlOiAnYXV0bycsXG4gICAgZmluZ2VycHJpbnRzOiBsaW5lcy5tYXAoU0RQVXRpbHMucGFyc2VGaW5nZXJwcmludClcbiAgfTtcbn07XG5cbi8vIFNlcmlhbGl6ZXMgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cblNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMgPSBmdW5jdGlvbihwYXJhbXMsIHNldHVwVHlwZSkge1xuICB2YXIgc2RwID0gJ2E9c2V0dXA6JyArIHNldHVwVHlwZSArICdcXHJcXG4nO1xuICBwYXJhbXMuZmluZ2VycHJpbnRzLmZvckVhY2goZnVuY3Rpb24oZnApIHtcbiAgICBzZHAgKz0gJ2E9ZmluZ2VycHJpbnQ6JyArIGZwLmFsZ29yaXRobSArICcgJyArIGZwLnZhbHVlICsgJ1xcclxcbic7XG4gIH0pO1xuICByZXR1cm4gc2RwO1xufTtcblxuLy8gUGFyc2VzIGE9Y3J5cHRvIGxpbmVzIGludG9cbi8vICAgaHR0cHM6Ly9yYXdnaXQuY29tL2Fib2JhL2VkZ2VydGMvbWFzdGVyL21zb3J0Yy1yczQuaHRtbCNkaWN0aW9uYXJ5LXJ0Y3NydHBzZGVzcGFyYW1ldGVycy1tZW1iZXJzXG5TRFBVdGlscy5wYXJzZUNyeXB0b0xpbmUgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgdGFnOiBwYXJzZUludChwYXJ0c1swXSwgMTApLFxuICAgIGNyeXB0b1N1aXRlOiBwYXJ0c1sxXSxcbiAgICBrZXlQYXJhbXM6IHBhcnRzWzJdLFxuICAgIHNlc3Npb25QYXJhbXM6IHBhcnRzLnNsaWNlKDMpLFxuICB9O1xufTtcblxuU0RQVXRpbHMud3JpdGVDcnlwdG9MaW5lID0gZnVuY3Rpb24ocGFyYW1ldGVycykge1xuICByZXR1cm4gJ2E9Y3J5cHRvOicgKyBwYXJhbWV0ZXJzLnRhZyArICcgJyArXG4gICAgcGFyYW1ldGVycy5jcnlwdG9TdWl0ZSArICcgJyArXG4gICAgKHR5cGVvZiBwYXJhbWV0ZXJzLmtleVBhcmFtcyA9PT0gJ29iamVjdCdcbiAgICAgID8gU0RQVXRpbHMud3JpdGVDcnlwdG9LZXlQYXJhbXMocGFyYW1ldGVycy5rZXlQYXJhbXMpXG4gICAgICA6IHBhcmFtZXRlcnMua2V5UGFyYW1zKSArXG4gICAgKHBhcmFtZXRlcnMuc2Vzc2lvblBhcmFtcyA/ICcgJyArIHBhcmFtZXRlcnMuc2Vzc2lvblBhcmFtcy5qb2luKCcgJykgOiAnJykgK1xuICAgICdcXHJcXG4nO1xufTtcblxuLy8gUGFyc2VzIHRoZSBjcnlwdG8ga2V5IHBhcmFtZXRlcnMgaW50b1xuLy8gICBodHRwczovL3Jhd2dpdC5jb20vYWJvYmEvZWRnZXJ0Yy9tYXN0ZXIvbXNvcnRjLXJzNC5odG1sI3J0Y3NydHBrZXlwYXJhbSpcblNEUFV0aWxzLnBhcnNlQ3J5cHRvS2V5UGFyYW1zID0gZnVuY3Rpb24oa2V5UGFyYW1zKSB7XG4gIGlmIChrZXlQYXJhbXMuaW5kZXhPZignaW5saW5lOicpICE9PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIHBhcnRzID0ga2V5UGFyYW1zLnN1YnN0cig3KS5zcGxpdCgnfCcpO1xuICByZXR1cm4ge1xuICAgIGtleU1ldGhvZDogJ2lubGluZScsXG4gICAga2V5U2FsdDogcGFydHNbMF0sXG4gICAgbGlmZVRpbWU6IHBhcnRzWzFdLFxuICAgIG1raVZhbHVlOiBwYXJ0c1syXSA/IHBhcnRzWzJdLnNwbGl0KCc6JylbMF0gOiB1bmRlZmluZWQsXG4gICAgbWtpTGVuZ3RoOiBwYXJ0c1syXSA/IHBhcnRzWzJdLnNwbGl0KCc6JylbMV0gOiB1bmRlZmluZWQsXG4gIH07XG59O1xuXG5TRFBVdGlscy53cml0ZUNyeXB0b0tleVBhcmFtcyA9IGZ1bmN0aW9uKGtleVBhcmFtcykge1xuICByZXR1cm4ga2V5UGFyYW1zLmtleU1ldGhvZCArICc6J1xuICAgICsga2V5UGFyYW1zLmtleVNhbHQgK1xuICAgIChrZXlQYXJhbXMubGlmZVRpbWUgPyAnfCcgKyBrZXlQYXJhbXMubGlmZVRpbWUgOiAnJykgK1xuICAgIChrZXlQYXJhbXMubWtpVmFsdWUgJiYga2V5UGFyYW1zLm1raUxlbmd0aFxuICAgICAgPyAnfCcgKyBrZXlQYXJhbXMubWtpVmFsdWUgKyAnOicgKyBrZXlQYXJhbXMubWtpTGVuZ3RoXG4gICAgICA6ICcnKTtcbn07XG5cbi8vIEV4dHJhY3RzIGFsbCBTREVTIHBhcmFtdGVycy5cblNEUFV0aWxzLmdldENyeXB0b1BhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiArIHNlc3Npb25wYXJ0LFxuICAgICdhPWNyeXB0bzonKTtcbiAgcmV0dXJuIGxpbmVzLm1hcChTRFBVdGlscy5wYXJzZUNyeXB0b0xpbmUpO1xufTtcblxuLy8gUGFyc2VzIElDRSBpbmZvcm1hdGlvbiBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxuLy8gRklYTUU6IGZvciBjb25zaXN0ZW5jeSB3aXRoIG90aGVyIGZ1bmN0aW9ucyB0aGlzIHNob3VsZCBvbmx5XG4vLyAgIGdldCB0aGUgaWNlLXVmcmFnIGFuZCBpY2UtcHdkIGxpbmVzIGFzIGlucHV0LlxuU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcbiAgdmFyIHVmcmFnID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uICsgc2Vzc2lvbnBhcnQsXG4gICAgJ2E9aWNlLXVmcmFnOicpWzBdO1xuICB2YXIgcHdkID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uICsgc2Vzc2lvbnBhcnQsXG4gICAgJ2E9aWNlLXB3ZDonKVswXTtcbiAgaWYgKCEodWZyYWcgJiYgcHdkKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB7XG4gICAgdXNlcm5hbWVGcmFnbWVudDogdWZyYWcuc3Vic3RyKDEyKSxcbiAgICBwYXNzd29yZDogcHdkLnN1YnN0cigxMCksXG4gIH07XG59O1xuXG4vLyBTZXJpYWxpemVzIElDRSBwYXJhbWV0ZXJzIHRvIFNEUC5cblNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICByZXR1cm4gJ2E9aWNlLXVmcmFnOicgKyBwYXJhbXMudXNlcm5hbWVGcmFnbWVudCArICdcXHJcXG4nICtcbiAgICAgICdhPWljZS1wd2Q6JyArIHBhcmFtcy5wYXNzd29yZCArICdcXHJcXG4nO1xufTtcblxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBSVENSdHBQYXJhbWV0ZXJzLlxuU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBkZXNjcmlwdGlvbiA9IHtcbiAgICBjb2RlY3M6IFtdLFxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxuICAgIGZlY01lY2hhbmlzbXM6IFtdLFxuICAgIHJ0Y3A6IFtdXG4gIH07XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIG1saW5lID0gbGluZXNbMF0uc3BsaXQoJyAnKTtcbiAgZm9yICh2YXIgaSA9IDM7IGkgPCBtbGluZS5sZW5ndGg7IGkrKykgeyAvLyBmaW5kIGFsbCBjb2RlY3MgZnJvbSBtbGluZVszLi5dXG4gICAgdmFyIHB0ID0gbWxpbmVbaV07XG4gICAgdmFyIHJ0cG1hcGxpbmUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcbiAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9cnRwbWFwOicgKyBwdCArICcgJylbMF07XG4gICAgaWYgKHJ0cG1hcGxpbmUpIHtcbiAgICAgIHZhciBjb2RlYyA9IFNEUFV0aWxzLnBhcnNlUnRwTWFwKHJ0cG1hcGxpbmUpO1xuICAgICAgdmFyIGZtdHBzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXG4gICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9Zm10cDonICsgcHQgKyAnICcpO1xuICAgICAgLy8gT25seSB0aGUgZmlyc3QgYT1mbXRwOjxwdD4gaXMgY29uc2lkZXJlZC5cbiAgICAgIGNvZGVjLnBhcmFtZXRlcnMgPSBmbXRwcy5sZW5ndGggPyBTRFBVdGlscy5wYXJzZUZtdHAoZm10cHNbMF0pIDoge307XG4gICAgICBjb2RlYy5ydGNwRmVlZGJhY2sgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcbiAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1ydGNwLWZiOicgKyBwdCArICcgJylcbiAgICAgICAgLm1hcChTRFBVdGlscy5wYXJzZVJ0Y3BGYik7XG4gICAgICBkZXNjcmlwdGlvbi5jb2RlY3MucHVzaChjb2RlYyk7XG4gICAgICAvLyBwYXJzZSBGRUMgbWVjaGFuaXNtcyBmcm9tIHJ0cG1hcCBsaW5lcy5cbiAgICAgIHN3aXRjaCAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgIGNhc2UgJ1JFRCc6XG4gICAgICAgIGNhc2UgJ1VMUEZFQyc6XG4gICAgICAgICAgZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5wdXNoKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IC8vIG9ubHkgUkVEIGFuZCBVTFBGRUMgYXJlIHJlY29nbml6ZWQgYXMgRkVDIG1lY2hhbmlzbXMuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9ZXh0bWFwOicpLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgIGRlc2NyaXB0aW9uLmhlYWRlckV4dGVuc2lvbnMucHVzaChTRFBVdGlscy5wYXJzZUV4dG1hcChsaW5lKSk7XG4gIH0pO1xuICAvLyBGSVhNRTogcGFyc2UgcnRjcC5cbiAgcmV0dXJuIGRlc2NyaXB0aW9uO1xufTtcblxuLy8gR2VuZXJhdGVzIHBhcnRzIG9mIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBkZXNjcmliaW5nIHRoZSBjYXBhYmlsaXRpZXMgL1xuLy8gcGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24gPSBmdW5jdGlvbihraW5kLCBjYXBzKSB7XG4gIHZhciBzZHAgPSAnJztcblxuICAvLyBCdWlsZCB0aGUgbWxpbmUuXG4gIHNkcCArPSAnbT0nICsga2luZCArICcgJztcbiAgc2RwICs9IGNhcHMuY29kZWNzLmxlbmd0aCA+IDAgPyAnOScgOiAnMCc7IC8vIHJlamVjdCBpZiBubyBjb2RlY3MuXG4gIHNkcCArPSAnIFVEUC9UTFMvUlRQL1NBVlBGICc7XG4gIHNkcCArPSBjYXBzLmNvZGVjcy5tYXAoZnVuY3Rpb24oY29kZWMpIHtcbiAgICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICAgIH1cbiAgICByZXR1cm4gY29kZWMucGF5bG9hZFR5cGU7XG4gIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xuXG4gIHNkcCArPSAnYz1JTiBJUDQgMC4wLjAuMFxcclxcbic7XG4gIHNkcCArPSAnYT1ydGNwOjkgSU4gSVA0IDAuMC4wLjBcXHJcXG4nO1xuXG4gIC8vIEFkZCBhPXJ0cG1hcCBsaW5lcyBmb3IgZWFjaCBjb2RlYy4gQWxzbyBmbXRwIGFuZCBydGNwLWZiLlxuICBjYXBzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlUnRwTWFwKGNvZGVjKTtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVGbXRwKGNvZGVjKTtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVSdGNwRmIoY29kZWMpO1xuICB9KTtcbiAgdmFyIG1heHB0aW1lID0gMDtcbiAgY2Fwcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgIGlmIChjb2RlYy5tYXhwdGltZSA+IG1heHB0aW1lKSB7XG4gICAgICBtYXhwdGltZSA9IGNvZGVjLm1heHB0aW1lO1xuICAgIH1cbiAgfSk7XG4gIGlmIChtYXhwdGltZSA+IDApIHtcbiAgICBzZHAgKz0gJ2E9bWF4cHRpbWU6JyArIG1heHB0aW1lICsgJ1xcclxcbic7XG4gIH1cbiAgc2RwICs9ICdhPXJ0Y3AtbXV4XFxyXFxuJztcblxuICBpZiAoY2Fwcy5oZWFkZXJFeHRlbnNpb25zKSB7XG4gICAgY2Fwcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XG4gICAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVFeHRtYXAoZXh0ZW5zaW9uKTtcbiAgICB9KTtcbiAgfVxuICAvLyBGSVhNRTogd3JpdGUgZmVjTWVjaGFuaXNtcy5cbiAgcmV0dXJuIHNkcDtcbn07XG5cbi8vIFBhcnNlcyB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gYW5kIHJldHVybnMgYW4gYXJyYXkgb2Zcbi8vIFJUQ1J0cEVuY29kaW5nUGFyYW1ldGVycy5cblNEUFV0aWxzLnBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBlbmNvZGluZ1BhcmFtZXRlcnMgPSBbXTtcbiAgdmFyIGRlc2NyaXB0aW9uID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBoYXNSZWQgPSBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLmluZGV4T2YoJ1JFRCcpICE9PSAtMTtcbiAgdmFyIGhhc1VscGZlYyA9IGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMuaW5kZXhPZignVUxQRkVDJykgIT09IC0xO1xuXG4gIC8vIGZpbHRlciBhPXNzcmM6Li4uIGNuYW1lOiwgaWdub3JlIFBsYW5CLW1zaWRcbiAgdmFyIHNzcmNzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXG4gICAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XG4gICAgfSlcbiAgICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgICByZXR1cm4gcGFydHMuYXR0cmlidXRlID09PSAnY25hbWUnO1xuICAgIH0pO1xuICB2YXIgcHJpbWFyeVNzcmMgPSBzc3Jjcy5sZW5ndGggPiAwICYmIHNzcmNzWzBdLnNzcmM7XG4gIHZhciBzZWNvbmRhcnlTc3JjO1xuXG4gIHZhciBmbG93cyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYy1ncm91cDpGSUQnKVxuICAgIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMTcpLnNwbGl0KCcgJyk7XG4gICAgICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uKHBhcnQpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHBhcnQsIDEwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICBpZiAoZmxvd3MubGVuZ3RoID4gMCAmJiBmbG93c1swXS5sZW5ndGggPiAxICYmIGZsb3dzWzBdWzBdID09PSBwcmltYXJ5U3NyYykge1xuICAgIHNlY29uZGFyeVNzcmMgPSBmbG93c1swXVsxXTtcbiAgfVxuXG4gIGRlc2NyaXB0aW9uLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgaWYgKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1JUWCcgJiYgY29kZWMucGFyYW1ldGVycy5hcHQpIHtcbiAgICAgIHZhciBlbmNQYXJhbSA9IHtcbiAgICAgICAgc3NyYzogcHJpbWFyeVNzcmMsXG4gICAgICAgIGNvZGVjUGF5bG9hZFR5cGU6IHBhcnNlSW50KGNvZGVjLnBhcmFtZXRlcnMuYXB0LCAxMClcbiAgICAgIH07XG4gICAgICBpZiAocHJpbWFyeVNzcmMgJiYgc2Vjb25kYXJ5U3NyYykge1xuICAgICAgICBlbmNQYXJhbS5ydHggPSB7c3NyYzogc2Vjb25kYXJ5U3NyY307XG4gICAgICB9XG4gICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XG4gICAgICBpZiAoaGFzUmVkKSB7XG4gICAgICAgIGVuY1BhcmFtID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShlbmNQYXJhbSkpO1xuICAgICAgICBlbmNQYXJhbS5mZWMgPSB7XG4gICAgICAgICAgc3NyYzogcHJpbWFyeVNzcmMsXG4gICAgICAgICAgbWVjaGFuaXNtOiBoYXNVbHBmZWMgPyAncmVkK3VscGZlYycgOiAncmVkJ1xuICAgICAgICB9O1xuICAgICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgaWYgKGVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGggPT09IDAgJiYgcHJpbWFyeVNzcmMpIHtcbiAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaCh7XG4gICAgICBzc3JjOiBwcmltYXJ5U3NyY1xuICAgIH0pO1xuICB9XG5cbiAgLy8gd2Ugc3VwcG9ydCBib3RoIGI9QVMgYW5kIGI9VElBUyBidXQgaW50ZXJwcmV0IEFTIGFzIFRJQVMuXG4gIHZhciBiYW5kd2lkdGggPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdiPScpO1xuICBpZiAoYmFuZHdpZHRoLmxlbmd0aCkge1xuICAgIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1USUFTOicpID09PSAwKSB7XG4gICAgICBiYW5kd2lkdGggPSBwYXJzZUludChiYW5kd2lkdGhbMF0uc3Vic3RyKDcpLCAxMCk7XG4gICAgfSBlbHNlIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1BUzonKSA9PT0gMCkge1xuICAgICAgLy8gdXNlIGZvcm11bGEgZnJvbSBKU0VQIHRvIGNvbnZlcnQgYj1BUyB0byBUSUFTIHZhbHVlLlxuICAgICAgYmFuZHdpZHRoID0gcGFyc2VJbnQoYmFuZHdpZHRoWzBdLnN1YnN0cig1KSwgMTApICogMTAwMCAqIDAuOTVcbiAgICAgICAgICAtICg1MCAqIDQwICogOCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhbmR3aWR0aCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICBwYXJhbXMubWF4Qml0cmF0ZSA9IGJhbmR3aWR0aDtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZW5jb2RpbmdQYXJhbWV0ZXJzO1xufTtcblxuLy8gcGFyc2VzIGh0dHA6Ly9kcmFmdC5vcnRjLm9yZy8jcnRjcnRjcHBhcmFtZXRlcnMqXG5TRFBVdGlscy5wYXJzZVJ0Y3BQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBydGNwUGFyYW1ldGVycyA9IHt9O1xuXG4gIC8vIEdldHMgdGhlIGZpcnN0IFNTUkMuIE5vdGUgdGhhIHdpdGggUlRYIHRoZXJlIG1pZ2h0IGJlIG11bHRpcGxlXG4gIC8vIFNTUkNzLlxuICB2YXIgcmVtb3RlU3NyYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxuICAgIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xuICAgIH0pXG4gICAgLmZpbHRlcihmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmouYXR0cmlidXRlID09PSAnY25hbWUnO1xuICAgIH0pWzBdO1xuICBpZiAocmVtb3RlU3NyYykge1xuICAgIHJ0Y3BQYXJhbWV0ZXJzLmNuYW1lID0gcmVtb3RlU3NyYy52YWx1ZTtcbiAgICBydGNwUGFyYW1ldGVycy5zc3JjID0gcmVtb3RlU3NyYy5zc3JjO1xuICB9XG5cbiAgLy8gRWRnZSB1c2VzIHRoZSBjb21wb3VuZCBhdHRyaWJ1dGUgaW5zdGVhZCBvZiByZWR1Y2VkU2l6ZVxuICAvLyBjb21wb3VuZCBpcyAhcmVkdWNlZFNpemVcbiAgdmFyIHJzaXplID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1ydGNwLXJzaXplJyk7XG4gIHJ0Y3BQYXJhbWV0ZXJzLnJlZHVjZWRTaXplID0gcnNpemUubGVuZ3RoID4gMDtcbiAgcnRjcFBhcmFtZXRlcnMuY29tcG91bmQgPSByc2l6ZS5sZW5ndGggPT09IDA7XG5cbiAgLy8gcGFyc2VzIHRoZSBydGNwLW11eCBhdHRyXHUwNDU2YnV0ZS5cbiAgLy8gTm90ZSB0aGF0IEVkZ2UgZG9lcyBub3Qgc3VwcG9ydCB1bm11eGVkIFJUQ1AuXG4gIHZhciBtdXggPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtbXV4Jyk7XG4gIHJ0Y3BQYXJhbWV0ZXJzLm11eCA9IG11eC5sZW5ndGggPiAwO1xuXG4gIHJldHVybiBydGNwUGFyYW1ldGVycztcbn07XG5cbi8vIHBhcnNlcyBlaXRoZXIgYT1tc2lkOiBvciBhPXNzcmM6Li4uIG1zaWQgbGluZXMgYW5kIHJldHVybnNcbi8vIHRoZSBpZCBvZiB0aGUgTWVkaWFTdHJlYW0gYW5kIE1lZGlhU3RyZWFtVHJhY2suXG5TRFBVdGlscy5wYXJzZU1zaWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIHBhcnRzO1xuICB2YXIgc3BlYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9bXNpZDonKTtcbiAgaWYgKHNwZWMubGVuZ3RoID09PSAxKSB7XG4gICAgcGFydHMgPSBzcGVjWzBdLnN1YnN0cig3KS5zcGxpdCgnICcpO1xuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcbiAgfVxuICB2YXIgcGxhbkIgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcbiAgICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcbiAgICB9KVxuICAgIC5maWx0ZXIoZnVuY3Rpb24obXNpZFBhcnRzKSB7XG4gICAgICByZXR1cm4gbXNpZFBhcnRzLmF0dHJpYnV0ZSA9PT0gJ21zaWQnO1xuICAgIH0pO1xuICBpZiAocGxhbkIubGVuZ3RoID4gMCkge1xuICAgIHBhcnRzID0gcGxhbkJbMF0udmFsdWUuc3BsaXQoJyAnKTtcbiAgICByZXR1cm4ge3N0cmVhbTogcGFydHNbMF0sIHRyYWNrOiBwYXJ0c1sxXX07XG4gIH1cbn07XG5cbi8vIFNDVFBcbi8vIHBhcnNlcyBkcmFmdC1pZXRmLW1tdXNpYy1zY3RwLXNkcC0yNiBmaXJzdCBhbmQgZmFsbHMgYmFja1xuLy8gdG8gZHJhZnQtaWV0Zi1tbXVzaWMtc2N0cC1zZHAtMDVcblNEUFV0aWxzLnBhcnNlU2N0cERlc2NyaXB0aW9uID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBtbGluZSA9IFNEUFV0aWxzLnBhcnNlTUxpbmUobWVkaWFTZWN0aW9uKTtcbiAgdmFyIG1heFNpemVMaW5lID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1tYXgtbWVzc2FnZS1zaXplOicpO1xuICB2YXIgbWF4TWVzc2FnZVNpemU7XG4gIGlmIChtYXhTaXplTGluZS5sZW5ndGggPiAwKSB7XG4gICAgbWF4TWVzc2FnZVNpemUgPSBwYXJzZUludChtYXhTaXplTGluZVswXS5zdWJzdHIoMTkpLCAxMCk7XG4gIH1cbiAgaWYgKGlzTmFOKG1heE1lc3NhZ2VTaXplKSkge1xuICAgIG1heE1lc3NhZ2VTaXplID0gNjU1MzY7XG4gIH1cbiAgdmFyIHNjdHBQb3J0ID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zY3RwLXBvcnQ6Jyk7XG4gIGlmIChzY3RwUG9ydC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnQ6IHBhcnNlSW50KHNjdHBQb3J0WzBdLnN1YnN0cigxMiksIDEwKSxcbiAgICAgIHByb3RvY29sOiBtbGluZS5mbXQsXG4gICAgICBtYXhNZXNzYWdlU2l6ZTogbWF4TWVzc2FnZVNpemVcbiAgICB9O1xuICB9XG4gIHZhciBzY3RwTWFwTGluZXMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNjdHBtYXA6Jyk7XG4gIGlmIChzY3RwTWFwTGluZXMubGVuZ3RoID4gMCkge1xuICAgIHZhciBwYXJ0cyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c2N0cG1hcDonKVswXVxuICAgICAgLnN1YnN0cigxMClcbiAgICAgIC5zcGxpdCgnICcpO1xuICAgIHJldHVybiB7XG4gICAgICBwb3J0OiBwYXJzZUludChwYXJ0c1swXSwgMTApLFxuICAgICAgcHJvdG9jb2w6IHBhcnRzWzFdLFxuICAgICAgbWF4TWVzc2FnZVNpemU6IG1heE1lc3NhZ2VTaXplXG4gICAgfTtcbiAgfVxufTtcblxuLy8gU0NUUFxuLy8gb3V0cHV0cyB0aGUgZHJhZnQtaWV0Zi1tbXVzaWMtc2N0cC1zZHAtMjYgdmVyc2lvbiB0aGF0IGFsbCBicm93c2Vyc1xuLy8gc3VwcG9ydCBieSBub3cgcmVjZWl2aW5nIGluIHRoaXMgZm9ybWF0LCB1bmxlc3Mgd2Ugb3JpZ2luYWxseSBwYXJzZWRcbi8vIGFzIHRoZSBkcmFmdC1pZXRmLW1tdXNpYy1zY3RwLXNkcC0wNSBmb3JtYXQgKGluZGljYXRlZCBieSB0aGUgbS1saW5lXG4vLyBwcm90b2NvbCBvZiBEVExTL1NDVFAgLS0gd2l0aG91dCBVRFAvIG9yIFRDUC8pXG5TRFBVdGlscy53cml0ZVNjdHBEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKG1lZGlhLCBzY3RwKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgaWYgKG1lZGlhLnByb3RvY29sICE9PSAnRFRMUy9TQ1RQJykge1xuICAgIG91dHB1dCA9IFtcbiAgICAgICdtPScgKyBtZWRpYS5raW5kICsgJyA5ICcgKyBtZWRpYS5wcm90b2NvbCArICcgJyArIHNjdHAucHJvdG9jb2wgKyAnXFxyXFxuJyxcbiAgICAgICdjPUlOIElQNCAwLjAuMC4wXFxyXFxuJyxcbiAgICAgICdhPXNjdHAtcG9ydDonICsgc2N0cC5wb3J0ICsgJ1xcclxcbidcbiAgICBdO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IFtcbiAgICAgICdtPScgKyBtZWRpYS5raW5kICsgJyA5ICcgKyBtZWRpYS5wcm90b2NvbCArICcgJyArIHNjdHAucG9ydCArICdcXHJcXG4nLFxuICAgICAgJ2M9SU4gSVA0IDAuMC4wLjBcXHJcXG4nLFxuICAgICAgJ2E9c2N0cG1hcDonICsgc2N0cC5wb3J0ICsgJyAnICsgc2N0cC5wcm90b2NvbCArICcgNjU1MzVcXHJcXG4nXG4gICAgXTtcbiAgfVxuICBpZiAoc2N0cC5tYXhNZXNzYWdlU2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgb3V0cHV0LnB1c2goJ2E9bWF4LW1lc3NhZ2Utc2l6ZTonICsgc2N0cC5tYXhNZXNzYWdlU2l6ZSArICdcXHJcXG4nKTtcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xufTtcblxuLy8gR2VuZXJhdGUgYSBzZXNzaW9uIElEIGZvciBTRFAuXG4vLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvZHJhZnQtaWV0Zi1ydGN3ZWItanNlcC0yMCNzZWN0aW9uLTUuMi4xXG4vLyByZWNvbW1lbmRzIHVzaW5nIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tICt2ZSA2NC1iaXQgdmFsdWVcbi8vIGJ1dCByaWdodCBub3cgdGhpcyBzaG91bGQgYmUgYWNjZXB0YWJsZSBhbmQgd2l0aGluIHRoZSByaWdodCByYW5nZVxuU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHIoMiwgMjEpO1xufTtcblxuLy8gV3JpdGUgYm9pbGRlciBwbGF0ZSBmb3Igc3RhcnQgb2YgU0RQXG4vLyBzZXNzSWQgYXJndW1lbnQgaXMgb3B0aW9uYWwgLSBpZiBub3Qgc3VwcGxpZWQgaXQgd2lsbFxuLy8gYmUgZ2VuZXJhdGVkIHJhbmRvbWx5XG4vLyBzZXNzVmVyc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gMlxuLy8gc2Vzc1VzZXIgaXMgb3B0aW9uYWwgYW5kIGRlZmF1bHRzIHRvICd0aGlzaXNhZGFwdGVyb3J0YydcblNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlID0gZnVuY3Rpb24oc2Vzc0lkLCBzZXNzVmVyLCBzZXNzVXNlcikge1xuICB2YXIgc2Vzc2lvbklkO1xuICB2YXIgdmVyc2lvbiA9IHNlc3NWZXIgIT09IHVuZGVmaW5lZCA/IHNlc3NWZXIgOiAyO1xuICBpZiAoc2Vzc0lkKSB7XG4gICAgc2Vzc2lvbklkID0gc2Vzc0lkO1xuICB9IGVsc2Uge1xuICAgIHNlc3Npb25JZCA9IFNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkKCk7XG4gIH1cbiAgdmFyIHVzZXIgPSBzZXNzVXNlciB8fCAndGhpc2lzYWRhcHRlcm9ydGMnO1xuICAvLyBGSVhNRTogc2Vzcy1pZCBzaG91bGQgYmUgYW4gTlRQIHRpbWVzdGFtcC5cbiAgcmV0dXJuICd2PTBcXHJcXG4nICtcbiAgICAgICdvPScgKyB1c2VyICsgJyAnICsgc2Vzc2lvbklkICsgJyAnICsgdmVyc2lvbiArXG4gICAgICAgICcgSU4gSVA0IDEyNy4wLjAuMVxcclxcbicgK1xuICAgICAgJ3M9LVxcclxcbicgK1xuICAgICAgJ3Q9MCAwXFxyXFxuJztcbn07XG5cblNEUFV0aWxzLndyaXRlTWVkaWFTZWN0aW9uID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsIGNhcHMsIHR5cGUsIHN0cmVhbSkge1xuICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbih0cmFuc2NlaXZlci5raW5kLCBjYXBzKTtcblxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyhcbiAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XG5cbiAgLy8gTWFwIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxuICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuZ2V0TG9jYWxQYXJhbWV0ZXJzKCksXG4gICAgdHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RwYXNzJyA6ICdhY3RpdmUnKTtcblxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcblxuICBpZiAodHJhbnNjZWl2ZXIuZGlyZWN0aW9uKSB7XG4gICAgc2RwICs9ICdhPScgKyB0cmFuc2NlaXZlci5kaXJlY3Rpb24gKyAnXFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZHJlY3ZcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIHNkcCArPSAnYT1zZW5kb25seVxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xuICB9IGVsc2Uge1xuICAgIHNkcCArPSAnYT1pbmFjdGl2ZVxcclxcbic7XG4gIH1cblxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgLy8gc3BlYy5cbiAgICB2YXIgbXNpZCA9ICdtc2lkOicgKyBzdHJlYW0uaWQgKyAnICcgK1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIudHJhY2suaWQgKyAnXFxyXFxuJztcbiAgICBzZHAgKz0gJ2E9JyArIG1zaWQ7XG5cbiAgICAvLyBmb3IgQ2hyb21lLlxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgICAnICcgKyBtc2lkO1xuICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICcgJyArIG1zaWQ7XG4gICAgICBzZHAgKz0gJ2E9c3NyYy1ncm91cDpGSUQgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgJyAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnXFxyXFxuJztcbiAgICB9XG4gIH1cbiAgLy8gRklYTUU6IHRoaXMgc2hvdWxkIGJlIHdyaXR0ZW4gYnkgd3JpdGVSdHBEZXNjcmlwdGlvbi5cbiAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgfVxuICByZXR1cm4gc2RwO1xufTtcblxuLy8gR2V0cyB0aGUgZGlyZWN0aW9uIGZyb20gdGhlIG1lZGlhU2VjdGlvbiBvciB0aGUgc2Vzc2lvbnBhcnQuXG5TRFBVdGlscy5nZXREaXJlY3Rpb24gPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XG4gIC8vIExvb2sgZm9yIHNlbmRyZWN2LCBzZW5kb25seSwgcmVjdm9ubHksIGluYWN0aXZlLCBkZWZhdWx0IHRvIHNlbmRyZWN2LlxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBzd2l0Y2ggKGxpbmVzW2ldKSB7XG4gICAgICBjYXNlICdhPXNlbmRyZWN2JzpcbiAgICAgIGNhc2UgJ2E9c2VuZG9ubHknOlxuICAgICAgY2FzZSAnYT1yZWN2b25seSc6XG4gICAgICBjYXNlICdhPWluYWN0aXZlJzpcbiAgICAgICAgcmV0dXJuIGxpbmVzW2ldLnN1YnN0cigyKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEZJWE1FOiBXaGF0IHNob3VsZCBoYXBwZW4gaGVyZT9cbiAgICB9XG4gIH1cbiAgaWYgKHNlc3Npb25wYXJ0KSB7XG4gICAgcmV0dXJuIFNEUFV0aWxzLmdldERpcmVjdGlvbihzZXNzaW9ucGFydCk7XG4gIH1cbiAgcmV0dXJuICdzZW5kcmVjdic7XG59O1xuXG5TRFBVdGlscy5nZXRLaW5kID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIG1saW5lID0gbGluZXNbMF0uc3BsaXQoJyAnKTtcbiAgcmV0dXJuIG1saW5lWzBdLnN1YnN0cigyKTtcbn07XG5cblNEUFV0aWxzLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgcmV0dXJuIG1lZGlhU2VjdGlvbi5zcGxpdCgnICcsIDIpWzFdID09PSAnMCc7XG59O1xuXG5TRFBVdGlscy5wYXJzZU1MaW5lID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIHBhcnRzID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAga2luZDogcGFydHNbMF0sXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcbiAgICBwcm90b2NvbDogcGFydHNbMl0sXG4gICAgZm10OiBwYXJ0cy5zbGljZSgzKS5qb2luKCcgJylcbiAgfTtcbn07XG5cblNEUFV0aWxzLnBhcnNlT0xpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGxpbmUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdvPScpWzBdO1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigyKS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIHVzZXJuYW1lOiBwYXJ0c1swXSxcbiAgICBzZXNzaW9uSWQ6IHBhcnRzWzFdLFxuICAgIHNlc3Npb25WZXJzaW9uOiBwYXJzZUludChwYXJ0c1syXSwgMTApLFxuICAgIG5ldFR5cGU6IHBhcnRzWzNdLFxuICAgIGFkZHJlc3NUeXBlOiBwYXJ0c1s0XSxcbiAgICBhZGRyZXNzOiBwYXJ0c1s1XVxuICB9O1xufTtcblxuLy8gYSB2ZXJ5IG5haXZlIGludGVycHJldGF0aW9uIG9mIGEgdmFsaWQgU0RQLlxuU0RQVXRpbHMuaXNWYWxpZFNEUCA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgaWYgKHR5cGVvZiBibG9iICE9PSAnc3RyaW5nJyB8fCBibG9iLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKGJsb2IpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGxpbmVzW2ldLmxlbmd0aCA8IDIgfHwgbGluZXNbaV0uY2hhckF0KDEpICE9PSAnPScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gVE9ETzogY2hlY2sgdGhlIG1vZGlmaWVyIGEgYml0IG1vcmUuXG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBTRFBVdGlscztcbn1cbiIsICIvKlxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XG5cbmZ1bmN0aW9uIGZpeFN0YXRzVHlwZShzdGF0KSB7XG4gIHJldHVybiB7XG4gICAgaW5ib3VuZHJ0cDogJ2luYm91bmQtcnRwJyxcbiAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXG4gICAgY2FuZGlkYXRlcGFpcjogJ2NhbmRpZGF0ZS1wYWlyJyxcbiAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXG4gICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcbiAgfVtzdGF0LnR5cGVdIHx8IHN0YXQudHlwZTtcbn1cblxuZnVuY3Rpb24gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIGNhcHMsIHR5cGUsIHN0cmVhbSwgZHRsc1JvbGUpIHtcbiAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24odHJhbnNjZWl2ZXIua2luZCwgY2Fwcyk7XG5cbiAgLy8gTWFwIElDRSBwYXJhbWV0ZXJzICh1ZnJhZywgcHdkKSB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMoXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XG5cbiAgLy8gTWFwIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5nZXRMb2NhbFBhcmFtZXRlcnMoKSxcbiAgICAgIHR5cGUgPT09ICdvZmZlcicgPyAnYWN0cGFzcycgOiBkdGxzUm9sZSB8fCAnYWN0aXZlJyk7XG5cbiAgc2RwICs9ICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XG5cbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1zZW5kcmVjdlxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1yZWN2b25seVxcclxcbic7XG4gIH0gZWxzZSB7XG4gICAgc2RwICs9ICdhPWluYWN0aXZlXFxyXFxuJztcbiAgfVxuXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICB2YXIgdHJhY2tJZCA9IHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5faW5pdGlhbFRyYWNrSWQgfHxcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkO1xuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5faW5pdGlhbFRyYWNrSWQgPSB0cmFja0lkO1xuICAgIC8vIHNwZWMuXG4gICAgdmFyIG1zaWQgPSAnbXNpZDonICsgKHN0cmVhbSA/IHN0cmVhbS5pZCA6ICctJykgKyAnICcgK1xuICAgICAgICB0cmFja0lkICsgJ1xcclxcbic7XG4gICAgc2RwICs9ICdhPScgKyBtc2lkO1xuICAgIC8vIGZvciBDaHJvbWUuIExlZ2FjeSBzaG91bGQgbm8gbG9uZ2VyIGJlIHJlcXVpcmVkLlxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgICAnICcgKyBtc2lkO1xuXG4gICAgLy8gUlRYXG4gICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJyAnICsgbXNpZDtcbiAgICAgIHNkcCArPSAnYT1zc3JjLWdyb3VwOkZJRCAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAnICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICdcXHJcXG4nO1xuICAgIH1cbiAgfVxuICAvLyBGSVhNRTogdGhpcyBzaG91bGQgYmUgd3JpdHRlbiBieSB3cml0ZVJ0cERlc2NyaXB0aW9uLlxuICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICB9XG4gIHJldHVybiBzZHA7XG59XG5cbi8vIEVkZ2UgZG9lcyBub3QgbGlrZVxuLy8gMSkgc3R1bjogZmlsdGVyZWQgYWZ0ZXIgMTQzOTMgdW5sZXNzID90cmFuc3BvcnQ9dWRwIGlzIHByZXNlbnRcbi8vIDIpIHR1cm46IHRoYXQgZG9lcyBub3QgaGF2ZSBhbGwgb2YgdHVybjpob3N0OnBvcnQ/dHJhbnNwb3J0PXVkcFxuLy8gMykgdHVybjogd2l0aCBpcHY2IGFkZHJlc3Nlc1xuLy8gNCkgdHVybjogb2NjdXJyaW5nIG11bGlwbGUgdGltZXNcbmZ1bmN0aW9uIGZpbHRlckljZVNlcnZlcnMoaWNlU2VydmVycywgZWRnZVZlcnNpb24pIHtcbiAgdmFyIGhhc1R1cm4gPSBmYWxzZTtcbiAgaWNlU2VydmVycyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaWNlU2VydmVycykpO1xuICByZXR1cm4gaWNlU2VydmVycy5maWx0ZXIoZnVuY3Rpb24oc2VydmVyKSB7XG4gICAgaWYgKHNlcnZlciAmJiAoc2VydmVyLnVybHMgfHwgc2VydmVyLnVybCkpIHtcbiAgICAgIHZhciB1cmxzID0gc2VydmVyLnVybHMgfHwgc2VydmVyLnVybDtcbiAgICAgIGlmIChzZXJ2ZXIudXJsICYmICFzZXJ2ZXIudXJscykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1JUQ0ljZVNlcnZlci51cmwgaXMgZGVwcmVjYXRlZCEgVXNlIHVybHMgaW5zdGVhZC4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiB1cmxzID09PSAnc3RyaW5nJztcbiAgICAgIGlmIChpc1N0cmluZykge1xuICAgICAgICB1cmxzID0gW3VybHNdO1xuICAgICAgfVxuICAgICAgdXJscyA9IHVybHMuZmlsdGVyKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgdmFsaWRUdXJuID0gdXJsLmluZGV4T2YoJ3R1cm46JykgPT09IDAgJiZcbiAgICAgICAgICAgIHVybC5pbmRleE9mKCd0cmFuc3BvcnQ9dWRwJykgIT09IC0xICYmXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHVybjpbJykgPT09IC0xICYmXG4gICAgICAgICAgICAhaGFzVHVybjtcblxuICAgICAgICBpZiAodmFsaWRUdXJuKSB7XG4gICAgICAgICAgaGFzVHVybiA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybC5pbmRleE9mKCdzdHVuOicpID09PSAwICYmIGVkZ2VWZXJzaW9uID49IDE0MzkzICYmXG4gICAgICAgICAgICB1cmwuaW5kZXhPZignP3RyYW5zcG9ydD11ZHAnKSA9PT0gLTE7XG4gICAgICB9KTtcblxuICAgICAgZGVsZXRlIHNlcnZlci51cmw7XG4gICAgICBzZXJ2ZXIudXJscyA9IGlzU3RyaW5nID8gdXJsc1swXSA6IHVybHM7XG4gICAgICByZXR1cm4gISF1cmxzLmxlbmd0aDtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBEZXRlcm1pbmVzIHRoZSBpbnRlcnNlY3Rpb24gb2YgbG9jYWwgYW5kIHJlbW90ZSBjYXBhYmlsaXRpZXMuXG5mdW5jdGlvbiBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsIHJlbW90ZUNhcGFiaWxpdGllcykge1xuICB2YXIgY29tbW9uQ2FwYWJpbGl0aWVzID0ge1xuICAgIGNvZGVjczogW10sXG4gICAgaGVhZGVyRXh0ZW5zaW9uczogW10sXG4gICAgZmVjTWVjaGFuaXNtczogW11cbiAgfTtcblxuICB2YXIgZmluZENvZGVjQnlQYXlsb2FkVHlwZSA9IGZ1bmN0aW9uKHB0LCBjb2RlY3MpIHtcbiAgICBwdCA9IHBhcnNlSW50KHB0LCAxMCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjb2RlY3NbaV0ucGF5bG9hZFR5cGUgPT09IHB0IHx8XG4gICAgICAgICAgY29kZWNzW2ldLnByZWZlcnJlZFBheWxvYWRUeXBlID09PSBwdCkge1xuICAgICAgICByZXR1cm4gY29kZWNzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgcnR4Q2FwYWJpbGl0eU1hdGNoZXMgPSBmdW5jdGlvbihsUnR4LCByUnR4LCBsQ29kZWNzLCByQ29kZWNzKSB7XG4gICAgdmFyIGxDb2RlYyA9IGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUobFJ0eC5wYXJhbWV0ZXJzLmFwdCwgbENvZGVjcyk7XG4gICAgdmFyIHJDb2RlYyA9IGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUoclJ0eC5wYXJhbWV0ZXJzLmFwdCwgckNvZGVjcyk7XG4gICAgcmV0dXJuIGxDb2RlYyAmJiByQ29kZWMgJiZcbiAgICAgICAgbENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gckNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgfTtcblxuICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihsQ29kZWMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByQ29kZWMgPSByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzW2ldO1xuICAgICAgaWYgKGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgJiZcbiAgICAgICAgICBsQ29kZWMuY2xvY2tSYXRlID09PSByQ29kZWMuY2xvY2tSYXRlKSB7XG4gICAgICAgIGlmIChsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JyAmJlxuICAgICAgICAgICAgbENvZGVjLnBhcmFtZXRlcnMgJiYgckNvZGVjLnBhcmFtZXRlcnMuYXB0KSB7XG4gICAgICAgICAgLy8gZm9yIFJUWCB3ZSBuZWVkIHRvIGZpbmQgdGhlIGxvY2FsIHJ0eCB0aGF0IGhhcyBhIGFwdFxuICAgICAgICAgIC8vIHdoaWNoIHBvaW50cyB0byB0aGUgc2FtZSBsb2NhbCBjb2RlYyBhcyB0aGUgcmVtb3RlIG9uZS5cbiAgICAgICAgICBpZiAoIXJ0eENhcGFiaWxpdHlNYXRjaGVzKGxDb2RlYywgckNvZGVjLFxuICAgICAgICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MsIHJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgckNvZGVjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyQ29kZWMpKTsgLy8gZGVlcGNvcHlcbiAgICAgICAgLy8gbnVtYmVyIG9mIGNoYW5uZWxzIGlzIHRoZSBoaWdoZXN0IGNvbW1vbiBudW1iZXIgb2YgY2hhbm5lbHNcbiAgICAgICAgckNvZGVjLm51bUNoYW5uZWxzID0gTWF0aC5taW4obENvZGVjLm51bUNoYW5uZWxzLFxuICAgICAgICAgICAgckNvZGVjLm51bUNoYW5uZWxzKTtcbiAgICAgICAgLy8gcHVzaCByQ29kZWMgc28gd2UgcmVwbHkgd2l0aCBvZmZlcmVyIHBheWxvYWQgdHlwZVxuICAgICAgICBjb21tb25DYXBhYmlsaXRpZXMuY29kZWNzLnB1c2gockNvZGVjKTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgY29tbW9uIGZlZWRiYWNrIG1lY2hhbmlzbXNcbiAgICAgICAgckNvZGVjLnJ0Y3BGZWVkYmFjayA9IHJDb2RlYy5ydGNwRmVlZGJhY2suZmlsdGVyKGZ1bmN0aW9uKGZiKSB7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsQ29kZWMucnRjcEZlZWRiYWNrLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAobENvZGVjLnJ0Y3BGZWVkYmFja1tqXS50eXBlID09PSBmYi50eXBlICYmXG4gICAgICAgICAgICAgICAgbENvZGVjLnJ0Y3BGZWVkYmFja1tqXS5wYXJhbWV0ZXIgPT09IGZiLnBhcmFtZXRlcikge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gRklYTUU6IGFsc28gbmVlZCB0byBkZXRlcm1pbmUgLnBhcmFtZXRlcnNcbiAgICAgICAgLy8gIHNlZSBodHRwczovL2dpdGh1Yi5jb20vb3BlbnBlZXIvb3J0Yy9pc3N1ZXMvNTY5XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgbG9jYWxDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGxIZWFkZXJFeHRlbnNpb24pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlbW90ZUNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLmxlbmd0aDtcbiAgICAgICAgIGkrKykge1xuICAgICAgdmFyIHJIZWFkZXJFeHRlbnNpb24gPSByZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9uc1tpXTtcbiAgICAgIGlmIChsSGVhZGVyRXh0ZW5zaW9uLnVyaSA9PT0gckhlYWRlckV4dGVuc2lvbi51cmkpIHtcbiAgICAgICAgY29tbW9uQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMucHVzaChySGVhZGVyRXh0ZW5zaW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBGSVhNRTogZmVjTWVjaGFuaXNtc1xuICByZXR1cm4gY29tbW9uQ2FwYWJpbGl0aWVzO1xufVxuXG4vLyBpcyBhY3Rpb249c2V0TG9jYWxEZXNjcmlwdGlvbiB3aXRoIHR5cGUgYWxsb3dlZCBpbiBzaWduYWxpbmdTdGF0ZVxuZnVuY3Rpb24gaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZShhY3Rpb24sIHR5cGUsIHNpZ25hbGluZ1N0YXRlKSB7XG4gIHJldHVybiB7XG4gICAgb2ZmZXI6IHtcbiAgICAgIHNldExvY2FsRGVzY3JpcHRpb246IFsnc3RhYmxlJywgJ2hhdmUtbG9jYWwtb2ZmZXInXSxcbiAgICAgIHNldFJlbW90ZURlc2NyaXB0aW9uOiBbJ3N0YWJsZScsICdoYXZlLXJlbW90ZS1vZmZlciddXG4gICAgfSxcbiAgICBhbnN3ZXI6IHtcbiAgICAgIHNldExvY2FsRGVzY3JpcHRpb246IFsnaGF2ZS1yZW1vdGUtb2ZmZXInLCAnaGF2ZS1sb2NhbC1wcmFuc3dlciddLFxuICAgICAgc2V0UmVtb3RlRGVzY3JpcHRpb246IFsnaGF2ZS1sb2NhbC1vZmZlcicsICdoYXZlLXJlbW90ZS1wcmFuc3dlciddXG4gICAgfVxuICB9W3R5cGVdW2FjdGlvbl0uaW5kZXhPZihzaWduYWxpbmdTdGF0ZSkgIT09IC0xO1xufVxuXG5mdW5jdGlvbiBtYXliZUFkZENhbmRpZGF0ZShpY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSkge1xuICAvLyBFZGdlJ3MgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYWRkcyBzb21lIGZpZWxkcyB0aGVyZWZvcmVcbiAgLy8gbm90IGFsbCBmaWVsZFx1MDQ1NSBhcmUgdGFrZW4gaW50byBhY2NvdW50LlxuICB2YXIgYWxyZWFkeUFkZGVkID0gaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKVxuICAgICAgLmZpbmQoZnVuY3Rpb24ocmVtb3RlQ2FuZGlkYXRlKSB7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUuZm91bmRhdGlvbiA9PT0gcmVtb3RlQ2FuZGlkYXRlLmZvdW5kYXRpb24gJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5pcCA9PT0gcmVtb3RlQ2FuZGlkYXRlLmlwICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucG9ydCA9PT0gcmVtb3RlQ2FuZGlkYXRlLnBvcnQgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wcmlvcml0eSA9PT0gcmVtb3RlQ2FuZGlkYXRlLnByaW9yaXR5ICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJvdG9jb2wgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcm90b2NvbCAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLnR5cGUgPT09IHJlbW90ZUNhbmRpZGF0ZS50eXBlO1xuICAgICAgfSk7XG4gIGlmICghYWxyZWFkeUFkZGVkKSB7XG4gICAgaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZShjYW5kaWRhdGUpO1xuICB9XG4gIHJldHVybiAhYWxyZWFkeUFkZGVkO1xufVxuXG5cbmZ1bmN0aW9uIG1ha2VFcnJvcihuYW1lLCBkZXNjcmlwdGlvbikge1xuICB2YXIgZSA9IG5ldyBFcnJvcihkZXNjcmlwdGlvbik7XG4gIGUubmFtZSA9IG5hbWU7XG4gIC8vIGxlZ2FjeSBlcnJvciBjb2RlcyBmcm9tIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC1ET01FeGNlcHRpb24tZXJyb3ItbmFtZXNcbiAgZS5jb2RlID0ge1xuICAgIE5vdFN1cHBvcnRlZEVycm9yOiA5LFxuICAgIEludmFsaWRTdGF0ZUVycm9yOiAxMSxcbiAgICBJbnZhbGlkQWNjZXNzRXJyb3I6IDE1LFxuICAgIFR5cGVFcnJvcjogdW5kZWZpbmVkLFxuICAgIE9wZXJhdGlvbkVycm9yOiB1bmRlZmluZWRcbiAgfVtuYW1lXTtcbiAgcmV0dXJuIGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93LCBlZGdlVmVyc2lvbikge1xuICAvLyBodHRwczovL3czYy5naXRodWIuaW8vbWVkaWFjYXB0dXJlLW1haW4vI21lZGlhc3RyZWFtXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBhZGQgdGhlIHRyYWNrIHRvIHRoZSBzdHJlYW0gYW5kXG4gIC8vIGRpc3BhdGNoIHRoZSBldmVudCBvdXJzZWx2ZXMuXG4gIGZ1bmN0aW9uIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbSkge1xuICAgIHN0cmVhbS5hZGRUcmFjayh0cmFjayk7XG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrRXZlbnQoJ2FkZHRyYWNrJyxcbiAgICAgICAge3RyYWNrOiB0cmFja30pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKSB7XG4gICAgc3RyZWFtLnJlbW92ZVRyYWNrKHRyYWNrKTtcbiAgICBzdHJlYW0uZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2tFdmVudCgncmVtb3ZldHJhY2snLFxuICAgICAgICB7dHJhY2s6IHRyYWNrfSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyZUFkZFRyYWNrKHBjLCB0cmFjaywgcmVjZWl2ZXIsIHN0cmVhbXMpIHtcbiAgICB2YXIgdHJhY2tFdmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICB0cmFja0V2ZW50LnRyYWNrID0gdHJhY2s7XG4gICAgdHJhY2tFdmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgIHRyYWNrRXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcbiAgICB0cmFja0V2ZW50LnN0cmVhbXMgPSBzdHJlYW1zO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ3RyYWNrJywgdHJhY2tFdmVudCk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgdmFyIF9ldmVudFRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBbJ2FkZEV2ZW50TGlzdGVuZXInLCAncmVtb3ZlRXZlbnRMaXN0ZW5lcicsICdkaXNwYXRjaEV2ZW50J11cbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgcGNbbWV0aG9kXSA9IF9ldmVudFRhcmdldFttZXRob2RdLmJpbmQoX2V2ZW50VGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gbnVsbDtcblxuICAgIHRoaXMubmVlZE5lZ290aWF0aW9uID0gZmFsc2U7XG5cbiAgICB0aGlzLmxvY2FsU3RyZWFtcyA9IFtdO1xuICAgIHRoaXMucmVtb3RlU3RyZWFtcyA9IFtdO1xuXG4gICAgdGhpcy5fbG9jYWxEZXNjcmlwdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fcmVtb3RlRGVzY3JpcHRpb24gPSBudWxsO1xuXG4gICAgdGhpcy5zaWduYWxpbmdTdGF0ZSA9ICdzdGFibGUnO1xuICAgIHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlID0gJ25ldyc7XG4gICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSAnbmV3JztcbiAgICB0aGlzLmljZUdhdGhlcmluZ1N0YXRlID0gJ25ldyc7XG5cbiAgICBjb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbmZpZyB8fCB7fSkpO1xuXG4gICAgdGhpcy51c2luZ0J1bmRsZSA9IGNvbmZpZy5idW5kbGVQb2xpY3kgPT09ICdtYXgtYnVuZGxlJztcbiAgICBpZiAoY29uZmlnLnJ0Y3BNdXhQb2xpY3kgPT09ICduZWdvdGlhdGUnKSB7XG4gICAgICB0aHJvdyhtYWtlRXJyb3IoJ05vdFN1cHBvcnRlZEVycm9yJyxcbiAgICAgICAgICAncnRjcE11eFBvbGljeSBcXCduZWdvdGlhdGVcXCcgaXMgbm90IHN1cHBvcnRlZCcpKTtcbiAgICB9IGVsc2UgaWYgKCFjb25maWcucnRjcE11eFBvbGljeSkge1xuICAgICAgY29uZmlnLnJ0Y3BNdXhQb2xpY3kgPSAncmVxdWlyZSc7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XG4gICAgICBjYXNlICdhbGwnOlxuICAgICAgY2FzZSAncmVsYXknOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kgPSAnYWxsJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb25maWcuYnVuZGxlUG9saWN5KSB7XG4gICAgICBjYXNlICdiYWxhbmNlZCc6XG4gICAgICBjYXNlICdtYXgtY29tcGF0JzpcbiAgICAgIGNhc2UgJ21heC1idW5kbGUnOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbmZpZy5idW5kbGVQb2xpY3kgPSAnYmFsYW5jZWQnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25maWcuaWNlU2VydmVycyA9IGZpbHRlckljZVNlcnZlcnMoY29uZmlnLmljZVNlcnZlcnMgfHwgW10sIGVkZ2VWZXJzaW9uKTtcblxuICAgIHRoaXMuX2ljZUdhdGhlcmVycyA9IFtdO1xuICAgIGlmIChjb25maWcuaWNlQ2FuZGlkYXRlUG9vbFNpemUpIHtcbiAgICAgIGZvciAodmFyIGkgPSBjb25maWcuaWNlQ2FuZGlkYXRlUG9vbFNpemU7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5faWNlR2F0aGVyZXJzLnB1c2gobmV3IHdpbmRvdy5SVENJY2VHYXRoZXJlcih7XG4gICAgICAgICAgaWNlU2VydmVyczogY29uZmlnLmljZVNlcnZlcnMsXG4gICAgICAgICAgZ2F0aGVyUG9saWN5OiBjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG5cbiAgICAvLyBwZXItdHJhY2sgaWNlR2F0aGVycywgaWNlVHJhbnNwb3J0cywgZHRsc1RyYW5zcG9ydHMsIHJ0cFNlbmRlcnMsIC4uLlxuICAgIC8vIGV2ZXJ5dGhpbmcgdGhhdCBpcyBuZWVkZWQgdG8gZGVzY3JpYmUgYSBTRFAgbS1saW5lLlxuICAgIHRoaXMudHJhbnNjZWl2ZXJzID0gW107XG5cbiAgICB0aGlzLl9zZHBTZXNzaW9uSWQgPSBTRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCgpO1xuICAgIHRoaXMuX3NkcFNlc3Npb25WZXJzaW9uID0gMDtcblxuICAgIHRoaXMuX2R0bHNSb2xlID0gdW5kZWZpbmVkOyAvLyByb2xlIGZvciBhPXNldHVwIHRvIHVzZSBpbiBhbnN3ZXJzLlxuXG4gICAgdGhpcy5faXNDbG9zZWQgPSBmYWxzZTtcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnbG9jYWxEZXNjcmlwdGlvbicsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9sb2NhbERlc2NyaXB0aW9uO1xuICAgIH1cbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdyZW1vdGVEZXNjcmlwdGlvbicsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW1vdGVEZXNjcmlwdGlvbjtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHNldCB1cCBldmVudCBoYW5kbGVycyBvbiBwcm90b3R5cGVcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlY2FuZGlkYXRlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uYWRkc3RyZWFtID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9udHJhY2sgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25yZW1vdmVzdHJlYW0gPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25zaWduYWxpbmdzdGF0ZWNoYW5nZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9ubmVnb3RpYXRpb25uZWVkZWQgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25kYXRhY2hhbm5lbCA9IG51bGw7XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24obmFtZSwgZXZlbnQpIHtcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICBpZiAodHlwZW9mIHRoaXNbJ29uJyArIG5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzWydvbicgKyBuYW1lXShldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZScpO1xuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWdhdGhlcmluZ3N0YXRlY2hhbmdlJywgZXZlbnQpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRDb25maWd1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdHJlYW1zO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucmVtb3RlU3RyZWFtcztcbiAgfTtcblxuICAvLyBpbnRlcm5hbCBoZWxwZXIgdG8gY3JlYXRlIGEgdHJhbnNjZWl2ZXIgb2JqZWN0LlxuICAvLyAod2hpY2ggaXMgbm90IHlldCB0aGUgc2FtZSBhcyB0aGUgV2ViUlRDIDEuMCB0cmFuc2NlaXZlcilcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVUcmFuc2NlaXZlciA9IGZ1bmN0aW9uKGtpbmQsIGRvTm90QWRkKSB7XG4gICAgdmFyIGhhc0J1bmRsZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzLmxlbmd0aCA+IDA7XG4gICAgdmFyIHRyYW5zY2VpdmVyID0ge1xuICAgICAgdHJhY2s6IG51bGwsXG4gICAgICBpY2VHYXRoZXJlcjogbnVsbCxcbiAgICAgIGljZVRyYW5zcG9ydDogbnVsbCxcbiAgICAgIGR0bHNUcmFuc3BvcnQ6IG51bGwsXG4gICAgICBsb2NhbENhcGFiaWxpdGllczogbnVsbCxcbiAgICAgIHJlbW90ZUNhcGFiaWxpdGllczogbnVsbCxcbiAgICAgIHJ0cFNlbmRlcjogbnVsbCxcbiAgICAgIHJ0cFJlY2VpdmVyOiBudWxsLFxuICAgICAga2luZDoga2luZCxcbiAgICAgIG1pZDogbnVsbCxcbiAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM6IG51bGwsXG4gICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzOiBudWxsLFxuICAgICAgc3RyZWFtOiBudWxsLFxuICAgICAgYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtczogW10sXG4gICAgICB3YW50UmVjZWl2ZTogdHJ1ZVxuICAgIH07XG4gICAgaWYgKHRoaXMudXNpbmdCdW5kbGUgJiYgaGFzQnVuZGxlVHJhbnNwb3J0KSB7XG4gICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQ7XG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRyYW5zcG9ydHMgPSB0aGlzLl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cygpO1xuICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ID0gdHJhbnNwb3J0cy5pY2VUcmFuc3BvcnQ7XG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0ID0gdHJhbnNwb3J0cy5kdGxzVHJhbnNwb3J0O1xuICAgIH1cbiAgICBpZiAoIWRvTm90QWRkKSB7XG4gICAgICB0aGlzLnRyYW5zY2VpdmVycy5wdXNoKHRyYW5zY2VpdmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRyYW5zY2VpdmVyO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdBdHRlbXB0ZWQgdG8gY2FsbCBhZGRUcmFjayBvbiBhIGNsb3NlZCBwZWVyY29ubmVjdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHRoaXMudHJhbnNjZWl2ZXJzLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgIH0pO1xuXG4gICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZEFjY2Vzc0Vycm9yJywgJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicpO1xuICAgIH1cblxuICAgIHZhciB0cmFuc2NlaXZlcjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMudHJhbnNjZWl2ZXJzW2ldLnRyYWNrICYmXG4gICAgICAgICAgdGhpcy50cmFuc2NlaXZlcnNbaV0ua2luZCA9PT0gdHJhY2sua2luZCkge1xuICAgICAgICB0cmFuc2NlaXZlciA9IHRoaXMudHJhbnNjZWl2ZXJzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRyYW5zY2VpdmVyKSB7XG4gICAgICB0cmFuc2NlaXZlciA9IHRoaXMuX2NyZWF0ZVRyYW5zY2VpdmVyKHRyYWNrLmtpbmQpO1xuICAgIH1cblxuICAgIHRoaXMuX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkKCk7XG5cbiAgICBpZiAodGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xuICAgICAgdGhpcy5sb2NhbFN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgIH1cblxuICAgIHRyYW5zY2VpdmVyLnRyYWNrID0gdHJhY2s7XG4gICAgdHJhbnNjZWl2ZXIuc3RyZWFtID0gc3RyZWFtO1xuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlciA9IG5ldyB3aW5kb3cuUlRDUnRwU2VuZGVyKHRyYWNrLFxuICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0KTtcbiAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAyNSkge1xuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgcGMuYWRkVHJhY2sodHJhY2ssIHN0cmVhbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ2xvbmUgaXMgbmVjZXNzYXJ5IGZvciBsb2NhbCBkZW1vcyBtb3N0bHksIGF0dGFjaGluZyBkaXJlY3RseVxuICAgICAgLy8gdG8gdHdvIGRpZmZlcmVudCBzZW5kZXJzIGRvZXMgbm90IHdvcmsgKGJ1aWxkIDEwNTQ3KS5cbiAgICAgIC8vIEZpeGVkIGluIDE1MDI1IChvciBlYXJsaWVyKVxuICAgICAgdmFyIGNsb25lZFN0cmVhbSA9IHN0cmVhbS5jbG9uZSgpO1xuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2ssIGlkeCkge1xuICAgICAgICB2YXIgY2xvbmVkVHJhY2sgPSBjbG9uZWRTdHJlYW0uZ2V0VHJhY2tzKClbaWR4XTtcbiAgICAgICAgdHJhY2suYWRkRXZlbnRMaXN0ZW5lcignZW5hYmxlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY2xvbmVkVHJhY2suZW5hYmxlZCA9IGV2ZW50LmVuYWJsZWQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjbG9uZWRTdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICBwYy5hZGRUcmFjayh0cmFjaywgY2xvbmVkU3RyZWFtKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdBdHRlbXB0ZWQgdG8gY2FsbCByZW1vdmVUcmFjayBvbiBhIGNsb3NlZCBwZWVyY29ubmVjdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoIShzZW5kZXIgaW5zdGFuY2VvZiB3aW5kb3cuUlRDUnRwU2VuZGVyKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgMSBvZiBSVENQZWVyQ29ubmVjdGlvbi5yZW1vdmVUcmFjayAnICtcbiAgICAgICAgICAnZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBSVENSdHBTZW5kZXIuJyk7XG4gICAgfVxuXG4gICAgdmFyIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnMuZmluZChmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5ydHBTZW5kZXIgPT09IHNlbmRlcjtcbiAgICB9KTtcblxuICAgIGlmICghdHJhbnNjZWl2ZXIpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZEFjY2Vzc0Vycm9yJyxcbiAgICAgICAgICAnU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyk7XG4gICAgfVxuICAgIHZhciBzdHJlYW0gPSB0cmFuc2NlaXZlci5zdHJlYW07XG5cbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuc3RvcCgpO1xuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlciA9IG51bGw7XG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSBudWxsO1xuICAgIHRyYW5zY2VpdmVyLnN0cmVhbSA9IG51bGw7XG5cbiAgICAvLyByZW1vdmUgdGhlIHN0cmVhbSBmcm9tIHRoZSBzZXQgb2YgbG9jYWwgc3RyZWFtc1xuICAgIHZhciBsb2NhbFN0cmVhbXMgPSB0aGlzLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQuc3RyZWFtO1xuICAgIH0pO1xuICAgIGlmIChsb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSAmJlxuICAgICAgICB0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPiAtMSkge1xuICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuc3BsaWNlKHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSwgMSk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgdmFyIHNlbmRlciA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2VuZGVyKSB7XG4gICAgICAgIHBjLnJlbW92ZVRyYWNrKHNlbmRlcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICByZXR1cm4gISF0cmFuc2NlaXZlci5ydHBTZW5kZXI7XG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xuICAgIH0pO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICByZXR1cm4gISF0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICB9KVxuICAgIC5tYXAoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICB9KTtcbiAgfTtcblxuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fY3JlYXRlSWNlR2F0aGVyZXIgPSBmdW5jdGlvbihzZHBNTGluZUluZGV4LFxuICAgICAgdXNpbmdCdW5kbGUpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIGlmICh1c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNjZWl2ZXJzWzBdLmljZUdhdGhlcmVyO1xuICAgIH0gZWxzZSBpZiAodGhpcy5faWNlR2F0aGVyZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2ljZUdhdGhlcmVycy5zaGlmdCgpO1xuICAgIH1cbiAgICB2YXIgaWNlR2F0aGVyZXIgPSBuZXcgd2luZG93LlJUQ0ljZUdhdGhlcmVyKHtcbiAgICAgIGljZVNlcnZlcnM6IHRoaXMuX2NvbmZpZy5pY2VTZXJ2ZXJzLFxuICAgICAgZ2F0aGVyUG9saWN5OiB0aGlzLl9jb25maWcuaWNlVHJhbnNwb3J0UG9saWN5XG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGljZUdhdGhlcmVyLCAnc3RhdGUnLFxuICAgICAgICB7dmFsdWU6ICduZXcnLCB3cml0YWJsZTogdHJ1ZX1cbiAgICApO1xuXG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPSBbXTtcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBlbmQgPSAhZXZlbnQuY2FuZGlkYXRlIHx8IE9iamVjdC5rZXlzKGV2ZW50LmNhbmRpZGF0ZSkubGVuZ3RoID09PSAwO1xuICAgICAgLy8gcG9seWZpbGwgc2luY2UgUlRDSWNlR2F0aGVyZXIuc3RhdGUgaXMgbm90IGltcGxlbWVudGVkIGluXG4gICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cbiAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gZW5kID8gJ2NvbXBsZXRlZCcgOiAnZ2F0aGVyaW5nJztcbiAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgIT09IG51bGwpIHtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG4gICAgaWNlR2F0aGVyZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9jYWxjYW5kaWRhdGUnLFxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyk7XG4gICAgcmV0dXJuIGljZUdhdGhlcmVyO1xuICB9O1xuXG4gIC8vIHN0YXJ0IGdhdGhlcmluZyBmcm9tIGFuIFJUQ0ljZUdhdGhlcmVyLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2dhdGhlciA9IGZ1bmN0aW9uKG1pZCwgc2RwTUxpbmVJbmRleCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgdmFyIGljZUdhdGhlcmVyID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XG4gICAgaWYgKGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID1cbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzO1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID0gbnVsbDtcbiAgICBpY2VHYXRoZXJlci5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2NhbGNhbmRpZGF0ZScsXG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzKTtcbiAgICBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBpZiAocGMudXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDApIHtcbiAgICAgICAgLy8gaWYgd2Uga25vdyB0aGF0IHdlIHVzZSBidW5kbGUgd2UgY2FuIGRyb3AgY2FuZGlkYXRlcyB3aXRoXG4gICAgICAgIC8vIFx1MDQ1NWRwTUxpbmVJbmRleCA+IDAuIElmIHdlIGRvbid0IGRvIHRoaXMgdGhlbiBvdXIgc3RhdGUgZ2V0c1xuICAgICAgICAvLyBjb25mdXNlZCBzaW5jZSB3ZSBkaXNwb3NlIHRoZSBleHRyYSBpY2UgZ2F0aGVyZXIuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnaWNlY2FuZGlkYXRlJyk7XG4gICAgICBldmVudC5jYW5kaWRhdGUgPSB7c2RwTWlkOiBtaWQsIHNkcE1MaW5lSW5kZXg6IHNkcE1MaW5lSW5kZXh9O1xuXG4gICAgICB2YXIgY2FuZCA9IGV2dC5jYW5kaWRhdGU7XG4gICAgICAvLyBFZGdlIGVtaXRzIGFuIGVtcHR5IG9iamVjdCBmb3IgUlRDSWNlQ2FuZGlkYXRlQ29tcGxldGVcdTIwMjVcbiAgICAgIHZhciBlbmQgPSAhY2FuZCB8fCBPYmplY3Qua2V5cyhjYW5kKS5sZW5ndGggPT09IDA7XG4gICAgICBpZiAoZW5kKSB7XG4gICAgICAgIC8vIHBvbHlmaWxsIHNpbmNlIFJUQ0ljZUdhdGhlcmVyLnN0YXRlIGlzIG5vdCBpbXBsZW1lbnRlZCBpblxuICAgICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cbiAgICAgICAgaWYgKGljZUdhdGhlcmVyLnN0YXRlID09PSAnbmV3JyB8fCBpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ2dhdGhlcmluZycpIHtcbiAgICAgICAgICBpY2VHYXRoZXJlci5zdGF0ZSA9ICdjb21wbGV0ZWQnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaWNlR2F0aGVyZXIuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnZ2F0aGVyaW5nJztcbiAgICAgICAgfVxuICAgICAgICAvLyBSVENJY2VDYW5kaWRhdGUgZG9lc24ndCBoYXZlIGEgY29tcG9uZW50LCBuZWVkcyB0byBiZSBhZGRlZFxuICAgICAgICBjYW5kLmNvbXBvbmVudCA9IDE7XG4gICAgICAgIC8vIGFsc28gdGhlIHVzZXJuYW1lRnJhZ21lbnQuIFRPRE86IHVwZGF0ZSBTRFAgdG8gdGFrZSBib3RoIHZhcmlhbnRzLlxuICAgICAgICBjYW5kLnVmcmFnID0gaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkudXNlcm5hbWVGcmFnbWVudDtcblxuICAgICAgICB2YXIgc2VyaWFsaXplZENhbmRpZGF0ZSA9IFNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlKGNhbmQpO1xuICAgICAgICBldmVudC5jYW5kaWRhdGUgPSBPYmplY3QuYXNzaWduKGV2ZW50LmNhbmRpZGF0ZSxcbiAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKHNlcmlhbGl6ZWRDYW5kaWRhdGUpKTtcblxuICAgICAgICBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlID0gc2VyaWFsaXplZENhbmRpZGF0ZTtcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUsXG4gICAgICAgICAgICBzZHBNaWQ6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNaWQsXG4gICAgICAgICAgICBzZHBNTGluZUluZGV4OiBldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGV2ZW50LmNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIGxvY2FsIGRlc2NyaXB0aW9uLlxuICAgICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhwYy5fbG9jYWxEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgc2VjdGlvbnNbZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXhdICs9XG4gICAgICAgICAgICAnYT0nICsgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSArICdcXHJcXG4nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VjdGlvbnNbZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXhdICs9XG4gICAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICB9XG4gICAgICBwYy5fbG9jYWxEZXNjcmlwdGlvbi5zZHAgPVxuICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLl9sb2NhbERlc2NyaXB0aW9uLnNkcCkgK1xuICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xuICAgICAgdmFyIGNvbXBsZXRlID0gcGMudHJhbnNjZWl2ZXJzLmV2ZXJ5KGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChwYy5pY2VHYXRoZXJpbmdTdGF0ZSAhPT0gJ2dhdGhlcmluZycpIHtcbiAgICAgICAgcGMuaWNlR2F0aGVyaW5nU3RhdGUgPSAnZ2F0aGVyaW5nJztcbiAgICAgICAgcGMuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbWl0IGNhbmRpZGF0ZS4gQWxzbyBlbWl0IG51bGwgY2FuZGlkYXRlIHdoZW4gYWxsIGdhdGhlcmVycyBhcmVcbiAgICAgIC8vIGNvbXBsZXRlLlxuICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNhbmRpZGF0ZScsIGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChjb21wbGV0ZSkge1xuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnaWNlY2FuZGlkYXRlJywgbmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKSk7XG4gICAgICAgIHBjLmljZUdhdGhlcmluZ1N0YXRlID0gJ2NvbXBsZXRlJztcbiAgICAgICAgcGMuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBlbWl0IGFscmVhZHkgZ2F0aGVyZWQgY2FuZGlkYXRlcy5cbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZSkge1xuICAgICAgICBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlKGUpO1xuICAgICAgfSk7XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIElDRSB0cmFuc3BvcnQgYW5kIERUTFMgdHJhbnNwb3J0LlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICB2YXIgaWNlVHJhbnNwb3J0ID0gbmV3IHdpbmRvdy5SVENJY2VUcmFuc3BvcnQobnVsbCk7XG4gICAgaWNlVHJhbnNwb3J0Lm9uaWNlc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHBjLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUoKTtcbiAgICAgIHBjLl91cGRhdGVDb25uZWN0aW9uU3RhdGUoKTtcbiAgICB9O1xuXG4gICAgdmFyIGR0bHNUcmFuc3BvcnQgPSBuZXcgd2luZG93LlJUQ0R0bHNUcmFuc3BvcnQoaWNlVHJhbnNwb3J0KTtcbiAgICBkdGxzVHJhbnNwb3J0Lm9uZHRsc3N0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgfTtcbiAgICBkdGxzVHJhbnNwb3J0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIG9uZXJyb3IgZG9lcyBub3Qgc2V0IHN0YXRlIHRvIGZhaWxlZCBieSBpdHNlbGYuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZHRsc1RyYW5zcG9ydCwgJ3N0YXRlJyxcbiAgICAgICAgICB7dmFsdWU6ICdmYWlsZWQnLCB3cml0YWJsZTogdHJ1ZX0pO1xuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWNlVHJhbnNwb3J0OiBpY2VUcmFuc3BvcnQsXG4gICAgICBkdGxzVHJhbnNwb3J0OiBkdGxzVHJhbnNwb3J0XG4gICAgfTtcbiAgfTtcblxuICAvLyBEZXN0cm95IElDRSBnYXRoZXJlciwgSUNFIHRyYW5zcG9ydCBhbmQgRFRMUyB0cmFuc3BvcnQuXG4gIC8vIFdpdGhvdXQgdHJpZ2dlcmluZyB0aGUgY2FsbGJhY2tzLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2Rpc3Bvc2VJY2VBbmREdGxzVHJhbnNwb3J0cyA9IGZ1bmN0aW9uKFxuICAgICAgc2RwTUxpbmVJbmRleCkge1xuICAgIHZhciBpY2VHYXRoZXJlciA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xuICAgIGlmIChpY2VHYXRoZXJlcikge1xuICAgICAgZGVsZXRlIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGU7XG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XG4gICAgfVxuICAgIHZhciBpY2VUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQ7XG4gICAgaWYgKGljZVRyYW5zcG9ydCkge1xuICAgICAgZGVsZXRlIGljZVRyYW5zcG9ydC5vbmljZXN0YXRlY2hhbmdlO1xuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydDtcbiAgICB9XG4gICAgdmFyIGR0bHNUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0O1xuICAgIGlmIChkdGxzVHJhbnNwb3J0KSB7XG4gICAgICBkZWxldGUgZHRsc1RyYW5zcG9ydC5vbmR0bHNzdGF0ZWNoYW5nZTtcbiAgICAgIGRlbGV0ZSBkdGxzVHJhbnNwb3J0Lm9uZXJyb3I7XG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcbiAgICB9XG4gIH07XG5cbiAgLy8gU3RhcnQgdGhlIFJUUCBTZW5kZXIgYW5kIFJlY2VpdmVyIGZvciBhIHRyYW5zY2VpdmVyLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3RyYW5zY2VpdmUgPSBmdW5jdGlvbih0cmFuc2NlaXZlcixcbiAgICAgIHNlbmQsIHJlY3YpIHtcbiAgICB2YXIgcGFyYW1zID0gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxuICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMpO1xuICAgIGlmIChzZW5kICYmIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICBwYXJhbXMucnRjcCA9IHtcbiAgICAgICAgY25hbWU6IFNEUFV0aWxzLmxvY2FsQ05hbWUsXG4gICAgICAgIGNvbXBvdW5kOiB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jb21wb3VuZFxuICAgICAgfTtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgICAgICBwYXJhbXMucnRjcC5zc3JjID0gdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjO1xuICAgICAgfVxuICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnNlbmQocGFyYW1zKTtcbiAgICB9XG4gICAgaWYgKHJlY3YgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgJiYgcGFyYW1zLmNvZGVjcy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyByZW1vdmUgUlRYIGZpZWxkIGluIEVkZ2UgMTQ5NDJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nXG4gICAgICAgICAgJiYgdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVyc1xuICAgICAgICAgICYmIGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICBkZWxldGUgcC5ydHg7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IFt7fV07XG4gICAgICB9XG4gICAgICBwYXJhbXMucnRjcCA9IHtcbiAgICAgICAgY29tcG91bmQ6IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kXG4gICAgICB9O1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNuYW1lKSB7XG4gICAgICAgIHBhcmFtcy5ydGNwLmNuYW1lID0gdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY25hbWU7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGgpIHtcbiAgICAgICAgcGFyYW1zLnJ0Y3Auc3NyYyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYztcbiAgICAgIH1cbiAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnJlY2VpdmUocGFyYW1zKTtcbiAgICB9XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICAvLyBOb3RlOiBwcmFuc3dlciBpcyBub3Qgc3VwcG9ydGVkLlxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdUeXBlRXJyb3InLFxuICAgICAgICAgICdVbnN1cHBvcnRlZCB0eXBlIFwiJyArIGRlc2NyaXB0aW9uLnR5cGUgKyAnXCInKSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKCdzZXRMb2NhbERlc2NyaXB0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgcGMuc2lnbmFsaW5nU3RhdGUpIHx8IHBjLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IHNldCBsb2NhbCAnICsgZGVzY3JpcHRpb24udHlwZSArXG4gICAgICAgICAgJyBpbiBzdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcbiAgICB9XG5cbiAgICB2YXIgc2VjdGlvbnM7XG4gICAgdmFyIHNlc3Npb25wYXJ0O1xuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XG4gICAgICAvLyBWRVJZIGxpbWl0ZWQgc3VwcG9ydCBmb3IgU0RQIG11bmdpbmcuIExpbWl0ZWQgdG86XG4gICAgICAvLyAqIGNoYW5naW5nIHRoZSBvcmRlciBvZiBjb2RlY3NcbiAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xuICAgICAgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgICAgdmFyIGNhcHMgPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmxvY2FsQ2FwYWJpbGl0aWVzID0gY2FwcztcbiAgICAgIH0pO1xuXG4gICAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgICBwYy5fZ2F0aGVyKHRyYW5zY2VpdmVyLm1pZCwgc2RwTUxpbmVJbmRleCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInKSB7XG4gICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMocGMuX3JlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgICB2YXIgaXNJY2VMaXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICAgJ2E9aWNlLWxpdGUnKS5sZW5ndGggPiAwO1xuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xuICAgICAgICB2YXIgaWNlR2F0aGVyZXIgPSB0cmFuc2NlaXZlci5pY2VHYXRoZXJlcjtcbiAgICAgICAgdmFyIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcbiAgICAgICAgdmFyIGR0bHNUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0O1xuICAgICAgICB2YXIgbG9jYWxDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcztcbiAgICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcztcblxuICAgICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXG4gICAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxuICAgICAgICAgICAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMDtcblxuICAgICAgICBpZiAoIXJlamVjdGVkICYmICF0cmFuc2NlaXZlci5yZWplY3RlZCkge1xuICAgICAgICAgIHZhciByZW1vdGVJY2VQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyhcbiAgICAgICAgICAgICAgbWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XG4gICAgICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMoXG4gICAgICAgICAgICAgIG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xuICAgICAgICAgIGlmIChpc0ljZUxpdGUpIHtcbiAgICAgICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzLnJvbGUgPSAnc2VydmVyJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXBjLnVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHBjLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcbiAgICAgICAgICAgIGlmIChpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zdGFydChpY2VHYXRoZXJlciwgcmVtb3RlSWNlUGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgIGlzSWNlTGl0ZSA/ICdjb250cm9sbGluZycgOiAnY29udHJvbGxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGR0bHNUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICAgIGR0bHNUcmFuc3BvcnQuc3RhcnQocmVtb3RlRHRsc1BhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENhbGN1bGF0ZSBpbnRlcnNlY3Rpb24gb2YgY2FwYWJpbGl0aWVzLlxuICAgICAgICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgICAgIHJlbW90ZUNhcGFiaWxpdGllcyk7XG5cbiAgICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwU2VuZGVyLiBUaGUgUlRDUnRwUmVjZWl2ZXIgZm9yIHRoaXNcbiAgICAgICAgICAvLyB0cmFuc2NlaXZlciBoYXMgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQgaW4gc2V0UmVtb3RlRGVzY3JpcHRpb24uXG4gICAgICAgICAgcGMuX3RyYW5zY2VpdmUodHJhbnNjZWl2ZXIsXG4gICAgICAgICAgICAgIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwYy5fbG9jYWxEZXNjcmlwdGlvbiA9IHtcbiAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxuICAgIH07XG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnaGF2ZS1sb2NhbC1vZmZlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ3N0YWJsZScpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICAvLyBOb3RlOiBwcmFuc3dlciBpcyBub3Qgc3VwcG9ydGVkLlxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdUeXBlRXJyb3InLFxuICAgICAgICAgICdVbnN1cHBvcnRlZCB0eXBlIFwiJyArIGRlc2NyaXB0aW9uLnR5cGUgKyAnXCInKSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKCdzZXRSZW1vdGVEZXNjcmlwdGlvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uLnR5cGUsIHBjLnNpZ25hbGluZ1N0YXRlKSB8fCBwYy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBzZXQgcmVtb3RlICcgKyBkZXNjcmlwdGlvbi50eXBlICtcbiAgICAgICAgICAnIGluIHN0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xuICAgIH1cblxuICAgIHZhciBzdHJlYW1zID0ge307XG4gICAgcGMucmVtb3RlU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgc3RyZWFtc1tzdHJlYW0uaWRdID0gc3RyZWFtO1xuICAgIH0pO1xuICAgIHZhciByZWNlaXZlckxpc3QgPSBbXTtcbiAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XG4gICAgdmFyIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcbiAgICB2YXIgaXNJY2VMaXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICdhPWljZS1saXRlJykubGVuZ3RoID4gMDtcbiAgICB2YXIgdXNpbmdCdW5kbGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcbiAgICAgICAgJ2E9Z3JvdXA6QlVORExFICcpLmxlbmd0aCA+IDA7XG4gICAgcGMudXNpbmdCdW5kbGUgPSB1c2luZ0J1bmRsZTtcbiAgICB2YXIgaWNlT3B0aW9ucyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxuICAgICAgICAnYT1pY2Utb3B0aW9uczonKVswXTtcbiAgICBpZiAoaWNlT3B0aW9ucykge1xuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBpY2VPcHRpb25zLnN1YnN0cigxNCkuc3BsaXQoJyAnKVxuICAgICAgICAgIC5pbmRleE9mKCd0cmlja2xlJykgPj0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICAgICAgdmFyIGtpbmQgPSBTRFBVdGlscy5nZXRLaW5kKG1lZGlhU2VjdGlvbik7XG4gICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXG4gICAgICB2YXIgcmVqZWN0ZWQgPSBTRFBVdGlscy5pc1JlamVjdGVkKG1lZGlhU2VjdGlvbikgJiZcbiAgICAgICAgICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWJ1bmRsZS1vbmx5JykubGVuZ3RoID09PSAwO1xuICAgICAgdmFyIHByb3RvY29sID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJylbMl07XG5cbiAgICAgIHZhciBkaXJlY3Rpb24gPSBTRFBVdGlscy5nZXREaXJlY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XG4gICAgICB2YXIgcmVtb3RlTXNpZCA9IFNEUFV0aWxzLnBhcnNlTXNpZChtZWRpYVNlY3Rpb24pO1xuXG4gICAgICB2YXIgbWlkID0gU0RQVXRpbHMuZ2V0TWlkKG1lZGlhU2VjdGlvbikgfHwgU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XG5cbiAgICAgIC8vIFJlamVjdCBkYXRhY2hhbm5lbHMgd2hpY2ggYXJlIG5vdCBpbXBsZW1lbnRlZCB5ZXQuXG4gICAgICBpZiAocmVqZWN0ZWQgfHwgKGtpbmQgPT09ICdhcHBsaWNhdGlvbicgJiYgKHByb3RvY29sID09PSAnRFRMUy9TQ1RQJyB8fFxuICAgICAgICAgIHByb3RvY29sID09PSAnVURQL0RUTFMvU0NUUCcpKSkge1xuICAgICAgICAvLyBUT0RPOiB0aGlzIGlzIGRhbmdlcm91cyBpbiB0aGUgY2FzZSB3aGVyZSBhIG5vbi1yZWplY3RlZCBtLWxpbmVcbiAgICAgICAgLy8gICAgIGJlY29tZXMgcmVqZWN0ZWQuXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSA9IHtcbiAgICAgICAgICBtaWQ6IG1pZCxcbiAgICAgICAgICBraW5kOiBraW5kLFxuICAgICAgICAgIHByb3RvY29sOiBwcm90b2NvbCxcbiAgICAgICAgICByZWplY3RlZDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghcmVqZWN0ZWQgJiYgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdICYmXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlamVjdGVkKSB7XG4gICAgICAgIC8vIHJlY3ljbGUgYSByZWplY3RlZCB0cmFuc2NlaXZlci5cbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdID0gcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKGtpbmQsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdHJhbnNjZWl2ZXI7XG4gICAgICB2YXIgaWNlR2F0aGVyZXI7XG4gICAgICB2YXIgaWNlVHJhbnNwb3J0O1xuICAgICAgdmFyIGR0bHNUcmFuc3BvcnQ7XG4gICAgICB2YXIgcnRwUmVjZWl2ZXI7XG4gICAgICB2YXIgc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIHZhciByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzO1xuXG4gICAgICB2YXIgdHJhY2s7XG4gICAgICAvLyBGSVhNRTogZW5zdXJlIHRoZSBtZWRpYVNlY3Rpb24gaGFzIHJ0Y3AtbXV4IHNldC5cbiAgICAgIHZhciByZW1vdGVDYXBhYmlsaXRpZXMgPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcbiAgICAgIHZhciByZW1vdGVJY2VQYXJhbWV0ZXJzO1xuICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzO1xuICAgICAgaWYgKCFyZWplY3RlZCkge1xuICAgICAgICByZW1vdGVJY2VQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24sXG4gICAgICAgICAgICBzZXNzaW9ucGFydCk7XG4gICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMobWVkaWFTZWN0aW9uLFxuICAgICAgICAgICAgc2Vzc2lvbnBhcnQpO1xuICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycy5yb2xlID0gJ2NsaWVudCc7XG4gICAgICB9XG4gICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID1cbiAgICAgICAgICBTRFBVdGlscy5wYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuXG4gICAgICB2YXIgcnRjcFBhcmFtZXRlcnMgPSBTRFBVdGlscy5wYXJzZVJ0Y3BQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG5cbiAgICAgIHZhciBpc0NvbXBsZXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLFxuICAgICAgICAgICdhPWVuZC1vZi1jYW5kaWRhdGVzJywgc2Vzc2lvbnBhcnQpLmxlbmd0aCA+IDA7XG4gICAgICB2YXIgY2FuZHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWNhbmRpZGF0ZTonKVxuICAgICAgICAgIC5tYXAoZnVuY3Rpb24oY2FuZCkge1xuICAgICAgICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjYW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FuZC5jb21wb25lbnQgPT09IDE7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHdlIGNhbiB1c2UgQlVORExFIGFuZCBkaXNwb3NlIHRyYW5zcG9ydHMuXG4gICAgICBpZiAoKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgfHwgZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicpICYmXG4gICAgICAgICAgIXJlamVjdGVkICYmIHVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwICYmXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdKSB7XG4gICAgICAgIHBjLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMoc2RwTUxpbmVJbmRleCk7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlciA9XG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uaWNlR2F0aGVyZXI7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQgPVxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydDtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQgPVxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQ7XG4gICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwU2VuZGVyKSB7XG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFNlbmRlci5zZXRUcmFuc3BvcnQoXG4gICAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFJlY2VpdmVyKSB7XG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFJlY2VpdmVyLnNldFRyYW5zcG9ydChcbiAgICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJyAmJiAhcmVqZWN0ZWQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gfHxcbiAgICAgICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kKTtcbiAgICAgICAgdHJhbnNjZWl2ZXIubWlkID0gbWlkO1xuXG4gICAgICAgIGlmICghdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciA9IHBjLl9jcmVhdGVJY2VHYXRoZXJlcihzZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgICB1c2luZ0J1bmRsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FuZHMubGVuZ3RoICYmIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICBpZiAoaXNDb21wbGV0ZSAmJiAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc2V0UmVtb3RlQ2FuZGlkYXRlcyhjYW5kcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgIG1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFJlY2VpdmVyLmdldENhcGFiaWxpdGllcyhraW5kKTtcblxuICAgICAgICAvLyBmaWx0ZXIgUlRYIHVudGlsIGFkZGl0aW9uYWwgc3R1ZmYgbmVlZGVkIGZvciBSVFggaXMgaW1wbGVtZW50ZWRcbiAgICAgICAgLy8gaW4gYWRhcHRlci5qc1xuICAgICAgICBpZiAoZWRnZVZlcnNpb24gPCAxNTAxOSkge1xuICAgICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcyA9IGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvZGVjLm5hbWUgIT09ICdydHgnO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIHx8IFt7XG4gICAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMikgKiAxMDAxXG4gICAgICAgIH1dO1xuXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcbiAgICAgICAgdmFyIGlzTmV3VHJhY2sgPSBmYWxzZTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpIHtcbiAgICAgICAgICBpc05ld1RyYWNrID0gIXRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgICAgICAgIHJ0cFJlY2VpdmVyID0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgfHxcbiAgICAgICAgICAgICAgbmV3IHdpbmRvdy5SVENSdHBSZWNlaXZlcih0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LCBraW5kKTtcblxuICAgICAgICAgIGlmIChpc05ld1RyYWNrKSB7XG4gICAgICAgICAgICB2YXIgc3RyZWFtO1xuICAgICAgICAgICAgdHJhY2sgPSBydHBSZWNlaXZlci50cmFjaztcbiAgICAgICAgICAgIC8vIEZJWE1FOiBkb2VzIG5vdCB3b3JrIHdpdGggUGxhbiBCLlxuICAgICAgICAgICAgaWYgKHJlbW90ZU1zaWQgJiYgcmVtb3RlTXNpZC5zdHJlYW0gPT09ICctJykge1xuICAgICAgICAgICAgICAvLyBuby1vcC4gYSBzdHJlYW0gaWQgb2YgJy0nIG1lYW5zOiBubyBhc3NvY2lhdGVkIHN0cmVhbS5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVtb3RlTXNpZCkge1xuICAgICAgICAgICAgICBpZiAoIXN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dLCAnaWQnLCB7XG4gICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3RlTXNpZC5zdHJlYW07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRyYWNrLCAnaWQnLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdGVNc2lkLnRyYWNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQgPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3RyZWFtID0gc3RyZWFtcy5kZWZhdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgICAgICBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pO1xuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci50cmFjaykge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICB2YXIgbmF0aXZlVHJhY2sgPSBzLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICByZXR1cm4gdC5pZCA9PT0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIudHJhY2suaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChuYXRpdmVUcmFjaykge1xuICAgICAgICAgICAgICByZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQobmF0aXZlVHJhY2ssIHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzID0gbG9jYWxDYXBhYmlsaXRpZXM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyA9IHJlbW90ZUNhcGFiaWxpdGllcztcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgPSBydHBSZWNlaXZlcjtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMgPSBydGNwUGFyYW1ldGVycztcbiAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPSByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuXG4gICAgICAgIC8vIFN0YXJ0IHRoZSBSVENSdHBSZWNlaXZlciBub3cuIFRoZSBSVFBTZW5kZXIgaXMgc3RhcnRlZCBpblxuICAgICAgICAvLyBzZXRMb2NhbERlc2NyaXB0aW9uLlxuICAgICAgICBwYy5fdHJhbnNjZWl2ZShwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0sXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIGlzTmV3VHJhY2spO1xuICAgICAgfSBlbHNlIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnYW5zd2VyJyAmJiAhcmVqZWN0ZWQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XG4gICAgICAgIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XG4gICAgICAgIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcbiAgICAgICAgZHRsc1RyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQ7XG4gICAgICAgIHJ0cFJlY2VpdmVyID0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgICBsb2NhbENhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzO1xuXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID1cbiAgICAgICAgICAgIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZW1vdGVDYXBhYmlsaXRpZXMgPVxuICAgICAgICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRjcFBhcmFtZXRlcnMgPSBydGNwUGFyYW1ldGVycztcblxuICAgICAgICBpZiAoY2FuZHMubGVuZ3RoICYmIGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICBpZiAoKGlzSWNlTGl0ZSB8fCBpc0NvbXBsZXRlKSAmJlxuICAgICAgICAgICAgICAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XG4gICAgICAgICAgICBpY2VUcmFuc3BvcnQuc2V0UmVtb3RlQ2FuZGlkYXRlcyhjYW5kcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgIG1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgIGlmIChpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICBpY2VUcmFuc3BvcnQuc3RhcnQoaWNlR2F0aGVyZXIsIHJlbW90ZUljZVBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgJ2NvbnRyb2xsaW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkdGxzVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIG9mZmVyIGNvbnRhaW5lZCBSVFggYnV0IHRoZSBhbnN3ZXIgZGlkIG5vdCxcbiAgICAgICAgLy8gcmVtb3ZlIFJUWCBmcm9tIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMuXG4gICAgICAgIHZhciBjb21tb25DYXBhYmlsaXRpZXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMoXG4gICAgICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcblxuICAgICAgICB2YXIgaGFzUnR4ID0gY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoZnVuY3Rpb24oYykge1xuICAgICAgICAgIHJldHVybiBjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3J0eCc7XG4gICAgICAgIH0pLmxlbmd0aDtcbiAgICAgICAgaWYgKCFoYXNSdHggJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgICAgICBkZWxldGUgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHg7XG4gICAgICAgIH1cblxuICAgICAgICBwYy5fdHJhbnNjZWl2ZSh0cmFuc2NlaXZlcixcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdyZWN2b25seScsXG4gICAgICAgICAgICBkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKTtcblxuICAgICAgICAvLyBUT0RPOiByZXdyaXRlIHRvIHVzZSBodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3NldC1hc3NvY2lhdGVkLXJlbW90ZS1zdHJlYW1zXG4gICAgICAgIGlmIChydHBSZWNlaXZlciAmJlxuICAgICAgICAgICAgKGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpKSB7XG4gICAgICAgICAgdHJhY2sgPSBydHBSZWNlaXZlci50cmFjaztcbiAgICAgICAgICBpZiAocmVtb3RlTXNpZCkge1xuICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xuICAgICAgICAgICAgICBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKTtcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgIHN0cmVhbXMuZGVmYXVsdCA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXMuZGVmYXVsdCk7XG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1zLmRlZmF1bHRdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRklYTUU6IGFjdHVhbGx5IHRoZSByZWNlaXZlciBzaG91bGQgYmUgY3JlYXRlZCBsYXRlci5cbiAgICAgICAgICBkZWxldGUgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwYy5fZHRsc1JvbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGMuX2R0bHNSb2xlID0gZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RpdmUnIDogJ3Bhc3NpdmUnO1xuICAgIH1cblxuICAgIHBjLl9yZW1vdGVEZXNjcmlwdGlvbiA9IHtcbiAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxuICAgIH07XG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnaGF2ZS1yZW1vdGUtb2ZmZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdzdGFibGUnKTtcbiAgICB9XG4gICAgT2JqZWN0LmtleXMoc3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzaWQpIHtcbiAgICAgIHZhciBzdHJlYW0gPSBzdHJlYW1zW3NpZF07XG4gICAgICBpZiAoc3RyZWFtLmdldFRyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICBpZiAocGMucmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICAgICAgcGMucmVtb3RlU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdhZGRzdHJlYW0nKTtcbiAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnYWRkc3RyZWFtJywgZXZlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjZWl2ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciB0cmFjayA9IGl0ZW1bMF07XG4gICAgICAgICAgdmFyIHJlY2VpdmVyID0gaXRlbVsxXTtcbiAgICAgICAgICBpZiAoc3RyZWFtLmlkICE9PSBpdGVtWzJdLmlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGZpcmVBZGRUcmFjayhwYywgdHJhY2ssIHJlY2VpdmVyLCBbc3RyZWFtXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJlY2VpdmVyTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZpcmVBZGRUcmFjayhwYywgaXRlbVswXSwgaXRlbVsxXSwgW10pO1xuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgd2hldGhlciBhZGRJY2VDYW5kaWRhdGUoe30pIHdhcyBjYWxsZWQgd2l0aGluIGZvdXIgc2Vjb25kcyBhZnRlclxuICAgIC8vIHNldFJlbW90ZURlc2NyaXB0aW9uLlxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCEocGMgJiYgcGMudHJhbnNjZWl2ZXJzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuZ2V0UmVtb3RlQ2FuZGlkYXRlcygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1RpbWVvdXQgZm9yIGFkZFJlbW90ZUNhbmRpZGF0ZS4gQ29uc2lkZXIgc2VuZGluZyAnICtcbiAgICAgICAgICAgICAgJ2FuIGVuZC1vZi1jYW5kaWRhdGVzIG5vdGlmaWNhdGlvbicpO1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoe30pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCA0MDAwKTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAvKiBub3QgeWV0XG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgICovXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0KSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCkge1xuICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LnN0b3AoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnN0b3AoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci5zdG9wKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gRklYTUU6IGNsZWFuIHVwIHRyYWNrcywgbG9jYWwgc3RyZWFtcywgcmVtb3RlIHN0cmVhbXMsIGV0Y1xuICAgIHRoaXMuX2lzQ2xvc2VkID0gdHJ1ZTtcbiAgICB0aGlzLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnY2xvc2VkJyk7XG4gIH07XG5cbiAgLy8gVXBkYXRlIHRoZSBzaWduYWxpbmcgc3RhdGUuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlU2lnbmFsaW5nU3RhdGUgPSBmdW5jdGlvbihuZXdTdGF0ZSkge1xuICAgIHRoaXMuc2lnbmFsaW5nU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3NpZ25hbGluZ3N0YXRlY2hhbmdlJyk7XG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2lnbmFsaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdG8gZmlyZSB0aGUgbmVnb3RpYXRpb25uZWVkZWQgZXZlbnQuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIGlmICh0aGlzLnNpZ25hbGluZ1N0YXRlICE9PSAnc3RhYmxlJyB8fCB0aGlzLm5lZWROZWdvdGlhdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm5lZWROZWdvdGlhdGlvbiA9IHRydWU7XG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocGMubmVlZE5lZ290aWF0aW9uKSB7XG4gICAgICAgIHBjLm5lZWROZWdvdGlhdGlvbiA9IGZhbHNlO1xuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJyk7XG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfTtcblxuICAvLyBVcGRhdGUgdGhlIGljZSBjb25uZWN0aW9uIHN0YXRlLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXdTdGF0ZTtcbiAgICB2YXIgc3RhdGVzID0ge1xuICAgICAgJ25ldyc6IDAsXG4gICAgICBjbG9zZWQ6IDAsXG4gICAgICBjaGVja2luZzogMCxcbiAgICAgIGNvbm5lY3RlZDogMCxcbiAgICAgIGNvbXBsZXRlZDogMCxcbiAgICAgIGRpc2Nvbm5lY3RlZDogMCxcbiAgICAgIGZhaWxlZDogMFxuICAgIH07XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAmJiAhdHJhbnNjZWl2ZXIucmVqZWN0ZWQpIHtcbiAgICAgICAgc3RhdGVzW3RyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZV0rKztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG5ld1N0YXRlID0gJ25ldyc7XG4gICAgaWYgKHN0YXRlcy5mYWlsZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdmYWlsZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNoZWNraW5nID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY2hlY2tpbmcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmRpc2Nvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Rpc2Nvbm5lY3RlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbXBsZXRlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2NvbXBsZXRlZCc7XG4gICAgfVxuXG4gICAgaWYgKG5ld1N0YXRlICE9PSB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlJyk7XG4gICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdpY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFVwZGF0ZSB0aGUgY29ubmVjdGlvbiBzdGF0ZS5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVDb25uZWN0aW9uU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3U3RhdGU7XG4gICAgdmFyIHN0YXRlcyA9IHtcbiAgICAgICduZXcnOiAwLFxuICAgICAgY2xvc2VkOiAwLFxuICAgICAgY29ubmVjdGluZzogMCxcbiAgICAgIGNvbm5lY3RlZDogMCxcbiAgICAgIGNvbXBsZXRlZDogMCxcbiAgICAgIGRpc2Nvbm5lY3RlZDogMCxcbiAgICAgIGZhaWxlZDogMFxuICAgIH07XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAmJiB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0ICYmXG4gICAgICAgICAgIXRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XG4gICAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGVdKys7XG4gICAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LnN0YXRlXSsrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIElDRVRyYW5zcG9ydC5jb21wbGV0ZWQgYW5kIGNvbm5lY3RlZCBhcmUgdGhlIHNhbWUgZm9yIHRoaXMgcHVycG9zZS5cbiAgICBzdGF0ZXMuY29ubmVjdGVkICs9IHN0YXRlcy5jb21wbGV0ZWQ7XG5cbiAgICBuZXdTdGF0ZSA9ICduZXcnO1xuICAgIGlmIChzdGF0ZXMuZmFpbGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnZmFpbGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0aW5nID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY29ubmVjdGluZyc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuZGlzY29ubmVjdGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnZGlzY29ubmVjdGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5uZXcgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICduZXcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RlZCc7XG4gICAgfVxuXG4gICAgaWYgKG5ld1N0YXRlICE9PSB0aGlzLmNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnY29ubmVjdGlvbnN0YXRlY2hhbmdlJyk7XG4gICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVPZmZlciBhZnRlciBjbG9zZScpKTtcbiAgICB9XG5cbiAgICB2YXIgbnVtQXVkaW9UcmFja3MgPSBwYy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LmtpbmQgPT09ICdhdWRpbyc7XG4gICAgfSkubGVuZ3RoO1xuICAgIHZhciBudW1WaWRlb1RyYWNrcyA9IHBjLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQua2luZCA9PT0gJ3ZpZGVvJztcbiAgICB9KS5sZW5ndGg7XG5cbiAgICAvLyBEZXRlcm1pbmUgbnVtYmVyIG9mIGF1ZGlvIGFuZCB2aWRlbyB0cmFja3Mgd2UgbmVlZCB0byBzZW5kL3JlY3YuXG4gICAgdmFyIG9mZmVyT3B0aW9ucyA9IGFyZ3VtZW50c1swXTtcbiAgICBpZiAob2ZmZXJPcHRpb25zKSB7XG4gICAgICAvLyBSZWplY3QgQ2hyb21lIGxlZ2FjeSBjb25zdHJhaW50cy5cbiAgICAgIGlmIChvZmZlck9wdGlvbnMubWFuZGF0b3J5IHx8IG9mZmVyT3B0aW9ucy5vcHRpb25hbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0xlZ2FjeSBtYW5kYXRvcnkvb3B0aW9uYWwgY29uc3RyYWludHMgbm90IHN1cHBvcnRlZC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlKSB7XG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSBmYWxzZSkge1xuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgIG51bUF1ZGlvVHJhY2tzLS07XG4gICAgICAgIGlmIChudW1BdWRpb1RyYWNrcyA8IDApIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci53YW50UmVjZWl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycpIHtcbiAgICAgICAgbnVtVmlkZW9UcmFja3MtLTtcbiAgICAgICAgaWYgKG51bVZpZGVvVHJhY2tzIDwgMCkge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENyZWF0ZSBNLWxpbmVzIGZvciByZWN2b25seSBzdHJlYW1zLlxuICAgIHdoaWxlIChudW1BdWRpb1RyYWNrcyA+IDAgfHwgbnVtVmlkZW9UcmFja3MgPiAwKSB7XG4gICAgICBpZiAobnVtQXVkaW9UcmFja3MgPiAwKSB7XG4gICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcignYXVkaW8nKTtcbiAgICAgICAgbnVtQXVkaW9UcmFja3MtLTtcbiAgICAgIH1cbiAgICAgIGlmIChudW1WaWRlb1RyYWNrcyA+IDApIHtcbiAgICAgICAgcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKCd2aWRlbycpO1xuICAgICAgICBudW1WaWRlb1RyYWNrcy0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZShwYy5fc2RwU2Vzc2lvbklkLFxuICAgICAgICBwYy5fc2RwU2Vzc2lvblZlcnNpb24rKyk7XG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgIC8vIEZvciBlYWNoIHRyYWNrLCBjcmVhdGUgYW4gaWNlIGdhdGhlcmVyLCBpY2UgdHJhbnNwb3J0LFxuICAgICAgLy8gZHRscyB0cmFuc3BvcnQsIHBvdGVudGlhbGx5IHJ0cHNlbmRlciBhbmQgcnRwcmVjZWl2ZXIuXG4gICAgICB2YXIgdHJhY2sgPSB0cmFuc2NlaXZlci50cmFjaztcbiAgICAgIHZhciBraW5kID0gdHJhbnNjZWl2ZXIua2luZDtcbiAgICAgIHZhciBtaWQgPSB0cmFuc2NlaXZlci5taWQgfHwgU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XG4gICAgICB0cmFuc2NlaXZlci5taWQgPSBtaWQ7XG5cbiAgICAgIGlmICghdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgPSBwYy5fY3JlYXRlSWNlR2F0aGVyZXIoc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgIHBjLnVzaW5nQnVuZGxlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFNlbmRlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XG4gICAgICAvLyBmaWx0ZXIgUlRYIHVudGlsIGFkZGl0aW9uYWwgc3R1ZmYgbmVlZGVkIGZvciBSVFggaXMgaW1wbGVtZW50ZWRcbiAgICAgIC8vIGluIGFkYXB0ZXIuanNcbiAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcyA9IGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoXG4gICAgICAgICAgICBmdW5jdGlvbihjb2RlYykge1xuICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgICAgIC8vIHdvcmsgYXJvdW5kIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD02NTUyXG4gICAgICAgIC8vIGJ5IGFkZGluZyBsZXZlbC1hc3ltbWV0cnktYWxsb3dlZD0xXG4gICAgICAgIGlmIChjb2RlYy5uYW1lID09PSAnSDI2NCcgJiZcbiAgICAgICAgICAgIGNvZGVjLnBhcmFtZXRlcnNbJ2xldmVsLWFzeW1tZXRyeS1hbGxvd2VkJ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvZGVjLnBhcmFtZXRlcnNbJ2xldmVsLWFzeW1tZXRyeS1hbGxvd2VkJ10gPSAnMSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3Igc3Vic2VxdWVudCBvZmZlcnMsIHdlIG1pZ2h0IGhhdmUgdG8gcmUtdXNlIHRoZSBwYXlsb2FkXG4gICAgICAgIC8vIHR5cGUgb2YgdGhlIGxhc3Qgb2ZmZXIuXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MpIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24ocmVtb3RlQ29kZWMpIHtcbiAgICAgICAgICAgIGlmIChjb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJlbW90ZUNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSAmJlxuICAgICAgICAgICAgICAgIGNvZGVjLmNsb2NrUmF0ZSA9PT0gcmVtb3RlQ29kZWMuY2xvY2tSYXRlKSB7XG4gICAgICAgICAgICAgIGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlID0gcmVtb3RlQ29kZWMucGF5bG9hZFR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGhkckV4dCkge1xuICAgICAgICB2YXIgcmVtb3RlRXh0ZW5zaW9ucyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMgfHwgW107XG4gICAgICAgIHJlbW90ZUV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihySGRyRXh0KSB7XG4gICAgICAgICAgaWYgKGhkckV4dC51cmkgPT09IHJIZHJFeHQudXJpKSB7XG4gICAgICAgICAgICBoZHJFeHQuaWQgPSBySGRyRXh0LmlkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gZ2VuZXJhdGUgYW4gc3NyYyBub3csIHRvIGJlIHVzZWQgbGF0ZXIgaW4gcnRwU2VuZGVyLnNlbmRcbiAgICAgIHZhciBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyB8fCBbe1xuICAgICAgICBzc3JjOiAoMiAqIHNkcE1MaW5lSW5kZXggKyAxKSAqIDEwMDFcbiAgICAgIH1dO1xuICAgICAgaWYgKHRyYWNrKSB7XG4gICAgICAgIC8vIGFkZCBSVFhcbiAgICAgICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDE5ICYmIGtpbmQgPT09ICd2aWRlbycgJiZcbiAgICAgICAgICAgICFzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4ID0ge1xuICAgICAgICAgICAgc3NyYzogc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgMVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyID0gbmV3IHdpbmRvdy5SVENSdHBSZWNlaXZlcihcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQsIGtpbmQpO1xuICAgICAgfVxuXG4gICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyA9IGxvY2FsQ2FwYWJpbGl0aWVzO1xuICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgfSk7XG5cbiAgICAvLyBhbHdheXMgb2ZmZXIgQlVORExFIGFuZCBkaXNwb3NlIG9uIHJldHVybiBpZiBub3Qgc3VwcG9ydGVkLlxuICAgIGlmIChwYy5fY29uZmlnLmJ1bmRsZVBvbGljeSAhPT0gJ21heC1jb21wYXQnKSB7XG4gICAgICBzZHAgKz0gJ2E9Z3JvdXA6QlVORExFICcgKyBwYy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHQubWlkO1xuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XG4gICAgfVxuICAgIHNkcCArPSAnYT1pY2Utb3B0aW9uczp0cmlja2xlXFxyXFxuJztcblxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICBzZHAgKz0gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgICdvZmZlcicsIHRyYW5zY2VpdmVyLnN0cmVhbSwgcGMuX2R0bHNSb2xlKTtcbiAgICAgIHNkcCArPSAnYT1ydGNwLXJzaXplXFxyXFxuJztcblxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyICYmIHBjLmljZUdhdGhlcmluZ1N0YXRlICE9PSAnbmV3JyAmJlxuICAgICAgICAgIChzZHBNTGluZUluZGV4ID09PSAwIHx8ICFwYy51c2luZ0J1bmRsZSkpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxDYW5kaWRhdGVzKCkuZm9yRWFjaChmdW5jdGlvbihjYW5kKSB7XG4gICAgICAgICAgY2FuZC5jb21wb25lbnQgPSAxO1xuICAgICAgICAgIHNkcCArPSAnYT0nICsgU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUoY2FuZCkgKyAnXFxyXFxuJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLnN0YXRlID09PSAnY29tcGxldGVkJykge1xuICAgICAgICAgIHNkcCArPSAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBkZXNjID0gbmV3IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgdHlwZTogJ29mZmVyJyxcbiAgICAgIHNkcDogc2RwXG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXNjKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIGlmIChwYy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBjYWxsIGNyZWF0ZUFuc3dlciBhZnRlciBjbG9zZScpKTtcbiAgICB9XG5cbiAgICBpZiAoIShwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2hhdmUtcmVtb3RlLW9mZmVyJyB8fFxuICAgICAgICBwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2hhdmUtbG9jYWwtcHJhbnN3ZXInKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlQW5zd2VyIGluIHNpZ25hbGluZ1N0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xuICAgIH1cblxuICAgIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZShwYy5fc2RwU2Vzc2lvbklkLFxuICAgICAgICBwYy5fc2RwU2Vzc2lvblZlcnNpb24rKyk7XG4gICAgaWYgKHBjLnVzaW5nQnVuZGxlKSB7XG4gICAgICBzZHAgKz0gJ2E9Z3JvdXA6QlVORExFICcgKyBwYy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHQubWlkO1xuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XG4gICAgfVxuICAgIHNkcCArPSAnYT1pY2Utb3B0aW9uczp0cmlja2xlXFxyXFxuJztcblxuICAgIHZhciBtZWRpYVNlY3Rpb25zSW5PZmZlciA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMoXG4gICAgICAgIHBjLl9yZW1vdGVEZXNjcmlwdGlvbi5zZHApLmxlbmd0aDtcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgaWYgKHNkcE1MaW5lSW5kZXggKyAxID4gbWVkaWFTZWN0aW9uc0luT2ZmZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXBwbGljYXRpb24nKSB7XG4gICAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnByb3RvY29sID09PSAnRFRMUy9TQ1RQJykgeyAvLyBsZWdhY3kgZm10XG4gICAgICAgICAgICBzZHAgKz0gJ209YXBwbGljYXRpb24gMCBEVExTL1NDVFAgNTAwMFxcclxcbic7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNkcCArPSAnbT1hcHBsaWNhdGlvbiAwICcgKyB0cmFuc2NlaXZlci5wcm90b2NvbCArXG4gICAgICAgICAgICAgICAgJyB3ZWJydGMtZGF0YWNoYW5uZWxcXHJcXG4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgc2RwICs9ICdtPWF1ZGlvIDAgVURQL1RMUy9SVFAvU0FWUEYgMFxcclxcbicgK1xuICAgICAgICAgICAgICAnYT1ydHBtYXA6MCBQQ01VLzgwMDBcXHJcXG4nO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICBzZHAgKz0gJ209dmlkZW8gMCBVRFAvVExTL1JUUC9TQVZQRiAxMjBcXHJcXG4nICtcbiAgICAgICAgICAgICAgJ2E9cnRwbWFwOjEyMCBWUDgvOTAwMDBcXHJcXG4nO1xuICAgICAgICB9XG4gICAgICAgIHNkcCArPSAnYz1JTiBJUDQgMC4wLjAuMFxcclxcbicgK1xuICAgICAgICAgICAgJ2E9aW5hY3RpdmVcXHJcXG4nICtcbiAgICAgICAgICAgICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gRklYTUU6IGxvb2sgYXQgZGlyZWN0aW9uLlxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnN0cmVhbSkge1xuICAgICAgICB2YXIgbG9jYWxUcmFjaztcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF07XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIGxvY2FsVHJhY2sgPSB0cmFuc2NlaXZlci5zdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYWxUcmFjaykge1xuICAgICAgICAgIC8vIGFkZCBSVFhcbiAgICAgICAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMTkgJiYgdHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJyAmJlxuICAgICAgICAgICAgICAhdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4ID0ge1xuICAgICAgICAgICAgICBzc3JjOiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAxXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cbiAgICAgIHZhciBjb21tb25DYXBhYmlsaXRpZXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMoXG4gICAgICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcblxuICAgICAgdmFyIGhhc1J0eCA9IGNvbW1vbkNhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIGMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JztcbiAgICAgIH0pLmxlbmd0aDtcbiAgICAgIGlmICghaGFzUnR4ICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICAgIGRlbGV0ZSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eDtcbiAgICAgIH1cblxuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjb21tb25DYXBhYmlsaXRpZXMsXG4gICAgICAgICAgJ2Fuc3dlcicsIHRyYW5zY2VpdmVyLnN0cmVhbSwgcGMuX2R0bHNSb2xlKTtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycyAmJlxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLnJlZHVjZWRTaXplKSB7XG4gICAgICAgIHNkcCArPSAnYT1ydGNwLXJzaXplXFxyXFxuJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBkZXNjID0gbmV3IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgdHlwZTogJ2Fuc3dlcicsXG4gICAgICBzZHA6IHNkcFxuICAgIH0pO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgdmFyIHNlY3Rpb25zO1xuICAgIGlmIChjYW5kaWRhdGUgJiYgIShjYW5kaWRhdGUuc2RwTUxpbmVJbmRleCAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIGNhbmRpZGF0ZS5zZHBNaWQpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignc2RwTUxpbmVJbmRleCBvciBzZHBNaWQgcmVxdWlyZWQnKSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogbmVlZHMgdG8gZ28gaW50byBvcHMgcXVldWUuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWYgKCFwYy5fcmVtb3RlRGVzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlIHdpdGhvdXQgYSByZW1vdGUgZGVzY3JpcHRpb24nKSk7XG4gICAgICB9IGVsc2UgaWYgKCFjYW5kaWRhdGUgfHwgY2FuZGlkYXRlLmNhbmRpZGF0ZSA9PT0gJycpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYy50cmFuc2NlaXZlcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW2pdLnJlamVjdGVkKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW2pdLmljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoe30pO1xuICAgICAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhwYy5fcmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcbiAgICAgICAgICBzZWN0aW9uc1tqXSArPSAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICAgICAgcGMuX3JlbW90ZURlc2NyaXB0aW9uLnNkcCA9XG4gICAgICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLl9yZW1vdGVEZXNjcmlwdGlvbi5zZHApICtcbiAgICAgICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XG4gICAgICAgICAgaWYgKHBjLnVzaW5nQnVuZGxlKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzZHBNTGluZUluZGV4ID0gY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXg7XG4gICAgICAgIGlmIChjYW5kaWRhdGUuc2RwTWlkKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYy50cmFuc2NlaXZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbaV0ubWlkID09PSBjYW5kaWRhdGUuc2RwTWlkKSB7XG4gICAgICAgICAgICAgIHNkcE1MaW5lSW5kZXggPSBpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAodHJhbnNjZWl2ZXIucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjYW5kID0gT2JqZWN0LmtleXMoY2FuZGlkYXRlLmNhbmRpZGF0ZSkubGVuZ3RoID4gMCA/XG4gICAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmRpZGF0ZS5jYW5kaWRhdGUpIDoge307XG4gICAgICAgICAgLy8gSWdub3JlIENocm9tZSdzIGludmFsaWQgY2FuZGlkYXRlcyBzaW5jZSBFZGdlIGRvZXMgbm90IGxpa2UgdGhlbS5cbiAgICAgICAgICBpZiAoY2FuZC5wcm90b2NvbCA9PT0gJ3RjcCcgJiYgKGNhbmQucG9ydCA9PT0gMCB8fCBjYW5kLnBvcnQgPT09IDkpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZ25vcmUgUlRDUCBjYW5kaWRhdGVzLCB3ZSBhc3N1bWUgUlRDUC1NVVguXG4gICAgICAgICAgaWYgKGNhbmQuY29tcG9uZW50ICYmIGNhbmQuY29tcG9uZW50ICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3aGVuIHVzaW5nIGJ1bmRsZSwgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgdG8gdGhlIHdyb25nXG4gICAgICAgICAgLy8gaWNlIHRyYW5zcG9ydC4gQW5kIGF2b2lkIGFkZGluZyBjYW5kaWRhdGVzIGFkZGVkIGluIHRoZSBTRFAuXG4gICAgICAgICAgaWYgKHNkcE1MaW5lSW5kZXggPT09IDAgfHwgKHNkcE1MaW5lSW5kZXggPiAwICYmXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAhPT0gcGMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydCkpIHtcbiAgICAgICAgICAgIGlmICghbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kKSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignT3BlcmF0aW9uRXJyb3InLFxuICAgICAgICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSByZW1vdGVEZXNjcmlwdGlvbi5cbiAgICAgICAgICB2YXIgY2FuZGlkYXRlU3RyaW5nID0gY2FuZGlkYXRlLmNhbmRpZGF0ZS50cmltKCk7XG4gICAgICAgICAgaWYgKGNhbmRpZGF0ZVN0cmluZy5pbmRleE9mKCdhPScpID09PSAwKSB7XG4gICAgICAgICAgICBjYW5kaWRhdGVTdHJpbmcgPSBjYW5kaWRhdGVTdHJpbmcuc3Vic3RyKDIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMuX3JlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICAgICAgc2VjdGlvbnNbc2RwTUxpbmVJbmRleF0gKz0gJ2E9JyArXG4gICAgICAgICAgICAgIChjYW5kLnR5cGUgPyBjYW5kaWRhdGVTdHJpbmcgOiAnZW5kLW9mLWNhbmRpZGF0ZXMnKVxuICAgICAgICAgICAgICArICdcXHJcXG4nO1xuICAgICAgICAgIHBjLl9yZW1vdGVEZXNjcmlwdGlvbi5zZHAgPVxuICAgICAgICAgICAgICBTRFBVdGlscy5nZXREZXNjcmlwdGlvbihwYy5fcmVtb3RlRGVzY3JpcHRpb24uc2RwKSArXG4gICAgICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZWplY3QobWFrZUVycm9yKCdPcGVyYXRpb25FcnJvcicsXG4gICAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICBpZiAoc2VsZWN0b3IgJiYgc2VsZWN0b3IgaW5zdGFuY2VvZiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjaykge1xuICAgICAgdmFyIHNlbmRlck9yUmVjZWl2ZXIgPSBudWxsO1xuICAgICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIudHJhY2sgPT09IHNlbGVjdG9yKSB7XG4gICAgICAgICAgc2VuZGVyT3JSZWNlaXZlciA9IHRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlciAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIudHJhY2sgPT09IHNlbGVjdG9yKSB7XG4gICAgICAgICAgc2VuZGVyT3JSZWNlaXZlciA9IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICghc2VuZGVyT3JSZWNlaXZlcikge1xuICAgICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRBY2Nlc3NFcnJvcicsICdJbnZhbGlkIHNlbGVjdG9yLicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbmRlck9yUmVjZWl2ZXIuZ2V0U3RhdHMoKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvbWlzZXMgPSBbXTtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICBbJ3J0cFNlbmRlcicsICdydHBSZWNlaXZlcicsICdpY2VHYXRoZXJlcicsICdpY2VUcmFuc3BvcnQnLFxuICAgICAgICAgICdkdGxzVHJhbnNwb3J0J10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIGlmICh0cmFuc2NlaXZlclttZXRob2RdKSB7XG4gICAgICAgICAgICAgIHByb21pc2VzLnB1c2godHJhbnNjZWl2ZXJbbWV0aG9kXS5nZXRTdGF0cygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYWxsU3RhdHMpIHtcbiAgICAgIHZhciByZXN1bHRzID0gbmV3IE1hcCgpO1xuICAgICAgYWxsU3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0cykge1xuICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uKHN0YXQpIHtcbiAgICAgICAgICByZXN1bHRzLnNldChzdGF0LmlkLCBzdGF0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIGZpeCBsb3ctbGV2ZWwgc3RhdCBuYW1lcyBhbmQgcmV0dXJuIE1hcCBpbnN0ZWFkIG9mIG9iamVjdC5cbiAgdmFyIG9ydGNPYmplY3RzID0gWydSVENSdHBTZW5kZXInLCAnUlRDUnRwUmVjZWl2ZXInLCAnUlRDSWNlR2F0aGVyZXInLFxuICAgICdSVENJY2VUcmFuc3BvcnQnLCAnUlRDRHRsc1RyYW5zcG9ydCddO1xuICBvcnRjT2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uKG9ydGNPYmplY3ROYW1lKSB7XG4gICAgdmFyIG9iaiA9IHdpbmRvd1tvcnRjT2JqZWN0TmFtZV07XG4gICAgaWYgKG9iaiAmJiBvYmoucHJvdG90eXBlICYmIG9iai5wcm90b3R5cGUuZ2V0U3RhdHMpIHtcbiAgICAgIHZhciBuYXRpdmVHZXRzdGF0cyA9IG9iai5wcm90b3R5cGUuZ2V0U3RhdHM7XG4gICAgICBvYmoucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVHZXRzdGF0cy5hcHBseSh0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbihuYXRpdmVTdGF0cykge1xuICAgICAgICAgIHZhciBtYXBTdGF0cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICBPYmplY3Qua2V5cyhuYXRpdmVTdGF0cykuZm9yRWFjaChmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgbmF0aXZlU3RhdHNbaWRdLnR5cGUgPSBmaXhTdGF0c1R5cGUobmF0aXZlU3RhdHNbaWRdKTtcbiAgICAgICAgICAgIG1hcFN0YXRzLnNldChpZCwgbmF0aXZlU3RhdHNbaWRdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gbWFwU3RhdHM7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGxlZ2FjeSBjYWxsYmFjayBzaGltcy4gU2hvdWxkIGJlIG1vdmVkIHRvIGFkYXB0ZXIuanMgc29tZSBkYXlzLlxuICB2YXIgbWV0aG9kcyA9IFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ107XG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgICAgdHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHsgLy8gbGVnYWN5XG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgW2FyZ3VtZW50c1syXV0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIFtkZXNjcmlwdGlvbl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgW2Vycm9yXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcblxuICBtZXRob2RzID0gWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddO1xuICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICAgIHR5cGVvZiBhcmdzWzJdID09PSAnZnVuY3Rpb24nKSB7IC8vIGxlZ2FjeVxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMl0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMl0uYXBwbHkobnVsbCwgW2Vycm9yXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBnZXRTdGF0cyBpcyBzcGVjaWFsLiBJdCBkb2Vzbid0IGhhdmUgYSBzcGVjIGxlZ2FjeSBtZXRob2QgeWV0IHdlIHN1cHBvcnRcbiAgLy8gZ2V0U3RhdHMoc29tZXRoaW5nLCBjYikgd2l0aG91dCBlcnJvciBjYWxsYmFja3MuXG4gIFsnZ2V0U3RhdHMnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBSVENQZWVyQ29ubmVjdGlvbjtcbn07XG4iLCAiLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltR2V0VXNlck1lZGlhKHdpbmRvdykge1xuICBjb25zdCBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcblxuICBjb25zdCBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB7UGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJ31bZS5uYW1lXSB8fCBlLm5hbWUsXG4gICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UsXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnQsXG4gICAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIC8vIGdldFVzZXJNZWRpYSBlcnJvciBzaGltLlxuICBjb25zdCBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcbiAgICByZXR1cm4gb3JpZ0dldFVzZXJNZWRpYShjKS5jYXRjaChlID0+IFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpKTtcbiAgfTtcbn1cbiIsICIvKlxuICogIENvcHlyaWdodCAoYykgMjAxOCBUaGUgYWRhcHRlci5qcyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltR2V0RGlzcGxheU1lZGlhKHdpbmRvdykge1xuICBpZiAoISgnZ2V0RGlzcGxheU1lZGlhJyBpbiB3aW5kb3cubmF2aWdhdG9yKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoISh3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmXG4gICAgJ2dldERpc3BsYXlNZWRpYScgaW4gd2luZG93Lm5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgd2luZG93Lm5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0RGlzcGxheU1lZGlhID1cbiAgICB3aW5kb3cubmF2aWdhdG9yLmdldERpc3BsYXlNZWRpYS5iaW5kKHdpbmRvdy5uYXZpZ2F0b3IpO1xufVxuIiwgIi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7ZmlsdGVySWNlU2VydmVyc30gZnJvbSAnLi9maWx0ZXJpY2VzZXJ2ZXJzJztcbmltcG9ydCBzaGltUlRDUGVlckNvbm5lY3Rpb24gZnJvbSAncnRjcGVlcmNvbm5lY3Rpb24tc2hpbSc7XG5cbmV4cG9ydCB7c2hpbUdldFVzZXJNZWRpYX0gZnJvbSAnLi9nZXR1c2VybWVkaWEnO1xuZXhwb3J0IHtzaGltR2V0RGlzcGxheU1lZGlhfSBmcm9tICcuL2dldGRpc3BsYXltZWRpYSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltUGVlckNvbm5lY3Rpb24od2luZG93LCBicm93c2VyRGV0YWlscykge1xuICBpZiAod2luZG93LlJUQ0ljZUdhdGhlcmVyKSB7XG4gICAgaWYgKCF3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKSB7XG4gICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24gUlRDSWNlQ2FuZGlkYXRlKGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pIHtcbiAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24gPSBmdW5jdGlvbiBSVENTZXNzaW9uRGVzY3JpcHRpb24oYXJncykge1xuICAgICAgICByZXR1cm4gYXJncztcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIHRoaXMgYWRkcyBhbiBhZGRpdGlvbmFsIGV2ZW50IGxpc3RlbmVyIHRvIE1lZGlhU3RyYWNrVHJhY2sgdGhhdCBzaWduYWxzXG4gICAgLy8gd2hlbiBhIHRyYWNrcyBlbmFibGVkIHByb3BlcnR5IHdhcyBjaGFuZ2VkLiBXb3JrYXJvdW5kIGZvciBhIGJ1ZyBpblxuICAgIC8vIGFkZFN0cmVhbSwgc2VlIGJlbG93LiBObyBsb25nZXIgcmVxdWlyZWQgaW4gMTUwMjUrXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAxNTAyNSkge1xuICAgICAgY29uc3Qgb3JpZ01TVEVuYWJsZWQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuICAgICAgICAgIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZSwgJ2VuYWJsZWQnKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUsICdlbmFibGVkJywge1xuICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICBvcmlnTVNURW5hYmxlZC5zZXQuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgY29uc3QgZXYgPSBuZXcgRXZlbnQoJ2VuYWJsZWQnKTtcbiAgICAgICAgICBldi5lbmFibGVkID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gT1JUQyBkZWZpbmVzIHRoZSBEVE1GIHNlbmRlciBhIGJpdCBkaWZmZXJlbnQuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93M2Mvb3J0Yy9pc3N1ZXMvNzE0XG4gIGlmICh3aW5kb3cuUlRDUnRwU2VuZGVyICYmICEoJ2R0bWYnIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSwgJ2R0bWYnLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy50cmFjay5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICB0aGlzLl9kdG1mID0gbmV3IHdpbmRvdy5SVENEdG1mU2VuZGVyKHRoaXMpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50cmFjay5raW5kID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgLy8gRWRnZSBjdXJyZW50bHkgb25seSBpbXBsZW1lbnRzIHRoZSBSVENEdG1mU2VuZGVyLCBub3QgdGhlXG4gIC8vIFJUQ0RUTUZTZW5kZXIgYWxpYXMuIFNlZSBodHRwOi8vZHJhZnQub3J0Yy5vcmcvI3J0Y2R0bWZzZW5kZXIyKlxuICBpZiAod2luZG93LlJUQ0R0bWZTZW5kZXIgJiYgIXdpbmRvdy5SVENEVE1GU2VuZGVyKSB7XG4gICAgd2luZG93LlJUQ0RUTUZTZW5kZXIgPSB3aW5kb3cuUlRDRHRtZlNlbmRlcjtcbiAgfVxuXG4gIGNvbnN0IFJUQ1BlZXJDb25uZWN0aW9uU2hpbSA9IHNoaW1SVENQZWVyQ29ubmVjdGlvbih3aW5kb3csXG4gICAgICBicm93c2VyRGV0YWlscy52ZXJzaW9uKTtcbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24gUlRDUGVlckNvbm5lY3Rpb24oY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZyAmJiBjb25maWcuaWNlU2VydmVycykge1xuICAgICAgY29uZmlnLmljZVNlcnZlcnMgPSBmaWx0ZXJJY2VTZXJ2ZXJzKGNvbmZpZy5pY2VTZXJ2ZXJzLFxuICAgICAgICBicm93c2VyRGV0YWlscy52ZXJzaW9uKTtcbiAgICAgIHV0aWxzLmxvZygnSUNFIHNlcnZlcnMgYWZ0ZXIgZmlsdGVyaW5nOicsIGNvbmZpZy5pY2VTZXJ2ZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSVENQZWVyQ29ubmVjdGlvblNoaW0oY29uZmlnKTtcbiAgfTtcbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9IFJUQ1BlZXJDb25uZWN0aW9uU2hpbS5wcm90b3R5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltUmVwbGFjZVRyYWNrKHdpbmRvdykge1xuICAvLyBPUlRDIGhhcyByZXBsYWNlVHJhY2sgLS0gaHR0cHM6Ly9naXRodWIuY29tL3czYy9vcnRjL2lzc3Vlcy82MTRcbiAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiZcbiAgICAgICEoJ3JlcGxhY2VUcmFjaycgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XG4gICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUucmVwbGFjZVRyYWNrID1cbiAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUuc2V0VHJhY2s7XG4gIH1cbn1cbiIsICIvKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbi8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltR2V0VXNlck1lZGlhKHdpbmRvdywgYnJvd3NlckRldGFpbHMpIHtcbiAgY29uc3QgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG4gIGNvbnN0IE1lZGlhU3RyZWFtVHJhY2sgPSB3aW5kb3cgJiYgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2s7XG5cbiAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICAvLyBSZXBsYWNlIEZpcmVmb3ggNDQrJ3MgZGVwcmVjYXRpb24gd2FybmluZyB3aXRoIHVucHJlZml4ZWQgdmVyc2lvbi5cbiAgICB1dGlscy5kZXByZWNhdGVkKCduYXZpZ2F0b3IuZ2V0VXNlck1lZGlhJyxcbiAgICAgICAgJ25hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhJyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpLnRoZW4ob25TdWNjZXNzLCBvbkVycm9yKTtcbiAgfTtcblxuICBpZiAoIShicm93c2VyRGV0YWlscy52ZXJzaW9uID4gNTUgJiZcbiAgICAgICdhdXRvR2FpbkNvbnRyb2wnIGluIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKSkpIHtcbiAgICBjb25zdCByZW1hcCA9IGZ1bmN0aW9uKG9iaiwgYSwgYikge1xuICAgICAgaWYgKGEgaW4gb2JqICYmICEoYiBpbiBvYmopKSB7XG4gICAgICAgIG9ialtiXSA9IG9ialthXTtcbiAgICAgICAgZGVsZXRlIG9ialthXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgbmF0aXZlR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XG4gICAgICBpZiAodHlwZW9mIGMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBjLmF1ZGlvID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjKSk7XG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdhdXRvR2FpbkNvbnRyb2wnLCAnbW96QXV0b0dhaW5Db250cm9sJyk7XG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdub2lzZVN1cHByZXNzaW9uJywgJ21vek5vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVHZXRVc2VyTWVkaWEoYyk7XG4gICAgfTtcblxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzKSB7XG4gICAgICBjb25zdCBuYXRpdmVHZXRTZXR0aW5ncyA9IE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzO1xuICAgICAgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3Qgb2JqID0gbmF0aXZlR2V0U2V0dGluZ3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgcmVtYXAob2JqLCAnbW96QXV0b0dhaW5Db250cm9sJywgJ2F1dG9HYWluQ29udHJvbCcpO1xuICAgICAgICByZW1hcChvYmosICdtb3pOb2lzZVN1cHByZXNzaW9uJywgJ25vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKE1lZGlhU3RyZWFtVHJhY2sgJiYgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50cykge1xuICAgICAgY29uc3QgbmF0aXZlQXBwbHlDb25zdHJhaW50cyA9XG4gICAgICAgIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHM7XG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzID0gZnVuY3Rpb24oYykge1xuICAgICAgICBpZiAodGhpcy5raW5kID09PSAnYXVkaW8nICYmIHR5cGVvZiBjID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGMpKTtcbiAgICAgICAgICByZW1hcChjLCAnYXV0b0dhaW5Db250cm9sJywgJ21vekF1dG9HYWluQ29udHJvbCcpO1xuICAgICAgICAgIHJlbWFwKGMsICdub2lzZVN1cHByZXNzaW9uJywgJ21vek5vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF0aXZlQXBwbHlDb25zdHJhaW50cy5hcHBseSh0aGlzLCBbY10pO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cbiIsICIvKlxuICogIENvcHlyaWdodCAoYykgMjAxOCBUaGUgYWRhcHRlci5qcyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4vKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1HZXREaXNwbGF5TWVkaWEod2luZG93LCBwcmVmZXJyZWRNZWRpYVNvdXJjZSkge1xuICBpZiAod2luZG93Lm5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcbiAgICAnZ2V0RGlzcGxheU1lZGlhJyBpbiB3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoISh3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgd2luZG93Lm5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0RGlzcGxheU1lZGlhID1cbiAgICBmdW5jdGlvbiBnZXREaXNwbGF5TWVkaWEoY29uc3RyYWludHMpIHtcbiAgICAgIGlmICghKGNvbnN0cmFpbnRzICYmIGNvbnN0cmFpbnRzLnZpZGVvKSkge1xuICAgICAgICBjb25zdCBlcnIgPSBuZXcgRE9NRXhjZXB0aW9uKCdnZXREaXNwbGF5TWVkaWEgd2l0aG91dCB2aWRlbyAnICtcbiAgICAgICAgICAgICdjb25zdHJhaW50cyBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgZXJyLm5hbWUgPSAnTm90Rm91bmRFcnJvcic7XG4gICAgICAgIC8vIGZyb20gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLURPTUV4Y2VwdGlvbi1lcnJvci1uYW1lc1xuICAgICAgICBlcnIuY29kZSA9IDg7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnN0cmFpbnRzLnZpZGVvID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0ge21lZGlhU291cmNlOiBwcmVmZXJyZWRNZWRpYVNvdXJjZX07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdHJhaW50cy52aWRlby5tZWRpYVNvdXJjZSA9IHByZWZlcnJlZE1lZGlhU291cmNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cyk7XG4gICAgfTtcbn1cbiIsICIvKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbi8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi91dGlscyc7XG5leHBvcnQge3NoaW1HZXRVc2VyTWVkaWF9IGZyb20gJy4vZ2V0dXNlcm1lZGlhJztcbmV4cG9ydCB7c2hpbUdldERpc3BsYXlNZWRpYX0gZnJvbSAnLi9nZXRkaXNwbGF5bWVkaWEnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hpbU9uVHJhY2sod2luZG93KSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDVHJhY2tFdmVudCAmJlxuICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxuICAgICAgISgndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCAndHJhbnNjZWl2ZXInLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB7cmVjZWl2ZXI6IHRoaXMucmVjZWl2ZXJ9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltUGVlckNvbm5lY3Rpb24od2luZG93LCBicm93c2VyRGV0YWlscykge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHxcbiAgICAgICEod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8IHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbikpIHtcbiAgICByZXR1cm47IC8vIHByb2JhYmx5IG1lZGlhLnBlZXJjb25uZWN0aW9uLmVuYWJsZWQ9ZmFsc2UgaW4gYWJvdXQ6Y29uZmlnXG4gIH1cbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgLy8gdmVyeSBiYXNpYyBzdXBwb3J0IGZvciBvbGQgdmVyc2lvbnMuXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uO1xuICB9XG5cbiAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1Mykge1xuICAgIC8vIHNoaW0gYXdheSBuZWVkIGZvciBvYnNvbGV0ZSBSVENJY2VDYW5kaWRhdGUvUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLlxuICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICAgICAgY29uc3QgbWV0aG9kT2JqID0ge1ttZXRob2RdKCkge1xuICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gbmV3ICgobWV0aG9kID09PSAnYWRkSWNlQ2FuZGlkYXRlJykgP1xuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfX07XG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gbWV0aG9kT2JqW21ldGhvZF07XG4gICAgICAgIH0pO1xuICB9XG5cbiAgY29uc3QgbW9kZXJuU3RhdHNUeXBlcyA9IHtcbiAgICBpbmJvdW5kcnRwOiAnaW5ib3VuZC1ydHAnLFxuICAgIG91dGJvdW5kcnRwOiAnb3V0Ym91bmQtcnRwJyxcbiAgICBjYW5kaWRhdGVwYWlyOiAnY2FuZGlkYXRlLXBhaXInLFxuICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcbiAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xuICB9O1xuXG4gIGNvbnN0IG5hdGl2ZUdldFN0YXRzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cztcbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uIGdldFN0YXRzKCkge1xuICAgIGNvbnN0IFtzZWxlY3Rvciwgb25TdWNjLCBvbkVycl0gPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5hdGl2ZUdldFN0YXRzLmFwcGx5KHRoaXMsIFtzZWxlY3RvciB8fCBudWxsXSlcbiAgICAgIC50aGVuKHN0YXRzID0+IHtcbiAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1MyAmJiAhb25TdWNjKSB7XG4gICAgICAgICAgLy8gU2hpbSBvbmx5IHByb21pc2UgZ2V0U3RhdHMgd2l0aCBzcGVjLWh5cGhlbnMgaW4gdHlwZSBuYW1lc1xuICAgICAgICAgIC8vIExlYXZlIGNhbGxiYWNrIHZlcnNpb24gYWxvbmU7IG1pc2Mgb2xkIHVzZXMgb2YgZm9yRWFjaCBiZWZvcmUgTWFwXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0YXRzLmZvckVhY2goc3RhdCA9PiB7XG4gICAgICAgICAgICAgIHN0YXQudHlwZSA9IG1vZGVyblN0YXRzVHlwZXNbc3RhdC50eXBlXSB8fCBzdGF0LnR5cGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5uYW1lICE9PSAnVHlwZUVycm9yJykge1xuICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQXZvaWQgVHlwZUVycm9yOiBcInR5cGVcIiBpcyByZWFkLW9ubHksIGluIG9sZCB2ZXJzaW9ucy4gMzQtNDNpc2hcbiAgICAgICAgICAgIHN0YXRzLmZvckVhY2goKHN0YXQsIGkpID0+IHtcbiAgICAgICAgICAgICAgc3RhdHMuc2V0KGksIE9iamVjdC5hc3NpZ24oe30sIHN0YXQsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlXG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdHM7XG4gICAgICB9KVxuICAgICAgLnRoZW4ob25TdWNjLCBvbkVycik7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltU2VuZGVyR2V0U3RhdHMod2luZG93KSB7XG4gIGlmICghKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgd2luZG93LlJUQ1J0cFNlbmRlcikpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiYgJ2dldFN0YXRzJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBvcmlnR2V0U2VuZGVycyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycztcbiAgaWYgKG9yaWdHZXRTZW5kZXJzKSB7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24gZ2V0U2VuZGVycygpIHtcbiAgICAgIGNvbnN0IHNlbmRlcnMgPSBvcmlnR2V0U2VuZGVycy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICBzZW5kZXJzLmZvckVhY2goc2VuZGVyID0+IHNlbmRlci5fcGMgPSB0aGlzKTtcbiAgICAgIHJldHVybiBzZW5kZXJzO1xuICAgIH07XG4gIH1cblxuICBjb25zdCBvcmlnQWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xuICBpZiAob3JpZ0FkZFRyYWNrKSB7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uIGFkZFRyYWNrKCkge1xuICAgICAgY29uc3Qgc2VuZGVyID0gb3JpZ0FkZFRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBzZW5kZXIuX3BjID0gdGhpcztcbiAgICAgIHJldHVybiBzZW5kZXI7XG4gICAgfTtcbiAgfVxuICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uIGdldFN0YXRzKCkge1xuICAgIHJldHVybiB0aGlzLnRyYWNrID8gdGhpcy5fcGMuZ2V0U3RhdHModGhpcy50cmFjaykgOlxuICAgICAgICBQcm9taXNlLnJlc29sdmUobmV3IE1hcCgpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1SZWNlaXZlckdldFN0YXRzKHdpbmRvdykge1xuICBpZiAoISh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgIHdpbmRvdy5SVENSdHBTZW5kZXIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh3aW5kb3cuUlRDUnRwU2VuZGVyICYmICdnZXRTdGF0cycgaW4gd2luZG93LlJUQ1J0cFJlY2VpdmVyLnByb3RvdHlwZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBvcmlnR2V0UmVjZWl2ZXJzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnM7XG4gIGlmIChvcmlnR2V0UmVjZWl2ZXJzKSB7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMgPSBmdW5jdGlvbiBnZXRSZWNlaXZlcnMoKSB7XG4gICAgICBjb25zdCByZWNlaXZlcnMgPSBvcmlnR2V0UmVjZWl2ZXJzLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgIHJlY2VpdmVycy5mb3JFYWNoKHJlY2VpdmVyID0+IHJlY2VpdmVyLl9wYyA9IHRoaXMpO1xuICAgICAgcmV0dXJuIHJlY2VpdmVycztcbiAgICB9O1xuICB9XG4gIHV0aWxzLndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgJ3RyYWNrJywgZSA9PiB7XG4gICAgZS5yZWNlaXZlci5fcGMgPSBlLnNyY0VsZW1lbnQ7XG4gICAgcmV0dXJuIGU7XG4gIH0pO1xuICB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24gZ2V0U3RhdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BjLmdldFN0YXRzKHRoaXMudHJhY2spO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbVJlbW92ZVN0cmVhbSh3aW5kb3cpIHtcbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPVxuICAgIGZ1bmN0aW9uIHJlbW92ZVN0cmVhbShzdHJlYW0pIHtcbiAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ3JlbW92ZVN0cmVhbScsICdyZW1vdmVUcmFjaycpO1xuICAgICAgdGhpcy5nZXRTZW5kZXJzKCkuZm9yRWFjaChzZW5kZXIgPT4ge1xuICAgICAgICBpZiAoc2VuZGVyLnRyYWNrICYmIHN0cmVhbS5nZXRUcmFja3MoKS5pbmNsdWRlcyhzZW5kZXIudHJhY2spKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVUcmFjayhzZW5kZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbVJUQ0RhdGFDaGFubmVsKHdpbmRvdykge1xuICAvLyByZW5hbWUgRGF0YUNoYW5uZWwgdG8gUlRDRGF0YUNoYW5uZWwgKG5hdGl2ZSBmaXggaW4gRkY2MCk6XG4gIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTExNzM4NTFcbiAgaWYgKHdpbmRvdy5EYXRhQ2hhbm5lbCAmJiAhd2luZG93LlJUQ0RhdGFDaGFubmVsKSB7XG4gICAgd2luZG93LlJUQ0RhdGFDaGFubmVsID0gd2luZG93LkRhdGFDaGFubmVsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltQWRkVHJhbnNjZWl2ZXIod2luZG93KSB7XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJydGNIYWNrcy9hZGFwdGVyL2lzc3Vlcy85OTgjaXNzdWVjb21tZW50LTUxNjkyMTY0N1xuICAvLyBGaXJlZm94IGlnbm9yZXMgdGhlIGluaXQgc2VuZEVuY29kaW5ncyBvcHRpb25zIHBhc3NlZCB0byBhZGRUcmFuc2NlaXZlclxuICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzk2OTE4XG4gIGlmICghKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgb3JpZ0FkZFRyYW5zY2VpdmVyID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFuc2NlaXZlcjtcbiAgaWYgKG9yaWdBZGRUcmFuc2NlaXZlcikge1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhbnNjZWl2ZXIgPVxuICAgICAgZnVuY3Rpb24gYWRkVHJhbnNjZWl2ZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyc1Byb21pc2VzID0gW107XG4gICAgICAgIGNvbnN0IGluaXRQYXJhbWV0ZXJzID0gYXJndW1lbnRzWzFdO1xuICAgICAgICBjb25zdCBzaG91bGRQZXJmb3JtQ2hlY2sgPSBpbml0UGFyYW1ldGVycyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZW5kRW5jb2RpbmdzJyBpbiBpbml0UGFyYW1ldGVycztcbiAgICAgICAgaWYgKHNob3VsZFBlcmZvcm1DaGVjaykge1xuICAgICAgICAgIC8vIElmIHNlbmRFbmNvZGluZ3MgcGFyYW1zIGFyZSBwcm92aWRlZCwgdmFsaWRhdGUgZ3JhbW1hclxuICAgICAgICAgIGluaXRQYXJhbWV0ZXJzLnNlbmRFbmNvZGluZ3MuZm9yRWFjaCgoZW5jb2RpbmdQYXJhbSkgPT4ge1xuICAgICAgICAgICAgaWYgKCdyaWQnIGluIGVuY29kaW5nUGFyYW0pIHtcbiAgICAgICAgICAgICAgY29uc3QgcmlkUmVnZXggPSAvXlthLXowLTldezAsMTZ9JC9pO1xuICAgICAgICAgICAgICBpZiAoIXJpZFJlZ2V4LnRlc3QoZW5jb2RpbmdQYXJhbS5yaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBSSUQgdmFsdWUgcHJvdmlkZWQuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgnc2NhbGVSZXNvbHV0aW9uRG93bkJ5JyBpbiBlbmNvZGluZ1BhcmFtKSB7XG4gICAgICAgICAgICAgIGlmICghKHBhcnNlRmxvYXQoZW5jb2RpbmdQYXJhbS5zY2FsZVJlc29sdXRpb25Eb3duQnkpID49IDEuMCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc2NhbGVfcmVzb2x1dGlvbl9kb3duX2J5IG11c3QgYmUgPj0gMS4wJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgnbWF4RnJhbWVyYXRlJyBpbiBlbmNvZGluZ1BhcmFtKSB7XG4gICAgICAgICAgICAgIGlmICghKHBhcnNlRmxvYXQoZW5jb2RpbmdQYXJhbS5tYXhGcmFtZXJhdGUpID49IDApKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ21heF9mcmFtZXJhdGUgbXVzdCBiZSA+PSAwLjAnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zY2VpdmVyID0gb3JpZ0FkZFRyYW5zY2VpdmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGlmIChzaG91bGRQZXJmb3JtQ2hlY2spIHtcbiAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgaW5pdCBvcHRpb25zIHdlcmUgYXBwbGllZC4gSWYgbm90IHdlIGRvIHRoaXMgaW4gYW5cbiAgICAgICAgICAvLyBhc3luY2hyb25vdXMgd2F5IGFuZCBzYXZlIHRoZSBwcm9taXNlIHJlZmVyZW5jZSBpbiBhIGdsb2JhbCBvYmplY3QuXG4gICAgICAgICAgLy8gVGhpcyBpcyBhbiB1Z2x5IGhhY2ssIGJ1dCBhdCB0aGUgc2FtZSB0aW1lIGlzIHdheSBtb3JlIHJvYnVzdCB0aGFuXG4gICAgICAgICAgLy8gY2hlY2tpbmcgdGhlIHNlbmRlciBwYXJhbWV0ZXJzIGJlZm9yZSBhbmQgYWZ0ZXIgdGhlIGNyZWF0ZU9mZmVyXG4gICAgICAgICAgLy8gQWxzbyBub3RlIHRoYXQgYWZ0ZXIgdGhlIGNyZWF0ZW9mZmVyIHdlIGFyZSBub3QgMTAwJSBzdXJlIHRoYXRcbiAgICAgICAgICAvLyB0aGUgcGFyYW1zIHdlcmUgYXN5bmNocm9ub3VzbHkgYXBwbGllZCBzbyB3ZSBtaWdodCBtaXNzIHRoZVxuICAgICAgICAgIC8vIG9wcG9ydHVuaXR5IHRvIHJlY3JlYXRlIG9mZmVyLlxuICAgICAgICAgIGNvbnN0IHtzZW5kZXJ9ID0gdHJhbnNjZWl2ZXI7XG4gICAgICAgICAgY29uc3QgcGFyYW1zID0gc2VuZGVyLmdldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgICBpZiAoISgnZW5jb2RpbmdzJyBpbiBwYXJhbXMpIHx8XG4gICAgICAgICAgICAgIC8vIEF2b2lkIGJlaW5nIGZvb2xlZCBieSBwYXRjaGVkIGdldFBhcmFtZXRlcnMoKSBiZWxvdy5cbiAgICAgICAgICAgICAgKHBhcmFtcy5lbmNvZGluZ3MubGVuZ3RoID09PSAxICYmXG4gICAgICAgICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXMuZW5jb2RpbmdzWzBdKS5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICBwYXJhbXMuZW5jb2RpbmdzID0gaW5pdFBhcmFtZXRlcnMuc2VuZEVuY29kaW5ncztcbiAgICAgICAgICAgIHNlbmRlci5zZW5kRW5jb2RpbmdzID0gaW5pdFBhcmFtZXRlcnMuc2VuZEVuY29kaW5ncztcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyc1Byb21pc2VzLnB1c2goc2VuZGVyLnNldFBhcmFtZXRlcnMocGFyYW1zKVxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNlbmRlci5zZW5kRW5jb2RpbmdzO1xuICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNlbmRlci5zZW5kRW5jb2RpbmdzO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyO1xuICAgICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUdldFBhcmFtZXRlcnMod2luZG93KSB7XG4gIGlmICghKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENSdHBTZW5kZXIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IG9yaWdHZXRQYXJhbWV0ZXJzID0gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUuZ2V0UGFyYW1ldGVycztcbiAgaWYgKG9yaWdHZXRQYXJhbWV0ZXJzKSB7XG4gICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUuZ2V0UGFyYW1ldGVycyA9XG4gICAgICBmdW5jdGlvbiBnZXRQYXJhbWV0ZXJzKCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBvcmlnR2V0UGFyYW1ldGVycy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBpZiAoISgnZW5jb2RpbmdzJyBpbiBwYXJhbXMpKSB7XG4gICAgICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IFtdLmNvbmNhdCh0aGlzLnNlbmRFbmNvZGluZ3MgfHwgW3t9XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1DcmVhdGVPZmZlcih3aW5kb3cpIHtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnJ0Y0hhY2tzL2FkYXB0ZXIvaXNzdWVzLzk5OCNpc3N1ZWNvbW1lbnQtNTE2OTIxNjQ3XG4gIC8vIEZpcmVmb3ggaWdub3JlcyB0aGUgaW5pdCBzZW5kRW5jb2RpbmdzIG9wdGlvbnMgcGFzc2VkIHRvIGFkZFRyYW5zY2VpdmVyXG4gIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEzOTY5MThcbiAgaWYgKCEodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBvcmlnQ3JlYXRlT2ZmZXIgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyO1xuICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24gY3JlYXRlT2ZmZXIoKSB7XG4gICAgaWYgKHRoaXMuc2V0UGFyYW1ldGVyc1Byb21pc2VzICYmIHRoaXMuc2V0UGFyYW1ldGVyc1Byb21pc2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuc2V0UGFyYW1ldGVyc1Byb21pc2VzKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gb3JpZ0NyZWF0ZU9mZmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcnNQcm9taXNlcyA9IFtdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBvcmlnQ3JlYXRlT2ZmZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1DcmVhdGVBbnN3ZXIod2luZG93KSB7XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJydGNIYWNrcy9hZGFwdGVyL2lzc3Vlcy85OTgjaXNzdWVjb21tZW50LTUxNjkyMTY0N1xuICAvLyBGaXJlZm94IGlnbm9yZXMgdGhlIGluaXQgc2VuZEVuY29kaW5ncyBvcHRpb25zIHBhc3NlZCB0byBhZGRUcmFuc2NlaXZlclxuICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzk2OTE4XG4gIGlmICghKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgb3JpZ0NyZWF0ZUFuc3dlciA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQW5zd2VyO1xuICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUFuc3dlciA9IGZ1bmN0aW9uIGNyZWF0ZUFuc3dlcigpIHtcbiAgICBpZiAodGhpcy5zZXRQYXJhbWV0ZXJzUHJvbWlzZXMgJiYgdGhpcy5zZXRQYXJhbWV0ZXJzUHJvbWlzZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5zZXRQYXJhbWV0ZXJzUHJvbWlzZXMpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiBvcmlnQ3JlYXRlQW5zd2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcnNQcm9taXNlcyA9IFtdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBvcmlnQ3JlYXRlQW5zd2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG4iLCAiLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4ndXNlIHN0cmljdCc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltTG9jYWxTdHJlYW1zQVBJKHdpbmRvdykge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoISgnZ2V0TG9jYWxTdHJlYW1zJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID1cbiAgICAgIGZ1bmN0aW9uIGdldExvY2FsU3RyZWFtcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxTdHJlYW1zO1xuICAgICAgfTtcbiAgfVxuICBpZiAoISgnYWRkU3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgIGNvbnN0IF9hZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbiBhZGRTdHJlYW0oc3RyZWFtKSB7XG4gICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zLmluY2x1ZGVzKHN0cmVhbSkpIHtcbiAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgIH1cbiAgICAgIC8vIFRyeSB0byBlbXVsYXRlIENocm9tZSdzIGJlaGF2aW91ciBvZiBhZGRpbmcgaW4gYXVkaW8tdmlkZW8gb3JkZXIuXG4gICAgICAvLyBTYWZhcmkgb3JkZXJzIGJ5IHRyYWNrIGlkLlxuICAgICAgc3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkuZm9yRWFjaCh0cmFjayA9PiBfYWRkVHJhY2suY2FsbCh0aGlzLCB0cmFjayxcbiAgICAgICAgc3RyZWFtKSk7XG4gICAgICBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IF9hZGRUcmFjay5jYWxsKHRoaXMsIHRyYWNrLFxuICAgICAgICBzdHJlYW0pKTtcbiAgICB9O1xuXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9XG4gICAgICBmdW5jdGlvbiBhZGRUcmFjayh0cmFjaywgLi4uc3RyZWFtcykge1xuICAgICAgICBpZiAoc3RyZWFtcykge1xuICAgICAgICAgIHN0cmVhbXMuZm9yRWFjaCgoc3RyZWFtKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbc3RyZWFtXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcy5pbmNsdWRlcyhzdHJlYW0pKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9hZGRUcmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgfVxuICBpZiAoISgncmVtb3ZlU3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID1cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZVN0cmVhbShzdHJlYW0pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGNvbnN0IHRyYWNrcyA9IHN0cmVhbS5nZXRUcmFja3MoKTtcbiAgICAgICAgdGhpcy5nZXRTZW5kZXJzKCkuZm9yRWFjaChzZW5kZXIgPT4ge1xuICAgICAgICAgIGlmICh0cmFja3MuaW5jbHVkZXMoc2VuZGVyLnRyYWNrKSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVUcmFjayhzZW5kZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltUmVtb3RlU3RyZWFtc0FQSSh3aW5kb3cpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCEoJ2dldFJlbW90ZVN0cmVhbXMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID1cbiAgICAgIGZ1bmN0aW9uIGdldFJlbW90ZVN0cmVhbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdGVTdHJlYW1zID8gdGhpcy5fcmVtb3RlU3RyZWFtcyA6IFtdO1xuICAgICAgfTtcbiAgfVxuICBpZiAoISgnb25hZGRzdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbmFkZHN0cmVhbScsIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uYWRkc3RyZWFtO1xuICAgICAgfSxcbiAgICAgIHNldChmKSB7XG4gICAgICAgIGlmICh0aGlzLl9vbmFkZHN0cmVhbSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0pO1xuICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbmFkZHN0cmVhbXBvbHkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0gPSBmKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29uYWRkc3RyZWFtcG9seSA9IChlKSA9PiB7XG4gICAgICAgICAgZS5zdHJlYW1zLmZvckVhY2goc3RyZWFtID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fcmVtb3RlU3RyZWFtcykge1xuICAgICAgICAgICAgICB0aGlzLl9yZW1vdGVTdHJlYW1zID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVtb3RlU3RyZWFtcy5pbmNsdWRlcyhzdHJlYW0pKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3JlbW90ZVN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ2FkZHN0cmVhbScpO1xuICAgICAgICAgICAgZXZlbnQuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3Qgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9XG4gICAgICBmdW5jdGlvbiBzZXRSZW1vdGVEZXNjcmlwdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuX29uYWRkc3RyZWFtcG9seSkge1xuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbmFkZHN0cmVhbXBvbHkgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnN0cmVhbXMuZm9yRWFjaChzdHJlYW0gPT4ge1xuICAgICAgICAgICAgICBpZiAoIXBjLl9yZW1vdGVTdHJlYW1zKSB7XG4gICAgICAgICAgICAgICAgcGMuX3JlbW90ZVN0cmVhbXMgPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocGMuX3JlbW90ZVN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGMuX3JlbW90ZVN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnYWRkc3RyZWFtJyk7XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUNhbGxiYWNrc0FQSSh3aW5kb3cpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcHJvdG90eXBlID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgY29uc3Qgb3JpZ0NyZWF0ZU9mZmVyID0gcHJvdG90eXBlLmNyZWF0ZU9mZmVyO1xuICBjb25zdCBvcmlnQ3JlYXRlQW5zd2VyID0gcHJvdG90eXBlLmNyZWF0ZUFuc3dlcjtcbiAgY29uc3Qgc2V0TG9jYWxEZXNjcmlwdGlvbiA9IHByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uO1xuICBjb25zdCBzZXRSZW1vdGVEZXNjcmlwdGlvbiA9IHByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcbiAgY29uc3QgYWRkSWNlQ2FuZGlkYXRlID0gcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcblxuICBwcm90b3R5cGUuY3JlYXRlT2ZmZXIgPVxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9mZmVyKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGggPj0gMikgPyBhcmd1bWVudHNbMl0gOiBhcmd1bWVudHNbMF07XG4gICAgICBjb25zdCBwcm9taXNlID0gb3JpZ0NyZWF0ZU9mZmVyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICBwcm90b3R5cGUuY3JlYXRlQW5zd2VyID1cbiAgICBmdW5jdGlvbiBjcmVhdGVBbnN3ZXIoc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1swXTtcbiAgICAgIGNvbnN0IHByb21pc2UgPSBvcmlnQ3JlYXRlQW5zd2VyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICBsZXQgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHNldExvY2FsRGVzY3JpcHRpb24uYXBwbHkodGhpcywgW2Rlc2NyaXB0aW9uXSk7XG4gICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcbiAgcHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSB3aXRoQ2FsbGJhY2s7XG5cbiAgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHNldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIFtkZXNjcmlwdGlvbl0pO1xuICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG4gIHByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IHdpdGhDYWxsYmFjaztcblxuICB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihjYW5kaWRhdGUsIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IGFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBbY2FuZGlkYXRlXSk7XG4gICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcbiAgcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IHdpdGhDYWxsYmFjaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1HZXRVc2VyTWVkaWEod2luZG93KSB7XG4gIGNvbnN0IG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XG4gICAgLy8gc2hpbSBub3QgbmVlZGVkIGluIFNhZmFyaSAxMi4xXG4gICAgY29uc3QgbWVkaWFEZXZpY2VzID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcztcbiAgICBjb25zdCBfZ2V0VXNlck1lZGlhID0gbWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5iaW5kKG1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSAoY29uc3RyYWludHMpID0+IHtcbiAgICAgIHJldHVybiBfZ2V0VXNlck1lZGlhKHNoaW1Db25zdHJhaW50cyhjb25zdHJhaW50cykpO1xuICAgIH07XG4gIH1cblxuICBpZiAoIW5hdmlnYXRvci5nZXRVc2VyTWVkaWEgJiYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJlxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XG4gICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uIGdldFVzZXJNZWRpYShjb25zdHJhaW50cywgY2IsIGVycmNiKSB7XG4gICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cylcbiAgICAgIC50aGVuKGNiLCBlcnJjYik7XG4gICAgfS5iaW5kKG5hdmlnYXRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1Db25zdHJhaW50cyhjb25zdHJhaW50cykge1xuICBpZiAoY29uc3RyYWludHMgJiYgY29uc3RyYWludHMudmlkZW8gIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgY29uc3RyYWludHMsXG4gICAgICB7dmlkZW86IHV0aWxzLmNvbXBhY3RPYmplY3QoY29uc3RyYWludHMudmlkZW8pfVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gY29uc3RyYWludHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltUlRDSWNlU2VydmVyVXJscyh3aW5kb3cpIHtcbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gbWlncmF0ZSBmcm9tIG5vbi1zcGVjIFJUQ0ljZVNlcnZlci51cmwgdG8gUlRDSWNlU2VydmVyLnVybHNcbiAgY29uc3QgT3JpZ1BlZXJDb25uZWN0aW9uID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uO1xuICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPVxuICAgIGZ1bmN0aW9uIFJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XG4gICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xuICAgICAgICBjb25zdCBuZXdJY2VTZXJ2ZXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBzZXJ2ZXIgPSBwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldO1xuICAgICAgICAgIGlmICghc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykgJiZcbiAgICAgICAgICAgICAgc2VydmVyLmhhc093blByb3BlcnR5KCd1cmwnKSkge1xuICAgICAgICAgICAgdXRpbHMuZGVwcmVjYXRlZCgnUlRDSWNlU2VydmVyLnVybCcsICdSVENJY2VTZXJ2ZXIudXJscycpO1xuICAgICAgICAgICAgc2VydmVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZXJ2ZXIpKTtcbiAgICAgICAgICAgIHNlcnZlci51cmxzID0gc2VydmVyLnVybDtcbiAgICAgICAgICAgIGRlbGV0ZSBzZXJ2ZXIudXJsO1xuICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHNlcnZlcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGNDb25maWcuaWNlU2VydmVycyA9IG5ld0ljZVNlcnZlcnM7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IE9yaWdQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XG4gICAgfTtcbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9IE9yaWdQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gIGlmICgnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScgaW4gT3JpZ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiBPcmlnUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlcih3aW5kb3cpIHtcbiAgLy8gQWRkIGV2ZW50LnRyYW5zY2VpdmVyIG1lbWJlciBvdmVyIGRlcHJlY2F0ZWQgZXZlbnQucmVjZWl2ZXJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENUcmFja0V2ZW50ICYmXG4gICAgICAncmVjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSAmJlxuICAgICAgISgndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCAndHJhbnNjZWl2ZXInLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB7cmVjZWl2ZXI6IHRoaXMucmVjZWl2ZXJ9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltQ3JlYXRlT2ZmZXJMZWdhY3kod2luZG93KSB7XG4gIGNvbnN0IG9yaWdDcmVhdGVPZmZlciA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXI7XG4gIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXIgPVxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9mZmVyKG9mZmVyT3B0aW9ucykge1xuICAgICAgaWYgKG9mZmVyT3B0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIHN1cHBvcnQgYml0IHZhbHVlc1xuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID1cbiAgICAgICAgICAgICEhb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW87XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXVkaW9UcmFuc2NlaXZlciA9IHRoaXMuZ2V0VHJhbnNjZWl2ZXJzKCkuZmluZCh0cmFuc2NlaXZlciA9PlxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJlY2VpdmVyLnRyYWNrLmtpbmQgPT09ICdhdWRpbycpO1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IGZhbHNlICYmIGF1ZGlvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcbiAgICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbikge1xuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignc2VuZG9ubHknKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID0gJ3NlbmRvbmx5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XG4gICAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9ICdpbmFjdGl2ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSB0cnVlICYmXG4gICAgICAgICAgICAhYXVkaW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIHRoaXMuYWRkVHJhbnNjZWl2ZXIoJ2F1ZGlvJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIHN1cHBvcnQgYml0IHZhbHVlc1xuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID1cbiAgICAgICAgICAgICEhb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW87XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmlkZW9UcmFuc2NlaXZlciA9IHRoaXMuZ2V0VHJhbnNjZWl2ZXJzKCkuZmluZCh0cmFuc2NlaXZlciA9PlxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJlY2VpdmVyLnRyYWNrLmtpbmQgPT09ICd2aWRlbycpO1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IGZhbHNlICYmIHZpZGVvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAodmlkZW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcbiAgICAgICAgICAgIGlmICh2aWRlb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbikge1xuICAgICAgICAgICAgICB2aWRlb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignc2VuZG9ubHknKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZpZGVvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID0gJ3NlbmRvbmx5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHZpZGVvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XG4gICAgICAgICAgICBpZiAodmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgdmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2aWRlb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9ICdpbmFjdGl2ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlICYmXG4gICAgICAgICAgICAhdmlkZW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIHRoaXMuYWRkVHJhbnNjZWl2ZXIoJ3ZpZGVvJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvcmlnQ3JlYXRlT2ZmZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUF1ZGlvQ29udGV4dCh3aW5kb3cpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8IHdpbmRvdy5BdWRpb0NvbnRleHQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgd2luZG93LkF1ZGlvQ29udGV4dCA9IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG59XG4iLCAiLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4vKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFNEUFV0aWxzIGZyb20gJ3NkcCc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KSB7XG4gIC8vIGZvdW5kYXRpb24gaXMgYXJiaXRyYXJpbHkgY2hvc2VuIGFzIGFuIGluZGljYXRvciBmb3IgZnVsbCBzdXBwb3J0IGZvclxuICAvLyBodHRwczovL3czYy5naXRodWIuaW8vd2VicnRjLXBjLyNydGNpY2VjYW5kaWRhdGUtaW50ZXJmYWNlXG4gIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSB8fCAod2luZG93LlJUQ0ljZUNhbmRpZGF0ZSAmJiAnZm91bmRhdGlvbicgaW5cbiAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUucHJvdG90eXBlKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZSA9IHdpbmRvdy5SVENJY2VDYW5kaWRhdGU7XG4gIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbiBSVENJY2VDYW5kaWRhdGUoYXJncykge1xuICAgIC8vIFJlbW92ZSB0aGUgYT0gd2hpY2ggc2hvdWxkbid0IGJlIHBhcnQgb2YgdGhlIGNhbmRpZGF0ZSBzdHJpbmcuXG4gICAgaWYgKHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyAmJiBhcmdzLmNhbmRpZGF0ZSAmJlxuICAgICAgICBhcmdzLmNhbmRpZGF0ZS5pbmRleE9mKCdhPScpID09PSAwKSB7XG4gICAgICBhcmdzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcmdzKSk7XG4gICAgICBhcmdzLmNhbmRpZGF0ZSA9IGFyZ3MuY2FuZGlkYXRlLnN1YnN0cigyKTtcbiAgICB9XG5cbiAgICBpZiAoYXJncy5jYW5kaWRhdGUgJiYgYXJncy5jYW5kaWRhdGUubGVuZ3RoKSB7XG4gICAgICAvLyBBdWdtZW50IHRoZSBuYXRpdmUgY2FuZGlkYXRlIHdpdGggdGhlIHBhcnNlZCBmaWVsZHMuXG4gICAgICBjb25zdCBuYXRpdmVDYW5kaWRhdGUgPSBuZXcgTmF0aXZlUlRDSWNlQ2FuZGlkYXRlKGFyZ3MpO1xuICAgICAgY29uc3QgcGFyc2VkQ2FuZGlkYXRlID0gU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoYXJncy5jYW5kaWRhdGUpO1xuICAgICAgY29uc3QgYXVnbWVudGVkQ2FuZGlkYXRlID0gT2JqZWN0LmFzc2lnbihuYXRpdmVDYW5kaWRhdGUsXG4gICAgICAgICAgcGFyc2VkQ2FuZGlkYXRlKTtcblxuICAgICAgLy8gQWRkIGEgc2VyaWFsaXplciB0aGF0IGRvZXMgbm90IHNlcmlhbGl6ZSB0aGUgZXh0cmEgYXR0cmlidXRlcy5cbiAgICAgIGF1Z21lbnRlZENhbmRpZGF0ZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2FuZGlkYXRlOiBhdWdtZW50ZWRDYW5kaWRhdGUuY2FuZGlkYXRlLFxuICAgICAgICAgIHNkcE1pZDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1pZCxcbiAgICAgICAgICBzZHBNTGluZUluZGV4OiBhdWdtZW50ZWRDYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICB1c2VybmFtZUZyYWdtZW50OiBhdWdtZW50ZWRDYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCxcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gYXVnbWVudGVkQ2FuZGlkYXRlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZShhcmdzKTtcbiAgfTtcbiAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGUgPSBOYXRpdmVSVENJY2VDYW5kaWRhdGUucHJvdG90eXBlO1xuXG4gIC8vIEhvb2sgdXAgdGhlIGF1Z21lbnRlZCBjYW5kaWRhdGUgaW4gb25pY2VjYW5kaWRhdGUgYW5kXG4gIC8vIGFkZEV2ZW50TGlzdGVuZXIoJ2ljZWNhbmRpZGF0ZScsIC4uLilcbiAgdXRpbHMud3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCAnaWNlY2FuZGlkYXRlJywgZSA9PiB7XG4gICAgaWYgKGUuY2FuZGlkYXRlKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgJ2NhbmRpZGF0ZScsIHtcbiAgICAgICAgdmFsdWU6IG5ldyB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKGUuY2FuZGlkYXRlKSxcbiAgICAgICAgd3JpdGFibGU6ICdmYWxzZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltTWF4TWVzc2FnZVNpemUod2luZG93LCBicm93c2VyRGV0YWlscykge1xuICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghKCdzY3RwJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnc2N0cCcsIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9zY3RwID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB0aGlzLl9zY3RwO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3Qgc2N0cEluRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgIGlmICghZGVzY3JpcHRpb24gfHwgIWRlc2NyaXB0aW9uLnNkcCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcbiAgICBzZWN0aW9ucy5zaGlmdCgpO1xuICAgIHJldHVybiBzZWN0aW9ucy5zb21lKG1lZGlhU2VjdGlvbiA9PiB7XG4gICAgICBjb25zdCBtTGluZSA9IFNEUFV0aWxzLnBhcnNlTUxpbmUobWVkaWFTZWN0aW9uKTtcbiAgICAgIHJldHVybiBtTGluZSAmJiBtTGluZS5raW5kID09PSAnYXBwbGljYXRpb24nXG4gICAgICAgICAgJiYgbUxpbmUucHJvdG9jb2wuaW5kZXhPZignU0NUUCcpICE9PSAtMTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBnZXRSZW1vdGVGaXJlZm94VmVyc2lvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgLy8gVE9ETzogSXMgdGhlcmUgYSBiZXR0ZXIgc29sdXRpb24gZm9yIGRldGVjdGluZyBGaXJlZm94P1xuICAgIGNvbnN0IG1hdGNoID0gZGVzY3JpcHRpb24uc2RwLm1hdGNoKC9tb3ppbGxhLi4uVEhJU19JU19TRFBBUlRBLShcXGQrKS8pO1xuICAgIGlmIChtYXRjaCA9PT0gbnVsbCB8fCBtYXRjaC5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGNvbnN0IHZlcnNpb24gPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xuICAgIC8vIFRlc3QgZm9yIE5hTiAoeWVzLCB0aGlzIGlzIHVnbHkpXG4gICAgcmV0dXJuIHZlcnNpb24gIT09IHZlcnNpb24gPyAtMSA6IHZlcnNpb247XG4gIH07XG5cbiAgY29uc3QgZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24ocmVtb3RlSXNGaXJlZm94KSB7XG4gICAgLy8gRXZlcnkgaW1wbGVtZW50YXRpb24gd2Uga25vdyBjYW4gc2VuZCBhdCBsZWFzdCA2NCBLaUIuXG4gICAgLy8gTm90ZTogQWx0aG91Z2ggQ2hyb21lIGlzIHRlY2huaWNhbGx5IGFibGUgdG8gc2VuZCB1cCB0byAyNTYgS2lCLCB0aGVcbiAgICAvLyAgICAgICBkYXRhIGRvZXMgbm90IHJlYWNoIHRoZSBvdGhlciBwZWVyIHJlbGlhYmx5LlxuICAgIC8vICAgICAgIFNlZTogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTg0MTlcbiAgICBsZXQgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gNjU1MzY7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94Jykge1xuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1Nykge1xuICAgICAgICBpZiAocmVtb3RlSXNGaXJlZm94ID09PSAtMSkge1xuICAgICAgICAgIC8vIEZGIDwgNTcgd2lsbCBzZW5kIGluIDE2IEtpQiBjaHVua3MgdXNpbmcgdGhlIGRlcHJlY2F0ZWQgUFBJRFxuICAgICAgICAgIC8vIGZyYWdtZW50YXRpb24uXG4gICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gMTYzODQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSG93ZXZlciwgb3RoZXIgRkYgKGFuZCBSQVdSVEMpIGNhbiByZWFzc2VtYmxlIFBQSUQtZnJhZ21lbnRlZFxuICAgICAgICAgIC8vIG1lc3NhZ2VzLiBUaHVzLCBzdXBwb3J0aW5nIH4yIEdpQiB3aGVuIHNlbmRpbmcuXG4gICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gMjE0NzQ4MzYzNztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNjApIHtcbiAgICAgICAgLy8gQ3VycmVudGx5LCBhbGwgRkYgPj0gNTcgd2lsbCByZXNldCB0aGUgcmVtb3RlIG1heGltdW0gbWVzc2FnZSBzaXplXG4gICAgICAgIC8vIHRvIHRoZSBkZWZhdWx0IHZhbHVlIHdoZW4gYSBkYXRhIGNoYW5uZWwgaXMgY3JlYXRlZCBhdCBhIGxhdGVyXG4gICAgICAgIC8vIHN0YWdlLiA6KFxuICAgICAgICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcbiAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID1cbiAgICAgICAgICBicm93c2VyRGV0YWlscy52ZXJzaW9uID09PSA1NyA/IDY1NTM1IDogNjU1MzY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGRiA+PSA2MCBzdXBwb3J0cyBzZW5kaW5nIH4yIEdpQlxuICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSAyMTQ3NDgzNjM3O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2FuU2VuZE1heE1lc3NhZ2VTaXplO1xuICB9O1xuXG4gIGNvbnN0IGdldE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHJlbW90ZUlzRmlyZWZveCkge1xuICAgIC8vIE5vdGU6IDY1NTM2IGJ5dGVzIGlzIHRoZSBkZWZhdWx0IHZhbHVlIGZyb20gdGhlIFNEUCBzcGVjLiBBbHNvLFxuICAgIC8vICAgICAgIGV2ZXJ5IGltcGxlbWVudGF0aW9uIHdlIGtub3cgc3VwcG9ydHMgcmVjZWl2aW5nIDY1NTM2IGJ5dGVzLlxuICAgIGxldCBtYXhNZXNzYWdlU2l6ZSA9IDY1NTM2O1xuXG4gICAgLy8gRkYgNTcgaGFzIGEgc2xpZ2h0bHkgaW5jb3JyZWN0IGRlZmF1bHQgcmVtb3RlIG1heCBtZXNzYWdlIHNpemUsIHNvXG4gICAgLy8gd2UgbmVlZCB0byBhZGp1c3QgaXQgaGVyZSB0byBhdm9pZCBhIGZhaWx1cmUgd2hlbiBzZW5kaW5nLlxuICAgIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNTY5N1xuICAgIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCdcbiAgICAgICAgICYmIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPT09IDU3KSB7XG4gICAgICBtYXhNZXNzYWdlU2l6ZSA9IDY1NTM1O1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoZGVzY3JpcHRpb24uc2RwLFxuICAgICAgJ2E9bWF4LW1lc3NhZ2Utc2l6ZTonKTtcbiAgICBpZiAobWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgbWF4TWVzc2FnZVNpemUgPSBwYXJzZUludChtYXRjaFswXS5zdWJzdHIoMTkpLCAxMCk7XG4gICAgfSBlbHNlIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCcgJiZcbiAgICAgICAgICAgICAgICByZW1vdGVJc0ZpcmVmb3ggIT09IC0xKSB7XG4gICAgICAvLyBJZiB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgaXMgbm90IHByZXNlbnQgaW4gdGhlIHJlbW90ZSBTRFAgYW5kXG4gICAgICAvLyBib3RoIGxvY2FsIGFuZCByZW1vdGUgYXJlIEZpcmVmb3gsIHRoZSByZW1vdGUgcGVlciBjYW4gcmVjZWl2ZVxuICAgICAgLy8gfjIgR2lCLlxuICAgICAgbWF4TWVzc2FnZVNpemUgPSAyMTQ3NDgzNjM3O1xuICAgIH1cbiAgICByZXR1cm4gbWF4TWVzc2FnZVNpemU7XG4gIH07XG5cbiAgY29uc3Qgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XG4gIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPVxuICAgIGZ1bmN0aW9uIHNldFJlbW90ZURlc2NyaXB0aW9uKCkge1xuICAgICAgdGhpcy5fc2N0cCA9IG51bGw7XG4gICAgICAvLyBDaHJvbWUgZGVjaWRlZCB0byBub3QgZXhwb3NlIC5zY3RwIGluIHBsYW4tYiBtb2RlLlxuICAgICAgLy8gQXMgdXN1YWwsIGFkYXB0ZXIuanMgaGFzIHRvIGRvIGFuICd1Z2x5IHdvcmFrYXJvdW5kJ1xuICAgICAgLy8gdG8gY292ZXIgdXAgdGhlIG1lc3MuXG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ2Nocm9tZScgJiYgYnJvd3NlckRldGFpbHMudmVyc2lvbiA+PSA3Nikge1xuICAgICAgICBjb25zdCB7c2RwU2VtYW50aWNzfSA9IHRoaXMuZ2V0Q29uZmlndXJhdGlvbigpO1xuICAgICAgICBpZiAoc2RwU2VtYW50aWNzID09PSAncGxhbi1iJykge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc2N0cCcsIHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9zY3RwID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB0aGlzLl9zY3RwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNjdHBJbkRlc2NyaXB0aW9uKGFyZ3VtZW50c1swXSkpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHJlbW90ZSBpcyBGRi5cbiAgICAgICAgY29uc3QgaXNGaXJlZm94ID0gZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24oYXJndW1lbnRzWzBdKTtcblxuICAgICAgICAvLyBHZXQgdGhlIG1heGltdW0gbWVzc2FnZSBzaXplIHRoZSBsb2NhbCBwZWVyIGlzIGNhcGFibGUgb2Ygc2VuZGluZ1xuICAgICAgICBjb25zdCBjYW5TZW5kTU1TID0gZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplKGlzRmlyZWZveCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBvZiB0aGUgcmVtb3RlIHBlZXIuXG4gICAgICAgIGNvbnN0IHJlbW90ZU1NUyA9IGdldE1heE1lc3NhZ2VTaXplKGFyZ3VtZW50c1swXSwgaXNGaXJlZm94KTtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgZmluYWwgbWF4aW11bSBtZXNzYWdlIHNpemVcbiAgICAgICAgbGV0IG1heE1lc3NhZ2VTaXplO1xuICAgICAgICBpZiAoY2FuU2VuZE1NUyA9PT0gMCAmJiByZW1vdGVNTVMgPT09IDApIHtcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICAgICAgfSBlbHNlIGlmIChjYW5TZW5kTU1TID09PSAwIHx8IHJlbW90ZU1NUyA9PT0gMCkge1xuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTWF0aC5tYXgoY2FuU2VuZE1NUywgcmVtb3RlTU1TKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE1hdGgubWluKGNhblNlbmRNTVMsIHJlbW90ZU1NUyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgYSBkdW1teSBSVENTY3RwVHJhbnNwb3J0IG9iamVjdCBhbmQgdGhlICdtYXhNZXNzYWdlU2l6ZSdcbiAgICAgICAgLy8gYXR0cmlidXRlLlxuICAgICAgICBjb25zdCBzY3RwID0ge307XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY3RwLCAnbWF4TWVzc2FnZVNpemUnLCB7XG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3NjdHAgPSBzY3RwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KSB7XG4gIGlmICghKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgJ2NyZWF0ZURhdGFDaGFubmVsJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIE5vdGU6IEFsdGhvdWdoIEZpcmVmb3ggPj0gNTcgaGFzIGEgbmF0aXZlIGltcGxlbWVudGF0aW9uLCB0aGUgbWF4aW11bVxuICAvLyAgICAgICBtZXNzYWdlIHNpemUgY2FuIGJlIHJlc2V0IGZvciBhbGwgZGF0YSBjaGFubmVscyBhdCBhIGxhdGVyIHN0YWdlLlxuICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcblxuICBmdW5jdGlvbiB3cmFwRGNTZW5kKGRjLCBwYykge1xuICAgIGNvbnN0IG9yaWdEYXRhQ2hhbm5lbFNlbmQgPSBkYy5zZW5kO1xuICAgIGRjLnNlbmQgPSBmdW5jdGlvbiBzZW5kKCkge1xuICAgICAgY29uc3QgZGF0YSA9IGFyZ3VtZW50c1swXTtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IGRhdGEubGVuZ3RoIHx8IGRhdGEuc2l6ZSB8fCBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICBpZiAoZGMucmVhZHlTdGF0ZSA9PT0gJ29wZW4nICYmXG4gICAgICAgICAgcGMuc2N0cCAmJiBsZW5ndGggPiBwYy5zY3RwLm1heE1lc3NhZ2VTaXplKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01lc3NhZ2UgdG9vIGxhcmdlIChjYW4gc2VuZCBhIG1heGltdW0gb2YgJyArXG4gICAgICAgICAgcGMuc2N0cC5tYXhNZXNzYWdlU2l6ZSArICcgYnl0ZXMpJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3JpZ0RhdGFDaGFubmVsU2VuZC5hcHBseShkYywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG4gIGNvbnN0IG9yaWdDcmVhdGVEYXRhQ2hhbm5lbCA9XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbDtcbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbCA9XG4gICAgZnVuY3Rpb24gY3JlYXRlRGF0YUNoYW5uZWwoKSB7XG4gICAgICBjb25zdCBkYXRhQ2hhbm5lbCA9IG9yaWdDcmVhdGVEYXRhQ2hhbm5lbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgd3JhcERjU2VuZChkYXRhQ2hhbm5lbCwgdGhpcyk7XG4gICAgICByZXR1cm4gZGF0YUNoYW5uZWw7XG4gICAgfTtcbiAgdXRpbHMud3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCAnZGF0YWNoYW5uZWwnLCBlID0+IHtcbiAgICB3cmFwRGNTZW5kKGUuY2hhbm5lbCwgZS50YXJnZXQpO1xuICAgIHJldHVybiBlO1xuICB9KTtcbn1cblxuXG4vKiBzaGltcyBSVENDb25uZWN0aW9uU3RhdGUgYnkgcHJldGVuZGluZyBpdCBpcyB0aGUgc2FtZSBhcyBpY2VDb25uZWN0aW9uU3RhdGUuXG4gKiBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTYxNDUjYzEyXG4gKiBmb3Igd2h5IHRoaXMgaXMgYSB2YWxpZCBoYWNrIGluIENocm9tZS4gSW4gRmlyZWZveCBpdCBpcyBzbGlnaHRseSBpbmNvcnJlY3RcbiAqIHNpbmNlIERUTFMgZmFpbHVyZXMgd291bGQgYmUgaGlkZGVuLiBTZWVcbiAqIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyNjU4MjdcbiAqIGZvciB0aGUgRmlyZWZveCB0cmFja2luZyBidWcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGltQ29ubmVjdGlvblN0YXRlKHdpbmRvdykge1xuICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiB8fFxuICAgICAgJ2Nvbm5lY3Rpb25TdGF0ZScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBwcm90byA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2Nvbm5lY3Rpb25TdGF0ZScsIHtcbiAgICBnZXQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wbGV0ZWQ6ICdjb25uZWN0ZWQnLFxuICAgICAgICBjaGVja2luZzogJ2Nvbm5lY3RpbmcnXG4gICAgICB9W3RoaXMuaWNlQ29ubmVjdGlvblN0YXRlXSB8fCB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZTtcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdvbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZScsIHtcbiAgICBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgfHwgbnVsbDtcbiAgICB9LFxuICAgIHNldChjYikge1xuICAgICAgaWYgKHRoaXMuX29uY29ubmVjdGlvbnN0YXRlY2hhbmdlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29ubmVjdGlvbnN0YXRlY2hhbmdlJyxcbiAgICAgICAgICAgIHRoaXMuX29uY29ubmVjdGlvbnN0YXRlY2hhbmdlKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX29uY29ubmVjdGlvbnN0YXRlY2hhbmdlO1xuICAgICAgfVxuICAgICAgaWYgKGNiKSB7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY29ubmVjdGlvbnN0YXRlY2hhbmdlJyxcbiAgICAgICAgICAgIHRoaXMuX29uY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gY2IpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG5cbiAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJ10uZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgY29uc3Qgb3JpZ01ldGhvZCA9IHByb3RvW21ldGhvZF07XG4gICAgcHJvdG9bbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLl9jb25uZWN0aW9uc3RhdGVjaGFuZ2Vwb2x5KSB7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZXBvbHkgPSBlID0+IHtcbiAgICAgICAgICBjb25zdCBwYyA9IGUudGFyZ2V0O1xuICAgICAgICAgIGlmIChwYy5fbGFzdENvbm5lY3Rpb25TdGF0ZSAhPT0gcGMuY29ubmVjdGlvblN0YXRlKSB7XG4gICAgICAgICAgICBwYy5fbGFzdENvbm5lY3Rpb25TdGF0ZSA9IHBjLmNvbm5lY3Rpb25TdGF0ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IEV2ZW50KCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCBlKTtcbiAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdpY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLFxuICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZXBvbHkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9yaWdNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV4dG1hcEFsbG93TWl4ZWQod2luZG93LCBicm93c2VyRGV0YWlscykge1xuICAvKiByZW1vdmUgYT1leHRtYXAtYWxsb3ctbWl4ZWQgZm9yIHdlYnJ0Yy5vcmcgPCBNNzEgKi9cbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdjaHJvbWUnICYmIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNzEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdzYWZhcmknICYmIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjA1KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IG5hdGl2ZVNSRCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XG4gIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPVxuICBmdW5jdGlvbiBzZXRSZW1vdGVEZXNjcmlwdGlvbihkZXNjKSB7XG4gICAgaWYgKGRlc2MgJiYgZGVzYy5zZHAgJiYgZGVzYy5zZHAuaW5kZXhPZignXFxuYT1leHRtYXAtYWxsb3ctbWl4ZWQnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IHNkcCA9IGRlc2Muc2RwLnNwbGl0KCdcXG4nKS5maWx0ZXIoKGxpbmUpID0+IHtcbiAgICAgICAgcmV0dXJuIGxpbmUudHJpbSgpICE9PSAnYT1leHRtYXAtYWxsb3ctbWl4ZWQnO1xuICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAvLyBTYWZhcmkgZW5mb3JjZXMgcmVhZC1vbmx5LW5lc3Mgb2YgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIGZpZWxkcy5cbiAgICAgIGlmICh3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uICYmXG4gICAgICAgICAgZGVzYyBpbnN0YW5jZW9mIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pIHtcbiAgICAgICAgYXJndW1lbnRzWzBdID0gbmV3IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgICAgIHR5cGU6IGRlc2MudHlwZSxcbiAgICAgICAgICBzZHAsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVzYy5zZHAgPSBzZHA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuYXRpdmVTUkQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1BZGRJY2VDYW5kaWRhdGVOdWxsT3JFbXB0eSh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKSB7XG4gIC8vIFN1cHBvcnQgZm9yIGFkZEljZUNhbmRpZGF0ZShudWxsIG9yIHVuZGVmaW5lZClcbiAgLy8gYXMgd2VsbCBhcyBhZGRJY2VDYW5kaWRhdGUoe2NhbmRpZGF0ZTogXCJcIiwgLi4ufSlcbiAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9OTc4NTgyXG4gIC8vIE5vdGU6IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBvdGhlciBwb2x5ZmlsbHMgd2hpY2ggY2hhbmdlIHRoZSBzaWduYXR1cmUuXG4gIGlmICghKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBuYXRpdmVBZGRJY2VDYW5kaWRhdGUgPVxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGU7XG4gIGlmICghbmF0aXZlQWRkSWNlQ2FuZGlkYXRlIHx8IG5hdGl2ZUFkZEljZUNhbmRpZGF0ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPVxuICAgIGZ1bmN0aW9uIGFkZEljZUNhbmRpZGF0ZSgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzWzBdKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHNbMV0pIHtcbiAgICAgICAgICBhcmd1bWVudHNbMV0uYXBwbHkobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuICAgICAgLy8gRmlyZWZveCA2OCsgZW1pdHMgYW5kIHByb2Nlc3NlcyB7Y2FuZGlkYXRlOiBcIlwiLCAuLi59LCBpZ25vcmVcbiAgICAgIC8vIGluIG9sZGVyIHZlcnNpb25zLlxuICAgICAgLy8gTmF0aXZlIHN1cHBvcnQgZm9yIGlnbm9yaW5nIGV4aXN0cyBmb3IgQ2hyb21lIE03NysuXG4gICAgICAvLyBTYWZhcmkgaWdub3JlcyBhcyB3ZWxsLCBleGFjdCB2ZXJzaW9uIHVua25vd24gYnV0IHdvcmtzIGluIHRoZSBzYW1lXG4gICAgICAvLyB2ZXJzaW9uIHRoYXQgYWxzbyBpZ25vcmVzIGFkZEljZUNhbmRpZGF0ZShudWxsKS5cbiAgICAgIGlmICgoKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdjaHJvbWUnICYmIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA3OClcbiAgICAgICAgICAgfHwgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94J1xuICAgICAgICAgICAgICAgJiYgYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDY4KVxuICAgICAgICAgICB8fCAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ3NhZmFyaScpKVxuICAgICAgICAgICYmIGFyZ3VtZW50c1swXSAmJiBhcmd1bWVudHNbMF0uY2FuZGlkYXRlID09PSAnJykge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlQWRkSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cbiIsICIvKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG4gIC8vIEJyb3dzZXIgc2hpbXMuXG5pbXBvcnQgKiBhcyBjaHJvbWVTaGltIGZyb20gJy4vY2hyb21lL2Nocm9tZV9zaGltJztcbmltcG9ydCAqIGFzIGVkZ2VTaGltIGZyb20gJy4vZWRnZS9lZGdlX3NoaW0nO1xuaW1wb3J0ICogYXMgZmlyZWZveFNoaW0gZnJvbSAnLi9maXJlZm94L2ZpcmVmb3hfc2hpbSc7XG5pbXBvcnQgKiBhcyBzYWZhcmlTaGltIGZyb20gJy4vc2FmYXJpL3NhZmFyaV9zaGltJztcbmltcG9ydCAqIGFzIGNvbW1vblNoaW0gZnJvbSAnLi9jb21tb25fc2hpbSc7XG5cbi8vIFNoaW1taW5nIHN0YXJ0cyBoZXJlLlxuZXhwb3J0IGZ1bmN0aW9uIGFkYXB0ZXJGYWN0b3J5KHt3aW5kb3d9ID0ge30sIG9wdGlvbnMgPSB7XG4gIHNoaW1DaHJvbWU6IHRydWUsXG4gIHNoaW1GaXJlZm94OiB0cnVlLFxuICBzaGltRWRnZTogdHJ1ZSxcbiAgc2hpbVNhZmFyaTogdHJ1ZSxcbn0pIHtcbiAgLy8gVXRpbHMuXG4gIGNvbnN0IGxvZ2dpbmcgPSB1dGlscy5sb2c7XG4gIGNvbnN0IGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gIGNvbnN0IGFkYXB0ZXIgPSB7XG4gICAgYnJvd3NlckRldGFpbHMsXG4gICAgY29tbW9uU2hpbSxcbiAgICBleHRyYWN0VmVyc2lvbjogdXRpbHMuZXh0cmFjdFZlcnNpb24sXG4gICAgZGlzYWJsZUxvZzogdXRpbHMuZGlzYWJsZUxvZyxcbiAgICBkaXNhYmxlV2FybmluZ3M6IHV0aWxzLmRpc2FibGVXYXJuaW5nc1xuICB9O1xuXG4gIC8vIFNoaW0gYnJvd3NlciBpZiBmb3VuZC5cbiAgc3dpdGNoIChicm93c2VyRGV0YWlscy5icm93c2VyKSB7XG4gICAgY2FzZSAnY2hyb21lJzpcbiAgICAgIGlmICghY2hyb21lU2hpbSB8fCAhY2hyb21lU2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgICAhb3B0aW9ucy5zaGltQ2hyb21lKSB7XG4gICAgICAgIGxvZ2dpbmcoJ0Nocm9tZSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XG4gICAgICB9XG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA9PT0gbnVsbCkge1xuICAgICAgICBsb2dnaW5nKCdDaHJvbWUgc2hpbSBjYW4gbm90IGRldGVybWluZSB2ZXJzaW9uLCBub3Qgc2hpbW1pbmcuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBjaHJvbWUuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGNocm9tZVNoaW07XG5cbiAgICAgIC8vIE11c3QgYmUgY2FsbGVkIGJlZm9yZSBzaGltUGVlckNvbm5lY3Rpb24uXG4gICAgICBjb21tb25TaGltLnNoaW1BZGRJY2VDYW5kaWRhdGVOdWxsT3JFbXB0eSh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcblxuICAgICAgY2hyb21lU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgY2hyb21lU2hpbS5zaGltTWVkaWFTdHJlYW0od2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbU9uVHJhY2sod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1BZGRUcmFja1JlbW92ZVRyYWNrKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgY2hyb21lU2hpbS5zaGltR2V0U2VuZGVyc1dpdGhEdG1mKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgY2hyb21lU2hpbS5zaGltR2V0U3RhdHMod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1TZW5kZXJSZWNlaXZlckdldFN0YXRzKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgY2hyb21lU2hpbS5maXhOZWdvdGlhdGlvbk5lZWRlZCh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcblxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgY29tbW9uU2hpbS5zaGltQ29ubmVjdGlvblN0YXRlKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBjb21tb25TaGltLnJlbW92ZUV4dG1hcEFsbG93TWl4ZWQod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdmaXJlZm94JzpcbiAgICAgIGlmICghZmlyZWZveFNoaW0gfHwgIWZpcmVmb3hTaGltLnNoaW1QZWVyQ29ubmVjdGlvbiB8fFxuICAgICAgICAgICFvcHRpb25zLnNoaW1GaXJlZm94KSB7XG4gICAgICAgIGxvZ2dpbmcoJ0ZpcmVmb3ggc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBmaXJlZm94LicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBmaXJlZm94U2hpbTtcblxuICAgICAgLy8gTXVzdCBiZSBjYWxsZWQgYmVmb3JlIHNoaW1QZWVyQ29ubmVjdGlvbi5cbiAgICAgIGNvbW1vblNoaW0uc2hpbUFkZEljZUNhbmRpZGF0ZU51bGxPckVtcHR5KHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuXG4gICAgICBmaXJlZm94U2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbU9uVHJhY2sod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltUmVtb3ZlU3RyZWFtKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVNlbmRlckdldFN0YXRzKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVJlY2VpdmVyR2V0U3RhdHMod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltUlRDRGF0YUNoYW5uZWwod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltQWRkVHJhbnNjZWl2ZXIod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltR2V0UGFyYW1ldGVycyh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1DcmVhdGVPZmZlcih3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1DcmVhdGVBbnN3ZXIod2luZG93LCBicm93c2VyRGV0YWlscyk7XG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNvbm5lY3Rpb25TdGF0ZSh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZWRnZSc6XG4gICAgICBpZiAoIWVkZ2VTaGltIHx8ICFlZGdlU2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHwgIW9wdGlvbnMuc2hpbUVkZ2UpIHtcbiAgICAgICAgbG9nZ2luZygnTVMgZWRnZSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XG4gICAgICB9XG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGVkZ2UuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGVkZ2VTaGltO1xuXG4gICAgICBlZGdlU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgZWRnZVNoaW0uc2hpbUdldERpc3BsYXlNZWRpYSh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIGVkZ2VTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIGVkZ2VTaGltLnNoaW1SZXBsYWNlVHJhY2sod2luZG93LCBicm93c2VyRGV0YWlscyk7XG5cbiAgICAgIC8vIHRoZSBlZGdlIHNoaW0gaW1wbGVtZW50cyB0aGUgZnVsbCBSVENJY2VDYW5kaWRhdGUgb2JqZWN0LlxuXG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NhZmFyaSc6XG4gICAgICBpZiAoIXNhZmFyaVNoaW0gfHwgIW9wdGlvbnMuc2hpbVNhZmFyaSkge1xuICAgICAgICBsb2dnaW5nKCdTYWZhcmkgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBzYWZhcmkuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IHNhZmFyaVNoaW07XG5cbiAgICAgIC8vIE11c3QgYmUgY2FsbGVkIGJlZm9yZSBzaGltQ2FsbGJhY2tBUEkuXG4gICAgICBjb21tb25TaGltLnNoaW1BZGRJY2VDYW5kaWRhdGVOdWxsT3JFbXB0eSh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcblxuICAgICAgc2FmYXJpU2hpbS5zaGltUlRDSWNlU2VydmVyVXJscyh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNyZWF0ZU9mZmVyTGVnYWN5KHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltQ2FsbGJhY2tzQVBJKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltTG9jYWxTdHJlYW1zQVBJKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltUmVtb3RlU3RyZWFtc0FQSSh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlcih3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUF1ZGlvQ29udGV4dCh3aW5kb3csIGJyb3dzZXJEZXRhaWxzKTtcblxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdywgYnJvd3NlckRldGFpbHMpO1xuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBjb21tb25TaGltLnJlbW92ZUV4dG1hcEFsbG93TWl4ZWQod2luZG93LCBicm93c2VyRGV0YWlscyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2luZygnVW5zdXBwb3J0ZWQgYnJvd3NlciEnKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG4iLCAiLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4vKiBlc2xpbnQtZW52IG5vZGUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2FkYXB0ZXJGYWN0b3J5fSBmcm9tICcuL2FkYXB0ZXJfZmFjdG9yeS5qcyc7XG5cbmNvbnN0IGFkYXB0ZXIgPVxuICBhZGFwdGVyRmFjdG9yeSh7d2luZG93OiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IHdpbmRvd30pO1xuZXhwb3J0IGRlZmF1bHQgYWRhcHRlcjtcbiIsICJpbXBvcnQgd2ViUlRDQWRhcHRlciBmcm9tIFwid2VicnRjLWFkYXB0ZXJcIjtcblxuZXhwb3J0IHsgd2ViUlRDQWRhcHRlciB9O1xuIiwgImltcG9ydCB7IHdlYlJUQ0FkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXInO1xuXG5leHBvcnQgY29uc3QgU3VwcG9ydHMgPSBuZXcgY2xhc3Mge1xuICByZWFkb25seSBpc0lPUyA9IFsnaVBhZCcsICdpUGhvbmUnLCAnaVBvZCddLmluY2x1ZGVzKG5hdmlnYXRvci5wbGF0Zm9ybSk7XG4gIHJlYWRvbmx5IHN1cHBvcnRlZEJyb3dzZXJzID0gWydmaXJlZm94JywgJ2Nocm9tZScsICdzYWZhcmknXTtcblxuICByZWFkb25seSBtaW5GaXJlZm94VmVyc2lvbiA9IDU5O1xuICByZWFkb25seSBtaW5DaHJvbWVWZXJzaW9uID0gNzI7XG4gIHJlYWRvbmx5IG1pblNhZmFyaVZlcnNpb24gPSA2MDU7XG5cbiAgaXNXZWJSVENTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGVvZiBSVENQZWVyQ29ubmVjdGlvbiAhPT0gJ3VuZGVmaW5lZCc7XG4gIH1cblxuICBpc0Jyb3dzZXJTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYnJvd3NlciA9IHRoaXMuZ2V0QnJvd3NlcigpO1xuICAgIGNvbnN0IHZlcnNpb24gPSB0aGlzLmdldFZlcnNpb24oKTtcblxuICAgIGNvbnN0IHZhbGlkQnJvd3NlciA9IHRoaXMuc3VwcG9ydGVkQnJvd3NlcnMuaW5jbHVkZXMoYnJvd3Nlcik7XG5cbiAgICBpZiAoIXZhbGlkQnJvd3NlcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKGJyb3dzZXIgPT09ICdjaHJvbWUnKSByZXR1cm4gdmVyc2lvbiA+PSB0aGlzLm1pbkNocm9tZVZlcnNpb247XG4gICAgaWYgKGJyb3dzZXIgPT09ICdmaXJlZm94JykgcmV0dXJuIHZlcnNpb24gPj0gdGhpcy5taW5GaXJlZm94VmVyc2lvbjtcbiAgICBpZiAoYnJvd3NlciA9PT0gJ3NhZmFyaScpIHJldHVybiAhdGhpcy5pc0lPUyAmJiB2ZXJzaW9uID49IHRoaXMubWluU2FmYXJpVmVyc2lvbjtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldEJyb3dzZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gd2ViUlRDQWRhcHRlci5icm93c2VyRGV0YWlscy5icm93c2VyO1xuICB9XG5cbiAgZ2V0VmVyc2lvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB3ZWJSVENBZGFwdGVyLmJyb3dzZXJEZXRhaWxzLnZlcnNpb24gfHwgMDtcbiAgfVxuXG4gIGlzVW5pZmllZFBsYW5TdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYnJvd3NlciA9IHRoaXMuZ2V0QnJvd3NlcigpO1xuICAgIGNvbnN0IHZlcnNpb24gPSB3ZWJSVENBZGFwdGVyLmJyb3dzZXJEZXRhaWxzLnZlcnNpb24gfHwgMDtcblxuICAgIGlmIChicm93c2VyID09PSAnY2hyb21lJyAmJiB2ZXJzaW9uIDwgNzIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoYnJvd3NlciA9PT0gJ2ZpcmVmb3gnICYmIHZlcnNpb24gPj0gNTkpIHJldHVybiB0cnVlO1xuICAgIGlmICghd2luZG93LlJUQ1J0cFRyYW5zY2VpdmVyIHx8ICEoJ2N1cnJlbnREaXJlY3Rpb24nIGluIFJUQ1J0cFRyYW5zY2VpdmVyLnByb3RvdHlwZSkpIHJldHVybiBmYWxzZTtcblxuICAgIGxldCB0ZW1wUGM6IFJUQ1BlZXJDb25uZWN0aW9uO1xuICAgIGxldCBzdXBwb3J0ZWQgPSBmYWxzZTtcblxuICAgIHRyeSB7XG4gICAgICB0ZW1wUGMgPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oKTtcbiAgICAgIHRlbXBQYy5hZGRUcmFuc2NlaXZlcignYXVkaW8nKTtcbiAgICAgIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgZmluYWxseSB7XG4gICAgICBpZiAodGVtcFBjKSB7XG4gICAgICAgIHRlbXBQYy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgU3VwcG9ydHM6IFxuICAgIGJyb3dzZXI6JHt0aGlzLmdldEJyb3dzZXIoKX0gXG4gICAgdmVyc2lvbjoke3RoaXMuZ2V0VmVyc2lvbigpfSBcbiAgICBpc0lPUzoke3RoaXMuaXNJT1N9IFxuICAgIGlzV2ViUlRDU3VwcG9ydGVkOiR7dGhpcy5pc1dlYlJUQ1N1cHBvcnRlZCgpfSBcbiAgICBpc0Jyb3dzZXJTdXBwb3J0ZWQ6JHt0aGlzLmlzQnJvd3NlclN1cHBvcnRlZCgpfSBcbiAgICBpc1VuaWZpZWRQbGFuU3VwcG9ydGVkOiR7dGhpcy5pc1VuaWZpZWRQbGFuU3VwcG9ydGVkKCl9YDtcbiAgfVxufSIsICJpbXBvcnQgKiBhcyBCaW5hcnlQYWNrIGZyb20gXCJwZWVyanMtanMtYmluYXJ5cGFja1wiO1xuaW1wb3J0IHsgU3VwcG9ydHMgfSBmcm9tICcuL3N1cHBvcnRzJztcbmltcG9ydCB7IFV0aWxTdXBwb3J0c09iaiB9IGZyb20gJy4uJztcblxuY29uc3QgREVGQVVMVF9DT05GSUcgPSB7XG4gIGljZVNlcnZlcnM6IFtcbiAgICB7IHVybHM6IFwic3R1bjpzdHVuLmwuZ29vZ2xlLmNvbToxOTMwMlwiIH0sXG4gICAgeyB1cmxzOiBcInR1cm46MC5wZWVyanMuY29tOjM0NzhcIiwgdXNlcm5hbWU6IFwicGVlcmpzXCIsIGNyZWRlbnRpYWw6IFwicGVlcmpzcFwiIH1cbiAgXSxcbiAgc2RwU2VtYW50aWNzOiBcInVuaWZpZWQtcGxhblwiXG59O1xuXG5leHBvcnQgY29uc3QgdXRpbCA9IG5ldyBjbGFzcyB7XG4gIG5vb3AoKTogdm9pZCB7IH1cblxuICByZWFkb25seSBDTE9VRF9IT1NUID0gXCIwLnBlZXJqcy5jb21cIjtcbiAgcmVhZG9ubHkgQ0xPVURfUE9SVCA9IDQ0MztcblxuICAvLyBCcm93c2VycyB0aGF0IG5lZWQgY2h1bmtpbmc6XG4gIHJlYWRvbmx5IGNodW5rZWRCcm93c2VycyA9IHsgQ2hyb21lOiAxLCBjaHJvbWU6IDEgfTtcbiAgcmVhZG9ubHkgY2h1bmtlZE1UVSA9IDE2MzAwOyAvLyBUaGUgb3JpZ2luYWwgNjAwMDAgYnl0ZXMgc2V0dGluZyBkb2VzIG5vdCB3b3JrIHdoZW4gc2VuZGluZyBkYXRhIGZyb20gRmlyZWZveCB0byBDaHJvbWUsIHdoaWNoIGlzIFwiY3V0IG9mZlwiIGFmdGVyIDE2Mzg0IGJ5dGVzIGFuZCBkZWxpdmVyZWQgaW5kaXZpZHVhbGx5LlxuXG4gIC8vIFJldHVybnMgYnJvd3Nlci1hZ25vc3RpYyBkZWZhdWx0IGNvbmZpZ1xuICByZWFkb25seSBkZWZhdWx0Q29uZmlnID0gREVGQVVMVF9DT05GSUc7XG5cbiAgcmVhZG9ubHkgYnJvd3NlciA9IFN1cHBvcnRzLmdldEJyb3dzZXIoKTtcbiAgcmVhZG9ubHkgYnJvd3NlclZlcnNpb24gPSBTdXBwb3J0cy5nZXRWZXJzaW9uKCk7XG5cbiAgLy8gTGlzdHMgd2hpY2ggZmVhdHVyZXMgYXJlIHN1cHBvcnRlZFxuICByZWFkb25seSBzdXBwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgc3VwcG9ydGVkOiBVdGlsU3VwcG9ydHNPYmogPSB7XG4gICAgICBicm93c2VyOiBTdXBwb3J0cy5pc0Jyb3dzZXJTdXBwb3J0ZWQoKSxcbiAgICAgIHdlYlJUQzogU3VwcG9ydHMuaXNXZWJSVENTdXBwb3J0ZWQoKSxcbiAgICAgIGF1ZGlvVmlkZW86IGZhbHNlLFxuICAgICAgZGF0YTogZmFsc2UsXG4gICAgICBiaW5hcnlCbG9iOiBmYWxzZSxcbiAgICAgIHJlbGlhYmxlOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgaWYgKCFzdXBwb3J0ZWQud2ViUlRDKSByZXR1cm4gc3VwcG9ydGVkO1xuXG4gICAgbGV0IHBjOiBSVENQZWVyQ29ubmVjdGlvbjtcblxuICAgIHRyeSB7XG4gICAgICBwYyA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihERUZBVUxUX0NPTkZJRyk7XG5cbiAgICAgIHN1cHBvcnRlZC5hdWRpb1ZpZGVvID0gdHJ1ZTtcblxuICAgICAgbGV0IGRjOiBSVENEYXRhQ2hhbm5lbDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZGMgPSBwYy5jcmVhdGVEYXRhQ2hhbm5lbChcIl9QRUVSSlNURVNUXCIsIHsgb3JkZXJlZDogdHJ1ZSB9KTtcbiAgICAgICAgc3VwcG9ydGVkLmRhdGEgPSB0cnVlO1xuICAgICAgICBzdXBwb3J0ZWQucmVsaWFibGUgPSAhIWRjLm9yZGVyZWQ7XG5cbiAgICAgICAgLy8gQmluYXJ5IHRlc3RcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkYy5iaW5hcnlUeXBlID0gXCJibG9iXCI7XG4gICAgICAgICAgc3VwcG9ydGVkLmJpbmFyeUJsb2IgPSAhU3VwcG9ydHMuaXNJT1M7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKGRjKSB7XG4gICAgICAgICAgZGMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKHBjKSB7XG4gICAgICAgIHBjLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgfSkoKTtcblxuICAvLyBFbnN1cmUgYWxwaGFudW1lcmljIGlkc1xuICB2YWxpZGF0ZUlkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAvLyBBbGxvdyBlbXB0eSBpZHNcbiAgICByZXR1cm4gIWlkIHx8IC9eW0EtWmEtejAtOV0rKD86WyBfLV1bQS1aYS16MC05XSspKiQvLnRlc3QoaWQpO1xuICB9XG5cbiAgcGFjayA9IEJpbmFyeVBhY2sucGFjaztcbiAgdW5wYWNrID0gQmluYXJ5UGFjay51bnBhY2s7XG5cbiAgLy8gQmluYXJ5IHN0dWZmXG5cbiAgcHJpdmF0ZSBfZGF0YUNvdW50OiBudW1iZXIgPSAxO1xuXG4gIGNodW5rKGJsb2I6IEJsb2IpOiB7IF9fcGVlckRhdGE6IG51bWJlciwgbjogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBkYXRhOiBCbG9iIH1bXSB7XG4gICAgY29uc3QgY2h1bmtzID0gW107XG4gICAgY29uc3Qgc2l6ZSA9IGJsb2Iuc2l6ZTtcbiAgICBjb25zdCB0b3RhbCA9IE1hdGguY2VpbChzaXplIC8gdXRpbC5jaHVua2VkTVRVKTtcblxuICAgIGxldCBpbmRleCA9IDA7XG4gICAgbGV0IHN0YXJ0ID0gMDtcblxuICAgIHdoaWxlIChzdGFydCA8IHNpemUpIHtcbiAgICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKHNpemUsIHN0YXJ0ICsgdXRpbC5jaHVua2VkTVRVKTtcbiAgICAgIGNvbnN0IGIgPSBibG9iLnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG4gICAgICBjb25zdCBjaHVuayA9IHtcbiAgICAgICAgX19wZWVyRGF0YTogdGhpcy5fZGF0YUNvdW50LFxuICAgICAgICBuOiBpbmRleCxcbiAgICAgICAgZGF0YTogYixcbiAgICAgICAgdG90YWwsXG4gICAgICB9O1xuXG4gICAgICBjaHVua3MucHVzaChjaHVuayk7XG5cbiAgICAgIHN0YXJ0ID0gZW5kO1xuICAgICAgaW5kZXgrKztcbiAgICB9XG5cbiAgICB0aGlzLl9kYXRhQ291bnQrKztcblxuICAgIHJldHVybiBjaHVua3M7XG4gIH1cblxuICBibG9iVG9BcnJheUJ1ZmZlcihibG9iOiBCbG9iLCBjYjogKGFyZzogQXJyYXlCdWZmZXIgfCBudWxsKSA9PiB2b2lkKTogRmlsZVJlYWRlciB7XG4gICAgY29uc3QgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgZnIub25sb2FkID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgaWYgKGV2dC50YXJnZXQpIHtcbiAgICAgICAgY2IoZXZ0LnRhcmdldC5yZXN1bHQgYXMgQXJyYXlCdWZmZXIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcblxuICAgIHJldHVybiBmcjtcbiAgfVxuXG4gIGJpbmFyeVN0cmluZ1RvQXJyYXlCdWZmZXIoYmluYXJ5OiBzdHJpbmcpOiBBcnJheUJ1ZmZlciB8IFNoYXJlZEFycmF5QnVmZmVyIHtcbiAgICBjb25zdCBieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShiaW5hcnkubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBieXRlQXJyYXlbaV0gPSBiaW5hcnkuY2hhckNvZGVBdChpKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ5dGVBcnJheS5idWZmZXI7XG4gIH1cblxuICByYW5kb21Ub2tlbigpOiBzdHJpbmcge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpXG4gICAgICAudG9TdHJpbmcoMzYpXG4gICAgICAuc3Vic3RyKDIpO1xuICB9XG5cbiAgaXNTZWN1cmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuIiwgImNvbnN0IExPR19QUkVGSVggPSAnUGVlckpTOiAnO1xuXG4vKlxuUHJpbnRzIGxvZyBtZXNzYWdlcyBkZXBlbmRpbmcgb24gdGhlIGRlYnVnIGxldmVsIHBhc3NlZCBpbi4gRGVmYXVsdHMgdG8gMC5cbjAgIFByaW50cyBubyBsb2dzLlxuMSAgUHJpbnRzIG9ubHkgZXJyb3JzLlxuMiAgUHJpbnRzIGVycm9ycyBhbmQgd2FybmluZ3MuXG4zICBQcmludHMgYWxsIGxvZ3MuXG4qL1xuZXhwb3J0IGVudW0gTG9nTGV2ZWwge1xuICAgIERpc2FibGVkLFxuICAgIEVycm9ycyxcbiAgICBXYXJuaW5ncyxcbiAgICBBbGxcbn1cblxuY2xhc3MgTG9nZ2VyIHtcbiAgICBwcml2YXRlIF9sb2dMZXZlbCA9IExvZ0xldmVsLkRpc2FibGVkO1xuXG4gICAgZ2V0IGxvZ0xldmVsKCk6IExvZ0xldmVsIHsgcmV0dXJuIHRoaXMuX2xvZ0xldmVsOyB9XG5cbiAgICBzZXQgbG9nTGV2ZWwobG9nTGV2ZWw6IExvZ0xldmVsKSB7IHRoaXMuX2xvZ0xldmVsID0gbG9nTGV2ZWw7IH1cblxuICAgIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5fbG9nTGV2ZWwgPj0gTG9nTGV2ZWwuQWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmludChMb2dMZXZlbC5BbGwsIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2FybiguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5fbG9nTGV2ZWwgPj0gTG9nTGV2ZWwuV2FybmluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByaW50KExvZ0xldmVsLldhcm5pbmdzLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVycm9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLl9sb2dMZXZlbCA+PSBMb2dMZXZlbC5FcnJvcnMpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByaW50KExvZ0xldmVsLkVycm9ycywgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRMb2dGdW5jdGlvbihmbjogKGxvZ0xldmVsOiBMb2dMZXZlbCwgLi4uXzogYW55W10pID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcHJpbnQgPSBmbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wcmludChsb2dMZXZlbDogTG9nTGV2ZWwsIC4uLnJlc3Q6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSBbTE9HX1BSRUZJWCwgLi4ucmVzdF07XG5cbiAgICAgICAgZm9yIChsZXQgaSBpbiBjb3B5KSB7XG4gICAgICAgICAgICBpZiAoY29weVtpXSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29weVtpXSA9IFwiKFwiICsgY29weVtpXS5uYW1lICsgXCIpIFwiICsgY29weVtpXS5tZXNzYWdlO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9nTGV2ZWwgPj0gTG9nTGV2ZWwuQWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyguLi5jb3B5KTtcbiAgICAgICAgfSBlbHNlIGlmIChsb2dMZXZlbCA+PSBMb2dMZXZlbC5XYXJuaW5ncykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV0FSTklOR1wiLCAuLi5jb3B5KTtcbiAgICAgICAgfSBlbHNlIGlmIChsb2dMZXZlbCA+PSBMb2dMZXZlbC5FcnJvcnMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlJPUlwiLCAuLi5jb3B5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IExvZ2dlcigpOyIsICJleHBvcnQgZW51bSBDb25uZWN0aW9uRXZlbnRUeXBlIHtcbiAgT3BlbiA9IFwib3BlblwiLFxuICBTdHJlYW0gPSBcInN0cmVhbVwiLFxuICBEYXRhID0gXCJkYXRhXCIsXG4gIENsb3NlID0gXCJjbG9zZVwiLFxuICBFcnJvciA9IFwiZXJyb3JcIixcbiAgSWNlU3RhdGVDaGFuZ2VkID0gXCJpY2VTdGF0ZUNoYW5nZWRcIlxufVxuXG5leHBvcnQgZW51bSBDb25uZWN0aW9uVHlwZSB7XG4gIERhdGEgPSBcImRhdGFcIixcbiAgTWVkaWEgPSBcIm1lZGlhXCJcbn1cblxuZXhwb3J0IGVudW0gUGVlckV2ZW50VHlwZSB7XG4gIE9wZW4gPSBcIm9wZW5cIixcbiAgQ2xvc2UgPSBcImNsb3NlXCIsXG4gIENvbm5lY3Rpb24gPSBcImNvbm5lY3Rpb25cIixcbiAgQ2FsbCA9IFwiY2FsbFwiLFxuICBEaXNjb25uZWN0ZWQgPSBcImRpc2Nvbm5lY3RlZFwiLFxuICBFcnJvciA9IFwiZXJyb3JcIlxufVxuXG5leHBvcnQgZW51bSBQZWVyRXJyb3JUeXBlIHtcbiAgQnJvd3NlckluY29tcGF0aWJsZSA9IFwiYnJvd3Nlci1pbmNvbXBhdGlibGVcIixcbiAgRGlzY29ubmVjdGVkID0gXCJkaXNjb25uZWN0ZWRcIixcbiAgSW52YWxpZElEID0gXCJpbnZhbGlkLWlkXCIsXG4gIEludmFsaWRLZXkgPSBcImludmFsaWQta2V5XCIsXG4gIE5ldHdvcmsgPSBcIm5ldHdvcmtcIixcbiAgUGVlclVuYXZhaWxhYmxlID0gXCJwZWVyLXVuYXZhaWxhYmxlXCIsXG4gIFNzbFVuYXZhaWxhYmxlID0gXCJzc2wtdW5hdmFpbGFibGVcIixcbiAgU2VydmVyRXJyb3IgPSBcInNlcnZlci1lcnJvclwiLFxuICBTb2NrZXRFcnJvciA9IFwic29ja2V0LWVycm9yXCIsXG4gIFNvY2tldENsb3NlZCA9IFwic29ja2V0LWNsb3NlZFwiLFxuICBVbmF2YWlsYWJsZUlEID0gXCJ1bmF2YWlsYWJsZS1pZFwiLFxuICBXZWJSVEMgPSBcIndlYnJ0Y1wiXG59XG5cbmV4cG9ydCBlbnVtIFNlcmlhbGl6YXRpb25UeXBlIHtcbiAgQmluYXJ5ID0gXCJiaW5hcnlcIixcbiAgQmluYXJ5VVRGOCA9IFwiYmluYXJ5LXV0ZjhcIixcbiAgSlNPTiA9IFwianNvblwiXG59XG5cbmV4cG9ydCBlbnVtIFNvY2tldEV2ZW50VHlwZSB7XG4gIE1lc3NhZ2UgPSBcIm1lc3NhZ2VcIixcbiAgRGlzY29ubmVjdGVkID0gXCJkaXNjb25uZWN0ZWRcIixcbiAgRXJyb3IgPSBcImVycm9yXCIsXG4gIENsb3NlID0gXCJjbG9zZVwiXG59XG5cbmV4cG9ydCBlbnVtIFNlcnZlck1lc3NhZ2VUeXBlIHtcbiAgSGVhcnRiZWF0ID0gXCJIRUFSVEJFQVRcIixcbiAgQ2FuZGlkYXRlID0gXCJDQU5ESURBVEVcIixcbiAgT2ZmZXIgPSBcIk9GRkVSXCIsXG4gIEFuc3dlciA9IFwiQU5TV0VSXCIsXG4gIE9wZW4gPSBcIk9QRU5cIiwgLy8gVGhlIGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlciBpcyBvcGVuLlxuICBFcnJvciA9IFwiRVJST1JcIiwgLy8gU2VydmVyIGVycm9yLlxuICBJZFRha2VuID0gXCJJRC1UQUtFTlwiLCAvLyBUaGUgc2VsZWN0ZWQgSUQgaXMgdGFrZW4uXG4gIEludmFsaWRLZXkgPSBcIklOVkFMSUQtS0VZXCIsIC8vIFRoZSBnaXZlbiBBUEkga2V5IGNhbm5vdCBiZSBmb3VuZC5cbiAgTGVhdmUgPSBcIkxFQVZFXCIsIC8vIEFub3RoZXIgcGVlciBoYXMgY2xvc2VkIGl0cyBjb25uZWN0aW9uIHRvIHRoaXMgcGVlci5cbiAgRXhwaXJlID0gXCJFWFBJUkVcIiAvLyBUaGUgb2ZmZXIgc2VudCB0byBhIHBlZXIgaGFzIGV4cGlyZWQgd2l0aG91dCByZXNwb25zZS5cblxufSIsICJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRlbWl0dGVyM1wiO1xuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi9sb2dnZXJcIjtcbmltcG9ydCB7IFNvY2tldEV2ZW50VHlwZSwgU2VydmVyTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9lbnVtc1wiO1xuXG4vKipcbiAqIEFuIGFic3RyYWN0aW9uIG9uIHRvcCBvZiBXZWJTb2NrZXRzIHRvIHByb3ZpZGUgZmFzdGVzdFxuICogcG9zc2libGUgY29ubmVjdGlvbiBmb3IgcGVlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBwcml2YXRlIF9kaXNjb25uZWN0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIF9pZD86IHN0cmluZztcbiAgcHJpdmF0ZSBfbWVzc2FnZXNRdWV1ZTogQXJyYXk8b2JqZWN0PiA9IFtdO1xuICBwcml2YXRlIF9zb2NrZXQ/OiBXZWJTb2NrZXQ7XG4gIHByaXZhdGUgX3dzUGluZ1RpbWVyPzogYW55O1xuICBwcml2YXRlIHJlYWRvbmx5IF9iYXNlVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgc2VjdXJlOiBhbnksXG4gICAgaG9zdDogc3RyaW5nLFxuICAgIHBvcnQ6IG51bWJlcixcbiAgICBwYXRoOiBzdHJpbmcsXG4gICAga2V5OiBzdHJpbmcsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwaW5nSW50ZXJ2YWw6IG51bWJlciA9IDUwMDAsXG4gICkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBjb25zdCB3c1Byb3RvY29sID0gc2VjdXJlID8gXCJ3c3M6Ly9cIiA6IFwid3M6Ly9cIjtcblxuICAgIHRoaXMuX2Jhc2VVcmwgPSB3c1Byb3RvY29sICsgaG9zdCArIFwiOlwiICsgcG9ydCArIHBhdGggKyBcInBlZXJqcz9rZXk9XCIgKyBrZXk7XG4gIH1cblxuICBzdGFydChpZDogc3RyaW5nLCB0b2tlbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5faWQgPSBpZDtcblxuICAgIGNvbnN0IHdzVXJsID0gYCR7dGhpcy5fYmFzZVVybH0maWQ9JHtpZH0mdG9rZW49JHt0b2tlbn1gO1xuXG4gICAgaWYgKCEhdGhpcy5fc29ja2V0IHx8ICF0aGlzLl9kaXNjb25uZWN0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zb2NrZXQgPSBuZXcgV2ViU29ja2V0KHdzVXJsKTtcbiAgICB0aGlzLl9kaXNjb25uZWN0ZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuX3NvY2tldC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGxldCBkYXRhO1xuXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIlNlcnZlciBtZXNzYWdlIHJlY2VpdmVkOlwiLCBkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nZ2VyLmxvZyhcIkludmFsaWQgc2VydmVyIG1lc3NhZ2VcIiwgZXZlbnQuZGF0YSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbWl0KFNvY2tldEV2ZW50VHlwZS5NZXNzYWdlLCBkYXRhKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fc29ja2V0Lm9uY2xvc2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLl9kaXNjb25uZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2dnZXIubG9nKFwiU29ja2V0IGNsb3NlZC5cIiwgZXZlbnQpO1xuXG4gICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICB0aGlzLl9kaXNjb25uZWN0ZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLmVtaXQoU29ja2V0RXZlbnRUeXBlLkRpc2Nvbm5lY3RlZCk7XG4gICAgfTtcblxuICAgIC8vIFRha2UgY2FyZSBvZiB0aGUgcXVldWUgb2YgY29ubmVjdGlvbnMgaWYgbmVjZXNzYXJ5IGFuZCBtYWtlIHN1cmUgUGVlciBrbm93c1xuICAgIC8vIHNvY2tldCBpcyBvcGVuLlxuICAgIHRoaXMuX3NvY2tldC5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fZGlzY29ubmVjdGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc2VuZFF1ZXVlZE1lc3NhZ2VzKCk7XG5cbiAgICAgIGxvZ2dlci5sb2coXCJTb2NrZXQgb3BlblwiKTtcblxuICAgICAgdGhpcy5fc2NoZWR1bGVIZWFydGJlYXQoKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2NoZWR1bGVIZWFydGJlYXQoKTogdm9pZCB7XG4gICAgdGhpcy5fd3NQaW5nVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX3NlbmRIZWFydGJlYXQoKTtcbiAgICB9LCB0aGlzLnBpbmdJbnRlcnZhbCk7XG4gIH1cblxuICBwcml2YXRlIF9zZW5kSGVhcnRiZWF0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fd3NPcGVuKCkpIHtcbiAgICAgIGxvZ2dlci5sb2coYENhbm5vdCBzZW5kIGhlYXJ0YmVhdCwgYmVjYXVzZSBzb2NrZXQgY2xvc2VkYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KHsgdHlwZTogU2VydmVyTWVzc2FnZVR5cGUuSGVhcnRiZWF0IH0pO1xuXG4gICAgdGhpcy5fc29ja2V0IS5zZW5kKG1lc3NhZ2UpO1xuXG4gICAgdGhpcy5fc2NoZWR1bGVIZWFydGJlYXQoKTtcbiAgfVxuXG4gIC8qKiBJcyB0aGUgd2Vic29ja2V0IGN1cnJlbnRseSBvcGVuPyAqL1xuICBwcml2YXRlIF93c09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fc29ja2V0ICYmIHRoaXMuX3NvY2tldC5yZWFkeVN0YXRlID09PSAxO1xuICB9XG5cbiAgLyoqIFNlbmQgcXVldWVkIG1lc3NhZ2VzLiAqL1xuICBwcml2YXRlIF9zZW5kUXVldWVkTWVzc2FnZXMoKTogdm9pZCB7XG4gICAgLy9DcmVhdGUgY29weSBvZiBxdWV1ZSBhbmQgY2xlYXIgaXQsXG4gICAgLy9iZWNhdXNlIHNlbmQgbWV0aG9kIHB1c2ggdGhlIG1lc3NhZ2UgYmFjayB0byBxdWV1ZSBpZiBzbXRoIHdpbGwgZ28gd3JvbmdcbiAgICBjb25zdCBjb3BpZWRRdWV1ZSA9IFsuLi50aGlzLl9tZXNzYWdlc1F1ZXVlXTtcbiAgICB0aGlzLl9tZXNzYWdlc1F1ZXVlID0gW107XG5cbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgY29waWVkUXVldWUpIHtcbiAgICAgIHRoaXMuc2VuZChtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICAvKiogRXhwb3NlZCBzZW5kIGZvciBEQyAmIFBlZXIuICovXG4gIHNlbmQoZGF0YTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Rpc2Nvbm5lY3RlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHdlIGRpZG4ndCBnZXQgYW4gSUQgeWV0LCB3ZSBjYW4ndCB5ZXQgc2VuZCBhbnl0aGluZyBzbyB3ZSBzaG91bGQgcXVldWVcbiAgICAvLyB1cCB0aGVzZSBtZXNzYWdlcy5cbiAgICBpZiAoIXRoaXMuX2lkKSB7XG4gICAgICB0aGlzLl9tZXNzYWdlc1F1ZXVlLnB1c2goZGF0YSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFkYXRhLnR5cGUpIHtcbiAgICAgIHRoaXMuZW1pdChTb2NrZXRFdmVudFR5cGUuRXJyb3IsIFwiSW52YWxpZCBtZXNzYWdlXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fd3NPcGVuKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG5cbiAgICB0aGlzLl9zb2NrZXQhLnNlbmQobWVzc2FnZSk7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGlzY29ubmVjdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fY2xlYW51cCgpO1xuXG4gICAgdGhpcy5fZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NsZWFudXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NvY2tldCkge1xuICAgICAgdGhpcy5fc29ja2V0Lm9ub3BlbiA9IHRoaXMuX3NvY2tldC5vbm1lc3NhZ2UgPSB0aGlzLl9zb2NrZXQub25jbG9zZSA9IG51bGw7XG4gICAgICB0aGlzLl9zb2NrZXQuY2xvc2UoKTtcbiAgICAgIHRoaXMuX3NvY2tldCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5fd3NQaW5nVGltZXIhKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IHV0aWwgfSBmcm9tIFwiLi91dGlsXCI7XG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHsgTWVkaWFDb25uZWN0aW9uIH0gZnJvbSBcIi4vbWVkaWFjb25uZWN0aW9uXCI7XG5pbXBvcnQgeyBEYXRhQ29ubmVjdGlvbiB9IGZyb20gXCIuL2RhdGFjb25uZWN0aW9uXCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uVHlwZSwgUGVlckVycm9yVHlwZSwgQ29ubmVjdGlvbkV2ZW50VHlwZSwgU2VydmVyTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9lbnVtc1wiO1xuaW1wb3J0IHsgQmFzZUNvbm5lY3Rpb24gfSBmcm9tIFwiLi9iYXNlY29ubmVjdGlvblwiO1xuXG4vKipcbiAqIE1hbmFnZXMgYWxsIG5lZ290aWF0aW9ucyBiZXR3ZWVuIFBlZXJzLlxuICovXG5leHBvcnQgY2xhc3MgTmVnb3RpYXRvciB7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGNvbm5lY3Rpb246IEJhc2VDb25uZWN0aW9uKSB7IH1cblxuICAvKiogUmV0dXJucyBhIFBlZXJDb25uZWN0aW9uIG9iamVjdCBzZXQgdXAgY29ycmVjdGx5IChmb3IgZGF0YSwgbWVkaWEpLiAqL1xuICBzdGFydENvbm5lY3Rpb24ob3B0aW9uczogYW55KSB7XG4gICAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSB0aGlzLl9zdGFydFBlZXJDb25uZWN0aW9uKCk7XG5cbiAgICAvLyBTZXQgdGhlIGNvbm5lY3Rpb24ncyBQQy5cbiAgICB0aGlzLmNvbm5lY3Rpb24ucGVlckNvbm5lY3Rpb24gPSBwZWVyQ29ubmVjdGlvbjtcblxuICAgIGlmICh0aGlzLmNvbm5lY3Rpb24udHlwZSA9PT0gQ29ubmVjdGlvblR5cGUuTWVkaWEgJiYgb3B0aW9ucy5fc3RyZWFtKSB7XG4gICAgICB0aGlzLl9hZGRUcmFja3NUb0Nvbm5lY3Rpb24ob3B0aW9ucy5fc3RyZWFtLCBwZWVyQ29ubmVjdGlvbik7XG4gICAgfVxuXG4gICAgLy8gV2hhdCBkbyB3ZSBuZWVkIHRvIGRvIG5vdz9cbiAgICBpZiAob3B0aW9ucy5vcmlnaW5hdG9yKSB7XG4gICAgICBpZiAodGhpcy5jb25uZWN0aW9uLnR5cGUgPT09IENvbm5lY3Rpb25UeXBlLkRhdGEpIHtcbiAgICAgICAgY29uc3QgZGF0YUNvbm5lY3Rpb24gPSA8RGF0YUNvbm5lY3Rpb24+dGhpcy5jb25uZWN0aW9uO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpZzogUlRDRGF0YUNoYW5uZWxJbml0ID0geyBvcmRlcmVkOiAhIW9wdGlvbnMucmVsaWFibGUgfTtcblxuICAgICAgICBjb25zdCBkYXRhQ2hhbm5lbCA9IHBlZXJDb25uZWN0aW9uLmNyZWF0ZURhdGFDaGFubmVsKFxuICAgICAgICAgIGRhdGFDb25uZWN0aW9uLmxhYmVsLFxuICAgICAgICAgIGNvbmZpZ1xuICAgICAgICApO1xuICAgICAgICBkYXRhQ29ubmVjdGlvbi5pbml0aWFsaXplKGRhdGFDaGFubmVsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fbWFrZU9mZmVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFuZGxlU0RQKFwiT0ZGRVJcIiwgb3B0aW9ucy5zZHApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTdGFydCBhIFBDLiAqL1xuICBwcml2YXRlIF9zdGFydFBlZXJDb25uZWN0aW9uKCk6IFJUQ1BlZXJDb25uZWN0aW9uIHtcbiAgICBsb2dnZXIubG9nKFwiQ3JlYXRpbmcgUlRDUGVlckNvbm5lY3Rpb24uXCIpO1xuXG4gICAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24odGhpcy5jb25uZWN0aW9uLnByb3ZpZGVyLm9wdGlvbnMuY29uZmlnKTtcblxuICAgIHRoaXMuX3NldHVwTGlzdGVuZXJzKHBlZXJDb25uZWN0aW9uKTtcblxuICAgIHJldHVybiBwZWVyQ29ubmVjdGlvbjtcbiAgfVxuXG4gIC8qKiBTZXQgdXAgdmFyaW91cyBXZWJSVEMgbGlzdGVuZXJzLiAqL1xuICBwcml2YXRlIF9zZXR1cExpc3RlbmVycyhcbiAgICBwZWVyQ29ubmVjdGlvbjogUlRDUGVlckNvbm5lY3Rpb25cbiAgKSB7XG4gICAgY29uc3QgcGVlcklkID0gdGhpcy5jb25uZWN0aW9uLnBlZXI7XG4gICAgY29uc3QgY29ubmVjdGlvbklkID0gdGhpcy5jb25uZWN0aW9uLmNvbm5lY3Rpb25JZDtcbiAgICBjb25zdCBjb25uZWN0aW9uVHlwZSA9IHRoaXMuY29ubmVjdGlvbi50eXBlO1xuICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5jb25uZWN0aW9uLnByb3ZpZGVyO1xuXG4gICAgLy8gSUNFIENBTkRJREFURVMuXG4gICAgbG9nZ2VyLmxvZyhcIkxpc3RlbmluZyBmb3IgSUNFIGNhbmRpZGF0ZXMuXCIpO1xuXG4gICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAoIWV2dC5jYW5kaWRhdGUgfHwgIWV2dC5jYW5kaWRhdGUuY2FuZGlkYXRlKSByZXR1cm47XG5cbiAgICAgIGxvZ2dlci5sb2coYFJlY2VpdmVkIElDRSBjYW5kaWRhdGVzIGZvciAke3BlZXJJZH06YCwgZXZ0LmNhbmRpZGF0ZSk7XG5cbiAgICAgIHByb3ZpZGVyLnNvY2tldC5zZW5kKHtcbiAgICAgICAgdHlwZTogU2VydmVyTWVzc2FnZVR5cGUuQ2FuZGlkYXRlLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgY2FuZGlkYXRlOiBldnQuY2FuZGlkYXRlLFxuICAgICAgICAgIHR5cGU6IGNvbm5lY3Rpb25UeXBlLFxuICAgICAgICAgIGNvbm5lY3Rpb25JZDogY29ubmVjdGlvbklkXG4gICAgICAgIH0sXG4gICAgICAgIGRzdDogcGVlcklkXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcGVlckNvbm5lY3Rpb24ub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBzd2l0Y2ggKHBlZXJDb25uZWN0aW9uLmljZUNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgICBjYXNlIFwiZmFpbGVkXCI6XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcbiAgICAgICAgICAgIFwiaWNlQ29ubmVjdGlvblN0YXRlIGlzIGZhaWxlZCwgY2xvc2luZyBjb25uZWN0aW9ucyB0byBcIiArXG4gICAgICAgICAgICBwZWVySWRcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KFxuICAgICAgICAgICAgQ29ubmVjdGlvbkV2ZW50VHlwZS5FcnJvcixcbiAgICAgICAgICAgIG5ldyBFcnJvcihcIk5lZ290aWF0aW9uIG9mIGNvbm5lY3Rpb24gdG8gXCIgKyBwZWVySWQgKyBcIiBmYWlsZWQuXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNsb3NlZFwiOlxuICAgICAgICAgIGxvZ2dlci5sb2coXG4gICAgICAgICAgICBcImljZUNvbm5lY3Rpb25TdGF0ZSBpcyBjbG9zZWQsIGNsb3NpbmcgY29ubmVjdGlvbnMgdG8gXCIgK1xuICAgICAgICAgICAgcGVlcklkXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdChcbiAgICAgICAgICAgIENvbm5lY3Rpb25FdmVudFR5cGUuRXJyb3IsXG4gICAgICAgICAgICBuZXcgRXJyb3IoXCJDb25uZWN0aW9uIHRvIFwiICsgcGVlcklkICsgXCIgY2xvc2VkLlwiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5jb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkaXNjb25uZWN0ZWRcIjpcbiAgICAgICAgICBsb2dnZXIubG9nKFxuICAgICAgICAgICAgXCJpY2VDb25uZWN0aW9uU3RhdGUgY2hhbmdlZCB0byBkaXNjb25uZWN0ZWQgb24gdGhlIGNvbm5lY3Rpb24gd2l0aCBcIiArXG4gICAgICAgICAgICBwZWVySWRcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY29tcGxldGVkXCI6XG4gICAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSB1dGlsLm5vb3A7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KENvbm5lY3Rpb25FdmVudFR5cGUuSWNlU3RhdGVDaGFuZ2VkLCBwZWVyQ29ubmVjdGlvbi5pY2VDb25uZWN0aW9uU3RhdGUpO1xuICAgIH07XG5cbiAgICAvLyBEQVRBQ09OTkVDVElPTi5cbiAgICBsb2dnZXIubG9nKFwiTGlzdGVuaW5nIGZvciBkYXRhIGNoYW5uZWxcIik7XG4gICAgLy8gRmlyZWQgYmV0d2VlbiBvZmZlciBhbmQgYW5zd2VyLCBzbyBvcHRpb25zIHNob3VsZCBhbHJlYWR5IGJlIHNhdmVkXG4gICAgLy8gaW4gdGhlIG9wdGlvbnMgaGFzaC5cbiAgICBwZWVyQ29ubmVjdGlvbi5vbmRhdGFjaGFubmVsID0gKGV2dCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlY2VpdmVkIGRhdGEgY2hhbm5lbFwiKTtcblxuICAgICAgY29uc3QgZGF0YUNoYW5uZWwgPSBldnQuY2hhbm5lbDtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSA8RGF0YUNvbm5lY3Rpb24+KFxuICAgICAgICBwcm92aWRlci5nZXRDb25uZWN0aW9uKHBlZXJJZCwgY29ubmVjdGlvbklkKVxuICAgICAgKTtcblxuICAgICAgY29ubmVjdGlvbi5pbml0aWFsaXplKGRhdGFDaGFubmVsKTtcbiAgICB9O1xuXG4gICAgLy8gTUVESUFDT05ORUNUSU9OLlxuICAgIGxvZ2dlci5sb2coXCJMaXN0ZW5pbmcgZm9yIHJlbW90ZSBzdHJlYW1cIik7XG5cbiAgICBwZWVyQ29ubmVjdGlvbi5vbnRyYWNrID0gKGV2dCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhcIlJlY2VpdmVkIHJlbW90ZSBzdHJlYW1cIik7XG5cbiAgICAgIGNvbnN0IHN0cmVhbSA9IGV2dC5zdHJlYW1zWzBdO1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IHByb3ZpZGVyLmdldENvbm5lY3Rpb24ocGVlcklkLCBjb25uZWN0aW9uSWQpO1xuXG4gICAgICBpZiAoY29ubmVjdGlvbi50eXBlID09PSBDb25uZWN0aW9uVHlwZS5NZWRpYSkge1xuICAgICAgICBjb25zdCBtZWRpYUNvbm5lY3Rpb24gPSA8TWVkaWFDb25uZWN0aW9uPmNvbm5lY3Rpb247XG5cbiAgICAgICAgdGhpcy5fYWRkU3RyZWFtVG9NZWRpYUNvbm5lY3Rpb24oc3RyZWFtLCBtZWRpYUNvbm5lY3Rpb24pO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjbGVhbnVwKCk6IHZvaWQge1xuICAgIGxvZ2dlci5sb2coXCJDbGVhbmluZyB1cCBQZWVyQ29ubmVjdGlvbiB0byBcIiArIHRoaXMuY29ubmVjdGlvbi5wZWVyKTtcblxuICAgIGNvbnN0IHBlZXJDb25uZWN0aW9uID0gdGhpcy5jb25uZWN0aW9uLnBlZXJDb25uZWN0aW9uO1xuXG4gICAgaWYgKCFwZWVyQ29ubmVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29ubmVjdGlvbi5wZWVyQ29ubmVjdGlvbiA9IG51bGw7XG5cbiAgICAvL3Vuc3Vic2NyaWJlIGZyb20gYWxsIFBlZXJDb25uZWN0aW9uJ3MgZXZlbnRzXG4gICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBwZWVyQ29ubmVjdGlvbi5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IHBlZXJDb25uZWN0aW9uLm9uZGF0YWNoYW5uZWwgPSBwZWVyQ29ubmVjdGlvbi5vbnRyYWNrID0gKCkgPT4geyB9O1xuXG4gICAgY29uc3QgcGVlckNvbm5lY3Rpb25Ob3RDbG9zZWQgPSBwZWVyQ29ubmVjdGlvbi5zaWduYWxpbmdTdGF0ZSAhPT0gXCJjbG9zZWRcIjtcbiAgICBsZXQgZGF0YUNoYW5uZWxOb3RDbG9zZWQgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLmNvbm5lY3Rpb24udHlwZSA9PT0gQ29ubmVjdGlvblR5cGUuRGF0YSkge1xuICAgICAgY29uc3QgZGF0YUNvbm5lY3Rpb24gPSA8RGF0YUNvbm5lY3Rpb24+dGhpcy5jb25uZWN0aW9uO1xuICAgICAgY29uc3QgZGF0YUNoYW5uZWwgPSBkYXRhQ29ubmVjdGlvbi5kYXRhQ2hhbm5lbDtcblxuICAgICAgaWYgKGRhdGFDaGFubmVsKSB7XG4gICAgICAgIGRhdGFDaGFubmVsTm90Q2xvc2VkID0gISFkYXRhQ2hhbm5lbC5yZWFkeVN0YXRlICYmIGRhdGFDaGFubmVsLnJlYWR5U3RhdGUgIT09IFwiY2xvc2VkXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBlZXJDb25uZWN0aW9uTm90Q2xvc2VkIHx8IGRhdGFDaGFubmVsTm90Q2xvc2VkKSB7XG4gICAgICBwZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX21ha2VPZmZlcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwZWVyQ29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvbi5wZWVyQ29ubmVjdGlvbjtcbiAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuY29ubmVjdGlvbi5wcm92aWRlcjtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBvZmZlciA9IGF3YWl0IHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKFxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub3B0aW9ucy5jb25zdHJhaW50c1xuICAgICAgKTtcblxuICAgICAgbG9nZ2VyLmxvZyhcIkNyZWF0ZWQgb2ZmZXIuXCIpO1xuXG4gICAgICBpZiAodGhpcy5jb25uZWN0aW9uLm9wdGlvbnMuc2RwVHJhbnNmb3JtICYmIHR5cGVvZiB0aGlzLmNvbm5lY3Rpb24ub3B0aW9ucy5zZHBUcmFuc2Zvcm0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2ZmZXIuc2RwID0gdGhpcy5jb25uZWN0aW9uLm9wdGlvbnMuc2RwVHJhbnNmb3JtKG9mZmVyLnNkcCkgfHwgb2ZmZXIuc2RwO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKG9mZmVyKTtcblxuICAgICAgICBsb2dnZXIubG9nKFwiU2V0IGxvY2FsRGVzY3JpcHRpb246XCIsIG9mZmVyLCBgZm9yOiR7dGhpcy5jb25uZWN0aW9uLnBlZXJ9YCk7XG5cbiAgICAgICAgbGV0IHBheWxvYWQ6IGFueSA9IHtcbiAgICAgICAgICBzZHA6IG9mZmVyLFxuICAgICAgICAgIHR5cGU6IHRoaXMuY29ubmVjdGlvbi50eXBlLFxuICAgICAgICAgIGNvbm5lY3Rpb25JZDogdGhpcy5jb25uZWN0aW9uLmNvbm5lY3Rpb25JZCxcbiAgICAgICAgICBtZXRhZGF0YTogdGhpcy5jb25uZWN0aW9uLm1ldGFkYXRhLFxuICAgICAgICAgIGJyb3dzZXI6IHV0aWwuYnJvd3NlclxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb24udHlwZSA9PT0gQ29ubmVjdGlvblR5cGUuRGF0YSkge1xuICAgICAgICAgIGNvbnN0IGRhdGFDb25uZWN0aW9uID0gPERhdGFDb25uZWN0aW9uPnRoaXMuY29ubmVjdGlvbjtcblxuICAgICAgICAgIHBheWxvYWQgPSB7XG4gICAgICAgICAgICAuLi5wYXlsb2FkLFxuICAgICAgICAgICAgbGFiZWw6IGRhdGFDb25uZWN0aW9uLmxhYmVsLFxuICAgICAgICAgICAgcmVsaWFibGU6IGRhdGFDb25uZWN0aW9uLnJlbGlhYmxlLFxuICAgICAgICAgICAgc2VyaWFsaXphdGlvbjogZGF0YUNvbm5lY3Rpb24uc2VyaWFsaXphdGlvblxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBwcm92aWRlci5zb2NrZXQuc2VuZCh7XG4gICAgICAgICAgdHlwZTogU2VydmVyTWVzc2FnZVR5cGUuT2ZmZXIsXG4gICAgICAgICAgcGF5bG9hZCxcbiAgICAgICAgICBkc3Q6IHRoaXMuY29ubmVjdGlvbi5wZWVyXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIFRPRE86IGludmVzdGlnYXRlIHdoeSBfbWFrZU9mZmVyIGlzIGJlaW5nIGNhbGxlZCBmcm9tIHRoZSBhbnN3ZXJcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGVyciAhPVxuICAgICAgICAgIFwiT3BlcmF0aW9uRXJyb3I6IEZhaWxlZCB0byBzZXQgbG9jYWwgb2ZmZXIgc2RwOiBDYWxsZWQgaW4gd3Jvbmcgc3RhdGU6IGtIYXZlUmVtb3RlT2ZmZXJcIlxuICAgICAgICApIHtcbiAgICAgICAgICBwcm92aWRlci5lbWl0RXJyb3IoUGVlckVycm9yVHlwZS5XZWJSVEMsIGVycik7XG4gICAgICAgICAgbG9nZ2VyLmxvZyhcIkZhaWxlZCB0byBzZXRMb2NhbERlc2NyaXB0aW9uLCBcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycl8xKSB7XG4gICAgICBwcm92aWRlci5lbWl0RXJyb3IoUGVlckVycm9yVHlwZS5XZWJSVEMsIGVycl8xKTtcbiAgICAgIGxvZ2dlci5sb2coXCJGYWlsZWQgdG8gY3JlYXRlT2ZmZXIsIFwiLCBlcnJfMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfbWFrZUFuc3dlcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwZWVyQ29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvbi5wZWVyQ29ubmVjdGlvbjtcbiAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuY29ubmVjdGlvbi5wcm92aWRlcjtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCBwZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKTtcbiAgICAgIGxvZ2dlci5sb2coXCJDcmVhdGVkIGFuc3dlci5cIik7XG5cbiAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb24ub3B0aW9ucy5zZHBUcmFuc2Zvcm0gJiYgdHlwZW9mIHRoaXMuY29ubmVjdGlvbi5vcHRpb25zLnNkcFRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBhbnN3ZXIuc2RwID0gdGhpcy5jb25uZWN0aW9uLm9wdGlvbnMuc2RwVHJhbnNmb3JtKGFuc3dlci5zZHApIHx8IGFuc3dlci5zZHA7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oYW5zd2VyKTtcblxuICAgICAgICBsb2dnZXIubG9nKGBTZXQgbG9jYWxEZXNjcmlwdGlvbjpgLCBhbnN3ZXIsIGBmb3I6JHt0aGlzLmNvbm5lY3Rpb24ucGVlcn1gKTtcblxuICAgICAgICBwcm92aWRlci5zb2NrZXQuc2VuZCh7XG4gICAgICAgICAgdHlwZTogU2VydmVyTWVzc2FnZVR5cGUuQW5zd2VyLFxuICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHNkcDogYW5zd2VyLFxuICAgICAgICAgICAgdHlwZTogdGhpcy5jb25uZWN0aW9uLnR5cGUsXG4gICAgICAgICAgICBjb25uZWN0aW9uSWQ6IHRoaXMuY29ubmVjdGlvbi5jb25uZWN0aW9uSWQsXG4gICAgICAgICAgICBicm93c2VyOiB1dGlsLmJyb3dzZXJcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRzdDogdGhpcy5jb25uZWN0aW9uLnBlZXJcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcHJvdmlkZXIuZW1pdEVycm9yKFBlZXJFcnJvclR5cGUuV2ViUlRDLCBlcnIpO1xuICAgICAgICBsb2dnZXIubG9nKFwiRmFpbGVkIHRvIHNldExvY2FsRGVzY3JpcHRpb24sIFwiLCBlcnIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycl8xKSB7XG4gICAgICBwcm92aWRlci5lbWl0RXJyb3IoUGVlckVycm9yVHlwZS5XZWJSVEMsIGVycl8xKTtcbiAgICAgIGxvZ2dlci5sb2coXCJGYWlsZWQgdG8gY3JlYXRlIGFuc3dlciwgXCIsIGVycl8xKTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlIGFuIFNEUC4gKi9cbiAgYXN5bmMgaGFuZGxlU0RQKFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBzZHA6IGFueVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBzZHAgPSBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHNkcCk7XG4gICAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSB0aGlzLmNvbm5lY3Rpb24ucGVlckNvbm5lY3Rpb247XG4gICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLmNvbm5lY3Rpb24ucHJvdmlkZXI7XG5cbiAgICBsb2dnZXIubG9nKFwiU2V0dGluZyByZW1vdGUgZGVzY3JpcHRpb25cIiwgc2RwKTtcblxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKHNkcCk7XG4gICAgICBsb2dnZXIubG9nKGBTZXQgcmVtb3RlRGVzY3JpcHRpb246JHt0eXBlfSBmb3I6JHt0aGlzLmNvbm5lY3Rpb24ucGVlcn1gKTtcbiAgICAgIGlmICh0eXBlID09PSBcIk9GRkVSXCIpIHtcbiAgICAgICAgYXdhaXQgc2VsZi5fbWFrZUFuc3dlcigpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcHJvdmlkZXIuZW1pdEVycm9yKFBlZXJFcnJvclR5cGUuV2ViUlRDLCBlcnIpO1xuICAgICAgbG9nZ2VyLmxvZyhcIkZhaWxlZCB0byBzZXRSZW1vdGVEZXNjcmlwdGlvbiwgXCIsIGVycik7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZSBhIGNhbmRpZGF0ZS4gKi9cbiAgYXN5bmMgaGFuZGxlQ2FuZGlkYXRlKGljZTogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nZ2VyLmxvZyhgaGFuZGxlQ2FuZGlkYXRlOmAsIGljZSk7XG5cbiAgICBjb25zdCBjYW5kaWRhdGUgPSBpY2UuY2FuZGlkYXRlO1xuICAgIGNvbnN0IHNkcE1MaW5lSW5kZXggPSBpY2Uuc2RwTUxpbmVJbmRleDtcbiAgICBjb25zdCBzZHBNaWQgPSBpY2Uuc2RwTWlkO1xuICAgIGNvbnN0IHBlZXJDb25uZWN0aW9uID0gdGhpcy5jb25uZWN0aW9uLnBlZXJDb25uZWN0aW9uO1xuICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5jb25uZWN0aW9uLnByb3ZpZGVyO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHBlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShcbiAgICAgICAgbmV3IFJUQ0ljZUNhbmRpZGF0ZSh7XG4gICAgICAgICAgc2RwTWlkOiBzZHBNaWQsXG4gICAgICAgICAgc2RwTUxpbmVJbmRleDogc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICBjYW5kaWRhdGU6IGNhbmRpZGF0ZVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGxvZ2dlci5sb2coYEFkZGVkIElDRSBjYW5kaWRhdGUgZm9yOiR7dGhpcy5jb25uZWN0aW9uLnBlZXJ9YCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBwcm92aWRlci5lbWl0RXJyb3IoUGVlckVycm9yVHlwZS5XZWJSVEMsIGVycik7XG4gICAgICBsb2dnZXIubG9nKFwiRmFpbGVkIHRvIGhhbmRsZUNhbmRpZGF0ZSwgXCIsIGVycik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVHJhY2tzVG9Db25uZWN0aW9uKFxuICAgIHN0cmVhbTogTWVkaWFTdHJlYW0sXG4gICAgcGVlckNvbm5lY3Rpb246IFJUQ1BlZXJDb25uZWN0aW9uXG4gICk6IHZvaWQge1xuICAgIGxvZ2dlci5sb2coYGFkZCB0cmFja3MgZnJvbSBzdHJlYW0gJHtzdHJlYW0uaWR9IHRvIHBlZXIgY29ubmVjdGlvbmApO1xuXG4gICAgaWYgKCFwZWVyQ29ubmVjdGlvbi5hZGRUcmFjaykge1xuICAgICAgcmV0dXJuIGxvZ2dlci5lcnJvcihcbiAgICAgICAgYFlvdXIgYnJvd3NlciBkb2VzJ3Qgc3VwcG9ydCBSVENQZWVyQ29ubmVjdGlvbiNhZGRUcmFjay4gSWdub3JlZC5gXG4gICAgICApO1xuICAgIH1cblxuICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHtcbiAgICAgIHBlZXJDb25uZWN0aW9uLmFkZFRyYWNrKHRyYWNrLCBzdHJlYW0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkU3RyZWFtVG9NZWRpYUNvbm5lY3Rpb24oXG4gICAgc3RyZWFtOiBNZWRpYVN0cmVhbSxcbiAgICBtZWRpYUNvbm5lY3Rpb246IE1lZGlhQ29ubmVjdGlvblxuICApOiB2b2lkIHtcbiAgICBsb2dnZXIubG9nKFxuICAgICAgYGFkZCBzdHJlYW0gJHtzdHJlYW0uaWR9IHRvIG1lZGlhIGNvbm5lY3Rpb24gJHtcbiAgICAgIG1lZGlhQ29ubmVjdGlvbi5jb25uZWN0aW9uSWRcbiAgICAgIH1gXG4gICAgKTtcblxuICAgIG1lZGlhQ29ubmVjdGlvbi5hZGRTdHJlYW0oc3RyZWFtKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudGVtaXR0ZXIzXCI7XG5pbXBvcnQgeyBQZWVyIH0gZnJvbSBcIi4vcGVlclwiO1xuaW1wb3J0IHsgU2VydmVyTWVzc2FnZSB9IGZyb20gXCIuL3NlcnZlcm1lc3NhZ2VcIjtcbmltcG9ydCB7IENvbm5lY3Rpb25UeXBlIH0gZnJvbSBcIi4vZW51bXNcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VDb25uZWN0aW9uIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgcHJvdGVjdGVkIF9vcGVuID0gZmFsc2U7XG5cbiAgcmVhZG9ubHkgbWV0YWRhdGE6IGFueTtcbiAgY29ubmVjdGlvbklkOiBzdHJpbmc7XG5cbiAgcGVlckNvbm5lY3Rpb246IFJUQ1BlZXJDb25uZWN0aW9uO1xuXG4gIGFic3RyYWN0IGdldCB0eXBlKCk6IENvbm5lY3Rpb25UeXBlO1xuXG4gIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLl9vcGVuO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgcGVlcjogc3RyaW5nLFxuICAgIHB1YmxpYyBwcm92aWRlcjogUGVlcixcbiAgICByZWFkb25seSBvcHRpb25zOiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubWV0YWRhdGEgPSBvcHRpb25zLm1ldGFkYXRhO1xuICB9XG5cbiAgYWJzdHJhY3QgY2xvc2UoKTogdm9pZDtcblxuICBhYnN0cmFjdCBoYW5kbGVNZXNzYWdlKG1lc3NhZ2U6IFNlcnZlck1lc3NhZ2UpOiB2b2lkO1xufVxuIiwgImltcG9ydCB7IHV0aWwgfSBmcm9tIFwiLi91dGlsXCI7XG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHsgTmVnb3RpYXRvciB9IGZyb20gXCIuL25lZ290aWF0b3JcIjtcbmltcG9ydCB7IENvbm5lY3Rpb25UeXBlLCBDb25uZWN0aW9uRXZlbnRUeXBlLCBTZXJ2ZXJNZXNzYWdlVHlwZSB9IGZyb20gXCIuL2VudW1zXCI7XG5pbXBvcnQgeyBQZWVyIH0gZnJvbSBcIi4vcGVlclwiO1xuaW1wb3J0IHsgQmFzZUNvbm5lY3Rpb24gfSBmcm9tIFwiLi9iYXNlY29ubmVjdGlvblwiO1xuaW1wb3J0IHsgU2VydmVyTWVzc2FnZSB9IGZyb20gXCIuL3NlcnZlcm1lc3NhZ2VcIjtcbmltcG9ydCB7IEFuc3dlck9wdGlvbiB9IGZyb20gXCIuLlwiO1xuXG4vKipcbiAqIFdyYXBzIHRoZSBzdHJlYW1pbmcgaW50ZXJmYWNlIGJldHdlZW4gdHdvIFBlZXJzLlxuICovXG5leHBvcnQgY2xhc3MgTWVkaWFDb25uZWN0aW9uIGV4dGVuZHMgQmFzZUNvbm5lY3Rpb24ge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJRF9QUkVGSVggPSBcIm1jX1wiO1xuXG4gIHByaXZhdGUgX25lZ290aWF0b3I6IE5lZ290aWF0b3I7XG4gIHByaXZhdGUgX2xvY2FsU3RyZWFtOiBNZWRpYVN0cmVhbTtcbiAgcHJpdmF0ZSBfcmVtb3RlU3RyZWFtOiBNZWRpYVN0cmVhbTtcblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gQ29ubmVjdGlvblR5cGUuTWVkaWE7XG4gIH1cblxuICBnZXQgbG9jYWxTdHJlYW0oKTogTWVkaWFTdHJlYW0geyByZXR1cm4gdGhpcy5fbG9jYWxTdHJlYW07IH1cbiAgZ2V0IHJlbW90ZVN0cmVhbSgpOiBNZWRpYVN0cmVhbSB7IHJldHVybiB0aGlzLl9yZW1vdGVTdHJlYW07IH1cblxuICBjb25zdHJ1Y3RvcihwZWVySWQ6IHN0cmluZywgcHJvdmlkZXI6IFBlZXIsIG9wdGlvbnM6IGFueSkge1xuICAgIHN1cGVyKHBlZXJJZCwgcHJvdmlkZXIsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fbG9jYWxTdHJlYW0gPSB0aGlzLm9wdGlvbnMuX3N0cmVhbTtcbiAgICB0aGlzLmNvbm5lY3Rpb25JZCA9XG4gICAgICB0aGlzLm9wdGlvbnMuY29ubmVjdGlvbklkIHx8XG4gICAgICBNZWRpYUNvbm5lY3Rpb24uSURfUFJFRklYICsgdXRpbC5yYW5kb21Ub2tlbigpO1xuXG4gICAgdGhpcy5fbmVnb3RpYXRvciA9IG5ldyBOZWdvdGlhdG9yKHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtKSB7XG4gICAgICB0aGlzLl9uZWdvdGlhdG9yLnN0YXJ0Q29ubmVjdGlvbih7XG4gICAgICAgIF9zdHJlYW06IHRoaXMuX2xvY2FsU3RyZWFtLFxuICAgICAgICBvcmlnaW5hdG9yOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhZGRTdHJlYW0ocmVtb3RlU3RyZWFtKSB7XG4gICAgbG9nZ2VyLmxvZyhcIlJlY2VpdmluZyBzdHJlYW1cIiwgcmVtb3RlU3RyZWFtKTtcblxuICAgIHRoaXMuX3JlbW90ZVN0cmVhbSA9IHJlbW90ZVN0cmVhbTtcbiAgICBzdXBlci5lbWl0KENvbm5lY3Rpb25FdmVudFR5cGUuU3RyZWFtLCByZW1vdGVTdHJlYW0pOyAvLyBTaG91bGQgd2UgY2FsbCB0aGlzIGBvcGVuYD9cbiAgfVxuXG4gIGhhbmRsZU1lc3NhZ2UobWVzc2FnZTogU2VydmVyTWVzc2FnZSk6IHZvaWQge1xuICAgIGNvbnN0IHR5cGUgPSBtZXNzYWdlLnR5cGU7XG4gICAgY29uc3QgcGF5bG9hZCA9IG1lc3NhZ2UucGF5bG9hZDtcblxuICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XG4gICAgICBjYXNlIFNlcnZlck1lc3NhZ2VUeXBlLkFuc3dlcjpcbiAgICAgICAgLy8gRm9yd2FyZCB0byBuZWdvdGlhdG9yXG4gICAgICAgIHRoaXMuX25lZ290aWF0b3IuaGFuZGxlU0RQKHR5cGUsIHBheWxvYWQuc2RwKTtcbiAgICAgICAgdGhpcy5fb3BlbiA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZXJ2ZXJNZXNzYWdlVHlwZS5DYW5kaWRhdGU6XG4gICAgICAgIHRoaXMuX25lZ290aWF0b3IuaGFuZGxlQ2FuZGlkYXRlKHBheWxvYWQuY2FuZGlkYXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIud2FybihgVW5yZWNvZ25pemVkIG1lc3NhZ2UgdHlwZToke3R5cGV9IGZyb20gcGVlcjoke3RoaXMucGVlcn1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgYW5zd2VyKHN0cmVhbTogTWVkaWFTdHJlYW0sIG9wdGlvbnM6IEFuc3dlck9wdGlvbiA9IHt9KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtKSB7XG4gICAgICBsb2dnZXIud2FybihcbiAgICAgICAgXCJMb2NhbCBzdHJlYW0gYWxyZWFkeSBleGlzdHMgb24gdGhpcyBNZWRpYUNvbm5lY3Rpb24uIEFyZSB5b3UgYW5zd2VyaW5nIGEgY2FsbCB0d2ljZT9cIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9sb2NhbFN0cmVhbSA9IHN0cmVhbTtcblxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc2RwVHJhbnNmb3JtKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuc2RwVHJhbnNmb3JtID0gb3B0aW9ucy5zZHBUcmFuc2Zvcm07XG4gICAgfVxuXG4gICAgdGhpcy5fbmVnb3RpYXRvci5zdGFydENvbm5lY3Rpb24oeyAuLi50aGlzLm9wdGlvbnMuX3BheWxvYWQsIF9zdHJlYW06IHN0cmVhbSB9KTtcbiAgICAvLyBSZXRyaWV2ZSBsb3N0IG1lc3NhZ2VzIHN0b3JlZCBiZWNhdXNlIFBlZXJDb25uZWN0aW9uIG5vdCBzZXQgdXAuXG4gICAgY29uc3QgbWVzc2FnZXMgPSB0aGlzLnByb3ZpZGVyLl9nZXRNZXNzYWdlcyh0aGlzLmNvbm5lY3Rpb25JZCk7XG5cbiAgICBmb3IgKGxldCBtZXNzYWdlIG9mIG1lc3NhZ2VzKSB7XG4gICAgICB0aGlzLmhhbmRsZU1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fb3BlbiA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3NlZCBmdW5jdGlvbmFsaXR5IGZvciB1c2Vycy5cbiAgICovXG5cbiAgLyoqIEFsbG93cyB1c2VyIHRvIGNsb3NlIGNvbm5lY3Rpb24uICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9uZWdvdGlhdG9yKSB7XG4gICAgICB0aGlzLl9uZWdvdGlhdG9yLmNsZWFudXAoKTtcbiAgICAgIHRoaXMuX25lZ290aWF0b3IgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX2xvY2FsU3RyZWFtID0gbnVsbDtcbiAgICB0aGlzLl9yZW1vdGVTdHJlYW0gPSBudWxsO1xuXG4gICAgaWYgKHRoaXMucHJvdmlkZXIpIHtcbiAgICAgIHRoaXMucHJvdmlkZXIuX3JlbW92ZUNvbm5lY3Rpb24odGhpcyk7XG5cbiAgICAgIHRoaXMucHJvdmlkZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLl9zdHJlYW0pIHtcbiAgICAgIHRoaXMub3B0aW9ucy5fc3RyZWFtID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcblxuICAgIHN1cGVyLmVtaXQoQ29ubmVjdGlvbkV2ZW50VHlwZS5DbG9zZSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRlbWl0dGVyM1wiO1xuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi9sb2dnZXJcIjtcblxuZXhwb3J0IGNsYXNzIEVuY29kaW5nUXVldWUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICByZWFkb25seSBmaWxlUmVhZGVyOiBGaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICBwcml2YXRlIF9xdWV1ZTogQmxvYltdID0gW107XG4gIHByaXZhdGUgX3Byb2Nlc3Npbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5maWxlUmVhZGVyLm9ubG9hZCA9IChldnQpID0+IHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NpbmcgPSBmYWxzZTtcblxuICAgICAgaWYgKGV2dC50YXJnZXQpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkb25lJywgZXZ0LnRhcmdldC5yZXN1bHQgYXMgQXJyYXlCdWZmZXIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRvTmV4dFRhc2soKTtcbiAgICB9O1xuXG4gICAgdGhpcy5maWxlUmVhZGVyLm9uZXJyb3IgPSAoZXZ0KSA9PiB7XG4gICAgICBsb2dnZXIuZXJyb3IoYEVuY29kaW5nUXVldWUgZXJyb3I6YCwgZXZ0KTtcbiAgICAgIHRoaXMuX3Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGV2dCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHF1ZXVlKCk6IEJsb2JbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXVlO1xuICB9XG5cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGg7XG4gIH1cblxuICBnZXQgcHJvY2Vzc2luZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc2luZztcbiAgfVxuXG4gIGVucXVlKGJsb2I6IEJsb2IpOiB2b2lkIHtcbiAgICB0aGlzLnF1ZXVlLnB1c2goYmxvYik7XG5cbiAgICBpZiAodGhpcy5wcm9jZXNzaW5nKSByZXR1cm47XG5cbiAgICB0aGlzLmRvTmV4dFRhc2soKTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5maWxlUmVhZGVyLmFib3J0KCk7XG4gICAgdGhpcy5fcXVldWUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgZG9OZXh0VGFzaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSByZXR1cm47XG4gICAgaWYgKHRoaXMucHJvY2Vzc2luZykgcmV0dXJuO1xuXG4gICAgdGhpcy5fcHJvY2Vzc2luZyA9IHRydWU7XG5cbiAgICB0aGlzLmZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIodGhpcy5xdWV1ZS5zaGlmdCgpKTtcbiAgfVxufSIsICJpbXBvcnQgeyB1dGlsIH0gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi9sb2dnZXJcIjtcbmltcG9ydCB7IE5lZ290aWF0b3IgfSBmcm9tIFwiLi9uZWdvdGlhdG9yXCI7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uVHlwZSxcbiAgQ29ubmVjdGlvbkV2ZW50VHlwZSxcbiAgU2VyaWFsaXphdGlvblR5cGUsXG4gIFNlcnZlck1lc3NhZ2VUeXBlXG59IGZyb20gXCIuL2VudW1zXCI7XG5pbXBvcnQgeyBQZWVyIH0gZnJvbSBcIi4vcGVlclwiO1xuaW1wb3J0IHsgQmFzZUNvbm5lY3Rpb24gfSBmcm9tIFwiLi9iYXNlY29ubmVjdGlvblwiO1xuaW1wb3J0IHsgU2VydmVyTWVzc2FnZSB9IGZyb20gXCIuL3NlcnZlcm1lc3NhZ2VcIjtcbmltcG9ydCB7IEVuY29kaW5nUXVldWUgfSBmcm9tICcuL2VuY29kaW5nUXVldWUnO1xuaW1wb3J0IHsgRGF0YUNvbm5lY3Rpb24gYXMgSURhdGFDb25uZWN0aW9uIH0gZnJvbSAnLi4vaW5kZXgnO1xuXG4vKipcbiAqIFdyYXBzIGEgRGF0YUNoYW5uZWwgYmV0d2VlbiB0d28gUGVlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRhQ29ubmVjdGlvbiBleHRlbmRzIEJhc2VDb25uZWN0aW9uIGltcGxlbWVudHMgSURhdGFDb25uZWN0aW9uIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSURfUFJFRklYID0gXCJkY19cIjtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTUFYX0JVRkZFUkVEX0FNT1VOVCA9IDggKiAxMDI0ICogMTAyNDtcblxuICBwcml2YXRlIF9uZWdvdGlhdG9yOiBOZWdvdGlhdG9yO1xuICByZWFkb25seSBsYWJlbDogc3RyaW5nO1xuICByZWFkb25seSBzZXJpYWxpemF0aW9uOiBTZXJpYWxpemF0aW9uVHlwZTtcbiAgcmVhZG9ubHkgcmVsaWFibGU6IGJvb2xlYW47XG4gIHN0cmluZ2lmeTogKGRhdGE6IGFueSkgPT4gc3RyaW5nID0gSlNPTi5zdHJpbmdpZnk7XG4gIHBhcnNlOiAoZGF0YTogc3RyaW5nKSA9PiBhbnkgPSBKU09OLnBhcnNlO1xuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiBDb25uZWN0aW9uVHlwZS5EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVmZmVyOiBhbnlbXSA9IFtdO1xuICBwcml2YXRlIF9idWZmZXJTaXplID0gMDtcbiAgcHJpdmF0ZSBfYnVmZmVyaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2NodW5rZWREYXRhOiB7XG4gICAgW2lkOiBudW1iZXJdOiB7XG4gICAgICBkYXRhOiBCbG9iW10sXG4gICAgICBjb3VudDogbnVtYmVyLFxuICAgICAgdG90YWw6IG51bWJlclxuICAgIH1cbiAgfSA9IHt9O1xuXG4gIHByaXZhdGUgX2RjOiBSVENEYXRhQ2hhbm5lbDtcbiAgcHJpdmF0ZSBfZW5jb2RpbmdRdWV1ZSA9IG5ldyBFbmNvZGluZ1F1ZXVlKCk7XG5cbiAgZ2V0IGRhdGFDaGFubmVsKCk6IFJUQ0RhdGFDaGFubmVsIHtcbiAgICByZXR1cm4gdGhpcy5fZGM7XG4gIH1cblxuICBnZXQgYnVmZmVyU2l6ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYnVmZmVyU2l6ZTsgfVxuXG4gIGNvbnN0cnVjdG9yKHBlZXJJZDogc3RyaW5nLCBwcm92aWRlcjogUGVlciwgb3B0aW9uczogYW55KSB7XG4gICAgc3VwZXIocGVlcklkLCBwcm92aWRlciwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmNvbm5lY3Rpb25JZCA9XG4gICAgICB0aGlzLm9wdGlvbnMuY29ubmVjdGlvbklkIHx8IERhdGFDb25uZWN0aW9uLklEX1BSRUZJWCArIHV0aWwucmFuZG9tVG9rZW4oKTtcblxuICAgIHRoaXMubGFiZWwgPSB0aGlzLm9wdGlvbnMubGFiZWwgfHwgdGhpcy5jb25uZWN0aW9uSWQ7XG4gICAgdGhpcy5zZXJpYWxpemF0aW9uID0gdGhpcy5vcHRpb25zLnNlcmlhbGl6YXRpb24gfHwgU2VyaWFsaXphdGlvblR5cGUuQmluYXJ5O1xuICAgIHRoaXMucmVsaWFibGUgPSAhIXRoaXMub3B0aW9ucy5yZWxpYWJsZTtcblxuICAgIHRoaXMuX2VuY29kaW5nUXVldWUub24oJ2RvbmUnLCAoYWI6IEFycmF5QnVmZmVyKSA9PiB7XG4gICAgICB0aGlzLl9idWZmZXJlZFNlbmQoYWIpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZW5jb2RpbmdRdWV1ZS5vbignZXJyb3InLCAoKSA9PiB7XG4gICAgICBsb2dnZXIuZXJyb3IoYERDIyR7dGhpcy5jb25uZWN0aW9uSWR9OiBFcnJvciBvY2N1cmVkIGluIGVuY29kaW5nIGZyb20gYmxvYiB0byBhcnJheWJ1ZmZlciwgY2xvc2UgRENgKTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX25lZ290aWF0b3IgPSBuZXcgTmVnb3RpYXRvcih0aGlzKTtcblxuICAgIHRoaXMuX25lZ290aWF0b3Iuc3RhcnRDb25uZWN0aW9uKFxuICAgICAgdGhpcy5vcHRpb25zLl9wYXlsb2FkIHx8IHtcbiAgICAgICAgb3JpZ2luYXRvcjogdHJ1ZVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICAvKiogQ2FsbGVkIGJ5IHRoZSBOZWdvdGlhdG9yIHdoZW4gdGhlIERhdGFDaGFubmVsIGlzIHJlYWR5LiAqL1xuICBpbml0aWFsaXplKGRjOiBSVENEYXRhQ2hhbm5lbCk6IHZvaWQge1xuICAgIHRoaXMuX2RjID0gZGM7XG4gICAgdGhpcy5fY29uZmlndXJlRGF0YUNoYW5uZWwoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbmZpZ3VyZURhdGFDaGFubmVsKCk6IHZvaWQge1xuICAgIGlmICghdXRpbC5zdXBwb3J0cy5iaW5hcnlCbG9iIHx8IHV0aWwuc3VwcG9ydHMucmVsaWFibGUpIHtcbiAgICAgIHRoaXMuZGF0YUNoYW5uZWwuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiAgICB9XG5cbiAgICB0aGlzLmRhdGFDaGFubmVsLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgIGxvZ2dlci5sb2coYERDIyR7dGhpcy5jb25uZWN0aW9uSWR9IGRjIGNvbm5lY3Rpb24gc3VjY2Vzc2ApO1xuICAgICAgdGhpcy5fb3BlbiA9IHRydWU7XG4gICAgICB0aGlzLmVtaXQoQ29ubmVjdGlvbkV2ZW50VHlwZS5PcGVuKTtcbiAgICB9O1xuXG4gICAgdGhpcy5kYXRhQ2hhbm5lbC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhgREMjJHt0aGlzLmNvbm5lY3Rpb25JZH0gZGMgb25tZXNzYWdlOmAsIGUuZGF0YSk7XG4gICAgICB0aGlzLl9oYW5kbGVEYXRhTWVzc2FnZShlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5kYXRhQ2hhbm5lbC5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgbG9nZ2VyLmxvZyhgREMjJHt0aGlzLmNvbm5lY3Rpb25JZH0gZGMgY2xvc2VkIGZvcjpgLCB0aGlzLnBlZXIpO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH07XG4gIH1cblxuICAvLyBIYW5kbGVzIGEgRGF0YUNoYW5uZWwgbWVzc2FnZS5cbiAgcHJpdmF0ZSBfaGFuZGxlRGF0YU1lc3NhZ2UoeyBkYXRhIH06IHsgZGF0YTogQmxvYiB8IEFycmF5QnVmZmVyIHwgc3RyaW5nIH0pOiB2b2lkIHtcbiAgICBjb25zdCBkYXRhdHlwZSA9IGRhdGEuY29uc3RydWN0b3I7XG5cbiAgICBjb25zdCBpc0JpbmFyeVNlcmlhbGl6YXRpb24gPSB0aGlzLnNlcmlhbGl6YXRpb24gPT09IFNlcmlhbGl6YXRpb25UeXBlLkJpbmFyeSB8fFxuICAgICAgdGhpcy5zZXJpYWxpemF0aW9uID09PSBTZXJpYWxpemF0aW9uVHlwZS5CaW5hcnlVVEY4O1xuXG4gICAgbGV0IGRlc2VyaWFsaXplZERhdGE6IGFueSA9IGRhdGE7XG5cbiAgICBpZiAoaXNCaW5hcnlTZXJpYWxpemF0aW9uKSB7XG4gICAgICBpZiAoZGF0YXR5cGUgPT09IEJsb2IpIHtcbiAgICAgICAgLy8gRGF0YXR5cGUgc2hvdWxkIG5ldmVyIGJlIGJsb2JcbiAgICAgICAgdXRpbC5ibG9iVG9BcnJheUJ1ZmZlcihkYXRhIGFzIEJsb2IsIChhYikgPT4ge1xuICAgICAgICAgIGNvbnN0IHVucGFja2VkRGF0YSA9IHV0aWwudW5wYWNrKGFiKTtcbiAgICAgICAgICB0aGlzLmVtaXQoQ29ubmVjdGlvbkV2ZW50VHlwZS5EYXRhLCB1bnBhY2tlZERhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChkYXRhdHlwZSA9PT0gQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgZGVzZXJpYWxpemVkRGF0YSA9IHV0aWwudW5wYWNrKGRhdGEgYXMgQXJyYXlCdWZmZXIpO1xuICAgICAgfSBlbHNlIGlmIChkYXRhdHlwZSA9PT0gU3RyaW5nKSB7XG4gICAgICAgIC8vIFN0cmluZyBmYWxsYmFjayBmb3IgYmluYXJ5IGRhdGEgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBiaW5hcnkgeWV0XG4gICAgICAgIGNvbnN0IGFiID0gdXRpbC5iaW5hcnlTdHJpbmdUb0FycmF5QnVmZmVyKGRhdGEgYXMgc3RyaW5nKTtcbiAgICAgICAgZGVzZXJpYWxpemVkRGF0YSA9IHV0aWwudW5wYWNrKGFiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VyaWFsaXphdGlvbiA9PT0gU2VyaWFsaXphdGlvblR5cGUuSlNPTikge1xuICAgICAgZGVzZXJpYWxpemVkRGF0YSA9IHRoaXMucGFyc2UoZGF0YSBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHdlJ3ZlIGNodW5rZWQtLWlmIHNvLCBwaWVjZSB0aGluZ3MgYmFjayB0b2dldGhlci5cbiAgICAvLyBXZSdyZSBndWFyYW50ZWVkIHRoYXQgdGhpcyBpc24ndCAwLlxuICAgIGlmIChkZXNlcmlhbGl6ZWREYXRhLl9fcGVlckRhdGEpIHtcbiAgICAgIHRoaXMuX2hhbmRsZUNodW5rKGRlc2VyaWFsaXplZERhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN1cGVyLmVtaXQoQ29ubmVjdGlvbkV2ZW50VHlwZS5EYXRhLCBkZXNlcmlhbGl6ZWREYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUNodW5rKGRhdGE6IHsgX19wZWVyRGF0YTogbnVtYmVyLCBuOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGRhdGE6IEJsb2IgfSk6IHZvaWQge1xuICAgIGNvbnN0IGlkID0gZGF0YS5fX3BlZXJEYXRhO1xuICAgIGNvbnN0IGNodW5rSW5mbyA9IHRoaXMuX2NodW5rZWREYXRhW2lkXSB8fCB7XG4gICAgICBkYXRhOiBbXSxcbiAgICAgIGNvdW50OiAwLFxuICAgICAgdG90YWw6IGRhdGEudG90YWxcbiAgICB9O1xuXG4gICAgY2h1bmtJbmZvLmRhdGFbZGF0YS5uXSA9IGRhdGEuZGF0YTtcbiAgICBjaHVua0luZm8uY291bnQrKztcbiAgICB0aGlzLl9jaHVua2VkRGF0YVtpZF0gPSBjaHVua0luZm87XG5cbiAgICBpZiAoY2h1bmtJbmZvLnRvdGFsID09PSBjaHVua0luZm8uY291bnQpIHtcbiAgICAgIC8vIENsZWFuIHVwIGJlZm9yZSBtYWtpbmcgdGhlIHJlY3Vyc2l2ZSBjYWxsIHRvIGBfaGFuZGxlRGF0YU1lc3NhZ2VgLlxuICAgICAgZGVsZXRlIHRoaXMuX2NodW5rZWREYXRhW2lkXTtcblxuICAgICAgLy8gV2UndmUgcmVjZWl2ZWQgYWxsIHRoZSBjaHVua3MtLXRpbWUgdG8gY29uc3RydWN0IHRoZSBjb21wbGV0ZSBkYXRhLlxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBCbG9iKGNodW5rSW5mby5kYXRhKTtcbiAgICAgIHRoaXMuX2hhbmRsZURhdGFNZXNzYWdlKHsgZGF0YSB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhwb3NlZCBmdW5jdGlvbmFsaXR5IGZvciB1c2Vycy5cbiAgICovXG5cbiAgLyoqIEFsbG93cyB1c2VyIHRvIGNsb3NlIGNvbm5lY3Rpb24uICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2J1ZmZlciA9IFtdO1xuICAgIHRoaXMuX2J1ZmZlclNpemUgPSAwO1xuICAgIHRoaXMuX2NodW5rZWREYXRhID0ge307XG5cbiAgICBpZiAodGhpcy5fbmVnb3RpYXRvcikge1xuICAgICAgdGhpcy5fbmVnb3RpYXRvci5jbGVhbnVwKCk7XG4gICAgICB0aGlzLl9uZWdvdGlhdG9yID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm92aWRlcikge1xuICAgICAgdGhpcy5wcm92aWRlci5fcmVtb3ZlQ29ubmVjdGlvbih0aGlzKTtcblxuICAgICAgdGhpcy5wcm92aWRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGF0YUNoYW5uZWwpIHtcbiAgICAgIHRoaXMuZGF0YUNoYW5uZWwub25vcGVuID0gbnVsbDtcbiAgICAgIHRoaXMuZGF0YUNoYW5uZWwub25tZXNzYWdlID0gbnVsbDtcbiAgICAgIHRoaXMuZGF0YUNoYW5uZWwub25jbG9zZSA9IG51bGw7XG4gICAgICB0aGlzLl9kYyA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2VuY29kaW5nUXVldWUpIHtcbiAgICAgIHRoaXMuX2VuY29kaW5nUXVldWUuZGVzdHJveSgpO1xuICAgICAgdGhpcy5fZW5jb2RpbmdRdWV1ZS5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuX2VuY29kaW5nUXVldWUgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuXG4gICAgc3VwZXIuZW1pdChDb25uZWN0aW9uRXZlbnRUeXBlLkNsb3NlKTtcbiAgfVxuXG4gIC8qKiBBbGxvd3MgdXNlciB0byBzZW5kIGRhdGEuICovXG4gIHNlbmQoZGF0YTogYW55LCBjaHVua2VkPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5vcGVuKSB7XG4gICAgICBzdXBlci5lbWl0KFxuICAgICAgICBDb25uZWN0aW9uRXZlbnRUeXBlLkVycm9yLFxuICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJDb25uZWN0aW9uIGlzIG5vdCBvcGVuLiBZb3Ugc2hvdWxkIGxpc3RlbiBmb3IgdGhlIGBvcGVuYCBldmVudCBiZWZvcmUgc2VuZGluZyBtZXNzYWdlcy5cIlxuICAgICAgICApXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlcmlhbGl6YXRpb24gPT09IFNlcmlhbGl6YXRpb25UeXBlLkpTT04pIHtcbiAgICAgIHRoaXMuX2J1ZmZlcmVkU2VuZCh0aGlzLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMuc2VyaWFsaXphdGlvbiA9PT0gU2VyaWFsaXphdGlvblR5cGUuQmluYXJ5IHx8XG4gICAgICB0aGlzLnNlcmlhbGl6YXRpb24gPT09IFNlcmlhbGl6YXRpb25UeXBlLkJpbmFyeVVURjhcbiAgICApIHtcbiAgICAgIGNvbnN0IGJsb2IgPSB1dGlsLnBhY2soZGF0YSk7XG5cbiAgICAgIGlmICghY2h1bmtlZCAmJiBibG9iLnNpemUgPiB1dGlsLmNodW5rZWRNVFUpIHtcbiAgICAgICAgdGhpcy5fc2VuZENodW5rcyhibG9iKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXV0aWwuc3VwcG9ydHMuYmluYXJ5QmxvYikge1xuICAgICAgICAvLyBXZSBvbmx5IGRvIHRoaXMgaWYgd2UgcmVhbGx5IG5lZWQgdG8gKGUuZy4gYmxvYnMgYXJlIG5vdCBzdXBwb3J0ZWQpLFxuICAgICAgICAvLyBiZWNhdXNlIHRoaXMgY29udmVyc2lvbiBpcyBjb3N0bHkuXG4gICAgICAgIHRoaXMuX2VuY29kaW5nUXVldWUuZW5xdWUoYmxvYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9idWZmZXJlZFNlbmQoYmxvYik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1ZmZlcmVkU2VuZChkYXRhKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWZmZXJlZFNlbmQobXNnOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fYnVmZmVyaW5nIHx8ICF0aGlzLl90cnlTZW5kKG1zZykpIHtcbiAgICAgIHRoaXMuX2J1ZmZlci5wdXNoKG1zZyk7XG4gICAgICB0aGlzLl9idWZmZXJTaXplID0gdGhpcy5fYnVmZmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIHRydWUgaWYgdGhlIHNlbmQgc3VjY2VlZHMuXG4gIHByaXZhdGUgX3RyeVNlbmQobXNnOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMub3Blbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGFDaGFubmVsLmJ1ZmZlcmVkQW1vdW50ID4gRGF0YUNvbm5lY3Rpb24uTUFYX0JVRkZFUkVEX0FNT1VOVCkge1xuICAgICAgdGhpcy5fYnVmZmVyaW5nID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9idWZmZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdHJ5QnVmZmVyKCk7XG4gICAgICB9LCA1MCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdGhpcy5kYXRhQ2hhbm5lbC5zZW5kKG1zZyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLmVycm9yKGBEQyM6JHt0aGlzLmNvbm5lY3Rpb25JZH0gRXJyb3Igd2hlbiBzZW5kaW5nOmAsIGUpO1xuICAgICAgdGhpcy5fYnVmZmVyaW5nID0gdHJ1ZTtcblxuICAgICAgdGhpcy5jbG9zZSgpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBUcnkgdG8gc2VuZCB0aGUgZmlyc3QgbWVzc2FnZSBpbiB0aGUgYnVmZmVyLlxuICBwcml2YXRlIF90cnlCdWZmZXIoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYnVmZmVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1zZyA9IHRoaXMuX2J1ZmZlclswXTtcblxuICAgIGlmICh0aGlzLl90cnlTZW5kKG1zZykpIHtcbiAgICAgIHRoaXMuX2J1ZmZlci5zaGlmdCgpO1xuICAgICAgdGhpcy5fYnVmZmVyU2l6ZSA9IHRoaXMuX2J1ZmZlci5sZW5ndGg7XG4gICAgICB0aGlzLl90cnlCdWZmZXIoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZW5kQ2h1bmtzKGJsb2I6IEJsb2IpOiB2b2lkIHtcbiAgICBjb25zdCBibG9icyA9IHV0aWwuY2h1bmsoYmxvYik7XG4gICAgbG9nZ2VyLmxvZyhgREMjJHt0aGlzLmNvbm5lY3Rpb25JZH0gVHJ5IHRvIHNlbmQgJHtibG9icy5sZW5ndGh9IGNodW5rcy4uLmApO1xuXG4gICAgZm9yIChsZXQgYmxvYiBvZiBibG9icykge1xuICAgICAgdGhpcy5zZW5kKGJsb2IsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1lc3NhZ2UobWVzc2FnZTogU2VydmVyTWVzc2FnZSk6IHZvaWQge1xuICAgIGNvbnN0IHBheWxvYWQgPSBtZXNzYWdlLnBheWxvYWQ7XG5cbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgY2FzZSBTZXJ2ZXJNZXNzYWdlVHlwZS5BbnN3ZXI6XG4gICAgICAgIHRoaXMuX25lZ290aWF0b3IuaGFuZGxlU0RQKG1lc3NhZ2UudHlwZSwgcGF5bG9hZC5zZHApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU2VydmVyTWVzc2FnZVR5cGUuQ2FuZGlkYXRlOlxuICAgICAgICB0aGlzLl9uZWdvdGlhdG9yLmhhbmRsZUNhbmRpZGF0ZShwYXlsb2FkLmNhbmRpZGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLndhcm4oXG4gICAgICAgICAgXCJVbnJlY29nbml6ZWQgbWVzc2FnZSB0eXBlOlwiLFxuICAgICAgICAgIG1lc3NhZ2UudHlwZSxcbiAgICAgICAgICBcImZyb20gcGVlcjpcIixcbiAgICAgICAgICB0aGlzLnBlZXJcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHsgdXRpbCB9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBBUEkge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IF9vcHRpb25zOiBhbnkpIHsgfVxuXG4gIHByaXZhdGUgX2J1aWxkVXJsKG1ldGhvZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBwcm90b2NvbCA9IHRoaXMuX29wdGlvbnMuc2VjdXJlID8gXCJodHRwczovL1wiIDogXCJodHRwOi8vXCI7XG4gICAgbGV0IHVybCA9XG4gICAgICBwcm90b2NvbCArXG4gICAgICB0aGlzLl9vcHRpb25zLmhvc3QgK1xuICAgICAgXCI6XCIgK1xuICAgICAgdGhpcy5fb3B0aW9ucy5wb3J0ICtcbiAgICAgIHRoaXMuX29wdGlvbnMucGF0aCArXG4gICAgICB0aGlzLl9vcHRpb25zLmtleSArXG4gICAgICBcIi9cIiArXG4gICAgICBtZXRob2Q7XG4gICAgY29uc3QgcXVlcnlTdHJpbmcgPSBcIj90cz1cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgXCJcIiArIE1hdGgucmFuZG9tKCk7XG4gICAgdXJsICs9IHF1ZXJ5U3RyaW5nO1xuXG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIC8qKiBHZXQgYSB1bmlxdWUgSUQgZnJvbSB0aGUgc2VydmVyIHZpYSBYSFIgYW5kIGluaXRpYWxpemUgd2l0aCBpdC4gKi9cbiAgYXN5bmMgcmV0cmlldmVJZCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2J1aWxkVXJsKFwiaWRcIik7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvci4gU3RhdHVzOiR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXCJFcnJvciByZXRyaWV2aW5nIElEXCIsIGVycm9yKTtcblxuICAgICAgbGV0IHBhdGhFcnJvciA9IFwiXCI7XG5cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5wYXRoID09PSBcIi9cIiAmJlxuICAgICAgICB0aGlzLl9vcHRpb25zLmhvc3QgIT09IHV0aWwuQ0xPVURfSE9TVFxuICAgICAgKSB7XG4gICAgICAgIHBhdGhFcnJvciA9XG4gICAgICAgICAgXCIgSWYgeW91IHBhc3NlZCBpbiBhIGBwYXRoYCB0byB5b3VyIHNlbGYtaG9zdGVkIFBlZXJTZXJ2ZXIsIFwiICtcbiAgICAgICAgICBcInlvdSdsbCBhbHNvIG5lZWQgdG8gcGFzcyBpbiB0aGF0IHNhbWUgcGF0aCB3aGVuIGNyZWF0aW5nIGEgbmV3IFwiICtcbiAgICAgICAgICBcIlBlZXIuXCI7XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBnZXQgYW4gSUQgZnJvbSB0aGUgc2VydmVyLlwiICsgcGF0aEVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgYXN5bmMgbGlzdEFsbFBlZXJzKCk6IFByb21pc2U8YW55W10+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLl9idWlsZFVybChcInBlZXJzXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcblxuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgIGxldCBoZWxwZnVsRXJyb3IgPSBcIlwiO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuaG9zdCA9PT0gdXRpbC5DTE9VRF9IT1NUKSB7XG4gICAgICAgICAgICBoZWxwZnVsRXJyb3IgPVxuICAgICAgICAgICAgICBcIkl0IGxvb2tzIGxpa2UgeW91J3JlIHVzaW5nIHRoZSBjbG91ZCBzZXJ2ZXIuIFlvdSBjYW4gZW1haWwgXCIgK1xuICAgICAgICAgICAgICBcInRlYW1AcGVlcmpzLmNvbSB0byBlbmFibGUgcGVlciBsaXN0aW5nIGZvciB5b3VyIEFQSSBrZXkuXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlbHBmdWxFcnJvciA9XG4gICAgICAgICAgICAgIFwiWW91IG5lZWQgdG8gZW5hYmxlIGBhbGxvd19kaXNjb3ZlcnlgIG9uIHlvdXIgc2VsZi1ob3N0ZWQgXCIgK1xuICAgICAgICAgICAgICBcIlBlZXJTZXJ2ZXIgdG8gdXNlIHRoaXMgZmVhdHVyZS5cIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJdCBkb2Vzbid0IGxvb2sgbGlrZSB5b3UgaGF2ZSBwZXJtaXNzaW9uIHRvIGxpc3QgcGVlcnMgSURzLiBcIiArXG4gICAgICAgICAgICBoZWxwZnVsRXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvci4gU3RhdHVzOiR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXCJFcnJvciByZXRyaWV2aW5nIGxpc3QgcGVlcnNcIiwgZXJyb3IpO1xuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZ2V0IGxpc3QgcGVlcnMgZnJvbSB0aGUgc2VydmVyLlwiICsgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudGVtaXR0ZXIzXCI7XG5pbXBvcnQgeyB1dGlsIH0gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IGxvZ2dlciwgeyBMb2dMZXZlbCB9IGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0XCI7XG5pbXBvcnQgeyBNZWRpYUNvbm5lY3Rpb24gfSBmcm9tIFwiLi9tZWRpYWNvbm5lY3Rpb25cIjtcbmltcG9ydCB7IERhdGFDb25uZWN0aW9uIH0gZnJvbSBcIi4vZGF0YWNvbm5lY3Rpb25cIjtcbmltcG9ydCB7XG4gIENvbm5lY3Rpb25UeXBlLFxuICBQZWVyRXJyb3JUeXBlLFxuICBQZWVyRXZlbnRUeXBlLFxuICBTb2NrZXRFdmVudFR5cGUsXG4gIFNlcnZlck1lc3NhZ2VUeXBlXG59IGZyb20gXCIuL2VudW1zXCI7XG5pbXBvcnQgeyBCYXNlQ29ubmVjdGlvbiB9IGZyb20gXCIuL2Jhc2Vjb25uZWN0aW9uXCI7XG5pbXBvcnQgeyBTZXJ2ZXJNZXNzYWdlIH0gZnJvbSBcIi4vc2VydmVybWVzc2FnZVwiO1xuaW1wb3J0IHsgQVBJIH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQgeyBQZWVyQ29ubmVjdE9wdGlvbiwgUGVlckpTT3B0aW9uIH0gZnJvbSBcIi4uXCI7XG5cbmNsYXNzIFBlZXJPcHRpb25zIGltcGxlbWVudHMgUGVlckpTT3B0aW9uIHtcbiAgZGVidWc/OiBMb2dMZXZlbDsgLy8gMTogRXJyb3JzLCAyOiBXYXJuaW5ncywgMzogQWxsIGxvZ3NcbiAgaG9zdD86IHN0cmluZztcbiAgcG9ydD86IG51bWJlcjtcbiAgcGF0aD86IHN0cmluZztcbiAga2V5Pzogc3RyaW5nO1xuICB0b2tlbj86IHN0cmluZztcbiAgY29uZmlnPzogYW55O1xuICBzZWN1cmU/OiBib29sZWFuO1xuICBwaW5nSW50ZXJ2YWw/OiBudW1iZXI7XG4gIGxvZ0Z1bmN0aW9uPzogKGxvZ0xldmVsOiBMb2dMZXZlbCwgLi4ucmVzdDogYW55W10pID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQSBwZWVyIHdobyBjYW4gaW5pdGlhdGUgY29ubmVjdGlvbnMgd2l0aCBvdGhlciBwZWVycy5cbiAqL1xuZXhwb3J0IGNsYXNzIFBlZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0tFWSA9IFwicGVlcmpzXCI7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfb3B0aW9uczogUGVlck9wdGlvbnM7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2FwaTogQVBJO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zb2NrZXQ6IFNvY2tldDtcblxuICBwcml2YXRlIF9pZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2xhc3RTZXJ2ZXJJZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLy8gU3RhdGVzLlxuICBwcml2YXRlIF9kZXN0cm95ZWQgPSBmYWxzZTsgLy8gQ29ubmVjdGlvbnMgaGF2ZSBiZWVuIGtpbGxlZFxuICBwcml2YXRlIF9kaXNjb25uZWN0ZWQgPSBmYWxzZTsgLy8gQ29ubmVjdGlvbiB0byBQZWVyU2VydmVyIGtpbGxlZCBidXQgUDJQIGNvbm5lY3Rpb25zIHN0aWxsIGFjdGl2ZVxuICBwcml2YXRlIF9vcGVuID0gZmFsc2U7IC8vIFNvY2tldHMgYW5kIHN1Y2ggYXJlIG5vdCB5ZXQgb3Blbi5cbiAgcHJpdmF0ZSByZWFkb25seSBfY29ubmVjdGlvbnM6IE1hcDxzdHJpbmcsIEJhc2VDb25uZWN0aW9uW10+ID0gbmV3IE1hcCgpOyAvLyBBbGwgY29ubmVjdGlvbnMgZm9yIHRoaXMgcGVlci5cbiAgcHJpdmF0ZSByZWFkb25seSBfbG9zdE1lc3NhZ2VzOiBNYXA8c3RyaW5nLCBTZXJ2ZXJNZXNzYWdlW10+ID0gbmV3IE1hcCgpOyAvLyBzcmMgPT4gW2xpc3Qgb2YgbWVzc2FnZXNdXG5cbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIGdldCBvcHRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB9XG5cbiAgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wZW47XG4gIH1cblxuICBnZXQgc29ja2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9zb2NrZXQ7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgXG4gICAqIFJldHVybiB0eXBlIHdpbGwgY2hhbmdlIGZyb20gT2JqZWN0IHRvIE1hcDxzdHJpbmcsW10+IFxuICAgKi9cbiAgZ2V0IGNvbm5lY3Rpb25zKCk6IE9iamVjdCB7XG4gICAgY29uc3QgcGxhaW5Db25uZWN0aW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBmb3IgKGxldCBbaywgdl0gb2YgdGhpcy5fY29ubmVjdGlvbnMpIHtcbiAgICAgIHBsYWluQ29ubmVjdGlvbnNba10gPSB2O1xuICAgIH1cblxuICAgIHJldHVybiBwbGFpbkNvbm5lY3Rpb25zO1xuICB9XG5cbiAgZ2V0IGRlc3Ryb3llZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVzdHJveWVkO1xuICB9XG4gIGdldCBkaXNjb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2Nvbm5lY3RlZDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGlkPzogc3RyaW5nIHwgUGVlck9wdGlvbnMsIG9wdGlvbnM/OiBQZWVyT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG5cbiAgICBsZXQgdXNlcklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICAvLyBEZWFsIHdpdGggb3ZlcmxvYWRpbmdcbiAgICBpZiAoaWQgJiYgaWQuY29uc3RydWN0b3IgPT0gT2JqZWN0KSB7XG4gICAgICBvcHRpb25zID0gaWQgYXMgUGVlck9wdGlvbnM7XG4gICAgfSBlbHNlIGlmIChpZCkge1xuICAgICAgdXNlcklkID0gaWQudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvLyBDb25maWd1cml6ZSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGRlYnVnOiAwLCAvLyAxOiBFcnJvcnMsIDI6IFdhcm5pbmdzLCAzOiBBbGwgbG9nc1xuICAgICAgaG9zdDogdXRpbC5DTE9VRF9IT1NULFxuICAgICAgcG9ydDogdXRpbC5DTE9VRF9QT1JULFxuICAgICAgcGF0aDogXCIvXCIsXG4gICAgICBrZXk6IFBlZXIuREVGQVVMVF9LRVksXG4gICAgICB0b2tlbjogdXRpbC5yYW5kb21Ub2tlbigpLFxuICAgICAgY29uZmlnOiB1dGlsLmRlZmF1bHRDb25maWcsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblxuICAgIC8vIERldGVjdCByZWxhdGl2ZSBVUkwgaG9zdC5cbiAgICBpZiAodGhpcy5fb3B0aW9ucy5ob3N0ID09PSBcIi9cIikge1xuICAgICAgdGhpcy5fb3B0aW9ucy5ob3N0ID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIH1cblxuICAgIC8vIFNldCBwYXRoIGNvcnJlY3RseS5cbiAgICBpZiAodGhpcy5fb3B0aW9ucy5wYXRoKSB7XG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy5wYXRoWzBdICE9PSBcIi9cIikge1xuICAgICAgICB0aGlzLl9vcHRpb25zLnBhdGggPSBcIi9cIiArIHRoaXMuX29wdGlvbnMucGF0aDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLnBhdGhbdGhpcy5fb3B0aW9ucy5wYXRoLmxlbmd0aCAtIDFdICE9PSBcIi9cIikge1xuICAgICAgICB0aGlzLl9vcHRpb25zLnBhdGggKz0gXCIvXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IHdoZXRoZXIgd2UgdXNlIFNTTCB0byBzYW1lIGFzIGN1cnJlbnQgaG9zdFxuICAgIGlmICh0aGlzLl9vcHRpb25zLnNlY3VyZSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuX29wdGlvbnMuaG9zdCAhPT0gdXRpbC5DTE9VRF9IT1NUKSB7XG4gICAgICB0aGlzLl9vcHRpb25zLnNlY3VyZSA9IHV0aWwuaXNTZWN1cmUoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX29wdGlvbnMuaG9zdCA9PSB1dGlsLkNMT1VEX0hPU1QpIHtcbiAgICAgIHRoaXMuX29wdGlvbnMuc2VjdXJlID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gU2V0IGEgY3VzdG9tIGxvZyBmdW5jdGlvbiBpZiBwcmVzZW50XG4gICAgaWYgKHRoaXMuX29wdGlvbnMubG9nRnVuY3Rpb24pIHtcbiAgICAgIGxvZ2dlci5zZXRMb2dGdW5jdGlvbih0aGlzLl9vcHRpb25zLmxvZ0Z1bmN0aW9uKTtcbiAgICB9XG5cbiAgICBsb2dnZXIubG9nTGV2ZWwgPSB0aGlzLl9vcHRpb25zLmRlYnVnIHx8IDA7XG5cbiAgICB0aGlzLl9hcGkgPSBuZXcgQVBJKG9wdGlvbnMpO1xuICAgIHRoaXMuX3NvY2tldCA9IHRoaXMuX2NyZWF0ZVNlcnZlckNvbm5lY3Rpb24oKTtcblxuICAgIC8vIFNhbml0eSBjaGVja3NcbiAgICAvLyBFbnN1cmUgV2ViUlRDIHN1cHBvcnRlZFxuICAgIGlmICghdXRpbC5zdXBwb3J0cy5hdWRpb1ZpZGVvICYmICF1dGlsLnN1cHBvcnRzLmRhdGEpIHtcbiAgICAgIHRoaXMuX2RlbGF5ZWRBYm9ydChcbiAgICAgICAgUGVlckVycm9yVHlwZS5Ccm93c2VySW5jb21wYXRpYmxlLFxuICAgICAgICBcIlRoZSBjdXJyZW50IGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBXZWJSVENcIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgYWxwaGFudW1lcmljIGlkXG4gICAgaWYgKCEhdXNlcklkICYmICF1dGlsLnZhbGlkYXRlSWQodXNlcklkKSkge1xuICAgICAgdGhpcy5fZGVsYXllZEFib3J0KFBlZXJFcnJvclR5cGUuSW52YWxpZElELCBgSUQgXCIke3VzZXJJZH1cIiBpcyBpbnZhbGlkYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHVzZXJJZCkge1xuICAgICAgdGhpcy5faW5pdGlhbGl6ZSh1c2VySWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hcGkucmV0cmlldmVJZCgpXG4gICAgICAgIC50aGVuKGlkID0+IHRoaXMuX2luaXRpYWxpemUoaWQpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5fYWJvcnQoUGVlckVycm9yVHlwZS5TZXJ2ZXJFcnJvciwgZXJyb3IpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVTZXJ2ZXJDb25uZWN0aW9uKCk6IFNvY2tldCB7XG4gICAgY29uc3Qgc29ja2V0ID0gbmV3IFNvY2tldChcbiAgICAgIHRoaXMuX29wdGlvbnMuc2VjdXJlLFxuICAgICAgdGhpcy5fb3B0aW9ucy5ob3N0ISxcbiAgICAgIHRoaXMuX29wdGlvbnMucG9ydCEsXG4gICAgICB0aGlzLl9vcHRpb25zLnBhdGghLFxuICAgICAgdGhpcy5fb3B0aW9ucy5rZXkhLFxuICAgICAgdGhpcy5fb3B0aW9ucy5waW5nSW50ZXJ2YWxcbiAgICApO1xuXG4gICAgc29ja2V0Lm9uKFNvY2tldEV2ZW50VHlwZS5NZXNzYWdlLCAoZGF0YTogU2VydmVyTWVzc2FnZSkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlTWVzc2FnZShkYXRhKTtcbiAgICB9KTtcblxuICAgIHNvY2tldC5vbihTb2NrZXRFdmVudFR5cGUuRXJyb3IsIChlcnJvcjogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLl9hYm9ydChQZWVyRXJyb3JUeXBlLlNvY2tldEVycm9yLCBlcnJvcik7XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub24oU29ja2V0RXZlbnRUeXBlLkRpc2Nvbm5lY3RlZCwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZGlzY29ubmVjdGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbWl0RXJyb3IoUGVlckVycm9yVHlwZS5OZXR3b3JrLCBcIkxvc3QgY29ubmVjdGlvbiB0byBzZXJ2ZXIuXCIpO1xuICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub24oU29ja2V0RXZlbnRUeXBlLkNsb3NlLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kaXNjb25uZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9hYm9ydChQZWVyRXJyb3JUeXBlLlNvY2tldENsb3NlZCwgXCJVbmRlcmx5aW5nIHNvY2tldCBpcyBhbHJlYWR5IGNsb3NlZC5cIik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc29ja2V0O1xuICB9XG5cbiAgLyoqIEluaXRpYWxpemUgYSBjb25uZWN0aW9uIHdpdGggdGhlIHNlcnZlci4gKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZShpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgICB0aGlzLnNvY2tldC5zdGFydChpZCwgdGhpcy5fb3B0aW9ucy50b2tlbiEpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgbWVzc2FnZXMgZnJvbSB0aGUgc2VydmVyLiAqL1xuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlKG1lc3NhZ2U6IFNlcnZlck1lc3NhZ2UpOiB2b2lkIHtcbiAgICBjb25zdCB0eXBlID0gbWVzc2FnZS50eXBlO1xuICAgIGNvbnN0IHBheWxvYWQgPSBtZXNzYWdlLnBheWxvYWQ7XG4gICAgY29uc3QgcGVlcklkID0gbWVzc2FnZS5zcmM7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgU2VydmVyTWVzc2FnZVR5cGUuT3BlbjogLy8gVGhlIGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlciBpcyBvcGVuLlxuICAgICAgICB0aGlzLl9sYXN0U2VydmVySWQgPSB0aGlzLmlkO1xuICAgICAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0KFBlZXJFdmVudFR5cGUuT3BlbiwgdGhpcy5pZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZXJ2ZXJNZXNzYWdlVHlwZS5FcnJvcjogLy8gU2VydmVyIGVycm9yLlxuICAgICAgICB0aGlzLl9hYm9ydChQZWVyRXJyb3JUeXBlLlNlcnZlckVycm9yLCBwYXlsb2FkLm1zZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZXJ2ZXJNZXNzYWdlVHlwZS5JZFRha2VuOiAvLyBUaGUgc2VsZWN0ZWQgSUQgaXMgdGFrZW4uXG4gICAgICAgIHRoaXMuX2Fib3J0KFBlZXJFcnJvclR5cGUuVW5hdmFpbGFibGVJRCwgYElEIFwiJHt0aGlzLmlkfVwiIGlzIHRha2VuYCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZXJ2ZXJNZXNzYWdlVHlwZS5JbnZhbGlkS2V5OiAvLyBUaGUgZ2l2ZW4gQVBJIGtleSBjYW5ub3QgYmUgZm91bmQuXG4gICAgICAgIHRoaXMuX2Fib3J0KFBlZXJFcnJvclR5cGUuSW52YWxpZEtleSwgYEFQSSBLRVkgXCIke3RoaXMuX29wdGlvbnMua2V5fVwiIGlzIGludmFsaWRgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFNlcnZlck1lc3NhZ2VUeXBlLkxlYXZlOiAvLyBBbm90aGVyIHBlZXIgaGFzIGNsb3NlZCBpdHMgY29ubmVjdGlvbiB0byB0aGlzIHBlZXIuXG4gICAgICAgIGxvZ2dlci5sb2coYFJlY2VpdmVkIGxlYXZlIG1lc3NhZ2UgZnJvbSAke3BlZXJJZH1gKTtcbiAgICAgICAgdGhpcy5fY2xlYW51cFBlZXIocGVlcklkKTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvbnMuZGVsZXRlKHBlZXJJZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZXJ2ZXJNZXNzYWdlVHlwZS5FeHBpcmU6IC8vIFRoZSBvZmZlciBzZW50IHRvIGEgcGVlciBoYXMgZXhwaXJlZCB3aXRob3V0IHJlc3BvbnNlLlxuICAgICAgICB0aGlzLmVtaXRFcnJvcihQZWVyRXJyb3JUeXBlLlBlZXJVbmF2YWlsYWJsZSwgYENvdWxkIG5vdCBjb25uZWN0IHRvIHBlZXIgJHtwZWVySWR9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZXJ2ZXJNZXNzYWdlVHlwZS5PZmZlcjoge1xuICAgICAgICAvLyB3ZSBzaG91bGQgY29uc2lkZXIgc3dpdGNoaW5nIHRoaXMgdG8gQ0FMTC9DT05ORUNULCBidXQgdGhpcyBpcyB0aGUgbGVhc3QgYnJlYWtpbmcgb3B0aW9uLlxuICAgICAgICBjb25zdCBjb25uZWN0aW9uSWQgPSBwYXlsb2FkLmNvbm5lY3Rpb25JZDtcbiAgICAgICAgbGV0IGNvbm5lY3Rpb24gPSB0aGlzLmdldENvbm5lY3Rpb24ocGVlcklkLCBjb25uZWN0aW9uSWQpO1xuXG4gICAgICAgIGlmIChjb25uZWN0aW9uKSB7XG4gICAgICAgICAgY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgIGxvZ2dlci53YXJuKGBPZmZlciByZWNlaXZlZCBmb3IgZXhpc3RpbmcgQ29ubmVjdGlvbiBJRDoke2Nvbm5lY3Rpb25JZH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBjb25uZWN0aW9uLlxuICAgICAgICBpZiAocGF5bG9hZC50eXBlID09PSBDb25uZWN0aW9uVHlwZS5NZWRpYSkge1xuICAgICAgICAgIGNvbm5lY3Rpb24gPSBuZXcgTWVkaWFDb25uZWN0aW9uKHBlZXJJZCwgdGhpcywge1xuICAgICAgICAgICAgY29ubmVjdGlvbklkOiBjb25uZWN0aW9uSWQsXG4gICAgICAgICAgICBfcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgICAgIG1ldGFkYXRhOiBwYXlsb2FkLm1ldGFkYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fYWRkQ29ubmVjdGlvbihwZWVySWQsIGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuZW1pdChQZWVyRXZlbnRUeXBlLkNhbGwsIGNvbm5lY3Rpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKHBheWxvYWQudHlwZSA9PT0gQ29ubmVjdGlvblR5cGUuRGF0YSkge1xuICAgICAgICAgIGNvbm5lY3Rpb24gPSBuZXcgRGF0YUNvbm5lY3Rpb24ocGVlcklkLCB0aGlzLCB7XG4gICAgICAgICAgICBjb25uZWN0aW9uSWQ6IGNvbm5lY3Rpb25JZCxcbiAgICAgICAgICAgIF9wYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICAgICAgbWV0YWRhdGE6IHBheWxvYWQubWV0YWRhdGEsXG4gICAgICAgICAgICBsYWJlbDogcGF5bG9hZC5sYWJlbCxcbiAgICAgICAgICAgIHNlcmlhbGl6YXRpb246IHBheWxvYWQuc2VyaWFsaXphdGlvbixcbiAgICAgICAgICAgIHJlbGlhYmxlOiBwYXlsb2FkLnJlbGlhYmxlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fYWRkQ29ubmVjdGlvbihwZWVySWQsIGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuZW1pdChQZWVyRXZlbnRUeXBlLkNvbm5lY3Rpb24sIGNvbm5lY3Rpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci53YXJuKGBSZWNlaXZlZCBtYWxmb3JtZWQgY29ubmVjdGlvbiB0eXBlOiR7cGF5bG9hZC50eXBlfWApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgbWVzc2FnZXMuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5fZ2V0TWVzc2FnZXMoY29ubmVjdGlvbklkKTtcbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgICAgICAgIGNvbm5lY3Rpb24uaGFuZGxlTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBpZiAoIXBheWxvYWQpIHtcbiAgICAgICAgICBsb2dnZXIud2FybihgWW91IHJlY2VpdmVkIGEgbWFsZm9ybWVkIG1lc3NhZ2UgZnJvbSAke3BlZXJJZH0gb2YgdHlwZSAke3R5cGV9YCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29ubmVjdGlvbklkID0gcGF5bG9hZC5jb25uZWN0aW9uSWQ7XG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSB0aGlzLmdldENvbm5lY3Rpb24ocGVlcklkLCBjb25uZWN0aW9uSWQpO1xuXG4gICAgICAgIGlmIChjb25uZWN0aW9uICYmIGNvbm5lY3Rpb24ucGVlckNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAvLyBQYXNzIGl0IG9uLlxuICAgICAgICAgIGNvbm5lY3Rpb24uaGFuZGxlTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25uZWN0aW9uSWQpIHtcbiAgICAgICAgICAvLyBTdG9yZSBmb3IgcG9zc2libGUgbGF0ZXIgdXNlXG4gICAgICAgICAgdGhpcy5fc3RvcmVNZXNzYWdlKGNvbm5lY3Rpb25JZCwgbWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oXCJZb3UgcmVjZWl2ZWQgYW4gdW5yZWNvZ25pemVkIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBTdG9yZXMgbWVzc2FnZXMgd2l0aG91dCBhIHNldCB1cCBjb25uZWN0aW9uLCB0byBiZSBjbGFpbWVkIGxhdGVyLiAqL1xuICBwcml2YXRlIF9zdG9yZU1lc3NhZ2UoY29ubmVjdGlvbklkOiBzdHJpbmcsIG1lc3NhZ2U6IFNlcnZlck1lc3NhZ2UpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2xvc3RNZXNzYWdlcy5oYXMoY29ubmVjdGlvbklkKSkge1xuICAgICAgdGhpcy5fbG9zdE1lc3NhZ2VzLnNldChjb25uZWN0aW9uSWQsIFtdKTtcbiAgICB9XG5cbiAgICB0aGlzLl9sb3N0TWVzc2FnZXMuZ2V0KGNvbm5lY3Rpb25JZCkucHVzaChtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKiBSZXRyaWV2ZSBtZXNzYWdlcyBmcm9tIGxvc3QgbWVzc2FnZSBzdG9yZSAqL1xuICAvL1RPRE8gQ2hhbmdlIGl0IHRvIHByaXZhdGVcbiAgcHVibGljIF9nZXRNZXNzYWdlcyhjb25uZWN0aW9uSWQ6IHN0cmluZyk6IFNlcnZlck1lc3NhZ2VbXSB7XG4gICAgY29uc3QgbWVzc2FnZXMgPSB0aGlzLl9sb3N0TWVzc2FnZXMuZ2V0KGNvbm5lY3Rpb25JZCk7XG5cbiAgICBpZiAobWVzc2FnZXMpIHtcbiAgICAgIHRoaXMuX2xvc3RNZXNzYWdlcy5kZWxldGUoY29ubmVjdGlvbklkKTtcbiAgICAgIHJldHVybiBtZXNzYWdlcztcbiAgICB9XG5cbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIERhdGFDb25uZWN0aW9uIHRvIHRoZSBzcGVjaWZpZWQgcGVlci4gU2VlIGRvY3VtZW50YXRpb24gZm9yIGFcbiAgICogY29tcGxldGUgbGlzdCBvZiBvcHRpb25zLlxuICAgKi9cbiAgY29ubmVjdChwZWVyOiBzdHJpbmcsIG9wdGlvbnM6IFBlZXJDb25uZWN0T3B0aW9uID0ge30pOiBEYXRhQ29ubmVjdGlvbiB7XG4gICAgaWYgKHRoaXMuZGlzY29ubmVjdGVkKSB7XG4gICAgICBsb2dnZXIud2FybihcbiAgICAgICAgXCJZb3UgY2Fubm90IGNvbm5lY3QgdG8gYSBuZXcgUGVlciBiZWNhdXNlIHlvdSBjYWxsZWQgXCIgK1xuICAgICAgICBcIi5kaXNjb25uZWN0KCkgb24gdGhpcyBQZWVyIGFuZCBlbmRlZCB5b3VyIGNvbm5lY3Rpb24gd2l0aCB0aGUgXCIgK1xuICAgICAgICBcInNlcnZlci4gWW91IGNhbiBjcmVhdGUgYSBuZXcgUGVlciB0byByZWNvbm5lY3QsIG9yIGNhbGwgcmVjb25uZWN0IFwiICtcbiAgICAgICAgXCJvbiB0aGlzIHBlZXIgaWYgeW91IGJlbGlldmUgaXRzIElEIHRvIHN0aWxsIGJlIGF2YWlsYWJsZS5cIlxuICAgICAgKTtcbiAgICAgIHRoaXMuZW1pdEVycm9yKFxuICAgICAgICBQZWVyRXJyb3JUeXBlLkRpc2Nvbm5lY3RlZCxcbiAgICAgICAgXCJDYW5ub3QgY29ubmVjdCB0byBuZXcgUGVlciBhZnRlciBkaXNjb25uZWN0aW5nIGZyb20gc2VydmVyLlwiXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGFDb25uZWN0aW9uID0gbmV3IERhdGFDb25uZWN0aW9uKHBlZXIsIHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2FkZENvbm5lY3Rpb24ocGVlciwgZGF0YUNvbm5lY3Rpb24pO1xuICAgIHJldHVybiBkYXRhQ29ubmVjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgTWVkaWFDb25uZWN0aW9uIHRvIHRoZSBzcGVjaWZpZWQgcGVlci4gU2VlIGRvY3VtZW50YXRpb24gZm9yIGFcbiAgICogY29tcGxldGUgbGlzdCBvZiBvcHRpb25zLlxuICAgKi9cbiAgY2FsbChwZWVyOiBzdHJpbmcsIHN0cmVhbTogTWVkaWFTdHJlYW0sIG9wdGlvbnM6IGFueSA9IHt9KTogTWVkaWFDb25uZWN0aW9uIHtcbiAgICBpZiAodGhpcy5kaXNjb25uZWN0ZWQpIHtcbiAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICBcIllvdSBjYW5ub3QgY29ubmVjdCB0byBhIG5ldyBQZWVyIGJlY2F1c2UgeW91IGNhbGxlZCBcIiArXG4gICAgICAgIFwiLmRpc2Nvbm5lY3QoKSBvbiB0aGlzIFBlZXIgYW5kIGVuZGVkIHlvdXIgY29ubmVjdGlvbiB3aXRoIHRoZSBcIiArXG4gICAgICAgIFwic2VydmVyLiBZb3UgY2FuIGNyZWF0ZSBhIG5ldyBQZWVyIHRvIHJlY29ubmVjdC5cIlxuICAgICAgKTtcbiAgICAgIHRoaXMuZW1pdEVycm9yKFxuICAgICAgICBQZWVyRXJyb3JUeXBlLkRpc2Nvbm5lY3RlZCxcbiAgICAgICAgXCJDYW5ub3QgY29ubmVjdCB0byBuZXcgUGVlciBhZnRlciBkaXNjb25uZWN0aW5nIGZyb20gc2VydmVyLlwiXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghc3RyZWFtKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgIFwiVG8gY2FsbCBhIHBlZXIsIHlvdSBtdXN0IHByb3ZpZGUgYSBzdHJlYW0gZnJvbSB5b3VyIGJyb3dzZXIncyBgZ2V0VXNlck1lZGlhYC5cIlxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLl9zdHJlYW0gPSBzdHJlYW07XG5cbiAgICBjb25zdCBtZWRpYUNvbm5lY3Rpb24gPSBuZXcgTWVkaWFDb25uZWN0aW9uKHBlZXIsIHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2FkZENvbm5lY3Rpb24ocGVlciwgbWVkaWFDb25uZWN0aW9uKTtcbiAgICByZXR1cm4gbWVkaWFDb25uZWN0aW9uO1xuICB9XG5cbiAgLyoqIEFkZCBhIGRhdGEvbWVkaWEgY29ubmVjdGlvbiB0byB0aGlzIHBlZXIuICovXG4gIHByaXZhdGUgX2FkZENvbm5lY3Rpb24ocGVlcklkOiBzdHJpbmcsIGNvbm5lY3Rpb246IEJhc2VDb25uZWN0aW9uKTogdm9pZCB7XG4gICAgbG9nZ2VyLmxvZyhgYWRkIGNvbm5lY3Rpb24gJHtjb25uZWN0aW9uLnR5cGV9OiR7Y29ubmVjdGlvbi5jb25uZWN0aW9uSWR9IHRvIHBlZXJJZDoke3BlZXJJZH1gKTtcblxuICAgIGlmICghdGhpcy5fY29ubmVjdGlvbnMuaGFzKHBlZXJJZCkpIHtcbiAgICAgIHRoaXMuX2Nvbm5lY3Rpb25zLnNldChwZWVySWQsIFtdKTtcbiAgICB9XG4gICAgdGhpcy5fY29ubmVjdGlvbnMuZ2V0KHBlZXJJZCkucHVzaChjb25uZWN0aW9uKTtcbiAgfVxuXG4gIC8vVE9ETyBzaG91bGQgYmUgcHJpdmF0ZVxuICBfcmVtb3ZlQ29ubmVjdGlvbihjb25uZWN0aW9uOiBCYXNlQ29ubmVjdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gdGhpcy5fY29ubmVjdGlvbnMuZ2V0KGNvbm5lY3Rpb24ucGVlcik7XG5cbiAgICBpZiAoY29ubmVjdGlvbnMpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY29ubmVjdGlvbnMuaW5kZXhPZihjb25uZWN0aW9uKTtcblxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25uZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vcmVtb3ZlIGZyb20gbG9zdCBtZXNzYWdlc1xuICAgIHRoaXMuX2xvc3RNZXNzYWdlcy5kZWxldGUoY29ubmVjdGlvbi5jb25uZWN0aW9uSWQpO1xuICB9XG5cbiAgLyoqIFJldHJpZXZlIGEgZGF0YS9tZWRpYSBjb25uZWN0aW9uIGZvciB0aGlzIHBlZXIuICovXG4gIGdldENvbm5lY3Rpb24ocGVlcklkOiBzdHJpbmcsIGNvbm5lY3Rpb25JZDogc3RyaW5nKTogbnVsbCB8IEJhc2VDb25uZWN0aW9uIHtcbiAgICBjb25zdCBjb25uZWN0aW9ucyA9IHRoaXMuX2Nvbm5lY3Rpb25zLmdldChwZWVySWQpO1xuICAgIGlmICghY29ubmVjdGlvbnMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZvciAobGV0IGNvbm5lY3Rpb24gb2YgY29ubmVjdGlvbnMpIHtcbiAgICAgIGlmIChjb25uZWN0aW9uLmNvbm5lY3Rpb25JZCA9PT0gY29ubmVjdGlvbklkKSB7XG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVsYXllZEFib3J0KHR5cGU6IFBlZXJFcnJvclR5cGUsIG1lc3NhZ2U6IHN0cmluZyB8IEVycm9yKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9hYm9ydCh0eXBlLCBtZXNzYWdlKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBlcnJvciBtZXNzYWdlIGFuZCBkZXN0cm95cyB0aGUgUGVlci5cbiAgICogVGhlIFBlZXIgaXMgbm90IGRlc3Ryb3llZCBpZiBpdCdzIGluIGEgZGlzY29ubmVjdGVkIHN0YXRlLCBpbiB3aGljaCBjYXNlXG4gICAqIGl0IHJldGFpbnMgaXRzIGRpc2Nvbm5lY3RlZCBzdGF0ZSBhbmQgaXRzIGV4aXN0aW5nIGNvbm5lY3Rpb25zLlxuICAgKi9cbiAgcHJpdmF0ZSBfYWJvcnQodHlwZTogUGVlckVycm9yVHlwZSwgbWVzc2FnZTogc3RyaW5nIHwgRXJyb3IpOiB2b2lkIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJBYm9ydGluZyFcIik7XG5cbiAgICB0aGlzLmVtaXRFcnJvcih0eXBlLCBtZXNzYWdlKTtcblxuICAgIGlmICghdGhpcy5fbGFzdFNlcnZlcklkKSB7XG4gICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEVtaXRzIGEgdHlwZWQgZXJyb3IgbWVzc2FnZS4gKi9cbiAgZW1pdEVycm9yKHR5cGU6IFBlZXJFcnJvclR5cGUsIGVycjogc3RyaW5nIHwgRXJyb3IpOiB2b2lkIHtcbiAgICBsb2dnZXIuZXJyb3IoXCJFcnJvcjpcIiwgZXJyKTtcblxuICAgIGxldCBlcnJvcjogRXJyb3IgJiB7IHR5cGU/OiBQZWVyRXJyb3JUeXBlIH07XG5cbiAgICBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3IgPSBlcnIgYXMgRXJyb3I7XG4gICAgfVxuXG4gICAgZXJyb3IudHlwZSA9IHR5cGU7XG5cbiAgICB0aGlzLmVtaXQoUGVlckV2ZW50VHlwZS5FcnJvciwgZXJyb3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBQZWVyOiBjbG9zZXMgYWxsIGFjdGl2ZSBjb25uZWN0aW9ucyBhcyB3ZWxsIGFzIHRoZSBjb25uZWN0aW9uXG4gICAqICB0byB0aGUgc2VydmVyLlxuICAgKiBXYXJuaW5nOiBUaGUgcGVlciBjYW4gbm8gbG9uZ2VyIGNyZWF0ZSBvciBhY2NlcHQgY29ubmVjdGlvbnMgYWZ0ZXIgYmVpbmdcbiAgICogIGRlc3Ryb3llZC5cbiAgICovXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nZ2VyLmxvZyhgRGVzdHJveSBwZWVyIHdpdGggSUQ6JHt0aGlzLmlkfWApO1xuXG4gICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5fY2xlYW51cCgpO1xuXG4gICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZTtcblxuICAgIHRoaXMuZW1pdChQZWVyRXZlbnRUeXBlLkNsb3NlKTtcbiAgfVxuXG4gIC8qKiBEaXNjb25uZWN0cyBldmVyeSBjb25uZWN0aW9uIG9uIHRoaXMgcGVlci4gKi9cbiAgcHJpdmF0ZSBfY2xlYW51cCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBwZWVySWQgb2YgdGhpcy5fY29ubmVjdGlvbnMua2V5cygpKSB7XG4gICAgICB0aGlzLl9jbGVhbnVwUGVlcihwZWVySWQpO1xuICAgICAgdGhpcy5fY29ubmVjdGlvbnMuZGVsZXRlKHBlZXJJZCk7XG4gICAgfVxuXG4gICAgdGhpcy5zb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKiogQ2xvc2VzIGFsbCBjb25uZWN0aW9ucyB0byB0aGlzIHBlZXIuICovXG4gIHByaXZhdGUgX2NsZWFudXBQZWVyKHBlZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgY29ubmVjdGlvbnMgPSB0aGlzLl9jb25uZWN0aW9ucy5nZXQocGVlcklkKTtcblxuICAgIGlmICghY29ubmVjdGlvbnMpIHJldHVybjtcblxuICAgIGZvciAobGV0IGNvbm5lY3Rpb24gb2YgY29ubmVjdGlvbnMpIHtcbiAgICAgIGNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIFBlZXIncyBjb25uZWN0aW9uIHRvIHRoZSBQZWVyU2VydmVyLiBEb2VzIG5vdCBjbG9zZSBhbnlcbiAgICogIGFjdGl2ZSBjb25uZWN0aW9ucy5cbiAgICogV2FybmluZzogVGhlIHBlZXIgY2FuIG5vIGxvbmdlciBjcmVhdGUgb3IgYWNjZXB0IGNvbm5lY3Rpb25zIGFmdGVyIGJlaW5nXG4gICAqICBkaXNjb25uZWN0ZWQuIEl0IGFsc28gY2Fubm90IHJlY29ubmVjdCB0byB0aGUgc2VydmVyLlxuICAgKi9cbiAgZGlzY29ubmVjdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNjb25uZWN0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SWQgPSB0aGlzLmlkO1xuXG4gICAgbG9nZ2VyLmxvZyhgRGlzY29ubmVjdCBwZWVyIHdpdGggSUQ6JHtjdXJyZW50SWR9YCk7XG5cbiAgICB0aGlzLl9kaXNjb25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcblxuICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG5cbiAgICB0aGlzLl9sYXN0U2VydmVySWQgPSBjdXJyZW50SWQ7XG4gICAgdGhpcy5faWQgPSBudWxsO1xuXG4gICAgdGhpcy5lbWl0KFBlZXJFdmVudFR5cGUuRGlzY29ubmVjdGVkLCBjdXJyZW50SWQpO1xuICB9XG5cbiAgLyoqIEF0dGVtcHRzIHRvIHJlY29ubmVjdCB3aXRoIHRoZSBzYW1lIElELiAqL1xuICByZWNvbm5lY3QoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzY29ubmVjdGVkICYmICF0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgbG9nZ2VyLmxvZyhgQXR0ZW1wdGluZyByZWNvbm5lY3Rpb24gdG8gc2VydmVyIHdpdGggSUQgJHt0aGlzLl9sYXN0U2VydmVySWR9YCk7XG4gICAgICB0aGlzLl9kaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2luaXRpYWxpemUodGhpcy5fbGFzdFNlcnZlcklkISk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBwZWVyIGNhbm5vdCByZWNvbm5lY3QgdG8gdGhlIHNlcnZlci4gSXQgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWQuXCIpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuZGlzY29ubmVjdGVkICYmICF0aGlzLm9wZW4pIHtcbiAgICAgIC8vIERvIG5vdGhpbmcuIFdlJ3JlIHN0aWxsIGNvbm5lY3RpbmcgdGhlIGZpcnN0IHRpbWUuXG4gICAgICBsb2dnZXIuZXJyb3IoXCJJbiBhIGh1cnJ5PyBXZSdyZSBzdGlsbCB0cnlpbmcgdG8gbWFrZSB0aGUgaW5pdGlhbCBjb25uZWN0aW9uIVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQZWVyICR7dGhpcy5pZH0gY2Fubm90IHJlY29ubmVjdCBiZWNhdXNlIGl0IGlzIG5vdCBkaXNjb25uZWN0ZWQgZnJvbSB0aGUgc2VydmVyIWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBsaXN0IG9mIGF2YWlsYWJsZSBwZWVyIElEcy4gSWYgeW91J3JlIHJ1bm5pbmcgeW91ciBvd24gc2VydmVyLCB5b3UnbGxcbiAgICogd2FudCB0byBzZXQgYWxsb3dfZGlzY292ZXJ5OiB0cnVlIGluIHRoZSBQZWVyU2VydmVyIG9wdGlvbnMuIElmIHlvdSdyZSB1c2luZ1xuICAgKiB0aGUgY2xvdWQgc2VydmVyLCBlbWFpbCB0ZWFtQHBlZXJqcy5jb20gdG8gZ2V0IHRoZSBmdW5jdGlvbmFsaXR5IGVuYWJsZWQgZm9yXG4gICAqIHlvdXIga2V5LlxuICAgKi9cbiAgbGlzdEFsbFBlZXJzKGNiID0gKF86IGFueVtdKSA9PiB7IH0pOiB2b2lkIHtcbiAgICB0aGlzLl9hcGkubGlzdEFsbFBlZXJzKClcbiAgICAgIC50aGVuKHBlZXJzID0+IGNiKHBlZXJzKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLl9hYm9ydChQZWVyRXJyb3JUeXBlLlNlcnZlckVycm9yLCBlcnJvcikpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgdXRpbCB9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCB7IFBlZXIgfSBmcm9tIFwiLi9wZWVyXCI7XG5cbmV4cG9ydCBjb25zdCBwZWVyanMgPSB7XG4gIFBlZXIsXG4gIHV0aWxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBlZXI7XG5cbig8YW55PndpbmRvdykucGVlcmpzID0gcGVlcmpzO1xuLyoqIEBkZXByZWNhdGVkIFNob3VsZCB1c2UgcGVlcmpzIG5hbWVzcGFjZSAqL1xuKDxhbnk+d2luZG93KS5QZWVyID0gUGVlcjtcbiIsICJpbXBvcnQgUGVlciBmcm9tICdwZWVyanMnO1xuXG5jb25zdCBwID0gbmV3IFBlZXIoKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFVBQUEsSUFBQTtBQUNBLFFBQUEsaUJBQUEsV0FBQTtBQUNBLFlBQUE7QUFFQSxpQkFEQSxJQUFBLEtBQUEsS0FBQTtpQkFFQSxJQUFBO0FBQ0EsaUJBQUE7O1dBSUEsRUFBQSxxQkFBQSxDQUFBLEVBQUEsa0JBQUEsV0FBQTtBQUNBLFlBQUE7QUFDQSxpQkFBQSxBQUFBLElBQUEsS0FBQSxDQUFBLElBQUEsV0FBQSxNQUFBLFNBQUE7aUJBQ0EsSUFBQTtBQUNBLGlCQUFBOztXQUlBLFFBQUEsUUFBQSxpQkFBQTtBQUNBLFVBQUEsSUFBQSxRQUFBLFFBQUE7QUFNQSxtQkFBQTtBQUNBLGFBQUEsVUFBQSxJQUNBLEtBQUEsU0FBQTs7QUFQQSxNQUFBLE9BQUEsVUFBQSxlQUNBLEtBQUEsUUFBQSxRQUFBLGNBQUEsT0FBQSxxQkFDQSxPQUFBLGtCQUFBLE9BQUEsaUJBQUEsT0FBQSxjQVFBLEVBQUEsVUFBQSxTQUFBLFNBQUEsSUFBQTtBQUNBLFFBQUEsT0FBQSxNQUFBLFdBQ0EsS0FBQSxRQUFBLEtBQUEsTUFFQSxNQUFBLFNBQ0EsS0FBQSxPQUFBLEtBQUE7U0FJQSxFQUFBLFVBQUEsUUFBQSxXQUFBO0FBQ0EsWUFBQSxLQUFBLFFBQUEsU0FBQSxHQUFBO0FBQ0EsY0FBQSxLQUFBLElBQUEsV0FBQSxLQUFBO0FBQ0EsWUFBQSxzQkFDQSxNQUFBLEdBQUEsU0FFQSxLQUFBLE9BQUEsS0FBQSxLQUNBLEtBQUEsVUFBQTs7U0FJQSxFQUFBLFVBQUEsWUFBQSxXQUFBO0FBRUEsWUFEQSxLQUFBLFNBQ0EsRUFBQSxnQkFBQTtBQUVBLG1CQURBLEtBQUEsSUFBQSxLQUNBLElBQUEsR0FBQSxJQUFBLEtBQUEsT0FBQSxRQUFBLElBQUEsR0FBQTtBQUNBLGVBQUEsT0FBQSxLQUFBLE9BQUE7QUFFQSxpQkFBQSxHQUFBOztBQUVBLGVBQUEsSUFBQSxLQUFBLEtBQUE7U0FJQSxRQUFBLFFBQUEsZ0JBQUE7O0FDL0RBLFVBQUEsSUFBQSxTQUFBLG1CQUFBLGVBQ0EsSUFBQSxTQUFBLG1CQUFBLGdCQUVBLElBQUEsQ0FDQSxRQUFBLFNBQUEsSUFBQTtBQUVBLGVBREEsSUFBQSxFQUFBLElBQ0E7U0FFQSxNQUFBLFNBQUEsSUFBQTtBQUNBLFlBQUEsS0FBQSxJQUFBO0FBR0EsZUFGQSxHQUFBLEtBQUEsS0FDQSxHQUFBOztBQU9BLGlCQUFBLElBQUE7QUFFQSxhQUFBLFFBQUEsR0FDQSxLQUFBLGFBQUEsSUFDQSxLQUFBLFdBQUEsSUFBQSxXQUFBLEtBQUEsYUFDQSxLQUFBLFNBQUEsS0FBQSxXQUFBOztBQTRPQSxtQkFBQTtBQUNBLGFBQUEsZ0JBQUEsSUFBQTs7QUFvUEEsaUJBQUEsSUFBQTtBQUNBLFlBQUEsS0FBQSxHQUFBLFdBQUE7QUFFQSxlQUFBLE1BQUEsT0FBQSxPQUNBLE1BQUEsUUFBQSxRQUNBLE1BQUEsVUFBQSxTQUNBLE1BQUEsV0FBQSxVQUNBOztBQUdBLGlCQUFBLElBQUE7QUFDQSxlQUFBLEdBQUEsU0FBQSxNQUVBLElBQUEsS0FBQSxDQUFBLEtBQUEsT0FFQSxHQUFBLFFBQUEscUJBQUEsR0FBQTs7QUF2ZkEsY0FBQSxVQUFBLEdBVUEsRUFBQSxVQUFBLFNBQUEsV0FBQTtBQUNBLFlBT0EsSUFQQSxLQUFBLEtBQUE7QUFDQSxZQUFBLEtBQUE7QUFDQSxpQkFBQTtBQUNBLFlBQUEsT0FBQSxNQUFBO0FBQ0EsaUJBQUEsT0FBQSxNQUFBO0FBSUEsWUFBQSxNQUFBLE1BQUEsT0FBQTtBQUNBLGlCQUFBLEtBQUEsV0FBQTtBQUNBLFlBQUEsTUFBQSxNQUFBLE9BQUE7QUFDQSxpQkFBQSxLQUFBLGNBQUE7QUFDQSxZQUFBLE1BQUEsTUFBQSxPQUFBO0FBQ0EsaUJBQUEsS0FBQSxhQUFBO0FBQ0EsWUFBQSxNQUFBLE1BQUEsT0FBQTtBQUNBLGlCQUFBLEtBQUEsV0FBQTtBQUdBLGdCQUFBO2VBQ0E7QUFDQSxtQkFBQTtlQUNBO0FBQ0E7ZUFDQTtBQUNBLG1CQUFBO2VBQ0E7QUFDQSxtQkFBQTtlQUNBO0FBQ0EsbUJBQUEsS0FBQTtlQUNBO0FBQ0EsbUJBQUEsS0FBQTtlQUNBO0FBQ0EsbUJBQUEsS0FBQTtlQUNBO0FBQ0EsbUJBQUEsS0FBQTtlQUNBO0FBQ0EsbUJBQUEsS0FBQTtlQUNBO0FBQ0EsbUJBQUEsS0FBQTtlQUNBO0FBQ0EsbUJBQUEsS0FBQTtlQUNBO0FBQ0EsbUJBQUEsS0FBQTtlQUNBO0FBQ0EsbUJBQUEsS0FBQTtlQUNBO0FBQ0EsbUJBQUEsS0FBQTtlQUNBO2VBRUE7ZUFFQTtlQUVBO0FBQ0E7ZUFDQTtBQUVBLG1CQURBLEtBQUEsS0FBQSxpQkFDQSxLQUFBLGNBQUE7ZUFDQTtBQUVBLG1CQURBLEtBQUEsS0FBQSxpQkFDQSxLQUFBLGNBQUE7ZUFDQTtBQUVBLG1CQURBLEtBQUEsS0FBQSxpQkFDQSxLQUFBLFdBQUE7ZUFDQTtBQUVBLG1CQURBLEtBQUEsS0FBQSxpQkFDQSxLQUFBLFdBQUE7ZUFDQTtBQUVBLG1CQURBLEtBQUEsS0FBQSxpQkFDQSxLQUFBLGFBQUE7ZUFDQTtBQUVBLG1CQURBLEtBQUEsS0FBQSxpQkFDQSxLQUFBLGFBQUE7ZUFDQTtBQUVBLG1CQURBLEtBQUEsS0FBQSxpQkFDQSxLQUFBLFdBQUE7ZUFDQTtBQUVBLG1CQURBLEtBQUEsS0FBQSxpQkFDQSxLQUFBLFdBQUE7O1NBSUEsRUFBQSxVQUFBLGVBQUEsV0FBQTtBQUNBLFlBQUEsS0FBQSxNQUFBLEtBQUEsU0FBQSxLQUFBO0FBRUEsZUFEQSxLQUFBLFNBQ0E7U0FHQSxFQUFBLFVBQUEsZ0JBQUEsV0FBQTtBQUNBLFlBQUEsS0FBQSxLQUFBLEtBQUEsSUFDQSxLQUNBLE1BQUEsT0FBQSxHQUFBLE1BQUEsT0FBQSxHQUFBO0FBRUEsZUFEQSxLQUFBLFNBQUEsR0FDQTtTQUdBLEVBQUEsVUFBQSxnQkFBQSxXQUFBO0FBQ0EsWUFBQSxLQUFBLEtBQUEsS0FBQSxJQUNBLEtBR0EsTUFEQSxPQURBLE9BQUEsR0FBQSxLQUNBLEdBQUEsTUFDQSxHQUFBLE1BQ0EsR0FBQTtBQUVBLGVBREEsS0FBQSxTQUFBLEdBQ0E7U0FHQSxFQUFBLFVBQUEsZ0JBQUEsV0FBQTtBQUNBLFlBQUEsS0FBQSxLQUFBLEtBQUEsSUFDQSxLQU9BLE1BREEsT0FEQSxPQURBLE9BREEsT0FEQSxPQURBLE9BQUEsR0FBQSxLQUNBLEdBQUEsTUFDQSxHQUFBLE1BQ0EsR0FBQSxNQUNBLEdBQUEsTUFDQSxHQUFBLE1BQ0EsR0FBQSxNQUNBLEdBQUE7QUFFQSxlQURBLEtBQUEsU0FBQSxHQUNBO1NBR0EsRUFBQSxVQUFBLGNBQUEsV0FBQTtBQUNBLFlBQUEsS0FBQSxLQUFBO0FBQ0EsZUFBQSxLQUFBLE1BQUEsS0FBQSxLQUFBO1NBR0EsRUFBQSxVQUFBLGVBQUEsV0FBQTtBQUNBLFlBQUEsS0FBQSxLQUFBO0FBQ0EsZUFBQSxLQUFBLFFBQUEsS0FBQSxLQUFBO1NBR0EsRUFBQSxVQUFBLGVBQUEsV0FBQTtBQUNBLFlBQUEsS0FBQSxLQUFBO0FBQ0EsZUFBQSxLQUFBLEtBQUEsSUFBQSxHQUFBLE1BQUEsS0FDQSxLQUFBLEtBQUEsSUFBQSxHQUFBO1NBR0EsRUFBQSxVQUFBLGVBQUEsV0FBQTtBQUNBLFlBQUEsS0FBQSxLQUFBO0FBQ0EsZUFBQSxLQUFBLEtBQUEsSUFBQSxHQUFBLE1BQUEsS0FDQSxLQUFBLEtBQUEsSUFBQSxHQUFBO1NBR0EsRUFBQSxVQUFBLGFBQUEsU0FBQSxJQUFBO0FBQ0EsWUFBQSxLQUFBLFNBQUEsS0FBQSxRQUFBO0FBQ0EsZ0JBQUEsSUFBQSxNQUFBLDhDQUNBLEtBQUEsUUFBQSxNQUFBLEtBQUEsTUFBQSxLQUFBO0FBRUEsWUFBQSxLQUFBLEtBQUEsV0FBQSxNQUFBLEtBQUEsT0FBQSxLQUFBLFFBQUE7QUFLQSxlQUpBLEtBQUEsU0FBQSxJQUlBO1NBR0EsRUFBQSxVQUFBLGdCQUFBLFNBQUEsSUFBQTtBQU9BLGlCQUhBLElBQ0EsSUFKQSxLQUFBLEtBQUEsS0FBQSxLQUNBLEtBQUEsR0FDQSxLQUFBLElBSUEsS0FBQTtBQUFBLFVBQ0EsTUFBQSxHQUFBLE9BQ0EsTUFDQSxPQUFBLE9BQUEsYUFBQSxLQUNBLFFBQ0EsT0FBQSxNQUFBLEtBQ0EsTUFBQSxPQUFBLE9BQUEsSUFBQSxLQUFBLEdBQUEsS0FBQSxJQUNBLE1BQUEsT0FBQSxhQUFBLEtBQ0EsTUFBQSxLQUVBLE1BQUEsTUFBQSxPQUFBLEtBQUEsTUFBQSxHQUFBLEtBQUEsT0FBQSxJQUNBLEtBQUEsR0FBQSxLQUFBLElBQ0EsTUFBQSxPQUFBLGFBQUEsS0FDQSxNQUFBO0FBS0EsZUFEQSxLQUFBLFNBQUEsSUFDQTtTQUdBLEVBQUEsVUFBQSxlQUFBLFNBQUEsSUFBQTtBQUVBLGlCQURBLEtBQUEsSUFBQSxNQUFBLEtBQ0EsS0FBQSxHQUFBLEtBQUEsSUFBQTtBQUNBLGFBQUEsTUFBQSxLQUFBO0FBRUEsZUFBQTtTQUdBLEVBQUEsVUFBQSxhQUFBLFNBQUEsSUFBQTtBQUVBLGlCQURBLEtBQUEsSUFDQSxLQUFBLEdBQUEsS0FBQSxJQUFBLE1BQUE7QUFDQSxjQUFBLEtBQUEsS0FBQSxVQUNBLEtBQUEsS0FBQTtBQUNBLGFBQUEsTUFBQTs7QUFFQSxlQUFBO1NBR0EsRUFBQSxVQUFBLGVBQUEsV0FBQTtBQUNBLFlBQUEsS0FBQSxLQUFBLGlCQUVBLEtBQUEsT0FBQSxLQUFBLE9BQUE7QUFFQSxlQUFBLENBSEEsTUFBQSxPQUdBLElBQUEsSUFBQSxNQURBLFdBQUEsS0FBQSxXQUVBLEtBQUEsSUFBQSxHQUFBLEtBQUE7U0FHQSxFQUFBLFVBQUEsZ0JBQUEsV0FBQTtBQUNBLFlBQUEsS0FBQSxLQUFBLGlCQUNBLEtBQUEsS0FBQSxpQkFFQSxLQUFBLE9BQUEsS0FBQSxRQUFBO0FBSUEsZUFBQSxDQUxBLE1BQUEsT0FLQSxJQUFBLElBQUEsTUFIQSxZQUFBLEtBQUEsV0FDQSxLQUFBLElBQUEsR0FBQSxLQUFBLE1BQ0EsS0FBQSxLQUFBLElBQUEs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QSxPQUFBLE1BQUE7QUFDQSxlQUFBLGNBQUEsT0FBQSxNQUFBO2lCQUNBLE1BQUEsS0FBQSxNQUFBO0FBQ0EsZUFBQSxjQUFBLE9BQUEsTUFDQSxLQUFBLFdBQUE7aUJBQ0EsTUFBQSxRQUFBLE1BQUE7QUFDQSxlQUFBLGNBQUEsT0FBQSxNQUNBLEtBQUEsVUFBQTtpQkFDQSxNQUFBLEtBQUEsTUFBQTtBQUNBLGVBQUEsY0FBQSxPQUFBLE1BQ0EsS0FBQSxZQUFBO2lCQUNBLE1BQUEsVUFBQSxNQUFBO0FBQ0EsZUFBQSxjQUFBLE9BQUEsTUFDQSxLQUFBLFdBQUE7aUJBQ0EsTUFBQSxLQUFBLE1BQUE7QUFDQSxlQUFBLGNBQUEsT0FBQSxNQUNBLEtBQUEsWUFBQTtpQkFDQSxNQUFBLGVBQUEsTUFBQTtBQUNBLGVBQUEsY0FBQSxPQUFBLE1BQ0EsS0FBQSxXQUFBO2lCQUNBLE1BQUEsdUJBQUEsTUFBQTtBQUNBLGVBQUEsY0FBQSxPQUFBLE1BQ0EsS0FBQSxXQUFBO2FBQ0E7QUFBQSxjQUFBLENBQUEsT0FBQSxLQUFBLE1BQUE7QUFJQSxrQkFBQSxJQUFBLE1BQUE7QUFIQSxlQUFBLGNBQUEsT0FBQSxNQUNBLEtBQUEsWUFBQTs7U0FNQSxFQUFBLFVBQUEsY0FBQSxTQUFBLElBQUE7QUFDQSxZQUFBLEtBQUE7QUFDQSxhQUFBLEtBQ0EsTUFBQSxHQUNBLEtBQUEsQ0FBQTtBQUVBLFlBQUEsS0FBQSxLQUFBLE1BQUEsS0FBQSxJQUFBLE1BQUEsS0FBQSxNQUNBLEtBQUEsS0FBQSxLQUFBLElBQUEsR0FBQSxNQUFBLEdBQ0EsS0FBQSxLQUFBLE1BQUEsS0FBQSxLQUFBLElBQUEsR0FBQSxNQUNBLEtBQUEsS0FBQSxJQUFBLEdBQUEsS0FDQSxLQUFBLE1BQUEsS0FBQSxLQUFBLFFBQUEsS0FDQSxLQUFBLEtBQUEsU0FDQSxLQUFBLEtBQUE7QUFDQSxhQUFBLGNBQUEsT0FBQSxNQUNBLEtBQUEsV0FBQSxLQUNBLEtBQUEsV0FBQTtTQUdBLEVBQUEsVUFBQSxjQUFBLFNBQUEsSUFBQTtBQUNBLFlBQ0EsS0FEQSxPQUFBLEtBQUEsSUFDQTtBQUNBLFlBQUEsTUFBQTtBQUNBLGVBQUEsV0FBQSxNQUFBO2lCQUNBLE1BQUE7QUFDQSxlQUFBLGNBQUEsT0FBQSxNQUNBLEtBQUEsWUFBQTthQUNBO0FBQUEsY0FBQSxDQUFBLE9BQUE7QUFJQSxrQkFBQSxJQUFBLE1BQUE7QUFIQSxlQUFBLGNBQUEsT0FBQSxNQUNBLEtBQUEsWUFBQTs7QUFJQSxpQkFBQSxNQUFBO0FBQ0EsYUFBQSxlQUFBLE9BQ0EsTUFBQSxLQUFBLEtBQ0EsS0FBQSxLQUFBLEdBQUE7U0FLQSxFQUFBLFVBQUEsYUFBQSxTQUFBLElBQUE7QUFDQSxhQUFBLGNBQUEsT0FBQTtTQUdBLEVBQUEsVUFBQSxjQUFBLFNBQUEsSUFBQTtBQUNBLGFBQUEsY0FBQSxPQUFBLE1BQUEsSUFDQSxLQUFBLGNBQUEsT0FBQSxNQUFBO1NBR0EsRUFBQSxVQUFBLGNBQUEsU0FBQSxJQUFBO0FBQ0EsWUFBQSxLQUFBLGFBQUE7QUFDQSxhQUFBLGNBQUEsT0FBQSxjQUFBLFFBQUEsS0FDQSxLQUFBLGNBQUEsT0FBQSxZQUFBLFFBQUEsS0FDQSxLQUFBLGNBQUEsT0FBQSxTQUFBLFFBQUEsSUFDQSxLQUFBLGNBQUEsT0FBQSxNQUFBO1NBR0EsRUFBQSxVQUFBLGNBQUEsU0FBQSxJQUFBO0FBQ0EsWUFBQSxLQUFBLEtBQUEsS0FBQSxJQUFBLEdBQUEsS0FDQSxLQUFBLEtBQUEsS0FBQSxJQUFBLEdBQUE7QUFDQSxhQUFBLGNBQUEsT0FBQSxjQUFBLFFBQUEsS0FDQSxLQUFBLGNBQUEsT0FBQSxZQUFBLFFBQUEsS0FDQSxLQUFBLGNBQUEsT0FBQSxTQUFBLFFBQUEsSUFDQSxLQUFBLGNBQUEsT0FBQSxNQUFBLEtBQ0EsS0FBQSxjQUFBLE9BQUEsY0FBQSxRQUFBLEtBQ0EsS0FBQSxjQUFBLE9BQUEsWUFBQSxRQUFBLEtBQ0EsS0FBQSxjQUFBLE9BQUEsU0FBQSxRQUFBLElBQ0EsS0FBQSxjQUFBLE9BQUEsTUFBQTtTQUdBLEVBQUEsVUFBQSxZQUFBLFNBQUEsSUFBQTtBQUNBLGFBQUEsY0FBQSxPQUFBLE1BQUE7U0FHQSxFQUFBLFVBQUEsYUFBQSxTQUFBLElBQUE7QUFDQSxhQUFBLGNBQUEsT0FBQSxTQUFBLE9BQUEsSUFDQSxLQUFBLGNBQUEsT0FBQSxNQUFBO1NBR0EsRUFBQSxVQUFBLGFBQUEsU0FBQSxJQUFBO0FBQ0EsYUFBQSxjQUFBLE9BQUEsT0FBQSxLQUFBLE1BQ0EsS0FBQSxjQUFBLE9BQUEsWUFBQSxRQUFBLEtBQ0EsS0FBQSxjQUFBLE9BQUEsU0FBQSxRQUFBLElBQ0EsS0FBQSxjQUFBLE9BQUEsTUFBQTtTQUdBLEVBQUEsVUFBQSxhQUFBLFNBQUEsSUFBQTtBQUNBLFlBQUEsS0FBQSxLQUFBLE1BQUEsS0FBQSxLQUFBLElBQUEsR0FBQSxNQUNBLEtBQUEsS0FBQSxLQUFBLElBQUEsR0FBQTtBQUNBLGFBQUEsY0FBQSxPQUFBLGNBQUEsUUFBQSxLQUNBLEtBQUEsY0FBQSxPQUFBLFlBQUEsUUFBQSxLQUNBLEtBQUEsY0FBQSxPQUFBLFNBQUEsUUFBQSxJQUNBLEtBQUEsY0FBQSxPQUFBLE1BQUEsS0FDQSxLQUFBLGNBQUEsT0FBQSxjQUFBLFFBQUEsS0FDQSxLQUFBLGNBQUEsT0FBQSxZQUFBLFFBQUEsS0FDQSxLQUFBLGNBQUEsT0FBQSxTQUFBLFFBQUEsSUFDQSxLQUFBLGNBQUEsT0FBQSxNQUFBOzs7QUM3ZUE7QUFrUUMsaUJBQUEsSUFBQSxJQUFBLElBQUE7QUFBQSxlQUFBLE1BQUEsS0FBQSxPQUFBLGVBQUEsSUFBQSxJQUFBLENBQUEsT0FBQSxJQUFBLFlBQUEsTUFBQSxjQUFBLE1BQUEsVUFBQSxTQUFBLEdBQUEsTUFBQSxJQUFBOztBQUFBLGlCQUFBLElBQUE7QUFBQSxlQUFBLEtBQUEsQUFBQSxPQUFBLFVBQUEsY0FBQSxBQUFBLE9BQUEsT0FBQSxZQUFBLFdBQUEsU0FBQSxJQUFBO0FBQUEsaUJBQUEsT0FBQTtZQUFBLFNBQUEsSUFBQTtBQUFBLGlCQUFBLE1BQUEsQUFBQSxPQUFBLFVBQUEsY0FBQSxHQUFBLGdCQUFBLFVBQUEsT0FBQSxPQUFB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QkFBQSxHQUFBLFNBQUEsdUJBQUEsR0FBQSxPQUFBLGVBQUEsVUFBQSxvQkFBQSxDQUFBLFlBQUEsTUFBQSxLQUFBLFdBQUE7QUFBQSxlQUFBLEVBQUE7V0FBQSxPQUFBLGVBQUEsVUFBQSx1QkFBQSxDQUFBLFlBQUEsTUFBQSxLQUFBLFdBQUE7QUFBQSxlQUFBLEVBQUE7O0FBcHJCRCxVQUFBLElBQUEsRUFBQSxTQUFBLGlCQUVBLElBQUEsU0FBQSxtQkFDQSxJQUFBLFNBQUE7QUFpckJDLG1CQUFBO0FBQUEsWUFBQSxBQUFBLE9BQUEsV0FBQTtBQUFBLGlCQUFBO0FBQUEsWUFBQSxLQUFBLElBQUE7QUFBQSxlQUFBLElBQUEsV0FBQTtBQUFBLGlCQUFBO1dBQUE7O0FBQUEsaUJBQUEsSUFBQTtBQUFBLFlBQUEsTUFBQSxHQUFBO0FBQUEsaUJBQUE7QUFBQSxZQUFBLEFBQUEsT0FBQSxRQUFBLEFBQUEsT0FBQSxNQUFBLFlBQUEsQUFBQSxPQUFBLE1BQUE7QUFBQSxpQkFBQSxDQUFBLFNBQUE7QUFBQSxZQUFBLEtBQUE7QUFBQSxZQUFBLE1BQUEsR0FBQSxJQUFBO0FBQUEsaUJBQUEsR0FBQSxJQUFBO0FBQUEsWUFBQSxLQUFBLElBQUEsS0FBQSxPQUFBLGtCQUFBLE9BQUE7QUFBQSxpQkFBQSxNQUFBO0FBQUEsY0FBQSxPQUFBLFVBQUEsZUFBQSxLQUFBLElBQUEsS0FBQTtBQUFBLGdCQUFBLEtBQUEsS0FBQSxPQUFBLHlCQUFBLElBQUEsTUFBQTtBQUFBLGtCQUFBLElBQUEsT0FBQSxHQUFBLE9BQUEsT0FBQSxlQUFBLElBQUEsSUFBQSxNQUFBLEdBQUEsTUFBQSxHQUFBOztBQUFBLGVBQUEsR0FBQSxVQUFBLElBQUEsTUFBQSxHQUFBLElBQUEsSUFBQSxLQUFBOztBQUFBLGlCQUFBLElBQUEsSUFBQSxJQUFBO0FBQUEsZUFBQSxNQUFBLEtBQUEsT0FBQSxlQUFBLElBQUEsSUFBQSxDQUFBLE9BQUEsSUFBQSxZQUFBLE1BQUEsY0FBQSxNQUFBLFVBQUEsU0FBQSxHQUFBLE1BQUEsSUFBQTs7QUFB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R0FBQTtBQWtCQSxlQWpCQSxFQUFBLEtBQUEsUUFDQSxFQUFBLEtBQUEsSUFDQSxBQUFBLE1BQUEsVUFBQSxHQUFBLGtCQUNBLEdBQUEsZUFDQSxHQUFBLEtBQUEsVUFDQSxFQUFBLEtBQUEsR0FBQSxpQkFDQSxFQUFBLEtBQUEsVUFDQSxFQUFBLEtBQUEsR0FBQSxlQUVBLEdBQUEsV0FBQSxBQUFBLEdBQUEsU0FBQSxrQkFBQSxTQUNBLEdBQUEsS0FBQSxZQUNBLEVBQUEsS0FBQSxHQUFBLFdBRUEsSUFBQSxvQkFBQSxHQUFBLFVBQ0EsR0FBQSxLQUFBLFVBQ0EsRUFBQSxLQUFBLEdBQUEsb0JBQUEsR0FBQSxTQUVBLGVBQUEsRUFBQSxLQUFBO1NBS0EsRUFBQSxrQkFBQSxTQUFBLElBQUE7QUFDQSxlQUFBLEdBQUEsT0FBQSxJQUFBLE1BQUE7U0FLQSxFQUFBLGNBQUEsU0FBQSxJQUFBO0FBQ0EsWUFBQSxJQUFBLEdBQUEsT0FBQSxHQUFBLE1BQUEsTUFDQSxJQUFBLENBQ0EsYUFBQSxTQUFBLEVBQUEsU0FBQTtBQVVBLGVBUEEsSUFBQSxFQUFBLEdBQUEsTUFBQSxNQUVBLEVBQUEsT0FBQSxFQUFBLElBQ0EsRUFBQSxZQUFBLFNBQUEsRUFBQSxJQUFBLEtBQ0EsRUFBQSxXQUFBLEFBQUEsRUFBQSxXQUFBLElBQUEsU0FBQSxFQUFBLElBQUEsTUFBQSxHQUVBLEVBQUEsY0FBQSxFQUFBLFVBQ0E7U0FLQSxFQUFBLGNBQUEsU0FBQSxJQUFBO0FBQ0EsWUFBQSxJQUFBLEdBQUE7QUFBQSxRQUNBLEdBQUEseUJBREEsVUFFQSxLQUFBLEdBQUE7QUFFQSxZQUFBLElBQUEsR0FBQSxZQUFBLEdBQUEsZUFBQTtBQUNBLGVBQUEsY0FBQSxJQUFBLE1BQUEsR0FBQSxPQUFBLE1BQUEsR0FBQSxZQUNBLENBQUEsTUFBQSxJQUFBLE1BQUEsSUFBQSxNQUFBO1NBTUEsRUFBQSxjQUFBLFNBQUEsSUFBQTtBQUNBLFlBQUEsSUFBQSxHQUFBLE9BQUEsR0FBQSxNQUFBO0FBQ0EsZUFBQSxDQUNBLElBQUEsU0FBQSxFQUFBLElBQUEsS0FDQSxXQUFBLEVBQUEsR0FBQSxRQUFBLE9BQUEsSUFBQSxFQUFBLEdBQUEsTUFBQSxLQUFBLEtBQUEsWUFDQSxLQUFBLEVBQUE7U0FNQSxFQUFBLGNBQUEsU0FBQSxJQUFBO0FBQ0EsZUFBQSxjQUFBLElBQUEsTUFBQSxHQUFBLGVBQ0EsSUFBQSxhQUFBLEFBQUEsR0FBQSxjQUFBLGFBQ0EsTUFBQSxHQUFBLFlBQ0EsTUFDQSxNQUFBLEdBQUEsTUFBQTtTQU1BLEVBQUEsWUFBQSxTQUFBLElBQUE7QUFJQSxpQkFGQSxHQURBLElBQUEsSUFFQSxJQUFBLEdBQUEsT0FBQSxHQUFBLFFBQUEsT0FBQSxHQUFBLE1BQUEsTUFDQSxJQUFBLEdBQUEsSUFBQSxFQUFBLFFBQUE7QUFFQSxZQURBLEtBQUEsRUFBQSxHQUFBLE9BQUEsTUFBQSxNQUNBLEdBQUEsVUFBQSxFQUFBO0FBRUEsZUFBQTtTQUlBLEVBQUEsWUFBQSxTQUFBLElBQUE7QUFDQSxZQUFBLElBQUEsSUFDQSxJQUFBLEdBQUE7QUFJQSxZQUFBLEFBSEEsR0FBQSx5QkFHQSxVQUZBLEtBQUEsR0FBQSx1QkFFQSxHQUFBLGNBQUEsT0FBQSxLQUFBLEdBQUEsWUFBQSxRQUFBO0FBQ0EsY0FBQSxJQUFBO0FBQ0EsaUJBQUEsS0FBQSxHQUFBLFlBQUEsUUFBQSxTQUFBLElBQUE7QUFDQSxlQUFBLFdBQUEsTUFDQSxFQUFBLEtBQUEsS0FBQSxNQUFBLEdBQUEsV0FBQSxPQUVBLEVBQUEsS0FBQTtjQUdBLEtBQUEsWUFBQSxJQUFBLE1BQUEsRUFBQSxLQUFBLE9BQUE7O0FBRUEsZUFBQTtTQUtBLEVBQUEsY0FBQSxTQUFBLElBQUE7QUFDQSxZQUFBLElBQUEsR0FBQSxPQUFBLEdBQUEsUUFBQSxPQUFBLEdBQUEsTUFBQTtBQUNBLGVBQUEsQ0FDQSxNQUFBLEVBQUEsU0FDQSxXQUFBLEVBQUEsS0FBQTtTQUlBLEVBQUEsY0FBQSxTQUFBLElBQUE7QUFDQSxZQUFBLElBQUEsSUFDQSxJQUFBLEdBQUE7QUFZQSxlQUFBLEFBWEEsR0FBQSx5QkFXQSxVQVZBLEtBQUEsR0FBQSx1QkFFQSxHQUFBLGdCQUFBLEdBQUEsYUFBQSxVQUVBLEdBQUEsYUFBQSxRQUFBLFNBQUEsSUFBQTtBQUNBLGVBQUEsZUFBQSxJQUFBLE1BQUEsR0FBQSxPQUNBLElBQUEsYUFBQSxHQUFBLFVBQUEsU0FBQSxNQUFBLEdBQUEsWUFBQSxNQUNBO1lBR0E7U0FLQSxFQUFBLGlCQUFBLFNBQUEsSUFBQTtBQUNBLFlBQUEsSUFBQSxHQUFBLFFBQUEsTUFDQSxJQUFBLENBQ0EsTUFBQSxTQUFBLEdBQUEsT0FBQSxHQUFBLElBQUEsSUFBQSxNQUVBLElBQUEsR0FBQSxRQUFBLEtBQUE7QUFPQSxlQU5BLElBQUEsS0FDQSxHQUFBLFlBQUEsR0FBQSxPQUFBLElBQUEsR0FBQSxJQUFBLElBQUEsSUFDQSxFQUFBLFFBQUEsR0FBQSxPQUFBLElBQUEsTUFFQSxFQUFBLFlBQUEsR0FBQSxPQUFBLElBQUEsSUFFQTtTQUdBLEVBQUEsaUJBQUEsU0FBQSxJQUFBO0FBQ0EsWUFBQSxJQUFBLEdBQUEsT0FBQSxJQUFBLE1BQUE7QUFDQSxlQUFBLENBQ0EsV0FBQSxFQUFBLFNBQ0EsT0FBQSxFQUFBLElBQUEsU0FBQSxJQUFBO0FBQ0EsaUJBQUEsU0FBQSxJQUFBOztTQU9BLEVBQUEsU0FBQSxTQUFBLEdBQUE7QUFDQSxZQUFBLElBQUEsRUFBQSxZQUFBLEdBQUEsVUFBQTtBQUNBLFlBQUE7QUFDQSxpQkFBQSxFQUFBLE9BQUE7U0FJQSxFQUFBLG1CQUFBLFNBQUEsSUFBQTtBQUNBLFlBQUEsSUFBQSxHQUFBLE9BQUEsSUFBQSxNQUFBO0FBQ0EsZUFBQSxDQUNBLFdBQUEsRUFBQSxHQUFBLGVBQ0EsT0FBQSxFQUFBO1NBT0EsRUFBQSxvQkFBQSxTQUFBLEdBQUEsR0FBQTtBQUtBLGVBQUEsQ0FDQSxNQUFBLFFBQ0EsY0FOQSxFQUFBLFlBQUEsSUFBQSxHQUNBLGtCQUtBLElBQUEsRUFBQTtTQUtBLEVBQUEsc0JBQUEsU0FBQSxJQUFBLEdBQUE7QUFDQSxZQUFBLElBQUEsYUFBQSxJQUFBO0FBSUEsZUFIQSxHQUFBLGFBQUEsUUFBQSxTQUFBLElBQUE7QUFDQSxlQUFBLG1CQUFBLEdBQUEsWUFBQSxNQUFBLEdBQUEsUUFBQTtZQUVBO1NBS0EsRUFBQSxrQkFBQSxTQUFBLElBQUE7QUFDQSxZQUFBLElBQUEsR0FBQSxPQUFBLEdBQUEsTUFBQTtBQUNBLGVBQUEsQ0FDQSxLQUFBLFNBQUEsRUFBQSxJQUFBLEtBQ0EsYUFBQSxFQUFBLElBQ0EsV0FBQSxFQUFBLElBQ0EsZUFBQSxFQUFBLE1BQUE7U0FJQSxFQUFBLGtCQUFBLFNBQUEsR0FBQTtBQUNBLGVBQUEsY0FBQSxFQUFBLE1BQUEsTUFDQSxFQUFBLGNBQUEsTUFDQSxDQUFBLE9BQUEsRUFBQSxhQUFBLFdBQ0EsRUFBQSxxQkFBQSxFQUFBLGFBQ0EsRUFBQSxhQUNBLEdBQUEsZ0JBQUEsTUFBQSxFQUFBLGNBQUEsS0FBQSxPQUFBLE1BQ0E7U0FLQSxFQUFBLHVCQUFBLFNBQUEsSUFBQTtBQUNBLFlBQUEsQUFBQSxHQUFBLFFBQUEsZUFBQTtBQUNBLGlCQUFBO0FBRUEsWUFBQSxJQUFBLEdBQUEsT0FBQSxHQUFBLE1BQUE7QUFDQSxlQUFBLENBQ0EsV0FBQSxVQUNBLFNBQUEsRUFBQSxJQUNBLFVBQUEsRUFBQSxJQUNBLFVBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxNQUFBLEtBQUEsS0FBQSxRQUNBLFdBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxNQUFBLEtBQUEsS0FBQTtTQUlBLEVBQUEsdUJBQUEsU0FBQSxJQUFBO0FBQ0EsZUFBQSxHQUFBLFlBQUEsTUFDQSxHQUFBLFVBQ0EsSUFBQSxXQUFBLE1BQUEsR0FBQSxXQUFBLE1BQ0EsSUFBQSxZQUFBLEdBQUEsWUFDQSxNQUFBLEdBQUEsV0FBQSxNQUFBLEdBQUEsWUFDQTtTQUlBLEVBQUEsc0JBQUEsU0FBQSxHQUFBLEdBQUE7QUFHQSxlQUZBLEVBQUEsWUFBQSxJQUFBLEdBQ0EsYUFDQSxJQUFBLEVBQUE7U0FNQSxFQUFBLG1CQUFBLFNBQUEsR0FBQSxHQUFBO0FBQ0EsWUFBQSxJQUFBLEVBQUEsWUFBQSxJQUFBLEdBQ0EsZ0JBQUEsSUFDQSxJQUFBLEVBQUEsWUFBQSxJQUFBLEdBQ0EsY0FBQTtBQUNBLGVBQUEsS0FBQSxJQUdBLENBQ0Esa0JBQUEsRUFBQSxPQUFBLEtBQ0EsVUFBQSxFQUFBLE9BQUEsT0FKQTtTQVNBLEVBQUEscUJBQUEsU0FBQSxJQUFBO0FBQ0EsZUFBQSxpQkFBQSxHQUFBLG1CQUFBLG1CQUNBLEdBQUEsV0FBQTtTQUlBLEVBQUEscUJBQUEsU0FBQSxHQUFBO0FBU0EsaUJBUkEsSUFBQSxDQUNBLFFBQUEsSUFDQSxrQkFBQSxJQUNBLGVBQUEsSUFDQSxNQUFBLEtBR0EsSUFEQSxFQUFBLFdBQUEsR0FDQSxHQUFBLE1BQUEsTUFDQSxJQUFBLEdBQUEsSUFBQSxFQUFBLFFBQUEsS0FBQTtBQUNBLGNBQUEsSUFBQSxFQUFBLElBQ0EsSUFBQSxFQUFBLFlBQ0EsR0FBQSxjQUFBLElBQUEsS0FBQTtBQUNBLGNBQUEsR0FBQTtBQUNBLGdCQUFBLEtBQUEsRUFBQSxZQUFBLElBQ0EsSUFBQSxFQUFBLFlBQ0EsR0FBQSxZQUFBLElBQUE7QUFRQSxvQkFOQSxHQUFBLGFBQUEsRUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLE1BQUEsSUFDQSxHQUFBLGVBQUEsRUFBQSxZQUNBLEdBQUEsZUFBQSxJQUFBLEtBQ0EsSUFBQSxFQUFBLGNBQ0EsRUFBQSxPQUFBLEtBQUEsS0FFQSxHQUFBLEtBQUE7bUJBQ0E7bUJBQ0E7QUFDQSxrQkFBQSxjQUFBLEtBQUEsR0FBQSxLQUFBOzs7O0FBV0EsZUFKQSxFQUFBLFlBQUEsR0FBQSxhQUFBLFFBQUEsU0FBQSxJQUFBO0FBQ0EsWUFBQSxpQkFBQSxLQUFBLEVBQUEsWUFBQTtZQUdBO1NBS0EsRUFBQSxzQkFBQSxTQUFBLEdBQUEsR0FBQTtBQUNBLFlBQUEsSUFBQTtBQUdBLGFBQUEsT0FBQSxJQUFBLEtBQ0EsS0FBQSxFQUFBLE9BQUEsU0FBQSxJQUFBLE1BQUEsS0FDQSxLQUFBLHVCQUNBLEtBQUEsRUFBQSxPQUFBLElBQUEsU0FBQSxJQUFBO0FBQ0EsaUJBQUEsQUFBQSxHQUFBLHlCQUFBLFNBQ0EsR0FBQSx1QkFFQSxHQUFBO1dBQ0EsS0FBQSxPQUFBLFFBRUEsS0FBQSx3QkFDQSxLQUFBLCtCQUdBLEVBQUEsT0FBQSxRQUFBLFNBQUEsSUFBQTtBQUNBLGVBQUEsRUFBQSxZQUFBLEtBQ0EsS0FBQSxFQUFBLFVBQUEsS0FDQSxLQUFBLEVBQUEsWUFBQTs7QUFFQSxZQUFBLElBQUE7QUFpQkEsZUFoQkEsRUFBQSxPQUFBLFFBQUEsU0FBQSxJQUFBO0FBQ0EsYUFBQSxXQUFBLEtBQ0EsS0FBQSxHQUFBO1lBR0EsSUFBQSxLQUNBLE1BQUEsZ0JBQUEsSUFBQSxTQUVBLEtBQUEsa0JBRUEsRUFBQSxvQkFDQSxFQUFBLGlCQUFBLFFBQUEsU0FBQSxJQUFBO0FBQ0EsZUFBQSxFQUFBLFlBQUE7WUFJQTtTQUtBLEVBQUEsNkJBQUEsU0FBQSxHQUFBO0FBQ0EsWUFjQSxHQWRBLElBQUEsSUFDQSxJQUFBLEVBQUEsbUJBQUEsSUFDQSxJQUFBLEFBQUEsRUFBQSxjQUFBLFFBQUEsV0FBQSxJQUNBLElBQUEsQUFBQSxFQUFBLGNBQUEsUUFBQSxjQUFBLElBR0EsS0FBQSxFQUFBLFlBQUEsR0FBQSxXQUNBLElBQUEsU0FBQSxJQUFBO0FBQ0EsaUJBQUEsRUFBQSxlQUFBO1dBRUEsT0FBQSxTQUFBLElBQUE7QUFDQSxpQkFBQSxBQUFBLEdBQUEsY0FBQTtZQUVBLElBQUEsR0FBQSxTQUFBLEtBQUEsR0FBQSxHQUFBLE1BR0EsSUFBQSxFQUFBLFlBQUEsR0FBQSxvQkFDQSxJQUFBLFNBQUEsSUFBQTtBQUVBLGlCQURBLEdBQUEsT0FBQSxJQUFBLE1BQUEsS0FDQSxJQUFBLFNBQUEsSUFBQTtBQUNBLG1CQUFBLFNBQUEsSUFBQTs7O0FBR0EsVUFBQSxTQUFBLEtBQUEsRUFBQSxHQUFBLFNBQUEsS0FBQSxFQUFBLEdBQUEsT0FBQSxLQUNBLEtBQUEsRUFBQSxHQUFBLEtBR0EsRUFBQSxPQUFBLFFBQUEsU0FBQSxJQUFBO0FBQ0EsY0FBQSxBQUFBLEdBQUEsS0FBQSxrQkFBQSxTQUFBLEdBQUEsV0FBQSxLQUFBO0FBQ0EsZ0JBQUEsS0FBQSxDQUNBLE1BQUEsR0FDQSxrQkFBQSxTQUFBLEdBQUEsV0FBQSxLQUFBO0FBRUEsaUJBQUEsS0FDQSxJQUFBLE1BQUEsQ0FBQSxNQUFBLEtBRUEsRUFBQSxLQUFBLEtBQ0EsS0FDQSxPQUFBLEtBQUEsTUFBQSxLQUFBLFVBQUEsTUFDQSxNQUFBLENBQ0EsTUFBQSxHQUNBLFdBQUEsSUFBQSxlQUFBLFFBRUEsRUFBQSxLQUFBOztZQUlBLEFBQUEsRUFBQSxXQUFBLEtBQUEsS0FDQSxFQUFBLEtBQUEsQ0FDQSxNQUFBO0FBS0EsWUFBQSxJQUFBLEVBQUEsWUFBQSxHQUFBO0FBZUEsZUFkQSxFQUFBLFVBRUEsS0FEQSxBQUFBLEVBQUEsR0FBQSxRQUFBLGVBQUEsSUFDQSxTQUFBLEVBQUEsR0FBQSxPQUFBLElBQUEsTUFDQSxBQUFBLEVBQUEsR0FBQSxRQUFBLGFBQUEsSUFFQSxNQUFBLFNBQUEsRUFBQSxHQUFBLE9BQUEsSUFBQSxNQUFBLE9BQ0EsT0FBQSxRQUlBLEVBQUEsUUFBQSxTQUFBLElBQUE7QUFDQSxhQUFBLGFBQUE7YUFHQTtTQUlBLEVBQUEsc0JBQUEsU0FBQSxHQUFBO0FBQ0EsWUFBQSxJQUFBLElBSUEsSUFBQSxFQUFBLFlBQUEsR0FBQSxXQUNBLElBQUEsU0FBQSxJQUFBO0FBQ0EsaUJBQUEsRUFBQSxlQUFBO1dBRUEsT0FBQSxTQUFBLElBQUE7QUFDQSxpQkFBQSxBQUFBLEdBQUEsY0FBQTtXQUNBO0FBQ0EsYUFDQSxHQUFBLFFBQUEsRUFBQSxPQUNBLEVBQUEsT0FBQSxFQUFBO0FBS0EsWUFBQSxJQUFBLEVBQUEsWUFBQSxHQUFBO0FBQ0EsVUFBQSxjQUFBLEVBQUEsU0FBQSxHQUNBLEVBQUEsV0FBQSxBQUFBLEVBQUEsV0FBQTtBQUlBLFlBQUEsSUFBQSxFQUFBLFlBQUEsR0FBQTtBQUdBLGVBRkEsRUFBQSxNQUFBLEVBQUEsU0FBQSxHQUVBO1NBS0EsRUFBQSxZQUFBLFNBQUEsR0FBQTtBQUNBLFlBQUEsR0FDQSxJQUFBLEVBQUEsWUFBQSxHQUFBO0FBQ0EsWUFBQSxBQUFBLEVBQUEsV0FBQTtBQUVBLGlCQUFBLENBQUEsUUFEQSxLQUFBLEVBQUEsR0FBQSxPQUFBLEdBQUEsTUFBQSxNQUNBLElBQUEsT0FBQSxFQUFBO0FBRUEsWUFBQSxJQUFBLEVBQUEsWUFBQSxHQUFBLFdBQ0EsSUFBQSxTQUFBLElBQUE7QUFDQSxpQkFBQSxFQUFBLGVBQUE7V0FFQSxPQUFBLFNBQUEsSUFBQTtBQUNBLGlCQUFBLEFBQUEsR0FBQSxjQUFBOztBQUVBLGVBQUEsRUFBQSxTQUFBLElBRUEsQ0FBQSxRQURBLEtBQUEsRUFBQSxHQUFBLE1BQUEsTUFBQSxNQUNBLElBQUEsT0FBQSxFQUFBLE1BQUE7U0FPQSxFQUFBLHVCQUFBLFNBQUEsR0FBQTtBQUNBLFlBRUEsR0FGQSxJQUFBLEVBQUEsV0FBQSxJQUNBLElBQUEsRUFBQSxZQUFBLEdBQUE7QUFFQSxVQUFBLFNBQUEsS0FDQSxLQUFBLFNBQUEsRUFBQSxHQUFBLE9BQUEsS0FBQSxNQUVBLE1BQUEsTUFDQSxLQUFBO0FBRUEsWUFBQSxJQUFBLEVBQUEsWUFBQSxHQUFBO0FBQ0EsWUFBQSxFQUFBLFNBQUE7QUFDQSxpQkFBQSxDQUNBLE1BQUEsU0FBQSxFQUFBLEdBQUEsT0FBQSxLQUFBLEtBQ0EsVUFBQSxFQUFBLEtBQ0EsZ0JBQUE7QUFJQSxZQURBLEVBQUEsWUFBQSxHQUFBLGNBQ0EsU0FBQSxHQUFBO0FBQ0EsY0FBQSxJQUFBLEVBQUEsWUFBQSxHQUFBLGNBQUEsR0FDQSxPQUFBLElBQ0EsTUFBQTtBQUNBLGlCQUFBLENBQ0EsTUFBQSxTQUFBLEVBQUEsSUFBQSxLQUNBLFVBQUEsRUFBQSxJQUNBLGdCQUFBOztTQVVBLEVBQUEsdUJBQUEsU0FBQSxJQUFBLEdBQUE7QUFDQSxZQUFBLElBQUE7QUFpQkEsZUFmQSxJQURBLEFBQUEsR0FBQSxhQUFBLGNBQ0EsQ0FDQSxPQUFBLEdBQUEsT0FBQSxRQUFBLEdBQUEsV0FBQSxNQUFBLEVBQUEsV0FBQSxRQUNBLHdCQUNBLGlCQUFBLEVBQUEsT0FBQSxVQUdBLENBQ0EsT0FBQSxHQUFBLE9BQUEsUUFBQSxHQUFBLFdBQUEsTUFBQSxFQUFBLE9BQUEsUUFDQSx3QkFDQSxlQUFBLEVBQUEsT0FBQSxNQUFBLEVBQUEsV0FBQSxlQUFBLEFBR0EsRUFBQSxtQkFIQSxVQUlBLEVBQUEsS0FBQSx3QkFBQSxFQUFBLGlCQUFBLFNBRUEsRUFBQSxLQUFBO1NBT0EsRUFBQSxvQkFBQSxXQUFBO0FBQ0EsZUFBQSxLQUFBLFNBQUEsV0FBQSxPQUFBLEdBQUE7U0FRQSxFQUFBLDBCQUFBLFNBQUEsR0FBQSxHQUFBLEdBQUE7QUFDQSxZQUNBLElBQUEsQUFBQSxNQUFBLFNBQUEsSUFBQTtBQVFBLGVBQUEsY0FGQSxNQUFBLHVCQUdBLE1BUkEsTUFHQSxFQUFBLHVCQUtBLE1BQUEsSUFDQTtTQUtBLEVBQUEsb0JBQUEsU0FBQSxHQUFBLEdBQUEsR0FBQSxHQUFBO0FBQ0EsWUFBQSxJQUFBLEVBQUEsb0JBQUEsRUFBQSxNQUFBO0FBeUJBLFlBdEJBLEtBQUEsRUFBQSxtQkFDQSxFQUFBLFlBQUEsdUJBR0EsS0FBQSxFQUFBLG9CQUNBLEVBQUEsY0FBQSxzQkFDQSxBQUFBLE1BQUEsVUFBQSxZQUFBLFdBRUEsS0FBQSxXQUFBLEVBQUEsTUFBQSxRQUVBLEVBQUEsWUFDQSxLQUFBLE9BQUEsRUFBQSxZQUFBLFNBQ0EsRUFBQSxhQUFBLEVBQUEsY0FDQSxLQUFBLG1CQUNBLEVBQUEsWUFDQSxLQUFBLG1CQUNBLEVBQUEsY0FDQSxLQUFBLG1CQUVBLEtBQUEsa0JBR0EsRUFBQSxXQUFBO0FBRUEsY0FBQSxJQUFBLFVBQUEsRUFBQSxLQUFBLE1BQ0EsRUFBQSxVQUFBLE1BQUEsS0FBQTtBQUNBLGVBQUEsT0FBQSxHQUdBLEtBQUEsWUFBQSxFQUFBLHVCQUFBLEdBQUEsT0FDQSxNQUFBLEdBQ0EsRUFBQSx1QkFBQSxHQUFBLE9BQ0EsTUFBQSxZQUFBLEVBQUEsdUJBQUEsR0FBQSxJQUFBLE9BQ0EsTUFBQSxHQUNBLEtBQUEsc0JBQ0EsRUFBQSx1QkFBQSxHQUFBLE9BQUEsTUFDQSxFQUFBLHVCQUFBLEdBQUEsSUFBQSxPQUNBOztBQVVBLGVBTkEsS0FBQSxZQUFBLEVBQUEsdUJBQUEsR0FBQSxPQUNBLFlBQUEsRUFBQSxhQUFBLFFBQ0EsRUFBQSxhQUFBLEVBQUEsdUJBQUEsR0FBQSxPQUNBLE1BQUEsWUFBQSxFQUFBLHVCQUFBLEdBQUEsSUFBQSxPQUNBLFlBQUEsRUFBQSxhQUFBLFNBRUE7U0FJQSxFQUFBLGVBQUEsU0FBQSxHQUFBLEdBQUE7QUFHQSxpQkFEQSxJQUFBLEVBQUEsV0FBQSxJQUNBLElBQUEsR0FBQSxJQUFBLEVBQUEsUUFBQTtBQUNBLGtCQUFBLEVBQUE7aUJBQ0E7aUJBQ0E7aUJBQ0E7aUJBQ0E7QUFDQSxxQkFBQSxFQUFBLEdBQUEsT0FBQTs7QUFLQSxlQUFBLElBQ0EsRUFBQSxhQUFBLEtBRUE7U0FHQSxFQUFBLFVBQUEsU0FBQSxHQUFBO0FBR0EsZUFGQSxFQUFBLFdBQUEsR0FDQSxHQUFBLE1BQUEsS0FDQSxHQUFBLE9BQUE7U0FHQSxFQUFBLGFBQUEsU0FBQSxJQUFBO0FBQ0EsZUFBQSxBQUFBLEdBQUEsTUFBQSxLQUFBLEdBQUEsT0FBQTtTQUdBLEVBQUEsYUFBQSxTQUFBLEdBQUE7QUFDQSxZQUNBLElBREEsRUFBQSxXQUFBLEdBQ0EsR0FBQSxPQUFBLEdBQUEsTUFBQTtBQUNBLGVBQUEsQ0FDQSxNQUFBLEVBQUEsSUFDQSxNQUFBLFNBQUEsRUFBQSxJQUFBLEtBQ0EsVUFBQSxFQUFBLElBQ0EsS0FBQSxFQUFBLE1BQUEsR0FBQSxLQUFBO1NBSUEsRUFBQSxhQUFBLFNBQUEsR0FBQTtBQUNBLFlBQ0EsSUFEQSxFQUFBLFlBQUEsR0FBQSxNQUFBLEdBQ0EsT0FBQSxHQUFBLE1BQUE7QUFDQSxlQUFBLENBQ0EsVUFBQSxFQUFBLElBQ0EsV0FBQSxFQUFBLElBQ0EsZ0JBQUEsU0FBQSxFQUFBLElBQUEsS0FDQSxTQUFBLEVBQUEsSUFDQSxhQUFBLEVBQUEsSUFDQSxTQUFBLEVBQUE7U0FLQSxFQUFBLGFBQUEsU0FBQSxHQUFBO0FBQ0EsWUFBQSxBQUFBLE9BQUEsS0FBQSxZQUFBLEFBQUEsRUFBQSxXQUFBO0FBQ0EsaUJBQUE7QUFHQSxpQkFEQSxJQUFBLEVBQUEsV0FBQSxJQUNBLElBQUEsR0FBQSxJQUFBLEVBQUEsUUFBQTtBQUNBLGNBQUEsRUFBQSxHQUFBLFNBQUEsS0FBQSxBQUFBLEVBQUEsR0FBQSxPQUFBLE9BQUE7QUFDQSxtQkFBQTtBQUlBLGVBQUE7U0FJQSxBQUFBLE9BQUEsV0FBQSxZQUNBLFNBQUEsVUFBQTs7QUMveUJBO0FBRUEsVUFBSSxJQUFXLFNBQVE7QUFFdkIsaUJBQXNCLElBQUE7QUFDYixlQUFBLENBQ0wsWUFBWSxlQUNaLGFBQWEsZ0JBQ2IsZUFBZSxrQkFDZixnQkFBZ0IsbUJBQ2hCLGlCQUFpQixvQkFDakIsR0FBSyxTQUFTLEdBQUs7O0FBR3ZCLGlCQUEyQixJQUFhLElBQU0sSUFBTSxJQUFRLElBQUE7QUFDdEQsWUFBQSxLQUFNLEVBQVMsb0JBQW9CLEdBQVksTUFBTTtBQXVCckQsWUFwQkosTUFBTyxFQUFTLG1CQUNaLEdBQVksWUFBWSx1QkFHNUIsTUFBTyxFQUFTLG9CQUNaLEdBQVksY0FBYyxzQkFDakIsQUFBVCxPQUFTLFVBQVUsWUFBWSxNQUFZLFdBRS9DLE1BQU8sV0FBVyxHQUFZLE1BQU0sUUFFaEMsR0FBWSxhQUFhLEdBQVksY0FDdkMsTUFBTyxtQkFDRSxHQUFZLFlBQ3JCLE1BQU8sbUJBQ0UsR0FBWSxjQUNyQixNQUFPLG1CQUVQLE1BQU8sa0JBR0wsR0FBWSxXQUFXO0FBQ3JCLGNBQUEsS0FBVSxHQUFZLFVBQVUsbUJBQ2hDLEdBQVksVUFBVSxNQUFNO0FBQ2hDLGFBQVksVUFBVSxrQkFBa0I7QUFFcEMsY0FBQSxJQUFPLFVBQVcsTUFBUyxHQUFPLEtBQUssT0FBTyxNQUM5QyxLQUFVO0FBQ2QsZ0JBQU8sT0FBTyxHQUVkLE1BQU8sWUFBWSxHQUFZLHVCQUF1QixHQUFHLE9BQ3JELE1BQU0sR0FHTixHQUFZLHVCQUF1QixHQUFHLE9BQ3hDLE9BQU8sWUFBWSxHQUFZLHVCQUF1QixHQUFHLElBQUksT0FDekQsTUFBTSxHQUNWLE1BQU8sc0JBQ0gsR0FBWSx1QkFBdUIsR0FBRyxPQUFPLE1BQzdDLEdBQVksdUJBQXVCLEdBQUcsSUFBSSxPQUMxQzs7QUFVRCxlQU5QLE1BQU8sWUFBWSxHQUFZLHVCQUF1QixHQUFHLE9BQ3JELFlBQVksRUFBUyxhQUFhLFFBQ2xDLEdBQVksYUFBYSxHQUFZLHVCQUF1QixHQUFHLE9BQ2pFLE9BQU8sWUFBWSxHQUFZLHVCQUF1QixHQUFHLElBQUksT0FDekQsWUFBWSxFQUFTLGFBQWEsU0FFakM7O0FBUVQsaUJBQTBCLElBQVksSUFBQTtBQUNoQyxZQUFBLEtBQUE7QUFFRyxlQURQLE1BQWEsS0FBSyxNQUFNLEtBQUssVUFBVSxNQUNyQixPQUFPLFNBQVMsSUFBQTtBQUM1QixjQUFBLE1BQVcsSUFBTyxRQUFRLEdBQU8sTUFBTTtBQUNyQyxnQkFBQSxLQUFPLEdBQU8sUUFBUSxHQUFPO0FBQzdCLGVBQU8sT0FBQSxDQUFRLEdBQU8sUUFDeEIsUUFBUSxLQUFLO0FBRVgsZ0JBQUEsS0FBMkIsQUFBQSxPQUFULE1BQVM7QUFvQnhCLG1CQW5CSCxNQUNGLE1BQU8sQ0FBQyxNQUVWLEtBQU8sR0FBSyxPQUFPLFNBQVMsSUFBQTtBQU10QixxQkFMcUMsQUFBekIsR0FBSSxRQUFRLGFBQWEsS0FBYixBQUN4QixHQUFJLFFBQVEscUJBRFksTUFDWixBQUNaLEdBQUksUUFBUSxjQURBLE1BQ0EsQ0FDWCxLQUdILE1BQUEsTUFBVSxRQUdvQixBQUF6QixHQUFJLFFBQVEsYUFBYSxLQUFLLE1BQWUsU0FBQSxBQUNoRCxHQUFJLFFBQVEsc0JBRG9DO2dCQUNwQyxPQUdYLEdBQU8sS0FDZCxHQUFPLE9BQU8sS0FBVyxHQUFLLEtBQUssSUFBQSxDQUFBLENBQzFCLEdBQUs7Ozs7QUFNcEIsaUJBQStCLElBQW1CLElBQUE7QUFDNUMsWUFBQSxLQUFxQixDQUN2QixRQUFRLElBQ1Isa0JBQWtCLElBQ2xCLGVBQWUsS0FHYixLQUF5QixTQUFTLElBQUksSUFBQTtBQUN4QyxlQUFLLFNBQVMsSUFBSTtBQUNiLG1CQUFJLEtBQUksR0FBRyxLQUFJLEdBQU8sUUFBUTtBQUM3QixnQkFBQSxHQUFPLElBQUcsZ0JBQWdCLE1BQzFCLEdBQU8sSUFBRyx5QkFBeUI7QUFDOUIscUJBQUEsR0FBTztXQUtoQixLQUF1QixTQUFTLElBQU0sSUFBTSxJQUFTLElBQUE7QUFDbkQsY0FBQSxLQUFTLEdBQXVCLEdBQUssV0FBVyxLQUFLLEtBQ3JELEtBQVMsR0FBdUIsR0FBSyxXQUFXLEtBQUs7QUFDbEQsaUJBQUEsTUFBVSxNQUNiLEdBQU8sS0FBSyxrQkFBa0IsR0FBTyxLQUFLOztBQXFEekMsZUFsRFAsR0FBa0IsT0FBTyxRQUFRLFNBQVMsSUFBQTtBQUNuQyxtQkFBSSxLQUFJLEdBQUcsS0FBSSxHQUFtQixPQUFPLFFBQVEsTUFBSztBQUNyRCxnQkFBQSxLQUFTLEdBQW1CLE9BQU87QUFDbkMsZ0JBQUEsR0FBTyxLQUFLLGtCQUFrQixHQUFPLEtBQUssaUJBQzFDLEdBQU8sY0FBYyxHQUFPLFdBQVc7QUFDckMsa0JBQThCLEFBQTlCLEdBQU8sS0FBSyxrQkFBa0IsU0FDOUIsR0FBTyxjQUFjLEdBQU8sV0FBVyxPQUFBLENBR3BDLEdBQXFCLElBQVEsSUFDOUIsR0FBa0IsUUFBUSxHQUFtQjtBQUMvQztBQUFBLGNBR0osTUFBUyxLQUFLLE1BQU0sS0FBSyxVQUFVLE1BRTVCLGNBQWMsS0FBSyxJQUFJLEdBQU8sYUFDakMsR0FBTyxjQUVYLEdBQW1CLE9BQU8sS0FBSyxLQUcvQixHQUFPLGVBQWUsR0FBTyxhQUFhLE9BQU8sU0FBUyxJQUFBO0FBQ25ELHlCQUFJLEtBQUksR0FBRyxLQUFJLEdBQU8sYUFBYSxRQUFRO0FBQzFDLHNCQUFBLEdBQU8sYUFBYSxJQUFHLFNBQVMsR0FBRyxRQUNuQyxHQUFPLGFBQWEsSUFBRyxjQUFjLEdBQUc7QUFDbkMsMkJBQUE7QUFHSix1QkFBQTs7QUFJVDs7O1lBS04sR0FBa0IsaUJBQWlCLFFBQVEsU0FBUyxJQUFBO0FBQzdDLG1CQUFJLEtBQUksR0FBRyxLQUFJLEdBQW1CLGlCQUFpQixRQUNuRCxNQUFLO0FBQ0osZ0JBQUEsS0FBbUIsR0FBbUIsaUJBQWlCO0FBQ3ZELGdCQUFBLEdBQWlCLFFBQVEsR0FBaUIsS0FBSztBQUNqRCxpQkFBbUIsaUJBQWlCLEtBQUs7QUFDekM7OztZQU1DOztBQUlULGlCQUF5QyxJQUFRLElBQU0sSUFBQTtBQUM5QyxlQUFBLEFBQUEsQ0FDTCxPQUFPLENBQ0wscUJBQXFCLENBQUMsVUFBVSxxQkFDaEMsc0JBQXNCLENBQUMsVUFBVSx1QkFFbkMsUUFBUSxDQUNOLHFCQUFxQixDQUFDLHFCQUFxQix3QkFDM0Msc0JBQXNCLENBQUMsb0JBQW9CLDBCQUU3QyxJQUFNLElBQVEsUUFBUSxRQVRqQjs7QUFZVCxpQkFBMkIsSUFBYyxJQUFBO0FBR25DLFlBQUEsS0FBZSxHQUFhLHNCQUMzQixLQUFLLFNBQVMsSUFBQTtBQUNOLGlCQUFBLEdBQVUsZUFBZSxHQUFnQixjQUM1QyxHQUFVLE9BQU8sR0FBZ0IsTUFDakMsR0FBVSxTQUFTLEdBQWdCLFFBQ25DLEdBQVUsYUFBYSxHQUFnQixZQUN2QyxHQUFVLGFBQWEsR0FBZ0IsWUFDdkMsR0FBVSxTQUFTLEdBQWdCOztBQUt0QyxlQUhGLE1BQ0gsR0FBYSxtQkFBbUIsS0FBQSxDQUUxQjs7QUFJVixpQkFBbUIsSUFBTSxJQUFBO0FBQ25CLFlBQUEsS0FBSSxJQUFJLE1BQU07QUFVWCxlQVRQLEdBQUUsT0FBTyxJQUVULEdBQUUsT0FBTyxDQUNQLG1CQUFtQixHQUNuQixtQkFBbUIsSUFDbkIsb0JBQW9CLElBQ3BCLFdBQUEsUUFDQSxnQkFBQSxRQUNBLEtBQ0s7O0FBR1QsY0FBTyxVQUFVLFNBQVMsR0FBUSxHQUFBO0FBSXZCLG9CQUE2QixJQUFPLElBQUE7QUFDM0MsYUFBTyxTQUFTLEtBQ2hCLEdBQU8sY0FBYyxJQUFJLEVBQU8sc0JBQXNCLFlBQ2xELENBQUMsT0FBTzs7QUFTTCxtQkFBYSxJQUFJLElBQU8sSUFBVSxJQUFBO0FBQ3JDLGNBQUEsS0FBYSxJQUFJLE1BQU07QUFDM0IsYUFBVyxRQUFRLElBQ25CLEdBQVcsV0FBVyxJQUN0QixHQUFXLGNBQWMsQ0FBQyxVQUFVLEtBQ3BDLEdBQVcsVUFBVSxJQUNyQixFQUFPLFdBQVcsV0FBQTtBQUNoQixlQUFHLGVBQWUsU0FBUzs7O0FBSTNCLFlBQUEsSUFBb0IsU0FBUyxJQUFBO0FBQzNCLGNBQUEsS0FBSyxNQUVMLEtBQWUsU0FBUztBQXdCeEIsY0F2QkgsQ0FBQSxvQkFBb0IsdUJBQXVCLGlCQUN2QyxRQUFRLFNBQVMsSUFBQTtBQUNoQixlQUFHLE1BQVUsR0FBYSxJQUFRLEtBQUs7Y0FHeEMsS0FBQSwwQkFBMEIsTUFFMUIsS0FBQSxrQkFBQSxPQUVBLEtBQUEsZUFBZSxJQUNmLEtBQUEsZ0JBQWdCLElBRWhCLEtBQUEsb0JBQW9CLE1BQ3BCLEtBQUEscUJBQXFCLE1BRXJCLEtBQUEsaUJBQWlCLFVBQ2pCLEtBQUEscUJBQXFCLE9BQ3JCLEtBQUEsa0JBQWtCLE9BQ2xCLEtBQUEsb0JBQW9CLE9BRXpCLEtBQVMsS0FBSyxNQUFNLEtBQUssVUFBVSxNQUFVLE1BRXhDLEtBQUEsY0FBc0MsQUFBeEIsR0FBTyxpQkFBaUIsY0FDZCxBQUF6QixHQUFPLGtCQUFrQjtBQUNyQixrQkFBQSxFQUFVLHFCQUNaO0FBS0Usa0JBSkksR0FBTyxpQkFDakIsSUFBTyxnQkFBZ0IsWUFHakIsR0FBTztpQkFDUjtpQkFDQTtBQUNIOztBQUVBLGlCQUFPLHFCQUFxQjs7QUFJeEIsa0JBQUEsR0FBTztpQkFDUjtpQkFDQTtpQkFDQTtBQUNIOztBQUVBLGlCQUFPLGVBQWU7O0FBT3RCLGNBSEosR0FBTyxhQUFhLEVBQWlCLEdBQU8sY0FBYyxJQUFJLElBRXpELEtBQUEsZ0JBQWdCLElBQ2pCLEdBQU87QUFDSixxQkFBSSxLQUFJLEdBQU8sc0JBQXNCLEtBQUksR0FBRztBQUMxQyxtQkFBQSxjQUFjLEtBQUssSUFBSSxFQUFPLGVBQWUsQ0FDaEQsWUFBWSxHQUFPLFlBQ25CLGNBQWMsR0FBTzs7QUFJekIsZUFBTyx1QkFBdUI7QUFHM0IsZUFBQSxVQUFVLElBSVYsS0FBQSxlQUFlLElBRWYsS0FBQSxnQkFBZ0IsRUFBUyxxQkFDekIsS0FBQSxxQkFBcUIsR0FFckIsS0FBQSxZQUFBLFFBRUEsS0FBQSxZQUFBOztBQUdQLGVBQU8sZUFBZSxFQUFrQixXQUFXLG9CQUFvQixDQUNyRSxjQUFBLE1BQ0EsS0FBSyxXQUFBO0FBQ0ksaUJBQUEsS0FBSzthQUdoQixPQUFPLGVBQWUsRUFBa0IsV0FBVyxxQkFBcUIsQ0FDdEUsY0FBQSxNQUNBLEtBQUssV0FBQTtBQUNJLGlCQUFBLEtBQUs7YUFLaEIsRUFBa0IsVUFBVSxpQkFBaUIsTUFDN0MsRUFBa0IsVUFBVSxjQUFjLE1BQzFDLEVBQWtCLFVBQVUsVUFBVSxNQUN0QyxFQUFrQixVQUFVLGlCQUFpQixNQUM3QyxFQUFrQixVQUFVLHlCQUF5QixNQUNyRCxFQUFrQixVQUFVLDZCQUE2QixNQUN6RCxFQUFrQixVQUFVLDBCQUEwQixNQUN0RCxFQUFrQixVQUFVLDRCQUE0QixNQUN4RCxFQUFrQixVQUFVLHNCQUFzQixNQUNsRCxFQUFrQixVQUFVLGdCQUFnQixNQUU1QyxFQUFrQixVQUFVLGlCQUFpQixTQUFTLElBQU0sSUFBQTtBQUN0RCxlQUFLLGFBR0osTUFBQSxjQUFjLEtBQ2MsQUFBQSxPQUF0QixLQUFLLE9BQU8sT0FBVSxjQUMxQixLQUFBLE9BQU8sSUFBTTtXQUl0QixFQUFrQixVQUFVLDRCQUE0QixXQUFBO0FBQ2xELGNBQUEsS0FBUSxJQUFJLE1BQU07QUFDakIsZUFBQSxlQUFlLDJCQUEyQjtXQUdqRCxFQUFrQixVQUFVLG1CQUFtQixXQUFBO0FBQ3RDLGlCQUFBLEtBQUs7V0FHZCxFQUFrQixVQUFVLGtCQUFrQixXQUFBO0FBQ3JDLGlCQUFBLEtBQUs7V0FHZCxFQUFrQixVQUFVLG1CQUFtQixXQUFBO0FBQ3RDLGlCQUFBLEtBQUs7V0FLZCxFQUFrQixVQUFVLHFCQUFxQixTQUFTLElBQU0sSUFBQTtBQUMxRCxjQUFBLEtBQXFCLEtBQUssYUFBYSxTQUFTLEdBQ2hELEtBQWMsQ0FDaEIsT0FBTyxNQUNQLGFBQWEsTUFDYixjQUFjLE1BQ2QsZUFBZSxNQUNmLG1CQUFtQixNQUNuQixvQkFBb0IsTUFDcEIsV0FBVyxNQUNYLGFBQWEsTUFDYixNQUFNLElBQ04sS0FBSyxNQUNMLHdCQUF3QixNQUN4Qix3QkFBd0IsTUFDeEIsUUFBUSxNQUNSLDhCQUE4QixJQUM5QixhQUFBO0FBRUUsY0FBQSxLQUFLLGVBQWU7QUFDdEIsZUFBWSxlQUFlLEtBQUssYUFBYSxHQUFHLGNBQ2hELEdBQVksZ0JBQWdCLEtBQUssYUFBYSxHQUFHO2VBQzVDO0FBQ0QsZ0JBQUEsS0FBYSxLQUFLO0FBQ3RCLGVBQVksZUFBZSxHQUFXLGNBQ3RDLEdBQVksZ0JBQWdCLEdBQVc7O0FBS2xDLGlCQUhGLE1BQ0UsS0FBQSxhQUFhLEtBQUssS0FFbEI7V0FHVCxFQUFrQixVQUFVLFdBQVcsU0FBUyxJQUFPLElBQUE7QUFDakQsY0FBQSxLQUFLO0FBQ0Qsa0JBQUEsRUFBVSxxQkFDWjtBQUdGLGNBUUE7QUFKQSxjQUpnQixLQUFLLGFBQWEsS0FBSyxTQUFTLElBQUE7QUFDM0MsbUJBQUEsR0FBRSxVQUFVOztBQUliLGtCQUFBLEVBQVUsc0JBQXNCO0FBSW5DLG1CQUFJLEtBQUksR0FBRyxLQUFJLEtBQUssYUFBYSxRQUFRO0FBQ3ZDLGlCQUFLLGFBQWEsSUFBRyxTQUN0QixLQUFLLGFBQWEsSUFBRyxTQUFTLEdBQU0sUUFDdEMsTUFBYyxLQUFLLGFBQWE7QUFpQjdCLGlCQWRGLE1BQ0gsTUFBYyxLQUFLLG1CQUFtQixHQUFNLFFBR3pDLEtBQUEsK0JBQUEsQUFFRCxLQUFLLGFBQWEsUUFBUSxRQUZ6QixNQUdFLEtBQUEsYUFBYSxLQUFLLEtBR3pCLEdBQVksUUFBUSxJQUNwQixHQUFZLFNBQVMsSUFDckIsR0FBWSxZQUFZLElBQUksRUFBTyxhQUFhLElBQzVDLEdBQVksZ0JBQ1QsR0FBWTtXQUdyQixFQUFrQixVQUFVLFlBQVksU0FBUyxJQUFBO0FBQzNDLGNBQUEsS0FBSztBQUNMLGNBQUEsS0FBZTtBQUNqQixlQUFPLFlBQVksUUFBUSxTQUFTLElBQUE7QUFDbEMsaUJBQUcsU0FBUyxJQUFPOztlQUVoQjtBQUlELGdCQUFBLEtBQWUsR0FBTztBQUMxQixlQUFPLFlBQVksUUFBUSxTQUFTLElBQU8sSUFBQTtBQUNyQyxrQkFBQSxLQUFjLEdBQWEsWUFBWTtBQUMzQyxpQkFBTSxpQkFBaUIsV0FBVyxTQUFTLElBQUE7QUFDekMsbUJBQVksVUFBVSxHQUFNOztnQkFHaEMsR0FBYSxZQUFZLFFBQVEsU0FBUyxJQUFBO0FBQ3hDLGlCQUFHLFNBQVMsSUFBTzs7O1dBS3pCLEVBQWtCLFVBQVUsY0FBYyxTQUFTLElBQUE7QUFDN0MsY0FBQSxLQUFLO0FBQ0Qsa0JBQUEsRUFBVSxxQkFDWjtBQUdGLGNBQUEsQ0FBRSxlQUFrQixFQUFPO0FBQ3ZCLGtCQUFBLElBQUksVUFBVTtBQUlsQixjQUFBLEtBQWMsS0FBSyxhQUFhLEtBQUssU0FBUyxJQUFBO0FBQ3pDLG1CQUFBLEdBQUUsY0FBYzs7QUFHckIsY0FBQSxDQUFDO0FBQ0csa0JBQUEsRUFBVSxzQkFDWjtBQUVGLGNBQUEsS0FBUyxHQUFZO0FBRXpCLGFBQVksVUFBVSxRQUN0QixHQUFZLFlBQVksTUFDeEIsR0FBWSxRQUFRLE1BQ3BCLEdBQVksU0FBUyxNQUFBLEFBR0YsS0FBSyxhQUFhLElBQUksU0FBUyxJQUFBO0FBQ3pDLG1CQUFBLEdBQUU7YUFFTSxRQUFRLFFBTkosTUFPakIsS0FBSyxhQUFhLFFBQVEsTUFBQSxNQUN2QixLQUFBLGFBQWEsT0FBTyxLQUFLLGFBQWEsUUFBUSxLQUFTLElBR3pELEtBQUE7V0FHUCxFQUFrQixVQUFVLGVBQWUsU0FBUyxJQUFBO0FBQzlDLGNBQUEsS0FBSztBQUNULGFBQU8sWUFBWSxRQUFRLFNBQVMsSUFBQTtBQUM5QixnQkFBQSxLQUFTLEdBQUcsYUFBYSxLQUFLLFNBQVMsSUFBQTtBQUNsQyxxQkFBQSxHQUFFLFVBQVU7O0FBRWpCLGtCQUNGLEdBQUcsWUFBWTs7V0FLckIsRUFBa0IsVUFBVSxhQUFhLFdBQUE7QUFDaEMsaUJBQUEsS0FBSyxhQUFhLE9BQU8sU0FBUyxJQUFBO0FBQ2hDLG1CQUFBLENBQUEsQ0FBRSxHQUFZO2FBRXRCLElBQUksU0FBUyxJQUFBO0FBQ0wsbUJBQUEsR0FBWTs7V0FJdkIsRUFBa0IsVUFBVSxlQUFlLFdBQUE7QUFDbEMsaUJBQUEsS0FBSyxhQUFhLE9BQU8sU0FBUyxJQUFBO0FBQ2hDLG1CQUFBLENBQUEsQ0FBRSxHQUFZO2FBRXRCLElBQUksU0FBUyxJQUFBO0FBQ0wsbUJBQUEsR0FBWTs7V0FLdkIsRUFBa0IsVUFBVSxxQkFBcUIsU0FBUyxJQUN0RCxJQUFBO0FBQ0UsY0FBQSxLQUFLO0FBQ0wsY0FBQSxNQUFlLEtBQWdCO0FBQzFCLG1CQUFBLEtBQUssYUFBYSxHQUFHO0FBQ3ZCLGNBQUksS0FBSyxjQUFjO0FBQ3JCLG1CQUFBLEtBQUssY0FBYztBQUV4QixjQUFBLEtBQWMsSUFBSSxFQUFPLGVBQWUsQ0FDMUMsWUFBWSxLQUFLLFFBQVEsWUFDekIsY0FBYyxLQUFLLFFBQVE7QUFrQnRCLGlCQWhCUCxPQUFPLGVBQWUsSUFBYSxTQUMvQixDQUFDLE9BQU8sT0FBTyxVQUFBLFFBR2QsS0FBQSxhQUFhLElBQWUsMEJBQTBCLElBQ3RELEtBQUEsYUFBYSxJQUFlLG1CQUFtQixTQUFTLElBQUE7QUFDdkQsZ0JBQUEsS0FBQSxDQUFPLEdBQU0sYUFBcUQsQUFBeEMsT0FBTyxLQUFLLEdBQU0sV0FBVyxXQUFXO0FBR3RFLGVBQVksUUFBUSxLQUFNLGNBQWMsYUFDdUIsQUFBM0QsR0FBRyxhQUFhLElBQWUsNEJBQTRCLFFBQzdELEdBQUcsYUFBYSxJQUFlLHdCQUF3QixLQUFLO2FBR2hFLEdBQVksaUJBQWlCLGtCQUMzQixLQUFLLGFBQWEsSUFBZSxtQkFDNUI7V0FJVCxFQUFrQixVQUFVLFVBQVUsU0FBUyxJQUFLLElBQUE7QUFDOUMsY0FBQSxLQUFLLE1BQ0wsS0FBYyxLQUFLLGFBQWEsSUFBZTtBQUMvQyxjQUFBLENBQUEsR0FBWSxrQkFBWjtBQUdBLGdCQUFBLEtBQ0YsS0FBSyxhQUFhLElBQWU7QUFDOUIsaUJBQUEsYUFBYSxJQUFlLDBCQUEwQixNQUMzRCxHQUFZLG9CQUFvQixrQkFDOUIsS0FBSyxhQUFhLElBQWUsbUJBQ25DLEdBQVksbUJBQW1CLFNBQVMsSUFBQTtBQUNsQyxrQkFBQSxDQUFBLElBQUcsZUFBZSxLQUFnQixJQUFsQztBQU1BLG9CQUFBLEtBQVEsSUFBSSxNQUFNO0FBQ3RCLG1CQUFNLFlBQVksQ0FBQyxRQUFRLElBQUssZUFBZTtBQUUzQyxvQkFBQSxLQUFPLEdBQUksV0FFWCxLQUFBLENBQU8sTUFBcUMsQUFBN0IsT0FBTyxLQUFLLElBQU0sV0FBVztBQUM1QyxvQkFBQTtBQUd3QixrQkFBdEIsR0FBWSxVQUFVLFNBQStCLEFBQXRCLEdBQVksVUFBVSxlQUN2RCxJQUFZLFFBQVE7cUJBRWpCO0FBQ3FCLGtCQUF0QixHQUFZLFVBQVUsU0FDeEIsSUFBWSxRQUFRLGNBR3RCLEdBQUssWUFBWSxHQUVqQixHQUFLLFFBQVEsR0FBWSxxQkFBcUI7QUFFMUMsc0JBQUEsS0FBc0IsRUFBUyxlQUFlO0FBQ2xELHFCQUFNLFlBQVksT0FBTyxPQUFPLEdBQU0sV0FDbEMsRUFBUyxlQUFlLE1BRTVCLEdBQU0sVUFBVSxZQUFZLElBQzVCLEdBQU0sVUFBVSxTQUFTLFdBQUE7QUFDaEIsMkJBQUEsQ0FDTCxXQUFXLEdBQU0sVUFBVSxXQUMzQixRQUFRLEdBQU0sVUFBVSxRQUN4QixlQUFlLEdBQU0sVUFBVSxlQUMvQixrQkFBa0IsR0FBTSxVQUFVOzs7QUFNcEMsb0JBQUEsS0FBVyxFQUFTLGlCQUFpQixHQUFHLGtCQUFrQjtBQUs1RCxtQkFBUyxHQUFNLFVBQVUsa0JBSnRCLEtBS0MsNEJBSEEsT0FBTyxHQUFNLFVBQVUsWUFBWSxRQUt6QyxHQUFHLGtCQUFrQixNQUNqQixFQUFTLGVBQWUsR0FBRyxrQkFBa0IsT0FDN0MsR0FBUyxLQUFLO0FBQ2Qsb0JBQUEsS0FBVyxHQUFHLGFBQWEsTUFBTSxTQUFTLElBQUE7QUFDckMseUJBQUEsR0FBWSxlQUNtQixBQUFsQyxHQUFZLFlBQVksVUFBVTs7QUFHWCxnQkFBekIsR0FBRyxzQkFBc0IsZUFDM0IsSUFBRyxvQkFBb0IsYUFDdkIsR0FBRyw4QkFLQSxNQUNILEdBQUcsZUFBZSxnQkFBZ0IsS0FFaEMsTUFDRixJQUFHLGVBQWUsZ0JBQWdCLElBQUksTUFBTSxrQkFDNUMsR0FBRyxvQkFBb0IsWUFDdkIsR0FBRzs7ZUFLUCxFQUFPLFdBQVcsV0FBQTtBQUNoQixpQkFBd0IsUUFBUSxTQUFTLElBQUE7QUFDdkMsbUJBQVksaUJBQWlCOztlQUU5Qjs7V0FJTCxFQUFrQixVQUFVLDhCQUE4QixXQUFBO0FBQ3BELGNBQUEsS0FBSyxNQUNMLEtBQWUsSUFBSSxFQUFPLGdCQUFnQjtBQUM5QyxhQUFhLG1CQUFtQixXQUFBO0FBQzlCLGVBQUcsNkJBQ0gsR0FBRzs7QUFHRCxjQUFBLEtBQWdCLElBQUksRUFBTyxpQkFBaUI7QUFXekMsaUJBVlAsR0FBYyxvQkFBb0IsV0FBQTtBQUNoQyxlQUFHO2FBRUwsR0FBYyxVQUFVLFdBQUE7QUFFdEIsbUJBQU8sZUFBZSxJQUFlLFNBQ2pDLENBQUMsT0FBTyxVQUFVLFVBQUEsUUFDdEIsR0FBRzthQUdFLENBQ0wsY0FBYyxJQUNkLGVBQWU7V0FNbkIsRUFBa0IsVUFBVSwrQkFBK0IsU0FDdkQsSUFBQTtBQUNFLGNBQUEsS0FBYyxLQUFLLGFBQWEsSUFBZTtBQUMvQyxnQkFBQSxRQUNLLEdBQVksa0JBQUEsT0FDWixLQUFLLGFBQWEsSUFBZTtBQUV0QyxjQUFBLEtBQWUsS0FBSyxhQUFhLElBQWU7QUFDaEQsZ0JBQUEsUUFDSyxHQUFhLGtCQUFBLE9BQ2IsS0FBSyxhQUFhLElBQWU7QUFFdEMsY0FBQSxLQUFnQixLQUFLLGFBQWEsSUFBZTtBQUNqRCxnQkFBQSxRQUNLLEdBQWMsbUJBQUEsT0FDZCxHQUFjLFNBQUEsT0FDZCxLQUFLLGFBQWEsSUFBZTtXQUs1QyxFQUFrQixVQUFVLGNBQWMsU0FBUyxJQUMvQyxJQUFNLElBQUE7QUFDSixjQUFBLEtBQVMsRUFBc0IsR0FBWSxtQkFDM0MsR0FBWTtBQUNaLGdCQUFRLEdBQVksYUFDdEIsSUFBTyxZQUFZLEdBQVksd0JBQy9CLEdBQU8sT0FBTyxDQUNaLE9BQU8sRUFBUyxZQUNoQixVQUFVLEdBQVksZUFBZSxXQUVuQyxHQUFZLHVCQUF1QixVQUNyQyxJQUFPLEtBQUssT0FBTyxHQUFZLHVCQUF1QixHQUFHLE9BRTNELEdBQVksVUFBVSxLQUFLLE1BRXpCLE1BQVEsR0FBWSxlQUFlLEdBQU8sT0FBTyxTQUFTLEtBRW5DLENBQXJCLEdBQVksU0FBUyxXQUNsQixHQUFZLDBCQUNaLElBQWMsU0FDbkIsR0FBWSx1QkFBdUIsUUFBUSxTQUFTLElBQUE7QUFBQSxtQkFDM0MsR0FBRTtjQUdULEdBQVksdUJBQXVCLFNBQ3JDLEdBQU8sWUFBWSxHQUFZLHlCQUUvQixHQUFPLFlBQVksQ0FBQyxLQUV0QixHQUFPLE9BQU8sQ0FDWixVQUFVLEdBQVksZUFBZSxXQUVuQyxHQUFZLGVBQWUsU0FDN0IsSUFBTyxLQUFLLFFBQVEsR0FBWSxlQUFlLFFBRTdDLEdBQVksdUJBQXVCLFVBQ3JDLElBQU8sS0FBSyxPQUFPLEdBQVksdUJBQXVCLEdBQUcsT0FFM0QsR0FBWSxZQUFZLFFBQVE7V0FJcEMsRUFBa0IsVUFBVSxzQkFBc0IsU0FBUyxJQUFBO0FBQ3JELGNBZUEsSUFDQSxJQWhCQSxLQUFLO0FBR0wsY0FBQSxBQUFBLENBQUMsU0FBUyxVQUFVLFFBQVEsR0FBWSxVQUF4QztBQUNLLG1CQUFBLFFBQVEsT0FBTyxFQUFVLGFBQzVCLHVCQUF1QixHQUFZLE9BQU87QUFHNUMsY0FBQSxDQUFDLEVBQWdDLHVCQUNqQyxHQUFZLE1BQU0sR0FBRyxtQkFBbUIsR0FBRztBQUN0QyxtQkFBQSxRQUFRLE9BQU8sRUFBVSxxQkFDNUIsdUJBQXVCLEdBQVksT0FDbkMsZUFBZSxHQUFHO0FBS3BCLGNBQXFCLEFBQXJCLEdBQVksU0FBUztBQUd2QixpQkFBVyxFQUFTLGNBQWMsR0FBWSxNQUM5QyxLQUFjLEdBQVMsU0FDdkIsR0FBUyxRQUFRLFNBQVMsSUFBYyxJQUFBO0FBQ2xDLGtCQUFBLEtBQU8sRUFBUyxtQkFBbUI7QUFDdkMsaUJBQUcsYUFBYSxJQUFlLG9CQUFvQjtnQkFHckQsR0FBRyxhQUFhLFFBQVEsU0FBUyxJQUFhLElBQUE7QUFDNUMsaUJBQUcsUUFBUSxHQUFZLEtBQUs7O21CQUVBLEFBQXJCLEdBQVksU0FBUyxVQUFVO0FBQ3hDLGlCQUFXLEVBQVMsY0FBYyxHQUFHLG1CQUFtQixNQUN4RCxLQUFjLEdBQVM7QUFDbkIsZ0JBQUEsS0FBWSxFQUFTLFlBQVksSUFDakMsY0FBYyxTQUFTO0FBQzNCLGVBQVMsUUFBUSxTQUFTLElBQWMsSUFBQTtBQUNsQyxrQkFBQSxLQUFjLEdBQUcsYUFBYSxLQUM5QixLQUFjLEdBQVksYUFDMUIsS0FBZSxHQUFZLGNBQzNCLEtBQWdCLEdBQVksZUFDNUIsS0FBb0IsR0FBWSxtQkFDaEMsS0FBcUIsR0FBWTtBQU1qQyxrQkFBQSxDQUhXLEdBQVMsV0FBVyxPQUNnQyxBQUEvRCxFQUFTLFlBQVksSUFBYyxpQkFBaUIsV0FBVyxNQUFYLENBRXRDLEdBQVksVUFBVTtBQUNsQyxvQkFBQSxLQUFzQixFQUFTLGlCQUMvQixJQUFjLEtBQ2QsSUFBdUIsRUFBUyxrQkFDaEMsSUFBYztBQUNkLHNCQUNGLEdBQXFCLE9BQU8sV0FHekIsR0FBRyxlQUFpQyxBQUFsQixPQUFrQixLQUN2QyxJQUFHLFFBQVEsR0FBWSxLQUFLLEtBQ0QsQUFBdkIsR0FBYSxVQUFVLFNBQ3pCLEdBQWEsTUFBTSxJQUFhLElBQzVCLEtBQVksZ0JBQWdCLGVBRU4sQUFBeEIsR0FBYyxVQUFVLFNBQzFCLEdBQWMsTUFBTTtBQUtwQixvQkFBQSxJQUFTLEVBQXNCLElBQy9CO0FBSUosbUJBQUcsWUFBWSxJQUNYLEVBQU8sT0FBTyxTQUFTLEdBQUE7Ozs7QUFnQjFCLGlCQVZQLEdBQUcsb0JBQW9CLENBQ3JCLE1BQU0sR0FBWSxNQUNsQixLQUFLLEdBQVksTUFFTSxBQUFyQixHQUFZLFNBQVMsVUFDdkIsR0FBRyxzQkFBc0Isc0JBRXpCLEdBQUcsc0JBQXNCLFdBR3BCLFFBQVE7V0FHakIsRUFBa0IsVUFBVSx1QkFBdUIsU0FBUyxJQUFBO0FBQ3RELGNBQUEsS0FBSztBQUdMLGNBQUEsQUFBQSxDQUFDLFNBQVMsVUFBVSxRQUFRLEdBQVksVUFBeEM7QUFDSyxtQkFBQSxRQUFRLE9BQU8sRUFBVSxhQUM1Qix1QkFBdUIsR0FBWSxPQUFPO0FBRzVDLGNBQUEsQ0FBQyxFQUFnQyx3QkFDakMsR0FBWSxNQUFNLEdBQUcsbUJBQW1CLEdBQUc7QUFDdEMsbUJBQUEsUUFBUSxPQUFPLEVBQVUscUJBQzVCLHdCQUF3QixHQUFZLE9BQ3BDLGVBQWUsR0FBRztBQUdwQixjQUFBLEtBQVU7QUFDZCxhQUFHLGNBQWMsUUFBUSxTQUFTLElBQUE7QUFDaEMsZUFBUSxHQUFPLE1BQU07O0FBRW5CLGNBQUEsS0FBZSxJQUNmLEtBQVcsRUFBUyxjQUFjLEdBQVksTUFDOUMsSUFBYyxHQUFTLFNBQ3ZCLElBQVksRUFBUyxZQUFZLEdBQ2pDLGNBQWMsU0FBUyxHQUN2QixJQUFjLEVBQVMsWUFBWSxHQUNuQyxtQkFBbUIsU0FBUztBQUNoQyxhQUFHLGNBQWM7QUFDYixjQUFBLElBQWEsRUFBUyxZQUFZLEdBQ2xDLGtCQUFrQjtBQTRVZixpQkExVUwsR0FBRywwQkFBQSxDQUFBLENBREQsS0FDMkIsRUFBVyxPQUFPLElBQUksTUFBTSxLQUNwRCxRQUFRLGNBQWMsR0FLN0IsR0FBUyxRQUFRLFNBQVMsSUFBYyxJQUFBO0FBQ2xDLGdCQUFBLEtBQVEsRUFBUyxXQUFXLEtBQzVCLEtBQU8sRUFBUyxRQUFRLEtBRXhCLEtBQVcsRUFBUyxXQUFXLE9BQ2dDLEFBQS9ELEVBQVMsWUFBWSxJQUFjLGlCQUFpQixXQUFXLEdBQy9ELElBQVcsR0FBTSxHQUFHLE9BQU8sR0FBRyxNQUFNLEtBQUssSUFFekMsSUFBWSxFQUFTLGFBQWEsSUFBYyxJQUNoRCxJQUFhLEVBQVMsVUFBVSxLQUVoQyxJQUFNLEVBQVMsT0FBTyxPQUFpQixFQUFTO0FBR2hELGdCQUFBLE1BQXNCLEFBQVQsT0FBUyxpQkFBK0IsQ0FBYixNQUFhLGVBQ3hDLEFBQWIsTUFBYTtBQUdmLGlCQUFHLGFBQWEsTUFBaUIsQ0FDL0IsS0FBSyxHQUNMLE1BQU0sSUFDTixVQUFVLEdBQ1YsVUFBQTtpQkFSQTtBQW1CQSxrQkFBQSxHQUNBLEdBQ0EsR0FDQSxHQUNBLEdBQ0EsR0FDQSxHQUNBLEdBRUE7QUFBQSxlQWZDLE1BQVksR0FBRyxhQUFhLE9BQzdCLEdBQUcsYUFBYSxJQUFlLFlBRWpDLElBQUcsYUFBYSxNQUFpQixHQUFHLG1CQUFtQixJQUFBO0FBY3JELGtCQUNBLEdBQ0EsR0FGQSxJQUFxQixFQUFTLG1CQUFtQjtBQUdoRCxvQkFDSCxLQUFzQixFQUFTLGlCQUFpQixJQUM1QyxJQUNKLEtBQXVCLEVBQVMsa0JBQWtCLElBQzlDLElBQ2lCLE9BQU8sV0FFOUIsSUFDSSxFQUFTLDJCQUEyQjtBQUVwQyxrQkFBQSxJQUFpQixFQUFTLG9CQUFvQixLQUU5QyxJQUFhLEVBQVMsWUFBWSxJQUNsQyx1QkFBdUIsR0FBYSxTQUFTLEdBQzdDLElBQVEsRUFBUyxZQUFZLElBQWMsZ0JBQzFDLElBQUksU0FBUyxJQUFBO0FBQ0wsdUJBQUEsRUFBUyxlQUFlO2lCQUVoQyxPQUFPLFNBQVMsSUFBQTtBQUNSLHVCQUFtQixBQUFuQixHQUFLLGNBQWM7O0FBdUI1QixrQkFuQnNCLENBQXJCLEdBQVksU0FBUyxXQUFnQyxBQUFyQixHQUFZLFNBQVMsYUFBVCxDQUM1QyxNQUFZLEtBQWUsS0FBZ0IsS0FDNUMsR0FBRyxhQUFhLE9BQ2xCLElBQUcsNkJBQTZCLEtBQ2hDLEdBQUcsYUFBYSxJQUFlLGNBQzNCLEdBQUcsYUFBYSxHQUFHLGFBQ3ZCLEdBQUcsYUFBYSxJQUFlLGVBQzNCLEdBQUcsYUFBYSxHQUFHLGNBQ3ZCLEdBQUcsYUFBYSxJQUFlLGdCQUMzQixHQUFHLGFBQWEsR0FBRyxlQUNuQixHQUFHLGFBQWEsSUFBZSxhQUNqQyxHQUFHLGFBQWEsSUFBZSxVQUFVLGFBQ3JDLEdBQUcsYUFBYSxHQUFHLGdCQUVyQixHQUFHLGFBQWEsSUFBZSxlQUNqQyxHQUFHLGFBQWEsSUFBZSxZQUFZLGFBQ3ZDLEdBQUcsYUFBYSxHQUFHLGlCQUdGLEFBQXJCLEdBQVksU0FBUyxXQUFZLElBQUE7QUFtRzlCLG9CQUF5QixBQUFyQixHQUFZLFNBQVMsWUFBVCxDQUFzQixJQUFVO0FBRXJELHNCQURBLEtBQWMsR0FBRyxhQUFhLEtBQ0osYUFDMUIsSUFBZSxFQUFZLGNBQzNCLElBQWdCLEVBQVksZUFDNUIsSUFBYyxFQUFZLGFBQzFCLElBQXlCLEVBQVksd0JBQ3JDLElBQW9CLEVBQVksbUJBRWhDLEdBQUcsYUFBYSxJQUFlLHlCQUMzQixHQUNKLEdBQUcsYUFBYSxJQUFlLHFCQUMzQixHQUNKLEdBQUcsYUFBYSxJQUFlLGlCQUFpQixHQUU1QyxFQUFNLFVBQWlDLEFBQXZCLEVBQWEsVUFBVSxTQUFWLEVBQzFCLEtBQUEsQ0FBYSxLQUNaLEtBQWlDLEFBQWxCLE9BQWtCLElBR3JDLEVBQU0sUUFBUSxTQUFTLElBQUE7QUFDckIsc0JBQWtCLEVBQVksY0FBYzt1QkFIOUMsRUFBYSxvQkFBb0IsS0FRaEMsS0FBaUMsQUFBbEIsT0FBa0IsS0FDVCxDQUF2QixFQUFhLFVBQVUsU0FDekIsRUFBYSxNQUFNLEdBQWEsR0FDNUIsZ0JBRXNCLEFBQXhCLEVBQWMsVUFBVSxTQUMxQixFQUFjLE1BQU0sS0FBQSxDQU1DLEVBQ3ZCLEVBQVksbUJBQ1osRUFBWSxvQkFFa0IsT0FBTyxPQUFPLFNBQVMsSUFBQTtBQUM5QywyQkFBeUIsQUFBekIsR0FBRSxLQUFLLGtCQUFrQjtxQkFDL0IsVUFDWSxFQUFZLHVCQUF1QixHQUFHLE9BQUEsT0FDNUMsRUFBWSx1QkFBdUIsR0FBRyxLQUcvQyxHQUFHLFlBQVksR0FDRyxBQUFkLE1BQWMsY0FBNEIsQUFBZCxNQUFjLFlBQzVCLEFBQWQsTUFBYyxjQUE0QixBQUFkLE1BQWMsYUFBZCxDQUc1QixLQUNlLEFBQWQsTUFBYyxjQUE0QixBQUFkLE1BQWMsYUFBZCxPQWlCeEIsRUFBWSxjQWhCbkIsS0FBUSxFQUFZLE9BQ2hCLElBQ0csSUFBUSxFQUFXLFdBQ3RCLElBQVEsRUFBVyxVQUFVLElBQUksRUFBTyxnQkFFMUMsR0FBNkIsR0FBTyxHQUFRLEVBQVcsVUFDdkQsR0FBYSxLQUFLLENBQUMsR0FBTyxHQUFhLEdBQVEsRUFBVyxhQUVyRCxJQUFRLFdBQ1gsSUFBUSxVQUFVLElBQUksRUFBTyxnQkFFL0IsR0FBNkIsR0FBTyxHQUFRLFVBQzVDLEdBQWEsS0FBSyxDQUFDLEdBQU8sR0FBYSxHQUFROztxQkF2S047QUFBQSxnQkFDN0MsS0FBYyxHQUFHLGFBQWEsT0FDMUIsR0FBRyxtQkFBbUIsS0FDZCxNQUFNLEdBRWIsRUFBWSxlQUNmLEdBQVksY0FBYyxHQUFHLG1CQUFtQixJQUM1QyxLQUdGLEVBQU0sVUFBNkMsQUFBbkMsRUFBWSxhQUFhLFVBQVUsU0FBVixFQUN2QyxLQUFnQixLQUFpQyxBQUFsQixPQUFrQixJQUduRCxFQUFNLFFBQVEsU0FBUyxJQUFBO0FBQ3JCLG9CQUFrQixFQUFZLGNBQWM7cUJBSDlDLEVBQVksYUFBYSxvQkFBb0IsS0FRakQsSUFBb0IsRUFBTyxlQUFlLGdCQUFnQixLQUl0RCxJQUFjLFNBQ2hCLEdBQWtCLFNBQVMsRUFBa0IsT0FBTyxPQUNoRCxTQUFTLElBQUE7QUFDQSx5QkFBZSxBQUFmLEdBQU0sU0FBUztxQkFJOUIsSUFBeUIsRUFBWSwwQkFBMEIsQ0FBQyxDQUM5RCxNQUFnQyxPQUF6QixLQUFJLEtBQWdCO0FBSXpCLG9CQU9JLEdBUEosSUFBQTtBQUNBLG9CQUFjLEFBQWQsTUFBYyxjQUE0QixBQUFkLE1BQWMsWUFBZDtBQUsxQixzQkFKSixJQUFBLENBQWMsRUFBWSxhQUMxQixJQUFjLEVBQVksZUFDdEIsSUFBSSxFQUFPLGVBQWUsRUFBWSxlQUFlLEtBRXJEO0FBRUYsd0JBQVEsRUFBWSxPQUVoQixLQUFvQyxBQUF0QixFQUFXLFdBQVcsT0FFN0IsS0FDSixJQUFRLEVBQVcsV0FDdEIsSUFBUSxFQUFXLFVBQVUsSUFBSSxFQUFPLGVBQ3hDLE9BQU8sZUFBZSxHQUFRLEVBQVcsU0FBUyxNQUFNLENBQ3RELEtBQUssV0FBQTtBQUNJLDZCQUFBLEVBQVc7MEJBSXhCLE9BQU8sZUFBZSxHQUFPLE1BQU0sQ0FDakMsS0FBSyxXQUFBO0FBQ0ksNkJBQUEsRUFBVzt5QkFHdEIsSUFBUyxHQUFRLEVBQVcsV0FFdkIsSUFBUSxXQUNYLElBQVEsVUFBVSxJQUFJLEVBQU8sZ0JBRS9CLElBQVMsR0FBUSxXQUVmLEtBQ0YsSUFBNkIsR0FBTyxJQUNwQyxFQUFZLDZCQUE2QixLQUFLLEtBRWhELEdBQWEsS0FBSyxDQUFDLEdBQU8sR0FBYTs7QUFFaEMsb0JBQVksZUFBZSxFQUFZLFlBQVksU0FDNUQsR0FBWSw2QkFBNkIsUUFBUSxTQUFTLElBQUE7QUFDcEQsd0JBL3pCNkIsSUFBTyxJQSt6QnBDLEtBQWMsR0FBRSxZQUFZLEtBQUssU0FBUyxJQUFBO0FBQ3JDLDZCQUFBLEdBQUUsT0FBTyxFQUFZLFlBQVksTUFBTTs7QUFFNUMsMEJBbDBCNkIsTUFtMEJHLElBbjBCSSxNQW0wQlMsSUFsMEJsRCxZQUFZLEtBQ25CLEdBQU8sY0FBYyxJQUFJLEVBQU8sc0JBQXNCLGVBQ2xELENBQUMsT0FBTztzQkFtMEJOLEVBQVksK0JBQStCO0FBRzdDLGtCQUFZLG9CQUFvQixHQUNoQyxFQUFZLHFCQUFxQixHQUNqQyxFQUFZLGNBQWMsR0FDMUIsRUFBWSxpQkFBaUIsR0FDN0IsRUFBWSx5QkFBeUIsR0FDckMsRUFBWSx5QkFBeUIsR0FJckMsR0FBRyxZQUFZLEdBQUcsYUFBYSxLQUFBLE9BRTNCOzs7Y0FBQSxBQThFSixHQUFHLGNBOUVDLFVBK0VOLElBQUcsWUFBaUMsQUFBckIsR0FBWSxTQUFTLFVBQVUsV0FBVyxZQUczRCxHQUFHLHFCQUFxQixDQUN0QixNQUFNLEdBQVksTUFDbEIsS0FBSyxHQUFZLE1BRU0sQUFBckIsR0FBWSxTQUFTLFVBQ3ZCLEdBQUcsc0JBQXNCLHVCQUV6QixHQUFHLHNCQUFzQixXQUUzQixPQUFPLEtBQUssSUFBUyxRQUFRLFNBQVMsSUFBQTtBQUNoQyxnQkFBQSxLQUFTLEdBQVE7QUFDakIsZ0JBQUEsR0FBTyxZQUFZLFFBQVE7QUFDekIsa0JBQUEsQUFBQSxHQUFHLGNBQWMsUUFBUSxRQUF6QixJQUF5QztBQUMzQyxtQkFBRyxjQUFjLEtBQUs7QUFDbEIsb0JBQUEsS0FBUSxJQUFJLE1BQU07QUFDdEIsbUJBQU0sU0FBUyxJQUNmLEVBQU8sV0FBVyxXQUFBO0FBQ2hCLHFCQUFHLGVBQWUsYUFBYTs7O0FBSW5DLGlCQUFhLFFBQVEsU0FBUyxJQUFBO0FBQ3hCLG9CQUFBLEtBQVEsR0FBSyxJQUNiLEtBQVcsR0FBSztBQUNoQixtQkFBTyxPQUFPLEdBQUssR0FBRyxNQUcxQixFQUFhLElBQUksSUFBTyxJQUFVLENBQUM7OztjQUl6QyxHQUFhLFFBQVEsU0FBUyxJQUFBO0FBQ3hCLGVBQUssTUFHVCxFQUFhLElBQUksR0FBSyxJQUFJLEdBQUssSUFBSTtjQUtyQyxFQUFPLFdBQVcsV0FBQTtBQUNWLGtCQUFNLEdBQUcsZ0JBR2YsR0FBRyxhQUFhLFFBQVEsU0FBUyxJQUFBO0FBQzNCLGlCQUFZLGdCQUN1QixBQUFuQyxHQUFZLGFBQWEsVUFBVSxTQUNuQyxHQUFZLGFBQWEsc0JBQXNCLFNBQVMsS0FDMUQsU0FBUSxLQUFLLHVGQUViLEdBQVksYUFBYSxtQkFBbUI7O2FBRy9DLE1BRUksUUFBUTtXQUdqQixFQUFrQixVQUFVLFFBQVEsV0FBQTtBQUM3QixlQUFBLGFBQWEsUUFBUSxTQUFTLElBQUE7QUFNN0IsZUFBWSxnQkFDZCxHQUFZLGFBQWEsUUFFdkIsR0FBWSxpQkFDZCxHQUFZLGNBQWMsUUFFeEIsR0FBWSxhQUNkLEdBQVksVUFBVSxRQUVwQixHQUFZLGVBQ2QsR0FBWSxZQUFZO2NBSXZCLEtBQUEsWUFBQSxNQUNBLEtBQUEsc0JBQXNCO1dBSTdCLEVBQWtCLFVBQVUsd0JBQXdCLFNBQVMsSUFBQTtBQUN0RCxlQUFBLGlCQUFpQjtBQUNsQixjQUFBLEtBQVEsSUFBSSxNQUFNO0FBQ2pCLGVBQUEsZUFBZSx3QkFBd0I7V0FJOUMsRUFBa0IsVUFBVSw4QkFBOEIsV0FBQTtBQUNwRCxjQUFBLEtBQUs7QUFDbUIsVUFBeEIsS0FBSyxtQkFBbUIsWUFBbkIsQUFBK0IsS0FBSyxvQkFBcEMsUUFHSixNQUFBLGtCQUFBLE1BQ0wsRUFBTyxXQUFXLFdBQUE7QUFDWixnQkFBQSxHQUFHLGlCQUFpQjtBQUN0QixpQkFBRyxrQkFBQTtBQUNDLGtCQUFBLEtBQVEsSUFBSSxNQUFNO0FBQ3RCLGlCQUFHLGVBQWUscUJBQXFCOzthQUV4QztXQUlMLEVBQWtCLFVBQVUsNEJBQTRCLFdBQUE7QUFDbEQsY0FBQSxJQUNBLEtBQVMsQ0FDSixLQUFBLEdBQ1AsUUFBUSxHQUNSLFVBQVUsR0FDVixXQUFXLEdBQ1gsV0FBVyxHQUNYLGNBQWMsR0FDZCxRQUFRO0FBdUJOLGNBckJDLEtBQUEsYUFBYSxRQUFRLFNBQVMsSUFBQTtBQUM3QixlQUFZLGdCQUFBLENBQWlCLEdBQVksWUFDM0MsR0FBTyxHQUFZLGFBQWE7Y0FJcEMsS0FBVyxPQUNQLEdBQU8sU0FBUyxJQUNsQixLQUFXLFdBQ0YsR0FBTyxXQUFXLElBQzNCLEtBQVcsYUFDRixHQUFPLGVBQWUsSUFDL0IsS0FBVyxpQkFDRixHQUFPLE1BQU0sSUFDdEIsS0FBVyxRQUNGLEdBQU8sWUFBWSxJQUM1QixLQUFXLGNBQ0YsR0FBTyxZQUFZLEtBQzVCLE1BQVcsY0FHVCxPQUFhLEtBQUssb0JBQW9CO0FBQ25DLGlCQUFBLHFCQUFxQjtBQUN0QixnQkFBQSxLQUFRLElBQUksTUFBTTtBQUNqQixpQkFBQSxlQUFlLDRCQUE0Qjs7V0FLcEQsRUFBa0IsVUFBVSx5QkFBeUIsV0FBQTtBQUMvQyxjQUFBLElBQ0EsS0FBUyxDQUNKLEtBQUEsR0FDUCxRQUFRLEdBQ1IsWUFBWSxHQUNaLFdBQVcsR0FDWCxXQUFXLEdBQ1gsY0FBYyxHQUNkLFFBQVE7QUF5Qk4sY0F2QkMsS0FBQSxhQUFhLFFBQVEsU0FBUyxJQUFBO0FBQzdCLGVBQVksZ0JBQWdCLEdBQVksaUJBQUEsQ0FDdkMsR0FBWSxZQUNmLElBQU8sR0FBWSxhQUFhLFVBQ2hDLEdBQU8sR0FBWSxjQUFjO2NBSXJDLEdBQU8sYUFBYSxHQUFPLFdBRTNCLEtBQVcsT0FDUCxHQUFPLFNBQVMsSUFDbEIsS0FBVyxXQUNGLEdBQU8sYUFBYSxJQUM3QixLQUFXLGVBQ0YsR0FBTyxlQUFlLElBQy9CLEtBQVcsaUJBQ0YsR0FBTyxNQUFNLElBQ3RCLEtBQVcsUUFDRixHQUFPLFlBQVksS0FDNUIsTUFBVyxjQUdULE9BQWEsS0FBSyxpQkFBaUI7QUFDaEMsaUJBQUEsa0JBQWtCO0FBQ25CLGdCQUFBLEtBQVEsSUFBSSxNQUFNO0FBQ2pCLGlCQUFBLGVBQWUseUJBQXlCOztXQUlqRCxFQUFrQixVQUFVLGNBQWMsV0FBQTtBQUNwQyxjQUFBLEtBQUs7QUFFTCxjQUFBLEdBQUc7QUFDRSxtQkFBQSxRQUFRLE9BQU8sRUFBVSxxQkFDNUI7QUFHRixjQUFBLEtBQWlCLEdBQUcsYUFBYSxPQUFPLFNBQVMsSUFBQTtBQUM1QyxtQkFBVyxBQUFYLEdBQUUsU0FBUzthQUNqQixRQUNDLEtBQWlCLEdBQUcsYUFBYSxPQUFPLFNBQVMsSUFBQTtBQUM1QyxtQkFBVyxBQUFYLEdBQUUsU0FBUzthQUNqQixRQUdDLEtBQWUsVUFBVTtBQUN6QixjQUFBLElBQWM7QUFFWixnQkFBQSxHQUFhLGFBQWEsR0FBYTtBQUNuQyxvQkFBQSxJQUFJLFVBQ047QUFBQSxZQUVGLEdBQWEsd0JBRlgsVUFJRixNQUFBLEFBREUsR0FBYSx3QkFDZixPQUFpQixJQUFBLEFBQ1IsR0FBYSx3QkFETCxRQUVBLElBRUEsR0FBYSxzQkFBQSxBQUc5QixHQUFhLHdCQUhpQixVQUs5QixNQUFBLEFBREUsR0FBYSx3QkFDZixPQUFpQixJQUFBLEFBQ1IsR0FBYSx3QkFETCxRQUVBLElBRUEsR0FBYTs7QUFvQjdCLGVBZlAsR0FBRyxhQUFhLFFBQVEsU0FBUyxJQUFBO0FBQ04sWUFBckIsR0FBWSxTQUFTLFVBQVQsRUFDZCxLQUNxQixLQUNuQixJQUFZLGNBQUEsU0FFZ0IsQUFBckIsR0FBWSxTQUFTLFdBQVQsRUFDckIsS0FDcUIsS0FDbkIsSUFBWSxjQUFBO2NBTVgsS0FBaUIsS0FBSyxLQUFpQjtBQUN4QyxpQkFBaUIsS0FDbkIsSUFBRyxtQkFBbUIsVUFDdEIsT0FFRSxLQUFpQixLQUNuQixJQUFHLG1CQUFtQixVQUN0QjtBQUlBLGNBQUEsS0FBTSxFQUFTLHdCQUF3QixHQUFHLGVBQzFDLEdBQUc7QUFDUCxhQUFHLGFBQWEsUUFBUSxTQUFTLElBQWEsSUFBQTtBQUd4QyxnQkFBQSxLQUFRLEdBQVksT0FDcEIsS0FBTyxHQUFZLE1BQ25CLEtBQU0sR0FBWSxPQUFPLEVBQVM7QUFDdEMsZUFBWSxNQUFNLElBRWIsR0FBWSxlQUNmLElBQVksY0FBYyxHQUFHLG1CQUFtQixJQUM1QyxHQUFHO0FBR0wsZ0JBQUEsS0FBb0IsRUFBTyxhQUFhLGdCQUFnQjtBQUd4RCxnQkFBYyxTQUNoQixJQUFrQixTQUFTLEdBQWtCLE9BQU8sT0FDaEQsU0FBUyxJQUFBO0FBQ0EscUJBQWUsQUFBZixHQUFNLFNBQVM7aUJBRzlCLEdBQWtCLE9BQU8sUUFBUSxTQUFTLElBQUE7QUFHckIsY0FBZixHQUFNLFNBQVMsVUFBVCxBQUNOLEdBQU0sV0FBVywrQkFEWCxVQUVSLElBQU0sV0FBVyw2QkFBNkIsTUFLNUMsR0FBWSxzQkFDWixHQUFZLG1CQUFtQixVQUNqQyxHQUFZLG1CQUFtQixPQUFPLFFBQVEsU0FBUyxJQUFBO0FBQ2pELG1CQUFNLEtBQUssa0JBQWtCLEdBQVksS0FBSyxpQkFDOUMsR0FBTSxjQUFjLEdBQVksYUFDbEMsSUFBTSx1QkFBdUIsR0FBWTs7Z0JBS2pELEdBQWtCLGlCQUFpQixRQUFRLFNBQVMsSUFBQTtBQUFBLGNBQzNCLElBQVksc0JBQy9CLEdBQVksbUJBQW1CLG9CQUFvQixJQUN0QyxRQUFRLFNBQVMsSUFBQTtBQUM1QixtQkFBTyxRQUFRLEdBQVEsT0FDekIsSUFBTyxLQUFLLEdBQVE7OztBQU10QixnQkFBQSxLQUF5QixHQUFZLDBCQUEwQixDQUFDLENBQ2xFLE1BQWdDLE9BQXpCLEtBQUksS0FBZ0I7QUFFekIsa0JBRUUsS0FBZSxTQUFrQixBQUFULE9BQVMsV0FBVCxDQUN2QixHQUF1QixHQUFHLE9BQzdCLElBQXVCLEdBQUcsTUFBTSxDQUM5QixNQUFNLEdBQXVCLEdBQUcsT0FBTyxLQUt6QyxHQUFZLGVBQ2QsSUFBWSxjQUFjLElBQUksRUFBTyxlQUNqQyxHQUFZLGVBQWUsTUFHakMsR0FBWSxvQkFBb0IsSUFDaEMsR0FBWSx5QkFBeUI7Y0FJUCxBQUE1QixHQUFHLFFBQVEsaUJBQWlCLGdCQUM5QixPQUFPLG9CQUFvQixHQUFHLGFBQWEsSUFBSSxTQUFTLElBQUE7QUFDL0MsbUJBQUEsR0FBRTthQUNSLEtBQUssT0FBTyxTQUVqQixNQUFPLDZCQUVQLEdBQUcsYUFBYSxRQUFRLFNBQVMsSUFBYSxJQUFBO0FBQzVDLGtCQUFPLEVBQWtCLElBQWEsR0FBWSxtQkFDOUMsU0FBUyxHQUFZLFFBQVEsR0FBRyxZQUNwQyxNQUFPLG9CQUFBLENBRUgsR0FBWSxlQUF3QyxBQUF6QixHQUFHLHNCQUFzQixTQUNqQyxBQUFsQixPQUFrQixLQUFNLEdBQUcsZUFDOUIsSUFBWSxZQUFZLHFCQUFxQixRQUFRLFNBQVMsSUFBQTtBQUM1RCxpQkFBSyxZQUFZLEdBQ2pCLE1BQU8sT0FBTyxFQUFTLGVBQWUsTUFBUTtnQkFHVixBQUFsQyxHQUFZLFlBQVksVUFBVSxlQUNwQyxPQUFPOztBQUtULGNBQUEsS0FBTyxJQUFJLEVBQU8sc0JBQXNCLENBQzFDLE1BQU0sU0FDTixLQUFLO0FBRUEsaUJBQUEsUUFBUSxRQUFRO1dBR3pCLEVBQWtCLFVBQVUsZUFBZSxXQUFBO0FBQ3JDLGNBQUEsS0FBSztBQUVMLGNBQUEsR0FBRztBQUNFLG1CQUFBLFFBQVEsT0FBTyxFQUFVLHFCQUM1QjtBQUdGLGNBQXdCLEFBQXRCLEdBQUcsbUJBQW1CLHVCQUNGLEFBQXRCLEdBQUcsbUJBQW1CO0FBQ2pCLG1CQUFBLFFBQVEsT0FBTyxFQUFVLHFCQUM1QixpREFBaUQsR0FBRztBQUd0RCxjQUFBLEtBQU0sRUFBUyx3QkFBd0IsR0FBRyxlQUMxQyxHQUFHO0FBQ0gsYUFBRyxlQUNMLE9BQU8sb0JBQW9CLEdBQUcsYUFBYSxJQUFJLFNBQVMsSUFBQTtBQUMvQyxtQkFBQSxHQUFFO2FBQ1IsS0FBSyxPQUFPLFNBRWpCLE1BQU87QUFFSCxjQUFBLEtBQXVCLEVBQVMsaUJBQ2hDLEdBQUcsbUJBQW1CLEtBQUs7QUFDL0IsYUFBRyxhQUFhLFFBQVEsU0FBUyxJQUFhLElBQUE7QUFDeEMsZ0JBQUEsQ0FBQSxNQUFnQixJQUFJLEtBQXBCO0FBR0Esa0JBQUEsR0FBWTtBQWtCZCx1QkFqQnlCLEFBQXJCLEdBQVksU0FBUyxnQkFDTSxBQUF6QixHQUFZLGFBQWEsY0FDM0IsTUFBTyx1Q0FFUCxNQUFPLHFCQUFxQixHQUFZLFdBQ3BDLDRCQUV3QixBQUFyQixHQUFZLFNBQVMsVUFDOUIsTUFBTyw4REFFdUIsQUFBckIsR0FBWSxTQUFTLFdBQzlCLE9BQU8sa0VBQUEsS0FHVCxPQUFPLDZDQUVRLEdBQVksTUFBTTtBQU03QixrQkFBQTtBQURGLGtCQUFBLEdBQVk7QUFFVyxnQkFBckIsR0FBWSxTQUFTLFVBQ3ZCLEtBQWEsR0FBWSxPQUFPLGlCQUFpQixLQUNuQixBQUFyQixHQUFZLFNBQVMsV0FDOUIsTUFBYSxHQUFZLE9BQU8saUJBQWlCLEtBRS9DLE1BRUUsS0FBZSxTQUE4QixBQUFyQixHQUFZLFNBQVMsV0FBVCxDQUNuQyxHQUFZLHVCQUF1QixHQUFHLE9BQ3pDLElBQVksdUJBQXVCLEdBQUcsTUFBTSxDQUMxQyxNQUFNLEdBQVksdUJBQXVCLEdBQUcsT0FBTztBQU92RCxrQkFBQSxLQUFxQixFQUNyQixHQUFZLG1CQUNaLEdBQVk7QUFBQSxlQUVILEdBQW1CLE9BQU8sT0FBTyxTQUFTLElBQUE7QUFDOUMsdUJBQXlCLEFBQXpCLEdBQUUsS0FBSyxrQkFBa0I7aUJBQy9CLFVBQ1ksR0FBWSx1QkFBdUIsR0FBRyxPQUFBLE9BQzVDLEdBQVksdUJBQXVCLEdBQUcsS0FHL0MsTUFBTyxFQUFrQixJQUFhLElBQ2xDLFVBQVUsR0FBWSxRQUFRLEdBQUcsWUFDakMsR0FBWSxrQkFDWixHQUFZLGVBQWUsZUFDN0IsT0FBTzs7O0FBSVAsY0FBQSxLQUFPLElBQUksRUFBTyxzQkFBc0IsQ0FDMUMsTUFBTSxVQUNOLEtBQUs7QUFFQSxpQkFBQSxRQUFRLFFBQVE7V0FHekIsRUFBa0IsVUFBVSxrQkFBa0IsU0FBUyxJQUFBO0FBQ2pELGNBQ0EsSUFEQSxLQUFLO0FBRUwsaUJBQUEsTUFBQSxBQUFlLEdBQVUsa0JBQXpCLFVBQXlCLENBQ3pCLEdBQVUsU0FDTCxRQUFRLE9BQU8sSUFBSSxVQUFVLHVDQUkvQixJQUFJLFFBQVEsU0FBUyxJQUFTLElBQUE7QUFDL0IsZ0JBQUEsQ0FBQyxHQUFHO0FBQ0MscUJBQUEsR0FBTyxFQUFVLHFCQUNwQjtBQUNDLGdCQUFLLE1BQXFDLEFBQXhCLEdBQVUsY0FBYyxJQWUxQztBQUNELGtCQUFBLEtBQWdCLEdBQVU7QUFDMUIsa0JBQUEsR0FBVTtBQUNQLHlCQUFJLEtBQUksR0FBRyxLQUFJLEdBQUcsYUFBYSxRQUFRO0FBQ3RDLHNCQUFBLEdBQUcsYUFBYSxJQUFHLFFBQVEsR0FBVSxRQUFRO0FBQy9DLHlCQUFnQjtBQUNoQjs7O0FBSUYsa0JBQUEsS0FBYyxHQUFHLGFBQWE7QUFDOUIsa0JBQUEsQ0FBQTtBQXFDSyx1QkFBQSxHQUFPLEVBQVUsa0JBQ3BCO0FBckNBLGtCQUFBLEdBQVk7QUFDUCx1QkFBQTtBQUVMLGtCQUFBLEtBQU8sT0FBTyxLQUFLLEdBQVUsV0FBVyxTQUFTLElBQ2pELEVBQVMsZUFBZSxHQUFVLGFBQWE7QUFFL0Msa0JBQWtCLEFBQWxCLEdBQUssYUFBYSxTQUF3QixDQUFkLEdBQUssU0FBUyxLQUFtQixBQUFkLEdBQUssU0FBUztBQUN4RCx1QkFBQTtBQUdMLGtCQUFBLEdBQUssYUFBZ0MsQUFBbkIsR0FBSyxjQUFjO0FBQ2hDLHVCQUFBO0FBSUwsa0JBQWtCLENBQWxCLE9BQWtCLEtBQU0sS0FBZ0IsS0FDeEMsR0FBWSxpQkFBaUIsR0FBRyxhQUFhLEdBQUcsaUJBQUEsQ0FDN0MsRUFBa0IsR0FBWSxjQUFjO0FBQ3hDLHVCQUFBLEdBQU8sRUFBVSxrQkFDcEI7QUFLSixrQkFBQSxLQUFrQixHQUFVLFVBQVU7QUFDSixjQUFsQyxHQUFnQixRQUFRLFVBQVUsS0FDcEMsTUFBa0IsR0FBZ0IsT0FBTyxLQUUzQyxNQUFXLEVBQVMsaUJBQWlCLEdBQUcsbUJBQW1CLE1BQ2xELE9BQWtCLE9BQ3RCLElBQUssT0FBTyxLQUFrQix1QkFDN0IsUUFDTixHQUFHLG1CQUFtQixNQUNsQixFQUFTLGVBQWUsR0FBRyxtQkFBbUIsT0FDOUMsR0FBUyxLQUFLOztBQTVEZix1QkFBSSxLQUFJLEdBQUcsS0FBSSxHQUFHLGFBQWEsVUFDOUIsSUFBRyxhQUFhLElBQUcsWUFHdkIsSUFBRyxhQUFhLElBQUcsYUFBYSxtQkFBbUIsS0FDbkQsTUFBVyxFQUFTLGlCQUFpQixHQUFHLG1CQUFtQixNQUNsRCxPQUFNLDJCQUNmLEdBQUcsbUJBQW1CLE1BQ2xCLEVBQVMsZUFBZSxHQUFHLG1CQUFtQixPQUM5QyxHQUFTLEtBQUssS0FBQSxDQUNkLEdBQUcsZUFWbUM7QUFBQTtBQWtFOUM7O1dBSUosRUFBa0IsVUFBVSxXQUFXLFNBQVMsSUFBQTtBQUMxQyxjQUFBLE1BQVksY0FBb0IsRUFBTyxrQkFBa0I7QUFDdkQsZ0JBQUEsS0FBbUI7QUFVbkIsZ0JBVEMsS0FBQSxhQUFhLFFBQVEsU0FBUyxJQUFBO0FBQzdCLGlCQUFZLGFBQ1osR0FBWSxVQUFVLFVBQVUsS0FDbEMsS0FBbUIsR0FBWSxZQUN0QixHQUFZLGVBQ25CLEdBQVksWUFBWSxVQUFVLE1BQ3BDLE1BQW1CLEdBQVk7Z0JBQUEsQ0FHOUI7QUFDRyxvQkFBQSxFQUFVLHNCQUFzQjtBQUVqQyxtQkFBQSxHQUFpQjs7QUFHdEIsY0FBQSxLQUFXO0FBU1IsaUJBUkYsS0FBQSxhQUFhLFFBQVEsU0FBUyxJQUFBO0FBQ2hDLGFBQUEsYUFBYSxlQUFlLGVBQWUsZ0JBQ3hDLGlCQUFpQixRQUFRLFNBQVMsSUFBQTtBQUM1QixpQkFBWSxPQUNkLEdBQVMsS0FBSyxHQUFZLElBQVE7O2NBSXJDLFFBQVEsSUFBSSxJQUFVLEtBQUssU0FBUyxJQUFBO0FBQ3JDLGdCQUFBLEtBQVUsSUFBSTtBQU1YLG1CQUxQLEdBQVMsUUFBUSxTQUFTLElBQUE7QUFDeEIsaUJBQU0sUUFBUSxTQUFTLElBQUE7QUFDckIsbUJBQVEsSUFBSSxHQUFLLElBQUk7O2dCQUdsQjs7O0FBS08sU0FBQyxnQkFBZ0Isa0JBQWtCLGtCQUNuRCxtQkFBbUIsb0JBQ1QsUUFBUSxTQUFTLElBQUE7QUFDdkIsY0FBQSxLQUFNLEVBQU87QUFDYixjQUFBLE1BQU8sR0FBSSxhQUFhLEdBQUksVUFBVSxVQUFVO0FBQzlDLGdCQUFBLEtBQWlCLEdBQUksVUFBVTtBQUNuQyxlQUFJLFVBQVUsV0FBVyxXQUFBO0FBQ2hCLHFCQUFBLEdBQWUsTUFBTSxNQUMzQixLQUFLLFNBQVMsSUFBQTtBQUNULG9CQUFBLEtBQVcsSUFBSTtBQUtaLHVCQUpQLE9BQU8sS0FBSyxJQUFhLFFBQVEsU0FBUyxJQUFBO0FBQ3hDLHFCQUFZLElBQUksT0FBTyxFQUFhLEdBQVksTUFDaEQsR0FBUyxJQUFJLElBQUksR0FBWTtvQkFFeEI7Ozs7O0FBT1gsWUFBQSxJQUFVLENBQUMsZUFBZTtBQThEdkIsZUE3RFAsRUFBUSxRQUFRLFNBQVMsSUFBQTtBQUNuQixjQUFBLEtBQWUsRUFBa0IsVUFBVTtBQUMvQyxZQUFrQixVQUFVLE1BQVUsV0FBQTtBQUNoQyxnQkFBQSxLQUFPO0FBQ1AsbUJBQW1CLEFBQUEsT0FBWixHQUFLLE1BQU8sY0FDQSxBQUFBLE9BQVosR0FBSyxNQUFPLGFBQ2QsR0FBYSxNQUFNLE1BQU0sQ0FBQyxVQUFVLEtBQzFDLEtBQUssU0FBUyxJQUFBO0FBQ1UsY0FBQSxPQUFaLEdBQUssTUFBTyxjQUNyQixHQUFLLEdBQUcsTUFBTSxNQUFNLENBQUM7ZUFFdEIsU0FBUyxJQUFBO0FBQ2EsY0FBQSxPQUFaLEdBQUssTUFBTyxjQUNyQixHQUFLLEdBQUcsTUFBTSxNQUFNLENBQUM7aUJBSXBCLEdBQWEsTUFBTSxNQUFNOztZQUlwQyxLQUFVLENBQUMsdUJBQXVCLHdCQUF3QixvQkFDbEQsUUFBUSxTQUFTLElBQUE7QUFDbkIsY0FBQSxLQUFlLEVBQWtCLFVBQVU7QUFDL0MsWUFBa0IsVUFBVSxNQUFVLFdBQUE7QUFDaEMsZ0JBQUEsS0FBTztBQUNQLG1CQUFtQixBQUFBLE9BQVosR0FBSyxNQUFPLGNBQ0EsQUFBQSxPQUFaLEdBQUssTUFBTyxhQUNkLEdBQWEsTUFBTSxNQUFNLFdBQy9CLEtBQUssV0FBQTtBQUNtQixjQUFBLE9BQVosR0FBSyxNQUFPLGNBQ3JCLEdBQUssR0FBRyxNQUFNO2VBRWYsU0FBUyxJQUFBO0FBQ2EsY0FBQSxPQUFaLEdBQUssTUFBTyxjQUNyQixHQUFLLEdBQUcsTUFBTSxNQUFNLENBQUM7aUJBSXBCLEdBQWEsTUFBTSxNQUFNOztZQU1uQyxDQUFBLFlBQVksUUFBUSxTQUFTLElBQUE7QUFDeEIsY0FBQSxLQUFlLEVBQWtCLFVBQVU7QUFDL0MsWUFBa0IsVUFBVSxNQUFVLFdBQUE7QUFDaEMsZ0JBQUEsS0FBTztBQUNQLG1CQUFtQixBQUFBLE9BQVosR0FBSyxNQUFPLGFBQ2QsR0FBYSxNQUFNLE1BQU0sV0FDL0IsS0FBSyxXQUFBO0FBQ21CLGNBQUEsT0FBWixHQUFLLE1BQU8sY0FDckIsR0FBSyxHQUFHLE1BQU07aUJBSWIsR0FBYSxNQUFNLE1BQU07O1lBSTdCOzs7QUN2ekRUO0FBRU8saUJBQTBCLElBQUE7QUFDekIsWUFBQSxJQUFZLE1BQVUsR0FBTyxXQWM3QixJQUFtQixFQUFVLGFBQWEsYUFDNUMsS0FBSyxFQUFVO0FBQ25CLFVBQVUsYUFBYSxlQUFlLFNBQVMsSUFBQTtBQUN0QyxpQkFBQSxFQUFpQixJQUFHLE1BQU0sU0FBQSxJQUFBO0FBQUssbUJBQUEsUUFBUSxPQWY3QixTQUFTLElBQUE7QUFDbkIscUJBQUEsQ0FDTCxNQUFNLENBQUMsdUJBQXVCLG1CQUFtQixHQUFFLFNBQVMsR0FBRSxNQUM5RCxTQUFTLEdBQUUsU0FDWCxZQUFZLEdBQUUsWUFDZCxVQUFXLFdBQUE7QUFDRix1QkFBQSxLQUFLOztjQVNnRDs7OztBQUVuRSxhQUFBLGVBQUEsVUFBQSxjQUFBLENBQUEsT0FBQSxRQUFBLFNBQUEsbUJBQUE7O0FDdEJEO0FBRU8saUJBQTZCLElBQUE7QUFDNUIsNkJBQXFCLEdBQU8sYUFHNUIsR0FBTyxVQUFVLGdCQUduQixJQUFPLFVBQVUsZ0JBQ25CLHFCQUFxQixHQUFPLFVBQVUsZ0JBR3hDLElBQU8sVUFBVSxhQUFhLGtCQUM1QixHQUFPLFVBQVUsZ0JBQWdCLEtBQUssR0FBTzs7QUFDaEQsYUFBQSxlQUFBLFVBQUEsY0FBQSxDQUFBLE9BQUEsUUFBQSxTQUFBLHNCQUFBOztBQ2ZEO0FBZ0ZDLGFBQUEsZUFBQSxVQUFBLGNBQUEsQ0FBQSxPQUFBLFFBQUEsU0FBQSxxQkFBQSxJQUFBLFNBQUEsbUJBQUEsR0FBQSxPQUFBLGVBQUEsVUFBQSxvQkFBQSxDQUFBLFlBQUEsTUFBQSxLQUFBLFdBQUE7QUFBQSxlQUFBLEVBQUE7V0FBQSxPQUFBLGVBQUEsVUFBQSx1QkFBQSxDQUFBLFlBQUEsTUFBQSxLQUFBLFdBQUE7QUFBQSxlQUFBLEVBQUE7O0FBOUVELFVBQUEsSUFBQSxFQUFBLFNBQUEsY0FDQSxJQUFBLFNBQUEsdUJBQ0EsSUFBQSxFQUFBLFNBQUEsNEJBRUEsSUFBQSxTQUFBLG1CQUNBLElBQUEsU0FBQTtBQXlFQyxpQkFBQSxJQUFBO0FBQUEsZUFBQSxNQUFBLEdBQUEsYUFBQSxLQUFBLENBQUEsU0FBQTs7QUFBQSxtQkFBQTtBQUFBLFlBQUEsQUFBQSxPQUFBLFdBQUE7QUFBQSxpQkFBQTtBQUFBLFlBQUEsS0FBQSxJQUFBO0FBQUEsZUFBQSxJQUFBLFdBQUE7QUFBQSxpQkFBQTtXQUFBOztBQUFBLGlCQUFBLElBQUE7QUFBQSxZQUFBLE1BQUEsR0FBQTtBQUFBLGlCQUFBO0FBQUEsWUFBQSxBQUFBLE9BQUEsUUFBQSxBQUFBLE9BQUEsTUFBQSxZQUFBLEFBQUEsT0FBQSxNQUFBO0FBQUEsaUJBQUEsQ0FBQSxTQUFBO0FBQUEsWUFBQSxLQUFBO0FBQUEsWUFBQSxNQUFBLEdBQUEsSUFBQTtBQUFBLGlCQUFBLEdBQUEsSUFBQTtBQUFBLFlBQUEsS0FBQSxJQUFBLEtBQUEsT0FBQSxrQkFBQSxPQUFBO0FBQUEsaUJBQUEsTUFBQTtBQUFBLGNBQUEsT0FBQSxVQUFBLGVBQUEsS0FBQSxJQUFBLEtBQUE7QUFBQSxnQkFBQSxLQUFBLEtBQUEsT0FBQSx5QkFBQSxJQUFBLE1BQUE7QUFBQSxrQkFBQSxJQUFBLE9BQUEsR0FBQSxPQUFBLE9BQUEsZUFBQSxJQUFBLElBQUEsTUFBQSxHQUFBLE1BQUEsR0FBQTs7QUFBQSxlQUFBLEdBQUEsVUFBQSxJQUFBLE1BQUEsR0FBQSxJQUFBLElBQUEsS0FBQTs7QUF2RU0sa0JBQTRCLElBQVEsSUFBQTtBQUNyQyxZQUFBLEdBQU8sa0JBQ0osSUFBTyxtQkFDVixJQUFPLGtCQUFrQixTQUF5QixJQUFBO0FBQ3pDLGlCQUFBO1lBR04sR0FBTyx5QkFDVixJQUFPLHdCQUF3QixTQUErQixJQUFBO0FBQ3JELGlCQUFBO1lBTVAsR0FBZSxVQUFVLFFBQU87QUFDNUIsY0FBQSxLQUFpQixPQUFPLHlCQUMxQixHQUFPLGlCQUFpQixXQUFXO0FBQ3ZDLGlCQUFPLGVBQWUsR0FBTyxpQkFBaUIsV0FBVyxXQUFXLENBQ2xFLEtBQUksU0FBQSxJQUFBO0FBQ0YsZUFBZSxJQUFJLEtBQUssTUFBTTtBQUN4QixnQkFBQSxLQUFLLElBQUksTUFBTTtBQUNyQixlQUFHLFVBQVUsSUFDUixLQUFBLGNBQWM7OztBQUFBLFNBUXZCLEdBQU8sZ0JBQWtCLFVBQVUsR0FBTyxhQUFhLGFBQ3pELE9BQU8sZUFBZSxHQUFPLGFBQWEsV0FBVyxRQUFRLENBQzNELEtBQU0sV0FBQTtBQVFHLGlCQUFBLEFBUEgsS0FBSyxVQU9GLFVBTm1CLENBQXBCLEtBQUssTUFBTSxTQUFTLFVBQ2pCLEtBQUEsUUFBUSxJQUFJLEdBQU8sY0FBYyxRQUNULEFBQXBCLEtBQUssTUFBTSxTQUFTLFdBQ3hCLE1BQUEsUUFBUSxRQUdWLEtBQUs7YUFNZCxHQUFPLGlCQUFBLENBQWtCLEdBQU8saUJBQ2xDLElBQU8sZ0JBQWdCLEdBQU87QUFHMUIsWUFBQSxLQUF3QixJQUFzQixFQUFBLFNBQUEsSUFDaEQsR0FBZTtBQUNuQixXQUFPLG9CQUFvQixTQUEyQixJQUFBO0FBTTdDLGlCQUxILE1BQVUsR0FBTyxjQUNuQixJQUFPLGFBQWEsSUFBaUIsRUFBQSxrQkFBQSxHQUFPLFlBQzFDLEdBQWUsVUFDakIsRUFBTSxJQUFJLGdDQUFnQyxHQUFPLGNBRTVDLElBQUksR0FBc0I7V0FFbkMsR0FBTyxrQkFBa0IsWUFBWSxHQUFzQjs7QUFHdEQsaUJBQTBCLElBQUE7QUFBQSxTQUUzQixHQUFPLGdCQUNMLGtCQUFrQixHQUFPLGFBQWEsYUFDMUMsSUFBTyxhQUFhLFVBQVUsZUFDMUIsR0FBTyxhQUFhLFVBQVU7OztBQzlFdEM7QUEwREMsYUFBQSxlQUFBLFVBQUEsY0FBQSxDQUFBLE9BQUEsUUFBQSxTQUFBLG1CQUFBO0FBeERELFVBQUEsSUFBQSxFQUFBLFNBQUE7QUF3REMsbUJBQUE7QUFBQSxZQUFBLEFBQUEsT0FBQSxXQUFBO0FBQUEsaUJBQUE7QUFBQSxZQUFBLEtBQUEsSUFBQTtBQUFBLGVBQUEsSUFBQSxXQUFBO0FBQUEsaUJBQUE7V0FBQTs7QUFBQSxpQkFBQSxJQUFBO0FBQUEsWUFBQSxNQUFBLEdBQUE7QUFBQSxpQkFBQTtBQUFBLFlBQUEsQUFBQSxPQUFBLFFBQUEsQUFBQSxPQUFBLE1BQUEsWUFBQSxBQUFBLE9BQUEsTUFBQTtBQUFBLGlCQUFBLENBQUEsU0FBQTtBQUFBLFlBQUEsS0FBQTtBQUFBLFlBQUEsTUFBQSxHQUFBLElBQUE7QUFBQSxpQkFBQSxHQUFBLElBQUE7QUFBQSxZQUFBLEtBQUEsSUFBQSxLQUFBLE9BQUEsa0JBQUEsT0FBQTtBQUFBLGlCQUFBLEtBQUE7QUFBQSxjQUFBLE9BQUEsVUFBQSxlQUFBLEtBQUEsSUFBQSxJQUFBO0FBQUEsZ0JBQUEsSUFBQSxLQUFBLE9BQUEseUJBQUEsSUFBQSxLQUFBO0FBQUEsaUJBQUEsR0FBQSxPQUFBLEVBQUEsT0FBQSxPQUFBLGVBQUEsSUFBQSxHQUFBLEtBQUEsR0FBQSxLQUFBLEdBQUE7O0FBQUEsZUFBQSxHQUFBLFVBQUEsSUFBQSxNQUFBLEdBQUEsSUFBQSxJQUFBLEtBQUE7O0FBQUEsaUJBQUEsSUFBQTtBQUFBLGVBQUEsS0FBQSxBQUFBLE9BQUEsVUFBQSxjQUFBLEFBQUEsT0FBQSxPQUFBLFlBQUEsV0FBQSxTQUFBLElBQUE7QUFBQSxpQkFBQSxPQUFBO1lBQUEsU0FBQSxJQUFBO0FBQUEsaUJBQUEsTUFBQSxBQUFBLE9BQUEsVUFBQSxjQUFBLEdBQUEsZ0JBQUEsVUFBQSxPQUFBLE9BQUEsWUFBQSxXQUFBLE9BQUE7V0FBQTs7QUF0RE0saUJBQTBCLElBQVEsSUFBQTtBQUNqQyxZQUFBLEtBQVksTUFBVSxHQUFPLFdBQzdCLElBQW1CLE1BQVUsR0FBTztBQVN0QyxZQVBKLEdBQVUsZUFBZSxTQUFTLElBQWEsSUFBVyxJQUFBO0FBRXhELFlBQU0sV0FBVywwQkFDYix3Q0FDSixHQUFVLGFBQWEsYUFBYSxJQUFhLEtBQUssSUFBVztXQUFBLENBRzdELElBQWUsVUFBVSxNQUMzQixxQkFBcUIsR0FBVSxhQUFhLDRCQUE0QjtBQUNwRSxjQUFBLElBQVEsU0FBUyxJQUFLLElBQUcsSUFBQTtBQUN6QixrQkFBSyxNQUFBLENBQVMsT0FBSyxPQUNyQixJQUFJLE1BQUssR0FBSSxLQUFBLE9BQ04sR0FBSTthQUlULElBQXFCLEdBQVUsYUFBYSxhQUM5QyxLQUFLLEdBQVU7QUFVZixjQVRKLEdBQVUsYUFBYSxlQUFlLFNBQVMsSUFBQTtBQU10QyxtQkFMVSxBQUFiLEVBQU8sUUFBTSxZQUErQixBQUFuQixFQUFPLEdBQUUsV0FBVSxZQUM5QyxNQUFJLEtBQUssTUFBTSxLQUFLLFVBQVUsTUFDOUIsRUFBTSxHQUFFLE9BQU8sbUJBQW1CLHVCQUNsQyxFQUFNLEdBQUUsT0FBTyxvQkFBb0IseUJBRTlCLEVBQW1CO2FBR3hCLEtBQW9CLEVBQWlCLFVBQVUsYUFBYTtBQUN4RCxnQkFBQSxLQUFvQixFQUFpQixVQUFVO0FBQ3JELGNBQWlCLFVBQVUsY0FBYyxXQUFBO0FBQ2pDLGtCQUFBLEtBQU0sR0FBa0IsTUFBTSxNQUFNO0FBR25DLHFCQUZQLEVBQU0sSUFBSyxzQkFBc0Isb0JBQ2pDLEVBQU0sSUFBSyx1QkFBdUIscUJBQzNCOzs7QUFJUCxjQUFBLEtBQW9CLEVBQWlCLFVBQVUsa0JBQWtCO0FBQzdELGdCQUFBLElBQ0osRUFBaUIsVUFBVTtBQUM3QixjQUFpQixVQUFVLG1CQUFtQixTQUFTLElBQUE7QUFNOUMscUJBTFcsQUFBZCxLQUFLLFNBQVMsV0FBd0IsQUFBYixFQUFPLFFBQU0sWUFDeEMsTUFBSSxLQUFLLE1BQU0sS0FBSyxVQUFVLE1BQzlCLEVBQU0sSUFBRyxtQkFBbUIsdUJBQzVCLEVBQU0sSUFBRyxvQkFBb0IseUJBRXhCLEVBQXVCLE1BQU0sTUFBTSxDQUFDOzs7Ozs7QUN0RG5EO0FBRU8saUJBQTZCLElBQVEsR0FBQTtBQUN0QyxXQUFPLFVBQVUsZ0JBQ25CLHFCQUFxQixHQUFPLFVBQVUsZ0JBR2xDLEdBQU8sVUFBVSxnQkFHdkIsSUFBTyxVQUFVLGFBQWEsa0JBQzVCLFNBQXlCLEdBQUE7QUFDbkIsY0FBQSxDQUFFLEtBQUEsQ0FBZSxFQUFZLE9BQVE7QUFDakMsZ0JBQUEsSUFBTSxJQUFJLGFBQWE7QUFLdEIsbUJBSFAsRUFBSSxPQUFPLGlCQUVYLEVBQUksT0FBTyxHQUNKLFFBQVEsT0FBTzs7QUFPakIsaUJBQUEsQUFMSCxFQUFZLFVBS1QsT0FKTCxFQUFZLFFBQVEsQ0FBQyxhQUFhLEtBRWxDLEVBQVksTUFBTSxjQUFjLEdBRTNCLEdBQU8sVUFBVSxhQUFhLGFBQWE7OztBQUV2RCxhQUFBLGVBQUEsVUFBQSxjQUFBLENBQUEsT0FBQSxRQUFBLFNBQUEsc0JBQUE7O0FDM0JEO0FBK1JDLGFBQUEsZUFBQSxVQUFBLGNBQUEsQ0FBQSxPQUFBLFFBQUEsU0FBQSxjQUFBLEdBQUEsU0FBQSxxQkFBQSxHQUFBLFNBQUEscUJBQUEsSUFBQSxTQUFBLHVCQUFBLEdBQUEsU0FBQSxtQkFBQSxHQUFBLFNBQUEscUJBQUEsR0FBQSxTQUFBLHFCQUFBLEdBQUEsU0FBQSxvQkFBQSxHQUFBLFNBQUEsa0JBQUEsR0FBQSxTQUFBLG1CQUFBLEdBQUEsT0FBQSxlQUFBLFVBQUEsb0JBQUEsQ0FBQSxZQUFBLE1BQUEsS0FBQSxXQUFBO0FBQUEsZUFBQSxFQUFBO1dBQUEsT0FBQSxlQUFBLFVBQUEsdUJBQUEsQ0FBQSxZQUFBLE1BQUEsS0FBQSxXQUFBO0FBQUEsZUFBQSxFQUFBOztBQTdSRCxVQUFBLElBQUEsRUFBQSxTQUFBLGNBQ0EsSUFBQSxTQUFBLG1CQUNBLElBQUEsU0FBQTtBQTJSQyxtQkFBQTtBQUFBLFlBQUEsQUFBQSxPQUFBLFdBQUE7QUFBQSxpQkFBQTtBQUFBLFlBQUEsS0FBQSxJQUFBO0FBQUEsZUFBQSxJQUFBLFdBQUE7QUFBQSxpQkFBQTtXQUFBOztBQUFBLGlCQUFBLElBQUE7QUFBQSxZQUFBLE1BQUEsR0FBQTtBQUFBLGlCQUFBO0FBQUEsWUFBQSxBQUFBLE9BQUEsUUFBQSxBQUFBLE9BQUEsTUFBQSxZQUFBLEFBQUEsT0FBQSxNQUFBO0FBQUEsaUJBQUEsQ0FBQSxTQUFBO0FBQUEsWUFBQSxLQUFBO0FBQUEsWUFBQSxNQUFBLEdBQUEsSUFBQTtBQUFBLGlCQUFBLEdBQUEsSUFBQTtBQUFBLFlBQUEsS0FBQSxJQUFBLEtBQUEsT0FBQSxrQkFBQSxPQUFBO0FBQUEsaUJBQUEsTUFBQTtBQUFBLGNBQUEsT0FBQSxVQUFBLGVBQUEsS0FBQSxJQUFBLEtBQUE7QUFBQSxnQkFBQSxLQUFBLEtBQUEsT0FBQSx5QkFBQSxJQUFBLE1BQUE7QUFBQSxrQkFBQSxJQUFBLE9BQUEsR0FBQSxPQUFBLE9BQUEsZUFBQSxJQUFBLElBQUEsTUFBQSxHQUFBLE1BQUEsR0FBQTs7QUFBQSxlQUFBLEdBQUEsVUFBQSxJQUFBLE1BQUEsR0FBQSxJQUFBLElBQUEsS0FBQTs7QUFBQSxpQkFBQSxJQUFBLElBQUEsSUFBQTtBQUFBLGVBQUEsTUFBQSxLQUFBLE9BQUEsZUFBQSxJQUFBLElBQUEsQ0FBQSxPQUFBLElBQUEsWUFBQSxNQUFBLGNBQUEsTUFBQSxVQUFBLFNBQUEsR0FBQSxNQUFBLElBQUE7O0FBQUEsaUJBQUEsSUFBQTtBQUFBLGVBQUEsS0FBQSxBQUFBLE9BQUEsVUFBQSxjQUFBLEFB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QSxhQUFBLFVBQUEsSUFBQSxLQUNBLEtBQUEsZUFBQTs7QUF4RUEsYUFBQSxVQUNBLEdBQUEsWUFBQSxPQUFBLE9BQUEsT0FNQSxJQUFBLElBQUEsYUFBQSxLQUFBLFNBMkVBLEVBQUEsVUFBQSxhQUFBLFdBQUE7QUFDQSxZQUNBLElBQ0EsSUFGQSxLQUFBO0FBSUEsWUFBQSxBQUFBLEtBQUEsaUJBQUE7QUFBQSxpQkFBQTtBQUVBLGFBQUEsTUFBQSxLQUFBLEtBQUE7QUFDQSxZQUFBLEtBQUEsSUFBQSxPQUFBLEdBQUEsS0FBQSxJQUFBLEdBQUEsTUFBQSxLQUFBO0FBR0EsZUFBQSxPQUFBLHdCQUNBLEdBQUEsT0FBQSxPQUFBLHNCQUFBLE9BR0E7U0FVQSxFQUFBLFVBQUEsWUFBQSxTQUFBLElBQUE7QUFDQSxZQUFBLEtBQUEsSUFBQSxJQUFBLEtBQUEsSUFDQSxLQUFBLEtBQUEsUUFBQTtBQUVBLFlBQUEsQ0FBQTtBQUFBLGlCQUFBO0FBQ0EsWUFBQSxHQUFBO0FBQUEsaUJBQUEsQ0FBQSxHQUFBO0FBRUEsaUJBQUEsS0FBQSxHQUFBLEtBQUEsR0FBQSxRQUFBLEtBQUEsSUFBQSxNQUFBLEtBQUEsS0FBQSxJQUFBO0FBQ0EsYUFBQSxNQUFBLEdBQUEsSUFBQTtBQUdBLGVBQUE7U0FVQSxFQUFBLFVBQUEsZ0JBQUEsU0FBQSxJQUFBO0FBQ0EsWUFBQSxLQUFBLElBQUEsSUFBQSxLQUFBLElBQ0EsS0FBQSxLQUFBLFFBQUE7QUFFQSxlQUFBLEtBQ0EsR0FBQSxLQUFBLElBQ0EsR0FBQSxTQUZBO1NBWUEsRUFBQSxVQUFBLE9BQUEsU0FBQSxJQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsSUFBQTtBQUNBLFlBQUEsSUFBQSxJQUFBLElBQUEsS0FBQTtBQUVBLFlBQUEsQ0FBQSxLQUFBLFFBQUE7QUFBQSxpQkFBQTtBQUVBLFlBRUEsR0FDQSxHQUhBLElBQUEsS0FBQSxRQUFBLElBQ0EsSUFBQSxVQUFBO0FBSUEsWUFBQSxFQUFBLElBQUE7QUFHQSxrQkFGQSxFQUFBLFFBQUEsS0FBQSxlQUFBLElBQUEsRUFBQSxJQUFBLFFBQUEsT0FFQTtpQkFDQTtBQUFBLHFCQUFBLEVBQUEsR0FBQSxLQUFBLEVBQUEsVUFBQTtpQkFDQTtBQUFBLHFCQUFBLEVBQUEsR0FBQSxLQUFBLEVBQUEsU0FBQSxLQUFBO2lCQUNBO0FBQUEscUJBQUEsRUFBQSxHQUFBLEtBQUEsRUFBQSxTQUFBLElBQUEsS0FBQTtpQkFDQTtBQUFBLHFCQUFBLEVBQUEsR0FBQSxLQUFBLEVBQUEsU0FBQSxJQUFBLElBQUEsS0FBQTtpQkFDQTtBQUFBLHFCQUFBLEVBQUEsR0FBQSxLQUFBLEVBQUEsU0FBQSxJQUFBLElBQUEsSUFBQSxLQUFBO2lCQUNBO0FBQUEscUJBQUEsRUFBQSxHQUFBLEtBQUEsRUFBQSxTQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsS0FBQTs7QUFHQSxlQUFBLElBQUEsR0FBQSxJQUFBLElBQUEsTUFBQSxJQUFBLElBQUEsSUFBQSxHQUFBO0FBQ0EsY0FBQSxJQUFBLEtBQUEsVUFBQTtBQUdBLFlBQUEsR0FBQSxNQUFBLEVBQUEsU0FBQTtlQUNBO0FBQ0EsY0FDQSxHQURBLElBQUEsRUFBQTtBQUdBLGVBQUEsSUFBQSxHQUFBLElBQUEsR0FBQTtBQUdBLG9CQUZBLEVBQUEsR0FBQSxRQUFBLEtBQUEsZUFBQSxJQUFBLEVBQUEsR0FBQSxJQUFBLFFBQUEsT0FFQTttQkFDQTtBQUFBLGtCQUFBLEdBQUEsR0FBQSxLQUFBLEVBQUEsR0FBQTtBQUFBO21CQUNBO0FBQUEsa0JBQUEsR0FBQSxHQUFBLEtBQUEsRUFBQSxHQUFBLFNBQUE7QUFBQTttQkFDQTtBQUFBLGtCQUFBLEdBQUEsR0FBQSxLQUFBLEVBQUEsR0FBQSxTQUFBLElBQUE7QUFBQTttQkFDQTtBQUFBLGtCQUFBLEdBQUEsR0FBQSxLQUFBLEVBQUEsR0FBQSxTQUFBLElBQUEsSUFBQTtBQUFBOztBQUVBLG9CQUFBLENBQUE7QUFBQSx1QkFBQSxJQUFBLEdBQUEsSUFBQSxJQUFBLE1BQUEsSUFBQSxJQUFBLElBQUEsR0FBQTtBQUNBLHNCQUFBLElBQUEsS0FBQSxVQUFBO0FBR0Esa0JBQUEsR0FBQSxHQUFBLE1BQUEsRUFBQSxHQUFBLFNBQUE7OztBQUtBLGVBQUE7U0FZQSxFQUFBLFVBQUEsS0FBQSxTQUFBLElBQUEsSUFBQSxJQUFBO0FBQ0EsZUFBQSxFQUFBLE1BQUEsSUFBQSxJQUFBLElBQUE7U0FZQSxFQUFBLFVBQUEsT0FBQSxTQUFBLElBQUEsSUFBQSxJQUFBO0FBQ0EsZUFBQSxFQUFBLE1BQUEsSUFBQSxJQUFBLElBQUE7U0FhQSxFQUFBLFVBQUEsaUJBQUEsU0FBQSxJQUFBLElBQUEsSUFBQSxJQUFBO0FBQ0EsWUFBQSxLQUFBLElBQUEsSUFBQSxLQUFBO0FBRUEsWUFBQSxDQUFBLEtBQUEsUUFBQTtBQUFBLGlCQUFBO0FBQ0EsWUFBQSxDQUFBO0FBRUEsaUJBREEsRUFBQSxNQUFBLEtBQ0E7QUFHQSxZQUFBLElBQUEsS0FBQSxRQUFBO0FBRUEsWUFBQSxFQUFBO0FBRUEsWUFBQSxPQUFBLE1BQ0EsTUFBQSxDQUFBLEVBQUEsUUFDQSxNQUFBLEVBQUEsWUFBQSxNQUVBLEVBQUEsTUFBQTthQUVBO0FBQ0EsbUJBQUEsSUFBQSxHQUFBLElBQUEsSUFBQSxJQUFBLEVBQUEsUUFBQSxJQUFBLEdBQUE7QUFBQSxZQUVBLEdBQUEsR0FBQSxPQUFBLE1BQ0EsTUFBQSxDQUFBLEVBQUEsR0FBQSxRQUNBLE1BQUEsRUFBQSxHQUFBLFlBQUEsT0FFQSxFQUFBLEtBQUEsRUFBQTtBQU9BLFlBQUEsU0FBQSxLQUFBLFFBQUEsTUFBQSxBQUFBLEVBQUEsV0FBQSxJQUFBLEVBQUEsS0FBQSxJQUNBLEVBQUEsTUFBQTs7QUFHQSxlQUFBO1NBVUEsRUFBQSxVQUFBLHFCQUFBLFNBQUEsSUFBQTtBQUNBLFlBQUE7QUFVQSxlQVJBLEtBQ0EsTUFBQSxJQUFBLElBQUEsS0FBQSxJQUNBLEtBQUEsUUFBQSxPQUFBLEVBQUEsTUFBQSxPQUVBLE1BQUEsVUFBQSxJQUFBLEtBQ0EsS0FBQSxlQUFBLElBR0E7U0FNQSxFQUFBLFVBQUEsTUFBQSxFQUFBLFVBQUEsZ0JBQ0EsRUFBQSxVQUFB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QUEsV0FBQSxJQUFBOztXQUFBLElBQUEsUUFBQSxLQUFBLFVBQUEsU0FBQSxJQUFBLElBQUE7QUFBQSxZQUFBLEtBQUEsQUFBQSxPQUFBLFVBQUEsY0FBQSxHQUFBLE9BQUE7QUFBQSxZQUFBLENBQUE7QUFBQSxpQkFBQTtBQUFBLFlBQUEsSUFBQSxJQUFBLEtBQUEsR0FBQSxLQUFBLEtBQUEsS0FBQTtBQUFBLFlBQUE7QUFBQSxpQkFBQSxDQUFBLE9BQUEsVUFBQSxPQUFBLE1BQUEsQ0FBQSxNQUFBLEdBQUEsUUFBQTtBQUFBLGVBQUEsS0FBQSxHQUFBO2lCQUFBLElBQUE7QUFBQSxlQUFBLENBQUEsT0FBQTtrQkFBQTtBQUFBLGNBQUE7QUFBQSxrQkFBQSxDQUFBLEdBQUEsUUFBQSxNQUFBLEdBQUEsV0FBQSxHQUFBLEtBQUE7b0JBQUE7QUFBQSxnQkFBQTtBQUFBLG9CQUFBLEdBQUE7OztBQUFBLGVBQUE7U0FBQSxJQUFBLFFBQUEsS0FBQSxpQkFBQSxTQUFBLElBQUEsSUFBQTtBQUFBLGlCQUFBLEtBQUEsR0FBQSxLQUFBLEdBQUEsUUFBQSxLQUFBLEdBQUEsUUFBQSxLQUFBLElBQUEsTUFBQTtBQUFBLGFBQUEsTUFBQSxHQUFBO0FBQUEsZUFBQTtTQUFBLElBQUEsUUFBQSxLQUFBLFlBQUEsU0FBQSxJQUFBO0FBQUEsWUFBQSxLQUFBLEFBQUEsT0FBQSxVQUFBLGNBQUEsT0FBQSxVQUFBLEtBQUEsTUFBQSxHQUFBLEtBQUEsS0FBQTtBQUFBLFlBQUE7QUFBQSxpQkFBQSxHQUFBLEtBQUE7QUFBQSxZQUFBLE1BQUEsQUFBQSxPQUFBLEdBQUEsVUFBQTtBQUFBLGlCQUFBLENBQUEsTUFBQSxXQUFBO0FBQUEsbUJBQUEsTUFBQSxNQUFBLEdBQUEsVUFBQSxNQUFBLFNBQUEsQ0FBQSxPQUFBLE1BQUEsR0FBQSxPQUFBLE1BQUEsQ0FBQTs7QUFBQSxjQUFBLElBQUEsVUFBQSxLQUFBLDRCQUFBO1NBQUEsSUFBQSxRQUFBLEtBQUEsbUJBQUEsU0FBQSxJQUFBO0FBQUEsZUFBQSxNQUFBLEdBQUEsYUFB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QUFBQSxpQkFBQSxTQUFBLElBQUE7QUFBQSxtQkFBQSxTQUFBLElBQUE7QUFBQSxrQkFBQTtBQUFBLHNCQUFBLElBQUEsVUFBQTtBQUFBLHFCQUFBO0FBQUEsb0JBQUE7QUFBQSxzQkFBQSxLQUFBLEdBQUEsTUFBQSxNQUFBLElBQUEsR0FBQSxLQUFBLEdBQUEsU0FBQSxHQUFBLEtBQUEsR0FBQSxTQUFBLE9BQUEsR0FBQSxXQUFBLEdBQUEsS0FBQSxLQUFBLEtBQUEsR0FBQSxTQUFBLENBQUEsTUFBQSxHQUFBLEtBQUEsSUFBQSxHQUFBLEtBQUE7QUFBQSwyQkFBQTtBQUFBLDBCQUFBLEtBQUEsR0FBQSxNQUFBLE1BQUEsQ0FBQSxJQUFBLEdBQUEsSUFBQSxHQUFBLFNBQUEsR0FBQTt5QkFBQTt5QkFBQTtBQUFBLDJCQUFBO0FBQUE7eUJBQUE7QUFBQSw2QkFBQSxFQUFBLFNBQUEsQ0FBQSxPQUFBLEdBQUEsSUFBQSxNQUFBO3lCQUFBO0FBQUEsd0JBQUEsU0FBQSxLQUFBLEdBQUEsSUFBQSxLQUFBLENBQUE7QUFBQTt5QkFBQTtBQUFBLDJCQUFBLEVBQUEsSUFBQSxPQUFBLEVBQUEsS0FBQTtBQUFBOztBQUFBLDBCQUFBLENBQUEsTUFBQSxNQUFBLEVBQUEsTUFBQSxTQUFBLEtBQUEsR0FBQSxHQUFBLFNBQUEsT0FBQSxDQUFBLEdBQUEsT0FBQSxLQUFBLEFBQUEsR0FBQSxPQUFBLElBQUE7QUFBQSw0QkFBQTtBQUFBOztBQUFBLDBCQUFBLEFBQUEsR0FBQSxPQUFBLEtBQUEsRUFBQSxNQUFBLEdBQUEsS0FBQSxHQUFBLE1BQUEsR0FBQSxLQUFBLEdBQUEsS0FBQTtBQUFBLDBCQUFBLFFBQUEsR0FBQTtBQUFBOztBQUFBLDBCQUFBLEFBQUEsR0FBQSxPQUFBLEtBQUEsRUFBQSxRQUFBLEdBQUEsSUFBQTtBQUFBLDBCQUFBLFFBQUEsR0FBQSxJQUFBLEtBQUE7QUFBQTs7QUFBQSwwQkFBQSxNQUFBLEVBQUEsUUFBQSxHQUFBLElBQUE7QUFBQSwwQkFBQSxRQUFBLEdBQUEsSUFBQSxFQUFBLElBQUEs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
