import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import {
  introductionSchema,
  type IntroductionData,
} from '../schemas/introduction-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useCreateIntroduction } from './api/mutations/use-create-introduction';
import { useSectionStep } from './use-section-step';

export const useCreateIntroductionForm = () => {
  const methods = useForm<IntroductionData>({
    resolver: zodResolver(introductionSchema),
  });

  const { mutate } = useCreateIntroduction();
  const { moduleId } = useModuleInfo();
  const { setStepModes, setCurrentStep } = useModuleWizard();
  const navigate = useNavigate();
  const { nextStep } = useSectionStep();

  const onSubmit = (data: IntroductionData) => {
    mutate(
      { data, moduleId },
      {
        onSuccess: () => {
          setStepModes('introduction', 'edit');
          setCurrentStep(nextStep);
          navigate(`/modules/create/${moduleId}/${nextStep}`);
          toast.success('Introdução criada com sucesso');
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

  return {
    methods,
    onSubmit,
  };
};
