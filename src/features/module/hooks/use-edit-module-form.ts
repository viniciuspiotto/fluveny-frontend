import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import type { GrammarRuleModule } from '@/@types/module';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { moduleSchema, type ModuleData } from '../schemas/module-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useUpdateModule } from './api/mutations/use-update-details';
import { useGetModule } from './api/queries/use-get-module';

export const useEditModuleForm = () => {
  const { moduleId, setGrammarRulesModules } = useModuleInfo();
  const { setCurrentStep, setSteps } = useModuleWizard();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const methods = useForm<ModuleData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      description: '',
      id_level: '',
      title: '',
      id_grammarRules: [],
    },
  });

  const { data, isSuccess } = useGetModule(moduleId);

  useEffect(() => {
    if (isSuccess && data?.data) {
      const module = data.data;

      methods.reset({
        title: module.title,
        description: module.description,
        id_level: module.level.id,
        id_grammarRules: module.grammarRules.map((r) => r.id),
      });
    }
  }, [isSuccess, data, methods]);

  const { mutate } = useUpdateModule();

  const onSubmit = (formData: ModuleData) => {
    if (!moduleId) return;

    mutate(
      { moduleId, data: formData },
      {
        onSuccess: (response) => {
          const grammarRulesModule = [...response.data.grammarRulesModule];
          setCurrentStep('introduction');
          setGrammarRulesModules(grammarRulesModule);
          setSteps([
            'introduction',
            ...response.data.grammarRulesModule.map(
              (grm: GrammarRuleModule) => grm.id,
            ),
            'final-challenge',
          ]);
          queryClient.invalidateQueries({
            queryKey: ['module', moduleId],
          });
          navigate(`/modules/create/${moduleId}/introduction`);
        },
        onError: (error: any) => {
          if (error?.response?.status === 409) {
            methods.setError('title', {
              type: 'manual',
              message: 'Um módulo com esse título já existe',
            });
          }
        },
      },
    );
  };

  return {
    methods,
    onSubmit,
  };
};
