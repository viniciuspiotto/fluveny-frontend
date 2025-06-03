import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  grammarRuleApresentationSchema,
  type GrammarRuleApresentationData,
} from '../schemas/grammar-rule-apresentation';

export const useCreateGrammarRuleApresentation = () => {
  const methods = useForm<GrammarRuleApresentationData>({
    resolver: zodResolver(grammarRuleApresentationSchema),
    defaultValues: {
      sentence: '',
      description: '',
    },
  });

  return { methods };
};
