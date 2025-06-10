import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useEffect } from 'react';
import { moduleSchema, type ModuleData } from '../schemas/module-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useUpdateDetails } from './api/mutations/use-update-details';
import { useGetModule } from './api/queries/use-get-module';

export const useModuleEditDetailsForm = () => {
  const { moduleId } = useModuleInfo();
  const { setCurrentStep } = useModuleWizard();
  const navigate = useNavigate();

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

  const { mutate } = useUpdateDetails();

  const onSubmit = (formData: ModuleData) => {
    if (!moduleId) return;

    // TODO: novo put com as informações de grammarRules alteradas
    mutate(
      { moduleId, data: formData },
      {
        onSuccess: (response) => {
          console.log(response);
          setCurrentStep('introduction');
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
