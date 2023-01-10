import app from '../src/index';
import dotenv from 'dotenv';
import config from '../src/config';

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
