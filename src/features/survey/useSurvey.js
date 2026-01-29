import { useState, useEffect, useContext } from "react";
import { getActivePoll, submitVote } from "./survey.api";
import { surveyConfig } from "./survey.config";
import { UserContext } from "../../context/UserContext";

/**
 * Custom hook for managing survey state and operations
 * Handles:
 * - Loading poll configuration from server (with fallback to static config)
 * - Managing email state (with auto-fill from user context)
 * - Submitting votes
 * - Error handling and loading states
 */
export function useSurvey() {
  const user = useContext(UserContext);
  
  // Poll configuration state
  const [pollData, setPollData] = useState(null);
  const [pollLoading, setPollLoading] = useState(true);
  const [pollError, setPollError] = useState(null);
  
  // Vote form state
  const [email, setEmail] = useState("");
  const [voteLoading, setVoteLoading] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [voteSuccess, setVoteSuccess] = useState(false);

  /**
   * Load poll configuration on mount
   * Falls back to static config if server fetch fails
   */
  useEffect(() => {
    async function loadPoll() {
      try {
        setPollLoading(true);
        setPollError(null);
        
        const data = await getActivePoll();
        
        if (data) {
          setPollData(data);
        } else {
          // Fallback to static config
          console.info("Using fallback survey configuration");
          setPollData(surveyConfig);
        }
      } catch (err) {
        console.error("Error loading poll:", err);
        setPollError("Failed to load survey");
        // Still use fallback on error
        setPollData(surveyConfig);
      } finally {
        setPollLoading(false);
      }
    }

    loadPoll();
  }, []);

  /**
   * Auto-fill email from user context if available
   */
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user?.email]);

  /**
   * Handle vote submission
   * @param {string} choice - The selected option
   */
  async function handleVote(choice) {
    // Validation
    if (!email.includes("@")) {
      setVoteError("Please enter a valid email address.");
      return;
    }

    setVoteLoading(true);
    setVoteError(null);

    try {
      await submitVote({
        email: email.toLowerCase().trim(),
        choice,
      });
      setVoteSuccess(true);
    } catch (err) {
      if (err.message === "ALREADY_VOTED") {
        setVoteError("This email has already participated.");
      } else {
        setVoteError("System error. Please try again.");
      }
    } finally {
      setVoteLoading(false);
    }
  }

  /**
   * Reset survey state (for submitting another response)
   */
  function resetSurvey() {
    setVoteSuccess(false);
    setVoteError(null);
    if (!user?.email) {
      setEmail("");
    }
  }

  return {
    // Poll configuration
    pollData,
    pollLoading,
    pollError,
    
    // Vote form
    email,
    setEmail,
    voteLoading,
    voteError,
    voteSuccess,
    
    // Actions
    handleVote,
    resetSurvey,
    
    // User context
    isEmailLocked: !!user?.email,
  };
}
