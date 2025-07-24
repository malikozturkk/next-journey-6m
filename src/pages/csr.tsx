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
          <p className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-teal-500">
            Sunucuya bu sayfa için istek geldiği an, öncelikle NextJs{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              {'<div id="__next"></div>'}
            </code>{" "}
            bu div'in olduğu HTML'i tarayıcıya gönderir. Ardından tarayıcı
            Javascript'i indirmeye başlar, bu süreçte sayfa beyaz ekran kalır.
            Sayfanın Javascript dosyasını indirmek için, NextJs'in gönderdiği
            HTML dosyasındaki{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              {'<script src="...">'}
            </code>{" "}
            satırlarını takip eder ve Javascript'leri indirir. Ardından React{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              {"<App />"}
            </code>{" "}
            componentini{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              {'<div id="__next"></div>'}
            </code>{" "}
            in içine render eder. <br />
          </p>

          <p className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-pink-500">
            Kodsal olarak baktığımızda ise Javascript yüklendikten sonra{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              useEffect
            </code>{" "}
            çalışır ve data fetching yaparak sayfayı render eder. Data fetching
            yaptığı ana kadar{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              Loading
            </code>{" "}
            görülür.
          </p>
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
