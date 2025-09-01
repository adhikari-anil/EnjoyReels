// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com"], // Allow Google-hosted images
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "ik.imagekit.io",
//         port: "",
//       },
//     ],
//   },
//   reactStrictMode: true,
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.slack-edge.com",
      "upload.wikimedia.org", // 👈 add this
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;