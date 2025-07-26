import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GrammarRule } from '../components/grammar-rule';
import { useGrammarRuleModuleInfo } from '../store/use-grammar-rule-module-info';
import { useModuleWizard } from '../store/use-module-wizard';

export const GrammarRulePage = () => {
  const { grammarRuleModuleInfos } = useGrammarRuleModuleInfo();
  const { currentStep } = useModuleWizard();

  const currentGrammarRuleModule = grammarRuleModuleInfos.find(
    (m) => m.grammarRuleModuleId === currentStep,
  );
  const currentWindow = currentGrammarRuleModule?.windows.find(
    (w) => w.isCurrent,
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <GrammarRule currentWindow={currentWindow} />
    </DndProvider>
  );
};
