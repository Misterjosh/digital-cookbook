const path = require("path");
const router = require("express").Router();
const userRoutes = require('./user');
const recipeRoutes = require('./recipe');
// add recipe later

router.use('/user', userRoutes);

router.use('/recipe', recipeRoutes);

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });

  module.exports = router;