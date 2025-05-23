import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useEffect } from 'react';
import { detailsSchema, type DetailsData } from '../schemas/details-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useUpdateDetails } from './api/mutations/use-update-details';
import { useGetModule } from './api/queries/use-get-module';

export const useModuleEditDetailsForm = () => {
  const { moduleId } = useModuleInfo();
  const { setCurrentStep } = useModuleWizard();
  const navigate = useNavigate();

  const methods = useForm<DetailsData>({
    resolver: zodResolver(detailsSchema),
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
        id_grammarRules: module.grammarRules.map((rule) => rule.id),
      });
    }
  }, [isSuccess, data, methods]);

  const { mutate, isPending } = useUpdateDetails();

  const onSubmit = (formData: DetailsData) => {
    if (!moduleId) return;

    mutate(
      { moduleId, data: formData },
      {
        onSuccess: () => {
          setCurrentStep('introduction');
          // setar todos os step completion
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
    isLoading: isPending,
  };
};
