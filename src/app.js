import express from 'express';
import cors from 'cors';
import recommendationsRouter from './routers/recommendationsRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/check-status', (req, res) => {
    res.send('Belezinha');
});

app.use('/recommendations', recommendationsRouter);

export default app;
