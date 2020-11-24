import {DELIVERY_DATA, PICK_UP, CURRENT_PICK_UP, ENROUTE} from '../types';

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

export default {
  setDeliveryData,
  setDeliveryNavigation,
  setCurrentPickupInfo,
  setEnrouteToPickUp,
};
