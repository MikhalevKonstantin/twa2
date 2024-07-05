import { configureStore } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from '@core/store/root/slice.ts';
import { swapReducer } from '@core/store/swap/slice.ts';

const store = configureStore({
  reducer: {
    root: rootReducer,
    swap: swapReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
