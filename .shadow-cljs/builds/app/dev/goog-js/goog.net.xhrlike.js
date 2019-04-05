["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/net/xhrlike.js"],"~:js","goog.provide(\"goog.net.XhrLike\");\n/** @interface */ goog.net.XhrLike = function() {\n};\n/** @typedef {(!goog.net.XhrLike|!XMLHttpRequest)} */ goog.net.XhrLike.OrNative;\n/** @type {(function()|null|undefined)} */ goog.net.XhrLike.prototype.onreadystatechange;\n/** @type {string} */ goog.net.XhrLike.prototype.responseText;\n/** @type {Document} */ goog.net.XhrLike.prototype.responseXML;\n/** @type {number} */ goog.net.XhrLike.prototype.readyState;\n/** @type {number} */ goog.net.XhrLike.prototype.status;\n/** @type {string} */ goog.net.XhrLike.prototype.statusText;\n/**\n @param {string} method\n @param {string} url\n @param {?boolean=} opt_async\n @param {?string=} opt_user\n @param {?string=} opt_password\n */\ngoog.net.XhrLike.prototype.open = function(method, url, opt_async, opt_user, opt_password) {\n};\n/**\n @param {(ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string)=} opt_data\n */\ngoog.net.XhrLike.prototype.send = function(opt_data) {\n};\ngoog.net.XhrLike.prototype.abort = function() {\n};\n/**\n @param {string} header\n @param {string} value\n */\ngoog.net.XhrLike.prototype.setRequestHeader = function(header, value) {\n};\n/**\n @param {string} header\n @return {string}\n */\ngoog.net.XhrLike.prototype.getResponseHeader = function(header) {\n};\n/**\n @return {string}\n */\ngoog.net.XhrLike.prototype.getAllResponseHeaders = function() {\n};\n","~:source","// Copyright 2013 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\ngoog.provide('goog.net.XhrLike');\n\n\n\n/**\n * Interface for the common parts of XMLHttpRequest.\n *\n * Mostly copied from externs/w3c_xml.js.\n *\n * @interface\n * @see http://www.w3.org/TR/XMLHttpRequest/\n */\ngoog.net.XhrLike = function() {};\n\n\n/**\n * Typedef that refers to either native or custom-implemented XHR objects.\n * @typedef {!goog.net.XhrLike|!XMLHttpRequest}\n */\ngoog.net.XhrLike.OrNative;\n\n\n/**\n * @type {function()|null|undefined}\n * @see http://www.w3.org/TR/XMLHttpRequest/#handler-xhr-onreadystatechange\n */\ngoog.net.XhrLike.prototype.onreadystatechange;\n\n\n/**\n * @type {string}\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-responsetext-attribute\n */\ngoog.net.XhrLike.prototype.responseText;\n\n\n/**\n * @type {Document}\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-responsexml-attribute\n */\ngoog.net.XhrLike.prototype.responseXML;\n\n\n/**\n * @type {number}\n * @see http://www.w3.org/TR/XMLHttpRequest/#readystate\n */\ngoog.net.XhrLike.prototype.readyState;\n\n\n/**\n * @type {number}\n * @see http://www.w3.org/TR/XMLHttpRequest/#status\n */\ngoog.net.XhrLike.prototype.status;\n\n\n/**\n * @type {string}\n * @see http://www.w3.org/TR/XMLHttpRequest/#statustext\n */\ngoog.net.XhrLike.prototype.statusText;\n\n\n/**\n * @param {string} method\n * @param {string} url\n * @param {?boolean=} opt_async\n * @param {?string=} opt_user\n * @param {?string=} opt_password\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-open()-method\n */\ngoog.net.XhrLike.prototype.open = function(\n    method, url, opt_async, opt_user, opt_password) {};\n\n\n/**\n * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=} opt_data\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-send()-method\n */\ngoog.net.XhrLike.prototype.send = function(opt_data) {};\n\n\n/**\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-abort()-method\n */\ngoog.net.XhrLike.prototype.abort = function() {};\n\n\n/**\n * @param {string} header\n * @param {string} value\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method\n */\ngoog.net.XhrLike.prototype.setRequestHeader = function(header, value) {};\n\n\n/**\n * @param {string} header\n * @return {string}\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method\n */\ngoog.net.XhrLike.prototype.getResponseHeader = function(header) {};\n\n\n/**\n * @return {string}\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders()-method\n */\ngoog.net.XhrLike.prototype.getAllResponseHeaders = function() {};\n","~:compiled-at",1554428132903,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.net.xhrlike.js\",\n\"lineCount\":44,\n\"mappings\":\"AAcAA,IAAAC,QAAA,CAAa,kBAAb,CAAA;AAYA,kBAAAD,IAAAE,IAAAC,QAAA,GAAmBC,QAAQ,EAAG;CAA9B;AAOA,sDAAAJ,IAAAE,IAAAC,QAAAE,SAAA;AAOA,2CAAAL,IAAAE,IAAAC,QAAAG,UAAAC,mBAAA;AAOA,sBAAAP,IAAAE,IAAAC,QAAAG,UAAAE,aAAA;AAOA,wBAAAR,IAAAE,IAAAC,QAAAG,UAAAG,YAAA;AAOA,sBAAAT,IAAAE,IAAAC,QAAAG,UAAAI,WAAA;AAOA,sBAAAV,IAAAE,IAAAC,QAAAG,UAAAK,OAAA;AAOA,sBAAAX,IAAAE,IAAAC,QAAAG,UAAAM,WAAA;AAWA;;;;;;;AAAAZ,IAAAE,IAAAC,QAAAG,UAAAO,KAAA,GAAkCC,QAAQ,CACtCC,MADsC,EAC9BC,GAD8B,EACzBC,SADyB,EACdC,QADc,EACJC,YADI,CACU;CADpD;AAQA;;;AAAAnB,IAAAE,IAAAC,QAAAG,UAAAc,KAAA,GAAkCC,QAAQ,CAACC,QAAD,CAAW;CAArD;AAMAtB,IAAAE,IAAAC,QAAAG,UAAAiB,MAAA,GAAmCC,QAAQ,EAAG;CAA9C;AAQA;;;;AAAAxB,IAAAE,IAAAC,QAAAG,UAAAmB,iBAAA,GAA8CC,QAAQ,CAACC,MAAD,EAASC,KAAT,CAAgB;CAAtE;AAQA;;;;AAAA5B,IAAAE,IAAAC,QAAAG,UAAAuB,kBAAA,GAA+CC,QAAQ,CAACH,MAAD,CAAS;CAAhE;AAOA;;;AAAA3B,IAAAE,IAAAC,QAAAG,UAAAyB,sBAAA,GAAmDC,QAAQ,EAAG;CAA9D;;\",\n\"sources\":[\"goog/net/xhrlike.js\"],\n\"sourcesContent\":[\"// Copyright 2013 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\ngoog.provide('goog.net.XhrLike');\\n\\n\\n\\n/**\\n * Interface for the common parts of XMLHttpRequest.\\n *\\n * Mostly copied from externs/w3c_xml.js.\\n *\\n * @interface\\n * @see http://www.w3.org/TR/XMLHttpRequest/\\n */\\ngoog.net.XhrLike = function() {};\\n\\n\\n/**\\n * Typedef that refers to either native or custom-implemented XHR objects.\\n * @typedef {!goog.net.XhrLike|!XMLHttpRequest}\\n */\\ngoog.net.XhrLike.OrNative;\\n\\n\\n/**\\n * @type {function()|null|undefined}\\n * @see http://www.w3.org/TR/XMLHttpRequest/#handler-xhr-onreadystatechange\\n */\\ngoog.net.XhrLike.prototype.onreadystatechange;\\n\\n\\n/**\\n * @type {string}\\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-responsetext-attribute\\n */\\ngoog.net.XhrLike.prototype.responseText;\\n\\n\\n/**\\n * @type {Document}\\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-responsexml-attribute\\n */\\ngoog.net.XhrLike.prototype.responseXML;\\n\\n\\n/**\\n * @type {number}\\n * @see http://www.w3.org/TR/XMLHttpRequest/#readystate\\n */\\ngoog.net.XhrLike.prototype.readyState;\\n\\n\\n/**\\n * @type {number}\\n * @see http://www.w3.org/TR/XMLHttpRequest/#status\\n */\\ngoog.net.XhrLike.prototype.status;\\n\\n\\n/**\\n * @type {string}\\n * @see http://www.w3.org/TR/XMLHttpRequest/#statustext\\n */\\ngoog.net.XhrLike.prototype.statusText;\\n\\n\\n/**\\n * @param {string} method\\n * @param {string} url\\n * @param {?boolean=} opt_async\\n * @param {?string=} opt_user\\n * @param {?string=} opt_password\\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-open()-method\\n */\\ngoog.net.XhrLike.prototype.open = function(\\n    method, url, opt_async, opt_user, opt_password) {};\\n\\n\\n/**\\n * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=} opt_data\\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-send()-method\\n */\\ngoog.net.XhrLike.prototype.send = function(opt_data) {};\\n\\n\\n/**\\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-abort()-method\\n */\\ngoog.net.XhrLike.prototype.abort = function() {};\\n\\n\\n/**\\n * @param {string} header\\n * @param {string} value\\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method\\n */\\ngoog.net.XhrLike.prototype.setRequestHeader = function(header, value) {};\\n\\n\\n/**\\n * @param {string} header\\n * @return {string}\\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method\\n */\\ngoog.net.XhrLike.prototype.getResponseHeader = function(header) {};\\n\\n\\n/**\\n * @return {string}\\n * @see http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders()-method\\n */\\ngoog.net.XhrLike.prototype.getAllResponseHeaders = function() {};\\n\"],\n\"names\":[\"goog\",\"provide\",\"net\",\"XhrLike\",\"goog.net.XhrLike\",\"OrNative\",\"prototype\",\"onreadystatechange\",\"responseText\",\"responseXML\",\"readyState\",\"status\",\"statusText\",\"open\",\"goog.net.XhrLike.prototype.open\",\"method\",\"url\",\"opt_async\",\"opt_user\",\"opt_password\",\"send\",\"goog.net.XhrLike.prototype.send\",\"opt_data\",\"abort\",\"goog.net.XhrLike.prototype.abort\",\"setRequestHeader\",\"goog.net.XhrLike.prototype.setRequestHeader\",\"header\",\"value\",\"getResponseHeader\",\"goog.net.XhrLike.prototype.getResponseHeader\",\"getAllResponseHeaders\",\"goog.net.XhrLike.prototype.getAllResponseHeaders\"]\n}\n"]