import type { Module } from '@/@types/module';
import { Link } from 'react-router';
import { Tag } from './tag';

export const ModuleCard = ({ id, title, grammarRules }: Module) => {
  return (
    <li className="min-w-0">
      <Link
        to={`/modules/${id}`}
        className="flex h-full min-h-60 min-w-0 flex-col justify-between rounded-md bg-[url(/img/party.webp)] bg-cover bg-center p-4 lg:min-h-70 lg:p-6"
      >
        <span className="text-2xl font-bold break-words text-zinc-50 lg:text-3xl">
          {title}
        </span>
        <ul className="flex flex-wrap gap-2 lg:gap-4">
          {grammarRules.map((grammarRule, index) => {
            return <Tag key={index} name={grammarRule.title} />;
          })}
        </ul>
      </Link>
    </li>
  );
};
