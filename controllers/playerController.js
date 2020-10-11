const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.get = async (req, res) => {
  try {
    const playerFindAll = await db.Player.findAll()
    res.send(playerFindAll)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getbyid = async (req, res) => {
  try {
    const playerFind = await db.Player.findOne({
      where: {
        id: req.params.id,
      },
    })
    res.send(playerFind)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.register = async (req, res) => {
  try {
    const salt = await bcrypt.genSaltSync(10)
    const hash = await bcrypt.hashSync(req.body.password, salt)

    const playerNew = await db.Player.create({
      id: uuidv4(),
      username: req.body.username,
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    res.render('register-success')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body

    const playerFind = await db.Player.findOne({
      where: {
        username,
      },
    })

    if (!playerFind) {
      res.status(404).send('Email tidak terdaftar')
    }

    passwordCheck = await bcrypt.compare(password, playerFind.password)

    if (!passwordCheck) {
      res.status(403).send('Password salah gan')
    }

    const token = jwt.sign({ id: playerFind.id }, process.env.SECRET_JWT_TOKEN)
    playerFind.token = token

    await playerFind.save()

    console.log(token)
    // res.send('Sukses gan!')
    res.render('login-success', { token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.put = async (req, res) => {
  try {
    const playerEdit = await db.Player.findOne({
      where: {
        id: req.params.id,
      },
    })

    if (!playerEdit) {
      res.status(404).json({ message: 'Not found!' })
    }

    playerEdit.username = req.body.username || playerEdit.username

    if (req.body.password !== undefined) {
      playerEdit.password = req.body.password || playerEdit.password

      const salt = await bcrypt.genSaltSync(10)
      const hash = await bcrypt.hashSync(req.body.password, salt)

      playerEdit.password = hash
    }

    await playerEdit.save()

    res.send(playerEdit)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.delete = async (req, res) => {
  try {
    const playerDelete = await db.Player.findOne({
      where: {
        id: req.params.id,
      },
    })

    if (!playerDelete) {
      res.status(404).json({ message: 'Not found!' })
    }

    playerDelete.destroy()
    res.json({ msg: 'Successfully deleted!' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
