import { useGrammarRuleModuleInfo } from '../../store/use-grammar-rule-module-info';
import { useModuleWizard } from '../../store/use-module-wizard';
import { Window } from './window';

export const ContentWindow = () => {
  const {
    grammarRuleModuleInfos,
    addWindowToGrammarRuleModuleInfo,
    setCurrentWindowInGrammarRuleModuleInfo,
  } = useGrammarRuleModuleInfo();
  const { currentStep } = useModuleWizard();

  const currentGrammarRuleModule = grammarRuleModuleInfos.find(
    (m) => m.grammarRuleModuleId === currentStep,
  );

  return (
    <ol className="fixed bottom-0 left-0 mb-20 flex w-full items-center gap-4 overflow-x-auto bg-white px-4 py-2 lg:px-10">
      {currentGrammarRuleModule?.windows.map((window) => (
        <Window
          key={window.id}
          type={window.type}
          mode={window.mode}
          position={window.position}
          isCurrent={window.isCurrent}
          onAddWindow={addWindowToGrammarRuleModuleInfo}
          onSetCurrentWindow={setCurrentWindowInGrammarRuleModuleInfo}
        />
      ))}
    </ol>
  );
};
