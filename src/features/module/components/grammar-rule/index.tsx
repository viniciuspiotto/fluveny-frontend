import { useEffect } from 'react';
import { useConfirmModal } from '../../store/use-confirm-modal';

export const GrammarRule = () => {
  const { setOnSubmit } = useConfirmModal();

  useEffect(() => {
    setOnSubmit(null);
  }, [setOnSubmit]);

  return <div>grammar rule</div>;
};
