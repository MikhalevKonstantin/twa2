import { createSlice } from '@reduxjs/toolkit';
import { rootStateType } from '@core/store/root/types.ts';
import rootThunks from '@core/store/root/thunks.ts';

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    balance: 5,
    isOnboardingComplete: false,
    isTutorialComplete: false,
    isTutorialModalOpened: false,
    user: null,
    requestStatus: {
      getUser: null,
      postUser: null,
    },
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
  extraReducers(builder) {
    // getUser
    builder.addCase(rootThunks.getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.requestStatus.getUser = 'success';
    });
    builder.addCase(rootThunks.getUser.pending, (state) => {
      state.requestStatus.getUser = 'loading';
    });
    builder.addCase(rootThunks.getUser.rejected, (state) => {
      state.requestStatus.getUser = 'error';
    });

    // postUser
    builder.addCase(rootThunks.postUser.fulfilled, (state) => {
      state.requestStatus.postUser = 'success';
    });
    builder.addCase(rootThunks.postUser.pending, (state) => {
      state.requestStatus.postUser = 'loading';
    });
    builder.addCase(rootThunks.postUser.rejected, (state) => {
      state.requestStatus.postUser = 'error';
    });
  },
});

export const { reducer: rootReducer, actions: rootActions } = rootSlice;
