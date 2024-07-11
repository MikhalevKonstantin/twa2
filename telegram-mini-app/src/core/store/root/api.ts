import endpoints from '@core/storeConfig/endpoints.ts';
import { wrappedAxiosRequest } from '@core/storeConfig/axios.ts';
import { IPostUserRequest, IUserData } from '@core/store/root/types.ts';

const rootApi = {
  getUser(tg_id: number) {
    return wrappedAxiosRequest<null, IUserData>({
      method: 'get',
      url: endpoints.user.replace('{player_id}', tg_id.toString()),
    });
  },
  postUser({ tg_id, body }: IPostUserRequest) {
    return wrappedAxiosRequest<IUserData, string>({
      method: 'post',
      url: endpoints.user.replace('{player_id}', tg_id.toString()),
      data: body,
    });
  },
};

export default rootApi;
