import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   <td>{props.record.doctor}</td>
   <td>{props.record.patient}</td>
   <td>{props.record.room}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:3001/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:3001/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 async function updateList(){
  const response = await fetch(`http://localhost:3001/record/`).then( async (res) => {
    if (!res.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    //ec2-18-118-43-198.us-east-2.compute.amazonaws.com:3010
    const response2 = await fetch("http://localhost:3010/", {
    mode: 'no-cors',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( res.json()),
  })
  .catch(error => {
    window.alert(error);
    return;
  });

  console.log("resp 2");
  console.log(response2);
  });

  const records = await response;
     
  console.log("resp 1");
  console.log(records);
  
  

 }
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List <button className="btn btn-link"
       onClick={updateList}
     >Update List</button></h3> 

     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Doctor</th>
           <th>Patient</th>
           <th>Room</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}