const express = require("express");
const {
  signUp,
  logIn,
  test,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} = require("../controllers/authControllers");
const { requireAuth, adminAuth } = require("../middleware/requireAuth");

//router  object
const router = express.Router();

//routing

//REGISTER || METHOD POST
router.post("/register", signUp);

//LOGIN || METHOD POST
router.post("/login", logIn);

router.get("/test", requireAuth, adminAuth, test);

//protected route auth
router.get("/user-auth", requireAuth, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route auth Admin
router.get("/admin-auth", requireAuth, adminAuth, (req, res) => {
  res.status(200).send({ ok: true });
});

//orders user
router.get("/orders", requireAuth, getOrdersController);

//All orders admin
router.get("/all-orders", requireAuth, adminAuth, getAllOrdersController);

// orders admin status update
router.put(
  "/order-status/:orderId",
  requireAuth,
  adminAuth,
  orderStatusController
);

module.exports = router;
