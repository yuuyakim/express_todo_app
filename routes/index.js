const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const conn_obj = require("../connection_obj");
const knex = require('../db/knex')

const connection = mysql.createConnection(
  conn_obj
);

/* GET home page. */
router.get("/", function (req, res, next) {
  const userId = req.session.userid
  const isAuth = Boolean(userId)

  knex("tasks")
    .select("*")
    .then( (results) => {
      res.render("index", {
        title: "ToDo App",
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch( (err) => {
      console.error(err)
      res.render("index", {
        title: "ToDo App",
        isAuth: isAuth,
      });
    })
});

router.post("/", function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const todo = req.body.add
  knex("tasks")
    .insert({user_id: 1, content: todo})
    .then( () => {
      res.redirect('/')
    })
    .catch( (err) => {
      console.error(err)
      res.render("index", {
        title: "TodoApp",
        isAuth: isAuth,
      });
    })
});

router.use('/signup', require('./signup'))
router.use('/signin', require('./signin'))

router.use('/logout', require('./logout'))

module.exports = router;
