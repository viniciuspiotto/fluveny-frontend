import type { Exercise } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetFinalChallengeExerciseResponse {
  message: string;
  data: Exercise;
}

export interface GetFinalChallengeExerciseRequest {
  moduleId: string | undefined;
  exerciseId: string | undefined;
}

export const getFinalChallengeExercise = async ({
  moduleId,
  exerciseId,
}: GetFinalChallengeExerciseRequest): Promise<GetFinalChallengeExerciseResponse> => {
  const response = await api.get(
    `/modules/${moduleId}/final-challenge/${exerciseId}`,
  );
  return response.data;
};
