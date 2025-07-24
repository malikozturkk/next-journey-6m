import Link from "next/link";
import React from "react";

export default function SsrPage({ time }: any) {
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
          🕒 SSR Sayfa
        </h1>

        <div className="space-y-6 text-gray-300 leading-relaxed text-[15px]">
          <p className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-yellow-500">
            <b className="text-xl">Bu sayfamda SSR seçme sebebim;</b> <br />
            1. Saat bilgisinin sürekli güncellenmesi gerektiği için{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              SSG veya ISR
            </code>{" "}
            yerine{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              SSR
            </code>{" "}
            seçtim. <br />
            2. Ön yüzde kullanıcıya özel / kullanıcıyla etkileşim gerektiren bir
            içerik olmayacağı veya herhangi bir client hook'u kullanmayacağım
            için{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              CSR
            </code>{" "}
            yerine{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              SSR
            </code>{" "}
            seçtim. <br />
          </p>
          <p className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-teal-500">
            Sunucuya bu sayfa için istek geldiği an, öncelikle{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              getServerSideProps
            </code>{" "}
            fonksiyonu tetiklenir ve içerisindeki API'ye istek atar. Ardından
            veriyi aldıktan sonra, Next.js bu aşamada{" "}
            <span className="text-white font-semibold">
              SSR render sürecindeyken
            </span>{" "}
            React bileşenini{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              getServerSideProps
            </code>
            'dan dönen <span className="text-white font-semibold">props</span>{" "}
            ile sunucuda render eder. Bu işlem sonunda sunucuda oluşan HTML
            yanıt olarak döner.
            <br />
            <span className="text-teal-400 font-medium">
              Bu işlem her sayfa isteğinde tekrar edilir
            </span>{" "}
            ve sayfa her zaman güncel verilerle yeniden oluşturulur.
            <br />
            <span className="text-white">CSR ile farkı:</span> Tüm işlemler
            sunucuda gerçekleştiğinden, hem{" "}
            <span className="text-emerald-400">güvenli</span> (gizli veriler
            için) hem de <span className="text-emerald-400">hızlıdır</span>.
          </p>

          <p className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-blue-500">
            Projeyi{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              yarn start
            </code>{" "}
            komutuyla çalıştırınca,{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              .next
            </code>{" "}
            klasörü altındaki build edilmiş js dosyalarıyla production modda
            başlar.
            <br />
            Bu modda{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              getServerSideProps
            </code>{" "}
            her kullanıcı isteğinde çağrılır, API çağrısını yapar ve{" "}
            <span className="text-white font-medium">
              HTML çıktısını sunucuya inject ederek döner
            </span>
            .
            <br />
            <span className="text-orange-300">
              Build sırasında herhangi bir HTML oluşturulmaz yalnızca sayfanın
              ssr yükleneceği bilgisi .next altında tutulur
            </span>
            ; her şey isteğin geldiği anda oluşturulur.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-teal-300 text-center">
            📍 Londra Güncel Saati
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-300">
            <div>
              <span className="text-gray-400">Tarih:</span> {time.date}
            </div>
            <div>
              <span className="text-gray-400">Saat:</span> {time.time}
            </div>
            <div>
              <span className="text-gray-400">Gün:</span> {time.dayOfWeek}
            </div>
            <div>
              <span className="text-gray-400">Gün Doğumu:</span> {time.sunrise}
            </div>
            <div>
              <span className="text-gray-400">Gün Batımı:</span> {time.sunset}
            </div>
            <div>
              <span className="text-gray-400">Öğle Vakti:</span> {time.noonTime}
            </div>
            <div>
              <span className="text-gray-400">DST Aktif mi:</span>{" "}
              {time.dstActive ? "Evet" : "Hayır"}
            </div>
            <div>
              <span className="text-gray-400">Lokasyon:</span>{" "}
              {time.timezone.country}
            </div>
            <div>
              <span className="text-gray-400">Zaman Dilimi:</span>{" "}
              {time.timezone.name} ({time.timezone.timezone})
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-4">
          <h3 className="text-xl font-semibold text-blue-300 text-center">
            🌍 Popüler Şehirlerde Saat
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300 text-sm">
            {time.populerCities.map((city: any) => (
              <li
                key={city.slug}
                className="bg-gray-800 p-3 rounded-md border border-gray-700"
              >
                <span className="text-white font-medium">{city.name}</span> —{" "}
                {city.hour}:{city.minute.toString().padStart(2, "0")}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-4">
          <h3 className="text-xl font-semibold text-orange-300 text-center">
            🗺️ Tüm Şehirler
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {time.allCities.map((city: any) => (
              <li
                key={city.slug}
                className="bg-gray-800 px-4 py-2 rounded-md border border-gray-700"
              >
                {city.name} — {city.country} ({city.timezone})
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
          <div />
          <Link
            href="/csr"
            className="group flex items-center justify-end gap-4 border border-gray-300 dark:border-gray-700 rounded-2xl p-5 hover:shadow-xl transition duration-300 hover:bg-gradient-to-l from-blue-100/40 to-white dark:from-blue-900/20 dark:to-black"
          >
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Sonraki Konu
              </span>
              <span className="font-semibold text-gray-800 dark:text-white text-base">
                CSR (Client-Side Rendering)
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
}

export async function getServerSideProps() {
  const res = await fetch("https://sorgulat.com/api/timezones/londra");
  const time = await res.json();

  return { props: { time } };
}
