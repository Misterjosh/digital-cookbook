const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection through Mongoose
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/digital_cookbook",
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  );

// Telling express to work with JSON objects in requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the app to run using PORT
app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}!`)
);