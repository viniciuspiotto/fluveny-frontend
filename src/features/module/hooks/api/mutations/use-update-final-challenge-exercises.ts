import { updateFinalChallengeExercises } from '@/features/module/services/mutation/update-final-challenge-exercises';
import { useMutation } from '@tanstack/react-query';

interface UpdateFinalChallengeExercisesRequest {
  moduleId: string;
  data: string[];
}

export const useUpdateFinalChallengeExercisesChallenge = () => {
  return useMutation({
    mutationFn: async ({
      moduleId,
      data,
    }: UpdateFinalChallengeExercisesRequest) => {
      await updateFinalChallengeExercises({
        data,
        moduleId,
      });
    },
  });
};
