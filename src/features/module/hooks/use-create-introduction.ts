import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  createIntroductionModuleSchema,
  type CreateIntroductionModuleSchema,
} from '../schemas/introduction-schema';

export const useCreateIntroduction = () => {
  const {
    control,
    formState: { errors },
  } = useForm<CreateIntroductionModuleSchema>({
    resolver: zodResolver(createIntroductionModuleSchema),
    defaultValues: {
      textBlock: '',
    },
  });

  return { control, errors };
};
