const express = require("express");
//ROUTES
const userRouter = require("./routers/user");
const userImage = require("./routers/image");

const app = express();
app.use(express.json());

//USE THE ROUTES
app.use(userRouter);
app.use(userImage);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
