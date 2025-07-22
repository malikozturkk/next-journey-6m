import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
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
            Bu proje, 6 aylık hedef planımın ilk ayında ele aldığım konuları kapsıyor.
            Aşağıdaki başlıklarda, her bir render yöntemini ve cachleme yapılarını ayrı ayrı inceledim ve örneklerle anlattım.
          </p>
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
                label: "SSG (Static Site Generation) nedir ve kullanım senaryoları nelerdir?",
              },
              {
                href: "/isr",
                label:
                  "ISR (Incremental Static Regeneration) nasıl çalışır? Revalidate süreci nasıl işler?",
              },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-3 bg-gray-900 px-4 py-3 rounded-lg border border-gray-700 hover:border-teal-500 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
          Bu ayki hedefim, render yöntemlerini, cachelemeyi ve next.config dosyasını <br />
          hem teorik hem pratik olarak kavramaktı.
        </div>
      </div>
    </div>
  );
}
