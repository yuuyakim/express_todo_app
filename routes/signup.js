const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const bcrypt = require("bcrypt");

router.get("/", function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  res.render("signup", {
    title: "Sign up",
    isAuth: isAuth,
  });
});

router.post("/", function(req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const username = req.body.username
  const password = req.body.password
  const repassword = req.body.repassword

  knex('users')
    .where({name: username})
    .select('*')
    .then(async (result) => {
      if (result.length !== 0) {
        res.render("signup", {
          title: "sign Up",
          isAuth: isAuth,
          errorMessage: ["このユーザー名は既に使われています"],
        });
      } else if (password === repassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        knex("users")
          .insert({ name: username, password: hashedPassword })
          .then(() => res.redirect("/"))
          .catch((err) => {
            console.error(err);
            res.render("signup", {
              title: "sign Up",
              isAuth: isAuth,
              errorMessage: [err.sqlMessage],
            });
          });
      } else {
        res.render("signup", {
          title: "signUp",
          isAuth: isAuth,
          errorMessage: ["パスワードが一致しません"],
        });
      }
    })
    .catch((err) => {
      res.render("signup", {
        title: "signup",
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    })
})

module.exports = router;
