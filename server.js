/* eslint-disable max-len */

import express from 'express';
import routers from './server/routes/user-route';
import routersannounce from './server/routes/announce-route';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(routers);
app.use(routersannounce);
app.listen(PORT, () => console.log(`The server running on port ${PORT}`));
app.use((req) => {
  if (!req.route) {
    console.error('wrong route');
  }
});

export default app;
