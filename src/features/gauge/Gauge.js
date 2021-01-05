import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectAllReports,
  selectFetchStatus,
  selectFetchError,
  fetchReports,
} from '../gauge/gaugeSlice';

import { rollingAverage, needlePosition } from '../../utils/calculate';

import './Gauge.css';

export const Gauge = () => {
  const dispatch = useDispatch();
  const reports = useSelector(selectAllReports);
  const rolling = rollingAverage(reports, 0);
  const needle = needlePosition(rolling[0]).toString();
  const fetchStatus = useSelector(selectFetchStatus);
  const fetchError = useSelector(selectFetchError);

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchReports(13));
    }
  }, [dispatch, fetchStatus]);

  let content;
  if (fetchStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (fetchStatus === 'succeeded') {
    content = (
      <div className='gauge-content'>
        <img className='gauge-image' src='/gauge.svg' alt='' />
        <img className='needle-image' src='/needle.svg' alt='' style={{ transform: `rotate(${needle}deg)` }} />
      </div>
    );
  } else if (fetchStatus === 'failed') {
    content = <div>{fetchError}</div>;
  }

  return (
    <div className='Gauge'>
      {content}
    </div>
  );
}