import { createSlice } from '@reduxjs/toolkit';
import { rootStateType } from '@core/store/root/types.ts';

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    balance: 5,
    isOnboardingComplete: false,
    isTutorialComplete: false,
    isTutorialModalOpened: false,
  } as rootStateType,
  reducers: {
    setRoot(_, { payload }) {
      return payload;
    },
    changeBalance(state, { payload }) {
      state.balance += payload;
    },
    completeOnboarding(state) {
      state.isOnboardingComplete = true;
    },
    completeTutorial(state) {
      state.isTutorialComplete = true;
    },
    openTutorialModal(state) {
      state.isTutorialModalOpened = true;
    },
  },
});

export const { reducer: rootReducer, actions: rootActions } = rootSlice;
