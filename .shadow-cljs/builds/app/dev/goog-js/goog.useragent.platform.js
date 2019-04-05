["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/useragent/platform.js"],"~:js","goog.provide(\"goog.userAgent.platform\");\ngoog.require(\"goog.string\");\ngoog.require(\"goog.userAgent\");\n/**\n @private\n @return {string}\n */\ngoog.userAgent.platform.determineVersion_ = function() {\n  var re;\n  if (goog.userAgent.WINDOWS) {\n    re = /Windows NT ([0-9.]+)/;\n    var match = re.exec(goog.userAgent.getUserAgentString());\n    if (match) {\n      return match[1];\n    } else {\n      return \"0\";\n    }\n  } else {\n    if (goog.userAgent.MAC) {\n      re = /10[_.][0-9_.]+/;\n      var match = re.exec(goog.userAgent.getUserAgentString());\n      return match ? match[0].replace(/_/g, \".\") : \"10\";\n    } else {\n      if (goog.userAgent.ANDROID) {\n        re = /Android\\s+([^\\);]+)(\\)|;)/;\n        var match = re.exec(goog.userAgent.getUserAgentString());\n        return match ? match[1] : \"\";\n      } else {\n        if (goog.userAgent.IPHONE || goog.userAgent.IPAD || goog.userAgent.IPOD) {\n          re = /(?:iPhone|CPU)\\s+OS\\s+(\\S+)/;\n          var match = re.exec(goog.userAgent.getUserAgentString());\n          return match ? match[1].replace(/_/g, \".\") : \"\";\n        }\n      }\n    }\n  }\n  return \"\";\n};\n/** @type {string} */ goog.userAgent.platform.VERSION = goog.userAgent.platform.determineVersion_();\n/**\n @param {(string|number)} version\n @return {boolean}\n */\ngoog.userAgent.platform.isVersion = function(version) {\n  return goog.string.compareVersions(goog.userAgent.platform.VERSION, version) >= 0;\n};\n","~:source","// Copyright 2010 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Utilities for getting details about the user's platform.\n */\n\ngoog.provide('goog.userAgent.platform');\n\ngoog.require('goog.string');\ngoog.require('goog.userAgent');\n\n\n/**\n * Detects the version of the OS/platform the browser is running in. Not\n * supported for Linux, where an empty string is returned.\n *\n * @private\n * @return {string} The platform version.\n */\ngoog.userAgent.platform.determineVersion_ = function() {\n  var re;\n  if (goog.userAgent.WINDOWS) {\n    re = /Windows NT ([0-9.]+)/;\n    var match = re.exec(goog.userAgent.getUserAgentString());\n    if (match) {\n      return match[1];\n    } else {\n      return '0';\n    }\n  } else if (goog.userAgent.MAC) {\n    re = /10[_.][0-9_.]+/;\n    var match = re.exec(goog.userAgent.getUserAgentString());\n    // Note: some old versions of Camino do not report an OSX version.\n    // Default to 10.\n    return match ? match[0].replace(/_/g, '.') : '10';\n  } else if (goog.userAgent.ANDROID) {\n    re = /Android\\s+([^\\);]+)(\\)|;)/;\n    var match = re.exec(goog.userAgent.getUserAgentString());\n    return match ? match[1] : '';\n  } else if (\n      goog.userAgent.IPHONE || goog.userAgent.IPAD || goog.userAgent.IPOD) {\n    re = /(?:iPhone|CPU)\\s+OS\\s+(\\S+)/;\n    var match = re.exec(goog.userAgent.getUserAgentString());\n    // Report the version as x.y.z and not x_y_z\n    return match ? match[1].replace(/_/g, '.') : '';\n  }\n\n  return '';\n};\n\n\n/**\n * The version of the platform. We don't determine the version of Linux.\n * For Windows, we only look at the NT version. Non-NT-based versions\n * (e.g. 95, 98, etc.) are given version 0.0.\n * @type {string}\n */\ngoog.userAgent.platform.VERSION = goog.userAgent.platform.determineVersion_();\n\n\n/**\n * Whether the user agent platform version is higher or the same as the given\n * version.\n *\n * @param {string|number} version The version to check.\n * @return {boolean} Whether the user agent platform version is higher or the\n *     same as the given version.\n */\ngoog.userAgent.platform.isVersion = function(version) {\n  return goog.string.compareVersions(\n             goog.userAgent.platform.VERSION, version) >= 0;\n};\n","~:compiled-at",1554428132884,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.useragent.platform.js\",\n\"lineCount\":47,\n\"mappings\":\"AAkBAA,IAAAC,QAAA,CAAa,yBAAb,CAAA;AAEAD,IAAAE,QAAA,CAAa,aAAb,CAAA;AACAF,IAAAE,QAAA,CAAa,gBAAb,CAAA;AAUA;;;;AAAAF,IAAAG,UAAAC,SAAAC,kBAAA,GAA4CC,QAAQ,EAAG;AACrD,MAAIC,EAAJ;AACA,MAAIP,IAAAG,UAAAK,QAAJ,CAA4B;AAC1BD,MAAA,GAAK,sBAAL;AACA,QAAIE,QAAQF,EAAAG,KAAA,CAAQV,IAAAG,UAAAQ,mBAAA,EAAR,CAAZ;AACA,QAAIF,KAAJ;AACE,aAAOA,KAAA,CAAM,CAAN,CAAP;AADF;AAGE,aAAO,GAAP;AAHF;AAH0B,GAA5B;AAQO,QAAIT,IAAAG,UAAAS,IAAJ,CAAwB;AAC7BL,QAAA,GAAK,gBAAL;AACA,UAAIE,QAAQF,EAAAG,KAAA,CAAQV,IAAAG,UAAAQ,mBAAA,EAAR,CAAZ;AAGA,aAAOF,KAAA,GAAQA,KAAA,CAAM,CAAN,CAAAI,QAAA,CAAiB,IAAjB,EAAuB,GAAvB,CAAR,GAAsC,IAA7C;AAL6B,KAAxB;AAMA,UAAIb,IAAAG,UAAAW,QAAJ,CAA4B;AACjCP,UAAA,GAAK,2BAAL;AACA,YAAIE,QAAQF,EAAAG,KAAA,CAAQV,IAAAG,UAAAQ,mBAAA,EAAR,CAAZ;AACA,eAAOF,KAAA,GAAQA,KAAA,CAAM,CAAN,CAAR,GAAmB,EAA1B;AAHiC,OAA5B;AAIA,YACHT,IAAAG,UAAAY,OADG,IACsBf,IAAAG,UAAAa,KADtB,IAC6ChB,IAAAG,UAAAc,KAD7C,CACkE;AACvEV,YAAA,GAAK,6BAAL;AACA,cAAIE,QAAQF,EAAAG,KAAA,CAAQV,IAAAG,UAAAQ,mBAAA,EAAR,CAAZ;AAEA,iBAAOF,KAAA,GAAQA,KAAA,CAAM,CAAN,CAAAI,QAAA,CAAiB,IAAjB,EAAuB,GAAvB,CAAR,GAAsC,EAA7C;AAJuE;AALlE;AANA;AARP;AA0BA,SAAO,EAAP;AA5BqD,CAAvD;AAsCA,sBAAAb,IAAAG,UAAAC,SAAAc,QAAA,GAAkClB,IAAAG,UAAAC,SAAAC,kBAAA,EAAlC;AAWA;;;;AAAAL,IAAAG,UAAAC,SAAAe,UAAA,GAAoCC,QAAQ,CAACC,OAAD,CAAU;AACpD,SAAOrB,IAAAsB,OAAAC,gBAAA,CACIvB,IAAAG,UAAAC,SAAAc,QADJ,EACqCG,OADrC,CAAP,IACwD,CADxD;AADoD,CAAtD;;\",\n\"sources\":[\"goog/useragent/platform.js\"],\n\"sourcesContent\":[\"// Copyright 2010 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Utilities for getting details about the user's platform.\\n */\\n\\ngoog.provide('goog.userAgent.platform');\\n\\ngoog.require('goog.string');\\ngoog.require('goog.userAgent');\\n\\n\\n/**\\n * Detects the version of the OS/platform the browser is running in. Not\\n * supported for Linux, where an empty string is returned.\\n *\\n * @private\\n * @return {string} The platform version.\\n */\\ngoog.userAgent.platform.determineVersion_ = function() {\\n  var re;\\n  if (goog.userAgent.WINDOWS) {\\n    re = /Windows NT ([0-9.]+)/;\\n    var match = re.exec(goog.userAgent.getUserAgentString());\\n    if (match) {\\n      return match[1];\\n    } else {\\n      return '0';\\n    }\\n  } else if (goog.userAgent.MAC) {\\n    re = /10[_.][0-9_.]+/;\\n    var match = re.exec(goog.userAgent.getUserAgentString());\\n    // Note: some old versions of Camino do not report an OSX version.\\n    // Default to 10.\\n    return match ? match[0].replace(/_/g, '.') : '10';\\n  } else if (goog.userAgent.ANDROID) {\\n    re = /Android\\\\s+([^\\\\);]+)(\\\\)|;)/;\\n    var match = re.exec(goog.userAgent.getUserAgentString());\\n    return match ? match[1] : '';\\n  } else if (\\n      goog.userAgent.IPHONE || goog.userAgent.IPAD || goog.userAgent.IPOD) {\\n    re = /(?:iPhone|CPU)\\\\s+OS\\\\s+(\\\\S+)/;\\n    var match = re.exec(goog.userAgent.getUserAgentString());\\n    // Report the version as x.y.z and not x_y_z\\n    return match ? match[1].replace(/_/g, '.') : '';\\n  }\\n\\n  return '';\\n};\\n\\n\\n/**\\n * The version of the platform. We don't determine the version of Linux.\\n * For Windows, we only look at the NT version. Non-NT-based versions\\n * (e.g. 95, 98, etc.) are given version 0.0.\\n * @type {string}\\n */\\ngoog.userAgent.platform.VERSION = goog.userAgent.platform.determineVersion_();\\n\\n\\n/**\\n * Whether the user agent platform version is higher or the same as the given\\n * version.\\n *\\n * @param {string|number} version The version to check.\\n * @return {boolean} Whether the user agent platform version is higher or the\\n *     same as the given version.\\n */\\ngoog.userAgent.platform.isVersion = function(version) {\\n  return goog.string.compareVersions(\\n             goog.userAgent.platform.VERSION, version) >= 0;\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"userAgent\",\"platform\",\"determineVersion_\",\"goog.userAgent.platform.determineVersion_\",\"re\",\"WINDOWS\",\"match\",\"exec\",\"getUserAgentString\",\"MAC\",\"replace\",\"ANDROID\",\"IPHONE\",\"IPAD\",\"IPOD\",\"VERSION\",\"isVersion\",\"goog.userAgent.platform.isVersion\",\"version\",\"string\",\"compareVersions\"]\n}\n"]