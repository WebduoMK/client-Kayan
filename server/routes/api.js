const router = require('express').Router();
const cors = require('cors');
const { verifyAccessToken } = require('../controllers/AuthController');
const {
  AuthController,
  UserController,
  AccountController,
} = require('../controllers/_index');

router.post('/api/login', AuthController.login);
router.post('/api/register', AuthController.register);
router.get('/api/confirm/:emailToken', AuthController.verifyUser);
router.post('/api/request-reset-password', AuthController.requestPasswordReset);
router.post('/api/reset-password', AuthController.resetPassword);
router.post(
  '/api/change-password',
  verifyAccessToken,
  AuthController.changePassword
);

router.get('/api/users', UserController.getAll);

router.get('/api/accounts/:id', AccountController.getAllForUser);

router.post(
  '/api/accounts',
  verifyAccessToken,
  AccountController.addAccountForUser
);

module.exports = router;
