const User = require('../models/user_model')

exports.getAllUsers = async (req, res) => {
      try {

            const users = await User.find()
            res.status(200).json({
                  users
            })
      }
      catch (err) {
            res.status(401).json({
                  message: err.message
            })
      }
}

exports.getUser = async (req, res) => {
      try {
            const user = await User.findById(req.params.id)
            res.status(200).json(user)
      } catch (err) {
            res.status(401).json({
                  message: err.message
            })
      }
}

exports.updateUser = async (req, res) => {
      try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                  new: true,
                  runValidators: true
            })
            res.status(200).json({
                  message: `${user.email} has been updated`,
                  user
            })
      } catch (err) {
            res.status(401).json(err.message)
      }
}
exports.deleteUser = async (req, res) => {
      try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json({
                  message: `${user.email} has been deleted`
            })
      } catch (err) {
            res.status(401).json(err.message)
      }
}