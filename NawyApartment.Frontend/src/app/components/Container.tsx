// making a container component to wrap the content of the page and center it with a max width
export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-8">{children}</div>;
}
