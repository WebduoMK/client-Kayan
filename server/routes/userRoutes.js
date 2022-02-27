const express = require('express');
const router = express.Router();
const models = require('../models');
const { verifyAccessToken } = require('../controllers/AuthController');
const { UserController } = require('../controllers/_index');

router.get('/users', UserController.getAll);

router.get('/users/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  models.user
    .findAll({ include: [models.account] }, { where: { id: id } })
    .then((result) => res.json(result));
});

router.get('/logged-user', verifyAccessToken, (req, res) => {
  const email = req.payload.email;
  models.user
    .findOne({
      where: { email: email },
      include: [models.account],
      attributes: {
        exclude: ['password', 'isActive'],
      },
    })
    .then((result) => res.json(result));
});

router.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  let userToDelete = await models.user.findOne({ where: { id } });
  await userToDelete.destroy();
});

module.exports = router;
