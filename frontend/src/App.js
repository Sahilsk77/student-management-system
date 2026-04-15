import StudentForm from "./StudentForm";
import StudentList from "./StudentList";

function App(){
  return(
    <div className="container mt-4">
      <h1 className="text-center mb-4">
        Student Management System
      </h1>

      <StudentForm/>
      <StudentList/>
    </div>
  );
}

export default App;