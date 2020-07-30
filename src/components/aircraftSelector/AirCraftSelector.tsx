import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getAirCrafts } from "../../redux/actions/flights";

import s from "./AirCraftSelector.module.css";
import { Link } from "react-router-dom";

interface ReduxState {
  flights: {
    aircrafts: Array<{
      base: String;
      economySeats: Number;
      ident: String;
      type: String;
    }>;
  };
}

const mapStateToProps = (state: ReduxState) => {
  return {
    aircrafts: state.flights.aircrafts,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getAirCrafts: () => dispatch(getAirCrafts()),
});

interface Props {
  aircrafts: Array<{
    base: String;
    economySeats: Number;
    ident: String;
    type: String;
  }>;
  getAirCrafts: Function;
}

const AirCraftSelector = (props: Props) => {
  const { aircrafts, getAirCrafts } = props;
  useEffect(() => {
    return getAirCrafts();
  }, [getAirCrafts]);

  return (
    <div className={s.container}>
      <div className={s.siteTitle}>Flight Routes</div>
      <div className={s.airCraftSelector}>
        <h2>Select an aircraft</h2>
        <div>
          {aircrafts &&
            aircrafts.map((ac) => {
              return (
                <div key={`${ac.ident}`} className={s.aircraftCard}>
                  <Link to={`/make-a-route/${ac.ident}/${ac.base}`}>
                    <div>Aircraft ID: {ac.ident}</div>
                    <div>Base location: {ac.base}</div>
                    <div>Capacity: {ac.economySeats}</div>
                    <div>Type: {ac.type}</div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AirCraftSelector);
