import { Kafka, Consumer } from "kafkajs";
import { RideRequest } from "./types";

const kafka = new Kafka({ brokers: ["localhost:9093"] });
const consumer: Consumer = kafka.consumer({ groupId: "notification-service" });

export async function startNotificationConsumer(): Promise<void> {
  await consumer.connect();
  await consumer.subscribe({ topic: "ride-requested", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const ride: RideRequest = JSON.parse(message.value.toString());
      console.log(`📲 Bildirim gönderildi: ${ride.user}`);
      console.log(`📱 SMS: "Sürüşünüz ${ride.pickup} → ${ride.drop} rotasında hazırlanıyor"`);
      console.log(`📧 Email: "Sürüş talebiniz alındı - ID: ${ride.id}"`);
      console.log(`🔔 Push: "Sürücünüz yola çıktı!"`);
      console.log("---");
    },
  });
}
