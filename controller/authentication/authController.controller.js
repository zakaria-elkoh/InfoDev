const bcryptjs = require("bcryptjs");
const { User } = require("../../models");
const { body, validationResult } = require("express-validator");

// show register form
exports.showRegisterForm = (req, res) => {
  res.render("auth/register", {
    title: "register",
    currentPage: "register",
  });
};

// show login form
exports.showLoginForm = (req, res) => {
  res.render("auth/login", {
    title: "login",
    currentPage: "login",
  });
};
