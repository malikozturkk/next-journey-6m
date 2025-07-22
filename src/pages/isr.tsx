import Link from "next/link";
import React from "react";

const Isr = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-md">🕒 ISR Sayfa</h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
          <Link
            href="/ssg"
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
              <span className="font-semibold text-gray-800 dark:text-white text-base">SSG (Static Site Generation)</span>
            </div>
          </Link>
          <div />
        </div>
      </div>
    </div>
  )
};

export default Isr;
