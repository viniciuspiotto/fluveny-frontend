import {
  getFinalChallengeExercise,
  type GetFinalChallengeExerciseRequest,
  type GetFinalChallengeExerciseResponse,
} from '@/features/module/services/queries/get-final-challenge-exercise';
import { useQuery } from '@tanstack/react-query';

export const useGetFinalChallengeExercise = ({
  moduleId,
  exerciseId,
}: GetFinalChallengeExerciseRequest) => {
  const { data, ...rest } = useQuery<GetFinalChallengeExerciseResponse>({
    queryKey: ['exercise', exerciseId],
    queryFn: () => getFinalChallengeExercise({ moduleId, exerciseId }),
    enabled: !!moduleId && !!exerciseId,
  });

  return { data: data?.data, ...rest };
};
