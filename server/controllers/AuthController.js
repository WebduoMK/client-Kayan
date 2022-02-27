const User = require('../models').user;
const PasswordResetRequest = require('../models').password_reset_request;
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv');
const { transporter } = require('../helpers/mail');
const _ = require('lodash');
const models = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.login = async (req, res) => {
  try {
    const foundUser = await User.findOne({
      where: {
        [Op.and]: [{ email: req.body.email }, { isActive: true }],
      },
    });
    if (!foundUser) {
      return res.status(401).json({
        message:
          'Invalid email or password, Please try again. Or user is not active',
      });
    }

    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (!passwordsMatch) {
      return res.status(401).json({
        message: 'Invalid email or password, please try again',
      });
    }

    const accessToken = generateToken(
      { email: req.body.email },
      process.env.ACCESS_TOKEN_SECRET,
      '1h'
    );

    const refreshToken = generateToken(
      { email: req.body.email },
      process.env.REFRESH_TOKEN_SECRET,
      '24h'
    );

    return res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        accounts: foundUser.accounts,
      },
      message: 'You are logged in',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
  try {
    const foundUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (foundUser) {
      return res
        .status(422)
        .json({ message: 'A user with that email already exists' });
    }

    // Validate res.body

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = User.build({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      dob: req.body.dob,
      ssn: req.body.ssn,
      cellPhone: req.body.cellPhone,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await newUser.save();

    // Mail verification

    jwt.sign(
      { user: _.pick(newUser, 'id') },

      process.env.EMAIL_SECRET,
      (err, emailToken) => {
        // const url = `http://localhost:${process.env.NODE_PORT}/api/confirm/${emailToken}`;
        const url = `${process.env.CORS_ORIGIN}/successfully-verified/${emailToken}`;
        transporter.sendMail({
          from: '"Kayan" <kayan_contact@kayan.com>',
          to: `${req.body.email}`,
          subject: 'Successfully registered',
          html: `<h1>You have successfully registered!</h1>
          <p>Confirm your email here <a href="${url}">${url}</a></p>`,
        });
      }
    );

    // Mail verification end

    return res.status(200).json({ message: 'Registration successful' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const {
      user: { id },
    } = jwt.verify(req.params.emailToken, process.env.EMAIL_SECRET);
    await User.update({ isActive: true }, { where: { id } });
    return res.status(200).json({ message: 'User successfully verified' });
  } catch (e) {
    console.log(e);
  }
};

exports.requestPasswordReset = async (req, res) => {
  const { email, redirectUrl } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    res.json({ message: `User with email ${email} doesn't exist` });
  }
  sendResetEmail(user.id, user.email, redirectUrl, res);
};

const sendResetEmail = async (id, email, redirectUrl, res) => {
  const resetString = uuidv4() + id;

  let passwordResetRequestToDelete = await PasswordResetRequest.findOne({
    where: { userId: id },
  });
  if (passwordResetRequestToDelete) {
    await passwordResetRequestToDelete.destroy();
  }

  const url = `${redirectUrl}/reset-password/${id}/${resetString}`;

  const mailOptions = {
    from: '"Kayan" <kayan_contact@kayan.com>',
    to: `${email}`,
    subject: 'Password Reset',
    html: `<h1>Reset your password!</h1>
    <p>Confirm your email <a href="${url}">here</a></p>`,
  };

  const saltRounds = 10;
  bcrypt
    .hash(resetString, saltRounds)
    .then(async (hashedResetString) => {
      const newPasswordResetRequest = PasswordResetRequest.build({
        userId: id,
        resetString: hashedResetString,
        createdAt: Date.now(),
        expiresIn: Date.now() + 3600000,
      });
      await newPasswordResetRequest.save();
      transporter
        .sendMail(mailOptions)
        .then(res.status(200).json({ message: 'Password reset mail sent!' }));
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: 'An error while hashing the password reset data occured!',
      });
    });
};

exports.resetPassword = async (req, res) => {
  try {
    let { userId, resetString, newPassword } = req.body;
    const passwordResetRequest = await PasswordResetRequest.findOne({
      where: { userId: userId },
    });

    if (!passwordResetRequest) {
      return res.json({ message: "Password reset request doesn't exist!" });
    }

    const expiresIn = passwordResetRequest.expiresIn;

    if (expiresIn < Date.now()) {
      await passwordResetRequest.destroy();
      res.status(410).json({ message: 'Password reset link has expired!' });
    }

    const hashedResetString = passwordResetRequest.resetString;
    bcrypt.compare(resetString, hashedResetString).then((result) => {
      if (result) {
        const saltRounds = 10;
        bcrypt
          .hash(newPassword, saltRounds)
          .then(async (hashedNewPassword) => {
            await User.update(
              { password: hashedNewPassword },
              { where: { id: userId } }
            );
            await passwordResetRequest.destroy();
            res
              .status(200)
              .json({ message: 'Password has been reset successfully' });
          })
          .catch((error) => {
            res.json({
              message: 'An error has occured while hashing new password',
            });
          });
      } else {
        res.json({ message: 'Invalid password reset details entered' });
      }
    });
  } catch (e) {
    res.json({ message: 'An error has occured' });
  }
};

exports.verifyAccessToken = async (req, res, next) => {
  if (!req.headers['authorization'])
    return next({ status: 401, message: 'Unauthorized!' });
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return next({ status: 401, message: 'Unauthorized' });
    }
    req.payload = payload;
    next();
  });
};

exports.changePassword = async (req, res) => {
  const email = req.payload.email;
  const user = await models.user.findOne({ where: { email: email } });

  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  const currentPassword = req.body.currentPassword;

  console.log('current ' + currentPassword);
  console.log('password ' + user.password);

  bcrypt.compare(currentPassword, user.password).then((res, err) => {
    if (res) {
      console.log(res);
    }
    if (err) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }
  });

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Bad input' });
  }

  await models.user.update(
    { password: await bcrypt.hash(newPassword, 10) },
    { where: { email: email } }
  );

  res
    .status(200)
    .json({ message: 'The password has been updated successfully' });
};

function generateToken(payload, secret, expiresIn = '1h') {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
}
