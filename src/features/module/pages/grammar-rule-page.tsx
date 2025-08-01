import { NotFound } from '@/components/not-found';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router';
import { GrammarRule } from '../components/grammar-rule/grammar-rule';
import { useGetGrammarRuleContent } from '../hooks/api/queries/use-get-grammar-rule-content';
import { useGrammarRuleModuleInfo } from '../store/use-grammar-rule-module-info';
import { useModuleInfo } from '../store/use-module-info';

export const GrammarRulePage = () => {
  const { grammarRuleId } = useParams();
  const { moduleId } = useModuleInfo();

  const { isLoading, isError } = useGetGrammarRuleContent(
    moduleId,
    grammarRuleId,
    {
      enabled: !!moduleId && !!grammarRuleId,
    },
  );

  const { windows, currentWindow } = useGrammarRuleModuleInfo((state) => {
    const moduleInfo = state.grammarRuleModuleInfos.find(
      (info) => info.grammarRuleModuleId === grammarRuleId,
    );

    if (!moduleInfo) {
      return { windows: [], currentWindow: null };
    }

    const current = moduleInfo.windows.find((w) => w.isCurrent) || null;
    return { windows: moduleInfo.windows, currentWindow: current };
  });

  if (!grammarRuleId || !moduleId) {
    return <NotFound />;
  }

  if (isLoading || (windows.length === 0 && !isError)) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Ocorreu um erro ao buscar os dados.</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <GrammarRule currentWindow={currentWindow} />
    </DndProvider>
  );
};
