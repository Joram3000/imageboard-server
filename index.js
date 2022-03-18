const express = require("express");
//ROUTES
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");
const auth1Router = require("./routers/auth1");

const app = express();
app.use(express.json());

//USE THE ROUTES
app.use("/users", userRouter);
app.use("/images", imageRouter);
app.use("/auth", authRouter);
// app.use("/auth1", auth1Router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
