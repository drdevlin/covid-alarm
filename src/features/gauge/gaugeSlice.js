import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../utils/client';

export const fetchDay = createAsyncThunk('gauge/fetchDay', async () => {
  const response = await client.get('https://api.covid19tracker.ca/reports/province/ON?after=2020-12-29');
  return response.data; // Returns just the reports array
});

const initialState = {
  days: [],
  status: 'idle',
  error: null
};

export const gaugeSlice = createSlice({
  name: 'gauge',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDay.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchDay.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.days = action.payload;
    },
    [fetchDay.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  },
});

export default gaugeSlice.reducer;

export const selectAllDays = state => state.gauge.days;
export const selectFetchStatus = state => state.gauge.status;
export const selectFetchError = state => state.gauge.error;