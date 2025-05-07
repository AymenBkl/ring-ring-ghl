function apiKeyAuth(req, res, next) {
    const clientKey = req.headers['x-api-key'];
  
    if (!clientKey) {
      return res.status(401).json({ success: false, message: 'Missing API key' });
    }
  
    if (clientKey !== process.env.GHL_X_API_KEY) {
      return res.status(403).json({ success: false, message: 'Invalid API key' });
    }
  
    next(); // All good, proceed
  }
  
module.exports = {apiKeyAuth};