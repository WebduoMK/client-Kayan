const models = require('../models');

exports.getAll = async (req, res) => {
  const model = await models.user.findAll({
    include: [models.account],
    attributes: {
      exclude: [
        'password',
        'is_admin',
        'is_active',
        'is_organization',
        'is_banned',
      ],
    },
  });
  res.json(model);
};
