const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  res.render('register');
});


router.post("/", (req, res) => {
  registerUsers({ ...req.body })
    .then(user => {
      req.session.userId = user.id;
      res.redirect('/');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.post('/', (req, res) => {
  console.log('this is body ', req.body)
  const name = 'Julian' 
  const email = 'Julian@gmail.com' 
  const password = '123julian' 
 
  userQueries.registerUsers(req.body)
    .then(data => {
    
    })
    res.redirect('login');

})


module.exports = router;
