import Link from "next/link";
import { ArrowLeft, Bed, Bath, Ruler, MapPin, Hash } from "lucide-react";
import { Apartment } from "@/types/apartments";
import { formatPrice, resolveImageSrc } from "@/lib/helpers";

type ApartmentDetailsProps = {
  apartment: Apartment;
};

export default function ApartmentDetails({ apartment }: ApartmentDetailsProps) {
  const imageSrc = resolveImageSrc(apartment.imageUrl);

  const specs = [
    { icon: Bed, label: "Bedrooms", value: apartment.bedrooms },
    { icon: Bath, label: "Bathrooms", value: apartment.bathrooms },
    { icon: Ruler, label: "Area", value: `${apartment.area} m²` },
  ];

  return (
    <div>
      <Link
        href="/apartments"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to apartments
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-gray-200 sm:h-96">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={apartment.unitName}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-sm font-medium text-white">
            {apartment.project}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-brand sm:text-4xl">
            {apartment.unitName}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-gray-500">
            <MapPin className="h-4 w-4 shrink-0" />
            {apartment.address || "Address not provided"}
          </p>

          <p className="mt-4 text-3xl font-bold text-black">
            {formatPrice(apartment.price)}
          </p>

          {/* Specs */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {specs.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 p-4 text-center"
              >
                <Icon className="h-5 w-5 text-brand" />
                <span className="text-lg font-semibold text-brand">
                  {value}
                </span>
                <span className="text-xs text-gray-500">{label}</span>
              </div>
            ))}
          </div>

          {/* Unit number */}
          <p className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <Hash className="h-4 w-4 shrink-0" />
            Unit number:
            <span className="font-medium text-gray-700">
              {apartment.unitNumber}
            </span>
          </p>
        </div>
      </div>

      {/* Description */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-brand">Description</h2>
        <p className="mt-3 leading-relaxed text-gray-600">
          {apartment.description || "No description provided."}
        </p>
      </section>
    </div>
  );
}
