const jwt = require("jsonwebtoken");

module.exports = (req, res, nest) => {
    try{
        const token = req.headers.ahutorization.split(" ")[1];
        const decoded = jwt.verify(req.body,token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }catch (err) {
        return res.status(401);
    }
}