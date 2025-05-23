import type { DetailsData } from '@/features/module/schemas/details-schema';
import { useMutation } from '@tanstack/react-query';
import { createModule } from '../../../services/create-details';

export function useCreateModule() {
  return useMutation({
    mutationFn: async (data: DetailsData) => {
      return await createModule(data);
    },
  });
}
