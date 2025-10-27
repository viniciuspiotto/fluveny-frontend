import { cn } from '@/app/utils/cn';

interface DistrationProps {
  index: number;
  distration: string;
  onClick(index: number): void;
  className: string;
}

export const Distration = ({
  index,
  distration,
  onClick,
  className,
}: DistrationProps) => {
  return (
    <li
      className={cn(
        'bg-primary rounded-md border py-1 text-center text-white',
        className,
      )}
      onClick={() => onClick(index)}
    >
      {distration}
    </li>
  );
};
