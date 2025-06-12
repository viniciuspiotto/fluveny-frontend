import { useWindowInfo } from '../../store/use-window-info';
import { ContentWindow } from './content-window';
import { Exercise } from './exercise';
import { Presentation } from './presentation';

export const GrammarRule = () => {
  const { windows } = useWindowInfo();

  const currentWindow = windows.find((w) => w.isCurrent);

  return (
    <div className="mb-18">
      <div className="transition-all duration-300">
        {currentWindow?.type === 'presentation' && <Presentation />}
        {currentWindow?.type === 'exercise' && <Exercise />}
      </div>
      <ContentWindow />
    </div>
  );
};
