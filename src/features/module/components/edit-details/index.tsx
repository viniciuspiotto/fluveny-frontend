import { LevelSelect } from '@/components/level-select';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import { useModuleEditDetailsForm } from '../../hooks/use-module-edit-details-form';
import { Back } from '../back';
import { BannerUpload } from '../details/banner-upload';
import { DescriptionField } from '../details/description-field';
import { FormSectionWrapper } from '../details/form-section-wrapper';
import { GrammarRulesField } from '../details/grammar-rules-field';
import { TitleInput } from '../details/title-input';

export const EditDetails = () => {
  const { methods, onSubmit } = useModuleEditDetailsForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="relative">
          <BannerUpload />
          <Back className="absolute -bottom-6 left-4 z-10" />
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
            <span>Editar</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
