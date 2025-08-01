import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
          queryClient.invalidateQueries({
            queryKey: ['module', moduleId],
          });
          // passar o id e modificar a janela para edit
          // auto verificar se existe mais alguma com modo criação, se existir, continuar com o modo edit
          toast.success('Apresentação criada com sucesso!');
        },
        onError: (error: any) => {
          console.error(error);
        },
      },
    );
  };

  return { methods, onSubmit };
};
