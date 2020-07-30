import { GET_AIRCRAFT, GET_FLIGHTS } from "../actions/types";

const INIT_STATE = {
  aircrafts: undefined,
  flights: undefined,
  selectedAircraft: undefined,
};

interface State {
  aircrafts?: Array<Object>;
  flights?: Array<Object>;
  selectedAircraft?: Object;
}

interface Actions {
  type: String;
  payload: Array<Object>;
  selectedAircraft: Object;
}

export default (state: State = INIT_STATE, action: Actions) => {
  switch (action.type) {
    case GET_AIRCRAFT:
      return {
        ...state,
        aircrafts: action.payload,
      };
    case GET_FLIGHTS:
      return {
        ...state,
        flights: action.payload,
      };
    default:
      return state;
  }
};
