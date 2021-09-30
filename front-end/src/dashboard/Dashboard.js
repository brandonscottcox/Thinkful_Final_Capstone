import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { previous, today, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const listOfReservations = reservations.map((reservation, index) => {
    return (
      <tr id={reservation.reservation_id} key={index}>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
      </tr>
    );
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <button
        type="button"
        onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
      >
        Previous
      </button>
      <button
        type="button"
        onClick={() => history.push(`/dashboard?date=${today()}`)}
      >
        Today
      </button>
      <button
        type="button"
        onClick={() => history.push(`/dashboard?date=${next(date)}`)}
      >
        Next
      </button>

      {reservations.map((entry) => (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Reservation for: {`${entry.first_name} ${entry.last_name}`}
            </h5>
            <p className="card-text">Number: {entry.mobile_number}</p>
            <p className="card-text">Date: {entry.reservation_date}</p>
            <p className="card-text">Time: {entry.reservation_time}</p>
            <p className="card-text">Party Size: {entry.people}</p>
          </div>
        </div>
      ))}

<div className="table-responsive">
        <table className="table no-wrap">
          <thead>
            <tr>
              <th className="border-top-0">First Name</th>
              <th className="border-top-0">Last Name</th>
              <th className="border-top-0">Mobile Number</th>
              <th className="border-top-0">Reservation Date</th>
              <th className="border-top-0">Reservation Time</th>
              <th className="border-top-0">People</th>
            </tr>
          </thead>
          <tbody>{listOfReservations}</tbody>
        </table>
      </div>
    </main>
  );
}