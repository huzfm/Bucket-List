const Destination = require('../models/form_model')
const destinationSchema = require('../validations/destinations.schema')

exports.destination = async (req, res) => {
      try {
            const validated_data = destinationSchema.parse(req.body)
            const destination = await Destination.create(validated_data)
            res.status(201).json({
                  message: "Destination added successfully",
                  destination
            })
      } catch (err) {
            res.status(401).json({
                  message: err.message,

            })
      }
}
