const logger = require('./utils/logger')
const app = require('./utils/app')
const config = require('./utils/config')

const options = { host: "0.0.0.0:3000" }

app.listen(config.PORT, options, () => {
    logger.info(`Server running on port ${config.PORT}`)
})