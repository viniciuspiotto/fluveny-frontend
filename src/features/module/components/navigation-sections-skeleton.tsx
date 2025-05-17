export const NavigationSectionsSkeleton = () => {
  return (
    <footer className="bg-primary fixed bottom-0 left-0 w-full overflow-x-auto">
      <div className="flex w-max items-center justify-center gap-4 px-8 py-4 lg:w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-12 w-10 animate-pulse rounded-md bg-zinc-300/20 lg:w-50"
          />
        ))}
      </div>
    </footer>
  );
};
