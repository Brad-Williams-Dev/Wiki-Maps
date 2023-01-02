const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const registerUsers = (name,email,password) => {
return db
.query('INSERT INTO users (name,email,password) VALUES($1, $2, $3)', [name,email,password])
}

const getUserByEmail = email => {
  return db
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then(res => res.rows[0]);
};

module.exports = { getUsers, registerUsers, getUserByEmail };
