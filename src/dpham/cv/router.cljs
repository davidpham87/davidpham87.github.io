(ns dpham.cv.router
  (:require
   [re-frame.core :refer (dispatch)]
   [dpham.cv.components.core :refer (icon-button)]
   ["@material-ui/core" :as mui]
   ["@material-ui/icons/Home" :default ic-home]
   ["@material-ui/icons/Work" :default ic-work]
   ["@material-ui/icons/School" :default ic-school]
   ["@material-ui/icons/Code" :default ic-code]))

(def tabs
  [{:icon ic-home :panel :home :description "Home"
    :long-description ""}
   {:icon ic-work :panel :work :description "Professional Experience"}
   {:icon ic-school :panel :education :description "Education"}
   {:icon ic-code :panel :skills
    :description "Skills"}])

(defn nav-icon [icon-comp panel description]
  [:> mui/Tooltip {:title description}
   [:> icon-button
    {:size :small :on-click #(dispatch [:set-active-panel panel])}
    [:> icon-comp]]])

(defn nav-icons []
  (-> (for [{:keys [icon panel description]} tabs]
     ^{:key panel} [nav-icon icon panel description])
      doall))
