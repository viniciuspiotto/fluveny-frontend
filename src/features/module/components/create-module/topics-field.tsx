import { type Control, Controller } from 'react-hook-form';
import { TopicsSelection } from './topics-selection';

type Props = {
  control: Control<any>;
};

export const TopicsField = ({ control }: Props) => (
  <Controller
    control={control}
    name="topics"
    render={({ field }) => (
      <TopicsSelection value={field.value} onChange={field.onChange} />
    )}
  />
);
