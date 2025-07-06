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
    if (method === 'GET' && url.includes('/api/health')) {
      return await handleHealth(req, res);
    } else {
      res.status(404).json({ message: 'Endpoint not found' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Health check handler
async function handleHealth(req, res) {
  res.json({ status: 'OK', message: 'Server is running' });
} 