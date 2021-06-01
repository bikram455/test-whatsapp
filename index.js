import cors from 'cors';
import Express from 'express';
import routes from './routes.js';

const app = Express();
app.use(cors());

app.get('/', (req, res) => {
    res.send({
        message: 'This is a test web crawler server.'
    });
});

app.use('/api', routes);

app.listen(666, () => console.log('Listening to port 666...'));
