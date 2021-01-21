import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { startDate } from '../../utils/dates';

export const fetchReports = createAsyncThunk('gauge/fetchReports', async (daysAgo) => {
  const from = startDate(daysAgo);
  let data;
  try {
    const response = await fetch(`https://morning-caverns-71289.herokuapp.com?url=https://api.covid19tracker.ca/reports/province/ON&after=${from}`);
    data = await response.json();
    if (response.ok) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
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