import { api } from '@/app/libs/api';

type ExercisesDTO = string;

export interface GetFinalChallengeExercisesResponse {
  message: string;
  data: ExercisesDTO[];
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
