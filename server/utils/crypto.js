const CryptoJS = require("crypto-js");
const SECRET_KEY = process.env.SECRET_KEY || "vaibhav";

const decryptPassword = (encrypted) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8); 
  return originalPassword;
};
