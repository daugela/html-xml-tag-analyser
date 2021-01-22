import { ErrorMessage } from "./error";

export const ANALYSIS_START = "ANALYSIS_START";
export const ANALYSIS_SUCCESS = "ANALYSIS_SUCCESS";
export const ANALYSIS_ERROR = "ANALYSIS_ERROR";

export interface Stats {
  total: number;
  unique: number;
  top: (string | number)[][];
  deepest: string;
  path: string;
}

// Analysis actions

export interface AnalysisStartAction {
  type: typeof ANALYSIS_START;
}

export interface AnalysisSuccessAction {
  type: typeof ANALYSIS_SUCCESS;
  payload: {
    url: string;
    stats: Stats;
  };
}

export interface AnalysisErrorAction {
  type: typeof ANALYSIS_ERROR;
  payload: { error: ErrorMessage };
}
