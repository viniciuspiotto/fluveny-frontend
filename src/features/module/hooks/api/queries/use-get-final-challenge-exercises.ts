import {
  getFinalChallengeExercises,
  type GetFinalChallengeExercisesResponse,
} from '@/features/module/services/queries/get-final-challenge-exercises';
import { useQuery } from '@tanstack/react-query';

export const useGetFinalChallengeExercises = (moduleId: string | undefined) => {
  const { data, ...rest } = useQuery<GetFinalChallengeExercisesResponse>({
    queryKey: ['final-challenge', moduleId],
    queryFn: () => getFinalChallengeExercises({ moduleId }),
    enabled: !!moduleId,
  });

  return { data: data?.data, ...rest };
};
