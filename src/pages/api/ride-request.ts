import { NextApiRequest, NextApiResponse } from "next";
import { sendRideRequest } from "../../kafka/producer";
import { RideRequest } from "../../kafka/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { pickup, drop, user } = req.body;

    if (!pickup || !drop) {
      return res.status(400).json({
        message: "Pickup ve drop lokasyonları gereklidir",
      });
    }

    const rideRequest: RideRequest = {
      id: Date.now(),
      user: user || `user-${Math.floor(Math.random() * 1000)}`,
      pickup,
      drop,
    };

    await sendRideRequest(rideRequest);

    res.status(200).json({
      success: true,
      message: "Sürüş isteği başarıyla gönderildi",
      rideRequest,
    });
  } catch (error) {
    console.error("Sürüş isteği gönderilirken hata:", error);
    res.status(500).json({
      success: false,
      message: "Sürüş isteği gönderilirken bir hata oluştu",
    });
  }
}
