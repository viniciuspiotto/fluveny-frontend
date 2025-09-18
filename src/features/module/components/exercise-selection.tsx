import type { LinguisticAbility, WindowType } from '@/@types/module';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { SkillToggle } from './exercise-toggle';

const linguisticSkills = [
  {
    id: 'WRITE',
    label: 'Escrita',
    icon: <PencilLine className="size-8" />,
  },
  {
    id: 'LISTEN',
    label: 'Audição',
    icon: <AudioLines className="size-8" />,
  },
  {
    id: 'READ',
    label: 'Leitura',
    icon: <Eye className="size-8" />,
  },
] as const;

const exercisesBySkill: Record<
  LinguisticAbility,
  { icon: ReactNode; title: string }[]
> = {
  WRITE: [
    { icon: <Boxes className="size-8" />, title: 'Construção de frase' },
    { icon: <Languages className="size-8" />, title: 'Tradução de frase' },
    { icon: <Puzzle className="size-8" />, title: 'Preenchimento de frase' },
  ],
  READ: [
    { icon: <Boxes className="size-8" />, title: 'Interpretação' },
    { icon: <Languages className="size-8" />, title: 'Encontrar sinônimos' },
    { icon: <Puzzle className="size-8" />, title: 'Completar o parágrafo' },
  ],
  LISTEN: [
    { icon: <Boxes className="size-8" />, title: 'Ditado' },
    { icon: <Languages className="size-8" />, title: 'Transcrição' },
    { icon: <Puzzle className="size-8" />, title: 'Identificar palavra' },
  ],
};

interface ExerciseSelectorProps {
  children: ReactNode;
  handleAddNewWindow: (type: WindowType) => void;
}

export default function ExerciseSelector({
  handleAddNewWindow,
  children,
}: ExerciseSelectorProps) {
  const [languageSkill, setLanguageSkill] = useState<
    LinguisticAbility | undefined
  >();
  const [exerciseStyle, setExerciseStyle] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function handleSkillToggle(ability: LinguisticAbility) {
    setLanguageSkill((current) => (current === ability ? undefined : ability));
    setExerciseStyle(0);
  }

  function handleExerciseToggle(index: number) {
    setExerciseStyle(index);
  }

  function handleConfirm() {
    if (languageSkill) handleAddNewWindow('EXERCISE');
  }

  function resetSelection() {
    setLanguageSkill(undefined);
    setExerciseStyle(0);
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      resetSelection();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-description="selecionar o tipo do exercício">
        <div className="flex flex-col items-center gap-4 rounded-md border-0 pt-8 lg:m-2">
          <section className="flex w-full flex-col items-center">
            <DialogTitle className="mb-2 text-lg font-bold">
              Habilidade Linguística
            </DialogTitle>
            <div className="flex h-full w-full justify-around">
              {linguisticSkills.map((skill) => (
                <SkillToggle
                  key={skill.id}
                  onClick={() =>
                    handleSkillToggle(skill.id as LinguisticAbility)
                  }
                  isPressed={languageSkill === skill.id}
                  icon={skill.icon}
                  label={skill.label}
                />
              ))}
            </div>
          </section>

          {languageSkill && (
            <section className="flex w-full flex-col items-center">
              <DialogTitle>
                <h2 className="mb-2 text-lg font-bold">Estilo de Exercício</h2>
              </DialogTitle>
              <div className="flex h-full w-full justify-around">
                {exercisesBySkill[languageSkill].map((exercise, i) => (
                  <SkillToggle
                    key={`${languageSkill}-${i}`}
                    onClick={() => handleExerciseToggle(i)}
                    isPressed={exerciseStyle === i}
                    icon={exercise.icon}
                    label={exercise.title}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-4 flex w-full justify-end">
          <DialogClose asChild>
            <Button
              className="text-md cursor-pointer"
              onClick={handleConfirm}
              disabled={!languageSkill}
            >
              Confirmar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
