import type { GrammarRule } from '@/@types/module';
import { Back } from '@/features/module/components/back';
import { ConfirmNavigationModal } from '@/features/module/components/confirm-navigation-modal';
import { NavigationSections } from '@/features/module/components/navigation-sections';
import { useGetModule } from '@/features/module/hooks/use-get-module';
import { useModuleInfo } from '@/features/module/store/use-module-info';
import { useModuleWizard } from '@/features/module/store/use-module-wizard';
import { useNavigationModal } from '@/features/module/store/use-navigation-modal';
import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router';

const getTitle = (grammarRule: string | null, grammarRules: GrammarRule[]) => {
  if (!grammarRule) return '';

  if (grammarRule === 'introduction') return 'Introdução';
  if (grammarRule === 'final-challenge') return 'Desafio Final';

  const match = grammarRules.find((t) => t.slug === grammarRule);
  return match ? match.title : 'Tópico Desconhecido';
};

export const ModuleLayout = () => {
  const { openModal } = useNavigationModal();
  const { setGrammarRules, moduleId } = useModuleInfo();

  const { setSteps, currentStep } = useModuleWizard();

  const { data: response } = useGetModule(moduleId);

  const grammarRules = useMemo(() => {
    return response?.data.grammarRules ?? [];
  }, [response]);

  useEffect(() => {
    setSteps([
      'introduction',
      ...grammarRules.map((rule) => rule.slug),
      'final-challenge',
      'revision',
    ]);
  }, [setSteps, grammarRules]);

  useEffect(() => {
    setGrammarRules(grammarRules);
  }, [setGrammarRules, grammarRules]);

  const title = getTitle(currentStep, grammarRules);

  const handleBack = () => {
    const redirectTo = currentStep === 'introduction' ? '/modules' : -1;
    openModal(redirectTo);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="relative flex w-full items-center justify-center py-10">
          <Back
            className="absolute left-3 md:left-40 lg:left-90"
            onClick={handleBack}
          />
          <h2 className="text-3xl font-bold tracking-widest">{title}</h2>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
      <NavigationSections />
      <ConfirmNavigationModal />
    </>
  );
};
