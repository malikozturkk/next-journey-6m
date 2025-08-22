import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/ride-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pickup, drop }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ " + data.message);
        setPickup("");
        setDrop("");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      setMessage("❌ Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-black text-white px-6 py-10`}
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-md text-teal-300">
            📌 1. Ay – Rendering & Cacheleme
          </h1>
          <p className="text-gray-400 text-md sm:text-lg">
            Bu proje, 6 aylık hedef planımın ilk ayında ele aldığım konuları
            kapsıyor. Aşağıdaki başlıklarda, her bir render yöntemini ve
            cachleme yapılarını ayrı ayrı inceledim ve örneklerle anlattım.
          </p>
        </div>

        {/* Kafka Sürüş İsteği Form'u */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-yellow-400 border-b border-yellow-400 pb-2 mb-4">
            🚖 Kafka Sürüş İsteği
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="pickup"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Nereden
                </label>
                <input
                  type="text"
                  id="pickup"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Örn: Ataşehir"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="drop"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Nereye
                </label>
                <input
                  type="text"
                  id="drop"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="Örn: Kadıköy"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Gönderiliyor...
                </>
              ) : (
                <>🚀 Sürüş İsteği Gönder</>
              )}
            </button>
          </form>
          {message && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${
                message.includes("✅")
                  ? "bg-green-900 text-green-300"
                  : "bg-red-900 text-red-300"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-yellow-400 border-b border-yellow-400 pb-1">
            🔍 Konu Listesi
          </h2>
          <ul className="space-y-4 text-[15px]">
            {[
              {
                href: "/ssr",
                label:
                  "SSR (Server-Side Rendering) nedir? Ne zaman tercih edilir, avantajları ve dezavantajları neler?",
              },
              {
                href: "/csr",
                label:
                  "CSR (Client-Side Rendering) nedir? Hangi durumlar için daha uygun olur?",
              },
              {
                href: "/ssg",
                label:
                  "SSG (Static Site Generation) nedir ve kullanım senaryoları nelerdir?",
              },
              {
                href: "/isr",
                label:
                  "ISR (Incremental Static Regeneration) nasıl çalışır? Revalidate süreci nasıl işler?",
              },
              {
                href: "/webpack",
                label:
                  "Webpack ayarı nedir? next.config dosyasında nasıl yapılır ve neler yapılabilir?",
              },
              {
                href: "/configs",
                label:
                  "Next.config.ts içerisindeki eklenebilecek bazı config ayarları",
              },
              {
                href: "/cache-demo",
                label: "Cache Demo",
              },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-3 bg-gray-900 px-4 py-3 rounded-lg border border-gray-700 hover:border-teal-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  <span className="text-white group-hover:text-teal-300 transition">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center text-gray-500 text-sm pt-10">
          Her başlık, uygulamalı örneklerle desteklendi. <br />
          Bu ayki hedefim, render yöntemlerini, cachelemeyi ve next.config
          dosyasını <br />
          hem teorik hem pratik olarak kavramaktı.
        </div>
      </div>
    </div>
  );
}
