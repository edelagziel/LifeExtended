import { useState, useEffect } from "react";

function ResearchFeed() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // פונקציה לניקוי כותרות מתגיות HTML וסימנים מוזרים
  const cleanText = (text) => {
    if (!text) return "";
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    async function fetchPapers() {
      try {
        setLoading(true);
        const currentYear = new Date().getFullYear();
        const fromYear = currentYear - 3;

        // שאילתה בסיסית - מתמקדים בתוכן קליני/אנושי
        const baseQuery = `(longevity OR "healthy aging" OR healthspan) AND (human OR clinical OR therapy OR medicine)`;
        // חסימה ברמת ה-API
        const excludeQuery = `NOT (plant OR crop OR agriculture OR bovine OR veterinary)`;
        
        const finalQuery = `${baseQuery} ${excludeQuery} AND PUB_YEAR:[${fromYear} TO ${currentYear}]`;

        const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(
          finalQuery
        )}&resultType=core&format=json&pageSize=50`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch papers");

        const data = await res.json();

        // רשימה שחורה מורחבת (כולל תולעים וזבובים שהביקורת הזכירה)
        const bannedKeywords = [
          "rat", "rats", "mouse", "mice", "murine", // עכברים
          "drosophila", "fly", "flies", // זבובים
          "worm", "c. elegans", "nematode", // תולעים (מה שנכנס לך קודם)
          "plant", "seed", "crop", "wheat", "rice", 
          "cow", "bovine", "cattle", "sheep", "pig", "porcine",
          "skin", "cosmetic", "dermatology", // אופציונלי: מסנן מחקרי עור אם זה מרגיש "שטחי" מדי
          "retraction", "erratum", "correction"
        ];

        const filtered = data.resultList.result.filter((p) => {
          const title = p.title?.toLowerCase() || "";
          const abstract = p.abstractText?.toLowerCase() || "";

          // 1. חוק הברזל: אין תקציר? לא נכנס. (פותר את ה-Abstract not available)
          if (!p.abstractText || p.abstractText === "Abstract not available.") return false;

          // 2. בדיקת מילים אסורות
          const isSpam = bannedKeywords.some((keyword) => {
            const regex = new RegExp(`\\b${keyword}\\b`, "i");
            // בודקים בכותרת (מחמיר) או אם התקציר עוסק *רק* בזה בצורה בולטת
            return regex.test(title); 
          });

          return !isSpam;
        });

        setPapers(filtered.slice(0, 10));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPapers();
  }, []);

  return (
    <div style={{ padding: "24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      <header style={{ marginBottom: "30px", borderBottom: "1px solid #eaeaea", paddingBottom: "15px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#111", margin: 0 }}>
          Longevity Science Feed
        </h1>
        <p style={{ color: "#666", marginTop: "5px", fontSize: "14px" }}>
          Curated research from leading medical journals
        </p>
      </header>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
          Searching databases...
        </div>
      )}
      
      {error && <div style={{ color: "red", padding: "20px" }}>Error: {error}</div>}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {papers.map((paper) => (
          <article
            key={paper.id}
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: "#ffffff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #f0f0f0",
              transition: "transform 0.2s ease",
            }}
          >
            {/* שימוש ב-cleanText כדי להציג כותרת נקייה מתגיות */}
            <h2 style={{ fontSize: "19px", lineHeight: "1.4", margin: "0 0 12px 0", color: "#1a1a1a", fontWeight: "600" }}>
              {cleanText(paper.title)}
            </h2>

            <div style={{ display: "flex", gap: "10px", marginBottom: "15px", fontSize: "12px" }}>
              <span style={{ background: "#e0f2fe", color: "#0284c7", padding: "4px 10px", borderRadius: "20px", fontWeight: "600" }}>
                {cleanText(paper.journalTitle || "Journal")}
              </span>
              <span style={{ color: "#888", display: "flex", alignItems: "center" }}>
                {paper.pubYear}
              </span>
            </div>

            <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.6", margin: "0 0 20px 0" }}>
              {/* ניקוי התקציר והגבלת אורך */}
              {cleanText(paper.abstractText).slice(0, 220)}...
            </p>

            <a 
              href={`https://europepmc.org/article/${paper.source}/${paper.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: "inline-block", 
                textDecoration: "none", 
                color: "#2563eb", 
                fontWeight: "600", 
                fontSize: "14px",
                borderBottom: "2px solid transparent"
              }}
              onMouseOver={(e) => e.target.style.borderBottom = "2px solid #2563eb"}
              onMouseOut={(e) => e.target.style.borderBottom = "2px solid transparent"}
            >
              Read Full Study →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ResearchFeed;