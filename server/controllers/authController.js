const jwt = require("jsonwebtoken");

exports.post = (req, res) => {
    jwt.verify(req.token, "notSecret", (err, decoded) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                decoded: decoded
            });
        }
    })
};

exports.login = (req, res) => {
    
    const user = {
        id: 1,
        username: "edgarftp",
        email: "edgarftp@gmail.com"
    }

    jwt.sign({user: user}, 'notSecret', (err, token) => {
        res.json({
            token: token
        });
    });
}

