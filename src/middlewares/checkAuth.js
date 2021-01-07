import {verifyToken} from '../utils/jwtToken';

const checkAuth = {
  verifyUser: (req, res, next) => {
    const token = req.headers.token;
    if(!token){
      return res.status(400).send({message: 'no token provided'});
    }
    try {
      const user = verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).send({message: 'invalid token'})
    }
  }
}

export default checkAuth;