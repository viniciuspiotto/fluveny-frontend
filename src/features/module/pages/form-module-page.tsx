import { ROUTES } from '@/app/configs/routes';
import { LevelSelect } from '@/components/level-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { Back } from '../../../components/back';
import { BannerUpload } from '../components/banner-upload';
import { DescriptionField } from '../components/description-field';
import { FormSectionWrapper } from '../components/form-section-wrapper';
import { GrammarRulesField } from '../components/grammar-rules-field';
import { DeleteModal } from '../components/module-delete-modal';
import FormModulePageSkeleton from '../components/module-page-skeleton';
import { TitleInput } from '../components/title-input';
import { useCreateModule } from '../hooks/api/mutations/use-create-module';
import { useUpdateModule } from '../hooks/api/mutations/use-update-details';
import { useGetModule } from '../hooks/api/queries/use-get-module';
import {
  moduleFormSchema,
  type ModuleForm,
} from '../schemas/module-form-schema';

export const FormModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const isEditMode = !!moduleId;
  const navigate = useNavigate();

  const { data: moduleData, isLoading } = useGetModule(moduleId);

  const methods = useForm<ModuleForm>({
    resolver: zodResolver(moduleFormSchema),
    defaultValues: {
      title: '',
      id_grammarRules: [],
      id_level: '',
      description: '',
      estimatedTime: 0,
    },
  });

  const createModuleMutation = useCreateModule();
  const updateModuleMutation = useUpdateModule();

  useEffect(() => {
    if (isEditMode && moduleData) {
      methods.reset({
        title: moduleData.title,
        description: moduleData.description,
        id_grammarRules: moduleData.grammarRules.map((rule) => String(rule.id)),
        id_level: moduleData.level.id,
        estimatedTime: moduleData.estimatedTime,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, moduleData]);

  const handleApiError = (error: any) => {
    const errorMessage = error.response?.data?.message;

    if (errorMessage === 'Another module with this title already exists') {
      methods.setError('title', {
        type: 'manual',
        message:
          'Já existe um módulo com este título. Por favor, escolha outro.',
      });
    } else {
      toast.error('Ocorreu um erro ao salvar o módulo.');
    }
  };

  if (isEditMode && isLoading) {
    return <FormModulePageSkeleton />;
  }

  const onSubmit: SubmitHandler<ModuleForm> = (formData) => {
    if (isEditMode) {
      updateModuleMutation.mutate(
        { moduleId, data: formData },
        {
          onSuccess: () => {
            toast.success('Módulo atualizado com sucesso!');
            navigate(
              `${ROUTES.modules}/${ROUTES.create}/${moduleId}/${ROUTES.introduction}`,
            );
          },
          onError: handleApiError, // Adicionado tratamento de erro
        },
      );
    } else {
      createModuleMutation.mutate(formData, {
        onSuccess: (data) => {
          toast.success('Módulo criado com sucesso!');
          const newModuleId = data.id;
          navigate(
            `${ROUTES.modules}/${ROUTES.create}/${newModuleId}/${ROUTES.introduction}`,
          );
        },
        onError: handleApiError, // Adicionado tratamento de erro
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="mb-20" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="relative">
          <BannerUpload />
          <Back
            className="absolute -bottom-6 left-4 z-10"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="mx-auto mt-10 w-full max-w-300 px-4 pb-8">
          <TitleInput />
          <GrammarRulesField />
          <FormSectionWrapper label="Nível de dificuldade" htmlFor="id_level">
            <LevelSelect name="id_level" level={moduleData?.level.id} />
          </FormSectionWrapper>
          <FormSectionWrapper label="Tempo estimado" htmlFor="estimatedTime">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Input
                  {...methods.register('estimatedTime', {
                    valueAsNumber: true,
                  })}
                  type="number"
                  className="w-24 py-6 text-center"
                  max={600}
                  min={1}
                />
                <span className="">min</span>
              </div>
              {methods.formState.errors.estimatedTime && (
                <p className="text-sm text-red-500">
                  {methods.formState.errors.estimatedTime.message as string}
                </p>
              )}
            </div>
          </FormSectionWrapper>
          <FormSectionWrapper label="Descrição" htmlFor="description">
            <DescriptionField />
          </FormSectionWrapper>
          <div className="mt-8 flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full py-8 text-xl font-bold"
              disabled={
                createModuleMutation.isPending || updateModuleMutation.isPending
              }
            >
              <span>{isEditMode ? 'Editar' : 'Criar'}</span>
            </Button>
          </div>
          {isEditMode && (
            <div className="mt-4 flex justify-center">
              <DeleteModal>
                <span className="cursor-pointer text-zinc-500 select-none hover:text-red-600">
                  Excluir
                </span>
              </DeleteModal>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
