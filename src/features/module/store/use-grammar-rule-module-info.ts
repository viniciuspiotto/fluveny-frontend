import type { WindowState, WindowType } from '@/@types/module';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type GrammarRuleModuleInfo = {
  grammarRuleModuleId: string;
  windows: WindowState[];
};

type GrammarRuleModuleInfoStoreState = {
  grammarRuleModuleInfos: GrammarRuleModuleInfo[];
  setGrammarRuleModuleInfos: (
    grammarRuleModuleInfos: GrammarRuleModuleInfo[],
  ) => void;
  setWindowsForGrammarRuleModuleInfo: (
    grammarRuleModuleId: string,
    windows: WindowState[],
  ) => void;
  addWindowToGrammarRuleModuleInfo: (
    grammarRuleModuleId: string,
    afterPosition: number,
    type: WindowType,
  ) => void;
  setCurrentWindowInGrammarRuleModuleInfo: (
    grammarRuleModuleId: string,
    positionId: number,
  ) => void;
};

export const useGrammarRuleModuleInfo =
  create<GrammarRuleModuleInfoStoreState>()(
    persist(
      (set) => ({
        grammarRuleModuleInfos: [],

        setGrammarRuleModuleInfos: (grammarRuleModuleInfos) =>
          set({ grammarRuleModuleInfos }),

        setWindowsForGrammarRuleModuleInfo: (grammarRuleModuleId, windows) =>
          set((state) => {
            const moduleExists = state.grammarRuleModuleInfos.some(
              (info) => info.grammarRuleModuleId === grammarRuleModuleId,
            );

            if (moduleExists) {
              return {
                grammarRuleModuleInfos: state.grammarRuleModuleInfos.map(
                  (info) =>
                    info.grammarRuleModuleId === grammarRuleModuleId
                      ? { ...info, windows }
                      : info,
                ),
              };
            } else {
              const newModule: GrammarRuleModuleInfo = {
                grammarRuleModuleId,
                windows,
              };
              return {
                grammarRuleModuleInfos: [
                  ...state.grammarRuleModuleInfos,
                  newModule,
                ],
              };
            }
          }),

        addWindowToGrammarRuleModuleInfo: (
          grammarRuleModuleId,
          afterPosition,
          type,
        ) =>
          set((state) => ({
            grammarRuleModuleInfos: state.grammarRuleModuleInfos.map((info) => {
              if (info.grammarRuleModuleId !== grammarRuleModuleId) {
                return info;
              }

              const newWindow: WindowState = {
                id: crypto.randomUUID(),
                position: 0,
                mode: 'CREATE',
                isCurrent: true,
                type: type,
              };

              const updatedWindows = [
                ...info.windows.slice(0, afterPosition),
                newWindow,
                ...info.windows.slice(afterPosition),
              ].map((window, index) => ({
                ...window,
                position: index + 1,
                isCurrent: window.id === newWindow.id,
              }));

              return { ...info, windows: updatedWindows };
            }),
          })),

        setCurrentWindowInGrammarRuleModuleInfo: (
          grammarRuleModuleId,
          positionId,
        ) =>
          set((state) => ({
            grammarRuleModuleInfos: state.grammarRuleModuleInfos.map((info) =>
              info.grammarRuleModuleId === grammarRuleModuleId
                ? {
                    ...info,
                    windows: info.windows.map((w) => ({
                      ...w,
                      isCurrent: w.position === positionId,
                    })),
                  }
                : info,
            ),
          })),
      }),
      {
        name: 'grammar-rule-module-info-storage',
      },
    ),
  );
