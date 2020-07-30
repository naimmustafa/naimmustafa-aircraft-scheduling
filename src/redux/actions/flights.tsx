import axios from "axios";
import { Dispatch } from "redux";
import { GET_AIRCRAFT, GET_FLIGHTS } from "./types";

export const getAirCrafts = () => {
  return (dispatch: Dispatch) => {
    axios
      .get("https://infinite-dawn-93085.herokuapp.com/aircrafts")
      .then((res) => {
        dispatch({
          type: GET_AIRCRAFT,
          payload: res.data.data,
        });
      });
  };
};

export const getFlights = (page: Number) => {
  const skip = Number(page) * 25;
  return (dispatch: Dispatch) => {
    // NOTE: limit query is not working. (defaulted to 25)
    axios
      .get(`https://infinite-dawn-93085.herokuapp.com/flights?offset=${skip}`)
      .then((res) => {
        dispatch({
          type: GET_FLIGHTS,
          payload: res.data.data,
        });
      });
  };
};
