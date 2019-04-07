(ns dpham.cv.panels.skills
  (:require
   [reagent.core :as reagent]
   [re-frame.core :refer [subscribe dispatch reg-sub reg-event-db]]
   [dpham.cv.db :refer [register-ui-field]]
   [dpham.cv.components.core :refer [cs panel-style with-styles custom-theme]]
   [dpham.cv.components.app-bar :refer [app-bar]]
   [dpham.cv.components.markdown :refer [markdown]]
   [dpham.cv.components.plot-network :refer [network]]
   [goog.object :as gobj]
   ["@material-ui/core" :as mui]
   ["@material-ui/icons/KeyboardArrowRight" :default ic-keyboard-arrow-right]
   ["@material-ui/icons/ExpandMore" :default ic-expand-more]
   ["@material-ui/icons/ExpandLess" :default ic-expand-less]
   ["react-plotly.js" :default react-plotly]))

(def primary-color (.. custom-theme -palette -primary -main))
(def default-skills-tab :languages)

(let [skills-explanation-tab (register-ui-field [:skills-tab] :language)]
  (reg-event-db
   ::set-skills-tab
   (fn [db query-v] (skills-explanation-tab db query-v)))

  (reg-sub
   ::skills-tab
   :<- [:ui-states]
   (fn [m _] (skills-explanation-tab m))))

(let [skills-plots-tab (register-ui-field [:plots-tab] :hard-skills)]
  (reg-event-db
   ::set-plots-tab
   (fn [db query-v] (skills-plots-tab db query-v)))

  (reg-sub
   ::plots-tab
   :<- [:ui-states]
   (fn [m _] (skills-plots-tab m))))

(reg-sub
 ::skills-data
 (fn [_]
   [(subscribe [:data-by-id :skills])
    (subscribe [::skills-tab])])
 (fn [[m id]]
   (get m id (get m default-skills-tab))))

(defn hard-skills-plot []
  (let [data (subscribe [:data-by-id :hard-skills])
        cross-filter-dispatch
        (fn [section-cycle x]
          (when-let [index (-> (.-points x) first .-pointIndex)]
            (dispatch [::set-skills-tab (nth section-cycle index)])))]
    (fn []
      [:> mui/Grid {:item true :xs 12 :lg 12}
       [:> mui/Grid
        [:> mui/Card
         [:> mui/CardHeader
          {:title "Skills Summary"
           :subheader "A picture is worth a thousand words. Hover the dots
for more details."}]
         [:> mui/CardContent
          (when @data
            (let [records (reverse @data)
                  x (mapv #(js/parseInt (:level %)) records)
                  y (mapv :subject records)
                  text (mapv :desc records)
                  section (mapv (comp keyword :section) records)
                  section-cycle (conj section (first section))]
              [:> react-plotly
               {:data [{:r (conj x (first x))
                        :theta (conj y (first y))
                        :text (conj text (first text)) :type "scatterpolar"
                        :hoverinfo "text"
                        :fill :toself
                        :marker {:color primary-color}}]
                :layout {:autosize true :margin {:l 80 :t 30 :b 30 :r 80}
                         :polar {:radialaxis {:visible true :range [0 100]}}}
                :config {:displayModeBar false}
                :style {:width "100%" :height "100%"}
                :useResizeHandler true
                :onHover (partial cross-filter-dispatch section-cycle)
                :onClick (partial cross-filter-dispatch section-cycle)}]))]]]])))

(defn programming-skills-plot []
  (let [data (subscribe [:data-by-id :programming-skills])]
    (fn []
      (when @data
        [:> mui/Grid {:item true :xs 12 :lg 12}
         [:> mui/Grid
          [:> mui/Card
           [:> mui/CardHeader
            {:title "Programming Skills"
             :subheader "My internal graph of programming skills.
Nodes are programming languages and the edges are the links I personally
used to communicate between them. Node and edges size represent
my experience in the language or the interaction."}]
          [:> mui/CardContent
           [network @data]]]]]))))

(defmulti plots-cards identity :default :hard-skills)
(defmethod plots-cards :hard-skills [_] [hard-skills-plot])
(defmethod plots-cards :programming-skills [_] [programming-skills-plot])

(defn content-card [section description]
  [:> mui/Grid {:item true :xs 12 :md 12}
   [:> mui/Card {:elevation 0}
    [:> mui/CardHeader {:title section :subheader
                        (reagent/as-element [markdown description])}]]])

(defn content-cards [skills-key]
  (let [data (subscribe [::skills-data])]
    (fn [skills-key]
      (when @data
        (let [content
              (for [{:keys [section description]} (get @data :sections)]
                ^{:key section} [content-card section description])]
          [:> mui/Grid
           [:> mui/Card
            [:> mui/CardHeader
             {:title (reagent/as-element [markdown (:title @data)])
              :subheader (reagent/as-element [markdown (:subheader @data)])}]
            [:> mui/CardContent
             [:> mui/Grid {:container true} content]]]])))))

(defn init-event []
  (dispatch [:request-local-data :hard-skills {:filename "hard_skills.csv"}])
  (dispatch [:request-local-data :skills {:filename "skills.json"}])
  (dispatch [:request-local-data :programming-skills
             {:filename "programming_skills.json"}]))


(defn plots-cards-tabs []
  (let [plots-tab (subscribe [::plots-tab])]
    (fn []
      [:> mui/Tabs {:value (-> @plots-tab (or :hard-skills) symbol str)
                    :onChange #(dispatch [::set-plots-tab (keyword %)])
                    :indicatorColor :primary :textColor :primary
                    :variant "scrollable" :scrollButtons "on"}
       [:> mui/Tab
        {:label "Summary" :value "hard-skills" :onClick
         #(dispatch [::set-plots-tab :hard-skills])}]
       [:> mui/Tab
        {:label "Programming" :value "programming-skills"
         :onClick #(dispatch [::set-plots-tab :programming-skills])}]])))


(defn skills-cards-tabs []
  (let [skills-tab (subscribe [::skills-tab])]
    (fn []
      [:> mui/Tabs {:value (-> @skills-tab (or :languages) symbol str)
                    :onChange #(dispatch [::set-skills-tab (keyword %)])
                    :indicatorColor :primary :textColor :primary
                    :variant "scrollable" :scrollButtons "on"}
       [:> mui/Tab
        {:label "Language" :value "languages" :onClick
         #(dispatch [::set-skills-tab :languages])}]
       [:> mui/Tab
        {:label "Personality" :value "personality"
         :onClick #(dispatch [::set-skills-tab :personality])}]
       [:> mui/Tab
        {:label "Data analysis" :value "data-analysis"
         :onClick #(dispatch [::set-skills-tab :data-analysis])}]
       [:> mui/Tab
        {:label "Software Engineering" :value "software-engineering"
         :onClick #(dispatch [::set-skills-tab :software-engineering])}]])))

(defn root-panel [m]
  (init-event)
  (let [plots-tab (subscribe [::plots-tab])
        skills-tab (subscribe [::skills-tab])
        skills-data (subscribe [::skills-data])]
    (fn [{:keys [classes] :as props}]
      [:main {:class (cs (gobj/get classes "content"))}
       [:div {:class (cs (gobj/get classes "appBarSpacer"))}]
       [:> mui/Grid {:container true :justify :space-around
                     :alignItems :flex-start :spacing 40}
        [:> mui/Grid {:item true :xs 12 :lg 6}
         [:> mui/Paper
          [plots-cards-tabs]
          [plots-cards @plots-tab]]]
        [:> mui/Grid {:item true :xs 12 :lg 6}
         [:> mui/Paper
          (when @skills-data
            [:<>
             [skills-cards-tabs]
             [content-cards]])]]]])))

(defn root [] [:> (with-styles [panel-style] root-panel)])

(comment
  (subscribe [:data-by-id :hard-skills])
  (do
    (dispatch [:initialise-db])
    (dpham.cv.core/main)
    (dispatch [:set-active-panel :skills]))

  (let [data @(subscribe [::skills-data])]
    (->>
     (map (fn [k] [k (reagent/as-element [markdown (k data)])]) [:title :subheader])
     )))


