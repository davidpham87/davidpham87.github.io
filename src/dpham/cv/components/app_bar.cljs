(ns dpham.cv.components.app-bar
  (:require
   [dpham.cv.components.core :refer (custom-theme cs with-styles icon-button)]
   [dpham.cv.router :refer (nav-icons)]
   ["@material-ui/core" :as mui]
   ["@material-ui/icons/Email" :default ic-email]
   ["mdi-material-ui/Linkedin" :default ic-linked-in]
   ["mdi-material-ui/Twitter" :default ic-twitter]))

(defn app-bar-style [theme]
  (let [transitions (.. theme -transitions)
        easing-sharp (.. transitions -easing -sharp)
        duration (.. transitions -duration)]

    #js {:appBar
         #js {:transition
              (.create transitions
                       #js ["width" "margin"]
                       #js {:easing easing-sharp
                            :duration (.-leavingScreen duration)})}}))

;; bad design, should just be hidden
(defn menu-button-style [theme]
  #js {:menuButton #js {:margin-left 12 :margin-right 36}
       :menuButtonHidden #js {:display "none"}})

(defn toolbar-style [theme]
  #js {:toolbar #js {:padding-right 24}
       :title #js {:padding-left 36 :flex-grow 1}})

(defn link-icon [icon-comp link]
  [:> icon-button
   {:size :small :onClick #(.open js/window link "_blank") :color "inherit"}
   [:> icon-comp]])

(defn app-bar-react [{:keys [classes] :as props}]
  [:> mui/AppBar {:color "default"
                  :position "absolute" :class (cs (.-appBar classes))}
   [:> mui/Toolbar {:disableGutters false :class (cs (.-toolbar classes))}
    [:<> (nav-icons)]
    [:> mui/Hidden {:xsDown true}
     [:> mui/Typography {:component "h1" :variant "h6" :color "primary" :no-wrap true
                         :class (cs (.-title classes))}
      "David Pham's CV"]]
    [:div {:style {:margin-left :auto}}
     [link-icon ic-email "mailto:davidpham87@gmail.com"]
     [link-icon ic-twitter "https://twitter.com/LittleFunnyGeek"]
     [link-icon ic-linked-in "https://www.linkedin.com/in/davidpham87/"]]]])

(def app-bar
   (with-styles [app-bar-style menu-button-style toolbar-style] app-bar-react))
