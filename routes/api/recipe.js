const router = require('express').Router();
const recipesController = require('../../controllers/recipesController');

router.route("/")
    .post(recipesController.create)
    .get(recipesController.findAll);

router.route("/:id")
    .get(recipesController.findById)
    .put(recipesController.update)
    .delete(recipesController.delete);

router.route("/my-recipes/:id")
    .get(recipesController.findAllByAuthor);

module.exports = router;