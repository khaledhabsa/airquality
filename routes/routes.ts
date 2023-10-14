import { Express } from 'express';
import 'express-async-errors';
import errorHandler from '../middelwares/errorHandling'
import compression from "compression";
import bodyParser from "body-parser";

import airQuality from '../components/cityairquality/cityAirQuality.route';
  
const routes = (app:Express) =>{    
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/airQuality',airQuality);
    app.use(errorHandler)
}

export default routes;