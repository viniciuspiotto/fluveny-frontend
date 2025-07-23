import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  type GrammarRuleTranslateExerciseData,
  grammarRuleTranslateExerciseSchema,
} from '../schemas/grammar-rule-translate-exercise-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useCreateTranslateExercise } from './api/mutations/use-create-translate-exercise';

export const useCreateGrammarRuleTranslateExercise = () => {
  const methods = useForm<GrammarRuleTranslateExerciseData>({
    resolver: zodResolver(grammarRuleTranslateExerciseSchema),
  });

  const { mutate } = useCreateTranslateExercise();
  const { moduleId } = useModuleInfo();
  const { currentStep: grammarRuleModuleId } = useModuleWizard();
  const queryClient = useQueryClient();

  const onSubmit = (data: GrammarRuleTranslateExerciseData) => {
    mutate(
      { data, moduleId, grammarRuleModuleId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['module', moduleId],
          });
        },
      },
    );
  };

  return { methods, onSubmit };
};
