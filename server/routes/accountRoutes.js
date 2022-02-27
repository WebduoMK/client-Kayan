const express = require('express');
const { verifyAccessToken } = require('../controllers/AuthController');
const router = express.Router();
const models = require('../models');

router.get('/accounts', (req, res) => {
  models.account.findAll().then((result) => res.json(result));
});

// router.get('/accounts/:id', (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   Account.findAll({ where: { id: id } }).then((result) => res.json(result));
// });

router.get('/accounts/:userId', (req, res) => {
  const userId = req.params.userId;
  models.account
    .findAll({ where: { userid: userId } })
    .then((result) => res.json(result));
});

// create account

router.post('/accounts', verifyAccessToken, async (req, res) => {
  const email = req.payload.email;

  const user = models.user.findOne({ where: { email: email } });
});

router.post('/accounts/:userId', async (req, res) => {
  const userId = req.params.userId;
  const accountName = req.body.accountName;

  const balanceToAdd = req.body.balanceToAdd;

  const account = await models.account.findOne({
    where: { userId: userId, accountName: accountName },
  });
  if (!account) {
    return res.json({ message: 'Account was not found' });
  }
  console.log(balanceToAdd);

  if (account.accountBalance == null) {
    account.update({ accountBalance: balanceToAdd });
    return res.json({ message: 'Successfully added balance to account!' });
  }

  const newBalance = account.accountBalance.push(balanceToAdd);

  account.update({ accountBalance: newBalance });

  return res.json({ message: 'Successfully added balance to account!' });
});

module.exports = router;
