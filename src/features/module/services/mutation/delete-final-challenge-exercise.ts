import { api } from '@/app/libs/api';

export const deleteFinalChallengeExercise = async (
  moduleId: string,
  exerciseId: string,
) => {
  const response = await api.delete(
    `/modules/${moduleId}/final-challenge/${exerciseId}`,
  );
  return response.data;
};
