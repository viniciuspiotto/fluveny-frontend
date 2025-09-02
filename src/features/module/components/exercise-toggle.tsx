import { Toggle } from '@/components/ui/toggle';
import type { ReactNode } from 'react';

interface SkillToggleProps {
  isPressed: boolean;
  onClick: () => void;
  label: string;
  icon: ReactNode;
}

export const SkillToggle = ({
  isPressed,
  onClick,
  label,
  icon,
}: SkillToggleProps) => {
  return (
    <div className="m-2 flex flex-1 flex-col items-center">
      <Toggle
        className="data-[state=on]:border-primary flex h-24 w-24 cursor-pointer items-center justify-center border-2"
        onPressedChange={onClick}
        pressed={isPressed}
      >
        {icon}
      </Toggle>
      <p className="mt-1 text-center text-sm">{label}</p>
    </div>
  );
};
