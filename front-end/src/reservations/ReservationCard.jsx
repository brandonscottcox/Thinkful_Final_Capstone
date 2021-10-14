import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

export default function ReservationCard({
  reservation,
  calledAPI,
  setCalledAPI,
}) {

  const [cancelError, setCancelError] = useState([]);
  const history = useHistory();

  const handleCancel = (event) => {
    event.preventDefault();
    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
        const abortController = new AbortController();
        // PUT request
        async function cancel() {
            try {
                await updateReservationStatus(reservation.reservation_id, "cancelled", abortController.signal);
                history.go(0);
            } catch (error) {
                setCancelError([...cancelError, error.message]);
            }
        }
        if (cancelError.length === 0) {
            cancel();
        }
    }
}

  return (
    <div className="card mt-1">
      <div className="card-body">
        <h5 className="card-title">
          Reservation for:{" "}
          {`${reservation.first_name} ${reservation.last_name}`}
        </h5>
        <p className="card-text">Number: {reservation.mobile_number}</p>
        <p className="card-text">Date: {reservation.reservation_date}</p>
        <p className="card-text">Time: {reservation.reservation_time}</p>
        <p className="card-text">Party Size: {reservation.people}</p>
        <p
          data-reservation-id-status={reservation.reservation_id}
          className="card-text"
        >
          Status: {reservation.status}
        </p>
      </div>
      {reservation.status === "booked" && (
        <div>
          <Link
            className="btn btn-primary w-25 mb-1 ml-1"
            to={`/reservations/${reservation.reservation_id}/seat`}
          >
            Seat
          </Link>
          <Link
            className="btn btn-secondary w-25 mb-1 ml-1"
            to={`/reservations/${reservation.reservation_id}/edit`}
          >
            Edit
          </Link>
          <button
            type="button"
            data-reservation-id-cancel={reservation.reservation_id}
            onClick={handleCancel}
            className="btn btn-danger w-25 mb-1 ml-1"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}