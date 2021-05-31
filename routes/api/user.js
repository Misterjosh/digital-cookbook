const router = require("express").Router();
const usersController = require('../../controllers/usersController');

router.route("/")
    .post(usersController.create)
    .get(usersController.findAll);

router.route("/:id")
    .get(usersController.findById)
    .put(usersController.update)
    .delete(usersController.delete);

router.route("/no-pass/:id")
    .put(usersController.updateNoPass)

router.route("/login")
    .post(usersController.login);

module.exports = router;