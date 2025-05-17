import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  createInformationModuleSchema,
  type CreateInformationModuleData,
} from '../schemas/module-information-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useCreateModule } from './use-create-module';

export const useModuleInformationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateInformationModuleData>({
    resolver: zodResolver(createInformationModuleSchema),
    defaultValues: {
      description: '',
      id_level: '',
      title: '',
      id_grammarRules: [],
    },
  });

  const navigate = useNavigate();
  const { setModuleId } = useModuleInfo();
  const { setCurrentStep } = useModuleWizard();

  const { mutate, isPending } = useCreateModule();

  const onSubmit = (data: CreateInformationModuleData) => {
    mutate(data, {
      onSuccess: (response) => {
        const id = response.data.id;
        setModuleId(id);
        setCurrentStep('introduction');
        navigate(`/modules/create/${id}/introduction`);
      },
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    control,
    isLoading: isPending,
  };
};
