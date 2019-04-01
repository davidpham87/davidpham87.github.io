(ns dpham.cv.components.markdown
  (:require
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
    [:> mui/Typography {:guterrBottom gutterBottom
                        :variant variant :paragraph paragraph} props]))

(def options
  {:overrides
   {:h1 {:component (typography true "h4" false)}}
   {:h2 {:component (typography true "h6" false)}}
   {:h3 {:component (typography true "subtitle1" false)}}
   {:h4 {:component (typography true "caption" true)}}
   {:p {:component (typography false "p" true)}}
   {:a {:component mui/Link}}
   {:li {:component (fn [props] [:> (with-styles [li-style] li-comp) props])}}})

(defn markdown [props]
  [:> react-markdown {:style {:font-size "large"} :options options} props])
