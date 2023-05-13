require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI
const SESSION_SECRET = process.env.SESSION_SECRET;

module.exports = {
    MONGO_URI,
    PORT,
    SESSION_SECRET
}