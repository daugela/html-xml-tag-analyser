import React from "react";
import { UrlEntry } from "../../types";

interface StatsProps {
  entry: UrlEntry | null;
}

const Stats = (props: StatsProps): JSX.Element => {
  const { entry } = props;

  if (entry === null) return <></>;

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        <span className="bold">{entry?.url}</span>
      </h2>
      <p>
        Total tags under this url: <span className="bold">{entry?.total}</span>
      </p>
      <p>
        All unique tags: <span className="bold">{entry?.unique}</span>
      </p>

      {entry?.top.map((tag: (string | number)[]) => {
        return (
          <span className="tag" key={tag[0]}>
            {String.fromCharCode(60) +
              tag[0] +
              String.fromCharCode(47) +
              String.fromCharCode(62)}
          </span>
        );
      })}

      <p>
        Deepest tag: <span className="bold">{entry?.deepest}</span>
      </p>
      <p>
        Deepest tag path: <span className="bold">{entry?.path}</span>
      </p>
    </>
  );
};

export default Stats;
