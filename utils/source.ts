export const checkSource = (url: string) => {
  if (!url.includes("https://")) return false;
  return true;
  // const response = await axios.get(url);
  // if (!response) return false;
  // return true;
};

export const formatDuration = (duration: number): string => {
  if (duration < 60) return `${duration} minutes`;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours} hours ${minutes} minutes`;
};
