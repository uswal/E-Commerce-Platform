export default function firstLetterCapital(string) {
  //return string.charAt(0).toUpperCase() + string.slice(1);
  const list = string.split(" ");
  var newStr = "";
  for (let i = 0; i < list.length; i++) {
    const fC = list[i].charAt(0).toUpperCase() + list[i].slice(1);
    newStr += fC + " ";
  }
  return newStr;
}
