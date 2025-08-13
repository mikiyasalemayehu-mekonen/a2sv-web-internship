import { toggleBookmark } from "../bookmark";

describe("toggleBookmark", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.resetAllMocks();
  });

  it("calls POST when not bookmarked", async () => {
    const mockRes = { ok: true, json: async () => ({ success: true }) };
    global.fetch = jest.fn().mockResolvedValue(mockRes as any);

    const result = await toggleBookmark(
      "abc123",
      false,
      "TOKEN",
      "https://api.test"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.test/bookmarks/abc123",
      expect.objectContaining({ method: "POST", headers: expect.any(Object) })
    );
    expect(result).toEqual({ success: true });
  });

  it("calls DELETE when bookmarked", async () => {
    const mockRes = { ok: true, text: async () => "" };
    global.fetch = jest.fn().mockResolvedValue(mockRes as any);

    const result = await toggleBookmark(
      "abc123",
      true,
      "TOKEN",
      "https://api.test"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.test/bookmarks/abc123",
      expect.objectContaining({ method: "DELETE", headers: expect.any(Object) })
    );
    expect(result).toBeNull();
  });

  it("throws if response not ok", async () => {
    const mockRes = { ok: false, text: async () => "error!!" };
    global.fetch = jest.fn().mockResolvedValue(mockRes as any);

    await expect(
      toggleBookmark("x", false, "TOKEN", "https://api.test")
    ).rejects.toThrow("error!!");
  });
});
