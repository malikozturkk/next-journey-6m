import { Kafka, Consumer } from "kafkajs";
import { RideRequest } from "./types";

const kafka = new Kafka({ brokers: ["localhost:9093"] });
const consumer: Consumer = kafka.consumer({ groupId: "driver-service" });

export async function startDriverConsumer(): Promise<void> {
  await consumer.connect();
  await consumer.subscribe({ topic: "ride-requested", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const ride: RideRequest = JSON.parse(message.value.toString());
      console.log(`🧍‍♂️ Sürücü bulundu: ${ride.id} kullanıcı: ${ride.user}`);
      console.log(`📍 Rota: ${ride.pickup} → ${ride.drop}`);
      console.log("------");
    },
  });
}
