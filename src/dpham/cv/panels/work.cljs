(ns dpham.cv.panels.work
  (:require
   [reagent.core :as reagent]
   [re-frame.core :refer [subscribe dispatch reg-sub reg-event-db]]
   [dpham.cv.router :refer [tabs nav-icons]]
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

(defn employment-card
  [{:keys [company job-dsc job-date gain-skills location website]}
   html-text expand-more?]
  (js/console.log @expand-more?)
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
      [:> mui/Typography [:i "Required skills: "] gain-skills]]
     [:> mui/CardActions
      [:> mui/IconButton
       {:style {:marginLeft :auto}
        :onClick #(dispatch [::toggle-work-description-details company])}
       [:> (if @expand-more? ic-expand-less ic-expand-more)]]]
     [:> mui/Collapse {:in @expand-more?}
      [:> mui/CardContent
       [:> mui/List
        (into [:<>] (mapv #(vector :> mui/ListItem  [:> ic-keyboard-arrow-right] % #_(str "\u2022 " %))
                          html-text))]]]]]])

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
  (dispatch [:request-local-data :work-xp {:filename "work-xp.csv"}])
  (dispatch [:request-local-data :work-desc {:filename "work-desc.json"}])
  (.log js/console "TODO: add icon on required skills")
  [:main {:class (cs (gobj/get classes "content"))}
   [:div {:class (cs (gobj/get classes "appBarSpacer"))}]
   [:> mui/Grid {:container true :justify :space-around
                 :alignItems :flex-start :spacing 40}
    [employment-cards]]])

(defn root [] [:> (with-styles [panel-style] root-panel)])

(comment
  (do
    (dpham.cv.core/main)
    (dispatch [:initialise-db])
    (dispatch [:set-active-panel :work]))
  )
