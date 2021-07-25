const router = require("express").Router();
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const easyinvoice = require("easyinvoice");
const transactionSchema = require("../schema/transactionsSchema");
const accounts = require("./misc/updateAccountTransaction");
const resetCart = require("./misc/resetCart");
const subtractStocks = require("./misc/subtractStocks");
const returnItemDetails = require("./misc/returnItemDetails");
const sendEmail = require("./misc/sendEmail");
const Transaction = mongoose.model("Transaction", transactionSchema);

const razorpay = new Razorpay({
  key_id: "rzp_live_bnGPvBENloFYUh",
  key_secret: "5G42VShF3OViDy9jjG7hcPHs",
});

router.route("/return-ordered-items").post((req, res) => {
  Transaction.find({ status: "ORDERED" }).then((result) => {
    res.json(result);
  });
});
router.route("/finalize-order").post(async (req, res) => {
  await addTransactionToCollection(
    res,
    req.body.payment_id,
    req.body.order_id,
    req.body.signature,
    req.body.name,
    req.body.email,
    req.body.amount,
    req.body.itemList,
    req.body.shippingAddress,
    req.body.payment_mode,
    req.body.payment_status,
    req.body.userId,
    req.body.order_id
  );
});

router.route("/razorpay").post(async (req, res) => {
  const payment_capture = 1;
  var amount = req.body.info.amount.toFixed(2); //Sanataize upto 2decimal places
  const currency = req.body.info.currency;

  if (parseInt(amount) * 100 < 100) {
    amount = "1.00";
  }

  const options = {
    amount: parseInt(amount * 100),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  razorpay.orders.create(options);

  try {
    const response = await razorpay.orders.create(options);
    //console.log(response);
    res.json({
      id: response.id,
      currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

async function addTransactionToCollection(
  res, // for res.json
  payment_id,
  _id,
  signature,
  name,
  email,
  amount,
  item_list,
  shipping_address,
  payment_mode,
  payment_status,
  userId,
  order_id
) {
  //Garbage code - fixing my unplanned codes
  const bigData = await returnItemDetails(item_list.item_id);

  var item_price = [];
  var item_sku = [];
  var idsArray = [];

  for (let i = 0; i < bigData.length; i++) {
    idsArray.push(bigData[i]._id.toString());
  }

  for (let i = 0; i < idsArray.length; i++) {
    const idq = idsArray.indexOf(item_list.item_id[i]);
    item_price.push(bigData[idq].price);
    item_sku.push(bigData[idq].sku);
  }
  item_list.item_price = item_price;
  item_list.item_sku = item_sku;

  const newTransaction = new Transaction({
    payment_id,
    _id,
    signature,
    name,
    email,
    amount,
    item_list,
    shipping_address,
    payment_mode,
    payment_status,
  });

  newTransaction.save().then(() => {
    res.json("success");
    const someObj = {
      item_list,
      amount,
      name,
      shipping_address,
      payment_mode,
      payment_status,
      email,
      _id,
    };
    sendBillingEmail(someObj);
    console.log(`1 Order Sucessfull! via ${payment_mode}`);
    //Adding record to transaction field in account collection
    accounts.addTransactionToAccount({
      userId: userId,
      orderId: order_id,
    });
    //Reset cart
    resetCart.ResetCart(userId);
    //Subtract stock
    subtractStocks.SubtractStocks(item_list);
  });
}

router.route("/verified").post((req, res) => {
  res.json("nothing, just to avodi glitches");
  Transaction.findOne({ _id: req.body.transactionId }, (err, doc) => {
    doc.status = "VERIFIED";
    doc.markModified("status");
    doc.save();
  });
});

router.route("/cancelled").post((req, res) => {
  res.json("nothing, just to avodi glitches");
  Transaction.findOne({ _id: req.body.transactionId }, (err, doc) => {
    doc.status = "CANCELLED";
    doc.markModified("status");
    doc.save();
  });
  //TODO: Create Add Stock Function
});

router.route("/get-invoice").post(async (req, res) => {
  const _id = req.body._id;

  Transaction.findOne({ _id }, async (err, result) => {
    //console.log(result);

    const dt = new Date(result.createdAt);
    const dtstr = dt.toISOString().substring(0, 10);

    var list = [];
    const il = result.item_list;
    for (let i = 0; i < il.item_id.length; i++) {
      // var q = (il.item_price[i] * 12) / 100;
      // q = il.item_price - q;
      // q = q.toFixed(2);

      const ob = {
        quantity: il.item_quantity[i],
        description: il.item_name[i].toUpperCase(),
        tax: 0,
        price: il.item_price[i],
      };
      list.push(ob);
    }

    var data = {
      //"documentTitle": "RECEIPT", //Defaults to INVOICE
      currency: "INR",
      taxNotation: "gst", //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: "https://www.sootistudio.com/assets/images/Logo_1.png", //or base64
      //"logoExtension": "png", //only when logo is base64
      sender: {
        company: "Sooti Studio",
        address: "B-46, Sangam Vihar, New Delhi",
        zip: "110044",
        city: "Delhi",
        country: "India",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      client: {
        company: result.shipping_address.name,
        address: `${result.shipping_address.sa1}, ${result.shipping_address.sa2}, ${result.shipping_address.sa3}`,
        zip: result.shipping_address.zip.toString(),
        city: result.shipping_address.city,
        country: result.shipping_address.country,
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      invoiceNumber: result._id,
      invoiceDate: dtstr,
      products: list,
      bottomNotice: "Including 12% GST taxes",
    };

    //Create your invoice! Easy!
    await easyinvoice.createInvoice(data, function (result) {
      //The response will contain a base64 encoded PDF file
      res.json({ file: result.pdf, date: dtstr });
      //console.log("done");
    });
  });
});

function sendBillingEmail(data) {
  const email = data.email;
  const subject = `Shopping at Sooti Studio.`;
  const text = ``;
  const html = `
  Dear ${data.name}, <br>
  Thank you for your order. Once your order is shipped, the tracking details will be e-mailed to you. Meanwhile, you can check the status of your order by logging into your account.
  `;

  sendEmail(email, subject, text, html);
}
module.exports = { router };
