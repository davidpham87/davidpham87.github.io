(ns dpham.cv.components.plot-network
  (:require
   [reagent.core :as reagent]
   [re-frame.core :refer [dispatch]]
   [dpham.cv.components.colors :refer [simple-palette]]
   ["react-d3-graph" :as rdg]))

(def force-layout (reagent/adapt-react-class rdg/Graph))

(defn mouse-over [node]
  (.log js/console (.-dispatchConfig node)))

#_(defn network [{:keys [nodes links]}] nil)


(defn component-dimension [comp]
  (let [node (reagent/dom-node comp)]
    {:width (.-clientWidth node) :height (.-clientHeight node)}))

(defn network-did-mount [{:keys [nodes links]} {:keys [height width]}]
  (let [value->name (zipmap (mapv :value nodes) (mapv :name nodes))
        name->color (zipmap (mapv :name nodes) (cycle simple-palette))
        graph-nodes
        (-> (for [{:keys [name xp value]} nodes]
              ^{:key (str value)}
              {:id name :color (name->color name) :size (* xp 200)})
            doall)
        graph-links
        (-> (for [{:keys [source target value]} links]
              ^{:key (str source "-" target)}
              {:source (value->name (inc source))
               :target (value->name (inc target))
               :strokeWidth (* 1.5 value)})
            doall)
        config {:d3 {:gravity -300
                     :linkLength 100}
                :link {:type "CURVE_SMOOTH"}
                :focusAnimationDuration 3000
                :automaticRearrangeAfterDropNode true
                :focusZoom 1.5
                :height (max height 600)
                :width (max width 380)}]
    [:> rdg/Graph
     {:id "graph"
      :config config
      :data {:focusedNodeId (-> graph-nodes first :id)
             :nodes (clj->js graph-nodes)
             :links (clj->js graph-links)}}]))

(defn network [{:keys [nodes links]}]
  (let [dom-comp (reagent/atom nil)
        dom-size (reagent/atom {:width 600 :height 600})
        did-mount-fn
        (fn [comp]
          (js/setTimeout
           #(reset! dom-size (component-dimension @dom-comp))
           3000))]
    (fn [{:keys [nodes links]}]
      (reagent/create-class
       {:component-did-mount did-mount-fn
        :reagent-render
        (fn [m]
          [:div {:style {:width "100%" :height "70vh"} :ref #(reset! dom-comp %)}
           [network-did-mount {:nodes nodes :links links} @dom-size]])}))))

(comment
  (dispatch [:initialise-db])
  (dpham.cv.core/main))
