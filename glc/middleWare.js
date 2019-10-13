const request = require('request')
const line = require('@line/bot-sdk')
const config = {
    channelAccessToken: 'u1spB4GU6nsQAavM3O6t12jgIRsfskhMuJdvwFahDGsVqJSzdiDMhXa/1oUEOvpw5tEhxFdKNgrpUtBlGpqobXybwU42pJoIFdeaMZFRj8sMK4sUbvl+o2SK7RwxbjC+kPE0jx37/kdSKO8UTsaSXwdB04t89/1O/w1cDnyilFU=',
    channelSecret: '30100c79aa2851f2cad3aef97f4c863e'
};
const client = new line.Client(config);


const middleware = {
  list(req, res) {
    const headers = {
    "content-type": "application/json"
    }
    const param = {
      "events":[
        {
          "source":"dummy",
          "message":{
            "text":"テストです"
          }
        }
      ]
    }
    const option = {
      url: "http://localhost:3000/send-to-line",
      headers: headers,
      body: JSON.stringify(param),
    }
    request.post(option,(error,response,body)=>{
      res.json(JSON.parse(body))
    })
  },

  sendToLine(req, res) {
    const body = req.body
    if(body.mode === "write") {
      // iftttからのとき
      const sendmessage = req.body.text.replace(/\s+/g,"");
      client.pushMessage(iGroup,{type:'text', text:sendmessage});
      res.status(200).send('Hello, world!');
    }
    console.log(JSON.stringify(body))
    res.json(body)
  },
}
module.exports = middleware
