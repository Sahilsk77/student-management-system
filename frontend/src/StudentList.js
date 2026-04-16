import { useEffect, useState } from "react";
import axios from "axios";

function StudentList(){

  const [students,setStudents] = useState([]);
  const [search,setSearch] = useState("");

  useEffect(()=>{
    axios.get("https://student-management-system-production-37a8.up.railway.app/students")
    .then(res=>setStudents(res.data));
  },[]);

  const deleteStudent = async(id)=>{
    await axios.delete(`https://student-management-system-production-37a8.up.railway.app/deleteStudent/${id}`);
    alert("Deleted");
    window.location.reload();
  };

  const handleEdit = (student)=>{
    console.log(student);
    localStorage.setItem("editStudent", JSON.stringify(student));
    window.location.reload();
  };

  return(
    <div className="card p-4">
      <h2>Student List</h2>

      {/* Search Input */}
      <input 
        className="form-control mb-3"
        placeholder="Search by name..."
        onChange={(e)=>setSearch(e.target.value)}
      />

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
        {students
          .filter((s)=>{
            return s.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((s)=>(
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.course}</td>
            <td>{s.phone}</td>
            <td>{s.status}</td>

            <td>
              <button 
                className="btn btn-warning me-2" 
                onClick={()=>handleEdit(s)}
              >
                Edit
              </button>

              <button 
                className="btn btn-danger" 
                onClick={()=>deleteStudent(s.id)}
              >
                Delete
              </button>
            </td>

          </tr>
        ))}
        </tbody>

      </table>
    </div>
  );
}

export default StudentList;