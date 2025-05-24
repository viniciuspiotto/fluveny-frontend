import { LevelSelect } from '@/components/level-select';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import { useModuleEditDetailsForm } from '../../hooks/use-module-edit-details-form';
import { useBackModal } from '../../store/use-back-modal';
import { useModuleInfo } from '../../store/use-module-info';
import { Back } from '../back';
import { BackModal } from '../back-modal';
import { BannerUpload } from '../details/banner-upload';
import { DescriptionField } from '../details/description-field';
import { FormSectionWrapper } from '../details/form-section-wrapper';
import { GrammarRulesField } from '../details/grammar-rules-field';
import { TitleInput } from '../details/title-input';

export const EditDetails = () => {
  const { methods, onSubmit } = useModuleEditDetailsForm();
  const { moduleId } = useModuleInfo();
  const { openBackModal } = useBackModal();

  const handleBack = () => {
    openBackModal(`/modules/${moduleId}`);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="relative">
            <BannerUpload />
            <Back
              className="absolute -bottom-6 left-4 z-10"
              onClick={handleBack}
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
              <span>Editar</span>
            </Button>
          </div>
        </form>
      </FormProvider>
      <BackModal />
    </>
  );
};
