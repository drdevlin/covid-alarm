import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectAllDays,
  selectFetchStatus,
  selectFetchError,
  fetchDay,
} from '../gauge/gaugeSlice';

export const Gauge = () => {
  const dispatch = useDispatch();
  const days = useSelector(selectAllDays);
  const fetchStatus = useSelector(selectFetchStatus);
  const fetchError = useSelector(selectFetchError);

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchDay());
    }
  }, [dispatch, fetchStatus]);

  let content;
  if (fetchStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (fetchStatus === 'succeeded') {
    content = (
      <section className='gauge-content'>
        {days.map(day => <p>{JSON.stringify(day)}</p>)}
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