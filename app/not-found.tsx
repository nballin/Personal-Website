import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-3xl font-semibold">This tile doesn&apos;t exist.</h1>
        <Link href="/" className="btn btn-primary mt-6">
          Back to the board
        </Link>
      </div>
    </main>
  );
}
