const router = require("express").Router();
const User=require('../models/User');
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../controller/Auth");

const {countUser}=require('../controller/user');

// Users Registeration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route
router.get(
  "/user-protectd",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

// Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-protectd",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-and-admin-protectd",
  userAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("Super admin and Admin");
  }
);

router.get("/", (req, res) => {
  User.find()
      .then((user) => res.send(user))
      .catch((err) => res.send(err));
});
//@Api http:localhost:5000/api/users/number
//@desc count user number
//@access public
router.get("/number", (req, res) => {
  User.count({role:'user'})
      .then((user) => res.json({user}))
      .catch((err) => res.send(err));
});



//@Api http:localhost:5000/api/users
//@desc Get user by id
//@access public
router.get("/:_id", (req, res) => {
  let { _id } = req.params;

  User.find({ _id })
      .then((user) => res.send(user))
      .catch((err) => res.send(err));
});



//@Api http:localhost:5000/api/user/id
//@desc Delete user by id
//@access public
router.delete("/:_id", (req, res) => {
  // console.log(req.params)
  let { _id } = req.params;
  User.findByIdAndDelete({ _id })
      .then(() => res.send({"text":"User has been deleted"}))
      .catch((err) => res.send(err));
});

//@Api http:localhost:5000/api/users/id
//@desc Update user by id
//@access public
router.put("/:_id", (req, res) => {
  let { _id } = req.params;
  User.findByIdAndUpdate({ _id }, { $set: { ...req.body } })
      .then(() => res.send({"text":"User has been updated"}))
      .catch((err) => res.send(err));
});

module.exports = router;
