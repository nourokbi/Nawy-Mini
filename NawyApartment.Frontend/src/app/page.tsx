import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative flex-1 min-h-80 w-full">
        <Image
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80"
          alt="Modern apartment building"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="max-w-3xl text-4xl font-bold capitalize text-white sm:text-5xl">
            Find your dream home
          </h1>
          <p className="mt-4 max-w-xl text-lg text-gray-100">
            Browse curated apartments across Egypt&apos;s top compounds, or list
            a new unit in seconds.
          </p>

          <div className="mt-8 flex flex-row gap-3 sm:gap-4">
            <Link
              href="/apartments"
              className="rounded-lg bg-[#FF5E00] px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#e65400] sm:px-6 sm:py-3 sm:text-base"
            >
              Browse Apartments
            </Link>
            <Link
              href="/apartments/create"
              className="rounded-lg border-2 border-white px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-6 sm:py-3 sm:text-base"
            >
              Create Listing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
