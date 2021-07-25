import Cookies from "js-cookie";

var cMultiplier = 1;
var cSymbol = "₹";

function CurrencyConverter(props) {
  const currency = Cookies.get("currency");
  switch (currency) {
    case "INR":
      cMultiplier = 1;
      cSymbol = "₹";
      break;
    case "USD":
      cMultiplier = 0.014;
      cSymbol = "$";
      break;
    case "GBP":
      cMultiplier = 0.0102;
      cSymbol = "£";
      break;
    case "AED":
      cMultiplier = 0.05;
      cSymbol = "د.إ";
      break;
    default:
      cMultiplier = 1;
      cSymbol = "₹";
      break;
  }
  return priceToString(props);
}

function priceToString(raw) {
  //Excuse my shit code, ty
  var price = parseFloat((raw * cMultiplier).toFixed(2));
  price = (Math.round(price * 100) / 100).toFixed(2);
  price = String(price).split(".");
  var temp = "." + price[1];
  var temp1 = String(price[0]);
  //console.log(temp1);
  for (let z = temp1.length - 1, c = 1; z >= 0; z--, c++) {
    temp = temp1[z] + temp;
    if (c % 3 === 0 && z != 0) temp = "," + temp;
  }
  price = temp;
  price = `${cSymbol} ${price}`;

  return price;
}

export function CurrencyConverterInt(props) {
  const currency = Cookies.get("currency");
  switch (currency) {
    case "INR":
      cMultiplier = 1;
      break;
    case "USD":
      cMultiplier = 0.014;
      break;
    case "GBP":
      cMultiplier = 0.0102;
      break;
    case "AED":
      cMultiplier = 0.05;
      break;
    default:
      cMultiplier = 1;
      break;
  }
  return props * cMultiplier;
}

export function othersToRs(props) {
  const currency = Cookies.get("currency");
  switch (currency) {
    case "INR":
      cMultiplier = 1;
      break;
    case "USD":
      cMultiplier = 1000 / 14;
      break;
    case "GBP":
      cMultiplier = 10000 / 102;
      break;
    case "AED":
      cMultiplier = 100 / 5;
      break;
    default:
      cMultiplier = 1;
      break;
  }

  return Math.ceil(cMultiplier * props);
}

export default CurrencyConverter;
