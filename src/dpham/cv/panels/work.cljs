(ns dpham.cv.panels.work
  (:require
   [reagent.core :as reagent]
   [re-frame.core :refer [subscribe dispatch reg-sub reg-event-db]]
   [dpham.cv.components.core :refer [cs panel-style with-styles custom-theme]]
   [dpham.cv.components.app-bar :refer [app-bar]]
   [dpham.cv.components.markdown :refer [markdown]]
   [goog.object :as gobj]
   ["@material-ui/core" :as mui]
   ["@material-ui/icons/KeyboardArrowRight" :default ic-keyboard-arrow-right]
   ["@material-ui/icons/ExpandMore" :default ic-expand-more]
   ["@material-ui/icons/ExpandLess" :default ic-expand-less]))

(reg-sub
 ::data-work-desc
 :<- [:data-by-id :work-desc]
 (fn [data _]
   (when data
     (reduce (fn [m {:keys [company html-text]}]
               (assoc m company html-text)) {} data))))

(reg-event-db
 ::toggle-work-description-details
 (fn [db [_ company-id]]
   (let [path [:ui-states :work-description-displayed-details?]
         show-details? (get-in db path)
         update-fn (if (contains? show-details? company-id) disj conj)]
     (update-in db path (fnil update-fn #{}) company-id))))

(reg-sub
 ::work-description-displayed-details?
 :<- [:ui-states]
 (fn [ui-states _]
   (get ui-states :work-description-displayed-details?)))

(defn employment-card-details [html-text]
  [:> mui/CardContent
   [:> mui/List
    (into [:<>]
          (mapv #(vector :> mui/ListItem
                         [:> ic-keyboard-arrow-right]
                         [markdown %]) html-text))]])

(defn employment-card
  [{:keys [company job-dsc job-date gain-skills location website]}
   html-text expand-more?]
  (let [info-label (if @expand-more? "Hide" "Show more")]
    [:> mui/Grid {:item true :xs 12 :md 6}
     [:> mui/Paper
      [:> mui/Card
       [:> mui/CardHeader
        {:title job-dsc
         :subheader
         (reagent/as-element
          [:> mui/Grid {:container true :justify :space-between}
           [:> mui/Grid {:item true}
            [:> mui/Link {:href website} company]
            (str ", " location)]
           [:> mui/Grid {:item true} job-date]])}]
       [:> mui/CardContent
        [:> mui/Typography [:i "Skills: "] gain-skills]]
       [:> mui/CardActions
        [:div {:style {:marginLeft :auto}}
         [:> mui/Button
          {:onClick #(dispatch [::toggle-work-description-details company])
           :style {:color (.. custom-theme -palette -primary -main)}}
          info-label]
         [:> mui/Tooltip {:title info-label}
          [:> mui/IconButton
           {:onClick #(dispatch [::toggle-work-description-details company])}
           [:> (if @expand-more? ic-expand-less ic-expand-more)]]]]]
       [:> mui/Collapse {:in @expand-more?}
        [employment-card-details html-text]]]]]))

(defn employment-cards []
  (let [job-description-items (subscribe [::data-work-desc])
        employment-cards-expand-more?
        (subscribe [::work-description-displayed-details?])]
    (fn []
      (->>
       (for [work-xp @(subscribe [:data-by-id :work-xp])
             :let [company-id (:company work-xp)
                   html-text (get @job-description-items company-id)
                   expand-more?
                   (reagent.core/track!
                    #(contains? (deref %1) %2)
                    employment-cards-expand-more?
                    company-id)]]
         ^{:key (:company work-xp)}
         [employment-card work-xp html-text expand-more?])
       doall
       (into [:<>])))))

(defn root-panel [{:keys [classes] :as props}]
  (dispatch [:request-local-data :work-xp {:filename "work_xp.csv"}])
  (dispatch [:request-local-data :work-desc {:filename "work_desc.json"}])
  [:main {:class (cs (gobj/get classes "content"))}
   [:div {:class (cs (gobj/get classes "appBarSpacer"))}]
   [:> mui/Slide {:direction "up" :in true :timeout 1000}
    [:> mui/Grid {:container true :justify :space-around
                  :alignItems :flex-start :spacing 40}
     [employment-cards]]]])

(defn root [] [:> (with-styles [panel-style] root-panel)])

(comment
  (do
    (dpham.cv.core/main)
    (dispatch [:initialise-db])
    (dispatch [:set-active-panel :work])))


