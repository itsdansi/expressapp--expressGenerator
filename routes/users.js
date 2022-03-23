const express = require("express");
const router = express.Router();
const User = require("./../models/usersModel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find()
    .then((users) => {
      res.render("users", { title: "User list", users });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Register new user
router
  .route("/register")
  .get((req, res) => {
    res.render("users/addUsers", { title: "Add new user" });
  })

  .post(async (req, res) => {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    };

    const duplicateEmail = await User.find({ email: userData.email });
    if (duplicateEmail.length > 0) {
      console.log("The email you provided is already in use.");
      return res.redirect("/users/register");
    }

    const newUser = new User(userData);
    newUser
      .save()
      .then((user) => {
        res.redirect("/users");
      })
      .catch((err) => {
        res.redirect("/users/register");
      });
  });

router
  .route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
    User.findById(id)
      .then((user) => {
        res.render("users/editUsers", { title: "Edit User", user });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .put((req, res) => {
    const id = req.params.id;

    User.findById(id).then((user) => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.age = req.body.age;
      user
        .save()
        .then((user) => {
          res.redirect("/users");
        })
        .catch((err) => {
          res.redirect(`/users/edit/${id}`);
        });
    });
  });

// Delete user
router.route("/delete/:id").delete((req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((user) => {
      console.log(`The user ${user.username} was deleted succesfully.`);
      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
