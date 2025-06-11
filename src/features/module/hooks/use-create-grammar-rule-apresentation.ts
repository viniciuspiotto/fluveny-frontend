import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  grammarRuleApresentationSchema,
  type GrammarRuleApresentationData,
} from '../schemas/grammar-rule-apresentation-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';

export const useCreateGrammarRuleApresentation = () => {
  const methods = useForm<GrammarRuleApresentationData>({
    resolver: zodResolver(grammarRuleApresentationSchema),
  });

  // const { mutate } = ();
  const { moduleId } = useModuleInfo();
  const { setStepModes, setCurrentStep } = useModuleWizard();
  // const { nextStep } = useSectionStep();

  const onSubmit = (data: IntroductionData) => {
    mutate(
      { data, moduleId },
      {
        onSuccess: () => {
          setStepModes('introduction', 'edit');
          // setCurrentStep(nextStep);
          // navigate(`/modules/create/${moduleId}/${nextStep}`);
        },
        onError: (error: any) => {
          console.error(error);
          if (error?.response?.status === 400) {
            methods.setError('textBlock', {
              type: 'manual',
              message: 'A introdução é obrigatória',
            });
          }
        },
      },
    );
  };

  return { methods, onSubmit };
};
