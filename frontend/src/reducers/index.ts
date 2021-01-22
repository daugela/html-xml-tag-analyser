import storage from "redux-persist/lib/storage"; // defaults to localStorage
import historyReducer from "./history.reducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

// Loading state and error messages will not be persisted as it may cause UI experience issues while reloading page upon errors

const historyPersistConfig = {
  key: "historyReducer",
  storage: storage,
  blacklist: ["loading", "error"],
};

const rootReducer = combineReducers({
  historyReducer: persistReducer(historyPersistConfig, historyReducer),
});

export default rootReducer;
