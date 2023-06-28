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
