type ApiError = { message?: string; error?: string };

// Reads body safely and returns parsed JSON if possible
export const fetchJson = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(input, init);

  // Read raw text first so we never crash on empty body
  const raw = await res.text();

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  const data = raw && isJson ? (JSON.parse(raw) as unknown) : raw;

  if (!res.ok) {
    if (data && typeof data === "object") {
      const d = data as ApiError;
      throw new Error(d.message || d.error || `Request failed (${res.status})`);
    }
    throw new Error(
      typeof data === "string" && data.trim()
        ? data
        : `Request failed (${res.status})`,
    );
  }

  // If success but no JSON returned
  if (!data || typeof data !== "object") {
    throw new Error("Server returned an empty or non-JSON response.");
  }

  return data as T;
};
