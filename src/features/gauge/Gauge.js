import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectAllReports,
  selectFetchStatus,
  selectFetchError,
  fetchReports,
} from '../gauge/gaugeSlice';

import { averageCaseOverTestPercentage } from '../../utils/calculate';

export const Gauge = () => {
  const dispatch = useDispatch();
  const reports = useSelector(selectAllReports);
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
      <section className='gauge-content'>
        <p>Today's Average: {averageCaseOverTestPercentage(reports)}</p>
      </section>
    );
  } else if (fetchStatus === 'failed') {
    content = <div>{fetchError}</div>;
  }

  return (
    <article className='Gauge'>
      {content}
    </article>
  );
}