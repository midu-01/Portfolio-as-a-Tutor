export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="section-frame w-full max-w-md p-8 text-center">
        <p className="font-display text-2xl">Loading portfolio...</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Preparing content, theme, and sections.
        </p>
      </div>
    </div>
  );
}
