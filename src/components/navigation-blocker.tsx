import { useConfirmModalStore } from '@/features/module/store/use-confirm-modal-store';
import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router';

interface NavigationBlockerProps {
  isBlock: boolean;
}

export const NavigationBlocker = ({ isBlock }: NavigationBlockerProps) => {
  const { openModal } = useConfirmModalStore();
  const [nextLocation, setNextLocation] = useState<any>(null);

  const blocker = useBlocker(({ nextLocation }) => {
    if (isBlock) {
      setNextLocation(nextLocation);
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (blocker.state === 'blocked' && nextLocation) {
      openModal(
        'Você tem alterações não salvas. Deseja realmente sair?',
        () => {
          blocker.proceed();
          setNextLocation(null);
        },
        () => {
          blocker.reset();
          setNextLocation(null);
        },
      );
    }
  }, [blocker, nextLocation, openModal]);

  return null;
};
