import axios from "axios";

export const checkSource = (url: string) => {
  if (!url.includes("https://")) return false;
  return true;
  // const response = await axios.get(url);
  // if (!response) return false;
  // return true;
};
