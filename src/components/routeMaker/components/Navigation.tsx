import React from "react";
import s from "./Navigation.module.css";

interface Props {
  page: number;
  updatePage: Function;
  getFlights: Function;
}

const Navigation = (props: Props) => {
  const { page, updatePage, getFlights } = props;
  return (
    <div className={s.navigation}>
      {
        <div
          className={page > 1 ? s.button : s.buttonInactive}
          onClick={() => {
            if (page > 1) {
              updatePage(page - 1);
              getFlights(page - 1);
            }
          }}
        >
          Prev
        </div>
      }
      Page {page}
      {
        <div
          className={page < 54 ? s.button : s.buttonInactive}
          onClick={() => {
            if (page < 54) {
              updatePage(page + 1);
              getFlights(page + 1);
            }
          }}
        >
          Next
        </div>
      }
    </div>
  );
};

export default Navigation;
