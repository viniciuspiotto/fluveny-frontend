import type { ModuleData } from '@/features/module/schemas/module-schema';
import { useMutation } from '@tanstack/react-query';
import { createModule } from '../../../services/create-module';

export function useCreateModule() {
  return useMutation({
    mutationFn: async (data: ModuleData) => {
      return await createModule(data);
    },
  });
}
