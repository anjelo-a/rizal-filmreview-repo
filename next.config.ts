const repoName = "rizal-filmreview-repo";

export default {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: `/${repoName}`,
  },
};