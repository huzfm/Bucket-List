const { z } = require('zod');
const destinationSchema = z.object({
      Destination_name: z.string({ message: 'A destination must have a name' })
})

module.exports = destinationSchema