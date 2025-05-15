import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  createInformationModuleSchema,
  type CreateInformationModuleData,
} from '../schemas/module-information-schema';

export const useModuleInformationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    control,
  } = useForm<CreateInformationModuleData>({
    resolver: zodResolver(createInformationModuleSchema),
    defaultValues: {
      description: '',
      level: 'A1',
      title: '',
      topics: [],
    },
  });

  const onSubmit = (data: CreateInformationModuleData) => {
    console.log(data);
  };

  return { register, handleSubmit, errors, onSubmit, control, isLoading };
};
