const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   res.status(503).send("Site is in maintenance");
// });

// app.use((req,res,next) => {
//     if(req.method=== 'GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// open port
app.listen(port, () => {
  console.log("Server is running on port " + port);
});

// const bcrypt = require('bcryptjs');

// const myFunction = async() => {
//     const password= 'Red1234'
//     const hashedPassword= await bcrypt.hash(password,8)
//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('red1234',hashedPassword)
//     console.log(isMatch);
// }

// myFunction();

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisismynewtoken", {
    expiresIn: "7 days",
  });
  console.log(token);

  const data = jwt.verify(token, "thisismynewtoken");
  console.log(data);
};

myFunction();
