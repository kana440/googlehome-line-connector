const express = require('express');
const app = express();
const list = require('./glc/list')

app.get('/glc/v1/list', list);
app.get('/glc/v1',)

// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));
