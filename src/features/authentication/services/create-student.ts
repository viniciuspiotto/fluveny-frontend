import { api } from '@/app/libs/api';
import type { RegisterStudentForm } from '../schemas/register-student-schema';

export const registerStudent = async (data: RegisterStudentForm) => {
  const response = await api.post('/users', data);
  return response.data;
};
