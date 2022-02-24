import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

// importing models
import User from "../../models/User.js";
// importing validations
import {
  errorMiddleware,
  registrationRules,
  loginRules,
} from "../../middlewares/validations/index.js";
// importing helpers
import generateToken from "../../helpers/generateToken.js";
import verifyToken from "../../middlewares/auth/index.js";

/*
      API EndPoint : /api/users/register
      Method : POST
      Payload : Request.Body - name,email,password
      Access Type : Public
      Validations : 
          a) Check Valid Email,name and password
      Description : User Registration 
*/
router.post(
  "/register",
  registrationRules(),
  errorMiddleware,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const duplicate = await User.findOne({ email });
      if (duplicate) {
        return res.status(401).json({ msg: "User already exists" });
      }
      const newUser = new User(req.body);
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

/*
      API EndPoint : /api/users/login
      Method : POST
      Payload : Request.Body - email,password
      Access Type : Public
      Validations : 
          a) Check Valid Email and verify if password is the same
      Description : User Login 
*/
router.post("/login", loginRules(), errorMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid Login credentials" });
    }
    let correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      return res.status(401).json({ msg: "Invalid Login credentials" });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /api/users/profile
      Method : GET
      Payload : Request.headers - xauthkey
      Access Type : Private
      Validations : 
          a) Check if user exists from the data
      Description :get User profile
*/
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
    return res.status(404).json({ msg: "User not found " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

/*
      API EndPoint : /api/users
      Method : GET
      Payload : Extract _id from access token (x-auth-token from headers)
      Access Type : Private/Admin
      Description : Get All the Users of LifeStyle Store 
*/
// response format array of users
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Permission Denied!! Missing Admin Access" });
    }
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

/*
      API EndPoint : /api/users/profile
      Method : PUT
      Payload : Extract _id from access token (x-auth-token from headers)
      Access Type : Private/User
      Description : User Update Profile  
*/
// response format same as register route (no validation rules needed)

router.put("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body);
    if (!user) {
      return res.status(401).json({ msg: "Can't find user" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /api/users/:id
      Method : DELETE
      Payload : Extract _id from access token (x-auth-token from headers) and req.params.id
      Access Type : Private/Admin
      Description : Delete User 
*/
// response format : User Deleted Succesfully

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const admin = await User.findById(req.user._id);
    if (!admin.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Permission denied! Missing Admin Access" });
    }
    const deleted = await User.findOneAndDelete({ _id: req.params.id });

    // if (!deleted) {
    //   return res.status(404).json({ msg: "User Not Found" }); // not working properly
    // }
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /api/users/:id
      Method : GET
      Payload : Extract _id from access token (x-auth-token from headers) and req.params.id
      Access Type : Private/Admin
      Description : Get User Details by ID from Admin
*/
// response format : user object

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const userAdmin = await User.findById(req.user._id);
    if (!userAdmin.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Permission Denied. Missing Admin Access" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /api/users/:id
      Method : PUT
      Payload : Extract _id from access token (x-auth-token from headers) and req.params.id
      Access Type : Private/Admin
      Description : Update User Details by ID from Admin
*/
// response format : user object

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const userAdmin = await User.findById(req.user._id);
    if (!userAdmin.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Permission Denied. Missing Admin Access" });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    // if (!user) {
    //   return res.status(404).json({ msg: "User Not Found" });
    // }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
