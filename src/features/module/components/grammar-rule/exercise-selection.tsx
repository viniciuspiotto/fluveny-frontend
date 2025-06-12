import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import {
  AudioLines,
  Boxes,
  Eye,
  Languages,
  PencilLine,
  Puzzle,
} from 'lucide-react';
import React from 'react';

const exercisesStyles = [
  {
    icon: <Boxes />,
    title: 'construção de frase',
  },
  {
    icon: <Languages />,
    title: 'tradução de frase',
  },
  {
    icon: <Puzzle />,
    title: 'preenchimento de frase',
  },
];

export default function ExerciseSelector() {
  // Aqui estou cometeno um crime com mt-[-2rem] mas fds
  return (
    <>
      <div className="mt-[-2rem] flex flex-col items-center border py-8">
        <section className="flex w-full flex-col items-center">
          <h2 className="text-l font-bold">Habilidade Linguística</h2>
          <div className="flex h-full w-full justify-between">
            <div className="m-2 flex flex-1 flex-col items-center">
              <Toggle className="data-[state=on]:border-primary border-2 px-4 py-8 text-2xl">
                <PencilLine className="size-8" />
              </Toggle>
              <p className="text-center text-sm">escrita</p>
            </div>
            <div className="m-2 flex flex-1 flex-col items-center">
              {' '}
              <Toggle
                className="data-[state=on]:border-primary border-2 px-4 py-8 text-2xl"
                disabled
              >
                <AudioLines className="size-8" />
              </Toggle>
              <p className="text-center text-sm">audição</p>
            </div>
            <div className="m-2 flex flex-1 flex-col items-center">
              <Toggle
                className="data-[state=on]:border-primary border-2 px-4 py-8 text-2xl"
                disabled
              >
                <Eye className="size-8" />
              </Toggle>
              <p className="text-center text-sm">leitura</p>
            </div>
          </div>
        </section>

        <section className="flex w-full flex-col items-center">
          <h2 className="text-l font-bold">Estilo de exercício</h2>
          <div className="flex h-full w-full justify-between">
            {exercisesStyles.map((exercise) => (
              <div
                key={exercise.title}
                className="m-2 flex flex-1 flex-col items-center"
              >
                <Toggle className="data-[state=on]:border-primary border-2 px-4 py-8 text-2xl">
                  {React.cloneElement(exercise.icon, { className: 'size-8' })}
                </Toggle>
                <p className="text-center text-sm">{exercise.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="mt-8 flex w-full justify-end">
        <Button>
          <p>Confirmar</p>
        </Button>
      </div>
    </>
  );
}
