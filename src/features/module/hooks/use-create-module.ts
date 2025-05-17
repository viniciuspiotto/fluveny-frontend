import { useMutation } from '@tanstack/react-query';
import type { CreateInformationModuleData } from '../schemas/module-information-schema';
import { createModule } from '../services/create-module';

export function useCreateModule() {
  return useMutation({
    mutationFn: async (data: CreateInformationModuleData) => {
      return await createModule(data);
    },
  });
}
