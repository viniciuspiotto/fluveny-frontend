import { cn } from '@/app/utils/cn';
import { processPhrase } from '@/app/utils/phrase-process';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NotFound } from '@/templates/not-found';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import FormExercisePageSkeleton from '../components/exercise-page-skeleton';
import { FillInTheBlankEditor } from '../components/fill-in-the-blank-editor';
import { FormSectionWrapper } from '../components/form-section-wrapper';
import { ModuleHeader } from '../components/module-header';
import { useCreateGrammarRuleExercise } from '../hooks/api/mutations/use-create-grammar-rule-exercise';
import { useUpdateGrammarRuleExercise } from '../hooks/api/mutations/use-update-grammar-rule-exercise';
import { useGetExercise } from '../hooks/api/queries/use-get-exercise';
import {
  FillInTheBlankWithIDSchema,
  type FillInTheBlankSchemaForm,
  type FillInTheBlankSchemaWithIDForm,
  type PhraseElement,
} from '../schemas/fill-in-the-blanks-schema';
import { useGrammarRuleModuleWindows } from '../stores/use-grammar-rule-module-windows';

const getDefaultPhrase = (): PhraseElement[] => {
  const initialState = [
    { id: crypto.randomUUID(), type: 'TEXT', content: ' ' },
  ] as PhraseElement[];
  return processPhrase(initialState);
};

export const FormGrammarRuleExerciseFillInTheBlankPage = () => {
  const { windowId, moduleId, grammarRuleId } = useParams();
  const { windowsList, currentPosition, setWindowsList, updateDraftData } =
    useGrammarRuleModuleWindows();

  const isEditMode = !!windowId;

  const currentWindow =
    currentPosition !== null ? windowsList[currentPosition] : undefined;
  const draftData =
    currentWindow?.type === 'EXERCISE'
      ? (currentWindow.draftData as Partial<FillInTheBlankSchemaForm>)
      : undefined;

  const methods = useForm<FillInTheBlankSchemaWithIDForm>({
    resolver: zodResolver(FillInTheBlankWithIDSchema),
    defaultValues: {
      header: '',
      phrase: getDefaultPhrase(),
    },
  });

  const { data: FillInTheBlankExerciseContent, isLoading } = useGetExercise({
    moduleId,
    grammarRuleId,
    windowId,
  });

  useEffect(() => {
    if (isEditMode && FillInTheBlankExerciseContent) {
      if (FillInTheBlankExerciseContent.style === 'FILL_IN_THE_BLANK') {
        FillInTheBlankExerciseContent;

        const phraseWithIds = FillInTheBlankExerciseContent.phrase.map(
          (item) => ({
            ...item,
            id: crypto.randomUUID(),
          }),
        );

        const processedPhrase = processPhrase(phraseWithIds);

        methods.reset({
          header: FillInTheBlankExerciseContent.header || '',
          phrase:
            processedPhrase.length > 0 ? processedPhrase : getDefaultPhrase(),
        });
      }
    } else if (!isEditMode && draftData) {
      methods.reset({
        header: draftData.header || '',
        phrase:
          draftData.phrase && draftData.phrase.length > 0
            ? draftData.phrase
            : getDefaultPhrase(),
      });
    }
  }, [FillInTheBlankExerciseContent, isEditMode, methods, draftData]);

  const updateFillInTheBlankExercise = useUpdateGrammarRuleExercise();
  const createFillInTheBlankExercise = useCreateGrammarRuleExercise();

  const handleSaveDraftOnBlur = () => {
    if (!isEditMode && currentPosition !== null) {
      const currentValues = methods.getValues();
      updateDraftData(currentPosition, currentValues);
    }
  };

  if (!moduleId || !grammarRuleId) {
    return <NotFound />;
  }

  const onSubmit = (formData: FillInTheBlankSchemaWithIDForm) => {
    const cleanedPhrase = formData.phrase
      .map(({ id, ...rest }) => rest)
      .filter(
        (p) => p.type === 'GAP' || (p.type === 'TEXT' && !(p.content === ' ')),
      );

    const dataWithStyle = {
      ...formData,
      phrase: cleanedPhrase,
      style: 'FILL_IN_THE_BLANK',
    };

    if (isEditMode) {
      updateFillInTheBlankExercise.mutate(
        {
          moduleId,
          grammarRuleId,
          windowId,
          data: dataWithStyle,
        },
        {
          onSuccess: () => toast.success('Exercício atualizado com sucesso!'),
        },
      );
    } else {
      createFillInTheBlankExercise.mutate(
        {
          moduleId,
          grammarRuleId,
          data: dataWithStyle,
        },
        {
          onSuccess: (newlyCreatedWindow) => {
            if (currentPosition === null) return;
            const newList = [...windowsList];

            const clientId = newList[currentPosition]?.clientId;

            newList[currentPosition] = {
              id: newlyCreatedWindow.id,
              type: 'EXERCISE',
              style: 'FILL_IN_THE_BLANK',
              clientId,
              draftData: {},
            };

            setWindowsList(newList);

            toast.success('Exercício criado com sucesso!');
          },
        },
      );
    }
  };

  if (isLoading) {
    return <FormExercisePageSkeleton />;
  }

  return (
    <>
      <ModuleHeader step={'Exercício de Preenchimento de frase'} />
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
            <Controller
              name="phrase"
              control={methods.control}
              render={({ field, fieldState }) => (
                <>
                  <FillInTheBlankEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
            <Button
              disabled={
                createFillInTheBlankExercise.isPending ||
                updateFillInTheBlankExercise.isPending
              }
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
