import {
  DELIVERY_DATA,
  PICK_UP,
  CURRENT_PICK_UP,
  ENROUTE,
  PAYMENT_RECIEVED,
  INDEX_OF_ENTRY,
  RATE_USER,
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

const setIndexOfEntry = (payload) => ({
  type: INDEX_OF_ENTRY,
  payload,
});

//set details of rating before current entry is set to null
const setRatingDetails = (payload) => ({
  type: RATE_USER,
  payload,
});

export default {
  setDeliveryData,
  setDeliveryNavigation,
  setCurrentPickupInfo,
  setEnrouteToPickUp,
  setPaymentRecieved,
  setIndexOfEntry,
  setRatingDetails,
};
