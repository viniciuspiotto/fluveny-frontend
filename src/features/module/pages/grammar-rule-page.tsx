import { NavigationBlocker } from '@/components/navigation-blocker';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GrammarRule } from '../components/grammar-rule';
import { useGrammarRuleModuleInfo } from '../store/use-grammar-rule-module-info';
import { useModuleWizard } from '../store/use-module-wizard';

export const GrammarRulePage = () => {
  const [hasUnsavedWindows, setHasUnsavedWindows] = useState(false);
  const { grammarRuleModuleInfos } = useGrammarRuleModuleInfo();
  const { currentStep } = useModuleWizard();

  const currentGrammarRuleModule = grammarRuleModuleInfos.find(
    (m) => m.grammarRuleModuleId === currentStep,
  );

  const windows = currentGrammarRuleModule?.windows;
  const currentWindow = windows?.find((w) => w.isCurrent);

  useEffect(() => {
    const unsaved =
      (windows ?? []).filter((w) => {
        return w != null && w.mode === 'CREATE';
      }).length > 0;
    setHasUnsavedWindows(unsaved);
  }, [windows]);

  console.log(windows, hasUnsavedWindows);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <GrammarRule currentWindow={currentWindow} />
      </DndProvider>
      <NavigationBlocker isBlock={hasUnsavedWindows} />
    </>
  );
};
