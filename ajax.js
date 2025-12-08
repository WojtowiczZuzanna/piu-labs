class Ajax {
  constructor(options = {}) {
    this.defaults = {
      baseURL: options.baseURL || "",
      timeout: options.timeout || 5000,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    };
  }

  async request(method, url, data = null, options = {}) {
    const controller = new AbortController();
    const timeout = options.timeout || this.defaults.timeout;

    const timeoutID = setTimeout(() => controller.abort(), timeout);

    const finalURL = this.defaults.baseURL + url;

    const finalHeaders = {
      ...this.defaults.headers,
      ...(options.headers || {})
    };

    const config = {
      method,
      headers: finalHeaders,
      signal: controller.signal
    };

    if (data !== null) {
      config.body = JSON.stringify(data);
    }

    let response;
    try {
      response = await fetch(finalURL, config);
    } catch (err) {
      if (err.name === "AbortError") {
        throw new Error(`Request timeout after ${timeout} ms`);
      }
      throw new Error("Network error: " + err.message);
    } finally {
      clearTimeout(timeoutID);
    }

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(
        `HTTP error ${response.status}: ${response.statusText} ${text}`
      );
    }

    try {
      return await response.json();
    } catch {
      throw new Error("Invalid JSON received from server");
    }
  }

  async get(url, options) {
    return this.request("GET", url, null, options);
  }

  async post(url, data, options) {
    return this.request("POST", url, data, options);
  }

  async put(url, data, options) {
    return this.request("PUT", url, data, options);
  }

  async delete(url, options) {
    return this.request("DELETE", url, null, options);
  }
}
