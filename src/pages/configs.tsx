import Link from "next/link";
import Logo from "../assets/logo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Configs() {
  const [headerValue, setHeaderValue] = useState<string | null>(null);
  const [robotsValue, setRobotsValue] = useState<string | null>(null);
  const [poweredValue, setPoweredValue] = useState<string | null>(null);
  const [rewriteData, setRewriteData] = useState<any>(null);

  useEffect(() => {
    fetch("/about")
      .then((res) => {
        setHeaderValue(res.headers.get("X-Custom-Header"));
        setRobotsValue(res.headers.get("X-Robots-Tag"));
        setPoweredValue(res.headers.get("X-Powered-By-Custom"));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("/api/user/1")
      .then((res) => res.json())
      .then((data) => setRewriteData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-10">
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
          🛠 Config ayarları ile örnekler
        </h1>

        <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-blue-500 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">
            Örnek 1 – Image Optimization
          </h2>
          <Image
            src="https://placecats.com/neo_2/300/200"
            alt="Kedi"
            width={800}
            height={500}
            className="rounded-lg"
          />
          <p className="mt-2 text-sm text-gray-400">
            Bu görsel izin verilen domain’den geldi ve optimize edildi.
          </p>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-purple-500 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">
            Örnek 2 – HTTP Header
          </h2>
          <p>
            <b>X-Custom-Header:</b> {headerValue || "Yükleniyor..."}
          </p>
          <p>
            <b>X-Robots-Tag:</b> {robotsValue || "Yükleniyor..."}
          </p>
          <p>
            <b>X-Powered-By-Custom:</b> {poweredValue || "Yükleniyor..."}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Bu değerler Next.js <code>headers()</code> ile eklendi.
          </p>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-pink-500 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-pink-300">
            Örnek 3 – Rewrites ile API Proxy
          </h2>
          <pre className="bg-gray-900 p-4 rounded-lg text-xs text-left overflow-x-auto">
            {rewriteData
              ? JSON.stringify(rewriteData, null, 2)
              : "API'den veri yükleniyor..."}
          </pre>
          <p className="mt-2 text-sm text-gray-400">
            /api/user/1 isteği <code>jsonplaceholder.typicode.com</code>{" "}
            API’sine yönlendirildi.
          </p>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-red-500 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-red-300">
            Örnek 4 – Redirect testi
          </h2>
          <Link href="/old-blog/test-yazi" className="text-blue-400 underline">
            Eski blog linkine git
          </Link>
          <p className="mt-2 text-sm text-gray-400">
            Tıkladığında tarayıcı otomatik /new-blog/test-yazi adresine gider.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/webpack"
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
                Webpack Ayarı
              </span>
            </div>
          </Link>

          <Link
            href="/configs"
            className="group flex items-center justify-end gap-4 border border-gray-300 dark:border-gray-700 rounded-2xl p-5 hover:shadow-xl transition duration-300 hover:bg-gradient-to-l from-blue-100/40 to-white dark:from-blue-900/20 dark:to-black"
          >
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Sonraki Konu
              </span>
              <span className="font-semibold text-gray-800 dark:text-white text-base">
                Configs (Next.config özellikleri)
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
