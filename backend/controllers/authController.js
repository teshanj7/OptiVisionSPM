const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const Fullname = req.body.Fullname;
    const Email = req.body.Email;
    const Address = req.body.Address;
    const TelephoneNumber = Number(req.body.TelephoneNumber);
    const UserType = req.body.UserType;
    const Gender = req.body.Gender;
    const Username = req.body.Username;
    const Password = req.body.Password;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new User({
      Fullname,
      Email,
      Address,
      TelephoneNumber,
      UserType,
      Gender,
      Username,
      Password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "User registration successful" });
  } catch (error) {
    res.status(500).json({ error: "User registration failed" });
  }
};

const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(401).json({ error: 'User authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(Password, user.Password);

        if (passwordMatch) {
            const token = jwt.sign({ email: user.Email }, 'secret_key');
            return res.json({ token, user });
        } else {
            return res.status(401).json({ error: 'User authentication failed' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'User authentication failed' });
    }
};

module.exports = {
  registerUser,
  loginUser
};


module.exports = {
  registerUser,
  loginUser
};
