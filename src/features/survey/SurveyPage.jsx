import { useSurvey } from "./useSurvey";
import "./survey.css";

function SurveyPage() {
  const {
    pollData,
    pollLoading,
    pollError,
    email,
    setEmail,
    voteLoading,
    voteError,
    voteSuccess,
    handleVote,
    resetSurvey,
    isEmailLocked,
  } = useSurvey();

  /* ===== Loading state ===== */
  if (pollLoading) {
    return (
      <div className="survey-page">
        <div className="survey-loading">Loading survey...</div>
      </div>
    );
  }

  /* ===== Error loading poll ===== */
  if (pollError && !pollData) {
    return (
      <div className="survey-page">
        <div className="survey-error">
          Failed to load survey. Please try again later.
        </div>
      </div>
    );
  }

  /* ===== Success state ===== */
  if (voteSuccess) {
    return (
      <div className="survey-success">
        <h2>✅ Response Recorded</h2>
        <p>Thank you for contributing to LifeExtended research.</p>

        <button className="survey-reset" onClick={resetSurvey}>
          Submit another response
        </button>
      </div>
    );
  }

  /* ===== Main survey ===== */
  return (
    <div className="survey-page">
      <h1>{pollData?.title || "Survey"}</h1>
      <p>{pollData?.description || ""}</p>

      <input
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={voteLoading || isEmailLocked}
      />

      {isEmailLocked && (
        <small className="survey-email-note">
          Answering as <strong>{email}</strong>
        </small>
      )}

      <div className="survey-options">
        {pollData?.options?.map((opt) => (
          <button
            key={opt}
            className="survey-option"
            onClick={() => handleVote(opt)}
            disabled={voteLoading}
          >
            {opt}
          </button>
        ))}
      </div>

      {voteLoading && (
        <div className="survey-loading">Processing response…</div>
      )}

      {voteError && <div className="survey-error">{voteError}</div>}
    </div>
  );
}

export default SurveyPage;
