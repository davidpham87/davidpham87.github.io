(ns dpham.cv.components.core
  (:require
   [reagent.core :as reagent]
   [re-frame.core :as rf :refer [reg-event-db reg-sub]]
   [goog.object :as gobj]
   [clojure.string :as str]

   ["@material-ui/core" :as mui]
   ["@material-ui/core/colors" :as mui-colors]
   ["@material-ui/core/styles" :refer [withStyles createMuiTheme]]))

(defn cs [& names]
  (str/join " " (filter identity names)))

(defn client-width [component]
  (let [node (reagent/dom-node component)]
    (if node (.-clientWidth node) 0)))

(defn combine-style-fns [style-fns]
  (fn [theme]
    (reduce #(.assign js/Object %1 %2) ((apply juxt style-fns) theme))))

(defn with-styles [style-fns component]
  ((withStyles (combine-style-fns style-fns)) (reagent/reactify-component component)))

(defn mui-list-item [[icon text] & {:keys [dispatch-event style]}]
  [:> mui/ListItem {:button true
                    :on-click (when dispatch-event #(rf/dispatch dispatch-event))
                    :style style}
   (when icon [:> mui/ListItemIcon {:style {:padding-left "8px"}}
               [:> icon {:style {:color "white"}}]])
   [:> mui/ListItemText {:primaryTypographyProps #js {:style #js {:color "white"}}
                         :primary text}]])

(def custom-theme
  (createMuiTheme
   #js {:typography {:fontSize 28 :body2 {:fontSize 20}}
        :palette #js {:primary #js {:main (gobj/get (.-red mui-colors) 400)}
                      :secondary #js {:main "#ffd400" :dark "#ca0"}
                      :type "light"
                      :background #js {:default "#404040"}}}))

(defn panel-style [theme]
  (let [drawer-width 240
        transitions (.-transitions theme)
        duration (.-duration transitions)
        easing-sharpe (.. transitions -easing -sharp)]
    #js
    {:appBarSpacer (.. theme -mixins -toolbar)
     :content #js {:flex-grow 1
                   :padding (* 3 (.. theme -spacing -unit))
                   :height "100vh"
                   :overflow "auto"
                   :background-color (.. theme -palette -background -default)}}))
