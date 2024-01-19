export const s3UrlPasing = (url: string) => {
  const match = url.match(/^.*\/post\//);
  return match ? match[0] : null;
};
