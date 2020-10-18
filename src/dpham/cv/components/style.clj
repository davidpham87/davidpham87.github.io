(ns dpham.cv.components.style
  (:require [emotion.core]))

(defmacro defstyled [sym component & styles]
  (let [[component
         options] (if (sequential? component) component [component])
        options   (assoc options :class-name-prop :className)]
    `(emotion.core/defstyled ~sym [~component ~options]
       ~@styles)))
