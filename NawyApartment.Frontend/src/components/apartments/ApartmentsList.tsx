import Link from "next/link";
import { Apartment } from "@/types/apartments";
import ApartmentCard from "./ApartmentCard";

type ApartmentsListProps = {
  apartments: Apartment[];
};

export default function ApartmentsList({ apartments }: ApartmentsListProps) {
  return (
    <section className="my-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {apartments.map((apartment) => (
        <Link href={`/apartments/${apartment.id}`} key={apartment.id} className="h-full">
          <ApartmentCard apartment={apartment} />
        </Link>
      ))}
    </section>
  );
}
