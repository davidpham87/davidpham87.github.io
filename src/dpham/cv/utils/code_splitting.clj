(ns dpham.cv.utils.code-splitting)

(defmacro lazy-component
  ([the-sym]
   `(dpham.cv.utils.code-splitting/lazy-component* (shadow.lazy/loadable ~the-sym))))
