const User = require("../model/user")
const inventory = require("../model/inventory")
const sales = require("../model/sales")
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const crypto = require('crypto');

exports.register = async (req, res, next) => {
    const { email, phone, password } = req.body
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    if (!(email && phone && password)) {
        res.status(400).send("All input is required");
      }
    try {
      await User.create({ 
        email,
        phone,
        password,
      }).then(user =>
        res.status(200).json({
          message: "User successfully created",
          user,
        })
      )
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: err.message,
      })
    }
  }


exports.login = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  // it checks if phone and password is provided
   if (!email || !password) {
     return res.status(400).json({
       message: "All inputs are required",
      })
    }

  try {
    const user = await User.findOne({ email })
     if (!user) {
      res.status(200).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
      })
    }
   } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}


exports.forgot = async (req, res, next) => {
  var email = req.body.email;
  var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Email address not found');
     }
     
  try {
    const otp = otpGenerator.generate(4, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password',
      text: `Your OTP for resetting password is ${otp}. It will expire in 1 hour.`
    };
    await transporter.sendMail(mailOptions);
    res.send('OTP sent to your email');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};



exports.verify = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Email address not found');
    }
    if (otp !== user.resetPasswordToken) {
      return res.status(400).send('Invalid OTP');
    }
    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).send('OTP has expired');
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.send('Password reset successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};



// here, we configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'pass'
  }
});

// route to send verification email 
exports.emailVerification = async (req, res, next) => {
  const email = req.body.email;
  const token = crypto.randomBytes(20).toString('hex');

  // create verification URL
  const verificationUrl = `http://localhost:3000/verifyEmail?email=${email}&token=${token}`;

  // send verification email
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Verify your email',
    html: `Please click <a href="${verificationUrl}">here</a> to verify your email.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending verification email.');
    } else {
      console.log('Verification email sent: ' + info.response);
      res.send('Verification email sent.');
    }
  });
};

// route to handle email verification
exports.verifyEmail = async (req, res, next) => {
  const email = req.query.email;
  const token = req.query.token;

  // TODO: check if email and token are valid
  // email and token are valid, mark email as verified
  // TODO: update database to mark email as verified

  res.send('Email verified.');
};

//creating inventory
exports.inventory = async (req, res, next) => {
  let { productName, category, brand, costPrice, sellingPrice, discount, quantity, unit, supplier, barcode } = req.body
  if (!(productName && category && brand && costPrice && sellingPrice && discount && quantity && unit && supplier && barcode)) {
    res.status(400).send("All input is required")
  }
  try {
    await inventory.create({ 
      productName, category, brand, costPrice, sellingPrice, discount, quantity, unit, supplier, barcode
    }).then(user =>
      res.status(200).json({
        message: "Product entered successfully",
        user,
      })
    )
  } catch (err) {
    res.status(401).json({
      message: "Product not successful entered",
      error: err.message,
    })
  }
}

//sales
exports.sales = async (req, res, next) => {
  let { productName, category, brand, sellingPrice, discount, quantity, unit, total, staff} = req.body
  if (!(productName && category && brand && sellingPrice && discount && quantity && unit && total && staff)) {
    res.status(400).send("All input is required")
  }
  try {
    await sales.create({ 
      productName, category, brand, sellingPrice, discount, quantity, unit, total, staff
    }).then(user =>
      res.status(200).json({
        message: "Transaction Approved",
        user,
      })
    )
  } catch (err) {
    res.status(401).json({
      message: "Transaction not approved",
      error: err.message,
    })
  }
}

//Profile
exports.sales = async (req, res, next) => {
  let { productName, category, brand, sellingPrice, discount, quantity, unit, total, staff} = req.body
  if (!(productName && category && brand && sellingPrice && discount && quantity && unit && total && staff)) {
    res.status(400).send("All input is required")
  }
  try {
    await sales.create({ 
      productName, category, brand, sellingPrice, discount, quantity, unit, total, staff
    }).then(user =>
      res.status(200).json({
        message: "Transaction Approved",
        user,
      })
    )
  } catch (err) {
    res.status(401).json({
      message: "Transaction not approved",
      error: err.message,
    })
  }
}
