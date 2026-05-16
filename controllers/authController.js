exports.loginView = (req, res) => {
  res.render('auth/login');
};

exports.registerView = (req, res) => {
  res.render('auth/register');
};

exports.register = async (req, res) => {
  // placeholder: create user
  res.redirect('/auth/login');
};

exports.login = async (req, res) => {
  // placeholder: authenticate
  res.redirect('/');
};

exports.logout = (req, res) => {
  // placeholder: destroy session/token
  res.redirect('/');
};
