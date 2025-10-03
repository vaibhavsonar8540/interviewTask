import CryptoJS from "crypto-js";

const FRONTEND_KEY = "vaibhav"; 

export const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, FRONTEND_KEY).toString();
};

export const decryptPassword = (encrypted) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, FRONTEND_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
