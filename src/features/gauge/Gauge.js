import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectAllDays,
  selectFetchStatus,
  selectFetchError,
  fetchPastSevenDays,
} from '../gauge/gaugeSlice';

import { averageCaseOverTestPercentage } from '../../utils/calculate';

export const Gauge = () => {
  const dispatch = useDispatch();
  const days = useSelector(selectAllDays);
  const fetchStatus = useSelector(selectFetchStatus);
  const fetchError = useSelector(selectFetchError);

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchPastSevenDays());
    }
  }, [dispatch, fetchStatus]);

  let content;
  if (fetchStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (fetchStatus === 'succeeded') {
    content = (
      <section className='gauge-content'>
        <p>{averageCaseOverTestPercentage(days)}</p>
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