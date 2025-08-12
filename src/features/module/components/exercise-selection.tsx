import type { WindowType } from '@/@types/module';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Toggle } from '@/components/ui/toggle';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
  AudioLines,
  Boxes,
  Eye,
  Languages,
  PencilLine,
  Puzzle,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

const exercisesStyles = [
  [
    {
      icon: <Boxes className="size-8" />,
      title: 'construção de frase',
    },
    {
      icon: <Languages className="size-8" />,
      title: 'tradução de frase',
    },
    {
      icon: <Puzzle className="size-8" />,
      title: 'preenchimento de frase',
    },
  ],
  [
    {
      icon: <Boxes className="size-8" />,
      title: 'placeholder 1',
    },
    {
      icon: <Languages className="size-8" />,
      title: 'placeholder 1',
    },
    {
      icon: <Puzzle className="size-8" />,
      title: 'placeholder 1',
    },
  ],
  [
    {
      icon: <Boxes className="size-8" />,
      title: 'placeholder 2',
    },
    {
      icon: <Languages className="size-8" />,
      title: 'placeholder 2',
    },
    {
      icon: <Puzzle className="size-8" />,
      title: 'placeholder 2',
    },
  ],
];

interface ExerciseSelectorProps {
  children: ReactNode;
  handleAddNewWindow: (type: WindowType) => void;
}

export default function ExerciseSelector({
  handleAddNewWindow,
  children,
}: ExerciseSelectorProps) {
  const [languageSkill, setLanguageSkill] = useState(0);
  const [exerciseStyle, setExerciseStyle] = useState(1);

  function handleSkillToggle(pressed: boolean, i: number) {
    if (pressed) {
      setLanguageSkill(i);
      setExerciseStyle(-1);
    }
  }

  function handleExerciseToggle(pressed: boolean, i: number) {
    if (pressed) {
      setExerciseStyle(i);
    } else {
      setExerciseStyle(-1);
    }
    console.log(exerciseStyle);
  }

  function handleConfirm() {
    if (exerciseStyle === 1) handleAddNewWindow('EXERCISE');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center rounded-md border py-8 lg:m-2">
          <section className="flex w-full flex-col items-center">
            <DialogTitle>
              <h2 className="text-l font-bold">Habilidade Linguística</h2>
            </DialogTitle>
            <div className="flex h-full w-full justify-between">
              <div className="m-2 flex flex-1 flex-col items-center">
                <Toggle
                  className="data-[state=on]:border-primary border-2 px-4 py-8 text-2xl"
                  onPressedChange={(pressed) => handleSkillToggle(pressed, 0)}
                  pressed={languageSkill === 0}
                >
                  <PencilLine className="size-8" />
                </Toggle>
                <p className="text-center text-sm">escrita</p>
              </div>
              <div className="m-2 flex flex-1 flex-col items-center">
                <Toggle
                  className="data-[state=on]:border-primary border-2 px-4 py-8 text-2xl"
                  disabled // Not Implemented
                  onPressedChange={(pressed) => handleSkillToggle(pressed, 1)}
                  pressed={languageSkill === 1}
                >
                  <AudioLines className="size-8" />
                </Toggle>
                <p className="text-center text-sm">audição</p>
              </div>
              <div className="m-2 flex flex-1 flex-col items-center">
                <Toggle
                  className="data-[state=on]:border-primary border-2 px-4 py-8 text-2xl"
                  disabled // Not Implemented
                  onPressedChange={(pressed) => handleSkillToggle(pressed, 2)}
                  pressed={languageSkill === 2}
                >
                  <Eye className="size-8" />
                </Toggle>
                <p className="text-center text-sm">leitura</p>
              </div>
            </div>
          </section>
          <section className="flex w-full flex-col items-center">
            <DialogTitle>
              <h2 className="text-l font-bold">Estilo de exercício</h2>
            </DialogTitle>
            <div className="flex h-full w-full justify-between">
              {exercisesStyles[languageSkill].map((exercise, i) => (
                <div
                  key={'' + languageSkill + i}
                  className="m-2 flex flex-1 flex-col items-center"
                >
                  <Toggle
                    className="data-[state=on]:border-primary border-2 px-4 py-8 text-2xl"
                    disabled={languageSkill !== 0 || i !== 1} // Not Implemented
                    onPressedChange={(pressed) =>
                      handleExerciseToggle(pressed, i)
                    }
                    pressed={exerciseStyle === i}
                  >
                    {exercise.icon}
                  </Toggle>
                  <p className="text-center text-sm">{exercise.title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="mt-4 flex w-full justify-end">
          <DialogClose asChild>
            <Button onClick={handleConfirm}>
              <p>Confirmar</p>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
