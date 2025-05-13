import { Plus } from 'lucide-react';

export const BannerUpload = () => {
  return (
    <div className="flex h-32 cursor-pointer items-center justify-center bg-zinc-200 transition duration-400 hover:bg-zinc-300">
      <Plus className="size-8 text-zinc-500" />
    </div>
  );
};
