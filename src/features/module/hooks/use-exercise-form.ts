import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query'; // Exemplo
import { useEffect } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { useParams } from 'react-router';
import { z } from 'zod';
import { useGrammarRuleModuleWindows } from '../stores/use-grammar-rule-module-windows';

type ExerciseFormOptions<T extends FieldValues> = {
  schema: z.ZodType<T>;
  useGetExercise: (params: any) => ReturnType<typeof useQuery>;
  useCreateExercise: () => ReturnType<typeof useMutation>;
  useUpdateExercise: () => ReturnType<typeof useMutation>;
  paramKeys: {
    moduleId: string;
    parentId: string;
    exerciseId?: string;
  };
};

export const useExerciseForm = <T extends FieldValues>({
  schema,
  useGetExercise,
  useCreateExercise,
  useUpdateExercise,
  paramKeys,
}: ExerciseFormOptions<T>) => {
  const params = useParams();
  const moduleId = params[paramKeys.moduleId];
  const parentId = params[paramKeys.parentId];
  const exerciseId = paramKeys.exerciseId
    ? params[paramKeys.exerciseId]
    : undefined;

  const { windowsList, currentPosition, setWindowsList, updateDraftData } =
    useGrammarRuleModuleWindows();

  const methods = useForm<T>({
    resolver: zodResolver(schema),
  });

  const isEditMode = !!exerciseId;

  const { data: exerciseContent, isLoading } = useGetExercise({
    moduleId,
    [paramKeys.parentId]: parentId,
    [paramKeys.exerciseId!]: exerciseId,
    enabled: isEditMode,
  });

  const currentWindow =
    currentPosition !== null ? windowsList[currentPosition] : undefined;
  const draftData =
    currentWindow?.type === 'EXERCISE'
      ? (currentWindow.draftData as Partial<T>)
      : undefined;

  useEffect(() => {
    if (isEditMode && exerciseContent) {
      methods.reset(exerciseContent);
    } else if (!isEditMode && draftData) {
      methods.reset(draftData as any);
    }
  }, [exerciseContent, isEditMode, methods, draftData]);

  const handleSaveDraftOnBlur = () => {
    if (!isEditMode && currentPosition !== null) {
      const currentValues = methods.getValues();
      updateDraftData(currentPosition, currentValues);
    }
  };

  const createExercise = useCreateExercise();
  const updateExercise = useUpdateExercise();

  const onSubmit = (formData: T) => {
    if (isEditMode) {
      updateExercise.mutate({
        moduleId,
        [paramKeys.parentId]: parentId,
        [paramKeys.exerciseId!]: exerciseId,
        data: formData,
      });
    } else {
      createExercise.mutate(
        {
          moduleId,
          [paramKeys.parentId]: parentId,
          data: formData,
        },
        {
          onSuccess: (newlyCreatedWindow: { id: string }) => {
            if (currentPosition === null) return;
            const newList = [...windowsList];
            const clientId = newList[currentPosition]?.clientId;
            newList[currentPosition] = {
              id: newlyCreatedWindow.id,
              type: 'EXERCISE',
              clientId,
              draftData: {},
            };
            setWindowsList(newList);
          },
        },
      );
    }
  };

  return {
    methods,
    isLoading,
    isEditMode,
    moduleId,
    parentId,
    onSubmit,
    handleSaveDraftOnBlur,
  };
};
