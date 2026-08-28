export type DuckAiContext = Record<string, unknown>;

interface DuckAiResponse {
  answer?: string;
}

const REQUEST_TIMEOUT_MS = 8_000;
const CLIENT_ID_STORAGE_KEY = "duck-assistant-client-id";

function createClientId() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getClientId() {
  try {
    const stored = window.localStorage.getItem(CLIENT_ID_STORAGE_KEY);
    if (stored) return stored;

    const created = createClientId();
    window.localStorage.setItem(CLIENT_ID_STORAGE_KEY, created);
    return created;
  } catch {
    return createClientId();
  }
}

export async function askDuck(
  message: string,
  context: DuckAiContext,
): Promise<string> {
  const endpoint = import.meta.env.VITE_DUCK_API_URL?.trim() || "/api/duck";
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, context, clientId: getClientId() }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Duck API returned ${response.status}`);
    }

    const payload = (await response.json()) as DuckAiResponse;
    const answer = payload.answer?.trim();

    if (!answer) {
      throw new Error("Duck API returned an empty answer");
    }

    return answer;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
