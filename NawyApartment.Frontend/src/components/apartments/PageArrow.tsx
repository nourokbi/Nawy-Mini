import Link from "next/link";

const arrowClass =
  "inline-flex h-8 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm font-medium hover:bg-gray-50";

// A Prev/Next arrow: a real link when enabled, an inert (non-focusable) span
// when disabled so keyboard users can't tab into a dead control.
export default function PageArrow({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span
        aria-disabled
        className={`${arrowClass} pointer-events-none opacity-50`}
      >
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={arrowClass}>
      {children}
    </Link>
  );
}
