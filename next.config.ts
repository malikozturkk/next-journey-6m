import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,

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
