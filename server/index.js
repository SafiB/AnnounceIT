import express from 'express';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import router from './routes/main';

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome!',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});

export default app;
