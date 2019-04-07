(ns dpham.cv.views
  (:require
   [reagent.core  :as reagent]
   [re-frame.core :refer [subscribe dispatch]]
   [dpham.cv.utils.code-splitting :refer (lazy-component)]
   [dpham.cv.components.core :refer [cs panel-style with-styles custom-theme]]
   [dpham.cv.components.app-bar :refer [app-bar]]

   [dpham.cv.panels.education :rename {root education}]
   #_[dpham.cv.panels.skills :rename {root skills}]
   [dpham.cv.panels.welcome :rename {root welcome}]
   [dpham.cv.panels.work :rename {root work}]

   [clojure.string :as str :refer [trim split join]]
   [goog.object :as gobj]
   ["@material-ui/core" :as mui]
   ["react" :as react]))

(def <sub (comp deref subscribe))
(def >evt dispatch)

(def skills (lazy-component dpham.cv.panels.skills/root))

(defmulti active-panel identity :default :home)

(defmethod active-panel :home [_] [welcome])
(defmethod active-panel :work [_] [work])
(defmethod active-panel :education [_] [education])
(defmethod active-panel :skills [_] [:> skills])

(defn loading-panel [{:keys [classes] :as props}]
  [:main {:class (cs (gobj/get classes "content"))}
   [:div {:class (cs (gobj/get classes "appBarSpacer"))}]
   [:> mui/Fade {:in true}
    [:> mui/Grid {:container true :justify :space-around}
     [:> mui/Grid {:item true :xs 4}]
     [:> mui/Grid {:item true :xs 4}
      [:> mui/Card
       [:> mui/CardContent
        [:> mui/Typography {:variant :h6} "Loading..."]]]]
     [:> mui/Grid {:item true :xs 4}]]]])

(defn loading []
  [:> (with-styles [panel-style] loading-panel)])


(defn app []
  (let [panel (subscribe [:active-panel])]
    (fn []
      [:div {:style {:display "flex"}}
       [:> mui/CssBaseline]
       [:> mui/MuiThemeProvider {:theme custom-theme}
        [:> app-bar]
        [:> react/Suspense
         {:fallback (reagent/as-element [loading])}
         [active-panel @panel]]]])))

(comment
  (def app-node (.getElementById js/document "app"))
  (dispatch [:initialise-db])
  (reagent/render [active-panel (<sub [:active-panel])] app-node)
  (reagent/render [app] app-node)
  (reagent/render (fn [] [:div "Hello"]) (.getElementById js/document "app"))
  (dpham.cv.core/main)
  (dispatch [:set-active-panel :work]))
