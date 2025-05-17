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
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useGetGrammarRules } from '../../hooks/use-get-grammar-rules';

interface SelectTopicProps {
  onSelectTopic: (values: string[]) => void;
}

export const SelectTopic = ({ onSelectTopic }: SelectTopicProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const { data: response, isLoading, isError } = useGetGrammarRules();

  const grammarRules = response?.data ?? [];

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
            {isLoading && <CommandItem disabled>Carregando...</CommandItem>}
            {isError && <CommandEmpty>Erro ao carregar tópicos.</CommandEmpty>}
            {!isLoading && grammarRules.length === 0 && (
              <CommandEmpty>Nenhum tópico encontrado.</CommandEmpty>
            )}
            <CommandGroup>
              {grammarRules.map((grammarRule) => (
                <CommandItem
                  key={grammarRule.id}
                  value={grammarRule.id}
                  onSelect={() => toggleTopic(grammarRule.title)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected.includes(grammarRule.id)
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {grammarRule.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
