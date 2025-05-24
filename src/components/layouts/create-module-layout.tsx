import type { GrammarRule } from '@/@types/module';
import { Back } from '@/features/module/components/back';
import { BackModal } from '@/features/module/components/back-modal';
import { ConfirmModal } from '@/features/module/components/confirm-modal';
import { NavigationSections } from '@/features/module/components/navigation-sections';
import { useGetIntroduction } from '@/features/module/hooks/api/queries/use-get-introduction';
import { useGetModule } from '@/features/module/hooks/api/queries/use-get-module';
import { useBackModal } from '@/features/module/store/use-back-modal';
import { useModuleInfo } from '@/features/module/store/use-module-info';
import { useModuleWizard } from '@/features/module/store/use-module-wizard';
import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router';

const getTitle = (
  grammarRule: string | null,
  grammarMap: Map<string, string>,
) => {
  if (!grammarRule) return '';

  if (grammarRule === 'introduction') return 'Introdução';
  if (grammarRule === 'final-challenge') return 'Desafio Final';

  return grammarMap.get(grammarRule) || 'Tópico Desconhecido';
};

const areGrammarRulesEqual = (a: GrammarRule[], b: GrammarRule[]) => {
  if (a.length !== b.length) return false;
  return a.every(
    (rule, i) => rule.slug === b[i].slug && rule.title === b[i].title,
  );
};

export const CreateModuleLayout = () => {
  const { setGrammarRules, moduleId } = useModuleInfo();
  const { setSteps, currentStep, stepModes, setStepCompletion, setStepModes } =
    useModuleWizard();
  const { openBackModal } = useBackModal();
  const [stepsInitialized, setStepsInitialized] = useState(false);
  const [lastGrammarRules, setLastGrammarRules] = useState<GrammarRule[]>([]);

  const { data: response, error: moduleError } = useGetModule(moduleId);

  const grammarRules = useMemo(() => {
    return response?.data.grammarRules ?? [];
  }, [response]);

  const grammarTitleMap = useMemo(() => {
    return new Map(grammarRules.map((rule) => [rule.slug, rule.title]));
  }, [grammarRules]);

  useEffect(() => {
    const steps = [
      'introduction',
      ...grammarRules.map((rule) => rule.slug),
      'final-challenge',
      'revision',
    ];
    setSteps(steps);
    setStepsInitialized(true);
  }, [setSteps, grammarRules]);

  const { data: introductionData, error: introductionError } =
    useGetIntroduction(moduleId, stepsInitialized);

  useEffect(() => {
    if (introductionData?.data) {
      setStepCompletion('introduction', true);
      setStepModes('introduction', 'edit');
    }
  }, [setStepCompletion, introductionData, setStepModes]);

  useEffect(() => {
    if (!areGrammarRulesEqual(grammarRules, lastGrammarRules)) {
      setGrammarRules(grammarRules);
      setLastGrammarRules(grammarRules);
    }
  }, [setGrammarRules, grammarRules, lastGrammarRules]);

  const title = getTitle(currentStep ?? null, grammarTitleMap);

  const handleBack = () => {
    if (currentStep && stepModes[currentStep] === 'edit') {
      openBackModal(`/modules/${moduleId}`);
    } else {
      openBackModal('/modules/drafts');
    }
  };

  if (moduleError || introductionError) {
    return (
      <div className="py-20 text-center font-bold text-red-600">
        Erro ao carregar o módulo. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="relative flex w-full items-center justify-center py-10">
          <Back
            className="mdd:left-90 absolute top-4 left-4 md:top-auto md:left-40"
            onClick={handleBack}
          />
          <h2 className="px-15 text-center text-3xl font-bold tracking-widest">
            {title}
          </h2>
        </div>
        <main className="mx-auto mt-10 w-full max-w-300 px-4 pb-8">
          <Outlet />
        </main>
      </div>
      <NavigationSections />
      <ConfirmModal />
      <BackModal />
    </>
  );
};
