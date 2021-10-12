import React, { useState } from "react";
import { deletePartyFromTable } from "../utils/api";
import { useHistory } from "react-router-dom";

export default function TableCard({ setCalledAPI, calledAPI, table }) {
  const [error, setError] = useState(null);

  const history = useHistory();
  /*
  function handleFinish() {
    const abortController = new AbortController();
    const answer = window.confirm(
      "Is this table ready to seat new guests? \n\nThis cannot be undone."
    );
    if (answer) {
      deletePartyFromTable(table.table_id, abortController.signal)
        .then(() => setCalledAPI(() => !calledAPI))
        .catch(setError);
    }
  }
  */

  function handleFinish() {
    const abortController = new AbortController();
    const answer = window.confirm(
      "Is this table ready to seat new guests? \n\nThis cannot be undone."
    );
    if (answer) {
      deletePartyFromTable(table.table_id, abortController.signal)
        .then(history.push(`/dashboard`))
        .catch(setError);
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Table: {table.table_name}</h5>
        <p className="card-text">Capacity: {table.capacity}</p>
        <p data-table-id-status={table.table_id}>
          Status: {table.reservation_id ? "Occupied" : "Free"}
        </p>
        {table.reservation_id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleFinish()}
            data-table-id-finish={table.table_id}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
