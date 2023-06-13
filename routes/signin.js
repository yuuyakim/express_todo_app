const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

router.get("/", function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  res.render("signin", {
    title: "Sign in",
    isAuth: isAuth,
  });
});

router.post("/", function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const username = req.body.username;
  const password = req.body.password;

  knex("users")
    .select("*")
    .where({
      name: username,
      password: password
    })
    .then((results) => {
      if (results.length !== 0) {
        req.session.userid = results[0].id
        res.redirect("/");
      } else {
        res.render("signin", {
          title: "sign In",
          isAuth: isAuth,
          errorMessage: ["ユーザー登録がないか、パスワードが誤っています。"],
        });
      }
    })
    .catch((err) => {
      console.error(err)
      res.render("signin", {
        title: "Sign in",
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    })
});

module.exports = router;
