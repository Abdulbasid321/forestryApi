const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ error: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.student = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;


exports.verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // now req.admin contains { id, name, email, etc. }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


// module.exports = verifyAdminToken();