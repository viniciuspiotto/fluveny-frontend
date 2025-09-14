import { useMutation } from '@tanstack/react-query';
import type { RegisterStudentForm } from '../schemas/register-student-schema';
import { registerStudent } from '../services/create-student';

interface createStudentRequest {
  data: RegisterStudentForm;
}

export function useCreateStudent() {
  return useMutation({
    mutationFn: async ({ data }: createStudentRequest) => {
      const response = await registerStudent(data);

      return response.data;
    },
  });
}
