(ns dpham.cv.router
  (:require
   [reagent.core :as reagent]
   [re-frame.core :refer [dispatch]]
   ["@material-ui/core" :as mui]
   ["@material-ui/icons/Home" :default ic-home]
   ["@material-ui/icons/Work" :default ic-work]
   ["@material-ui/icons/School" :default ic-school]
   ["@material-ui/icons/Code" :default ic-code]
   ["@material-ui/icons/MultilineChart" :default ic-multiline-chart]))

(def tabs
  [{:icon ic-home :panel :home :description "Home"
    :long-description ""}
   {:icon ic-work :panel :work :description "Professional Experience"}
   {:icon ic-school :panel :education :description "Education"}
   {:icon ic-code :panel :skills
    :description "Skills"}])

(defn nav-icon [icon-comp panel description]
  [:> mui/Tooltip {:title description}
   [:> mui/IconButton
    {:onClick #(dispatch [:set-active-panel panel])}
    [:> icon-comp]]])

(defn nav-icons []
  (->
   (for [{:keys [icon panel description]} tabs]
     ^{:key panel} [nav-icon icon panel description])
   doall))
