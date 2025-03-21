export const getImageUrl = (baseUrl: string, path: string) => {
  return new URL(`../assets/${path}.png`, baseUrl).href;
};
