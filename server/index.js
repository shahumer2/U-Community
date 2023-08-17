// latest version is import express
import express from "express"

import dotenv from "dotenv"
import { Connection } from "./database/db.js";
import Router from "./routes/route.js";
import cors from "cors"
import bodyParser from "body-parser"
const app = express();
// import cors from "cors"

app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", Router)

dotenv.config();
app.listen(8000, () => {
    console.log("server is running a port 8000");
})
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
Connection(USERNAME, PASSWORD);

