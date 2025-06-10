import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router';
import { moduleSchema, type ModuleData } from '../schemas/module-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useCreateModule } from './api/mutations/use-create-module';

export const useModuleCreateForm = () => {
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
  const { setModuleId, setGrammarRulesModules } = useModuleInfo();

  const onSubmit = (data: ModuleData) => {
    mutate(data, {
      onSuccess: (response) => {
        const grammarRulesModule = [...response.data.grammarRulesModule];
        const moduleId = response.data.id;
        setModuleId(moduleId);
        setGrammarRulesModules(grammarRulesModule);
        navigate(`/modules/create/${moduleId}/introduction`);
        // setCurrentStep('introduction');
      },
      onError: (error: any) => {
        console.error(error);
        if (error?.response?.status === 409) {
          methods.setError('title', {
            type: 'manual',
            message: 'Um módulo com esse título já existe',
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
