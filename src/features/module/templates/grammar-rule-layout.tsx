import { ROUTES } from '@/app/configs/routes';
import { DndProvider } from '@/app/providers/dnd-provider';
import { DraftWindowsModal } from '@/components/modal';
import { ContentWindow } from '@/features/module/components/content-window';
import { useGetGrammarRuleContent } from '@/features/module/hooks/api/queries/use-get-grammar-rule-content';
import { NotFound } from '@/templates/not-found';
import { useEffect } from 'react';
import { Outlet, useBlocker, useNavigate, useParams } from 'react-router';
import FormPresentationPageSkeleton from '../components/presentation-page-skeleton';
import { useUpdateGrammarRuleWindows } from '../hooks/api/mutations/use-update-grammar-rule-windows';
import {
  useGrammarRuleModuleWindows,
  type WindowList,
} from '../stores/use-grammar-rule-module-windows';

export const GrammarRuleLayout = () => {
  const navigate = useNavigate();
  const { moduleId, grammarRuleId } = useParams();

  const { data: windows, isLoading: isLoadingWindows } =
    useGetGrammarRuleContent(moduleId, grammarRuleId);

  const updateGrammarRuleWindows = useUpdateGrammarRuleWindows();

  const windowsList = useGrammarRuleModuleWindows((state) => state.windowsList);
  const setWindowsList = useGrammarRuleModuleWindows(
    (state) => state.setWindowsList,
  );
  const currentPosition = useGrammarRuleModuleWindows(
    (state) => state.currentPosition,
  );
  const setCurrentPosition = useGrammarRuleModuleWindows(
    (state) => state.setCurrentPosition,
  );

  const hasDraftWindows = windowsList.some((w) => !w.id);

  const blocker = useBlocker(({ nextLocation }) => {
    if (!moduleId || !grammarRuleId) return false;

    const grammarRuleBasePath = `/modules/create/${moduleId}/grammarRule/${grammarRuleId}`;
    const isNavigatingWithinEditor =
      nextLocation.pathname.startsWith(grammarRuleBasePath);

    return !isNavigatingWithinEditor;
  });

  useEffect(() => {
    if (blocker.state === 'blocked' && !hasDraftWindows) {
      onSendWindowsPosition(windowsList);
      blocker.proceed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocker, hasDraftWindows, windowsList]);

  const handleConfirmNavigation = () => {
    if (blocker.state === 'blocked') {
      const windowsToSave = windowsList.filter((w) => w.id);
      onSendWindowsPosition(windowsToSave);
      blocker.proceed();
    }
  };

  const handleCancelNavigation = () => {
    if (blocker.state === 'blocked') {
      blocker.reset();
    }
  };

  const currentWindow =
    currentPosition !== null ? windowsList[currentPosition] : null;
  const uniqueKey = currentWindow?.id ?? currentWindow?.clientId;

  useEffect(() => {
    if (windows) {
      const windowsWithClientId = windows.map(
        (w) =>
          ({
            ...w,
            clientId: w.id,
          }) as WindowList,
      );
      setWindowsList(windowsWithClientId);
      setCurrentPosition(0);

      if (windows.length > 0) {
        const firstWindow = windows[0];
        navigate(`${firstWindow.type.toLocaleLowerCase()}/${firstWindow.id}`, {
          replace: true,
        });
      } else {
        navigate(ROUTES.presentation, { replace: true });
      }
    } else if (!isLoadingWindows) {
      setWindowsList([{ type: 'PRESENTATION', clientId: crypto.randomUUID() }]);
      setCurrentPosition(0);
      navigate(ROUTES.presentation, { replace: true });
    }
  }, [windows, isLoadingWindows, navigate, setWindowsList, setCurrentPosition]);

  if (isLoadingWindows) {
    return <FormPresentationPageSkeleton />;
  }

  if (!moduleId || !grammarRuleId) return <NotFound />;

  const onSendWindowsPosition = (data: WindowList[]) => {
    const windowsWithId = data
      .filter((w) => w.id)
      .map(({ id, type }) => ({
        id,
        type,
      }));

    updateGrammarRuleWindows.mutate(
      { moduleId, data: windowsWithId, grammarRuleId },
      {
        onSuccess: () => {},
      },
    );
  };

  return (
    <DndProvider key={grammarRuleId}>
      <div>
        <Outlet key={uniqueKey} />
        <ContentWindow />
        <DraftWindowsModal
          isOpen={blocker.state === 'blocked' && hasDraftWindows}
          onCancel={handleCancelNavigation}
          onConfirm={handleConfirmNavigation}
        />
      </div>
    </DndProvider>
  );
};
