const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const withBasePath = (src: string) => {
  if (!src || src.startsWith("http")) return src;
  if (src.startsWith(basePath)) return src;
  return `${basePath}${src.startsWith("/") ? src : `/${src}`}`;
};
