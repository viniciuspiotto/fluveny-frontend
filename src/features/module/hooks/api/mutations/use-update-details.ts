import type { ModuleData } from '@/features/module/schemas/module-schema';
import { updateDetails } from '@/features/module/services/update-details';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDetails = () => {
  return useMutation({
    mutationFn: async ({
      moduleId,
      data,
    }: {
      moduleId: string;
      data: ModuleData;
    }) => {
      return await updateDetails(data, moduleId);
    },
  });
};
