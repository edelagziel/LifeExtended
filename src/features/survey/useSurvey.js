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
  
  // Check if user already voted (from localStorage)
  const [voteSuccess, setVoteSuccess] = useState(() => {
    try {
      const voted = localStorage.getItem("surveyVoted");
      return voted === "true";
    } catch {
      return false;
    }
  });

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
   * Auto-fill email from user context or localStorage if available
   */
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    } else {
      // If user voted before, load their email
      try {
        const savedEmail = localStorage.getItem("surveyEmail");
        if (savedEmail && voteSuccess) {
          setEmail(savedEmail);
        }
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [user?.email, voteSuccess]);

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
      // Save to localStorage so it persists after page reload
      localStorage.setItem("surveyVoted", "true");
      localStorage.setItem("surveyEmail", email.toLowerCase().trim());
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
    // Clear localStorage
    localStorage.removeItem("surveyVoted");
    localStorage.removeItem("surveyEmail");
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
