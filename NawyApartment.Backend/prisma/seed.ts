// prisma/seed.ts
// Seeds ~18 apartments modeled on real Nawy (nawy.com) listings.
// Run with:  npx prisma db seed   (or)  tsx prisma/seed.ts
import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";

type ApartmentSeed = {
  unitName: string;
  unitNumber: string;
  project: string;
  description?: string;
  price: number; // EGP
  bedrooms: number;
  bathrooms: number;
  area: number; // square meters
  imageUrl?: string;
  address?: string;
};

const apartments: ApartmentSeed[] = [
  {
    unitName: "Garden Apartment",
    unitNumber: "MV-iCity-B4-102",
    project: "Mountain View iCity",
    description:
      "Ground-floor garden apartment in a gated compound with clubhouse, lagoons and 24/7 security. Fully finished with a private garden.",
    price: 9_500_000,
    bedrooms: 3,
    bathrooms: 3,
    area: 165,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    address: "Mountain View iCity, 5th Settlement, New Cairo, Cairo",
  },
  {
    unitName: "Standard Apartment",
    unitNumber: "PH-NewCairo-C2-305",
    project: "Palm Hills New Cairo",
    description:
      "Bright mid-floor apartment overlooking landscaped greenery, walking distance to the club house and retail strip.",
    price: 7_200_000,
    bedrooms: 2,
    bathrooms: 2,
    area: 132,
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    address: "Palm Hills, South 90th Street, New Cairo, Cairo",
  },
  {
    unitName: "Penthouse",
    unitNumber: "SODIC-East-A1-701",
    project: "SODIC East",
    description:
      "Corner penthouse with a large roof terrace and open views. Premium finishing and central AC provisioning.",
    price: 14_800_000,
    bedrooms: 4,
    bathrooms: 4,
    area: 240,
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    address: "SODIC East, New Heliopolis, Shorouk, Cairo",
  },
  {
    unitName: "Chalet",
    unitNumber: "Marassi-Marina-D3-014",
    project: "Marassi",
    description:
      "Sea-view chalet steps from the marina and beach. Ideal summer home with access to hotels, golf and dining.",
    price: 11_300_000,
    bedrooms: 2,
    bathrooms: 2,
    area: 118,
    imageUrl:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
    address: "Marassi, Sidi Abdel Rahman, North Coast, Matrouh",
  },
  {
    unitName: "Family Apartment",
    unitNumber: "Mivida-B12-208",
    project: "Mivida",
    description:
      "Spacious family apartment in a green, walkable community with schools, business park and central lake nearby.",
    price: 8_900_000,
    bedrooms: 3,
    bathrooms: 3,
    area: 178,
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
    address: "Mivida, 5th Settlement, New Cairo, Cairo",
  },
  {
    unitName: "Loft Apartment",
    unitNumber: "ZED-East-T5-406",
    project: "ZED East",
    description:
      "Modern loft in a high-end mixed-use development with sports club, retail and offices at your doorstep.",
    price: 10_600_000,
    bedrooms: 2,
    bathrooms: 2,
    area: 145,
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    address: "ZED East, New Cairo, Cairo",
  },
  {
    unitName: "Standard Apartment",
    unitNumber: "HydePark-P7-113",
    project: "Hyde Park New Cairo",
    description:
      "Well-priced two-bedroom overlooking the central park. Close to the international school and sporting hub.",
    price: 6_400_000,
    bedrooms: 2,
    bathrooms: 2,
    area: 124,
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    address: "Hyde Park, South 90th Street, New Cairo, Cairo",
  },
  {
    unitName: "Duplex",
    unitNumber: "Villette-Sky-9-002",
    project: "Villette",
    description:
      "Two-level duplex with private entrance and roof, set within the Sky Condos district by SODIC.",
    price: 13_200_000,
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    address: "Villette, 5th Settlement, New Cairo, Cairo",
  },
  {
    unitName: "Studio",
    unitNumber: "BloomFields-S2-051",
    project: "Bloomfields",
    description:
      "Efficient studio in a Tatweer Misr community in Mostakbal City. Great starter or rental unit.",
    price: 3_100_000,
    bedrooms: 1,
    bathrooms: 1,
    area: 62,
    imageUrl:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80",
    address: "Bloomfields, Mostakbal City, New Cairo, Cairo",
  },
  {
    unitName: "Standard Apartment",
    unitNumber: "Taj-City-E8-217",
    project: "Taj City",
    description:
      "Three-bedroom apartment minutes from Cairo International Airport, overlooking crystal lagoons.",
    price: 8_100_000,
    bedrooms: 3,
    bathrooms: 2,
    area: 158,
    imageUrl:
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=1200&q=80",
    address: "Taj City, Ring Road, New Cairo, Cairo",
  },
  {
    unitName: "Garden Apartment",
    unitNumber: "Stone-Res-G3-004",
    project: "Stone Residence",
    description:
      "Ground unit with generous private garden in a low-density Roya compound close to Cairo Festival City.",
    price: 9_900_000,
    bedrooms: 3,
    bathrooms: 3,
    area: 185,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    address: "Stone Residence, 5th Settlement, New Cairo, Cairo",
  },
  {
    unitName: "Penthouse",
    unitNumber: "Madinaty-B6-905",
    project: "Madinaty",
    description:
      "Top-floor penthouse with roof in a fully serviced Talaat Moustafa city with golf, schools and malls.",
    price: 12_500_000,
    bedrooms: 4,
    bathrooms: 3,
    area: 230,
    imageUrl:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
    address: "Madinaty, B6, New Cairo, Cairo",
  },
  {
    unitName: "Standard Apartment",
    unitNumber: "OUD-Golf-A9-311",
    project: "O West",
    description:
      "Contemporary apartment by Orascom in 6th of October, overlooking the sports park and jogging tracks.",
    price: 7_800_000,
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    imageUrl:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80",
    address: "O West, 6th of October City, Giza",
  },
  {
    unitName: "Chalet",
    unitNumber: "Hacienda-Bay-L2-027",
    project: "Hacienda Bay",
    description:
      "Lagoon-side chalet in a Palm Hills North Coast resort with private beach, marina and clubhouse.",
    price: 10_200_000,
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    address: "Hacienda Bay, Sidi Abdel Rahman, North Coast, Matrouh",
  },
  {
    unitName: "Family Apartment",
    unitNumber: "Katameya-Coast-C4-118",
    project: "Katameya Coast",
    description:
      "Bright three-bedroom overlooking the largest lagoon in Ras El Hekma, delivered semi-finished.",
    price: 11_900_000,
    bedrooms: 3,
    bathrooms: 3,
    area: 175,
    imageUrl:
      "https://images.unsplash.com/photo-1617104678098-de229db51175?w=1200&q=80",
    address: "Katameya Coast, Ras El Hekma, North Coast, Matrouh",
  },
  {
    unitName: "Standard Apartment",
    unitNumber: "Sarai-M3-209",
    project: "Sarai",
    description:
      "Mid-floor two-bedroom in a MNHD community on the Cairo–Suez road, near the Capital Gardens district.",
    price: 5_600_000,
    bedrooms: 2,
    bathrooms: 2,
    area: 121,
    imageUrl:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
    address: "Sarai, Mostakbal City, New Cairo, Cairo",
  },
  {
    unitName: "Duplex",
    unitNumber: "Uptown-Cairo-H2-061",
    project: "Uptown Cairo",
    description:
      "Hilltop duplex by Emaar in Mokattam with panoramic city views, golf course and clubhouse access.",
    price: 16_400_000,
    bedrooms: 4,
    bathrooms: 4,
    area: 250,
    imageUrl:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    address: "Uptown Cairo, Mokattam, Cairo",
  },
  {
    unitName: "Studio",
    unitNumber: "District5-R1-044",
    project: "District 5",
    description:
      "Compact studio by Marakez in a walkable retail-led community close to the AUC and 90th Street.",
    price: 3_800_000,
    bedrooms: 1,
    bathrooms: 1,
    area: 70,
    imageUrl:
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&q=80",
    address: "District 5, 5th Settlement, New Cairo, Cairo",
  },
  {
    unitName: "Townhouse",
    unitNumber: "MV-iCity-TH-330",
    project: "Mountain View iCity",
    description:
      "Corner townhouse with a private garden and roof in a gated iCity phase with lagoons and a clubhouse.",
    price: 15_700_000,
    bedrooms: 4,
    bathrooms: 4,
    area: 265,
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
    address: "Mountain View iCity, 5th Settlement, New Cairo, Cairo",
  },
  {
    unitName: "Standard Apartment",
    unitNumber: "Zayed-Greens-A2-118",
    project: "Zayed Greens",
    description:
      "Bright two-bedroom overlooking central greenery, minutes from Sphinx Airport and Sheikh Zayed's retail hubs.",
    price: 6_900_000,
    bedrooms: 2,
    bathrooms: 2,
    area: 128,
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
    address: "Zayed Greens, Sheikh Zayed City, Giza",
  },
  {
    // Intentionally missing image and description (edge case for the UI).
    unitName: "Studio",
    unitNumber: "Sample-NoData-000",
    project: "Bloomfields",
    price: 2_500_000,
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    // no imageUrl, no address
  },
];

// Idempotent seed: only insert the sample apartments when the table is empty,
// so existing data is preserved across restarts (e.g. Docker container restarts).

async function main() {
  const existing = await prisma.apartment.count();
  if (existing > 0) {
    console.log(`Database already has ${existing} apartments — skipping seed.`);
    return;
  }

  console.log(`Seeding ${apartments.length} apartments...`);

  const result = await prisma.apartment.createMany({ data: apartments });

  console.log(`✔ Inserted ${result.count} apartments.`);
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
