const router = require("express").Router();

const {
    getAllUsers,
    updateUser,
    deleteUser,
    viewUserDetails,
    searchUsers
} = require("../controllers/userController")

// Get all the users
router.get("/", getAllUsers)

// Update a user
router.put("/update/:id", updateUser)

// Delete a single user 
router.delete("/delete/:id", deleteUser)

// Get details of a single user
router.get("/get/:id", viewUserDetails)

// Search Users
router.get("/search/:key", searchUsers)

module.exports = router;