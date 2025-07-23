import type { ModuleData } from '@/features/module/schemas/module-schema';
import { updateModule } from '@/features/module/services/update-module';
import { useMutation } from '@tanstack/react-query';

export const useUpdateModule = () => {
  return useMutation({
    mutationFn: async ({
      moduleId,
      data,
    }: {
      moduleId: string;
      data: ModuleData;
    }) => {
      return await updateModule(data, moduleId);
    },
  });
};
