import { LevelSelect } from '@/components/level-select';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEditModuleForm } from '../../hooks/use-edit-module-form';
import { Back } from '../back';
import { BannerUpload } from '../create/banner-upload';
import { DescriptionField } from '../create/description-field';
import { FormSectionWrapper } from '../create/form-section-wrapper';
import { GrammarRulesField } from '../create/grammar-rules-field';
import { TitleInput } from '../create/title-input';

export const EditModule = () => {
  const { methods, onSubmit } = useEditModuleForm();
  const navigate = useNavigate();

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
              <LevelSelect />
            </FormSectionWrapper>
            <FormSectionWrapper label="Descrição" htmlFor="description">
              <DescriptionField />
            </FormSectionWrapper>
            <Button
              type="submit"
              className="mt-8 w-full cursor-pointer py-8 text-xl font-bold"
              size="xl"
            >
              Editar
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
