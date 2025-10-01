import { api } from '@/app/libs/api';

interface updateFinalChallengeExercisesRequest {
  data: string[];
  moduleId: string;
}

export const updateFinalChallengeExercises = async ({
  data,
  moduleId,
}: updateFinalChallengeExercisesRequest) => {
  const apiPayload = {
    exerciseList: data,
  };

  const response = await api.put(
    `/modules/${moduleId}/final-challenge`,
    apiPayload,
  );
  return response.data;
};
