import {DELIVERY_DATA} from '../types';


const setDeliveryData = payload => ({
  type: DELIVERY_DATA,
  payload,
});


export default {
  setDeliveryData,
};