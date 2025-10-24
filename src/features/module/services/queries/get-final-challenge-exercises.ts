import { api } from '@/app/libs/api';

type ExercisesId = string;

export interface GetFinalChallengeExercisesResponse {
  message: string;
  data: ExercisesId[];
}

interface GetFinalChallengeExercisesRequest {
  moduleId: string | undefined;
}

export const getFinalChallengeExercises = async ({
  moduleId,
}: GetFinalChallengeExercisesRequest): Promise<GetFinalChallengeExercisesResponse> => {
  const response = await api.get(`/modules/${moduleId}/final-challenge`);
  return response.data;
};
