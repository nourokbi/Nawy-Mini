import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

export default function Navbar() {
  return (
    <header className="border-b-2 border-gray-200 py-4">
      <Container>
        <div className="flex items-center justify-between  text-white">
          <Link href="/" aria-label="Nawy home">
            <Image
              src="/nawy-mini.svg"
              alt="Nawy"
              width={200}
              height={75}
              priority
            />
          </Link>
        </div>
      </Container>
    </header>
  );
}
