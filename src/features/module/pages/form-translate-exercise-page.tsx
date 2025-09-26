import { cn } from '@/app/utils/cn';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormSectionWrapper } from '../components/form-section-wrapper';
import { GenericExerciseForm } from '../components/generic-exercise-form';
import { useCreateTranslateExercise } from '../hooks/api/mutations/use-create-translate-exercise';
import { useUpdateTranslateExercise } from '../hooks/api/mutations/use-update-translate-exercise';
import { useGetExercise } from '../hooks/api/queries/use-get-exercise';
import { useExerciseForm } from '../hooks/use-exercise-form';
import {
  TranslateExerciseSchema,
  type TranslateExerciseForm,
} from '../schemas/translate-exercise-schema';

export const FormTranslateExercisePage = () => {
  const {
    methods,
    isLoading,
    isEditMode,
    moduleId,
    parentId,
    onSubmit,
    handleSaveDraftOnBlur,
  } = useExerciseForm<TranslateExerciseForm>({
    schema: TranslateExerciseSchema,
    useGetExercise: useGetExercise,
    useCreateExercise: useCreateTranslateExercise,
    useUpdateExercise: useUpdateTranslateExercise,
    paramKeys: {
      moduleId: 'moduleId',
      parentId: 'grammarRuleId',
      exerciseId: 'windowId',
    },
  });

  return (
    <GenericExerciseForm
      methods={methods}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isEditMode={isEditMode}
      isReady={!!moduleId && !!parentId}
    >
      <FormSectionWrapper label="Cabeçalho">
        <Input
          {...methods.register('header')}
          onBlur={handleSaveDraftOnBlur}
          className={cn(
            'py-6 lg:text-lg',
            methods.formState.errors.header && 'animate-shake border-red-500',
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
            methods.formState.errors.phrase && 'animate-shake border-red-500',
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
            methods.formState.errors.template && 'animate-shake border-red-500',
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
              'animate-shake border-red-500',
          )}
        />
        {methods.formState.errors.justification && (
          <p className="mt-1 text-sm text-red-500">
            {methods.formState.errors.justification.message as string}
          </p>
        )}
      </FormSectionWrapper>
    </GenericExerciseForm>
  );
};
