import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  grammarRulePresentationSchema,
  type GrammarRulePresentationData,
} from '../schemas/grammar-rule-apresentation-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useCreatePresentation } from './api/mutations/use-create-presentation';
import { useSectionStep } from './use-section-step';

export const useCreateGrammarRulePresentation = () => {
  const navigate = useNavigate();
  const methods = useForm<GrammarRulePresentationData>({
    resolver: zodResolver(grammarRulePresentationSchema),
  });

  const { mutate } = useCreatePresentation();
  const { moduleId } = useModuleInfo();
  const {
    setStepModes,
    setCurrentStep,
    currentStep: grammarRuleModuleId,
  } = useModuleWizard();
  const { nextStep } = useSectionStep();

  const onSubmit = (data: GrammarRulePresentationData) => {
    mutate(
      { data, moduleId, grammarRuleModuleId },
      {
        onSuccess: (response) => {
          console.log(response);
          setStepModes('introduction', 'edit');
          setCurrentStep(nextStep);
          navigate(`/modules/create/${moduleId}/${nextStep}`);
        },
        onError: (error: any) => {
          console.error(error);
          if (error?.response?.status === 400) {
            methods.setError('textBlock', {
              type: 'manual',
              message: 'A Descrição é obrigatória',
            });
          }
        },
      },
    );
  };

  return { methods, onSubmit };
};
