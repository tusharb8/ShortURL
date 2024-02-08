const shortid = require("shortid");
const URL = require(`./Schema/urlSchema`);
const jwt = require(`jsonwebtoken`);

async function handleGenNewShortUrl(req, res) {
  const body = req.body;
  console.log("req.body",req.body)
  const urltoshorten = req.body.urltoshorten
  try {
    const token = req.headers.authorization;
    const userData = jwt.verify(token, process.env.SECRECT)
    console.log("userData", userData)
    if (!urltoshorten) return res.status(400).json({ error: "url is required" });
    const shortID = shortid();
    await URL.create({
      useremail: userData.email,
      shortId: shortID,
      redirectURL: urltoshorten,
      visited: [],
    });

    return res.json({ id: shortID });
  }
  catch (err) {
    console.log(err)
  }

}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visited.length,
    analytics: result.visited,
  });
}

module.exports = {
  handleGenNewShortUrl,
  handleGetAnalytics,
};
