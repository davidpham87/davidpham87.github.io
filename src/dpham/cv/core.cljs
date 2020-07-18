(ns dpham.cv.core
  (:require [reagent.dom :as dom]
            [dpham.cv.views :refer [app]]
            [dpham.cv.events]
            [dpham.cv.subs]))

(defn ^:export main []
  (dom/render [app] (.getElementById js/document "app")))

(defn ^:dev/after-load start []
  (main))
