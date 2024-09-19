const { User, Article } = require("../models");

exports.getProfile = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/login");
    }
    const user = await User.findByPk(req.session.userId);

    const articles = await Article.findAll({
      where: { userId: req.session.userId },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log(
      "useeeeeeeeeeeeeeeeer",
      user,
      "articlssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
      articles
    );

    res.render("profilePage", { user, articles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.editProfile = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/login");
    }
    const user = await User.findByPk(req.session.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("editProfilePage", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/login");
    }
    const { firstName, lastName, email, userName } = req.body;

    const user = await User.findByPk(req.session.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    console.log("req.bodyyyyyy", req.body);

    // user.firstName = firstName || user.firstName;
    // user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.username = userName || user.userName;
    // user.bio = bio || user.bio;

    // Handle profile picture update if implemented
    // if (req.file) {
    //   user.profilePicture = req.file.filename;
    // }

    await user.save();

    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
