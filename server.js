/* eslint-disable max-len */

import express from 'express';
import routers from './server/routes/user-route';
import Responses from './server/helpers/responses';
import routersannounce from './server/routes/announce-route';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(routers);
app.use(routersannounce);
app.use((req, res, next) => ((!req.route) ? Responses.failure(res, 400, 'Wrong Route') : next()));
app.listen(PORT, () => console.log(`The server running on port ${PORT}`));

export default app;
