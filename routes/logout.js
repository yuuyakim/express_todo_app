const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    req.session = null
    res.redirect('/')
})

module.exports = router