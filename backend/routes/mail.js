const router = require("express").Router();
const bcrypt = require("bcrypt");
const path = require("path");
const mongoose = require("mongoose");
const accountsSchema = require("../schema/accountsSchema");
const Accounts = mongoose.model("Accounts", accountsSchema);
const sendEmail = require("./misc/sendEmail");
const findUserByEmail = require("./misc/findUserByEmail");

var DB_ID = [];
var DB_EMAIL = [];
var DB_NAME = [];

//to subject text html
router.route("/generate-password-reset-link").post(async (req, res) => {
  const index = DB_EMAIL.indexOf(req.body.email);
  if (index !== -1) {
    const email = req.body.email;
    const subject = "Password Reset Link";
    const text = ``;
    const html = `<div style="width:60%">
    <h1> Dear ${DB_NAME[index]},</h1>
    <label style="color:black">
      There was recently another request to change the password for your account. <br>
      If you requested this password change, please click on the following link to reset your password: https://sootistudio.com/reset-pass?id=${DB_ID[index]} <br>
      If clicking the link does not work, please copy and paste the URL into your browser instead.<br><br>
      OR<br><br>
      <a href="https://sootistudio.com/reset-pass?id=${DB_ID[index]}" target="_blank">Click here</a><br><br>
      If you did not make this request, you can ignore this message and your password will remain the same.<br><br>
       <p style="color:black;padding:10px 0;text-align:center;width:100%;background-color:whitesmoke">Thank you, <b>Sooti Studio</b></p>
    </label>
    </div>`;
    sendEmail(email, subject, text, html);

    res.json({
      status: "SUCCESS",
      message:
        "Email re-sent successfully. Please Check your email to proceed to the next step. Check spam section if you can't see email.",
    });
    return;
  }

  var obj = await findUserByEmail(req.body.email);
  const name = obj.name;
  if (obj === null) {
    res.json({
      status: "FAILED",
      message: "This email is not registered in our database",
    });
    return;
  }

  const id = generateRandomString(5) + Date.now();
  DB_EMAIL.push(req.body.email);
  DB_ID.push(id);
  DB_NAME.push(name);
  const email = req.body.email;
  const subject = "Password Reset Link";
  const text = "";
  // const html = `
  // <a href="https://sootistudio.com/reset-pass?id=${id}" target="_blank">Click here</a>, to reset the password of your Sooti Studio account!
  // `;
  const html = `
 <div style="width:60%">
<h1> Dear ${name},</h1>
<label style="color:black">
  There was recently a request to change the password for your account. <br>
  If you requested this password change, please click on the following link to reset your password: https://sootistudio.com/reset-pass?id=${id} <br>
  If clicking the link does not work, please copy and paste the URL into your browser instead.<br><br>
  OR<br><br>
  <a href="https://sootistudio.com/reset-pass?id=${id}" target="_blank">Click here</a><br><br>
  If you did not make this request, you can ignore this message and your password will remain the same.<br><br>
   <p style="color:black;padding:10px 0;text-align:center;width:100%;background-color:whitesmoke">Thank you, <b>Sooti Studio</b></p>
</label>
</div>
  `;
  const bool = await sendEmail(email, subject, text, html);

  bool === true
    ? res.json({
        status: "SUCCESS",
        message:
          "Email sent successfully. Please Check your email to proceed to the next step. Check spam section if you can't see email.",
      })
    : res.json({
        status: "FAILED",
        message: "Something went wrong! Are you sure your email is correct?",
      });
});

router.route("/reset-check-id").post((req, res) => {
  const i = DB_ID.indexOf(req.body.id);
  if (i === -1) res.json(false);
  else res.json(true);
});

router.route("/reset-pass-update-pass").post((req, res) => {
  const i = DB_ID.indexOf(req.body.id);
  const email = DB_EMAIL[i];
  Accounts.findOne({ email }, (err, doc) => {
    if (err) {
      res.json({ status: false });
      return;
    }
    if (doc === null) {
      res.json({ status: false });
      return;
    }
    doc.password = bcrypt.hashSync(req.body.pass, 10);
    doc.markModified("password");
    doc.save();

    DB_EMAIL.splice(i, 1);
    DB_ID.splice(i, 1);
    DB_NAME.splice(i, 1);
    res.json({ status: true });
  });
});

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = { router };
