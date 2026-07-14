const usersRepo = require('../repositories/usersRepo')
const JWT_SECRET = process.env.JWT_SECRET;


const checkExists = (filter) => {
  return usersRepo.getAllUsers(filter)
}


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { checkExists, authenticateJWT }