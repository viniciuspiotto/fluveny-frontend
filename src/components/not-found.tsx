import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-2xl text-zinc-900">404 - Not Found</h1>
      <span className="hover:text-primary transation cursor-pointer text-base text-zinc-400 duration-300 hover:underline">
        <Link to={'/'}>Voltar para a home</Link>
      </span>
    </div>
  );
};
