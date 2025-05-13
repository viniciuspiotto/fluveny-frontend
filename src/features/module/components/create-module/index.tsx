import { Button } from '@/components/ui/button';
import { Back } from '../back';
import { BannerUpload } from './banner-upload';
import { DescriptionSection } from './description-section';
import { LevelSelection } from './level-selection';
import { TitleUpload } from './title-upload';
import { TopicsSelection } from './topics-selection';

export const CreateModule = () => {
  return (
    <form>
      <div className="relative">
        <BannerUpload />
        <Back />
      </div>
      <div className="mx-auto mt-10 w-full max-w-300 px-4 pb-8">
        <TitleUpload />
        <TopicsSelection />
        <LevelSelection />
        <DescriptionSection />
        <Button
          type="submit"
          className="mt-8 w-full py-8 text-xl font-bold"
          size={'xl'}
        >
          Criar
        </Button>
      </div>
    </form>
  );
};
