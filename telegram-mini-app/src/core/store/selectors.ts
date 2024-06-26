import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@core/storeConfig/types.ts';

const selectRoot = (store: RootState) => store.root;

export const selectBalance = createSelector(
  selectRoot,
  (state) => state.balance
);

export const selectIsOnboardingComplete = createSelector(
  selectRoot,
  (state) => state.isOnboardingComplete
);

export const selectIsTutorialComplete = createSelector(
  selectRoot,
  (state) => state.isTutorialComplete
);
