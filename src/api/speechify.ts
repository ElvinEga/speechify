const API_URL = import.meta.env.VITE_API_BASE_URL;
/**
 * Get text from the api
 */

const getFromAPI = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data?.content;
};

const parseSentences = (text: string) =>
  (text.match(/<s>(.*?)<\/s>/g) || []).map((s) =>
    s.replace(/<\/?s>/g, "").concat(s.includes(".") ? "" : ".")
  );

export { getFromAPI, parseSentences };
