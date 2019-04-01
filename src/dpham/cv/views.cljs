(ns dpham.cv.views
  (:require
   [reagent.core  :as reagent]
   [re-frame.core :refer [subscribe dispatch]]
   [dpham.cv.components.core :refer [cs panel-style with-styles custom-theme]]
   [dpham.cv.components.app-bar :refer [app-bar]]
   [dpham.cv.panels.welcome :rename {root welcome}]
   [clojure.string :as str :refer [trim split join]]
   [goog.object :as gobj]
   ["@material-ui/core" :as mui]
   ["react" :as react]))

(def <sub (comp deref subscribe))
(def >evt dispatch)

(defmulti active-panel identity :default :welcome)

(defmethod active-panel :welcome [_] welcome)

(defn app []
  [:div {:style {:display "flex"}}
   [:> mui/CssBaseline]
   [:> mui/MuiThemeProvider {:theme custom-theme}
    [:> app-bar]
    [:> react/Suspense
     {:fallback (reagent/as-element [:div {:style {:height "100vh"}} "Loading"])}
     [active-panel (<sub [:active-panel])]]]])

(comment
  (>evt [:initialise-db])
  (reagent/render (fn [] [:div "Hello"]) (.getElementById js/document "app"))
  (dpham.cv.core/main))
