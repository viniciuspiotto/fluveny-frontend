export const NavigationSectionsSkeleton = () => {
  return (
    <footer className="bg-primary fixed bottom-0 left-0 w-full overflow-x-auto">
      <div className="flex w-full items-center justify-center gap-3 px-4 py-4 lg:w-full lg:gap-6 lg:px-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="size-12 animate-pulse rounded-md bg-zinc-300/20 lg:w-50"
          />
        ))}
      </div>
    </footer>
  );
};
