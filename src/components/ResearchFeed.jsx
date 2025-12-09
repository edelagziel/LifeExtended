import React, { useEffect, useState } from "react";
import axios from "axios";
import ResearchItem from "./ResearchItem";

function ResearchFeed() {
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState([]);

  const cleanText = (text) => {
    if (!text) return "";
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.body.textContent || "";
  };

  const bannedKeywords = ["rat", "rats", "mouse", "mice", "murine","drosophila", "fly", "flies","worm", "c. elegans", "nematode","plant", "seed", "crop", "wheat", "rice","cow", "bovine", "cattle", "sheep", "pig", "porcine","skin", "cosmetic", "dermatology","retraction", "erratum", "correction"];

  useEffect(() => {
    async function fetchData() {
      const currentYear = new Date().getFullYear();
      const fromYear = currentYear - 3;

      try {
        const baseQuery = `(longevity OR "healthy aging" OR healthspan OR "cellular senescence" OR mitochondria OR "metabolic health" OR sirtuins OR rapamycin OR microbiome) AND (human OR clinical OR therapy OR medicine)`;
        const excludeQuery = `NOT (mouse OR mice OR rat OR drosophila OR worm OR elegans OR plant OR crop OR agriculture OR bovine OR veterinary OR seed OR wheat OR rice OR retraction OR erratum OR correction)`;
        const finalQuery = `${baseQuery} ${excludeQuery} AND PUB_YEAR:[${fromYear} TO ${currentYear}]`;
        const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(finalQuery)}&resultType=core&format=json&pageSize=50`;
        const response = await axios.get(url);

        const raw = response.data.resultList?.result || [];
        const filtered = raw.filter((p) => {
          const title = cleanText(p.title || "").toLowerCase();
          const abstract = cleanText(p.abstractText || "").toLowerCase();

          if (!abstract || abstract === "abstract not available.") return false;
          const isSpam = bannedKeywords.some((keyword) => {
            const regex = new RegExp(`\\b${keyword}\\b`, "i");
            return regex.test(title) || regex.test(abstract);
          });

          return !isSpam;
        });

        setData(filtered.slice(0, 10));
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {!loading && fetchError && <h1>{fetchError}</h1>}
      {!loading && !fetchError && data.length > 0 && (
        <div>
          {data.map((item, index) => (
            <ResearchItem key={index} data={item} />
          ))}
        </div>
      )}
    </>
  );
}

export default ResearchFeed;
