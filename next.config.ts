import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",

  // Bu projede output:export yöntemi çalışmaz çünkü isr bir sayfa var ve next.config içerisinde rewrites, redirects, headers kullanımı var.
  // output: "export",
  images: {
    domains: ["placecats.com", "cdn.example2.com"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1600],
  },

  async headers() {
    return [
      {
        source: "/ssg",
        headers: [
          { key: "X-Custom-Header", value: "Hello World" },
          { key: "Cache-Control", value: "public, max-age=3600" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "X-Powered-By-Custom", value: "NextJS-Config-Demo" },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/user/:id",
        destination: "https://jsonplaceholder.typicode.com/users/:id",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/old-blog/:slug",
        destination: "/new-blog/:slug",
        permanent: true,
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.MY_CUSTOM_VARIABLE": JSON.stringify(
          "Bu metin webpack config ile gönderildi ve sadece build anında kodun içine gömülür, runtime'da okunamaz"
        ),
      })
    );
    return config;
  },
};

export default nextConfig;
