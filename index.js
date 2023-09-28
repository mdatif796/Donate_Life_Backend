const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://16.171.57.202:3000",
      "http://16.171.57.202",
    ],
  })
);

const db = require("./config/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in connecting with the port", port);
    return;
  }
  console.log("Express server successfully run on port", port);
});
