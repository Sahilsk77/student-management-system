import { useEffect, useState } from "react";
import axios from "axios";

// ✅ Your backend URL (same as StudentForm)
const API = "https://student-management-system-production-37a8.up.railway.app";

function StudentList(){

  const [students,setStudents] = useState([]);
  const [search,setSearch] = useState("");

  // 🔄 Fetch students
  const fetchStudents = ()=>{
    axios.get(`${API}/students`)
    .then(res=>{
      setStudents(res.data);
    })
    .catch(err=>{
      console.log(err);
      alert("Error fetching students");
    });
  };

  useEffect(()=>{
    fetchStudents();
  },[]);

  // 🗑 Delete student
  const deleteStudent = async(id)=>{
    try{
      await axios.delete(`${API}/deleteStudent/${id}`);
      alert("Deleted Successfully");
      fetchStudents(); // ✅ no reload needed
    } catch(err){
      console.log(err);
      alert("Delete failed");
    }
  };

  // ✏️ Edit student
  const handleEdit = (student)=>{
    localStorage.setItem("editStudent", JSON.stringify(student));
    window.location.reload();
  };

  return(
    <div className="card p-4">
      <h2>Student List</h2>

      {/* 🔍 Search */}
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
          .filter((s)=>
            s.name.toLowerCase().includes(search.toLowerCase())
          )
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