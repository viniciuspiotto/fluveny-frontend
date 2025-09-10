import { useMutation } from '@tanstack/react-query';
import type { RegisterStudentForm } from '../schemas/register-student-schema';
import { registerStudent } from '../services/create-student';

interface createTranslateExerciseRequest {
  data: RegisterStudentForm;
}

export function useCreateStudent() {
  return useMutation({
    mutationFn: async ({ data }: createTranslateExerciseRequest) => {
      const response = await registerStudent(data);

      return response.data;
    },
  });
}
