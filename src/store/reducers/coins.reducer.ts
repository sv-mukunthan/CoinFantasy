import { COIN_LIST } from 'utils/types.utils';
import { storeAction } from 'interfaces/common.interface';

const initialState = {
  coinList: [],
};

const CoinReducer = (state = initialState, action: storeAction) => {
  switch (action.type) {
    case COIN_LIST:
      let newState = Object.assign({}, state, { coinList: action.payload });
      return newState;
    default:
      return state;
  }
};

export default CoinReducer;
