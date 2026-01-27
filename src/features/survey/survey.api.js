const API_URL = "/api/vote";

export async function submitVote({ email, choice }) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.toLowerCase().trim(),
      choice,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (res.ok) return { success: true };

  if (res.status === 409 || JSON.stringify(data).toLowerCase().includes("already")) {
    throw new Error("ALREADY_VOTED");
  }

  throw new Error("SERVER_ERROR");
}
