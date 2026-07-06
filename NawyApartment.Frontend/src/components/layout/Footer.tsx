export default function Footer() {
  return (
    <footer className="bg-brand py-6 text-center text-white">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Nawy. All rights reserved.
      </p>
    </footer>
  );
}
