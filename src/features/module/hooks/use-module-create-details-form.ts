import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { detailsSchema, type DetailsData } from '../schemas/details-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useCreateModule } from './api/mutations/use-create-details';

export const useModuleCreateDetailsForm = () => {
  const methods = useForm<DetailsData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      description: '',
      id_level: '',
      title: '',
      id_grammarRules: [],
    },
  });

  const navigate = useNavigate();
  const { setModuleId } = useModuleInfo();
  const { setCurrentStep, resetStepModes } = useModuleWizard();

  const { mutate, isPending } = useCreateModule();

  const onSubmit = (data: DetailsData) => {
    mutate(data, {
      onSuccess: (response) => {
        const id = response.data.id;
        setModuleId(id);
        resetStepModes();
        setCurrentStep('introduction');
        navigate(`/modules/create/${id}/introduction`);
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
