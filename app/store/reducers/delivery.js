import {DELIVERY_DATA} from '../types';

const initialstate = {
  popularData: null,
  menuCategoryData: null,
  restaurantData: null,
  fastestNearData: null,
  dealData: null,
  cart: [],
  amount: 0,
  locationId: null,
  cardId: null,
  open: false
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case DELIVERY_DATA:
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};