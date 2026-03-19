const repoName = "rizal-filmreview-repo";
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? `/${repoName}` : "";

export default {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};
