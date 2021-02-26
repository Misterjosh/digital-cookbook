const router = require("express").Router();
const usersController = require('../../controllers/usersController');

router.route("/")
    .post(usersController.create)
    .get(usersController.findAll);

router.route("/:id")
    .get(usersController.findById)
    .put(usersController.update)
    .delete(usersController.delete);

module.exports = router;