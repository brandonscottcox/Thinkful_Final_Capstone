import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createReservation } from "../utils/api";


export default function NewReservation({reservations, setReservations}) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    });

    function handleSubmit(event) {
        event.preventDefault();
        createReservation(formData)
          .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
          .catch(console.log);
        history.push(`/dashboard?date=${formData.reservation_date}`);
      }

      const handleChange = ({ target: {name, value } }) => {
        setFormData ({ ...formData, [name]: value });
      }

//---------------------------------------------------------------------------

    // const defaultFormData = {
    //     first_name: "",
    //     last_name: "",
    //     mobile_number: "",
    //     reservation_date: "",
    //     reservation_time: "",
    //     people: "",
    // }

    // const [formData, setFormData] = useState(defaultFormData)

    // const submitHandler = (event) => {

    //     event.preventDefault()
    //     console.log(formData)
    // }



    //--------------------------------------------------------------

    // const [formData, setFormData] = useState({
    //     first_name: "",
    //     last_name: "",
    //     mobile_number: "",
    //     reservation_date: "",
    //     reservation_time: "",
    //     people: 0,
    //   });
    //   function handleChange({ target }) {
    //     setFormData({ ...formData, [target.name]: target.value });
    //   }
    //   const handleSubmit = (event) => {
    //     event.preventDefault(); // the normal submit refreshes the entire page.
    //     history.push(`/dashboard?date=${formData.reservation_date}`); // the push function literally "pushes" the user to whatever path you give.
    //     //console.log("submit button", reservation);
    //   };






    return (
        <main>
            <h1>New Reservation</h1>
            <div className="d-md-flex mb-3" onSubmit={handleSubmit}>
            <form name="create_reservation">
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        required
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        className="form-control"
                        placeholder="John/Jane"
                        title="First Name"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        required 
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        className="form-control"
                        placeholder="Smith"
                        title="Last Name"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile-number">Mobile Number</label>
                    <input 
                        required
                        type="text"
                        name="mobile_number"
                        value={formData.mobile_number}
                        className="form-control"
                        placeholder="123-456-7890"
                        title="Mobile Number"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reservation_date">Date</label>
                    <input 
                        required
                        type="date"
                        pattern="/d{4}-/d{2}-/d{2}"
                        name="reservation_date"
                        value={formData.reservation_date}
                        className="form-control"
                        title="Date"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reservation_time">Time</label>
                    <input 
                        required
                        type="time"
                        pattern="[0-9]{2}:[0-9]{2}"
                        name="reservation_time"
                        value={formData.reservation_time}
                        className="form-control"
                        title="Time"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="people">Party Size</label>
                    <input
                    required
                    type="number"
                    name="people"
                    value={formData.people}
                    className="form-control"
                    placeholder="#"
                    onChange={handleChange}
                    />
                </div>

            <button type="submit">Submit</button>
            <button onClick={history.goBack} className="ml-1" type="button">Cancel</button>
            </form>
            </div>
            
        </main>
    )
}