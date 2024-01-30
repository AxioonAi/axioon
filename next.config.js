const path = require("path");

module.exports = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  pageExtensions: ["page.tsx", "page.ts", "api.tsx", "api.ts"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    REACT_APP_OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY,
  },
};
