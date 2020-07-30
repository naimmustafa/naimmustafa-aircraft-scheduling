import React from "react";
import s from "./FlightCard.module.css";
import arrow from "./arrow.png";

interface Props {
  flight: {
    arrivaltime: number;
    departuretime: number;
    destination: String;
    id: String;
    origin: String;
    readable_arrival: String;
    readable_departure: String;
  };
}

const FlightCard = (props: Props) => {
  const { flight } = props;
  return (
    <>
      <div>Flight: {flight.id}</div>
      <div className={s.flightInfo}>
        <div className={s.flightOrigin}>
          <div>{flight.origin}</div>
          <div>{flight.readable_departure}</div>
        </div>
        <div className={s.arrowContainer}>
          <img className={s.arrow} src={arrow} alt="arrow" />
        </div>
        <div className={s.flightDestination}>
          <div>{flight.destination}</div>
          <div>{flight.readable_arrival}</div>
        </div>
      </div>
    </>
  );
};

export default FlightCard;
