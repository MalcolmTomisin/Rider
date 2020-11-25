import {
  DELIVERY_DATA,
  PICK_UP,
  CURRENT_PICK_UP,
  ENROUTE,
  PAYMENT_RECIEVED,
} from '../types';

const setDeliveryData = (payload) => ({
  type: DELIVERY_DATA,
  payload,
});

const setDeliveryNavigation = (payload) => ({
  type: PICK_UP,
  payload,
});

const setCurrentPickupInfo = (payload) => ({
  type: CURRENT_PICK_UP,
  payload,
});

const setEnrouteToPickUp = (payload) => ({
  type: ENROUTE,
  payload,
});

const setPaymentRecieved = (payload) => ({
  type: PAYMENT_RECIEVED,
  payload,
});

export default {
  setDeliveryData,
  setDeliveryNavigation,
  setCurrentPickupInfo,
  setEnrouteToPickUp,
  setPaymentRecieved,
};
