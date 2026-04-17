import { useEffect, useState } from "react";
import axios from "axios";

// ✅ LIVE BACKEND URL
const API = "https://student-management-system-production-37a8.up.railway.app";

function StudentForm(){

const [data,setData] = useState({
  id:null,
  name:"",
  email:"",
  course:"",
  phone:"",
  status:"ACTIVE"
});

const handleChange = (e)=>{
  setData({...data,[e.target.name]:e.target.value});
};

const handleSubmit = async()=>{
  console.log("Submitting:", data);

  try{
    let res;

    if(data.id){
      // ✅ UPDATE
      res = await axios.put(`${API}/updateStudent/${data.id}`, data);
      alert("Student Updated Successfully");
    } else {
      // ✅ ADD
      res = await axios.post(`${API}/addStudent`, data);
      alert("Student Added Successfully");
    }

    console.log("Response:", res.data);  // 👈 DEBUG

    // clear edit state
    localStorage.removeItem("editStudent");

    // reset form
    setData({
      id:null,
      name:"",
      email:"",
      course:"",
      phone:"",
      status:"ACTIVE"
    });

    // ✅ better than reload
    window.location.reload();

  } catch(err){
    console.log("ERROR:", err);   // 👈 IMPORTANT
    alert("Error occurred. Check console.");
  }
};

useEffect(()=>{
  const editData = JSON.parse(localStorage.getItem("editStudent"));
  if(editData){
    setData(editData);
  }
},[]);

return(
<div className="card p-4 mb-4">
<h2>Add Student</h2>

<input 
  className="form-control mb-2" 
  name="name" 
  value={data.name} 
  onChange={handleChange} 
  placeholder="Name"
/>

<input 
  className="form-control mb-2" 
  name="email" 
  value={data.email} 
  onChange={handleChange} 
  placeholder="Email"
/>

<input 
  className="form-control mb-2" 
  name="course" 
  value={data.course} 
  onChange={handleChange} 
  placeholder="Course"
/>

<input 
  className="form-control mb-2" 
  name="phone" 
  value={data.phone} 
  onChange={handleChange} 
  placeholder="Phone"
/>

<select 
  className="form-control mb-2" 
  name="status" 
  value={data.status} 
  onChange={handleChange}
>
<option value="ACTIVE">ACTIVE</option>
<option value="INACTIVE">INACTIVE</option>
</select>

<button 
  className="btn btn-primary"
  type="button"
  onClick={handleSubmit}
>
{data.id ? "Update Student" : "Add Student"}
</button>

</div>
);
}

export default StudentForm;