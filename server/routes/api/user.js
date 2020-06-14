const User = require("../../models/User");

module.exports = (app) => {
  app.post("/api/validateUser", (req, res, next) => {
    User.findOne({ email: req.body.email, password: req.body.password })
      .exec()
      .then((user) => res.json(user))
      .catch((err) => next(err));
  });

  app.post("/api/userCreation", function (req, res, next) {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    user
      .save()
      .then(() => res.json(user))
      .catch((err) => next(err));
  });

  app.get("/api/getUserDetails", function (req, res, next) {
    User.find({}, { passwordHash: 0, resetPassword: 0 })
      .exec()
      .then((userList) => {
        res.json(userList);
      })
      .catch((err) => {
        console.error("Error while tracking owners details :", err);
        next(err);
      });
  });
};
