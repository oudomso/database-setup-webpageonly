import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   doctor: "",
   patient: "",
   room: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:3001/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ doctor: "", patient: "", room: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Doctor</label>
         <input
           type="text"
           className="form-control"
           id="name"
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
           value="Add Info"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}