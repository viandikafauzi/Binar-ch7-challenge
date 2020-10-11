exports.welcome = async (req, res) => {
  res.render('welcome')
}

exports.login = async (req, res) => {
  res.render('login')
}

exports.register = async (req, res) => {
  res.render('register')
}

exports.registersuccess = async (req, res) => {
  res.render('register-success')
}

exports.dashboard = async (req, res) => {
  res.render('dashboard')
}
