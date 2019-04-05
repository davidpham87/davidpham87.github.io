["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/async/animationdelay.js"],"~:js","goog.provide(\"goog.async.AnimationDelay\");\ngoog.require(\"goog.Disposable\");\ngoog.require(\"goog.events\");\ngoog.require(\"goog.functions\");\n/**\n @final\n @struct\n @constructor\n @extends {goog.Disposable}\n @param {function(this:THIS,number)} listener\n @param {Window=} opt_window\n @param {THIS=} opt_handler\n @template THIS\n */\ngoog.async.AnimationDelay = function(listener, opt_window, opt_handler) {\n  goog.async.AnimationDelay.base(this, \"constructor\");\n  /** @private @type {(?goog.events.Key|number)} */ this.id_ = null;\n  /** @private @type {?boolean} */ this.usingListeners_ = false;\n  /** @private @const */ this.listener_ = listener;\n  /** @private @const @type {(THIS|undefined)} */ this.handler_ = opt_handler;\n  /** @private @type {Window} */ this.win_ = opt_window || window;\n  /** @private @type {function()} */ this.callback_ = goog.bind(this.doAction_, this);\n};\ngoog.inherits(goog.async.AnimationDelay, goog.Disposable);\n/** @const @type {number} */ goog.async.AnimationDelay.TIMEOUT = 20;\n/** @private @const @type {string} */ goog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_ = \"MozBeforePaint\";\ngoog.async.AnimationDelay.prototype.start = function() {\n  this.stop();\n  this.usingListeners_ = false;\n  var raf = this.getRaf_();\n  var cancelRaf = this.getCancelRaf_();\n  if (raf && !cancelRaf && this.win_.mozRequestAnimationFrame) {\n    this.id_ = goog.events.listen(this.win_, goog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_, this.callback_);\n    this.win_.mozRequestAnimationFrame(null);\n    this.usingListeners_ = true;\n  } else {\n    if (raf && cancelRaf) {\n      this.id_ = raf.call(this.win_, this.callback_);\n    } else {\n      this.id_ = this.win_.setTimeout(goog.functions.lock(this.callback_), goog.async.AnimationDelay.TIMEOUT);\n    }\n  }\n};\ngoog.async.AnimationDelay.prototype.startIfNotActive = function() {\n  if (!this.isActive()) {\n    this.start();\n  }\n};\ngoog.async.AnimationDelay.prototype.stop = function() {\n  if (this.isActive()) {\n    var raf = this.getRaf_();\n    var cancelRaf = this.getCancelRaf_();\n    if (raf && !cancelRaf && this.win_.mozRequestAnimationFrame) {\n      goog.events.unlistenByKey(this.id_);\n    } else {\n      if (raf && cancelRaf) {\n        cancelRaf.call(this.win_, /** @type {number} */ (this.id_));\n      } else {\n        this.win_.clearTimeout(/** @type {number} */ (this.id_));\n      }\n    }\n  }\n  this.id_ = null;\n};\ngoog.async.AnimationDelay.prototype.fire = function() {\n  this.stop();\n  this.doAction_();\n};\ngoog.async.AnimationDelay.prototype.fireIfActive = function() {\n  if (this.isActive()) {\n    this.fire();\n  }\n};\n/**\n @return {boolean}\n */\ngoog.async.AnimationDelay.prototype.isActive = function() {\n  return this.id_ != null;\n};\n/** @private */ goog.async.AnimationDelay.prototype.doAction_ = function() {\n  if (this.usingListeners_ && this.id_) {\n    goog.events.unlistenByKey(this.id_);\n  }\n  this.id_ = null;\n  this.listener_.call(this.handler_, goog.now());\n};\n/** @override */ goog.async.AnimationDelay.prototype.disposeInternal = function() {\n  this.stop();\n  goog.async.AnimationDelay.base(this, \"disposeInternal\");\n};\n/**\n @private\n @return {?function(function(number)):number}\n */\ngoog.async.AnimationDelay.prototype.getRaf_ = function() {\n  var win = this.win_;\n  return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame || null;\n};\n/**\n @private\n @return {?function(number):undefined}\n */\ngoog.async.AnimationDelay.prototype.getCancelRaf_ = function() {\n  var win = this.win_;\n  return win.cancelAnimationFrame || win.cancelRequestAnimationFrame || win.webkitCancelRequestAnimationFrame || win.mozCancelRequestAnimationFrame || win.oCancelRequestAnimationFrame || win.msCancelRequestAnimationFrame || null;\n};\n","~:source","// Copyright 2012 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview A delayed callback that pegs to the next animation frame\n * instead of a user-configurable timeout.\n *\n * @author nicksantos@google.com (Nick Santos)\n */\n\ngoog.provide('goog.async.AnimationDelay');\n\ngoog.require('goog.Disposable');\ngoog.require('goog.events');\ngoog.require('goog.functions');\n\n\n\n// TODO(nicksantos): Should we factor out the common code between this and\n// goog.async.Delay? I'm not sure if there's enough code for this to really\n// make sense. Subclassing seems like the wrong approach for a variety of\n// reasons. Maybe there should be a common interface?\n\n\n\n/**\n * A delayed callback that pegs to the next animation frame\n * instead of a user configurable timeout. By design, this should have\n * the same interface as goog.async.Delay.\n *\n * Uses requestAnimationFrame and friends when available, but falls\n * back to a timeout of goog.async.AnimationDelay.TIMEOUT.\n *\n * For more on requestAnimationFrame and how you can use it to create smoother\n * animations, see:\n * @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/\n *\n * @param {function(this:THIS, number)} listener Function to call\n *     when the delay completes. Will be passed the timestamp when it's called,\n *     in unix ms.\n * @param {Window=} opt_window The window object to execute the delay in.\n *     Defaults to the global object.\n * @param {THIS=} opt_handler The object scope to invoke the function in.\n * @template THIS\n * @constructor\n * @struct\n * @extends {goog.Disposable}\n * @final\n */\ngoog.async.AnimationDelay = function(listener, opt_window, opt_handler) {\n  goog.async.AnimationDelay.base(this, 'constructor');\n\n  /**\n   * Identifier of the active delay timeout, or event listener,\n   * or null when inactive.\n   * @private {?goog.events.Key|number}\n   */\n  this.id_ = null;\n\n  /**\n   * If we're using dom listeners.\n   * @private {?boolean}\n   */\n  this.usingListeners_ = false;\n\n  /**\n   * The function that will be invoked after a delay.\n   * @const\n   * @private\n   */\n  this.listener_ = listener;\n\n  /**\n   * The object context to invoke the callback in.\n   * @const\n   * @private {(THIS|undefined)}\n   */\n  this.handler_ = opt_handler;\n\n  /**\n   * @private {Window}\n   */\n  this.win_ = opt_window || window;\n\n  /**\n   * Cached callback function invoked when the delay finishes.\n   * @private {function()}\n   */\n  this.callback_ = goog.bind(this.doAction_, this);\n};\ngoog.inherits(goog.async.AnimationDelay, goog.Disposable);\n\n\n/**\n * Default wait timeout for animations (in milliseconds).  Only used for timed\n * animation, which uses a timer (setTimeout) to schedule animation.\n *\n * @type {number}\n * @const\n */\ngoog.async.AnimationDelay.TIMEOUT = 20;\n\n\n/**\n * Name of event received from the requestAnimationFrame in Firefox.\n *\n * @type {string}\n * @const\n * @private\n */\ngoog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_ = 'MozBeforePaint';\n\n\n/**\n * Starts the delay timer. The provided listener function will be called\n * before the next animation frame.\n */\ngoog.async.AnimationDelay.prototype.start = function() {\n  this.stop();\n  this.usingListeners_ = false;\n\n  var raf = this.getRaf_();\n  var cancelRaf = this.getCancelRaf_();\n  if (raf && !cancelRaf && this.win_.mozRequestAnimationFrame) {\n    // Because Firefox (Gecko) runs animation in separate threads, it also saves\n    // time by running the requestAnimationFrame callbacks in that same thread.\n    // Sadly this breaks the assumption of implicit thread-safety in JS, and can\n    // thus create thread-based inconsistencies on counters etc.\n    //\n    // Calling cycleAnimations_ using the MozBeforePaint event instead of as\n    // callback fixes this.\n    //\n    // Trigger this condition only if the mozRequestAnimationFrame is available,\n    // but not the W3C requestAnimationFrame function (as in draft) or the\n    // equivalent cancel functions.\n    this.id_ = goog.events.listen(\n        this.win_, goog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_,\n        this.callback_);\n    this.win_.mozRequestAnimationFrame(null);\n    this.usingListeners_ = true;\n  } else if (raf && cancelRaf) {\n    this.id_ = raf.call(this.win_, this.callback_);\n  } else {\n    this.id_ = this.win_.setTimeout(\n        // Prior to Firefox 13, Gecko passed a non-standard parameter\n        // to the callback that we want to ignore.\n        goog.functions.lock(this.callback_), goog.async.AnimationDelay.TIMEOUT);\n  }\n};\n\n\n/**\n * Starts the delay timer if it's not already active.\n */\ngoog.async.AnimationDelay.prototype.startIfNotActive = function() {\n  if (!this.isActive()) {\n    this.start();\n  }\n};\n\n\n/**\n * Stops the delay timer if it is active. No action is taken if the timer is not\n * in use.\n */\ngoog.async.AnimationDelay.prototype.stop = function() {\n  if (this.isActive()) {\n    var raf = this.getRaf_();\n    var cancelRaf = this.getCancelRaf_();\n    if (raf && !cancelRaf && this.win_.mozRequestAnimationFrame) {\n      goog.events.unlistenByKey(this.id_);\n    } else if (raf && cancelRaf) {\n      cancelRaf.call(this.win_, /** @type {number} */ (this.id_));\n    } else {\n      this.win_.clearTimeout(/** @type {number} */ (this.id_));\n    }\n  }\n  this.id_ = null;\n};\n\n\n/**\n * Fires delay's action even if timer has already gone off or has not been\n * started yet; guarantees action firing. Stops the delay timer.\n */\ngoog.async.AnimationDelay.prototype.fire = function() {\n  this.stop();\n  this.doAction_();\n};\n\n\n/**\n * Fires delay's action only if timer is currently active. Stops the delay\n * timer.\n */\ngoog.async.AnimationDelay.prototype.fireIfActive = function() {\n  if (this.isActive()) {\n    this.fire();\n  }\n};\n\n\n/**\n * @return {boolean} True if the delay is currently active, false otherwise.\n */\ngoog.async.AnimationDelay.prototype.isActive = function() {\n  return this.id_ != null;\n};\n\n\n/**\n * Invokes the callback function after the delay successfully completes.\n * @private\n */\ngoog.async.AnimationDelay.prototype.doAction_ = function() {\n  if (this.usingListeners_ && this.id_) {\n    goog.events.unlistenByKey(this.id_);\n  }\n  this.id_ = null;\n\n  // We are not using the timestamp returned by requestAnimationFrame\n  // because it may be either a Date.now-style time or a\n  // high-resolution time (depending on browser implementation). Using\n  // goog.now() will ensure that the timestamp used is consistent and\n  // compatible with goog.fx.Animation.\n  this.listener_.call(this.handler_, goog.now());\n};\n\n\n/** @override */\ngoog.async.AnimationDelay.prototype.disposeInternal = function() {\n  this.stop();\n  goog.async.AnimationDelay.base(this, 'disposeInternal');\n};\n\n\n/**\n * @return {?function(function(number)): number} The requestAnimationFrame\n *     function, or null if not available on this browser.\n * @private\n */\ngoog.async.AnimationDelay.prototype.getRaf_ = function() {\n  var win = this.win_;\n  return win.requestAnimationFrame || win.webkitRequestAnimationFrame ||\n      win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||\n      win.msRequestAnimationFrame || null;\n};\n\n\n/**\n * @return {?function(number): undefined} The cancelAnimationFrame function,\n *     or null if not available on this browser.\n * @private\n */\ngoog.async.AnimationDelay.prototype.getCancelRaf_ = function() {\n  var win = this.win_;\n  return win.cancelAnimationFrame || win.cancelRequestAnimationFrame ||\n      win.webkitCancelRequestAnimationFrame ||\n      win.mozCancelRequestAnimationFrame || win.oCancelRequestAnimationFrame ||\n      win.msCancelRequestAnimationFrame || null;\n};\n","~:compiled-at",1554428132803,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.async.animationdelay.js\",\n\"lineCount\":107,\n\"mappings\":\"AAqBAA,IAAAC,QAAA,CAAa,2BAAb,CAAA;AAEAD,IAAAE,QAAA,CAAa,iBAAb,CAAA;AACAF,IAAAE,QAAA,CAAa,aAAb,CAAA;AACAF,IAAAE,QAAA,CAAa,gBAAb,CAAA;AAmCA;;;;;;;;;;AAAAF,IAAAG,MAAAC,eAAA,GAA4BC,QAAQ,CAACC,QAAD,EAAWC,UAAX,EAAuBC,WAAvB,CAAoC;AACtER,MAAAG,MAAAC,eAAAK,KAAA,CAA+B,IAA/B,EAAqC,aAArC,CAAA;AAOA,oDAAA,IAAAC,IAAA,GAAW,IAAX;AAMA,mCAAA,IAAAC,gBAAA,GAAuB,KAAvB;AAOA,yBAAA,IAAAC,UAAA,GAAiBN,QAAjB;AAOA,kDAAA,IAAAO,SAAA,GAAgBL,WAAhB;AAKA,iCAAA,IAAAM,KAAA,GAAYP,UAAZ,IAA0BQ,MAA1B;AAMA,qCAAA,IAAAC,UAAA,GAAiBhB,IAAAiB,KAAA,CAAU,IAAAC,UAAV,EAA0B,IAA1B,CAAjB;AAvCsE,CAAxE;AAyCAlB,IAAAmB,SAAA,CAAcnB,IAAAG,MAAAC,eAAd,EAAyCJ,IAAAoB,WAAzC,CAAA;AAUA,6BAAApB,IAAAG,MAAAC,eAAAiB,QAAA,GAAoC,EAApC;AAUA,sCAAArB,IAAAG,MAAAC,eAAAkB,wBAAA,GAAoD,gBAApD;AAOAtB,IAAAG,MAAAC,eAAAmB,UAAAC,MAAA,GAA4CC,QAAQ,EAAG;AACrD,MAAAC,KAAA,EAAA;AACA,MAAAf,gBAAA,GAAuB,KAAvB;AAEA,MAAIgB,MAAM,IAAAC,QAAA,EAAV;AACA,MAAIC,YAAY,IAAAC,cAAA,EAAhB;AACA,MAAIH,GAAJ,IAAW,CAACE,SAAZ,IAAyB,IAAAf,KAAAiB,yBAAzB,CAA6D;AAY3D,QAAArB,IAAA,GAAWV,IAAAgC,OAAAC,OAAA,CACP,IAAAnB,KADO,EACId,IAAAG,MAAAC,eAAAkB,wBADJ,EAEP,IAAAN,UAFO,CAAX;AAGA,QAAAF,KAAAiB,yBAAA,CAAmC,IAAnC,CAAA;AACA,QAAApB,gBAAA,GAAuB,IAAvB;AAhB2D,GAA7D;AAiBO,QAAIgB,GAAJ,IAAWE,SAAX;AACL,UAAAnB,IAAA,GAAWiB,GAAAO,KAAA,CAAS,IAAApB,KAAT,EAAoB,IAAAE,UAApB,CAAX;AADK;AAGL,UAAAN,IAAA,GAAW,IAAAI,KAAAqB,WAAA,CAGPnC,IAAAoC,UAAAC,KAAA,CAAoB,IAAArB,UAApB,CAHO,EAG8BhB,IAAAG,MAAAC,eAAAiB,QAH9B,CAAX;AAHK;AAjBP;AANqD,CAAvD;AAqCArB,IAAAG,MAAAC,eAAAmB,UAAAe,iBAAA,GAAuDC,QAAQ,EAAG;AAChE,MAAI,CAAC,IAAAC,SAAA,EAAL;AACE,QAAAhB,MAAA,EAAA;AADF;AADgE,CAAlE;AAWAxB,IAAAG,MAAAC,eAAAmB,UAAAG,KAAA,GAA2Ce,QAAQ,EAAG;AACpD,MAAI,IAAAD,SAAA,EAAJ,CAAqB;AACnB,QAAIb,MAAM,IAAAC,QAAA,EAAV;AACA,QAAIC,YAAY,IAAAC,cAAA,EAAhB;AACA,QAAIH,GAAJ,IAAW,CAACE,SAAZ,IAAyB,IAAAf,KAAAiB,yBAAzB;AACE/B,UAAAgC,OAAAU,cAAA,CAA0B,IAAAhC,IAA1B,CAAA;AADF;AAEO,UAAIiB,GAAJ,IAAWE,SAAX;AACLA,iBAAAK,KAAA,CAAe,IAAApB,KAAf,wBAAgD,CAAC,IAAAJ,IAAD,CAAhD,CAAA;AADK;AAGL,YAAAI,KAAA6B,aAAA,uBAA6C,CAAC,IAAAjC,IAAD,CAA7C,CAAA;AAHK;AAFP;AAHmB;AAWrB,MAAAA,IAAA,GAAW,IAAX;AAZoD,CAAtD;AAoBAV,IAAAG,MAAAC,eAAAmB,UAAAqB,KAAA,GAA2CC,QAAQ,EAAG;AACpD,MAAAnB,KAAA,EAAA;AACA,MAAAR,UAAA,EAAA;AAFoD,CAAtD;AAUAlB,IAAAG,MAAAC,eAAAmB,UAAAuB,aAAA,GAAmDC,QAAQ,EAAG;AAC5D,MAAI,IAAAP,SAAA,EAAJ;AACE,QAAAI,KAAA,EAAA;AADF;AAD4D,CAA9D;AAUA;;;AAAA5C,IAAAG,MAAAC,eAAAmB,UAAAiB,SAAA,GAA+CQ,QAAQ,EAAG;AACxD,SAAO,IAAAtC,IAAP,IAAmB,IAAnB;AADwD,CAA1D;AASA,gBAAAV,IAAAG,MAAAC,eAAAmB,UAAAL,UAAA,GAAgD+B,QAAQ,EAAG;AACzD,MAAI,IAAAtC,gBAAJ,IAA4B,IAAAD,IAA5B;AACEV,QAAAgC,OAAAU,cAAA,CAA0B,IAAAhC,IAA1B,CAAA;AADF;AAGA,MAAAA,IAAA,GAAW,IAAX;AAOA,MAAAE,UAAAsB,KAAA,CAAoB,IAAArB,SAApB,EAAmCb,IAAAkD,IAAA,EAAnC,CAAA;AAXyD,CAA3D;AAgBA,iBAAAlD,IAAAG,MAAAC,eAAAmB,UAAA4B,gBAAA,GAAsDC,QAAQ,EAAG;AAC/D,MAAA1B,KAAA,EAAA;AACA1B,MAAAG,MAAAC,eAAAK,KAAA,CAA+B,IAA/B,EAAqC,iBAArC,CAAA;AAF+D,CAAjE;AAWA;;;;AAAAT,IAAAG,MAAAC,eAAAmB,UAAAK,QAAA,GAA8CyB,QAAQ,EAAG;AACvD,MAAIC,MAAM,IAAAxC,KAAV;AACA,SAAOwC,GAAAC,sBAAP,IAAoCD,GAAAE,4BAApC,IACIF,GAAAvB,yBADJ,IACoCuB,GAAAG,uBADpC,IAEIH,GAAAI,wBAFJ,IAEmC,IAFnC;AAFuD,CAAzD;AAaA;;;;AAAA1D,IAAAG,MAAAC,eAAAmB,UAAAO,cAAA,GAAoD6B,QAAQ,EAAG;AAC7D,MAAIL,MAAM,IAAAxC,KAAV;AACA,SAAOwC,GAAAM,qBAAP,IAAmCN,GAAAO,4BAAnC,IACIP,GAAAQ,kCADJ,IAEIR,GAAAS,+BAFJ,IAE0CT,GAAAU,6BAF1C,IAGIV,GAAAW,8BAHJ,IAGyC,IAHzC;AAF6D,CAA/D;;\",\n\"sources\":[\"goog/async/animationdelay.js\"],\n\"sourcesContent\":[\"// Copyright 2012 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview A delayed callback that pegs to the next animation frame\\n * instead of a user-configurable timeout.\\n *\\n * @author nicksantos@google.com (Nick Santos)\\n */\\n\\ngoog.provide('goog.async.AnimationDelay');\\n\\ngoog.require('goog.Disposable');\\ngoog.require('goog.events');\\ngoog.require('goog.functions');\\n\\n\\n\\n// TODO(nicksantos): Should we factor out the common code between this and\\n// goog.async.Delay? I'm not sure if there's enough code for this to really\\n// make sense. Subclassing seems like the wrong approach for a variety of\\n// reasons. Maybe there should be a common interface?\\n\\n\\n\\n/**\\n * A delayed callback that pegs to the next animation frame\\n * instead of a user configurable timeout. By design, this should have\\n * the same interface as goog.async.Delay.\\n *\\n * Uses requestAnimationFrame and friends when available, but falls\\n * back to a timeout of goog.async.AnimationDelay.TIMEOUT.\\n *\\n * For more on requestAnimationFrame and how you can use it to create smoother\\n * animations, see:\\n * @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/\\n *\\n * @param {function(this:THIS, number)} listener Function to call\\n *     when the delay completes. Will be passed the timestamp when it's called,\\n *     in unix ms.\\n * @param {Window=} opt_window The window object to execute the delay in.\\n *     Defaults to the global object.\\n * @param {THIS=} opt_handler The object scope to invoke the function in.\\n * @template THIS\\n * @constructor\\n * @struct\\n * @extends {goog.Disposable}\\n * @final\\n */\\ngoog.async.AnimationDelay = function(listener, opt_window, opt_handler) {\\n  goog.async.AnimationDelay.base(this, 'constructor');\\n\\n  /**\\n   * Identifier of the active delay timeout, or event listener,\\n   * or null when inactive.\\n   * @private {?goog.events.Key|number}\\n   */\\n  this.id_ = null;\\n\\n  /**\\n   * If we're using dom listeners.\\n   * @private {?boolean}\\n   */\\n  this.usingListeners_ = false;\\n\\n  /**\\n   * The function that will be invoked after a delay.\\n   * @const\\n   * @private\\n   */\\n  this.listener_ = listener;\\n\\n  /**\\n   * The object context to invoke the callback in.\\n   * @const\\n   * @private {(THIS|undefined)}\\n   */\\n  this.handler_ = opt_handler;\\n\\n  /**\\n   * @private {Window}\\n   */\\n  this.win_ = opt_window || window;\\n\\n  /**\\n   * Cached callback function invoked when the delay finishes.\\n   * @private {function()}\\n   */\\n  this.callback_ = goog.bind(this.doAction_, this);\\n};\\ngoog.inherits(goog.async.AnimationDelay, goog.Disposable);\\n\\n\\n/**\\n * Default wait timeout for animations (in milliseconds).  Only used for timed\\n * animation, which uses a timer (setTimeout) to schedule animation.\\n *\\n * @type {number}\\n * @const\\n */\\ngoog.async.AnimationDelay.TIMEOUT = 20;\\n\\n\\n/**\\n * Name of event received from the requestAnimationFrame in Firefox.\\n *\\n * @type {string}\\n * @const\\n * @private\\n */\\ngoog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_ = 'MozBeforePaint';\\n\\n\\n/**\\n * Starts the delay timer. The provided listener function will be called\\n * before the next animation frame.\\n */\\ngoog.async.AnimationDelay.prototype.start = function() {\\n  this.stop();\\n  this.usingListeners_ = false;\\n\\n  var raf = this.getRaf_();\\n  var cancelRaf = this.getCancelRaf_();\\n  if (raf && !cancelRaf && this.win_.mozRequestAnimationFrame) {\\n    // Because Firefox (Gecko) runs animation in separate threads, it also saves\\n    // time by running the requestAnimationFrame callbacks in that same thread.\\n    // Sadly this breaks the assumption of implicit thread-safety in JS, and can\\n    // thus create thread-based inconsistencies on counters etc.\\n    //\\n    // Calling cycleAnimations_ using the MozBeforePaint event instead of as\\n    // callback fixes this.\\n    //\\n    // Trigger this condition only if the mozRequestAnimationFrame is available,\\n    // but not the W3C requestAnimationFrame function (as in draft) or the\\n    // equivalent cancel functions.\\n    this.id_ = goog.events.listen(\\n        this.win_, goog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_,\\n        this.callback_);\\n    this.win_.mozRequestAnimationFrame(null);\\n    this.usingListeners_ = true;\\n  } else if (raf && cancelRaf) {\\n    this.id_ = raf.call(this.win_, this.callback_);\\n  } else {\\n    this.id_ = this.win_.setTimeout(\\n        // Prior to Firefox 13, Gecko passed a non-standard parameter\\n        // to the callback that we want to ignore.\\n        goog.functions.lock(this.callback_), goog.async.AnimationDelay.TIMEOUT);\\n  }\\n};\\n\\n\\n/**\\n * Starts the delay timer if it's not already active.\\n */\\ngoog.async.AnimationDelay.prototype.startIfNotActive = function() {\\n  if (!this.isActive()) {\\n    this.start();\\n  }\\n};\\n\\n\\n/**\\n * Stops the delay timer if it is active. No action is taken if the timer is not\\n * in use.\\n */\\ngoog.async.AnimationDelay.prototype.stop = function() {\\n  if (this.isActive()) {\\n    var raf = this.getRaf_();\\n    var cancelRaf = this.getCancelRaf_();\\n    if (raf && !cancelRaf && this.win_.mozRequestAnimationFrame) {\\n      goog.events.unlistenByKey(this.id_);\\n    } else if (raf && cancelRaf) {\\n      cancelRaf.call(this.win_, /** @type {number} */ (this.id_));\\n    } else {\\n      this.win_.clearTimeout(/** @type {number} */ (this.id_));\\n    }\\n  }\\n  this.id_ = null;\\n};\\n\\n\\n/**\\n * Fires delay's action even if timer has already gone off or has not been\\n * started yet; guarantees action firing. Stops the delay timer.\\n */\\ngoog.async.AnimationDelay.prototype.fire = function() {\\n  this.stop();\\n  this.doAction_();\\n};\\n\\n\\n/**\\n * Fires delay's action only if timer is currently active. Stops the delay\\n * timer.\\n */\\ngoog.async.AnimationDelay.prototype.fireIfActive = function() {\\n  if (this.isActive()) {\\n    this.fire();\\n  }\\n};\\n\\n\\n/**\\n * @return {boolean} True if the delay is currently active, false otherwise.\\n */\\ngoog.async.AnimationDelay.prototype.isActive = function() {\\n  return this.id_ != null;\\n};\\n\\n\\n/**\\n * Invokes the callback function after the delay successfully completes.\\n * @private\\n */\\ngoog.async.AnimationDelay.prototype.doAction_ = function() {\\n  if (this.usingListeners_ && this.id_) {\\n    goog.events.unlistenByKey(this.id_);\\n  }\\n  this.id_ = null;\\n\\n  // We are not using the timestamp returned by requestAnimationFrame\\n  // because it may be either a Date.now-style time or a\\n  // high-resolution time (depending on browser implementation). Using\\n  // goog.now() will ensure that the timestamp used is consistent and\\n  // compatible with goog.fx.Animation.\\n  this.listener_.call(this.handler_, goog.now());\\n};\\n\\n\\n/** @override */\\ngoog.async.AnimationDelay.prototype.disposeInternal = function() {\\n  this.stop();\\n  goog.async.AnimationDelay.base(this, 'disposeInternal');\\n};\\n\\n\\n/**\\n * @return {?function(function(number)): number} The requestAnimationFrame\\n *     function, or null if not available on this browser.\\n * @private\\n */\\ngoog.async.AnimationDelay.prototype.getRaf_ = function() {\\n  var win = this.win_;\\n  return win.requestAnimationFrame || win.webkitRequestAnimationFrame ||\\n      win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||\\n      win.msRequestAnimationFrame || null;\\n};\\n\\n\\n/**\\n * @return {?function(number): undefined} The cancelAnimationFrame function,\\n *     or null if not available on this browser.\\n * @private\\n */\\ngoog.async.AnimationDelay.prototype.getCancelRaf_ = function() {\\n  var win = this.win_;\\n  return win.cancelAnimationFrame || win.cancelRequestAnimationFrame ||\\n      win.webkitCancelRequestAnimationFrame ||\\n      win.mozCancelRequestAnimationFrame || win.oCancelRequestAnimationFrame ||\\n      win.msCancelRequestAnimationFrame || null;\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"async\",\"AnimationDelay\",\"goog.async.AnimationDelay\",\"listener\",\"opt_window\",\"opt_handler\",\"base\",\"id_\",\"usingListeners_\",\"listener_\",\"handler_\",\"win_\",\"window\",\"callback_\",\"bind\",\"doAction_\",\"inherits\",\"Disposable\",\"TIMEOUT\",\"MOZ_BEFORE_PAINT_EVENT_\",\"prototype\",\"start\",\"goog.async.AnimationDelay.prototype.start\",\"stop\",\"raf\",\"getRaf_\",\"cancelRaf\",\"getCancelRaf_\",\"mozRequestAnimationFrame\",\"events\",\"listen\",\"call\",\"setTimeout\",\"functions\",\"lock\",\"startIfNotActive\",\"goog.async.AnimationDelay.prototype.startIfNotActive\",\"isActive\",\"goog.async.AnimationDelay.prototype.stop\",\"unlistenByKey\",\"clearTimeout\",\"fire\",\"goog.async.AnimationDelay.prototype.fire\",\"fireIfActive\",\"goog.async.AnimationDelay.prototype.fireIfActive\",\"goog.async.AnimationDelay.prototype.isActive\",\"goog.async.AnimationDelay.prototype.doAction_\",\"now\",\"disposeInternal\",\"goog.async.AnimationDelay.prototype.disposeInternal\",\"goog.async.AnimationDelay.prototype.getRaf_\",\"win\",\"requestAnimationFrame\",\"webkitRequestAnimationFrame\",\"oRequestAnimationFrame\",\"msRequestAnimationFrame\",\"goog.async.AnimationDelay.prototype.getCancelRaf_\",\"cancelAnimationFrame\",\"cancelRequestAnimationFrame\",\"webkitCancelRequestAnimationFrame\",\"mozCancelRequestAnimationFrame\",\"oCancelRequestAnimationFrame\",\"msCancelRequestAnimationFrame\"]\n}\n"]