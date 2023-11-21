const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/router.js");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const connectDB = require("./config/db.js");
connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());

routes(app);

app.listen(port, () => console.log(`Server started on port ${port}`));
