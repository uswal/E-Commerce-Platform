const router = require("express").Router();
const mongoose = require("mongoose");
const sendEmail = require("./misc/sendEmail");
const newsletterSchema = require("../schema/newsletterSchema");

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

router.route("/sub").post((req, res) => {
  const email = req.body.email;

  const data = new Newsletter({ email });

  data
    .save()
    .then((res) => {
      sendEmail(
        email,
        "Sooti Studio Newsletter Subscription",
        "",
        "You are now subscribed to the Sooti Studio's newsletter."
      );
      res.json(true);
    })
    .catch((err) => {
      //console.log(err);
    });
});

module.exports = { router };
