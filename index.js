const express = require("express");
//ROUTES
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");

const app = express();
app.use(express.json());

//USE THE ROUTES
app.use("/users", userRouter);
app.use("/images", imageRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
