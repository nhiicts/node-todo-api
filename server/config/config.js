const env = process.env.NODE_ENV || 'development';

 if (env === 'development' || env === 'test') {
   const config = require('./config.json');
   const evnConfig = config[env];
   Object.keys(evnConfig).forEach(key => {
     process.env[key] = evnConfig[key];
   });
 }