import Image from "next/image";

export default function Home() {
  return (
    <main className="py-10 relative min-h-1/2">
      <Image
        src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80"
        alt="background image"
        // width={1200}
        // height={80}
        className="max-w-full"
        fill
      />
    </main>
  );
}
