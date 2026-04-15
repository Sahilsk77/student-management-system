const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();   // ✅ FIRST create app

app.use(cors());
app.use(express.json());

// DB connection (Railway)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST || "mysql.railway.internal",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE || "railway",
  port: process.env.MYSQLPORT || 3306
});

db.connect((err)=>{
  if(err){
    console.log("DB Error:", err);
  } else {
    console.log("Railway DB Connected");
  }
});

// Routes
app.post("/addStudent", (req,res)=>{
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

// ✅ ONLY ONE listen (at end)
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log("Server running on port", PORT);
});