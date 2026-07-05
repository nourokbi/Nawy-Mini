import { Bed, Bath, Ruler } from "lucide-react";
import { Apartment } from "@/app/apartments/types";

type ApartmentCardProps = {
  apartment: Apartment;
};

// EGP price like "9,500,000 EGP"
const priceFormatter = new Intl.NumberFormat("en-EG");

// Local placeholder shown when the image URL is missing or fails to load.
const FALLBACK_SRC = "/apartment-placeholder.svg";

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  const src = apartment.imageUrl?.trim() ? apartment.imageUrl : FALLBACK_SRC;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={apartment.unitName}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#1E4164] px-3 py-1 text-xs font-medium text-white">
          {apartment.project}
        </span>
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1E4164]">
            {apartment.unitName}
          </h2>
          <p className="truncate text-sm text-gray-500">
            {apartment.address || "Address not provided"}
          </p>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-[#1E4164]" />
            {apartment.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-[#1E4164]" />
            {apartment.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Ruler className="h-4 w-4 text-[#1E4164]" />
            {apartment.area} m²
          </span>
        </div>

        <p className="mt-auto text-xl font-bold text-black">
          {priceFormatter.format(apartment.price)} EGP
        </p>
      </div>
    </article>
  );
}
