const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => data.rows);
};

const registerUsers = (name, email, password) => {
  return db
    .query(`INSERT INTO users (name,email,password) 
    VALUES($1, $2, $3)
    RETURNING *`, [name, email, password])

    .then(data => data.rows[0]);
}

const getUserByEmail = email => {
  return db
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then(data => data.rows[0]);
};

module.exports = { getUsers, registerUsers, getUserByEmail };
