const isAutehnticated = (req, res, next) => {
  if (req.session.user) {
    console.log('isAutehnticated');
    next();
  } else {
    console.log('Unauthorized');
    res.status(401).send('Unauthorized');
  }
}

module.exports = { isAutehnticated };