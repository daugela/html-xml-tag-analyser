import {
  ANALYSIS_START,
  ANALYSIS_SUCCESS,
  ANALYSIS_ERROR,
  HistoryState,
  AnalysisStartAction,
  AnalysisSuccessAction,
  AnalysisErrorAction,
  UrlEntry,
} from "../types";

const initialState = {
  loading: false,
  error: null,
  entries: [],
} as HistoryState;

const historyReducer = (
  state = initialState,
  action: AnalysisStartAction | AnalysisSuccessAction | AnalysisErrorAction
) => {
  switch (action.type) {
    case ANALYSIS_START: {
      return {
        ...state,
        loading: true,
        authenticated: false,
      } as HistoryState;
    }
    case ANALYSIS_SUCCESS: {
      const newEntry = {
        ...action.payload.stats,
        timestamp: Date.now(),
      } as UrlEntry; // Add timestamp
      const entries = state.entries.filter(
        (item: UrlEntry) => item.url !== newEntry.url
      ); // Filter out previously created duplicates if any

      return {
        ...state,
        loading: false,
        error: null,
        entries: [newEntry, ...entries].slice(0, 5), // Limit amount of entries to 5 by removing oldest
      } as HistoryState;
      // TODO: Consider more inteligent filter to identify same urls with http/https prefixes
    }
    case ANALYSIS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      } as HistoryState;

    default:
      return state as HistoryState;
  }
};

export default historyReducer;
