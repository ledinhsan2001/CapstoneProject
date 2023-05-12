const jwt = require("jsonwebtoken");
const settings = require("../settings");
const User = require("../models/user");
const Role = require("../models/role");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ error: "No token provided!" });
  }

  jwt.verify(token, settings.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Unauthorized!" });
    }
    //so Date.now() > exp 3 số nên * 1000 để so sánh
    var exp = decoded.exp * 1000;
    req.expiresIn = exp;
    //decoded => id gán req.userId
    req.userId = decoded.payload.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ error: "Require Admin Role!" });
        return;
      }
    );
  });
};

const authJwt = {
    verifyToken,
    isAdmin
};
module.exports = authJwt;