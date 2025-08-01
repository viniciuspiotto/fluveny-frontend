import type { WindowState } from '@/@types/module';
import { NotFound } from '@/components/not-found';
import { ContentWindow } from './content-window';
import { Exercise } from './exercise';
import { CreatePresentation } from './presentation/create-presentation';
import { EditPresentation } from './presentation/edit-presentation';

interface GrammarRuleProps {
  currentWindow: WindowState | null;
}

export const GrammarRule = ({ currentWindow }: GrammarRuleProps) => {
  if (!currentWindow) {
    return <NotFound />;
  }

  return (
    <div className="mb-30">
      <div className="transition-all duration-300">
        {currentWindow.type === 'PRESENTATION' &&
          (currentWindow.mode === 'CREATE' ? (
            <CreatePresentation />
          ) : (
            <EditPresentation />
          ))}
        {currentWindow.type === 'EXERCISE' && <Exercise />}
      </div>
      <ContentWindow />
    </div>
  );
};
