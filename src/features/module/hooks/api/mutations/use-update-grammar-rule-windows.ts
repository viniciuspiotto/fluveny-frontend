import type { WindowListDTO } from '@/@types/module';
import { updateGrammarRuleWindows } from '@/features/module/services/mutation/update-grammar-rule-windows';
import { useMutation } from '@tanstack/react-query';

interface UpdateGrammarRuleWindowsRequest {
  moduleId: string;
  grammarRuleId: string;
  data: WindowListDTO[];
}

export const useUpdateGrammarRuleWindows = () => {
  return useMutation({
    mutationFn: async ({
      moduleId,
      data,
      grammarRuleId,
    }: UpdateGrammarRuleWindowsRequest) => {
      const response = await updateGrammarRuleWindows({
        data,
        moduleId,
        grammarRuleId,
      });
      return response.data;
    },
  });
};
