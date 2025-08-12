import type { GrammarRule } from '@/@types/module';
import { cn } from '@/app/utils/cn';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectGrammarRule } from './select-topic';
import { Tag } from './tag';

interface GrammarRulesSelectionProps {
  initialValue: string[];
  onChange: (value: string[]) => void;
}

export const GrammarRulesSelection = ({
  initialValue,
  onChange,
}: GrammarRulesSelectionProps) => {
  const [selectedGrammarRules, setSelectedGrammarRules] = useState<
    GrammarRule[]
  >([]);

  const handleSelectGrammarRule = (GrammarRules: GrammarRule[]) => {
    setSelectedGrammarRules(GrammarRules);
    onChange(GrammarRules.map((t) => t.id));
  };

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="grid grid-cols-[1fr_50px] items-center gap-4 lg:grid-cols-2">
        <SelectGrammarRule
          initialValue={initialValue}
          value={selectedGrammarRules}
          onSelectGrammarRule={handleSelectGrammarRule}
        />
        <span
          className={cn(
            'text-lg',
            errors.id_grammarRules &&
              'animate-shake border-red-500 text-red-500',
          )}
        >
          {selectedGrammarRules.length}/5
        </span>
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-1 gap-y-2">
        {selectedGrammarRules.map((GrammarRule) => (
          <Tag key={GrammarRule.id} name={GrammarRule.title} variant="blue" />
        ))}
      </ul>
      {errors.id_grammarRules?.message && (
        <p className="mb-8 flex text-center text-sm text-red-500">
          {errors.id_grammarRules?.message as string}
        </p>
      )}
    </>
  );
};
