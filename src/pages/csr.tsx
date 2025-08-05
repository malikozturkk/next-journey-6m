import Link from "next/link";
import { useEffect, useState } from "react";

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
}

const Csr = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
      );
      const data = await res.json();
      setCryptos(data);
      setLoading(false);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-300 text-xl">
        Loading crypto prices...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/10 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5-4h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4m0 0l2 2m-2-2l-2-2"
              />
            </svg>
            İçindekiler
          </Link>
        </div>
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-md">
          💰 CSR Sayfa
        </h1>

        <div className="space-y-6 text-gray-300 leading-relaxed text-[15px]">
          <p className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-yellow-500">
            <b className="text-xl">Bu sayfamda CSR seçme sebebim;</b> <br />
            1. Api'deki coin fiyatları çok sık değiştiği için{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              CSR
            </code>{" "}
            yöntemini seçtim. <br />
            2. Sayfada{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              SEO
            </code>{" "}
            önemsiz olacağı için{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              SSR yerine CSR
            </code>{" "}
            kullanmak daha mantıklı. Çünkü burayı fiyatları listeleyen bir
            dashboard gibi düşünebiliriz, bir landing gibi değil. <br />
            3. Veriler{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              polling
            </code>{" "}
            yöntemi ile 60 saniyede bir güncelleniyor ancak{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              Socket'de
            </code>{" "}
            kullanılabilirdi. Socket kullanılsaydı zaten{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              SSR, SSG, ISR
            </code>{" "}
            yüklemek imkansız ve mantıksız olurdu her türlü{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              CSR
            </code>{" "}
            daha mantıklı.
          </p>




          <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-blue-500">
            <b className="text-xl">🔍 Javascript Yüklendikten Sonra DOM Nasıl Oluşur?</b>
            <br /><br />
            
            <b className="text-lg">✅ 1. Tarayıcı ilk HTML dosyasını alır</b> <br />
            Next.js sunucusu tarafından gelen <b>statik HTML</b> içinde sadece şu vardır:
            <br /><br />
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
{`<body>
  <div id="__next"></div>
  <script src="/_next/static/.../main.js"></script>
</body>`}
            </pre>
            <br />
            • <code className="bg-gray-700 px-1 rounded text-sm">{'<div id="__next"></div>'}</code> → <b>Next.js server</b> tarafından HTML'ye yerleştirilir.
            <br />
            • Henüz DOM oluşmamıştır, sadece bu boş <code className="bg-gray-700 px-1 rounded text-sm">{'<div>'}</code> kullanıcıya gösterilir.
            <br /><br />
            
            <b className="text-lg">⚙️ 2. Tarayıcı JavaScript'i indirir</b> <br />
            Tarayıcı, HTML'deki <code className="bg-gray-700 px-1 rounded text-sm">{'<script src="...">'}</code> satırlarını takip eder ve:
            <br />
            • <code className="bg-gray-700 px-1 rounded text-sm">/_next/static/.../main.js</code>,
            <br />
            • <code className="bg-gray-700 px-1 rounded text-sm">/_next/static/chunks/pages/index.js</code> (veya başka sayfa dosyaları) gibi JS dosyalarını indirir.
            <br /><br />
            Bu dosyalar:
            <br />
            • React kütüphanesini,
            <br />
            • Component kodlarını,
            <br />
            • Sayfa içeriğini üretmek için gerekli fonksiyonları içerir.
            <br /><br />
            
            <b className="text-lg">⚛️ 3. React başlatılır (hydrate/render)</b> <br />
            İndirilen JS içinde şu kod otomatik olarak çalışır:
            <br /><br />
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
{`ReactDOM.render(<App />, document.getElementById("__next"));`}
            </pre>
            <br />
            Ya da SSR varsa:
            <br /><br />
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
{`ReactDOM.hydrate(<App />, document.getElementById("__next"));`}
            </pre>
            <br />
            Yani:
            <br />
            • React, <code className="bg-gray-700 px-1 rounded text-sm">pages/index.js</code> içindeki bileşeni alır,
            <br />
            • <code className="bg-gray-700 px-1 rounded text-sm">{'<App />'}</code> gibi root bileşenleri oluşturur,
            <br />
            • Tüm bu sanal ağacı <code className="bg-gray-700 px-1 rounded text-sm">{'<div id="__next">'}</code> içine yerleştirir.
            <br /><br />
            
            Sayfa ilk yüklenirken kullanıcı tarafından fark edilecek bir gecikme olabilir. Bu gecikme ekranın kısa bir süre beyaz kalmasına sebep olabilir. Javascript, indirilene ve çalıştırılana kadar, biraz zamana ihtiyaç duyar.
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-green-500">
            <b className="text-xl">📊 CSR vs Diğer Render Yöntemleri Karşılaştırması</b>
            <br /><br />
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-600">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-4 py-2 text-left">Kriter</th>
                    <th className="border border-gray-600 px-4 py-2 text-center">✅</th>
                    <th className="border border-gray-600 px-4 py-2 text-center">❌</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">İlk Yüklenme Hızı</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">Single Page Application ile tek sayfa indirildiği için sonraki sayfalar hızlı açılır</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">İlk açılışta sadece boş HTML ve JS geldiği için <b>ilk yüklenme süresi uzundur</b></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">Kullanıcı Deneyimi</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">Sayfalar arası geçişler çok hızlıdır, pürüzsüz deneyim sunar</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">İlk içerik geç gelir, <b>"beyaz ekran"</b> yaşanabilir</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">SEO</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">-</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">JavaScript çalışmadan içerik görünmez, <b>SEO için uygun değildir</b></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">Sunucu Yükü</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">Sunucuya az yük biner, çünkü render işlemi istemciye bırakılır</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">-</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">Dinamik Veri Kullanımı</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">İstemci tarafında API'den veri çekmek kolaydır</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">Veri çekerken kullanıcıya boş ekran gösterilebilir</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">CDN Kullanımı</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">Tamamen statik HTML sunulduğundan <b>CDN ile kolay cache yapılabilir</b></td>
                    <td className="border border-gray-600 px-4 py-2 text-center">İlk yüklenmede büyük JS dosyaları cachelenene kadar performans düşebilir</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">Render Zamanı</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">Render işlemi istemcide çalıştığı için sunucuya bağımlı değildir</td>
                    <td className="border border-gray-600 px-4 py-2 text-center">Düşük cihazlarda render süresi uzun olabilir</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-purple-500">
            <b className="text-xl">💡 CSR Kullanım Senaryoları</b>
            <br /><br />
            Diğer render methodlarından farklı olarak, CSR iki şekilde kullanılabilir:
            <br /><br />
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-lg">1.</span>
                <div>
                  <b>useEffect kullanımında çalışır.</b> Sebebi ise useEffect bir react hook'u olduğu için React hookları Javascript'e ihtiyaç duyar. Bu yüzden de Javascript yüklendikten sonra çalışır ve CSR olur.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-lg">2.</span>
                <div>
                  <b>SWR veya TanStack Query</b> gibi bir data-fetching kütüphanesi ile api call yapıldığında otomatik olarak CSR olarak yüklenir.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-200">
          <h1 className="text-3xl font-bold text-center mb-8">
            🚀 Crypto Price Dashboard
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {cryptos.map((coin) => (
              <div
                key={coin.id}
                className="bg-zinc-900 p-6 rounded-2xl shadow-md border border-zinc-700 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    width={48}
                    height={48}
                    src={coin.image}
                    alt={coin.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{coin.name}</h2>
                    <p className="text-zinc-400 uppercase text-sm">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-lg font-medium">
                    💰 ${coin.current_price.toLocaleString()}
                  </p>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/ssr"
            className="group flex items-center justify-start gap-4 border border-gray-300 dark:border-gray-700 rounded-2xl p-5 hover:shadow-xl transition duration-300 hover:bg-gradient-to-r from-teal-100/40 to-white dark:from-teal-900/20 dark:to-black"
          >
            <div className="flex items-center justify-center bg-teal-100 dark:bg-teal-900 rounded-full p-3 group-hover:bg-teal-200 dark:group-hover:bg-teal-800 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 stroke-teal-700 dark:stroke-teal-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Önceki Konu
              </span>
              <span className="font-semibold text-gray-800 dark:text-white text-base">
                SSR (Server-Side Rendering)
              </span>
            </div>
          </Link>

          <Link
            href="/ssg"
            className="group flex items-center justify-end gap-4 border border-gray-300 dark:border-gray-700 rounded-2xl p-5 hover:shadow-xl transition duration-300 hover:bg-gradient-to-l from-blue-100/40 to-white dark:from-blue-900/20 dark:to-black"
          >
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Sonraki Konu
              </span>
              <span className="font-semibold text-gray-800 dark:text-white text-base">
                SSG (Static Site Generation)
              </span>
            </div>
            <div className="flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full p-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 stroke-blue-700 dark:stroke-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Csr;
