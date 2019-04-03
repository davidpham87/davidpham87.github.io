(ns dpham.cv.events
  (:require
   [ajax.core :as ajax :refer [json-request-format json-response-format]]
   [cljs-time.coerce :refer [to-long]]
   [clojure.string :as str]
   [day8.re-frame.http-fx]
   [day8.re-frame.tracing :refer-macros [fn-traced]]
   [re-frame.core :refer [reg-event-db reg-event-fx reg-fx]]
   [dpham.cv.db :refer [default-db]]
   ["d3" :as d3]))

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

(defn filename-extension [filename]
  (-> filename (str/split ".") last keyword))

(defn xhrio-map
  "Sugar around http-xhrio to around several data format"
  [event data-id request]
  (let [default-request
        {:method :get
         :format (ajax/json-request-format)
         :response-format (ajax/json-response-format {:keywords? true})
         :on-success
         [(keyword (str/join "-" [(name event) "success"])) data-id]
         :on-failure [:api-request-error event data-id]}]
    (merge default-request request)))

(reg-event-fx
 :request-local-data
 (fn
   [{:keys [db]} [event event-id m]]
   (let [file-extension (filename-extension (m :filename "*.csv"))
         format (file-extension {:json (ajax/json-response-format
                                        {:keywords? (:keywordize-keys? m true)})
                                 :csv (ajax/text-response-format)})]
     (if (contains? (:data db {}) event-id)
       {:db db}
       {:db db
        :http-xhrio
        (xhrio-map
         event event-id
         {:uri (str/join "/" ["data" (:filename m)])
          :response-format format
          :on-success [:request-local-data-success event-id file-extension
                       (:mapper m identity)]})}))))

(reg-event-fx
 :request-local-data-success
 (fn
   [{:keys [db]} [_ event-id file-extension mapper result]]
   (let [result
         (case file-extension
           :csv (-> d3 (.csvParse result) (js->clj :keywordize-keys true))
           :json result)
         result-mapped (mapper result)]
     {:db (assoc-in db [:data event-id] result-mapped)})))

(reg-event-fx
 :api-request-error
 (fn-traced
  [{:keys [db]} [_ request-type response]]
  {:db (update-in db [:errors request-type]
                  (fnil conj []) response)}))
