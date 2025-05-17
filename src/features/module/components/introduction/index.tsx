import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation } from 'react-router';
import { useModuleWizard } from '../../store/use-module-wizard';

export const Introduction = () => {
  const location = useLocation();
  const { register, control } = useForm({ mode: 'onChange' });
  const { setStepCompletion } = useModuleWizard();

  const topic = location.pathname.split('/').at(-1);

  const values = useWatch({ control });

  const expectedFields = ['field1'];

  useEffect(() => {
    const allFilled = expectedFields.every((key) => {
      const value = values[key];
      return typeof value === 'string' && value.trim() !== '';
    });

    if (topic) {
      setStepCompletion(topic, allFilled);
    }
  }, [values, topic, setStepCompletion, expectedFields]);

  return (
    <div>
      <Input {...register('field1', { required: true })} />
    </div>
  );
};
