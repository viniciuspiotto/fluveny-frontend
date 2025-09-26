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

  return (
    <WindowList
      isPresentationEnabled={true}
      windows={windowsList}
      currentPosition={currentPosition}
      onSelectWindow={setCurrentPosition}
    />
  );
};
