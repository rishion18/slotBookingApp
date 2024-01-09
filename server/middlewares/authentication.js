import jwt from 'jsonwebtoken';

const isLoggedIn = (req , res , next) => {
    // const {token} = req.cookies;
    let token = req.headers.authorization;
    if(token){
         token = token.split(" ")[1];
    }
    const tokenDetails = jwt.verify(token , process.env.JWT_Password);
    if(!token || !tokenDetails){
        res.status(401).send('Log in is required ! Please log in');
    }
    req.user = tokenDetails;
    next();
}

export default isLoggedIn;