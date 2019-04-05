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
   [:> mui/Fade {:in true :timeout 1000}
    [:> mui/Paper
     [:> mui/Grid {:container true :justify :space-between}
      [:> mui/Grid {:item true :xs 0 :sm 1 :md 3 :style {:padding 20}}]
      [:> mui/Grid {:item true :xs 12 :sm 10 :md 6 :style {:padding 20}}
       [:> mui/Grid {:container true :justify :center}
        [:> mui/Grid {:item true}
         [:img
          {:src "/images/photo_casual.jpg"
           :style {:object-fit :cover :width "100%" :height "100%" :max-width 300 :max-height 300 :margin 0 :border-radius "25%"} ;; :float :right
           :title "If you want to see me in a suit, visit my LinkedIn profile :-)"}]]]
       [markdown {:style {:font-size "large"}}
        "# Welcome to my online resume!

This simple website is built with wrappers around `Javascript` and `ReactJS`,
using `ClojureScript`."]
       [:<> (rest (nav-icons))]
       [markdown {:style {:font-size "large"}}
        "
# Why?

It demonstrates my ability to create dashboard with `react`, `plotly`, `google
closure` (for dead code elimination) and my ability to compose text with
`markdown`. The two tabs professional experience and education are derived from
data, while the *skills* panel shows cross-filtering between a plot and
information.

Although my core skills rely on data analysis, the expectations around my output
increased considerably and it would be impossible to meet them without different
type of technologies. This project aims to show that I can learn skills outside
of core skills."]]
      [:> mui/Grid {:item true :xs 0 :sm 1 :md 3 :style {:padding 20}}]]]]])

(defn root [] [:> (with-styles [panel-style] root-panel)])

