import app from './index';
import dotenv from 'dotenv';
import config from './config';

dotenv.config();

app
  .listen(config.port, () => {
    console.log(`
    ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
  `);
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
