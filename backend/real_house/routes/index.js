const authRouter = require("./auth");
const authJwt = require("../middlewares/authJWT");
const userRouter = require("./user");
const realHomeTypeRouter = require("./realHomeTypeRouter");
const transactionTypeRouter = require("./transactionTypeRouter");
const serviceRouter = require("./services");
const numberDayRouter = require("./numberDayRouter");
const newsTypeRouter = require("./newsTypeRouter");
const insertDataDb = require("./insertDataDb");
// const realHomeRouter = require("./realHomeRouter");
const catchError = require("../middlewares/catchErr");

const initRoute = (app) => {
    app.use("/api/insert-data-db", insertDataDb);
    app.use("/api/user", userRouter);
    app.use("/api/auth", authRouter);

    app.use("/api/admin/transaction-type", transactionTypeRouter);
    app.use("/api/admin/real-home-type", realHomeTypeRouter);
    app.use("/api/admin/news-type", newsTypeRouter);
    app.use("/api/admin/number-day", numberDayRouter);

    app.use("/api/service", serviceRouter);
    // app.use("/api/real-home", realHomeRouter);

    app.use(catchError);

    return app.use("/", (req, res) => {
        console.log("server starting....");
    });
};

export default initRoute;
