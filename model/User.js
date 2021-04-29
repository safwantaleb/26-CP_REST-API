const mongoose = require("mongoose");

const validator = require("validator");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isAlpha(value);
    },
  },
  age: {
    type: String,
    required: true,
    validate: (age) => {
      return validator.isNumeric(age);
    },
  },
  phone: {
    type: String,
    required: true,
    validate: (phone) => {
      return validator.isNumeric(phone);
    },
  },
  email: {
    type: String,
    required: true,
    validate: (mail) => {
      return validator.isEmail(mail);
    },
  },
});

module.exports = mongoose.model("Users", User);
