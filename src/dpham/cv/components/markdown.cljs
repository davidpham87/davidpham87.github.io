(ns dpham.cv.components.markdown
  (:require
   [reagent.core :as reagent]
   [dpham.cv.components.core :refer [with-styles cs]]
   [goog.object :as gobj]
   ["@material-ui/core" :as mui]
   ["markdown-to-jsx" :default react-markdown]))

;; add marginTop to externs!
(.log js/console "TODO: add marginTop to externs!")

(defn li-style [theme]
  #js {:listItem #js {:marginTop (.spacing theme 1)}})

(defn li-comp [{:keys [classes] :as props}]
  [:li {:class (cs (gobj/get "listItem"))}
   [:> mui/Typography {:component "span"} props]])

(defn typography [gutterBottom variant paragraph]
  (fn [props]
    (let [props (or (.-children props) props)]
      (reagent/as-element
       [:> mui/Typography {:guterrBottom true
                           :variant variant :component variant
                           :paragraph paragraph} props]))))

(def options
  {:overrides
   {:h1 {:component (typography true "h4" false)}}
   {:h2 {:component (typography true "h6" false)}}
   {:h3 {:component (typography true "subtitle1" false)}}
   {:h4 {:component (typography true "caption" true)}}
   {:p {:component (typography false "p" true)}}
   {:a {:component mui/Link}}
   {:li {:component (fn [props] [:> (with-styles [li-style] li-comp) props])}}})

(defn markdown [& props]
  (let [markdown-options (if (map? (first props))
                           (assoc (first props) :options options)
                           {:options options})
        markdown-props (if (map? (first props)) (last props) (first props))]
    [:> react-markdown markdown-options markdown-props]))
