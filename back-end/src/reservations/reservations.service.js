const knex = require("../db/connection");

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function read(reservationId) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .then((returnedRecords) => returnedRecords[0]);
}

// updates a reservation status
function update(updatedReservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*")
        .then((updatedReservations) => updatedReservations[0]);

}

// finds a reservation by phone number
function find(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

module.exports = {
    list,
    create,
    read,
    update,
    find,
}

//edit