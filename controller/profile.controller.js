const { User } = require("../models");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("profile", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password, image } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.image = image || user.image;

    await user.save();

    res.redirect(`/profile/${userId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
