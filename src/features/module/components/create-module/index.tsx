import { LevelSelect } from '@/components/level-select';
import { Button } from '@/components/ui/button';
import { useModuleInformationForm } from '../../hooks/use-module-information-form';
import { Back } from '../back';
import { BannerUpload } from './banner-upload';
import { DescriptionField } from './description-field';
import { FormSectionWrapper } from './form-section-wrapper';
import { TitleInput } from './title-input';
import { TopicsField } from './topics-field';

export const CreateModule = () => {
  const { control, handleSubmit, onSubmit, register } =
    useModuleInformationForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <BannerUpload />
        <Back className="absolute -bottom-6 left-4 z-10" />
      </div>
      <div className="mx-auto mt-10 w-full max-w-300 px-4 pb-8">
        <TitleInput register={register} />
        <TopicsField control={control} />
        <FormSectionWrapper label="Nível de dificuldade" htmlFor="level">
          <LevelSelect control={control} />
        </FormSectionWrapper>
        <FormSectionWrapper label="Descrição" htmlFor="description">
          <DescriptionField control={control} />
        </FormSectionWrapper>
        <Button
          type="submit"
          className="mt-8 w-full py-8 text-xl font-bold"
          size="xl"
        >
          Criar
        </Button>
      </div>
    </form>
  );
};
