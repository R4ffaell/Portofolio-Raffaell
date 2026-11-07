import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tighter sm:text-6xl">
        Page not found.
      </h1>
      <p className="mt-5 text-lg text-muted">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-brand px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand/85"
      >
        Back home
      </Link>
    </div>
  );
}
