const hello = () => {
  console.log("hello world!");
};

// Using ChatGPT suggestion
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function toBase62(n) {
  if (n === 0n) return BASE62[0];
  let s = "";
  while (n > 0n) {
    s = BASE62[n % 62n] + s;
    n = n / 62n;
  }
  return s;
}

function fromBase62(s) {
  return s.split("").reduce((acc, c) => acc * 62n + BigInt(BASE62.indexOf(c)), 0n);
}

function encryptPhone(phone, key) {
  const num = BigInt(phone.replace(/^0+/, ""));
  const xored = num ^ BigInt(key);
  return toBase62(xored);
}

function decryptPhone(encoded, key) {
  const xored = fromBase62(encoded);
  const num = xored ^ BigInt(key);
  return num.toString(); // no leading 0s
}

const inputProcessor = () => {
  const enc = document.getElementById("encrypted");
  const dec = document.getElementById("decrypted");
  const x = document.getElementById("phnumber").value;

  // encryption
  // let encr = window.btoa(x);
  // let decr = window.atob(encr);
  let encr = encryptPhone(x, 24);
  let decr = decryptPhone(encr, 24);

  enc.innerHTML = encr;
  dec.innerHTML = decr;
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// https://example.com/path/to/page?color=purple&size=M&size=L

// urlParams.get('color')     // purple
// urlParams.getAll('size')   // ['M', 'L']
console.log(urlParams.get("c"));
