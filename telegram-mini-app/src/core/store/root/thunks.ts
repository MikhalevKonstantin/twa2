import createTypedThunk from '@core/storeConfig/createTypedThunk.ts';
import rootApi from '@core/store/root/api.ts';
import { IPostUserRequest, IUserData } from '@core/store/root/types.ts';

const rootThunks = {
  getUser: createTypedThunk<number, IUserData>('root/getUser', rootApi.getUser),
  postUser: createTypedThunk<IPostUserRequest, string>(
    'root/postUser',
    rootApi.postUser
  ),
};

export default rootThunks;
