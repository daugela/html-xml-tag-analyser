import React from "react";

interface HistoryEntryProps {
  url: string;
  handler: any;
}

const HistoryEntry = (props: HistoryEntryProps): JSX.Element => {
  const { url, handler } = props;

  return (
    <>
      <div
        className="history__entry"
        onClick={handler}
        title="Click to view previously fetched data"
      >
        <h2>{url}</h2>
      </div>
    </>
  );
};

export default HistoryEntry;
