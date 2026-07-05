import ApartmentsActions from "./components/ApartmentsActions";
import ApartmentsHeader from "./components/ApartmentsHeader";
import ApartmentsList from "./components/ApartmentsList";
import ApartmentsPagination from "./components/ApartmentsPagination";
import ApartmentsEmpty from "./components/ApartmentsEmpty";
import { getApartments } from "@/api/apartments";
import Container from "../components/Container";

export default async function Apartments({
  searchParams,
}: {
  searchParams: Promise<{ search?: string | string[]; page?: string | string[] }>;
}) {
  const { search, page } = await searchParams;
  const term = Array.isArray(search) ? search[0] : search;
  const pageParam = Array.isArray(page) ? page[0] : page;
  const pageNum = Number(pageParam) || 1;

  const { data: apartments, meta } = await getApartments({
    search: term,
    page: pageNum,
  });

  return (
    <Container>
      <main className="w-full py-10">
        {/* Header */}
        <ApartmentsHeader />

        {/* Search & Filters*/}
        <ApartmentsActions />

        {/* Apartment list, or an empty state when there's nothing to show */}
        {apartments.length > 0 ? (
          <>
            <ApartmentsList apartments={apartments} />
            <ApartmentsPagination meta={meta} />
          </>
        ) : (
          <ApartmentsEmpty search={term} />
        )}
      </main>
    </Container>
  );
}
