import React, { useMemo } from "react";
// שימוש ב-useFetch הגנרי שלך
import { useFetch } from "../customHooks/useFetch"; 
import ResearchItem from "./ResearchItem";

function ResearchFeed() {
  // 1. פונקציות עזר (אפשר גם להוציא מחוץ לקומפוננטה)
  const cleanText = (text) => {
    if (!text) return "";
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.body.textContent || "";
  };

  const bannedKeywords = ["rat", "rats", "mouse", "mice", "murine", "drosophila", "fly", "flies", "worm", "c. elegans", "nematode", "plant", "seed", "crop", "wheat", "rice", "cow", "bovine", "cattle", "sheep", "pig", "porcine", "skin", "cosmetic", "dermatology", "retraction", "erratum", "correction"];

  // 2. בניית ה-URL (נעשה באופן סינכרוני לפני הקריאה ל-Hook)
  const currentYear = new Date().getFullYear();
  const fromYear = currentYear - 3;
  
  const baseQuery = `(longevity OR "healthy aging" OR healthspan OR "cellular senescence" OR mitochondria OR "metabolic health" OR sirtuins OR rapamycin OR microbiome) AND (human OR clinical OR therapy OR medicine)`;
  const excludeQuery = `NOT (mouse OR mice OR rat OR drosophila OR worm OR elegans OR plant OR crop OR agriculture OR bovine OR veterinary OR seed OR wheat OR rice OR retraction OR erratum OR correction)`;
  const finalQuery = `${baseQuery} ${excludeQuery} AND PUB_YEAR:[${fromYear} TO ${currentYear}]`;
  
  // ה-URL המוכן
  const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(finalQuery)}&resultType=core&format=json&pageSize=50`;

  // 3. קריאה ל-Hook ב-Top Level
  // אנחנו משנים את השם של data ל-rawData כי הוא עדיין לא מסונן
  const { data: rawData, loading, error, refetch } = useFetch(url);

  // 4. עיבוד וסינון המידע (Transformation)
  // משתמשים ב-useMemo כדי שהסינון הכבד ירוץ רק כשהמידע מהשרת משתנה
  const filteredData = useMemo(() => {
    // אם אין מידע עדיין, נחזיר מערך ריק
    if (!rawData || !rawData.resultList || !rawData.resultList.result) {
      return [];
    }

    const resultList = rawData.resultList.result;

    // לוגיקת הסינון שלך
    const filtered = resultList.filter((p) => {
      const title = cleanText(p.title || "").toLowerCase();
      const abstract = cleanText(p.abstractText || "").toLowerCase();

      if (!abstract || abstract === "abstract not available.") return false;
      
      const isSpam = bannedKeywords.some((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "i");
        return regex.test(title) || regex.test(abstract);
      });

      return !isSpam;
    });

    return filtered.slice(0, 10);
  }, [rawData]); // <-- תלות: ירוץ מחדש רק כש-rawData משתנה

  // 5. ה-UI נשאר נקי
  return (
    <>
      {loading && <h1>Loading...</h1>}
      {!loading && error && (
        <div>
          <h1>Error: {error}</h1>
          <button onClick={refetch}>נסה שוב</button>
        </div>
      )}
      
      {!loading && !error && filteredData.length > 0 && (
        <div>
           {/* כפתור רענון אופציונלי */}
           <button onClick={refetch}>refetch</button>
           
          {filteredData.map((item, index) => (
            <ResearchItem key={index} data={item} />
          ))}
        </div>
      )}
      
      {!loading && !error && filteredData.length === 0 && (
          <h1>לא נמצאו מאמרים רלוונטיים</h1>
      )}
    </>
  );
}

export default ResearchFeed;