const jwt = require('jsonwebtoken');

// Authentication middleware
const authenticateToken = (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (err) {
    return null;
  }
};

// Vercel serverless function
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, url } = req;

  try {
    // Route handling
    if (method === 'GET' && url.includes('/api/profile')) {
      return await handleProfile(req, res);
    } else {
      res.status(404).json({ message: 'Endpoint not found' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Profile handler
async function handleProfile(req, res) {
  const user = authenticateToken(req);
  
  if (!user) {
    return res.status(401).json({ message: 'Access token required' });
  }

  res.json({ message: 'Protected route accessed', user });
} 