import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {accountAction, deliveryAction} from '../store/actions';
import {makeNetworkCalls} from './index';

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const {currentIndex} = useSelector(({delivery}) => delivery);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    makeNetworkCalls({
      url,
      ...options,
    })
      .then((res) => {
        const {data} = res.data;
        setResponse(data);
        dispatch(accountAction.setAcceptedOrders({acceptedOrders: data}));
        if (currentIndex) {
          dispatch(
            deliveryAction.setCurrentPickupInfo({
              currentEntry: data[currentIndex],
            }),
          );
        }
      })
      .catch(setError)
      .finally(() => {
        dispatch(accountAction.setLoadingStatus({loading: false}));
      });
  }, []);
  return {response, error};
};
