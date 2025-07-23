import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router';
import { moduleSchema, type ModuleData } from '../schemas/module-schema';
import { useGrammarRuleModuleInfo } from '../store/use-grammar-rule-module-info';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useCreateModule } from './api/mutations/use-create-module';

export const useCreateModuleForm = () => {
  const methods = useForm<ModuleData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      description: '',
      id_level: '',
      title: '',
      id_grammarRules: [],
    },
  });

  const navigate = useNavigate();
  const { mutate, isPending } = useCreateModule();
  const { setGrammarRuleModuleInfos } = useGrammarRuleModuleInfo();
  const { setModuleId, setGrammarRulesModules } = useModuleInfo();
  const { setCurrentStep, setSteps } = useModuleWizard();

  const onSubmit = (data: ModuleData) => {
    mutate(data, {
      onSuccess: (response) => {
        const grammarRulesModule = [...response.data.grammarRulesModule];
        const moduleId = response.data.id;
        setModuleId(moduleId);
        setGrammarRulesModules(grammarRulesModule);
        const grammarRulesModuleWithWindows = grammarRulesModule.map((grm) => ({
          grammarRuleModuleId: grm.id,
          windows: [
            {
              id: null,
              type: 'PRESENTATION',
              mode: 'CREATE',
              isCurrent: true,
              position: 1,
            },
          ],
        }));
        setGrammarRuleModuleInfos(grammarRulesModuleWithWindows);
        setSteps([
          'introduction',
          ...response.data.grammarRulesModule.map((grm) => grm.id),
          'final-challenge',
        ]);
        setCurrentStep('introduction');
        navigate(`/modules/create/${moduleId}/introduction`);
      },
      onError: (error: any) => {
        console.error(error);
        if (error?.response?.status === 400) {
          methods.setError('title', {
            type: 'manual',
            message: 'Deu problema no título',
          });
        }
      },
    });
  };

  return {
    methods,
    onSubmit,
    isLoading: isPending,
  };
};
