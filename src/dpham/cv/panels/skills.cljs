(ns dpham.cv.panels.skills
  (:require
   ["@material-ui/core" :as mui]
   ["@material-ui/core/colors" :as mui-colors]
   ["react-plotly.js" :default react-plotly]
   ["react-vis" :as rv]
   [clojure.string :as str]
   [dpham.cv.components.core :refer [cs panel-style with-styles custom-theme]]
   [dpham.cv.components.markdown :refer [markdown]]
   [dpham.cv.components.plot-network :refer [network]]
   [dpham.cv.db :refer [register-ui-field]]
   [goog.object :as gobj]
   [re-frame.core :refer [subscribe dispatch reg-sub reg-event-db]]
   [reagent.core :as reagent]))

(def primary-color (.. custom-theme -palette -primary -main))
(def reds (mapv #(gobj/get (.-red mui-colors) (* 100 %)) [5 7 9]))
(def blues (mapv #(gobj/get (.-blue mui-colors) (* 100 %)) [5 7 9]))
(def yellows (mapv #(gobj/get (.-yellow mui-colors) (* 100 %)) [4 6]))
(def browns (mapv #(gobj/get (.-brown mui-colors) (* 100 %)) [4 6]))
(def purples (mapv #(gobj/get (.-purple mui-colors) (* 100 %)) [4 6]))
(def greys (mapv #(gobj/get (.-grey mui-colors) (* 100 %)) [4 6]))
(def oranges (mapv #(gobj/get (.-orange mui-colors) (* 100 %)) [4 6]))
(def palette (vec (concat reds blues yellows oranges)))
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


(defn plot [data label]
  (let [cross-filter-dispatch
        (fn [d]
          (dispatch [::set-skills-tab (gobj/get d "section")]))]
    (fn []
      (when data
        (let [records (mapv #(-> % (update :level js/parseInt)) data)
              y (mapv :subject records)
              data (map-indexed
                    (fn [i m] (assoc m :radius0 (+ 2 (/ i 2) 0.4) :radius (+ 2 (/ i 2) 0.8)
                                     :color i))
                    records)]
          [:> rv/XYPlot
           {:x-domain [-85 100]
            :y-domain [(- (+ 2 (count y))) (+ 2 (count y))]
            :color-type :category
            :height 480
            :width 960
            :get-angle (fn [m]
                         (* 2 (.-PI js/Math) (/ (gobj/get m "level") 100)))
            :get-angle-0 (fn [_] 0)}
           [:> rv/ArcSeries
            {:animation {:damping 9
                         :stiffness 300}
             :radius-domain [0 (+ (/ (count y) 2) 2.8)]
             :on-value-mouse-over (fn [d] (reset! label (gobj/get d "subject")) (cross-filter-dispatch d))
             :on-value-click (fn [d] (reset! label (gobj/get d "subject")) (cross-filter-dispatch d))
             :color-range (vec palette)
             :data data}]])))))

#_(defn plot []
  (let [data (subscribe [:data-by-id :hard-skills])
        cross-filter-dispatch
        (fn [section-cycle x]
          (when-let [index (-> (.-points x) first .-pointIndex)]
            (dispatch [::set-skills-tab (nth section-cycle index)])))]
    (fn []
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
            :on-hover (partial cross-filter-dispatch section-cycle)
            :on-click (partial cross-filter-dispatch section-cycle)}])))))

(defn hard-skills-plot []
  (let [data (subscribe [:data-by-id :hard-skills])
        label (reagent/atom "")]
    (fn []
      [:> mui/Grid {:item true :xs 12 :lg 12}
       [:> mui/Grid
        [:> mui/Card
         [:> mui/CardHeader
          {:title "Skills Summary"
           :subheader "A picture is worth a thousand words. Hover the series for more details."}]
         [:> mui/CardContent
          [:div {:style {:color :black :display :absolute :height 0 :width 0}}
           [:div {:style {:display :absolute :width 200 :font-size 22}}
            (str @label)]]
          [:div {:style {:display :flex :justify-content :center}}
           [:div {:style {:display :flex}}
            [plot @data label]]]]]]])))

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
    [:> mui/CardHeader
     {:title section :subheader
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
             [:> mui/Grid {:container true}
              content]]]])))))

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
         :on-click #(dispatch [::set-plots-tab :programming-skills])}]])))


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
         :on-click #(dispatch [::set-skills-tab :personality])}]
       [:> mui/Tab
        {:label "Data analysis" :value "data-analysis"
         :on-click #(dispatch [::set-skills-tab :data-analysis])}]
       [:> mui/Tab
        {:label "Software Engineering" :value "software-engineering"
         :on-click #(dispatch [::set-skills-tab :software-engineering])}]])))

(defn root-panel [m]
  (init-event)
  (let [plots-tab (subscribe [::plots-tab])
        skills-data (subscribe [::skills-data])]
    (fn [{:keys [classes]}]
      [:main {:class (cs (gobj/get classes "content"))}
       [:div {:class (cs (gobj/get classes "appBarSpacer"))}]
       [:> mui/Grid {:container true :justify :space-around
                     :alignItems :flex-start :spacing 4}
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
  @(subscribe [:data-by-id :hard-skills])
  (do
    (dispatch [:initialise-db])
    (dpham.cv.core/main)
    (dispatch [:set-active-panel :skills]))

  (let [data @(subscribe [::skills-data])]
    (->>
     (map (fn [k] [k (reagent/as-element [markdown (k data)])]) [:title :subheader])
     )))
