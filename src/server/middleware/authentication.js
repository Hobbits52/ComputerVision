const checkSession = function(req, res) {
  const isLoggedIn = req.session ? !!req.session.user : false;
  if (!isLoggedIn) {
  	res.status(401);
  	res.end();
  } else {
  	res.status(200);
  	res.end();
  }
};

module.exports = {
  'checkSession': checkSession
};