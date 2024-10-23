export const urlToServerParsing = (url: string, fileName: string) => {
  const match = url.match(/^.*\/post\//);
  return match ? match[0] + fileName : '';
};
