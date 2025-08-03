import { startProducer } from "./producer";
import { startDriverConsumer } from "./driverConsumer";
import { startNotificationConsumer } from "./notificationConsumer";
import { startAnalyticsConsumer } from "./analyticsConsumer";

async function start(): Promise<void> {
  await Promise.all([
    startDriverConsumer(),
    startNotificationConsumer(),
    startAnalyticsConsumer(),
  ]);

  await startProducer();
}

start();
