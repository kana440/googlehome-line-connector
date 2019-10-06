const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const middleware = require('./glc/middleware')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/glc/list', middleware.list);
app.post('/send-to-line', middleware.sendToLine);

// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));
