import type { GrammarRule } from '@/@types/module';
import { useState } from 'react';
import { Tag } from '../tag';
import { SelectGrammarRule } from './select-topic';

interface GrammarRulesSelectionProps {
  onChange: (value: string[]) => void;
}

export const GrammarRulesSelection = ({
  onChange,
}: GrammarRulesSelectionProps) => {
  const [selectedGrammarRules, setSelectedGrammarRules] = useState<
    GrammarRule[]
  >([]);

  const handleSelectGrammarRule = (GrammarRules: GrammarRule[]) => {
    setSelectedGrammarRules(GrammarRules);
    onChange(GrammarRules.map((t) => t.id));
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_50px] items-center gap-4 lg:grid-cols-2">
        <SelectGrammarRule
          value={selectedGrammarRules}
          onSelectGrammarRule={handleSelectGrammarRule}
        />
        <span className="text-xl">{selectedGrammarRules.length}/5</span>
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-1 gap-y-2">
        {selectedGrammarRules.map((GrammarRule) => (
          <Tag key={GrammarRule.id} name={GrammarRule.title} variant="blue" />
        ))}
      </ul>
    </>
  );
};
