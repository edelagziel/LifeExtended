import React from "react";
import "./researchItem.css";

function ResearchItem({ data }) {
  const articleUrl = `https://europepmc.org/article/${data.source}/${data.id}`;

  return (
    <div className="research-card">
      <h3 className="research-title">{data.title}</h3>

      <p className="research-abstract">
        {data.abstractText}
      </p>

      <div className="research-footer">
        <span className="research-year">
          Year: {data.pubYear}
        </span>

        <a
          href={articleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="research-link"
        >
          Read article
        </a>
      </div>
    </div>
  );
}

export default ResearchItem;
