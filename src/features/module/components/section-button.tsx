import { capitalizeWords } from '@/app/utils/capitalize-words';
import { Button } from '@/components/ui/button';
import { SECTIONS_CREATION_MODULE } from '@/constants/module';
import { useNavigate, useParams } from 'react-router';
import { useConfirmModalStore } from '../store/use-confirm-modal-store';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';

interface SectionButtonProps {
  variant: 'introduction' | 'grammarRule' | 'finalChallenge' | 'revision';
  title: string;
  slug: string;
  disabled?: boolean;
}

export const SectionButton = ({
  variant,
  title,
  slug,
  disabled = false,
}: SectionButtonProps) => {
  const { moduleId } = useModuleInfo();
  const { openModal } = useConfirmModalStore();
  const navigate = useNavigate();
  const { setCurrentStep } = useModuleWizard();
  const { stepModes } = useModuleWizard();
  const { grammarRule } = useParams();
  let hasUnsavedWindows = false;

  if (grammarRule) {
    hasUnsavedWindows = stepModes[grammarRule] === 'create';
  }

  const handleClick = () => {
    if (hasUnsavedWindows) {
      openModal(
        'Você tem alterações não salvas. Deseja realmente sair?',
        () => {
          navigate(`/modules/create/${moduleId}/${slug}`);
          setCurrentStep(slug);
        },
        () => {},
      );
    } else {
      navigate(`/modules/create/${moduleId}/${slug}`);
      setCurrentStep(slug);
    }
  };

  const Icon = SECTIONS_CREATION_MODULE[variant].icon;

  return (
    <Button
      className="cursor-pointer items-center bg-zinc-50 py-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-zinc-50"
      onClick={handleClick}
      disabled={disabled}
    >
      <Icon className="text-primary size-8" />
      <h1 className="text-primary hidden md:block">{capitalizeWords(title)}</h1>
    </Button>
  );
};
