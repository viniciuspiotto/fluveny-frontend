import type { IntroductionForm } from '@/features/module/schemas/introduction-schema';
import { useMutation } from '@tanstack/react-query';
import { createIntroduction } from '../../../services/mutation/create-introduction';

export const useCreateIntroduction = () => {
  return useMutation({
    mutationFn: async ({
      moduleId,
      data,
    }: {
      moduleId: string;
      data: IntroductionForm;
    }) => {
      const response = await createIntroduction(data, moduleId);
      return response.data;
    },
  });
};
