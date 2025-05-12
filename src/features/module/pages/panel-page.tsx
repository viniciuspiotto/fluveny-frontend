import { Panel } from '../components/panel';
import { PanelSkeleton } from '../components/panel/panel-skeleton';

export const PanelPage = () => {
  const isLoading = false;

  if (isLoading) {
    return <PanelSkeleton />;
  }

  return <Panel />;
};
