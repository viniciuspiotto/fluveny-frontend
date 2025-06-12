import { Editor } from '@/components/editor';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import { useCreateIntroductionForm } from '../../hooks/use-create-introduction-form';

export const CreateIntroduction = () => {
  const { methods, onSubmit } = useCreateIntroductionForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Editor
          registerCamp="textBlock"
          error={methods.formState.errors.textBlock?.message}
        />
        <Button
          type="submit"
          className="mt-8 mb-20 w-full cursor-pointer py-8 text-xl font-bold"
          size="xl"
        >
          <span>Criar</span>
        </Button>
      </form>
    </FormProvider>
  );
};
