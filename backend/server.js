const app = require('./app');
const PORT = process.env.PORT || 8080; // Use the environment variable PORT or default to 8080  
app.listen(PORT, () => {
      console.log(`App running on Port - ${PORT}`);
})          