import { cn } from '@/app/utils/cn';
import { useGetLevels } from '@/features/module/hooks/api/queries/use-get-levels';
import { useFormContext } from 'react-hook-form';

export const LevelSelect = () => {
  const { data: response } = useGetLevels();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const levels = response?.data ?? [];

  return (
    <div className="relative">
      <select
        id="id_level"
        {...register('id_level')}
        className={cn(
          'peer w-[110px] min-w-[100px] appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-lg leading-tight focus:border-blue-500 focus:outline-none lg:w-[120px] lg:py-3 lg:text-lg',
          errors.id_level &&
            'animate-shake border-red-500 text-red-500 placeholder:text-red-500',
          'pr-8', // Adiciona padding à direita para o chevron
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '1.5em 1.5em',
        }}
      >
        <option value="" disabled hidden>
          Nível
        </option>
        {levels.map((level) => (
          <option key={level.id} value={level.id}>
            {level.title}
          </option>
        ))}
      </select>
      {errors.id_level && (
        <p className="mt-1 text-sm text-red-500">
          {errors.id_level.message as string}
        </p>
      )}
    </div>
  );
};
