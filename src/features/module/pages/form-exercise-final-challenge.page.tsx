import { cn } from '@/app/utils/cn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { NotFound } from '@/templates/not-found';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import FormExercisePageSkeleton from '../components/exercise-page-skeleton';
import { FormSectionWrapper } from '../components/form-section-wrapper';
import { ModuleHeader } from '../components/module-header';
import { useCreateFinalChallengeTranslateExercise } from '../hooks/api/mutations/use-create-final-challenge-translate-exercise';
import { useUpdateFinalChallengeTranslateExercise } from '../hooks/api/mutations/use-update-final-challenge-translate-exercise';
import { useGetFinalChallengeExercise } from '../hooks/api/queries/use-get-final-challenge-exercise';
import {
  TranslateExerciseSchema,
  type TranslateExerciseForm,
} from '../schemas/translate-exercise-schema';
import { useFinalChallengeExercise } from '../stores/use-final-challenge-exercises';

export const FormExerciseFinalChallengePage = () => {
  const { moduleId, exerciseId } = useParams();

  const { exerciseList, setExerciseList, currentPosition, updateDraftData } =
    useFinalChallengeExercise();

  const methods = useForm<TranslateExerciseForm>({
    resolver: zodResolver(TranslateExerciseSchema),
    defaultValues: {
      header: '',
      justification: '',
      phrase: '',
      template: '',
    },
  });

  const { data: translateExerciseContent, isLoading } =
    useGetFinalChallengeExercise({
      moduleId,
      exerciseId,
    });

  const isEditMode = !!exerciseId;

  const currentWindow =
    currentPosition !== null ? exerciseList[currentPosition] : undefined;
  const draftData =
    currentWindow?.type === 'EXERCISE'
      ? (currentWindow.draftData as Partial<TranslateExerciseForm>)
      : undefined;

  useEffect(() => {
    if (isEditMode && translateExerciseContent) {
      methods.reset(translateExerciseContent);
    } else if (!isEditMode && draftData) {
      methods.reset({
        header: draftData.header || '',
        phrase: draftData.phrase || '',
        template: draftData.template || '',
        justification: draftData.justification || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translateExerciseContent, isEditMode, methods]);

  const handleSaveDraftOnBlur = () => {
    if (!isEditMode && currentPosition !== null) {
      const currentValues = methods.getValues();
      updateDraftData(currentPosition, currentValues);
    }
  };

  const updateTranslateExercise = useUpdateFinalChallengeTranslateExercise();
  const createTranslateExercise = useCreateFinalChallengeTranslateExercise();

  if (isLoading) {
    return <FormExercisePageSkeleton />;
  }

  if (!moduleId) {
    return <NotFound />;
  }

  const onSubmit = (formData: TranslateExerciseForm) => {
    if (isEditMode) {
      updateTranslateExercise.mutate({
        moduleId,
        exerciseId,
        data: formData,
      });
    } else {
      createTranslateExercise.mutate(
        {
          moduleId,
          data: formData,
        },
        {
          onSuccess: (newlyCreatedWindow) => {
            if (currentPosition === null) return;
            const newList = [...exerciseList];
            const clientId = newList[currentPosition]?.clientId;
            newList[currentPosition] = {
              id: newlyCreatedWindow.id,
              type: 'EXERCISE',
              style: 'TRANSLATE',
              clientId,
              draftData: {},
            };
            setExerciseList(newList);
          },
        },
      );
    }
  };

  return (
    <>
      <ModuleHeader step={'Exercício'} />
      <div className="mx-auto mb-30 flex w-full max-w-300 flex-col px-4 pb-8">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormSectionWrapper label="Cabeçalho">
              <Input
                {...methods.register('header')}
                onBlur={handleSaveDraftOnBlur}
                className={cn(
                  'py-6 lg:text-lg',
                  methods.formState.errors.header &&
                    'animate-shake border-red-500 text-red-500',
                )}
                placeholder="Escreva aqui..."
              />
              {methods.formState.errors.header && (
                <p className="mt-1 text-sm text-red-500">
                  {methods.formState.errors.header.message as string}
                </p>
              )}
            </FormSectionWrapper>
            <FormSectionWrapper className="mb-6 lg:mb-8" label="Frase">
              <Input
                {...methods.register('phrase')}
                onBlur={handleSaveDraftOnBlur}
                className={cn(
                  'py-6 lg:text-lg',
                  methods.formState.errors.phrase &&
                    'animate-shake border-red-500 text-red-500',
                )}
                placeholder="Escreva aqui..."
              />
              {methods.formState.errors.phrase && (
                <p className="mt-1 text-sm text-red-500">
                  {methods.formState.errors.phrase.message as string}
                </p>
              )}
            </FormSectionWrapper>
            <FormSectionWrapper className="mb-6 lg:mb-8" label="Gabarito">
              <Input
                {...methods.register('template')}
                onBlur={handleSaveDraftOnBlur}
                className={cn(
                  'py-6 lg:text-lg',
                  methods.formState.errors.template &&
                    'animate-shake border-red-500 text-red-500',
                )}
                placeholder="Escreva aqui..."
              />
              {methods.formState.errors.template && (
                <p className="mt-1 text-sm text-red-500">
                  {methods.formState.errors.template.message as string}
                </p>
              )}
            </FormSectionWrapper>
            <FormSectionWrapper className="mb-6 lg:mb-8" label="Justificativa">
              <Textarea
                {...methods.register('justification')}
                onBlur={handleSaveDraftOnBlur}
                placeholder="Escreva aqui..."
                className={cn(
                  'min-h-40 py-4 lg:text-lg',
                  methods.formState.errors.justification &&
                    'animate-shake border-red-500 text-red-500',
                )}
              />
              {methods.formState.errors.justification && (
                <p className="mt-1 text-sm text-red-500">
                  {methods.formState.errors.justification.message as string}
                </p>
              )}
            </FormSectionWrapper>
            <Button
              type="submit"
              className="mt-8 mb-24 w-full cursor-pointer py-8 text-xl font-bold"
              size="xl"
            >
              <span>{isEditMode ? 'Editar' : 'Criar'}</span>
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
