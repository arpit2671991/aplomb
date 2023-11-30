import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({error: 'Token is expired!'})
  jwt.verify(token, process.env.jwt_secret, (err, user) => {
    if (err) return  res.status(401).json({error: 'Forbidden'})
    req.user = user;
    next();
  });
};