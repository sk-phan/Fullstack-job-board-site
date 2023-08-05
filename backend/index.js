const logger = require('./utils/logger')
const app = require('./utils/app')
const config = require('./utils/config')
const port = 3000; // Change this to 3000

// Define your routes and middleware here

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});