const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const passport = require('passport');
const session = require('express-session');



router.get('/', (req, res) => {
  if (req.session.user) {
    res.send('<p>Hello! Welcome to Memorize Quotes API </p>' +
      '<br> <a href="/api-docs">API Documentation</a>' +
      '<br> Logged in as: ' + req.session.user.username +
      '<br> <a href="/logout">Logout</a>');
  } else {
    res.send('<p>Hello! Welcome to Memorize Quotes API </p>' +
      '<br> <a href="/api-docs">API Documentation</a>' +
      '<br> <a href="/auth/github">Login with GitHub</a>');
  }
});

router.get('/auth/github', passport.authenticate('github'));
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


router.get('/auth/github/callback', passport.authenticate('github', { 
  failureRedirect: '/',
  session: false
}), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/quotes', require('./quotes.js'));
router.use('/scriptures', require('./scriptures.js'));

module.exports = router;