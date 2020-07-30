import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getFlights } from "../../redux/actions/flights";

import s from "./RouteMaker.module.css";
import { Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProgressBar from "./components/ProgressBar";
import FlightCard from "./components/FlightCard";

// TODO: create interface and enum files to handle types outside of the component
interface ReduxState {
  flights: {
    flights: Array<{
      arrivaltime: number;
      departuretime: number;
      destination: String;
      id: String;
      origin: String;
      readable_arrival: String;
      readable_departure: String;
    }>;
  };
}

const mapStateToProps = (state: ReduxState) => {
  return {
    flights: state.flights.flights,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getFlights: (page: number) => dispatch(getFlights(page)),
});

interface Props {
  match: {
    params: {
      aircraft: String;
      base: String;
    };
  };
  flights: Array<{
    arrivaltime: number;
    departuretime: number;
    destination: String;
    id: String;
    origin: String;
    readable_arrival: String;
    readable_departure: String;
  }>;
  getFlights: Function;
}

const RouteMaker = (props: Props) => {
  const { getFlights, flights } = props;
  const { aircraft, base } = props.match.params;
  useEffect(() => {
    return getFlights(42);
  }, [getFlights]);
  // keeps track of the aircrafts' last location
  const [flightOrigin, updateOrigin] = useState(base);
  // since the limit does not work in the endpoint. I have initiated flight list from 42nd page
  // to make it easy to find available flight
  const [page, updatePage] = useState(42);
  const [route, updateRoute] = useState(props.flights || [{ arrivaltime: 0 }]);

  // create an array for occupied fligh hours
  let flyingTimes: Array<number> = [];

  route.map((rt) => {
    const res = {
      // flight time
      distance: Math.ceil(
        (rt.arrivaltime + 1200) / 3600 - rt.departuretime / 3600
      ),
      // where the flight starts
      start: Math.floor(rt.departuretime / 3600),
    };
    for (let i = 0; i <= res.distance; i++) {
      // pushed hours in that day into the flightTimes array to occuppy position
      flyingTimes.push(res.start + i);
    }
    return res;
  });

  return (
    <div className={s.container}>
      <div className={s.topBar}>
        <div className={s.aircraftInfo}>
          <div className={s.text}>Selected Aircraft: </div>
          <div className={s.aircraft}>{aircraft}</div>
        </div>
        <Link className={s.button} to="/">
          Go back
        </Link>
      </div>

      <ProgressBar flyingTimes={flyingTimes} />

      <div className={s.flightsContainer}>
        <div className={s.gridSection}>
          <div className={s.title}>All flights</div>
          <div>
            Selectable flights:{" "}
            {/* checks if any flights available based on aircrafts latest location */}
            {
              flights?.filter(
                (fl) =>
                  fl.origin === flightOrigin &&
                  route[route.length - 1].arrivaltime <= fl.departuretime
              ).length
            }
          </div>
          <Navigation
            page={page}
            updatePage={updatePage}
            getFlights={getFlights}
          />
          <div className={s.listContainer}>
            {flights &&
              flights.map((fl) => {
                return (
                  <div
                    className={
                      // if the origin of the flight matches with aircrafts latest location and
                      // its later than prev flights arrival time, gives indication to user about the availabilit of the flight
                      flightOrigin === fl.origin
                        ? route[route.length - 1].arrivaltime <=
                          fl.departuretime
                          ? s.flightCardOK
                          : s.flightCard
                        : s.flightCard
                    }
                    key={`${fl.id}`}
                    onClick={() => {
                      // can add flight anly if latest location of the aircraft and the flight arrival mathces
                      if (flightOrigin === fl.origin) {
                        // if the flight is already inlcuded in the route it cannot be added again
                        // if arrival time of the prev flight is later than the departure time of the current flight
                        // it cannot be added
                        if (
                          route.includes(fl) ||
                          route[route.length - 1].arrivaltime > fl.departuretime
                        ) {
                          return;
                        }

                        // updates current location of the aircraft and adds flight to the route
                        updateOrigin(fl.destination);
                        updateRoute(route ? [...route, fl] : [fl]);
                      }
                    }}
                  >
                    <FlightCard flight={fl} />
                  </div>
                );
              })}
          </div>
          <Navigation
            page={page}
            updatePage={updatePage}
            getFlights={getFlights}
          />
        </div>

        <div className={s.gridSection}>
          <div className={s.title}>Selected flights</div>
          <div>
            {route.map((rt) => {
              if (rt.arrivaltime === 0) {
                return null;
              }
              return (
                <div
                  className={s.flightCard}
                  key={`${rt.id}-${rt.origin}`}
                  onClick={() => {
                    // removes flight from the route
                    updateRoute(route.filter((r) => r.id !== rt.id));
                  }}
                >
                  <FlightCard flight={rt} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteMaker);
