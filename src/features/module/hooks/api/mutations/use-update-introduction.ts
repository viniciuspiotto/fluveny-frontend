import type { IntroductionData } from '@/features/module/schemas/introduction-schema';
import { updateIntroduction } from '@/features/module/services/update-introduction';
import { useMutation } from '@tanstack/react-query';

export const useUpdateIntroduction = () => {
  return useMutation({
    mutationFn: async ({
      moduleId,
      data,
    }: {
      moduleId: string;
      data: IntroductionData;
    }) => {
      return await updateIntroduction(data, moduleId);
    },
  });
};
