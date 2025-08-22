import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 10 saniye boyunca cache'te kalsın (tarayıcı ve CDN için)
  res.setHeader("Cache-Control", "public, max-age=10, s-maxage=10");

  res.status(200).json({
    now: new Date().toISOString(),
    random: Math.floor(Math.random() * 1000),
  });
}
