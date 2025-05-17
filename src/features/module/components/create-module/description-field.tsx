import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { type Control, Controller } from 'react-hook-form';
import type { CreateInformationModuleData } from '../../schemas/module-information-schema';

type DescriptionFieldProps = {
  control: Control<CreateInformationModuleData>;
};

export const DescriptionField = ({ control }: DescriptionFieldProps) => (
  <Controller
    control={control}
    name="description"
    render={({ field }) => (
      <AutosizeTextarea
        id="description"
        className="resize-none text-lg"
        minHeight={200}
        maxHeight={400}
        {...field}
      />
    )}
  />
);
