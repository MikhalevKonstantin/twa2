export type initialStateType = {
  balance: {
    YCoin: number;
    BCoin: number;
  };
  foodBalance: {
    sprat: number;
    bone: number;
    jar: number;
  };
  swapStatus: swapStateType;
};

export type swapStateType = 'idle' | 'success' | 'error';

export type swapPayloadType = {
  isToFood: boolean;
  amount: number;
  foodType: keyof initialStateType['foodBalance'];
};
