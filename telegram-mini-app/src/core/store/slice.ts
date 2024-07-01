import { createSlice } from '@reduxjs/toolkit';
import { rootStateType } from '@core/store/types.ts';

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    balance: 5,
    isOnboardingComplete: false,
    isTutorialComplete: false,
  } as rootStateType,
  reducers: {
    changeBalance(state, { payload }) {
      state.balance += payload;
    },
    completeOnboarding(state) {
      state.isOnboardingComplete = true;
    },
    completeTutorial(state) {
      state.isTutorialComplete = true;
    },
  },
});

export const { reducer: rootReducer, actions: rootActions } = rootSlice;
