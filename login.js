const express = require(`express`)
const userRoute = express.Router();
const User = require("./Schema/userSchema");
const bcrypt = require("bcrypt")
const jwt = require(`jsonwebtoken`);

userRoute.post("/register", (req, res) => {
  const userData = req.body
  bcrypt
    .hash(userData.password, 10)
    .then((encryptedPassword) => {
      const newUser = User({
        email: userData.email,
        name: userData.name,
        password: encryptedPassword
      })
      newUser.save().then((result) => {
        try {
          // console.log(newUser);
          res.status(200).send({
            message: "user registered sucessfully",
            data: result
          })
        } catch (error) {
          // console.log(error);
          res.status(500).send({
            message: "some error while registering",
            data: error
          })
        }
      })
    })
})
userRoute.post("/login", (req, res) => {
  const loginData = req.body;
  console.log(loginData)
  User.findOne({ email: loginData.email })
    .then((user) => {
      if (user) {
        bcrypt.compare(loginData.password, user.password).then((authStatus) => {
          if (authStatus) {
            const jwtToken = jwt.sign(
              {
                email: user.email,
                name: user.name,
              },
              process.env.SECRECT

            );
            //   console.log("passwords are matching");
            // console.log(jwtToken);
            res.status(200).send({
              message: "Authentication successfully",
              status: "success",
              token: jwtToken
            });
          } else {
            res.status(403).send({
              message: "Email or password did not match",
            });
          }
        });
      } else {
        res.status(404).send({
          errorDesc: "user not registered",
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        errorDesc: " somthing went wrong",
      });
    });
});
//   module.exports = router ;
module.exports = userRoute