import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center p-6 gap-4 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p>This link may have changed. Browse the current available deals.</p>
      <Link className="rounded-full bg-brand text-white px-6 py-3" to="/deals">
        Browse deals
      </Link>
      <Link className="underline" to="/">
        Return home
      </Link>
    </main>
  );
}
