const User = require("../models/user");

// Handles getting all users from the database
const getAllUsers = async (req, res) => {
  try {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handles updating a particular user
const updateUser = async (req, res) => {
  try {
    let userId = req.params.id;
    const {
      Fullname,
      Email,
      Address,
      TelephoneNumber,
      UserType,
      Gender,
      Username,
      Password,
    } = req.body;

    const updateUser = {
      Fullname,
      Email,
      Address,
      TelephoneNumber,
      UserType,
      Gender,
      Username,
      Password,
    };

    const update = await User.findByIdAndUpdate(userId, updateUser)
      .then(() => {
        res.status(200).send({ status: "User updated" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with updating data", error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handles deleting a particular user
const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;

    await User.findByIdAndDelete(userId)
      .then(() => {
        res.status(200).send({ status: "User deleted" });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Error with delete user", error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handles viewing details of a particular user
const viewUserDetails = async (req, res) => {
  try {
    let userId = req.params.id;
    const user = await User.findById(userId)
      .then((user) => {
        res.status(200).send({ status: "User fetched", user });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Error with get user", error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handles searching users
const searchUsers = async (req, res) => {
  try {
    let result = await User.find({
      $or: [
        {
          Fullname: { $regex: req.params.key },
        },
        {
          Username: { $regex: req.params.key },
        },
      ],
    });
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  viewUserDetails,
  searchUsers,
};
