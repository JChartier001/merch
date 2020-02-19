const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Models = require("../crudOperations/helperVariables/models");

// const validateRegisterInfo = require("./authMiddleware/verifyRegisterInfo");
// const validateLoginInfo = require("./authMiddleware/verifyLoginInfo");

router.post("/register", (req, res) => {
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 12);
  newUser.password = hash;

  Models.Users.insert(newUser)
    .then(newUser => {
      res.status(201).json({ message: "created new user!! ", newUser });
    })
    .catch(error => {
      res.status(500).json({
        error,
        message: "Username Must be Unique, please choose another"
      });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Models.Users.findBy(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(error => {
      // console.log(error);
      res
        .status(500)
        .json({ error, message: "There was an error logging you in" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.userID,
    username: user.username
  };

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
