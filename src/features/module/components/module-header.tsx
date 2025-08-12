interface ModuleHeaderProps {
  step: string;
}

export const ModuleHeader = ({ step }: ModuleHeaderProps) => {
  return (
    <div className="relative flex w-full items-center justify-center py-10">
      <h2 className="mt-10 px-15 text-center text-3xl font-bold tracking-widest">
        {step}
      </h2>
    </div>
  );
};
