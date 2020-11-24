import {DELIVERY_DATA, PICK_UP, CURRENT_PICK_UP} from '../types';

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

export default {
  setDeliveryData,
  setDeliveryNavigation,
  setCurrentPickupInfo,
};
