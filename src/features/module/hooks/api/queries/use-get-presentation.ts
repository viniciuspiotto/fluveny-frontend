import {
  getPresentation,
  type GetPresentationRequest,
  type GetPresentationResponse,
} from '@/features/module/services/queries/get-presentation';
import { useQuery } from '@tanstack/react-query';

export const useGetPresentation = ({
  moduleId,
  grammarRuleId,
  windowId,
}: GetPresentationRequest) => {
  const { data, ...rest } = useQuery<GetPresentationResponse>({
    queryKey: ['presentation', windowId],
    queryFn: () => getPresentation({ moduleId, grammarRuleId, windowId }),
    enabled: !!moduleId && !!grammarRuleId && !!windowId,
  });

  return { data: data?.data, ...rest };
};
