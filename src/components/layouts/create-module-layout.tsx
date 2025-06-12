import { Back } from '@/features/module/components/back';
import { NavigationSections } from '@/features/module/components/navigation-sections';
import { useModuleInfo } from '@/features/module/store/use-module-info';
import { useModuleWizard } from '@/features/module/store/use-module-wizard';
import { Link, Outlet, useNavigate } from 'react-router';

export const CreateModuleLayout = () => {
  const { currentStep } = useModuleWizard();
  const { grammarRulesModules } = useModuleInfo();
  const navigate = useNavigate();

  const getTitle = (currentStep: string) => {
    if (currentStep === 'introduction') return 'Introdução';
    if (currentStep === 'final-challenge') return 'Desafio Final';
    return grammarRulesModules.find((grm) => grm.id === currentStep)
      ?.grammarRule.title;
  };

  if (!currentStep) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl text-zinc-900">Erro ao carregar o módulo.</h1>
        <span className="hover:text-primary transation cursor-pointer text-base text-zinc-400 duration-300 hover:underline">
          <Link to={'/modules/drafts'}>Voltar para os rascunhos</Link>
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="relative flex w-full items-center justify-center py-10">
          <Back
            className="mdd:left-90 absolute top-4 left-4 md:top-auto md:left-40"
            onClick={() => navigate('/modules/drafts')}
          />
          <h2 className="px-15 text-center text-3xl font-bold tracking-widest">
            {getTitle(currentStep)}
          </h2>
        </div>
        <div className="mx-auto mt-10 flex w-full max-w-300 flex-col px-4 pb-8">
          <Outlet />
        </div>
      </div>
      <NavigationSections />
    </>
  );
};
