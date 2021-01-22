import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import thunk from "redux-thunk";
import rootReducer from "../reducers";

// All reducers will have their own persistence config for nested attributes

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["historyReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { persistor, store };
