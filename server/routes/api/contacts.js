const Contacts = require("../../models/Contacts");

module.exports = (app) => {
  app.post("/api/addContact", function (req, res, next) {
    const contact = new Contacts({
      name: req.body.contactName,
      email: req.body.email,
      city: req.body.city,
      phoneNumber: req.body.phoneNumber,
      additionalInfo: req.body.additionalInfo,
    });
    contact
      .save()
      .then(() => res.json(contact))
      .catch((err) => next(err));
  });

  app.post("/api/updateContact", function (req, res, next) {
    Contacts.findByIdAndUpdate(req.body.id, {
      name: req.body.contactName,
      email: req.body.email,
      city: req.body.city,
      phoneNumber: req.body.phoneNumber,
      additionalInfo: req.body.additionalInfo,
    })
      .then((contact) => res.json(contact))
      .catch((err) => next(err));
  });

  app.get("/api/getContacts", function (req, res, next) {
    Contacts.find()
      .sort({ timeStamp: -1 })
      .exec()
      .then((contact) => res.json(contact))
      .catch((err) => next(err));
  });
};
