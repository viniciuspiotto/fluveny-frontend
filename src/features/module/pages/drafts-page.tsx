import { Drafts } from '../components/drafts';
import { DraftsSkeleton } from '../components/drafts/drafts-skeleton';
import { useGetModules } from '../hooks/api/queries/use-get-modules';

export const DraftsPage = () => {
  const { data: response, isLoading, isError, error } = useGetModules();

  if (isLoading) {
    return <DraftsSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-600">
        Ocorreu um erro ao carregar os rascunhos.
        <pre className="mt-2 text-sm text-gray-500">{String(error)}</pre>
      </div>
    );
  }

  return <Drafts modules={response?.data} />;
};
