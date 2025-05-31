import type { DetailsData } from '@/features/module/schemas/details-schema';
import { updateDetails } from '@/features/module/services/update-details';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDetails = () => {
  return useMutation({
    mutationFn: async ({
      moduleId,
      data,
    }: {
      moduleId: string;
      data: DetailsData;
    }) => {
      return await updateDetails(data, moduleId);
    },
  });
};
