import Link from "next/link";
import React from "react";

export default function SsgPage({ universities }: any) {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/10 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5-4h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4m0 0l2 2m-2-2l-2-2" />
            </svg>
            İçindekiler
          </Link>
        </div>
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-md">🎓 SSG Sayfa</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed text-[15px]">
          <p className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-yellow-500">
            <b className="text-xl">Bu sayfamda SSG seçme sebebim;</b> <br />
            1. Türkiye'deki Üniversiteler verisi dinamik olarak veya sık sık değişmiyor, dümdüz get endpointinden aldığım değişmeyen veri. <br />
            2. Bunun gibi statik sayfalarda <code className="bg-gray-700 px-1 rounded text-sm">SSG</code> yerine herhangi bir render methodunu seçmek çok gereksiz bir performans kaybına sebep olurdu. <br />
            3. <code className="bg-gray-700 px-1 rounded text-sm">SSG</code> yerine <code className="bg-gray-700 px-1 rounded text-sm">SSR veya CSR</code> seçmememin sebebi zaten statik veri ve güncellenmeyecek bu yüzden direkt statik tutup onu render etmek daha mantıklı.<br/>
            4. <code className="bg-gray-700 px-1 rounded text-sm">SSG</code> yerine <code className="bg-gray-700 px-1 rounded text-sm">ISR</code> seçmememin sebebi ise, verinin değişmesi için ülkede yeni bir üniversite açılması gerektiği, bu da çok zor olacağı için öyle 1 günde bir git yenile gibi bir şey yapmaya gerek yok.
          </p>
          <p className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-teal-500">
            getStaticProps ile build anında bir kere veriyi alıp bir sonraki builde kadar sayfamı o statik veri
            ve statik HTML dosyası ile göstermek performans açısından en mantıklı hareket oluyor. Çünkü
            her sayfaya girince yeni istek atılsaydı; hem sunucuya gereksiz
            maliyet olurdu, hem de sayfanın yüklenmesini yavaşlatabilirdi. Ek
            olarak Nextjs'de hiçbir render yöntemi (SSR, CSR, ISR, SSG)
            kullanılmadan render edilirse, sayfamız default olarak SSG
            (getStaticProps) ile yüklenir, bunu da production'a yayına alırken
            .next klasörü içine bakarak görebiliriz statik HTML dosyası olarak
            build alınıyor. Bu dosyayı da şu path'de bulabiliriz:
            <code className="bg-gray-700 px-1 rounded text-sm">
              .next/server/pages/ssg.html
            </code>
          </p>

          <p className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-blue-500">
            Projeyi{" "}
            <code className="bg-gray-700 px-1 rounded text-sm">yarn start</code>{" "}
            komutuyla çalıştırınca{" "}
            <code className="bg-gray-700 px-1 rounded text-sm">.next</code>{" "}
            klasörü altında (build alınmış dosyalar) ile çalıştırır yani
            production modda. Bu moddayken SSG sayfamız (getStaticProps){" "}
            <code className="bg-gray-700 px-1 rounded text-sm">.next</code>{" "}
            klasörüne en son hangi haliyle build alındıysa her yüklendiğinde o
            hali render edilecek.
          </p>

          <p className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-pink-500">
            Ancak projeyi{" "}
            <code className="bg-gray-700 px-1 rounded text-sm">yarn dev</code>{" "}
            ile çalıştırınca development mode olduğu için build alınmamış ham
            sayfaları render eder ve bu durumda da{" "}
            <code className="bg-gray-700 px-1 rounded text-sm">
              getStaticProps
            </code>{" "}
            gibi çalışmaz, her sayfaya istek geldiğinde yeniden API call yapar.
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-teal-300">
            📌 Üniversiteler
          </h2>
          <div className="space-y-2">
            {universities.data.map((university: any) => (
              <div
                key={university.id}
                className="bg-gray-800 rounded-md px-4 py-2 border border-gray-700 hover:border-teal-500 transition"
              >
                <p className="text-white font-medium">{university.name}</p>
                <p className="text-gray-400 text-sm">
                  {university.city} — {university.contacts.phone}
                </p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4 text-center">
            Toplam <span className="text-white">{universities.total}</span>{" "}
            üniversite bulundu | Sayfa{" "}
            <span className="text-white">{universities.page}</span>
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/csr"
            className="group flex items-center justify-start gap-4 border border-gray-300 dark:border-gray-700 rounded-2xl p-5 hover:shadow-xl transition duration-300 hover:bg-gradient-to-r from-teal-100/40 to-white dark:from-teal-900/20 dark:to-black"
          >
            <div className="flex items-center justify-center bg-teal-100 dark:bg-teal-900 rounded-full p-3 group-hover:bg-teal-200 dark:group-hover:bg-teal-800 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-teal-700 dark:stroke-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">Önceki Konu</span>
              <span className="font-semibold text-gray-800 dark:text-white text-base">CSR (Client-Side Rendering)</span>
            </div>
          </Link>

          <Link
            href="/isr"
            className="group flex items-center justify-end gap-4 border border-gray-300 dark:border-gray-700 rounded-2xl p-5 hover:shadow-xl transition duration-300 hover:bg-gradient-to-l from-blue-100/40 to-white dark:from-blue-900/20 dark:to-black"
          >
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-500 dark:text-gray-400">Sonraki Konu</span>
              <span className="font-semibold text-gray-800 dark:text-white text-base">ISR (Incremental Static Regeneration)</span>
            </div>
            <div className="flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full p-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-blue-700 dark:stroke-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

export async function getStaticProps() {
  const res = await fetch(
    "https://sorgulat.com/api/schools/universities?limit=14"
  );
  const universities = await res.json();

  return {
    props: { universities },
  };
}
