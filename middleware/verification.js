const jwt = require('jsonwebtoken')

exports.verify = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken
      next()
    }
    throw error
  } catch (e) {
    return res.status(403).send(`YOU'RE UNAUTHORIZED TO THIS PAGE!`)
  }
}
