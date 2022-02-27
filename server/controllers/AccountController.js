const models = require('../models');

exports.getAllForUser = async (req, res) => {
  const model = await models.account.findAll({
    where: { userId: req.params.id },
  });
  res.json(model);
};

exports.addAccountForUser = async (req, res) => {
  const email = req.payload.email;

  const user = await models.user.findOne({ where: { email: email } });

  const userId = user.id;

  const model = await models.account.create({
    userId: userId,
    accountNumber: req.body.accountNumber,
    bank: req.body.bank,
    bankNumber: req.body.bankNumber,
    routingNumber: req.body.routingNumber,
    roth: req.body.roth,
    traditional: req.body.traditional,
  });

  console.log(model);

  res
    .status(200)
    .json({ account: model, message: 'Successfully created an account!' });
};
