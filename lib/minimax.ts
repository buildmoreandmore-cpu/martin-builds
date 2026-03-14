const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || "";
const MINIMAX_ENDPOINT = "https://api.minimax.io/v1/chat/completions";
const MODEL = "MiniMax-Text-01";

export interface MiniMaxMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface MiniMaxUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface MiniMaxResponse {
  content: string;
  usage: MiniMaxUsage;
}

export async function chatCompletion(
  messages: MiniMaxMessage[],
  systemPrompt?: string
): Promise<MiniMaxResponse> {
  const allMessages: MiniMaxMessage[] = [];
  if (systemPrompt) {
    allMessages.push({ role: "system", content: systemPrompt });
  }
  allMessages.push(...messages);

  const res = await fetch(MINIMAX_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MINIMAX_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: allMessages,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MiniMax API error (${res.status}): ${text}`);
  }

  const data = await res.json();
  const choice = data.choices?.[0];
  return {
    content: choice?.message?.content || "",
    usage: data.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  };
}
