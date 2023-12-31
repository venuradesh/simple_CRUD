//libraries
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql";
import { queries } from "./queries.js";

//constants
const API_PORT = process.env.PORT || 8080;
const app = express();
const db = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
});

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//creation of the database and initialization of the server application
db.connect((err) => {
  if (!err) {
    db.query(queries.create_db, (err, response) => {
      if (err) throw err;
      else
        db.query(queries.use_db, (err, res) => {
          if (err) throw err;
          else
            db.query(queries.create_table, (err, result) => {
              if (err) throw err;
              else {
                //starting the server
                app.listen(API_PORT, () => console.log(`listening on PORT: ${API_PORT}`));
              }
            });
        });
    });
  } else {
    console.log(err);
  }
});

//routes
app.post("/register", (req, res) => {
  const query = `INSERT INTO user(regno, username, dateofbirth, gender, date_created) VALUES ('${req.body.regno}', '${req.body.username}', '${req.body.dob}','${req.body.gender === "male" ? "M" : "F"}', ${Date.now()})`;
  db.query(query, (err) => {
    if (err) {
      res.status(409).send({ message: "error occured while saving into database" });
      console.log(err);
    } else res.status(201).send({ message: "successfully created" });
  });
});

//fetching all the datas
app.get("/getUsers", (req, res) => {
  const query = "SELECT * FROM user;";
  db.query(query, (err, result) => {
    if (err) {
      res.status(409).send({ message: "Error occured while retrieving the data from the database" });
      console.log(err);
    } else res.status(200).send({ message: result });
  });
});

//fetching the particular user
app.get("/user", (req, res) => {
  const regNo = req.headers.regno;
  const query = `SELECT regno, username, date_format(dateofbirth, '%Y-%m-%d') as dateofbirth, gender FROM user WHERE regno="${regNo}"`;
  db.query(query, (err, response) => {
    if (err) {
      res.status(409).send({ message: `Error occured While Fetching data for ${regNo}` });
      console.log(err);
    } else {
      res.status(200).send({ message: response });
    }
  });
});

//editing the user
app.post("/edituser", (req, res) => {
  const query = `UPDATE user SET username="${req.body.username}", dateofbirth="${req.body.dob}", gender="${req.body.gender === "male" ? "M" : "F"}" WHERE regno="${req.body.regno}"`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(409).send({ message: `Error occured while updating` });
      console.log(err);
    } else {
      res.status(201).send({ message: "ok" });
    }
  });
});

//delete the user
app.delete("/deleteUser", (req, res) => {
  const query = `DELETE FROM user WHERE regno="${req.headers.regno}"`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(400).send({ message: "Error whiel deleting" });
      console.log(err);
    } else {
      res.status(200).send({ message: "ok" });
    }
  });
});
