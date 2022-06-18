// ? Applications routes will live in here.
import express from "express"
// import commentController from "../controllers/commentController.js"
import controller from "../controllers/controller.js" 
import userController from "../controllers/userController.js"
// // ! Import my secureRoute
// import secureRoute from "../middleware/secureRoute.js"

const router = express.Router()

router.route("/plants")
  .get(controller.getPlants)
  .post(controller.createPlant)

router.route("/plants/:plantId")
  .get(controller.getSinglePlant)
  .delete(controller.removePlant)
  .put(controller.updatePlant)

// router.route("/plants/:plantId/reviews")
//   .post(commentController.createComment)

router.route("/register")
  .post(userController.register)

router.route("/login")
  .post(userController.login)


export default router