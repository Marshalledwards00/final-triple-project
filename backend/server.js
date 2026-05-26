const app = require('./app')
const config = require('./config')

app.listen(config.port, () => {
  console.log(`News Explorer API is running on port ${config.port}`)
})
