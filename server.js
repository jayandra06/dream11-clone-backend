require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cron = require("node-cron");

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: "https://wonderwin.leonxtgentech.com", // Allowed frontend
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true, // Allow cookies and auth headers
};

app.use(cors(corsOptions));

// ✅ Handle Preflight Requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://wonderwin.leonxtgentech.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Serve Static Files
app.use('/images', express.static(path.join(__dirname, 'images')));

// ✅ Import Controllers & Routes
const home = require("./controllers/homecontroller");
const video = require("./controllers/video/videocontroller.js");
const contest = require("./controllers/contestsController");
const teamdata = require("./controllers/playerscontroller.js");
const auth = require("./controllers/user_controller");
const team = require("./controllers/teamcontroller");
const payments = require("./controllers/paymentcontroller.js");
const matches = require("./controllers/matchcontroller.js");
const updatedata = require("./updating/updatedata.js");
const player = require("./routes/playerDetails");
const series = require("./routes/series");
const { checkloggedinuser } = require("./utils/checkUser.js");

// ✅ Routes
app.use("/auth", auth);
app.use("/", player);
app.use("/", series);
app.use("/payment", checkloggedinuser, payments);
app.use("/", checkloggedinuser, home);
app.use("/", checkloggedinuser, contest);
app.use("/", checkloggedinuser, teamdata);
app.use("/", checkloggedinuser, team);
app.use("/", checkloggedinuser, updatedata);
app.use("/", checkloggedinuser, video);
app.use("/api/match", checkloggedinuser, matches);

// ✅ MongoDB Connection
mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((error) => console.error("❌ MongoDB Connection Error:", error));

// ✅ Background Tasks
const { cronjobs } = require("./updating/cronJobs.js");
cronjobs();

// ✅ Server Start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.warn(`🚀 Server running at http://localhost:${PORT}`);
});
