import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  introductionSchema,
  type IntroductionData,
} from '../schemas/introduction-schema';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';
import { useUpdateIntroduction } from './api/mutations/use-update-introduction';
import { useGetIntroduction } from './api/queries/use-get-introduction';
import { useSectionStep } from './use-section-step';

export const useEditIntroductionForm = () => {
  const methods = useForm<IntroductionData>({
    resolver: zodResolver(introductionSchema),
  });

  const queryClient = useQueryClient();
  const { mutate } = useUpdateIntroduction();
  const { moduleId } = useModuleInfo();
  const { setCurrentStep } = useModuleWizard();
  const navigate = useNavigate();
  const { nextStep } = useSectionStep();
  const { data: initialData, isLoading } = useGetIntroduction(moduleId);

  useEffect(() => {
    if (initialData?.data.textBlock?.content) {
      methods.reset({ textBlock: initialData.data.textBlock.content });
    }
  }, [initialData, methods]);

  const onSubmit = (data: IntroductionData) => {
    mutate(
      { data, moduleId },
      {
        onSuccess: () => {
          setCurrentStep(nextStep);
          queryClient.invalidateQueries({
            queryKey: ['introduction', moduleId],
          });
          navigate(`/modules/create/${moduleId}/${nextStep}`);
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
    initialContent: initialData?.data.textBlock?.content,
    isLoading,
  };
};
