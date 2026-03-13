"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="section-frame max-w-lg p-8">
        <h2 className="font-display text-3xl">Something went wrong</h2>
        <p className="mt-4 text-sm text-muted-foreground">{error.message}</p>
        <button
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
