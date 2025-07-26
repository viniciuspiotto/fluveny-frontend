import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import type { ContentList, GrammarRuleModule } from '@/@types/module';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { moduleSchema, type ModuleData } from '../schemas/module-schema';
import { useGrammarRuleModuleInfo } from '../store/use-grammar-rule-module-info';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useUpdateModule } from './api/mutations/use-update-details';
import { useGetModule } from './api/queries/use-get-module';

export const useEditModuleForm = () => {
  const { moduleId, setGrammarRulesModules } = useModuleInfo();
  const { setCurrentStep, setSteps } = useModuleWizard();
  const { setGrammarRuleModuleInfos } = useGrammarRuleModuleInfo();
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
            ...grammarRulesModule.map((grm: GrammarRuleModule) => grm.id),
            'final-challenge',
          ]);
          const grammarRulesModuleWithWindows = grammarRulesModule.map(
            (grm) => ({
              grammarRuleModuleId: grm.id,
              windows:
                grm.contentList.length > 0
                  ? grm.contentList.map(
                      (content: ContentList, index: number) => ({
                        id: content.id,
                        type: content.type,
                        mode: 'EDIT',
                        isCurrent: index === 0,
                        position: index + 1,
                      }),
                    )
                  : [
                      {
                        id: null,
                        type: 'PRESENTATION',
                        mode: 'CREATE',
                        isCurrent: true,
                        position: 1,
                      },
                    ],
            }),
          );
          setGrammarRuleModuleInfos(grammarRulesModuleWithWindows);
          queryClient.invalidateQueries({
            queryKey: ['module', moduleId],
          });
          navigate(`/modules/create/${moduleId}/introduction`);
          toast.success('Módulo editado com sucesso');
        },
        onError: (error: any) => {
          if (error?.response?.status === 400) {
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
