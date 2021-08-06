const mongoose = require('mongoose');
const express = require('express');
const path = require("path");
require('dotenv').config();
const app = express();
const routes = require('./routes')
const PORT = process.env.PORT || 3001;

// MongoDB connection through Mongoose
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/digital_cookbook",
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true
    }
  );
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("MongoDB database connection successful");
  })

// Makes express work with JSON objects in requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Makes express use the routes folder
app.use(routes);

// give server access to the react application when env is production
if (process.env.NODE_ENV === "production") {
  app.use(express.static('/client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

// Set up the app to run using PORT
app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}!`)
);