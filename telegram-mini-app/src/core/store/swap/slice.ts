import { createSlice } from '@reduxjs/toolkit';
import { swapPayloadType } from '@core/store/swap/types.ts';

const swapSlice = createSlice({
  name: 'swap',
  initialState: {
    balance: {
      YCoin: 0,
      BCoin: 0,
    },
    foodBalance: {
      sprat: 0,
      bone: 0,
      jar: 0,
    },
    swapStatus: 'idle',
  },
  reducers: {
    setSwap(_, { payload }) {
      return payload;
    },
    coinFoodSwap(state, { payload }: { payload: swapPayloadType }) {
      if (payload.isToFood) {
        state.balance.YCoin -= payload.amount;
        state.foodBalance[payload.foodType] += payload.amount;
      } else {
        state.balance.YCoin += payload.amount;
        state.foodBalance[payload.foodType] -= payload.amount;
      }
    },
    coinCoinSwap(state, { payload }: { payload: swapPayloadType }) {
      if (payload.isToFood) {
        state.balance.YCoin -= payload.amount;
        state.balance.BCoin += payload.amount;
      } else {
        state.balance.YCoin += payload.amount;
        state.balance.BCoin -= payload.amount;
      }
    },
  },
});

export const { reducer: swapReducer, actions: swapActions } = swapSlice;
