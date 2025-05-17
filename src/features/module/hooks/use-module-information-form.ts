import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  createInformationModuleSchema,
  type CreateInformationModuleData,
} from '../schemas/module-information-schema';
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

  const { mutate, isPending } = useCreateModule();

  const onSubmit = (data: CreateInformationModuleData) => {
    mutate(data);
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
