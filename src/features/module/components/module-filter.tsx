import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';
import { createParser } from 'nuqs/server';
import { FilterDropdown } from './filter-dropdown';

const grammarRules = ['rule1', 'rule2', 'rule3', 'rule4'] as const;
const difficultyLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
const statusOptions = {
  in_progress: 'Em Andamento',
  completed: 'Finalizados',
  not_started: 'Não iniciados',
  favorites: 'Favoritos',
} as const;

type StatusKey = keyof typeof statusOptions;

const parseAsEnum = <T extends string>(validValues: readonly T[]) =>
  createParser({
    parse: (value) => {
      return validValues.includes(value as T) ? (value as T) : null;
    },
    serialize: (value) => String(value),
  });

const parsers = {
  q: parseAsString.withDefault(''),
  grammarRules: parseAsArrayOf(parseAsEnum(grammarRules)).withDefault([]),
  levels: parseAsArrayOf(parseAsEnum(difficultyLevels)).withDefault([]),
  statuses: parseAsArrayOf(
    parseAsEnum(Object.keys(statusOptions) as StatusKey[]),
  ).withDefault([]),
};

export const ModuleFilter = () => {
  const [filters, setFilters] = useQueryStates(parsers);

  const handleLevelChange = (level: (typeof difficultyLevels)[number]) => {
    const newLevels = filters.levels.includes(level)
      ? filters.levels.filter((l) => l !== level)
      : [...filters.levels, level];
    setFilters({ levels: newLevels });
  };

  const handleGrammarRuleChange = (
    grammarRule: (typeof grammarRules)[number],
  ) => {
    const newGrammarRules = filters.grammarRules.includes(grammarRule)
      ? filters.grammarRules.filter((gr) => gr !== grammarRule)
      : [...filters.grammarRules, grammarRule];
    setFilters({ grammarRules: newGrammarRules });
  };

  const handleStatusChange = (status: StatusKey) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    setFilters({ statuses: newStatuses });
  };

  const handleClearFilters = () => {
    setFilters({ q: '', grammarRules: [], levels: [], statuses: [] });
  };

  const hasActiveFilters =
    filters.q !== '' ||
    filters.grammarRules.length > 0 ||
    filters.levels.length > 0 ||
    filters.statuses.length > 0;

  return (
    <div className="mb-6 flex flex-col gap-4 lg:mb-7">
      <div className="flex w-full items-center gap-2">
        <div className="relative flex-1 lg:flex-none">
          <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-zinc-400" />
          <Input
            value={filters.q}
            onChange={(e) => setFilters({ q: e.target.value || null })}
            className="h-12 w-full rounded-lg py-5 pr-4 pl-11 text-base placeholder:text-zinc-500 lg:h-auto lg:w-120 lg:py-3 lg:text-lg"
            placeholder="Busque pelo nome do módulo"
          />
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <FilterDropdown
            triggerText="Nível"
            items={difficultyLevels.map((level) => ({
              value: level,
              label: level,
            }))}
            selectedValues={filters.levels}
            onValueChange={handleLevelChange}
          />
          <FilterDropdown
            triggerText="Regra Gramatical"
            items={grammarRules.map((gr) => ({
              value: gr,
              label: gr,
            }))}
            selectedValues={filters.grammarRules}
            onValueChange={handleGrammarRuleChange}
          />
          <FilterDropdown
            triggerText="Status"
            items={Object.entries(statusOptions).map(([value, label]) => ({
              value: value as StatusKey,
              label,
            }))}
            selectedValues={filters.statuses}
            onValueChange={handleStatusChange}
          />

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              className="flex items-center gap-1.5 py-6.5 text-base text-zinc-600 hover:text-zinc-900"
              onClick={handleClearFilters}
            >
              <X className="size-4" />
              Limpar
            </Button>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          className="flex h-12 w-12 items-center justify-center rounded-lg border-zinc-300 font-normal lg:hidden"
        >
          <SlidersHorizontal className="size-5" />
        </Button>
        <Button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-lg border-zinc-300 font-normal lg:hidden"
        >
          <Search className="size-5" />
        </Button>
      </div>
    </div>
  );
};
