import { ROUTES } from '@/app/configs/routes';
import { DndProvider } from '@/app/providers/dnd-provider';
import { NotFound } from '@/components/not-found';
import { ContentWindow } from '@/features/module/components/content-window';
import { useGetGrammarRuleContent } from '@/features/module/hooks/api/queries/use-get-grammar-rule-content';
import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import {
  useGrammarRuleModuleWindows,
  type WindowList,
} from '../stores/use-grammar-rule-module-windows';

export const GrammarRuleLayout = () => {
  const navigate = useNavigate();
  const { moduleId, grammarRuleId } = useParams();

  const { data: windows, isLoading: isLoadingWindows } =
    useGetGrammarRuleContent(moduleId, grammarRuleId);

  const windowsList = useGrammarRuleModuleWindows((state) => state.windowsList);
  const setWindowsList = useGrammarRuleModuleWindows(
    (state) => state.setWindowsList,
  );
  const currentPosition = useGrammarRuleModuleWindows(
    (state) => state.currentPosition,
  );

  const currentWindow =
    currentPosition !== null ? windowsList[currentPosition] : null;
  const uniqueKey = currentWindow?.id ?? currentWindow?.clientId;

  useEffect(() => {
    if (windows && windows.length > 0) {
      const windowsWithClientId = windows.map(
        (w) =>
          ({
            ...w,
            clientId: w.id,
          }) as WindowList,
      );
      setWindowsList(windowsWithClientId);

      const firstWindow = windows[0];
      navigate(`${firstWindow.type.toLocaleLowerCase()}/${firstWindow.id}`, {
        replace: true,
      });
    } else {
      setWindowsList([{ type: 'PRESENTATION', clientId: crypto.randomUUID() }]);
      navigate(ROUTES.presentation, { replace: true });
    }
  }, [windows, setWindowsList, navigate]);

  if (!grammarRuleId || !moduleId) {
    return <NotFound />;
  }

  if (isLoadingWindows) {
    return <div>Carregando...</div>;
  }

  return (
    <DndProvider>
      <Outlet key={uniqueKey} />
      <ContentWindow />
    </DndProvider>
  );
};
