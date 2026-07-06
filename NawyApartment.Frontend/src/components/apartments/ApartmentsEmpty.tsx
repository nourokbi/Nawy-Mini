import { SearchX } from "lucide-react";

type ApartmentsEmptyProps = {
  search?: string;
};

// Shown when there are no apartments to display: empty database,
// a search with no matches, or the backend being unreachable.
export default function ApartmentsEmpty({ search }: ApartmentsEmptyProps) {
  return (
    <div className="my-16 flex flex-col items-center justify-center gap-3 text-center">
      <SearchX className="h-10 w-10 text-gray-400" />
      <p className="text-lg font-semibold text-brand">
        {search ? `No apartments match “${search}”` : "No apartments to show"}
      </p>
      <p className="text-sm text-gray-500">
        {search
          ? "Try a different unit name, unit number, or project."
          : "There’s nothing here right now — please check back later."}
      </p>
    </div>
  );
}
