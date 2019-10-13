const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const middleware = require('./glc/middleWare')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/glc/list', middleware.list);
app.post('/send-to-line', middleware.sendToLine);
app.post('/send-to-line', middleware.sendToLine);
app.get('/temp', (req, res)=>{
    res.download('./glc/_temp.wav')
});

// ポート3000でサーバを立てる
app.listen(8082, () => console.log('Listening on port 8082'));
