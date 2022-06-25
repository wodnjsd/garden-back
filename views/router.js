// ? Applications routes will live in here.
import express from "express"
import reviewController from "../controllers/reviewController.js"
import controller from "../controllers/controller.js" 
import userController from "../controllers/userController.js"
import secureRoute from "../middleware/secureRoute.js"
import cartController from "../controllers/cartController.js"

const router = express.Router()

router.route("/plants")
  .get(controller.getPlants)
  .post(secureRoute, controller.createPlant)

router.route("/plants/:plantId")
  .get(controller.getSinglePlant)
  .delete(secureRoute, controller.removePlant)
  .put(secureRoute, controller.updatePlant)
  .post(secureRoute, cartController.createCart)

router.route("/plants/:plantId/reviews")
  .post(secureRoute, reviewController.createReview)

// router.route("/plants/:userId")
//   .get(userController.cartPlant)
  
//   .delete(userController.deletePlant)


router.route("/register")
  .post(userController.register)

router.route("/login")
  .post(userController.login)


export default router