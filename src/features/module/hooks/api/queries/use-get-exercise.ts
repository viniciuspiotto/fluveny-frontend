import {
  getExercise,
  type GetExerciseRequest,
  type GetExerciseResponse,
} from '@/features/module/services/queries/get-exercise';
import { useQuery } from '@tanstack/react-query';

export const useGetExercise = ({
  moduleId,
  grammarRuleId,
  windowId,
}: GetExerciseRequest) => {
  const { data, ...rest } = useQuery<GetExerciseResponse>({
    queryKey: ['exercise', windowId],
    queryFn: () => getExercise({ moduleId, grammarRuleId, windowId }),
    enabled: !!moduleId && !!grammarRuleId && !!windowId,
  });

  return { data: data?.data, ...rest };
};
