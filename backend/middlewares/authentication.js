const jwt = require('jsonwebtoken');

// Verify if user is authenticated
const verifyAuth = (req, res, next) => {
  // Receive token
  const token = req.get('token');

  // Verify token
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid User',
      });
    }

    // Read token and Return user token to read in middleware
    req.user = decoded.data;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  // Receive user role
  const role = req.user.role;

  // Verify role and continue
  if (role === 'ADMIN') {
    next();
  } else {
    return res.status(401).json({
      message: 'Invalid User',
    });
  }
};

module.exports = { verifyAuth, verifyAdmin };
