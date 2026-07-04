import ApartmentsActions from "./components/ApartmentsActions";
import ApartmentsHeader from "./components/ApartmentsHeader";
import ApartmentsList from "./components/ApartmentsList";
import { getApartments } from "./api";
import Container from "../components/Container";

export default async function Apartments({
  searchParams,
}: {
  searchParams: Promise<{ search?: string | string[] }>;
}) {
  const { search } = await searchParams;
  const term = Array.isArray(search) ? search[0] : search;
  const apartments = await getApartments(term);

  return (
    <Container>
      <main className="py-10">
        {/* Header */}
        <ApartmentsHeader />

        {/* Search & Filters*/}
        <ApartmentsActions />

        {/* Apartment list */}
        <ApartmentsList apartments={apartments} />
      </main>
    </Container>
  );
}
