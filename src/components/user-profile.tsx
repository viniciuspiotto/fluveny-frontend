import { Avatar, AvatarImage } from '@/components/ui/avatar';

// TODO: fazer componente de barra de progresso
export const UserProfile = () => {
  return (
    <div className="hidden gap-10 lg:flex">
      <div className="flex flex-col">
        <div className="flex items-end gap-2">
          <span className="text-lg font-bold">Joe Doe</span>
          <span className="text-sm font-light text-zinc-400">O escritor</span>
        </div>
        <div className="flex flex-col">
          <span className="text-zinc-400">12830 / 18000 xp</span>
        </div>
      </div>
      <Avatar className="size-14">
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
    </div>
  );
};
