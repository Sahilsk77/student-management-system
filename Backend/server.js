const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log("Server running");
});

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "mysql.railway.internal",
  user: "root",
  password: "uCHahogaBJkFMhkxJYBYZuwRZMBfGUCS",
  database: "railway"
});

db.connect((err)=>{
  if(err){
    console.log("DB Error:", err);
  } else {
    console.log("Railway DB Connected");
  }
});

app.listen(5000, ()=>console.log("Server running"));

app.post("/addStudent", (req,res)=>{
  console.log("API HIT");         
  console.log(req.body);          

  const {name,email,course,phone,status} = req.body;

  const sql = `
    INSERT INTO students (name,email,course,phone,status)
    VALUES (?,?,?,?,?)
  `;

  db.query(sql,[name,email,course,phone,status], (err,result)=>{
    if(err){
      console.log(err);           
      return res.send(err);
    }
    res.send("Student Added");
  });
});

app.get("/students", (req,res)=>{
  db.query("SELECT * FROM students", (err,result)=>{
    if(err) return res.send(err);
    res.json(result);
  });
});

app.delete("/deleteStudent/:id", (req,res)=>{
  db.query("DELETE FROM students WHERE id=?",
  [req.params.id],
  (err,result)=>{
    if(err) return res.send(err);
    res.send("Deleted");
  });
});

app.put("/updateStudent/:id", (req,res)=>{
  const {name,email,course,phone,status} = req.body;

  const sql = `
    UPDATE students
    SET name=?, email=?, course=?, phone=?, status=?
    WHERE id=?
  `;

  db.query(sql,[name,email,course,phone,status,req.params.id],
  (err,result)=>{
    if(err) return res.send(err);
    res.send("Updated");
  });
});

app.get("/activeStudents", (req,res)=>{
  db.query("SELECT * FROM students WHERE status='ACTIVE'",
  (err,result)=>{
    if(err) return res.send(err);
    res.json(result);
  });
});