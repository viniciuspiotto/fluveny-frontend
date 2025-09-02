import { ROUTES } from '@/app/configs/routes';
import type { ModuleForm } from '@/features/module/schemas/module-form-schema';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { createModule } from '../../../services/mutation/create-module';

export function useCreateModule() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ModuleForm) => {
      const response = await createModule(data);
      return response.data;
    },
    onSuccess: (response) => {
      navigate(
        `${ROUTES.modules}/${ROUTES.create}/${response.id}/${ROUTES.introduction}`,
      );
    },
  });
}
