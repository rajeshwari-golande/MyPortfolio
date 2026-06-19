const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  published_at: string;
  read_time_minutes: number;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatCitation {
  source: string;
  excerpt: string;
}

export interface ChatResponse {
  answer: string;
  citations: ChatCitation[];
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `API error: ${res.status}`);
  }
  return res.json();
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await fetchApi<BlogPost[]>("/api/blog/");
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await fetchApi<BlogPost>(`/api/blog/${slug}`);
  } catch {
    return null;
  }
}

export async function submitContact(data: ContactSubmission): Promise<{ message: string }> {
  return fetchApi("/api/contact/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<ChatResponse> {
  return fetchApi<ChatResponse>("/api/chat/", {
    method: "POST",
    body: JSON.stringify({ message, history }),
  });
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}
