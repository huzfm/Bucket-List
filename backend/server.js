const { default: mongoose } = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv')
dotenv.config({
      path: '.env'
})
const PORT = process.env.PORT || 8080; // Use the environment variable PORT or default to 8080  
mongoose.connect(process.env.MONGO_URL).
      then(() => {
            console.log("Database connected sucessfully");
      })
      .catch((err) => {
            console.log(err.message)
      })
app.listen(PORT, () => {
      console.log(`App running on Port - ${PORT}`);
})          