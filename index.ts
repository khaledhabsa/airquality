import express, { Express } from 'express';
import config from 'config';
import dbConnection from './database/mongoConnection';
import airqualityCheck from './cron/cityAirQualityCheck';
import routes from './routes/routes';

const app: Express = express();
const port = config.get('PORT');

dbConnection();
airqualityCheck();
routes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at post: ${port}`);
});