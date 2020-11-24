import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {accountAction} from '../store/actions/index';

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setResponse(res);
        dispatch(accountAction.setAcceptedOrders({acceptedOrders: res.data}));
      })
      .catch(setError)
      .finally(() =>
        dispatch(accountAction.setLoadingStatus({loading: false})),
      );
  }, []);
  return {response, error};
};
