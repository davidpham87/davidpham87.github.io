(ns dpham.cv.core
  (:require [reagent.core :as reagent]
            [dpham.cv.views :refer [app]]
            [dpham.cv.events]
            [dpham.cv.subs]))

(defn ^:export main []
  (reagent/render [app] (.getElementById js/document "app")))

