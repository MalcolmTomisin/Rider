import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {accountAction, deliveryAction} from '../store/actions';

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const {currentIndex} = useSelector(({delivery}) => delivery);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accountAction.setLoadingStatus({loading: true}));
    fetch(url, options)
      .then((res) => {
        //console.log('test', res.status);
        return res.json();
      })
      .then((res) => {
        //console.log('test', res);
        setResponse(res);
        dispatch(accountAction.setAcceptedOrders({acceptedOrders: res.data}));
        if (currentIndex) {
          dispatch(
            deliveryAction.setCurrentPickupInfo({
              currentEntry: res.data[currentIndex],
            }),
          );
        }
      })
      .catch(setError)
      .finally(() =>
        dispatch(accountAction.setLoadingStatus({loading: false})),
      );
  }, []);
  return {response, error};
};
