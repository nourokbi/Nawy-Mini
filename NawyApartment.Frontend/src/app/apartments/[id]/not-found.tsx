import Link from "next/link";
import Container from "@/app/components/Container";

export default function ApartmentNotFound() {
  return (
    <Container>
      <main className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <h1 className="text-3xl font-bold text-[#1E4164]">
          Apartment not found
        </h1>
        <p className="mt-3 text-gray-600">
          The apartment you&apos;re looking for doesn&apos;t exist or was
          removed.
        </p>
        <Link
          href="/apartments"
          className="mt-6 rounded-lg bg-[#FF5E00] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e65400]"
        >
          Back to apartments
        </Link>
      </main>
    </Container>
  );
}
