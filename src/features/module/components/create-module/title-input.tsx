import type { UseFormRegister } from 'react-hook-form';

type TitleInputProps = {
  register: UseFormRegister<any>;
};

export const TitleInput = ({ register }: TitleInputProps) => (
  <textarea
    {...register('title')}
    className="h-28 w-full resize-none rounded-md p-4 text-center text-4xl font-bold shadow-none focus:outline-none"
    placeholder="Título"
  />
);
