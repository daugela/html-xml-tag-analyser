import { ErrorMessage } from "./error";

export interface UrlEntry {
  url: string;
  timestamp: number;
  total: number;
  unique: number;
  deepest: string;
  path: string;
  top: (string | number)[][];
}

export interface HistoryState {
  loading: boolean;
  error: ErrorMessage | null;
  entries: UrlEntry[];
}

// All the items of the Redux store
export interface GlobalReduxState {
  historyReducer: HistoryState;
  // .. to be continued ..
}
