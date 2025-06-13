import { Editor } from '@/components/editor';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import { useEditIntroductionForm } from '../../hooks/use-edit-introduction-form';

export const EditIntroduction = () => {
  const { methods, onSubmit, initialContent, isLoading } =
    useEditIntroductionForm();

  if (isLoading) {
    return (
      <div className="min-h-80 max-w-none animate-pulse rounded-md border bg-zinc-200 px-4 lg:h-14 lg:min-h-100 lg:w-full" />
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Editor
          registerCamp="textBlock"
          error={methods.formState.errors.textBlock?.message}
          initialContent={initialContent}
        />
        <Button
          type="submit"
          className="mt-8 mb-20 w-full cursor-pointer py-8 text-xl font-bold"
          size="xl"
        >
          <span>Editar</span>
        </Button>
      </form>
    </FormProvider>
  );
};
