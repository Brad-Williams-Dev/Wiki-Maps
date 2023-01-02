const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const registerUsers = (name,email,password) => {
return db.query('INSERT INTO users (name,email,password) VALUES($1, $2, $3)', [name,email,password])
}


module.exports = { getUsers, registerUsers };
