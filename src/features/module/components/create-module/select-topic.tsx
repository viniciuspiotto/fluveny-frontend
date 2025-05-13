import { cn } from '@/app/utils/cn';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { topicsMock } from '@/mocks/topics';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

// TODO: Melhorar o commandContent
export const SelectTopic = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-md w-full justify-between overflow-hidden py-6 text-zinc-700"
        >
          {value
            ? topicsMock.find((topic) => topic.value === value)?.label
            : 'Selecione um tópico...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="bottom" className="w-85 p-0 lg:w-120">
        <Command>
          <CommandInput placeholder="Selecione um tópico..." />
          <CommandList>
            <CommandEmpty>Tópico não encontrado.</CommandEmpty>
            <CommandGroup>
              {topicsMock.map((topic) => (
                <CommandItem
                  key={topic.value}
                  value={topic.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === topic.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {topic.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
