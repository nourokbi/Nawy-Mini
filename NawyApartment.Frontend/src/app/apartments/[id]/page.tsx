import Container from "@/components/layout/Container";
import { getApartment } from "@/api/apartments";
import ApartmentDetails from "@/components/apartments/details/ApartmentDetails";

type ApartmentDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ApartmentDetailsPage({
  params,
}: ApartmentDetailsPageProps) {
  const { id } = await params;
  const apartment = await getApartment(id);

  return (
    <Container>
      <main className="py-10">
        <ApartmentDetails apartment={apartment} />
      </main>
    </Container>
  );
}
