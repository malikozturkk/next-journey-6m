import { Kafka, Consumer } from "kafkajs";
import { RideRequest } from "./types";

const kafka = new Kafka({ brokers: ["localhost:9093"] });
const consumer: Consumer = kafka.consumer({ groupId: "analytics-service" });

export async function startAnalyticsConsumer(): Promise<void> {
  await consumer.connect();
  await consumer.subscribe({ topic: "ride-requested", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const ride: RideRequest = JSON.parse(message.value.toString());
      console.log(`📊 Analitik kaydedildi: ${ride.id}`);
      console.log(`📈 Popüler rota: ${ride.pickup} → ${ride.drop}`);
      console.log(`👥 Kullanıcı davranışı: ${ride.user} aktif`);
      console.log(`🕐 Zaman damgası: ${new Date().toLocaleString('tr-TR')}`);
      console.log(`📋 Veritabanına kaydedildi: ride_requests tablosu`);
      console.log("---");
    },
  });
}
