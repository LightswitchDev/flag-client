import React, { useContext, createContext, useState } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var base64 = createCommonjsModule(function (module, exports) {
(function(root) {

	// Detect free variables `exports`.
	var freeExports =  exports;

	// Detect free variable `module`.
	var freeModule =  module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '0.1.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = base64;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in base64) {
				base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.base64 = base64;
	}

}(commonjsGlobal));
});

var BASE_URL = 'https://flag-api-vykaoik56q-uc.a.run.app';
var LightswitchClient = /** @class */ (function () {
    function LightswitchClient(config) {
        var _this = this;
        this._lightswitches = [];
        this._subscribers = [];
        this.subscribe = function (onUpdate) {
            var _a;
            (_a = _this._subscribers) === null || _a === void 0 ? void 0 : _a.push(onUpdate);
        };
        this.getSwitch = function (key) {
            return _this._lightswitches.find(function (lightswitch) { return lightswitch.key === key; });
        };
        this.getSwitches = function (keys) {
            return keys
                ? _this._lightswitches.filter(function (lightswitch) { return keys.some(function (key) { return key === lightswitch.key; }); })
                : _this._lightswitches;
        };
        this._setSwitches = function () {
            _this._getSwitches()
                .then(function (switches) {
                _this._lightswitches = switches;
                console.log('set', switches);
                _this._subscribers.forEach(function (onUpdate) { return onUpdate(switches); });
            })
                .catch(console.error);
        };
        this._getSwitches = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this._url + "/switches", {
                            headers: new Headers({
                                Authorization: "Basic " + base64.encode(this._authString),
                            }),
                        })];
                    case 1:
                        res = _a.sent();
                        if (res.status === 403)
                            throw new Error("Authentication error with Lightswitch Server");
                        if (res.status >= 400)
                            throw new Error('Server Error');
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        console.log(data);
                        return [2 /*return*/, data.lightswitches];
                }
            });
        }); };
        var clientId = config.clientId, apiKey = config.apiKey, _a = config.frequencyInSeconds, frequencyInSeconds = _a === void 0 ? 5 * 60 : _a, url = config.url;
        this._authString = clientId + ":" + apiKey;
        this._url = url ? url : BASE_URL;
        setInterval(this._setSwitches, frequencyInSeconds * 1000);
    }
    return LightswitchClient;
}());

var useSwitches = function (keys, defaultValues) {
    var _a;
    var lightswitchClient = useContext(LightswitchContext).lightswitchClient;
    var lightswitches = (_a = lightswitchClient) === null || _a === void 0 ? void 0 : _a.getSwitches(keys);
    return keys.reduce(function (values, key, i) {
        var _a;
        var lightswitch = (_a = lightswitches) === null || _a === void 0 ? void 0 : _a.find(function (lightswitch) { return lightswitch.key === key; });
        var defaultValue = defaultValues[i];
        values[key] = _evaluateSwitch(lightswitch, defaultValue);
        return values;
    }, {});
};
var _evaluateSwitch = function (lightswitch, defaultValue) {
    if (lightswitch === void 0) { lightswitch = undefined; }
    var _a;
    if (((_a = lightswitch) === null || _a === void 0 ? void 0 : _a.type) === 'Boolean') {
        return lightswitch.enabled;
    }
    else {
        return defaultValue;
    }
};
var useSwitch = function (key, defaultValue) {
    var _a;
    var lightswitchClient = useContext(LightswitchContext).lightswitchClient;
    var lightswitch = (_a = lightswitchClient) === null || _a === void 0 ? void 0 : _a.getSwitch(key);
    return _evaluateSwitch(lightswitch, defaultValue);
};
var LightswitchContext = createContext({});
var Provider = LightswitchContext.Provider;
var LightswitchProvider = function (_a) {
    var lightswitchClient = _a.lightswitchClient, children = _a.children;
    var _b;
    var initialSwitches = (_b = lightswitchClient) === null || _b === void 0 ? void 0 : _b.getSwitches();
    var _c = useState(initialSwitches), lightswitches = _c[0], setSwitches = _c[1];
    lightswitchClient.subscribe(function (lightswitches) {
        console.log('subscribe', lightswitches);
        setSwitches(lightswitches);
    });
    return React.createElement(Provider, { value: { lightswitches: lightswitches, lightswitchClient: lightswitchClient } }, children);
};

export { LightswitchClient, LightswitchContext, LightswitchProvider, useSwitch, useSwitches };
//# sourceMappingURL=index.es.js.map
