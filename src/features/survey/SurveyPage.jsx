import { useState, useEffect, useContext } from "react";
import { submitVote } from "./survey.api";
import { surveyConfig } from "./survey.config";
import { UserContext } from "../../context/UserContext";
import "./survey.css";

function SurveyPage() {
  const user = useContext(UserContext);
  if (!user) throw new Error("UserContext missing");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  /* ===== Autofill email from context ===== */
  useEffect(() => {
    if (user.email) {
      setEmail(user.email);
    }
  }, [user.email]);

  async function handleVote(choice) {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await submitVote({
        email: email.toLowerCase().trim(),
        choice,
      });
      setSuccess(true);
    } catch (err) {
      if (err.message === "ALREADY_VOTED") {
        setError("This email has already participated.");
      } else {
        setError("System error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  /* ===== Success state ===== */
  if (success) {
    return (
      <div className="survey-success">
        <h2>✅ Response Recorded</h2>
        <p>Thank you for contributing to LifeExtended research.</p>

        <button
          className="survey-reset"
          onClick={() => window.location.reload()}
        >
          Submit another response
        </button>
      </div>
    );
  }

  /* ===== Main survey ===== */
  return (
    <div className="survey-page">
      <h1>{surveyConfig.title}</h1>
      <p>{surveyConfig.description}</p>

      <input
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading || !!user.email}   // 🔒 נעול אם הגיע מה־Context
      />

      {user.email && (
        <small className="survey-email-note">
          Answering as <strong>{user.email}</strong>
        </small>
      )}

      <div className="survey-options">
        {surveyConfig.options.map((opt) => (
          <button
            key={opt}
            className="survey-option"
            onClick={() => handleVote(opt)}
            disabled={loading}
          >
            {opt}
          </button>
        ))}
      </div>

      {loading && (
        <div className="survey-loading">Processing response…</div>
      )}

      {error && <div className="survey-error">{error}</div>}
    </div>
  );
}

export default SurveyPage;
