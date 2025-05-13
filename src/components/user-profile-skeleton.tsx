export const UserProfileSkeleton = () => {
  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-1">
        <div className="flex h-7 w-50 animate-pulse items-end gap-2 rounded-md bg-zinc-200" />
        <div className="h-5 w-34 animate-pulse rounded-md bg-zinc-200" />
      </div>
      <div className="size-14 animate-pulse rounded-full bg-zinc-200" />
    </div>
  );
};
