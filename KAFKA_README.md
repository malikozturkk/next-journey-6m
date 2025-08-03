# Kafka Kurulumu ve Kullanımı

Bu proje için sıfırdan Kafka kurulumu yapılmıştır. Mevcut Docker container'larına dokunulmamıştır.

## 🚀 Kurulum

### 1. Kafka Başlatma
```bash
docker-compose -f docker-compose.kafka.yml up -d
```

### 2. Bağımlılıkları Yükleme
```bash
yarn add kafkajs
```

### 3. Topic Oluşturma
```bash
docker exec next-journey-kafka kafka-topics --bootstrap-server kafka:29092 --create --topic ride-requested --partitions 1 --replication-factor 1
```

## 📊 Servisler

### Kafka Servisleri
- **Zookeeper**: `localhost:2184`
- **Kafka**: `localhost:9093`
- **Kafka UI**: `http://localhost:8081`

### Container İsimleri
- `next-journey-zookeeper`
- `next-journey-kafka`
- `next-journey-kafka-ui`

## 🔧 Kullanım

### Kafka Sistemini Başlatma
```bash
node src/kafka/index.ts
```

### Topic Listesi Görüntüleme
```bash
docker exec next-journey-kafka kafka-topics --bootstrap-server kafka:29092 --list
```

### Test Mesajı Gönderme
```bash
docker exec next-journey-kafka kafka-console-producer --bootstrap-server kafka:29092 --topic ride-requested
```

### Mesajları Dinleme
```bash
docker exec next-journey-kafka kafka-console-consumer --bootstrap-server kafka:29092 --topic ride-requested --from-beginning
```

## 🎯 Proje Yapısı

```
src/kafka/
├── index.ts              # Ana Kafka başlatıcı
├── producer.ts           # Mesaj üretici
├── driverConsumer.ts     # Sürücü consumer
├── notificationConsumer.ts # Bildirim consumer
├── analyticsConsumer.ts  # Analitik consumer
└── types.ts             # Tip tanımları
```

## 🌐 Kafka UI

Kafka UI'a erişmek için: http://localhost:8081

Bu arayüz ile:
- Topic'leri görüntüleyebilirsiniz
- Mesajları inceleyebilirsiniz
- Consumer gruplarını takip edebilirsiniz
- Real-time mesaj akışını izleyebilirsiniz

## 🛑 Durdurma

```bash
docker-compose -f docker-compose.kafka.yml down
```

## 📝 Notlar

- Bu kurulum mevcut `malikozturk` container'larına dokunmaz
- Yeni portlar kullanılmıştır (2184, 9093, 8081)
- Tüm veriler Docker volume'larında saklanır
- Kafka UI ile kolayca yönetim yapabilirsiniz 