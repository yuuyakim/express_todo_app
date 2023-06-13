const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

router.get("/", function (req, res, next) {
  res.render("signup", {
    title: "Sign up",
  });
});

router.post("/", function(req, res, next) {
  const username = req.body.username
  const password = req.body.password
  const repassword = req.body.repassword

  knex('users')
    .where({name: username})
    .select('*')
    .then((result) => {
      if (result.length !== 0) {
        res.render('signup', {
          title: 'sign Up',
          errorMessage: ["このユーザー名は既に使われています"]
        })
      } else if (password === repassword) {
        knex('users')
          .insert({name: username, password: password})
          .then(() => res.redirect('/'))
          .catch((err) => {
            console.error(err)
            res.render('signup', {
              title: 'sign Up',
              errorMessage: [err.sqlMessage]
            })
          })
      } else {
        res.render('signup', {
          title: 'signUp',
          errorMessage: ['パスワードが一致しません']
        })
      }
    })
    .catch((err) => {
      res.render("signup", {
        title: "signup",
        errorMessage: [err.sqlMessage],
      })
    })
})

module.exports = router;
