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

interface ExerciseSelectorProps {
  exercisesStyles?: [
    {
      icon: React.ElementType;
      title: string;
    },
    {
      icon: React.ElementType;
      title: string;
    },
    {
      icon: React.ElementType;
      title: string;
    },
  ];
}

const dummy = [
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

export default function ExerciseSelector({
  exercisesStyles,
}: ExerciseSelectorProps) {
  return (
    <div className="flex flex-col items-center border p-8">
      <section className="flex w-full flex-col items-center">
        <h2 className="text-xl font-bold">Habilidade Linguística</h2>
        <div className="flex h-full w-full justify-between">
          <div className="m-4 flex flex-1 flex-col items-center">
            <Toggle className="border px-4 py-8 text-2xl">
              <PencilLine className="size-8" />
            </Toggle>
            <p className="text-center text-sm">escrita</p>
          </div>
          <div className="m-4 flex flex-1 flex-col items-center">
            <Toggle className="border px-4 py-8 text-2xl">
              <AudioLines className="size-8" />
            </Toggle>
            <p className="text-center text-sm">audição</p>
          </div>
          <div className="m-4 flex flex-1 flex-col items-center">
            <Toggle className="border px-4 py-8 text-2xl">
              <Eye className="size-8" />
            </Toggle>
            <p className="text-center text-sm">leitura</p>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center">
        <h2 className="text-xl font-bold">Estilo de exercício</h2>
        <div className="flex h-full w-full justify-between">
          {dummy.map((exercise) => (
            <div
              key={exercise.title}
              className="m-4 flex flex-1 flex-col items-center"
            >
              <Toggle className="border px-4 py-8 text-2xl">
                {React.cloneElement(exercise.icon, { className: 'size-8' })}
              </Toggle>
              <p className="text-center text-sm">{exercise.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
