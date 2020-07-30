import React from "react";
import s from "./ProgressBar.module.css";

interface Props {
  flyingTimes: Array<number>;
}

const ProgressBar = (props: Props) => {
  const { flyingTimes } = props;

  // creates an 24h slot for the aircrafts schedule
  for (var hours = [], b = 24; b > 0; hours[--b] = b + 1);
  return (
    <div className={s.container}>
      <div className={s.title}>Flight schedule:</div>
      <div className={s.barContainer}>
        {hours.map((h, i) => {
          return (
            <div
              key={h}
              className={flyingTimes.includes(i) ? s.hourOK : s.hour}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
