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
  knex("tasks")
    .select("*")
    .then( (results) => {
      console.log(results)
      res.render('index', {
        title: 'ToDo App',
        todos: results
      })
    })
    .catch( (err) => {
      console.error(err)
      res.render('index', {
        title: 'ToDo App'
      })
    })
});

router.post("/", function (req, res, next) {
  const todo = req.body.add
  knex("tasks")
    .insert({user_id: 1, content: todo})
    .then( () => {
      res.redirect('/')
    })
    .catch( (err) => {
      console.error(err)
      res.render('index', {
        title: 'TodoApp'
      })
    })
});

module.exports = router;
