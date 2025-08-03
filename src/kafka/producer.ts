import { Kafka, Producer } from "kafkajs";
import { RideRequest } from "./types";

const kafka = new Kafka({ brokers: ["localhost:9093"] });
const producer: Producer = kafka.producer();

let isConnected = false;

export async function connectProducer(): Promise<void> {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
    console.log("🔌 Kafka Producer bağlandı");
  }
}

export async function sendRideRequest(rideRequest: RideRequest): Promise<void> {
  await connectProducer();
  
  await producer.send({
    topic: "ride-requested",
    messages: [{ value: JSON.stringify(rideRequest) }],
  });

  console.log("🚖 Yeni sürüş isteği gönderildi:", rideRequest);
}

// Artık sadece bağlantı kurmak için kullanılıyor, otomatik gönderim yok
export async function startProducer(): Promise<void> {
  await connectProducer();
  console.log("✅ Kafka Producer hazır - Manuel gönderim için bekliyor");
}
