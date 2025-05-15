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

interface SelectTopicProps {
  onSelectTopic: (values: string[]) => void;
}

export const SelectTopic = ({ onSelectTopic }: SelectTopicProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleTopic = (value: string) => {
    const isSelected = selected.includes(value);
    let next: string[];

    if (isSelected) {
      next = selected.filter((v) => v !== value);
    } else {
      if (selected.length >= 5) return;
      next = [...selected, value];
    }

    setSelected(next);
    onSelectTopic(next);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-md w-full justify-between overflow-hidden py-6 text-zinc-700"
        >
          Selecione os tópicos...
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" side="bottom" className="w-85 p-0 lg:w-120">
        <Command className="text-left">
          <CommandInput placeholder="Selecione um tópico..." />
          <CommandList>
            <CommandEmpty>Tópico não encontrado.</CommandEmpty>
            <CommandGroup>
              {topicsMock.map((topic) => (
                <CommandItem
                  key={topic.value}
                  value={topic.value}
                  onSelect={() => toggleTopic(topic.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected.includes(topic.value)
                        ? 'opacity-100'
                        : 'opacity-0',
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
