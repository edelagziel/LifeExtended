import React  from "react";


function ResearchItem({ data }) {
  const articleUrl = `https://europepmc.org/article/${data.source}/${data.id}`;

  return (
    <div>
        <h3>{data.title}</h3>
        <p>{data.abstractText}</p>
        <p>Year: {data.pubYear}</p>
        <a href={articleUrl} target="_blank" rel="noopener noreferrer">Read article</a>
        <hr />
    </div>
  );
}

export default ResearchItem;




