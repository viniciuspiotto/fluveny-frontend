import { type Control, Controller } from 'react-hook-form';
import type { CreateInformationModuleData } from '../../schemas/module-information-schema';
import { TopicsSelection } from './topics-selection';

type Props = {
  control: Control<CreateInformationModuleData>;
};

export const TopicsField = ({ control }: Props) => (
  <Controller
    control={control}
    name="id_grammarRules"
    render={({ field }) => <TopicsSelection onChange={field.onChange} />}
  />
);
