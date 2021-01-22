import axios from "axios";
import { Dispatch } from "redux";
import {
  ANALYSIS_START,
  ANALYSIS_SUCCESS,
  ANALYSIS_ERROR,
  AnalysisRequest,
} from "../types";

const analyze = (url: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ANALYSIS_START });

      const query = {
        url: url,
      } as AnalysisRequest;

      const response = await axios.post("/process-tags", query);

      // Slow down a bit for some UI elegance
      setTimeout(() => {
        if (response.status === 200) {
          dispatch({
            type: ANALYSIS_SUCCESS,
            payload: { url: url, stats: { ...response.data } },
          });
        } else {
          dispatch({
            type: ANALYSIS_ERROR,
            payload: {
              error: {
                message: "Request failed debug needed",
              },
            },
          });
        }
      }, 900);
    } catch (error) {
      dispatch({
        type: ANALYSIS_ERROR,
        payload: {
          error: {
            message: "Connectivity issues, unreachable URL or other error",
          },
        },
      });
    }
  };
};

export const apiActions = { analyze };
