const baseURL = "https://thinkboard-backend-beryl.vercel.app";
// const baseURL = "http://localhost:5001";

export const FireAPI = async (
  endpoint,
  method = "GET",
  body,
  customheader = {},
) => {
  const url = `${baseURL}${endpoint ? `/${endpoint}` : ""}`;

  const headers = {
    "Content-Type": "application/json",
    ...customheader,
  };
  const options = {
    method: method.toUpperCase(),
    headers,
  };
  if (body && method.toUpperCase !== "GET") {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const isNoContent = response.status === 204;
    const data = isNoContent ? null : await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data || { message: "Something went wrong" });
    }
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
