import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGrammarRuleModuleWindows } from '../stores/use-grammar-rule-module-windows';
import { Window } from './window';

export const ContentWindow = () => {
  const windowsList = useGrammarRuleModuleWindows((state) => state.windowsList);
  const currentPosition = useGrammarRuleModuleWindows(
    (state) => state.currentPosition,
  );
  const setCurrentPosition = useGrammarRuleModuleWindows(
    (state) => state.setCurrentPosition,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPosition !== null && windowsList[currentPosition]) {
      const currentWindow = windowsList[currentPosition];
      const path = `${currentWindow.type.toLowerCase()}${
        currentWindow.id ? `/${currentWindow.id}` : ''
      }`;
      navigate(path);
    }
  }, [currentPosition, windowsList, navigate]);

  return (
    <ol className="custom-scrollbar fixed bottom-0 left-0 mb-20 flex w-full items-center gap-4 overflow-x-auto bg-white px-4 py-8 lg:px-10">
      {windowsList.map((w, i) => (
        <Window
          id={w.id ?? 'do not have an id'}
          position={i + 1}
          key={w.id || `draft-${i}`}
          isCurrent={(currentPosition ?? 0) === i}
          selectWindow={() => setCurrentPosition(i)}
          isDraft={!w.id}
          type={w.type}
        />
      ))}
    </ol>
  );
};
