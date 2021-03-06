import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   doctor: "",
   patient: "",
   room: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:3001/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
     console.log(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     doctor: form.doctor,
     patient: form.patient,
     room: form.room,
   };
   console.log(editedPerson);
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:3001/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div>
  <h3>Update</h3>
  <form onSubmit={onSubmit}>
    <div className="form-group">
      <label htmlFor="doctor">Doctor</label>
      <input
        type="text"
        className="form-control"
        id="doctor"
        value={form.doctor}
        onChange={(e) => updateForm({ doctor: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label htmlFor="patient">Patient</label>
      <input
        type="text"
        className="form-control"
        id="patient"
        value={form.patient}
        onChange={(e) => updateForm({ patient: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label htmlFor="room">Room</label>
      <input
        type="text"
        className="form-control"
        id="room"
        value={form.room}
        onChange={(e) => updateForm({ room: e.target.value })}
      />
    </div>
  
  <div className="form-group">
         <input
           type="submit"
           value="Update Info"
           className="btn btn-primary"
         />
       </div>

       </form>
</div>
 );
}