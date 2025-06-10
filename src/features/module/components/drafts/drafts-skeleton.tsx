export const DraftsSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="mx-auto h-10 w-40 animate-pulse rounded bg-zinc-200 lg:h-14 lg:w-80" />
      <div className="ml-auto h-10 w-30 animate-pulse rounded bg-zinc-200 lg:h-11 lg:w-40" />
      <div className="h-12 w-full animate-pulse rounded bg-zinc-200 lg:h-13 lg:w-200" />
      <div className="grid grid-rows-4 gap-4 lg:grid-cols-3 lg:grid-rows-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl bg-zinc-200 lg:h-60"
          />
        ))}
      </div>
    </div>
  );
};
