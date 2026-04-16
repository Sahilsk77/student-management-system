import { useEffect, useState } from "react";
import axios from "axios";

// ✅ YOUR LIVE BACKEND URL
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
  console.log("Button clicked");   
  console.log(data);               

  try{
    if(data.id){
      // ✅ UPDATE
      await axios.put(`${API}/updateStudent/${data.id}`, data);
      alert("Student Updated Successfully");
    } else {
      // ✅ ADD
      await axios.post(`${API}/addStudent`, data);
      alert("Student Added Successfully");
    }

    localStorage.removeItem("editStudent");

    // clear form
    setData({
      id:null,
      name:"",
      email:"",
      course:"",
      phone:"",
      status:"ACTIVE"
    });

    // reload once
    setTimeout(()=>{
      window.location.reload();
    },300);

  } catch(err){
    console.log(err);
    alert("Error occurred");
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