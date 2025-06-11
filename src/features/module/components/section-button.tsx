import { capitalizeWords } from '@/app/utils/capitalize-words';
import { Button } from '@/components/ui/button';
import { SECTIONS_CREATION_MODULE } from '@/constants/module';
import { useNavigate } from 'react-router';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';

interface SectionButtonProps {
  variant: 'introduction' | 'grammarRule' | 'finalChallenge' | 'revision';
  title: string;
  slug: string;
}

export const SectionButton = ({ variant, title, slug }: SectionButtonProps) => {
  const { moduleId } = useModuleInfo();
  const navigate = useNavigate();
  const { setCurrentStep } = useModuleWizard();

  const handleClick = () => {
    setCurrentStep(slug);
    navigate(`/modules/create/${moduleId}/${slug}`);
  };

  const Icon = SECTIONS_CREATION_MODULE[variant].icon;

  return (
    <Button
      className="cursor-pointer items-center bg-zinc-50 py-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-zinc-50"
      onClick={handleClick}
    >
      <Icon className="text-primary size-8" />
      <h1 className="text-primary hidden md:block">{capitalizeWords(title)}</h1>
    </Button>
  );
};
