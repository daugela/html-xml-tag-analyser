import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalReduxState, UrlEntry } from "../types";
import { apiActions } from "../actions";
import { SiteWrapper, Button, Input, HistoryEntry, Stats } from "../components";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col } from "react-grid-system";
import UrlSvg from "../assets/vectors/icon-url.svg";
import Logo from "../assets/vectors/logo.svg";
import Close from "../assets/vectors/close.svg";

const MainPage = (props: RouteComponentProps): JSX.Element => {
  const [url, setUrl] = useState<string>("");
  const [displayResults, setDisplayResults] = useState<boolean>(false);

  const [stats, setStats] = useState<UrlEntry | null>(null);

  const [validationError, setValidationError] = useState<string | null>(null);

  const dispatch = useDispatch();
  // Use refs ability to hold value as recommended in https://reactjs.org/docs/hooks-reference.html#useref
  // We will leverage it to detect initial render
  const initialRender = useRef(true);

  const { history, apiError, loading } = useSelector(
    (state: GlobalReduxState) => ({
      history: state.historyReducer.entries,
      apiError: state.historyReducer.error,
      loading: state.historyReducer.loading,
    })
  );

  useEffect(() => {
    // Always take the initial stats from history
    setStats(history[0]);
    // Show stats when history changes - but NOT on the initial page render
    initialRender.current
      ? (initialRender.current = false)
      : setDisplayResults(true);
    setUrl("");
  }, [history]);

  const validateFields = () => {
    setValidationError(null); //Reset existing errors if any
    let error = null as null | string; // Define new empty error message (initial)
    const urlFormat = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    const httpFormat = /^https?:\/\//;
    if (!urlFormat.test(String(url).toLowerCase()))
      error = "Please enter valid URL";
    if (!httpFormat.test(String(url).toLowerCase()))
      error = "URL should start with http:// or https://";
    if (url.length > 50)
      error = "Only URLs up to 50 characters are currently accepted";

    if (error) {
      setValidationError(error); // Save collected message to state if any..
    } else {
      dispatch(apiActions.analyze(url)); // Validation succeeded - call backend for analysis
    }
  };

  const retrieveHistoryItem = (index: number) => {
    setStats(history[index]);
    setDisplayResults(true);
  };

  return (
    <>
      <div className="page--background">
        <div className="content">
          <SiteWrapper>
            <Row justify="center">
              <Col lg={4} md={6} sm={12}>
                <div className="form__container">
                  <img
                    src={Logo}
                    alt="Tag logo"
                    style={{ width: "20%", marginBottom: "32px" }}
                  />

                  <div className="flip__wrapper">
                    <div
                      className={
                        displayResults ? "hover panel flip" : "hover panel"
                      }
                    >
                      <div className="front__form">
                        <div className="front__form__box">
                          <form
                            noValidate
                            onSubmit={(e: any) => {
                              e.preventDefault();
                            }}
                          >
                            <Input
                              id="url-input"
                              type="text"
                              label=""
                              placeholder="Enter valid URL here"
                              autocomplete="url"
                              error={validationError ? validationError : ""}
                              value={url}
                              handleChange={setUrl}
                              className="input mb--32"
                              icon={UrlSvg}
                            />

                            <Button
                              id="url-submit-button"
                              label={
                                loading
                                  ? ""
                                  : "Run document tag structure analysis"
                              }
                              className="button button--big button--lime"
                              handleClick={validateFields}
                              loading={loading}
                              disabled={loading}
                            />

                            {validationError && (
                              <span className="error__message">
                                {validationError}
                              </span>
                            )}
                            {apiError && (
                              <span className="error__message">
                                {apiError.message}
                              </span>
                            )}
                          </form>
                        </div>
                      </div>

                      <div className="back__stats">
                        <div className="back__stats_box">
                          <img
                            src={Close}
                            alt="Close stats"
                            title="Close stats"
                            className="close"
                            onClick={() => setDisplayResults(false)}
                          />

                          <Stats entry={stats} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="history__container">
                  {history.length > 0 && (
                    <div className="history__container__title mb--24">
                      <span>History:</span>
                    </div>
                  )}

                  {history.map((item: UrlEntry, index: number) => {
                    return (
                      <HistoryEntry
                        url={item.url}
                        key={item.url}
                        handler={() => retrieveHistoryItem(index)}
                      />
                    );
                  })}
                </div>
              </Col>
            </Row>
          </SiteWrapper>
        </div>
      </div>
    </>
  );
};
export default MainPage;
