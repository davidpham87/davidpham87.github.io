(ns dpham.cv.panels.welcome
  (:require
   [reagent.core :as reagent]
   [re-frame.core :refer [subscribe dispatch]]
   [dpham.cv.router :refer [tabs nav-icons]]
   [dpham.cv.components.core :refer [cs panel-style with-styles custom-theme]]
   [dpham.cv.components.app-bar :refer [app-bar]]
   [dpham.cv.components.markdown :refer [markdown]]
   [goog.object :as gobj]
   ["@material-ui/core" :as mui]))

(def <sub (comp deref subscribe))
(def >evt dispatch)

(defn root-panel [{:keys [classes] :as props}]
  [:main {:class (cs (gobj/get classes "content"))}
   [:div {:class (cs (gobj/get classes "appBarSpacer"))}]
   [:> mui/Paper {:style {:flex "1 0 auto"}}
    [:> mui/Grid {:container true :justify :space-between}
     [:> mui/Grid {:item true :xs 8 :style {:padding 20}}
      [:> mui/Typography {:variant "h2" :gutterBottom true :paragraph true }
       "Welcome to my online resume!"]
     [markdown
       "This simple website is built with wrapper around `Javascript` and `ReactJS`,
       using `Clojurescript`. It demonstrates my ability to create dashboard
       with `react`, `plotly` and my ability to compose text with `markdown`."]
      [:<> (rest (nav-icons))]]
     [:> mui/Grid {:item true :xs 4}
      [:> mui/CardMedia
       {:src "/images/photo_casual.jpg"
        :component "img"
        :style {:width :auto :height :auto :max-height 300 :margin 0 :float :right}
        :title "If you want to see me in a suit, visit my LinkedIn profile :-)"}]]]]])

(defn root [] [:> (with-styles [panel-style] root-panel)])
