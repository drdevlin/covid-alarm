import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../utils/client';
import { startDate } from '../../utils/dates';

export const fetchReports = createAsyncThunk('gauge/fetchReports', async (daysAgo) => {
  const from = startDate(daysAgo);
  const response = await client.get(`https://api.covid19tracker.ca/reports/province/ON?after=${from}`);
  return response.data; // Returns just the reports array
});

const initialState = {
  reports: [],
  status: 'idle',
  error: null
};

export const gaugeSlice = createSlice({
  name: 'gauge',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchReports.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchReports.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.reports = action.payload;
    },
    [fetchReports.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  },
});

export default gaugeSlice.reducer;

export const selectAllReports = state => state.gauge.reports;
export const selectFetchStatus = state => state.gauge.status;
export const selectFetchError = state => state.gauge.error;