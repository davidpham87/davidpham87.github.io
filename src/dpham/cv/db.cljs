(ns dpham.cv.db
  (:require
   [clojure.spec.alpha :as s]
   [day8.re-frame.tracing :refer-macros [fn-traced]]
   [cljs-time.core :as ct]))

(def default-db
  {:window-size {:height 1080 :width 1920}
  :active-panel :welcome
  :ui-states {}})

(defn register-ui-field
  "Register fields for pulling data for events and subs
  example usage:

  (let [events-lifetime
        (register-ui-field [:fund-monitor/events-lifetime] :default 3000)]

  (reg-event-db
  :set-events-lifetime
  (fn-traced [db query-v] (events-lifetime db query-v)))

  (reg-sub
  :events-lifetime
  :<- [:ui-states]
  (fn-traced [m _] (events-lifetime m)))

  Note: ui states are assumed to be stored into ui-states field of app-db
  Assumptions are ui-states can not be nil."
  [path & {:keys [default]}]
  (fn
    ([m] (get-in m path default))
    ([db [_ value]] (assoc-in db (into [:ui-states] path) (if-not (nil? value) value default)))))


