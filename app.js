// app.js
import express from 'express';
import bodyParser from 'body-parser';

const { json } = bodyParser;
import schoolRoutes from './routes/schoolRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api', schoolRoutes);
app.get('/',(req,res)=>{
res.status(200).send('Landing Page');
});
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
