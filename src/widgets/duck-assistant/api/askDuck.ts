export type DuckAiContext = Record<string, unknown>;

interface DuckAiResponse {
  answer?: string;
}

const REQUEST_TIMEOUT_MS = 8_000;

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
      body: JSON.stringify({ message, context }),
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
