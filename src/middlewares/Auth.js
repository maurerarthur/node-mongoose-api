require('dotenv').config()

module.exports = {
    async jwt(req, res, next) {
        const token = req.headers.authorization

        if(!token) {
            return res.status(401).json({ message: 'No JWT token was found in the request header' })
        }

        try {
            const decoded = jwt.decode(token, process.env.JWT_SECRET)

            if(decoded) {
                return next()
            } else {
                return res.status(401).json({ message: 'JWT token is invalid' })
            }
        } catch(e) {
            return res.status(401).json({ message: 'Error on authentication' })
        }
    }
}