import Express from 'express';

const app = Express();

app.get('/', (req, res) => {
    res.send({
        message: 'This is a test web crawler server'
    });
});

app.listen(666, () => console.log('Listening to port 666...'));
