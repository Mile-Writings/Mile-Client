export const s3UrlParsing = (url: string) => {
  const match = url.match(/^.*\/post\//);
  return match ? match[0] : null;
};
