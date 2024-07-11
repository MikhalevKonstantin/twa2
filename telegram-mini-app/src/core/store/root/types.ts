import { requestStatusType } from '@core/storeConfig/types.ts';

export type rootStateType = {
  balance: number;
  isOnboardingComplete: boolean;
  isTutorialComplete: boolean;
  isTutorialModalOpened: boolean;
  user: IUserData | null;
  requestStatus: {
    getUser: requestStatusType;
    postUser: requestStatusType;
  };
};

export interface IUserData {
  first_entry_dt: string;
  last_entry_dt: string;
  tg_account: {
    uid: number;
    is_premium: boolean;
    default_lang: string;
  };
  user: {
    onboarding_is_done: boolean;
    balance: number;
    items: [
      {
        uid: number;
      },
    ];
  };
}

export interface IPostUserRequest {
  tg_id: number;
  body: IUserData;
}
