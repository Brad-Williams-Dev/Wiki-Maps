const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  res.render('register');
});



router.post('/', (req, res) => {
 const {name, email, password} = req.body
  userQueries.registerUsers(name,email,password)
    .then(data => {
      console.log(data)
      res.redirect('/login');
    })
    
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


})


module.exports = router;
