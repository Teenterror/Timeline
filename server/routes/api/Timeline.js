const TimeLine = require("../../models/TimeLine");

module.exports = (app) => {
  app.post("/api/addTimelineEvent", function (req, res, next) {
    let { year, events } = req.body;
    TimeLine.findOneAndUpdate({ year }, { $push: { events } }, { upsert: true, new: true })
      .then((timeLine) => res.json(timeLine))
      .catch((err) => next(err));
  });

  app.post("/api/updateTimelineEvent", function (req, res, next) {
    TimeLine.findByIdAndUpdate(req.body.id, {
      year: req.body.year,
      events: req.body.events,
    })
      .then((timelineEvents) => res.json(timelineEvents))
      .catch((err) => next(err));
  });

  app.get("/api/getTimeLine", function (req, res, next) {
    TimeLine.find()
      .exec()
      .then((timelineEvents) => res.json(timelineEvents))
      .catch((err) => next(err));
  });
};
