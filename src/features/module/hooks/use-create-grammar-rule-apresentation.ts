import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  grammarRulePresentationSchema,
  type GrammarRulePresentationData,
} from '../schemas/grammar-rule-apresentation-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useCreatePresentation } from './api/mutations/use-create-presentation';

export const useCreateGrammarRulePresentation = () => {
  const methods = useForm<GrammarRulePresentationData>({
    resolver: zodResolver(grammarRulePresentationSchema),
  });

  const { mutate } = useCreatePresentation();
  const { moduleId } = useModuleInfo();
  const { currentStep: grammarRuleModuleId } = useModuleWizard();
  const queryClient = useQueryClient();

  const onSubmit = (data: GrammarRulePresentationData) => {
    mutate(
      { data, moduleId, grammarRuleModuleId },
      {
        onSuccess: (response) => {
          console.log(response);
          queryClient.invalidateQueries({
            queryKey: ['module', moduleId],
          });
        },
        onError: (error: any) => {
          console.error(error);
          if (error?.response?.status === 400) {
            methods.setError('textBlock', {
              type: 'manual',
              message: 'A Descrição é obrigatória',
            });
          }
        },
      },
    );
  };

  return { methods, onSubmit };
};
