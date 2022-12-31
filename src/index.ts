import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import router from './router';

const app = express(); // express 객체 받아옴

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/api', router); // use -> 모든 요청

//Error Handler
interface ErrorType {
  message: string;
  status: number;
}

app.use(function (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.port, () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: ${config.port} 🛡️
        #############################################
    `);
});
