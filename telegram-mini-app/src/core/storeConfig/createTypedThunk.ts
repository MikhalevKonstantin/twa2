import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAxiosResponse } from './types.ts';

const createTypedThunk = <ReqType, RespType>(
  name: string,
  request: (body: ReqType) => Promise<IAxiosResponse<RespType>>
) => {
  return createAsyncThunk(name, async (body: ReqType, { rejectWithValue }) => {
    const { error, data } = await request(body);

    if (error) {
      console.log(error);
      return rejectWithValue(error);
    }

    return data;
  });
};

export default createTypedThunk;
