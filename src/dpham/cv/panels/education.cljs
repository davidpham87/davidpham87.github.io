(ns dpham.cv.panels.education
  (:require
   ["@material-ui/core" :as mui]
   ["@material-ui/icons/Close" :default ic-close]
   ["@material-ui/icons/ExpandLess" :default ic-expand-less]
   ["@material-ui/icons/ExpandMore" :default ic-expand-more]
   ["@material-ui/icons/KeyboardArrowRight" :default ic-keyboard-arrow-right]
   ["@material-ui/icons/Link" :default ic-link]
   [dpham.cv.components.core :refer [cs panel-style with-styles custom-theme]]
   [dpham.cv.components.markdown :refer [markdown]]
   [goog.object :as gobj]
   [re-frame.core :refer [subscribe dispatch reg-sub]]
   [reagent.core :as reagent]))

(def primary-color (.. custom-theme -palette -primary -main))

(reg-sub
 ::school-grades-map
 (fn []
   (subscribe [:data-by-id :grades]))
 (fn [data]
   (group-by :school data)))

(defn education-card-details [description]
  [:> mui/CardContent
   [:> mui/List
    (into [:<>]
          (mapv #(vector :> mui/ListItem
                         [:> ic-keyboard-arrow-right]
                         [markdown %]) description))]])

(defn section-title [s]
  [:> mui/Grid {:item true :xs 12}
   [:> mui/Paper
    [:> mui/Card
     [:> mui/CardHeader {:title s
                         :style {:color primary-color}}]]]])

(defn education-card-grades [_ key _]
  (let [grades-data (subscribe [::school-grades-map])
        grades-school (reagent/track! #(get (deref %) key) grades-data)]
    (fn [show? _ name]
      (tap> {:show? @show? :name name})
      ^{:key @show?}
      [:> mui/Dialog {:open @show? :on-close #(reset! show? false)}
       [:> mui/DialogTitle
        [:> mui/Grid {:container true :justify :space-between :alignItems :center}
         [:> mui/Grid {:item true}
          "Grades at " name]
         [:> mui/Grid {:item true}
          [:> mui/IconButton {:on-click #(reset! show? false)}
           [:> ic-close]]]]]
       [:> mui/DialogContent
        [:> mui/List
         (for [{:keys [lectures]} @grades-school]
           ^{:key lectures}
           [:> mui/ListItem
            [:> mui/DialogContentText lectures]])]]])))

(defn education-card [m]
  (let [expand-more? (reagent/atom false)
        show-grades? (reagent/atom false)]
    (fn [{:keys [key degree location name website gpa description graduation-date
                 media] :as m}]
      (let [info-label (if @expand-more? "Hide" "Show more")]
        [:> mui/Grid {:item true :xs 12 :md 6 :lg 4 :style {:height "100%"}}
         [:> mui/Paper {:style {:height "100%"}}
          [:> mui/Card {:style {:height "100%"}}
           [:> mui/CardMedia {:component "img" :src media :style {:height 216}}]
           [:> mui/CardHeader
            {:title degree
             :subheader
             (reagent/as-element
              [:> mui/Grid {:container true :justify :space-between}
               [:> mui/Grid {:item true}
                [:> mui/Link {:href website} name]
                (str ", " location)]
               [:> mui/Grid {:item true} graduation-date]])}]
           [:> mui/CardContent {:style {:height "100%"}}
            [:> mui/Grid {:container true :justify :space-between
                          :alignItems :center}
             [:> mui/Grid {:item true}
              [:> mui/Typography [:i "GPA: "] [markdown gpa]]]
             [:> mui/Grid {:item true}
              [:> mui/Button
               {:on-click #(reset! show-grades? true)
                :style {:color primary-color}}
               "Grades"]
              [education-card-grades show-grades? key name]]]]
           [:> mui/CardActions
            [:div {:style {:marginLeft :auto}}
             [:> mui/Button
              {:onClick #(swap! expand-more? not)
               :style {:color primary-color}}
              info-label]
             [:> mui/Tooltip {:title info-label}
              [:> mui/IconButton
               {:onClick #(swap! expand-more? not)}
               [:> (if @expand-more? ic-expand-less ic-expand-more)]]]]]
           [:> mui/Collapse {:in @expand-more?}
            [education-card-details description]]]]]))))

(defn education-cards []
  (let [education-data (subscribe [:data-by-id :formal-education])]
    (fn []
      [:<> (for [m @education-data]
             ^{:key (:key m)} [education-card m])])))

(defn continuing-education-card
  [m]
  (let [expand-more? (reagent/atom false)]
    (fn [{:keys [key plateform name website description graduation-date
                 verification-link]
          :as m}]
      (let [info-label (if @expand-more? "Hide" "Show more")]
        [:> mui/Grid {:item true :xs 12 :sm 6 :lg 4 :style {:height "100%"}}
         [:> mui/Card {:style {:display :flex :height "100%" :flex-direction :column}}
          [:> mui/CardHeader
           {:title name
            :subheader
            (reagent/as-element
             [:> mui/Grid {:container true :justify :space-between}
              [:> mui/Grid {:item true}
               [:> mui/Link {:href website} plateform]]
              [:> mui/Grid {:item true} graduation-date]])}]
          [:> mui/CardActions {:style {:display :flex :flex-grow 1}}
           (when verification-link
             [:> mui/Tooltip {:title "Link to certificate"}
              [:> mui/IconButton
               {:onClick #(.open js/window verification-link "_blank")
                :color "inherit"}
               [:> ic-link]]])
           [:div {:style {:marginLeft :auto}}
            [:> mui/Button
             {:onClick #(swap! expand-more? not)
              :style {:color primary-color}}
             info-label]
            [:> mui/Tooltip {:title info-label}
             [:> mui/IconButton
              {:onClick #(swap! expand-more? not)}
              [:> (if @expand-more? ic-expand-less ic-expand-more)]]]]]
          [:> mui/Collapse {:in @expand-more?}
           [education-card-details description]]]]))))

(defn continuing-education-cards []
  (let [data (subscribe [:data-by-id :continuing-education])]
    (fn []
      [:<> (for [m @data] ^{:key (:key m)} [continuing-education-card m])])))

(defn init-event []
  (dispatch [:request-local-data :formal-education {:filename "formal_education.json"}])
  (dispatch [:request-local-data :continuing-education {:filename "continuing_education.json"}])
  (dispatch [:request-local-data :grades {:filename "grades.csv"}]))

(defn root-panel [{:keys [classes] :as props}]
  (init-event)
  (let [data (subscribe [:data-by-id :grades])]
    (fn [{:keys [classes] :as props}]
      (when @data
        [:main {:class (cs (gobj/get classes "content"))}
         [:div {:class (cs (gobj/get classes "appBarSpacer"))}]
         [:> mui/Grow {:in true :timeout 1000}
          [:> mui/Grid {:container true
                        :align-items :flex-start :spacing 4}
           [section-title "Education"]
           [education-cards]
           [section-title "Continuing Education"]
           [continuing-education-cards]]]]))))

(defn root [] [:> (with-styles [panel-style] root-panel)])

(comment
  (do
    (dpham.cv.core/main)
    (dispatch [:initialise-db])
    (init-event)
    (dispatch [:set-active-panel :education])))
