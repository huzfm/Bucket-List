const mongoose = require('mongoose')
const formSchema = new mongoose.Schema({
      Destination_name: {
            type: String,
            required: [true, 'A destination must have a name']
      }

})
const Destination = mongoose.model('Destination', formSchema);
module.exports = Destination