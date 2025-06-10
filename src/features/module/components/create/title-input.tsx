import { cn } from '@/app/utils/cn';
import { useFormContext } from 'react-hook-form';

export const TitleInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <textarea
        {...register('title')}
        id="title"
        className={cn(
          'h-28 w-full resize-none rounded-md p-4 text-center text-4xl font-bold shadow-none focus:outline-none',
          errors.title &&
            'animate-shake border-red-500 text-red-500 placeholder:text-red-500',
        )}
        placeholder="Título"
      />
      {errors.title && (
        <p className="mb-8 text-center text-sm text-red-500">
          {errors.title.message as string}
        </p>
      )}
    </div>
  );
};
