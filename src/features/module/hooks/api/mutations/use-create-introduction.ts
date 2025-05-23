import type { IntroductionData } from '@/features/module/schemas/introduction-schema';
import { useMutation } from '@tanstack/react-query';
import { createIntroduction } from '../../../services/create-introduction';

export const useCreateIntroduction = () => {
  return useMutation({
    mutationFn: async ({
      moduleId,
      data,
    }: {
      moduleId: string;
      data: IntroductionData;
    }) => {
      return await createIntroduction(data, moduleId);
    },
  });
};
