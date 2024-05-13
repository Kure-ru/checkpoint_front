import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-baseline bg-pink-100 p-4 sm:px-6 sm:py-12 lg:px-8 sm:flex-wrap">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Checkpoint : frontend
      </h1>
      <Link
        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-pink-600 px-5 py-3 text-white transition hover:text-gray-700 focus:outline-none focus:ring"
        href="/"
      >
        Countries
      </Link>
    </header>
  );
}
