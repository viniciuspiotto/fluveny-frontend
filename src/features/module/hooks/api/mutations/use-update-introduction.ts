import type { IntroductionForm } from '@/features/module/schemas/introduction-schema';
import { updateIntroduction } from '@/features/module/services/mutation/update-introduction';
import { useMutation } from '@tanstack/react-query';

export const useUpdateIntroduction = () => {
  return useMutation({
    mutationFn: async ({
      moduleId,
      data,
    }: {
      moduleId: string;
      data: IntroductionForm;
    }) => {
      const response = await updateIntroduction(data, moduleId);
      return response.data;
    },
  });
};
