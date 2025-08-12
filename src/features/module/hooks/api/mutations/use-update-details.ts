import type { ModuleForm } from '@/features/module/schemas/module-form-schema';
import { updateModule } from '@/features/module/services/mutation/update-module';
import { useMutation } from '@tanstack/react-query';

export const useUpdateModule = () => {
  return useMutation({
    mutationFn: async ({
      moduleId,
      data,
    }: {
      moduleId: string;
      data: ModuleForm;
    }) => {
      const response = await updateModule(data, moduleId);
      return response.data;
    },
  });
};
