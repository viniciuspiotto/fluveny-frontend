import type { Module } from '@/@types/module';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useModuleInfo } from '../store/use-module-info';
import { Tag } from './tag';

export const ModuleCard = ({ id, title, grammarRules }: Module) => {
  const navigate = useNavigate();
  const { setModuleId } = useModuleInfo();

  const handleEnterModule = () => {
    setModuleId(id);
    navigate(`/modules/${id}`);
  };

  return (
    <li className="min-w-0">
      <Button
        onClick={handleEnterModule}
        className="flex h-full min-h-60 w-full min-w-0 flex-initial flex-col items-start justify-between rounded-md bg-[url(/img/party.webp)] bg-cover bg-center p-4 hover:cursor-pointer lg:min-h-70 lg:p-6"
      >
        <span className="w-full truncate text-2xl font-bold break-words whitespace-normal text-zinc-50 lg:text-3xl">
          {title}
        </span>
        <ul className="flex flex-wrap gap-2 lg:gap-4">
          {grammarRules.map((grammarRule, index) => {
            return <Tag key={index} name={grammarRule.title} />;
          })}
        </ul>
      </Button>
    </li>
  );
};
