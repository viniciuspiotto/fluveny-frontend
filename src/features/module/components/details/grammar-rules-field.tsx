import { Controller, useFormContext } from 'react-hook-form';
import { GrammarRulesSelection } from './grammar-rules-selection';

export const GrammarRulesField = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="id_grammarRules"
      render={({ field }) => (
        <GrammarRulesSelection
          onChange={field.onChange}
          initialValue={field.value}
        />
      )}
    />
  );
};
