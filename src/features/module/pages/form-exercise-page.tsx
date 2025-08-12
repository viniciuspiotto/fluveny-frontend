import { cn } from '@/app/utils/cn';
import { NotFound } from '@/components/not-found';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { FormSectionWrapper } from '../components/form-section-wrapper';
import { ModuleHeader } from '../components/module-header';
import { useCreateTranslateExercise } from '../hooks/api/mutations/use-create-translate-exercise';
import { useUpdateTranslateExercise } from '../hooks/api/mutations/use-update-translate-exercise';
import { useGetExercise } from '../hooks/api/queries/use-get-exercise';
import {
  TranslateExerciseSchema,
  type TranslateExerciseForm,
} from '../schemas/translate-exercise-schema';
import { useGrammarRuleModuleWindows } from '../stores/use-grammar-rule-module-windows';

export const FormExercisePage = () => {
  const { moduleId, grammarRuleId, windowId } = useParams();

  const windowsList = useGrammarRuleModuleWindows((state) => state.windowsList);
  const currentPosition = useGrammarRuleModuleWindows(
    (state) => state.currentPosition,
  );
  const updateDraftData = useGrammarRuleModuleWindows(
    (state) => state.updateDraftData,
  );
  const setWindowsList = useGrammarRuleModuleWindows(
    (state) => state.setWindowsList,
  );

  const isDraftMode = !windowId;

  const { data: TranslateExerciseContent, isLoading } = useGetExercise({
    moduleId,
    grammarRuleId,
    windowId,
  });

  const methods = useForm<TranslateExerciseForm>({
    resolver: zodResolver(TranslateExerciseSchema),
    defaultValues: {
      header: '',
      justification: '',
      phrase: '',
      template: '',
    },
  });

  const isEditMode = !!windowId && !!TranslateExerciseContent;

  const updateTranslateExercise = useUpdateTranslateExercise();
  const createTranslateExercise = useCreateTranslateExercise();

  useEffect(() => {
    if (isEditMode) {
      methods.reset({
        header: TranslateExerciseContent.header,
        justification: TranslateExerciseContent.justification,
        phrase: TranslateExerciseContent.phrase,
        template: TranslateExerciseContent.template,
      });
    } else if (isDraftMode && currentPosition !== null) {
      const currentWindow = windowsList[currentPosition];
      if (
        currentWindow &&
        currentWindow.type === 'EXERCISE' &&
        currentWindow.draftData
      ) {
        methods.reset(currentWindow.draftData);
      }
    }
  }, [
    TranslateExerciseContent,
    isEditMode,
    isDraftMode,
    methods,
    currentPosition,
    windowsList,
  ]);

  const watchedValues = methods.watch();
  useEffect(() => {
    if (!isDraftMode || currentPosition === null) return;

    const handler = setTimeout(() => {
      updateDraftData(currentPosition, watchedValues);
    }, 500);

    return () => clearTimeout(handler);
  }, [watchedValues, updateDraftData, currentPosition, isDraftMode]);

  if (!moduleId || !grammarRuleId) {
    return <NotFound />;
  }

  const onSubmit = (formData: TranslateExerciseForm) => {
    if (isEditMode) {
      updateTranslateExercise.mutate({
        moduleId,
        grammarRuleId,
        windowId,
        data: formData,
      });
    } else {
      createTranslateExercise.mutate(
        {
          moduleId,
          grammarRuleId,
          data: formData,
        },
        {
          onSuccess: (newlyCreatedWindow) => {
            if (currentPosition === null) return;
            const newList = [...windowsList];

            console.log(newlyCreatedWindow);

            newList[currentPosition] = {
              id: newlyCreatedWindow.id,
              type: 'EXERCISE',
              clientId: newlyCreatedWindow.id,
            };

            setWindowsList(newList);
          },
        },
      );
    }
  };

  if (isLoading) {
    return <div>carregando</div>;
  }

  return (
    <>
      <ModuleHeader step={'Exercício'} />
      <div className="mx-auto mb-30 flex w-full max-w-300 flex-col px-4 pb-8">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormSectionWrapper label="Cabeçalho">
              <Input
                {...methods.register('header')}
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
