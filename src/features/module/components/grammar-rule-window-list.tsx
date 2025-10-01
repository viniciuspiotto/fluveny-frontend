import { useGrammarRuleModuleWindows } from '../stores/use-grammar-rule-module-windows';
import { WindowList } from './window-list';

export const GrammarRuleWindowList = () => {
  const windowsList = useGrammarRuleModuleWindows((state) => state.windowsList);
  const currentPosition = useGrammarRuleModuleWindows(
    (state) => state.currentPosition,
  );
  const setCurrentPosition = useGrammarRuleModuleWindows(
    (state) => state.setCurrentPosition,
  );
  const moveWindow = useGrammarRuleModuleWindows((state) => state.moveWindow);

  return (
    <WindowList
      isPresentationEnabled={true}
      windows={windowsList}
      currentPosition={currentPosition}
      onSelectWindow={setCurrentPosition}
      moveWindow={moveWindow}
    />
  );
};
