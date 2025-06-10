import { LevelSelect } from '@/components/level-select';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useModuleCreateDetailsForm } from '../../hooks/use-module-create-form';
import { Back } from '../back';
import { BannerUpload } from './banner-upload';
import { DescriptionField } from './description-field';
import { FormSectionWrapper } from './form-section-wrapper';
import { GrammarRulesField } from './grammar-rules-field';
import { TitleInput } from './title-input';

export const Details = () => {
  const { methods, onSubmit } = useModuleCreateDetailsForm();
  const navigate = useNavigate();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="relative">
          <BannerUpload />
          <Back
            className="absolute -bottom-6 left-4 z-10"
            onClick={() => navigate('/modules/drafts')}
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
            className="mt-8 w-full py-8 text-xl font-bold"
            size="xl"
          >
            <span>Criar</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
