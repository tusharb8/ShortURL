const express = require(`express`);
const urlRoute = express.Router();
const URL = require(`./Schema/urlSchema`);
const jwt = require(`jsonwebtoken`);

const {
  handleGenNewShortUrl,
  handleGetAnalytics,
} = require(`./controllers`);

urlRoute.post('/', handleGenNewShortUrl)
urlRoute.get("/getall",async (req, res) => {
  const token = req.headers.authorization;
  console.log(token)
  try {
    const userData = await jwt.verify(token, process.env.SECRECT)
    console.log("userData", userData)
    const allURLs = await URL.find({useremail:userData.email})
    console.log("allURLs",allURLs)
    res.status(200).send({status:"success",message:"all user urls retrived",data:allURLs})
  }
  catch (err) {
    console.log(err)
  }
});
urlRoute.get("/analytics/:shortId", handleGetAnalytics);


module.exports = urlRoute