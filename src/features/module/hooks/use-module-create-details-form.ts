import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { moduleSchema, type ModuleData } from '../schemas/module-schema';
import { useCreateModule } from './api/mutations/use-create-module';

export const useModuleCreateDetailsForm = () => {
  const methods = useForm<ModuleData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      description: '',
      id_level: '',
      title: '',
      id_grammarRules: [],
    },
  });

  const { mutate, isPending } = useCreateModule();

  // TODO: pegar os grammarRules modules
  const onSubmit = (data: ModuleData) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log(response.data);
        // setModuleId(id);
        // resetStepModes();
        // setCurrentStep('introduction');
        // navigate(`/modules/create/${id}/introduction`);
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
