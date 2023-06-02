const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const Role = require("../models/role");
// const promisify = require("util").promisify;
// const verify = promisify(jwt.verify).bind(jwt);
require("dotenv").config();

const verifyToken = (req, res, next) => {
    let token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).send({ error: "Không có token được cung cấp!" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: "Unauthorized!" });
        }
        //so Date.now() > exp 3 số nên * 1000 để so sánh
        var exp = decoded.exp * 1000;
        req.expiresIn = exp;

        //decoded => id gán req.userId
        req.userId = decoded.id;
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
                _id: { $in: user.roles },
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

                res.status(403).send({ error: "Yêu cầu role Admin!" });
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
};
module.exports = authJwt;
