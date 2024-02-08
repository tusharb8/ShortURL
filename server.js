const express = require(`express`);
const app = express();
const cors = require(`cors`);
const PORT = 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const URL = require("./Schema/urlSchema");
app.use(cors());
const DB = require(`./connect`)
const urlRoute = require(`./urlRoutes`)
const userRoute = require(`./login`)
require("dotenv").config();

app.get('', (req, res) => {
  res.send("WELCOME")
});
app.use("/user", userRoute)
DB();
app.use("/url", urlRoute)

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visited: {
          timestamp: Date.now(),
        },
      },
    }
  );
  console.log(entry)
  if (entry.redirectURL.startsWith("http")) {
    res.redirect(entry.redirectURL);
  }
  else if (entry.redirectURL.startsWith("https")) {
    res.redirect(entry.redirectURL);
  }
  else {
    if (entry.redirectURL.startsWith("http")) {
      res.redirect(entry.redirectURL);
    }
    else if (entry.redirectURL.startsWith("https")) {
      res.redirect(entry.redirectURL);
    }
    else {
      res.redirect(`http://${entry.redirectURL}`);
    }
}  });
  
;

app.listen(PORT, (req, res) => {
  console.log("server is live");
})


