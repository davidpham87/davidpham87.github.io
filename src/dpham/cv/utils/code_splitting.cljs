(ns dpham.cv.utils.code-splitting
  (:require-macros [dpham.cv.utils.code-splitting])
  (:require
   ["react" :as react]
   [reagent.core :as reagent]
   [shadow.lazy :as lazy]))

(defn lazy-component*
  ([loadable]
   (react/lazy
    (fn []
      (-> (lazy/load loadable)
          (.then (fn [root-el]
                   (if goog.DEBUG
                     #js {:default (reagent/reactify-component (fn [] [@loadable]))}
                     #js {:default (reagent/reactify-component root-el)}))))))))
