export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
export async function request(
  url,
  options = {},
  {
    fetcher = fetch,
    wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  } = {},
) {
  const read = !options.method || options.method === "GET";
  for (let attempt = 0; ; attempt++) {
    try {
      const signal = options.signal
        ? AbortSignal.any([options.signal, AbortSignal.timeout(20000)])
        : AbortSignal.timeout(20000);
      const response = await fetcher(url, { ...options, signal });
      if (read && attempt === 0 && [502, 503, 504].includes(response.status)) {
        await wait(300);
        continue;
      }
      return response;
    } catch (error) {
      if (options.signal?.aborted) throw error;
      if (!read || attempt > 0)
        throw new ApiError("Unable to reach NexKey. Please try again.", 0);
      await wait(300);
    }
  }
}
export async function jsonResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new ApiError(
      data.error || "Request failed. Please try again.",
      response.status,
      data.code,
    );
  return data;
}
