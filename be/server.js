import express from 'express';
import router from './routes/index.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// Setea el puerto
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});