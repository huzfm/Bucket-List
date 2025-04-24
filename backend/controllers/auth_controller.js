const bcrypt = require('bcrypt')
const User = require('../models/user_model')
const userSchema = require('../validations/user.schema')
exports.signup = async (req, res) => {
      try {
            const validated_data = userSchema.parse(req.body) // Zod validation
            const { email, password } = validated_data
            const user = await User.create({ email, password });
            res.status(200).json({
                  message: "user created successfully",
                  user
            })
      }
      catch (err) {
            if (err.name === 'ZodError') {
                  return res.status(400).json({
                        message: "Validation failed",
                        errors: err.errors
                  })
            }
            else if (err.code === 11000) {
                  res.status(400).json({
                        message: 'Email already exists',
                        err: "email in use"
                  })
            }
            res.status(401).json({
                  message: "FAILED",
                  error: err
            })
      }
}
exports.login = async (req, res) => {

      try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                  return res.status(401).json({
                        message: 'Invalid Email'
                  })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                  return res.status(401).json({
                        message: 'Incorrect Password'
                  })
            }
            res.status(201).json({
                  message: 'Logged in sucessfully',
            })

      }
      catch (err) {
            res.status(401).json({
                  message: err.message
            })
      }

}