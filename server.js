/* eslint-disable max-len */
import express from 'express';
// import useRoutes from './server/Routes/userRoutes';
// import announcementRoutes from './server/Routes/announcementRoutes';
// import response from './server/Helpers/response';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// app.use(useRoutes);
// app.use(announcementRoutes);
// app.use((req, res, next) => ((!req.route) ? response.failureResponse(res, 400, 'Incorrect Route') : next()));
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
export default app;
