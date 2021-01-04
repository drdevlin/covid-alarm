import { configureStore } from '@reduxjs/toolkit';
import gaugeReducer from '../features/gauge/gaugeSlice';

export default configureStore({
  reducer: {
    gauge: gaugeReducer,
  },
});
