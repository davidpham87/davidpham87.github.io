(ns dpham.cv.subs
  (:require [re-frame.core :refer [reg-sub subscribe]]))

(reg-sub
 :active-panel           ;; usage: (subscribe [:active-page])
 (fn [db _]             ;; db is the (map) value stored in the app-db atom
   (:active-panel db)))  ;; extract a value from the application state

(reg-sub
 :ui-states
 (fn [db _]
   (get-in db [:ui-states] {})))

(reg-sub
 :ui-states/drawer-open?
 (fn [db _]
   (get-in db [:ui-states :drawer-open?] false)))

(reg-sub
 :ui-states/drawer-displayed-sublists
 (fn [db _]
   (get-in db [:ui-states :drawer-displayed-sublists] false)))

(reg-sub
 :data
 (fn [db _]
   (:data db)))

(reg-sub
 :data-by-id
 :<- [:data]
 (fn [data [_ data-id]]
   (get data data-id)))

