project output video :- "https://drive.google.com/file/d/11cS9lFXPim6V40EyetfUJcmBQn91YwHT/view?usp=sharing" ,


Tech Stack Used

1)Frontend: React, React Router, Axios, Vite, Bootstrap, CryptoJS

2)Backend: Node.js, Express.js, MongoDB, Mongoose, CryptoJS, CORS

3)Other Tools: Nodemon, dotenv


How Encryption is Implemented

-Password Encryption: Passwords are encrypted using AES (Advanced Encryption Standard) via the crypto-js library before storing them in the database.

-Registration: Backend encrypts the plain password before saving.

-Login: Backend decrypts the stored password and compares it with the password entered by the user.

-This ensures that plain passwords are never stored directly in the database.





