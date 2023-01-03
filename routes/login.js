
const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');


router.get('/', (req, res) => {
  res.render('login');
});


router.post('/', (req, res) => {
  const { email, password } = req.body;
  userQueries.getUserByEmail(email)
    .then(user => {
      if (!user || user.password !== password) {
        return res.status(400).send('Wrong login. Please check your email or password and try again.');
      }
      req.session.userId = user.id
      res.redirect('/')
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


});


module.exports = router;
