require("dotenv").config();
var express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
var express = require("express");
const path = require('path');
const cron = require("node-cron");
const bodyParser = require("body-parser");
const home = require("./controllers/homecontroller");
const video = require("./controllers/video/videocontroller.js");
const contest = require("./controllers/contestsController");
const teamdata = require("./controllers/playerscontroller.js");
const auth = require("./controllers/user_controller");
const team = require("./controllers/teamcontroller");
const payments = require("./controllers/paymentcontroller.js");
const matches = require("./controllers/matchcontroller.js");
const updatedata = require("./updating/updatedata.js");
const fMatches = require("./controllers/football/fMatchDB-controller.js");
const player = require("./routes/playerDetails");
const series = require("./routes/series");
const { startTransaction } = require("./updating/transaction.js");
const { addMatchtoDb } = require("./updating/addMatch.js");
const { addLivescoresDetails } = require("./updating/addlivescoresdetails.js");
const { addLiveDetails } = require("./updating/addlivedetails.js");
const { addLivecommentary } = require("./updating/addCommentary.js");
const { addTeamstandingstodb } = require("./updating/updateteam.js");
const { addTeamstandingstodbAPI } = require("./updating/updatestandings.js");
const { addPlayersAPI } = require("./updating/addplayer.js");
const { addteamPlayers } = require("./updating/teamcreatecontroller.js");
const { addMatchIds } = require("./updating/addMatchIds.js");
const { getkeys } = require("./utils/crickeys");
const { checkloggedinuser } = require("./utils/checkUser.js");
const { updateBalls } = require("./updating/updateBalls.js");
const { addInPlayStatus } = require("./updating/addInPlayStatus.js");
const { createDefaultContestTypes } = require("./updating/createContestTypes.js");
const { cronjobs } = require("./updating/cronJobs.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// app.use(cors({ origin: "*", credentials: false })); 



// CORS Configuration
const corsOptions = {
  origin: "https://wonderwin.leonxtgentech.com", // Only allow requests from this frontend
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true, // Allow cookies and authorization headers
};

app.use(cors(corsOptions));
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://wonderwin.leonxtgentech.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});







app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/images', express.static(path.join('images')));
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
//app.use("/", transaction);
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.log(`Error!${error}`);
    }
    else {
      console.log('connected to database')
    }
  }
);
const api_key =
  "s16rcBDzWjgNhJXPEUV9HA3QMSfvpen2GyL7a4F8ubdwICk5KOHPT32vI5b6cSxs8JpUhirCOjqogGwk";
// ...

 cronjobs()
// createDefaultContestTypes()
// updateBalls();
// addMatchtoDb();
// addLiveDetails();
// addLivescoresDetails();
// addMatchIds();
// addTeamstandingstodb();
// addteamPlayers();
// addTeamstandingstodbAPI();
// addPlayersAPI();
// startTransaction();
// addLivecommentary();
// updateBalls();
// addInPlayStatus()
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});
