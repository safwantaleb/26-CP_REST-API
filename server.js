const express = require("express");
const connectDB = require("./config/connectDB");

const app = express();
app.use(express.json());

// Connect to DataBase
connectDB();

// import the Schema
const User = require("./model/User");

// GET :  RETURN ALL USERS
app.get("/users", (req, res) => {
  User.find()
    .then(
      (users) =>
        res.status(200).send({ msg: "Getting all Users Done", users }) &&
        console.log("Getting all Users Done", users)
    )
    .catch(
      (err) =>
        res.status(400).send({ msg: "Getting all Users Failed!", err }) &&
        console.log("Getting all Users Failed!", err)
    );
});

// POST :  ADD A NEW USER TO THE DATABASE
app.post("/users", (req, res) => {
  const { name, age, phone, email } = req.body;
  const user = new User({ name, age, phone, email });
  user
    .save()
    .then(
      (newUser) =>
        res.status(200).send({ msg: "User added SUCCESSFULLY.", newUser }) &&
        console.log("User added SUCCESSFULLY.", newUser)
    )
    .catch(
      (err) =>
        res.status(400).send({ msg: "Operation Failed!!", err }) &&
        console.log("Operation Failed!!", err)
    );
});

// PUT : EDIT A USER BY ID
app.put("/users/:userID", (req, res) => {
  const id = req.params.userID;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedUser) => {
      !updatedUser
        ? res.send({ msg: "User not FOUND!" }) && console.log("User not FOUND!")
        : res
            .status(200)
            .send({ msg: "User is updated SUCCESSFULLY", updatedUser }) &&
          console.log("User is updated SUCCESSFULLY", updatedUser);
    })
    .catch(
      (err) =>
        res.status(400).send({ msg: "Operation FAILED!", err }) &&
        console.log("Operation FAILED!", err)
    );
});

// DELETE : REMOVE A USER BY ID
app.delete("/users/:userID", (req, res) => {
  const id = req.params.userID;
  User.findByIdAndRemove(id)
    .then((deletedUser) => {
      !deletedUser
        ? res.send({ msg: '"User not FOUND!"' }) &&
          console.log("User not FOUND!")
        : res
            .status(200)
            .send({ msg: "The user is SUCCESSFULLY deleted", deletedUser }) &&
          console.log("The user is SUCCESSFULLY deleted", deletedUser);
    })
    .catch(
      (err) =>
        res.status(400).send({ msg: "Operation FAILED!", err }) &&
        console.log("Operation FAILED!", err)
    );
});

// Starting the server
const port = process.env.PORT || 3010;
app.listen(port, () => console.log(`Server is running on port ${port}`));
