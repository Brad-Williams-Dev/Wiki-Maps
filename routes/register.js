const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  console.log('this is body ', req.body)
  const name = 'Julian' 
  const email = 'Julian@gmail.com' 
  const password = '123julian' 
  // res.redirect('login');
  userQueries.registerUsers(name,email,password)
    .then(data => {
    
    })

});

module.exports = router;
