import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  introductionSchema,
  type IntroductionData,
} from '../schemas/introduction-schema';

export const useModuleIntroductionForm = (defaultValues: IntroductionData) => {
  const methods = useForm<IntroductionData>({
    resolver: zodResolver(introductionSchema),
    defaultValues,
  });

  return {
    methods,
  };
};
