import Link from "next/link";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

export default function Isr({ product }: any) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-300 text-xl">
        Ürün yükleniyor...
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
          🛒 ISR Sayfa
        </h1>

        <div className="space-y-6 text-gray-300 leading-relaxed text-[15px]">
          <p className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-yellow-500">
            <b className="text-xl">Bu sayfamda ISR seçme sebebim;</b> <br />
            1. Ürün sayfası ziyaret edildiğinde eğer daha önce oluşturulmamışsa
            anında oluşturulması ve cache'e alınması için{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              ISR
            </code>{" "}
            kullandım. <br />
            2. Her ziyaret için API'ye gitmek istemediğimden{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              SSG
            </code>{" "}
            gibi statik olsun istedim, ama aynı zamanda{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              revalidate
            </code>{" "}
            sayesinde belirli aralıklarla yenilensin. <br />
            3. Ürün sayfaları SEO için önemli olduğu için{" "}
            <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
              CSR
            </code>{" "}
            yerine önceden render edilmiş HTML gerekiyor.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <img
            src={product.image}
            alt={product.title}
            className="w-48 h-auto mx-auto"
          />
          <p>
            <strong>Fiyat:</strong> ${product.price}
          </p>
          <p>
            <strong>Kategori:</strong> {product.category}
          </p>
          <p>{product.description}</p>
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
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products/1");

  if (!res.ok) {
    return { notFound: true };
  }

  const product = await res.json();

  return {
    props: { product },
    revalidate: 60,
  };
};
