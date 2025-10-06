import { LoaderCircle } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 p-8">
        <div className="text-foreground animate-word-enter flex flex-col items-center gap-3">
          <LoaderCircle className="text-primary h-8 w-8 animate-spin" />
          <h1 className="text-2xl font-medium tracking-tight">Carregando...</h1>
        </div>

        <div
          className="bg-secondary animate-word-enter relative h-2 w-full overflow-hidden rounded-full"
          style={{ animationDelay: '100ms' }}
        >
          <div className="animate-indeterminate-progress bg-primary absolute h-full w-full origin-center rounded-full" />
        </div>
      </div>
    </div>
  );
};
