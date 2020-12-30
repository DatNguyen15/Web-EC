const express = require("express");
const router = express.Router();

const {
  requireSignin,
  isAdmin,
  isAuth,
  isAdminToken,
} = require("../controllers/auth");
const {
  userById,
  read,
  update,
  list,
  purchaseHistory,
  updateActive,
} = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.get("/users", list);
router.put("/user/:userId", requireSignin, isAuth, update);
router.put("/user/active/:userId", requireSignin, isAdminToken, updateActive);

router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);
router.param("userId", userById);

module.exports = router;
