(ns dpham.cv.events
  (:require
   [ajax.core :refer [json-request-format json-response-format]]
   [cljs-time.coerce :refer [to-long]]
   [clojure.string :as str]
   [day8.re-frame.http-fx]
   [day8.re-frame.tracing :refer-macros [fn-traced]]
   [re-frame.core :refer [reg-event-db reg-event-fx reg-fx]]
   [dpham.cv.db :refer [default-db]]))

(reg-event-db
 :initialise-db
 (fn [_ _] default-db))

(reg-event-fx
 :set-active-panel
 (fn [{db :db} [_ panel]] {:db (assoc db :active-panel panel)}))

(reg-event-db
 :ui-states/toggle-drawer
 (fn [db _]
   (update-in db [:ui-states :drawer-open?] (fnil not false))))

(reg-event-db
 :ui-states/toggle-drawer-sublist
 (fn [db [_ sublist-id]]
   (let [path [:ui-states :drawer-displayed-sublists]
         sublists (get-in db path)]
     (update-in db path #(if (contains? sublists sublist-id)
                           (disj % sublist-id) (conj % sublist-id))))))
