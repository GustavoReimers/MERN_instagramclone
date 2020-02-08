const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");
const bodyParser = require("body-parser");
const https = require("https");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
// const MONGODB_URI = "mongodb://localhost:27017/my_local_db";
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});
mongoose.connection.once("open", function() {
  console.log("Connected to the Database.");
});
mongoose.connection.on("error", function(error) {
  console.log("Mongoose Connection Error : " + error);
});

app.use(bodyParser.json());

app.get("/", function(request, response) {
  response.send("hello world");
});
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};
app.use(cors(corsOption));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});
app.use("/api", router);

// const express = require("express");
// const app = express(); // create our app w/ express
// const mongoose = require("mongoose"); // mongoose for mongodb
// const MONGODB_URI = "mongodb://localhost:27017/my_local_db";
// const PORT = 3001;
// const router = require("./routes/index");
// // const fs = require("fs");
// // const https = require("https");
// // const port = process.env.PORT || 8080; // set the port
// // const socketport = 8000;
// // const database = require("./config/database"); // load the database config
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const methodOverride = require("method-override");
// const path = require("path");
// const cors = require("cors");
// const fileUpload = require("express-fileupload");
// // configuration ===============================================================
// mongoose.Promise = require("bluebird");
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }); // Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)
// app.use(express.static("./public")); // set the static files location /public/img will be /img for users
// app.use(morgan("dev")); // log every request to the console
// app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json
// app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
// app.use(methodOverride("X-HTTP-Method-Override")); // override with the X-HTTP-Method-Override header in the request
// app.use(cookieParser());
// const corsOption = {
//   origin: true,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   exposedHeaders: ["x-auth-token"]
// };
// app.use(cors(corsOption));
// app.use(fileUpload());

// app.listen(PORT, function() {
//   console.log(`Server listening on port ${PORT}`);
// });
// app.use("/api", router);
