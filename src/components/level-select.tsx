import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetLevels } from '@/features/module/hooks/api/queries/use-get-levels';
import { useFormContext } from 'react-hook-form';

interface FormSelectProps {
  name: string;
  level: string | undefined;
}

export const LevelSelect = ({ name, level }: FormSelectProps) => {
  const { control } = useFormContext();
  const { data: levels } = useGetLevels();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <FormItem>
            <Select onValueChange={field.onChange} value={field.value ?? level}>
              <FormControl>
                <SelectTrigger className="text-md px-4 py-6">
                  <SelectValue placeholder={'Nível'} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {levels?.map((level) => (
                  <SelectItem
                    className="text-md"
                    key={level.id}
                    value={level.id}
                  >
                    {level.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  );
};
