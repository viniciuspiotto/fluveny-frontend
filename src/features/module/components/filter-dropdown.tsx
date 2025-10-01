import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { type ReactNode } from 'react';

interface FilterDropdownProps<T extends string> {
  triggerText: string;
  items: Readonly<Array<{ value: T; label: ReactNode }>>;
  selectedValues: T[];
  onValueChange: (value: T) => void;
}

export const FilterDropdown = <T extends string>({
  triggerText,
  items,
  selectedValues,
  onValueChange,
}: FilterDropdownProps<T>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-auto items-center gap-2 rounded-lg border-zinc-300 px-4 py-3.5 text-base font-normal"
        >
          {triggerText}
          <ChevronDown className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2" align="start">
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-2.5 rounded-md p-2.5 text-base hover:bg-zinc-100"
            >
              <Checkbox
                className="size-4"
                checked={selectedValues.includes(item.value)}
                onCheckedChange={() => onValueChange(item.value)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
