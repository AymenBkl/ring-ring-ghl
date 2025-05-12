const cors = require("cors");

const allowedOrigins = [process.env.localURL,process.env.webURL];
const allowedHosts = [process.env.Host];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || (process.env.NODE_ENV == 'development' && !origin) || true) {
      callback(null, true);
    } 
    else if (!origin || origin == undefined){
      callback(null, true);
    }
    else {
      callback(new Error('Not allowed by CORS'),false);
    }
  },
  credentials: true,
};

const customCorsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  const host = req.headers.host;
  console.log(req.headers.host,req.headers.referer,req.headers.origin,allowedHosts.includes(host),allowedHosts);
  if (origin && allowedOrigins.includes(allowedOrigin => allowedOrigin.includes(origin)) || (process.env.NODE_ENV == 'development' && !origin) || true) {
    // Cross-origin request with a valid origin
    next();
  } else if (!origin && referer && referer.startsWith(process.env.webURL)) {
    // Same-origin request validated by Referer
    next();
  } else if (!origin && allowedHosts.find(allowedHost => allowedHost.includes(host))) {
    // Same-origin request validated by Host
    next();
  } else {
    res.status(403).json({ error: 'Not allowed by CORS' });
  }
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptions);
exports.customCorsMiddleware = customCorsMiddleware