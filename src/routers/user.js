const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

/*user routs*/

//add user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send("invalid email or password");
  }
});

//login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send("invalid email for login");
  }
});

// //retrieve all users
// router.get("/users", auth, async (req, res) => {
//   try {
//     users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(500).send();
//   }
// });
//retrieve profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
//retrieve user by id

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    user = await User.findById(_id);
    if (!user) {
      console.log(404);
      return res.status(404).send("not found");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.name);
  }
  console.log(req.params);
});

//update user

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    //const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
    if (!user) {
      res.status(404).send("not found");
      return console.log("error", res.body);
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

//delete user

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// export routs
module.exports = router;
