// load .env data into process.env
require("dotenv").config();

// Web server config

// Install the cookie-session ::
// npm install cookie-session ::
const cookieSession = require("cookie-session");

const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes,
// yellow for client error codes, cyan for redirection codes,
// and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// +++++++++++ Add this cookie here ::
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const mapsRoutes = require("./routes/maps");
const markersRoutes = require("./routes/markers");
const favouritesRoutes = require("./routes/favourites");
const { map } = require("jquery");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/maps", mapsRoutes(db));
app.use("/api/markers", markersRoutes(db));
app.use("/api/favourites", favouritesRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
  const user = req.session.id;
  res.render("index", { user: user });
});

app.get("/login", (req, res) => {
  const user = req.session.id;
  res.render("login", { user: user });
});

app.post("/login", (req, res) => {
  const body = req.body;
  req.session.id = body.email;
  res.redirect("/maps");
});

app.get("/register", (req, res) => { ///////////////////////
  const user = req.session.id;
  res.render("register", { user: user });
});

app.post("/register", (req, res) => {
  name = req.body.name
  email =  req.body.email
  password = req.body.password
  
  db.query(
    `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `, [name,email,password])

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  res.redirect("/login");
});


// LogOut ::
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});


app.get("/maps", (req, res) => {
  const user = req.session.id;
  db.query(`SELECT * FROM maps;`)
  .then(data => {
    const maps = data.rows;
    // res.json({ maps });
    console.log(maps)
    res.render("maps_index", { user: user, maps:maps });
});
});

/////////////////////////////////////////////


app.get("/createmap", (req, res) => {
  const user = req.session.id;
  res.render("createmap", { user: user });
});

app.post("/createmap", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  // const created_on = Date().now();
  const user_id = 1;



  // cardDatabase[id] = {
  //   title,
  //   description,
  //   longitude,
  //   latitude,
  //   id
  // };

  
  
  db.query(
    `
    INSERT INTO maps (title, description, longitude, latitude, created_on, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [title, description, longitude, latitude, "2021-03-11 09:30:00", user_id]
    )
    .then((result) => result.rows[0])
    .catch((err) => console.log(err.message));
    
    res.redirect("/maps");

});








app.get("/edit_map/:id", (req, res) => {
  const user = req.session.id;

  const id = cardDatabase[req.params.id];
  res.render("edit_map", { user: user, cardDetails: id });
});




app.post("/edit_map/:id", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;

  console.log(description);

  cardDatabase[req.params.id] = {
    title,
    description,
    longitude,
    latitude,
    id: req.params.id
  };

  res.redirect("/maps");

  db.query(
    `UPDATE maps (title, description, longitude, latitude, created_on, user_id)
  SET ($1, $2, $3, $4, $5, $6)
  RETURNING *;`,
    [title, description, longitude, latitude, "2021-03-11 09:30:00", user_id]
  )
    .then((result) => result.rows[0])
    .catch((err) => console.log(err.message));
  res.redirect("/maps");
});


app.post("/delete/:id", (req, res) => {

  delete cardDatabase[req.params.id];

  res.redirect("/maps");
});








app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
