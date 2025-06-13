import type { WindowState } from '@/@types/module';
import { ContentWindow } from './content-window';
import { Exercise } from './exercise';
import { CreatePresentation } from './presentation/create-presentation';
import { EditPresentation } from './presentation/edit-presentation';

interface GrammarRuleProps {
  currentWindow: WindowState | undefined;
}

export const GrammarRule = ({ currentWindow }: GrammarRuleProps) => {
  if (!currentWindow) {
    return <div>Falha ao buscar a janela</div>;
  }

  return (
    <div className="mb-18">
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
