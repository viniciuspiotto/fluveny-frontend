import { ROUTES } from '@/app/configs/routes';
import { DndProvider } from '@/app/providers/dnd-provider';
import { Modal } from '@/components/modal';
import { NotFound } from '@/components/not-found';
import { ContentWindow } from '@/features/module/components/content-window';
import { useGetGrammarRuleContent } from '@/features/module/hooks/api/queries/use-get-grammar-rule-content';
import { useEffect } from 'react';
import { Outlet, useBlocker, useNavigate, useParams } from 'react-router';
import FormPresentationPageSkeleton from '../components/presentation-page-skeleton';
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
  const setCurrentPosition = useGrammarRuleModuleWindows(
    (state) => state.setCurrentPosition,
  );

  const hasDraftWindows = windowsList.filter((w) => !w.id).length !== 0;
  const blocker = useBlocker(({ nextLocation }) => {
    if (!moduleId || !grammarRuleId) return false;

    const grammarRuleBasePath = `/modules/create/${moduleId}/grammarRule/${grammarRuleId}`;

    const isNavigatingWithinEditor =
      nextLocation.pathname.startsWith(grammarRuleBasePath);

    return hasDraftWindows && !isNavigatingWithinEditor;
  });

  const onSendWindowsPosition = () => {
    console.log('send positions');
  };

  const handleConfirmNavigation = () => {
    if (blocker.state === 'blocked') {
      onSendWindowsPosition();
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
      if (windows.length > 0) {
        const windowsWithClientId = windows.map(
          (w) =>
            ({
              ...w,
              clientId: w.id,
            }) as WindowList,
        );
        setWindowsList(windowsWithClientId);
        setCurrentPosition(0);

        const firstWindow = windows[0];
        navigate(`${firstWindow.type.toLocaleLowerCase()}/${firstWindow.id}`, {
          replace: true,
        });
      }
    } else {
      setWindowsList([{ type: 'PRESENTATION', clientId: crypto.randomUUID() }]);
      setCurrentPosition(0);
      navigate(ROUTES.presentation, { replace: true });
    }
  }, [windows, navigate, setWindowsList, setCurrentPosition]);

  if (!grammarRuleId || !moduleId) {
    return <NotFound />;
  }

  if (isLoadingWindows) {
    return <FormPresentationPageSkeleton />;
  }

  return (
    <DndProvider>
      <Outlet key={uniqueKey} />
      <ContentWindow key={grammarRuleId} />
      <Modal
        isOpen={blocker.state === 'blocked'}
        onCancel={handleCancelNavigation}
        onConfirm={handleConfirmNavigation}
      />
    </DndProvider>
  );
};
