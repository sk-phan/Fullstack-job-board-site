const jwt =  require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../model/UserModel')

//Initial login
loginRouter.post('/', async(req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }
    
    const token = jwt.sign(
        userForToken, 
        "accessSecret",
        { expiresIn: '60m' }
        )

    const refreshToken = jwt.sign(
        userForToken, 
        "refreshSecret", 
        { expiresIn: '15m'}
        );

    res
    .status(200)
    .send({ token, username: user.username, name: user.name, refreshToken })

})

//Post refresh token
loginRouter.post('/refresh', async(req, res) => {
    if (!req.body.refreshToken) {
        return res.status(401).json({ error: 'Refresh token not provided'})
    }

    try {
        // Verify the refresh token
        const decodedToken = jwt.verify(req.body.refreshToken, "refreshSecret");

        const userForToken = {
            username: decodedToken.username,
            id: decodedToken.id,
        };
        
        // Generate a new access token
        const accessToken = jwt.sign(userForToken, "accessSecret", { expiresIn: '60m' });
        
        res.json({ accessToken: accessToken });

    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid refresh token' });
    }
    })

module.exports = loginRouter