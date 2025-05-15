import { StateCreator } from 'zustand';
import safeParseJSON from 'helpers/safeParseJSON';

export type SyncOptions = {
  name: string;
};

export const sync =
  <T extends object>(
    stateCreator: StateCreator<T>,
    options = {} as SyncOptions,
  ): StateCreator<T> =>
  (set, get, api) => {
    const { name } = options;

    window.addEventListener('storage', (e) => {
      const isStoreUpdate = e.key === name;
      if (!isStoreUpdate) return;

      const currentState = get() as Record<string, unknown>;
      const newState = safeParseJSON(e.newValue as string)?.state;

      const hasShallowUpdate = Object.keys(newState).some((key) => {
        return newState[key] !== currentState[key];
      });

      if (!hasShallowUpdate) return;
      set(newState);
    });

    return stateCreator(set, get, api);
  };
